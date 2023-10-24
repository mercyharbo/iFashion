import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  filters: FilterState
}

type FilterState = {
  selectedColors: string[]
  selectedSize: string
  selectedCategory: string | ''
  isColorVisible: boolean
  isSizeVisible: boolean
  iCategoryVisible: boolean
}

const initialState = {
  filters: {
    selectedCategory: '',
    selectedSize: '',
    selectedColors: [],
    isColorVisible: false,
    isSizeVisible: false,
    iCategoryVisible: false,
  } as FilterState,
} as InitialState

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedColors: (state, action) => {
      state.filters.selectedColors = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.filters.selectedCategory = action.payload
    },
    setSelectedSize: (state, action) => {
      state.filters.selectedSize = action.payload
    },
    setIsColorVisible: (state, action) => {
      state.filters.isColorVisible = action.payload
    },
    setIsSizeVisible: (state, action) => {
      state.filters.isSizeVisible = action.payload
    },
    setIsCategoryVisible: (state, action) => {
      state.filters.iCategoryVisible = action.payload
    },
  },
})

export const {
  setSelectedCategory,
  setSelectedColors,
  setSelectedSize,
  setIsColorVisible,
  setIsCategoryVisible,
  setIsSizeVisible,
} = filterSlice.actions
export default filterSlice.reducer
