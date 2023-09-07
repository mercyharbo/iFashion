import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='xl:h-[40rem] bg-[#F2F0F1] '>
      <div className='flex gap-10 mx-auto h-full xl:w-[80%]  '>
        <div className='xl:w-[60%] m-auto '>
          <h1 className='xl:text-7xl xl:leading-[80px] font-extrabold '>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className='xl:w-[70%] text-[#00000099] '>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
        </div>

        <div className='mt-auto '>
          <Image src='/model3.png' width={1000} height={1000} alt='model' className='object-cover object-center' />
        </div>
      </div>
    </section>
  )
}

export default Hero
