'use client'

import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import TiltText from '@/components/ui/TiltText'
import { useTheme } from '@/components/ThemeContext'

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoOpacity, setVideoOpacity] = useState(0)
  const { mode } = useTheme()

  useEffect(() => {
    if (mode !== 'light') return
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number
    const checkVideoTime = () => {
      if (!video) return
      const { currentTime, duration } = video
      if (duration > 0) {
        if (currentTime < 0.5) setVideoOpacity(currentTime / 0.5)
        else if (duration - currentTime < 0.5) setVideoOpacity((duration - currentTime) / 0.5)
        else setVideoOpacity(1)
        
        if (duration - currentTime <= 0.05) {
          setVideoOpacity(0)
          setTimeout(() => {
            if (video) {
              video.currentTime = 0
              video.play().catch(() => {})
            }
          }, 100)
        }
      }
      animationFrameId = requestAnimationFrame(checkVideoTime)
    }
    
    video.addEventListener('play', () => { animationFrameId = requestAnimationFrame(checkVideoTime) })
    return () => { cancelAnimationFrame(animationFrameId) }
  }, [mode])

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
      {mode === 'light' ? (
        <>
          <div style={{ position: 'absolute', top: '300px', inset: 'auto 0 0 0', zIndex: 0, opacity: videoOpacity, transition: 'opacity 0.1s linear' }}>
            <video
              ref={videoRef}
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
              muted
              playsInline
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, #FFFFFF 0%, transparent 50%, #FFFFFF 100%)' }} />
          </div>

          <div style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '10rem', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
            <h1 className="animate-fade-rise" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', maxWidth: '80rem', fontWeight: 400, fontFamily: 'var(--font-instrument-serif)', lineHeight: 0.95, letterSpacing: '-2.46px', color: '#000000', margin: 0 }}>
              Beyond <em style={{ fontStyle: 'italic', color: '#6F6F6F' }}>silence,</em> we build <em style={{ fontStyle: 'italic', color: '#6F6F6F' }}>the eternal.</em>
            </h1>
            <p className="animate-fade-rise-delay" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', maxWidth: '42rem', marginTop: '2rem', lineHeight: 1.625, color: '#6F6F6F', fontFamily: 'var(--font-inter)' }}>
              Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
            </p>
            <motion.a
              href="#contact"
              className="animate-fade-rise-delay-2"
              whileHover={{ scale: 1.03 }}
              style={{ padding: '1.25rem 3.5rem', borderRadius: 999, fontSize: '1rem', marginTop: '3rem', background: '#000000', color: '#FFFFFF', textDecoration: 'none', display: 'inline-block' }}
            >
              Begin Journey
            </motion.a>
          </div>
        </>
      ) : (
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
      )}

      {mode !== 'light' && (
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
      )}
    </section>
  )
}
