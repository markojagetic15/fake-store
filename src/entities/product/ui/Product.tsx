import { IProduct } from '../model'
import { Card } from '@components/Card'
import { Button } from '@components/Button'
import { useAppSelector } from '@redux/hooks'

interface IProps {
  product: IProduct
  handleSelection: (id: number) => void
}

export const Product = (props: IProps) => {
  // ** Redux state **
  const isSelection = useAppSelector((state) => state.global.isSelection)

  return (
    <div
      className={`p-0 flex flex-col relative cursor-pointer rounded-md ${props.product.selected ? 'outline outline-2 outline-midnight' : ''}`}
      onClick={() => {
        if (!isSelection) return
        props.handleSelection(props.product.id)
      }}
    >
      <Card
        title={props.product.title}
        category={props.product.category}
        price={props.product.price}
        imageUrl={props.product.image}
      />
      <Button>Add to cart</Button>
    </div>
  )
}
