import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
  filterModal: boolean
  cartOpen: boolean
}

const initialState = {
  modal: {
    isOpen: false,
    cartOpen: false,
  } as ModalState,
} as InitialState

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal.isOpen = true
    },
    closeModal: (state) => {
      state.modal.isOpen = false
    },
    openFilterModal: (state) => {
      state.modal.filterModal = true
    },
    closeFilterModal: (state) => {
      state.modal.filterModal = false
    },
    setCartOpen: (state, action) => {
      state.modal.cartOpen = action.payload
    },
  },
})

export const {
  openModal,
  closeModal,
  openFilterModal,
  closeFilterModal,
  setCartOpen,
} = modalSlice.actions
export default modalSlice.reducer
