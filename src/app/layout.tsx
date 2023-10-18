import { Providers } from '@/redux/Provider'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './globals.css'

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
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
