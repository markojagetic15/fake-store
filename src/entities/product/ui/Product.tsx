import {
  getProductCategory,
  getProductId,
  getProductImage,
  getProductPrice,
  getProductSelected,
  getProductTitle,
  IProduct,
} from '@entities/product'
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
      className={`p-0 flex flex-col relative cursor-pointer rounded-md ${getProductSelected(props.product) ? 'outline outline-2 outline-midnight' : ''}`}
      onClick={() => {
        if (!isSelection) return
        props.handleSelection(getProductId(props.product))
      }}
    >
      <Card
        title={getProductTitle(props.product)}
        category={getProductCategory(props.product)}
        price={getProductPrice(props.product)}
        imageUrl={getProductImage(props.product)}
      />
      <Button>Add to cart</Button>
    </div>
  )
}
