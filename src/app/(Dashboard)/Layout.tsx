import React from 'react'

import DashboardNav from '@/components/DashboardNav'

import '@/app/globals.css'
import DashboardHeader from '@/components/DashboardHeader'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex w-full h-screen'>
      <DashboardNav />
      <section className='w-full flex flex-col justify-start items-center gap-3 '>
        <DashboardHeader />
        <div className='3xl:w-[95%] 3xl:h-[90%] 2xl:w-[95%] 2xl:h-[85%] xl:w-[95%] my-auto md:h-[90%] md:w-full sm:h-[90%] sm:w-full '>
          {' '}
          {children}
        </div>
      </section>
    </main>
  )
}
