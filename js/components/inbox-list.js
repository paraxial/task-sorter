import Component from "./base.js";
import Store from "../store.js";

export default class InboxList extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector("[data-list-anchor]")
    })
  }

  render() {
    let self = this;

    if(store.state.items.length === 0) {
      const p = document.createElement("p")
      p.textContent = "Add some items to get started."

      self.element.appendChild(p)
      return;
    }

    self.element.innerHTML = `
      <ul>
        ${
          store.state.items.map(item => {
            return `<li class="task">${item}<button aria-label="Delete ${item}">×</button></li>`
          }).join('')
        }
      </ul>
    `;

    self.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('clearItem', { index });
      });
    });
  }
}