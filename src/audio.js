// Audio synthesis helper for dynamic 3D sound effects
export let audioCtx = null;
export let audioAllowed = false;

// Must be called on user interaction (like a click) to unlock system audio
export const initAudio = () => {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtx = new AudioContext();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    audioAllowed = true;
};

// Generates mathematical synthesizer sounds on the fly (no external MP3/WAV files)
export const playSound = (type = 'click') => {
    if (!audioAllowed || !audioCtx) return;

    try {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'click') {
            // Clean, modern UI click
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.03);

        } else if (type === 'reveal') {
            // Gentle popup sound for scroll intersection
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(500, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.05);

        } else if (type === 'scroll') {
            // Crisp, tactile tick gear sound for scrolling
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.02);
            gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.02);

        } else if (type === 'hover') {
            // Slick futuristic hover frequency sweeping
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(500, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.05);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.05);
        }
    } catch (e) {
        console.error('Failed to play synthesizer:', e);
    }
};
