'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

import Button from '@/types/Button'
import InputField from '@/types/InputField'

// Icons
import hamburger from '@/assets/menu-burger.svg'
import cart from '@/assets/shopping-cart.svg'
import user from '@/assets/circle-user.svg'
import search from '@/assets/search.svg'

import { AppDispatch } from '@/redux/Store'
import { openModal } from '@/redux/Slice/ModalSlice'
import { openSearchModal } from '@/redux/Slice/SearchModalSlice'

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  const handleOpenModal = () => {
    dispatch(openModal())
  }

  return (
    <nav className='relative z-10 flex flex-row justify-between items-center gap-5 w-full xl:p-5 sm:p-5'>
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
            <Link href={items} key={key}>
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
          buttonClass=''
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
  )
}

export default Navbar
