'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiHeart, BiHistory, BiUser } from 'react-icons/bi'

const navLinks = [
  { id: 1, name: 'my account', href: '/profile', icon: <BiUser /> },
  { id: 2, name: 'history', href: '/profile/history', icon: <BiHistory /> },
  { id: 3, name: 'wishlist', href: '/profile/wishlist', icon: <BiHeart /> },
]

export default function ProfileNav() {
  const pathname = usePathname()

  return (
    <div
      className={clsx(
        'xl:w-[15%] xl:h-[20rem] xl:flex-col xl:py-10 md:py-5 md:h-auto md:flex-row sm:h-auto sm:py-5 sm:flex-row flex flex-col justify-start items-start gap-2 bg-white rounded-lg px-2 capitalize shadow-2xl '
      )}
    >
      {navLinks.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className={clsx(
              'flex justify-start items-center gap-2 px-2 py-2 w-full rounded-md hover:bg-black hover:text-white xl:flex-row xl:text-base md:flex-col md:text-base sm:flex-col sm:text-sm',
              pathname === link.href ? 'bg-black text-white  ' : ''
            )}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      })}
    </div>
  )
}
