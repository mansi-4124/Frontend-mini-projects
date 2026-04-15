/* State */
let questions = [];
let currentIndex = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let quizStartTime = null;

/* DOM References */
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const categoryEl = document.getElementById("category");
const difficultyEl = document.getElementById("difficulty");
const amountEl = document.getElementById("amount");

const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const answersContainer = document.getElementById("answers-container");
const progressBar = document.getElementById("progress-bar");
const scoreEl = document.getElementById("score");

const finalScoreEl = document.getElementById("final-score");
const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const timeTakenEl = document.getElementById("time-taken");

/* Screen Switching */
function showScreen(screen) {
  startScreen.classList.add("hidden");
  questionScreen.classList.add("hidden");
  loadingScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

/* Start the quiz */
startBtn.addEventListener("click", async function () {
  const amount = amountEl.value;
  const category = categoryEl.value;
  const difficulty = difficultyEl.value;
  showScreen(loadingScreen);
  try {
    questions = await fetchQuestions(amount, category, difficulty);
    currentIndex = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    quizStartTime = Date.now();

    showScreen(questionScreen);
    showQuestion();
  } catch (error) {
    alert("Failed to load questions. Please try again.\n\n" + error.message);
    showScreen(startScreen);
  }
});

/* Show a question */
function showQuestion() {
  const q = questions[currentIndex];
  questionCounter.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  const progress = (currentIndex / questions.length) * 100;
  progressBar.style.width = progress + "%";
  questionText.textContent = q.question;

  const buttons = answersContainer.querySelectorAll(".answer-btn");
  buttons.forEach(function (btn, index) {
    btn.textContent = q.answers[index];
    btn.classList.remove("correct", "wrong", "disabled");
    btn.disabled = false;
  });
  startTimer(
    function onTick(timeLeft) {},
    function onExpire() {
      handleAnswer(null);
    },
  );
}

/* Handle an answer */
answersContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("answer-btn") || e.target.disabled) return;
  handleAnswer(e.target.textContent);
});

function handleAnswer(selected) {
  clearTimer();
  const q = questions[currentIndex];
  const buttons = answersContainer.querySelectorAll(".answer-btn");
  buttons.forEach(function (btn) {
    btn.disabled = true;
    btn.classList.add("disabled");
  });
  if (selected === q.correct) {
    score += 10;
    correctCount += 1;
    scoreEl.textContent = score;

    buttons.forEach(function (btn) {
      if (btn.textContent === q.correct) btn.classList.add("correct");
    });
  } else {
    wrongCount += 1;
    buttons.forEach(function (btn) {
      if (btn.textContent === selected) btn.classList.add("wrong");
      if (btn.textContent === q.correct) btn.classList.add("correct");
    });
  }
  setTimeout(function () {
    currentIndex += 1;
    if (currentIndex < questions.length) showQuestion();
    else showResults();
  }, 1500);
}

/* Show Results */
function showResults() {
  clearTimer();
  progressBar.style.width = "100%";
  const totalSeconds = Math.round((Date.now() - quizStartTime) / 1000);
  finalScoreEl.textContent = score + " / " + questions.length * 10;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
  timeTakenEl.textContent = totalSeconds + "s";
  showScreen(resultsScreen);
}

/* Play again */
playAgainBtn.addEventListener("click", function () {
  showScreen(startScreen);
});
