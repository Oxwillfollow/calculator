const displayText = document.getElementById("display-text");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll("#operator-container button");
const buttonCE = document.getElementById("btn-ce");
const buttonBackspace = document.getElementById("btn-backspace");
const buttonComma = document.getElementById("btn-comma");
const buttonEqual = document.getElementById("btn-equal");

let currentInput = "0";
const MAX_INPUT_LENGTH = 50;
const OPERATOR_SYMBOLS = ['/','*','+','-'];

digitButtons.forEach((btn) => btn.addEventListener('click', appendDigit));
operatorButtons.forEach((btn) => btn.addEventListener('click', appendOperator));
buttonBackspace.addEventListener('click', popInput);
buttonCE.addEventListener('click', clearInput);
buttonComma.addEventListener('click', appendComma);
buttonEqual.addEventListener('click', operate);

function updateDisplay(){
    displayText.textContent = currentInput.length > 0 ? currentInput.replaceAll("/", "÷") : "0";

    // change font size based on input length to fit more characters
    let dynamicFontSizes = [48, 36, 26, 20];

    if(currentInput.length > 18){
        if(currentInput.length > 26){
            if(currentInput.length > 36){
                displayText.style.fontSize = `${dynamicFontSizes[3]}px`;
                
            }
            else
                displayText.style.fontSize = `${dynamicFontSizes[2]}px`;
        }
        else
            displayText.style.fontSize = `${dynamicFontSizes[1]}px`;       
    }
    else
        displayText.style.fontSize = `${dynamicFontSizes[0]}px`;
}

function appendDigit(event){
    if(currentInput.length >= MAX_INPUT_LENGTH) return;

    let digit = event.target.id.at(-1);

    if(currentInput == "0"){
        currentInput = digit;
    }
    else{
        currentInput += digit;
    }
    updateDisplay();
}

function appendOperator(event){
    if(currentInput.length >= MAX_INPUT_LENGTH) return;
    
    // if an operator exists and its not the last character, operate
    if(currentInput.slice(1, -1).split('').some(char => OPERATOR_SYMBOLS.includes(char))){
        operate();
    }

    let operator = event.target.id.at(-1);

    if(OPERATOR_SYMBOLS.includes(currentInput.at(-1))){
        currentInput = currentInput.slice(0,-1) + operator;
    }
    else {
        currentInput += operator;
    }

    updateDisplay();
}

function popInput(){
    if(currentInput == "NaN")
        clearInput();

    if(currentInput.length == 1 || currentInput.length == 2 && currentInput[0] == "-")
        currentInput = "0";
    else
        currentInput = currentInput.slice(0,-1);

    updateDisplay();
}

function clearInput(){
    if(currentInput){
        currentInput = "0";
        updateDisplay();
    }
}

function appendComma(){
    if(!isDecimalInput()){
        currentInput += ".";
        updateDisplay();
    }
}

function operate(){
    // finds the last operator (to not take "-" from negative numbers)
    let operator = currentInput.split('').reverse().find(char => OPERATOR_SYMBOLS.includes(char));

    if(!operator) return;

    entries = currentInput.split(operator);
    // if only one number is entered, then operate against itself i.e. 5/=1
    if(entries[1] === "")
        entries[1] = entries[0];

    let num1 = parseFloat(entries[0]);
    let num2 = parseFloat(entries[1]);

    switch(operator){
        case "/":
            currentInput = (num1 / num2).toString();
            break;
        case "*":
            currentInput = (num1 * num2).toString();
            break;
        case "+":
            currentInput = (num1 + num2).toString();
            break;
        case "-":
            currentInput = (num1 - num2).toString();
            break;
        default:
            break;
    } 
    updateDisplay();
}

function isDecimalInput(){
    if(currentInput.includes('.')){
        let decimalSplit = currentInput.split('.')

        // if there are no operators after the last comma, we are in the decimal
        if(!decimalSplit[decimalSplit.length-1].split('').some(char => OPERATOR_SYMBOLS.includes(char))){
            return true;
        }
    }

    return false;
}