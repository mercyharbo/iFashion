'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import gsap from 'gsap'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { BsTag } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

import ProductJSON from '@/components/Product.json'
import Button from '@/types/Button'
import { UseCounter } from '@/hooks/Counter'
import InputField from '@/types/InputField'

export default function Cart() {
  const { increment, decrement, count } = UseCounter()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      '.cart',
      { x: -100, opacity: 0 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.inOut' }
    ).fromTo(
      '.checkout',
      { x: 100, opacity: 0 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.inOut', delay: 0.2 }
    )
  }, [])

  return (
    <main
      className={clsx(
        'flex flex-col justify-start items-start gap-10 mx-auto xl:w-[90%] xl:px-0 md:w-full md:px-10 md:py-10 sm:w-full sm:px-5 sm:py-10 '
      )}
    >
      <h1 className='text-xl uppercase font-bold'>your cart</h1>
      <section
        className={clsx(
          'flex w-full xl:flex-row xl:justify-start xl:items-start xl:gap-10 md:flex-col md:gap-10 md:justify-center md:items-center sm:flex-col sm:justify-center sm:items-center sm:gap-10'
        )}
      >
        <div
          className={clsx(
            'cart xl:w-[70%] md:w-full sm:w-full flex flex-col justify-center items-center gap-5 border-[1px] rounded-md p-5  '
          )}
        >
          {ProductJSON.products.slice(0, 3).map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'flex justify-center items-center gap-3  py-3 w-full ',
                  index === ProductJSON.products.slice(0, 3).length - 1
                    ? ''
                    : 'border-b-[1px]'
                )}
              >
                <div
                  className={clsx(
                    'xl:w-[20%] md:w-[20%] sm:w-[20%] bg-gray-300 '
                  )}
                >
                  <Image
                    src={`/${item.productImage}`}
                    alt={item.title}
                    width={200}
                    height={200}
                    className=' w-full h-auto '
                  />
                </div>
                <div
                  className={clsx(
                    'flex flex-col justify-start items-start gap-1 xl:w-[80%] md:w-[80%] sm:w-[80%] '
                  )}
                >
                  <div className='flex justify-between items-center w-full'>
                    <h4 className='text-base font-semibold '>{item.title}</h4>
                    <Button
                      type='button'
                      onClick={decrement}
                      icon={<MdDelete className='text-xl text-[red] ' />}
                    />
                  </div>
                  <span
                    className={clsx(
                      'flex justify-start items-center gap-2 text-xs text-gray-400'
                    )}
                  >
                    Size: Large
                  </span>
                  <span
                    className={clsx(
                      'flex justify-start items-center gap-2 text-xs text-gray-400'
                    )}
                  >
                    Color: White
                  </span>
                  <div
                    className={clsx('flex justify-between items-center w-full')}
                  >
                    <h3 className='text-base font-semibold'>${item.price}</h3>
                    <div
                      className={clsx(
                        'bg-[#F0F0F0] flex justify-between items-center gap-3 rounded-full p-2 '
                      )}
                    >
                      <Button
                        type='button'
                        onClick={decrement}
                        icon={<BiMinus />}
                      />
                      <span className='font-medium '>{count}</span>
                      <Button
                        type='button'
                        onClick={increment}
                        icon={<BiPlus />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className={clsx(
            'checkout xl:w-[40%] md:w-full sm:w-full flex flex-col justify-start items-start gap-5 border-[1px] rounded-md p-5 '
          )}
        >
          <h1 className='text-xl font-medium capitalize'>order summary</h1>
          <div className='text-gray-400 flex justify-between items-center w-full'>
            <p className='capitalize'>subtotal</p>
            <h3 className='font-medium text-black'> $333 </h3>
          </div>
          <div className='text-gray-400 flex justify-between items-center w-full'>
            <p className='capitalize'>discount (-20%) </p>
            <h3 className='font-medium text-[red]  '> -$333 </h3>
          </div>
          <div className='text-gray-400 flex justify-between items-center w-full'>
            <p className='capitalize'>delivery fee</p>
            <h3 className='font-medium  text-black'> $15 </h3>
          </div>
          <hr className='w-full' />
          <div className='text-gray-400 flex justify-between items-center w-full'>
            <p className='capitalize text-black'>total</p>
            <h3 className='font-medium  text-black'> $333 </h3>
          </div>
          <div className='text-gray-400 flex justify-start items-center gap-5 w-full'>
            <InputField
              type='text'
              icon={<BsTag className='text-xl' />}
              placeholder='Add promo code'
              inputClass='w-full indent-6'
              inputWrapper='w-full flex justify-start items-center gap-5'
            />
            <Button
              type='button'
              title='apply'
              buttonClass='bg-black text-white px-5 py-2 rounded-full '
            />
          </div>
          <Button
            type='button'
            title='checkout'
            buttonClass='bg-black text-white px-5 py-3 rounded-full w-full '
          />
        </div>
      </section>
    </main>
  )
}
