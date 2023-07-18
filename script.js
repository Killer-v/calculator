class Calculator {
  constructor(parent) {
    this.number1 = null;
    this.number2 = null;
    this.operation = null;

    const calculator = this.createMainDiv(parent);

    this.input = this.createInput(calculator);
    document.onkeydown = (event) => this.onButtonPress(event.key);

    const buttonsDiv = this.createButtonsDiv(calculator);

    this.createButtons(buttonsDiv);
  }

  createMainDiv(parent) {
    const div = document.createElement("div");
    div.classList.add('calculator-box');
    parent.appendChild(div);
    return div;
  }

  createInput(calculator) {
    const input = document.createElement("input");

    input.className = "conclusion";
    input.type = "text";
    input.value = 0;
    input.readOnly = true;

    calculator.appendChild(input);
    return input;
  }

  createButtonsDiv(calculator) {
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "button-box";

    calculator.appendChild(buttonsDiv);
    return buttonsDiv;
  }

  createButton(buttonData) {
    const button = document.createElement("button");
    button.className = buttonData.class;
    button.textContent = buttonData.value;
    button.id = buttonData.id;

    return button;
  }

  createButtons(buttonsDiv) {
    [
      { id: "as", class: "btn as bg-grey", value: "as" },
      { id: "delete", class: "btn delete bg-grey", value: "<" },
      { id: "percent", class: "btn percent bg-grey", value: "%" },
      { id: "division", class: "btn division bg-orange", value: "/" },
      { id: "seven", class: "btn seven", value: "7" },
      { id: "eight", class: "btn eight", value: "8" },
      { id: "nine", class: "btn nine", value: "9" },
      { id: "myltiply", class: "btn myltiply bg-orange", value: "X" },
      { id: "four", class: "btn four", value: "4" },
      { id: "five", class: "btn five", value: "5" },
      { id: "six", class: "btn six", value: "6" },
      { id: "minus", class: "btn minus bg-orange", value: "-" },
      { id: "one", class: "btn one", value: "1" },
      { id: "two", class: "btn two", value: "2" },
      { id: "three", class: "btn three", value: "3" },
      { id: "plus", class: "btn plus bg-orange", value: "+" },
      { id: "zero", class: "btn zero", value: "0" },
      { id: "dot", class: "btn dot", value: "." },
      { id: "equal", class: "btn equal bg-orange", value: "=" },
    ].forEach((buttonData) => {

      const button = this.createButton(buttonData);
      button.style.gridArea = buttonData.id;

      button.onclick = () => this.onButtonPress(buttonData.value);

      buttonsDiv.appendChild(button);
    });
  }

  onDotPressed() {
    if (this.number1 === null) {
      this.number1 = "0.";
      this.input.value = this.number1;
    } else if (this.operation === null) {
      if (!this.number1.includes(".")) {
        this.number1 += ".";
        this.input.value = this.number1;
      }
    } else if (this.number2 === null) {
      this.number2 = "0.";
      this.input.value = this.number2;
    } else if (this.operation !== null) {
      if (!this.number2.includes(".")) {
        this.number2 += ".";
        this.input.value = this.number2;
      }
    }
  }

  onPercentPressed(){
    if (this.number1 !== null && this.number2 === null) {
      this.input.value = this.number1 / 100;
      this.number1 = this.input.value;
    } else if (this.number1 !== null && this.number2 !== null && this.operation !== null) {
      this.number2 = (this.number1 / 100) * this.number2;
      this.input.value = this.number2;
    }
  }

  onNumberPressed(number) {
    if (this.number1 === null) {
      this.number1 = number;
      this.input.value = this.number1;
    } else if (this.operation === null) {
      this.number1 += number;
      this.input.value = this.number1;
    } else if (this.number2 === null) {
      this.number2 = number;
      this.input.value = this.number2;
    } else if (this.operation !== null) {
      this.number2 += number;
      this.input.value = this.number2;
    }
  }

  isOperation(buttonType) {
    return ["+", "-", "X", "/"].includes(buttonType);
  }

  isNumber(buttonType) {
    return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
      buttonType
    );
  }

  getButtonType(buttonType) {
    switch (buttonType) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        return "number";
      case ".":
      case ",":
        return "dot";
      case "+":
      case "-":
      case "X":
      case "*":
      case "/":
        return "operator";
      case "%":
        return "percent";
      case "as":
        return "clear";
      case "=":
      case "Enter":
        return "result";
      case "<":
      case "Backspace":
        return "delete";
    }
  }

  updateResult() {
    this.input.value = this.getResult(this.number1, this.number2, this.operation);
    this.number1 = this.input.value * 1;
    this.number2 = null;
  }

  onButtonPress(buttonType) {
    if (this.getButtonType(buttonType) === "operator" && this.number1 && this.number2) {
      this.updateResult();
    }

    switch (this.getButtonType(buttonType)) {
      case "number":
        this.onNumberPressed(buttonType);
        break;
      case "percent":
        this.onPercentPressed();
        break;
      case "dot":
        if (buttonType === ",") {
          buttonType = ".";
        }
        this.onDotPressed();
        break;
      case "operator":
        if (buttonType === "*") {
          buttonType = "X";
        }
        this.setOperation(buttonType);
        break;
      case "clear":
        this.clearAll();
        break;
      case "result":
        this.updateResult();
        break;
      case "delete":
        this.deleteLastNumber();
        break;
    }

    console.log(this.number1, this.operation, this.number2);
  }

  setOperation(buttonType) {
    this.operation = buttonType;
  }

  deleteLastNumber() {
    this.input.value = this.input.value.slice(0, -1);
    if (this.number2 === null) {
      this.number1 = this.number1.slice(0, -1);
    } else {
      this.number2 = this.number2.slice(0, -1);
    }
  }

  clearAll() {
    this.input.value = "0";
    this.number1 = null;
    this.number2 = null;
    this.operation = null;
  }

  getResult(value1, value2, operation) {
    let res;
    value1 *= 1;
    value2 *= 1;

    switch (operation) {
      case "+":
        res = value1 + value2;
        break;
      case "-":
        res = value1 - value2;
        break;
      case "X":
        res = value1 * value2;
        break;
      case "/":
        res = value1 / value2;
        break;
      case "%":
        res = value2 / 100 * value1;
        break;
    }

    return res;
  }
}

new Calculator(document.getElementById("parent"));