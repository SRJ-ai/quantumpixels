'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WORDS = ["Design", "Create", "Inspire"]

interface MobileLoadingScreenProps {
  onComplete: () => void
}

export default function MobileLoadingScreen({ onComplete }: MobileLoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationDuration = 2700

  // Counter logic
  useEffect(() => {
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = timestamp - startTimeRef.current

      // Calculate percentage 0 to 100
      const percentage = Math.min(Math.floor((progress / animationDuration) * 100), 100)
      setCount(percentage)

      if (progress < animationDuration) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        // Complete
        setTimeout(() => onComplete(), 400)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [onComplete])

  // Word cycling logic
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length)
    }, 900)
    return () => clearInterval(wordInterval)
  }, [])

  return (
    <div className="mobile-layout fixed inset-0 z-[9999] bg-mobile-bg text-mobile-text flex flex-col justify-between p-6">
      {/* Top Left Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-xs text-mobile-muted uppercase tracking-[0.3em]"
      >
        QuantumPixels
      </motion.div>

      {/* Center Rotating Words */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden h-[80px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-4xl sm:text-6xl font-display italic text-mobile-text/80"
            style={{ fontFamily: 'var(--font-instrument)' }}
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-6">
        {/* Counter Display */}
        <div className="flex justify-end">
          <div 
            className="text-6xl sm:text-8xl font-display text-mobile-text tabular-nums"
            style={{ fontFamily: 'var(--font-instrument)' }}
          >
            {String(count).padStart(3, "0")}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="h-[3px] bg-mobile-stroke/50 w-full overflow-hidden rounded-full">
          <div
            className="h-full mobile-accent-gradient origin-left rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
              transition: 'transform 0.1s linear'
            }}
          />
        </div>
      </div>
    </div>
  )
}
