import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setItems, setLoading, setSearchResults } from '@redux/reducers/productsSlice'
import { PriceFilter } from '@features/ProductsFilter'
import { getProductPrice, IProduct } from '@entities/product'
import { ProductsApi } from '@entities/product'

export const useFilter = () => {
  // ** React state **
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<PriceFilter>(PriceFilter.BEST_BUY)

  // ** Redux state **
  const categories = useAppSelector((state) => state.global.categories)
  const searchResults = useAppSelector((state) => state.global.searchResults)

  // ** Hooks **
  const dispatch = useAppDispatch()
  const productsApi = new ProductsApi()

  useEffect(() => {
    sortProducts()
  }, [selectedFilters, selectedPriceFilter])

  // ** Functions **
  const sortProducts = async () => {
    dispatch(setLoading(true))
    let filteredItems: IProduct[] = []
    if (selectedFilters.length > 0) {
      const promises = selectedFilters.map((category) =>
        productsApi.getProductsByCategory({ category }),
      )

      const productsArray = await Promise.all(promises)

      filteredItems = productsArray.flat()
    } else if (selectedFilters.length === 0) {
      const response = await productsApi.getProducts()
      if (response) {
        filteredItems = response
      }
    }

    if (selectedPriceFilter === PriceFilter.FROM_CHEAPEST) {
      filteredItems.sort((a, b) => getProductPrice(a) - getProductPrice(b))
    } else if (selectedPriceFilter === PriceFilter.FROM_EXPENSIVE) {
      filteredItems.sort((a, b) => getProductPrice(b) - getProductPrice(a))
    }

    if (searchResults.isSearch) {
      dispatch(setSearchResults({ products: filteredItems, isSearch: true }))
    } else {
      dispatch(setItems(filteredItems))
    }
    dispatch(setLoading(false))
  }

  const filterItemsByCategory = async (category: string) => {
    dispatch(setSearchResults({ products: [], isSearch: false }))
    dispatch(setLoading(true))
    const response = await productsApi.getProductsByCategory({ category })
    if (response) {
      dispatch(setItems(response))
    }

    if (selectedFilters.includes(category)) {
      setSelectedFilters(selectedFilters.filter((selectedFilter) => selectedFilter !== category))
    } else {
      setSelectedFilters([...selectedFilters, category])
    }

    setLoading(false)
  }

  const filterItemsByPrice = (type: PriceFilter) => {
    setSelectedPriceFilter(type)
  }

  return {
    filterItemsByCategory,
    selectedFilters,
    categories,
    filterItemsByPrice,
    selectedPriceFilter,
  }
}
