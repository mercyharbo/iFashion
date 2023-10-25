'use client'

import React, { useState } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { BsEyeFill } from 'react-icons/bs'

interface Values {
  oldPassword: string
  newPassword: string
}

export default function Password() {
  const [isPasswordHide, setIsPasswordHide] = useState(true)

  return (
    <main className='flex flex-col justify-start items-start gap-5 bg-white shadow-2xl rounded-xl p-5 xl:w-[50%] '>
      <h1 className='text-2xl font-semibold '>Change password</h1>

      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
        }}
        onSubmit={(values: Values, {}: FormikHelpers<Values>) => {
          //   handleUpdateProfile(values)
          // alert('Form submitted with values: ' + JSON.stringify(values))
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
              onClick={() => setIsPasswordHide(true)}
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
            {/* {isSubmitting ? 'Updating...' : 'Update'} */}
          </button>
        </Form>
      </Formik>
    </main>
  )
}
