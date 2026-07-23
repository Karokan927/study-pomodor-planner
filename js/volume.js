let SoundBtn = document.querySelector('.volume-btn');
import { Settings } from "./settings.js";
import { SoundContainer } from "./data.js";
let VolumeBtn = document.getElementById('volume-range');
let UserMusics = JSON.parse(localStorage.getItem('music-list')) || [];
let VolumeIcon = document.getElementById('volume-icon');
if (localStorage.getItem('volume-icon')) {
    VolumeIcon.src = localStorage.getItem('volume-icon');
}

let ClearMusicBtn = document.querySelectorAll('[id="ClearMusicBtn"]');




let WorkMusic = new Audio();
if (UserMusics[0]) {
    WorkMusic.src = UserMusics[0];
}
WorkMusic.loop = true;

let BreakMusic = '';
if (UserMusics[1]) {
    BreakMusic = new Audio(UserMusics[1]);
} else {
    BreakMusic = new Audio('audio/breakzvuk.wav');
}
BreakMusic.loop = true;

let TimerBell = '';
if (UserMusics[2]) {
    TimerBell = new Audio(UserMusics[2])
} else {
    TimerBell = new Audio('audio/timer-bell_m1tycbno.mp3');
}

ClearMusicBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const index = Object.keys(event.target.dataset)[0];
        UserMusics[index] = null;
        localStorage.setItem('music-list', JSON.stringify(UserMusics));
    })
})


const UserWorkMusicInput = document.getElementById('UserWorkMusic');
const UserBreakMusicInput = document.getElementById('UserBreakMusic');
const UserSignalMusicInput = document.getElementById('UserSignalMusic');

function saveUserMusic(e, number) {
    UserMusics[number] = e;
    localStorage.setItem('music-list', JSON.stringify(UserMusics));
}

UserWorkMusicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (WorkMusic) {
                WorkMusic.pause();
            }
            WorkMusic.src = e.target.result;
            WorkMusic.volume = VolumeBtn.value;
            saveUserMusic(e.target.result, 0);
        };
        reader.readAsDataURL(file);
    }
})


UserBreakMusicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (BreakMusic) {
                BreakMusic.pause();
            }
            BreakMusic.src = e.target.result;
            BreakMusic.volume = VolumeBtn.value;
            saveUserMusic(e.target.result, 1);
        };
        reader.readAsDataURL(file);
    }
})

UserSignalMusicInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (TimerBell) {
                TimerBell.pause();
            }
            TimerBell.src = e.target.result;
            TimerBell.volume = VolumeBtn.value;
            saveUserMusic(e.target.result, 2);
        };
        reader.readAsDataURL(file);
    }
})





const savedVolume = localStorage.getItem('study-volume') || 0.5;
VolumeBtn.value = savedVolume;
setVolume(savedVolume);




export function setVolume(volumeValue) {
    BreakMusic.volume = volumeValue;
    TimerBell.volume = volumeValue;
    WorkMusic.volume = volumeValue;
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

export function playWorkMusic() {
    WorkMusic.currentTime = 0;
    WorkMusic.play().catch(err => console.log(err));
}

export function stopWorkMusic() {
    WorkMusic.pause();
    WorkMusic.currentTime = 0;
}

VolumeBtn.addEventListener('input', (event) => {
    const currentVolume = event.target.value;
    setVolume(currentVolume);
    if (currentVolume > 0) {
        if (currentVolume < 0.5) {
            VolumeIcon.src = 'svg/volume-min-svgrepo-com.svg';
        } else {
            VolumeIcon.src = 'svg/volume-max-svgrepo-com.svg';
        };
    } else {
        VolumeIcon.src = 'svg/volume-xmark-svgrepo-com.svg';
    }
    localStorage.setItem('study-volume', currentVolume);
    localStorage.setItem('volume-icon', VolumeIcon.src);
})

SoundBtn.addEventListener('click', () => {
    Settings.filter(t => t !== SoundContainer).forEach(t => t.classList.remove('active'));
    SoundContainer.classList.toggle('active');
})


