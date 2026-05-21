'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, TerminalSquare } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="qp-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, var(--text-primary) 0%, transparent 60%)',
        opacity: 0.03,
        zIndex: -1,
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          >
            <TerminalSquare size={64} style={{ color: 'var(--text-primary)' }} />
          </motion.div>
        </div>
        
        <h1 className="qp-display" style={{ marginBottom: 16 }}>
          404 - <span className="qp-gradient">Lost in the Matrix</span>
        </h1>
        
        <p className="qp-body" style={{ maxWidth: 500, margin: '0 auto 40px' }}>
          The page you are looking for has been moved, deleted, or possibly never existed.
        </p>

        <Link href="/" passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.875rem 2rem',
              borderRadius: 999,
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 15,
            }}
          >
            <ArrowLeft size={16} />
            Return to Base
          </motion.a>
        </Link>
      </motion.div>
    </div>
  )
}
