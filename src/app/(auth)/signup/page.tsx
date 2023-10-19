'use client'

import React, { useState } from 'react'
import clsx from 'clsx'
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { BsEyeFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setShowPassword } from '@/redux/Slice/SearchModalSlice'

const SingupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  firstName: Yup.string()
    .min(2, 'First name is too short')
    .max(50, 'First name is too long')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name is too short')
    .max(50, 'Last name is too long')
    .required('Last name is required'),
})

interface Values {
  email: string
  password: string
  firstName: string
  lastName: string
}

export default function Signup() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const showPassword = useAppSelector(
    (state) => state.searchModalReducer.modal.showPassword
  )

  const handleSignup = async (values: Values) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.BASE_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (data.success === true) {
        toast.success(`Registration successful...`)
        setIsSubmitting(false)
        router.push('/')
      } else {
        toast.error(data.message)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main
      className={clsx(
        'flex m-auto h-screen overflow-hidden xl:flex-row-reverse xl:justify-center xl:items-center xl:px-0 md:flex-col md:justify-center md:items-center md:gap-10 sm:flex-col sm:justify-center sm:items-center sm:gap-10 sm:px-5'
      )}
    >
      <div
        className={clsx(
          'xl:w-[50%] xl:p-10 xl:gap-16 md:gap-10 md:p-10 md:w-full sm:gap-10 sm:w-full sm:p-5 flex flex-col justify-start items-start  '
        )}
      >
        <Link
          href='/'
          className='xl:text-5xl md:text-4xl sm:text-3xl font-bold '
        >
          Shop.co
        </Link>
        <div className=''>
          <p className='text-[#00000080] capitalize '>Hey, you! </p>
          <h1
            className={clsx(
              '3xl:text-5xl 2xl:text-5xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl font-semibold '
            )}
          >
            Create an account
          </h1>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            firstName: '',
            lastName: '',
          }}
          validationSchema={SingupSchema}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            handleSignup(values)
            // setSubmitting(false)
          }}
        >
          <Form className='flex flex-col justify-start items-start gap-5 3xl:w-[70%] 2xl:w-[80%] xl:w-full lg:w-full md:w-full sm:w-full '>
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <label htmlFor='email' className='capitalize font-medium'>
                email
              </label>
              <Field
                id='email'
                name='email'
                placeholder='Enter email'
                type='email'
                className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500'
              />
            </div>
            <div className='flex flex-col justify-start items-start gap-2 w-full'>
              <label htmlFor='password' className='capitalize font-medium'>
                password
              </label>
              <div className='relative w-full'>
                <Field
                  id='password'
                  name='password'
                  placeholder='Enter password'
                  type={showPassword ? 'text' : 'password'}
                  className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                />
                <button
                  type='button'
                  onClick={() => dispatch(setShowPassword(!showPassword))}
                  className='absolute 3xl:top-4 xl:right-4 md:top-4 md:right-3 sm:right-3 sm:top-4'
                >
                  {' '}
                  <BsEyeFill />
                </button>
              </div>
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500'
              />
            </div>
            <div className='flex justify-center items-center gap-5 w-full xl:flex-row md:flex-col sm:flex-col'>
              <div className='flex flex-col justify-start items-start gap-2 w-full'>
                <label htmlFor='email' className='capitalize font-medium'>
                  first name
                </label>
                <Field
                  id='firstName'
                  name='firstName'
                  placeholder='Enter first name'
                  type='text'
                  className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                />
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='text-red-500'
                />
              </div>
              <div className='flex flex-col justify-start items-start gap-2 w-full'>
                <label htmlFor='email' className='capitalize font-medium'>
                  last name
                </label>
                <Field
                  id='lastName'
                  name='lastName'
                  placeholder='Enter last name'
                  type='text'
                  className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                />
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='text-red-500'
                />
              </div>
            </div>

            <button
              type='submit'
              className='bg-black py-3 w-full rounded-md text-white'
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
            <p className='text-gray-400 text-center'>
              Already have an account ?{' '}
              <Link href='/login' className='text-[red] font-medium '>
                Login
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
      <div
        className={clsx(
          'xl:w-[50%] xl:flex md:hidden sm:hidden flex-col justify-start items-start gap-5 bg-[#FFCEAE] w-full h-screen '
        )}
      >
        <Image
          src='/shopping.png'
          alt='shopping cart'
          width={1000}
          height={1000}
          className='object-cover'
        />
      </div>
    </main>
  )
}
