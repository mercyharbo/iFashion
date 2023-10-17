'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { BiMinus, BiPlus } from 'react-icons/bi'

import Button from '@/types/Button'
import InputField from '@/types/InputField'
import ProductJSON from '@/components/Product.json'

// Icons
import hamburger from '@/assets/menu-burger.svg'
import cart from '@/assets/shopping-cart.svg'
import user from '@/assets/circle-user.svg'
import search from '@/assets/search.svg'

import { AppDispatch, useAppSelector } from '@/redux/Store'
import { closeModal, openModal, setCartOpen } from '@/redux/Slice/ModalSlice'
import {
  closeSearchModal,
  openSearchModal,
  setSearchQuercy,
} from '@/redux/Slice/SearchModalSlice'
import Modal from '@/types/Modal'
import { UseCounter } from '@/hooks/Counter'
import clsx from 'clsx'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { increment, decrement, count } = UseCounter()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )
  const searchQuery = useAppSelector(
    (state) => state.searchModalReducer.modal.searchQuery
  )
  const cartOpen = useAppSelector((state) => state.modalReducer.modal.cartOpen)
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  useEffect(() => {
    const header = document.querySelector('.fixed-header')

    gsap.from(header, {
      duration: 1,
      y: -100,
      opacity: 0,
      ease: 'power2.out',
    })

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
  }, [isOpen, isSearchOpen])

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  const handleNavClose = () => {
    dispatch(closeModal())
  }

  const handleSearchModal = () => {
    dispatch(closeSearchModal())
  }

  const handleSearch = (newQuery: string) => {
    dispatch(setSearchQuercy(newQuery))
  }

  const handleCartOpen = () => {
    dispatch(setCartOpen(!cartOpen))
  }

  return (
    <>
      <nav
        className={clsx(
          'fixed-header relative z-10 flex flex-row justify-between items-center gap-5 w-full mx-auto xl:px-0 xl:py-5 xl:w-[90%] md:w-full md:py-5 md:px-5 sm:w-full sm:px-5 sm:py-5'
        )}
      >
        <div className='flex justify-center items-center gap-3'>
          <Button
            onClick={handleOpenModal}
            icon={<Image src={hamburger} width={25} height={25} alt='icon' />}
            buttonClass='xl:hidden md:hidden sm:flex '
          />
          <Link
            href={'/'}
            className='xl:text-3xl sm:text-xl font-extrabold uppercase '
          >
            shop.co
          </Link>
        </div>

        <div
          className={clsx(
            'xl:flex md:flex sm:hidden justify-center items-center gap-5 capitalize'
          )}
        >
          {NavItems.map((items, key) => {
            return (
              <Link href={`/${items.replace(/\s+/g, '-')}`} key={key}>
                {items}
              </Link>
            )
          })}
        </div>

        <InputField
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder='Search for products...'
          inputClass='xl:flex xl:w-[30rem] md:hidden sm:hidden  '
        />

        <div
          className={clsx('flex justify-center items-center gap-4 relative')}
        >
          <Button
            onClick={() => dispatch(openSearchModal())}
            icon={<Image src={search} width={25} height={25} alt='icon' />}
            buttonClass='xl:hidden md:flex sm:flex '
          />
          <Button
            onClick={handleCartOpen}
            icon={<Image src={cart} width={25} height={25} alt='icon' />}
            buttonClass=''
          />
          <Button
            icon={<Image src={user} width={25} height={25} alt='icon' />}
            buttonClass=''
          />
        </div>
      </nav>

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
          modalClass='search-container 2xl:hidden xl:hidden md:flex sm:flex w-[95%] mx-auto top-2 right-0 p-5 z-30 absolute rounded-xl'
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

      {cartOpen && (
        <div
          className={clsx(
            'bg-white shadow-2xl h-auto absolute z-20 rounded-lg p-5 flex flex-col gap-5 xl:right-5 xl:w-[20%] xl:top-[6rem] md:w-[60%] sm:w-[95%] sm:right-2 sm:top-[5rem] '
          )}
        >
          <h1 className='font-extrabold uppercase xl:text-2xl '>Your cart</h1>

          {ProductJSON.products.slice(0, 3).map((item, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'flex justify-center items-center gap-3 py-3 ',
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
                  <h4 className='text-base font-semibold '>{item.title}</h4>
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
                        'bg-[#F0F0F0] flex justify-between items-center gap-3 rounded-full p-1 '
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

          <div className='flex justify-between items-center w-full'>
            <Link
              href='/cart'
              onClick={handleCartOpen}
              className='border-[1px] border-gray-400 rounded-md px-4 py-2 '
            >
              View Cart
            </Link>

            <Button
              type='button'
              title='checkout'
              buttonClass='bg-black text-white  px-4 py-2 rounded-md '
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
