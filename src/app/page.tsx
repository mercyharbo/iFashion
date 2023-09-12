'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger' // Import ScrollTrigger

import { AppDispatch, useAppSelector } from '@/redux/Store'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Modal from '@/types/Modal'
import InputField from '@/types/InputField'

import { closeModal } from '@/redux/Slice/ModalSlice'
import { closeSearchModal } from '@/redux/Slice/SearchModalSlice'

import Button from '@/types/Button'
import Product from '@/types/Product'
import ProductJSON from '@/components/Product.json'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )

  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']
  const brands = ['versace', 'zara', 'gucci', 'prada', 'celvin klein']

  const handleNavClose = () => {
    dispatch(closeModal())
  }

  const handleSearchModal = () => {
    dispatch(closeSearchModal())
  }

  useEffect(() => {
    if (isOpen) {
      gsap.from('.nav-container', {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'circ.out',
      })

      gsap.from('.nav-link', {
        opacity: 0,
        x: -20,
        stagger: 0.5,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    if (isSearchOpen) {
      gsap.from('.search-container', {
        opacity: 0,
        y: -50,
        stagger: 0.2,
        duration: 0.5,
        ease: 'power2.inOut',
      })
    }

    gsap.from('new_arrivals', {
      opacity: 0,
      x: 100,
      duration: 1,
      scrollTrigger: {
        trigger: '.new_arrivals',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    })

    gsap.from('.product', {
      opacity: 0,
      x: -100, // Adjust the distance
      duration: 1,
      scrollTrigger: {
        trigger: '.your-product',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    })
  }, [isOpen, isSearchOpen])

  return (
    <Layout>
      <Hero />
      <section className='bg-black text-white flex flex-col justify-center items-center  xl:h-[10rem] xl:mb-10 md:h-[8rem] sm:h-[8rem] '>
        <div className='flex xl:gap-10 xl:w-[80%] xl:justify-between xl:items-center md:justify-center md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 flex-wrap '>
          {brands.map((brandName, index) => {
            return (
              <Button
                key={index}
                type='button'
                title={brandName}
                buttonClass=' xl:text-6xl md:text-3xl sm:text-2xl '
              />
            )
          })}
        </div>
      </section>

      <section
        className='new_arrivals xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center 
      items-center gap-10 mx-auto '
      >
        <h1 className='xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '>
          {' '}
          new arrivals{' '}
        </h1>
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '>
          {ProductJSON.products.map((item, index) => (
            <Product
              key={index}
              title={item.title}
              price={item.price}
              discount={item.discount}
              productImage={item.productImage}
              ratings={item.ratings}
              productClass={`product inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer
              hover:scale-105 ease-in-out duration-300 `}
            />
          ))}
        </div>
      </section>
      <hr />
      <section
        className='new_arrivals xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center 
      items-center gap-10 mx-auto '
      >
        <h1 className='xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '>
          {' '}
          top selling{' '}
        </h1>
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '>
          {ProductJSON.products.map((item, index) => (
            <Product
              key={index}
              title={item.title}
              price={item.price}
              discount={item.discount}
              productImage={item.productImage}
              ratings={item.ratings}
              productClass={`product inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer
              hover:scale-105 ease-in-out duration-300 `}
            />
          ))}
        </div>
      </section>

      {isOpen && (
        <Modal
          handleCloseModal={handleNavClose}
          showLogo={true}
          showHeader={true}
          modalClass='nav-container w-[80%] mx-auto top-0 left-0 p-5 z-20 rounded-r-xl h-screen absolute bg-white '
          contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold pt-10 text-lg'
        >
          {NavItems.map((items, key) => {
            return (
              <Link
                href={`/${items.replace(/\s+/g, '-')}`}
                key={key}
                className='nav-link'
              >
                {items}
              </Link>
            )
          })}
        </Modal>
      )}

      {isSearchOpen && (
        <Modal
          handleCloseModal={handleSearchModal}
          showLogo={false}
          showHeader={false}
          modalClass='search-container 2xl:hidden xl:hidden md:flex sm:flex w-[95%] mx-auto top-2 right-0 p-5 z-10 absolute rounded-xl'
          contentClass='flex-col justify-center items-center gap-5 w-full capitalize font-semibold'
        >
          <InputField
            type='text'
            placeholder='Search for products...'
            inputWrapper='w-full'
            inputClass='rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] w-full xl:hidden md:flex sm:flex '
          />
        </Modal>
      )}
    </Layout>
  )
}
