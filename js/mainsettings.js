const MainSettings = document.getElementById('MainSettings');
const OpenSettingsBtn = document.getElementById('OpenSettingsBtn');
const overlay = document.getElementById('SettingsOverlay');
import { resetTime } from "./timer.js";

if (MainSettings && OpenSettingsBtn && overlay) {
  const toggleMenu = () => {
    const isActive = MainSettings.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    OpenSettingsBtn.setAttribute('aria-expanded', isActive);
  };
  OpenSettingsBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
}

let AutoBreakInput = document.getElementById('AutoBreak');
let AutoStartInput = document.getElementById('AutoSession');
export let AutoBreak = localStorage.getItem('autobreak') === 'true';
export let AutoStart = localStorage.getItem('autostart') === 'true';

AutoBreakInput.checked = AutoBreak;
AutoStartInput.checked = AutoStart;


AutoBreakInput.addEventListener('change', () => {
  localStorage.setItem('autobreak', AutoBreakInput.checked);
})

AutoStartInput.addEventListener('change', () => {
  localStorage.setItem('autostart', AutoStartInput.checked);
})

let TimeSelectInput = document.querySelectorAll('.MainSettings-timeSelector');
export let BREAK_TIME = Number(localStorage.getItem('break-time')) || 5 * 60;
export let WORK_TIME = Number(localStorage.getItem('work-time')) || 25 * 60;

TimeSelectInput.forEach((btn) => {
  if (btn.dataset.mode === localStorage.getItem('time-name')) {
    btn.checked = true;
  }
})

TimeSelectInput.forEach((btn) => {
  btn.addEventListener('change', (event) => {
    TimeSelectInput.forEach(t => t.checked = false);
    event.target.checked = true;  
    const mode = event.target.dataset.mode;
    if (mode === 'classic') {
      WORK_TIME = 25 * 60;
      BREAK_TIME = 5 * 60;
      localStorage.setItem('time-name', 'classic');
    } else if (mode === 'long') {
      WORK_TIME = 50 * 60;
      BREAK_TIME = 10 * 60;
      localStorage.setItem('time-name', 'long');
    } else {
      WORK_TIME = 15 * 60;
      BREAK_TIME = 3 * 60;
      localStorage.setItem('time-name', 'short');
    };
    resetTime();
    localStorage.setItem('work-time', WORK_TIME);
    localStorage.setItem('break-time', BREAK_TIME);
  })
})

let RestoreBtn = document.getElementById('Restore');
RestoreBtn.addEventListener('click', () => {
  localStorage.removeItem('active-task');
  localStorage.removeItem('break-time');
  localStorage.removeItem('music-list');
  localStorage.removeItem('selectedTheme');
  localStorage.removeItem('study-timer-state');
  localStorage.removeItem('autobreak');
  localStorage.removeItem('work-time');
  localStorage.removeItem('autostart');
  localStorage.setItem('time-name', 'classic');
  window.location.reload();
})