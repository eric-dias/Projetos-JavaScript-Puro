//seleçao de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

//funcoes
//letras, numeros e símbolos

//operação para conseguir as letras:
//math.random gera um valor entre 0 e 1
//vezes 26 (num de letras), o valor será entre 0.001 e 26.999
//ao somar 97 (numero da letra a minuscula na tabela), os valores passarão a ser
//entre 97.001 e 123.999. o math.floor arredonda na caixa dos inteiros, ficando apenas
//o valor entre 97 e 123 (todas as letras minúsculas)
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

const generatedPassword = (
    getLetterLowerCase,
    getLetterUpperCase,
    getNumber,
    getSymbol
) => {
    let password = "";

    const passwordLength = 10;

    const generators = [
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    ];

    // por que i = i+4 ???              Gera 12 caracteres
    for (i = 0; i < passwordLength; i = i + 4) {
        generators.forEach(() => {
            //escolher qual das funçoes será usada
            const randomValue = generators[Math.floor(Math.random() * 4)]();

            password += randomValue;
        });
    }
    //cortar a senha para ter só o numero de digitos que preciso
    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;
};

//eventos
generatePasswordButton.addEventListener("click", () => {
    generatedPassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol
    );
});
