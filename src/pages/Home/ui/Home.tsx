import { ProductsList } from '@widgets/ProductsList'
import { FilterDropdown } from '@features/ProductsFilter'
import { ProductsSearch } from '@features/ProductsSearch'
import { useSelection } from '@features/ProductsSelection'

export const Home = () => {
  const _selection = useSelection()
  return (
    <div className='w-9/12 m-auto relative'>
      <div className='flex p-6 content-center items-center gap-3.5'>
        <ProductsSearch />
        <FilterDropdown />
        {_selection.price > 0 && <div className='w-[180px]'>Price: {_selection.price}</div>}
      </div>
      <ProductsList />
    </div>
  )
}
