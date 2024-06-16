import { Button } from '@components/Button'
import { useSelection } from '@features/ProductsSelection'

export const TotalPrice = () => {
  const _selection = useSelection()

  return (
    <div className='flex gap-9 items-center'>
      {_selection.price > 0 && (
        <div className='flex gap-2 items-center'>
          Price: <span className='text-midnight font-bold'>${_selection.price}</span>
        </div>
      )}

      {_selection.isSelection ? (
        <Button variant='secondary' onClick={_selection.handleIsSelection}>
          Cancel
        </Button>
      ) : (
        <Button variant='primary' onClick={_selection.handleIsSelection}>
          Select
        </Button>
      )}
    </div>
  )
}
