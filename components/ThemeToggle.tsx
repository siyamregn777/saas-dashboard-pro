'use client'

import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize state from localStorage (only runs once)
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Apply theme on mount
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <Sun className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}

export default ThemeToggle