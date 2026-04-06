# Lojong — Buddhist Mind-Training Flashcard App

A clean, open-source React Native app for exploring the **Seven Points of Mind Training** (Lojong) — a Buddhist practice for cultivating compassion and insight.

## Features

- 📇 **Flashcard interface** — tap to flip between slogans and explanations
- 🌍 **Bilingual** — English and German (easily extensible)
- 🔔 **Daily reminders** — fixed time or random, with slogan-aware notifications
- 🎲 **Display modes** — fixed sequential order or shuffle
- 📱 **Offline-first** — all content and settings stored locally
- 🔒 **Privacy** — no data collection, transmission, or analytics

## About Lojong

The **Seven Points of Mind Training** (Lojong, བློ་སྦྱོང་གི་དེམ་, *blo-sbyong*) is a Buddhist practice framework that turns adversity into the path. Each point contains slogans distilling core insights. This app presents the complete set with scholarly commentaries.

**Important:** All content is sourced from [Lotsawa House](https://www.lotsawahouse.org) under **CC BY-NC 4.0** attribution. The app is non-commercial and open source (AGPL 3.0).

## Installation

### Android (APK)
1. Download the latest release APK from [GitHub Releases](https://github.com/matthijsbro/lojong/releases)
2. Enable installation from unknown sources in your Android settings
3. Open the APK file to install

### iOS
- Coming soon; requires provisioning profile and Apple Developer account

### Building from Source

**Requirements:**
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Java 21+ and Android SDK (for Android builds)

**Steps:**
```bash
git clone https://github.com/matthijsbro/lojong.git
cd lojong
npm install

# For Android:
npm run android

# For web preview:
npm run web
```

## Usage

### Viewing Slogans
- **Tap a card** to flip between the slogan and its explanation
- **Navigate** using Previous/Next buttons to move through the sequence
- **Display order**: Settings > Display order (fixed or random)

### Setting Reminders
1. Open Settings (⚙️ icon, top right)
2. Under "Daily reminder", choose:
   - **Off**: no reminders
   - **Fixed time**: reminder at a specific hour each day
   - **Random time**: reminder between 6:00 AM and 10:00 PM
3. Tap **Save**
4. When a reminder arrives, tapping it opens the corresponding slogan in the app

### Language
- Toggle between **EN** and **DE** in the app header
- Settings persist across sessions

## Attribution & Licensing

### Content
All Lojong texts are **CC BY-NC 4.0** (Creative Commons Attribution-NonCommercial):
- **Root text:** *Seven Points of Mind Training*, Geshe Chekawa (trans. Adam Pearcey, 2012)
- **Commentary:** Gyalse Tokme Zangpo (trans. Adam Pearcey, 2018)
- **Explanatory notes:** Jamyang Khyentse Chökyi Lodrö (trans. Adam Pearcey, 2020)
- Published by [Lotsawa House](https://www.lotsawahouse.org), ISSN 2753-4812

### App
**GNU AFFERO GENERAL PUBLIC LICENSE v3.0** — see [LICENSE.md](LICENSE.md)

## Architecture

See [AGENTS.md](AGENTS.md) for detailed technical documentation, including:
- Project structure and file organization
- Notification system design
- Extensibility (adding languages, content)
- Development conventions

## Contributing

Contributions welcome! Areas for collaboration:
- **iOS build** — provisioning and deployment
- **Additional languages** — localization beyond EN/DE
- **Visual design** — app icon, splash screen, UI refinements
- **Bug fixes** — report issues on [GitHub Issues](https://github.com/matthijsbro/lojong/issues)

See [AGENTS.md](AGENTS.md#coding-conventions) for coding standards.

## Privacy

This app:
- ✅ **Does not** collect, transmit, store, or share user data
- ✅ **Does not** use analytics, telemetry, or third-party trackers
- ✅ **Stores all settings locally** on your device (AsyncStorage)
- ✅ **Works entirely offline** — no internet required

## Support

- 📖 Questions about Lojong? Visit [Lotsawa House](https://www.lotsawahouse.org)
- 🐛 Found a bug? Open an issue on [GitHub](https://github.com/matthijsbro/lojong/issues)
- 💬 Ideas or feedback? Discussions welcome

## License Summary

| Component | License | Attribution |
|-----------|---------|-------------|
| App code | AGPL 3.0 | [LICENSE.md](LICENSE.md) |
| Slogans & commentary | CC BY-NC 4.0 | Lotsawa House |
| German translations | CC BY-NC 4.0 | Lotsawa House |

---

**Lojong** — training the mind for wisdom and compassion.

Made with ❤️ for the practice of Lojong.
