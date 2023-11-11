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
import { setIsLoggedIn } from '@/redux/Slice/UserSlice'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
})

interface Values {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const showPassword = useAppSelector(
    (state) => state.searchModalReducer.modal.showPassword
  )

  const handleLogin = async (values: Values) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`${process.env.BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (data.success === true) {
        toast.success(`You're logged in successfully...`)
        localStorage.setItem('token', data.token)
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
          'xl:w-[50%] xl:p-10 md:p-10 md:w-full sm:w-full sm:p-5 flex flex-col justify-start items-start gap-10  '
        )}
      >
        <div className=''>
          <p className='text-[#00000080] capitalize '>welcome back!!! </p>
          <h1
            className={clsx(
              '3xl:text-5xl 2xl:text-5xl xl:text-3xl lg:text-2xl md:text-2xl sm:text-xl capitalize font-semibold '
            )}
          >
            sign in
          </h1>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values: Values, {}: FormikHelpers<Values>) => {
            handleLogin(values)
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
                placeholder='Enter your email'
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
                  placeholder='Enter your password'
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
            <button
              type='submit'
              className='bg-black py-3 w-full rounded-md text-white'
            >
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>
            <p className='text-gray-400 text-center'>
              I don’t have an account ?{' '}
              <Link href='/signup' className='text-[red] font-medium '>
                Sign up
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
