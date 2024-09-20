//  Perhaps a good candidate to rewrite as a custom HTML element?

export default class InboxList {
  constructor({tasks}) {
    this._tasks = tasks;
    this._element = document.querySelector("[data-inbox-anchor]")
  }

  get tasks() {
    return this._tasks.sort((a, b) => {
      return a.createdAt - b.createdAt
    })
  }
  get element() { return this._element }

  render() {
    if (this.tasks.length === 0) {
      const p = document.createElement("p")
      p.textContent = "Add some tasks to get started."

      this.element.replaceChildren(p)
      return;
    }

    const ul = document.createElement("ul")
    ul.className = "task-list"

    this.tasks.forEach(item => {
      const li = document.createElement("li")
      li.className = "task"
      li.textContent = item.name

      const deleteButton = document.createElement("button")
      deleteButton.className = "button fa fa-solid fa-trash"
      deleteButton.ariaLabel = `Delete ${item.name}`
      deleteButton.addEventListener("click", () => {
        if (window.confirm(`Are you sure that you want to delete "${item.name}"?`)) {
          window.dispatchEvent(new CustomEvent("TASK_DELETE_UI", { detail: item.id }))
        }
      })

      const editButton = document.createElement("button")
      editButton.className = "button fa fa-solid fa-pencil"
      editButton.ariaLabel = `Edit ${item.name}`
      editButton.addEventListener("click", () => {
        window.dispatchEvent(new CustomEvent("TASK_EDIT_UI", {detail: item.id}))
      })

      const container = document.createElement("section")

      container.appendChild(deleteButton)
      container.appendChild(editButton)

      li.appendChild(container)
      ul.appendChild(li)
    })

    this.element.replaceChildren(ul)
  }
}