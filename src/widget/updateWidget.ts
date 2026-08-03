import { Platform } from 'react-native';
import { requestWidgetUpdate } from 'react-native-android-widget';
import { buildSloganWidget } from '@/widget/renderSloganWidget';

/**
 * Redraw any home-screen widgets from the app side, so settings changes
 * (language, order, reminder times) reflect immediately instead of on the
 * next 30-minute cycle. Best-effort: a missing widget or a draw failure
 * must never disturb the app.
 */
export async function refreshSloganWidget(): Promise<void> {
  if (Platform.OS !== 'android') return;
  try {
    await requestWidgetUpdate({
      widgetName: 'SloganOfTheDay',
      renderWidget: () => buildSloganWidget(),
    });
  } catch {
    // Best-effort only.
  }
}
