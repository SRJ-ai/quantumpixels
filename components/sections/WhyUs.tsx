'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const reasons = [
  { title: 'Student-Led',      desc: 'Built by engineers who are the next generation — we understand modern users innately.' },
  { title: 'Speed & Agility',  desc: 'Lean team, zero bureaucracy. Concept to shipped in weeks, not quarters.' },
  { title: 'AI-Native',        desc: "AI isn't a feature we bolt on. It's woven into our engineering DNA from day one." },
  { title: 'Full-Stack',       desc: 'Frontend to cloud infrastructure — one team, zero gaps, complete ownership.' },
  { title: 'Design-First',     desc: "We design before we develop. Premium UX is the foundation, not an afterthought." },
  { title: 'Collaborative',    desc: 'We embed with your team. Transparent process, shared ownership, real partnership.' },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="why-us" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          Why Quantum Pixels
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 64, maxWidth: 600 }}
        >
          The unfair{' '}
          <span className="qp-gradient">advantage.</span>
        </motion.h2>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 16,
          overflow: 'hidden'
        }}>
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              style={{
                padding: '24px 20px',
                background: '#0a0a0a',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#111')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0a0a0a')}
            >
              <span style={{ fontSize: 12, color: '#424245', fontFamily: 'monospace', marginBottom: 16, display: 'block' }}>
                0{i + 1}
              </span>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'var(--heading-font)', marginBottom: 8 }}>
                {r.title}
              </h3>
              <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6 }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
