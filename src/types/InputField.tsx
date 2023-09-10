import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

type InputFieldProps = {
  placeholder?: string
  type?: string
  icon?: string
  inputClass?: string
  inputWrapper?: string
}

const InputField = ({
  placeholder,
  type = 'text',
  icon,
  inputClass,
  inputWrapper,
}: InputFieldProps) => {
  return (
    <div className={clsx('relative w-auto', inputWrapper)}>
      {icon && <Image src={`/${icon}`} width={20} height={20} alt='icon' />}
      <input
        type={type}
        placeholder={placeholder}
        name=''
        id=''
        className={clsx(
          'rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] w-full ',
          inputClass
        )}
      />
    </div>
  )
}

export default InputField
