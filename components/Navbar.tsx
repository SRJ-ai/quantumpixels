'use client'

import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from '@/components/ThemeContext'

const links = [
  { href: '#about',    label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Work' },
  { href: '#process',  label: 'Process' },
  { href: '#contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { scrollY }             = useScroll()
  const { theme, setTheme, colors } = useTheme()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

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
          background: scrolled ? 'rgba(0,0,0,0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(40px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'padding 0.5s, background 0.5s, border-color 0.5s, backdrop-filter 0.5s',
        }}
      >
        <div style={{ maxWidth: 1024, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}>
              <img src="/quantumpixels/logo.png" alt="Quantum Pixels Logo" style={{ width: 32, height: 32, objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: '#F5F5F7', fontFamily: 'var(--heading-font)' }}>
              Quantum<span className="qp-gradient" style={{ color: colors.primary }}>Pixels</span>
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2, duration: 0.4 }}
                style={{ fontSize: 13, color: '#86868B', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#86868B')}
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

          {/* CTA */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:inline-flex"
            style={{
              fontSize: 13, fontWeight: 500, color: colors.primary, textDecoration: 'none',
              padding: '0.5rem 1.25rem', borderRadius: 999,
              border: `1px solid ${colors.primary}40`,
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,178,0.4)'; e.currentTarget.style.background = 'rgba(0,255,178,0.06)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,255,178,0.2)'; e.currentTarget.style.background = 'transparent' }}
          >
            Get in Touch
          </motion.a>

          {/* Mobile toggle */}
          <button className="flex md:hidden items-center justify-center" style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
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
            style={{ position: 'fixed', top: 70, left: 16, right: 16, zIndex: 100, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, overflow: 'hidden' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 16, background: 'rgba(10,10,10,0.95)' }}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ color: '#86868B', textDecoration: 'none', padding: '0.625rem 0.75rem', borderRadius: 8, fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#86868B')}
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
