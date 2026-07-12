import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SloganCard } from '@/components/SloganCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useSettings } from '@/hooks/useSettings';
import { useActiveSlogans } from '@/hooks/useActiveSlogans';
import { ui } from '@/i18n/ui';
import { FONT_SCALES, THEMES, ThemeColors } from '@/theme/themes';

type Props = {
  onOpenSettings: () => void;
  onOpenOverview: () => void;
  onOpenCommentary: (sloganId: number) => void;
  // Slogan to jump to (from a notification tap or the overview screen).
  focusSloganId?: number | null;
  // Whether the focused card should start in the subdued notification-intro state.
  focusIntro?: boolean;
  onFocusHandled?: () => void;
};

export function HomeScreen({
  onOpenSettings,
  onOpenOverview,
  onOpenCommentary,
  focusSloganId = null,
  focusIntro = false,
  onFocusHandled,
}: Props) {
  const { settings, update, loaded } = useSettings();
  const [index, setIndex] = useState(0);
  // Slogan opened from a notification tap: its card starts subdued and turns
  // immersive when the user flips it. Cleared as soon as the user navigates.
  const [introSloganId, setIntroSloganId] = useState<number | null>(null);
  const activeSlogans = useActiveSlogans(settings.order);
  const t = ui[settings.language];
  const colors = THEMES[settings.theme];
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const persistCurrentSlogan = useCallback(
    async (nextIndex: number) => {
      const slogan = activeSlogans[nextIndex];
      if (!slogan) return;

      await update({
        lastSloganIndex: nextIndex,
        lastSloganId: slogan.id,
      });
    },
    [activeSlogans, update],
  );

  const showSloganById = useCallback(
    (sloganId: number) => {
      const nextIndex = activeSlogans.findIndex((slogan) => slogan.id === sloganId);
      if (nextIndex < 0) return;

      setIndex(nextIndex);
      void persistCurrentSlogan(nextIndex);
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
    if (!loaded || focusSloganId == null) return;

    showSloganById(focusSloganId);
    setIntroSloganId(focusIntro ? focusSloganId : null);
    onFocusHandled?.();
  }, [loaded, focusSloganId, focusIntro, onFocusHandled, showSloganById]);

  const goTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(activeSlogans.length - 1, nextIndex));
      setIndex(clamped);
      setIntroSloganId(null);
      void persistCurrentSlogan(clamped);
    },
    [activeSlogans.length, persistCurrentSlogan],
  );

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ flex: 1 }} color={colors.accent} />
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
            colors={colors}
            onToggle={() =>
              update({ language: settings.language === 'en' ? 'de' : 'en' })
            }
          />
          <TouchableOpacity
            onPress={onOpenOverview}
            style={styles.iconButton}
            accessibilityLabel={t.overviewOpenLabel}
          >
            <Text style={styles.iconText}>&#x2630;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onOpenSettings}
            style={styles.iconButton}
            accessibilityLabel={t.settings}
          >
            <Text style={styles.iconText}>&#x2699;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardArea}>
        <SloganCard
          slogan={currentSlogan}
          language={settings.language}
          total={activeSlogans.length}
          colors={colors}
          fontScale={FONT_SCALES[settings.fontSize]}
          onOpenCommentary={() => onOpenCommentary(currentSlogan.id)}
          intro={introSloganId != null && currentSlogan.id === introSloganId}
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

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: c.background,
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
      color: c.textSecondary,
      letterSpacing: 1,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconButton: {
      padding: 4,
    },
    iconText: {
      fontSize: 20,
      color: c.accent,
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
      backgroundColor: c.accent,
    },
    navButtonDisabled: {
      backgroundColor: c.disabled,
    },
    navButtonText: {
      color: c.onAccent,
      fontWeight: '600',
      fontSize: 14,
    },
  });
