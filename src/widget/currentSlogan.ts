import { Slogan, slogans } from '@/content/slogans';
import type { Order } from '@/store/settings';

// The home-screen widget shows "the slogan of the day": the slogan of
// today's first (slot-0) reminder, so widget and notifications always agree —
// including for random order, where the scheduled stack fixed each day's
// slogans at schedule time. The widget cannot observe reminders that already
// fired (they leave the pending stack), so the resolver combines three
// sources, in order of reliability:
//   1. For fixed order, the pending stack itself: the sequence advances by
//      exactly one slogan per reminder and every day holds `perDay` slots,
//      so today's slot-0 slogan is derivable from ANY pending reminder by
//      stepping back through the slogan list.
//   2. A per-day cache written on earlier widget updates the same day.
//   3. Today's earliest still-pending reminder (random order, pre-fire),
//      falling back to the slogan the app last showed.

export type WidgetReminder = {
  sloganId: number;
  fireAt: number; // epoch ms
  slot: number; // index of the reminder within its day (0-based)
};

export type WidgetCache = {
  dateKey: string;
  sloganId: number;
};

export type ResolveInput = {
  now: Date;
  order: Order;
  /** Reminders per day the pending stack was built with. */
  perDay: number;
  /** Pending reminders from the scheduled-notification stack. */
  reminders: WidgetReminder[];
  cache: WidgetCache | null;
  /** The slogan the app last showed; final fallback (e.g. notifications off). */
  lastSloganId: number;
};

export type ResolveResult = {
  sloganId: number;
  /** Cache entry the caller should persist (may equal the input cache). */
  cache: WidgetCache | null;
};

/** Local calendar day, e.g. '2026-08-03'. */
export function localDateKey(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function daysBetweenLocalMidnights(from: Date, to: Date): number {
  const a = new Date(from);
  a.setHours(0, 0, 0, 0);
  const b = new Date(to);
  b.setHours(0, 0, 0, 0);
  // Rounding absorbs DST shifts (23h/25h days).
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function findSloganById(sloganId: number): Slogan {
  return slogans.find((slogan) => slogan.id === sloganId) ?? slogans[0];
}

export function resolveTodaySlogan(input: ResolveInput): ResolveResult {
  const { now, order, perDay, reminders, cache, lastSloganId } = input;
  const todayKey = localDateKey(now);

  const future = reminders
    .filter((reminder) => reminder.fireAt > now.getTime())
    .sort((a, b) => a.fireAt - b.fireAt);

  if (order === 'fixed' && future.length > 0) {
    // Step back from the earliest pending reminder to today's slot 0. The
    // stack is contiguous (perDay reminders per day, one sequence step per
    // reminder), so the distance is full days times perDay plus the slot.
    const next = future[0];
    const steps = daysBetweenLocalMidnights(now, new Date(next.fireAt)) * perDay + next.slot;
    const nextIndex = Math.max(
      slogans.findIndex((slogan) => slogan.id === next.sloganId),
      0,
    );
    const todayIndex = (((nextIndex - steps) % slogans.length) + slogans.length) % slogans.length;
    const sloganId = slogans[todayIndex].id;
    return { sloganId, cache: { dateKey: todayKey, sloganId } };
  }

  if (cache && cache.dateKey === todayKey) {
    return { sloganId: findSloganById(cache.sloganId).id, cache };
  }

  // Random order without a cache yet: today's earliest still-pending reminder
  // is the closest thing to "the slogan of the day".
  const todayPending = future.filter(
    (reminder) => localDateKey(new Date(reminder.fireAt)) === todayKey,
  );
  if (todayPending.length > 0) {
    const first = todayPending.reduce((a, b) => (a.slot <= b.slot ? a : b));
    return { sloganId: first.sloganId, cache: { dateKey: todayKey, sloganId: first.sloganId } };
  }

  // Nothing scheduled and no cache (notifications off, or random order after
  // the day's reminders all fired): mirror what the app last showed. Not
  // cached, so a later update this day can still pick up a better source.
  return { sloganId: findSloganById(lastSloganId).id, cache };
}
