'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'cyberpunk' | 'matrix' | 'apple'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  mode: 'dark' | 'light'
  toggleMode: () => void
  colors: {
    primary: string
    secondary: string
  }
}

const themeColors = {
  cyberpunk: { primary: '#00FFB2', secondary: '#007BFF' },
  matrix: { primary: '#00FF41', secondary: '#003B00' },
  apple: { primary: '#FFFFFF', secondary: '#86868B' }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('cyberpunk')
  const mode = 'dark' // Locked to dark mode

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const current = themeColors[theme]
    root.style.setProperty('--gradient-1', current.primary)
    root.style.setProperty('--gradient-2', current.secondary)
    root.style.setProperty('--gradient-3', current.primary)
    root.style.setProperty('--accent', current.primary)
  }, [theme])

  const toggleMode = () => {
    // Light mode removed
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mode, toggleMode, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
