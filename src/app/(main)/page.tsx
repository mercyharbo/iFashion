'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Hero from '@/components/Hero'

import Button from '@/types/Button'
import Product from '@/types/Product'
import { CalculateAverageRating } from '../../utils/avarageRatings'

import clsx from 'clsx'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '@/redux/Slice/ProductSlice'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const revealRefs = useRef<any[]>([])
  revealRefs.current = []
  const productData = useAppSelector((state) => state.products)

  const brands = ['versace', 'zara', 'gucci', 'prada', 'celvin klein']
  const browseStyle = [
    { id: 1, style: 'casual', image: '/casual2.jpg' },
    { id: 2, style: 'formal', image: '/formal3.jpg' },
    { id: 3, style: 'party', image: '/party2.jpg' },
    { id: 4, style: 'gym', image: '/gym.jpg' },
  ]

  useEffect(() => {
    dispatch(fetchProducts())

    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          autoAlpha: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            id: `section-${index + 1}`,
            trigger: el,
            start: 'top center+=100',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    gsap
      .timeline()
      .from('.brand-container', {
        opacity: 0,
        duration: 5,
      })
      .from('.brands', {
        opacity: 0,
        duration: 1,
        scale: 0,
        ease: 'back',
      })
  }, [dispatch])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const currentDate = new Date() // Get the current date
  currentDate.setDate(currentDate.getDate() - 14)

  const filteredProducts = productData?.products.filter((item) => {
    const productDate = new Date(item.createdDate)
    return productDate >= currentDate
  })

  return (
    <>
      <Hero />
      <section
        className={clsx(
          'brands-container bg-black text-white flex flex-col justify-center items-center xl:h-[10rem] xl:mb-10 md:h-[8rem] sm:h-[8rem] '
        )}
      >
        <div
          className={clsx(
            'flex xl:gap-10 xl:w-[80%] xl:justify-between xl:items-center md:justify-center md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 flex-wrap '
          )}
        >
          {brands.map((brandName, index) => {
            return (
              <Button
                key={index}
                type='button'
                title={brandName}
                buttonClass={clsx(
                  'brands 2xl:text-6xl xl:text-5xl md:text-3xl sm:text-2xl '
                )}
              />
            )
          })}
        </div>
      </section>

      <section
        ref={addToRefs}
        className={clsx(
          ' xl:py-10 xl:my-10 md:py-10 md:px-10 sm:py-10 sm:px-2 flex flex-col justify-center items-center gap-10 mx-auto w-full '
        )}
      >
        <h1
          className={clsx(
            'xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '
          )}
        >
          {' '}
          new arrivals{' '}
        </h1>
        <div
          className={clsx(
            'w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '
          )}
        >
          {filteredProducts.slice(0, 6).map((item) => {
            const avarageRating = CalculateAverageRating(item?.reviews)
            return (
              <Link key={item._id} href={`/product/${item._id}`}>
                <Product
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  productImage={item?.images?.[0]}
                  ratings={avarageRating}
                  starStyling='text-lg'
                  productClass={clsx(
                    ` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer`
                  )}
                />
              </Link>
            )
          })}
        </div>
        <Button
          title='view all'
          buttonClass={clsx('border-[1px] rounded-full w-[150px] py-2 ')}
        />
      </section>
      <hr />

      <section
        ref={addToRefs}
        className={clsx(
          'xl:py-10 xl:my-10 md:py-10 md:px-10 sm:py-10 sm:px-2 w-full flex flex-col justify-center items-center gap-10 mx-auto '
        )}
      >
        <h1
          className={clsx(
            'xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '
          )}
        >
          {' '}
          top selling{' '}
        </h1>
        <div
          className={clsx(
            ' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '
          )}
        >
          {productData?.products
            .slice(0, 6)
            .reverse()
            .map((item) => {
              const avarageRating = CalculateAverageRating(item?.reviews)

              return (
                <Link key={item._id} href={`/product/${item._id}`}>
                  <Product
                    title={item.title}
                    price={item.price}
                    discount={item.discount}
                    productImage={item?.images?.[0]}
                    ratings={avarageRating}
                    productClass={clsx(
                      ` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer`
                    )}
                    starStyling='text-lg'
                  />
                </Link>
              )
            })}
        </div>
        <Button
          title='view all'
          buttonClass='border-[1px] rounded-full w-[150px] py-2 '
        />
      </section>

      <section
        ref={addToRefs}
        className={clsx(
          'bg-[#F0F0F0] rounded-xl xl:mx-auto flex flex-col justify-center items-center gap-5 xl:p-10 xl:w-[80%] xl:my-10 md:p-10 md:mx-5 sm:mx-3 sm:p-5  '
        )}
      >
        <h1
          className={clsx(
            'xl:text-5xl md:text-4xl sm:text-2xl font-extrabold uppercase '
          )}
        >
          browse by dress style
        </h1>
        <div
          className={clsx(
            'grid 2xl:py-10 2xl:gap-5 xl:grid-cols-3 xl:gap-5 md:grid-cols-2 md:py-5 sm:py-5 sm:grid-cols-1 sm:gap-5 '
          )}
        >
          {browseStyle.map((style) => {
            return (
              <Link
                scroll={true}
                key={style.id}
                href={`/${style.style}`}
                className={
                  style.style === 'formal' || style.style === 'party'
                    ? 'relative xl:col-span-2 sm:col-span-1  '
                    : 'relative xl:col-span-1 sm:col-span-1 '
                }
              >
                <Image
                  src={`${style.image}`}
                  width={1000}
                  height={1000}
                  alt={style.style}
                  className={clsx(
                    'rounded-2xl object-cover w-full 2xl:h-[350px] xl:h-[350px] '
                  )}
                />
                <span
                  className={clsx(
                    'font-bold capitalize absolute top-5 left-5 2xl:text-4xl xl:text-4xl md:text-3xl sm:text-3xl '
                  )}
                >
                  {style.style}
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
