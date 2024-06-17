import { HttpAdapter } from '@services/axios'
import { IProduct } from '@entities/product'

export class ProductsApi extends HttpAdapter {
  constructor() {
    super()
  }

  async getProducts(): Promise<IProduct[] | null> {
    const response = await this.GET(`https://fakestoreapi.com/products`)

    if (response) return response.data
    return null
  }

  async getProductsByCategory({ category }: { category: string }) {
    const response = await this.GET(`https://fakestoreapi.com/products/category/${category}`)

    if (response) return response.data
    return null
  }

  async getAllCategories(): Promise<string[] | null> {
    const response = await this.GET(`https://fakestoreapi.com/products/categories`)

    if (response) return response.data
    return null
  }
}
