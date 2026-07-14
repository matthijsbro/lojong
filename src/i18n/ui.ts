export type Language = 'en' | 'de';

export type UiStrings = {
  // Navigation
  appName: string;
  settings: string;
  about: string;

  // Home screen
  tapToFlip: string;
  explanation: string;
  contextHint: string;
  backToSlogan: string;
  next: string;
  previous: string;
  point: string; // "Point 3" / "Punkt 3"
  of: string;    // "3 of 59"
  readFullCommentary: string;

  // Overview screen
  overviewTitle: string;
  overviewOpenLabel: string;

  // Commentary screen
  commentaryTitle: string;
  sloganWord: string; // "Slogan 12" / "Leitsatz 12"

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
  notifTimes: string;
  notifChooseTime: string;
  notifAddTime: string;
  notifRemoveTime: string;
  notifPerDay: string;
  notifRandomDesc: string;
  fontSizeLabel: string;
  fontSmall: string;
  fontMedium: string;
  fontLarge: string;
  fontXLarge: string;
  colorScheme: string;
  themeWarm: string;
  themeSage: string;
  themeDark: string;
  themeContrast: string;
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
  viewSourceCode: string;
  visitSource: string;
};

export const ui: Record<Language, UiStrings> = {
  en: {
    appName: 'Lojong',
    settings: 'Settings',
    about: 'About',

    tapToFlip: 'Tap card to see explanation',
    explanation: 'Explanation',
    contextHint: 'Scroll to read the commentary in context',
    backToSlogan: 'Back to slogan',
    next: 'Next',
    previous: 'Previous',
    point: 'Point',
    of: 'of',
    readFullCommentary: 'Read the full commentary',

    overviewTitle: 'All slogans',
    overviewOpenLabel: 'Slogan overview',

    commentaryTitle: 'The full commentary',
    sloganWord: 'Slogan',

    language: 'Language',
    displayOrder: 'Display order',
    orderFixed: 'Fixed order',
    orderRandom: 'Random order',
    notifications: 'Daily reminder',
    notifOff: 'Off',
    notifFixed: 'Fixed time',
    notifRandom: 'Random time',
    notifTime: 'Reminder time',
    notifTimes: 'Reminder times',
    notifChooseTime: 'Choose time',
    notifAddTime: 'Add another time',
    notifRemoveTime: 'Remove this time',
    notifPerDay: 'Reminders per day',
    notifRandomDesc: 'Reminders appear at random times between 6:00 and 22:00 each day.',
    fontSizeLabel: 'Font size',
    fontSmall: 'Smaller',
    fontMedium: 'Medium',
    fontLarge: 'Larger',
    fontXLarge: 'Extra large',
    colorScheme: 'Color scheme',
    themeWarm: 'Warm',
    themeSage: 'Sage',
    themeDark: 'Dark',
    themeContrast: 'High contrast',
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
    viewSourceCode: 'View source code on GitHub',
    visitSource: 'Visit source',
  },

  de: {
    appName: 'Lojong',
    settings: 'Einstellungen',
    about: 'Über',

    tapToFlip: 'Karte antippen für Erklärung',
    explanation: 'Erklärung',
    contextHint: 'Scrolle, um den Kommentar im Zusammenhang zu lesen',
    backToSlogan: 'Zurück zum Leitsatz',
    next: 'Weiter',
    previous: 'Zurück',
    point: 'Punkt',
    of: 'von',
    readFullCommentary: 'Den vollständigen Kommentar lesen',

    overviewTitle: 'Alle Leitsätze',
    overviewOpenLabel: 'Übersicht der Leitsätze',

    commentaryTitle: 'Der vollständige Kommentar',
    sloganWord: 'Leitsatz',

    language: 'Sprache',
    displayOrder: 'Anzeigereihenfolge',
    orderFixed: 'Feste Reihenfolge',
    orderRandom: 'Zufällige Reihenfolge',
    notifications: 'Tägliche Erinnerung',
    notifOff: 'Aus',
    notifFixed: 'Feste Uhrzeit',
    notifRandom: 'Zufällige Uhrzeit',
    notifTime: 'Erinnerungszeit',
    notifTimes: 'Erinnerungszeiten',
    notifChooseTime: 'Uhrzeit wählen',
    notifAddTime: 'Weitere Uhrzeit hinzufügen',
    notifRemoveTime: 'Diese Uhrzeit entfernen',
    notifPerDay: 'Erinnerungen pro Tag',
    notifRandomDesc: 'Erinnerungen erscheinen täglich zu zufälligen Zeiten zwischen 6:00 und 22:00 Uhr.',
    fontSizeLabel: 'Schriftgröße',
    fontSmall: 'Kleiner',
    fontMedium: 'Mittel',
    fontLarge: 'Größer',
    fontXLarge: 'Extra groß',
    colorScheme: 'Farbschema',
    themeWarm: 'Warm',
    themeSage: 'Salbei',
    themeDark: 'Dunkel',
    themeContrast: 'Hoher Kontrast',
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
    viewSourceCode: 'Quellcode auf GitHub anschauen',
    visitSource: 'Quelle besuchen',
  },
};
