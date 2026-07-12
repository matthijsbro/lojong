import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appLicenseText, appLicenseTitle } from '@/content/appLicense';
import { Language, ui } from '@/i18n/ui';
import { useSettings } from '@/hooks/useSettings';
import { THEMES, ThemeColors } from '@/theme/themes';

type Props = {
  language: Language;
  onBack: () => void;
};

export function LicenseScreen({ language, onBack }: Props) {
  const t = ui[language];
  const { settings } = useSettings();
  const colors = THEMES[settings.theme];
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>&#x2190; {t.backLabel}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{appLicenseTitle}</Text>
        <Text style={styles.meta}>{t.licenseSourceNote}</Text>
        <Text style={styles.licenseText}>{appLicenseText}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors) =>
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
      fontSize: 16,
      color: c.accent,
      fontWeight: '600',
    },
    scroll: {
      padding: 20,
      gap: 12,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: c.textPrimary,
    },
    meta: {
      fontSize: 13,
      lineHeight: 20,
      color: c.textMuted,
    },
    licenseText: {
      fontSize: 12,
      lineHeight: 18,
      color: c.textPrimary,
      fontFamily: 'Courier',
    },
  });
