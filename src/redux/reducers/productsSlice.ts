import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IProduct } from '@entities/product'

interface ProductsState {
  products: IProduct[]
  isSelection: boolean
  categories: string[]
  loading: boolean
}

const initialState = {
  products: [],
  isSelection: false,
  categories: [],
  loading: false,
} as ProductsState

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState: initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setIsSelection: (state, action: PayloadAction<boolean>) => {
      state.isSelection = action.payload
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItems, setIsSelection, setCategories, setLoading } = productsSlice.actions

export default productsSlice.reducer
