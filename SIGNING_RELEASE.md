# 🔐 Signing Release APK - ReverseSing

This guide helps you build and sign a release APK for uploading to GitHub Releases or sharing with testers.

## 1) Create a keystore (one-time)

```bash
keytool -genkeypair -v -keystore reversesing-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias reversesing
```

- Keep this file private. Do not commit it.
- Suggested location: `android/app/reversesing-release.jks`

## 2) Add signing properties (not committed)

Create `android/gradle.properties` with:
```
REVERSESING_STORE_FILE=app/reversesing-release.jks
REVERSESING_STORE_PASSWORD=your_store_password
REVERSESING_KEY_ALIAS=reversesing
REVERSESING_KEY_PASSWORD=your_key_password
```

Alternatively, export as environment variables and reference them in `build.gradle`.

## 3) Configure signing in build.gradle

Edit `android/app/build.gradle` inside `android {}`:

```
signingConfigs {
    release {
        storeFile file(REVERSESING_STORE_FILE)
        storePassword REVERSESING_STORE_PASSWORD
        keyAlias REVERSESING_KEY_ALIAS
        keyPassword REVERSESING_KEY_PASSWORD
    }
}

buildTypes {
    release {
        minifyEnabled false
        shrinkResources false
        signingConfig signingConfigs.release
    }
}
```

## 4) Build release APK

```bash
cd android
./gradlew clean assembleRelease
```

Output file:
```
android/app/build/outputs/apk/release/app-release.apk
```

## 5) Verify signature (optional)

```bash
$ANDROID_HOME/build-tools/<version>/apksigner verify --print-certs android/app/build/outputs/apk/release/app-release.apk
```

## 6) Upload to GitHub Releases

1. Go to your repository → Releases → "Draft a new release"
2. Choose tag `v1.0.0` (or latest)
3. Title and describe the release (copy from CHANGELOG)
4. Attach `app-release.apk`
5. Publish release

## Notes

- Do NOT commit `android/gradle.properties` or the `.jks` keystore file.
- F-Droid builds from source and does not use your uploaded APK, but GitHub releases help reviewers and users test quickly.
- Our `.gitignore` ignores `*.jks` and `android/gradle.properties` by default.
