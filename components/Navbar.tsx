'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/components/ThemeContext'

const defaultLinks = [
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Work' },
  { href: '#process',  label: 'Process' },
  { href: '#contact',  label: 'Contact' },
]

const aetheraLinks = [
  { href: '#', label: 'Home' },
  { href: '#studio', label: 'Studio' },
  { href: '#about', label: 'About' },
  { href: '#journal', label: 'Journal' },
  { href: '#contact', label: 'Reach Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { scrollY }             = useScroll()
  const { theme, setTheme, colors, mode, toggleMode } = useTheme()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

  const currentLinks = mode === 'light' ? aetheraLinks : defaultLinks

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'padding 0.5s, background 0.5s, border-color 0.5s, backdrop-filter 0.5s',
        }}
      >
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            {mode === 'light' ? (
              <span style={{ fontSize: '1.875rem', letterSpacing: '-0.025em', color: '#000000', fontFamily: 'var(--font-instrument-serif)' }}>
                Aethera<sup>®</sup>
              </span>
            ) : (
              <>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-elevated)', border: '1px solid var(--border)',
                  overflow: 'hidden'
                }}>
                  <Image src="/quantumpixels/logo.png" alt="Quantum Pixels Logo" width={32} height={32} style={{ objectFit: 'cover' }} priority />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-primary)', fontFamily: 'var(--heading-font)' }}>
                  Quantum<span className="qp-gradient" style={{ color: colors.primary }}>Pixels</span>
                </span>
              </>
            )}
          </a>

          {/* Desktop links */}
          <div style={{ alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
            {currentLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2, duration: 0.4 }}
                style={{ 
                  fontSize: mode === 'light' ? 14 : 13, 
                  color: mode === 'light' ? (l.label === 'Home' ? '#000000' : '#6F6F6F') : 'var(--text-secondary)', 
                  textDecoration: 'none', 
                  transition: 'color 0.3s' 
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = mode === 'light' ? '#000000' : 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = mode === 'light' ? (l.label === 'Home' ? '#000000' : '#6F6F6F') : 'var(--text-secondary)')}
              >
                {l.label}
              </motion.a>
            ))}
            
            {/* Theme Switcher */}
            <div style={{ display: 'flex', gap: 8, marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              {(['cyberpunk', 'matrix', 'apple'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-label={`Switch to ${t} theme`}
                  style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: t === 'cyberpunk' ? '#A855F7' : t === 'matrix' ? '#00FF41' : '#FFFFFF',
                    border: theme === t ? '2px solid #fff' : '2px solid transparent',
                    cursor: 'pointer',
                    opacity: theme === t ? 1 : 0.4,
                    transition: 'all 0.2s',
                    padding: 0
                  }}
                  title={`Switch to ${t} theme`}
                />
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleMode}
            aria-label="Toggle Light/Dark Mode"
            className="flex items-center justify-center" 
            style={{ color: 'var(--text-primary)', background: 'rgba(128,128,128,0.1)', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: '8px', marginRight: '8px' }}
          >
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:inline-flex"
            style={
              mode === 'light' 
              ? {
                  fontSize: 14, fontWeight: 400, color: '#FFFFFF', textDecoration: 'none',
                  padding: '0.625rem 1.5rem', borderRadius: 999,
                  background: '#000000',
                  transition: 'transform 0.3s',
                }
              : {
                  fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none',
                  padding: '0.5rem 1.25rem', borderRadius: 999,
                  border: `1px solid var(--border)`,
                  background: 'var(--bg-card)',
                  transition: 'border-color 0.3s, background 0.3s',
                }
            }
            whileHover={mode === 'light' ? { scale: 1.03 } : undefined}
            onMouseEnter={mode === 'light' ? undefined : (e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
            onMouseLeave={mode === 'light' ? undefined : (e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)' }}
          >
            {mode === 'light' ? 'Begin Journey' : 'Get in Touch'}
          </motion.a>

          {/* Mobile toggle */}
          <button 
            className="flex md:hidden items-center justify-center" 
            aria-label="Toggle Mobile Menu"
            style={{ color: 'var(--text-primary)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="qp-glass"
            style={{ position: 'fixed', top: 70, left: 16, right: 16, zIndex: 100, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 16, background: 'var(--bg-glass-heavy)' }}>
              {currentLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ 
                    color: mode === 'light' ? (l.label === 'Home' ? '#000000' : '#6F6F6F') : 'var(--text-secondary)', 
                    textDecoration: 'none', 
                    padding: '0.625rem 0.75rem', 
                    borderRadius: 8, 
                    fontSize: 14, 
                    transition: 'color 0.2s' 
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = mode === 'light' ? '#000000' : 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = mode === 'light' ? (l.label === 'Home' ? '#000000' : '#6F6F6F') : 'var(--text-secondary)')}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
