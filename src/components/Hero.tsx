import LinkButton from '@/types/LinkButton'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='xl:h-[40rem] md:h-[30rem] bg-[#F2F0F1] '>
      <div className='flex gap-10 mx-auto h-full 3xl:w-[80%] 2xl:w-full 2xl:px-16 xl:w-full xl:flex-row md:flex-row md:w-full md:px-10 sm:flex-col sm:px-5   '>
        <div className='2xl:w-[60%] md:w-[50%] sm:pt-10 m-auto flex flex-col justify-center items-start gap-5 '>
          <h1 className='3xl:text-7xl 2xl:text-6xl xl:text-4xl xl:leading-[80px] md:text-4xl sm:text-4xl font-extrabold '>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className='xl:w-[80%] md:w-full text-[#00000099] '>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <LinkButton
            title='shop now'
            href='clothing'
            linkClass='bg-black text-white h-[50px] capitalize p-3 flex justify-center items-center hover: bg-[] xl:w-[150px] md:w-[150px] sm:w-full '
          />
        </div>

        <div className='mt-auto md:w-[40%] '>
          <Image
            src='/model1.png'
            width={1000}
            height={1000}
            alt='model'
            className='object-cover object-center md:w-full md:h-full '
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
