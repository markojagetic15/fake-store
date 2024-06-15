import { Deserializer } from 'jsonapi-serializer'
import { HttpAdapter } from './httpsAdapterServices.ts'
import { IProduct } from '@entities/product'

export class AxiosService extends HttpAdapter {
  constructor() {
    super()
  }

  getAnyDeserializedData(e: IProduct[]) {
    try {
      return new Deserializer({
        keyForAttribute: 'camelCase',
        pluralizeType: false,
      })
        .deserialize(e)
        .then((data) => {
          return data
        })
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle the error specifically if needed
        console.error(error.message)
      }
      return null
    }
  }

  async getProducts() {
    const response = await this.GET('https://fakestoreapi.com/products')
    if (response) return response
  }
}
