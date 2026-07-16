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
  highlight: string; // markdown blockquote marker
  hint: string; // flip hint
  hintStrong: string; // stronger hint text (settings notes)
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
  // Pure black-and-white scheme for reading in the evening.
  dark: {
    statusBarStyle: 'light',
    background: '#000000',
    surface: '#141414',
    surfaceAlt: '#0d0d0d',
    inputBackground: '#1f1f1f',
    textPrimary: '#ffffff',
    textSecondary: '#e6e6e6',
    textMuted: '#bdbdbd',
    faint: '#8c8c8c',
    accent: '#ffffff',
    onAccent: '#000000',
    border: '#4d4d4d',
    borderSoft: '#333333',
    highlight: '#ffffff',
    hint: '#8c8c8c',
    hintStrong: '#b3b3b3',
    disabled: '#333333',
    successBg: '#262626',
    warningBg: '#262626',
    errorBg: '#262626',
  },
  // Pure white-and-black scheme for maximum legibility.
  contrast: {
    statusBarStyle: 'dark',
    background: '#ffffff',
    surface: '#ffffff',
    surfaceAlt: '#ffffff',
    inputBackground: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#1a1a1a',
    faint: '#404040',
    accent: '#000000',
    onAccent: '#ffffff',
    border: '#000000',
    borderSoft: '#666666',
    highlight: '#000000',
    hint: '#404040',
    hintStrong: '#1a1a1a',
    disabled: '#bfbfbf',
    successBg: '#e6e6e6',
    warningBg: '#e6e6e6',
    errorBg: '#e6e6e6',
  },
};

// Font sizes across all screens are multiplied by this factor.
// 'xlarge' targets tablets, where the default sizes leave text too small
// and the layout with too much empty space.
export const FONT_SCALES: Record<FontSize, number> = {
  small: 0.9,
  medium: 1,
  large: 1.25,
  xlarge: 1.6,
};

export function scaled(size: number, scale: number): number {
  return Math.round(size * scale);
}
