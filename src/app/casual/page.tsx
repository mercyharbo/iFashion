'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { BiFilter } from 'react-icons/bi'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'

import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'
import { CalculateAverageRating } from '@/app/utils/avarageRatings'
import Filter from '@/components/Filter'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { closeFilterModal, openFilterModal } from '@/redux/Slice/ModalSlice'
import Modal from '@/types/Modal'
import useSizeSelection from '@/app/hooks/useSizeSeelection'
import filterJSON from '@/components/Filter.json'
import ColorSelector from '@/components/ColorSelector'
import Button from '@/types/Button'

function CasualCategory() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { selectedSize, handleSizeClick } = useSizeSelection(null)

  const dispatch = useDispatch<AppDispatch>()
  const filterOpen = useAppSelector(
    (state) => state.modalReducer.modal.filterModal
  )

  const handleOpenModal = () => {
    dispatch(openFilterModal())
  }

  const handleNavClose = () => {
    dispatch(closeFilterModal())
  }

  const handleColorSelection = (color: string) => {
    setSelectedColor(color)
  }

  return (
    <main
      className={clsx(
        'relative flex justify-center items-start 2xl:gap-10 2xl:p-10 md:p-5 sm:p-5'
      )}
    >
      <Filter />

      <div
        className={clsx(
          ' flex flex-col justify-between items-start gap-5 2xl:w-[80%] md:w-full sm:w-full '
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
            <span className='text-sm capitalize xl:flex md:flex sm:hidden'>
              sort by{' '}
            </span>
            <button
              type='button'
              onClick={handleOpenModal}
              className='xl:hidden md:hidden sm:flex'
            >
              <BiFilter className='text-2xl' />
            </button>
          </div>
        </div>

        <div
          className={clsx(
            'grid 3xl:grid-cols-4 2xl:grid-cols-4 2xl:gap-2 xl:grid-cols-3 xl:content-start xl:place-items-start xl:gap-5 md:grid-cols-3 md:gap-3 md:content-center md:place-items-center sm:grid-cols-1 sm:gap-5'
          )}
        >
          {ProductJSON.products.map((item, index) => {
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
          handleCloseModal={handleNavClose}
          showLogo={false}
          showHeader={true}
          modalClass='nav-container w-full mx-auto top-0 left-0 p-5 z-20 rounded-t-xl h-auto absolute bg-white '
          contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold pt-10 text-lg'
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
                  {category}{' '}
                  <MdOutlineKeyboardArrowRight className='text-2xl' />
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
        </Modal>
      )}
    </main>
  )
}

export default CasualCategory
