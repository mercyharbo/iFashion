import React from 'react'

type ButtonProps = {
  title?: string
  icon?: React.ReactElement // Use React.ReactElement type for icon
  type?: 'submit' | 'button' | 'reset'
  buttonClass?: string
  onClick?: () => void
}

const Button = ({
  title,
  type = 'button',
  buttonClass,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={`${buttonClass}`}>
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  )
}

export default Button
