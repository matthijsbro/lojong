import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '@/screens/HomeScreen';
import { LicenseScreen } from '@/screens/LicenseScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { useSettings } from '@/hooks/useSettings';
import {
  configureNotificationHandler,
  ensureNotificationsScheduled,
  scheduleNotifications,
} from '@/notifications/scheduler';

configureNotificationHandler();

export type Screen = 'home' | 'settings' | 'license';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [notificationSloganId, setNotificationSloganId] = useState<number | null>(null);
  const { settings, loaded, update } = useSettings();

  useEffect(() => {
    const markReminderProgress = async (rawSloganId: unknown) => {
      const sloganId = typeof rawSloganId === 'number' ? rawSloganId : Number(rawSloganId);
      if (!Number.isInteger(sloganId)) {
        return null;
      }

      const nextSettings = await update({ lastReminderSloganId: sloganId });
      if (nextSettings.notifMode !== 'off') {
        await scheduleNotifications(nextSettings);
      }

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

      setNotificationSloganId(sloganId);
      setScreen('home');
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

  useEffect(() => {
    if (!loaded) return;
    void ensureNotificationsScheduled(settings);
  }, [loaded, settings]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && loaded) {
        void ensureNotificationsScheduled(settings);
      }
    });

    return () => sub.remove();
  }, [loaded, settings]);

  let content: React.ReactNode;

  if (screen === 'settings') {
    content = <SettingsScreen onBack={() => setScreen('home')} onOpenLicense={() => setScreen('license')} />;
  } else if (screen === 'license') {
    content = <LicenseScreen language={settings.language} onBack={() => setScreen('settings')} />;
  } else {
    content = (
      <HomeScreen
        onOpenSettings={() => setScreen('settings')}
        notificationSloganId={notificationSloganId}
        onNotificationSloganHandled={() => setNotificationSloganId(null)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#f5f0e8" translucent={false} />
      {content}
    </SafeAreaProvider>
  );
}
