'use client'

import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'
import { CalculateAverageRating } from '../utils/avarageRatings'

type casualProps = {
  categoryWrapper?: string
}

function CasualCategory() {
  return (
    <main className='flex justify-center items-center 2xl:gap-10 2xl:p-10'>
      <div className='flex flex-col justify-start items-start gap-5 2xl:w-[20%] '>
        category
      </div>

      <div className='flex flex-col justify-between items-center gap-5 2xl:w-[80%] '>
        <div className='flex justify-between items-center w-full '>
          <h1 className='text-2xl font-semibold capitalize '>casual</h1>
          <div className='flex justify-center items-center gap-5'>
            <span className='text-sm'>Showing 1-10 of 100 Products</span>
            <span className='text-sm capitalize'>sort by </span>
          </div>
        </div>

        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 xl:content-start xl:place-items-start xl:gap-5'>
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
                    ` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer hover:scale-105 ease-in-out duration-300 `
                  )}
                  starStyling='text-2xl'
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
