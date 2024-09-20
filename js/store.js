export const STORAGE_KEY = "task-sorter-20240915";

export const STATE_UPDATED = "STATE_UPDATED"
export const UPDATE_TASK = "UPDATE_TASK"
export const ADD_TASK = "ADD_TASK"
export const DELETE_TASK = "DELETE_TASK"

export default class Store {
  constructor({ state }) {
    this._state = state || { tasks: {} };
    Object.keys(this.events).forEach((key) => {
      window.addEventListener(key, this.events[key])
    })
  }

  get events() {
    return {
      ADD_TASK: this.addTask,
      UPDATE_TASK: this.updateTask,
      DELETE_TASK: this.deleteTask
    }
  }

  get state() {
    return this._state
  }

  set state(newState) {
    this._state = newState
  }

  dispatch(action, newState) {
    this._state = newState;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))

    window.dispatchEvent(new CustomEvent(STATE_UPDATED, { detail: action }));

    return true
  }

  addTask = ({ detail }) => {
    const { name } = detail;
    const state = this.state
    const newId = self.crypto.randomUUID()
    self.dispatch(ADD_TASK, {
      ...state,
      tasks: {
        ...state.tasks,
        [newId]: { name, id: newId, createdAt: Date.now() }
      }
    })
  }

  updateTask = ({ details: detail }) => {
    const { id, name } = detail
    const state = this.state
    const tasks = state.tasks
    const existingTask = tasks.get(id)

    store.dispatch(UPDATE_TASK, {
      ...state,
      tasks: {
        ...tasks,
        [id]: { ...existingTask, name }
      }
    })
  }

  deleteTask = ({ detail }) => {
    const { state } = this;
    const { id } = detail;
    const { [id]: _, ...tasks } = state.tasks

    store.dispatch(DELETE_TASK, { ...state, tasks })
  }
}