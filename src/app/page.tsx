'use client'

import Link from 'next/link'
import { useDispatch } from 'react-redux'

import { AppDispatch, useAppSelector } from '@/redux/Store'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Modal from '@/types/Modal'
import InputField from '@/types/InputField'

import { closeModal } from '@/redux/Slice/ModalSlice'
import { closeSearchModal } from '@/redux/Slice/SearchModalSlice'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)
  const isSearchOpen = useAppSelector(
    (state) => state.searchModalReducer.modal.isOpen
  )

  const NavItems = ['shop', 'on sale', 'new arrivals', 'brands']

  const handleNavClose = () => {
    dispatch(closeModal())
  }

  const handleSearchModal = () => {
    dispatch(closeSearchModal())
  }

  return (
    <Layout>
      <Hero />

      {isOpen && (
        <Modal
          handleCloseModal={handleNavClose}
          showLogo={true}
          showHeader={true}
          modalClass='w-[80%] mx-auto top-0 left-0 p-5 z-20 rounded-r-xl h-screen absolute bg-white '
          contentClass='flex flex-col justify-start items-start gap-5 capitalize font-semibold'
        >
          {NavItems.map((items, key) => {
            return (
              <Link href={items} key={key}>
                {items}
              </Link>
            )
          })}
        </Modal>
      )}

      {isSearchOpen && (
        <Modal
          handleCloseModal={handleSearchModal}
          showLogo={false}
          showHeader={false}
          modalClass='w-[95%] mx-auto top-2 right-0 p-5 z-10 absolute rounded-xl'
          contentClass='flex flex-col justify-center items-center gap-5 w-full capitalize font-semibold'
        >
          <InputField
            type='text'
            placeholder='Search for products...'
            inputWrapper='w-full'
            inputClass='rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] w-full xl:hidden md:flex sm:flex '
          />
        </Modal>
      )}
    </Layout>
  )
}
