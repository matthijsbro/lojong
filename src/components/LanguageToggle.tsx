import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Language } from '@/i18n/ui';
import { ThemeColors, THEMES, scaled } from '@/theme/themes';

type Props = {
  language: Language;
  onToggle: () => void;
  colors?: ThemeColors;
  fontScale?: number;
};

export function LanguageToggle({
  language,
  onToggle,
  colors = THEMES.warm,
  fontScale = 1,
}: Props) {
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={styles.button}
      accessibilityLabel={language === 'en' ? 'Switch to German' : 'Auf Englisch wechseln'}
      accessibilityRole="button"
    >
      <Text style={styles.label}>{language === 'en' ? 'DE' : 'EN'}</Text>
    </TouchableOpacity>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: c.accent,
    },
    label: {
      fontSize: scaled(13, f),
      fontWeight: '600',
      color: c.accent,
      letterSpacing: 0.5,
    },
  });
