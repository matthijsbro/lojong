import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '@/i18n/ui';

export type NotifMode = 'off' | 'fixed' | 'random';
export type Order = 'fixed' | 'random';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ThemeName = 'warm' | 'sage' | 'dark' | 'contrast';

// Bounded so the scheduler can always keep several days of reminders
// pending without hitting iOS's 64-pending-notification cap.
export const MAX_REMINDERS_PER_DAY = 4;

export type AppSettings = {
  language: Language;
  order: Order;
  notifMode: NotifMode;
  notifTimes: string[]; // 'HH:MM' entries, used when notifMode === 'fixed'
  notifRandomCount: number; // reminders per day when notifMode === 'random'
  fontSize: FontSize;
  theme: ThemeName;
  lastSloganIndex: number;
  lastSloganId: number;
  lastReminderSloganId: number;
  onboardingCompleted: boolean;
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  order: 'fixed',
  // Daily reminders are on by default for fresh installs; users who saved
  // 'off' keep their stored choice.
  notifMode: 'fixed',
  notifTimes: ['08:00'],
  notifRandomCount: 1,
  fontSize: 'medium',
  theme: 'warm',
  lastSloganIndex: 0,
  lastSloganId: 1,
  lastReminderSloganId: 1,
  // Deliberately NOT backfilled in migrate(): installs from before this flag
  // existed go through onboarding once after updating.
  onboardingCompleted: false,
};

const STORAGE_KEY = '@lojong_settings';

type StoredSettings = Partial<AppSettings> & {
  // Pre-multiple-reminders versions stored a single time.
  notifTime?: string;
};

function migrate(parsed: StoredSettings): Partial<AppSettings> {
  const { notifTime, ...rest } = parsed;
  if (!Array.isArray(rest.notifTimes) && typeof notifTime === 'string') {
    rest.notifTimes = [notifTime];
  }
  return rest;
}

export async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...migrate(JSON.parse(raw)) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export async function patchSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
  const current = await loadSettings();
  const updated = { ...current, ...patch };
  await saveSettings(updated);
  return updated;
}
