// Android system font-scale handling.
//
// By default a font-scale change recreates the activity, and Fabric then
// paints text at the new scale while still measuring it with the old one —
// every label without spare room around it gets clipped (RN 0.81). Instead:
//
// 1. Claim fontScale/density in android:configChanges so the activity is
//    NOT recreated.
// 2. Override onConfigurationChanged in MainActivity to reload the React
//    host, which rebuilds text layout from the updated configuration. This
//    is the only path that re-measures ALL committed text nodes correctly.
const { withAndroidManifest, withMainActivity } = require('expo/config-plugins');

function addConfigChanges(config) {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0];
    const activity = application?.activity?.find(
      (a) => a.$['android:name'] === '.MainActivity',
    );
    if (activity) {
      const parts = new Set(
        (activity.$['android:configChanges'] ?? '').split('|').filter(Boolean),
      );
      parts.add('fontScale');
      parts.add('density');
      activity.$['android:configChanges'] = [...parts].join('|');
    }
    return config;
  });
}

function addReloadOnFontScaleChange(config) {
  return withMainActivity(config, (config) => {
    let src = config.modResults.contents;
    if (config.modResults.language !== 'kt' || src.includes('lastFontScale')) {
      return config;
    }

    src = src.replace(
      'import com.facebook.react.ReactActivity\n',
      'import android.content.res.Configuration\n' +
        'import com.facebook.react.ReactActivity\n' +
        'import com.facebook.react.ReactApplication\n',
    );
    src = src.replace(
      'class MainActivity : ReactActivity() {',
      'class MainActivity : ReactActivity() {\n' +
        '  private var lastFontScale: Float = 1f\n',
    );
    src = src.replace(
      'super.onCreate(null)',
      'super.onCreate(null)\n' +
        '    lastFontScale = resources.configuration.fontScale',
    );
    // Insert the override before the final closing brace of the class.
    src = src.replace(
      /\}\s*$/,
      '\n' +
        '  // See plugins/withFontScaleReload.js: reload the React host on\n' +
        '  // font-scale changes instead of letting the activity recreate,\n' +
        '  // which leaves Fabric text measurement stale and clips labels.\n' +
        '  override fun onConfigurationChanged(newConfig: Configuration) {\n' +
        '    super.onConfigurationChanged(newConfig)\n' +
        '    if (newConfig.fontScale != lastFontScale) {\n' +
        '      lastFontScale = newConfig.fontScale\n' +
        '      (application as ReactApplication).reactHost?.reload("fontScale changed")\n' +
        '    }\n' +
        '  }\n' +
        '}\n',
    );

    config.modResults.contents = src;
    return config;
  });
}

module.exports = function withFontScaleReload(config) {
  return addReloadOnFontScaleChange(addConfigChanges(config));
};
