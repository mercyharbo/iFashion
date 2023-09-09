import { Providers } from '@/redux/Provider'
import type { Metadata } from 'next'

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
