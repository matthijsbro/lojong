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
  const { settings } = useSettings();

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(() => {
      setScreen('home');
    });
    return () => sub.remove();
  }, []);

  if (screen === 'settings') {
    return <SettingsScreen onBack={() => setScreen('home')} onOpenLicense={() => setScreen('license')} />;
  }

  if (screen === 'license') {
    return <LicenseScreen language={settings.language} onBack={() => setScreen('settings')} />;
  }

  return <HomeScreen onOpenSettings={() => setScreen('settings')} />;
}
