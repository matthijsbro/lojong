import { FontSize, ThemeName } from '@/store/settings';

export type ThemeColors = {
  statusBarStyle: 'light' | 'dark';
  background: string;
  surface: string; // card front, settings sections
  surfaceAlt: string; // card back
  inputBackground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  faint: string; // counters, ISSN lines
  accent: string;
  onAccent: string;
  border: string;
  borderSoft: string;
  highlight: string; // explanation quote marker
  hint: string; // flip hint
  hintStrong: string; // context hint
  disabled: string;
  successBg: string;
  warningBg: string;
  errorBg: string;
};

export const THEMES: Record<ThemeName, ThemeColors> = {
  // The original parchment look.
  warm: {
    statusBarStyle: 'dark',
    background: '#f5f0e8',
    surface: '#fdf8f0',
    surfaceAlt: '#f5efe2',
    inputBackground: '#ffffff',
    textPrimary: '#2c1f0e',
    textSecondary: '#4a3520',
    textMuted: '#6b5040',
    faint: '#a0856a',
    accent: '#8b5e3c',
    onAccent: '#ffffff',
    border: '#c4b49a',
    borderSoft: '#d4c4b0',
    highlight: '#c9a87c',
    hint: '#b89a7a',
    hintStrong: '#9c7a52',
    disabled: '#d4c4b0',
    successBg: '#d8ead3',
    warningBg: '#f4e0b8',
    errorBg: '#f1d1cc',
  },
  // A cooler light scheme with muted green accents.
  sage: {
    statusBarStyle: 'dark',
    background: '#edf1e9',
    surface: '#f7faf4',
    surfaceAlt: '#eff3e7',
    inputBackground: '#ffffff',
    textPrimary: '#1e2a19',
    textSecondary: '#3a4a31',
    textMuted: '#59684e',
    faint: '#87977a',
    accent: '#5f7a4f',
    onAccent: '#ffffff',
    border: '#b4c3a6',
    borderSoft: '#c9d5bd',
    highlight: '#93ab7f',
    hint: '#94a686',
    hintStrong: '#758864',
    disabled: '#c9d5bd',
    successBg: '#d8ead3',
    warningBg: '#f0e3bd',
    errorBg: '#f1d1cc',
  },
  // A darker scheme for reading in the evening.
  dark: {
    statusBarStyle: 'light',
    background: '#1f1a13',
    surface: '#2b241b',
    surfaceAlt: '#272019',
    inputBackground: '#3a3124',
    textPrimary: '#f0e7d8',
    textSecondary: '#d8cbb4',
    textMuted: '#b4a58c',
    faint: '#8d7f6a',
    accent: '#c9a87c',
    onAccent: '#2c1f0e',
    border: '#55483a',
    borderSoft: '#453a2e',
    highlight: '#c9a87c',
    hint: '#8d7f6a',
    hintStrong: '#a5947a',
    disabled: '#453a2e',
    successBg: '#31452b',
    warningBg: '#54431f',
    errorBg: '#542a24',
  },
};

// Font sizes across the reading surfaces are multiplied by this factor.
export const FONT_SCALES: Record<FontSize, number> = {
  small: 0.9,
  medium: 1,
  large: 1.25,
};

export function scaled(size: number, scale: number): number {
  return Math.round(size * scale);
}
