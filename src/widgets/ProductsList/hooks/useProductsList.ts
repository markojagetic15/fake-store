import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setCategories, setItems, setLoading } from '@redux/reducers/productsSlice'
import { ProductsApi } from '@entities/product'

export const useProductsList = () => {
  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)

  // ** Hooks **
  const dispatch = useAppDispatch()
  const productsApi = new ProductsApi()

  const fetchProducts = async () => {
    dispatch(setLoading(true))
    const response = await productsApi.getProducts()
    if (response) {
      dispatch(setItems(response))
    }
    dispatch(setLoading(false))
  }

  const fetchCategories = async () => {
    const response = await productsApi.getAllCategories()
    if (response) {
      dispatch(setCategories(response))
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return {
    products,
  }
}
