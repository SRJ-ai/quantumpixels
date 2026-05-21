'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const steps = [
  { n: '01', title: 'Discovery',   desc: 'Deep research into user needs, market landscape, and technical constraints.' },
  { n: '02', title: 'Design',      desc: 'UI systems with premium design thinking, motion-first principles, and obsessive detail.' },
  { n: '03', title: 'Development', desc: 'Clean, scalable engineering with modern stacks, CI/CD, and type-safe architecture.' },
  { n: '04', title: 'Testing',     desc: 'Rigorous QA across devices, performance profiling, and security audits.' },
  { n: '05', title: 'Launch',      desc: 'Zero-downtime deployments with real-time monitoring and continuous optimization.' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%'])

  return (
    <section id="process" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          How We Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 64, maxWidth: 600 }}
        >
          A systematic approach{' '}
          <span className="qp-gradient">to craft.</span>
        </motion.h2>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Scroll-driven line */}
          <div style={{ position: 'absolute', left: 19, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              style={{ width: '100%', height: lineH, background: '#00FFB2', transformOrigin: 'top' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                {/* Dot */}
                <div style={{ position: 'relative', flexShrink: 0, marginTop: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: '#111', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 11, color: '#86868B', fontFamily: 'monospace' }}>{s.n}</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ paddingBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: 'var(--heading-font)', marginBottom: 4 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6, maxWidth: 440 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
