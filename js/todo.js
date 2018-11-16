const todoForm = document.querySelector(".todo-form"),
    todoInput = todoForm.querySelector(".todo-input");
const tlContainer = document.querySelector(".todo-list-container");

const TODO_LS = "To-do"
let todos = []

function saveToDo(todos) {
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function deleteToDo(e) {

    const targetLi = e.target.parentNode.parentNode;
    tlContainer.removeChild(targetLi);

    // console.log(typeof todos[0].index); >> number
    // console.log(typeof targetLi.id) >> string

    const filteredToDos = todos.filter(todo => {
        return todo.index !== parseInt(targetLi.id);
    })

    todos = filteredToDos;
    saveToDo(todos);

    // console.log(filteredToDos);
}

function fetchToDo(todo) {

    const li = document.createElement("li");
    const btn = document.createElement("button");
    const span = document.createElement("span");

    const todoIndex = todos.length + 1;

    tlContainer.appendChild(li);
    li.appendChild(btn);
    li.appendChild(span);
    li.id = todoIndex;
    btn.addEventListener("click", deleteToDo);

    btn.innerHTML = `<i class="fas fa-fish"></i>`;
    span.innerHTML = todo;

    const todoObj = {
        index : todoIndex,
        text : todo
    }

    todos.push(todoObj);
    saveToDo(todos);
}

function submitHandler(e) {
    const todoValue = todoInput.value;
    fetchToDo(todoValue)

    e.preventDefault();
    todoForm.reset();
}

function loadToDo() {
    const loadedToDo = localStorage.getItem(TODO_LS);
    if (loadedToDo !== null) {
        const parsedToDo = JSON.parse(loadedToDo);
        parsedToDo.forEach(todo => {
            fetchToDo(todo.text);
        })
    }
}

function init () {
    loadToDo();
    todoForm.addEventListener("submit", submitHandler);
}

init();