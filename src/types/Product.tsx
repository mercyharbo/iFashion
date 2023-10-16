import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { UseDiscountCalculator } from '@/hooks/useDiscountCalculator'
import StarRating from '@/components/Rating'

type ProductProps = {
  title: string
  price: number
  productClass?: string
  ratings?: number | undefined
  discount?: number | null
  productImage: React.ReactNode
  starStyling?: string
}

const Product = ({
  productImage,
  title,
  ratings,
  price,
  discount,
  productClass,
  starStyling,
}: ProductProps) => {
  const { calculateDiscountedPrice, calculateRoundedPrice } =
    UseDiscountCalculator()

  // Calculate discounted price if discount is provided
  const discountedPrice =
    discount !== null && discount !== undefined
      ? calculateDiscountedPrice(price, discount)
      : null

  // Round the price and discounted price using the custom hook
  const roundedPrice = calculateRoundedPrice(price)
  const roundedDiscountedPrice =
    discountedPrice !== null ? calculateRoundedPrice(discountedPrice) : null

  return (
    <article className={clsx('', productClass)}>
      <Image
        src={`/${productImage}`}
        width={1000}
        height={1000}
        alt={title}
        className='rounded-xl'
        style={{ height: '200px' }}
      />
      <div className='flex flex-col justify-start items-start gap-2 p-3'>
        <h3 className='text-base font-semibold capitalize'>{title}</h3>
        <StarRating rating={ratings} starStyling={starStyling} />
        {discount ? (
          <div className='flex justify-center items-center gap-3'>
            <span className='text-lg font-semibold'>
              ${roundedDiscountedPrice}
            </span>
            <del className='text-[#a5a5a5] font-semibold '>${roundedPrice}</del>
            <p
              className={clsx('')}
              style={{
                backgroundColor: '#ff333330',
                borderRadius: '100px',
                paddingLeft: '10px',
                paddingRight: '10px',
                color: '#f33',
                fontSize: '11px',
              }}
            >
              {discount}%
            </p>
          </div>
        ) : (
          <p className='text-lg font-semibold'>${price}</p>
        )}
      </div>
    </article>
  )
}

export default Product
