//variaveis
const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#add-Btn");
const lista = document.querySelector("#task-list");
//const removeBtn = document.querySelector(".delete-btn"); foi declarado internamente na função

//eventos

//adicionar evento de adicionar tarefa
addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    addTask();
});

//funçoes
//funcao para adicionar tarefa

function addTask() {
    const taskContainer = document.querySelector(".task-container");

    //titulo
    const taskTitle = textInput.value;

    if (taskTitle) {
        //se tem algo escrito

        //clonar template
        const template = document.querySelector(".template"); //template é o li exemplar
        const newTask = template.cloneNode(true); //coneNode clona o template. New task é um clone do template

        //adicionar titulo
        newTask.querySelector(".task-title").textContent = taskTitle;

        //remover classes desnecessárias
        newTask.classList.remove("template");
        newTask.classList.remove("hide");

        //adicionar na lista
        const adicionar = lista.appendChild(newTask);

        //fazer a lista aparecer so se tiver adicionado um item nela
        if (adicionar) {
            taskContainer.classList.remove("hide");
        }

        //limpar caixa de entrada de texto
        textInput.value = "";

        // adicionar evento de remover tarefa. Esse evento executa a função removeTask.
        const removeBtnInd = newTask
            .querySelector(".delete-btn")
            .addEventListener("click", function () {
                removeTask(this);
            });

        // adicionar evento de completar tarefa. Esse evento executa a função switchDone.
        const completeBtnInd = newTask
            .querySelector(".check-btn")
            .addEventListener("click", function () {
                switchDone(this);
            });
    }
}

//funcao de deletar tarefa.
//a tarefa é selecionada pelo botao de deletar, depois pelo conjunto de botoes dele e depois por ela, subindo a hierarquia dos elementos.
function removeTask(task) {
    const tarefa = task.parentNode.parentNode;

    tarefa.remove(true);

    //const conjBtn = task.parentNode;
    //const tarefa = conjBtn.parentNode;
    //tarefa.remove(true);
}

function switchDone(task) {
    const tarefa = task.parentNode.parentNode;

    tarefa.classList.toggle("done");
}
