import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSettings } from '@/hooks/useSettings';
import { ui, Language } from '@/i18n/ui';
import { Order, NotifMode } from '@/store/settings';
import { attributions } from '@/content/attribution';
import { scheduleNotifications, cancelAllNotifications } from '@/notifications/scheduler';

type Props = {
  onBack: () => void;
  onOpenLicense: () => void;
};

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
  const handleNotifTime = (time: string) => updateDraft({ notifTime: time });

  const normalizeTime = (time: string): string | null => {
    const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handlePickTime = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'time',
        is24Hour: true,
        value: parseTimeToDate(draftSettings.notifTime),
        onChange: (_event, selectedDate) => {
          if (!selectedDate) return;
          void handleNotifTime(formatTime(selectedDate));
        },
      });
    }
  };

  const handleSaveAndClose = async () => {
    const normalizedTime =
      draftSettings.notifMode === 'fixed' ? normalizeTime(draftSettings.notifTime) : draftSettings.notifTime;

    if (draftSettings.notifMode === 'fixed' && !normalizedTime) {
      setSaveState('error');
      Alert.alert(t.save, t.notifTimeInvalidMessage);
      return;
    }

    const nextSettings = {
      ...draftSettings,
      notifTime: normalizedTime ?? draftSettings.notifTime,
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
          <View style={styles.row}>
            {(['en', 'de'] as Language[]).map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.chip, draftSettings.language === lang && styles.chipActive]}
                onPress={() => handleLanguage(lang)}
              >
                <Text
                  style={[styles.chipText, draftSettings.language === lang && styles.chipTextActive]}
                >
                  {lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Display order */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.displayOrder}</Text>
          <View style={styles.row}>
            {([['fixed', t.orderFixed], ['random', t.orderRandom]] as [Order, string][]).map(
              ([val, label]) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.chip, draftSettings.order === val && styles.chipActive]}
                  onPress={() => handleOrder(val)}
                >
                  <Text
                    style={[styles.chipText, draftSettings.order === val && styles.chipTextActive]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.notifications}</Text>
          <View style={styles.row}>
            {([
              ['off', t.notifOff],
              ['fixed', t.notifFixed],
              ['random', t.notifRandom],
            ] as [NotifMode, string][]).map(([val, label]) => (
              <TouchableOpacity
                key={val}
                style={[styles.chip, draftSettings.notifMode === val && styles.chipActive]}
                onPress={() => handleNotifMode(val)}
              >
                <Text
                  style={[
                    styles.chipText,
                    draftSettings.notifMode === val && styles.chipTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {draftSettings.notifMode === 'fixed' && (
            <View style={styles.timeRow}>
              <Text style={styles.fieldLabel}>{t.notifTime}</Text>
              {Platform.OS === 'android' ? (
                <TouchableOpacity style={styles.timePickerButton} onPress={handlePickTime}>
                  <Text style={styles.timePickerValue}>{draftSettings.notifTime}</Text>
                  <Text style={styles.timePickerHint}>{t.notifChooseTime}</Text>
                </TouchableOpacity>
              ) : (
                <TextInput
                  style={styles.timeInput}
                  value={draftSettings.notifTime}
                  onChangeText={handleNotifTime}
                  placeholder="08:00"
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                />
              )}
            </View>
          )}
          {draftSettings.notifMode === 'random' && (
            <Text style={styles.hint}>{t.notifRandomDesc}</Text>
          )}
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveButton, saveState === 'saving' && styles.saveButtonDisabled]}
          onPress={handleSaveAndClose}
          disabled={saveState === 'saving'}
        >
          <Text style={styles.saveButtonText}>
            {saveState === 'saving' ? t.saving : saveState === 'success' ? t.saved : t.save}
          </Text>
        </TouchableOpacity>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f0e8',
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
    fontSize: 16,
    color: '#8b5e3c',
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c1f0e',
  },
  section: {
    backgroundColor: '#fdf8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8b5e3c',
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4b49a',
    backgroundColor: '#fdf8f0',
  },
  chipActive: {
    backgroundColor: '#8b5e3c',
    borderColor: '#8b5e3c',
  },
  chipText: {
    fontSize: 13,
    color: '#4a3520',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#4a3520',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#c4b49a',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#2c1f0e',
    width: 80,
    backgroundColor: '#fff',
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#c4b49a',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    minWidth: 130,
  },
  timePickerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c1f0e',
  },
  timePickerHint: {
    fontSize: 11,
    color: '#8b5e3c',
    marginTop: 2,
  },
  hint: {
    fontSize: 12,
    color: '#8b5e3c',
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: '#8b5e3c',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  feedbackBanner: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  feedbackBannerSuccess: {
    backgroundColor: '#d8ead3',
  },
  feedbackBannerWarning: {
    backgroundColor: '#f4e0b8',
  },
  feedbackBannerError: {
    backgroundColor: '#f1d1cc',
  },
  feedbackText: {
    fontSize: 13,
    color: '#4a3520',
    lineHeight: 19,
  },
  aboutText: {
    fontSize: 13,
    color: '#4a3520',
    lineHeight: 20,
  },
  sourceEntry: {
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#d4c4b0',
    gap: 2,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2c1f0e',
  },
  sourceMeta: {
    fontSize: 12,
    color: '#6b5040',
  },
  sourceLink: {
    fontSize: 12,
    color: '#8b5e3c',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  sourceIssn: {
    fontSize: 11,
    color: '#a0856a',
  },
});
