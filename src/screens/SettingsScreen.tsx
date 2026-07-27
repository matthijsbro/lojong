import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSettings } from '@/hooks/useSettings';
import { ui, Language } from '@/i18n/ui';
import { FontSize, MAX_REMINDERS_PER_DAY, NotifMode, Order, ThemeName } from '@/store/settings';
import { attributions } from '@/content/attribution';
import { scheduleNotifications, cancelAllNotifications } from '@/notifications/scheduler';
import { THEMES, ThemeColors, scaled, scaledBox } from '@/theme/themes';
import { useFontScale } from '@/hooks/useFontScale';

type Props = {
  onBack: () => void;
  onOpenLicense: () => void;
};

// Suggested defaults when the user adds another daily reminder.
const ADDITIONAL_TIME_SUGGESTIONS = ['08:00', '20:00', '12:30', '17:00'];

export function SettingsScreen({ onBack, onOpenLicense }: Props) {
  const { settings, replace, loaded } = useSettings();
  const [draftSettings, setDraftSettings] = useState(settings);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'success' | 'warning' | 'error'>(
    'idle',
  );

  useEffect(() => {
    if (!loaded) return;
    setDraftSettings(settings);
  }, [loaded, settings]);

  const t = ui[draftSettings.language];
  const colors = THEMES[draftSettings.theme];
  const fontScale = useFontScale(draftSettings.fontSize);
  const styles = useMemo(() => makeStyles(colors, fontScale), [colors, fontScale]);

  const parseTimeToDate = (time: string): Date => {
    const [hoursRaw, minutesRaw] = time.split(':').map(Number);
    const hours = Number.isFinite(hoursRaw) ? Math.min(Math.max(hoursRaw, 0), 23) : 8;
    const minutes = Number.isFinite(minutesRaw) ? Math.min(Math.max(minutesRaw, 0), 59) : 0;
    const value = new Date();
    value.setHours(hours, minutes, 0, 0);
    return value;
  };

  const formatTime = (date: Date): string => {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const resetSaveState = () => {
    if (saveState !== 'idle') {
      setSaveState('idle');
    }
  };

  const updateDraft = (patch: Partial<typeof draftSettings>) => {
    resetSaveState();
    setDraftSettings((prev) => ({ ...prev, ...patch }));
  };

  const handleLanguage = (lang: Language) => updateDraft({ language: lang });
  const handleOrder = (order: Order) => updateDraft({ order });
  const handleNotifMode = (mode: NotifMode) => updateDraft({ notifMode: mode });
  const handleFontSize = (fontSize: FontSize) => updateDraft({ fontSize });
  const handleTheme = (theme: ThemeName) => updateDraft({ theme });
  const handleRandomCount = (notifRandomCount: number) => updateDraft({ notifRandomCount });

  const handleNotifTimeAt = (index: number, time: string) => {
    const notifTimes = [...draftSettings.notifTimes];
    notifTimes[index] = time;
    updateDraft({ notifTimes });
  };

  const addNotifTime = () => {
    const next =
      ADDITIONAL_TIME_SUGGESTIONS.find((time) => !draftSettings.notifTimes.includes(time)) ??
      '12:00';
    updateDraft({ notifTimes: [...draftSettings.notifTimes, next] });
  };

  const removeNotifTime = (index: number) => {
    if (draftSettings.notifTimes.length <= 1) return;
    updateDraft({ notifTimes: draftSettings.notifTimes.filter((_time, i) => i !== index) });
  };

  const normalizeTime = (time: string): string | null => {
    const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handlePickTime = (index: number) => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'time',
        is24Hour: true,
        value: parseTimeToDate(draftSettings.notifTimes[index] ?? '08:00'),
        onChange: (_event, selectedDate) => {
          if (!selectedDate) return;
          handleNotifTimeAt(index, formatTime(selectedDate));
        },
      });
    }
  };

  const handleSaveAndClose = async () => {
    let notifTimes = draftSettings.notifTimes;

    if (draftSettings.notifMode === 'fixed') {
      const normalized = draftSettings.notifTimes.map(normalizeTime);
      if (normalized.some((time) => time == null)) {
        setSaveState('error');
        Alert.alert(t.save, t.notifTimeInvalidMessage);
        return;
      }
      notifTimes = [...new Set(normalized as string[])].sort();
    }

    const nextSettings = {
      ...draftSettings,
      notifTimes,
    };

    setSaveState('saving');

    try {
      await replace(nextSettings);

      const scheduleResult = await scheduleNotifications(nextSettings);
      if (scheduleResult === 'permission-denied') {
        setSaveState('warning');
        Alert.alert(t.notifPermissionTitle, t.settingsSavedNotifBlockedMessage);
        return;
      }

      if (scheduleResult === 'disabled') {
        await cancelAllNotifications();
      }

      setSaveState('success');
    } catch {
      setSaveState('error');
      Alert.alert(t.save, t.settingsSaveErrorMessage);
    }
  };

  const chipRow = <T extends string | number>(
    options: [T, string][],
    selected: T,
    onSelect: (value: T) => void,
  ) => (
    <View style={styles.row}>
      {options.map(([value, label]) => (
        <TouchableOpacity
          key={String(value)}
          style={[styles.chip, selected === value && styles.chipActive]}
          onPress={() => onSelect(value)}
        >
          <Text style={[styles.chipText, selected === value && styles.chipTextActive]}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header with back button */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>&#x2190; {t.backLabel}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.screenTitle}>{t.settings}</Text>
        </View>

        {/* Language */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.language}</Text>
          {chipRow(
            (['en', 'de'] as Language[]).map((lang) => [lang, lang.toUpperCase()]),
            draftSettings.language,
            handleLanguage,
          )}
        </View>

        {/* Display order */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.displayOrder}</Text>
          {chipRow(
            [
              ['fixed', t.orderFixed],
              ['random', t.orderRandom],
            ] as [Order, string][],
            draftSettings.order,
            handleOrder,
          )}
        </View>

        {/* Font size */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.fontSizeLabel}</Text>
          {chipRow(
            [
              ['small', t.fontSmall],
              ['medium', t.fontMedium],
              ['large', t.fontLarge],
              ['xlarge', t.fontXLarge],
            ] as [FontSize, string][],
            draftSettings.fontSize,
            handleFontSize,
          )}
        </View>

        {/* Color scheme */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.colorScheme}</Text>
          <View style={styles.row}>
            {(
              [
                ['warm', t.themeWarm],
                ['sage', t.themeSage],
                ['dark', t.themeDark],
                ['contrast', t.themeContrast],
              ] as [ThemeName, string][]
            ).map(([value, label]) => (
              <TouchableOpacity
                key={value}
                style={[styles.chip, draftSettings.theme === value && styles.chipActive]}
                onPress={() => handleTheme(value)}
              >
                <View style={styles.themeChipContent}>
                  <View
                    style={[styles.themeSwatch, { backgroundColor: THEMES[value].background }]}
                  />
                  <Text
                    style={[styles.chipText, draftSettings.theme === value && styles.chipTextActive]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.notifications}</Text>
          {chipRow(
            [
              ['off', t.notifOff],
              ['fixed', t.notifFixed],
              ['random', t.notifRandom],
            ] as [NotifMode, string][],
            draftSettings.notifMode,
            handleNotifMode,
          )}

          {draftSettings.notifMode === 'fixed' && (
            <View style={styles.timesColumn}>
              <Text style={styles.fieldLabel}>
                {draftSettings.notifTimes.length > 1 ? t.notifTimes : t.notifTime}
              </Text>
              {draftSettings.notifTimes.map((time, index) => (
                <View key={index} style={styles.timeRow}>
                  {Platform.OS === 'android' ? (
                    <TouchableOpacity
                      style={styles.timePickerButton}
                      onPress={() => handlePickTime(index)}
                    >
                      <Text style={styles.timePickerValue}>{time}</Text>
                      <Text style={styles.timePickerHint}>{t.notifChooseTime}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TextInput
                      style={styles.timeInput}
                      value={time}
                      onChangeText={(value) => handleNotifTimeAt(index, value)}
                      placeholder="08:00"
                      placeholderTextColor={colors.faint}
                      keyboardType="numbers-and-punctuation"
                      maxLength={5}
                    />
                  )}
                  {draftSettings.notifTimes.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeNotifTime(index)}
                      style={styles.removeTimeButton}
                      accessibilityLabel={t.notifRemoveTime}
                    >
                      <Text style={styles.removeTimeText}>&#x2715;</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {draftSettings.notifTimes.length < MAX_REMINDERS_PER_DAY && (
                <TouchableOpacity onPress={addNotifTime} style={styles.addTimeButton}>
                  <Text style={styles.addTimeText}>+ {t.notifAddTime}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {draftSettings.notifMode === 'random' && (
            <View style={styles.timesColumn}>
              <Text style={styles.fieldLabel}>{t.notifPerDay}</Text>
              {chipRow(
                Array.from({ length: MAX_REMINDERS_PER_DAY }, (_v, i): [number, string] => [
                  i + 1,
                  String(i + 1),
                ]),
                draftSettings.notifRandomCount,
                handleRandomCount,
              )}
              <Text style={styles.hint}>{t.notifRandomDesc}</Text>
            </View>
          )}
        </View>

        {/* About / Attribution */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.aboutTitle}</Text>
          <Text style={styles.aboutText}>{t.aboutIntro}</Text>
          <Text style={styles.aboutText}>{t.nonCommercial}</Text>
          <TouchableOpacity onPress={onOpenLicense}>
            <Text style={styles.sourceLink}>{t.readAppLicense}</Text>
          </TouchableOpacity>
          <Text style={styles.aboutText}>{t.privacyNote}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/matthijsbro/lojong')}>
            <Text style={styles.sourceLink}>{t.viewSourceCode}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.sources}</Text>
          {attributions.map((attr) => {
            const title = draftSettings.language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;
            const translator =
              draftSettings.language === 'de' && attr.translatorDe ? attr.translatorDe : attr.translator;
            return (
              <View key={attr.key} style={styles.sourceEntry}>
                <Text style={styles.sourceTitle}>{title}</Text>
                <Text style={styles.sourceMeta}>{attr.author}</Text>
                <Text style={styles.sourceMeta}>trans. {translator}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(attr.url)}>
                  <Text style={styles.sourceLink}>{t.visitSource}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(attr.licenseUrl)}>
                  <Text style={styles.sourceLink}>{attr.licenseId}</Text>
                </TouchableOpacity>
                <Text style={styles.sourceIssn}>ISSN {attr.issn}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.aboutText}>{t.licenseNote}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-nc/4.0/')}
          >
            <Text style={styles.sourceLink}>Creative Commons BY-NC 4.0</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Save footer: stays visible while the settings above scroll. */}
      <View style={styles.footer}>
        {saveState !== 'idle' && saveState !== 'saving' && (
          <View
            style={[
              styles.feedbackBanner,
              saveState === 'success' && styles.feedbackBannerSuccess,
              saveState === 'warning' && styles.feedbackBannerWarning,
              saveState === 'error' && styles.feedbackBannerError,
            ]}
          >
            <Text style={styles.feedbackText}>
              {saveState === 'success'
                ? t.settingsSavedMessage
                : saveState === 'warning'
                  ? t.settingsSavedNotifBlockedMessage
                  : t.settingsSaveErrorMessage}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.saveButton, saveState === 'saving' && styles.saveButtonDisabled]}
          onPress={handleSaveAndClose}
          disabled={saveState === 'saving'}
        >
          <Text style={styles.saveButtonText}>
            {saveState === 'saving' ? t.saving : saveState === 'success' ? t.saved : t.save}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (c: ThemeColors, f: number) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: c.background,
    },
    scroll: {
      padding: 20,
      gap: 8,
    },
    topBar: {
      marginBottom: 4,
    },
    backButton: {
      paddingVertical: 6,
    },
    backText: {
      fontSize: scaled(16, f),
      color: c.accent,
      fontWeight: '600',
    },
    sectionHeader: {
      marginBottom: 12,
    },
    screenTitle: {
      fontSize: scaled(24, f),
      fontWeight: '700',
      color: c.textPrimary,
    },
    section: {
      backgroundColor: c.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      gap: 10,
    },
    sectionLabel: {
      fontSize: scaled(13, f),
      fontWeight: '700',
      color: c.accent,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
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
    themeChipContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    themeSwatch: {
      width: scaledBox(14, f),
      height: scaledBox(14, f),
      borderRadius: scaledBox(7, f),
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: c.textMuted,
    },
    timesColumn: {
      gap: 8,
      marginTop: 4,
    },
    timeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 12,
    },
    fieldLabel: {
      fontSize: scaled(13, f),
      color: c.textSecondary,
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
    },
    timePickerButton: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: c.inputBackground,
      minWidth: scaledBox(130, f),
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
    removeTimeButton: {
      padding: 8,
    },
    removeTimeText: {
      fontSize: scaled(16, f),
      color: c.accent,
    },
    addTimeButton: {
      alignSelf: 'flex-start',
      paddingVertical: 6,
    },
    addTimeText: {
      fontSize: scaled(13, f),
      color: c.accent,
      fontWeight: '600',
    },
    hint: {
      fontSize: scaled(12, f),
      color: c.hintStrong,
      lineHeight: scaled(18, f),
    },
    footer: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 12,
      gap: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.borderSoft,
      backgroundColor: c.background,
    },
    saveButton: {
      backgroundColor: c.accent,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
    },
    saveButtonDisabled: {
      opacity: 0.7,
    },
    saveButtonText: {
      color: c.onAccent,
      fontSize: scaled(16, f),
      fontWeight: '700',
    },
    feedbackBanner: {
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 14,
    },
    feedbackBannerSuccess: {
      backgroundColor: c.successBg,
    },
    feedbackBannerWarning: {
      backgroundColor: c.warningBg,
    },
    feedbackBannerError: {
      backgroundColor: c.errorBg,
    },
    feedbackText: {
      fontSize: scaled(13, f),
      color: c.textPrimary,
      lineHeight: scaled(19, f),
    },
    aboutText: {
      fontSize: scaled(13, f),
      color: c.textSecondary,
      lineHeight: scaled(20, f),
    },
    sourceEntry: {
      paddingTop: 10,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.borderSoft,
      gap: 2,
    },
    sourceTitle: {
      fontSize: scaled(13, f),
      fontWeight: '600',
      color: c.textPrimary,
    },
    sourceMeta: {
      fontSize: scaled(12, f),
      color: c.textMuted,
    },
    sourceLink: {
      fontSize: scaled(12, f),
      color: c.accent,
      textDecorationLine: 'underline',
      marginTop: 2,
    },
    sourceIssn: {
      fontSize: scaled(11, f),
      color: c.faint,
    },
  });
