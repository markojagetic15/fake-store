import { Input } from '@components/Input'
import { useSearch } from '@features/ProductsSearch'

export const ProductsSearch = () => {
  // ** Hooks **
  const _search = useSearch()

  return (
    <Input
      placeholder='Search products'
      onChange={(e) => {
        _search.handleSearch(e)
      }}
      value={_search.search}
    />
  )
}
