'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    let curr = 0
    const step = Math.max(1, Math.ceil(end / 50))
    const timer = setInterval(() => {
      curr += step
      if (curr >= end) { setVal(end); clearInterval(timer) }
      else setVal(curr)
    }, 25)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{val}{suffix}</span>
}

const stats = [
  { end: 3,   suffix: '+', label: 'Domains' },
  { end: 10,  suffix: '+', label: 'Projects' },
  { end: 100, suffix: '%', label: 'Passion' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        {/* Subtle glass backdrop for text legibility over particles */}
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          About Quantum Pixels
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 32, maxWidth: 720 }}
        >
          A student-founded engineering startup building{' '}
          <span className="qp-gradient">intelligent digital experiences</span>{' '}
          across education, gaming, and software.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="qp-body"
          style={{ maxWidth: 600, marginBottom: 64 }}
        >
          We merge cutting-edge technology with creative design to build products
          that don&apos;t just work — they inspire. Every pixel engineered, every
          interaction considered.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '32px 48px', flexWrap: 'wrap' }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="qp-gradient" style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--heading-font)', marginBottom: 8, lineHeight: 1 }}>
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div style={{ fontSize: 14, color: '#86868B' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
