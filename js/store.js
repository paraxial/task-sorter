export const STORAGE_KEY = "task-sorter-20240915";
export const STATE_UPDATED = "STATE_UPDATED"

export const UPDATE_TASK = "UPDATE_TASK"
export const ADD_TASK = "ADD_TASK"
export const DELETE_TASK = "DELETE_TASK"

export const defaultState = () => ({
  tasks: {
    test: { id: "test", name: "Test Item 1", createdAt: Date.now() }
  }
})

export const addTask = (store, name) => {
  const state = store.state
  const newId = self.crypto.randomUUID()
  store.dispatch(ADD_TASK, {
    ...state,
    tasks: {
      ...state.tasks,
      [newId]: { name, id: newId, createdAt: Date.now() }
    }
  })
}

export const updateTask = (store, id, name) => {
  const state = store.state
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

export const deleteTask = (store, id) => {
  const { state } = store
  const { [id]: _, ...tasks } = state.tasks
  store.dispatch(DELETE_TASK, {...state, tasks})
}

export class Store {
  constructor({ state }) {
    this._state = state || {};
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
}

const initialisedStore = (state) => (new Store({ state: state || defaultState() }))

export default initialisedStore;