import "./assets/css/style.css";
import { v4 as uuidv4 } from "uuid";

const form = document.querySelector("form");
const inputField = document.querySelector(" form input");
const progressBar = document.querySelector(".round-time-bar");

let formValues = {};

let state = {
  todos: [],
};

function handleSubmit(e) {
  e.preventDefault();
  state.todos.push({ ...formValues, id: uuidv4() });
  inputField.value = "";
  console.log(state.todos);
}

function getFormValues(e) {
  formValues = { ...formValues, [e.target.name]: e.target.value };
}

function UndoAnimation() {
  progressBar.classList.remove("round-time-bar");
  progressBar.offsetWidth;
  progressBar.classList.add("round-time-bar");
}

UndoAnimation();

// Add Event Listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", getFormValues);
