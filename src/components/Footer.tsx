import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import InputField from '@/types/InputField'
import Button from '@/types/Button'

import facebook from '@/assets/facebook.png'
import twitter from '@/assets/twitter.png'
import github from '@/assets/github.png'
import instagram from '@/assets/instagram.png'

import paypal from '@/assets/paypal_196566.png'
import visa from '@/assets/visa.png'
import applepay from '@/assets/cc-apple-pay_6422266.png'
import inbox from '@/assets/envelope.svg'

function Footer() {
  return (
    <>
      <section
        // ref={addToRefs}
        className='bg-black text-white flex rounded-2xl xl:mx-auto xl:relative xl:top-[5rem] xl:z-10 xl:h-[10rem] xl:flex-row xl:justify-between xl:w-[80%] 
        xl:items-center xl:px-16 md:flex-col md:justify-center md:items-center md:gap-5 md:relative md:top-[5rem] md:z-10 sm:static sm:flex-col sm:justify-center 
        sm:items-center sm:gap-5 sm:mx-5 sm:p-4 '
      >
        <h1 className='2xl:text-4xl xl:text-4xl xl:w-[50%] md:w-full md:text-4xl sm:w-full sm:text-2xl font-bold uppercase '>
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>

        <div className='newsletter-form flex flex-col justify-center items-center gap-3 3xl:w-[30%] 2xl:w-[40%] xl:w-[40%] md:w-full sm:w-full '>
          <InputField
            placeholder='Enter your email address'
            type='email'
            icon={
              <Image src={inbox} width={20} height={20} alt='Envelope icon' />
            }
            inputClass='pl-10 text-black'
            inputWrapper='w-full relative'
          />
          <Button
            type='button'
            title='subscribe to newsletter'
            buttonClass='rounded-full h-[45px] py-2 bg-[#fff] text-black font-medium w-full '
          />
        </div>
      </section>
      <footer
        // ref={addToRefs}
        className='bg-[#F0F0F0] w-full relative flex flex-col justify-center items-center gap-10 '
      >
        <div className='w-full xl:pt-[8rem] md:pt-[8rem] md:w-full md:px-10 sm:w-full sm:py-10 sm:px-5 flex flex-col justify-center items-center gap-10 '>
          <div className='grid xl:grid-cols-5 xl:content-center xl:place-items-center xl:gap-10 md:grid-cols-3 sm:grid-cols-1 sm:gap-10 '>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-4xl md:text-3xl sm:text-2xl font-bold uppercase'>
                {' '}
                shop.co{' '}
              </h3>
              <p className=' text-[#858282] '>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className='flex justify-start items-center gap-5'>
                <Link href={'/'}>
                  <Image
                    src={facebook}
                    width={25}
                    height={25}
                    alt='facebook icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={twitter}
                    width={25}
                    height={25}
                    alt='twitter icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={instagram}
                    width={25}
                    height={25}
                    alt='instagram icon'
                  />
                </Link>
                <Link href={'/'}>
                  <Image
                    src={github}
                    width={25}
                    height={25}
                    alt='github icon'
                  />
                </Link>
              </div>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> company </h3>
              <p className='capitalize text-[#858282] '>about</p>
              <p className='capitalize text-[#858282] '>features</p>
              <p className='capitalize text-[#858282] '>works</p>
              <p className='capitalize text-[#858282] '>career</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> help </h3>
              <p className='capitalize text-[#858282]'>customer support</p>
              <p className='capitalize text-[#858282]'>delivery details</p>
              <p className='capitalize text-[#858282]'>terms & conditions</p>
              <p className='capitalize text-[#858282]'>privacy policy</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> faq </h3>
              <p className='capitalize text-[#858282]'>account</p>
              <p className='capitalize text-[#858282]'>manage deliveries</p>
              <p className='capitalize text-[#858282]'>orders</p>
              <p className='capitalize text-[#858282]'>payments</p>
            </div>
            <div className='flex flex-col justify-start items-start gap-3 '>
              <h3 className='xl:text-lg font-medium uppercase'> resources </h3>
              <p className='capitalize text-[#858282]'>free ebooks</p>
              <p className='capitalize text-[#858282]'>development tutorial</p>
              <p className='capitalize text-[#858282]'>how to - blog</p>
              <p className='capitalize text-[#858282]'>youtube playlist</p>
            </div>
          </div>
          <hr className='w-full' />
          <div
            className='flex w-full xl:flex-row xl:justify-between xl:items-center md:flex-col-reverse md:justify-center md:items-center sm:flex-col-reverse 
            sm:justify-center sm:items-center sm:gap-5 '
          >
            <span className=''>Shop.co © 2000-2023, All Rights Reserved</span>
            <div className='flex justify-center items-center gap-5'>
              <Image src={visa} width={30} height={30} alt='github icon' />
              <Image src={applepay} width={30} height={30} alt='github icon' />
              <Image src={paypal} width={30} height={30} alt='github icon' />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
