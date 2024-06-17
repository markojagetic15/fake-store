import { IProduct } from '@entities/product'

export const getProductId = (product: IProduct): number => product.id

export const getProductTitle = (product: IProduct): string => product.title

export const getProductPrice = (product: IProduct): number => product.price

export const getProductDescription = (product: IProduct): string => product.description

export const getProductCategory = (product: IProduct): string => product.category

export const getProductImage = (product: IProduct): string => product.image

export const getProductRating = (product: IProduct): number => product.rating.rate

export const getProductRatingCount = (product: IProduct): number => product.rating.count

export const getProductSelected = (product: IProduct): boolean | undefined => product.selected
