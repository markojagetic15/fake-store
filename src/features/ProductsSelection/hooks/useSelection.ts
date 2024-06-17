import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setIsSelection, setItems } from '@redux/reducers/productsSlice'
import { useEffect, useState } from 'react'

export const useSelection = () => {
  const [price, setPrice] = useState(0)
  // ** Redux state **
  const products = useAppSelector((state) => state.global.products)
  const isSelection = useAppSelector((state) => state.global.isSelection)

  // ** Hooks **
  const dispatch = useAppDispatch()

  useEffect(() => {
    const selectedPrice = products?.map((product) => {
      if (product.selected) {
        return product.price
      }
      return 0
    })

    const totalPrice = selectedPrice.reduce((acc, price) => acc + price, 0)

    setPrice(parseFloat(totalPrice.toFixed(2)))
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

  const removeSelection = () => {
    const selectedProduct = products.map((product) => {
      if (product.selected) {
        return { ...product, selected: false }
      }
      return product
    })

    dispatch(setItems(selectedProduct))
    setPrice(0)
  }

  const handleIsSelection = () => {
    if (isSelection) {
      removeSelection()
    }
    dispatch(setIsSelection(!isSelection))
  }

  return {
    handleSelection,
    price,
    removeSelection,
    isSelection,
    handleIsSelection,
  }
}
