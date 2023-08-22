let runningTotal = 0;
let buffer = "0";
let previousOperator;
let expression = "";

const expressionElement = document.querySelector(".expression");


const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value) || value === '.') {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
    expressionElement.innerText = expression;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            expression = "";
            break;
        case '=':
        case 'Enter':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer)); // Change parseInt to parseFloat
            previousOperator = null;
            expression += buffer + " = ";
            buffer = "" + runningTotal; // Convert runningTotal to string
            runningTotal = 0;
            expression = "";
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '.':
            handleDecimal();
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            expression += buffer + " " + symbol + " ";
            handleMath(symbol);
            break;
    }
}

function handleDecimal() {
    if (buffer.includes('.')) {
        return;
    }
    buffer += '.';
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseFloat(buffer); // Change parseInt to parseFloat

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0" && numberString !== '.') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handleKeyDown(event) {
    const keyMap = {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '0' : '0',
        '+' : '+',
        '-' : '-',
        '*' : '×',
        '/' : '÷',
        'Enter' : '=',
        '=' : '=',
        'Backspace' : '←',
        'Escape' : 'C',
        '.' : '.',
        'Delete' : 'C'
    };

    const key = keyMap[event.key];
    if (key) {
        buttonClick(key);
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        });
    document.addEventListener('keydown', handleKeyDown);
}

init();
