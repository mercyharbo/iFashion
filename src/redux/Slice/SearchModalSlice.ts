import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
  searchQuery: string
  showPassword: boolean
}

const initialState = {
  modal: {
    isOpen: false,
    searchQuery: '',
    showPassword: false,
  } as ModalState,
} as InitialState

const searchModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.modal.isOpen = true
    },
    closeSearchModal: (state) => {
      state.modal.isOpen = false
    },
    setSearchQuercy: (state, action) => {
      state.modal.searchQuery = action.payload
    },
    setShowPassword: (state, action) => {
      state.modal.showPassword = action.payload
    },
  },
})

export const {
  openSearchModal,
  closeSearchModal,
  setSearchQuercy,
  setShowPassword,
} = searchModal.actions
export default searchModal.reducer
