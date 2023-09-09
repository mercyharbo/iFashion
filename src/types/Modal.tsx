import clsx from 'clsx'
import React from 'react'

import close from '@/assets/cross.svg'
import Image from 'next/image'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  modalClass?: string
  contentClass?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  modalClass,
  contentClass,
}: ModalProps): JSX.Element | null => {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={clsx(
        'xl:hidden md:flex sm:flex absolute bg-white top-0 left-0 shadow-2xl rounded-xl justify-between items-start ',
        modalClass
      )}
    >
      <div className={clsx('', contentClass)}>{children}</div>
      <button
        onClick={onClose}
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
  )
}

export default Modal
