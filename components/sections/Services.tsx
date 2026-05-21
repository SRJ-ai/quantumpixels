'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BookOpen, Gamepad2, Code2, ArrowUpRight } from 'lucide-react'

const services = [
  {
    Icon: BookOpen,
    title: 'Education',
    subtitle: 'Adaptive learning, reimagined.',
    desc: 'AI-powered educational platforms that personalize every learning journey — adaptive tutoring, gamified curriculum, and real-time progress analytics.',
    features: ['AI Adaptive Tutors', 'Gamified Learning', 'Progress Analytics', 'Live Collaboration'],
  },
  {
    Icon: Gamepad2,
    title: 'Gaming',
    subtitle: 'Immersive worlds, precisely engineered.',
    desc: 'From indie mobile games to full-scale VR — we build interactive experiences with depth, polish, and staying power.',
    features: ['Unity & Unreal', 'Multiplayer Systems', 'VR / AR Experiences', 'Game Economies'],
  },
  {
    Icon: Code2,
    title: 'Software',
    subtitle: 'Products that scale. Code that lasts.',
    desc: 'Production-grade SaaS, APIs, automation, and enterprise tools — architected for reliability and built with modern engineering practices.',
    features: ['SaaS Platforms', 'API Design', 'Automation', 'Enterprise Tools'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid var(--border)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          What We Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 64, maxWidth: 600 }}
        >
          Three domains.{' '}
          <span className="qp-gradient">One vision.</span>
        </motion.h2>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
          {services.map((s, i) => {
            const Icon = s.Icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="qp-card"
                style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  marginBottom: 24,
                }}>
                  <Icon size={18} color="#00FFB2" />
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#F5F5F7', fontFamily: 'var(--heading-font)', marginBottom: 4 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: '#00FFB2', fontWeight: 500, marginBottom: 16 }}>{s.subtitle}</p>
                <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6, marginBottom: 24 }}>{s.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto', marginBottom: 24 }}>
                  {s.features.map(f => (
                    <span key={f} style={{
                      fontSize: 11, color: '#86868B', padding: '6px 12px', borderRadius: 999,
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#F5F5F7', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
                >
                  Learn more <ArrowUpRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
