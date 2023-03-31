const screen = document.getElementById("sc");
const smScreen = document.getElementById("sm-sc");

let total = 0;
let prevOperator = "+";
//screen1 display the expression
let strScreen1 = "";
//screen2 display the current value
let strScreen2 = "0";
let isDone = false;
let errorFlag = false;

// ---- HANDLE CLICK
function handleClickButton(value) {
    if (isNaN(parseInt(value))) {
        handleSymbols(value);
    } else {
        handleNumbers(value);
    }
    render();
}

function render() {
    screen.innerText = strScreen2;
    smScreen.innerText = strScreen1;
}

//--- HANDLE NUMBERS
function handleNumbers(number) {
    if (strScreen2 == "0" || isDone || errorFlag) {
        strScreen2 = number;
    } else {
        strScreen2 += number;
    }
    isDone = false;
    errorFlag = false;
}

//--- HANDLE SYMBOLS
function handleSymbols(symbol) {
    switch (symbol) {
        case "C":
            reset();
            break;
        case "←":
            if (isDone) break;
            if (strScreen2.length == 1) strScreen2 = "0";
            else strScreen2 = strScreen2.slice(0, -1);
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            if (isDone) {
                if (prevOperator == symbol) break;
                else {
                    prevOperator = symbol;
                    strScreen1 = total + symbol;
                    break;
                }
            } else {
                calc();
                prevOperator = symbol;
                strScreen1 = total + symbol;
                strScreen2 = String(total);
                break;
            }
        case "=":
            if (total == 0 && prevOperator == "+") {
                strScreen1 = strScreen2 + symbol;
                isDone = true;
            } else {
                strScreen1 = total + prevOperator + strScreen2 + symbol;
                calc();
                strScreen2 = String(total);
                break;
            }
        default:
    }

    if (errorFlag) {
        total = 0;
        prevOperator = "+";
        strScreen1 = "";
        strScreen2 = "ERROR";
    }
}

function reset() {
    total = 0;
    prevOperator = "+";
    strScreen1 = "";
    strScreen2 = "0";
    isDone = false;
    errorFlag = false;
}

function calc() {
    const n = Number(strScreen2);
    if (prevOperator == "+") {
        total += n;
    } else if (prevOperator == "-") {
        total -= n;
    } else if (prevOperator == "×") {
        total *= n;
    } else if (prevOperator == "÷") {
        if (n == 0) errorFlag = true;
        else total /= n;
    }

    isDone = true;
}
// --- INIT
const init = () => {
    screen.innerText = strScreen2;
    document.getElementById("buttons").addEventListener("click", (event) => {
        if (event.target.type != "submit") return;
        handleClickButton(event.target.innerText);
    });
};

init();
