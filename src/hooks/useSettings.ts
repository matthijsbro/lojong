import { useState, useEffect, useCallback } from 'react';
import { AppSettings, DEFAULT_SETTINGS, loadSettings, saveSettings } from '@/store/settings';

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

  const update = useCallback(async (patch: Partial<AppSettings>) => {
    const nextSettings = { ...settings, ...patch };
    return replace(nextSettings);
  }, [replace, settings]);

  return { settings, update, replace, loaded };
}
