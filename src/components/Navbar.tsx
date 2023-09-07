import InputField from '@/types/InputField'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  return (
    <nav className='xl:flex xl:flex-row xl:justify-between xl:items-center xl:gap-10 xl:p-5'>
      <h1 className='xl:text-3xl font-extrabold uppercase '>shop.co</h1>

      <div className='flex justify-center items-center gap-5 capitalize'>
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
        inputClass='rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] xl:w-[30rem] '
      />

      <div className=''>
        <span>cart</span>
        <span>profile</span>
      </div>
    </nav>
  )
}

export default Navbar
