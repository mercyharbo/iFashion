import React from 'react'
import clsx from 'clsx'
import { ErrorMessage, Field } from 'formik'

type FieldProps = {
  type?: string
  name: string
  label: string
  inputStyle?: string
  placeholder?: string
}

export default function FormikField({
  type = 'text',
  name,
  label,
  inputStyle,
  placeholder,
}: FieldProps) {
  return (
    <div className='flex flex-col justify-start items-start gap-3 w-full'>
      <label htmlFor={name} className='font-medium text-base'>
        {label}
      </label>
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={clsx(
          'border h-[3rem] rounded-lg w-full px-2 outline-[blue] placeholder:text-base ',
          inputStyle
        )}
      />
      <ErrorMessage
        component='span'
        name={name}
        className='text-[red] text-sm '
      />
    </div>
  )
}
