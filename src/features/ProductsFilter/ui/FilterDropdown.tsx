import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { DropdownItem } from '@components/DropdownItem'
import { Dropdown } from '@components/Dropdown'
import { PRICE_FILTERS, useFilter } from '@features/ProductsFilter'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const FilterDropdown = () => {
  const _filter = useFilter()

  return (
    <Dropdown
      trigger={
        <div className='cursor-pointer'>
          <HamburgerMenuIcon />
        </div>
      }
    >
      <div className='text-black font-bold text-[13px] leading-none px-[5px] p-2'>By category</div>
      {[..._filter.sortedCategories].map((category) => {
        return (
          <DropdownItem
            onSelect={() => _filter.filterItemsByCategory(category)}
            selected={
              !!_filter.selectedFilters.find((filter) => {
                return filter === category
              })
            }
          >
            {category.toUpperCase()}
          </DropdownItem>
        )
      })}
      <DropdownMenu.Separator className='h-[1px] bg-black m-[5px]' />
      <div className='text-black font-bold text-[13px] leading-none px-[5px] p-2'>By price</div>

      {[...PRICE_FILTERS].map((priceRange) => {
        return (
          <DropdownItem
            onSelect={() => _filter.filterItemsByPrice(priceRange.type)}
            selected={_filter.selectedPriceFilter === priceRange.type}
          >
            {priceRange.label.toUpperCase()}
          </DropdownItem>
        )
      })}
    </Dropdown>
  )
}
