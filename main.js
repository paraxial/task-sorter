import InboxList from "./js/inbox-list.js"
import initialisedStore, { STORAGE_KEY, STATE_UPDATED, addTask, DELETE_TASK, deleteTask } from "./js/store.js"

const main = () => {
  const state = JSON.parse(self.localStorage.getItem(STORAGE_KEY))
  const store = initialisedStore(state)

  const renderInbox = () => {
    const tasks = Object.values(store.state.tasks || {})

    return new InboxList({ tasks }).render()
  }

  const receiveTasks = (e) => {
    e.preventDefault();
    const form = e.target

    const formData = new FormData(form)

    addTask(store, formData.get("task-name"))

    form.reset()
  }

  const handleDelete = (event) => {
    deleteTask(store, event.detail)
  }

  const handleEditModal = ({ detail }) => {
    console.log(`requesting to edit ${detail}`)
  }

  window.addEventListener(STATE_UPDATED, renderInbox);
  window.addEventListener(DELETE_TASK, handleDelete)
  window.addEventListener("TASK_EDIT_UI", handleEditModal)

  const taskForm = document.querySelector("[data-task-form]");
  taskForm.addEventListener("submit", receiveTasks);

  renderInbox()
}

document.addEventListener("DOMContentLoaded", main);
