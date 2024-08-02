let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapCounter = 1;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startPauseButton.addEventListener('click', function() {
    if (!isRunning) {
        start();
        startPauseButton.textContent = 'Pause';
        isRunning = true;
    } else {
        pause();
        startPauseButton.textContent = 'Resume';
        isRunning = false;
    }
});

resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
}

function pause() {
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    startPauseButton.textContent = 'Start';
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    lapCounter = 1;
    updateDisplay();
    lapsList.innerHTML = '';
}

function lap() {
    laps.push(elapsedTime);
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime.minutes}:${lapTime.seconds}.${lapTime.milliseconds}`;
    lapsList.prepend(lapItem);
    lapCounter++;
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    updateDisplay();
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    minutesDisplay.textContent = time.minutes;
    secondsDisplay.textContent = time.seconds;
    millisecondsDisplay.textContent = time.milliseconds;
}

function formatTime(milliseconds) {
    const totalSeconds = milliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    const formattedMilliseconds = Math.floor(milliseconds % 1000).toString().padStart(3, '0');
    return {
        minutes,
        seconds,
        milliseconds: formattedMilliseconds
    };
}
