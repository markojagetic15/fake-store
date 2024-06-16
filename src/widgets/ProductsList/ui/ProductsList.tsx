import { Product } from '@entities/product'
import { useSelection } from '@features/ProductsSelection'
import { useAppSelector } from '@redux/hooks'
import { Spinner } from '@components/Spinner'

export const ProductsList = () => {
  const _selection = useSelection()

  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)
  const loading = useAppSelector((state) => state.global.loading)

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spinner />
      </div>
    )

  if (!products) return <div>No results</div>

  return (
    <div className='pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {products &&
        products.map((product) => {
          return (
            <Product
              product={product}
              key={product.id}
              handleSelection={_selection.handleSelection}
            />
          )
        })}
    </div>
  )
}
