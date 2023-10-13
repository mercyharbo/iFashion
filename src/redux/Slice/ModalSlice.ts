import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
  filterModal: boolean
}

const initialState = {
  modal: {
    isOpen: false,
  } as ModalState
} as InitialState;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
    },
    openFilterModal: (state) => {
      state.modal.filterModal = true
    },
    closeFilterModal: (state) => {
      state.modal.filterModal = false
    }
  },
});

export const { openModal, closeModal, openFilterModal, closeFilterModal } = modalSlice.actions;
export default modalSlice.reducer;
