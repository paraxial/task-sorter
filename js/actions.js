export const defaultState = () => ({
  items: {
    asdkfjhasdkf: { id: "asdkfjhasdkf", name: "Test Item 1", createdAt: Date.now() }
  }
})

export const addTask = (context, payload) => {
  context.dispatch("ADD_TASK", { name: payload, id: self.crypto.randomUUID(), createdAt: Date.now() } )
}

export const clearTask = (context, payload) => {
  context.dispatch("DELETE_TASK", payload.id)
}