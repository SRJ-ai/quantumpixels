'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Theme = 'cyberpunk' | 'matrix' | 'apple'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themeColors[theme] }}>
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
