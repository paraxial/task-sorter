type ItemId = string
type VectorId = string

export interface ItemList {
  [id:ItemId]: string
}

export interface Vectors {
  [id:VectorId]: string
}

export interface VectorItemMapping {
  [id: VectorId]: {
    sorted: ItemId[][]
    unsorted: ItemId[]
  }
}
