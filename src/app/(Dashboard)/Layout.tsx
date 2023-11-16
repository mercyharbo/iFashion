import React from 'react'

import DashboardNav from '@/components/DashboardNav'

import '@/app/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex gap-5 w-full h-screen'>
      <DashboardNav />
      <section className='3xl:w-[83%] 3xl:h-[95%] xl:w-[80%] my-auto md:h-[90%] md:w-full sm:h-[90%] sm:w-full  '>
        {children}
      </section>
    </main>
  )
}
