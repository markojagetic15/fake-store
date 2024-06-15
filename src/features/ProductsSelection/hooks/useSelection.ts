import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setItems } from '@redux/reducers/productsSlice'
import { useEffect, useState } from 'react'

export const useSelection = () => {
  const [price, setPrice] = useState(0)
  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)

  // ** Hooks **
  const dispatch = useAppDispatch()

  useEffect(() => {
    const selectedPrice = products.map((product) => {
      if (product.selected) {
        return product.price
      }
      return 0
    })

    const totalPrice = selectedPrice.reduce((acc, price) => acc + price, 0)

    setPrice(totalPrice.toFixed(2) as any)
  }, [products])

  const handleSelection = (id: number) => {
    const selectedProduct = products.map((product) => {
      if (product.id === id) {
        return { ...product, selected: !product.selected }
      }
      return product
    })

    dispatch(setItems(selectedProduct))
  }

  return {
    handleSelection,
    price,
  }
}
