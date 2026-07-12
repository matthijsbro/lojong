# AGENTS.md — Lojong Mind Training App

## Project Purpose

A React Native (Expo) flashcard app for Lojong Buddhist mind-training slogans. The app shows one slogan per card; tapping flips it to reveal an explanation. Users can receive daily reminders (one or several per day, at fixed or random times; on by default) and configure display order, language (English/German), font size and color scheme. An overview screen lists all slogans, and a commentary screen presents the full original commentary text with per-slogan delimiters.

**Important:** All content is sourced from Lotsawa House under CC BY-NC 4.0. The app is non-commercial. Attribution must remain visible in the app.

---

## Tech Stack

- **Expo** (managed workflow, SDK 54)
- **React Native** with TypeScript (strict mode)
- **AsyncStorage** (`@react-native-async-storage/async-storage`) for settings persistence
- **expo-notifications** for daily reminder scheduling with slogan-id targeting
- **React Navigation** (stack) for screen routing
- No state management library — local state + custom hooks only

---

## Repository Structure

```
src/
  content/
    slogans.ts        ← ALL content lives here (slogans + explanations, EN + DE)
    attribution.ts    ← License/attribution metadata for each source text
  components/
    SloganCard.tsx    ← Flippable card (front = slogan, back = explanation)
    AttributionFooter.tsx ← Tappable attribution shown on card back
    LanguageToggle.tsx    ← EN/DE switch in header
  screens/
    HomeScreen.tsx    ← Main card view
    SettingsScreen.tsx ← Notifications, order, language, font size, color scheme, About
    OverviewScreen.tsx ← All slogans grouped by point; tap jumps to that card
    CommentaryScreen.tsx ← Full commentary text with per-slogan delimiters
  hooks/
    useSettings.ts       ← Read/write persisted app settings; one shared snapshot across all instances
    useActiveSlogans.ts  ← Returns the ordered/shuffled slogan list
  notifications/
    scheduler.ts      ← Keeps a ~60-reminder stack pending (per-day slots) with sloganId payload
  i18n/
    ui.ts             ← UI label strings in EN and DE
  store/
    settings.ts       ← AsyncStorage key names + read/write helpers + legacy migration
  theme/
    themes.ts         ← Color schemes (warm/sage/dark) and font-size scales
```

---

## Notification System

Reminders are **on by default** (`notifMode: 'fixed'` at 08:00) for fresh installs; a stored 'off' choice is respected.

### Reminders Per Day
Users can configure several reminders per day (max `MAX_REMINDERS_PER_DAY = 4`): a list of fixed times (`notifTimes`), or a count of random times (`notifRandomCount`, each drawn from an equal window of 6:00–22:00). The scheduler keeps a stack of up to 60 pending notifications (below iOS's 64 cap), so the scheduled horizon shrinks as reminders per day grow (60 days at 1/day, 15 days at 4/day). Each pending reminder stores `{sloganId, fireAt, slot, fingerprint}`; `ensureNotificationsScheduled` self-heals the stack (dedupes by day+slot, rebuilds on stale fingerprint, tops up continuing the slogan sequence with modulo wrap).

### Fixed-Order Reminders
When `order: 'fixed'`, the app:
1. Saves the current slogan's `id` in `lastSloganId` whenever the user navigates
2. When scheduling reminders, generates the next slogans starting after `lastReminderSloganId` in sequence, one per reminder
3. Each notification's body shows the slogan text and carries the corresponding `sloganId` in the payload

### Random-Order Reminders
When `order: 'random'`, each scheduled notification receives a randomly selected slogan. The notification body and payload each get a different random slogan.

### Notification Tap Handling
When a user taps a notification:
1. The app extracts the `sloganId` from the notification payload
2. `HomeScreen` resolves that id to the current active deck (respecting the current order setting)
3. The app jumps to that card and persists the card as `lastSloganId`
4. For fixed-order mode, future reminders will continue from that newly opened position

---

## How to Edit Content

**This is the only part you need to touch to change what the app shows.**

### Adding or editing a slogan

Open [src/content/slogans.ts](src/content/slogans.ts). Each entry has this shape:

```ts
{
  id: 42,
  point: 6,                     // Which of the Seven Points (1–7)
  en: {
    slogan: 'The slogan text',
    explanation: 'A brief explanation of the slogan.',
  },
  de: {
    slogan: 'Der Leitsatz',
    explanation: 'Eine kurze Erklärung.',
  },
  attributionKey: 'root-text',  // Must match a key in attribution.ts
},
```

Rules:
- `id` must be unique and stable (used in notification payloads)
- `point` is 1–7; used for grouping only, not enforced at runtime
- `attributionKey` must reference an existing entry in `attribution.ts`

### Adding an attribution source

Open [src/content/attribution.ts](src/content/attribution.ts) and add an entry:

```ts
{
  key: 'my-source',
  titleEn: 'Title of the Work',
  titleDe: 'Titel des Werkes',        // optional
  author: 'Author Name',
  translator: 'Translator Name',
  source: 'Publisher Name',
  url: 'https://example.com/source',
  licenseId: 'CC BY-NC 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc/4.0/',
  issn: '0000-0000',                  // omit if not applicable
},
```

---

## How to Reuse This Codebase for a Different App

1. Fork / copy the repository
2. Replace all entries in `src/content/slogans.ts` with your new content
3. Replace entries in `src/content/attribution.ts` with the appropriate license info
4. Update `src/i18n/ui.ts` if you need different UI language strings
5. Update `app.json` — change `name`, `slug`, `ios.bundleIdentifier`, `android.package`
6. Replace `assets/icon.png` and `assets/splash.png` with your own

The UI, notification scheduling, settings persistence, and flip animation require **no changes**.

---

## Attribution Compliance Checklist (CC BY-NC 4.0)

Before releasing a build, verify:

- [ ] Every card back shows author, translator, and "Lotsawa House"
- [ ] Every card back has a tappable link to the source URL
- [ ] The Settings/About screen lists all source texts with full metadata
- [ ] The About screen links to `https://creativecommons.org/licenses/by-nc/4.0/`
- [ ] App Store / Play Store description states "non-commercial use"
- [ ] The PDF source files remain in `pdf-content/` for developer reference

---

## Coding Conventions

- **TypeScript strict mode** — no `any`, no `@ts-ignore`
- **Functional components only** — no class components
- Props typed inline with `type Props = { ... }` directly above the component
- No default exports from content/store/i18n files — named exports only
- Components use named exports: `export function SloganCard(...)`
- Keep components pure where possible; side effects in hooks
- `useSettings` is the single source of truth for settings — never read AsyncStorage directly from a component
- Notification scheduling always goes through `src/notifications/scheduler.ts`

---

## Adding a New Language

1. Add a key to the `Language` union type in `src/store/settings.ts` (e.g., `'fr'`)
2. Add the new locale block to every slogan entry in `src/content/slogans.ts`
3. Add UI strings for the new locale in `src/i18n/ui.ts`
4. Add the language option to `SettingsScreen.tsx` and `LanguageToggle.tsx`

---

## Testing

- Unit tests for content shape: verify every slogan has non-empty EN and DE fields, and that every `attributionKey` resolves
- Snapshot tests for `SloganCard` (front and back states)
- Run with: `npx expo test` (Jest with `jest-expo` preset)

---

## Source Materials

Reference PDFs in `pdf-content/`:

| File | Content | License |
|------|---------|---------|
| Seven Points of Mind Training.pdf | Root text (EN), Geshe Chekawa, trans. Adam Pearcey 2012 | CC BY-NC 4.0 |
| Geistestraining in Sieben Punkten.pdf | Root text (DE), trans. Juliane Wenzel 2022 | CC BY-NC 4.0 |
| Commentary on the Seven Points of Mind Training.pdf | Commentary, Gyalse Tokme Zangpo, trans. Adam Pearcey 2018 | CC BY-NC 4.0 |
| Notes on the Seven Points of Mind Training.pdf | Notes, Jamyang Khyentse Chökyi Lodrö, trans. Adam Pearcey 2020 | CC BY-NC 4.0 |

All published by Lotsawa House (https://www.lotsawahouse.org), ISSN 2753-4812.
