'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'

import { AppDispatch, useAppSelector } from '@/redux/Store'

import Hero from '@/components/Hero'
import Button from '@/types/Button'
import Product from '@/types/Product'
import { CalculateAverageRating } from '@/utils/avarageRatings'

gsap.registerPlugin(ScrollTrigger)

const brands = ['versace', 'zara', 'gucci', 'prada', 'celvin klein']
const browseStyle = [
  { id: 1, style: 'casual', image: '/casual2.jpg' },
  { id: 2, style: 'formal', image: '/formal3.jpg' },
  { id: 3, style: 'party', image: '/party2.jpg' },
  { id: 4, style: 'gym', image: '/gym.jpg' },
]

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const revealRefs = useRef<any[]>([])
  revealRefs.current = []
  const [products, setProducts] = useState([])

  const isLoading = useAppSelector((state) => state.userProfile.isLoading)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${process.env.BASE_URL}/products`, {
        cache: 'no-store',
      })
      const data = await res.json()
      setProducts(data.products)
    }

    fetchData()
  }, [])

  useEffect(() => {
    revealRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          opacity: 0,
          y: -100,
        },
        {
          opacity: 1,
          duration: 1,
          autoAlpha: 1,
          ease: 'power2.inOut',
          y: 0,
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
  }, [revealRefs])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  const currentDate = new Date() // Get the current date
  currentDate.setDate(currentDate.getDate() - 14)

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
            'flex 3xl:w-[90%] 2xl:w-[90%] xl:gap-10 xl:w-[80%] xl:justify-between xl:items-center md:justify-center md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 flex-wrap '
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

      <div
        className={clsx(
          ' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '
        )}
      >
        {products
          .slice(0, 10)
          .reverse()
          .map((item: { [key: string]: any }) => {
            const avarageRating = CalculateAverageRating(item?.reviews)
            return (
              <Link key={item._id} href={`/product/${item._id}`}>
                <Product
                  title={item.title}
                  price={item.price}
                  discount={item.discount}
                  productImage={item.images?.[0]}
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

      <section
        ref={addToRefs}
        className={clsx(
          'bg-[#F0F0F0] rounded-xl flex flex-col justify-center items-center gap-5 2xl:w-[95%] xl:mx-auto xl:p-10 xl:my-10 md:p-10 md:mx-5 sm:mx-3 sm:p-5  '
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
