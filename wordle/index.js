//debounce function
const debounce = (fn, delay) => {
    let timer = null;
    return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
};

//test input
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

//main function
const main = () => {
    let currID = 0;

    //enter word
    document.addEventListener('keydown', (event) => {
        if (isLetter(event.key)) {

        }
    })
}

main();