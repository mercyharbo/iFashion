'use client'

import React, { useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { getSellerProduct } from '@/redux/Slice/sellerDashboard'
import Image from 'next/image'
import moment from 'moment'
import { MdDelete } from 'react-icons/md'

import Loading from '@/components/Loading'
import clsx from 'clsx'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const sellerProductData = useAppSelector(
    (state) => state.sellerSlice.sellerproduct
  )
  const isLoading = useAppSelector((state) => state.sellerSlice.isLoading)

  useEffect(() => {
    dispatch(getSellerProduct())
  }, [dispatch])

  if (isLoading) return <Loading />

  return (
    <main className=' xl:p-10 rounded-2xl shadow-2xl flex flex-col justify-start items-start gap-5 w-full h-full bg-white '>
      <header className='flex xl:flex-row xl:justify-between xl:items-center w-full '>
        <div className='flex justify-start items-center gap-5'>
          <Formik
            initialValues={{
              sort: '',
              product: '',
              select_product: '',
            }}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            <Form className='flex justify-start items-start gap-5'>
              <div className='relative'>
                <Field
                  type='text'
                  name='product'
                  id='product'
                  className='w-[20rem] h-[3rem] px-5 rounded-lg border border-gray-300 outline-none '
                  placeholder='Search product...'
                />
              </div>
              <Field
                as='select'
                name='sort'
                className='w-full h-[3rem] px-5 rounded-lg border border-gray-300 '
              >
                <option value=''>Store name</option>
              </Field>
            </Form>
          </Formik>
        </div>

        <button className='flex justify-center items-center gap-1 bg-black text-white py-3 px-5 rounded-lg'>
          <BiPlus className='text-2xl' />
          Add product
        </button>
      </header>

      <div className='py-10 w-full'>
        <table className='min-w-full '>
          <thead>
            <tr className='border-b border-gray-300'>
              <th scope='col' className='p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label htmlFor='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </th>
              <th className='py-2 px-4 font-semibold'>SKU</th>
              <th className='py-2 px-4 font-semibold'>Product</th>
              <th className='py-2 px-4 font-semibold'>Date</th>
              <th className='py-2 px-4 font-semibold'></th>
              <th className='py-2 px-4 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {sellerProductData?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className={clsx(
                    'text-center h-[4rem] border-b hover:bg-[#F5F7F8] cursor-pointer '
                  )}
                >
                  <td className='w-4 p-4'>
                    <div className='flex items-center'>
                      <input
                        id='checkbox-table-search-1'
                        type='checkbox'
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      />
                      <label
                        htmlFor='checkbox-table-search-1'
                        className='sr-only'
                      >
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td>111</td>
                  <td>
                    <div className='flex justify-center items-center gap-3 font-semibold'>
                      <Image
                        src={item.images?.[0]}
                        alt={item.title}
                        width={50}
                        height={50}
                        className='object-cover rounded-xl w-[60px] h-[50px] flex justify-center items-center '
                      />
                      <span className=' flex justify-center items-center'>
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td>{moment(item.createdDate).format('ll')}</td>
                  <td>
                    <button
                      type='button'
                      className='bg-black py-2 px-5 text-white rounded-md capitalize '
                    >
                      download qr code
                    </button>
                  </td>
                  <td>
                    <div className='flex justify-center items-center gap-3'>
                      <button type='button' className='text-2xl text-gray-500'>
                        <BiEdit />{' '}
                      </button>
                      <button type='button' className='text-2xl text-gray-500'>
                        <MdDelete />{' '}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
