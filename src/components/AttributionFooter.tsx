import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { getAttribution } from '@/content/attribution';
import { Language } from '@/i18n/ui';

type Props = {
  attributionKey: string;
  language: Language;
};

export function AttributionFooter({ attributionKey, language }: Props) {
  const attr = getAttribution(attributionKey);
  const title = language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;
  const translator = language === 'de' && attr.translatorDe ? attr.translatorDe : attr.translator;

  return (
    <View style={styles.container}>
      <Text style={styles.source}>
        {title} · {attr.author}
      </Text>
      <Text style={styles.translator}>trans. {translator}</Text>
      <Text style={styles.publisher}>{attr.source}</Text>
      <Text style={styles.license}>{attr.licenseId}</Text>
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
    marginTop: 4,
  },
});
