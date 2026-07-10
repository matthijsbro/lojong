import { useState, useEffect, useCallback } from 'react';
import {
  AppSettings,
  DEFAULT_SETTINGS,
  loadSettings,
  patchSettings,
  saveSettings,
} from '@/store/settings';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then((s) => {
      setSettings(s);
      setLoaded(true);
    });
  }, []);

  const replace = useCallback(async (nextSettings: AppSettings) => {
    await saveSettings(nextSettings);
    setSettings(nextSettings);
    return nextSettings;
  }, []);

  // Merge against stored settings, not the captured state: a notification tap
  // on cold start can trigger an update before the initial load resolves, and
  // merging into default state would wipe the user's saved settings.
  const update = useCallback(async (patch: Partial<AppSettings>) => {
    const nextSettings = await patchSettings(patch);
    setSettings(nextSettings);
    return nextSettings;
  }, []);

  return { settings, update, replace, loaded };
}
