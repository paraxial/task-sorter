import ActionBar from './organisms/ActionBar';
import Lists from './organisms/Lists';
import ItemViewer from './organisms/ItemViewer';
import { useState } from 'react'
import { v4 } from 'uuid';

function App() {
  const [itemList, setItemList] = useState({});
  const [vectorList, setVectorList] = useState({});
  const [vectorItemMapping, setVectorItemMapping] = useState({});

  const addItem = (itemName:string) => {
    setItemList({ [v4()]: itemName, ...itemList})
  }

  const addVector = (vectorName:string) => {
    setVectorList({ [v4()]: vectorName, ...vectorList})
  }

  console.log({itemList, vectorList})

  return (
    <>
      <ActionBar addItem={addItem} addVector={addVector} />
      <ItemViewer items={itemList} />
      <Lists vectorList={vectorList} vectorItemMapping={vectorItemMapping} />
    </>
  )
}

export default App
