const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText; //esta impresso na tela
        this.currentOperationText = currentOperationText; //esta impresso na tela
        this.currentOperation = ""; //esta digitando agora
    }

    //add digit to calculator screen
    addDigit(digit) {
        //check if current operation already has a dot
        if (
            digit === "." &&
            this.currentOperationText.innerText.includes(".")
        ) {
            return;
        }

        this.currentOperation = digit; //o digito clicado aparecerá na tela
        this.updateScreen(); //atualizar tela
    }

    // Process all calculator operations
    processOperation(operation) {
        //check if current is empty. Aceitar atual vazio só se for limpar com C
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            //change operation
            if (this.previousOperationText.innerText !== "") {
                //se nao tiver nada digitado anteriormente, nao deve aceitar operacoes mas sim retornar
                this.changeOperation(operation);
            }
            return;
        }

        // get current and previous value
        let operationValue;
        // operationValue : resultado da operação
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        //split para dividir o sinal da operação do valor e pegar só o valor
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperation();
                break;
            case "CE": //limpa só a atual
                this.processClearCurrentOperation();
                break;
            case "C": //limpa só a atual
                this.processClearOperation();
                break;
            case "=": //limpa só a atual
                this.processesEqualOperator();
                break;
            default:
                return;
        }
    }

    //change values of the calculator screen
    updateScreen(
        operationValue = null, //resultado da operação
        operation = null, //operacao escolhida
        current = null, //valor atual
        previous = null //valor null
    ) {
        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {
            //se nao tiver resultado da operacao é porque ainda não foi realizada uma operação, então os números continuam ali esperando
            this.currentOperationText.innerText += this.currentOperation;
            // texto da operação atual += numeros da operacao atual
        } else {
            //check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current;
            }

            // add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            //resultado da operacao mais a operaçao. numeros digitados mais operaçao
            this.currentOperationText.innerText = ""; //limpar campo de digitaçao
        }
    }
    //change math operation
    changeOperation(operation) {
        const mathOperations = ["/", "*", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
        //o valor na parte superior da tela irá retirar o simbolo da operação anterior e trocar pelo da nova
    }
    //delete the last digit
    processDelOperation() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1);
    }

    //clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //clear all operations
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //igual
    processesEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);


//        this.currentOperationText.innerText =
//            this.previousOperationText.innerText.split(" ")[0];
//        this.previousOperationText.innerText = "";
        //para limpar a barra do texto anterior e mostrar o resultado final em letras grandes na caixa de entrada sem o sinal do operador.
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

//em imputs pego value e em botoes pego innerText

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText; //pegar texto do botao clickado

        if (+value >= 0 || value === ".") {
            //(+value) verifica se o valor é um número e a outra parte se é um ponto
            calc.addDigit(value);
        } else {
            //se não for numero, é uma operação
            calc.processOperation(value);
        }
    });
});
