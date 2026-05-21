'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/ThemeContext'

export default function Hero() {
  const { mode } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoOpacity, setVideoOpacity] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number

    const handleTimeUpdate = () => {
      if (!video.duration) return
      
      const currentTime = video.currentTime
      const duration = video.duration
      const fadeDuration = 0.5

      if (currentTime < fadeDuration) {
        // Fade in
        setVideoOpacity(currentTime / fadeDuration)
      } else if (currentTime > duration - fadeDuration) {
        // Fade out
        setVideoOpacity((duration - currentTime) / fadeDuration)
      } else {
        // Full opacity
        setVideoOpacity(1)
      }

      animationFrameId = requestAnimationFrame(handleTimeUpdate)
    }

    const handleEnded = () => {
      setVideoOpacity(0)
      setTimeout(() => {
        if (video) {
          video.currentTime = 0
          video.play().catch(console.error)
        }
      }, 100)
    }

    video.addEventListener('ended', handleEnded)
    
    // Start tracking when playing
    video.addEventListener('play', () => {
      animationFrameId = requestAnimationFrame(handleTimeUpdate)
    })

    // Attempt autoplay
    video.play().catch(console.error)

    return () => {
      cancelAnimationFrame(animationFrameId)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        paddingTop: 'calc(8rem - 75px)',
        paddingBottom: '10rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Video Background - Only visible in Light Mode per the goal constraint */}
      {mode === 'light' && (
        <div style={{ position: 'absolute', top: '300px', inset: 'auto 0 0 0', zIndex: 0, height: '100%' }}>
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: videoOpacity,
              transition: 'opacity 0.1s linear'
            }}
          />
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 50%, var(--bg-primary) 100%)'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-instrument-serif)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            maxWidth: '80rem',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-2.46px',
            color: 'var(--text-primary)',
            margin: 0
          }}
        >
          Beyond <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>silence,</span> we build <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>the eternal.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            maxWidth: '42rem',
            marginTop: '2rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)'
          }}
        >
          Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{
            marginTop: '3rem',
            padding: '1.25rem 3.5rem',
            borderRadius: 999,
            backgroundColor: mode === 'light' ? '#000000' : '#FFFFFF',
            color: mode === 'light' ? '#FFFFFF' : '#000000',
            fontSize: '1rem',
            fontWeight: 500,
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          Begin Journey
        </motion.a>
      </div>
    </section>
  )
}
