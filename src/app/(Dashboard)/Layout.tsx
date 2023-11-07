import React from 'react'

import DashboardNav from '@/components/DashboardNav'

import '@/app/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex w-full h-screen'>
      <DashboardNav />
      <section className='xl:w-[80%] md:w-full sm:w-full '>{children}</section>
    </main>
  )
}
