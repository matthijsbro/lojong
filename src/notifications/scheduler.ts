import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppSettings } from '@/store/settings';
import { slogans } from '@/content/slogans';

// Channel ID for Android
const CHANNEL_ID = 'lojong-daily';

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Daily Reminder',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Schedule the next 30 daily notifications based on current settings.
 * Always cancels existing scheduled notifications first.
 */
export async function scheduleNotifications(settings: AppSettings): Promise<void> {
  await cancelAllNotifications();

  if (settings.notifMode === 'off') return;

  const granted = await requestNotificationPermission();
  if (!granted) return;

  const title = settings.language === 'de' ? 'Lojong' : 'Lojong';
  const count = Math.min(slogans.length, 30); // schedule up to 30 (OS limit)

  for (let dayOffset = 1; dayOffset <= count; dayOffset++) {
    const trigger = buildTrigger(settings, dayOffset);
    const slogan = slogans[(dayOffset - 1) % slogans.length];
    const body = slogan[settings.language].slogan;

    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { sloganId: slogan.id } },
      trigger,
    });
  }
}

function buildTrigger(
  settings: AppSettings,
  dayOffset: number,
): Notifications.NotificationTriggerInput {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + dayOffset);

  if (settings.notifMode === 'fixed') {
    const [hours, minutes] = settings.notifTime.split(':').map(Number);
    target.setHours(hours, minutes, 0, 0);
  } else {
    // Random time between 6:00 and 22:00
    const randomHour = 6 + Math.floor(Math.random() * 16);
    const randomMinute = Math.floor(Math.random() * 60);
    target.setHours(randomHour, randomMinute, 0, 0);
  }

  return { date: target };
}

export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
