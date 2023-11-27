import { useState } from 'react'

const useColorPicker = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const addColor = (color: string) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors((prevColors) => [...prevColors, color])
    }
  }

  const removeColor = (color: string) => {
    setSelectedColors((prevColors) => prevColors.filter((c) => c !== color))
  }

  const resetColors = () => {
    setSelectedColors([])
  }

  return {
    selectedColors,
    addColor,
    removeColor,
    resetColors,
  }
}

export default useColorPicker
