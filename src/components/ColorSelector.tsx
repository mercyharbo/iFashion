import React, { useState } from 'react'

type ColorSchemeProps = {
  colors: string[]
  onSelectColor: (color: string) => void
}

export default function ColorSelector({
  colors,
  onSelectColor,
}: ColorSchemeProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleColorSelected = (color: string) => {
    setSelectedColor(color)
    onSelectColor(color)
  }

  return (
    <main className='flex items-center justify-center space-x-4'>
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            onClick={() => handleColorSelected(color)}
            className={`w-6 h-6 rounded-full cursor-pointer ${
              selectedColor === color ? 'ring-4 ring-blue-500' : ''
            }`}
            style={{ backgroundColor: color }}
          ></div>
        )
      })}
    </main>
  )
}
