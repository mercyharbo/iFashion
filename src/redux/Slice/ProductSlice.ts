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
  related: []
  faq: []
  createdDate: string
}

type InitialState = {
  products: productDetails[]
  error: string | null
  isSubmitting: boolean
  filteredProducts: productDetails[]
  productDetailsData: productDetails | null
  cart:
    | [
        {
          id: string
          title: string
          image: string
          size: string
          color: []
          price: number
          quantity: number
          discount: number
        }
      ]
}

const initialState: InitialState = {
  products: [],
  error: null,
  isSubmitting: false,
  filteredProducts: [],
  productDetailsData: null,
  cart: [
    {
      id: '',
      title: '',
      image: '',
      size: '',
      color: [],
      price: 0,
      quantity: 0,
      discount: 0,
    },
  ],
}

// Create an async thunk to fetch products data
export const fetchProducts = createAsyncThunk('/products', async () => {
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
    setProduct: (state, action: PayloadAction<productDetails[]>) => {
      state.products = action.payload
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload
    },
    setFilteredProducts: (state, action: PayloadAction<productDetails[]>) => {
      state.filteredProducts = action.payload
    },
    setProductDetailsData: (state, action: PayloadAction<productDetails>) => {
      state.productDetailsData = action.payload
    },
    setCarts: (state, action) => {
      state.cart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isSubmitting = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.error = null
        state.isSubmitting = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string
        state.isSubmitting = false
      })
  },
})

export const {
  setProduct,
  setIsSubmitting,
  setFilteredProducts,
  setProductDetailsData,
  setCarts,
} = ProductSlice.actions
export default ProductSlice.reducer
