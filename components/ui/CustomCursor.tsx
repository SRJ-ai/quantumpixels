'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // Wait until first mouse move to show
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    setIsTouch(isTouchDevice)
    if (isTouchDevice) return

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null
        
      setIsHovering(isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    
    // Hide default cursor on body
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.body.style.cursor = 'auto'
    }
  }, [isVisible, isTouch])

  if (isTouch || !isVisible) return null

  return (
    <>
      {/* Main trailing dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 32, height: 32,
          borderRadius: '50%',
          backgroundColor: isHovering ? 'transparent' : 'transparent',
          border: isHovering ? '1px solid var(--text-primary)' : '1px solid var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
          mass: 0.5
        }}
      >
        {/* Core dot */}
        <motion.div
          style={{
            width: 6, height: 6,
            borderRadius: '50%',
            backgroundColor: 'var(--text-primary)',
          }}
          animate={{
            scale: isHovering ? 0 : 1,
            opacity: isHovering ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
