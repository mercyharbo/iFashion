'use client'

import React, { useEffect } from 'react'
import clsx from 'clsx'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { useDispatch } from 'react-redux'
import { BiEdit } from 'react-icons/bi'

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.userProfile.user)

  return (
    <main
      className={clsx(
        'flex flex-col justify-start items-start bg-white shadow-2xl rounded-lg w-full xl:p-10 xl:gap-10 md:p-10 md:gap-5 sm:p-5 sm:gap-5 '
      )}
    >
      <h1 className='3xl:text-4xl 2xl:text-4xl xl:text-4xl md:text-3xl sm:text-2xl capitalize font-medium '>
        account overview
      </h1>
      <section
        className={clsx(
          'grid w-full xl:grid-cols-2 xl:content-between xl:place-items-center xl:gap-10 md:grid-cols-1 md:content-center md:place-items-center md:gap-10 sm:grid-cols-1 sm:content-center sm:place-items-center sm:gap-10'
        )}
      >
        <div
          className={clsx(
            'border-[1px] rounded-md p-5 flex flex-col justify-start items-start gap-4 w-full '
          )}
        >
          <div className='flex justify-between items-center border-b-[1px] w-full pb-3 '>
            <h3 className='font-medium '>Account details</h3>
            <button
              type='button'
              className='hover:text-[red]  rounded-md p-2 flex justify-center items-center gap-1  '
            >
              <BiEdit /> Edit
            </button>
          </div>
          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Name</span>
            {user?.firstName} {user?.lastName}
          </p>

          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Email</span>
            {user?.email}
          </p>
          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Gender</span>
            {user?.gender ? user.gender : 'Not filled'}
          </p>
          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Address</span>{' '}
            {user?.address ? user.address : 'Not filled'}
          </p>
          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Phone Number</span>{' '}
            {user?.phoneNumber ? user.phoneNumber : 'Not filled'}
          </p>
          <p
            className={clsx(
              'flex flex-col justify-start items-start gap-2 font-medium'
            )}
          >
            <span className='text-gray-400 font-normal'>Date of birth</span>{' '}
            {user?.dateOfBirth ? user.dateOfBirth : 'Not filled'}
          </p>
        </div>

        <div
          className={clsx(
            'border-[1px] rounded-md p-5 flex flex-col justify-start items-start gap-2 w-full h-full '
          )}
        >
          <div className='flex justify-between items-center border-b-[1px] w-full pb-3 '>
            <h3 className='font-medium '>Address book</h3>
            <button
              type='button'
              className='hover:text-[red]  rounded-md p-2 flex justify-center items-center gap-1  '
            >
              <BiEdit /> Edit
            </button>
          </div>

          <h3 className='font-medium'>Your default shipping address:</h3>
          <div className='flex flex-col justify-start items-start gap-2'>
            <p className='text-gray-400'>
              {' '}
              {user?.firstName} {user?.lastName}
            </p>
            <p className='text-gray-400'>
              37 Yakubu Gowon Way, Plateau, Jos, Nigeria
            </p>
            <p className='text-gray-400'>0704 305 0439</p>
          </div>
        </div>
      </section>
    </main>
  )
}
