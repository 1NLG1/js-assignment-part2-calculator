let currentOperand = "";
let previousOperand = "";
let operator = "";

const mainDisplay = document.querySelector(".current-operand");
const secondaryDisplay = document.querySelector(".previous-operand");
const clear = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const operators = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const equals = document.querySelector("#equals");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

equals.addEventListener("click", () => {
  if (currentOperand != "" && previousOperand != "") {
    operate();
  }
});

decimal.addEventListener("click", () => {
  addDecimal();
});


window.addEventListener("keypress", handleKeyPress);

deleteBtn.addEventListener("click", handleDelete);

clear.addEventListener("click", clearCalc);

function handleNumber(number) {
  if (previousOperand !== "" && currentOperand !== "" && operator === "") {
    previousOperand = "";
    mainDisplay.textContent = currentOperand;
  }
  // if (currentOperand.length <= 10) {
  //   currentOperand += number;
  //   mainDisplay.textContent = currentOperand;
  // }

  if (currentOperand[0] === '0') {
      mainDisplay.textContent = currentOperand;
  }else if (currentOperand.length <= 10) {
      currentOperand += number;
      mainDisplay.textContent = currentOperand;
  }
}

function handleOperator(op) {
  if (previousOperand === "") {
    previousOperand = currentOperand;
    operatorCheck(op);
  } else if (currentOperand === "") {
    operatorCheck(op);
  } else {
    operate();
    operator = op;
    mainDisplay.textContent = previousOperand;
    secondaryDisplay.textContent = previousOperand + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  secondaryDisplay.textContent = previousOperand + " " + operator;
  mainDisplay.textContent = "";
  currentOperand = "";
}

function operate() {
  previousOperand = Number(previousOperand);
  currentOperand = Number(currentOperand);

  if (operator === "+") {
    previousOperand += currentOperand;
  } else if (operator === "-") {
    previousOperand -= currentOperand;
  } else if (operator === "*") {
    previousOperand *= currentOperand;
  } else if (operator === "÷" || operator === "/") {
    if (currentOperand <= 0) {
      previousOperand = "Cannot divide by 0!";
      displayResults();
      return;
    }
    previousOperand /= currentOperand;
  }
  previousOperand = roundNumber(previousOperand);
  previousOperand = previousOperand.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousOperand.length <= 10) {
    mainDisplay.textContent = previousOperand;
  } else {
    mainDisplay.textContent = previousOperand.slice(0, 10) + "...";
  }
  secondaryDisplay.textContent = "";
  operator = "";
  currentOperand = "";
}

function clearCalc() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  mainDisplay.textContent = "0";
  secondaryDisplay.textContent = "";
}

function addDecimal() {
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
    mainDisplay.textContent = currentOperand;
  }
}

function handleDelete() {
  if (currentOperand !== "") {
    currentOperand = currentOperand.slice(0, -1);
    mainDisplay.textContent = currentOperand;
    if (currentOperand === "") {
      mainDisplay.textContent = "0";
    }
  }
  if (currentOperand === "" && previousOperand !== "" && operator === "") {
    previousOperand = previousOperand.slice(0, -1);
    mainDisplay.textContent = previousOperand;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentOperand != "" && previousOperand != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    handleOperator(e.key);
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

