'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/types/Button'
import InputField from '@/types/InputField'

import hamburger from '@/assets/menu-burger.svg'
import cart from '@/assets/shopping-cart.svg'
import user from '@/assets/circle-user.svg'
import search from '@/assets/search.svg'
import Modal from '@/types/Modal'

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <nav className='relative flex flex-row justify-between items-center gap-5 w-full xl:p-5 sm:p-5'>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalClass='w-[90%] mx-auto top-5 left-4 p-5  '
        contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold'
      >
        {NavItems.map((items, key) => {
          return (
            <Link href={items} key={key}>
              {items}
            </Link>
          )
        })}
      </Modal>

      <div className='flex justify-center items-center gap-3'>
        <Button
          onClick={openModal}
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
        inputClass='rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] xl:w-[30rem] xl:flex md:hidden sm:hidden '
      />

      <div className='flex justify-center items-center gap-4'>
        <Button
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
