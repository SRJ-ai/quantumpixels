'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="vision" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 32 }}
        >
          Our Vision
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="qp-display"
          style={{ marginBottom: 40 }}
        >
          We believe the future belongs to{' '}
          <span className="qp-gradient">creators</span> who combine
          intelligence, technology, and imagination.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="qp-body"
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          To become a globally recognized technology ecosystem where education,
          gaming, and software innovation merge — empowering the next generation.
        </motion.p>

        <div className="qp-divider" style={{ marginTop: 80 }} />
      </div>
    </section>
  )
}
