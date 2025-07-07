import type { Vectors, VectorItemMapping } from "../types"

interface PropTypes {
  vectorList: Vectors,
  vectorItemMapping: VectorItemMapping
}

const Lists = ({ vectorList, vectorItemMapping }:PropTypes) => {
  console.log({ vectorList, vectorItemMapping })
  return (
    <section className="card list-flow">
    </section>
  )
}

export default Lists;
