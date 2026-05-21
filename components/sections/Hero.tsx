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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}
        >
          <span className="qp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FFB2', display: 'inline-block' }} />
          <span className="qp-overline" style={{ color: '#F5F5F7', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Student-Founded · Engineering the Future</span>
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
          style={{ maxWidth: 560, margin: '0 auto 48px', color: '#E5E5EA', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
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
          <a
            href="#services"
            style={{
              padding: '0.875rem 2rem', borderRadius: 999,
              background: '#F5F5F7', color: '#000',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#F5F5F7')}
          >
            Explore Our Work
          </a>
          <a
            href="#contact"
            style={{
              padding: '0.875rem 2rem', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)', color: '#F5F5F7',
              fontSize: 14, fontWeight: 600, textDecoration: 'none',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
              transition: 'border-color 0.3s, background 0.3s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(0,0,0,0.6)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(0,0,0,0.4)' }}
          >
            Start a Project
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={16} color="#fff" />
        </motion.div>
      </motion.div>
    </section>
  )
}
