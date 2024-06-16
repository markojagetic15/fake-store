import { configureStore } from '@reduxjs/toolkit'
import { productsSlice } from './reducers/productsSlice'

const store = configureStore({
  reducer: {
    global: productsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['productsSlice/setItems'],
        ignoredPaths: ['global.products'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
