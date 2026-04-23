import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppSettings } from '@/store/settings';
import { slogans } from '@/content/slogans';

// Channel ID for Android
const CHANNEL_ID = 'lojong-daily';
const MAX_SCHEDULED_NOTIFICATIONS = Math.min(slogans.length, 30);

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Daily Reminder',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.status === 'granted') return true;
  if (!current.canAskAgain) return false;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.status === 'granted';
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
  const count = MAX_SCHEDULED_NOTIFICATIONS; // schedule up to 30 (OS limit)
  const scheduledSlogans = buildScheduledSlogans(settings, count);

  const baseDate = computeBaseDate(settings);

  for (let dayOffset = 0; dayOffset < count; dayOffset++) {
    const trigger = buildTrigger(settings, dayOffset, baseDate);
    const slogan = scheduledSlogans[dayOffset];
    const body = slogan[settings.language].slogan;

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { sloganId: slogan.id },
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger,
    });
  }

  return 'scheduled';
}

export type EnsureScheduleResult = ScheduleResult | 'unchanged';

export async function ensureNotificationsScheduled(
  settings: AppSettings,
  options?: { force?: boolean },
): Promise<EnsureScheduleResult> {
  if (settings.notifMode === 'off') {
    await cancelAllNotifications();
    return 'disabled';
  }

  const granted = await requestNotificationPermission();
  if (!granted) return 'permission-denied';

  if (!options?.force) {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    if (scheduled.length >= MAX_SCHEDULED_NOTIFICATIONS) {
      return 'unchanged';
    }
  }

  return scheduleNotifications(settings);
}

function buildScheduledSlogans(settings: AppSettings, count: number) {
  if (settings.order === 'random') {
    return Array.from({ length: count }, () => slogans[Math.floor(Math.random() * slogans.length)]);
  }

  const lastSloganIndex = findSloganIndexById(settings.lastReminderSloganId);
  return Array.from({ length: count }, (_value, offset) => {
    const nextIndex = (lastSloganIndex + offset + 1) % slogans.length;
    return slogans[nextIndex];
  });
}

function findSloganIndexById(sloganId: number): number {
  const index = slogans.findIndex((slogan) => slogan.id === sloganId);
  return index >= 0 ? index : 0;
}

/**
 * Compute the date/time for the first (dayOffset=0) notification.
 * Fixed mode: today at the configured time, or tomorrow if that has already passed.
 * Random mode: tomorrow at a random time (avoids collision when today's window has passed).
 */
function computeBaseDate(settings: AppSettings): Date {
  const now = new Date();
  const base = new Date(now);

  if (settings.notifMode === 'fixed') {
    const [hoursRaw, minutesRaw] = settings.notifTime.split(':').map(Number);
    const hours = Number.isFinite(hoursRaw) ? Math.min(Math.max(hoursRaw, 0), 23) : 8;
    const minutes = Number.isFinite(minutesRaw) ? Math.min(Math.max(minutesRaw, 0), 59) : 0;
    base.setHours(hours, minutes, 0, 0);
    if (base <= now) {
      base.setDate(base.getDate() + 1);
    }
  } else {
    // Random mode: always start from tomorrow so dayOffset=0 and dayOffset=1
    // never land on the same calendar day.
    base.setDate(base.getDate() + 1);
    base.setHours(6 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 60), 0, 0);
  }

  return base;
}

function buildTrigger(
  settings: AppSettings,
  dayOffset: number,
  baseDate: Date,
): Notifications.NotificationTriggerInput {
  const target = new Date(baseDate);
  target.setDate(baseDate.getDate() + dayOffset);

  if (settings.notifMode !== 'fixed') {
    // Give each day its own random time.
    target.setHours(6 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 60), 0, 0);
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
