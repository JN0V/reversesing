# ReverseSing - Request for Packaging

* [x] The app complies with the [inclusion criteria](https://f-droid.org/docs/Inclusion_Policy/?title=Inclusion_Policy).
* [x] The app is not already [listed](https://gitlab.com/search?scope=issues&group_id=28397) in the repo or issue tracker.
* [x] The app has not already [been requested](https://gitlab.com/search?scope=issues&project_id=2167965)
* [x] The upstream app source code repo contains the app metadata _(summary/description/images/changelog/etc)_ in a [Fastlane](https://gitlab.com/snippets/1895688) or [Triple-T](https://gitlab.com/snippets/1901490) folder structure
* [x] The original app author has been notified, and does not oppose the inclusion.
* [ ] Optionally [donated](https://f-droid.org/donate/) to support the maintenance of this app in F-Droid.

---

#### APPLICATION ID:

`com.jn0v.reversesing`

---

```yaml
# Categories (one per line, each starting with a space and a minus), chosen from the
# official list: https://f-droid.org/docs/Build_Metadata_Reference/#Categories
Categories:
 - Multimedia

# the one license that the whole app is available under, use
# https://spdx.org/licenses/ short identifiers, must be
# floss-compatible FSF and/or OSI approved.
License: MIT

# You can provide details on how to contact the author. These are optional, but
# nice to have.
AuthorName: JN0V
AuthorEmail: 
AuthorWebSite: https://github.com/JN0V

# A URL for the project's website, and to the source code repository to visit
# using a web browser. WebSite is optional.
WebSite: https://github.com/JN0V/reversesing
SourceCode: https://github.com/JN0V/reversesing

# A link to the issue tracker where bugs are reported
IssueTracker: https://github.com/JN0V/reversesing/issues

# If available, you can also provide links/IDs for donations.
Donate: 
Bitcoin: 
LiberaPay: 

# Name of the application
AutoName: ReverseSing

# Repository details to be used by VCS (Version Control Systems)
# git, git-svn, svn, hg or bzr
RepoType: git

# source code repo URL (HTTPS required)
Repo: https://github.com/JN0V/reversesing
```

---

**Why do you want this app added to F-Droid:**

ReverseSing fills a unique niche in the F-Droid catalog - there are currently no apps focused specifically on reverse audio playback. It's a simple, privacy-respecting tool that demonstrates how open source software can be both fun and educational. The app is built with modern web technologies (Capacitor) while maintaining full FLOSS compliance, making it a good example for developers interested in hybrid app development. It has no ads, no tracking, no analytics, and stores all data locally.

---

**Summary:**

Record your voice and play it backwards - simple audio recorder with reverse playback

---

**Description:**

ReverseSing is an audio recording app that allows you to record your voice and play it back either normally or in reverse. 

Features:

* One-tap audio recording from device microphone
* Play recordings forward or backwards
* Persistent storage - recordings saved automatically
* Multiple recordings management with list view
* Waveform visualization during playback
* Adjustable volume control
* Bilingual interface (English and French)
* Beautiful gradient UI with responsive design

Technical details:

* Built with vanilla JavaScript and Web Audio API
* Packaged as Android app using Capacitor (open source)
* Permissions: RECORD_AUDIO (for recording), MODIFY_AUDIO_SETTINGS
* No internet connection required
* All recordings stored locally on device
* No proprietary dependencies
* Minimum Android 5.1 (API 22)
* Small size (~4 MB)

Privacy:

* No ads, no tracking, no analytics
* No data collection or transmission
* All recordings remain on your device
* Only microphone permission required for core functionality

Perfect for entertainment, creative audio projects, learning pronunciation, or experimenting with sound effects.

The app includes complete Fastlane metadata with screenshots in English and French.

Build notes: The android/ folder is regenerated via Capacitor during F-Droid build. A prebuild step ensures the optional microphone hardware feature is declared in AndroidManifest.xml.

---

**Additional Build Information:**

```yaml
Builds:
  - versionName: '1.0.0'
    versionCode: 1
    commit: v1.0.0
    subdir: android
    gradle:
      - yes
    prebuild:
      - npm install
      - npx cap sync android
      - bash -lc "MANIFEST=android/app/src/main/AndroidManifest.xml; if ! grep -q 'android.hardware.microphone' \"\$MANIFEST\"; then sed -i '/MODIFY_AUDIO_SETTINGS/a\\    <uses-feature android:name=\"android.hardware.microphone\" android:required=\"false\" />' \"\$MANIFEST\"; fi"
```

Repository is clean and ready for F-Droid build. Tagged release v1.0.0 is available. Complete metadata (fastlane format) with screenshots is included in the repository under `metadata/en-US/` and `metadata/fr-FR/`.
