'use client'

import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltText() {
  const ref = useRef<HTMLDivElement>(null)
  
  // Motion values for tracking mouse
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth return and movement
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // Transform mouse position into rotation values (max 15 degrees tilt)
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-15, 15])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -0.5 to 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        display: 'inline-block'
      }}
    >
      <motion.h1
        className="qp-display"
        style={{ 
          rotateX, 
          rotateY,
          marginBottom: 32,
          display: 'inline-block'
        }}
      >
        We build digital
        <br />
        products that{' '}
        <span className="qp-gradient">matter</span>.
      </motion.h1>
    </motion.div>
  )
}
