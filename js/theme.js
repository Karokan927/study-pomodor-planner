export let Themes = document.getElementById('themes');
let ThemeBtn = document.getElementById('settings-theme-btn');
let ThemeContent = document.querySelectorAll('.theme-item');
let MainBody = document.getElementById('MainBody');

const defautlTheme = MainBody.className || 'white-theme';
const savedTheme = localStorage.getItem('selectedTheme') || defautlTheme;


MainBody.className = savedTheme;
ThemeContent.forEach((btn) => {
    if (btn.dataset.theme === savedTheme) {
        btn.classList.add('active');
        btn.textContent = 'Selected';
    } else {
        btn.classList.remove('active');
        btn.textContent = '';
    }
})

import { Settings } from "./settings.js";

ThemeBtn.addEventListener('click', function () {
    Settings.filter(t => t !== Themes).forEach(t => t.classList.remove('active'));
    Themes.classList.toggle('active');
})


ThemeContent.forEach((btn) => {
    btn.addEventListener('click', function () {
        if (this.classList.contains('active')) return;
        ThemeContent.forEach(t => {
            t.classList.remove('active');
            t.textContent = '';
        });
        this.classList.add('active');
        this.textContent = 'Selected';
        const selectedTheme = this.dataset.theme;
        MainBody.className = selectedTheme;
        localStorage.setItem('selectedTheme', selectedTheme);
    })
})

