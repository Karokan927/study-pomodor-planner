import { playBreakMusic, stopBreakMusic, playBell, playWorkMusic, stopWorkMusic } from "./volume.js";
import { AutoBreak, AutoStart } from "./mainsettings.js";
import { BREAK_TIME, WORK_TIME } from "./mainsettings.js";

export let TimerState = JSON.parse(localStorage.getItem('study-timer-state')) || {
    timeLeft: WORK_TIME,
    isRunning: false,
    pomodorosCompleted: 0,
    isWorkSession: true
}

let TimerText = document.getElementById('timer-text');

function changeTimerText() {
    if (TimerState.isWorkSession) {
        TimerText.textContent = 'Time to work!'
    } else {
        TimerText.textContent = 'Have a rest a little!'
    }
}

changeTimerText()


let TimerInterval = null;
function saveTimerState() {
    localStorage.setItem('study-timer-state', JSON.stringify(TimerState))
}

const SmallTimer = document.getElementById('small-timer');
const TimerDisplay = document.getElementById('timer-display');
function updateTimerDisplay() {
    const minutes = Math.floor(TimerState.timeLeft / 60);
    const seconds = TimerState.timeLeft % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    SmallTimer.textContent = `${formattedMinutes} : ${formattedSeconds}`;
    TimerDisplay.textContent = `${formattedMinutes} : ${formattedSeconds}`;
}

let TotalPomodoros = document.getElementById('total-pomodoros');



const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let weeklyStats = JSON.parse(localStorage.getItem('study-weekly-stats')) || Array(7).fill(0);



function tick() {
    if (TimerState.timeLeft > 0) {
        TimerState.timeLeft--;
        saveTimerState();
        updateTimerDisplay();
    } else {
        stopWorkMusic();
        if (TimerState.isWorkSession) {
            if (!AutoBreak) {
                alert('Nice job! Have a break!');
            };
            TimerState.isWorkSession = false;
            TimerState.timeLeft = BREAK_TIME;
            TimerState.pomodorosCompleted += 1;
            TotalPomodoros.textContent = `${TimerState.pomodorosCompleted} sessions completed`;
            const DayWeek = new Date().getDay();
            weeklyStats[DayWeek] += 1;
            localStorage.setItem('study-weekly-stats', JSON.stringify(weeklyStats));
            MyChart.update();
            playBreakMusic();
        } else {
            if (!AutoStart) {
                alert('Break is over! Time to work!');
            }
            TimerState.isWorkSession = true;
            TimerState.timeLeft = WORK_TIME;
            stopBreakMusic();
            playBell();
        }

        saveTimerState();
        updateTimerDisplay();
        changeTimerText()
    }
}

let TimerStart = document.getElementById('timer-start');
let TimerStop = document.getElementById('timer-stop');
let TimerReset = document.getElementById('timer-reset');

TimerStart.addEventListener('click', function () {
    if (TimerState.isRunning === true) return;
    TimerState.isRunning = true;
    saveTimerState();
    TimerInterval = setInterval(tick, 1000);
    if (!TimerState.isWorkSession) {
        playBreakMusic();
    } else {
        playWorkMusic();
    }
})

TimerStop.addEventListener('click', function () {
    if (TimerState.isRunning === false) return;
    TimerState.isRunning = false;
    saveTimerState();
    clearInterval(TimerInterval);
    stopBreakMusic();
    stopWorkMusic();
})

export function resetTime() {
    clearInterval(TimerInterval);
    TimerState.isRunning = false;
    TimerState.timeLeft = WORK_TIME;
    saveTimerState();
    updateTimerDisplay();
    TimerState.isWorkSession = true;
    changeTimerText();
    stopBreakMusic();
    stopWorkMusic();
}

TimerReset.addEventListener('click', resetTime());


updateTimerDisplay();



const ctx = document.getElementById('myChart');
let MyChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: daysOfWeek,
        datasets: [{
            label: 'Completed Sessions',
            data: weeklyStats,
            backgroundColor: '#333',
            borderRadius: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
})

MyChart.update();
TotalPomodoros.textContent = `${TimerState.pomodorosCompleted} sessions completed`;








if (TimerState.isRunning) {
    TimerInterval = setInterval(tick, 1000);
}





