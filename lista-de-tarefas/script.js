//variaveis

const textInput = document.querySelector("#textInput");
const addBtn = document.querySelector("#add-Btn");
const removeBtn = document.querySelector(".delete-btn");
const lista = document.querySelector("#task-list");

//eventos

//adicionar evento de adicionar tarefa
addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    addTask();
});

//funçoes


//funcao para adicionar tarefa

function addTask() {

    //fazer a lista aparecer so se tiver algo nela
    const container = document.querySelector(".task-container");
    container.classList.remove("hide");

    //titulo
    const taskTitle = textInput.value;

    if (taskTitle) {
        //clonar template

        const template = document.querySelector(".template"); //template é o li exemplar

        const newTask = template.cloneNode(true); //coneNode clona o template

        //adicionar titulo
        newTask.querySelector(".task-title").textContent = taskTitle;

        //remover classes desnecessárias
        newTask.classList.remove("template");
        newTask.classList.remove("hide");

        //adicionar na lista

        lista.appendChild(newTask);

        //limpar caixa de entrada de texto

        textInput.value = ""; 

        // adicionar evento de remover tarefa

        const removeBtnInd = newTask
            .querySelector(".delete-btn")
            .addEventListener("click", function () {
                removeTask(this);
            });

        // adicionar evento de completar tarefa

        const completeBtnInd = newTask
            .querySelector(".check-btn")
            .addEventListener("click", function () {
                switchDone(this);
            });
    }
}

//funcao de deletar tarefa              a tarefa é selecionada pelo botao de deletar, depois pelo conjunto de botoes dele e depois por ela
function removeTask(task) {
    const conjBtn = task.parentNode;
    const tarefa = conjBtn.parentNode;
    tarefa.remove(true);
}

function switchDone(task) {
    const conjBtn = task.parentNode;
    const tarefa = conjBtn.parentNode;

    tarefa.classList.toggle("done");
}
