'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import Button from '@/types/Button'
import Layout from '@/components/Layout'

import { useCounter } from '@/app/hooks/Counter'
import { useDiscountCalculator } from '@/app/hooks/useDiscountCalculator'
import { useStarRating } from '@/app/hooks/starRating'
import StarRating from '@/components/Rating'
import { calculateAverageRating } from '@/app/utils/avarageRatings'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function page({ params }: ProductPageProps) {
  const { slug } = params
  const { count, increment, decrement } = useCounter()
  const { calculateDiscountedPrice, calculateRoundedPrice } =
    useDiscountCalculator()

  const sizesBtn = ['small', 'medium', 'large', 'x-large']

  const productJSON = {
    id: 1,
    productName: 'one life graphic t-shirt',
    description:
      'This graphic t-shirt, perfect for any occasion, is crafted from a soft and breathable fabric, offering superior comfort and style.',
    rating: 4,
    colors: ['#31344F', '#314F4A', '#4F4631'],
    available_sizes: ['small', 'medium', 'large', 'x-large'],
    quantity: 10,
    price: 206,
    discount: 5,
    images: [
      '/132.jpg', // Add actual image URLs
      '/135.jpg',
      '/130.jpg',
      '/122.jpg',
      '/122.jpg',
    ],
    reviews: [
      {
        id: 1,
        user: 'John Doe',
        rating: 5,
        comment: 'Great product!',
      },
      {
        id: 2,
        user: 'Jane Smith',
        rating: 1,
        comment: 'Good quality shirt.',
      },
      // Add more review objects as needed
    ],
    related: [
      {
        id: 2,
        name: 'Cool Graphic Hoodie',
        image: '/59.jpg', // Add actual image URL
        rating: 4.5,
        discount: 10, // 10% discount
      },
      {
        id: 3,
        name: 'Casual Denim Jeans',
        image: '/94.jpg', // Add actual image URL
        rating: 4.2,
        discount: 15, // 15% discount
      },
      {
        id: 4,
        name: 'Sneaker Shoes',
        image: '/188.jpg', // Add actual image URL
        rating: 4.0,
        discount: 0, // No discount
      },
      {
        id: 5,
        name: 'Stylish Sunglasses',
        image: '/193.jpg', // Add actual image URL
        rating: 4.8,
        discount: 20, // 20% discount
      },
    ],
    faq: [
      {
        id: 1,
        question: 'What is the material of the shirt?',
        answer: 'The shirt is made of 100% cotton.',
      },
      {
        id: 2,
        question: 'Is this shirt machine washable?',
        answer: 'Yes, it is machine washable.',
      },
      // Add more FAQ objects as needed
    ],
  }

  const [selectedImage, setSelectedImage] = useState<string>(
    productJSON.images[0]
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { rating, setRating } = useStarRating()
  const averageRating = calculateAverageRating(productJSON?.reviews) // Calculate the average rating

  const handleSizeClick = (size: string) => {
    setSelectedSize(size)
  }

  const handleImageClick = (img: string) => {
    setSelectedImage(img)
  }

  // Calculate discounted price if discount is provided
  const discountedPrice =
    productJSON?.discount !== null && productJSON?.discount !== undefined
      ? calculateDiscountedPrice(productJSON?.price, productJSON?.discount)
      : null

  const roundedPrice = calculateRoundedPrice(productJSON?.price)
  const roundedDiscountedPrice =
    discountedPrice !== null ? calculateRoundedPrice(discountedPrice) : null

  return (
    <Layout>
      <span className='xl:p-10'>Home / Shop / men / {slug}</span>
      <header className='flex xl:flex-row xl:gap-10 xl:px-10 xl:py-14 '>
        <div className='productImage flex 2xl:h-[30rem] xl:flex-row xl:justify-start xl:items-start xl:gap-5'>
          <div className='flex 2xl:h-[31rem] xl:h-[] xl:flex-col xl:justify-start xl:items-center xl:gap-5 xl:overflow-y-auto scrollbar-hide '>
            {productJSON?.images?.map((img, index) => {
              return (
                <Button
                  key={index}
                  type='button'
                  onClick={() => handleImageClick(img)}
                  icon={
                    <Image
                      src={img}
                      width={100}
                      height={100}
                      alt='product images'
                      className='rounded-2xl object-cover '
                    />
                  }
                />
              )
            })}
          </div>

          <div className=''>
            <Image
              src={selectedImage}
              width={450}
              height={450}
              alt='selected product image'
              className='rounded-2xl object-cover h-full '
            />
          </div>
        </div>

        <div className='details flex xl:flex-col xl:justify-start xl:items-start xl:gap-5'>
          <h1 className='xl:text-5xl uppercase font-extrabold '>
            {productJSON.productName}
          </h1>
          <StarRating rating={averageRating} readOnly />

          {productJSON?.discount ? (
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
                {productJSON?.discount}%
              </p>
            </div>
          ) : (
            <h4 className='2xl:text-4xl xl:text-4xl font-bold '>
              ${productJSON.price}
            </h4>
          )}

          <p className='text-[#5e5e5d] 2xl:w-[70%] '>
            {productJSON.description}
          </p>
          <div className='colors flex'>colors</div>
          <hr className='w-full' />
          <div className='flex flex-wrap justify-center items-center gap-5'>
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
          <div className='flex xl:flex-row xl:justify-start xl:items-center xl:gap-5 '>
            <div className='bg-[#F0F0F0] flex justify-between items-center gap-5 rounded-full px-5 xl:w-[8rem] xl:h-[50px] '>
              <Button
                type='button'
                onClick={decrement}
                title='-'
                buttonClass='font-semibold text-2xl'
              />
              <span className=''>{count}</span>
              <Button
                type='button'
                onClick={increment}
                title='+'
                buttonClass='font-semibold text-2xl'
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
