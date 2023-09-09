// redux/modalSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
