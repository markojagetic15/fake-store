import { ProductsList, useProductsList } from '@widgets/ProductsList'
import { FilterDropdown } from '@features/ProductsFilter'
import { ProductsSearch } from '@features/ProductsSearch'
import { TotalPrice } from '@pages/Home'

export const Home = () => {
  useProductsList()

  return (
    <div className='w-9/12 m-auto relative'>
      <div className='pt-6 pb-6 items-center w-full flex gap-3.5 -ml-[15px]'>
        <ProductsSearch />
        <FilterDropdown />
        <TotalPrice />
      </div>
      <ProductsList />
    </div>
  )
}
