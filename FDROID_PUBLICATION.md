# 📱 F-Droid Publication Guide - ReverseSing

**Date**: 2025-10-24 13:02 UTC+02  
**App**: ReverseSing v1.0.0  
**Status**: Ready for submission

---

## ✅ F-Droid Requirements Check

### 1. **Open Source** ✅
- Repository: GitHub (will be public)
- License: Need to add (MIT recommended)
- All source code available

### 2. **No Anti-Features** ✅
- ❌ No ads
- ❌ No tracking
- ❌ No proprietary dependencies
- ❌ No non-free network services
- ✅ 100% FOSS

### 3. **Build from Source** ✅
- Uses Capacitor (open source)
- Uses standard Android build tools
- No proprietary SDKs

---

## 📋 Pre-Submission Checklist

### Step 1: Add Open Source License

Create `LICENSE` file (MIT recommended):

```bash
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 JN0V

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
```

### Step 2: Update README with F-Droid Badge

Add to README.md:

```markdown
## 📦 Installation

### F-Droid (Recommended)
[<img src="https://fdroid.gitlab.io/artwork/badge/get-it-on.png" alt="Get it on F-Droid" height="80">](https://f-droid.org/packages/com.jn0v.reversesing)

### APK Direct Download
Download from [Releases](https://github.com/JN0V/reversesing/releases)
```

### Step 3: Add Fastlane Metadata (F-Droid Format)

Create metadata structure:

```bash
mkdir -p metadata/en-US
mkdir -p metadata/fr-FR
```

---

## 📝 F-Droid Metadata Files

### metadata/en-US/full_description.txt

```
ReverseSing - Record and Reverse Audio

🎙️ Features:
• Record your voice with one tap
• Play recordings forward or backwards
• Persistent storage - recordings saved automatically
• Beautiful, intuitive interface
• No ads, no tracking, 100% open source

🎵 How it works:
1. Tap the red Record button
2. Speak into your microphone
3. Tap Stop when done
4. Select your recording
5. Play it normally or in reverse!

🌍 Multilingual:
• English
• French
• More languages coming soon

🔒 Privacy:
• All recordings stored locally on your device
• No internet connection required
• No data collection
• No permissions beyond microphone access

🎨 Perfect for:
• Learning to pronounce words backwards
• Creating fun audio effects
• Experimenting with your voice
• Entertainment and creative projects

Open source and free forever!
```

### metadata/en-US/short_description.txt

```
Record your voice and play it backwards
```

### metadata/en-US/title.txt

```
ReverseSing
```

### metadata/fr-FR/full_description.txt

```
ReverseSing - Enregistrez et Inversez l'Audio

🎙️ Fonctionnalités:
• Enregistrez votre voix en un clic
• Jouez les enregistrements à l'endroit ou à l'envers
• Stockage persistant - tout est sauvegardé automatiquement
• Interface magnifique et intuitive
• Pas de pub, pas de tracking, 100% open source

🎵 Comment ça marche:
1. Appuyez sur le bouton rouge Enregistrer
2. Parlez dans votre microphone
3. Appuyez sur Stop quand c'est fini
4. Sélectionnez votre enregistrement
5. Jouez-le normalement ou à l'envers !

🌍 Multilingue:
• Anglais
• Français
• Plus de langues bientôt

🔒 Confidentialité:
• Tous les enregistrements stockés localement sur votre appareil
• Pas de connexion internet requise
• Pas de collecte de données
• Aucune permission sauf accès au microphone

🎨 Parfait pour:
• Apprendre à prononcer des mots à l'envers
• Créer des effets audio amusants
• Expérimenter avec votre voix
• Divertissement et projets créatifs

Open source et gratuit pour toujours !
```

### metadata/fr-FR/short_description.txt

```
Enregistrez votre voix et jouez-la à l'envers
```

### metadata/fr-FR/title.txt

```
ReverseSing
```

---

## 📸 Screenshots (Required)

F-Droid requires screenshots. Create in:

```
metadata/en-US/phoneScreenshots/
metadata/fr-FR/phoneScreenshots/
```

**Required**:
- At least 2 screenshots
- PNG format
- Recommended size: 1080x1920 (portrait)

**Take screenshots showing**:
1. Main recording screen (ready state)
2. Recording in progress
3. List of recordings
4. Playback controls

---

## 🚀 Submission Process

### Method 1: Request For Packaging (RFP)

1. **Push to GitHub first**
   ```bash
   git push -u origin main
   ```

2. **Create issue on F-Droid's RFP repo**
   - Go to: https://gitlab.com/fdroid/rfp/-/issues
   - Click "New Issue"
   - Use template:

```markdown
### Application

**Name**: ReverseSing
**Package**: com.jn0v.reversesing
**Description**: Record your voice and play it backwards
**License**: MIT
**Source Code**: https://github.com/JN0V/reversesing
**Issue Tracker**: https://github.com/JN0V/reversesing/issues
**Website**: (optional)

### Why this app should be added

ReverseSing is a unique, simple, and privacy-respecting audio recording app that allows users to play their recordings in reverse. It's:

- 100% open source (MIT License)
- No ads, no tracking
- No proprietary dependencies
- Uses only standard Android permissions (RECORD_AUDIO)
- Built with Capacitor (open source framework)
- Small size (~4 MB)
- Fully functional offline
- Bilingual (EN/FR)

Perfect for entertainment, learning, and creative audio projects.

### Additional information

- **App Category**: Multimedia
- **Anti-Features**: None
- **Build System**: Gradle + Capacitor
- **Minimum SDK**: 22 (Android 5.1)
- **Target SDK**: 34 (Android 14)
```

### Method 2: Submit Metadata Directly (Advanced)

1. **Fork F-Droid Data repo**
   ```bash
   git clone https://gitlab.com/fdroid/fdroiddata.git
   cd fdroiddata
   ```

2. **Create metadata file**: `metadata/com.jn0v.reversesing.yml`

```yaml
Categories:
  - Multimedia
License: MIT
AuthorName: JN0V
AuthorEmail: jn0v@reversesing.app
SourceCode: https://github.com/JN0V/reversesing
IssueTracker: https://github.com/JN0V/reversesing/issues

AutoName: ReverseSing
Description: |-
  Record your voice and play it backwards.
  
  Features:
  * Record audio with one tap
  * Play recordings forward or backwards
  * Automatic persistent storage
  * Beautiful gradient interface
  * Bilingual support (EN/FR)
  * No ads, no tracking
  
  Perfect for entertainment and creative audio projects.

RepoType: git
Repo: https://github.com/JN0V/reversesing

Builds:
  - versionName: '1.0.0'
    versionCode: 1
    commit: v1.0.0
    subdir: android
    gradle:
      - yes
    prebuild:
      - npm install
      - npx cap sync

AutoUpdateMode: Version %v
UpdateCheckMode: Tags
CurrentVersion: 1.0.0
CurrentVersionCode: 1
```

3. **Submit merge request**
   ```bash
   git checkout -b add-reversesing
   git add metadata/com.jn0v.reversesing.yml
   git commit -m "New app: ReverseSing"
   git push origin add-reversesing
   # Then create merge request on GitLab
   ```

---

## ⏱️ Timeline

### Typical F-Droid Process:

1. **Submit RFP**: 5 minutes
2. **Community review**: 1-7 days
3. **Maintainer review**: 1-14 days
4. **First build**: 1-3 days
5. **Published**: Total 1-4 weeks

### What happens:

1. ✅ You submit RFP or metadata
2. 🔍 F-Droid bot checks repository
3. 🏗️ F-Droid builds from source
4. ✅ Build verification
5. 📦 Published to F-Droid catalog
6. 🔄 Auto-updates on new tags

---

## 🏷️ Version Management for F-Droid

### For updates:

1. **Update version in package.json**
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Update CHANGELOG.md**

3. **Commit changes**
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Release v1.0.1"
   ```

4. **Create Git tag**
   ```bash
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```

5. **F-Droid auto-detects and builds** (if AutoUpdateMode set)

---

## 📊 Build Configuration

### Ensure build reproducibility:

1. **Lock npm versions** (already done with package-lock.json) ✅

2. **Fix Capacitor version** in package.json:
   ```json
   {
     "dependencies": {
       "@capacitor/core": "6.2.0",
       "@capacitor/android": "6.2.0",
       "@capacitor/filesystem": "6.0.1"
     }
   }
   ```

3. **Gradle version** (already set in android/gradle/wrapper) ✅

---

## 🔍 Pre-Submission Tests

Run these before submitting:

```bash
# 1. Clean build test
cd android
./gradlew clean
./gradlew assembleRelease

# 2. Check for proprietary code
# Should output nothing:
grep -r "gms" android/app/src/ || echo "No Google Play Services ✅"

# 3. Verify permissions
cat android/app/src/main/AndroidManifest.xml | grep "uses-permission"
# Should only show RECORD_AUDIO

# 4. Check build size
ls -lh android/app/build/outputs/apk/release/
# Should be under 5 MB
```

---

## 📝 Checklist Before Submission

- [ ] LICENSE file added (MIT)
- [ ] GitHub repository is public
- [ ] No proprietary dependencies
- [ ] No anti-features (ads, tracking)
- [ ] README has clear description
- [ ] Fastlane metadata created
- [ ] Screenshots taken (2+ per language)
- [ ] Version tagged (v1.0.0)
- [ ] Clean build succeeds
- [ ] App tested and working

---

## 🎯 After F-Droid Acceptance

### Promote your app:

1. **Add F-Droid badge to README**
2. **Announce on social media**
3. **Update website** (if any)
4. **Reply to users in F-Droid comments**

### Maintain:

1. **Monitor F-Droid build status**
2. **Respond to issues on GitHub**
3. **Release updates via Git tags**
4. **Keep CHANGELOG updated**

---

## 🔗 Useful Links

- **F-Droid Main**: https://f-droid.org
- **RFP Tracker**: https://gitlab.com/fdroid/rfp/-/issues
- **F-Droid Data**: https://gitlab.com/fdroid/fdroiddata
- **Build Metadata**: https://f-droid.org/docs/Build_Metadata_Reference/
- **Inclusion Policy**: https://f-droid.org/docs/Inclusion_Policy/

---

## 🆘 Getting Help

- **F-Droid Forum**: https://forum.f-droid.org
- **Matrix Chat**: #fdroid:f-droid.org
- **IRC**: #fdroid on OFTC

---

## 📦 Quick Start Commands

```bash
# 1. Add license
cat > LICENSE << 'EOF'
MIT License
Copyright (c) 2025 JN0V
[... full license text ...]
EOF

# 2. Create metadata directories
mkdir -p metadata/en-US/phoneScreenshots
mkdir -p metadata/fr-FR/phoneScreenshots

# 3. Commit and push
git add LICENSE metadata/
git commit -m "Add F-Droid metadata and license"
git push

# 4. Create release tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 5. Submit RFP on F-Droid GitLab
# Go to: https://gitlab.com/fdroid/rfp/-/issues/new
```

---

**ReverseSing is ready for F-Droid! 🎉**

*Open source, privacy-respecting, and free forever.*
