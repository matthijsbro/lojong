import React, { useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { slogans, POINT_LABELS } from '@/content/slogans';
import { Language, ui } from '@/i18n/ui';
import { ThemeColors, scaled } from '@/theme/themes';

type Props = {
  language: Language;
  colors: ThemeColors;
  fontScale: number;
  // Card the deck unfolds from / folds back into.
  currentSloganId: number;
  // 0 = folded into the card, 1 = deck fully open. Driven by HomeScreen.
  progress: Animated.Value;
  onSelectSlogan: (sloganId: number) => void;
};

export function SloganDeck({
  language,
  colors,
  fontScale,
  currentSloganId,
  progress,
  onSelectSlogan,
}: Props) {
  const t = ui[language];
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  const currentIndex = Math.max(
    0,
    slogans.findIndex((slogan) => slogan.id === currentSloganId),
  );

  // Accordion offsets: at progress 0 every row sits at the current row's
  // position; opening spreads them out to their natural places. Clamped so
  // far-away rows simply slide in from just beyond the viewport edges.
  const rowUnit = scaled(52, fontScale);
  const foldOffset = (index: number) => {
    const rows = currentIndex - index;
    return Math.max(-560, Math.min(560, rows * rowUnit));
  };

  const scrollRef = useRef<ScrollView>(null);
  // Approximation until the real layout arrives; row onLayout can fire first.
  const viewportHeight = useRef(Dimensions.get('window').height * 0.7);
  const scrolledToCurrent = useRef(false);

  // Measured on the animated row WRAPPERS — they are the direct children of
  // the scroll content, so their layout `y` is in content coordinates (the
  // rows themselves report y relative to their wrapper, which is always ~0).
  // The deck opens with the current row mid-viewport, right where the card
  // visually folds into it.
  const handleRowLayout = (index: number) => (event: LayoutChangeEvent) => {
    if (index !== currentIndex || scrolledToCurrent.current) return;
    scrolledToCurrent.current = true;
    const y = event.nativeEvent.layout.y - Math.max(0, viewportHeight.current * 0.5 - rowUnit);
    scrollRef.current?.scrollTo({ y: Math.max(0, y), animated: false });
  };

  const backdropOpacity = progress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [0, 1, 1],
  });
  const titleOpacity = progress.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0, 1],
  });
  const titleShift = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, { opacity: backdropOpacity }]}
      />
      <View
        style={StyleSheet.absoluteFill}
        onLayout={(event) => {
          viewportHeight.current = event.nativeEvent.layout.height;
        }}
      >
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
          <Animated.Text
            style={[
              styles.screenTitle,
              { opacity: titleOpacity, transform: [{ translateY: titleShift }] },
            ]}
          >
            {t.overviewTitle}
          </Animated.Text>
          {slogans.map((slogan, index) => {
            const isCurrent = index === currentIndex;
            const startsPoint = index === 0 || slogans[index - 1].point !== slogan.point;
            const translateY = progress.interpolate({
              inputRange: [0, 1],
              outputRange: [foldOffset(index), 0],
            });
            // Rows are fully transparent below ~0.2 progress so the deck is
            // completely gone before the unfolding card becomes visible —
            // the two never show at the same time.
            const opacity = progress.interpolate(
              isCurrent
                ? { inputRange: [0.15, 0.55, 1], outputRange: [0, 1, 1] }
                : { inputRange: [0, 0.25, 0.75, 1], outputRange: [0, 0, 1, 1] },
            );
            return (
              <Animated.View
                key={slogan.id}
                style={{ opacity, transform: [{ translateY }] }}
                onLayout={handleRowLayout(index)}
              >
                {startsPoint && (
                  <Text style={styles.pointHeader}>
                    {t.point} {slogan.point} · {POINT_LABELS[slogan.point][language]}
                  </Text>
                )}
                <TouchableOpacity
                  style={[styles.row, isCurrent && styles.rowCurrent]}
                  onPress={() => onSelectSlogan(slogan.id)}
                  accessibilityRole="button"
                >
                  <Text style={styles.rowNumber}>{slogan.id}</Text>
                  <Text style={[styles.rowText, isCurrent && styles.rowTextCurrent]}>
                    {slogan[language].slogan}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: c.background,
    },
    scroll: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    screenTitle: {
      fontSize: scaled(24, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginBottom: 8,
    },
    pointHeader: {
      fontSize: scaled(12, f),
      fontWeight: '600',
      color: c.accent,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 14,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      backgroundColor: c.surface,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
      marginBottom: 6,
    },
    rowCurrent: {
      borderWidth: 1,
      borderColor: c.accent,
    },
    rowNumber: {
      fontSize: scaled(13, f),
      fontWeight: '700',
      color: c.faint,
      minWidth: scaled(22, f),
      textAlign: 'right',
    },
    rowText: {
      flex: 1,
      fontSize: scaled(14, f),
      lineHeight: scaled(20, f),
      color: c.textPrimary,
    },
    rowTextCurrent: {
      fontWeight: '600',
    },
  });
