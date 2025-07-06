const ActionBar = ({}) => {
  // const handleNewList = (e: FormEvent<HTMLFormElement>) => {
  const handleNewList = (e: any) => {
    e.preventDefault();
    debugger
    e.data;
  }
  const handleNewItem = (e: any) => {
    e.preventDefault();
    debugger
    e.data;
  }

  return (
    <section>
      <form onSubmit={handleNewItem}>
        <label>
          Add new task
          <input name="new-task" />
        </label>
        <button type="submit">Add</button>
      </form>

      <form onSubmit={handleNewList}>
        <label>
          Add new list
          <input name="new-list" />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  )
};

export default ActionBar;
