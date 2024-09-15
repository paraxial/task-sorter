import Store, { STORAGE_KEY } from "./js/store.js"

const STATE_UPDATE = "STATE_UPDATE"

const defaultState = () => ({ list1: { }, currentList: "list1" })

const updateStorage = ({ detail }) => {

}

const renderInbox = ({ detail }) => {
  const inboxList = document.querySelector("[data-inbox-anchor]")

  const task = document.createElement("p")
  task.classList = "task"
  task.textContent = detail

  inboxList.appendChild(task)
}

const receiveTasks = (e) => {
  e.preventDefault();
  const form = e.target

  const formData = new FormData(form)

  updateStateEvent( formData.get("task-name") )

  form.reset()
}

const main = () => {
  const state = window.localStorage.getItem(STORAGE_KEY) || defaultState()

  const store = new Store({ state })

  window.addEventListener(STATE_UPDATE, updateStorage);
  window.addEventListener(STATE_UPDATE, renderInbox);

  const taskForm = document.querySelector("[data-task-form]");
  taskForm.addEventListener("submit", receiveTasks);
}

document.addEventListener("DOMContentLoaded", main);