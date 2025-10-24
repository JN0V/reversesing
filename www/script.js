// Global variables
let mediaRecorder;
let audioChunks = [];
let audioContext;
let audioBuffer;
let source;
let isRecording = false;
let isPlaying = false;
let recordingStartTime;
let timerInterval;
let recordings = []; // List of all recordings
let currentRecordingIndex = null; // Index of currently selected recording
let recordingCounter = 0; // Counter for naming recordings

// DOM elements
const recordBtn = document.getElementById('record-btn');
const stopRecordBtn = document.getElementById('stop-record-btn');
const playNormalBtn = document.getElementById('play-normal-btn');
const playReverseBtn = document.getElementById('play-reverse-btn');
const stopPlayBtn = document.getElementById('stop-play-btn');
const statusDiv = document.getElementById('status');
const timerDiv = document.getElementById('timer');
const playerSection = document.getElementById('player-section');
const volumeSlider = document.getElementById('volume');
const volumeValue = document.getElementById('volume-value');
const canvas = document.getElementById('waveform');
const canvasCtx = canvas.getContext('2d');
const recordingsSection = document.getElementById('recordings-section');
const recordingsList = document.getElementById('recordings-list');
const recordingCount = document.getElementById('recording-count');
const currentRecordingName = document.getElementById('current-recording-name');

// Initialize AudioContext
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Update timer
function updateTimer() {
    const elapsed = (Date.now() - recordingStartTime) / 1000;
    timerDiv.textContent = formatTime(elapsed);
}

// Start recording
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            await loadAudio(audioBlob);
            
            // Stop all stream tracks
            stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorder.start();
        isRecording = true;
        recordingStartTime = Date.now();
        
        // Update interface
        statusDiv.textContent = 'Recording in progress...';
        statusDiv.classList.add('recording');
        recordBtn.disabled = true;
        stopRecordBtn.disabled = false;
        
        // Start timer
        timerInterval = setInterval(updateTimer, 100);
        
    } catch (error) {
        console.error('Microphone access error:', error);
        statusDiv.textContent = 'Error: Unable to access microphone';
    }
}

// Stop recording
function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        // Stop timer
        clearInterval(timerInterval);
        
        // Update interface
        statusDiv.textContent = 'Recording stopped!';
        statusDiv.classList.remove('recording');
        recordBtn.disabled = false;
        stopRecordBtn.disabled = true;
    }
}

// Load audio into AudioContext
async function loadAudio(audioBlob) {
    initAudioContext();
    
    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Calculate recording duration
    const duration = buffer.duration;
    
    // Create recording object
    recordingCounter++;
    const recording = {
        id: recordingCounter,
        name: `Recording ${recordingCounter}`,
        buffer: buffer,
        blob: audioBlob,
        duration: duration,
        timestamp: new Date()
    };
    
    // Add to list
    recordings.push(recording);
    
    // Save automatically
    await saveRecording(recording, audioBlob);
    
    // Update display
    updateRecordingsList();
    
    // Automatically select the new recording
    selectRecording(recordings.length - 1);
}

// Draw waveform
function drawWaveform(buffer) {
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / canvas.width);
    const amp = canvas.height / 2;
    
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    canvasCtx.strokeStyle = '#4CAF50';
    canvasCtx.lineWidth = 2;
    canvasCtx.beginPath();
    
    for (let i = 0; i < canvas.width; i++) {
        const min = Math.min(...data.slice(i * step, (i + 1) * step));
        const max = Math.max(...data.slice(i * step, (i + 1) * step));
        
        canvasCtx.moveTo(i, (1 + min) * amp);
        canvasCtx.lineTo(i, (1 + max) * amp);
    }
    
    canvasCtx.stroke();
}

// Update recordings list
function updateRecordingsList() {
    recordingsList.innerHTML = '';
    recordingCount.textContent = recordings.length;
    
    if (recordings.length > 0) {
        recordingsSection.style.display = 'block';
    }
    
    recordings.forEach((recording, index) => {
        const item = document.createElement('div');
        item.className = 'recording-item';
        if (index === currentRecordingIndex) {
            item.classList.add('active');
        }
        
        item.innerHTML = `
            <div class="recording-info">
                <div class="recording-name"> ${recording.name}</div>
                <div class="recording-duration">Duration: ${formatTime(recording.duration)}</div>
            </div>
            <div class="recording-actions">
                <button class="btn btn-small btn-play" onclick="selectRecording(${index})">
                    ▶️ Select
                </button>
                <button class="btn btn-small btn-delete" onclick="deleteRecording(${index})">
                    🗑️ Delete
                </button>
            </div>
        `;
        
        recordingsList.appendChild(item);
    });
}

// Select a recording
function selectRecording(index) {
    if (index < 0 || index >= recordings.length) return;
    
    stopAudio();
    
    currentRecordingIndex = index;
    const recording = recordings[index];
    audioBuffer = recording.buffer;
    
    // Update display
    currentRecordingName.textContent = `Playing: ${recording.name}`;
    playerSection.style.display = 'block';
    
    // Draw waveform
    drawWaveform(audioBuffer);
    
    // Update list
    updateRecordingsList();
}

// Delete a recording
function deleteRecording(index) {
    if (index < 0 || index >= recordings.length) return;
    
    // If it's the currently playing recording, stop playback
    if (index === currentRecordingIndex) {
        stopAudio();
        currentRecordingIndex = null;
        audioBuffer = null;
        playerSection.style.display = 'none';
    } else if (currentRecordingIndex !== null && index < currentRecordingIndex) {
        // Adjust current index if deleting a recording before the current one
        currentRecordingIndex--;
    }
    
    // Remove from list
    recordings.splice(index, 1);
    
    // Update display
    updateRecordingsList();
    
    // Hide player if no more recordings
    if (recordings.length === 0) {
        recordingsSection.style.display = 'none';
        playerSection.style.display = 'none';
    }
}

// Play audio normally
function playNormal() {
    if (!audioBuffer) return;
    
    stopAudio();
    initAudioContext();
    
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    
    // Connect gain for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volumeSlider.value / 100;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.onended = () => {
        isPlaying = false;
        playNormalBtn.disabled = false;
        playReverseBtn.disabled = false;
    };
    
    source.start(0);
    isPlaying = true;
    playNormalBtn.disabled = true;
    playReverseBtn.disabled = true;
}

// Play audio in reverse
function playReverse() {
    if (!audioBuffer) return;
    
    stopAudio();
    initAudioContext();
    
    // Create new buffer with reversed data
    const reversedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        audioBuffer.length,
        audioBuffer.sampleRate
    );
    
    // Reverse each channel
    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const inputData = audioBuffer.getChannelData(channel);
        const outputData = reversedBuffer.getChannelData(channel);
        
        for (let i = 0; i < audioBuffer.length; i++) {
            outputData[i] = inputData[audioBuffer.length - 1 - i];
        }
    }
    
    // Create new buffer source
    source = audioContext.createBufferSource();
    source.buffer = reversedBuffer;
    
    // Connect gain for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volumeSlider.value / 100;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.onended = () => {
        isPlaying = false;
        playNormalBtn.disabled = false;
        playReverseBtn.disabled = false;
    };
    
    source.start(0);
    isPlaying = true;
    playNormalBtn.disabled = true;
    playReverseBtn.disabled = true;
}

// Stop playback
function stopAudio() {
    if (source && isPlaying) {
        source.stop();
        source.disconnect();
        isPlaying = false;
        playNormalBtn.disabled = false;
        playReverseBtn.disabled = false;
    }
}

// Events
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize i18n (will call updateLanguageButtons internally)
    initI18n();
    
    // Initialize storage
    await storage.init();
    
    // Load saved recordings
    await loadSavedRecordings();
});

recordBtn.addEventListener('click', startRecording);
stopRecordBtn.addEventListener('click', stopRecording);
playNormalBtn.addEventListener('click', playNormal);
playReverseBtn.addEventListener('click', playReverse);
stopPlayBtn.addEventListener('click', stopAudio);

volumeSlider.addEventListener('input', (e) => {
    volumeValue.textContent = e.target.value + '%';
});

// Make functions globally available for onclick
window.selectRecording = selectRecording;
window.deleteRecording = deleteRecording;

// Save recording to persistent storage
async function saveRecording(recording, audioBlob) {
    try {
        // Save audio file
        await storage.saveAudio(recording.id, audioBlob);
        
        // Save metadata
        await storage.saveMetadata(recordings);
        
        console.log(`Recording ${recording.id} saved successfully`);
    } catch (error) {
        console.error('Error saving recording:', error);
    }
}

// Load saved recordings from storage
async function loadSavedRecordings() {
    try {
        console.log('[App] Loading saved recordings...');
        const metadata = storage.loadMetadata();
        
        if (metadata.length === 0) {
            console.log('[App] No saved recordings found');
            return;
        }
        
        console.log(`[App] Loading ${metadata.length} saved recordings...`);
        
        for (const meta of metadata) {
            try {
                console.log('[App] Processing recording', meta.id, meta.name);
                // Load audio blob
                const audioBlob = await storage.loadAudio(meta.id);
                if (!audioBlob) {
                    console.warn('[App] Skipping recording', meta.id, '- no audio data');
                    continue;
                }
                
                // Decode audio
                initAudioContext();
                const arrayBuffer = await audioBlob.arrayBuffer();
                const buffer = await audioContext.decodeAudioData(arrayBuffer);
                
                // Recreate recording object
                const recording = {
                    id: meta.id,
                    name: meta.name,
                    buffer: buffer,
                    blob: audioBlob,
                    duration: meta.duration,
                    timestamp: new Date(meta.timestamp)
                };
                
                recordings.push(recording);
                
                // Update counter to avoid ID conflicts
                if (meta.id >= recordingCounter) {
                    recordingCounter = meta.id + 1;
                }
            } catch (error) {
                console.error(`Error loading recording ${meta.id}:`, error);
            }
        }
        
        // Update UI
        if (recordings.length > 0) {
            updateRecordingsList();
            console.log(`${recordings.length} recordings loaded successfully`);
        }
    } catch (error) {
        console.error('Error loading saved recordings:', error);
    }
}

// Store original delete function before overriding
const originalDeleteRecording = deleteRecording;

// Delete recording and update storage
async function deleteRecordingWithStorage(index) {
    if (index < 0 || index >= recordings.length) return;
    
    const recording = recordings[index];
    
    // Delete from storage
    await storage.deleteAudio(recording.id);
    
    // Delete from memory (use original function)
    originalDeleteRecording(index);
    
    // Update metadata
    await storage.saveMetadata(recordings);
}

// Override deleteRecording to use storage
window.deleteRecording = async function(index) {
    await deleteRecordingWithStorage(index);
};

// Welcome message
console.log('🎙️ ReverseSing loaded!');
console.log('Click the red button to start recording.');
console.log('Recordings are automatically saved!');
