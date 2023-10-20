import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

type UserProfile = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  address: string
  gender: string
  dateOfBirth: null
}

type InitialState = {
  user: UserProfile | null
  error: string | null
}

const initialState: InitialState = {
  user: null,
  error: null,
}

// Create an async thunk to fetch user data
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    try {
      const token = localStorage.getItem('token') // Get the token from localStorage
      const headers = new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      })

      const options = {
        method: 'GET',
        headers,
      }

      const response = await fetch(
        `${process.env.BASE_URL}/user/profile`,
        options
      )

      if (response.ok) {
        const userData = await response.json()
        return userData.profile
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message

        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000, // Adjust as needed
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        return toast.error(errorMessage)
      }
    } catch (error) {
      return 'An error occurred whe=ile trying to fetch user'
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { setUserProfile } = userSlice.actions
export default userSlice.reducer