'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { BiFilter } from 'react-icons/bi'
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'

import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'
import filterJSON from '@/components/Filter.json'
import Filter from '@/components/Filter'
import Modal from '@/types/Modal'
import useSizeSelection from '@/hooks/useSizeSeelection'
import Button from '@/types/Button'

import {
  setIsCategoryVisible,
  setIsColorVisible,
  setIsSizeVisible,
  setSelectedCategory,
} from '@/redux/Slice/Filter'
import { CalculateAverageRating } from '@/utils/avarageRatings'
import { closeFilterModal, openFilterModal } from '@/redux/Slice/ModalSlice'
import useColorSelection from '../../../hooks/ColorSelector'

function CasualCategory() {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedSize, setSelectedSize, handleSizeClick } = useSizeSelection()
  const { selectedColors, setSelectedColors, handleColorClick } =
    useColorSelection()
  const selectedCategory = useAppSelector(
    (state) => state.filterReducer.filters.selectedCategory
  )
  const [filteredProducts, setFilteredProducts] = useState(ProductJSON.products)
  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'oldest'>('newest')

  const filterOpen = useAppSelector(
    (state) => state.modalReducer.modal.filterModal
  )
  const searchQuery = useAppSelector(
    (state) => state.searchModalReducer.modal.searchQuery
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

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  const sortProducts = (criteria: 'newest' | 'price' | 'oldest') => {
    const sortedProducts = [...filteredProducts]

    if (criteria === 'newest') {
      sortedProducts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    } else if (criteria === 'oldest') {
      sortedProducts.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    } else if (criteria === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price)
    }

    setFilteredProducts(sortedProducts)
    setSortBy(criteria)
  }

  const handleFilter = () => {
    const filtered = ProductJSON.products.filter((product) => {
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
    setFilteredProducts(ProductJSON.products)
  }

  const handleCategorySelect = (categoryOption: string) => {
    dispatch(setSelectedCategory(categoryOption))
  }

  const handleOpenModal = () => {
    dispatch(openFilterModal())
  }

  const handleFilterClose = () => {
    dispatch(closeFilterModal())
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
    <main
      className={clsx(
        ' flex justify-center items-start 2xl:gap-10 2xl:p-10 xl:gap-10 md:p-5 sm:p-5'
      )}
    >
      <Filter
        products={ProductJSON.products}
        setFilteredProducts={setFilteredProducts}
      />

      <div
        className={clsx(
          'flex flex-col justify-between items-start gap-5 2xl:w-[80%] md:w-full sm:w-full '
        )}
      >
        <div
          className={clsx(
            'flex justify-between w-full xl:items-center xl:flex-row md:flex-row sm:flex-col sm:gap-2 '
          )}
        >
          <h1 className={clsx('text-2xl font-semibold capitalize ')}>casual</h1>
          <div
            className={clsx(
              'flex xl:justify-center xl:items-center md:justify-start md:items-start sm:justify-between sm:items-start gap-5'
            )}
          >
            <span className='text-sm'>Showing 1-10 of 100 Products</span>
            <button
              type='button'
              onClick={handleOpenModal}
              className='xl:hidden md:flex sm:flex'
            >
              <BiFilter className='text-2xl' />
            </button>

            <div className='xl:flex md:hidden sm:hidden justify-center items-center gap-2'>
              <label>Sort By:</label>
              <select
                onChange={(e) =>
                  sortProducts(e.target.value as 'newest' | 'price' | 'oldest')
                }
                value={sortBy}
                className='outline-none'
              >
                <option value='newest'>Newest</option>
                <option value='oldest'>Oldest</option>
                <option value='price'>Price</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'grid w-full 3xl:grid-cols-4 3xl:gap-10 2xl:grid-cols-4 2xl:gap-2 xl:grid-cols-3 xl:content-between xl:place-items-start xl:gap-5 md:grid-cols-3 md:gap-3 md:content-center md:place-items-center sm:grid-cols-1 sm:gap-5'
          )}
        >
          {filteredProducts.map((item, index) => {
            const avarageRating = CalculateAverageRating(item?.reviews)

            return (
              <Link key={index} href={`/product/${index}`}>
                <Product
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  productImage={item.productImage}
                  ratings={avarageRating}
                  productClass={clsx(
                    ` inline-block 3xl:w-[300px] 2xl:w-[250px] xl:w-[300px] md:w-[250px] sm:w-full border-[1px] rounded-xl cursor-pointer `
                  )}
                  starStyling='text-xl'
                />
              </Link>
            )
          })}
        </div>
      </div>

      {filterOpen && (
        <Modal
          handleCloseModal={handleFilterClose}
          showLogo={true}
          showHeader={true}
          headerTitle='filter'
          modalClass='nav-container w-full mx-auto bottom-0 left-0 p-5 z-20 rounded-t-xl h-screen fixed bg-white '
          contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold text-lg'
        >
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
              <div className='flex flex-col justify-start items-start gap-3 w-full'>
                {filterJSON.categories.map((categoryOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategorySelect(categoryOption)}
                    className={clsx(
                      'flex justify-between items-center capitalize w-full p-2 text-sm',
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
            )}
          </div>
          <hr className='w-full' />
          <div className='flex flex-col justify-start items-start gap-5 w-full'>
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
              <h1 className='text-lg font-medium'>Colors</h1>
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
                        `bg-[#F0F0F0] py-2 px-4 rounded-full text-black text-sm `,
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
          <hr className='w-full' />

          <div className='flex justify-between items-center gap-5 w-full'>
            <Button
              type='button'
              title='reset'
              onClick={resetFilters}
              buttonClass='bg-transparent border-[1px] py-3 px-5 rounded-full text-black w-full hover:bg-black hover:text-white text-sm'
            />

            <Button
              type='button'
              title='save filter'
              onClick={handleFilter}
              buttonClass='bg-black py-3 px-5 rounded-full text-white w-full text-sm '
            />
          </div>
        </Modal>
      )}
    </main>
  )
}

export default CasualCategory