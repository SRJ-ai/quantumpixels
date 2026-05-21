'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { Code2, Database, Layout, Server, Smartphone, Cloud, Cpu, Globe, Boxes, Layers, Zap, Hexagon } from 'lucide-react'

const techs = [
  { name: 'React', icon: Code2, color: '#61DAFB' },
  { name: 'Next.js', icon: Globe, color: '#FFFFFF' },
  { name: 'TypeScript', icon: Code2, color: '#3178C6' },
  { name: 'Python', icon: Cpu, color: '#3776AB' },
  { name: 'FastAPI', icon: Server, color: '#05998B' },
  { name: 'Node.js', icon: Server, color: '#339933' },
  { name: 'TensorFlow', icon: Database, color: '#FF6F00' },
  { name: 'PostgreSQL', icon: Database, color: '#336791' },
  { name: 'AWS', icon: Cloud, color: '#FF9900' },
  { name: 'Three.js', icon: Boxes, color: '#FFFFFF' },
  { name: 'Unity', icon: Smartphone, color: '#FFFFFF' },
  { name: 'Docker', icon: Cloud, color: '#2496ED' },
  { name: 'Redux', icon: Layers, color: '#764ABC' },
  { name: 'Framer Motion', icon: Zap, color: '#0055FF' },
  { name: 'GraphQL', icon: Hexagon, color: '#E10098' }
]

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity: number }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  // Wrap to infinite loop
  const x = useTransform(baseX, (v) => `${(v % 50) - 25}%`)

  const directionFactor = useRef<number>(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    // Change direction if scrolling up
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div style={{ overflow: 'hidden', display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
      <motion.div style={{ x, display: 'flex', gap: 32 }}>
        <div style={{ display: 'flex', gap: 32 }}>{children}</div>
        <div style={{ display: 'flex', gap: 32 }}>{children}</div>
        <div style={{ display: 'flex', gap: 32 }}>{children}</div>
        <div style={{ display: 'flex', gap: 32 }}>{children}</div>
      </motion.div>
    </div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tech" className="qp-section" style={{ background: 'transparent' }}>
      <div ref={ref} style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: -20, background: 'var(--bg-glass)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', zIndex: -1, pointerEvents: 'none', borderRadius: 24, border: '1px solid var(--border)' }} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="qp-overline"
          style={{ marginBottom: 16 }}
        >
          Technology
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="qp-headline"
          style={{ marginBottom: 24, maxWidth: 600 }}
        >
          Built with the{' '}
          <span className="qp-gradient">best tools.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="qp-body"
          style={{ maxWidth: 600, marginBottom: 56 }}
        >
          We leverage modern, proven technologies across every layer of the stack.
        </motion.p>

      {/* Scrolling Track 1 */}
      <div style={{ marginTop: 64, position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #050816, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #050816, transparent)' }} />
        
        <ParallaxText baseVelocity={-2}>
          {techs.map((tech, i) => {
            const Icon = tech.icon
            return (
              <div key={i} className="qp-glass" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '1rem 2rem', borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <Icon size={24} color={tech.color} />
                <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{tech.name}</span>
              </div>
            )
          })}
        </ParallaxText>
      </div>

      {/* Scrolling Track 2 (Reverse) */}
      <div style={{ marginTop: 32, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to right, #050816, transparent)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 10, pointerEvents: 'none', background: 'linear-gradient(to left, #050816, transparent)' }} />
        
        <ParallaxText baseVelocity={2}>
          {techs.map((tech, i) => {
            const Icon = tech.icon
            return (
              <div key={`rev-${i}`} className="qp-glass" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '1rem 2rem', borderRadius: 16,
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <Icon size={24} color={tech.color} />
                <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{tech.name}</span>
              </div>
            )
          }).reverse()}
        </ParallaxText>
      </div>

        <div className="qp-divider" style={{ marginTop: 48 }} />
      </div>
    </section>
  )
}
