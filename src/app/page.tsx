'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger' // Import ScrollTrigger

import Hero from '@/components/Hero'

import Button from '@/types/Button'
import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'
import { CalculateAverageRating } from './utils/avarageRatings'
import StarRating from '@/components/Rating'

import check from '@/assets/verified.png'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const revealRefs = useRef<any[]>([])
  revealRefs.current = []

  const brands = ['versace', 'zara', 'gucci', 'prada', 'celvin klein']
  const browseStyle = [
    { id: 1, style: 'casual', image: '/casual2.jpg' },
    { id: 2, style: 'formal', image: '/formal3.jpg' },
    { id: 3, style: 'party', image: '/party2.jpg' },
    { id: 4, style: 'gym', image: '/gym.jpg' },
  ]
  const testymonie = [
    {
      id: 1,
      name: 'sarah m',
      ratings: 4,
      paragraph: `I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.`,
    },
    {
      id: 2,
      name: 'alex k',
      ratings: 3,
      paragraph: `Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.`,
    },
    {
      id: 3,
      name: 'james l',
      ratings: 5,
      paragraph: `Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.`,
    },
    {
      id: 4,
      name: 'code with mercy',
      ratings: 4,
      paragraph: `As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.`,
    },
    {
      id: 5,
      name: 'code with mercy',
      ratings: 4,
      paragraph: `As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.`,
    },
    {
      id: 6,
      name: 'code with mercy',
      ratings: 4,
      paragraph: `As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.`,
    },
    {
      id: 7,
      name: 'code with mercy',
      ratings: 4,
      paragraph: `As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.`,
    },
  ]

  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
        },
        {
          duration: 1,
          autoAlpha: 1,
          ease: 'back',
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
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <>
      <Hero />
      <section
        className={clsx(
          'brands-container bg-black text-white flex flex-col justify-center items-center  xl:h-[10rem] xl:mb-10 md:h-[8rem] sm:h-[8rem] '
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
          ' xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center items-center gap-10 mx-auto '
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
          {ProductJSON.products.map((item, index) => {
            const avarageRating = CalculateAverageRating(item?.reviews)
            return (
              <Link key={index} href={`/product/${index}`}>
                <Product
                  key={index}
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  productImage={item.productImage}
                  ratings={avarageRating}
                  starStyling='text-2xl'
                  productClass={clsx(` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer
              hover:scale-105 ease-in-out duration-300 `)}
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
          'xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center items-center gap-10 mx-auto '
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
                scroll={false}
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
