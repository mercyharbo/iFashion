import clsx from 'clsx'
import React, { useState } from 'react'

type ColorSchemeProps = {
  colors: string[]
  onSelectColor: (color: string) => void
  colorStyle?: string
}

export default function ColorSelector({
  colors,
  onSelectColor,
  colorStyle,
}: ColorSchemeProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleColorSelected = (color: string) => {
    setSelectedColor(color)
    onSelectColor(color)
  }

  return (
    <main className={clsx('', colorStyle)}>
      {colors.map((color, index) => {
        return (
          <div
            key={index}
            onClick={() => handleColorSelected(color)}
            className={`w-6 h-6 rounded-full cursor-pointer border-[1px] ${
              selectedColor === color ? 'ring-4 ring-blue-500  ' : ''
            }`}
            style={{ backgroundColor: color }}
          ></div>
        )
      })}
    </main>
  )
}
