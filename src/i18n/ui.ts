export type Language = 'en' | 'de';

export type UiStrings = {
  // Navigation
  appName: string;
  settings: string;
  about: string;

  // Home screen
  tapToFlip: string;
  explanation: string;
  backToSlogan: string;
  next: string;
  previous: string;
  point: string; // "Point 3" / "Punkt 3"
  of: string;    // "3 of 59"

  // Settings screen
  language: string;
  displayOrder: string;
  orderFixed: string;
  orderRandom: string;
  notifications: string;
  notifOff: string;
  notifFixed: string;
  notifRandom: string;
  notifTime: string;
  notifChooseTime: string;
  notifRandomDesc: string;
  notifPermissionTitle: string;
  notifPermissionMessage: string;
  save: string;
  saving: string;
  saved: string;
  settingsSavedMessage: string;
  settingsSavedNotifBlockedMessage: string;
  settingsSaveErrorMessage: string;
  notifTimeInvalidMessage: string;
  backLabel: string;

  // About screen
  aboutTitle: string;
  aboutIntro: string;
  sources: string;
  license: string;
  licenseNote: string;
  nonCommercial: string;
  readAppLicense: string;
  licenseSourceNote: string;
  privacyNote: string;
  visitSource: string;
};

export const ui: Record<Language, UiStrings> = {
  en: {
    appName: 'Lojong',
    settings: 'Settings',
    about: 'About',

    tapToFlip: 'Tap card to see explanation',
    explanation: 'Explanation',
    backToSlogan: 'Back to slogan',
    next: 'Next',
    previous: 'Previous',
    point: 'Point',
    of: 'of',

    language: 'Language',
    displayOrder: 'Display order',
    orderFixed: 'Fixed order',
    orderRandom: 'Random order',
    notifications: 'Daily reminder',
    notifOff: 'Off',
    notifFixed: 'Fixed time',
    notifRandom: 'Random time',
    notifTime: 'Reminder time',
    notifChooseTime: 'Choose time',
    notifRandomDesc: 'A reminder will appear at a random time between 6:00 and 22:00 each day.',
    notifPermissionTitle: 'Notifications are off',
    notifPermissionMessage: 'Allow notifications in Android settings to receive daily reminders.',
    save: 'Save',
    saving: 'Saving...',
    saved: 'Saved',
    settingsSavedMessage: 'Your settings were saved.',
    settingsSavedNotifBlockedMessage: 'Settings were saved, but notifications are disabled in system settings.',
    settingsSaveErrorMessage: 'Settings could not be saved. Please try again.',
    notifTimeInvalidMessage: 'Enter a valid time in HH:MM format.',
    backLabel: 'Back',

    aboutTitle: 'About Lojong',
    aboutIntro:
      'This app presents slogans of the Seven Points of Mind Training (Lojong), a Buddhist practice for cultivating compassion and insight.',
    sources: 'Sources',
    license: 'License',
    licenseNote: 'All texts are published under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).',
    nonCommercial: 'This app is free and open source, published under the GNU AFFERO GENERAL PUBLIC LICENSE 3.0 (AGPL3.0).',
    readAppLicense: 'Read the AGPL 3.0 license text',
    licenseSourceNote: 'This is the app license text from LICENSE.md.',
    privacyNote: 'This app does not collect, transmit, store, or share any user data whatsoever.',
    visitSource: 'Visit source',
  },

  de: {
    appName: 'Lojong',
    settings: 'Einstellungen',
    about: 'Über',

    tapToFlip: 'Karte antippen für Erklärung',
    explanation: 'Erklärung',
    backToSlogan: 'Zurück zum Leitsatz',
    next: 'Weiter',
    previous: 'Zurück',
    point: 'Punkt',
    of: 'von',

    language: 'Sprache',
    displayOrder: 'Anzeigereihenfolge',
    orderFixed: 'Feste Reihenfolge',
    orderRandom: 'Zufällige Reihenfolge',
    notifications: 'Tägliche Erinnerung',
    notifOff: 'Aus',
    notifFixed: 'Feste Uhrzeit',
    notifRandom: 'Zufällige Uhrzeit',
    notifTime: 'Erinnerungszeit',
    notifChooseTime: 'Uhrzeit wählen',
    notifRandomDesc: 'Eine Erinnerung erscheint täglich zu einer zufälligen Zeit zwischen 6:00 und 22:00 Uhr.',
    notifPermissionTitle: 'Benachrichtigungen sind aus',
    notifPermissionMessage: 'Aktiviere Benachrichtigungen in den Android-Einstellungen, um tägliche Erinnerungen zu erhalten.',
    save: 'Speichern',
    saving: 'Speichere...',
    saved: 'Gespeichert',
    settingsSavedMessage: 'Deine Einstellungen wurden gespeichert.',
    settingsSavedNotifBlockedMessage: 'Die Einstellungen wurden gespeichert, aber Benachrichtigungen sind in den Systemeinstellungen deaktiviert.',
    settingsSaveErrorMessage: 'Die Einstellungen konnten nicht gespeichert werden. Bitte versuche es erneut.',
    notifTimeInvalidMessage: 'Gib eine gueltige Uhrzeit im Format HH:MM ein.',
    backLabel: 'Zurück',

    aboutTitle: 'Über Lojong',
    aboutIntro:
      'Diese App präsentiert die Leitsätze der Sieben Punkte der Geistesschulung (Lojong), einer buddhistischen Praxis zur Kultivierung von Mitgefühl und Einsicht.',
    sources: 'Quellen',
    license: 'Lizenz',
    licenseNote: 'Alle Texte werden unter Creative Commons Namensnennung-NichtKommerziell 4.0 International (CC BY-NC 4.0) veröffentlicht.',
    nonCommercial: 'Diese App ist kostenlos und Open Source, veröffentlicht unter der GNU AFFERO GENERAL PUBLIC LICENSE 3.0 (AGPL3.0).',
    readAppLicense: 'AGPL-3.0-Lizenztext lesen',
    licenseSourceNote: 'Dies ist der App-Lizenztext aus LICENSE.md.',
    privacyNote: 'Diese App erhebt, überträgt, speichert oder teilt keinerlei Nutzerdaten.',
    visitSource: 'Quelle besuchen',
  },
};
