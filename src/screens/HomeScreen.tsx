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

type Props = {
  onOpenSettings: () => void;
};

export function HomeScreen({ onOpenSettings }: Props) {
  const { settings, update, loaded } = useSettings();
  const [index, setIndex] = useState(0);
  const slogans = useActiveSlogans(settings.order);
  const t = ui[settings.language];

  React.useEffect(() => {
    if (loaded) setIndex(settings.lastSloganIndex);
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(slogans.length - 1, nextIndex));
      setIndex(clamped);
      update({ lastSloganIndex: clamped });
    },
    [slogans.length, update],
  );

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ flex: 1 }} color="#8b5e3c" />
      </SafeAreaView>
    );
  }

  const currentSlogan = slogans[index];

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
          total={slogans.length}
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
          disabled={index === slogans.length - 1}
          style={[
            styles.navButton,
            index === slogans.length - 1 && styles.navButtonDisabled,
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
