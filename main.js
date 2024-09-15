import InboxList from "./js/inbox-list.js"
import initialisedStore, { STORAGE_KEY, STATE_UPDATED, addTask } from "./js/store.js"

const main = () => {
  const state = JSON.parse(self.localStorage.getItem(STORAGE_KEY))
  const store = initialisedStore(state)

  const renderInbox = () => {
    const tasks = Object.values(store.state.tasks || {})

    return new InboxList(tasks).render()
  }

  const receiveTasks = (e) => {
    e.preventDefault();
    const form = e.target

    const formData = new FormData(form)

    addTask(store, formData.get("task-name"))

    form.reset()
  }

  window.addEventListener(STATE_UPDATED, renderInbox);

  const taskForm = document.querySelector("[data-task-form]");
  taskForm.addEventListener("submit", receiveTasks);

  console.log({state, store})
  renderInbox()
}

document.addEventListener("DOMContentLoaded", main);