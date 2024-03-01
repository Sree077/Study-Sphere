let isSession = true; // True when in session, false when in break
let minute = 1;
let sessionDuration = minute * 60; // 25 minutes
let breakDuration = minute * 60; // 5 minutes
let timeLeft = sessionDuration; // Initial time left is set to session duration

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-timer-btn');


startButton.addEventListener('click', function() {
    startTimer(sessionDuration); // Start with a session duration
    
    
});

function startTimer(duration) {
    startButton.disabled = true;
    timerDisplay.readOnly=true;
    // alert(typeof(timerDisplay.value))
    timeLeft = duration;
    updateTimerDisplay(timeLeft);

    const timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft < 0) {
            clearInterval(timer);
            if (isSession) {
                // Switch to break time
                isSession = false;
                timeLeft = breakDuration;
                alert('Time for a break! Starting break.');
                startTimer(breakDuration); // Automatically start break
            } else {
                // Switch back to session time
                isSession = true;
                timeLeft = sessionDuration;
                alert('Break is over, back to work! Starting session.');
                startTimer(sessionDuration); // Automatically start session
            }
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.value = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
