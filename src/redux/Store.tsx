import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import modalReducer from '@/redux/Slice/ModalSlice'
import searchModalReducer from '@/redux/Slice/SearchModalSlice'
import filterReducer from '@/redux/Slice/Filter'

export const store = configureStore({
  reducer: {
    modalReducer,
    searchModalReducer,
    filterReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
