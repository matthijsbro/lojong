import { slogans } from '@/content/slogans';
import {
  localDateKey,
  resolveTodaySlogan,
  WidgetReminder,
} from '@/widget/currentSlogan';

// A fixed reference day, well away from DST transitions.
const NOW = new Date(2026, 7, 3, 7, 0); // Aug 3 2026, 07:00 local
const TODAY_KEY = localDateKey(NOW);

function at(dayOffset: number, hours: number, minutes = 0): number {
  const date = new Date(NOW);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
}

function reminder(sloganIndex: number, fireAt: number, slot: number): WidgetReminder {
  return { sloganId: slogans[sloganIndex].id, fireAt, slot };
}

const base = {
  now: NOW,
  order: 'fixed' as const,
  perDay: 1,
  reminders: [] as WidgetReminder[],
  cache: null,
  lastSloganId: slogans[4].id,
};

describe('resolveTodaySlogan, fixed order', () => {
  it("uses today's pending slot-0 reminder directly and caches it", () => {
    const result = resolveTodaySlogan({
      ...base,
      reminders: [reminder(10, at(0, 8), 0), reminder(11, at(1, 8), 0)],
    });
    expect(result.sloganId).toBe(slogans[10].id);
    expect(result.cache).toEqual({ dateKey: TODAY_KEY, sloganId: slogans[10].id });
  });

  it("steps back to today's slot 0 when earlier slots already fired", () => {
    // perDay=2; today's 06:00 slot already fired, 20:00 slot still pending.
    const result = resolveTodaySlogan({
      ...base,
      perDay: 2,
      now: new Date(2026, 7, 3, 12, 0),
      reminders: [reminder(10, at(0, 20), 1), reminder(11, at(1, 6), 0)],
    });
    expect(result.sloganId).toBe(slogans[9].id);
  });

  it("derives today's slogan from tomorrow's reminder after all of today fired", () => {
    const result = resolveTodaySlogan({
      ...base,
      perDay: 2,
      now: new Date(2026, 7, 3, 23, 0),
      reminders: [reminder(10, at(1, 6), 0), reminder(11, at(1, 20), 1)],
    });
    // Tomorrow slot 0 is two sequence steps after today slot 0.
    expect(result.sloganId).toBe(slogans[8].id);
  });

  it('wraps around the start of the slogan list when stepping back', () => {
    const result = resolveTodaySlogan({
      ...base,
      now: new Date(2026, 7, 3, 23, 0),
      reminders: [reminder(0, at(1, 8), 0)],
    });
    expect(result.sloganId).toBe(slogans[slogans.length - 1].id);
  });

  it('prefers the pending stack over a stale same-day cache', () => {
    // A settings change rebuilt the stack; the cache still holds the old slogan.
    const result = resolveTodaySlogan({
      ...base,
      reminders: [reminder(20, at(0, 8), 0)],
      cache: { dateKey: TODAY_KEY, sloganId: slogans[3].id },
    });
    expect(result.sloganId).toBe(slogans[20].id);
  });

  it('falls back to cache, then lastSloganId, when nothing is scheduled', () => {
    const cached = resolveTodaySlogan({
      ...base,
      cache: { dateKey: TODAY_KEY, sloganId: slogans[7].id },
    });
    expect(cached.sloganId).toBe(slogans[7].id);

    const bare = resolveTodaySlogan({ ...base });
    expect(bare.sloganId).toBe(slogans[4].id);
    expect(bare.cache).toBeNull();
  });
});

describe('resolveTodaySlogan, random order', () => {
  const random = { ...base, order: 'random' as const };

  it("uses today's cache once the day's slogan is known", () => {
    const result = resolveTodaySlogan({
      ...random,
      reminders: [reminder(30, at(0, 20), 1)],
      cache: { dateKey: TODAY_KEY, sloganId: slogans[12].id },
    });
    expect(result.sloganId).toBe(slogans[12].id);
  });

  it('ignores a cache from a previous day', () => {
    const yesterdayKey = localDateKey(new Date(2026, 7, 2));
    const result = resolveTodaySlogan({
      ...random,
      reminders: [reminder(30, at(0, 8), 0)],
      cache: { dateKey: yesterdayKey, sloganId: slogans[12].id },
    });
    expect(result.sloganId).toBe(slogans[30].id);
    expect(result.cache).toEqual({ dateKey: TODAY_KEY, sloganId: slogans[30].id });
  });

  it("without a cache, uses today's earliest pending reminder", () => {
    const result = resolveTodaySlogan({
      ...random,
      reminders: [
        reminder(31, at(0, 20), 1),
        reminder(30, at(0, 9), 0),
        reminder(32, at(1, 9), 0),
      ],
    });
    expect(result.sloganId).toBe(slogans[30].id);
  });

  it('falls back to lastSloganId after all of today fired', () => {
    const result = resolveTodaySlogan({
      ...random,
      now: new Date(2026, 7, 3, 23, 0),
      reminders: [reminder(32, at(1, 9), 0)],
    });
    expect(result.sloganId).toBe(slogans[4].id);
  });
});

describe('resolveTodaySlogan, robustness', () => {
  it('ignores reminders that already fired', () => {
    const result = resolveTodaySlogan({
      ...base,
      reminders: [reminder(2, at(0, 6), 0)], // 06:00 < now (07:00)
    });
    expect(result.sloganId).toBe(slogans[4].id);
  });

  it('recovers from an unknown cached slogan id', () => {
    const result = resolveTodaySlogan({
      ...base,
      cache: { dateKey: TODAY_KEY, sloganId: 99999 },
    });
    expect(result.sloganId).toBe(slogans[0].id);
  });
});
