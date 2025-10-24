// Storage module for persistent recordings
// Uses localStorage for web and Capacitor Filesystem for mobile

const STORAGE_KEY = 'reversesing_recordings';
const STORAGE_DIR = 'ReverseSing';

// Check if we're running in Capacitor
function isCapacitor() {
    const hasCapacitor = typeof window.Capacitor !== 'undefined' && 
                         window.Capacitor.Plugins && 
                         window.Capacitor.Plugins.Filesystem;
    console.log('[Storage] Running in Capacitor:', hasCapacitor);
    return hasCapacitor;
}

// Get Capacitor Directory enum
function getDirectory() {
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Filesystem) {
        // Try different ways to access Directory
        if (window.Capacitor.Plugins.Filesystem.Directory) {
            return window.Capacitor.Plugins.Filesystem.Directory;
        }
        // Fallback: return string values
        return {
            Data: 'DATA',
            Documents: 'DOCUMENTS',
            Cache: 'CACHE'
        };
    }
    return null;
}

// Save recordings list metadata
async function saveRecordingsMetadata(recordings) {
    try {
        console.log('[Storage] Saving metadata for', recordings.length, 'recordings');
        const metadata = recordings.map((rec, index) => ({
            id: rec.id,
            name: rec.name,
            duration: rec.duration,
            timestamp: rec.timestamp,
            index: index
        }));
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(metadata));
        console.log('[Storage] Metadata saved successfully:', metadata);
        return true;
    } catch (error) {
        console.error('Error saving metadata:', error);
        return false;
    }
}

// Load recordings list metadata
function loadRecordingsMetadata() {
    try {
        console.log('[Storage] Loading metadata...');
        const data = localStorage.getItem(STORAGE_KEY);
        const metadata = data ? JSON.parse(data) : [];
        console.log('[Storage] Loaded', metadata.length, 'recordings metadata');
        return metadata;
    } catch (error) {
        console.error('Error loading metadata:', error);
        return [];
    }
}

// Save individual recording audio data
async function saveRecordingAudio(id, audioBlob) {
    try {
        console.log('[Storage] Saving audio for recording', id, 'size:', audioBlob.size);
        if (isCapacitor()) {
            // Use Capacitor Filesystem for mobile
            const { Filesystem } = window.Capacitor.Plugins;
            const Directory = getDirectory();
            
            // Convert blob to base64
            const reader = new FileReader();
            const base64Data = await new Promise((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(audioBlob);
            });
            
            // Save to filesystem
            await Filesystem.writeFile({
                path: `${STORAGE_DIR}/recording_${id}.webm`,
                data: base64Data,
                directory: Directory.Data
            });
            
            return true;
        } else {
            // Use localStorage for web (with base64 encoding)
            const reader = new FileReader();
            const base64Data = await new Promise((resolve, reject) => {
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(audioBlob);
            });
            
            localStorage.setItem(`recording_audio_${id}`, base64Data);
            console.log('[Storage] Audio saved to localStorage for recording', id);
            return true;
        }
    } catch (error) {
        console.error('Error saving audio:', error);
        return false;
    }
}

// Load individual recording audio data
async function loadRecordingAudio(id) {
    try {
        console.log('[Storage] Loading audio for recording', id);
        if (isCapacitor()) {
            // Load from Capacitor Filesystem
            const { Filesystem } = window.Capacitor.Plugins;
            const Directory = getDirectory();
            
            const result = await Filesystem.readFile({
                path: `${STORAGE_DIR}/recording_${id}.webm`,
                directory: Directory.Data
            });
            
            // Convert base64 to blob
            const base64Response = await fetch(`data:audio/webm;base64,${result.data}`);
            return await base64Response.blob();
        } else {
            // Load from localStorage
            const base64Data = localStorage.getItem(`recording_audio_${id}`);
            if (!base64Data) {
                console.warn('[Storage] No audio data found for recording', id);
                return null;
            }
            
            const response = await fetch(base64Data);
            const blob = await response.blob();
            console.log('[Storage] Audio loaded from localStorage for recording', id, 'size:', blob.size);
            return blob;
        }
    } catch (error) {
        console.error('Error loading audio:', error);
        return null;
    }
}

// Delete individual recording
async function deleteRecordingAudio(id) {
    try {
        if (isCapacitor()) {
            const { Filesystem } = window.Capacitor.Plugins;
            const Directory = getDirectory();
            await Filesystem.deleteFile({
                path: `${STORAGE_DIR}/recording_${id}.webm`,
                directory: Directory.Data
            });
        } else {
            localStorage.removeItem(`recording_audio_${id}`);
        }
        return true;
    } catch (error) {
        console.error('Error deleting audio:', error);
        return false;
    }
}

// Initialize storage (create directory if needed)
async function initStorage() {
    try {
        console.log('[Storage] Initializing storage...');
        if (isCapacitor()) {
            const { Filesystem } = window.Capacitor.Plugins;
            const Directory = getDirectory();
            
            // Try to create directory (will fail if exists, which is fine)
            try {
                await Filesystem.mkdir({
                    path: STORAGE_DIR,
                    directory: Directory.Data,
                    recursive: true
                });
            } catch (e) {
                // Directory probably already exists
            }
        }
        console.log('[Storage] Storage initialized successfully');
        return true;
    } catch (error) {
        console.error('[Storage] Error initializing storage:', error);
        return false;
    }
}

// Clear all stored recordings
async function clearAllRecordings() {
    try {
        const metadata = loadRecordingsMetadata();
        
        // Delete all audio files
        for (const rec of metadata) {
            await deleteRecordingAudio(rec.id);
        }
        
        // Clear metadata
        localStorage.removeItem(STORAGE_KEY);
        
        return true;
    } catch (error) {
        console.error('Error clearing recordings:', error);
        return false;
    }
}

// Export functions
if (typeof window !== 'undefined') {
    window.storage = {
        init: initStorage,
        saveMetadata: saveRecordingsMetadata,
        loadMetadata: loadRecordingsMetadata,
        saveAudio: saveRecordingAudio,
        loadAudio: loadRecordingAudio,
        deleteAudio: deleteRecordingAudio,
        clearAll: clearAllRecordings
    };
}
