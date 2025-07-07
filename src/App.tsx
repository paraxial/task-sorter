import ActionBar from './organisms/ActionBar';
import Lists from './organisms/Lists';
import ItemViewer from './organisms/ItemViewer';
import { useState } from 'react'
import { v4 } from 'uuid';

import type { ItemList, Vectors, VectorItemMapping } from "./types"

function App() {
  const [itemList, setItemList] = useState({} as ItemList);
  const [vectorList, setVectorList] = useState({} as Vectors);
  const [vectorItemMapping, _setVectorItemMapping] = useState({} as VectorItemMapping);

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
      <ItemViewer itemList={itemList} />
      <Lists vectorList={vectorList} vectorItemMapping={vectorItemMapping} />
    </>
  )
}

export default App
