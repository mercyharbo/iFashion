'use client'

import React from 'react'
import { Provider } from 'react-redux'

import { store } from './Store'

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
