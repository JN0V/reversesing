# 🎙️ ReverseSing

**Record your voice and play it forward or backwards!**

A fun and simple web application that lets you record audio using your microphone and play it back normally or in reverse. Built with vanilla JavaScript and packaged as an Android app with Capacitor.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🔴 **Audio Recording** - Record directly from your browser/device microphone
- 📂 **Multiple Recordings** - Save and manage multiple recordings
- ▶️ **Normal Playback** - Listen to your recordings as recorded
- ◀️ **Reverse Playback** - Play audio backwards for fun effects
- 🔊 **Volume Control** - Adjustable playback volume
- 📊 **Waveform Visualization** - See your audio as a waveform
- 🗑️ **Delete Recordings** - Remove recordings you don't need
- 🌍 **Multilingual** - Available in English and French
- 📱 **Mobile Ready** - Fully responsive design

## 🚀 Quick Start

### Web Version

```bash
# Clone the repository
git clone https://github.com/JN0V/reversesing.git
cd reversesing

# Serve the app (any HTTP server works)
cd www
python3 -m http.server 8000
# Or from root: npx serve www

# Open in browser
open http://localhost:8000
```

### Android App

#### Prerequisites
- Node.js 20+
- Java JDK 21
- Android Studio or Android SDK

#### Build Instructions

```bash
# Install dependencies
npm install

# Sync with Capacitor
npm run sync
# or: npx cap sync

# Open in Android Studio
npx cap open android

# Or build from command line
cd android
./gradlew assembleDebug

# APK will be in: android/app/build/outputs/apk/debug/app-debug.apk
```

#### Release (signed) build

To generate a signed release APK for distribution:

1. Create a keystore (one-time):
   ```bash
   keytool -genkeypair -v -keystore reversesing-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias reversesing
   ```
2. Place the keystore at `android/app/reversesing-release.jks` (not committed).
3. Create `android/gradle.properties` (not committed) with:
   ```
   REVERSESING_STORE_FILE=app/reversesing-release.jks
   REVERSESING_STORE_PASSWORD=your_store_password
   REVERSESING_KEY_ALIAS=reversesing
   REVERSESING_KEY_PASSWORD=your_key_password
   ```
4. Configure signing in `android/app/build.gradle` (see SIGNING_RELEASE.md).
5. Build release:
   ```bash
   cd android
   ./gradlew clean assembleRelease
   ```
6. Output: `android/app/build/outputs/apk/release/app-release.apk` (signed)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Audio API**: Web Audio API, MediaRecorder API
- **Mobile**: Capacitor 7
- **Android**: Native Android project

## 📱 Permissions

The Android app requires the following permissions:
- `RECORD_AUDIO` - To record audio from the microphone
- `MODIFY_AUDIO_SETTINGS` - To adjust audio settings
- `INTERNET` - For web content loading

### Permission prompt behavior

- The microphone permission prompt appears when you tap the `Record` button (first call to `getUserMedia({ audio: true })`).
- On emulators, ensure microphone passthrough is enabled in AVD settings; otherwise the prompt may not show.
- If you previously denied the permission, enable it via: App Info → Permissions → Microphone → Allow, then relaunch.

## 🌍 Internationalization

The app automatically detects your browser/device language and defaults to English if not supported.

Supported languages:
- 🇬🇧 English (default)
- 🇫🇷 French

To add a new language, edit `www/i18n.js` and add your translations.

## 📂 Project Structure

```
reversesing/
├── www/                    # Web app source files
│   ├── index.html         # Main HTML file
│   ├── style.css          # Styles with responsive design
│   ├── script.js          # Main application logic
│   └── i18n.js            # Internationalization
├── android/               # Android native project (generated)
├── capacitor.config.json  # Capacitor configuration
├── package.json           # Node dependencies
└── README.md             # This file
```

## 🔧 Development

### Making Changes

```bash
# 1. Edit files in www/
nano www/index.html

# 2. Test in browser
python3 -m http.server 8000

# 3. Sync changes to Android
npx cap sync

# 4. Rebuild Android app
cd android && ./gradlew assembleDebug
```

### Updating the App Name or ID

Edit `capacitor.config.json`:
```json
{
  "appId": "com.yourname.appname",
  "appName": "Your App Name"
}
```

Then regenerate the Android project:
```bash
rm -rf android
npx cap add android
```

## 🎨 Customization

### App Icon
Replace icons in `android/app/src/main/res/mipmap-*/`

### Theme Colors
Edit the gradient in `www/style.css`:
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🐛 Troubleshooting

### Microphone Not Working
- Ensure microphone permissions are granted
- Check browser console for errors
- Try HTTPS (required by some browsers)

### Android Build Fails
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew assembleDebug
```

### Canvas Issues on Mobile
The waveform canvas automatically resizes for mobile viewports.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 👤 Author

**JN0V**
- GitHub: [@JN0V](https://github.com/JN0V)

## 🙏 Acknowledgments

- Built with [Capacitor](https://capacitorjs.com/) by Ionic
- Uses Web Audio API for audio manipulation
- Icons from Unicode emoji

## 📝 Changelog

### v1.0.0 (2025-10-24)
- Initial release
- Audio recording and playback
- Reverse playback feature
- Multilingual support (EN/FR)
- Android app with Capacitor
- Fully responsive design

---

Made with ❤️ by JN0V
