let TabButtons = document.querySelectorAll('.tab-btn');
let TabContents = document.querySelectorAll('.tab-content');
let SmallTimer = document.getElementById('small-timer-container');

import { TimerState } from "./timer.js";

TabButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        TabButtons.forEach(b => b.classList.remove('active'));
        TabContents.forEach(c => c.classList.remove('active'));
        const isCondition = !event.currentTarget.classList.contains('maintimer') && TimerState.isRunning;
        SmallTimer.classList.toggle('active', isCondition);
        btn.classList.add('active');
        const targetTabId = event.currentTarget.dataset.tab;
        const targetTabContent = document.getElementById(targetTabId);
        if (targetTabContent) {
            targetTabContent.classList.add('active');
        }
    })

})

