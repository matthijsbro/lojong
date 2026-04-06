import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '@/i18n/ui';

export type NotifMode = 'off' | 'fixed' | 'random';
export type Order = 'fixed' | 'random';

export type AppSettings = {
  language: Language;
  order: Order;
  notifMode: NotifMode;
  notifTime: string; // 'HH:MM', used when notifMode === 'fixed'
  lastSloganIndex: number;
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'en',
  order: 'fixed',
  notifMode: 'off',
  notifTime: '08:00',
  lastSloganIndex: 0,
};

const STORAGE_KEY = '@lojong_settings';

export async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
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
