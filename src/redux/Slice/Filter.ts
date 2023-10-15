import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  filters: FilterState
  filteredData: any[]
}

type FilterState = {
  selectedColors: string[]
  selectedSize: string[]
  selectedCategory: string | ''
  filteredData: any[]
}

const initialState = {
  filters: {
    selectedCategory: '',
    selectedSize: [],
    selectedColors: [],
    filteredData: [],
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
    setFilteredData: (state, action) => {
      state.filteredData = action.payload
    },
  },
})

export const {
  setSelectedCategory,
  setSelectedColors,
  setSelectedSize,
  setFilteredData,
} = filterSlice.actions
export default filterSlice.reducer
