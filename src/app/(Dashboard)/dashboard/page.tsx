'use client'

import React, { useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/redux/Store'
import { BiCheck, BiEdit, BiPlus } from 'react-icons/bi'
import Image from 'next/image'
import moment from 'moment'
import { MdClose, MdDelete } from 'react-icons/md'
import {
  getSellerProduct,
  setIsModalOpen,
  setSellerProductdetails,
} from '@/redux/Slice/sellerDashboard'
import Loading from '@/components/Loading'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sellerProductData = useAppSelector(
    (state) => state.sellerSlice.sellerproduct
  )
  const isLoading = useAppSelector((state) => state.sellerSlice.isLoading)
  const productDetails = useAppSelector(
    (state) => state.sellerSlice.sellerProductDetails
  )
  const isModalOpen = useAppSelector((state) => state.sellerSlice.isModalOpen)

  const getProduct = async (id: string) => {
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

  const updateProduct = async () => {
    const token = localStorage.getItem('token')
    setIsSubmitting(true)
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/products/${productDetails?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productDetails),
        }
      )

      const data = await response.json()
      if (data?.success === true) {
        toast.success('Product updated successfully')
        setIsSubmitting(false)
        dispatch(setIsModalOpen(false))
        window.location.reload()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error, 'An error occurred while fetching update product')
    }
  }

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${process.env.BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data?.success === true) {
        toast.success('Product Deleted successfully')
        window.location.reload()
      } else {
        toast.error(data.message)
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

      <div className='p-5 w-full'>
        <div className='flex justify-between items-center gap-5 border-b py-3'>
          <span className='font-semibold capitalize 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[40%] sm:w-[40%] '>
            product
          </span>
          <span className='font-semibold capitalize 2xl:w-[10%] xl:w-[10%] xl:flex lg:w-[10%] md:hidden md:w-[5%] sm:hidden sm:w-[5%] '>
            in-stock
          </span>
          <span className='font-semibold capitalize 2xl:w-[20%] xl:w-[20%] lg:w-[20%]  md:w-[20%] sm:w-[20%] '>
            date
          </span>
          <span className='font-semibold capitalize 2xl:w-[20%] xl:w-[20%] lg:w-[20%] md:w-[20%] sm:w-[20%] '>
            actions
          </span>
        </div>
        {sellerProductData?.map((item) => {
          return (
            <div
              key={item._id}
              className='flex justify-between items-center gap-5 w-full py-5'
            >
              <div className='2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[40%] sm:w-[40%] flex justify-start items-center gap-3 font-semibold'>
                <Image
                  src={item.images?.[0]}
                  alt={item.title}
                  width={50}
                  height={50}
                  className='object-cover rounded-xl w-[5rem] h-[4rem] xl:flex md:hidden sm:hidden '
                />
                <span className='xl:text-lg md:text-xl sm:text-sm'>
                  {item.title}
                </span>
              </div>

              <span className='2xl:w-[10%] xl:w-[10%] xl:flex lg:w-[10%] md:hidden md:w-[5%] sm:hidden sm:w-[5%] '>
                {item.inStock}
              </span>
              <span className='2xl:w-[20%] xl:w-[20%] lg:w-[20%] md:w-[20%] sm:w-[20%] xl:text-lg md:text-xl sm:text-sm'>
                {moment(item.createdDate).format('l')}
              </span>
              <div className='2xl:w-[20%] xl:w-[20%] lg:w-[20%] md:w-[20%] sm:w-[20%] flex justify-start items-start gap-5 '>
                <button
                  type='button'
                  onClick={() => getProduct(item._id)}
                  className='text-2xl text-gray-500'
                >
                  <BiEdit />{' '}
                </button>
                <button
                  type='button'
                  onClick={() => deleteProduct(item._id)}
                  className='text-2xl text-gray-500'
                >
                  <MdDelete />{' '}
                </button>
              </div>
            </div>
          )
        })}
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
                    onClick={() => deleteProduct(productDetails._id)}
                    className='border py-3 px-5 rounded-lg bg-transparent flex justify-center items-center gap-2 capitalize'
                  >
                    <MdDelete className='text-xl' /> delete
                  </button>
                  <button
                    type='button'
                    onClick={() => updateProduct()}
                    className='border py-3 px-5 rounded-lg bg-slate-700 text-white flex justify-center items-center gap-2 capitalize'
                  >
                    {isSubmitting ? (
                      'Saving'
                    ) : (
                      <div className='flex justify-center items-center gap-2'>
                        {' '}
                        <BiCheck className='text-xl' /> save
                      </div>
                    )}
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
                          key={img}
                          src={img}
                          alt='Product image'
                          width={200}
                          height={200}
                          className='object-cover rounded-lg 3xl:w-[200px] 3xl:h-[200px] 2xl:w-[150px] 2xl:h-[150px] xl:w-[100px] xl:h-[100px] md:w-[80px] md:h-[80px]
                          sm:w-[80px] sm:h-[80px] '
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

                <div className='flex justify-start items-start gap-5 w-full xl:flex-row md:flex-row sm:flex-col'>
                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>price</p>

                    <input
                      type='number'
                      name='price'
                      id='price'
                      value={productDetails?.price || ''}
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
                            key={code}
                            className={clsx(`rounded-md w-[2rem] h-[2rem] `)}
                            style={{ backgroundColor: code }}
                          ></span>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className='flex justify-start items-start gap-5 w-full xl:flex-row md:flex-row sm:flex-col'>
                  <div className='flex flex-col justify-start items-start gap-3 w-full '>
                    <p className='font-medium capitalize '>In-Stock</p>

                    <input
                      type='number'
                      name='inStock'
                      id='inStock'
                      value={productDetails.inStock || ''}
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
                      value={productDetails.discount || ''}
                      onChange={handleInputChange}
                      className='py-3 border px-4 rounded-md w-full'
                    />
                  </div>
                </div>

                <div className='flex flex-col justify-start items-start gap-3 3xl:w-[50%] 2xl:w-[50%] xl:w-[50%] lg:w-[50%] md:w-full sm:w-full '>
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
