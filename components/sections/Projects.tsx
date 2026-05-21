'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/components/ThemeContext'

const projects = [
  {
    title: 'Quantum Learn',
    desc:  'AI-powered adaptive education platform with personalized curriculum paths and real-time mastery tracking.',
    tags:  ['Next.js', 'Python', 'TensorFlow'],
    status: 'In Development',
  },
  {
    title: 'PixelForge',
    desc:  'Lightweight indie game engine with a WebGL-first renderer and visual scripting layer.',
    tags:  ['WebGL', 'TypeScript', 'Wasm'],
    status: 'Alpha',
  },
  {
    title: 'NeuralBoard',
    desc:  'Real-time collaborative whiteboard with AI-powered shape recognition and auto-layout.',
    tags:  ['React', 'Socket.io', 'Canvas'],
    status: 'Beta',
  },
  {
    title: 'CodeQuest',
    desc:  'Gamified competitive coding platform with XP systems, challenges, and live leaderboards.',
    tags:  ['Node.js', 'Redis', 'React'],
    status: 'Live',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { colors } = useTheme()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Spring for smooth liquid displacement
  const displacement = useSpring(0, { stiffness: 100, damping: 10 })

  return (
    <section id="projects" className="qp-section" style={{ background: 'transparent' }}>
      
      {/* SVG Liquid Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <filter id="liquidFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <motion.feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={displacement} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'rgba(5,8,22,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          Selected Work
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 64, maxWidth: 600 }}
        >
          Products we&apos;re{' '}
          <span className="qp-gradient">crafting.</span>
        </motion.h2>

        {/* List-style projects */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '32px 0',
                cursor: 'pointer',
                transition: 'background 0.3s',
                position: 'relative',
                overflow: 'hidden',
                // Apply liquid filter conditionally if hovered
                filter: hoveredIndex === i ? 'url(#liquidFilter)' : 'none'
              }}
              onMouseEnter={(e) => {
                setHoveredIndex(i)
                displacement.set(20) // trigger liquid ripple
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                const title = e.currentTarget.querySelector('.proj-title') as HTMLElement;
                if (title) title.style.color = colors.primary;
                const arrow = e.currentTarget.querySelector('.proj-arrow') as HTMLElement;
                if (arrow) {
                  arrow.style.color = colors.primary;
                  arrow.style.transform = 'translate(2px, -2px)';
                }
              }}
              onMouseLeave={(e) => {
                setHoveredIndex(null)
                displacement.set(0) // settle back down
                e.currentTarget.style.background = 'transparent';
                const title = e.currentTarget.querySelector('.proj-title') as HTMLElement;
                if (title) title.style.color = '#fff';
                const arrow = e.currentTarget.querySelector('.proj-arrow') as HTMLElement;
                if (arrow) {
                  arrow.style.color = '#424245';
                  arrow.style.transform = 'translate(0, 0)';
                }
              }}
            >
              <div style={{ display: 'flex', gap: 24, padding: '0 24px' }}>
                {/* Number */}
                <span style={{ fontSize: 12, color: '#424245', fontFamily: 'monospace', paddingTop: 4, width: 24, flexShrink: 0 }}>
                  0{i + 1}
                </span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
                    <h3
                      className="proj-title"
                      style={{ fontSize: 20, fontWeight: 600, color: '#fff', fontFamily: 'var(--heading-font)', transition: 'color 0.3s' }}
                    >
                      {p.title}
                    </h3>
                    <div className="proj-arrow" style={{ transition: 'all 0.3s', color: '#424245', marginTop: 4 }}>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: '#86868B', lineHeight: 1.6, marginBottom: 12, maxWidth: 600 }}>{p.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{ fontSize: 11, color: '#424245' }}>{t}</span>
                    ))}
                    <span style={{ fontSize: 11, color: colors.primary, marginLeft: 'auto' }}>{p.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
        </div>

        <div className="qp-divider" style={{ marginTop: 80 }} />
      </div>
    </section>
  )
}
