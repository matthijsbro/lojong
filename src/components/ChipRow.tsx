import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeColors, scaled, scaledBox } from '@/theme/themes';

export type ChipOption<T extends string | number> = {
  value: T;
  label: string;
  // Small color circle rendered before the label (used by the theme picker).
  swatchColor?: string;
};

type Props<T extends string | number> = {
  options: ChipOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  colors: ThemeColors;
  fontScale: number;
};

export function ChipRow<T extends string | number>({
  options,
  selected,
  onSelect,
  colors,
  fontScale,
}: Props<T>) {
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  return (
    <View style={styles.row}>
      {options.map(({ value, label, swatchColor }) => {
        const active = selected === value;
        const labelText = (
          <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
        );
        return (
          <TouchableOpacity
            key={String(value)}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(value)}
          >
            {swatchColor != null ? (
              <View style={styles.swatchContent}>
                <View style={[styles.swatch, { backgroundColor: swatchColor }]} />
                {labelText}
              </View>
            ) : (
              labelText
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    chip: {
      paddingVertical: 7,
      paddingHorizontal: 14,
      borderRadius: scaledBox(20, f),
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.surface,
    },
    chipActive: {
      backgroundColor: c.accent,
      borderColor: c.accent,
    },
    chipText: {
      fontSize: scaled(13, f),
      color: c.textSecondary,
    },
    chipTextActive: {
      color: c.onAccent,
      fontWeight: '600',
    },
    swatchContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    swatch: {
      width: scaledBox(14, f),
      height: scaledBox(14, f),
      borderRadius: scaledBox(7, f),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.textMuted,
    },
  });
