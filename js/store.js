import EventBus from './event-bus.js'

export const STORAGE_KEY = "task-sorter-20240915";
export const STATE_UPDATED = "STATE_UPDATED"

/*
  Largely adapted from this tutorial:
  https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/
  with thanks to Andy Bell.
*/
export default class Store {
  constructor(params) {
    let self = this;
    self.status = 'resting'
    self.events = new EventBus();

    self.actions = Object.hasOwn(params, 'actions') ? params.actions : {}

    self.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value
        document.localStorage.setKey(STORAGE_KEY, state)

        console.log({ state, key, value })

        self.events.publish(STATE_UPDATED, self.state)

        if (self.status !== 'mutation') {
          console.warn(`Use a mutation to set ${key}`)
        }

        self.status = 'resting'

        return true
      }
    })
  }

  dispatch(key, payload) {
    let self = this;

    if(typeof self.actions[key] !== 'function') {
      console.error(`Action ${key} does not exist.`)
      return false
    }

    console.groupCollapsed({key})
      self.status = 'action'
      self.actions[key](self, payload)
    console.groupEnd()

    return true
  }

  commit(key, payload) {
    let self = this;
    if(typeof self.mutations[key] !== 'function') {
      console.warn(`Mutation ${key} does not exist`)
      return false
    }

    self.status = 'mutation';

    const newState = self.mutations[key](self.state, payload)
    self.state = { ...self.state, ...newState }

    return true
  }
}