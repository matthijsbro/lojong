import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { appLicenseText, appLicenseTitle } from '@/content/appLicense';
import { Language, ui } from '@/i18n/ui';

type Props = {
  language: Language;
  onBack: () => void;
};

export function LicenseScreen({ language, onBack }: Props) {
  const t = ui[language];

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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f0e8',
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
    color: '#8b5e3c',
    fontWeight: '600',
  },
  scroll: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c1f0e',
  },
  meta: {
    fontSize: 13,
    lineHeight: 20,
    color: '#6f5338',
  },
  licenseText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#2c1f0e',
    fontFamily: 'Courier',
  },
});