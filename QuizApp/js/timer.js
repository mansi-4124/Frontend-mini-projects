const TIMER_DURATION = 15;
let timerInterval = null;
let timeLeft = TIMER_DURATION;
const timerElement = document.getElementById("timer");

function startTimer(onTick, onExpire) {
  clearTimer();
  timeLeft = TIMER_DURATION;
  timerElement.textContent = timeLeft;
  timerElement.classList.remove("warning");
  timerInterval = setInterval(function () {
    timeLeft -= 1;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 5) timerElement.classList.add("warning");
    onTick(timeLeft);
    if (timeLeft <= 0) {
      clearTimer();
      onExpire();
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerElement.classList.remove("warning");
}

function getTimeLeft() {
  return timeLeft;
}
