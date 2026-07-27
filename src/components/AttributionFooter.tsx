import React, { useMemo } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { getAttribution } from '@/content/attribution';
import { Language } from '@/i18n/ui';
import { ThemeColors, THEMES, scaled } from '@/theme/themes';

type Props = {
  attributionKey: string;
  language: Language;
  colors?: ThemeColors;
  fontScale?: number;
};

export function AttributionFooter({
  attributionKey,
  language,
  colors = THEMES.warm,
  fontScale = 1,
}: Props) {
  const attr = getAttribution(attributionKey);
  const title = language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;
  const translator = language === 'de' && attr.translatorDe ? attr.translatorDe : attr.translator;
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

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

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      paddingTop: 12,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.border,
      gap: 2,
    },
    line: {
      fontSize: scaled(11, f),
      color: c.accent,
    },
    title: {
      fontStyle: 'italic',
    },
    license: {
      marginTop: 4,
    },
  });
