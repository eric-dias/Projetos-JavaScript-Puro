//seleçao de elementos
const showGenerationButton = document.querySelector("#generate-password");
const generateButton = document.querySelector("#create-btn");
const copyButton = document.querySelector("#copy-btn");
const generatedPasswordElement = document.querySelector("#generated-password");
const passwordOptionsElement = document.querySelector("#password-options");
const charactersLenghtInput = document.querySelector("#quantidade");
const haveLettersInput = document.querySelector("#letters-check");
const haveNumbersInput = document.querySelector("#numbers-check");
const haveSymbolssInput = document.querySelector("#symbols-check");
const password = generatedPasswordElement.querySelector("h4");

//funcoes

const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
    // de 0 a 9
};

const getSymbol = () => {
    const symbols = "()[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

//operação para conseguir as letras:
//math.random gera um valor entre 0 e 1
//vezes 26 (num de letras), o valor será entre 0.001 e 26.999
//ao somar 97 (numero da letra a minuscula na tabela), os valores passarão a ser
//entre 97.001 e 123.999. o math.floor arredonda na caixa dos inteiros, ficando apenas
//o valor entre 97 e 123 (todas as letras minúsculas)

const generatedPassword = (
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
) => {
    let password = "";

    let passwordLength;

    if (charactersLenghtInput.value == 0) {
        passwordLength = 8;
    } else {
        passwordLength = charactersLenghtInput.value;
    }
    //    const passwordLength = charactersLenghtInput.value;

    let generators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    ];

    const allGenerators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    ];

    const lGenerators = [getLetterLowerCase, getLetterUpperCase];

    const nGenerators = [getNumber];

    const sGenerators = [getSymbol];

    const lAndSGenerators = [getLetterLowerCase, getLetterUpperCase, getSymbol];

    const lAndNGenerators = [getLetterLowerCase, getLetterUpperCase, getNumber];

    const nAndSGenerators = [getNumber, getSymbol];

    // por que i = i+4 ???              Gera 12 caracteres
    for (i = 0; i < passwordLength; i = i + generators.length) {
        if (
            !haveLettersInput.checked &&
            haveNumbersInput.checked &&
            haveSymbolssInput.checked
        ) {
            generators = nAndSGenerators;
        }

        if (
            haveLettersInput.checked &&
            !haveNumbersInput.checked &&
            haveSymbolssInput.checked
        ) {
            generators = lAndSGenerators;
        }

        if (
            haveLettersInput.checked &&
            haveNumbersInput.checked &&
            !haveSymbolssInput.checked
        ) {
            generators = lAndNGenerators;
        }

        if (
            !haveLettersInput.checked &&
            !haveNumbersInput.checked &&
            haveSymbolssInput.checked
        ) {
            generators = sGenerators;
        }

        if (
            !haveLettersInput.checked &&
            haveNumbersInput.checked &&
            !haveSymbolssInput.checked
        ) {
            generators = nGenerators;
        }

        if (
            haveLettersInput.checked &&
            !haveNumbersInput.checked &&
            !haveSymbolssInput.checked
        ) {
            generators = lGenerators;
        }

        if (
            !haveLettersInput.checked &&
            !haveNumbersInput.checked &&
            !haveSymbolssInput.checked
        ) {
            generators = allGenerators;
        }

        if (
            haveLettersInput.checked &&
            haveNumbersInput.checked &&
            haveSymbolssInput.checked
        ) {
            generators = allGenerators;
        }

        generators.forEach(() => {
            //escolher qual das funçoes será usada
            const randomValue =
                generators[Math.floor(Math.random() * generators.length)]();

            password += randomValue;
        });
    }
    //cortar a senha para ter só o numero de digitos que preciso
    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};

//mostrar opçoes de gerar senha
const showOptions = () => {
    passwordOptionsElement.style.display = "flex";
};

//eventos

//mostrar layout das opções
showGenerationButton.addEventListener("click", () => {
    showOptions();
});

generateButton.addEventListener("click", () => {
    generatedPassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});

copyButton.addEventListener("click", () => {
    const passwordText = password.innerText;
    navigator.clipboard.writeText(passwordText)
});