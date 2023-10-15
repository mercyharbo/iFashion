import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setSelectedColors } from '@/redux/Slice/Filter'

const useColorSelection = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedColors = useAppSelector(
    (state) => state.filterReducer.filters.selectedColors
  )

  const handleColorClick = (color: string) => {
    if (selectedColors.includes(color)) {
      return dispatch(
        setSelectedColors(selectedColors.filter((c) => c !== color))
      )
    } else {
      return dispatch(setSelectedColors([...selectedColors, color]))
    }
  }

  return { selectedColors, handleColorClick, setSelectedColors }
}

export default useColorSelection
