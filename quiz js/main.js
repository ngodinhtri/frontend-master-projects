// Elements
const progressLine = document.getElementById("progress-line");
const currentQuestionElement = document.getElementById("currentQuestion");
const totalQuestionElement = document.getElementById("totalQuestion");
const questionDiv = document.getElementById("question");
const answersButtons = document.querySelectorAll("#answers button.btn");
const explanationDiv = document.getElementById("explanation");
const nextQuestionButton = document.getElementById("next-btn");

// Questions
const questions = [
  {
    question: "Was JavaScript invented in 1995 ?",
    answer: true,
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    question: "Are strings in JS editable values ?",
    answer: false,
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    question: "1 + 1 === 2",
    answer: true,
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    question: "'1' + '1' === '2'",
    answer: false,
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    question: "typeof ['J', 'S'] === 'array'",
    answer: false,
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.",
  },
];

// Init
const TOTAL_QUESTIONS = questions.length;
let questionIndex = 0;
let score = 0;

function init() {
  //The beginning
  totalQuestionElement.textContent = TOTAL_QUESTIONS;
  progressLine.style.width = 0;
  update();
  // Actions with the buttons
  answersButtons.forEach((button) =>
    button.addEventListener("click", handleClick)
  );
  nextQuestionButton.addEventListener("click", () => update());
}

init();

// Actions with the elements
function hide(element) {
  element.classList.remove("show");
}
function show(element) {
  element.classList.add("show");
}
function disable(button) {
  button.setAttribute("disabled", "");
}
function enable(button) {
  button.removeAttribute("disabled");
}

// Check the answer
function isCorrect(answer) {
  let a = String(answer);
  let b = String(questions[questionIndex].answer);

  return a === b;
}

// Update screen function
function update() {
  //update the question
  currentQuestionElement.textContent = questionIndex + 1;
  questionDiv.textContent = questions[questionIndex].question;
  hide(explanationDiv);

  //update the buttons
  answersButtons.forEach((button) => {
    button.classList.remove("true", "false");
    enable(button);
  });
  disable(nextQuestionButton);
}

//Handle click function
function handleClick(event) {
  //disable & enable the buttons
  answersButtons.forEach((button) => disable(button));
  enable(nextQuestionButton);

  //show the explanation
  explanationDiv.textContent = questions[questionIndex].explanation;
  show(explanationDiv);

  //update score & questionIndex
  let isCorrectAnswer = isCorrect(
    event.target.value,
    questions[questionIndex].answer
  );
  score = isCorrectAnswer ? score + 1 : score;
  questionIndex++;
  event.target.classList.add(String(isCorrectAnswer));

  //update the progress line
  progressLine.style.width = `${(questionIndex * 100) / TOTAL_QUESTIONS}%`;

  //finish the game
  if (questionIndex === TOTAL_QUESTIONS) {
    disable(nextQuestionButton);
    nextQuestionButton.textContent = `No more questions! You have answered ${score} 
    ${score !== 1 ? "questions" : "question"} correctly ✨`;
  }
}
