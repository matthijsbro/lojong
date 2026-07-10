# Commentary context pipeline

Generates `src/content/slogans.ts` from the Lotsawa House commentary PDF.
Each slogan's `explanation` is the exact quote from Gyalse Tokme Zangpo's
"Commentary on the Seven Points of Mind Training" (trans. Adam Pearcey), and
`contextBefore` / `contextAfter` hold the surrounding text of that slogan's
commentary section so the quote can be read in context on the card back.

## Files

- `extract.js` — parses the commentary text, splits it into per-slogan
  sections, aligns each existing explanation to its exact source span, and
  writes `contexts-en.json`.
- `contexts-en.json` — extracted English cores + before/after context.
- `contexts-de-1.js` / `-2.js` / `-3.js` — hand-made German translations of
  the context (and of cores that changed), following the app's existing
  German terminology (Geistestraining, Selbstbezogenheit, Greifen nach dem
  Selbst, Affliktionen).
- `generate.js` — merges everything and rewrites `src/content/slogans.ts`
  (idempotent).

## Regenerating

```sh
cd scripts/commentary-context
pdftotext -layout "../../pdf-content/Commentary on the Seven Points.pdf" commentary-en.txt
node extract.js     # writes contexts-en.json, prints a per-slogan report
node generate.js    # rewrites src/content/slogans.ts
npx tsc --noEmit && npx jest --ci --watchAll=false
```

If `extract.js` reports `NOCORE` for a slogan, its explanation could not be
matched to a contiguous commentary span; the existing explanation is kept and
the whole section becomes `contextAfter` (currently only id 16, whose
explanation is a constructed summary of the fourfold practice).

If English context changes, the German translations in `contexts-de-*.js`
must be updated by hand — `generate.js` fails with a coverage report when
they are out of sync.
