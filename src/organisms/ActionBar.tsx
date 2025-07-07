type voidFunction = (name:string) => void

interface PropTypes {
  addItem: voidFunction
  addVector: voidFunction
}

const ActionBar = ({ addItem, addVector }:PropTypes) => {
  const handleForm = (e:any, key:string, updateFunction:voidFunction) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const name = form.get(key) as string

    updateFunction(name)

    e.target.reset()
  }

  const handleNewVector = (e: any) => {
    handleForm(e, "newVector", addVector)
  }
  const handleNewItem = (e: any) => {
    handleForm(e, "newItem", addItem)
  }

  return (
    <section className="form-area card">
      <form onSubmit={handleNewItem}>
        <label>
          Add new task
          <input required name="newItem" />
        </label>
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleNewVector}>
        <label>
          Add new vector
          <input required name="newVector" />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  )
};

export default ActionBar;
