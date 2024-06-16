import { HttpAdapter } from '@services/axios'
import { IProduct } from '@entities/product'

export class ProductsApi extends HttpAdapter {
  constructor() {
    super()
  }

  async getProducts(): Promise<IProduct[] | null> {
    const response = this.getDeserializedData(fetch(`https://fakestoreapi.com/products`))

    if (response) return response
    return null
  }

  async getProductsByCategory({ category }: { category: string }) {
    const response = this.getDeserializedData(
      fetch(`https://fakestoreapi.com/products/category/${category}`),
    )

    if (response) return response
  }

  async getAllCategories(): Promise<string[] | null> {
    const response = this.getDeserializedData(fetch(`https://fakestoreapi.com/products/categories`))

    if (response) return response
    return null
  }
}
