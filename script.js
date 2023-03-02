const equationDisplay = document.querySelector('.display p');
const resultDisplay = document.querySelector('.display p:nth-of-type(2)');

const clearBtn = document.querySelector('button[name="clear"]');
const undoBtn = document.querySelector('button[name="undo"]');
const numBtns = document.querySelectorAll('button[name="number"');
const decimal = document.querySelector('button[name="decimal"]');
const operBtns = document.querySelectorAll('button[name="operator"]');
const equalBtn = document.querySelector('button[name="equals"]');

let num1 = "";
let operator = "";
let num2 = "";
let equation = "";


// || EVENT LISTENERS
// Utilities
clearBtn.addEventListener('click', resetCalc);
undoBtn.addEventListener('click', undoNum);

// Numbers
numBtns.forEach(btn => {
    btn.addEventListener('click', concatValue);
});
decimal.addEventListener('click', concatValue);

// Operators
operBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        removeExistingOper();
        if (operator && num2) operate(operator, num1, num2);
        operator = btn.getAttribute('value');
        showInEquation(` ${operator} `);
    });
});
equalBtn.addEventListener('click', (e) => {
    if (num1 && operator && num2) operate(operator, num1, num2);
    equation = `${num1}  ${operator} `;
});


// || HELPER FUNCTIONS
function concatValue(e) {
    const value = this.getAttribute('value');

    // EC: Prevent adding more than one decimal
    if (value === "." && resultDisplay.innerText.includes(".")) return;
    showInEquation(value);

    if (!num1 || !operator) {
        num1 += value;
        showResult(num1);
    } else {
        num2 += value;
        showResult(num2);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "( ͡° ͜ʖ ͡°)";
    return a / b;
}

function operate(oper, a, b) {
    let result;
    a = +a;
    b = +b;

    if (oper === "+") result = add(a, b);
    if (oper === "-") result = subtract(a, b);
    if (oper === "×") result = multiply(a, b);
    if (oper === "÷") result = divide(a, b);

    if (typeof result === "number") {
        if (!Number.isInteger(result) && result.toString().split('.')[1].length > 3) result = +result.toFixed(3);
        num1 = result;
    } else {
        num1 = operator = equation = "";
    }
    num2 = "";
    showResult(result);
}

function removeExistingOper() {
    switch (equation.slice(-3)) {
        case " ÷ ":
        case " × ":
        case " - ":
        case " + ":
            equation = equation.slice(0, -3);
            break;
        default:
            equation = equation.slice(0);
    }
}

function showInEquation(value) {
    equation += value;
    equationDisplay.innerText = equation;
}

function showResult(value) {
    resultDisplay.innerText = value;
}

function resetCalc() {
    num1 = operator = num2 = equation = "";
    showInEquation("");
    showResult("");
}

// EC: Undo if wrong number is clicked
function undoNum() {
    if (!operator) {
        resetCalc();
    } else {
        num2 = "";
        equation = equation.slice(0, equation.lastIndexOf(" ")) + " ";
        showInEquation("");
        showResult("");
    }
}