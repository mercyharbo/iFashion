'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import clsx from 'clsx'

import close from '@/assets/cross.svg'
import { closeModal } from '@/redux/Slice/ModalSlice'
import { AppDispatch, useAppSelector } from '@/redux/Store'

type ModalProps = {
  children: React.ReactNode
  modalClass?: string
  contentClass?: string
}

const Modal = ({
  children,
  modalClass,
  contentClass,
}: ModalProps): JSX.Element | null => {
  const dispatch = useDispatch<AppDispatch>()
  const isOpen = useAppSelector((state) => state.modalReducer.modal.isOpen)

  const handleClose = () => {
    dispatch(closeModal())
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      className={clsx(
        'xl:hidden md:flex sm:flex flex-col gap-5 absolute bg-white top-0 left-0 shadow-xl rounded-2xl ',
        modalClass
      )}
    >
      <div className='flex justify-between items-center '>
        <h1 className='text-2xl font-extrabold uppercase'>shop.co</h1>
        <button
          onClick={handleClose}
          // style={{
          //   display: 'flex',
          //   marginLeft: 'auto',
          //   justifyContent: 'flex-end',
          //   alignItems: 'flex-end',
          // }}
        >
          <Image src={close} width={20} height={20} alt='close' />
        </button>
      </div>

      <div className={clsx(contentClass)}>{children}</div>
    </div>
  )
}

export default Modal
