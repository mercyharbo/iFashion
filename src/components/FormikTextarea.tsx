import React from 'react'
import clsx from 'clsx'
import { ErrorMessage, Field } from 'formik'

type FieldProps = {
  name: string
  label: string
  inputStyle?: string
  placeholder?: string
}

export default function FormikTextarea({
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
        as='textarea'
        name={name}
        id={name}
        placeholder={placeholder}
        className={clsx(
          'border h-[7rem] p-2 rounded-lg w-full outline-[blue] placeholder:text-base ',
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
