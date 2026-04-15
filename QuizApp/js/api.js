const API_BASE_URL = "https://opentdb.com/api.php";
async function fetchQuestions(amount, category, difficulty) {
  const url = `${API_BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error - status: ${response.status}`);
  }
  const data = await response.json();
  if (data.response_code !== 0) {
    throw new Error(`API error - response code: ${data.response_code}`);
  }
  const questions = data.results.map(function (item) {
    const allAnswers = [...item.incorrect_answers, item.correct_answer];
    const shuffled = shuffleArray(allAnswers);
    return {
      question: decodeHTML(item.question),
      correct: decodeHTML(item.correct_answer),
      answers: shuffled.map(decodeHTML),
    };
  });
  return questions;
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function decodeHTML(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}
