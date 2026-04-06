import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import { useSettings } from '@/hooks/useSettings';
import { ui, Language } from '@/i18n/ui';
import { Order, NotifMode } from '@/store/settings';
import { attributions } from '@/content/attribution';
import { scheduleNotifications, cancelAllNotifications } from '@/notifications/scheduler';

type Props = {
  onBack: () => void;
};

export function SettingsScreen({ onBack }: Props) {
  const { settings, update } = useSettings();
  const t = ui[settings.language];
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleLanguage = (lang: Language) => update({ language: lang });
  const handleOrder = (order: Order) => update({ order });

  const handleNotifMode = async (mode: NotifMode) => {
    const updated = await update({ notifMode: mode });
    if (mode === 'off') {
      await cancelAllNotifications();
    } else {
      await scheduleNotifications(updated);
    }
  };

  const handleNotifTime = (time: string) => update({ notifTime: time });

  const handleSaveAndClose = async () => {
    if (settings.notifMode !== 'off') {
      await scheduleNotifications(settings);
    }
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onBack();
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header with back button */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>&#x2190; Back</Text>
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
                style={[styles.chip, settings.language === lang && styles.chipActive]}
                onPress={() => handleLanguage(lang)}
              >
                <Text style={[styles.chipText, settings.language === lang && styles.chipTextActive]}>
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
                  style={[styles.chip, settings.order === val && styles.chipActive]}
                  onPress={() => handleOrder(val)}
                >
                  <Text style={[styles.chipText, settings.order === val && styles.chipTextActive]}>
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
                style={[styles.chip, settings.notifMode === val && styles.chipActive]}
                onPress={() => handleNotifMode(val)}
              >
                <Text style={[styles.chipText, settings.notifMode === val && styles.chipTextActive]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {settings.notifMode === 'fixed' && (
            <View style={styles.timeRow}>
              <Text style={styles.fieldLabel}>{t.notifTime}</Text>
              <TextInput
                style={styles.timeInput}
                value={settings.notifTime}
                onChangeText={handleNotifTime}
                placeholder="08:00"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                maxLength={5}
              />
            </View>
          )}
          {settings.notifMode === 'random' && (
            <Text style={styles.hint}>{t.notifRandomDesc}</Text>
          )}
        </View>

        {/* Save button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndClose}>
          <Text style={styles.saveButtonText}>{savedFeedback ? t.saved : t.save}</Text>
        </TouchableOpacity>

        {/* About / Attribution */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.aboutTitle}</Text>
          <Text style={styles.aboutText}>{t.aboutIntro}</Text>
          <Text style={styles.aboutText}>{t.nonCommercial}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t.sources}</Text>
          {attributions.map((attr) => {
            const title = settings.language === 'de' && attr.titleDe ? attr.titleDe : attr.titleEn;
            return (
              <View key={attr.key} style={styles.sourceEntry}>
                <Text style={styles.sourceTitle}>{title}</Text>
                <Text style={styles.sourceMeta}>{attr.author}</Text>
                <Text style={styles.sourceMeta}>trans. {attr.translator}</Text>
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
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
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
