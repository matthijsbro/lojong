import React, { useMemo, useState, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  BackHandler,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SloganCard } from '@/components/SloganCard';
import { SloganDeck } from '@/components/SloganDeck';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useSettings } from '@/hooks/useSettings';
import { useActiveSlogans } from '@/hooks/useActiveSlogans';
import { useFontScale } from '@/hooks/useFontScale';
import { ui } from '@/i18n/ui';
import { THEMES, ThemeColors, scaled, scaledBox } from '@/theme/themes';

type Props = {
  onOpenSettings: () => void;
  onOpenCommentary: (sloganId: number) => void;
  // Slogan to jump to (from a notification tap).
  focusSloganId?: number | null;
  // Whether the focused card should start in the subdued notification-intro state.
  focusIntro?: boolean;
  onFocusHandled?: () => void;
};

export function HomeScreen({
  onOpenSettings,
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
  // The deck: the card folds accordion-style into its row in the full slogan
  // list, and unfolds from the row the user picks.
  const [deckVisible, setDeckVisible] = useState(false);
  const deckProgress = useRef(new Animated.Value(0)).current;
  // Horizontal offset of the card; prev/next slide the new card in from the
  // direction of travel.
  const slideAnim = useRef(new Animated.Value(0)).current;
  const activeSlogans = useActiveSlogans(settings.order);
  const t = ui[settings.language];
  const colors = THEMES[settings.theme];
  const fontScale = useFontScale(settings.fontSize);
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

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

  const openDeck = useCallback(() => {
    setDeckVisible(true);
    Animated.timing(deckProgress, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [deckProgress]);

  const closeDeck = useCallback(() => {
    Animated.timing(deckProgress, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setDeckVisible(false);
    });
  }, [deckProgress]);

  // While the deck is open, the Android back button/gesture folds it shut
  // instead of leaving the home screen. Registered after App's handler, so it
  // runs first and wins while the deck is visible.
  React.useEffect(() => {
    if (!deckVisible) return;

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      closeDeck();
      return true;
    });

    return () => sub.remove();
  }, [deckVisible, closeDeck]);

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
      if (clamped === index) return;

      // The new card enters slightly offset from the direction of travel.
      slideAnim.setValue((clamped > index ? 1 : -1) * 56);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();

      setIndex(clamped);
      setIntroSloganId(null);
      void persistCurrentSlogan(clamped);
    },
    [activeSlogans.length, index, persistCurrentSlogan, slideAnim],
  );

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator style={{ flex: 1 }} color={colors.accent} />
      </SafeAreaView>
    );
  }

  const currentSlogan = activeSlogans[index];

  // The card shrinks and fades into its deck row. Its opacity window ends
  // below where the deck rows' begins (see SloganDeck), so card and rows are
  // never visible at the same time in either direction.
  const cardOpacity = deckProgress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [1, 0, 0],
  });
  const slideOpacity = slideAnim.interpolate({
    inputRange: [-56, 0, 56],
    outputRange: [0.25, 1, 0.25],
  });
  const cardScaleX = deckProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.94],
  });
  const cardScaleY = deckProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.1],
  });
  const sideButtonOpacity = deckProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });
  const deckChevronRotate = deckProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{t.appName}</Text>
        <View style={styles.headerActions}>
          <LanguageToggle
            language={settings.language}
            colors={colors}
            fontScale={fontScale}
            onToggle={() =>
              update({ language: settings.language === 'en' ? 'de' : 'en' })
            }
          />
          <TouchableOpacity
            onPress={onOpenSettings}
            style={styles.iconButton}
            accessibilityLabel={t.settings}
          >
            <Text style={styles.iconText}>&#x2630;</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardArea}>
        <Animated.View
          style={[
            styles.cardWrap,
            {
              opacity: Animated.multiply(cardOpacity, slideOpacity),
              transform: [
                { translateX: slideAnim },
                { scaleX: cardScaleX },
                { scaleY: cardScaleY },
              ],
            },
          ]}
        >
          <SloganCard
            slogan={currentSlogan}
            language={settings.language}
            total={activeSlogans.length}
            colors={colors}
            fontScale={fontScale}
            onOpenCommentary={() => onOpenCommentary(currentSlogan.id)}
            intro={introSloganId != null && currentSlogan.id === introSloganId}
          />
        </Animated.View>

        {deckVisible && (
          <SloganDeck
            language={settings.language}
            colors={colors}
            fontScale={fontScale}
            currentSloganId={currentSlogan.id}
            progress={deckProgress}
            onSelectSlogan={(sloganId) => {
              showSloganById(sloganId);
              setIntroSloganId(null);
              closeDeck();
            }}
          />
        )}
      </View>

      <View style={styles.nav}>
        <Animated.View style={{ opacity: sideButtonOpacity }}>
          <TouchableOpacity
            onPress={() => goTo(index - 1)}
            disabled={deckVisible || index === 0}
            style={[styles.navButton, index === 0 && styles.navButtonDisabled]}
            accessibilityLabel={t.previous}
          >
            <View style={[styles.chevron, styles.chevronLeft]} />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          onPress={() => (deckVisible ? closeDeck() : openDeck())}
          style={styles.navButton}
          accessibilityLabel={deckVisible ? t.backLabel : t.overviewOpenLabel}
        >
          <Animated.View style={{ transform: [{ rotate: deckChevronRotate }] }}>
            <View style={[styles.chevron, styles.chevronDown]} />
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={{ opacity: sideButtonOpacity }}>
          <TouchableOpacity
            onPress={() => goTo(index + 1)}
            disabled={deckVisible || index === activeSlogans.length - 1}
            style={[
              styles.navButton,
              index === activeSlogans.length - 1 && styles.navButtonDisabled,
            ]}
            accessibilityLabel={t.next}
          >
            <View style={[styles.chevron, styles.chevronRight]} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
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
      fontSize: scaled(20, f),
      fontWeight: '700',
      color: c.textSecondary,
      letterSpacing: 1,
      flexShrink: 1,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0,
    },
    iconButton: {
      padding: 4,
    },
    iconText: {
      fontSize: scaled(20, f),
      color: c.accent,
    },
    cardArea: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    cardWrap: {
      flex: 1,
    },
    nav: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 24,
      paddingTop: 12,
    },
    navButton: {
      width: scaledBox(64, f),
      height: scaledBox(44, f),
      borderRadius: scaledBox(22, f),
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    navButtonDisabled: {
      opacity: 0.35,
    },
    // Chevrons are drawn (two borders of a rotated square) instead of glyphs,
    // so they render and center identically on every platform font. The
    // margin offsets compensate for the vertex sitting off the layout center.
    chevron: {
      width: scaledBox(12, f),
      height: scaledBox(12, f),
      borderColor: c.accent,
      borderRightWidth: 2,
      borderBottomWidth: 2,
    },
    chevronDown: {
      transform: [{ rotate: '45deg' }],
      marginTop: -scaledBox(4, f),
    },
    chevronLeft: {
      transform: [{ rotate: '135deg' }],
      marginLeft: scaledBox(4, f),
    },
    chevronRight: {
      transform: [{ rotate: '-45deg' }],
      marginLeft: -scaledBox(4, f),
    },
  });
