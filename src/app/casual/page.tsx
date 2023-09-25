'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'
import { CalculateAverageRating } from '../utils/avarageRatings'
import Button from '@/types/Button'

type casualProps = {
  categoryWrapper?: string
}

const categories = ['t-shirts', 'shorts', 'shirts', 'hoodie', 'jean']

function CasualCategory() {
  return (
    <main
      className={clsx(
        'flex justify-center items-start 2xl:gap-10 2xl:p-10 md:p-5 sm:p-5'
      )}
    >
      <div
        className={clsx(
          '2xl:w-[20%] xl:flex xl:flex-col xl:justify-start xl:items-start md:hidden sm:hidden gap-5 border-[1px] rounded-xl p-2   '
        )}
      >
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Filters</h1>
          <span className=''>icon</span>
        </div>
        <hr />
        <div className='flex flex-col justify-start items-start gap-5'>
          {categories.map((category, index) => {
            return <Button key={index} type='button' title={category} />
          })}
        </div>
      </div>

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
          <div className={clsx('flex justify-center items-center gap-5')}>
            <span className='text-sm'>Showing 1-10 of 100 Products</span>
            <span className='text-sm capitalize'>sort by </span>
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
    </main>
  )
}

export default CasualCategory
