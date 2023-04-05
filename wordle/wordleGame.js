const allLetterDiv = document.querySelectorAll(".board div");
const infoBar = document.getElementById("info-bar");

const GET_WORD_API = "https://words.dev-apis.com/word-of-the-day";
const VALIDATE_API = "https://words.dev-apis.com/validate-word";
const ANSWER_LENGTH = 5;
const ROUNDS = 6;
const QUESTION = "What's the word of the day ?";
const LOADING = "Loading...";
const WIN = "You're WIN 🎉🎉🎉";
const LOSE = "Oh no!!! You're LOSE 😢. The word is ";

//test input
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

//set Loading
function setLoading(isLoading) {
  infoBar.innerText = isLoading ? LOADING : QUESTION;
}

function makeMap(word) {
  const map = new Map();

  for (let i = 0; i < word.length; i++) {
    if (map.has(word[i])) {
      map.set(word[i], map.get(word[i]) + 1);
    } else {
      map.set(word[i], 1);
    }
  }

  return map;
}

//init function
async function init() {
  let currGuessWord = "";
  let currRow = 0;
  let isLoading = false;
  let done = false;

  const res = await fetch(GET_WORD_API);
  const resObj = await res.json();
  const answer = resObj.word.toUpperCase();

  //# add letter to the DOM
  function addLetter(letter) {
    if (currGuessWord.length < ANSWER_LENGTH) {
      currGuessWord += letter;
    } else {
      currGuessWord = currGuessWord.slice(0, ANSWER_LENGTH - 1) + letter;
    }

    //## update to the DOM, (ANSWER_LENGTH * currRow) => track the current row
    allLetterDiv[currGuessWord.length - 1 + ANSWER_LENGTH * currRow].innerText =
      letter;
  }

  //#
  async function commit() {
    if (currGuessWord.length !== ANSWER_LENGTH) return;

    //## validate the word
    isLoading = true;
    setLoading(isLoading);

    const resValidate = await fetch(VALIDATE_API, {
      method: "POST",
      body: JSON.stringify({ word: currGuessWord }),
    });
    //### example: { "word": "asdfg", "validWord": false }.
    const result = await resValidate.json();
    const validWord = result.validWord;

    isLoading = false;
    setLoading(isLoading);

    if (!validWord) {
      for (let i = 0; i < ANSWER_LENGTH; i++) {
        allLetterDiv[ANSWER_LENGTH * currRow + i].classList.add("invalid");
      }
      return;
    } else {
      for (let i = 0; i < ANSWER_LENGTH; i++) {
        allLetterDiv[ANSWER_LENGTH * currRow + i].classList.remove("invalid");
      }
    }

    //## marking as "correct", "close" & "wrong"
    const answerArr = answer.split("");
    const guessWordArr = currGuessWord.split("");

    const wordMap = makeMap(answerArr);

    //### mark as correct
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (answerArr[i] === guessWordArr[i]) {
        allLetterDiv[ANSWER_LENGTH * currRow + i].classList.add("correct");
        wordMap.set(answerArr[i], wordMap.get(answerArr[i]) - 1);
      }
    }

    //### mark as wrong & close
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (answerArr[i] === guessWordArr[i]) {
        //do nothing
      } else if (
        answerArr.includes(guessWordArr[i]) &&
        wordMap.get(guessWordArr[i]) > 0
      ) {
        allLetterDiv[ANSWER_LENGTH * currRow + i].classList.add("close");
        wordMap.set(guessWordArr[i], wordMap.get(guessWordArr[i]) - 1);
      } else {
        allLetterDiv[ANSWER_LENGTH * currRow + i].classList.add("wrong");
      }
    }

    //## confirm win or lose
    if (answer === currGuessWord) {
      infoBar.innerText = WIN;
      done = true;
      return;
    }
    //currRow + 1 'cause it starts from 0.
    else if (answer !== currGuessWord && currRow + 1 === ROUNDS) {
      infoBar.innerText = LOSE + answer;
      done = true;
      return;
    } else {
      //do nothing
    }

    currRow++;
    currGuessWord = "";
  }

  //#
  function deleteLetter() {
    if (currGuessWord.length === 0) return;

    //##update to the DOM
    allLetterDiv[currGuessWord.length - 1 + ANSWER_LENGTH * currRow].innerText =
      "";
    currGuessWord = currGuessWord.slice(0, currGuessWord.length - 1);
  }

  //WHEN USER PRESS KEYBOARD
  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading) return;

    const action = event.key;

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      deleteLetter();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });

  setLoading(isLoading);
}

init();
