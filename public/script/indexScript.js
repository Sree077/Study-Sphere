const timerDisplayHour = document.getElementById('timer-display-hour');
const timerDisplayMinute = document.getElementById('timer-display-minute');
const timerDisplaySecond = document.getElementById('timer-display-second');
const startButton = document.getElementById('start-timer-btn');


let initialHours = 0;
let initialMinutes = 0;
let initialSeconds = 0;
let intervalId = null; // Variable to hold the interval ID
var pauseInfo;

function playAudio(){
  const audioElement = document.getElementById('mp3-player');
  audioElement.volume = 0.5;
  audioElement.play()
}


var storedPauseInfo ;

async function checkStoredtime(){
  storedPauseInfo = await JSON.parse(localStorage.getItem('pauseInfo'));
  if (storedPauseInfo && storedPauseInfo.hasOwnProperty('flag') && storedPauseInfo.flag === 1) {
    timerDisplayHour.value = storedPauseInfo.pauseHour;
    timerDisplayMinute.value = storedPauseInfo.pauseMinute;
    timerDisplaySecond.value = storedPauseInfo.pauseSecond;

    // Create a new object with updated flag property
    const updatedPauseInfo = { ...storedPauseInfo, flag: 0 };
    localStorage.setItem('pauseInfo', JSON.stringify(updatedPauseInfo));
  }
}


checkStoredtime()

function startTimer() {
  
 
  
  timerDisplayHour.readOnly=true;
  timerDisplayMinute.readOnly=true;
  timerDisplaySecond.readOnly=true;
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
      playAudio()
      alert("Timer completed!");

      clearInterval(intervalId);
      timerDisplayHour.readOnly=false;
  timerDisplayMinute.readOnly=false;
  timerDisplaySecond.readOnly=false;
      startButton.disabled = false; // Enable start button again
      return; // Exit the interval
    }

    // Calculate remaining hours, minutes, and seconds:
    let remainingHours = Math.floor(totalSeconds / 3600);
    let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    let remainingSeconds = totalSeconds % 60;

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

function stop_timer(){

  
   pauseInfo = {
    pauseHour: Number(timerDisplayHour.value),
    pauseMinute: Number(timerDisplayMinute.value),
    pauseSecond: Number(timerDisplaySecond.value),
    flag: 1
};

// Serializing and storing the object
localStorage.setItem('pauseInfo', JSON.stringify(pauseInfo));
// pauseInfo.flag=1
location.reload()

 }

 function restartTimer(){
  location.reload()
 }

 function hour1(){
    timerDisplayHour.value = 1;
    timerDisplayMinute.value = 0;
    timerDisplaySecond.value = 0;
 }

 function hour2(){
    timerDisplayHour.value = 2;
    timerDisplayMinute.value = 0;
    timerDisplaySecond.value = 0;
 }

 function break5(){
    timerDisplayHour.value = 0;
    timerDisplayMinute.value = 5;
    timerDisplaySecond.value = 0;
 }

//Raindrop
 function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * 100}%`;
  document.getElementById('rainy-background').appendChild(raindrop);

  // Remove raindrop after it falls
  setTimeout(() => {
    raindrop.remove();
  }, 5000); // Match this with the CSS animation duration
}

setInterval(createRaindrop, 22); // Adjust the frequency as needed


const taskInput = document.getElementById("task-input");
 const taskList = document.getElementById("task-list");
 
 function loadTasksFromStorage() {
   const storedTasks = localStorage.getItem("tasks");
   if (storedTasks) {
     const tasks = JSON.parse(storedTasks);
     renderTasks(tasks); // Render existing tasks on load
   }
 }
 
 function saveTasksToStorage(tasks) {
   const tasksJSON = JSON.stringify(tasks);
   localStorage.setItem("tasks", tasksJSON);
 }
 
 function renderTasks(tasks) {
   taskList.innerHTML = ""; // Clear previous list items
   tasks.forEach((task) => {
     const taskItem = document.createElement("li");
     taskItem.classList.add("task-item");
 
     // Checkbox for task completion
     const checkbox = document.createElement("input");
     checkbox.type = "checkbox";
     checkbox.checked = task.checked;
     checkbox.addEventListener("change", () => {
       task.checked = checkbox.checked;
       saveTasksToStorage(tasks); // Update storage on completion change
     });
 
     // Task text
     const taskTextElement = document.createElement("span");
     taskTextElement.textContent = task.value;
 
     // Delete button
     const deleteBtn = document.createElement("button");
     deleteBtn.textContent = "Delete";
     deleteBtn.addEventListener("click", () => {
       const updatedTasks = tasks.filter((t) => t !== task); // Filter out deleted task
       renderTasks(updatedTasks); // Re-render with updated tasks
       saveTasksToStorage(updatedTasks); // Update storage after deletion
     });
 
     taskItem.appendChild(checkbox);
     taskItem.appendChild(taskTextElement);
     taskItem.appendChild(deleteBtn);
 
     taskList.appendChild(taskItem);
   });
 }
 
 function createTask() {
   const taskText = taskInput.value.trim();
   if (taskText) {
     // Create a new task object with checked = false
     const newTask = {
       checked: false,
       value: taskText,
     };
 
     // Get existing tasks or create an empty array
     let tasks = localStorage.getItem("tasks");
     tasks = tasks ? JSON.parse(tasks) : [];
 
     // Add the new task to the array
     tasks.push(newTask);
 
     // Save the updated tasks array back to localStorage
     saveTasksToStorage(tasks);
 
     renderTasks(tasks); // Render all tasks, including the new one
 
     taskInput.value = ""; // Clear the input field for the next task
   }
 }
 
 loadTasksFromStorage(); // Load tasks on page load
 

 var btn = document.getElementById("fullscreenBtn");

// Add event listener to the button
btn.addEventListener("click", function() {
  // Request full screen
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { /* Firefox */
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { /* IE/Edge */
    document.documentElement.msRequestFullscreen();
  }
});