import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { getAttribution } from '@/content/attribution';
import { Language } from '@/i18n/ui';
import { ThemeColors, THEMES } from '@/theme/themes';

type Props = {
  attributionKey: string;
  language: Language;
  colors?: ThemeColors;
};

export function AttributionFooter({ attributionKey, language, colors = THEMES.warm }: Props) {
  const attr = getAttribution(attributionKey);
  const title = language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;
  const translator = language === 'de' && attr.translatorDe ? attr.translatorDe : attr.translator;
  const styles = useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={[styles.line, styles.title]}>
        {title} · {attr.author}
      </Text>
      <Text style={styles.line}>trans. {translator}</Text>
      <Text style={styles.line}>{attr.source}</Text>
      <Text style={[styles.line, styles.license]}>{attr.licenseId}</Text>
    </View>
  );
}

const makeStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingTop: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.border,
      gap: 2,
    },
    line: {
      fontSize: 11,
      color: c.accent,
    },
    title: {
      fontStyle: 'italic',
    },
    license: {
      marginTop: 4,
    },
  });
