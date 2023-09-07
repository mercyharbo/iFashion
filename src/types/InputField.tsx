import Image from 'next/image'
import React from 'react'

type InputFieldProps = {
  placeholder?: string
  type?: string // Provide a default value for 'type'
  icon?: string
  inputClass?: string
}

const InputField = ({
  placeholder,
  type = 'text', // Default to 'text' if 'type' is not provided
  icon,
  inputClass,
}: InputFieldProps) => {
  return (
    <div className='relative'>
      {icon && (
        <Image
          src={`/${icon}`}
          width={20}
          height={20}
          alt='icon'
          className='' // You can add Tailwind CSS classes here if needed
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        name=''
        id=''
        className={` ${inputClass}`}
      />
    </div>
  )
}

export default InputField
