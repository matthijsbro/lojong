import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Slogan, POINT_LABELS } from '@/content/slogans';
import { Language, ui } from '@/i18n/ui';
import { ThemeColors, scaled } from '@/theme/themes';
import { AttributionFooter } from './AttributionFooter';
import { Markdown } from './Markdown';

type Props = {
  slogan: Slogan;
  language: Language;
  total: number;
  colors: ThemeColors;
  fontScale: number;
  onOpenCommentary: () => void;
};

export function SloganCard({
  slogan,
  language,
  total,
  colors,
  fontScale,
  onOpenCommentary,
}: Props) {
  const [showBack, setShowBack] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const t = ui[language];
  const content = slogan[language];
  const pointLabel = POINT_LABELS[slogan.point][language];
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  // Animate 0 → 1 → 0: card rotates to 90° (edge-on), content swaps, rotates back to 0°.
  const rotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'],
  });

  const handleFlip = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // First half: 0 → 0.5 (rotate to 90°)
    Animated.timing(flipAnim, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Swap content at the edge-on midpoint
      setShowBack((prev) => !prev);
      // Second half: 0.5 → 1 (rotate back to 0°)
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        flipAnim.setValue(0);
        isAnimating.current = false;
      });
    });
  };

  React.useEffect(() => {
    flipAnim.setValue(0);
    setShowBack(false);
    isAnimating.current = false;
  }, [slogan.id, flipAnim]);

  return (
    <Animated.View
      style={[
        styles.card,
        showBack ? styles.cardBack : styles.cardFront,
        { transform: [{ rotateY: rotate }] },
      ]}
    >
      {showBack ? (
        // The flip touchable lives INSIDE the ScrollView: a touchable parent
        // would steal drag gestures from the ScrollView on Android, making
        // the back unscrollable (drags would flip the card instead).
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={handleFlip} accessibilityRole="button">
            <View style={styles.backContent}>
              <Text style={styles.pointText}>{t.explanation}</Text>
              <Text style={styles.sloganSmall}>{content.slogan}</Text>
              <Markdown markdown={content.explanation} colors={colors} fontScale={fontScale} />
              <TouchableOpacity
                onPress={onOpenCommentary}
                style={styles.commentaryLink}
                accessibilityRole="button"
              >
                <Text style={styles.commentaryLinkText}>{t.readFullCommentary} &#x2192;</Text>
              </TouchableOpacity>
              <AttributionFooter
                attributionKey={slogan.attributionKey}
                language={language}
                colors={colors}
                fontScale={fontScale}
              />
              <Text style={styles.flipHint}>{t.backToSlogan}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
        // Same touchable-inside-ScrollView structure as the back: at large
        // font scales a long slogan can outgrow the card, and must scroll
        // rather than clip.
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={handleFlip} accessibilityRole="button">
            <View style={styles.frontContent}>
              <Text style={styles.pointText}>
                {t.point} {slogan.point} · {pointLabel}
              </Text>
              <Text style={styles.sloganText}>{content.slogan}</Text>
              <View>
                <Text style={styles.counter}>{slogan.id} {t.of} {total}</Text>
                <Text style={styles.flipHint}>{t.tapToFlip}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </Animated.View>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    card: {
      flex: 1,
      padding: 28,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    cardFront: {
      backgroundColor: c.surface,
    },
    cardBack: {
      backgroundColor: c.surfaceAlt,
    },
    frontContent: {
      // flexGrow (not flex: 1, which zeroes flexBasis and ignores intrinsic
      // content height): fills the card when content fits, exceeds it — and
      // scrolls — when the slogan outgrows the viewport.
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    scrollContent: {
      flexGrow: 1,
    },
    backContent: {
      flexGrow: 1,
    },
    pointText: {
      fontSize: scaled(12, f),
      fontWeight: '600',
      color: c.accent,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 20,
    },
    sloganText: {
      flexGrow: 1,
      fontSize: scaled(22, f),
      fontWeight: '500',
      color: c.textPrimary,
      lineHeight: scaled(32, f),
      textAlign: 'center',
      textAlignVertical: 'center',
      paddingVertical: 20,
    },
    sloganSmall: {
      fontSize: scaled(15, f),
      fontWeight: '600',
      color: c.textSecondary,
      marginBottom: 12,
      fontStyle: 'italic',
    },
    commentaryLink: {
      marginTop: 18,
      alignSelf: 'center',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: c.border,
    },
    commentaryLinkText: {
      fontSize: scaled(13, f),
      color: c.accent,
      fontWeight: '600',
    },
    counter: {
      fontSize: scaled(12, f),
      color: c.faint,
      textAlign: 'center',
    },
    flipHint: {
      fontSize: scaled(11, f),
      color: c.hint,
      textAlign: 'center',
      marginTop: 8,
    },
  });
