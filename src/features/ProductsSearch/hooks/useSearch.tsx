import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { debounce } from 'lodash'
import { setLoading, setSearchResults } from '@redux/reducers/productsSlice'
import { IProduct, ProductsApi } from '@entities/product'

export const useSearch = () => {
  // ** React state **
  const [search, setSearch] = useState<string>('')

  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)
  const searchResults = useAppSelector((state) => state.global.searchResults)

  // ** Hooks **
  const dispatch = useAppDispatch()
  const productsApi = new ProductsApi()

  useEffect(() => {
    if (!searchResults.isSearch) {
      setSearch('')
    }
  }, [searchResults])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearch(searchValue)

    debounceChange({ searchValue, products })
  }

  const debounceChange = useMemo(
    () =>
      debounce((args: { searchValue: string; products: IProduct[] }) => {
        searchItems(args.searchValue, args.products)
      }, 300),
    [],
  )

  // ** Functions **
  const searchItems = async (searchValue: string, products: IProduct[]) => {
    dispatch(setLoading(true))

    // const products = await productsApi.getProducts()
    const filteredItems = products?.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    )

    if (!filteredItems) return

    dispatch(setSearchResults({ products: filteredItems, isSearch: searchValue !== '' }))
    setTimeout(() => dispatch(setLoading(false)), 500)
  }

  const removeSearch = async () => {
    const products = await productsApi.getProducts()

    setSearch('')

    if (!products) return

    searchItems('', products)
  }

  return {
    handleSearch,
    search,
    removeSearch,
  }
}
