'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import clsx from 'clsx'
import { BiEdit } from 'react-icons/bi'
import gsap from 'gsap'
import { setUpdateProfileModal } from '@/redux/Slice/ModalSlice'
import { MdClose } from 'react-icons/md'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import moment from 'moment'

interface Values {
  email: string
  address: string
  gender: string
  phoneNumber: string
  dateOfBirth: any
  firstName: string
  lastName: string
}

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const user = useAppSelector((state) => state.userProfile.user)
  const updateProfileModal = useAppSelector(
    (state) => state.modalReducer.modal.updateProfileModal
  )

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      '.account-overview',
      { x: 100, opacity: 0 },
      { x: 0, duration: 1, ease: 'power2.inOut', delay: 0.5, opacity: 1 }
    ).fromTo(
      '.overview-items',
      { x: -20, opacity: 0 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      }
    )
  }, [])

  const handleUpdateProfile = async (values: Values) => {
    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${process.env.BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (data.success === true) {
        toast.success(data.message)
        setIsSubmitting(false)
        dispatch(setUpdateProfileModal(false))

        window.location.reload()
      } else {
        toast.error(data.message)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    dispatch(setUpdateProfileModal(!updateProfileModal))
  }

  const userDateOfBirth = user?.dateOfBirth
    ? moment(user.dateOfBirth).format('YYYY-MM-DD')
    : ''

  return (
    <>
      <main
        className={clsx(
          'account-overview flex flex-col justify-center items-center bg-white shadow-2xl rounded-xl w-full xl:p-10 xl:gap-10 md:p-10 md:gap-5 sm:px-5 sm:py-10 sm:gap-5 '
        )}
      >
        <h1 className='3xl:text-4xl 2xl:text-4xl xl:text-4xl md:text-3xl sm:text-2xl capitalize font-medium mr-auto '>
          account overview
        </h1>
        <section
          className={clsx(
            'overview-items flex w-full xl:flex-row xl:justify-between xl:items-start xl:gap-10 md:flex-col md:justify-center md:items-center md:gap-10 sm:flex-col sm:justify-center sm:items-center sm:gap-10'
          )}
        >
          <div
            className={clsx(
              ' border-[1px] rounded-md p-5 flex flex-col justify-start items-start gap-4 w-full '
            )}
          >
            <div className='flex justify-between items-center border-b-[1px] w-full pb-3 '>
              <h3 className='font-medium '>Account details</h3>
              <button
                type='button'
                onClick={() =>
                  dispatch(setUpdateProfileModal(!updateProfileModal))
                }
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
              {user?.dateOfBirth
                ? moment(user.dateOfBirth).format('LL')
                : 'Not filled'}
            </p>
          </div>

          <div
            className={clsx(
              'border-[1px] rounded-md p-5 flex flex-col justify-start items-start gap-2 w-full '
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

      {updateProfileModal && (
        <>
          <span
            onClick={handleCloseModal}
            className='fixed h-screen w-full top-0 left-0 bg-[#0000006e] z-20 '
          ></span>
          <div className='3xl:h-screen 3xl:fixed 3xl:top-0 2xl:absolute 2xl:top-10 2xl:h-screen xl:h-screen xl:absolute xl:top-0 lg:absolute lg:top-10 md:fixed md:h-screen sm:h-auto sm:absolute sm:top-0 top-0 left-0 w-full flex items-center justify-center z-20    '>
            <div className='bg-white shadow-2xl rounded-xl p-10 xl:w-[50%] md:w-[80%] sm:w-full'>
              <div className='flex justify-between items-center w-full pb-3'>
                <h3 className='font-medium capitalize'>Update details</h3>

                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='text-2xl'
                >
                  <MdClose />
                </button>
              </div>
              <hr className='w-full' />

              <Formik
                initialValues={{
                  email: user?.email || '',
                  gender: user?.gender || '',
                  address: user?.address || '',
                  dateOfBirth: userDateOfBirth || null,
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  phoneNumber: user?.phoneNumber || '',
                }}
                onSubmit={(values: Values, {}: FormikHelpers<Values>) => {
                  handleUpdateProfile(values)
                  // alert('Form submitted with values: ' + JSON.stringify(values))
                }}
              >
                <Form className='py-5 flex flex-col justify-start items-start gap-5'>
                  <div className='flex justify-between items-center gap-5 w-full'>
                    <div className='flex flex-col justify-start items-start gap-2 w-full'>
                      <label
                        htmlFor='firstName'
                        className='capitalize font-medium'
                      >
                        First Name
                      </label>
                      <Field
                        id='firstName'
                        name='firstName'
                        type='text'
                        className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                      />
                    </div>
                    <div className='flex flex-col justify-start items-start gap-2 w-full'>
                      <label
                        htmlFor='lastName'
                        className='capitalize font-medium'
                      >
                        Last Name
                      </label>
                      <Field
                        id='lastName'
                        name='lastName'
                        type='text'
                        className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                      />
                    </div>
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='email' className='capitalize font-medium'>
                      email
                    </label>
                    <Field
                      id='email'
                      name='email'
                      type='email'
                      disabled
                      className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label
                      htmlFor='dateOfBirth'
                      className='capitalize font-medium'
                    >
                      Date of birth
                    </label>
                    <Field
                      id='dateOfBirth'
                      name='dateOfBirth'
                      type='date'
                      className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='gender' className='capitalize font-medium'>
                      Gender
                    </label>
                    <Field
                      id='gender'
                      name='gender'
                      type='text'
                      className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label
                      htmlFor='phoneNumber'
                      className='capitalize font-medium'
                    >
                      Phone Number
                    </label>
                    <Field
                      id='phoneNumber'
                      name='phoneNumber'
                      type='number'
                      className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-2 w-full'>
                    <label htmlFor='address' className='capitalize font-medium'>
                      Address
                    </label>
                    <Field
                      id='address'
                      name='address'
                      type='text'
                      className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none '
                    />
                  </div>

                  <button
                    type='submit'
                    className='bg-black text-white py-3 px-5 rounded-md ml-auto hover:bg-[red] '
                  >
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </>
      )}
    </>
  )
}
