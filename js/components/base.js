import Store, { STATE_UPDATED } from "../store.js";

export default class Component {
  constructor(props = {}) {
    let self = this;
    this.render = this.render || function() {};

    if(props.store instanceof Store) {
      props.store.events.subscribe(STATE_UPDATED, () => self.render())
    }

    if(Object.hasOwn(props, "element")) {
      this.element = props.element;
    }
  }
}