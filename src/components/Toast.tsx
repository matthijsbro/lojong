import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { ThemeColors, scaled, scaledBox } from '@/theme/themes';

type Props = {
  message: string | null;
  onDismiss: () => void;
  colors: ThemeColors;
  fontScale: number;
};

// Minimal self-dismissing toast: fades and rises in near the top of the
// screen, lingers, fades out. Never intercepts touches.
export function Toast({ message, onDismiss, colors, fontScale }: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  useEffect(() => {
    if (message == null) return;

    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(anim, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onDismiss();
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, anim, onDismiss]);

  if (message == null) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.wrap,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    wrap: {
      position: 'absolute',
      top: scaledBox(64, f),
      left: 20,
      right: 20,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 14,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
    text: {
      fontSize: scaled(15, f),
      lineHeight: scaled(21, f),
      color: c.textPrimary,
      textAlign: 'center',
    },
  });
