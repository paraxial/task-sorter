const ItemViewer = ({ itemList }) => {
  const renderCards = () => {
    if (!itemList || itemList.length < 1) { return <></> }

  }

  return (
    <section className="card item-viewer">
      {renderCards()}
    </section>
  )
}

export default ItemViewer;

