'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiOutlineBars3BottomRight } from 'react-icons/hi2'

import { AppDispatch, useAppSelector } from '@/redux/Store'
import {
  BiHome,
  BiLogOut,
  BiShoppingBag,
  BiStore,
  BiUser,
} from 'react-icons/bi'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { fetchUserProfile, setToken } from '@/redux/Slice/UserSlice'

const navItems = [
  { id: 1, title: 'dashboard', href: '/dashboard', icon: <BiHome /> },
  { id: 2, title: 'products', href: '/products', icon: <BiShoppingBag /> },
  { id: 3, title: 'stores', href: '/stores', icon: <BiStore /> },
  { id: 4, title: 'users', href: '/users', icon: <BiUser /> },
]

export default function DashboardHeader() {
  const pathname = usePathname()
  const [isNavOpen, setIsNavModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const token = useAppSelector((state) => state.userProfile.token)
  const user = useAppSelector((state) => state.userProfile.user)

  useEffect(() => {
    const tokenGotten = localStorage.getItem('token')
    dispatch(setToken(tokenGotten))

    dispatch(fetchUserProfile())
  }, [dispatch])

  return (
    <nav className='relative flex justify-between items-center bg-white shadow-2xl h-[4rem] w-full xl:px-10 md:px10 sm:px-5 '>
      <h1 className='font-semibold capitalize text-2xl xl:hidden md:flex sm:flex'>
        shop.co
      </h1>
      <div className='flex justify-start items-start gap-5'>
        {/* <Image
          src={user?.profile_picture || ''}
          alt={user?.firstName || ''}
          width={100}
          height={100}
          className='object-cover object-top rounded-full'
        /> */}
        <span className='font-semibold'>
          {user ? `Welcome, ${user?.firstName}` : ''}
        </span>
      </div>
      <button
        type='button'
        onClick={() => setIsNavModal(true)}
        className='xl:hidden md:flex sm:flex text-2xl'
      >
        <HiOutlineBars3BottomRight />
      </button>

      {isNavOpen && (
        <div className='flex flex-col justify-start items-start gap-5 bg-white rounded-2xl w-[90%] absolute top-2 left-2 '>
          <div className='flex flex-col justify-start items-start gap-2'>
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
        </div>
      )}
    </nav>
  )
}
