'use client'

import React, { useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { BiCheck, BiEdit, BiPlus } from 'react-icons/bi'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import {
  getSellerProduct,
  setIsModalOpen,
  setSellerProductdetails,
} from '@/redux/Slice/sellerDashboard'
import Image from 'next/image'
import moment from 'moment'
import { MdClose, MdDelete } from 'react-icons/md'

import Loading from '@/components/Loading'
import { setProductDetailsData } from '@/redux/Slice/ProductSlice'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const sellerProductData = useAppSelector(
    (state) => state.sellerSlice.sellerproduct
  )
  const isLoading = useAppSelector((state) => state.sellerSlice.isLoading)
  const productDetails = useAppSelector(
    (state) => state.sellerSlice.sellerProductDetails
  )
  const isModalOpen = useAppSelector((state) => state.sellerSlice.isModalOpen)
  console.log('product details:', productDetails)

  const updateProduct = async (id: string) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data?.success === true) {
        dispatch(setSellerProductdetails(data.product))
        dispatch(setIsModalOpen(true))
      }
    } catch (error) {
      console.log(error, 'An error occurred while fetching update product')
    }
  }

  useEffect(() => {
    dispatch(getSellerProduct())
  }, [dispatch])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      setSellerProductdetails({
        ...productDetails,
        [e.target.name]: e.target.value,
      })
    )
  }

  if (isLoading) return <Loading />

  return (
    <main
      className='xl:w-full xl:p-10 xl:justify-start xl:items-start md:justify-start md:items-start md:w-[90%] sm:w-[90%] mx-auto rounded-2xl shadow-2xl flex flex-col 
     gap-5 h-full bg-white '
    >
      <header className='flex xl:flex-row xl:justify-between xl:items-center md:flex-row md:justify-center md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 sm:flex-col sm:p-5 w-full '>
        <div className='flex xl:justify-start xl:items-center md:justify-center md:items-center sm:justify-center sm:items-center gap-5'>
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
            <Form className='flex gap-5 xl:justify-start xl:items-start xl:flex-row md:flex-row md:justify-center md:items-center sm:justify-center sm:items-center sm:flex-col'>
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

        <button className='flex justify-center items-center gap-1 bg-black text-white py-3 px-5 rounded-lg xl:w-auto md:w-auto sm:w-full'>
          <BiPlus className='text-2xl' />
          Add product
        </button>
      </header>

      <div className='xl:py-10 md:py-10 sm:p-5 w-full'>
        <table className='3xl:w-[70%] 2xl:w-[80%] xl:w-full md:w-full sm:w-full '>
          <thead>
            <tr className='border-b border-gray-300 text-left '>
              <th className='py-2 font-semibold'>Product</th>
              <th className='py-2 font-semibold'>Date</th>

              <th className='py-2 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody className=' w-full'>
            {sellerProductData?.map((item) => {
              return (
                <tr
                  key={item._id}
                  className={clsx(
                    'text-left h-[4rem] border-b hover:bg-[#F5F7F8] cursor-pointer '
                  )}
                >
                  <td>
                    <div className='flex justify-start items-center gap-3 font-semibold'>
                      <Image
                        src={item.images?.[0]}
                        alt={item.title}
                        width={50}
                        height={50}
                        className='object-cover rounded-xl w-[60px] h-[50px] xl:flex md:hidden sm:hidden '
                      />
                      <span className='xl:text-lg md:text-xl sm:text-sm'>
                        {item.title}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className='xl:text-lg md:text-xl sm:text-sm'>
                      {moment(item.createdDate).format('l')}
                    </span>
                  </td>

                  <td>
                    <div className='flex justify-start items-start gap-3 w-full'>
                      <button
                        type='button'
                        onClick={() => updateProduct(item._id)}
                        className='text-2xl text-gray-500'
                      >
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

      {isModalOpen && productDetails && (
        <>
          <div
            onClick={() => dispatch(setIsModalOpen(false))}
            className='bg-[#000000bb] w-full h-screen top-0 left-0 fixed '
          ></div>
          <section className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className='w-[90%] h-[90%] rounded-xl shadow-2xl bg-white overflow-y-auto p-10'>
              <header className='flex justify-between items-center w-full'>
                <button
                  type='button'
                  onClick={() => dispatch(setIsModalOpen(false))}
                  className='p-3 rounded-md shadow-2xl bg-slate-400'
                >
                  <MdClose />
                </button>

                <div className='flex justify-start items-center gap-5'>
                  <button
                    type='button'
                    className='border py-3 px-5 rounded-lg bg-transparent flex justify-center items-center gap-2'
                  >
                    <MdDelete className='text-xl' /> delete
                  </button>
                  <button
                    type='button'
                    className='border py-3 px-5 rounded-lg bg-slate-700 text-white flex justify-center items-center gap-2'
                  >
                    <BiCheck className='text-xl' /> save changes
                  </button>
                </div>
              </header>

              <article className='flex flex-col justify-start items-start gap-10 py-[4rem] 3xl:w-[70%] 2xl:w-[80%] xl:w-full lg:w-full md:w-full sm:w-full '>
                <h2 className='font-medium capitalize text-2xl py-2'>
                  product information:
                </h2>
                <div className='flex flex-col justify-start items-start gap-3 '>
                  <p className='font-medium capitalize '>photos</p>

                  <div className='flex justify-start items-start gap-5 flex-wrap'>
                    {productDetails?.images?.map((img) => {
                      return (
                        <Image
                          src={img}
                          alt='Product image'
                          width={200}
                          height={200}
                          className='object-cover rounded-lg 3xl:w-[200px] 3xl:h-[200px] 2xl:w-[150px] 2xl:h-[150px] xl:w-[100px] xl:h-[100px] md:w-[80px] md:h-[80px]
                          sm:w-[50px] sm:h-[50px] '
                        />
                      )
                    })}
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start gap-3 w-full '>
                  <p className='font-medium capitalize '>name</p>

                  <input
                    type='text'
                    name='title'
                    id='title'
                    value={productDetails?.title || ''}
                    onChange={handleInputChange}
                    className='py-3 border px-4 rounded-md w-full'
                  />
                </div>

                <div className='flex flex-col justify-start items-start gap-3 w-full '>
                  <p className='font-medium capitalize '>description</p>

                  <textarea
                    rows={4}
                    cols={4}
                    name='description'
                    id='description'
                    value={productDetails?.description || ''}
                    onChange={handleInputChange}
                    className='p-4 border rounded-md w-full'
                  />
                </div>

                <div className='flex justify-start items-start gap-5 w-full'>
                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>price</p>

                    <input
                      type='text'
                      name='price'
                      id='price'
                      value={productDetails?.price || 0}
                      onChange={handleInputChange}
                      className='py-3 border px-4 rounded-md w-full'
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>colors</p>

                    <input
                      type='text'
                      name='colors'
                      id='colors'
                      // onChange={handleInputChange}
                      placeholder='Enter your color code'
                      className='py-3 border px-4 rounded-md w-full'
                    />

                    <div className='flex justify-start items-start gap-5'>
                      {productDetails.colors.map((code) => {
                        return (
                          <span
                            className={clsx(`rounded-md w-[2rem] h-[2rem] `)}
                            style={{ backgroundColor: code }}
                          ></span>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className='flex justify-start items-start gap-5 w-full'>
                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>In-Stock</p>

                    <input
                      type='number'
                      name='inStock'
                      id='inStock'
                      value={productDetails.inStock || 0}
                      onChange={handleInputChange}
                      className='py-3 border px-4 rounded-md w-full'
                    />
                  </div>

                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>discount</p>

                    <input
                      type='number'
                      name='discount'
                      id='discount'
                      value={productDetails.discount || 0}
                      onChange={handleInputChange}
                      className='py-3 border px-4 rounded-md w-full'
                    />
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start gap-3 3xl:w-[50%] '>
                  <p className='font-medium capitalize '>category</p>

                  <input
                    type='text'
                    name='category'
                    id='category'
                    value={productDetails.category || ''}
                    onChange={handleInputChange}
                    className='py-3 border px-4 rounded-md w-full'
                  />
                </div>
              </article>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
