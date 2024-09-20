import { defineCustomElements } from "./js/custom-element-definitions.js"
import InboxList from "./js/inbox-list.js"
import Store, { STORAGE_KEY, STATE_UPDATED, DELETE_TASK, ADD_TASK } from "./js/store.js"

const main = () => {
  defineCustomElements()
  const state = JSON.parse(self.localStorage.getItem(STORAGE_KEY))
  const store = new Store({ state })

  const renderInbox = () => {
    const tasks = Object.values(store.state.tasks || {})

    return new InboxList({ tasks }).render()
  }

  const receiveTasks = (e) => {
    e.preventDefault();
    const form = e.target

    const formData = new FormData(form)

    window.dispatchEvent(new CustomEvent(ADD_TASK, { detail: { name: formData.get("task-name") } }))

    form.reset()
  }

  const handleDelete = (event) => {
    window.dispatchEvent(new CustomEvent(DELETE_TASK, { detail: { id: event.detail }} ))
  }

  const handleEditModal = ({ detail }) => {
    console.log(`requesting to edit ${detail}`)
  }

  const addInfoButton = () => {
    const infoButton = document.querySelector("[data-about-button]")
    const dialog = document.querySelector("[data-about-section]")

    infoButton.addEventListener("click", () => { dialog.showModal() });
  }

  window.addEventListener(STATE_UPDATED, renderInbox);
  window.addEventListener("TASK_DELETE_UI", handleDelete)
  window.addEventListener("TASK_EDIT_UI", handleEditModal)

  const taskForm = document.querySelector("[data-task-form]");
  taskForm.addEventListener("submit", receiveTasks);

  addInfoButton()
  renderInbox()
}

document.addEventListener("DOMContentLoaded", main);

/*
    <custom-dialog>
      <span slot="modal-trigger">Heck yeah?</span>
      <span slot="modal-title">Wooo</span>
      <section slot="modal-content">
        <p>many</p>
        <p>paragraphs?</p>
      </section>
    </custom-dialog>
*/