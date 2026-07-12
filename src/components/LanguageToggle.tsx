import React, { useMemo } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Language } from '@/i18n/ui';
import { ThemeColors, THEMES } from '@/theme/themes';

type Props = {
  language: Language;
  onToggle: () => void;
  colors?: ThemeColors;
};

export function LanguageToggle({ language, onToggle, colors = THEMES.warm }: Props) {
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: c.accent,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: c.accent,
      letterSpacing: 0.5,
    },
  });
