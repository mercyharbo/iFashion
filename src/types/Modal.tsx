'use client'

import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import close from '@/assets/cross.svg'

type ModalProps = {
  children: React.ReactNode
  modalClass?: string
  contentClass?: string
  showLogo?: boolean
  showHeader?: boolean
  handleCloseModal: () => void
}

const Modal = ({
  children,
  modalClass,
  contentClass,
  showLogo,
  showHeader,
  handleCloseModal,
}: ModalProps): JSX.Element | null => {
  return (
    <>
      <div
        onClick={handleCloseModal}
        className='xl:hidden md:flex sm:flex'
        style={{
          position: 'fixed',
          backgroundColor: '#000000be',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
        }}
      ></div>
      <div
        className={clsx(
          'xl:hidden md:flex sm:flex flex-col gap-5 absolute bg-white top-0 left-0 shadow-xl ',
          modalClass
        )}
      >
        {showHeader && (
          <div className='flex justify-between items-center mr-auto '>
            {showLogo && (
              <h1 className='text-2xl font-extrabold uppercase'>shop.co</h1>
            )}

            <button
              type='button'
              onClick={handleCloseModal}
              style={{
                display: 'flex',
                marginLeft: 'auto',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Image src={close} width={20} height={20} alt='close' />
            </button>
          </div>
        )}

        <div className={clsx(contentClass)}>{children}</div>
      </div>
    </>
  )
}

export default Modal
