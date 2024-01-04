import React from 'react'
import clsx from 'clsx'
import { Inter } from 'next/font/google'

import DashboardNav from '@/components/DashboardNav'
import DashboardHeader from '@/components/DashboardHeader'

import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={clsx('flex w-full h-screen', inter.className)}>
      <DashboardNav />
      <section className='3xl:w-[80%] 2xl:w-[85%] xl:w-[75%] md:w-full sm:w-full flex flex-col justify-start items-center gap-3 '>
        <DashboardHeader />
        <div className='3xl:w-[95%] 3xl:h-[90%] 2xl:w-[95%] 2xl:h-[85%] xl:w-[95%] my-auto md:h-[90%] md:w-full sm:h-[90%] sm:w-full '>
          {' '}
          {children}
        </div>
      </section>
    </main>
  )
}
