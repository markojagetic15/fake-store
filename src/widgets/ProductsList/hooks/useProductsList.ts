import { useEffect } from 'react'
import { PRODUCTS_LIST } from '@entities/product'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setItems } from '@redux/reducers/productsSlice'

export const useProductsList = () => {
  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)

  // ** Hooks **
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setItems(PRODUCTS_LIST))
  }, [])

  return {
    products,
  }
}
