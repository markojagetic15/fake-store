import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './reducers/productsSlice'

const store = configureStore({
  reducer: {
    global: productsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
