import "./assets/css/style.css";
import { v4 as uuidv4 } from "uuid";

const form = document.querySelector("form");
const inputField = document.querySelector(" form input");
const progressBar = document.querySelector(".progressBar");
const progressBarDiv = progressBar.querySelector("div");

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

function progress(timeleft, timetotal, element) {
  var progressBarWidth = (timeleft * element.width()) / timetotal;
  progressBarDiv
    .animate({ width: progressBarWidth }, 500)
    .html(Math.floor(timeleft / 60) + ":" + (timeleft % 60));
  if (timeleft > 0) {
    setTimeout(function () {
      progress(timeleft - 1, timetotal, element);
    }, 1000);
  }
}

progress(30, 30, progressBar);

// Add Event Listeners
form.addEventListener("submit", handleSubmit);
form.addEventListener("change", getFormValues);
