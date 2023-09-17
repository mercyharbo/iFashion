'use client'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

import Button from '@/types/Button'
import InputField from '@/types/InputField'

// Icons
import hamburger from '@/assets/menu-burger.svg'
import cart from '@/assets/shopping-cart.svg'
import user from '@/assets/circle-user.svg'
import search from '@/assets/search.svg'

import { AppDispatch, useAppSelector } from '@/redux/Store'
import { closeModal, openModal } from '@/redux/Slice/ModalSlice'
import {
  closeSearchModal,
  openSearchModal,
} from '@/redux/Slice/SearchModalSlice'
import Modal from '@/types/Modal'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  const handleNavClose = () => {
    dispatch(closeModal())
  }

  const handleSearchModal = () => {
    dispatch(closeSearchModal())
  }

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

  return (
    <>
      <nav className='fixed-header relative z-10 flex flex-row justify-between items-center gap-5 w-full xl:p-5 sm:p-5'>
        <div className='flex justify-center items-center gap-3'>
          <Button
            onClick={handleOpenModal}
            icon={<Image src={hamburger} width={25} height={25} alt='icon' />}
            buttonClass='xl:hidden md:hidden sm:flex '
          />
          <h1 className='xl:text-3xl sm:text-xl font-extrabold uppercase '>
            shop.co
          </h1>
        </div>

        <div className='xl:flex md:flex sm:hidden justify-center items-center gap-5 capitalize'>
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
          placeholder='Search for products...'
          inputClass='xl:flex xl:w-[30rem] md:hidden sm:hidden  '
        />

        <div className='flex justify-center items-center gap-4 relative'>
          <Button
            onClick={() => dispatch(openSearchModal())}
            icon={<Image src={search} width={25} height={25} alt='icon' />}
            buttonClass='xl:hidden md:flex sm:flex '
          />
          <Button
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
    </>
  )
}

export default Navbar
