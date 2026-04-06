import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { HomeScreen } from '@/screens/HomeScreen';
import { LicenseScreen } from '@/screens/LicenseScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { useSettings } from '@/hooks/useSettings';
import { configureNotificationHandler } from '@/notifications/scheduler';

configureNotificationHandler();

export type Screen = 'home' | 'settings' | 'license';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [notificationSloganId, setNotificationSloganId] = useState<number | null>(null);
  const { settings } = useSettings();

  useEffect(() => {
    const openNotificationSlogan = async (response: Notifications.NotificationResponse | null) => {
      if (
        !response ||
        response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER
      ) {
        return;
      }

      const rawSloganId = response.notification.request.content.data?.sloganId;
      const sloganId = typeof rawSloganId === 'number' ? rawSloganId : Number(rawSloganId);
      if (!Number.isInteger(sloganId)) {
        return;
      }

      setNotificationSloganId(sloganId);
      setScreen('home');
      await Notifications.clearLastNotificationResponseAsync();
    };

    void Notifications.getLastNotificationResponseAsync().then(openNotificationSlogan);

    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      void openNotificationSlogan(response);
    });

    return () => sub.remove();
  }, []);

  if (screen === 'settings') {
    return <SettingsScreen onBack={() => setScreen('home')} onOpenLicense={() => setScreen('license')} />;
  }

  if (screen === 'license') {
    return <LicenseScreen language={settings.language} onBack={() => setScreen('settings')} />;
  }

  return (
    <HomeScreen
      onOpenSettings={() => setScreen('settings')}
      notificationSloganId={notificationSloganId}
      onNotificationSloganHandled={() => setNotificationSloganId(null)}
    />
  );
}
