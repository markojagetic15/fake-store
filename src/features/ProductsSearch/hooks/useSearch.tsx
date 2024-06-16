import { useMemo, useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { debounce } from 'lodash'
import { setItems, setLoading } from '@redux/reducers/productsSlice'
import { ProductsApi } from '@entities/product'

export const useSearch = () => {
  // ** React state **
  const [search, setSearch] = useState<string>('')

  // ** Hooks **
  const dispatch = useAppDispatch()
  const productsApi = new ProductsApi()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value
    setSearch(searchValue)

    debounceChange({ searchValue })
  }

  const debounceChange = useMemo(
    () =>
      debounce((args: { searchValue: string }) => {
        searchItems(args.searchValue)
      }, 300),
    [],
  )

  // ** Functions **
  const searchItems = async (searchValue: string) => {
    dispatch(setLoading(true))

    const products = await productsApi.getProducts()
    const filteredItems = products?.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    )

    if (!filteredItems) return

    dispatch(setItems(filteredItems))
    setTimeout(() => dispatch(setLoading(false)), 500)
  }

  const removeSearch = () => {
    setSearch('')
    searchItems('')
  }

  return {
    handleSearch,
    search,
    removeSearch,
  }
}
