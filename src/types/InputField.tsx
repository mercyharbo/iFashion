import React from 'react'
import clsx from 'clsx'

type InputFieldProps = {
  placeholder?: string
  type?: string
  icon?: React.ReactNode
  inputClass?: string
  inputWrapper?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
  placeholder,
  type = 'text',
  icon,
  inputClass,
  inputWrapper,
  value,
  onChange, // Add the onChange prop
}: InputFieldProps) => {
  return (
    <div className={clsx('relative w-auto', inputWrapper)}>
      {icon && (
        <span className='absolute' style={{ top: '12px', left: '12px' }}>
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name=''
        id=''
        onChange={onChange}
        className={clsx(
          'rounded-full px-3 text-sm bg-[#F0F0F0] outline-none border-2 h-[45px] w-full',
          inputClass
        )}
      />
    </div>
  )
}

export default InputField
