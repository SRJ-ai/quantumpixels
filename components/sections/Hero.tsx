'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { useTheme } from '@/components/ThemeContext'
import TiltText from '@/components/ui/TiltText'

export default function Hero() {
  const { mode } = useTheme()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoOpacity, setVideoOpacity] = useState(0)

  // Light Mode Video Engine
  useEffect(() => {
    if (mode !== 'light') return

    const video = videoRef.current
    if (!video) return

    let animationFrameId: number

    const handleTimeUpdate = () => {
      if (!video.duration) return
      
      const currentTime = video.currentTime
      const duration = video.duration
      const fadeDuration = 0.5

      if (currentTime < fadeDuration) {
        setVideoOpacity(currentTime / fadeDuration)
      } else if (currentTime > duration - fadeDuration) {
        setVideoOpacity((duration - currentTime) / fadeDuration)
      } else {
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

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(handleTimeUpdate)
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)

    // Attempt autoplay immediately
    video.play().catch((err) => console.log('Autoplay blocked:', err))

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (video) {
        video.removeEventListener('ended', handleEnded)
        video.removeEventListener('play', handlePlay)
      }
    }
  }, [mode])

  // --- DARK MODE HERO ---
  if (mode === 'dark') {
    return (
      <section
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
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 24 }}
          >
            <span className="qp-pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
            <span className="qp-overline" style={{ color: 'var(--text-primary)' }}>Student-Founded · Engineering the Future</span>
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
            style={{ maxWidth: 560, margin: '0 auto 32px', color: 'var(--text-secondary)' }}
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
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                padding: '0.875rem 2rem', borderRadius: 999,
                background: 'var(--text-primary)', color: 'var(--bg-primary)',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Explore Our Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                padding: '0.875rem 2rem', borderRadius: 999,
                border: '1px solid var(--border)', color: 'var(--text-primary)',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                background: 'var(--bg-glass)', backdropFilter: 'blur(10px)',
                transition: 'border-color 0.3s, background 0.3s',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-glass-heavy)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-glass)'; }}
            >
              Start a Project
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={16} color="currentColor" style={{ color: 'var(--text-primary)' }} />
          </motion.div>
        </motion.div>
      </section>
    )
  }

  // --- LIGHT MODE HERO ---
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
      {/* Video Background */}
      <div style={{ position: 'absolute', top: '300px', inset: 'auto 0 0 0', zIndex: 0, height: '100%' }}>
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          autoPlay
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
            backgroundColor: '#000000',
            color: '#FFFFFF',
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
