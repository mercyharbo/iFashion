'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import gsap from 'gsap'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { BsTag } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

import Button from '@/types/Button'
import InputField from '@/types/InputField'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setCarts } from '@/redux/Slice/ProductSlice'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  image: string
  size: string
  color: []
  price: number
  quantity: number
  discount: number
}

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const carts = useAppSelector((state) => state.products.cart)

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

  const handleRemoveFromCart = (product: Product) => {
    // Get the current cart items from localStorage
    const existingCartItems: Product[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    )

    // Find the index of the product in the cart
    const productIndex = existingCartItems.findIndex(
      (item) => item.id === product.id
    )

    if (productIndex !== -1) {
      // Remove the product from the cart
      existingCartItems.splice(productIndex, 1)

      // Update the cart in localStorage
      localStorage.setItem('cart', JSON.stringify(existingCartItems))

      // Update the cart in your Redux store if needed
      dispatch(setCarts(product)) // Define a removeFromCart action in your Redux store

      // Optionally, display a success message
      toast.success('Product removed from the cart')
      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }

  // Calculate subtotal
  const subtotal = carts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )

  // Calculate total savings
  const totalSavings = carts.reduce((total, product) => {
    if (product.discount) {
      // Calculate the total savings for each product
      const productSavings =
        (product.discount / 100) * product.price * product.quantity
      return total + productSavings
    }
    return total
  }, 0)

  // Calculate the total amount after removing discounts and adding the delivery fee
  const deliveryFee = 20 // You mentioned the delivery fee is $20
  const totalAmount = subtotal + deliveryFee

  // Calculate the discount percentage
  const discountPercentage = (totalSavings / subtotal) * 100

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
          {carts.length > 0 ? (
            carts?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    'flex justify-center items-center gap-3  py-3 w-full ',
                    index === carts.length - 1 ? '' : 'border-b-[1px]'
                  )}
                >
                  <div
                    className={clsx(
                      'xl:w-[20%] md:w-[20%] sm:w-[20%] rounded-xl '
                    )}
                  >
                    <Image
                      src={`${item.image}`}
                      alt={item.title}
                      width={200}
                      height={200}
                      className='w-full xl:h-[12rem] rounded-xl object-cover object-top '
                    />
                  </div>
                  <div
                    className={clsx(
                      'flex flex-col justify-start items-start gap-2 xl:w-[80%] md:w-[80%] sm:w-[80%] '
                    )}
                  >
                    <div className='flex justify-between items-center w-full'>
                      <h4 className='text-base font-semibold capitalize '>
                        {item.title}
                      </h4>
                      <Button
                        type='button'
                        onClick={() => handleRemoveFromCart(item)}
                        icon={<MdDelete className='text-xl text-[red] ' />}
                      />
                    </div>
                    <span
                      className={clsx(
                        'flex justify-start items-center gap-2 text-xs text-gray-400'
                      )}
                    >
                      Size: {item.size}
                    </span>
                    <span
                      className={clsx(
                        'flex justify-start items-center gap-2 text-xs text-gray-400'
                      )}
                    >
                      Color: {item.color.map((c) => c)}
                    </span>
                    <div
                      className={clsx(
                        'flex justify-between items-center w-full'
                      )}
                    >
                      <h3 className='text-base font-semibold'>
                        ${item.price}{' '}
                      </h3>
                      <div className='flex justify-start items-center gap-2 text-gray-400 text-xs'>
                        Quantity: <span className=''>{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='flex flex-col justify-center items-center gap-2 py-5'>
              <h1 className='text-xl font-medium'>Your cart is empty!</h1>
              <p className='text-gray-400'>
                Browse our categories and discover our best deals!
              </p>
              <Link
                href='/casual'
                className='bg-black capitalize px-5 py-3 rounded-lg text-white'
              >
                Start shopping
              </Link>
            </div>
          )}
        </div>

        {carts.length > 0 && (
          <div
            className={clsx(
              'checkout xl:w-[40%] md:w-full sm:w-full flex flex-col justify-start items-start gap-5 border-[1px] rounded-md p-5 '
            )}
          >
            <h1 className='text-xl font-medium capitalize'>order summary</h1>
            <div className='text-gray-400 flex justify-between items-center w-full'>
              <p className='capitalize'>subtotal</p>
              <h3 className='font-medium text-black'>
                $ {subtotal.toFixed(2)}
              </h3>
            </div>
            <div className='text-gray-400 flex justify-between items-center w-full'>
              <p className='capitalize'>
                discount (-{discountPercentage.toFixed(0)}%)
              </p>
              <h3 className='font-medium text-[red]'>
                - $ {totalSavings.toFixed(2)}
              </h3>
            </div>
            <div className='text-gray-400 flex justify-between items-center w-full'>
              <p className='capitalize'>delivery fee</p>
              <h3 className='font-medium text-black'>$20</h3>
            </div>
            <hr className='w-full' />
            <div className='text-gray-400 flex justify-between items-center w-full'>
              <p className='capitalize text-black'>total</p>
              <h3 className='font-medium text-black'>
                $ {totalAmount.toFixed(2)}
              </h3>
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
        )}
      </section>
    </main>
  )
}
