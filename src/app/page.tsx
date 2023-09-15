'use client'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
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

import inbox from '@/assets/envelope.svg'
import facebook from '@/assets/facebook.png'
import twitter from '@/assets/twitter.png'
import github from '@/assets/github.png'
import instagram from '@/assets/instagram.png'

import paypal from '@/assets/paypal_196566.png'
import visa from '@/assets/visa.png'
import applepay from '@/assets/cc-apple-pay_6422266.png'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )
  const revealRefs = useRef<any[]>([])
  revealRefs.current = []

  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']
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
        ease: 'power2.out',
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
        ease: 'sine.inOut',
      })
    }

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
  }, [isOpen, isSearchOpen])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el)
    }
  }

  return (
    <Layout>
      <Hero />
      <section className='brands-container bg-black text-white flex flex-col justify-center items-center  xl:h-[10rem] xl:mb-10 md:h-[8rem] sm:h-[8rem] '>
        <div className='flex xl:gap-10 xl:w-[80%] xl:justify-between xl:items-center md:justify-center md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 flex-wrap '>
          {brands.map((brandName, index) => {
            return (
              <Button
                key={index}
                type='button'
                title={brandName}
                buttonClass='brands 2xl:text-6xl xl:text-5xl md:text-3xl sm:text-2xl '
              />
            )
          })}
        </div>
      </section>

      <section
        ref={addToRefs}
        className=' xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center 
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
              productClass={` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer
              hover:scale-105 ease-in-out duration-300 `}
            />
          ))}
        </div>
        <Button
          title='view all'
          buttonClass='border-[1px] rounded-full w-[150px] py-2 '
        />
      </section>
      <hr />

      <section
        ref={addToRefs}
        className=' xl:py-10 xl:w-[80%] xl:my-10 md:py-10 md:px-10 md:w-[100%] sm:py-10 sm:px-2 sm:w-[100%] flex flex-col justify-center 
      items-center gap-10 mx-auto '
      >
        <h1 className='xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '>
          {' '}
          top selling{' '}
        </h1>
        <div className=' w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide '>
          {ProductJSON.products.map((item, index) => (
            <Product
              key={index}
              title={item.title}
              price={item.price}
              discount={item.discount}
              productImage={item.productImage}
              ratings={item.ratings}
              productClass={` inline-block xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 border-[1px] rounded-xl cursor-pointer
              hover:scale-105 ease-in-out duration-300 `}
            />
          ))}
        </div>
        <Button
          title='view all'
          buttonClass='border-[1px] rounded-full w-[150px] py-2 '
        />
      </section>

      <section
        ref={addToRefs}
        className='bg-[#F0F0F0] rounded-xl xl:mx-auto flex flex-col justify-center items-center gap-5 xl:p-10 xl:w-[80%] xl:my-10 md:p-10 md:mx-5 sm:mx-3 sm:p-5  '
      >
        <h1 className='xl:text-5xl md:text-4xl sm:text-2xl font-extrabold uppercase '>
          browse by dress style
        </h1>
        <div className='grid 2xl:py-10 2xl:gap-5 xl:grid-cols-3 xl:gap-5 md:grid-cols-2 md:py-5 sm:py-5 sm:grid-cols-1 sm:gap-5 '>
          {browseStyle.map((style) => {
            return (
              <Link
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
                  className='rounded-2xl object-cover w-full 2xl:h-[350px] xl:h-[350px] '
                />
                <span className='font-bold capitalize absolute top-5 left-5 2xl:text-4xl xl:text-4xl md:text-3xl sm:text-3xl '>
                  {style.style}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section
        ref={addToRefs}
        className=' xl:py-14 xl:my-10 md:py-10 md:px-10 sm:py-10 sm:px-5 flex flex-col justify-start 
      items-start gap-10 mx-auto '
      >
        <h1 className='2xl:text-5xl xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase '>
          our happy customers
        </h1>
        <div className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide  '>
          {testymonie.map((testy) => {
            return (
              <div
                key={testy.id}
                className='testy-card xl:w-[300px] xl:mx-3 md:w-[250px] md:mx-3 sm:w-[250px] sm:mx-2 inline-block whitespace-normal p-4 border-[1px] 
                rounded-xl cursor-pointer hover:scale-105 ease-in-out duration-300 h-full '
              >
                <h3 className='text-base font-semibold capitalize'>
                  {testy.name}
                </h3>
                <p className='py-2 text-[#858282] '>{testy.paragraph}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section
        ref={addToRefs}
        className='bg-black text-white flex rounded-2xl xl:mx-auto xl:relative xl:top-[5rem] xl:z-10 xl:h-[10rem] xl:flex-row xl:justify-between xl:w-[80%] 
        xl:items-center xl:px-16 md:flex-col md:justify-center md:items-center md:gap-5 md:relative md:top-[5rem] md:z-10 sm:static sm:flex-col sm:justify-center 
        sm:items-center sm:gap-5 sm:mx-5 sm:p-4 '
      >
        <h1 className='2xl:text-4xl xl:text-4xl xl:w-[50%] md:w-full md:text-4xl sm:w-full sm:text-2xl font-bold uppercase '>
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>

        <div className='newsletter-form flex flex-col justify-center items-center gap-3 3xl:w-[30%] 2xl:w-[40%] xl:w-[40%] md:w-full sm:w-full '>
          <InputField
            placeholder='Enter your email address'
            type='email'
            icon={
              <Image src={inbox} width={20} height={20} alt='Envelope icon' />
            }
            inputClass='pl-10 text-black'
            inputWrapper='w-full relative'
          />
          <Button
            type='button'
            title='subscribe to newsletter'
            buttonClass='rounded-full h-[45px] py-2 bg-[#fff] text-black font-medium w-full '
          />
        </div>
      </section>

      <footer
        // ref={addToRefs}
        className='bg-[#F0F0F0] w-full relative flex flex-col justify-center items-center gap-10 '
      >
        <div className='w-full xl:pt-[8rem] md:pt-[8rem] md:w-full md:px-10 sm:w-full sm:py-10 sm:px-5 flex flex-col justify-center items-center gap-10 '>
          <div className='grid xl:grid-cols-5 xl:content-center xl:place-items-center xl:gap-10 md:grid-cols-3 sm:grid-cols-1 sm:gap-10 '>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase'>
                {' '}
                shop.co{' '}
              </h3>
              <p className=' text-[#858282] '>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className='flex justify-start items-center gap-5'>
                <Link href={'/'}>
                  <Image
                    src={facebook}
                    width={25}
                    height={25}
                    alt='facebook icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={twitter}
                    width={25}
                    height={25}
                    alt='twitter icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={instagram}
                    width={25}
                    height={25}
                    alt='instagram icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={github}
                    width={25}
                    height={25}
                    alt='github icon'
                  />
                </Link>
              </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> company </h3>
              <p className='capitalize text-[#858282] '>about</p>
              <p className='capitalize text-[#858282] '>features</p>
              <p className='capitalize text-[#858282] '>works</p>
              <p className='capitalize text-[#858282] '>career</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> help </h3>
              <p className='capitalize text-[#858282]'>customer support</p>
              <p className='capitalize text-[#858282]'>delivery details</p>
              <p className='capitalize text-[#858282]'>terms & conditions</p>
              <p className='capitalize text-[#858282]'>privacy policy</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> faq </h3>
              <p className='capitalize text-[#858282]'>account</p>
              <p className='capitalize text-[#858282]'>manage deliveries</p>
              <p className='capitalize text-[#858282]'>orders</p>
              <p className='capitalize text-[#858282]'>payments</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> resources </h3>
              <p className='capitalize text-[#858282]'>free ebooks</p>
              <p className='capitalize text-[#858282]'>development tutorial</p>
              <p className='capitalize text-[#858282]'>how to - blog</p>
              <p className='capitalize text-[#858282]'>youtube playlist</p>
            </div>
          </div>
          <hr className='w-full' />
          <div
            className='flex w-full xl:flex-row xl:justify-between xl:items-center md:flex-col-reverse md:justify-center md:items-center sm:flex-col-reverse 
            sm:justify-center sm:items-center sm:gap-5 '
          >
            <span className=''>Shop.co © 2000-2023, All Rights Reserved</span>
            <div className='flex justify-center items-center gap-5'>
              <Image src={visa} width={30} height={30} alt='github icon' />
              <Image src={applepay} width={30} height={30} alt='github icon' />
              <Image src={paypal} width={30} height={30} alt='github icon' />
            </div>
          </div>
        </div>
      </footer>

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
