'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { BiFilter } from 'react-icons/bi'
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'

import Button from '@/types/Button'
import filterJSON from '@/components/Filter.json'
import useSizeSelection from '@/hooks/useSizeSeelection'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'

import useColorSelection from '../hooks/ColorSelector'
import {
  setIsCategoryVisible,
  setIsColorVisible,
  setIsSizeVisible,
  setSelectedCategory,
  setSelectedSize,
} from '@/redux/Slice/Filter'
import { setFilteredProducts } from '@/redux/Slice/ProductSlice'

interface ProductFilterProps {
  products: Product[]
}

interface Product {
  _id: string
  description: string
  discount: number
  title: string
  reviews: []
  price: number
  category: string
  colors: string[]
  available_sizes: string[]
  images: string[]
  related: []
  faq: []
  inStock: number
  createdDate: string
}

export default function Filter({ products }: ProductFilterProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedSize, handleSizeClick } = useSizeSelection()
  const { selectedColors, setSelectedColors, handleColorClick } =
    useColorSelection()
  const selectedCategory = useAppSelector(
    (state) => state.filterReducer.filters.selectedCategory
  )
  const isColorVisible = useAppSelector(
    (state) => state.filterReducer.filters.isColorVisible
  )
  const isSizeVisible = useAppSelector(
    (state) => state.filterReducer.filters.isSizeVisible
  )
  const isCategoryVisible = useAppSelector(
    (state) => state.filterReducer.filters.iCategoryVisible
  )

  const handleFilter = () => {
    const filtered = products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (selectedColors.length === 0 ||
          selectedColors.some((color) => product.colors.includes(color))) &&
        (!selectedSize || product.available_sizes.includes(selectedSize))
      )
    })

    dispatch(setFilteredProducts(filtered))
  }

  const resetFilters = () => {
    dispatch(setSelectedColors(''))
    dispatch(setSelectedSize(''))
    dispatch(setSelectedCategory(''))
    dispatch(setFilteredProducts(products))
  }

  const handleCategorySelect = (categoryOption: string) => {
    dispatch(setSelectedCategory(categoryOption))
  }

  const toggleColorVisibility = () => {
    dispatch(setIsColorVisible(!isColorVisible))
  }

  const toggleSizeVisibility = () => {
    dispatch(setIsSizeVisible(!isSizeVisible))
  }

  const toggleCategoryVisibility = () => {
    dispatch(setIsCategoryVisible(!isCategoryVisible))
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
          onClick={toggleCategoryVisibility}
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Categories</h1>
          {isCategoryVisible ? (
            <MdKeyboardArrowUp className='text-2xl' />
          ) : (
            <MdKeyboardArrowDown className='text-2xl' />
          )}
        </button>
        {isCategoryVisible && (
          <div className='flex flex-wrap justify-start items-start gap-5 w-full'>
            {filterJSON.categories.map((categoryOption, index) => (
              <button
                key={index}
                onClick={() => handleCategorySelect(categoryOption)}
                className={clsx(
                  'flex justify-between items-center capitalize p-2 px-5 bg-[#F0F0F0] rounded-full ',
                  selectedCategory === categoryOption
                    ? 'bg-black text-white'
                    : 'text-[#00000099] '
                )}
              >
                {categoryOption}{' '}
              </button>
            ))}
          </div>
        )}
      </div>

      <hr className='w-full' />
      <div className='flex flex-col justify-start items-start gap-3 w-full'>
        <button
          type='button'
          onClick={toggleColorVisibility}
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Colors</h1>
          {isColorVisible ? (
            <MdKeyboardArrowUp className='text-2xl' />
          ) : (
            <MdKeyboardArrowDown className='text-2xl' />
          )}
        </button>
        {isColorVisible && (
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
        )}
      </div>

      <hr className='w-full' />
      <div className='flex flex-col justify-start items-start gap-5 w-full'>
        <button
          type='button'
          onClick={toggleSizeVisibility}
          className='flex justify-between items-center w-full'
        >
          <h1 className='text-lg font-medium'>Sizes</h1>
          {isSizeVisible ? (
            <MdKeyboardArrowUp className='text-2xl' />
          ) : (
            <MdKeyboardArrowDown className='text-2xl' />
          )}
        </button>
        {isSizeVisible && (
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
        )}
      </div>

      <div className='flex justify-between items-center gap-5 w-full py-5'>
        <Button
          type='button'
          title='reset'
          onClick={resetFilters}
          buttonClass='bg-transparent border-[1px] 3xl:py-3 3xl:px-5 2xl:py-2 2xl:px-2 xl:py-2 xl:px-2 lg:px-2 lg:py-2 rounded-full text-black w-full hover:bg-black hover:text-white'
        />

        <Button
          type='button'
          title='save filter'
          onClick={handleFilter}
          buttonClass='bg-black 3xl:py-3 3xl:px-5 2xl:py-2 2xl:px-2 xl:py-2 xl:px-2 lg:px-2 lg:py-2 rounded-full text-white w-full '
        />
      </div>
    </main>
  )
}
