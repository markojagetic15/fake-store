import { useAppDispatch } from '@redux/hooks'
import { setItems } from '@redux/reducers/productsSlice'
import { useEffect, useState } from 'react'
import { PRODUCTS_LIST } from '@entities/product'
import { PriceFilter } from '@features/ProductsFilter'

export const useFilter = () => {
  // ** React state **
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<PriceFilter>(PriceFilter.BEST_BUY)
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks **
  const dispatch = useAppDispatch()

  useEffect(() => {
    let filteredItems = [...PRODUCTS_LIST]

    if (selectedFilters.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        selectedFilters.some((filter) => item.category.toLowerCase() === filter.toLowerCase()),
      )
    }

    if (selectedPriceFilter === PriceFilter.FROM_CHEAPEST) {
      filteredItems.sort((a, b) => a.price - b.price)
    } else if (selectedPriceFilter === PriceFilter.FROM_EXPENSIVE) {
      filteredItems.sort((a, b) => b.price - a.price)
    }

    dispatch(setItems(filteredItems))
  }, [selectedFilters, selectedPriceFilter])

  const categories: string[] = PRODUCTS_LIST.map((item) => item.category)
  const sortedCategories: string[] = categories.filter(
    (item, index) => categories.indexOf(item) === index,
  )

  // ** Functions **
  const filterItemsByCategory = (filter: string) => {
    setLoading(true)
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((selectedFilter) => selectedFilter !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
    setLoading(false)
  }

  const filterItemsByPrice = (type: PriceFilter) => {
    setLoading(true)
    setSelectedPriceFilter(type)
    setLoading(false)
  }

  return {
    filterItemsByCategory,
    selectedFilters,
    sortedCategories,
    loading,
    filterItemsByPrice,
    selectedPriceFilter,
  }
}
