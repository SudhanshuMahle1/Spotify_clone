// Fixed script.js
let audio = new Audio('./assets/sample.mp3');
let isPlaying = false;

// Wait for DOM to load before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.player-controls img:nth-child(3)');
    const progressBar = document.querySelector('.progress-bar');
    const currTime = document.querySelector('.curr-time');
    const totalTime = document.querySelector('.tot-time');

    // Check if elements exist
    if (!playBtn || !progressBar || !currTime || !totalTime) {
        console.error('Required elements not found');
        return;
    }

    // Update total duration when metadata loads
    audio.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audio.duration);
        progressBar.max = Math.floor(audio.duration);
    });

    // Handle loading errors
    audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        alert('Error loading audio file. Please check if ./assets/sample.mp3 exists.');
    });

    // Toggle Play/Pause
    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                playBtn.src = './assets/pause_icon.png'; // Use pause icon when playing
                console.log('Audio started playing');
            }).catch(error => {
                console.error('Error playing audio:', error);
                alert('Cannot play audio. Check if the file exists and browser supports the format.');
            });
        } else {
            audio.pause();
            isPlaying = false;
            playBtn.src = './assets/player_icon3.png'; // Use play icon when paused
            console.log('Audio paused');
        }
    });

    // Update progress bar as music plays
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressBar.value = Math.floor(audio.currentTime);
            currTime.textContent = formatTime(audio.currentTime);
        }
    });

    // Allow seeking
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
        currTime.textContent = formatTime(audio.currentTime);
    });

    // Handle audio ending
    audio.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.src = './assets/player_icon3.png';
        progressBar.value = 0;
        currTime.textContent = '00:00';
    });

    // Utility to format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }

    // Test if audio file exists
    audio.addEventListener('canplaythrough', () => {
        console.log('Audio file loaded successfully');
    });
});