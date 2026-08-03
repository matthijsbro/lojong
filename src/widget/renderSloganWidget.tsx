import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import type { WidgetRepresentation } from 'react-native-android-widget';
import { slogans } from '@/content/slogans';
import { loadSettings } from '@/store/settings';
import { remindersPerDay } from '@/notifications/scheduler';
import {
  findSloganById,
  resolveTodaySlogan,
  WidgetCache,
  WidgetReminder,
} from '@/widget/currentSlogan';
import { DARK_PALETTE, LIGHT_PALETTE, SloganWidget } from '@/widget/SloganWidget';

const CACHE_KEY = '@lojong_widget';

async function loadPendingReminders(): Promise<WidgetReminder[]> {
  try {
    const pending = await Notifications.getAllScheduledNotificationsAsync();
    const reminders: WidgetReminder[] = [];
    for (const request of pending) {
      const data = request.content.data as Partial<WidgetReminder> | undefined;
      if (
        typeof data?.sloganId === 'number' &&
        typeof data?.fireAt === 'number' &&
        typeof data?.slot === 'number'
      ) {
        reminders.push({ sloganId: data.sloganId, fireAt: data.fireAt, slot: data.slot });
      }
    }
    return reminders;
  } catch {
    return [];
  }
}

async function loadCache(): Promise<WidgetCache | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WidgetCache>;
    if (typeof parsed.dateKey === 'string' && typeof parsed.sloganId === 'number') {
      return { dateKey: parsed.dateKey, sloganId: parsed.sloganId };
    }
    return null;
  } catch {
    return null;
  }
}

async function saveCache(cache: WidgetCache): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // The cache is an optimization; resolution works without it.
  }
}

/**
 * Load everything the widget needs and build its light/dark representation.
 * Runs both in the app and in the widget's headless JS task.
 */
export async function buildSloganWidget(): Promise<WidgetRepresentation> {
  const settings = await loadSettings();
  const reminders = await loadPendingReminders();
  const cache = await loadCache();

  const resolved = resolveTodaySlogan({
    now: new Date(),
    order: settings.order,
    perDay: remindersPerDay(settings),
    reminders,
    cache,
    lastSloganId: settings.lastSloganId,
  });

  if (resolved.cache && resolved.cache !== cache) {
    await saveCache(resolved.cache);
  }

  const slogan = findSloganById(resolved.sloganId);
  const text = slogan[settings.language].slogan;
  const caption = `Lojong · ${slogan.id}/${slogans.length}`;

  return {
    light: (
      <SloganWidget sloganId={slogan.id} slogan={text} caption={caption} palette={LIGHT_PALETTE} />
    ),
    dark: (
      <SloganWidget sloganId={slogan.id} slogan={text} caption={caption} palette={DARK_PALETTE} />
    ),
  };
}
