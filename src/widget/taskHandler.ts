import type { WidgetTaskHandler } from 'react-native-android-widget';
import { buildSloganWidget } from '@/widget/renderSloganWidget';

/**
 * Runs in a headless JS task whenever Android asks the widget to draw:
 * added to the home screen, resized, or the periodic update (every 30
 * minutes, the OS minimum) that rolls the slogan over at midnight without
 * the app being opened. Taps use the native OPEN_APP action and never
 * reach this handler.
 */
export const widgetTaskHandler: WidgetTaskHandler = async (props) => {
  if (props.widgetAction === 'WIDGET_DELETED') {
    return;
  }
  props.renderWidget(await buildSloganWidget());
};
