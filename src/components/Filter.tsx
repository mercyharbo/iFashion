'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { BiFilter } from 'react-icons/bi'
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
} from 'react-icons/md'

import Button from '@/types/Button'
import filterJSON from '@/components/Filter.json'
import ColorSelector from '../app/hooks/ColorSelector'
import useSizeSelection from '@/app/hooks/useSizeSeelection'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'

import useColorSelection from '../app/hooks/ColorSelector'
import { setSelectedCategory } from '@/redux/Slice/Filter'

interface ProductFilterProps {
  products: Product[]
  setFilteredProducts: (filtered: Product[]) => void
}

interface Product {
  productImage: string
  title: string
  reviews: {
    id: number
    user: string
    rating: number
    comment: string
    date: string
  }[]
  price: number
  category: string
  colors: string[]
  available_sizes: string[]
  date: string
}

export default function Filter({
  products,
  setFilteredProducts,
}: ProductFilterProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedSize, setSelectedSize, handleSizeClick } = useSizeSelection()
  const { selectedColors, setSelectedColors, handleColorClick } =
    useColorSelection()
  const selectedCategory = useAppSelector(
    (state) => state.filterReducer.filters.selectedCategory
  )

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (selectedColors.length === 0 ||
          selectedColors.some((color) => product.colors.includes(color))) &&
        (selectedSize.length === 0 ||
          selectedSize.some((size) =>
            product.available_sizes.includes(size)
          )) &&
        (!minPrice || product.price >= (minPrice as number)) &&
        (!maxPrice || product.price <= (maxPrice as number))
      )
    })

    setFilteredProducts(filtered)
  }

  const resetFilters = () => {
    dispatch(setSelectedColors(''))
    dispatch(setSelectedSize(''))
    dispatch(setSelectedCategory(''))
    // setMinPrice('')
    // setMaxPrice('')
    setFilteredProducts(products)
  }

  const handleCategorySelect = (categoryOption: string) => {
    dispatch(setSelectedCategory(categoryOption))
  }

  return (
    <main className='flex-col justify-start items-start gap-5 border-[1px] border-[#00000099] p-5 rounded-lg 2xl:w-[20%] xl:w-[20%] xl:flex md:hidden sm:hidden '>
      <div className='flex justify-between items-center w-full'>
        <h1 className='text-lg font-medium'>Filters</h1>
        <span className=''>
          <BiFilter />{' '}
        </span>
      </div>
      <hr className='w-full' />

      <div className='flex flex-col justify-start items-start gap-5 w-full'>
        <button
          type='button'
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Categories</h1>
          <MdKeyboardArrowDown className='text-2xl' />
        </button>
        <div className='flex flex-col justify-start items-start gap-3 w-full'>
          {filterJSON.categories.map((categoryOption, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(categoryOption)}
              className={clsx(
                'flex justify-between items-center capitalize w-full p-2',
                selectedCategory === categoryOption
                  ? 'bg-black text-white rounded-md'
                  : 'text-[#00000099] '
              )}
            >
              {categoryOption}{' '}
              <MdOutlineKeyboardArrowRight className='text-2xl' />
            </button>
          ))}
        </div>
      </div>

      <hr className='w-full' />
      <div className='flex flex-col justify-start items-start gap-3 w-full'>
        <button
          type='button'
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Colors</h1>
          <MdKeyboardArrowDown className='text-2xl' />
        </button>
        <div className='flex justify-start items-start gap-5 flex-wrap space-x-0 w-full'>
          {filterJSON.color.map((colorOption, index) => {
            return (
              <div
                key={index}
                onClick={() => handleColorClick(colorOption)}
                className={clsx(
                  'w-6 h-6 rounded-full cursor-pointer border-[1px]',
                  selectedColors.includes(colorOption)
                    ? 'ring-4 ring-blue-500'
                    : ''
                )}
                style={{ backgroundColor: colorOption }}
              ></div>
            )
          })}
        </div>
      </div>

      <hr className='w-full' />
      <div className='flex flex-col justify-start items-start gap-5 w-full'>
        <button
          type='button'
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Sizes</h1>
          <MdKeyboardArrowDown className='text-2xl' />
        </button>
        <div className='flex justify-start items-center flex-wrap gap-5'>
          {filterJSON.sizes.map((sizeOption, index) => {
            return (
              <Button
                key={index}
                type='button'
                title={sizeOption}
                onClick={() => handleSizeClick(sizeOption)}
                buttonClass={clsx(
                  `bg-[#F0F0F0] py-2 px-4 rounded-full text-black `,
                  selectedSize.includes(sizeOption)
                    ? 'bg-black text-white '
                    : ''
                )}
              />
            )
          })}
        </div>
      </div>

      {/* <div>
        <label>Min Price:</label>
        <input
          type='number'
          value={minPrice === undefined ? '' : minPrice}
          onChange={(e) =>
            setMinPrice(
              e.target.value === '' ? undefined : parseFloat(e.target.value)
            )
          }
        />
      </div>
      <div>
        <label>Max Price:</label>
        <input
          type='number'
          value={maxPrice === undefined ? '' : maxPrice}
          onChange={(e) =>
            setMaxPrice(
              e.target.value === '' ? undefined : parseFloat(e.target.value)
            )
          }
        />
      </div> */}
      <div className='flex justify-between items-center gap-5 w-full py-5'>
        <Button
          type='button'
          title='reset'
          onClick={resetFilters}
          buttonClass='bg-transparent border-[1px] py-3 px-5 rounded-full text-black w-full hover:bg-black hover:text-white'
        />

        <Button
          type='button'
          title='save filter'
          onClick={handleFilter}
          buttonClass='bg-black py-3 px-5 rounded-full text-white w-full '
        />
      </div>
    </main>
  )
}
