import type { ItemList } from "../types"

const ItemViewer = ({ itemList }:{ itemList: ItemList }) => {
  const renderCards = () => {
    if (!itemList || Object.keys(itemList).length < 1) { return <></> }

  }

  return (
    <section className="card item-viewer">
      {renderCards()}
    </section>
  )
}

export default ItemViewer;

