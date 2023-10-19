import { createSlice } from '@reduxjs/toolkit'

type UserProfile = {
  firstName: string
  // Add other user profile properties here
}

type InitialState = {
  user: UserProfile | null
}

const initialState: InitialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUserProfile } = userSlice.actions
export default userSlice.reducer
