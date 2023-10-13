import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  modal: ModalState
}

type ModalState = {
  isOpen: boolean
  searchQuery: string
}

const initialState = {
  modal: {
    isOpen: false,
    searchQuery: ''
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
    setSearchQuercy: (state, action) => {
       state.modal.searchQuery = action.payload;
    }
  },
});

export const { openSearchModal, closeSearchModal, setSearchQuercy } = searchModal.actions;
export default searchModal.reducer;
