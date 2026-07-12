import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { slogans, POINT_LABELS } from '@/content/slogans';
import { useSettings } from '@/hooks/useSettings';
import { ui } from '@/i18n/ui';
import { FONT_SCALES, THEMES, ThemeColors, scaled } from '@/theme/themes';

type Props = {
  onSelectSlogan: (sloganId: number) => void;
  onBack: () => void;
};

export function OverviewScreen({ onSelectSlogan, onBack }: Props) {
  const { settings } = useSettings();
  const t = ui[settings.language];
  const colors = THEMES[settings.theme];
  const fontScale = FONT_SCALES[settings.fontSize];
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>&#x2190; {t.backLabel}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.screenTitle}>{t.overviewTitle}</Text>
        {slogans.map((slogan, index) => {
          const isCurrent = slogan.id === settings.lastSloganId;
          const startsPoint = index === 0 || slogans[index - 1].point !== slogan.point;
          return (
            <React.Fragment key={slogan.id}>
              {startsPoint && (
                <Text style={styles.pointHeader}>
                  {t.point} {slogan.point} · {POINT_LABELS[slogan.point][settings.language]}
                </Text>
              )}
              <TouchableOpacity
                style={[styles.row, isCurrent && styles.rowCurrent]}
                onPress={() => onSelectSlogan(slogan.id)}
                accessibilityRole="button"
              >
                <Text style={styles.rowNumber}>{slogan.id}</Text>
                <Text style={[styles.rowText, isCurrent && styles.rowTextCurrent]}>
                  {slogan[settings.language].slogan}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
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
      paddingTop: 8,
      gap: 6,
    },
    screenTitle: {
      fontSize: scaled(24, f),
      fontWeight: '700',
      color: c.textPrimary,
      marginBottom: 8,
    },
    pointHeader: {
      fontSize: scaled(12, f),
      fontWeight: '600',
      color: c.accent,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 14,
      marginBottom: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      backgroundColor: c.surface,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 14,
    },
    rowCurrent: {
      borderWidth: 1,
      borderColor: c.accent,
    },
    rowNumber: {
      fontSize: scaled(13, f),
      fontWeight: '700',
      color: c.faint,
      minWidth: 22,
      textAlign: 'right',
    },
    rowText: {
      flex: 1,
      fontSize: scaled(14, f),
      lineHeight: scaled(20, f),
      color: c.textPrimary,
    },
    rowTextCurrent: {
      fontWeight: '600',
    },
  });
