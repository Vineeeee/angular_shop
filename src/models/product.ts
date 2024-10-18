export interface Product{
    id: number,
    title: String,
    price: number,
    description: String,
    images: string[]
    creationAt: String,
    updatedAt: String,
    category: {
      id: Number,
      name: String,
      image: String,
      creationAt: String,
      updatedAt: String
    }
}