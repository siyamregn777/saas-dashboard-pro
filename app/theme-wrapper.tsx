'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  useEffect(() => {
    // This ensures the dark class is applied to html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}