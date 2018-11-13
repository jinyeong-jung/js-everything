const nameForm = document.querySelector(".name_form"),
    nameInput = nameForm.querySelector(".name_input");
const nameAfter = document.querySelector(".name_after");
const nameAfterBtn = document.querySelector(".name_after_btn");
const menuContainer = document.querySelector(".menu_container");

const NAME_LS = "Name";

function saveName(e) {
    const nameValue = nameInput.value;
    localStorage.setItem(NAME_LS, JSON.stringify(nameValue));
    e.preventDefault();
    nameForm.reset();
    loadName();
}

function fetchName(loadedName) {
    nameForm.classList.add("hidden");
    nameAfter.classList.remove("hidden");
    nameAfterBtn.classList.remove("hidden");
    menuContainer.classList.add("hidden");
    const parsedName = JSON.parse(loadedName);
    nameAfter.innerHTML = `Hello, ${parsedName}!`;
}

function hideName() {
    nameAfter.classList.add("hidden");
    nameAfterBtn.classList.add("hidden");
    menuContainer.classList.remove("hidden");
}

function loadName() {
    const loadedName = localStorage.getItem(NAME_LS);
    if (loadedName === null) {
        nameForm.classList.remove("hidden");
        nameAfter.classList.add("hidden");
        nameAfterBtn.classList.add("hidden");
        menuContainer.classList.add("hidden");
        nameForm.addEventListener("submit", saveName);
    } else {
        fetchName(loadedName);
    }
    nameAfterBtn.addEventListener("click", hideName);
}

function init() {
    loadName();
}

init();