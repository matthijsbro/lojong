import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ChipRow } from '@/components/ChipRow';
import { useSettings } from '@/hooks/useSettings';
import { useFontScale } from '@/hooks/useFontScale';
import { Language, ui } from '@/i18n/ui';
import { MAX_REMINDERS_PER_DAY, NotifMode, ThemeName } from '@/store/settings';
import {
  hasNotificationPermission,
  requestNotificationPermission,
} from '@/notifications/scheduler';
import { THEMES, ThemeColors, scaled, scaledBox } from '@/theme/themes';

// welcome, language, reminders, permission, theme, done. The permission step
// is entered only when reminders are on and permission is still unsettled.
const STEP_COUNT = 6;
const STEP_PERMISSION = 3;
const STEP_THEME = 4;

// First-launch flow, rendered as an opaque overlay above the home screen.
// Every choice persists immediately via update(); only onboardingCompleted
// waits until the finish animation, whose completion unmounts the overlay.
export function OnboardingScreen() {
  const { settings, update } = useSettings();
  const [step, setStep] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(false);
  // State (not a ref): finishing also hides the Skip link and drops touches.
  const [finishing, setFinishing] = useState(false);
  // iOS/dev fallback text input for the reminder time; normalized on Continue.
  const [timeText, setTimeText] = useState(settings.notifTimes[0] ?? '08:00');
  const stepAnim = useRef(new Animated.Value(1)).current;
  const exitAnim = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  const t = ui[settings.language];
  const colors = THEMES[settings.theme];
  const fontScale = useFontScale(settings.fontSize);
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  const goToStep = (next: number) => {
    setStep(next);
    stepAnim.setValue(0);
    Animated.timing(stepAnim, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const finish = () => {
    if (finishing) return;
    setFinishing(true);
    // The panel shrinks and slides into the settings (hamburger) corner,
    // revealing the home screen already mounted beneath.
    Animated.timing(exitAnim, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) void update({ onboardingCompleted: true });
    });
  };

  const commitTimeText = () => {
    if (Platform.OS === 'android') return;
    const match = timeText.trim().match(/^(\d{1,2}):(\d{2})$/);
    const hours = match ? Number(match[1]) : NaN;
    const minutes = match ? Number(match[2]) : NaN;
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      const normalized = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      setTimeText(normalized);
      void update({ notifTimes: [normalized, ...settings.notifTimes.slice(1)] });
    } else {
      // Invalid input: silently fall back to the stored value.
      setTimeText(settings.notifTimes[0] ?? '08:00');
    }
  };

  const handlePickTime = () => {
    const current = settings.notifTimes[0] ?? '08:00';
    const [hours, minutes] = current.split(':').map(Number);
    const value = new Date();
    value.setHours(hours, minutes, 0, 0);
    DateTimePickerAndroid.open({
      mode: 'time',
      is24Hour: true,
      value,
      onChange: (_event, selectedDate) => {
        if (!selectedDate) return;
        const hh = String(selectedDate.getHours()).padStart(2, '0');
        const mm = String(selectedDate.getMinutes()).padStart(2, '0');
        // Replace only the first slot so extra reminder times a returning
        // user configured earlier survive the onboarding re-run.
        void update({ notifTimes: [`${hh}:${mm}`, ...settings.notifTimes.slice(1)] });
      },
    });
  };

  const handleContinue = async () => {
    if (step === 2) {
      commitTimeText();
      // The permission step only appears when it can actually do something:
      // reminders enabled and the OS permission not yet granted.
      const needsPermission =
        settings.notifMode !== 'off' && !(await hasNotificationPermission());
      goToStep(needsPermission ? STEP_PERMISSION : STEP_THEME);
      return;
    }
    if (step === STEP_COUNT - 1) {
      finish();
      return;
    }
    goToStep(step + 1);
  };

  // Entering the permission step fires the OS dialog (once per entry — the
  // effect only re-runs on step changes); granting advances automatically,
  // denial shows a hint and lets the user continue manually.
  useEffect(() => {
    if (step !== STEP_PERMISSION) return;
    void requestNotificationPermission().then((granted) => {
      setPermissionDenied(!granted);
      if (granted) goToStep(STEP_THEME);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Backwards, the permission step is never revisited: theme returns straight
  // to the reminders step.
  const goBack = () => goToStep(step === STEP_THEME ? 2 : step - 1);

  // Registered after App's back handler, so it runs first: back steps through
  // the flow; on the first step it falls through and the app exits.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (finishing) return true;
      if (step > 0) {
        goToStep(step === STEP_THEME ? 2 : step - 1);
        return true;
      }
      return false;
    });
    return () => sub.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, finishing]);

  const themeOptions = (
    [
      ['warm', t.themeWarm],
      ['sage', t.themeSage],
      ['dark', t.themeDark],
      ['contrast', t.themeContrast],
    ] as [ThemeName, string][]
  ).map(([value, label]) => ({ value, label, swatchColor: THEMES[value].background }));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text style={styles.title}>{t.onbWelcomeTitle}</Text>
            <Text style={styles.body}>{t.onbWelcomeBody}</Text>
          </>
        );
      case 1:
        return (
          <>
            <Text style={styles.title}>{t.language}</Text>
            <ChipRow
              options={(['en', 'de'] as Language[]).map((value) => ({
                value,
                label: value.toUpperCase(),
              }))}
              selected={settings.language}
              onSelect={(language) => void update({ language })}
              colors={colors}
              fontScale={fontScale}
            />
            {settings.language === 'de' && <Text style={styles.hint}>{t.germanAiNote}</Text>}
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>{t.notifications}</Text>
            <Text style={styles.body}>{t.onbRemindersBody}</Text>
            <ChipRow
              options={(
                [
                  ['off', t.notifOff],
                  ['fixed', t.notifFixed],
                  ['random', t.notifRandom],
                ] as [NotifMode, string][]
              ).map(([value, label]) => ({ value, label }))}
              selected={settings.notifMode}
              onSelect={(notifMode) => void update({ notifMode })}
              colors={colors}
              fontScale={fontScale}
            />
            {settings.notifMode === 'fixed' && (
              <View style={styles.subBlock}>
                <Text style={styles.fieldLabel}>{t.notifTime}</Text>
                {Platform.OS === 'android' ? (
                  <TouchableOpacity style={styles.timePickerButton} onPress={handlePickTime}>
                    <Text style={styles.timePickerValue}>
                      {settings.notifTimes[0] ?? '08:00'}
                    </Text>
                    <Text style={styles.timePickerHint}>{t.notifChooseTime}</Text>
                  </TouchableOpacity>
                ) : (
                  <TextInput
                    style={styles.timeInput}
                    value={timeText}
                    onChangeText={setTimeText}
                    onBlur={commitTimeText}
                    placeholder="08:00"
                    placeholderTextColor={colors.faint}
                    keyboardType="numbers-and-punctuation"
                    maxLength={5}
                  />
                )}
              </View>
            )}
            {settings.notifMode === 'random' && (
              <View style={styles.subBlock}>
                <Text style={styles.fieldLabel}>{t.notifPerDay}</Text>
                <ChipRow
                  options={Array.from({ length: MAX_REMINDERS_PER_DAY }, (_v, i) => ({
                    value: i + 1,
                    label: String(i + 1),
                  }))}
                  selected={settings.notifRandomCount}
                  onSelect={(notifRandomCount) => void update({ notifRandomCount })}
                  colors={colors}
                  fontScale={fontScale}
                />
                <Text style={styles.hint}>{t.notifRandomDesc}</Text>
              </View>
            )}
          </>
        );
      case STEP_PERMISSION:
        return (
          <>
            <Text style={styles.title}>{t.onbPermissionTitle}</Text>
            <Text style={styles.body}>{t.onbPermissionBody}</Text>
            {permissionDenied && <Text style={styles.hint}>{t.notifPermissionMessage}</Text>}
          </>
        );
      case STEP_THEME:
        return (
          <>
            <Text style={styles.title}>{t.colorScheme}</Text>
            <ChipRow
              options={themeOptions}
              selected={settings.theme}
              onSelect={(theme) => void update({ theme })}
              colors={colors}
              fontScale={fontScale}
            />
          </>
        );
      default:
        return (
          <>
            <Text style={styles.title}>{t.onbDoneTitle}</Text>
            <Text style={styles.body}>{t.onbDoneBody}</Text>
          </>
        );
    }
  };

  return (
    <Animated.View
      pointerEvents={finishing ? 'none' : 'auto'}
      style={[
        styles.overlay,
        {
          opacity: exitAnim.interpolate({
            inputRange: [0, 0.6, 1],
            outputRange: [1, 0.5, 0],
          }),
          transform: [
            {
              translateX: exitAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width / 2 - 44],
              }),
            },
            {
              translateY: exitAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(height / 2 - 80)],
              }),
            },
            {
              scale: exitAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.05],
              }),
            },
          ],
        },
      ]}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.topBar}>
          {step < STEP_COUNT - 1 && !finishing && (
            <TouchableOpacity onPress={finish} style={styles.skipButton}>
              <Text style={styles.skipText}>{t.onbSkip}</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Animated.View
            style={[
              styles.stepBody,
              {
                opacity: stepAnim,
                transform: [
                  {
                    translateY: stepAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [12, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {renderStep()}
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.dots}>
            {Array.from({ length: STEP_COUNT }, (_v, i) => (
              <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
            ))}
          </View>
          <View style={styles.buttonRow}>
            {step > 0 ? (
              <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Text style={styles.backText}>{t.backLabel}</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <TouchableOpacity onPress={() => void handleContinue()} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                {step === STEP_COUNT - 1 ? t.onbStart : t.onbContinue}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: c.background,
    },
    safe: {
      flex: 1,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 12,
      minHeight: scaledBox(44, f),
    },
    skipButton: {
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
    skipText: {
      fontSize: scaled(13, f),
      color: c.hintStrong,
      fontWeight: '600',
    },
    scroll: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 28,
    },
    stepBody: {
      gap: 16,
    },
    title: {
      fontSize: scaled(24, f),
      fontWeight: '700',
      color: c.textPrimary,
    },
    body: {
      fontSize: scaled(15, f),
      lineHeight: scaled(23, f),
      color: c.textSecondary,
    },
    hint: {
      fontSize: scaled(12, f),
      color: c.hintStrong,
      lineHeight: scaled(18, f),
    },
    subBlock: {
      gap: 8,
      marginTop: 4,
    },
    fieldLabel: {
      fontSize: scaled(13, f),
      color: c.textSecondary,
    },
    timePickerButton: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: c.inputBackground,
      minWidth: scaledBox(130, f),
      alignSelf: 'flex-start',
    },
    timePickerValue: {
      fontSize: scaled(16, f),
      fontWeight: '700',
      color: c.textPrimary,
    },
    timePickerHint: {
      fontSize: scaled(11, f),
      color: c.accent,
      marginTop: 2,
    },
    timeInput: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: scaled(15, f),
      color: c.textPrimary,
      minWidth: scaledBox(80, f),
      backgroundColor: c.inputBackground,
      alignSelf: 'flex-start',
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 12,
      gap: 14,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.borderSoft,
    },
    dots: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    dot: {
      width: scaledBox(7, f),
      height: scaledBox(7, f),
      borderRadius: scaledBox(4, f),
      backgroundColor: c.border,
    },
    dotActive: {
      backgroundColor: c.accent,
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    },
    backButton: {
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    backText: {
      fontSize: scaled(14, f),
      color: c.accent,
      fontWeight: '600',
    },
    primaryButton: {
      backgroundColor: c.accent,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 28,
      alignItems: 'center',
      flexGrow: 1,
    },
    primaryButtonText: {
      color: c.onAccent,
      fontSize: scaled(16, f),
      fontWeight: '700',
    },
  });
