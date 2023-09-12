import React, { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

import LinkButton from '@/types/LinkButton'

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.from('.content-container h1', {
      opacity: 0,
      x: -100,
      duration: 1,
    })
      .from('.content-container p', {
        opacity: 0,
        x: -100,
        duration: 1,
      })
      .from('.content-container .btn', {
        opacity: 0,
        x: -100,
        duration: 1,
      })
      .from('.heroImg', {
        x: 100,
        opacity: 0,
        duration: 1,
      })
  }, [])

  return (
    <section className='bg-[#F2F0F1] '>
      <div
        className='grid w-full xl:grid-cols-2 xl:px-14 xl:content-center xl:place-items-center md:grid-cols-2 md:content-center md:place-items-center md:px-0 sm:grid-cols-1
      sm:content-center sm:place-items-center sm:gap-5   '
      >
        <div className='content-container flex flex-col justify-start items-start gap-5 xl:pl-0 md:py-14 md:pl-10 sm:px-5 sm:py-10 '>
          <h1 className='3xl:text-7xl 3xl:leading-[80px] 2xl:text-5xl 2xl:leading-[70px] xl:text-4xl xl:leading-[40px] md:text-3xl sm:text-2xl font-extrabold '>
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

        <Image
          src='/model1.png'
          width={1000}
          height={1000}
          alt='model'
          className='heroImage heroImg object-cover mr-[8rem] h-full '
        />
      </div>
    </section>
  )
}

export default Hero
