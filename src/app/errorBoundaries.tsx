'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const errorListener = (error: ErrorEvent) => {
      console.log(error)
      setHasError(true)
    }

    window.addEventListener('error', errorListener)
    return () => {
      window.removeEventListener('error', errorListener)
    }
  }, [])

  if (hasError) {
    return (
      <div className='flex flex-col justify-center items-center gap-3 m-auto h-screen'>
        <h1 className='text-2xl font-semibold'>Something went wrong.</h1>
        <Link href='/'>
          <div className='bg-[red] text-white h-[3rem] rounded-xl px-5 text-xl '>
            Try again
          </div>
        </Link>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
