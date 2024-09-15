import EventBus from './event-bus.js'

export const STORAGE_KEY = "task-sorter-20240915";

export default class Store {
  constructor(params) {
    let self = this;
    self.status = 'resting'
    self.events = new EventBus();

    self.actions = Object.hasOwn(params, 'actions') ? params.actions : {}
    self.mutations = Object.hasOwn(params, 'mutations') ? params.mutations : {}

    self.state = new Proxy((params.state || {}), {
      set: (state, key, value) => {
        state[key] = value
        document.localStorage.setKey(STORAGE_KEY, state)

        console.log({state,key,value})

        self.events.publish("STATE_CHANGE", self.state)

        if(self.status !== 'mutation') {
          console.warn(`Use a mutation to set ${key}`)
        }

        self.status = 'resting'

        return true
      }
  })
  }
}