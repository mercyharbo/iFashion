import React, { ReactNode } from 'react'
import Navbar from './Navbar'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}

export default Layout
