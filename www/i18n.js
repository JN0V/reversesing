// Simple i18n system
const translations = {
    en: {
        title: "🎙️ ReverseSing",
        subtitle: "Record your voice and play it forward or backwards!",
        status_ready: "Ready to record",
        status_recording: "🔴 Recording...",
        status_finished: "✅ Recording finished!",
        status_error: "❌ Error: Cannot access microphone",
        btn_record: "🔴 Record",
        btn_stop_record: "⏹️ Stop",
        recordings_title: "📂 My Recordings",
        player_title: "🎧 Player",
        current_recording: "Now playing:",
        btn_play_normal: "▶️ Play Normal",
        btn_play_reverse: "◀️ Play Backwards",
        btn_stop_play: "⏹️ Stop",
        btn_select: "Select",
        btn_delete: "🗑️",
        btn_save: "💾 Save",
        volume_label: "🔊 Volume:",
        duration_label: "Duration:",
        no_recording: "No recording selected",
        confirm_delete: "Delete this recording?",
        save_success: "Recording saved successfully!",
        save_error: "Error saving recording",
        load_error: "Error loading recording"
    },
    fr: {
        title: "🎙️ ReverseSing",
        subtitle: "Enregistre ta voix et joue-la à l'endroit ou à l'envers !",
        status_ready: "Prêt à enregistrer",
        status_recording: "🔴 Enregistrement en cours...",
        status_finished: "✅ Enregistrement terminé !",
        status_error: "❌ Erreur : Impossible d'accéder au microphone",
        btn_record: "🔴 Enregistrer",
        btn_stop_record: "⏹️ Arrêter",
        recordings_title: "📂 Mes enregistrements",
        player_title: "🎧 Lecteur",
        current_recording: "En lecture :",
        btn_play_normal: "▶️ Jouer Normal",
        btn_play_reverse: "◀️ Jouer à l'Envers",
        btn_stop_play: "⏹️ Stop",
        btn_select: "Sélectionner",
        btn_delete: "🗑️",
        btn_save: "💾 Sauvegarder",
        volume_label: "🔊 Volume :",
        duration_label: "Durée :",
        no_recording: "Aucun enregistrement sélectionné",
        confirm_delete: "Supprimer cet enregistrement ?",
        save_success: "Enregistrement sauvegardé !",
        save_error: "Erreur lors de la sauvegarde",
        load_error: "Erreur lors du chargement"
    }
};

// Detect browser language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.split('-')[0]; // Get 'en' from 'en-US'
    return translations[lang] ? lang : 'en'; // Default to English
}

// Current language
let currentLang = detectLanguage();

// Get translation
function t(key) {
    return translations[currentLang][key] || key;
}

// Change language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        updateUI();
        // Save preference
        localStorage.setItem('language', lang);
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const saved = localStorage.getItem('language');
    if (saved && translations[saved]) {
        currentLang = saved;
    }
}

// Update all UI texts
function updateUI() {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update language buttons
    updateLanguageButtons();
}

// Update language selector buttons
function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');
        if (lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize i18n
function initI18n() {
    loadLanguagePreference();
    updateUI();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, setLanguage, initI18n, currentLang };
}
