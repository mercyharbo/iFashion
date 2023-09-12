import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type ProductProps = {
  productImage: React.ReactNode
  title: string
  ratings?: number | null
  price: number
  discount?: number | null
  productClass?: string
}
const Product = ({
  productImage,
  title,
  ratings,
  price,
  discount,
  productClass,
}: ProductProps) => {
  // Function to calculate the discounted price
  const calculateDiscountedPrice = (
    originalPrice: number,
    discountPercentage: number
  ): number => {
    const discountAmount = (originalPrice * discountPercentage) / 100
    return originalPrice - discountAmount
  }

  // Calculate discounted price if discount is provided
  const discountedPrice =
    discount !== null && discount !== undefined // Check for both null and undefined
      ? calculateDiscountedPrice(price, discount)
      : null

  // Round the price and discounted price to two decimal places
  const roundedPrice = price.toFixed(2)
  const roundedDiscountedPrice =
    discountedPrice !== null ? discountedPrice.toFixed(2) : null

  return (
    <article className={clsx('', productClass)}>
      <Image
        src={`/${productImage}`}
        width={1000}
        height={1000}
        alt={title}
              className='rounded-xl'
              style={{height: '200px'}}
      />
      <div className='flex flex-col justify-start items-start gap-2 p-3'>
        <h3 className='text-base font-semibold capitalize'>{title}</h3>
        <span className=''>{ratings} ratings </span>
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
