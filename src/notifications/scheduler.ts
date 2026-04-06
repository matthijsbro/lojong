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

export type ScheduleResult = 'scheduled' | 'disabled' | 'permission-denied';

/**
 * Schedule the next 30 daily notifications based on current settings.
 * Replaces existing scheduled notifications after permission is granted.
 */
export async function scheduleNotifications(settings: AppSettings): Promise<ScheduleResult> {
  if (settings.notifMode === 'off') {
    await cancelAllNotifications();
    return 'disabled';
  }

  const granted = await requestNotificationPermission();
  if (!granted) return 'permission-denied';

  await cancelAllNotifications();

  const title = settings.language === 'de' ? 'Lojong' : 'Lojong';
  const count = Math.min(slogans.length, 30); // schedule up to 30 (OS limit)
  const scheduledSlogans = buildScheduledSlogans(settings, count);

  for (let dayOffset = 0; dayOffset < count; dayOffset++) {
    const trigger = buildTrigger(settings, dayOffset);
    const slogan = scheduledSlogans[dayOffset];
    const body = slogan[settings.language].slogan;

    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { sloganId: slogan.id } },
      trigger,
    });
  }

  return 'scheduled';
}

function buildScheduledSlogans(settings: AppSettings, count: number) {
  if (settings.order === 'random') {
    return Array.from({ length: count }, () => slogans[Math.floor(Math.random() * slogans.length)]);
  }

  const lastSloganIndex = findSloganIndexById(settings.lastSloganId);
  return Array.from({ length: count }, (_value, offset) => {
    const nextIndex = (lastSloganIndex + offset + 1) % slogans.length;
    return slogans[nextIndex];
  });
}

function findSloganIndexById(sloganId: number): number {
  const index = slogans.findIndex((slogan) => slogan.id === sloganId);
  return index >= 0 ? index : 0;
}

function buildTrigger(
  settings: AppSettings,
  dayOffset: number,
): Notifications.NotificationTriggerInput {
  const now = new Date();
  const target = new Date(now);

  if (settings.notifMode === 'fixed') {
    const [hoursRaw, minutesRaw] = settings.notifTime.split(':').map(Number);
    const hours = Number.isFinite(hoursRaw) ? Math.min(Math.max(hoursRaw, 0), 23) : 8;
    const minutes = Number.isFinite(minutesRaw) ? Math.min(Math.max(minutesRaw, 0), 59) : 0;
    target.setHours(hours, minutes, 0, 0);

    // For the first item, use today if possible; otherwise move to tomorrow.
    if (dayOffset === 0 && target <= now) {
      target.setDate(target.getDate() + 1);
    } else {
      target.setDate(target.getDate() + dayOffset);
    }
  } else {
    // Random time between 6:00 and 22:00
    const randomHour = 6 + Math.floor(Math.random() * 16);
    const randomMinute = Math.floor(Math.random() * 60);
    target.setHours(randomHour, randomMinute, 0, 0);

    if (dayOffset === 0 && target <= now) {
      target.setDate(target.getDate() + 1);
    } else {
      target.setDate(target.getDate() + dayOffset);
    }
  }

  return {
    type: Notifications.SchedulableTriggerInputTypes.DATE,
    date: target,
    channelId: Platform.OS === 'android' ? CHANNEL_ID : undefined,
  };
}

export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
