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

type Props = {
  slogan: Slogan;
  language: Language;
  total: number;
  colors: ThemeColors;
  fontScale: number;
  onOpenCommentary: () => void;
  // Card arrived via a notification tap: start subdued/translucent and become
  // fully present ("immersive") once the user engages by flipping it.
  intro?: boolean;
};

export function SloganCard({
  slogan,
  language,
  total,
  colors,
  fontScale,
  onOpenCommentary,
  intro = false,
}: Props) {
  const [showBack, setShowBack] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const immersionAnim = useRef(new Animated.Value(intro ? 0 : 1)).current;
  const contextAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const contextRevealed = useRef(false);
  const [contextHintVisible, setContextHintVisible] = useState(true);

  const t = ui[language];
  const content = slogan[language];
  const pointLabel = POINT_LABELS[slogan.point][language];
  const hasContext = Boolean(content.contextBefore || content.contextAfter);
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  // Animate 0 → 1 → 0: card rotates to 90° (edge-on), content swaps, rotates back to 0°.
  const rotate = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '90deg', '0deg'],
  });

  const handleFlip = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // Engaging with the card ends the subdued notification-intro state.
    Animated.timing(immersionAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
    }).start();

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

  // Once the reader starts scrolling, bring the surrounding commentary to
  // full strength so it can be read as continuous text.
  const revealContext = () => {
    if (contextRevealed.current) return;
    contextRevealed.current = true;
    setContextHintVisible(false);
    Animated.timing(contextAnim, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    flipAnim.setValue(0);
    setShowBack(false);
    isAnimating.current = false;
    immersionAnim.setValue(intro ? 0 : 1);
    contextAnim.setValue(0);
    contextRevealed.current = false;
    setContextHintVisible(true);
  }, [slogan.id, flipAnim, immersionAnim, contextAnim, intro]);

  const contextOpacity = contextAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.68, 1],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        showBack ? styles.cardBack : styles.cardFront,
        {
          opacity: immersionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.55, 1],
          }),
          transform: [
            { rotateY: rotate },
            {
              scale: immersionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.96, 1],
              }),
            },
          ],
        },
      ]}
    >
      {showBack ? (
        // The flip touchable lives INSIDE the ScrollView: a touchable parent
        // would steal drag gestures from the ScrollView on Android, making
        // the back unscrollable (drags would flip the card instead).
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={revealContext}
        >
          <TouchableWithoutFeedback onPress={handleFlip} accessibilityRole="button">
            <View style={styles.backContent}>
              <Text style={styles.pointText}>{t.explanation}</Text>
              <Text style={styles.sloganSmall}>{content.slogan}</Text>
              {content.contextBefore ? (
                <Animated.Text style={[styles.contextText, styles.contextBefore, { opacity: contextOpacity }]}>
                  {content.contextBefore}
                </Animated.Text>
              ) : null}
              <View style={hasContext ? styles.explanationHighlight : null}>
                <Text style={styles.explanationText}>{content.explanation}</Text>
              </View>
              {content.contextAfter ? (
                <Animated.Text style={[styles.contextText, styles.contextAfter, { opacity: contextOpacity }]}>
                  {content.contextAfter}
                </Animated.Text>
              ) : null}
              {hasContext && contextHintVisible ? (
                <Text style={styles.contextHint}>{t.contextHint}</Text>
              ) : null}
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
              />
              <Text style={styles.flipHint}>{t.backToSlogan}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      ) : (
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
      flex: 1,
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
      flex: 1,
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
    explanationText: {
      fontSize: scaled(15, f),
      color: c.textPrimary,
      lineHeight: scaled(23, f),
    },
    explanationHighlight: {
      borderLeftWidth: 3,
      borderLeftColor: c.highlight,
      paddingLeft: 12,
      marginVertical: 10,
    },
    contextText: {
      fontSize: scaled(15, f),
      color: c.textPrimary,
      lineHeight: scaled(23, f),
    },
    contextBefore: {
      marginBottom: 2,
    },
    contextAfter: {
      marginTop: 2,
    },
    contextHint: {
      fontSize: scaled(11, f),
      color: c.hintStrong,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 14,
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
