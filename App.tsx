import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { AppState, BackHandler, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '@/screens/HomeScreen';
import { LicenseScreen } from '@/screens/LicenseScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { CommentaryScreen } from '@/screens/CommentaryScreen';
import { useSettings } from '@/hooks/useSettings';
import { THEMES } from '@/theme/themes';
import {
  configureNotificationHandler,
  dismissDisplayedReminders,
  ensureNotificationsScheduled,
} from '@/notifications/scheduler';

configureNotificationHandler();

export type Screen = 'home' | 'settings' | 'license' | 'commentary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  // Slogan the home screen should jump to, plus whether it should get the
  // subdued notification-intro treatment (true for notification taps, false
  // when picked from the overview).
  const [focusSloganId, setFocusSloganId] = useState<number | null>(null);
  const [focusIntro, setFocusIntro] = useState(false);
  const [commentarySloganId, setCommentarySloganId] = useState<number | null>(null);
  const { settings, loaded, update } = useSettings();
  // The manifest opts out of activity recreation on OS font-scale changes
  // (Fabric repaints already-mounted text at the new scale without
  // re-measuring it, which clips descenders). Remounting the tree instead
  // gives every Text a fresh, correctly-sized layout.
  const { fontScale: systemFontScale } = useWindowDimensions();

  useEffect(() => {
    const markReminderProgress = async (rawSloganId: unknown) => {
      const sloganId = typeof rawSloganId === 'number' ? rawSloganId : Number(rawSloganId);
      if (!Number.isInteger(sloganId)) {
        return null;
      }

      // Persist progress only; the settings-change effect below tops up the
      // pending reminder stack. Scheduling directly here as well caused two
      // concurrent cancel/reschedule passes and duplicated notifications.
      await update({ lastReminderSloganId: sloganId });

      return sloganId;
    };

    const openNotificationSlogan = async (response: Notifications.NotificationResponse | null) => {
      if (
        !response ||
        response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
        return;
      }

      const sloganId = await markReminderProgress(
        response.notification.request.content.data?.sloganId,
      );
      if (sloganId == null) {
        return;
      }

      setFocusSloganId(sloganId);
      setFocusIntro(true);
      setScreen('home');
      await dismissDisplayedReminders();
      await Notifications.clearLastNotificationResponseAsync();
    };

    void Notifications.getLastNotificationResponseAsync().then(openNotificationSlogan);

    const subResponse = Notifications.addNotificationResponseReceivedListener((response) => {
      void openNotificationSlogan(response);
    });

    const subReceived = Notifications.addNotificationReceivedListener((notification) => {
      void markReminderProgress(notification.request.content.data?.sloganId);
    });

    return () => {
      subResponse.remove();
      subReceived.remove();
    };
  }, [update]);

  // The Android back button/gesture steps back through the app's screens
  // instead of leaving the app; only from the home screen does it exit.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'license') {
        setScreen('settings');
        return true;
      }
      if (screen === 'settings' || screen === 'commentary') {
        setScreen('home');
        return true;
      }
      return false;
    });

    return () => sub.remove();
  }, [screen]);

  useEffect(() => {
    if (!loaded) return;
    void ensureNotificationsScheduled(settings);
  }, [loaded, settings]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && loaded) {
        // The user is in the app; any reminder still in the tray is stale.
        void dismissDisplayedReminders();
        void ensureNotificationsScheduled(settings);
      }
    });

    return () => sub.remove();
  }, [loaded, settings]);

  const colors = THEMES[settings.theme];

  let content: React.ReactNode;

  if (screen === 'settings') {
    content = <SettingsScreen onBack={() => setScreen('home')} onOpenLicense={() => setScreen('license')} />;
  } else if (screen === 'license') {
    content = <LicenseScreen language={settings.language} onBack={() => setScreen('settings')} />;
  } else if (screen === 'commentary') {
    content = (
      <CommentaryScreen
        initialSloganId={commentarySloganId}
        onBack={() => setScreen('home')}
      />
    );
  } else {
    content = (
      <HomeScreen
        onOpenSettings={() => setScreen('settings')}
        onOpenCommentary={(sloganId) => {
          setCommentarySloganId(sloganId);
          setScreen('commentary');
        }}
        focusSloganId={focusSloganId}
        focusIntro={focusIntro}
        onFocusHandled={() => setFocusSloganId(null)}
      />
    );
  }

  return (
    <SafeAreaProvider key={systemFontScale}>
      <StatusBar
        style={colors.statusBarStyle}
        backgroundColor={colors.background}
        translucent={false}
      />
      {content}
    </SafeAreaProvider>
  );
}
