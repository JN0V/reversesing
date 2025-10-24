# 📋 Changelog - ReverseSing

## [1.0.0] - 2025-10-24

### 🎉 Initial Release

#### ✨ Features

**🎨 Branding**
- Renamed application to **"ReverseSing"**
- New App ID: `com.jn0v.reversesing`
- Professional English name reflecting main functionality

**🌍 Internationalization (i18n)**
- Complete internationalization system
- Support for 2 languages:
  - 🇬🇧 English (default)
  - 🇫🇷 French
- Automatic browser/device language detection
- Language selector in UI (top-right corner)
- Language preference saved in localStorage
- Entire interface translated (buttons, messages, status)

**📱 Responsive Design**
- Media queries for tablets (≤768px)
- Media queries for mobile (≤480px)
- Optimized meta viewport with `user-scalable=no`
- Adaptive font sizes
- Mobile-optimized buttons and controls
- Flexible layout for small screens
- Responsive canvas waveform
- Mobile-adapted recordings list
- Touch-optimized spacing

**💾 Persistent Storage**
- Capacitor Filesystem plugin integrated
- Automatic recording save
- Automatic loading on startup
- Dual support:
  - Web: localStorage (base64)
  - Mobile: Capacitor Filesystem (native files)
- Metadata management (name, duration, timestamp)
- Synchronized deletion (memory + storage)
- Recordings persist after app closure

**📦 Git and GitHub Preparation**
- Complete and optimized `.gitignore`
- Professional README.md for GitHub
- Contribution guide
- Organized project structure
- Complete documentation
- Build and deployment instructions

#### 🔧 Technical Improvements

**Configuration**
- `capacitor.config.json` updated with new App ID
- `package.json` renamed with English description
- `AndroidManifest.xml` with microphone permissions
- Android `strings.xml` updated

**Code**
- Separate i18n module (`i18n.js`)
- Separate storage module (`storage.js`)
- Refactored code for internationalization
- Async/await functions for storage
- Improved error handling
- All comments in English

**Dependencies**
- `@capacitor/filesystem@7.1.4` added
- All dependencies up to date

#### 📱 Android APK

**Version**: 1.0.0  
**Size**: 4.0 MB  
**Package**: `com.jn0v.reversesing`  
**Permissions**:
- `RECORD_AUDIO` - Audio recording
- `MODIFY_AUDIO_SETTINGS` - Audio settings
- `INTERNET` - Web content loading
- `WRITE_EXTERNAL_STORAGE` - For Android < 10

#### 🎯 Application Features

1. **🎙️ Audio Recording**
   - Recording from microphone
   - Real-time timer
   - Visual status indicators

2. **📂 Recordings Management**
   - List of all recordings
   - Recording counter
   - Recording selection
   - Recording deletion
   - **NEW**: Persistent save

3. **🎧 Audio Player**
   - Normal playback
   - Reverse playback (backwards)
   - Volume control
   - Stop button
   - Waveform visualization

4. **🌐 Interface**
   - Modern glassmorphism design
   - Purple/pink gradient
   - Smooth animations
   - **NEW**: Mobile responsive
   - **NEW**: Multilingual (EN/FR)

#### 🚀 Usage

**Web**:
```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

**Android**:
```bash
npm install
npx cap sync
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

#### 📝 Development Notes

- Node.js v20.19.5 required
- Java JDK 21 required for Android build
- Android SDK installed
- Capacitor 7.x

#### 🔜 Possible Future Improvements

- [ ] Share recordings
- [ ] Export as audio file
- [ ] Additional audio effects
- [ ] Customizable themes
- [ ] Dark mode
- [ ] iOS compatibility
- [ ] Additional languages (ES, DE, IT...)
- [ ] Advanced waveform visualization
- [ ] Recording editing (trim, merge)

---

**Made with ❤️ by JN0V**
