import React from 'react'
import Image from 'next/image'

import { useAppSelector } from '@/redux/Store'

export default function DashboardHeader() {
  //   const user = useAppSelector((state) => state.userProfile.user)

  return (
    <nav className='flex justify-between items-center bg-white shadow-2xl h-[4rem] w-full xl:px-10 '>
      DashboardHeader
      <div className='flex justify-start items-start gap-5'>
        {/* <Image
          src={user?.profile_picture || ''}
          alt={user?.firstName || ''}
          width={100}
          height={100}
          className='object-cover object-top rounded-full'
        /> */}
      </div>
    </nav>
  )
}
