const ANSWER_LENGTH = 5;
const allLetterDiv = document.querySelectorAll('.board div');

//test input
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

//main function
const main = () => {
    let currGuessWord = '';

    //add letter to the DOM
    function addLetter(letter) {

        if (currGuessWord.length < ANSWER_LENGTH) {
            currGuessWord += letter;
        } else {
            currGuessWord = currGuessWord.slice(0, ANSWER_LENGTH - 1) + letter;
        }

        //update to the DOM
        allLetterDiv[currGuessWord.length - 1].innerText = letter;
    }

    document.addEventListener('keydown', function handleKeyPress(event) {
        const action = event.key;

        if (action === 'Enter') {
            commit();
        } else if (action === 'Backspace') {
            deleteLetter();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase())
        } else {
            // do nothing
        }
    })
}

main();