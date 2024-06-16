import { Input } from '@components/Input'
import { useSearch } from '@features/ProductsSearch'
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

export const ProductsSearch = () => {
  // ** Hooks **
  const _search = useSearch()

  return (
    <Input
      startIcon={<MagnifyingGlassIcon />}
      endIcon={_search.search && <Cross1Icon onClick={_search.removeSearch} />}
      placeholder='Search products'
      onChange={(e) => {
        _search.handleSearch(e)
      }}
      value={_search.search}
      width='64'
    />
  )
}
