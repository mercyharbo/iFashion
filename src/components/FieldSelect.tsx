import React from 'react'
import { Field, useField, FieldAttributes } from 'formik'

// Define the type for the options array
interface Option {
  value: string
  label: string
}

// Define the props for the SelectField component
interface SelectFieldProps extends FieldAttributes<any> {
  label: string
  name: string
  options: Option[]
  defaultValue?: string
}

// Reusable Select Component using Formik Field
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  defaultValue = '',
  ...rest
}) => {
  const [field, meta, helpers] = useField(name)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value
    helpers.setValue(selectedValue)
  }

  return (
    <div className='flex flex-col justify-start items-start gap-2 w-full'>
      <label htmlFor={name}>{label}</label>
      {/* Use Formik's Field component for managing the field */}
      <Field
        as='select'
        id={name}
        name={name}
        value={field.value}
        onChange={handleChange} // Add the onChange handler
        {...rest}
        className='border-[1px] rounded-md h-[3rem] indent-3 w-full outline-none'
      >
        {/* Option for an empty value */}
        <option value=''>Select {label}</option>
        {/* Map through options and create option elements */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      {/* Display an error message if there's a validation error */}
      {meta.touched && meta.error && (
        <div className='text-[red] text-sm '>{meta.error}</div>
      )}
    </div>
  )
}

export default SelectField
