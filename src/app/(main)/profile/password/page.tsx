'use client'

import React, { useState } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsEyeFill } from 'react-icons/bs'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { setIsSubmitting } from '@/redux/Slice/UserSlice'

interface Values {
  oldPassword: string
  newPassword: string
}

export default function Password() {
  const dispatch = useDispatch<AppDispatch>()
  const [isPasswordHide, setIsPasswordHide] = useState(true)
  const user = useAppSelector((state) => state.userProfile.user)
  const isSubmitting = useAppSelector((state) => state.userProfile.isSubmitting)

  const handleUpdateProfile = async (values: Values) => {
    dispatch(setIsSubmitting(true))
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.BASE_URL}/user/change-password`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )

      const data = await response.json()
      if (data.success === true) {
        toast.success(data.message)
        dispatch(setIsSubmitting(false))

        window.location.reload()
      } else {
        toast.error(data.message)
        dispatch(setIsSubmitting(false))
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user?.email, 'as email...')

  return (
    <main className='flex flex-col justify-start items-start gap-5 bg-white shadow-2xl rounded-xl p-5 xl:w-[50%] '>
      <h1 className='text-2xl font-semibold '>Change password</h1>

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
        }}
        onSubmit={(values: Values, {}: FormikHelpers<Values>) => {
          handleUpdateProfile(values)
        }}
      >
        <Form className='py-5 flex flex-col justify-start items-start gap-5 w-full'>
          <div className='flex flex-col justify-start items-start gap-2 w-full relative'>
            <label htmlFor='oldPassword' className='capitalize font-medium'>
              Old password
            </label>
            <Field
              id='oldPassword'
              name='oldPassword'
              type={isPasswordHide ? 'password' : 'text'}
              className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
            />
            <button
              type='button'
              onClick={() => setIsPasswordHide(!isPasswordHide)}
              className='absolute top-[3rem] right-2'
            >
              <BsEyeFill className='text-xl' />
            </button>
          </div>

          <div className='flex flex-col justify-start items-start gap-2 w-full relative'>
            <label htmlFor='newPassword' className='capitalize font-medium'>
              new password
            </label>
            <Field
              id='newPassword'
              name='newPassword'
              type={isPasswordHide ? 'password' : 'text'}
              className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
            />
            <button
              type='button'
              onClick={() => setIsPasswordHide(!isPasswordHide)}
              className='absolute top-[3rem] right-2'
            >
              <BsEyeFill className='text-xl' />
            </button>
          </div>

          <button
            type='submit'
            className='bg-black text-white py-3 px-5 rounded-md ml-auto hover:bg-[red] '
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </Form>
      </Formik>
    </main>
  )
}
