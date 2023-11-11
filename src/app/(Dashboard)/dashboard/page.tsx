'use client'

import React from 'react'
import { Field, Form, Formik } from 'formik'
import { BiPlus } from 'react-icons/bi'

export default function Dashboard() {
  
  return (
    <main className='xl:p-10 flex flex-col justify-start items-start gap-5 w-full'>
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
        <table className='min-w-full bg-white border-b border-gray-300'>
          <thead>
            <tr>
              <th className='py-2 px-4 font-semibold'>SKU</th>
              <th className='py-2 px-4 font-semibold'>Product</th>
              <th className='py-2 px-4 font-semibold'>Date</th>
              <th className='py-2 px-4 font-semibold'></th>
              <th className='py-2 px-4 font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody>{/* Add your table rows here */}</tbody>
        </table>
      </div>
    </main>
  )
}
