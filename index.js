import { registerRootComponent } from 'expo';
import { registerWidgetTaskHandler } from 'react-native-android-widget';

import App from './App';
import { widgetTaskHandler } from './src/widget/taskHandler';

registerRootComponent(App);
// The handler must be registered at module load: the home-screen widget
// starts the bundle headlessly (no App mounted) and looks it up immediately.
registerWidgetTaskHandler(widgetTaskHandler);
