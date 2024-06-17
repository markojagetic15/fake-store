import { ProductsList, useProductsList } from '@widgets/ProductsList'
import { FilterDropdown } from '@features/ProductsFilter'
import { ProductsSearch } from '@features/ProductsSearch'
import { TotalPrice } from '@pages/Home'

export const Home = () => {
  useProductsList()

  return (
    <div className='w-9/12 m-auto relative'>
      <div className='pt-6 pb-6 flex justify-between items-center relative'>
        <ProductsSearch />
        <div className='flex gap-9 items-center'>
          <TotalPrice />
          <FilterDropdown />
        </div>
      </div>
      <ProductsList />
    </div>
  )
}
