'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function IntroLoader() {
  const [show, setShow] = useState(true)
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')

  useEffect(() => {
    // Check if already seen this session
    if (sessionStorage.getItem('qp-intro-shown')) {
      setShow(false)
      return
    }

    let current = 0
    const target = 100

    const tick = setInterval(() => {
      const step = Math.random() * 18 + 5
      current = Math.min(current + step, target)
      setPct(Math.floor(current))

      if (current >= target) {
        clearInterval(tick)
        setPhase('done')
        setTimeout(() => {
          setShow(false)
          sessionStorage.setItem('qp-intro-shown', '1')
        }, 900)
      }
    }, 60)

    return () => clearInterval(tick)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            background: '#050816',
            zIndex: 99999,
          }}
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Radial glow behind logo */}
          <div
            className="absolute"
            style={{
              width: 400,
              height: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,255,178,0.08) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Logo block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-8"
          >
            {/* Pulsing icon */}
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0,255,178,0.5) 0%, transparent 70%)',
                  filter: 'blur(24px)',
                }}
              />
              <div
                className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(0,255,178,0.06)',
                  border: '1px solid rgba(0,255,178,0.25)',
                  boxShadow: '0 0 40px rgba(0,255,178,0.1), inset 0 0 20px rgba(0,255,178,0.05)',
                }}
              >
                <Zap size={40} color="#00FFB2" />
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, letterSpacing: '0.8em' }}
                animate={{ opacity: 1, letterSpacing: '0.25em' }}
                transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-bold uppercase text-white"
                style={{ fontFamily: 'Space Grotesk, var(--font-space-grotesk), sans-serif' }}
              >
                QUANTUM<span className="text-gradient-green">PIXELS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-xs text-[#94A3B8] tracking-[0.5em] uppercase mt-3"
              >
                Engineering The Future
              </motion.p>
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-16 flex flex-col items-center gap-3 w-52"
          >
            <div
              className="w-full h-px rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                className="h-full"
                style={{
                  background: 'linear-gradient(to right, #00FFB2, #00E5FF)',
                  width: `${pct}%`,
                  transition: 'width 0.08s linear',
                  boxShadow: '0 0 8px rgba(0,255,178,0.8)',
                }}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase">
                {phase === 'done' ? 'Ready' : 'Initializing'}
              </span>
              <span className="text-[10px] font-mono" style={{ color: '#00FFB2' }}>
                {pct}%
              </span>
            </div>
          </motion.div>

          {/* Corner scan lines */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-12 h-12`}>
              <div
                className="absolute"
                style={{
                  width: 30, height: 1,
                  background: '#00FFB2',
                  opacity: 0.4,
                  ...(pos.includes('right') ? { right: 0 } : { left: 0 }),
                  ...(pos.includes('bottom') ? { bottom: 0 } : { top: 0 }),
                }}
              />
              <div
                className="absolute"
                style={{
                  width: 1, height: 30,
                  background: '#00FFB2',
                  opacity: 0.4,
                  ...(pos.includes('right') ? { right: 0 } : { left: 0 }),
                  ...(pos.includes('bottom') ? { bottom: 0 } : { top: 0 }),
                }}
              />
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
