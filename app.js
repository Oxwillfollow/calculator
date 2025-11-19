const displayText = document.getElementById("display-text");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll("#operator-container button");
const buttonCE = document.getElementById("btn-ce");
const buttonBackspace = document.getElementById("btn-backspace");
const buttonComma = document.getElementById("btn-comma");
const buttonEqual = document.getElementById("btn-equal");

let currentInput = "";
const OPERATOR_SYMBOLS = "/*+-"
const MAX_INPUT_LENGTH = 30;
// ***MAKE DISPLAY TEXT FONT-SIZE SCALE BY TEXT LENGTH

digitButtons.forEach((btn) => btn.addEventListener('click', appendDigit));
operatorButtons.forEach((btn) => btn.addEventListener('click', appendOperator));
buttonBackspace.addEventListener('click', popInput);
buttonCE.addEventListener('click', clearInput);
buttonComma.addEventListener('click', appendComma);

function updateDisplay(){
    displayText.textContent = currentInput.length > 0 ? currentInput.replaceAll("/", "÷") : "0";
}

function doesInputHaveSpace(){
    return currentInput.length < MAX_INPUT_LENGTH;
}

function appendDigit(event){
    let digit = event.target.id.at(-1);
    currentInput += digit;
    updateDisplay();
}

function appendOperator(event){
    if(currentInput.length <= 0)
        return;
    
    let operator = event.target.id.at(-1);

    // if an operator is already selected, replace it
    if(OPERATOR_SYMBOLS.includes(currentInput.at(-1)))
        currentInput = currentInput.slice(0,-1) + operator;
    else {
        currentInput += operator;
    }
    updateDisplay();
}

function popInput(){
    if(currentInput){
        currentInput = currentInput.slice(0,-1);
        updateDisplay();
    }
}

function clearInput(){
    if(currentInput){
        currentInput = "";
        updateDisplay();
    }
}

function appendComma(){
    // dont allow comma after operator or comma
    if(!OPERATOR_SYMBOLS.includes(currentInput.at(-1)) && currentInput.at(-1) !== "."){

        // prohibit multiple commas per single number - check for operators after the last comma
        let decimalSplit = currentInput.split('.')
        if(decimalSplit.length > 1 && !decimalSplit[decimalSplit.length-1].split('').some(char => OPERATOR_SYMBOLS.includes(char))){
            return;
        }

        currentInput += ".";
        updateDisplay();
    }
}