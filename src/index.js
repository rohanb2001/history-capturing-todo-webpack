import "./assets/css/style.css";
import { v4 as uuidv4 } from "uuid";

const form = document.querySelector("form");
const inputField = document.querySelector("form input");
const progressBar = document.querySelector(".round-time-bar");
const todosUl = document.querySelector(".todos");

let formValues = {};

let state = {
  edit: {
    editMode: false,
    editTodoId: null,
  },
  todos: [],
};

function handleSubmit(e) {
  e.preventDefault();
  if (!state.edit.editMode) {
    state.todos.push({ ...formValues, id: uuidv4() });
    inputField.value = "";
    showUI();
    UndoAnimation();
    formValues = {};
  } else {
    let foundIdx, foundItem;
    state.todos.forEach((item, idx) => {
      if (item.id === state.edit.editTodoId) {
        foundIdx = idx;
        foundItem = item;
      }
    });
    state.todos.splice(foundIdx, 1, {
      ...foundItem,
      ...formValues,
      id: uuidv4(),
    });
    showUI();
    state.edit.editMode = false;
    state.edit.editTodoId = null;
    inputField.value = "";
  }
}

function getFormValues(e) {
  formValues = { ...formValues, [e.target.name]: e.target.value };
}

function showUI() {
  if (state.todos.length) {
    let str = state.todos.reduce((acc, curr) => {
      return (
        acc +
        `<li data-id=${curr.id}>
        <div class="content">
          ${curr.name}
          <div>
            <span><i class="fa-solid fa-pen-to-square"></i></span
            ><span><i class="fa-solid fa-trash"></i></span>
            <button class="undo">Undo</button>
          </div>
        </div>
        <div
          class="round-time-bar"
          data-style="smooth"
          style="--duration: 30"
        >
          <div></div>
        </div>
      </li>`
      );
    }, "");

    todosUl.innerHTML = str;
  } else {
    todosUl.innerHTML = "";
  }
}

function editTodo(e) {
  if (e.target.classList.contains("fa-pen-to-square")) {
    let content =
      e.target.parentElement.parentElement.parentElement.textContent;
    let contentText = content.toString().trim().split(" ")[0];
    state.edit.editMode = true;
    state.edit.editTodoId =
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      );
    inputField.value = contentText;
  }
}

function deleteTodo(e) {
  if (e.target.classList.contains("fa-trash")) {
    let foundElement;
    let foundElementIdx;
    let element =
      e.target.parentElement.parentElement.parentElement.parentElement;
    let elementId =
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      );
    state.todos.forEach((item, idx) => {
      if (item.id === elementId) {
        foundElementIdx = idx;
        foundElement = item;
      }
    });

    console.log(foundElementIdx);
    state.todos.splice(foundElementIdx, 1);
    console.log(state.todos);
    showUI();
    UndoAnimation();
  }
}

function UndoAnimation() {
  if (progressBar) {
    progressBar.classList.remove("round-time-bar");
    console.log(progressBar.offsetWidth);
    progressBar.classList.add("round-time-bar");
  }
}

// Add Event Listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", getFormValues);
todosUl.addEventListener("click", editTodo);
todosUl.addEventListener("click", deleteTodo);
