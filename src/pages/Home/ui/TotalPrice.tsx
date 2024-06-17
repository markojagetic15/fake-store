import { Button } from '@components/Button'
import { useSelection } from '@features/ProductsSelection'

export const TotalPrice = () => {
  const _selection = useSelection()

  return (
    <div className='flex gap-4 items-center'>
      {_selection.isSelection ? (
        <Button variant='secondary' onClick={_selection.handleIsSelection}>
          Cancel
        </Button>
      ) : (
        <Button variant='primary' onClick={_selection.handleIsSelection}>
          Select
        </Button>
      )}

      {_selection.price > 0 && (
        <div className='flex gap-2 fixed bottom-1 z-10 bg-white p-4 border border-1 rounded-md outline outline-midnight left-1/2 transform -translate-x-1/2 items-center justify-center'>
          Price: <span className='text-midnight font-bold'>${_selection.price}</span>
        </div>
      )}
    </div>
  )
}
