import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  inStock: number
}

type InitialState = {
  products: productDetails[]
  error: string | null
  isSubmitting: boolean
  isLoading: boolean
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
  isLoading: false,
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
export const fetchProducts = createAsyncThunk(
  '/products',
  async (_, { dispatch }) => {
    dispatch(setIsLoading(true))
    try {
      const token = localStorage.getItem('token') // Get the token from localStorage
      const headers = new Headers({
        'Content-Type': 'application/json',
      })

      const options = {
        method: 'GET',
        headers,
      }

      const response = await fetch(`${process.env.BASE_URL}/products`, options)
      const productData = await response.json()
      dispatch(setIsLoading(false))
      return productData.products
    } catch (error) {
      // Assert error as an Error object
      const err = error as Error
      // Return the error message instead of a string
      return err.message || 'An error occurred while trying to fetch products'
    }
  }
)

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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.error = null
        state.isLoading = false
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
  setIsLoading,
} = ProductSlice.actions
export default ProductSlice.reducer
