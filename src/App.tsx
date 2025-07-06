import ActionBar from './organisms/ActionBar';
import Lists from './organisms/Lists';
import { useState } from 'react'

function App() {
  const [lists, setLists] = useState({})

  return (
    <>
      <ActionBar setLists={setLists} />
      <Lists lists={lists} />
    </>
  )
}

export default App
