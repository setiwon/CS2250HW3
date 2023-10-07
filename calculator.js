
document.addEventListener("DOMContentLoaded", function () {
    const resultInput = document.getElementById("result");
    const buttons = document.querySelectorAll("input[type='button']");

    let currentInput = "";
    let currentOperator = "";
    let previousInput = "";
    let shouldClearResult = false;

    function updateResult() {
        resultInput.value = previousInput + currentOperator + currentInput;
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const value = button.value;

            if (value === "=") {
                if (currentOperator && previousInput !== "") {
                    calculateResult();
                    shouldClearResult = true;
                }
            } else if (value === "c") {
                clearCalculator();
            } else if (isNumber(value) || value === ".") {
                if (shouldClearResult) {
                    previousInput = "";
                    currentOperator = "";
                    currentInput = "";
                    shouldClearResult = false;
                }
                currentInput += value;
            } else if (isOperator(value)) {
                if (currentOperator) {
                    // If an operator is already set, calculate the result first.
                    calculateResult();
                    shouldClearResult = true;
                }
                currentOperator = value;
                previousInput = currentInput;
                currentInput = "";
            }

            updateResult();
        });
    });

    function isNumber(value) {
        return /^\d+(\.\d+)?$/.test(value);
    }

    function isOperator(value) {
        return /^[+\-*/]$/.test(value);
    }

    function calculateResult() {
        const num1 = parseFloat(previousInput);
        const num2 = parseFloat(currentInput);

        switch (currentOperator) {
            case "+":
                currentInput = (num1 + num2).toString();
                break;
            case "-":
                currentInput = (num1 - num2).toString();
                break;
            case "*":
                currentInput = (num1 * num2).toString();
                break;
            case "/":
                if (num2 === 0) {
                    currentInput = "Error";
                } else {
                    currentInput = (num1 / num2).toString();
                }
                break;
        }
        currentOperator = "";
        previousInput = "";
    }

    function clearCalculator() {
        currentInput = "";
        currentOperator = "";
        previousInput = "";
        shouldClearResult = false;
        updateResult();
    }
});
