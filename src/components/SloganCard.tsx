import React, { useRef, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Slogan, POINT_LABELS } from '@/content/slogans';
import { Language, ui } from '@/i18n/ui';
import { AttributionFooter } from './AttributionFooter';

type Props = {
  slogan: Slogan;
  language: Language;
  total: number;
  // Card arrived via a notification tap: start subdued/translucent and become
  // fully present ("immersive") once the user engages by flipping it.
  intro?: boolean;
};

export function SloganCard({ slogan, language, total, intro = false }: Props) {
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
              <AttributionFooter attributionKey={slogan.attributionKey} language={language} />
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

const CARD_BG = '#fdf8f0';
const CARD_BACK_BG = '#f5efe2';

const styles = StyleSheet.create({
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
    backgroundColor: CARD_BG,
  },
  cardBack: {
    backgroundColor: CARD_BACK_BG,
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
    fontSize: 12,
    fontWeight: '600',
    color: '#8b5e3c',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  sloganText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '500',
    color: '#2c1f0e',
    lineHeight: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingVertical: 20,
  },
  sloganSmall: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4a3520',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  explanationText: {
    fontSize: 15,
    color: '#2c1f0e',
    lineHeight: 23,
  },
  explanationHighlight: {
    borderLeftWidth: 3,
    borderLeftColor: '#c9a87c',
    paddingLeft: 12,
    marginVertical: 10,
  },
  contextText: {
    fontSize: 15,
    color: '#2c1f0e',
    lineHeight: 23,
  },
  contextBefore: {
    marginBottom: 2,
  },
  contextAfter: {
    marginTop: 2,
  },
  contextHint: {
    fontSize: 11,
    color: '#9c7a52',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 14,
  },
  counter: {
    fontSize: 12,
    color: '#a0856a',
    textAlign: 'center',
  },
  flipHint: {
    fontSize: 11,
    color: '#b89a7a',
    textAlign: 'center',
    marginTop: 8,
  },
});
