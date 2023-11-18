import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

type product = {
  _id: string
  title: string
  description: string
  category: string
  discount: number
  price: number
  colors: string[]
  available_sizes: string[]
  reviews: []
  images: string[]
  related: [
    {
      _id: string
      title: string
      discount: number
      price: number
      reviews: []
      images: string[]
    }
  ]
  faq: []
  createdDate: string
  inStock: number
}

type InitialState = {
  sellerproduct: product[]
  error: string | null
  isLoading: boolean
  sellerProductDetails: product | null
  isModalOpen: boolean
  openAddProductModal: boolean
}

const initialState: InitialState = {
  sellerproduct: [],
  error: null,
  isLoading: true,
  sellerProductDetails: null,
  isModalOpen: false,
  openAddProductModal: false,
}

// Create an async thunk to fetch user data
export const getSellerProduct = createAsyncThunk(
  'product/getSellerProduct',
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
        `${process.env.BASE_URL}/products/seller`,
        options
      )

      if (response.ok) {
        const productData = await response.json()
        dispatch(setIsLoading(false))
        return productData.products
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.message
        dispatch(setIsLoading(false))
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

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSellerProductdetails: (state, action) => {
      state.sellerProductDetails = action.payload
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
    setOpenAddProductModal: (state, action) => {
      state.openAddProductModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerProduct.fulfilled, (state, action) => {
        state.sellerproduct = action.payload
        state.error = null
      })
      .addCase(getSellerProduct.rejected, (state, action) => {
        state.error = action.payload as string
        state.isLoading = false
      })
  },
})

export const { setIsLoading, setSellerProductdetails, setIsModalOpen } =
  sellerSlice.actions
export default sellerSlice.reducer
