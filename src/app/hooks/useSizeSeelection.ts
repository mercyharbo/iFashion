import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setSelectedSize } from '@/redux/Slice/Filter'

const useSizeSelection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedSize = useAppSelector(
    (state) => state.filterReducer.filters.selectedSize
  )

  const handleSizeClick = (size: string) => {
    if (selectedSize.includes(size)) {
      dispatch(setSelectedSize(selectedSize.filter((s) => s !== size)))
    } else {
      dispatch(setSelectedSize([...selectedSize, size]))
    }
  }

  return {
    selectedSize,
    handleSizeClick,
    setSelectedSize,
  }
}

export default useSizeSelection
