'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import HlsVideo from './HlsVideo'

const ROLES = ["Innovators", "Engineers", "Founders", "Creators"]

export default function MobileHero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isNavScrolled, setIsNavScrolled] = useState(false)

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(roleInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // GSAP Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.fromTo(
      '.name-reveal',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
    )
    .fromTo(
      '.blur-in',
      { opacity: 0, filter: 'blur(10px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
      '-=0.8'
    )
  }, [])

  return (
    <section className="mobile-layout relative w-full h-[100dvh] overflow-hidden bg-mobile-bg">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <HlsVideo 
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-mobile-bg to-transparent" />
      </div>

      {/* Navbar (Pill) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 safe-pt pt-4">
        <div className={`gpu-accelerate inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-mobile-surface px-2 py-2 transition-shadow duration-300 ${isNavScrolled ? 'shadow-md shadow-black/50' : ''}`}>
          {/* Logo */}
          <div className="group relative w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 hover:scale-110">
            <div className="absolute inset-0 rounded-full p-[1px] mobile-accent-gradient" style={{ animationDirection: 'normal' }}>
              <div className="w-full h-full bg-mobile-bg rounded-full flex items-center justify-center">
                <span className="font-display italic text-[13px] text-mobile-text" style={{ fontFamily: 'var(--font-instrument)' }}>QP</span>
              </div>
            </div>
          </div>
          
          <div className="w-px h-5 bg-mobile-stroke mx-2 hidden sm:block" />

          {/* Links */}
          <div className="flex items-center gap-1">
            {['Home', 'Work', 'Vision'].map((link, i) => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`text-xs rounded-full px-4 py-3 min-w-[44px] text-center transition-colors ${i === 0 ? 'text-mobile-text bg-mobile-stroke/50' : 'text-mobile-muted hover:text-mobile-text hover:bg-mobile-stroke/50'}`}>
                {link}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-mobile-stroke mx-2" />

          {/* CTA */}
          <a href="mailto:hello@quantumpixels.dev" className="group relative text-xs rounded-full cursor-pointer min-h-[44px] flex items-center">
            <span className="absolute inset-[-2px] rounded-full mobile-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-mobile-surface backdrop-blur-md px-4 py-3 rounded-full flex items-center gap-1 text-mobile-text">
              Say hi <span className="text-[10px]">↗</span>
            </div>
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="blur-in gpu-accelerate text-xs text-mobile-muted uppercase tracking-[0.3em] mb-6">
          EST. 2024
        </div>
        
        <h1 className="name-reveal gpu-accelerate text-6xl sm:text-8xl font-display italic leading-[0.9] tracking-tight text-mobile-text mb-4" style={{ fontFamily: 'var(--font-instrument)' }}>
          Quantum Pixels
        </h1>
        
        <div className="blur-in text-lg sm:text-xl text-mobile-text mb-8 h-8">
          A team of{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="font-display italic inline-block"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
          {' '}building the future.
        </div>

        <p className="blur-in text-sm text-mobile-muted max-w-sm mb-10">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in flex items-center gap-4 relative z-20">
          <a href="#works" className="group relative rounded-full text-sm min-h-[44px] px-6 py-3 transition-transform hover:scale-105 bg-mobile-text text-mobile-bg font-medium flex items-center justify-center">
            <span className="absolute inset-[-2px] rounded-full mobile-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-mobile-text group-hover:bg-mobile-bg block px-6 py-3 rounded-full -m-[12px] transition-colors">See Works</span>
          </a>
          
          <a href="mailto:hello@quantumpixels.dev" className="group relative rounded-full text-sm min-h-[44px] px-6 py-3 transition-transform hover:scale-105 border-2 border-mobile-stroke bg-transparent text-mobile-text font-medium hover:border-transparent flex items-center justify-center">
            <span className="absolute inset-[-2px] rounded-full mobile-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:bg-mobile-bg block px-6 py-3 rounded-full -m-[14px] transition-colors">Reach out</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-[10px] text-mobile-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-10 bg-mobile-stroke/50 overflow-hidden relative">
          <div className="w-full h-full bg-mobile-text absolute top-0 left-0" style={{ animation: 'var(--animate-scroll-down)' }} />
        </div>
      </div>
    </section>
  )
}
