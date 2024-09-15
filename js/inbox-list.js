//  Perhaps a good candidate to rewrite as a custom HTML element?

export default class InboxList {
  constructor(tasks) {
    this._tasks = tasks
    this._element = document.querySelector("[data-inbox-anchor]")
  }

  get tasks() {
    return this._tasks.sort((a, b) => {
      return a.createdAt - b.createdAt
    })
  }
  get element() { return this._element }

  render() {
    if(this.tasks.length === 0) {
      const p = document.createElement("p")
      p.textContent = "Add some items to get started."

      this.element.appendChild(p)
      return;
    }

    this.element.innerHTML = `
      <ul class="task-list">
        ${
          this.tasks.map(item => {
            return `<li class="task">${item.name}</li>`
          }).join('')
        }
      </ul>
    `;
  }
}