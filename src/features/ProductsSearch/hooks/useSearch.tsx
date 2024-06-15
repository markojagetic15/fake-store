import { useMemo, useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { debounce } from 'lodash'
import { setItems } from '@redux/reducers/productsSlice'
import { PRODUCTS_LIST } from '@entities/product'

export const useSearch = () => {
  // ** React state **
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  // ** Hooks **
  const dispatch = useAppDispatch()

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
  const searchItems = (searchValue: string) => {
    setLoading(true)
    const filteredItems = PRODUCTS_LIST.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    dispatch(setItems(filteredItems))
    setLoading(false)
  }

  return {
    handleSearch,
    loading,
    search,
  }
}
