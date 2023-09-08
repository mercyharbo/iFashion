import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/types/Button'
import InputField from '@/types/InputField'

import hamburger from '@/assets/menu-burger.svg'
import cart from '@/assets/shopping-cart.svg'
import user from '@/assets/circle-user.svg'
import search from '@/assets/search.svg'

const Navbar = () => {
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  return (
    <nav className='flex flex-row justify-between items-center gap-5 xl:p-5 sm:p-5'>
      <div className='flex justify-center items-center gap-3'>
        <Button
          icon={<Image src={hamburger} width={30} height={30} alt='icon' />}
          buttonClass='xl:hidden md:flex sm:flex '
        />
        <h1 className='xl:text-3xl sm:text-3xl font-extrabold uppercase '>
          shop.co
        </h1>
      </div>

      <div className='xl:flex md:hidden sm:hidden justify-center items-center gap-5 capitalize'>
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
