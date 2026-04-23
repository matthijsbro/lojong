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
};

export function SloganCard({ slogan, language, total }: Props) {
  const [showBack, setShowBack] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);

  const t = ui[language];
  const content = slogan[language];
  const pointLabel = POINT_LABELS[slogan.point][language];

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
    <TouchableWithoutFeedback onPress={handleFlip} accessibilityRole="button">
      <Animated.View style={[styles.card, showBack ? styles.cardBack : styles.cardFront, { transform: [{ rotateY: rotate }] }]}>
        {showBack ? (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.pointText}>{t.explanation}</Text>
            <Text style={styles.sloganSmall}>{content.slogan}</Text>
            <Text style={styles.explanationText}>{content.explanation}</Text>
            <AttributionFooter attributionKey={slogan.attributionKey} language={language} />
            <Text style={styles.flipHint}>{t.backToSlogan}</Text>
          </ScrollView>
        ) : (
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
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'space-between',
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
    color: '#3d2b14',
    lineHeight: 23,
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
