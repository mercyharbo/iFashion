import { createSlice } from '@reduxjs/toolkit';

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

const searchModal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.modal.isOpen = true;
    },
    closeSearchModal: (state) => {
      state.modal.isOpen = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } = searchModal.actions;
export default searchModal.reducer;
