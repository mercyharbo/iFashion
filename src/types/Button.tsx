import clsx from 'clsx'
import React from 'react'

type ButtonProps = {
  title?: string
  icon?: React.ReactElement
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
    <button
      type={type}
      onClick={onClick}
      className={clsx('capitalize', buttonClass)}
    >
      {icon && <span>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  )
}

export default Button
