import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import clsx from 'clsx'
import { Providers } from '@/redux/Provider'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import ErrorBoundary from './errorBoundaries'

const inter = Inter({ subsets: ['latin'] })

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
        <ErrorBoundary>
          <Providers>
            <main className={clsx('overflow-x-hidden', inter.className)}>
              {children}
            </main>
            <ToastContainer />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}
