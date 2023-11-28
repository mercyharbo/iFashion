'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiMagnifyingGlass, HiOutlineBars3BottomRight } from 'react-icons/hi2'
import { IoIosArrowDown } from 'react-icons/io'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { AppDispatch, useAppSelector } from '@/redux/Store'
import {
  BiBell,
  BiHome,
  BiLogOut,
  BiShoppingBag,
  BiStore,
  BiUser,
} from 'react-icons/bi'

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
    <nav className='relative flex justify-between items-center bg-white shadow-lg h-[4rem] w-full xl:px-10 md:px-10 sm:px-5 '>
      <h1 className='font-semibold capitalize text-2xl '>Dashboard</h1>

      <div className='flex justify-start items-start gap-5'>
        <div className='xl:flex md:flex sm:hidden justify-start items-center gap-5'>
          {/* <Image
          src={user?.profile_picture || ''}
          alt={user?.firstName || ''}
          width={100}
          height={100}
          className='object-cover object-top rounded-full'
        /> */}

          <button type='button' className='text-2xl'>
            <HiMagnifyingGlass />
          </button>
          <button type='button' className='text-2xl'>
            <BiBell />
          </button>
          <Link
            href='/profile'
            className='font-semibold flex justify-start items-center gap-2'
          >
            {user ? `Welcome, ${user?.firstName}` : ''}
            <IoIosArrowDown />
          </Link>
        </div>
        <button
          type='button'
          onClick={() => setIsNavModal(true)}
          className='xl:hidden md:flex sm:flex text-2xl'
        >
          <HiOutlineBars3BottomRight />
        </button>
      </div>

      {isNavOpen && (
        <>
          <div
            onClick={() => setIsNavModal(false)}
            className='bg-[#0000008f] fixed h-screen w-full top-0 left-0 '
          ></div>
          <div className='flex flex-col justify-start items-start gap-5 bg-black rounded-2xl w-[90%] absolute top-2 left-4 z-10 shadow-2xl p-5 '>
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              {navItems.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={clsx(
                      'flex justify-start items-center gap-2 py-3 px-2 w-full rounded-xl capitalize hover:bg-white hover:text-black',
                      pathname === item.href
                        ? 'bg-white text-black '
                        : ' text-white'
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
              className='py-3 w-full capitalize pl-2 flex justify-start items-center gap-2 text-white'
            >
              <BiLogOut />
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  )
}
