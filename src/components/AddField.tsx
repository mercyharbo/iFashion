import React, { useState } from 'react'
import { Formik, Field, Form } from 'formik'

interface AddFieldProps {
  valuesArray: string[]
  setValuesArray: React.Dispatch<React.SetStateAction<string[]>>
  name: string
  placeholder: string
  label: string
}

const AddField: React.FC<AddFieldProps> = ({
  valuesArray,
  setValuesArray,
  name,
  label,
  placeholder,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newValue = e.currentTarget.value.trim()
      if (newValue !== '') {
        setValuesArray((prevValues) => [...prevValues, newValue])
        e.currentTarget.value = '' // Reset the input field
      }
    }
  }

  return (
    <div className='flex flex-col justify-start items-start gap-3 w-full'>
      <label htmlFor={name} className='font-medium capitalize '>
        {label}
      </label>
      <Field
        name={name}
        type='text'
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none'
      />

      <div className='flex justify-start items-center gap-5 flex-wrap w-full'>
        {valuesArray.map((value, index) => (
          <span
            key={index}
            className='py-2 px-3 bg-[blue] text-white rounded-md '
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AddField
