import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

type productDetails = {
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
  productImage: string
  createdDate: string
}

type InitialState = {
  products: productDetails[]
  error: string | null
  isSubmitting: boolean
  filteredProducts: productDetails[]
}

const initialState: InitialState = {
  products: [],
  error: null,
  isSubmitting: false,
  filteredProducts: [],
}

// Create an async thunk to fetch products data
export const fetchProducts = createAsyncThunk('/products', async () => {
  try {
    const token = localStorage.getItem('token') // Get the token from localStorage
    const headers = new Headers({
      // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    })

    const options = {
      method: 'GET',
      headers,
    }

    const response = await fetch(`${process.env.BASE_URL}/products`, options)

    if (response.ok) {
      const productData = await response.json()
      return productData.products
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
    return 'An error occurred whe=ile trying to fetch products'
  }
})

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setproductDetails: (state, action: PayloadAction<productDetails[]>) => {
      state.products = action.payload
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    setFilteredProducts: (state, action: PayloadAction<productDetails[]>) => {
      state.filteredProducts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { setproductDetails, setIsSubmitting, setFilteredProducts } =
  ProductSlice.actions
export default ProductSlice.reducer
