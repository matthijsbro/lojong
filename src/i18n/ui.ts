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
  notifRandomDesc: string;
  save: string;
  saved: string;

  // About screen
  aboutTitle: string;
  aboutIntro: string;
  sources: string;
  license: string;
  licenseNote: string;
  nonCommercial: string;
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
    notifRandomDesc: 'A reminder will appear at a random time between 6:00 and 22:00 each day.',
    save: 'Save',
    saved: 'Saved',

    aboutTitle: 'About Lojong',
    aboutIntro:
      'This app presents slogans of the Seven Points of Mind Training (Lojong), a Buddhist practice for cultivating compassion and insight.',
    sources: 'Sources',
    license: 'License',
    licenseNote: 'All texts are published under Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).',
    nonCommercial: 'This app is free and open source, published under the GNU AFFERO GENERAL PUBLIC LICENSE 3.0 (AGPL3.0).',
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
    notifRandomDesc: 'Eine Erinnerung erscheint täglich zu einer zufälligen Zeit zwischen 6:00 und 22:00 Uhr.',
    save: 'Speichern',
    saved: 'Gespeichert',

    aboutTitle: 'Über Lojong',
    aboutIntro:
      'Diese App präsentiert die Leitsätze der Sieben Punkte der Geistesschulung (Lojong), einer buddhistischen Praxis zur Kultivierung von Mitgefühl und Einsicht.',
    sources: 'Quellen',
    license: 'Lizenz',
    licenseNote: 'Alle Texte werden unter Creative Commons Namensnennung-NichtKommerziell 4.0 International (CC BY-NC 4.0) veröffentlicht.',
    nonCommercial: 'Diese App ist kostenlos und Open Source, veröffentlicht unter der GNU AFFERO GENERAL PUBLIC LICENSE 3.0 (AGPL3.0)..',
    visitSource: 'Quelle besuchen',
  },
};
