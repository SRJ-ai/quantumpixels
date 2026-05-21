'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show if user hasn't accepted cookies yet
    const hasAccepted = localStorage.getItem('qp-cookies-accepted')
    if (!hasAccepted) {
      // Delay showing the banner for 1.5 seconds so it feels less aggressive
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('qp-cookies-accepted', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            right: 24,
            maxWidth: 600,
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '20px 24px',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            zIndex: 99999,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>We use cookies</h4>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our <a href="/privacy" style={{ color: '#00FFB2', textDecoration: 'none' }}>Cookie Policy</a>.
              </p>
            </div>
            <button
              onClick={acceptCookies}
              style={{
                padding: '10px 20px',
                background: '#00FFB2',
                color: '#000',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'transform 0.2s, opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
