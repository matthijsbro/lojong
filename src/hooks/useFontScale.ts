import { useWindowDimensions } from 'react-native';
import { FontSize } from '@/store/settings';
import { FONT_SCALES, MAX_COMBINED_FONT_SCALE } from '@/theme/themes';

// Effective text scale: the in-app setting combined with the OS font scale,
// clamped so the two multiplied together can't blow past what layouts handle.
export function useFontScale(fontSize: FontSize): number {
  const { fontScale: system } = useWindowDimensions();
  return Math.min(FONT_SCALES[fontSize] * system, MAX_COMBINED_FONT_SCALE);
}
