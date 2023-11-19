'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  BiHome,
  BiLogOut,
  BiShoppingBag,
  BiStore,
  BiUser,
} from 'react-icons/bi'

const navItems = [
  { id: 1, title: 'dashboard', href: '/dashboard', icon: <BiHome /> },
  { id: 2, title: 'products', href: '/products', icon: <BiShoppingBag /> },
  { id: 3, title: 'stores', href: '/stores', icon: <BiStore /> },
  { id: 4, title: 'users', href: '/users', icon: <BiUser /> },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className='3xl:w-[20%] xl:w-[25%] xl:flex xl:flex-col xl:justify-between xl:items-start xl:gap-5 xl:py-10 xl:px-5 md:hidden sm:hidden bg-white shadow-2xl '>
      <Link href='/' className='uppercase text-3xl font-bold'>
        shop.co
      </Link>
      <div className='flex flex-col justify-start items-start gap-5 py-5 w-full'>
        {navItems.map((item) => {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                'py-3 w-full capitalize pl-2 flex justify-start items-center gap-2 rounded-md',
                pathname === item.href ? 'bg-blue-300  ' : ''
              )}
            >
              <span className='text-2xl'> {item.icon}</span>
              {item.title}
            </Link>
          )
        })}
      </div>

      <button
        type='button'
        className='py-3 w-full capitalize pl-2 flex justify-start items-center gap-2'
      >
        Logout <BiLogOut />
      </button>
    </nav>
  )
}
