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
  cyberpunk: { primary: '#00FFB2', secondary: '#A855F7' },
  matrix: { primary: '#00FF41', secondary: '#003B00' },
  apple: { primary: '#FFFFFF', secondary: '#86868B' }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('cyberpunk')
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('qp-theme-mode') as 'dark' | 'light'
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
  }, [mode])

  const toggleMode = () => {
    setMode(m => {
      const nextMode = m === 'dark' ? 'light' : 'dark'
      localStorage.setItem('qp-theme-mode', nextMode)
      return nextMode
    })
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
