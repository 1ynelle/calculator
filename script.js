const operBtns = document.querySelectorAll('button[name="operator"]');
const numBtns = document.querySelectorAll('button[name="number"');
const equalBtn = document.querySelector('button[name="equals"]');
const clearBtn = document.querySelector('button[name="clear"]');

let num1 = "";
let num2 = "";
let operator = "";
let equation = "";


// || Event Listeners
numBtns.forEach(btn => {
    btn.addEventListener('click', concatInteger);
})

operBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        operator = btn.getAttribute('value');
        if (num2 !== "") operate(operator, num1, num2);
    })
});

equalBtn.addEventListener('click', (e) => {
    if (num1 && num2 && operator) operate(operator, num1, num2);
});

clearBtn.addEventListener('click', resetCalc);


// || Helper Functions
function concatInteger(e) {
    if (operator === "") {
        num1 += this.getAttribute('value');
        showResult(num1);
    } else {
        num2 += this.getAttribute('value');
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
    if (b === 0) return "ERROR";
    return a / b;
}

function operate(oper, a, b) {
    let result;
    a = +a;
    b = +b;

    if (oper === "+") result = add(a, b);
    if (oper === "-") result = subtract(a, b);
    if (oper === "*") result = multiply(a, b);
    if (oper === "/") result = divide(a, b);

    showInEquation(`${num2} ${operator} `);
    showResult(result);

    num1 = result;
    num2 = "";
}

function showInEquation(value) {
    const equationDisplay = document.querySelector('.display p');
    equation += value;
    equationDisplay.innerText = equation;
}

function showResult(value) {
    const resultDisplay = document.querySelector('.display p:nth-of-type(2)');
    resultDisplay.innerText = value;
}

function resetCalc(e) {
    num1 = num2 = operator = equation = "";
    showResult("");
    showInEquation("");
}