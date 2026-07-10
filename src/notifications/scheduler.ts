import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppSettings } from '@/store/settings';
import { slogans } from '@/content/slogans';

// Channel ID for Android
const CHANNEL_ID = 'lojong-daily';
// How many days of reminders we keep scheduled ahead. The slogan sequence
// wraps around (modulo), so reminders never run out as long as the app is
// opened at least once within this window. iOS caps pending notifications
// at 64, so stay below that.
const SCHEDULE_HORIZON_DAYS = 60;

// All scheduling work runs through this queue. Launch, foregrounding and
// notification taps can all trigger (re)scheduling at the same time; if two
// cancel-all/schedule passes interleave, days end up with duplicate
// reminders while other days get none at all.
let queue: Promise<unknown> = Promise.resolve();
function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

type ReminderData = {
  sloganId: number;
  fireAt: number; // epoch ms; lets us reason about pending reminders cross-platform
  fingerprint: string; // settings snapshot; mismatch means the stack is stale
};

function settingsFingerprint(settings: AppSettings): string {
  const time = settings.notifMode === 'fixed' ? settings.notifTime : '';
  return `${settings.notifMode}|${time}|${settings.order}|${settings.language}`;
}

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
  await enqueue(() => Notifications.cancelAllScheduledNotificationsAsync());
}

/** Clear reminders already showing in the tray so only one is ever visible. */
export async function dismissDisplayedReminders(): Promise<void> {
  try {
    await Notifications.dismissAllNotificationsAsync();
  } catch {
    // Dismissal is best-effort; never block scheduling on it.
  }
}

export type ScheduleResult = 'scheduled' | 'disabled' | 'permission-denied';

/**
 * Rebuild the full reminder stack from scratch (used when settings change).
 */
export async function scheduleNotifications(settings: AppSettings): Promise<ScheduleResult> {
  if (settings.notifMode === 'off') {
    await cancelAllNotifications();
    return 'disabled';
  }

  const granted = await requestNotificationPermission();
  if (!granted) return 'permission-denied';

  await enqueue(() => rebuildStack(settings));
  return 'scheduled';
}

export type EnsureScheduleResult = ScheduleResult | 'unchanged';

/**
 * Make sure the pending reminder stack is healthy and full:
 * - removes duplicate reminders that landed on the same day
 * - rebuilds the stack if it is stale (old app version / changed settings)
 * - tops it up so there are always SCHEDULE_HORIZON_DAYS of reminders ahead,
 *   continuing the slogan sequence and wrapping around at the end
 */
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

  if (options?.force) {
    await enqueue(() => rebuildStack(settings));
    return 'scheduled';
  }

  return enqueue(() => healStack(settings));
}

async function healStack(settings: AppSettings): Promise<EnsureScheduleResult> {
  const pending = await Notifications.getAllScheduledNotificationsAsync();
  const fingerprint = settingsFingerprint(settings);
  const now = Date.now();

  type PendingReminder = { identifier: string; data: ReminderData };
  const valid: PendingReminder[] = [];
  const invalid: string[] = [];

  for (const request of pending) {
    const data = request.content.data as Partial<ReminderData> | undefined;
    if (
      typeof data?.fireAt === 'number' &&
      typeof data?.sloganId === 'number' &&
      data.fingerprint === fingerprint &&
      data.fireAt > now
    ) {
      valid.push({ identifier: request.identifier, data: data as ReminderData });
    } else {
      // Legacy (pre-fireAt) reminders, stale settings, or past-dated leftovers.
      invalid.push(request.identifier);
    }
  }

  // Deduplicate: keep at most one reminder per calendar day.
  valid.sort((a, b) => a.data.fireAt - b.data.fireAt);
  const seenDays = new Set<string>();
  const keep: PendingReminder[] = [];
  for (const reminder of valid) {
    const day = new Date(reminder.data.fireAt).toDateString();
    if (seenDays.has(day)) {
      invalid.push(reminder.identifier);
    } else {
      seenDays.add(day);
      keep.push(reminder);
    }
  }

  // A healthy stack from an older session may exist without our metadata;
  // any invalid entry means we cannot trust the stack, so rebuild it whole.
  if (keep.length === 0 || invalid.length > 0) {
    await rebuildStack(settings);
    return 'scheduled';
  }

  if (keep.length >= SCHEDULE_HORIZON_DAYS) {
    return 'unchanged';
  }

  // Top up: continue the sequence after the last pending reminder.
  const last = keep[keep.length - 1];
  const lastDate = new Date(last.data.fireAt);
  const missing = SCHEDULE_HORIZON_DAYS - keep.length;
  const nextSlogans = buildSloganSequence(settings, last.data.sloganId, missing);

  for (let i = 0; i < missing; i++) {
    const target = new Date(lastDate);
    target.setDate(lastDate.getDate() + i + 1);
    applyTimeOfDay(settings, target);
    await scheduleReminder(settings, nextSlogans[i], target, fingerprint);
  }

  return 'scheduled';
}

async function rebuildStack(settings: AppSettings): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const fingerprint = settingsFingerprint(settings);
  const baseDate = computeBaseDate(settings);
  const scheduledSlogans = buildSloganSequence(
    settings,
    settings.lastReminderSloganId,
    SCHEDULE_HORIZON_DAYS,
  );

  for (let dayOffset = 0; dayOffset < SCHEDULE_HORIZON_DAYS; dayOffset++) {
    const target = new Date(baseDate);
    target.setDate(baseDate.getDate() + dayOffset);
    if (dayOffset > 0) {
      applyTimeOfDay(settings, target);
    }
    await scheduleReminder(settings, scheduledSlogans[dayOffset], target, fingerprint);
  }
}

async function scheduleReminder(
  settings: AppSettings,
  slogan: (typeof slogans)[number],
  date: Date,
  fingerprint: string,
): Promise<void> {
  const data: ReminderData = { sloganId: slogan.id, fireAt: date.getTime(), fingerprint };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lojong',
      body: slogan[settings.language].slogan,
      data,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
      channelId: Platform.OS === 'android' ? CHANNEL_ID : undefined,
    },
  });
}

/**
 * The slogans for the next `count` days, starting AFTER `afterSloganId`.
 * Fixed order continues through the list and wraps around at the end, so the
 * sequence never runs out.
 */
function buildSloganSequence(settings: AppSettings, afterSloganId: number, count: number) {
  if (settings.order === 'random') {
    return Array.from({ length: count }, () => slogans[Math.floor(Math.random() * slogans.length)]);
  }

  const lastIndex = findSloganIndexById(afterSloganId);
  return Array.from({ length: count }, (_value, offset) => {
    const nextIndex = (lastIndex + offset + 1) % slogans.length;
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
    applyTimeOfDay(settings, base);
    if (base <= now) {
      base.setDate(base.getDate() + 1);
    }
  } else {
    // Random mode: always start from tomorrow so dayOffset=0 and dayOffset=1
    // never land on the same calendar day.
    base.setDate(base.getDate() + 1);
    applyTimeOfDay(settings, base);
  }

  return base;
}

/** Set the reminder time-of-day on `date`: the fixed time, or a random one (6:00–21:59). */
function applyTimeOfDay(settings: AppSettings, date: Date): void {
  if (settings.notifMode === 'fixed') {
    const [hoursRaw, minutesRaw] = settings.notifTime.split(':').map(Number);
    const hours = Number.isFinite(hoursRaw) ? Math.min(Math.max(hoursRaw, 0), 23) : 8;
    const minutes = Number.isFinite(minutesRaw) ? Math.min(Math.max(minutesRaw, 0), 59) : 0;
    date.setHours(hours, minutes, 0, 0);
  } else {
    date.setHours(6 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 60), 0, 0);
  }
}

export function configureNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      // Only one reminder should ever be visible: clear older ones from the
      // tray before this one is shown.
      await dismissDisplayedReminders();
      return {
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      };
    },
  });
}
