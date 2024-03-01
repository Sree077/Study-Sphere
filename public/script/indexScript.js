const timerDisplayHour = document.getElementById('timer-display-hour');
const timerDisplayMinute = document.getElementById('timer-display-minute');
const timerDisplaySecond = document.getElementById('timer-display-second');
const startButton = document.getElementById('start-timer-btn');

let initialHours = 0;
let initialMinutes = 0;
let initialSeconds = 0;
let intervalId = null; // Variable to hold the interval ID

function startTimer() {
  // Validate user input:
  if (!validateInput()) {
    alert("Invalid input! Please enter valid numbers for hours, minutes, and seconds.");
    return; // Prevent further execution if input is invalid
  }

  // Get initial values and convert to numbers (if necessary):
  initialHours = parseInt(timerDisplayHour.value) || 0;
  initialMinutes = parseInt(timerDisplayMinute.value) || 0;
  initialSeconds = parseInt(timerDisplaySecond.value) || 0;

  // Disable start button:
  startButton.disabled = true;

  // Calculate initial total seconds:
  let totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;

  // Start the timer:
  intervalId = setInterval(() => {
    // Decrement total seconds:
    totalSeconds--;

    // Handle timer completion and stop:
    if (totalSeconds <= 0) {
      alert("Timer completed!");
      clearInterval(intervalId);
      startButton.disabled = false; // Enable start button again
      return; // Exit the interval
    }

    // Calculate remaining hours, minutes, and seconds:
    const remainingHours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    // Update display with leading zeros:
    timerDisplayHour.value = String(remainingHours).padStart(2, '0');
    timerDisplayMinute.value = String(remainingMinutes).padStart(2, '0');
    timerDisplaySecond.value = String(remainingSeconds).padStart(2, '0');
  }, 1000); // Update timer every second
}

function validateInput() {
  // Check if all input fields are valid numbers:
  return !isNaN(timerDisplayHour.value) && !isNaN(timerDisplayMinute.value) && !isNaN(timerDisplaySecond.value);
}

// Add event listener to start button:
startButton.addEventListener("click", startTimer);
