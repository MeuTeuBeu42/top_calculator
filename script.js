function initDisplay() {
  const display = document.querySelector("#display");
  const displayValue = document.createElement("span");
  displayValue.id = "currentValue";
  displayValue.textContent = currentDisplay;
  display.appendChild(displayValue);
}

function addButtons() {

  const numbers = document.querySelector("#numbers");
  const operators = document.querySelector("#operators");

  let button;
  for (let i = 1 ; i < 10 ; i++) {
    button = document.createElement("button");
    button.textContent = i;
    numbers.appendChild(button);
  }
  button = document.createElement("button");
  button.textContent = "0";
  numbers.appendChild(button);

  const operatorsArray = ['+','-','*','/','=', 'C'];
  for (operator in operatorsArray) {
    button = document.createElement("button");
    button.textContent = operatorsArray[operator];
    operators.appendChild(button);
  }

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    switch (button.textContent) {
      case "=":
        button.addEventListener('click', result);
        break;
      case "C":
        button.addEventListener('click', clear);
        break;
      default:
        button.addEventListener('click', function(e) {
          addEntry(e.target.textContent);
        });
      }
  });
}

function addEntry(pressed) {
  console.log(`Key '${pressed}'`);

  if (currentDisplay == "0") {
    currentDisplay = pressed;
  } else {
    currentDisplay += pressed;
  }
  renderDisplay();
}

function renderDisplay() {
  const display = document.querySelector("#currentValue");
  display.textContent = currentDisplay;
}

function result() {

  currentDisplay = operate();
  console.log(currentDisplay);
  renderDisplay();
  currentDisplay = "0";
}

function clear() {
  currentDisplay = "0";
  renderDisplay();
}

function operate() {
  let number1 = "";
  let operator = "";
  let number2 = "";

  console.log(`Operate ${currentDisplay}`);
  const operationArray = currentDisplay.split("");
  let i = 0;

  // Get the first number
  while (i < operationArray.length) {
    if (!['+','-','*','/'].includes(operationArray[i])) {
      number1 += operationArray[i++];
    } else {
      break;
    }
  }

  // Operator
  if (i < operationArray.length) {
    operator = operationArray[i++];
  }

  // Get the second number
  while (i < operationArray.length) {
    if (!['+','-','*','/'].includes(operationArray[i])) {
      number2 += operationArray[i++];
    } else {
      break;
    }
  }

  let result;
  switch (operator) {
    case "+":
      result = operationAdd(+number1, +number2);
      break;
    case "-":
      result = operationSubstract(+number1, +number2);
      break;
    case "*":
      result = operationMultiply(+number1, +number2);
      break;
    case "/":
      result = operationDivide(+number1, +number2);
      break;
    case "":
      result = number1;
      break;
    default:
      return ("ERROR");
  }

  if (i >= operationArray.length) {
    return (result);
  } else {
    // Another operator exists
    let otherPart = operationArray.slice(i);
    currentDisplay = result + otherPart.join("");
    return (operate());
  }
}

function operationAdd(a, b) {
  return (a+b);
}

function operationSubstract(a, b) {
  return (a-b);
}

function operationMultiply(a, b) {
  return (a*b);
}

function operationDivide(a, b) {
  if (b === 0)
    return ("Well... a lot !");
  return (a/b);
}

let currentDisplay = "0";

addButtons();
initDisplay();
