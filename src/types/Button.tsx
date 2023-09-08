import Image from 'next/image'
import React from 'react'

type ButtonProps = {
  title?: string
  icon?: React.ReactElement // Use React.ReactElement type for icon
  type?: 'submit' | 'button' | 'reset'
  buttonClass?: string
}

const Button = ({ title, type = 'button', buttonClass, icon }: ButtonProps) => {
  return (
    <button type={type} className={`${buttonClass}`}>
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  )
}

export default Button
