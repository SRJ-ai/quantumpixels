'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid var(--border)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 32 }}
        >
          Let&apos;s Build Together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="qp-display"
          style={{ marginBottom: 32 }}
        >
          Ready to build something{' '}
          <span className="qp-gradient">extraordinary</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="qp-body"
          style={{ maxWidth: 500, margin: '0 auto 48px' }}
        >
          Whether you&apos;re a student, startup, or institution — we&apos;re ready
          to create something remarkable together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}
        >
          <motion.a
            href="mailto:hello@quantumpixels.dev"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '0.875rem 2rem', borderRadius: 999,
              background: 'var(--text-primary)', color: 'var(--bg-primary)',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              const arrow = e.currentTarget.querySelector('.cta-arrow') as HTMLElement;
              if (arrow) arrow.style.transform = 'translateX(0)';
            }}
          >
            Get in Touch
            <ArrowRight size={14} className="cta-arrow" style={{ transition: 'transform 0.2s' }} />
          </motion.a>
          
          <motion.a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              padding: '0.875rem 2rem', borderRadius: 999,
              border: '1px solid var(--border)', color: 'var(--text-primary)',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              background: 'transparent',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.background = 'var(--bg-card)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
          >
            Book a Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
