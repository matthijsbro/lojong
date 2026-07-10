#!/usr/bin/env node
/**
 * Regenerate src/content/slogans.ts:
 * - en.explanation becomes the exact commentary quote (core)
 * - contextBefore / contextAfter added per locale from the commentary section
 * - de context from the hand-translated contexts-de-*.js files
 */
const fs = require('fs');

const TARGET = require('path').join(__dirname, '../../src/content/slogans.ts');
const src = fs.readFileSync(TARGET, 'utf8');
const slogans = eval(src.slice(src.indexOf('[', src.indexOf('export const slogans')), src.lastIndexOf('];') + 1));
const en = require('./contexts-en.json');
const de = {
  ...require('./contexts-de-1.js'),
  ...require('./contexts-de-2.js'),
  ...require('./contexts-de-3.js'),
};

// coverage check
const problems = [];
for (const o of en) {
  const d = de[o.id] || {};
  if (o.before && !d.before) problems.push(`id ${o.id}: missing de.before`);
  if (o.after && !d.after) problems.push(`id ${o.id}: missing de.after`);
  if (!o.before && d.before) problems.push(`id ${o.id}: stray de.before`);
  if (!o.after && d.after) problems.push(`id ${o.id}: stray de.after`);
  const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
  const coreChanged = o.core && norm(o.core) !== norm(o.explanation);
  if (coreChanged && !d.core) problems.push(`id ${o.id}: EN core changed but no de.core`);
}
if (problems.length) {
  console.error('PROBLEMS:\n' + problems.join('\n'));
  process.exit(1);
}

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;

const lines = [];
lines.push(`// Slogans sourced literally from:
//   Root text: Geshe Chekawa Yeshe Dorje, trans. Adam Pearcey (EN), Juliane Wenzel (DE)
// Explanations:
//   English explanations quote directly from Gyalse Tokme Zangpo's
//   "Commentary on the Seven Points of Mind Training" (trans. Adam Pearcey).
//   contextBefore/contextAfter hold the surrounding text of each slogan's
//   commentary section, so the quote can be read in its original context.
//   German explanations and context are in-app translations based on that
//   English commentary.
// All published by Lotsawa House under CC BY-NC 4.0.
//
// To edit content: modify the entries below.
// To add a slogan: append an entry with a unique id and matching attributionKey.
// To add a language: add a new locale block alongside 'en' and 'de'.

export type SloganLocale = {
  slogan: string;
  explanation: string;
  // Commentary text surrounding the explanation quote, shown de-emphasized
  // on the back of the card so the quote can be read in context.
  contextBefore?: string;
  contextAfter?: string;
};

export type Slogan = {
  id: number;
  point: number; // 1–7, corresponding to the Seven Points of Mind Training
  en: SloganLocale;
  de: SloganLocale;
  attributionKey: string;
};

export const slogans: Slogan[] = [`);

for (const s of slogans) {
  const o = en.find((x) => x.id === s.id);
  const d = de[s.id] || {};
  const enExplanation = o.core || s.en.explanation;
  const deExplanation = d.core || s.de.explanation;

  lines.push('  {');
  lines.push(`    id: ${s.id},`);
  lines.push(`    point: ${s.point},`);
  for (const [locale, slogan, explanation, before, after] of [
    ['en', s.en.slogan, enExplanation, o.before, o.after],
    ['de', s.de.slogan, deExplanation, d.before, d.after],
  ]) {
    lines.push(`    ${locale}: {`);
    lines.push(`      slogan: ${q(slogan)},`);
    lines.push(`      explanation:`);
    lines.push(`        ${q(explanation)},`);
    if (before) {
      lines.push(`      contextBefore:`);
      lines.push(`        ${q(before)},`);
    }
    if (after) {
      lines.push(`      contextAfter:`);
      lines.push(`        ${q(after)},`);
    }
    lines.push('    },');
  }
  lines.push(`    attributionKey: '${s.attributionKey}',`);
  lines.push('  },');
}
lines.push('];');
lines.push('');
lines.push(src.slice(src.indexOf('export const POINT_LABELS')).trimEnd());
lines.push('');

fs.writeFileSync(TARGET, lines.join('\n'));
console.log('wrote', TARGET, lines.join('\n').length, 'chars');
