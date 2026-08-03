import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

// Widgets follow the system light/dark mode rather than the in-app theme:
// they sit on the launcher next to other widgets, not inside the app. The
// palettes mirror the app's 'warm' and 'dark' themes (src/theme/themes.ts).
export type WidgetPalette = {
  background: `#${string}`;
  text: `#${string}`;
  caption: `#${string}`;
};

export const LIGHT_PALETTE: WidgetPalette = {
  background: '#fdf8f0',
  text: '#2c1f0e',
  caption: '#8b5e3c',
};

export const DARK_PALETTE: WidgetPalette = {
  background: '#141414',
  text: '#ffffff',
  caption: '#8c8c8c',
};

type SloganWidgetProps = {
  sloganId: number;
  slogan: string;
  caption: string;
  palette: WidgetPalette;
};

export function SloganWidget({ sloganId, slogan, caption, palette }: SloganWidgetProps) {
  return (
    <FlexWidget
      // Deep-link to the shown slogan so the app opens on it, not on the
      // last slogan viewed in the app (App.tsx handles the URL).
      clickAction="OPEN_URI"
      clickActionData={{ uri: `lojong://slogan/${sloganId}` }}
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: palette.background,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <TextWidget
        text={slogan}
        maxLines={3}
        truncate="END"
        style={{
          fontSize: 16,
          color: palette.text,
          lineSpacingExtra: 2,
        }}
      />
      <TextWidget
        text={caption}
        maxLines={1}
        style={{
          fontSize: 11,
          color: palette.caption,
          letterSpacing: 0.5,
          marginTop: 6,
        }}
      />
    </FlexWidget>
  );
}
