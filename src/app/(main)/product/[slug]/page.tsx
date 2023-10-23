'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'

import Button from '@/types/Button'
import { UseCounter } from '@/hooks/Counter'
import { UseDiscountCalculator } from '@/hooks/useDiscountCalculator'
import { CalculateAverageRating } from '@/utils/avarageRatings'
import StarRating from '@/components/Rating'
import Reviews from '@/components/Reviews'

import plus from '@/assets/plus.png'
import minus from '@/assets/minus.png'
import Product from '@/types/Product'
import Link from 'next/link'
import useColorSelection from '@/hooks/ColorSelector'

import {
  setIsSubmitting,
  setProductDetailsData,
} from '@/redux/Slice/ProductSlice'
import { toast } from 'react-toastify'

interface ProductPageProps {
  params: {
    slug: string
  }
}

const tabs: string[] = ['Product Details', 'Ratings and Reviews', 'FAQs']

export default function Product_Details({ params }: ProductPageProps) {
  const dispatch = useDispatch<AppDispatch>()
  const productDetailsData = useAppSelector(
    (state) => state.products.productDetailsData
  )
  const isLoading = useAppSelector((state) => state.products.isSubmitting)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('Product Details')
  const [isReview, setIsReview] = useState<string | null>(null)

  const averageRating = CalculateAverageRating(
    productDetailsData?.reviews || []
  )
  const { count, increment, decrement } = UseCounter()
  const { calculateDiscountedPrice, calculateRoundedPrice } =
    UseDiscountCalculator()
  const { selectedColors, setSelectedColors, handleColorClick } =
    useColorSelection()

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        dispatch(setIsSubmitting(true))
        const token = localStorage.getItem('token') // Get the token from localStorage
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        })

        const options = {
          method: 'GET',
          headers,
        }

        const response = await fetch(
          `${process.env.BASE_URL}/products/${params.slug}`,
          options
        )

        const data = await response.json()
        if (data.success === true) {
          dispatch(setProductDetailsData(data.product))
          setSelectedImage(data.product.images[0])
          setIsReview(data.product.reviews)
          dispatch(setIsSubmitting(false))
        } else {
          toast.error(data.message)
          dispatch(setIsSubmitting(false))
          return
        }
      } catch (error) {
        console.log(error)
      }
    }

    getProductDetails()
  }, [params])

  const handleSizeClick = (size: string) => {
    setSelectedSize(size)
  }

  const handleImageClick = (img: string) => {
    setSelectedImage(img)
  }

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab)
  }

  // Calculate discounted price if discount is provided
  const discountedPrice =
    productDetailsData?.discount !== null &&
    productDetailsData?.discount !== undefined
      ? calculateDiscountedPrice(
          productDetailsData!.price,
          productDetailsData!.discount
        )
      : null

  const roundedPrice = calculateRoundedPrice(productDetailsData?.price ?? 0)
  const roundedDiscountedPrice =
    discountedPrice !== null ? calculateRoundedPrice(discountedPrice) : null

  return (
    <>
      {isLoading ? (
        <p className='xl:p-14 md:p-10 sm:p-5'>Loading...</p>
      ) : (
        <>
          <header
            className={clsx(
              'grid mx-auto w-full xl:grid-cols-2 xl:gap-10 xl:px-14 xl:w-full xl:py-14 sm:flex-col sm:px-5 '
            )}
          >
            <div className='flex xl:flex-row md:flex-col-reverse md:gap-10 sm:gap-5 sm:flex-col-reverse '>
              <div
                className={clsx(
                  '3xl:h-[35rem] 2xl:h-[30rem] xl:w-[20%] xl:h-[30rem] xl:flex-col xl:snap-y xl:items-center md:snap-x md:w-[80%] sm:w-full sm:flex-row snap-mandatory flex justify-start overflow-scroll scrollbar-hide '
                )}
              >
                {productDetailsData?.images?.map((img, index) => {
                  return (
                    <button
                      key={index}
                      type='button'
                      onClick={() => handleImageClick(img)}
                      className={clsx(
                        'flex-shrink-0 h-auto flex items-start justify-start gap-5 xl:my-2 sm:mx-2'
                      )}
                    >
                      <Image
                        src={img}
                        width={100}
                        height={100}
                        alt='product images'
                        className='rounded-2xl object-cover object-top 2xl:h-[7rem] xl:h-[8rem] md:h-[6rem] sm:h-[6rem] '
                      />
                    </button>
                  )
                })}
              </div>

              <Image
                src={selectedImage}
                width={1000}
                height={1000}
                alt='selected product image'
                className={clsx(
                  'rounded-2xl object-cover 3xl:h-[45rem] 2xl:h-[35rem] xl:w-[80%] xl:h-[30rem] md:w-[60%] md:h-[25rem] sm:w-full sm:h-[25rem] '
                )}
              />
            </div>

            <div
              className={clsx(
                ' flex xl:flex-col xl:justify-start xl:items-start xl:gap-5 xl:py-0 sm:w-full sm:flex-col sm:justify-start sm:items-start sm:gap-5 sm:py-8 '
              )}
            >
              <div
                className={clsx(
                  'flex flex-col justify-start items-start gap-2'
                )}
              >
                <h1
                  className={clsx(
                    'xl:text-5xl md:text-3xl sm:text-2xl uppercase font-extrabold '
                  )}
                >
                  {productDetailsData?.title}
                </h1>
                <StarRating rating={averageRating} readOnly />
              </div>

              {productDetailsData?.discount ? (
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
                    {productDetailsData?.discount}%
                  </p>
                </div>
              ) : (
                <h4 className='2xl:text-4xl xl:text-4xl font-bold '>
                  ${productDetailsData?.price}
                </h4>
              )}

              <p className='text-[#5e5e5d] 2xl:w-[70%] '>
                {productDetailsData?.description}
              </p>
              <div className='flex justify-start items-center gap-5 flex-wrap xl:w-[50%] md:w-full sm:w-full '>
                {productDetailsData?.colors.map((colorOption, index) => {
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

              <hr className='w-full' />
              <div className='flex flex-wrap justify-start items-center gap-5'>
                {productDetailsData?.available_sizes?.map((btn, index) => {
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
                      <Image
                        src={minus}
                        width={50}
                        height={50}
                        alt='minus icon'
                      />
                    }
                  />
                  <span className='font-medium text-xl '>{count}</span>
                  <Button
                    type='button'
                    onClick={increment}
                    icon={
                      <Image
                        src={plus}
                        width={50}
                        height={50}
                        alt='minus icon'
                      />
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

          <section
            className={clsx('xl:w-[80%] xl:py-10 md:py-10 sm:py-10 mx-auto ')}
          >
            <div
              className={clsx(
                'relative flex justify-center items-center text-[#0000001A] xl:gap-10 md:gap-5 sm:gap-6 after:absolute after:border-[1px] after:w-full after:-bottom-3 after:left-0 '
              )}
            >
              {tabs.map((tab, index) => {
                return (
                  <Button
                    key={index}
                    type='button'
                    title={tab}
                    onClick={() => handleTabClick(tab)}
                    buttonClass={clsx(
                      'capitialize text-[#00000099] relative  xl:text-xl ',
                      activeTab === tab
                        ? 'after:absolute after:-bottom-[13px] after:left-0 after:w-full after:border-2 after:border-black after:z-10'
                        : ''
                    )}
                  />
                )
              })}
            </div>

            {activeTab === 'Product Details' && (
              <section className='2xl:w-[60%] xl:w-[80%] md:w-full sm:w-full my-[2rem] ml-0 flex flex-col justify-start items-start gap-5 '>
                <h1 className='2xl:text-2xl font-semibold capitalize'>
                  product details
                </h1>
                <p>{productDetailsData?.description}</p>

                {/* <div className='grid 2xl:grid-cols-2'>
              <table className='border-[1px] p-2 '>
                <thead>
                  <tr>
                    <th>KEY FEATURES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border-[1px] p-2'>
                      48H long lasting nourishment
                    </td>
                  </tr>
                  <tr>
                    <td className='border-[1px] p-2'>
                      Helps reduce and Smoothen Stretchmarks
                    </td>
                  </tr>
                  <tr>
                    <td className='border-[1px] p-2'>
                      Helps repair Dry and Ashy skin
                    </td>
                  </tr>
                  <tr>
                    <td className='border-[1px] p-2'>
                      Helps repair the roughest part of your skin: elbows, arms,
                      Knuckles
                    </td>
                  </tr>
                  <tr>
                    <td className='border-[1px] border-b-0 p-2'>
                      Gives your skin a healthy Glow
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
              </section>
            )}
            {/* {activeTab === 'Ratings and Reviews' && (
              <Reviews data={productDetailsData?.reviews} />
            )} */}
            {/* {activeTab === 'FAQs' && <FAQsContent />} */}

            {/* {productDetailsData?.related.length > 0 && (
          <div className='flex flex-col justify-center items-center gap-10 my-14'>
            <h1 className='xl:text-5xl md:text-3xl sm:text-3xl uppercase font-extrabold'>
              you might also like
            </h1>

            <div className='grid 3xl:grid-cols-6 3xl:gap-10 xl:grid-cols-4 xl:gap-5 md:grid-cols-2 md:gap-5 md:px-5 sm:px-14 sm:grid-cols-1 sm:gap-5'>
            {ProductJSON.related.map((product) => {
              const avarageRating = CalculateAverageRating(product.reviews)
              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Product
                    title={product.name}
                    price={product.price}
                    productImage={product.image}
                    ratings={avarageRating}
                    discount={product.discount}
                    productClass='w-auto border-[1px] rounded-2xl '
                    starStyling='text-2xl'
                  />
                </Link>
              )
            })}
          </div>
          </div>
        )} */}
          </section>
        </>
      )}
    </>
  )
}
