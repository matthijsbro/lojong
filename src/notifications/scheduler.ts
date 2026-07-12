import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { AppSettings, MAX_REMINDERS_PER_DAY } from '@/store/settings';
import { slogans } from '@/content/slogans';

// Channel ID for Android
const CHANNEL_ID = 'lojong-daily';
// How many reminders we keep scheduled ahead. The slogan sequence wraps
// around (modulo), so reminders never run out as long as the app is opened
// at least once within the resulting window (60 days with one reminder per
// day, 15 days with four). iOS caps pending notifications at 64, so stay
// below that.
const MAX_PENDING = 60;

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
  slot: number; // index of the reminder within its day (0-based)
  fingerprint: string; // settings snapshot; mismatch means the stack is stale
};

/** The configured fixed times, deduplicated, capped and in day order. */
function fixedTimes(settings: AppSettings): string[] {
  const unique = [...new Set(settings.notifTimes)];
  const capped = unique.slice(0, MAX_REMINDERS_PER_DAY);
  return capped.length > 0 ? capped.sort() : ['08:00'];
}

function remindersPerDay(settings: AppSettings): number {
  const count =
    settings.notifMode === 'fixed' ? fixedTimes(settings).length : settings.notifRandomCount;
  return Math.min(Math.max(Math.floor(count) || 1, 1), MAX_REMINDERS_PER_DAY);
}

/** How many reminders the pending stack should hold in total. */
function stackSize(settings: AppSettings): number {
  const perDay = remindersPerDay(settings);
  return Math.max(1, Math.floor(MAX_PENDING / perDay)) * perDay;
}

function settingsFingerprint(settings: AppSettings): string {
  const times = settings.notifMode === 'fixed' ? fixedTimes(settings).join(',') : '';
  const perDay = remindersPerDay(settings);
  return `${settings.notifMode}|${times}|${perDay}|${settings.order}|${settings.language}`;
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
 * - removes duplicate reminders that landed on the same day and slot
 * - rebuilds the stack if it is stale (old app version / changed settings)
 * - tops it up so the stack always holds `stackSize` reminders ahead,
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
      typeof data?.slot === 'number' &&
      data.fingerprint === fingerprint &&
      data.fireAt > now
    ) {
      valid.push({ identifier: request.identifier, data: data as ReminderData });
    } else {
      // Legacy (pre-slot) reminders, stale settings, or past-dated leftovers.
      invalid.push(request.identifier);
    }
  }

  // Deduplicate: keep at most one reminder per calendar day and slot.
  valid.sort((a, b) => a.data.fireAt - b.data.fireAt);
  const seenSlots = new Set<string>();
  const keep: PendingReminder[] = [];
  for (const reminder of valid) {
    const key = `${new Date(reminder.data.fireAt).toDateString()}#${reminder.data.slot}`;
    if (seenSlots.has(key)) {
      invalid.push(reminder.identifier);
    } else {
      seenSlots.add(key);
      keep.push(reminder);
    }
  }

  // A healthy stack from an older session may exist without our metadata;
  // any invalid entry means we cannot trust the stack, so rebuild it whole.
  if (keep.length === 0 || invalid.length > 0) {
    await rebuildStack(settings);
    return 'scheduled';
  }

  const target = stackSize(settings);
  if (keep.length >= target) {
    return 'unchanged';
  }

  // Top up: continue the sequence on the days after the last pending
  // reminder. Reminders only ever disappear from the front of the stack (as
  // they fire), so everything after `lastDate` is free.
  const last = keep[keep.length - 1];
  const lastDate = new Date(last.data.fireAt);
  const missing = target - keep.length;
  const nextSlogans = buildSloganSequence(settings, last.data.sloganId, missing);

  let added = 0;
  for (let dayOffset = 1; added < missing; dayOffset++) {
    const day = new Date(lastDate);
    day.setDate(lastDate.getDate() + dayOffset);
    const moments = reminderMomentsForDay(settings, day);
    for (let slot = 0; slot < moments.length && added < missing; slot++) {
      await scheduleReminder(settings, nextSlogans[added], moments[slot], slot, fingerprint);
      added++;
    }
  }

  return 'scheduled';
}

async function rebuildStack(settings: AppSettings): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const fingerprint = settingsFingerprint(settings);
  const now = new Date();
  const target = stackSize(settings);
  const scheduledSlogans = buildSloganSequence(settings, settings.lastReminderSloganId, target);

  // Fixed mode keeps today's still-future times; random mode starts tomorrow
  // so a moment drawn for later today can never collide with tomorrow's.
  let scheduled = 0;
  for (let dayOffset = settings.notifMode === 'fixed' ? 0 : 1; scheduled < target; dayOffset++) {
    const day = new Date(now);
    day.setDate(now.getDate() + dayOffset);
    const moments = reminderMomentsForDay(settings, day);
    for (let slot = 0; slot < moments.length && scheduled < target; slot++) {
      if (moments[slot].getTime() <= now.getTime()) continue;
      await scheduleReminder(settings, scheduledSlogans[scheduled], moments[slot], slot, fingerprint);
      scheduled++;
    }
  }
}

async function scheduleReminder(
  settings: AppSettings,
  slogan: (typeof slogans)[number],
  date: Date,
  slot: number,
  fingerprint: string,
): Promise<void> {
  const data: ReminderData = { sloganId: slogan.id, fireAt: date.getTime(), slot, fingerprint };

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
 * The reminder moments within `day`, one per slot, in chronological order.
 * Fixed mode uses the configured times; random mode draws one moment per
 * equal window of 6:00–22:00 so multiple daily reminders stay spread out.
 */
function reminderMomentsForDay(settings: AppSettings, day: Date): Date[] {
  if (settings.notifMode === 'fixed') {
    return fixedTimes(settings).map((time) => {
      const [hoursRaw, minutesRaw] = time.split(':').map(Number);
      const hours = Number.isFinite(hoursRaw) ? Math.min(Math.max(hoursRaw, 0), 23) : 8;
      const minutes = Number.isFinite(minutesRaw) ? Math.min(Math.max(minutesRaw, 0), 59) : 0;
      const moment = new Date(day);
      moment.setHours(hours, minutes, 0, 0);
      return moment;
    });
  }

  const perDay = remindersPerDay(settings);
  const windowMinutes = (16 * 60) / perDay; // 6:00–22:00
  return Array.from({ length: perDay }, (_value, slot) => {
    const moment = new Date(day);
    const offset = Math.floor(windowMinutes * slot + Math.random() * windowMinutes);
    moment.setHours(6, offset, 0, 0); // Date normalizes minutes > 59
    return moment;
  });
}

/**
 * The slogans for the next `count` reminders, starting AFTER `afterSloganId`.
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
