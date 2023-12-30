import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify'

type UserProfile = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  gender: string
  dateOfBirth: any
  profile_picture: string
  accountType: string
}

type InitialState = {
  user: UserProfile | null
  error: string | null
  isSubmitting: boolean
  isLoading: boolean
  token: string
}

const initialState: InitialState = {
  user: null,
  error: null,
  isSubmitting: false,
  isLoading: true,
  token: '',
}

// Create an async thunk to fetch user data
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true))
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

      const data = await response.json()

      // condition checking the status of the request
      if (data.success === true) {
        dispatch(setIsLoading(false))
        return data.profile
      } else {
        dispatch(setIsLoading(false))
        toast.error(data.message, {
          position: 'top-right',
          autoClose: 5000, // Adjust as needed
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })

        return toast.error(data.message)
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
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
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

export const { setUserProfile, setIsSubmitting, setIsLoading, setToken } =
  userSlice.actions
export default userSlice.reducer
