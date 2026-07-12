import { useState, useEffect, useCallback } from 'react';
import {
  AppSettings,
  DEFAULT_SETTINGS,
  loadSettings,
  patchSettings,
  saveSettings,
} from '@/store/settings';

// All useSettings() instances share one snapshot, so a save on one screen
// (e.g. picking a color scheme in Settings) is reflected everywhere
// immediately instead of only after that screen remounts.
let snapshot: AppSettings | null = null;
let initialLoad: Promise<AppSettings> | null = null;
const listeners = new Set<(settings: AppSettings) => void>();

function publish(next: AppSettings): void {
  snapshot = next;
  listeners.forEach((listener) => listener(next));
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(snapshot ?? DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(snapshot != null);

  useEffect(() => {
    const listener = (next: AppSettings) => {
      setSettings(next);
      setLoaded(true);
    };
    listeners.add(listener);

    if (snapshot != null) {
      listener(snapshot);
    } else {
      initialLoad ??= loadSettings();
      void initialLoad.then((loadedSettings) => {
        // A save may have happened while loading; never clobber it.
        if (snapshot == null) publish(loadedSettings);
      });
    }

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const replace = useCallback(async (nextSettings: AppSettings) => {
    await saveSettings(nextSettings);
    publish(nextSettings);
    return nextSettings;
  }, []);

  // Merge against stored settings, not the captured state: a notification tap
  // on cold start can trigger an update before the initial load resolves, and
  // merging into default state would wipe the user's saved settings.
  const update = useCallback(async (patch: Partial<AppSettings>) => {
    const nextSettings = await patchSettings(patch);
    publish(nextSettings);
    return nextSettings;
  }, []);

  return { settings, update, replace, loaded };
}
