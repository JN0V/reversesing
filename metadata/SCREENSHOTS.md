# 📸 Screenshots Guide for F-Droid

F-Droid requires at least 2 screenshots per language.

---

## 📋 Required Screenshots

### 1. **Main Screen - Ready to Record**
- Show the clean interface
- Logo visible
- "Record" button prominent
- Status: "Ready to record"
- Language selector visible

**File name**: `01_main_screen.png`

---

### 2. **Recording in Progress**
- Red recording button active
- Timer showing (e.g., "0:03")
- Status: "Recording..."
- Stop button enabled

**File name**: `02_recording.png`

---

### 3. **Recordings List**
- At least 2-3 recordings visible
- Shows recording names and durations
- Select and Delete buttons visible
- Recording counter visible (e.g., "My Recordings (3)")

**File name**: `03_recordings_list.png`

---

### 4. **Playback Controls**
- Selected recording shown
- Play Normal and Play Backwards buttons
- Volume control visible
- Waveform visualization (if active)

**File name**: `04_playback.png`

---

## 📱 How to Take Screenshots

### Method 1: On Real Device

1. Install APK on your phone
2. Open ReverseSing
3. Use phone's screenshot function:
   - **Most Android**: Power + Volume Down
   - **Samsung**: Power + Home (or Power + Volume Down)
   - **OnePlus**: Power + Volume Down (hold)

4. Transfer screenshots to computer:
   ```bash
   adb pull /sdcard/Pictures/Screenshots/ metadata/en-US/phoneScreenshots/
   ```

---

### Method 2: Using ADB (Automated)

```bash
# Connect phone via USB
adb devices

# Take screenshot
adb shell screencap -p /sdcard/screenshot.png

# Pull to computer
adb pull /sdcard/screenshot.png metadata/en-US/phoneScreenshots/01_main_screen.png

# Delete from phone
adb shell rm /sdcard/screenshot.png
```

---

### Method 3: Android Emulator

1. Start emulator:
   ```bash
   cd android
   ./gradlew installDebug
   # Or use Android Studio's AVD Manager
   ```

2. Take screenshots using emulator's camera icon
3. Save to metadata folders

---

## 🎨 Screenshot Requirements

### F-Droid Specifications:

- **Format**: PNG
- **Recommended size**: 1080x1920 (portrait)
- **Aspect ratio**: 9:16 (standard phone)
- **Color depth**: 24-bit RGB
- **Maximum file size**: ~1 MB each

### Quality Guidelines:

- ✅ Good lighting/contrast
- ✅ Clear, readable text
- ✅ Show actual app content
- ✅ No device frames (just the screenshot)
- ❌ No watermarks
- ❌ No promotional text overlays

---

## 📂 File Structure

```
metadata/
├── en-US/
│   └── phoneScreenshots/
│       ├── 01_main_screen.png
│       ├── 02_recording.png
│       ├── 03_recordings_list.png
│       └── 04_playback.png
└── fr-FR/
    └── phoneScreenshots/
        ├── 01_main_screen.png
        ├── 02_recording.png
        ├── 03_recordings_list.png
        └── 04_playback.png
```

**Note**: French screenshots should show the app with French language selected.

---

## 🔄 Taking French Screenshots

1. Open app
2. Click **FR** button (top-right)
3. Interface switches to French
4. Take the same 4 screenshots
5. Save to `metadata/fr-FR/phoneScreenshots/`

---

## ✅ Verification

Before submitting:

```bash
# Check files exist
ls -lh metadata/en-US/phoneScreenshots/
ls -lh metadata/fr-FR/phoneScreenshots/

# Check image dimensions
file metadata/en-US/phoneScreenshots/*.png

# Should show something like:
# PNG image data, 1080 x 1920, 8-bit/color RGB
```

---

## 📤 After Taking Screenshots

1. **Optimize images** (optional, reduces file size):
   ```bash
   # Install optipng if not installed
   # sudo apt install optipng
   
   optipng metadata/en-US/phoneScreenshots/*.png
   optipng metadata/fr-FR/phoneScreenshots/*.png
   ```

2. **Add to git**:
   ```bash
   git add metadata/
   git commit -m "Add F-Droid screenshots"
   git push
   ```

---

## 🎯 What F-Droid Will Show

Users will see:
1. Your screenshots in the app listing
2. They can swipe through them
3. Helps users decide if they want to install

Good screenshots = more downloads! 📈

---

**Take your screenshots and save them in the correct folders!** 📸
