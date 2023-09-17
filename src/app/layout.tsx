import { Providers } from '@/redux/Provider'
import type { Metadata } from 'next'

import Navbar from '@/components/Navbar'

import './globals.css'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Shop.co | where you can shop everything',
  description:
    'You can get yourself just anything you can think of here at Shop.co',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
