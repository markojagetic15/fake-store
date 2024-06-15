import { PriceFilter } from '@features/ProductsFilter'

export const PRICE_FILTERS = [
  {
    label: 'Best buy',
    type: PriceFilter.BEST_BUY,
  },
  {
    label: 'From cheapest',
    type: PriceFilter.FROM_CHEAPEST,
  },
  {
    label: 'From most expensive',
    type: PriceFilter.FROM_EXPENSIVE,
  },
]
