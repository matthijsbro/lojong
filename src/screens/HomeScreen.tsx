import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { SloganCard } from '@/components/SloganCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useSettings } from '@/hooks/useSettings';
import { useActiveSlogans } from '@/hooks/useActiveSlogans';
import { ui } from '@/i18n/ui';
import { scheduleNotifications } from '@/notifications/scheduler';

type Props = {
  onOpenSettings: () => void;
  notificationSloganId?: number | null;
  onNotificationSloganHandled?: () => void;
};

export function HomeScreen({
  onOpenSettings,
  notificationSloganId = null,
  onNotificationSloganHandled,
}: Props) {
  const { settings, update, loaded } = useSettings();
  const [index, setIndex] = useState(0);
  const activeSlogans = useActiveSlogans(settings.order);
  const t = ui[settings.language];

  const persistCurrentSlogan = useCallback(
    async (nextIndex: number, shouldReschedule: boolean) => {
      const slogan = activeSlogans[nextIndex];
      if (!slogan) return;

      const nextSettings = await update({
        lastSloganIndex: nextIndex,
        lastSloganId: slogan.id,
      });

      if (shouldReschedule && nextSettings.notifMode !== 'off' && nextSettings.order === 'fixed') {
        await scheduleNotifications(nextSettings);
      }
    },
    [activeSlogans, update],
  );

  const showSloganById = useCallback(
    (sloganId: number, shouldReschedule: boolean) => {
      const nextIndex = activeSlogans.findIndex((slogan) => slogan.id === sloganId);
      if (nextIndex < 0) return;

      setIndex(nextIndex);
      void persistCurrentSlogan(nextIndex, shouldReschedule);
    },
    [activeSlogans, persistCurrentSlogan],
  );

  React.useEffect(() => {
    if (!loaded || activeSlogans.length === 0) return;

    const savedIndex = activeSlogans.findIndex((slogan) => slogan.id === settings.lastSloganId);
    if (savedIndex >= 0) {
      setIndex(savedIndex);
      return;
    }

    setIndex(Math.max(0, Math.min(activeSlogans.length - 1, settings.lastSloganIndex)));
  }, [activeSlogans, loaded, settings.lastSloganId, settings.lastSloganIndex]);

  React.useEffect(() => {
    if (!loaded || notificationSloganId == null) return;

    showSloganById(notificationSloganId, settings.order === 'fixed');
    onNotificationSloganHandled?.();
  }, [loaded, notificationSloganId, onNotificationSloganHandled, settings.order, showSloganById]);

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(activeSlogans.length - 1, nextIndex));
      setIndex(clamped);
      void persistCurrentSlogan(clamped, true);
    },
    [activeSlogans.length, persistCurrentSlogan],
  );

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ flex: 1 }} color="#8b5e3c" />
      </SafeAreaView>
    );
  }

  const currentSlogan = activeSlogans[index];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.appName}</Text>
        <View style={styles.headerActions}>
          <LanguageToggle
            language={settings.language}
            onToggle={() =>
              update({ language: settings.language === 'en' ? 'de' : 'en' })
            }
          />
          <TouchableOpacity
            onPress={onOpenSettings}
            style={styles.settingsButton}
            accessibilityLabel={t.settings}
          >
            <Text style={styles.settingsIcon}>&#x2699;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardArea}>
        <SloganCard
          slogan={currentSlogan}
          language={settings.language}
          index={index}
          total={activeSlogans.length}
        />
      </View>

      <View style={styles.nav}>
        <TouchableOpacity
          onPress={() => goTo(index - 1)}
          disabled={index === 0}
          style={[styles.navButton, index === 0 && styles.navButtonDisabled]}
          accessibilityLabel={t.previous}
        >
          <Text style={styles.navButtonText}>{t.previous}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goTo(index + 1)}
          disabled={index === activeSlogans.length - 1}
          style={[
            styles.navButton,
            index === activeSlogans.length - 1 && styles.navButtonDisabled,
          ]}
          accessibilityLabel={t.next}
        >
          <Text style={styles.navButtonText}>{t.next}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f0e8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4a3520',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 20,
    color: '#8b5e3c',
  },
  cardArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#8b5e3c',
  },
  navButtonDisabled: {
    backgroundColor: '#d4c4b0',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
