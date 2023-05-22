// Elements
const progressLine = document.getElementById("progress-line");
const currQuestionEl = document.getElementById("currentQuestion");
const totalQuestionEl = document.getElementById("totalQuestion");
const questionDiv = document.getElementById("question");
const answersButtons = document.querySelectorAll("#answers button.btn");
const explanationDiv = document.getElementById("explanation");
const nextQuestionButton = document.getElementById("next-btn");

// Questions
const questions = [
  {
    question: "Was JavaScript invented in 1995 ?",
    answer: "true",
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    question: "Are strings in JS editable values ?",
    answer: "false",
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    question: "1 + 1 === 2",
    answer: "true",
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    question: "'1' + '1' === '2'",
    answer: "false",
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    question: "typeof ['J', 'S'] === 'array'",
    answer: "false",
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.",
  },
];

// Actions with elements
function hide(element) {
  element.classList.add("hidden");
  element.classList.remove("show");
}
function show(element) {
  element.classList.add("show");
  element.classList.remove("hidden");
}
function disable(button) {
  button.setAttribute("disabled", "");
}
function enable(button) {
  button.removeAttribute("disabled");
}

let currentQuestion = 0;
let score = 0;
const total = questions.length;

function refreshScreen() {
  currQuestionEl.textContent = currentQuestion + 1;
  questionDiv.textContent = questions[currentQuestion].question;

  hide(explanationDiv);
  disable(nextQuestionButton);

  answersButtons.forEach((button) => enable(button));
}

function update(answer) {
  explanationDiv.textContent = questions[currentQuestion].explanation;
  show(explanationDiv);

  answersButtons.forEach((button) => disable(button));
  enable(nextQuestionButton);

  score = answer === questions[currentQuestion].answer ? score + 1 : score;
  currentQuestion++;

  progressLine.style.width = `${(currentQuestion * 100) / total}%`;

  if (currentQuestion === total) {
    nextQuestionButton.textContent = `No more questions! Your score is ${score} ✨`;
    disable(nextQuestionButton);
  }
}

function init() {
  totalQuestionEl.textContent = total;
  progressLine.style.width = `${(currentQuestion * 100) / total}%`;

  refreshScreen();

  answersButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      update(e.target.value);
    });
  });

  nextQuestionButton.addEventListener("click", (e) => refreshScreen());
}

init();
