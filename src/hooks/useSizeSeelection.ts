import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setSelectedSize } from '@/redux/Slice/Filter'

const useSizeSelection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedSize = useAppSelector(
    (state) => state.filterReducer.filters.selectedSize
  )

  const handleSizeClick = (size: string) => {
    dispatch(setSelectedSize(size))
  }

  return {
    selectedSize,
    handleSizeClick,
  }
}

export default useSizeSelection
