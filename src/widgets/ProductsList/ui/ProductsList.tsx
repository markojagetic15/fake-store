import { Product } from '@entities/product'
import { useSelection } from '@features/ProductsSelection'
import { useAppSelector } from '@redux/hooks'
import { Spinner } from '@components/Spinner/Spinner.tsx'

export const ProductsList = () => {
  const { handleSelection } = useSelection()

  // ** Redux state **
  const { products, searchResults, loading } = useAppSelector((state) => state.global)

  const { products: searchProducts, isSearch } = searchResults
  const displayProducts = isSearch ? searchProducts : products
  const noResults = isSearch && searchProducts.length === 0

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {noResults ? (
        <div>No results</div>
      ) : (
        displayProducts.map((product) => (
          <Product key={product.id} product={product} handleSelection={handleSelection} />
        ))
      )}
    </div>
  )
}
