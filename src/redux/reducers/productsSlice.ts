import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@entities/product'

interface ProductsState {
  products: IProduct[]
}

const initialState = {
  products: [],
} as ProductsState

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItems } = productsSlice.actions

export default productsSlice.reducer
