'use client'

import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Preloader() {
  const { active, progress } = useProgress()
  const [show, setShow] = useState(true)

  // Wait a tiny bit after reaching 100% to ensure smooth transition
  useEffect(() => {
    if (progress === 100 || !active) {
      const timer = setTimeout(() => setShow(false), 800)
      return () => clearTimeout(timer)
    }
  }, [progress, active])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#050816',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <div style={{ position: 'relative', width: 200, height: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: 4 }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: '#00FFB2',
                boxShadow: '0 0 10px #00FFB2',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.2 }}
            />
          </div>
          
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', width: 200, fontSize: 12, fontWeight: 500, letterSpacing: '0.1em' }}>
            <span style={{ color: '#86868B' }}>BOOTING SYSTEM</span>
            <span style={{ color: '#00FFB2' }}>{Math.round(progress)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
