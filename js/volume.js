let SoundBtn = document.querySelector('.volume-btn');
import { Settings } from "./settings.js";
import { SoundContainer } from "./data.js";
let VolumeBtn = document.getElementById('volume-range');


let BreakMusic = new Audio();
BreakMusic.src = 'audio/breakzvuk.wav'
BreakMusic.loop = true;

let TimerBell = new Audio('audio/timer-bell_m1tycbno.mp3');


const savedVolume = localStorage.getItem('study-volume') || 0.5;
VolumeBtn.value = savedVolume;
setVolume(savedVolume);




export function setVolume(volumeValue) {
    BreakMusic.volume = volumeValue;
    TimerBell.volume = volumeValue;
}

export function playBell() {
    TimerBell.play().catch(err => console.log(err))
}


export function playBreakMusic() {
    BreakMusic.currentTime = 0;
    BreakMusic.play().catch(err => console.log(err));
}

export function stopBreakMusic() {
    BreakMusic.pause();
    BreakMusic.currentTime = 0;
}

VolumeBtn.addEventListener('input', (event) => {
    const currentVolume = event.target.value;
    setVolume(currentVolume);
    localStorage.setItem('study-volume', currentVolume);
})


SoundBtn.addEventListener('click', () => {
    Settings.filter(t => t !== SoundContainer).forEach(t => t.classList.remove('active'));
    SoundContainer.classList.toggle('active');
})


