'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { BiFilter } from 'react-icons/bi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

import Button from '@/types/Button'
import filterJSON from '@/components/Filter.json'
import ColorSelector from './ColorSelector'
import useSizeSelection from '@/app/hooks/useSizeSeelection'

export default function Filter() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { selectedSize, handleSizeClick } = useSizeSelection(null)

  const handleColorSelection = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <div
      className={clsx(
        '2xl:w-[20%] xl:flex xl:flex-col xl:justify-start xl:items-start md:hidden sm:hidden gap-5 border-[1px] rounded-xl p-2   '
      )}
    >
      <div className='flex justify-between items-center w-full'>
        <h1 className='text-lg font-medium'>Filters</h1>
        <span className=''>
          <BiFilter />{' '}
        </span>
      </div>
      <hr className='w-full' />

      <div className='flex flex-col justify-start items-start gap-5 w-full'>
        {filterJSON.categories.map((category, index) => {
          return (
            <div
              key={index}
              className='flex justify-between items-center capitalize text-[#00000099] w-full '
            >
              {category} <MdOutlineKeyboardArrowRight className='text-2xl' />
            </div>
          )
        })}
      </div>
      <hr className='w-full' />
      <div className='flex flex-col justify-start items-start gap-3 w-full'>
        <h1 className='text-lg font-medium'>Colors</h1>
        <ColorSelector
          colors={filterJSON.color}
          onSelectColor={handleColorSelection}
          colorStyle='flex justify-start items-start gap-5 flex-wrap space-x-0 w-full'
        />
      </div>
      <hr className='w-full' />
      <div className='flex flex-col justify-between items-start gap-3 flex-wrap w-full'>
        <h1 className='text-lg font-medium'>Sizes</h1>
        <div className='flex flex-wrap justify-start items-center gap-5'>
          {filterJSON.sizes.map((size, index) => {
            return (
              <Button
                key={index}
                type='button'
                onClick={() => handleSizeClick(size)}
                title={size}
                buttonClass={clsx(
                  size === selectedSize
                    ? 'bg-black text-white rounded-full px-5 py-2'
                    : 'bg-[#F0EEED] text-[#00000099] rounded-full px-5 py-2 hover:bg-black hover:text-white'
                )}
              />
            )
          })}
        </div>
      </div>

      <Button
        type='button'
        title='apply filter'
        buttonClass='bg-[#000] text-white w-full rounded-full h-[3rem] my-5 '
      />
    </div>
  )
}
