import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { HomeScreen } from '@/screens/HomeScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { configureNotificationHandler } from '@/notifications/scheduler';

configureNotificationHandler();

export type Screen = 'home' | 'settings';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(() => {
      setScreen('home');
    });
    return () => sub.remove();
  }, []);

  if (screen === 'settings') {
    return <SettingsScreen onBack={() => setScreen('home')} />;
  }

  return <HomeScreen onOpenSettings={() => setScreen('settings')} />;
}
