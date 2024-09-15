export default class EventBus {
  constructor() {
    this.events = {}
  }

  eventContains(eventList, event) {
    return Object.hasOwn(eventList, event)
  }

  subscribe(event, callback) {
    let self = this;
    if(!this.eventContains(self.events, event)) {
      self.events[event]
    }
    return self.events[event].push(callback)
  }

  publish(event, data={}) {
    let self = this;
    if(!this.eventContains(self.events, event)) {
      return [];
    }

    return self.events[event].map((callback) => (callback(data)))
  }
}