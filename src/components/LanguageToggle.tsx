import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Language } from '@/i18n/ui';

type Props = {
  language: Language;
  onToggle: () => void;
};

export function LanguageToggle({ language, onToggle }: Props) {
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

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8b5e3c',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8b5e3c',
    letterSpacing: 0.5,
  },
});
