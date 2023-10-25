'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { BiHeart, BiHistory, BiUser } from 'react-icons/bi'
import { MdSettings } from 'react-icons/md'

const navLinks = [
  { id: 1, name: 'my account', href: '/profile', icon: <BiUser /> },
  { id: 2, name: 'history', href: '/profile/history', icon: <BiHistory /> },
  { id: 3, name: 'wishlist', href: '/profile/wishlist', icon: <BiHeart /> },
  // { id: 4, name: 'password', href: '/profile/password', icon: <MdSettings /> },
]

export default function ProfileNav() {
  const pathname = usePathname()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      '.nav-items',
      { x: -100, opacity: 0 },
      { x: 0, duration: 1, ease: 'power2.inOut', opacity: 1 }
    ).fromTo(
      '.nav-links',
      { x: -20, opacity: 0 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.5,
        duration: 0.5,
        ease: 'power2.inOut',
      }
    )
  }, [])

  return (
    <nav
      className={clsx(
        'nav-items 3xl:w-[15%] 2xl:w-[25%] xl:w-[25%] lg:w-[25%] xl:h-[20rem] xl:flex-col xl:py-10 md:py-5 md:h-auto md:flex-row sm:h-auto sm:py-5 sm:flex-row flex flex-col justify-start items-start gap-2 bg-white rounded-lg px-2 capitalize shadow-2xl '
      )}
    >
      {navLinks.map((link) => {
        return (
          <Link
            key={link.id}
            href={link.href}
            className={clsx(
              'nav-links flex justify-start items-center gap-2 px-2 py-2 w-full rounded-md hover:bg-black hover:text-white xl:flex-row xl:text-base md:flex-col md:text-base sm:flex-col sm:text-sm',
              pathname === link.href ? 'bg-black text-white  ' : ''
            )}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}
