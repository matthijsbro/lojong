#!/usr/bin/env node
/**
 * Extract per-slogan commentary sections from the Lotsawa House commentary
 * text (pdftotext -layout output) and align each slogan's existing in-app
 * explanation to its source span.
 *
 * Output: contexts-en.json  { id, sloganApp, sloganCommentary, before, core, after, score }
 */
const fs = require('fs');

// ---------- load app slogans ----------
const sloganSrc = fs.readFileSync(require('path').join(__dirname, '../../src/content/slogans.ts'), 'utf8');
const arrStart = sloganSrc.indexOf('export const slogans');
const bracket = sloganSrc.indexOf('[', arrStart);
const end = sloganSrc.lastIndexOf('];');
const slogans = eval(sloganSrc.slice(bracket, end + 1));
console.error(`app slogans: ${slogans.length}`);

// ---------- load commentary ----------
let lines = fs.readFileSync('commentary-en.txt', 'utf8').split('\n');

// cut footnotes at end
const fnIdx = lines.findIndex((l) => /^\s{1,6}1\.\s+Ratnāvalī/.test(l));
if (fnIdx > 0) lines = lines.slice(0, fnIdx);

// drop page numbers (right-aligned bare digits)
lines = lines.filter((l) => !/^\s{15,}\d{1,3}\s*$/.test(l) && !/^\s*\d{1,3}\s*$/.test(l.trimEnd()) || l.trim() === '');
lines = lines.filter((l) => !/^\s{15,}\d{1,3}\s*$/.test(l));
lines = lines.filter((l) => !(/^\s*\d{1,3}\s*$/.test(l) && l.search(/\d/) > 10));

// ---------- group into blocks (indented) and paragraphs (flush) ----------
// block: consecutive lines with indent 3..12; paragraph: consecutive flush lines.
const items = []; // {type: 'para'|'indent', text, indent}
let cur = null;
for (const raw of lines) {
  const line = raw.replace(/\s+$/, '');
  if (!line.trim()) {
    cur = null;
    continue;
  }
  const indent = line.search(/\S/);
  const type = indent >= 3 ? 'indent' : 'para';
  if (cur && cur.type === type && (type === 'para' || Math.abs(cur.indent - indent) <= 4)) {
    cur.lines.push(line.trim());
  } else {
    cur = { type, indent, lines: [line.trim()] };
    items.push(cur);
  }
}
// join lines; a trailing "-" is a real compound hyphen split across lines
// (twenty-one, self-grasping, …) so join those without a space.
// Verse blocks (indent) keep their line breaks.
for (const it of items) {
  // a heading can share a block with the following paragraph ("Five Strengths\nThe five…")
  while (
    it.type === 'para' &&
    it.lines.length > 1 &&
    it.lines[0].length < 60 &&
    !/[.!?:;”"'’,]$/.test(it.lines[0]) &&
    /^[A-Z]/.test(it.lines[1])
  ) {
    it.lines.shift();
  }
  // verse blocks (short centred lines) keep breaks; wrapped prose (e.g. long
  // numbered list items) reflows with spaces.
  const avg = it.lines.reduce((n, l) => n + l.trim().length, 0) / it.lines.length;
  const sep = it.type === 'indent' && avg < 58 ? '\n' : ' ';
  it.text = it.lines.reduce((acc, l) => (acc === '' ? l : acc.endsWith('-') ? acc + l : acc + sep + l), '');
}
// drop standalone headings ("Five Strengths", "Conclusion") so they don't get
// merged into explanation prose
for (let i = items.length - 1; i >= 0; i--) {
  const it = items[i];
  if (it.type === 'para' && it.text.length < 60 && !/[.!?:;”"'’]$/.test(it.text)) {
    items.splice(i, 1);
  }
}
// merge paragraphs split by page breaks (first part ends mid-sentence)
for (let i = items.length - 2; i >= 0; i--) {
  const a = items[i], b = items[i + 1];
  if (a.type === b.type && !/[.!?:;”"'’]$/.test(a.text)) {
    a.text = a.text + ' ' + b.text;
    items.splice(i + 1, 1);
  }
}
// strip footnote superscript markers like "…demon?5" / "…others.2"
function stripFootnotes(s) {
  return s
    .replace(/([.!?…”'"])\s?(\d{1,2})(?=[\s”'"]|$)/g, '$1')
    .replace(/([a-zāīūṃṇśṣ])\d{1,2}(?=\s)/g, '$1');
}
for (const it of items) it.text = stripFootnotes(it.text);
// long section heading that shares a block with following prose
for (const it of items) {
  it.text = it.text.replace(
    /Transforming Adversity into the Path of Enlightenment through (?:Relative|Ultimate) Bodhicitta /g,
    '',
  );
}

// ---------- find root-quote blocks ----------
// A root quote is an indented block whose preceding paragraph references the
// root text (".. the root text says:", "The root text advises ..:") OR whose
// content fuzzy-matches an app slogan strongly.
function norm(s) {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/\d+(?=\s|$)/g, '')
    .replace(/[^a-zāīūṃṇśṣṭḍñèé' -]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function tokens(s) {
  return new Set(norm(s).split(' ').filter((w) => w.length > 2));
}
function jaccard(a, b) {
  const A = tokens(a), B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

const rootBlocks = [];
for (let i = 0; i < items.length; i++) {
  const it = items[i];
  if (it.type !== 'indent') continue;
  const prev = items[i - 1];
  const prevText = prev ? prev.text : '';
  const ledByRootText = /root text[^.]*:\s*$/i.test(prevText) || /root text says/i.test(prevText.slice(-120));
  const bestSloganScore = Math.max(...slogans.map((s) => jaccard(s.en.slogan, it.text)));
  if (ledByRootText || bestSloganScore >= 0.4) {
    rootBlocks.push({ itemIndex: i, text: it.text, leadIn: prevText, prevIndex: i - 1, bestSloganScore });
  }
}
console.error(`root blocks: ${rootBlocks.length}`);
rootBlocks.forEach((b, k) => console.error(`  [${k}] ${b.text.slice(0, 90)}`));

// ---------- align app slogans to root blocks (in order, block may hold several slogans) ----------
// Greedy sequential: for each block, consume as many consecutive slogans as
// fuzzy-match parts of the block text.
const assignments = []; // per slogan: block index
let sIdx = 0;
for (let b = 0; b < rootBlocks.length && sIdx < slogans.length; b++) {
  const block = rootBlocks[b];
  const nextBlock = rootBlocks[b + 1];
  // How many slogans does this block cover? Try 1..4 and see which keeps the
  // next slogan matching the next block better.
  let take = 1;
  const bestFor = (sl) => jaccard(sl.en.slogan, block.text);
  while (
    sIdx + take < slogans.length &&
    nextBlock &&
    jaccard(slogans[sIdx + take].en.slogan, block.text) >
      jaccard(slogans[sIdx + take].en.slogan, nextBlock.text) &&
    take < 4
  ) {
    take++;
  }
  for (let k = 0; k < take; k++) {
    assignments.push({ slogan: slogans[sIdx + k], block: b, score: bestFor(slogans[sIdx + k]) });
  }
  sIdx += take;
}
console.error(`assigned: ${assignments.length}/${slogans.length}`);

// ---------- build section body per block ----------
// body = items after block until the lead-in paragraph of the next root block
// (exclusive). The lead-in's trailing "…the root text says:" clause is cut
// from the previous body.
function sectionParas(b) {
  const block = rootBlocks[b];
  const next = rootBlocks[b + 1];
  const from = block.itemIndex + 1;
  const to = next ? next.itemIndex : items.length;
  const paras = [];
  for (let i = from; i < to; i++) {
    const it = items[i];
    // Skip section headings like "3. Transforming Adversity…" or "i. Intention"
    if (it.type === 'para' && /^([0-9]+|i{1,3}v?|vi{0,3})\.\s+\S/.test(it.text) && it.text.length < 90 && !/[.:]$/.test(it.text)) {
      continue;
    }
    paras.push({ ...it });
  }
  // The final paragraph may end in the next quote's lead-in ("…the root text
  // says:"); strip that clause but keep any real explanation before it.
  if (next && paras.length) {
    const lead = paras[paras.length - 1];
    if (lead.type === 'para' && /:\s*$/.test(lead.text)) {
      const m = lead.text.match(/^(.*?)(?:[^.”"]*?(?:root text|root verse)[^:]*:)\s*$/is);
      const head = m ? m[1].trim() : '';
      if (head && head.length > 40) lead.text = head;
      else paras.pop();
    }
  }
  return paras;
}

// ---------- sentence-align explanation to section text ----------
function sentences(text) {
  // split on sentence enders, keep it simple
  return text
    .split(/(?<=[.!?”"'])\s+(?=[A-ZĀÍ"“‘'])/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const out = [];
for (const { slogan, block, score } of assignments) {
  const paras = sectionParas(block);
  // Represent section as list of sentences with paragraph markers
  const sents = [];
  paras.forEach((p, pi) => {
    if (p.type === 'indent') {
      // verse blocks are atomic; keep their internal line breaks
      sents.push({ s: p.text, pi, indent: true });
    } else {
      for (const s of sentences(p.text)) sents.push({ s, pi, indent: false });
    }
  });

  const exSents = sentences(slogan.en.explanation);
  // score each section sentence against best explanation sentence
  const scores = sents.map(({ s }) => Math.max(...exSents.map((e) => jaccard(s, e)), 0));
  let matched = scores.map((v) => v >= 0.5);
  if (!matched.includes(true)) matched = scores.map((v) => v >= 0.3);
  if (!matched.includes(true)) {
    const total = sents.reduce((n, { s }) => n + s.length, 0);
    if (total < 600) matched = sents.map(() => true); // short section: all core
  }
  let first = matched.indexOf(true);
  let last = matched.lastIndexOf(true);

  const joinRange = (a, z) => {
    let outStr = '';
    for (let i = a; i <= z && i < sents.length; i++) {
      if (i > a && sents[i].pi !== sents[i - 1].pi) outStr += '\n\n';
      else if (i > a) outStr += ' ';
      outStr += sents[i].s;
    }
    return outStr;
  };

  let before = '', core = '', after = '';
  if (first === -1) {
    core = ''; // needs manual review
    after = joinRange(0, sents.length - 1);
  } else {
    before = first > 0 ? joinRange(0, first - 1) : '';
    core = joinRange(first, last);
    after = last < sents.length - 1 ? joinRange(last + 1, sents.length - 1) : '';
  }

  out.push({
    id: slogan.id,
    sloganApp: slogan.en.slogan,
    sloganCommentary: rootBlocks[block].text,
    blockScore: +score.toFixed(2),
    explanation: slogan.en.explanation,
    matchedSentences: matched.filter(Boolean).length,
    before,
    core,
    after,
  });
}

fs.writeFileSync('contexts-en.json', JSON.stringify(out, null, 2));
console.error('wrote contexts-en.json');
// quick report
for (const o of out) {
  const flag = o.core ? (o.blockScore < 0.3 ? 'BLOCK?' : 'ok    ') : 'NOCORE';
  console.error(`${flag} id=${String(o.id).padEnd(3)} score=${o.blockScore} core=${o.core.length} before=${o.before.length} after=${o.after.length} | ${o.sloganApp.slice(0, 50)}`);
}
