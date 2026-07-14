import React, { useMemo, useRef } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { slogans, POINT_LABELS } from '@/content/slogans';
import { useSettings } from '@/hooks/useSettings';
import { ui } from '@/i18n/ui';
import { AttributionFooter } from '@/components/AttributionFooter';
import { FONT_SCALES, THEMES, ThemeColors, scaled } from '@/theme/themes';

type Props = {
  // The card the reader came from; the text opens scrolled to its section.
  initialSloganId: number | null;
  onBack: () => void;
};

export function CommentaryScreen({ initialSloganId, onBack }: Props) {
  const { settings } = useSettings();
  const t = ui[settings.language];
  const colors = THEMES[settings.theme];
  const fontScale = FONT_SCALES[settings.fontSize];
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  const scrollRef = useRef<ScrollView>(null);
  const scrolledToInitial = useRef(false);

  // Sections are direct children of the scroll content, so their layout `y`
  // is in content coordinates and can be scrolled to directly.
  const handleSectionLayout = (sloganId: number) => (event: LayoutChangeEvent) => {
    if (sloganId !== initialSloganId || scrolledToInitial.current) return;
    scrolledToInitial.current = true;
    scrollRef.current?.scrollTo({ y: event.nativeEvent.layout.y, animated: false });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>&#x2190; {t.backLabel}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
        <Text style={styles.screenTitle}>{t.commentaryTitle}</Text>
        {slogans.map((slogan, index) => {
          const content = slogan[settings.language];
          const startsPoint = index === 0 || slogans[index - 1].point !== slogan.point;
          const isInitial = slogan.id === initialSloganId;
          return (
            <View key={slogan.id} onLayout={handleSectionLayout(slogan.id)}>
              {startsPoint && (
                <View style={styles.pointHeader}>
                  <Text style={styles.pointHeaderText}>
                    {t.point} {slogan.point} · {POINT_LABELS[slogan.point][settings.language]}
                  </Text>
                </View>
              )}
              {/* Delimiter: marks where the commentary moves on to the next slogan. */}
              <View style={styles.delimiter}>
                <View style={styles.delimiterLine} />
                <Text style={[styles.delimiterLabel, isInitial && styles.delimiterLabelActive]}>
                  {t.sloganWord} {slogan.id} · {content.slogan}
                </Text>
              </View>
              {content.contextBefore ? (
                <Text style={styles.body}>{content.contextBefore}</Text>
              ) : null}
              <View style={styles.quote}>
                <Text style={styles.body}>{content.explanation}</Text>
              </View>
              {content.contextAfter ? (
                <Text style={styles.body}>{content.contextAfter}</Text>
              ) : null}
            </View>
          );
        })}
        <AttributionFooter attributionKey="commentary" language={settings.language} colors={colors} />
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: c.background,
    },
    topBar: {
      paddingHorizontal: 20,
      paddingTop: 8,
    },
    backButton: {
      paddingVertical: 6,
    },
    backText: {
      fontSize: scaled(16, f),
      color: c.accent,
      fontWeight: '600',
    },
    scroll: {
      padding: 20,
      paddingTop: 8,
    },
    screenTitle: {
      fontSize: scaled(24, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginBottom: 12,
    },
    pointHeader: {
      marginTop: 24,
      marginBottom: 4,
    },
    pointHeaderText: {
      fontSize: scaled(13, f),
      fontWeight: '700',
      color: c.accent,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    delimiter: {
      marginTop: 18,
      marginBottom: 10,
      gap: 8,
    },
    delimiterLine: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: c.border,
    },
    delimiterLabel: {
      fontSize: scaled(14, f),
      lineHeight: scaled(20, f),
      fontWeight: '600',
      fontStyle: 'italic',
      color: c.textSecondary,
    },
    delimiterLabelActive: {
      color: c.accent,
    },
    body: {
      fontSize: scaled(15, f),
      lineHeight: scaled(24, f),
      color: c.textPrimary,
      marginBottom: 8,
    },
    quote: {
      borderLeftWidth: 3,
      borderLeftColor: c.highlight,
      paddingLeft: 12,
      marginBottom: 8,
    },
  });
