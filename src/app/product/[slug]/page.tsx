'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import Button from '@/types/Button'
import Layout from '@/components/Layout'

import { UseCounter } from '@/app/hooks/Counter'
import { UseDiscountCalculator } from '@/app/hooks/useDiscountCalculator'
import { CalculateAverageRating } from '@/app/utils/avarageRatings'
import StarRating from '@/components/Rating'

import ProductJSON from '@/app/product/[slug]/product.json'

import minus from '@/assets/minus.png'
import plus from '@/assets/plus.png'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function Product_Details({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(
    ProductJSON.images[0]
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const averageRating = CalculateAverageRating(ProductJSON?.reviews)
  const { count, increment, decrement } = UseCounter()
  const { calculateDiscountedPrice, calculateRoundedPrice } =
    UseDiscountCalculator()

  const sizesBtn = ['small', 'medium', 'large', 'x-large']

  const handleSizeClick = (size: string) => {
    setSelectedSize(size)
  }

  const handleImageClick = (img: string) => {
    setSelectedImage(img)
  }

  // Calculate discounted price if discount is provided
  const discountedPrice =
    ProductJSON?.discount !== null && ProductJSON?.discount !== undefined
      ? calculateDiscountedPrice(ProductJSON?.price, ProductJSON?.discount)
      : null

  const roundedPrice = calculateRoundedPrice(ProductJSON?.price)
  const roundedDiscountedPrice =
    discountedPrice !== null ? calculateRoundedPrice(discountedPrice) : null

  return (
    <Layout>
      {/* <span className='xl:p-10'>Home / Shop / men / {slug}</span> */}
      <header className='relative grid 3xl:w-[80%] 2xl:w-[80%] xl:grid-cols-2 xl:gap-10 xl:px-10 xl:w-full xl:py-14 md:w-full sm:w-full sm:flex-col sm:px-5 '>
        <div
          className='flex xl:flex-row md:flex-col-reverse md:gap-10 sm:gap-5 sm:flex-col-reverse '
          //   className='flex 2xl:h-[30rem] xl:flex-row xl:justify-start xl:items-start xl:gap-5 md:justify-start md:items-start sm:flex-col-reverse
          // sm:justify-center sm:items-center sm:gap-5 '
        >
          <div
            className='3xl:h-[35rem] 2xl:h-[30rem] xl:w-[20%] xl:h-[30rem] xl:flex-col xl:snap-y xl:items-center md:snap-x md:w-[80%] sm:w-full 
            sm:flex-row snap-mandatory flex justify-start overflow-scroll scrollbar-hide '
            // className='3xl:h-[30rem] 3xl:mr-auto 2xl:h-[30rem] 2xl:w-[25%] xl:snap-y xl:flex-col xl:h-[30rem] xl:w-[100%] md:w-[80%] md:mr-[10rem]
            // md:snap-x md:h-auto md:flex-row sm:snap-x sm:h-auto sm:flex-row mx-auto snap-mandatory flex justify-start items-start overflow-scroll scrollbar-hide'
          >
            {ProductJSON?.images?.map((img, index) => {
              return (
                <Image
                  key={index}
                  src={img}
                  width={100}
                  height={100}
                  alt='product images'
                  onClick={() => handleImageClick(img)}
                  className='rounded-2xl object-cover flex-shrink-0 h-auto flex items-start justify-start gap-5 xl:my-2 sm:mx-2'
                />
              )
            })}
          </div>

          <Image
            src={selectedImage}
            width={1000}
            height={1000}
            alt='selected product image'
            className='rounded-2xl object-cover xl:w-[80%] xl:h- md:w-[60%] sm:h-auto '
          />
        </div>

        <div className=' flex xl:flex-col xl:justify-start xl:items-start xl:gap-5 xl:py-0 sm:w-full sm:flex-col sm:justify-start sm:items-start sm:gap-5 sm:py-8 '>
          <div className='flex flex-col justify-start items-start gap-2'>
            <h1 className='xl:text-5xl md:text-3xl sm:text-2xl uppercase font-extrabold '>
              {ProductJSON.productName}
            </h1>
            <StarRating rating={averageRating} readOnly />
          </div>

          {ProductJSON?.discount ? (
            <div className='flex justify-center items-center gap-5'>
              <span className='text-[32px] font-semibold'>
                ${roundedDiscountedPrice}
              </span>
              <del className='text-[#a5a5a5] font-semibold text-[32px] '>
                ${roundedPrice}
              </del>
              <p
                className={clsx(
                  'bg-[#ff333330] text-[#f33] py-1 px-[14px] rounded-full inline-flex justify-center items-center '
                )}
              >
                {ProductJSON?.discount}%
              </p>
            </div>
          ) : (
            <h4 className='2xl:text-4xl xl:text-4xl font-bold '>
              ${ProductJSON.price}
            </h4>
          )}

          <p className='text-[#5e5e5d] 2xl:w-[70%] '>
            {ProductJSON.description}
          </p>
          <div className='colors flex'>colors</div>
          <hr className='w-full' />
          <div className='flex flex-wrap justify-start items-center gap-5'>
            {sizesBtn.map((btn, index) => {
              return (
                <Button
                  key={index}
                  type='button'
                  onClick={() => handleSizeClick(btn)}
                  title={btn}
                  buttonClass={clsx(
                    btn === selectedSize
                      ? 'bg-black text-white rounded-full px-5 py-2'
                      : 'bg-[#F0EEED] text-[#00000099] rounded-full px-5 py-2 hover:bg-black hover:text-white'
                  )}
                />
              )
            })}
          </div>
          <div className='flex w-full xl:flex-row xl:justify-start xl:items-center xl:gap-5 sm:gap-5 '>
            <div className='bg-[#F0F0F0] flex justify-between items-center gap-5 rounded-full px-5 xl:w-[8rem] xl:h-[50px] md:w-[12rem] '>
              <Button
                type='button'
                onClick={decrement}
                icon={
                  <Image src={minus} width={50} height={50} alt='minus icon' />
                }
              />
              <span className='font-medium text-xl '>{count}</span>
              <Button
                type='button'
                onClick={increment}
                icon={
                  <Image src={plus} width={50} height={50} alt='minus icon' />
                }
              />
            </div>
            <Button
              type='button'
              title='Add to cart'
              buttonClass='bg-black text-white rounded-full w-full h-[50px] xl:w-[20rem] '
            />
          </div>
        </div>
      </header>
    </Layout>
  )
}
