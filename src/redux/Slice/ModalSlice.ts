import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
  filterModal: boolean
  cartOpen: boolean
  profileOpen: boolean
  updateProfileModal: boolean
}

const initialState = {
  modal: {
    isOpen: false,
    cartOpen: false,
    profileOpen: false,
    updateProfileModal: false,
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
    setProfileOpen: (state, action) => {
      state.modal.profileOpen = action.payload
    },
    setUpdateProfileModal: (state, action) => {
      state.modal.updateProfileModal = action.payload
    },
  },
})

export const {
  openModal,
  closeModal,
  openFilterModal,
  closeFilterModal,
  setCartOpen,
  setProfileOpen,
  setUpdateProfileModal,
} = modalSlice.actions
export default modalSlice.reducer
