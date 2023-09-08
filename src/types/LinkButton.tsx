import Link from 'next/link'
import React from 'react'

type LinkProps = {
  title: string
  href: string
  linkClass?: string // Define valid class names
}

const LinkButton = ({ title, href, linkClass }: LinkProps) => {
  return (
    <Link href={`/${href}`} className={`rounded-full ${linkClass}`}>
      {title}
    </Link>
  )
}

export default LinkButton
