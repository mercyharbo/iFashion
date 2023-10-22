import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import modalReducer from '@/redux/Slice/ModalSlice'
import searchModalReducer from '@/redux/Slice/SearchModalSlice'
import filterReducer from '@/redux/Slice/Filter'
import userProfile from '@/redux/Slice/UserSlice'
import products from '@/redux/Slice/ProductSlice'

export const store = configureStore({
  reducer: {
    modalReducer,
    searchModalReducer,
    filterReducer,
    userProfile,
    products,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
