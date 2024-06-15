import { Product } from '@entities/product'
import { useProductsList } from '@widgets/ProductsList'
import { useSelection } from '@features/ProductsSelection'

export const ProductsList = () => {
  const _itemsList = useProductsList()
  const _selection = useSelection()

  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {_itemsList.products.map((product) => {
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
