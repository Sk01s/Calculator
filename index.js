class Calculator {
	constructor(previosOperationEl, currentOperationEl) {
		this.previosOperationEl = previosOperationEl;
		this.currentOperationEl = currentOperationEl;
		this.previosOperation = "";
		this.currentOperation = "";
		this.operation = undefined;
	}
	clear() {
		this.previosOperation = "";
		this.currentOperation = "";
	}
	delete() {
		this.currentOperation = this.currentOperation.slice(0, -1);
	}
	appendNumber(number) {
		if (number === "." && this.currentOperation.includes(".")) return;
		this.currentOperation += number;
	}
	appendOperaiton(operation) {
		if (this.currentOperation == "") return;
		if (this.previosOperation !== "") return this.comput();
		this.operation = operation;
		this.previosOperation = this.currentOperation + " " + operation;
		this.currentOperation = "";
	}
	comput() {
		let computation;
		const prev = parseFloat(this.previosOperation);
		const curr = parseFloat(this.currentOperation);
		switch (this.operation) {
			case "+":
				computation = prev + curr;
				break;
			case "-":
				computation = prev - curr;
				break;
			case "x":
				computation = prev * curr;
				break;
			case "÷":
				computation = prev / curr;
				break;
			default:
				break;
		}
		this.currentOperation = computation.toString();
		this.previosOperation = "";
	}
	updateDisplay() {
		this.previosOperationEl.textContent = this.previosOperation;
		this.currentOperationEl.textContent = this.currentOperation;
	}
}
const previosOperationEl = document.querySelector(".presios-operation");

const currentOperationEl = document.querySelector(".current-operation");

const numbersBtn = document.querySelectorAll(".number");

const allClearBtn = document.querySelector(".ac");

const operationBtns = document.querySelectorAll(".operation");

const deleteBtn = document.querySelector(".delete");

const equalBtn = document.querySelector(".equal");

const calc = new Calculator(previosOperationEl, currentOperationEl);

[...numbersBtn].forEach((numBtn) =>
	numBtn.addEventListener("click", () => {
		calc.appendNumber(numBtn.innerText);
		calc.updateDisplay();
	})
);

allClearBtn.addEventListener("click", () => {
	calc.clear();
	calc.updateDisplay();
});

operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener("click", () => {
		calc.appendOperaiton(operationBtn.textContent);
		calc.updateDisplay();
	});
});

deleteBtn.addEventListener("click", () => {
	calc.delete();
	calc.updateDisplay();
});

equalBtn.addEventListener("click", () => {
	calc.comput();
	calc.updateDisplay();
});
