import { IProduct } from '../model'
import { AccordionItem } from '@components/AccordionItem'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'

interface IProps {
  product: IProduct
  handleSelection: (id: number) => void
}

export const Product = (props: IProps) => {
  return (
    <div className='flex flex-col relative'>
      <Checkbox
        checked={!!props.product.selected}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          props.handleSelection(props.product.id)
        }}
        className='absolute top-1.5 left-1.5'
      />
      <AccordionItem
        title={props.product.title}
        category={props.product.category}
        price={props.product.price}
        imageUrl={props.product.image}
      />
      <Button>Add to cart</Button>
    </div>
  )
}
