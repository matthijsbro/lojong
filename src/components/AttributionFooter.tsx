import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, View } from 'react-native';
import { getAttribution } from '@/content/attribution';
import { Language } from '@/i18n/ui';

type Props = {
  attributionKey: string;
  language: Language;
};

export function AttributionFooter({ attributionKey, language }: Props) {
  const attr = getAttribution(attributionKey);
  const title = language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;

  const handlePress = () => {
    Linking.openURL(attr.url).catch(() => {/* ignore */});
  };

  const handleLicensePress = () => {
    Linking.openURL(attr.licenseUrl).catch(() => {/* ignore */});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} accessibilityRole="link">
        <Text style={styles.source}>
          {title} · {attr.author}
        </Text>
        <Text style={styles.translator}>trans. {attr.translator}</Text>
        <Text style={styles.publisher}>{attr.source}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLicensePress} accessibilityRole="link">
        <Text style={styles.license}>{attr.licenseId}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#c4b49a',
    gap: 2,
  },
  source: {
    fontSize: 11,
    color: '#8b5e3c',
    fontStyle: 'italic',
  },
  translator: {
    fontSize: 11,
    color: '#8b5e3c',
  },
  publisher: {
    fontSize: 11,
    color: '#8b5e3c',
  },
  license: {
    fontSize: 11,
    color: '#8b5e3c',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});
