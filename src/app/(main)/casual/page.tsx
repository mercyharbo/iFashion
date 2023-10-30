'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { BiFilter } from 'react-icons/bi'
import {
  MdOutlineKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose,
} from 'react-icons/md'

import Product from '@/types/Product'
import filterJSON from '@/components/Filter.json'
import Filter from '@/components/Filter'
import useSizeSelection from '@/hooks/useSizeSeelection'
import Button from '@/types/Button'

import {
  setIsCategoryVisible,
  setIsColorVisible,
  setIsSizeVisible,
  setSelectedCategory,
  setSelectedSize,
} from '@/redux/Slice/Filter'
import { CalculateAverageRating } from '@/utils/avarageRatings'
import useColorSelection from '../../../hooks/ColorSelector'
import { closeFilterModal, openFilterModal } from '@/redux/Slice/ModalSlice'
import { fetchProducts, setFilteredProducts } from '@/redux/Slice/ProductSlice'
import Loading from '@/components/Loading'
import Error from '../error'

function CasualCategory() {
  const dispatch = useDispatch<AppDispatch>()
  const { selectedSize, handleSizeClick } = useSizeSelection()
  const { selectedColors, setSelectedColors, handleColorClick } =
    useColorSelection()
  const selectedCategory = useAppSelector(
    (state) => state.filterReducer.filters.selectedCategory
  )

  const [sortBy, setSortBy] = useState<'newest' | 'price' | 'oldest'>('newest')

  const isLoading = useAppSelector((state) => state.products.isLoading)

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
  const productData = useAppSelector((state) => state.products)
  const filteredData = useAppSelector(
    (state) => state.products.filteredProducts
  )

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  // useEffect(() => {
  //   dispatch(fetchProducts())
  // }, [dispatch])

  const sortProducts = (criteria: 'newest' | 'price' | 'oldest') => {
    const sortedProducts = [...productData.products]

    if (criteria === 'newest') {
      sortedProducts.sort(
        (a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)
      )
    } else if (criteria === 'oldest') {
      sortedProducts.sort(
        (a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate)
      )
    } else if (criteria === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price)
    }

    dispatch(setFilteredProducts(sortedProducts))
    setSortBy(criteria)
  }

  const handleFilter = () => {
    const filtered = productData.products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (selectedColors.length === 0 ||
          selectedColors.some((color) => product.colors.includes(color))) &&
        (!selectedSize || product.available_sizes.includes(selectedSize)) &&
        (!minPrice || product.price >= (minPrice as number)) &&
        (!maxPrice || product.price <= (maxPrice as number))
      )
    })

    dispatch(setFilteredProducts(filtered)) // dispatch the filter to the reduz store
    dispatch(closeFilterModal()) // close the modal once the apply filter button is clicked
  }

  const resetFilters = () => {
    dispatch(setSelectedColors(''))
    dispatch(setSelectedSize(''))
    dispatch(setSelectedCategory(''))
    // setMinPrice('')
    // setMaxPrice('')
    dispatch(setFilteredProducts(productData.products))
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

  const products =
    filteredData.length > 0 ? filteredData : productData?.products // checking if the length of filterData state if greater than zero else display productData

  if (isLoading) return <Loading />

  if (!products)
    return (
      <Error
        error={'An error occurred while trying to fetch this route.'}
        reset={() => window.location.reload()}
      />
    )

  return (
    <main
      className={clsx(
        ' flex justify-center items-start 2xl:gap-10 2xl:p-10 xl:gap-10 md:p-5 sm:p-5'
      )}
    >
      <Filter products={productData.products} />

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
            <span className='text-sm'>
              Showing 1- {productData.products.length} Products
            </span>
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
          {products.map((item) => {
            const avarageRating = CalculateAverageRating(item?.reviews)
            const productImage =
              item?.images?.[0] ||
              'https://pixabay.com/playlists/chill-beats-17503730/'
            return (
              <Link key={item._id} href={`/product/${item._id}`}>
                <Product
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  productImage={productImage}
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
        <>
          <div
            onClick={handleFilterClose}
            className='bg-[#0000006e] fixed top-0 left-0 w-full h-screen '
          ></div>
          <div className='3xl:hidden  xl:hidden md:flex sm:flex flex-col justify-start items-start gap-5 bg-white w-full h-auto p-5 rounded-xl absolute top-0 left-0 z-20'>
            <div className='flex justify-between items-center w-full'>
              <h4 className='font-medium capitalize text-lg'>filter</h4>
              <button
                type='button'
                onClick={handleFilterClose}
                className='text-2xl'
              >
                <MdClose />
              </button>
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
          </div>
        </>
      )}
    </main>
  )
}

export default CasualCategory
