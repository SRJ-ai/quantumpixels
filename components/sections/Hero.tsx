'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TiltText from '@/components/ui/TiltText'

export default function Hero() {
  const ref = useRef(null)
  
  // Note: Standard useScroll() might not perfectly bind to Drei's ScrollControls natively without some work, 
  // but for simple opacity/transform it often degrades gracefully or we can just let Framer Motion handle initial reveals.
  // To keep it clean, we'll just use initial/animate for the Hero.

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: 900, margin: '0 auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}
        >
          <span className="qp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
          <span className="qp-overline" style={{ color: 'var(--text-primary)' }}>Student-Founded · Engineering the Future</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltText />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="qp-body"
          style={{ maxWidth: 560, margin: '0 auto 32px', color: 'var(--text-secondary)' }}
        >
          Education. Gaming. Software Innovation — engineered with precision,
          designed with purpose, built by the next generation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              padding: '0.875rem 2rem', borderRadius: 999,
              background: 'var(--text-primary)', color: 'var(--bg-primary)',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Explore Our Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              padding: '0.875rem 2rem', borderRadius: 999,
              border: '1px solid var(--border)', color: 'var(--text-primary)',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              background: 'var(--bg-glass)', backdropFilter: 'blur(10px)',
              transition: 'border-color 0.3s, background 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-glass-heavy)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-glass)'; }}
          >
            Start a Project
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} color="currentColor" style={{ color: 'var(--text-primary)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
