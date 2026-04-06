export type Attribution = {
  key: string;
  titleEn: string;
  titleDe?: string;
  author: string;
  translator: string;
  translatorDe?: string;
  source: string;
  url: string;
  licenseId: string;
  licenseUrl: string;
  issn: string;
};

export const attributions: Attribution[] = [
  {
    key: 'root-text',
    titleEn: 'Seven Points of Mind Training',
    titleDe: 'Geistestraining in Sieben Punkten',
    author: 'Geshe Chekawa Yeshe Dorje (1101–1175)',
    translator: 'Adam Pearcey (EN, 2012), Juliane Wenzel (DE, 2022)',
    source: 'Lotsawa House',
    url: 'https://www.lotsawahouse.org/tibetan-masters/geshe-chekhawa-yeshe-dorje/seven-points-mind-training',
    licenseId: 'CC BY-NC 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
    issn: '2753-4812',
  },
  {
    key: 'commentary',
    titleEn: 'Commentary on the Seven Points of Mind Training',
    titleDe: 'Commentary on the Seven Points of Mind Training',
    author: 'Gyalse Tokme Zangpo',
    translator: 'Adam Pearcey, 2018',
    translatorDe: 'Adam Pearcey (EN, 2018); deutsche Erläuterungen in der App aus diesem englischen Kommentartext übertragen',
    source: 'Lotsawa House',
    url: 'https://www.lotsawahouse.org/tibetan-masters/gyalse-thogme-zangpo/commentary-on-seven-points-mind-training',
    licenseId: 'CC BY-NC 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
    issn: '2753-4812',
  },
];

export function getAttribution(key: string): Attribution {
  const found = attributions.find((a) => a.key === key);
  if (!found) throw new Error(`Attribution key not found: ${key}`);
  return found;
}
