import React from 'react'

export default function Cart() {
  return (
    <main className='flex flex-col justify-start items-start gap-10 mx-auto xl:w-[90%] md:w-full sm:w-full '>
      <h1 className='text-2xl capitalize font-semibold'>your cart</h1>
      <section className='flex xl:flex-row xl:justify-center xl:items-center xl:gap-10'>
        <div className='xl:w-[60%] flex flex-col justify-center items-center gap-5 '></div>
        <div className='xl:w-[60%] flex flex-col justify-center items-center gap-5 '></div>
      </section>
    </main>
  )
}
