# Contributing to ReverseSing

Thank you for your interest in contributing to ReverseSing!

## Development Setup

```bash
# Clone the repository
git clone https://github.com/JN0V/reversesing.git
cd reversesing

# Install dependencies
npm install

# Run web version
python3 -m http.server 8000
# Open http://localhost:8000

# Sync with Capacitor
npx cap sync

# Build Android APK
cd android
./gradlew assembleDebug
```

## Project Structure

- `www/` - Web application source code
  - `index.html` - Main HTML file
  - `style.css` - Styles with responsive design
  - `script.js` - Application logic
  - `i18n.js` - Internationalization system
  - `storage.js` - Persistent storage module
- `capacitor.config.json` - Capacitor configuration
- `package.json` - Node dependencies

## Making Changes

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/my-feature`
3. **Make your changes**
4. **Test thoroughly** (web + Android if applicable)
5. **Commit with clear message**: `git commit -m "Add: description"`
6. **Push**: `git push origin feature/my-feature`
7. **Create Pull Request**

## Code Style

- **Language**: All code, comments, and documentation in English
- **Indentation**: 4 spaces (JavaScript), 2 spaces (HTML/JSON)
- **Comments**: Clear and concise
- **Naming**: camelCase for variables/functions, PascalCase for classes

## Adding a New Language

1. Edit `www/i18n.js`
2. Add your language code and translations
3. Test the language switcher
4. Update README.md

## Commit Message Guidelines

- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Documentation
- 🎨 `:art:` - Style/UI improvements
- ⚡ `:zap:` - Performance
- 🔒 `:lock:` - Security
- 📱 `:iphone:` - Responsive/mobile
- 🌍 `:earth_africa:` - i18n

## Testing

Before submitting:
- [ ] Code works in web browser
- [ ] Mobile responsive design works
- [ ] Both languages (EN/FR) work
- [ ] Audio recording works
- [ ] Playback (normal and reverse) works
- [ ] Storage persistence works
- [ ] No console errors

## Questions?

Open an issue or reach out to @JN0V

---

Thank you for contributing! 🎉
