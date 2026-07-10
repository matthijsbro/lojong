import { AppSettings, DEFAULT_SETTINGS } from '@/store/settings';
import { slogans } from '@/content/slogans';

type FakeRequest = {
  identifier: string;
  content: { title: string; body: string; data: Record<string, unknown> };
  trigger: { date: Date };
};

let mockScheduled: FakeRequest[] = [];
let mockIdCounter = 0;

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-notifications', () => ({
  setNotificationChannelAsync: jest.fn(async () => undefined),
  getPermissionsAsync: jest.fn(async () => ({ status: 'granted', canAskAgain: true })),
  requestPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  cancelAllScheduledNotificationsAsync: jest.fn(async () => {
    mockScheduled = [];
  }),
  dismissAllNotificationsAsync: jest.fn(async () => undefined),
  getAllScheduledNotificationsAsync: jest.fn(async () => mockScheduled.map((s) => ({ ...s }))),
  scheduleNotificationAsync: jest.fn(async (req: { content: FakeRequest['content']; trigger: { date: Date } }) => {
    const identifier = `fake-${mockIdCounter++}`;
    mockScheduled.push({ identifier, content: req.content, trigger: req.trigger });
    return identifier;
  }),
  setNotificationHandler: jest.fn(),
  AndroidImportance: { HIGH: 4 },
  AndroidNotificationPriority: { HIGH: 'high' },
  SchedulableTriggerInputTypes: { DATE: 'date' },
}));

import {
  scheduleNotifications,
  ensureNotificationsScheduled,
} from '@/notifications/scheduler';

const baseSettings: AppSettings = {
  ...DEFAULT_SETTINGS,
  notifMode: 'fixed',
  notifTime: '08:00',
  lastReminderSloganId: 1,
};

const dayKey = (r: FakeRequest) => new Date(r.content.data.fireAt as number).toDateString();

beforeEach(() => {
  mockScheduled = [];
  mockIdCounter = 0;
});

describe('scheduleNotifications', () => {
  it('schedules a 60-day stack with one reminder per day', async () => {
    const result = await scheduleNotifications(baseSettings);
    expect(result).toBe('scheduled');
    expect(mockScheduled).toHaveLength(60);

    const days = new Set(mockScheduled.map(dayKey));
    expect(days.size).toBe(60);
  });

  it('continues the slogan sequence and wraps around the end of the stack', async () => {
    await scheduleNotifications({ ...baseSettings, lastReminderSloganId: slogans.length - 1 });

    const ids = mockScheduled.map((r) => r.content.data.sloganId);
    expect(ids[0]).toBe(slogans.length); // the one after lastReminderSloganId
    expect(ids[1]).toBe(1); // wrapped to the start
    expect(ids[2]).toBe(2);
  });

  it('cancels everything when notifications are off', async () => {
    await scheduleNotifications(baseSettings);
    const result = await scheduleNotifications({ ...baseSettings, notifMode: 'off' });
    expect(result).toBe('disabled');
    expect(mockScheduled).toHaveLength(0);
  });
});

describe('ensureNotificationsScheduled', () => {
  it('reports unchanged when a healthy full stack exists', async () => {
    await scheduleNotifications(baseSettings);
    const result = await ensureNotificationsScheduled(baseSettings);
    expect(result).toBe('unchanged');
    expect(mockScheduled).toHaveLength(60);
  });

  it('rebuilds when pending reminders lack our metadata (legacy stack)', async () => {
    mockScheduled.push({
      identifier: 'legacy',
      content: { title: 'Lojong', body: 'old', data: { sloganId: 3 } },
      trigger: { date: new Date() },
    });

    const result = await ensureNotificationsScheduled(baseSettings);
    expect(result).toBe('scheduled');
    expect(mockScheduled).toHaveLength(60);
    expect(mockScheduled.every((r) => typeof r.content.data.fireAt === 'number')).toBe(true);
  });

  it('tops up a partially consumed stack, continuing the sequence', async () => {
    await scheduleNotifications(baseSettings);
    // Simulate the first 5 reminders having fired.
    const fired = mockScheduled.slice(0, 5);
    mockScheduled = mockScheduled.slice(5);

    const result = await ensureNotificationsScheduled(baseSettings);
    expect(result).toBe('scheduled');
    expect(mockScheduled).toHaveLength(60);

    // No day may carry two reminders, and fired days must not be rescheduled.
    const days = mockScheduled.map(dayKey);
    expect(new Set(days).size).toBe(60);
    for (const r of fired) {
      expect(days).not.toContain(dayKey(r));
    }

    // Sequence continues without repeating what was already scheduled.
    const ids = mockScheduled.map((r) => r.content.data.sloganId as number);
    const lastKeptIndex = slogans.findIndex((s) => s.id === ids[54]);
    expect(ids[55]).toBe(slogans[(lastKeptIndex + 1) % slogans.length].id);
  });

  it('rebuilds when settings changed since the stack was created', async () => {
    await scheduleNotifications(baseSettings);
    const firstBody = mockScheduled[0].content.body;

    const result = await ensureNotificationsScheduled({ ...baseSettings, language: 'de' });
    expect(result).toBe('scheduled');
    expect(mockScheduled).toHaveLength(60);
    expect(mockScheduled[0].content.body).not.toBe(firstBody);
  });

  it('never produces duplicate days under concurrent scheduling calls', async () => {
    await Promise.all([
      scheduleNotifications(baseSettings),
      ensureNotificationsScheduled(baseSettings),
      ensureNotificationsScheduled(baseSettings),
      scheduleNotifications(baseSettings),
    ]);

    expect(mockScheduled).toHaveLength(60);
    expect(new Set(mockScheduled.map(dayKey)).size).toBe(60);
  });
});
