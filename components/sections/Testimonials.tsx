'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    text: 'Quantum Pixels demonstrates technical maturity and engineering discipline that is rare in student-founded ventures.',
    name: 'Dr. Ramesh Kumar',
    role: 'Engineering Professor',
  },
  {
    text: "What sets them apart is combining creative design with solid technical execution. They think like a premium product studio.",
    name: 'Priya Nair',
    role: 'Startup Mentor',
  },
  {
    text: "Their AI-powered concepts are ahead of what most established EdTech companies are attempting.",
    name: 'Sarah Chen',
    role: 'ML Research Collaborator',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="testimonials" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid var(--border)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          What People Say
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 64, maxWidth: 600 }}
        >
          Trusted by{' '}
          <span className="qp-gradient">mentors &amp; peers.</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="qp-card"
              style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column' }}
            >
              <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6, flex: 1, marginBottom: 32, fontStyle: 'italic' }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: 12, color: '#424245' }}>{t.role}</div>
              </div>
            </motion.blockquote>
          ))}
        </div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
