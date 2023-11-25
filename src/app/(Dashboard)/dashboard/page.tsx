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
import { toast } from 'react-toastify'

import {
  getSellerProduct,
  setIsModalOpen,
  setOpenAddProductModal,
  setSellerProductdetails,
} from '@/redux/Slice/sellerDashboard'
import Loading from '@/components/Loading'

import FormikField from '@/components/FormikField'
import FormikTextarea from '@/components/FormikTextarea'
import DropzoneComponent from '@/components/ImageUploader'
import AddField from '@/components/AddField'

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [valuesArray, setValuesArray] = useState<string[]>([])

  const sellerProductData = useAppSelector(
    (state) => state.sellerSlice.sellerproduct
  )
  const isLoading = useAppSelector((state) => state.sellerSlice.isLoading)
  const productDetails = useAppSelector(
    (state) => state.sellerSlice.sellerProductDetails
  )
  const isModalOpen = useAppSelector((state) => state.sellerSlice.isModalOpen)
  const openAddProductModal = useAppSelector(
    (state) => state.sellerSlice.openAddProductModal
  )
  const uploadedFiles = useAppSelector(
    (state) => state.sellerSlice.uploadedFiles
  )

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
      // Prepare the request body
      const body =
        uploadedFiles.length > 0
          ? { ...productDetails, images: uploadedFiles }
          : productDetails

      const response = await fetch(
        `${process.env.BASE_URL}/products/${productDetails?._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
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

  const addProduct = async (values: any) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${process.env.BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
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
      <header className='flex xl:flex-row xl:justify-between xl:items-center md:flex-row md:justify-between md:items-center md:gap-5 sm:justify-center sm:items-center sm:gap-5 sm:flex-col sm:p-5 w-full '>
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

        <button
          onClick={() => dispatch(setOpenAddProductModal(true))}
          className='flex justify-center items-center gap-1 bg-black text-white py-3 px-5 rounded-lg xl:w-auto md:w-auto sm:w-full'
        >
          <BiPlus className='text-2xl' />
          Add product
        </button>
      </header>

      <div className='p-5 w-full'>
        <div className='flex justify-between items-center gap-5 border-b py-3'>
          <span className='font-semibold capitalize 2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[40%] sm:w-[40%] '>
            product
          </span>
          <span className='font-semibold capitalize 2xl:w-[10%] xl:w-[10%] xl:flex lg:w-[10%] md:flex md:w-[10%] sm:hidden sm:w-[5%] '>
            in-stock
          </span>
          <span className='font-semibold capitalize 2xl:w-[20%] xl:w-[20%] lg:w-[20%] md:w-[15%] sm:w-[20%] '>
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
              className='flex justify-between items-center gap-5 w-full py-5 border-b last:border-none '
            >
              <div className='2xl:w-[30%] xl:w-[30%] lg:w-[30%] md:w-[40%] sm:w-[40%] flex justify-start items-center gap-3 font-medium'>
                <Image
                  src={item.images?.[0]}
                  alt={item.title}
                  width={50}
                  height={50}
                  className='object-cover rounded-xl w-[5rem] h-[4rem] xl:flex md:hidden sm:hidden '
                />
                <span className='xl:text-lg md:text-base sm:text-sm'>
                  {item.title}
                </span>
              </div>

              <span className='2xl:w-[10%] xl:w-[10%] xl:flex lg:w-[10%] lg:text-base md:flex md:w-[10%] md:text-base sm:text-sm sm:hidden sm:w-[5%] '>
                {item.inStock}
              </span>
              <span className='2xl:w-[20%] xl:w-[20%] xl:text-base lg:w-[20%] lg:text-base md:text-base md:w-[15%] sm:w-[20%] sm:text-sm'>
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
            <div className='xl:w-[70%] xl:h-[90%] xl:p-10 md:w-full md:h-[90%] md:p-10 sm:w-full sm:h-full sm:p-5 rounded-xl shadow-2xl bg-white overflow-y-auto '>
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
                    className='border py-3 px-5 rounded-lg bg-transparent flex justify-center items-center gap-2 capitalize xl:text-base md:text-base sm:text-sm'
                  >
                    <MdDelete className='text-xl' /> delete
                  </button>
                  <button
                    type='button'
                    onClick={() => updateProduct()}
                    className='border py-3 px-5 rounded-lg bg-slate-700 text-white flex justify-center items-center gap-2 capitalize xl:text-base md:text-base sm:text-sm'
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

              <article
                className='flex flex-col justify-start items-start 3xl:gap-10 3xl:w-[70%] 2xl:w-[100%] xl:w-full xl:py-[4rem] lg:w-full lg:gap-10 md:w-full 
              md:py-[2rem] md:gap-5 sm:py-[2rem] sm:w-full sm:gap-5 '
              >
                <Formik
                  initialValues={{
                    title: productDetails.title || '',
                    description: productDetails.description || '',
                    price: productDetails.price || '',
                    colors: '',
                    inStock: productDetails.inStock || '',
                    discount: productDetails.discount || '',
                    category: productDetails.category || '',
                    size: '',
                  }}
                  onSubmit={(values) => {
                    console.log(values)
                  }}
                >
                  <Form className='flex flex-col justify-start items-start gap-5 w-full'>
                    <div className='flex flex-col justify-start items-start gap-3 w-full '>
                      <p className='font-medium capitalize '>photos</p>

                      {productDetails?.images.length > 0 ? (
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
                      ) : (
                        <div className='flex flex-col justify-center items-center gap-3 w-full'>
                          <h1 className='font-semibold'>
                            Images is empty, try and upload some images of your
                            product
                          </h1>
                          <span className='text-sm'>
                            Click or drag and drop your images into the box
                            below.
                          </span>
                        </div>
                      )}

                      <DropzoneComponent />
                    </div>

                    <FormikField type='text' name='title' label='title' />

                    <FormikTextarea name='description' label='description' />

                    <div className='flex justify-start items-start gap-5 w-full xl:flex-row md:flex-row sm:flex-col'>
                      <FormikField type='text' name='price' label='price' />
                      <FormikField type='text' name='colors' label='colors' />
                    </div>

                    <div className='flex justify-start items-start gap-5 w-full xl:flex-row md:flex-row sm:flex-col'>
                      <FormikField type='text' name='inStock' label='inStock' />
                      <FormikField
                        type='text'
                        name='discount'
                        label='discount'
                      />
                    </div>

                    <div className='grid w-full gap-5 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1'>
                      <FormikField
                        type='text'
                        name='category'
                        label='category'
                      />

                      <AddField
                        label='Sizes'
                        name='sizes'
                        placeholder='Enter the sizes and enter key'
                        valuesArray={valuesArray}
                        setValuesArray={setValuesArray}
                      />
                    </div>
                  </Form>
                </Formik>
              </article>
            </div>
          </section>
        </>
      )}

      {openAddProductModal && (
        <>
          <div className='bg-[#0009] w-full fixed top-0 left-0 h-screen'></div>
          <div
            className={clsx(
              'flex flex-col justify-start items-start gap-5 bg-white rounded-lg h-screen shadow-2xl absolute top-0 left-0 overflow-y-auto w-full 3xl:w-[60%] 2xl:w-[70%] xl:w-[80%] lg:w-[80%] md:w-full md:p-10 sm:w-full sm:p-5 '
            )}
          >
            <Formik
              initialValues={{
                title: '',
                description: '',
                price: '',
                inStock: '',
                discount: '',
                category: '',
                colors: [],
                available_sizes: '',
                images: [],
              }}
              onSubmit={(values) => {
                console.log(values)
                addProduct(values)
              }}
            >
              <Form className='w-full flex flex-col justify-start items-start gap-5'>
                <div className='flex justify-between items-center w-full py-5'>
                  <button
                    type='button'
                    onClick={() => dispatch(setOpenAddProductModal(false))}
                    className='xl:text-base xl:px-5 md:text-base md:px-5 sm:px-3 sm:text-sm flex justify-center items-center gap-2 bg-transparent border rounded-md h-[3rem] '
                  >
                    <MdClose className='text-xl' /> close
                  </button>

                  <button
                    type='submit'
                    className='xl:text-base xl:px-5 md:text-base md:px-5 sm:px-3 sm:text-sm flex justify-center items-center gap-2 bg-[red] h-[3rem]  text-white rounded-md '
                  >
                    <BiCheck className='text-xl' /> Add product
                  </button>
                </div>

                <FormikField
                  name='title'
                  label='Enter product name:'
                  placeholder='Enter product name here'
                />

                <FormikTextarea
                  name='description'
                  label='Enter product description:'
                  placeholder='Enter product name here'
                />

                <div
                  className={clsx(
                    'grid w-full xl:grid-cols-2 xl:content-between xl:place-items-center xl:gap-5 md:grid-cols-2 md:content-between md:place-items-center md:gap-5 sm:grid-cols-1 sm:content-center sm:place-items-center sm:gap-5 '
                  )}
                >
                  <FormikField
                    type='number'
                    name='price'
                    label='Enter product price:'
                    placeholder='Enter product prices'
                  />
                  <FormikField
                    type='number'
                    name='inStock'
                    label='Enter product stock:'
                    placeholder='Enter product stocks'
                  />
                </div>

                <div
                  className={clsx(
                    'grid w-full xl:grid-cols-2 xl:content-between xl:place-items-center xl:gap-5 md:grid-cols-2 md:content-between md:place-items-center md:gap-5 sm:grid-cols-1 sm:content-center sm:place-items-center sm:gap-5 '
                  )}
                >
                  <FormikField
                    type='text'
                    name='available_sizes'
                    label='Enter product sizes:'
                    placeholder='Enter product sizes'
                  />

                  <FormikField
                    type='number'
                    name='discount'
                    label='Enter product discount if any:'
                    placeholder='Enter product discount if any'
                  />
                </div>

                <div
                  className={clsx(
                    'grid w-full xl:grid-cols-2 xl:content-between xl:place-items-center xl:gap-5 md:grid-cols-2 md:content-between md:place-items-center md:gap-5 sm:grid-cols-1 sm:content-center sm:place-items-center sm:gap-5 '
                  )}
                >
                  <FormikField
                    type='text'
                    name='colors'
                    label='Enter product available colors:'
                    placeholder='Enter product colors'
                  />

                  <FormikField
                    type='text'
                    name='category'
                    label='Enter product category:'
                    placeholder='Enter product category'
                  />
                </div>

                <DropzoneComponent />
              </Form>
            </Formik>
          </div>
        </>
      )}
    </main>
  )
}
