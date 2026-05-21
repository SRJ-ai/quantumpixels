'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HybridScene from '@/components/ui/HybridScene'
import SmoothScroll from '@/components/SmoothScroll'
import { useTheme } from '@/components/ThemeContext'

import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyUs from '@/components/sections/WhyUs'
import Projects from '@/components/sections/Projects'
import TechStack from '@/components/sections/TechStack'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import Vision from '@/components/sections/Vision'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const [isMobile, setIsMobile] = useState(true) // Default to mobile for safety/performance
  const { mode } = useTheme()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SmoothScroll>
      <main style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        
        {/* Premium Mobile Fallback / Desktop 3D Canvas */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          {isMobile ? (
            <div style={{ width: '100%', height: '100%', background: mode === 'light' ? 'radial-gradient(circle at 50% 0%, rgba(0,255,178,0.1) 0%, rgba(245,245,247,1) 60%)' : 'radial-gradient(circle at 50% 0%, rgba(0,255,178,0.15) 0%, rgba(0,0,0,1) 60%)' }}>
              <div className="qp-pulse-dot" style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, background: mode === 'light' ? 'rgba(0,184,148,0.3)' : 'rgba(0,255,178,0.1)', filter: 'blur(100px)', borderRadius: '50%', mixBlendMode: mode === 'light' ? 'multiply' : 'normal' }} />
              <div className="qp-pulse-dot" style={{ position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250, background: mode === 'light' ? 'rgba(147,51,234,0.2)' : 'rgba(168,85,247,0.08)', filter: 'blur(90px)', borderRadius: '50%', animationDelay: '1s', mixBlendMode: mode === 'light' ? 'multiply' : 'normal' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: mode === 'light' ? 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)' : 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }} />
            </div>
          ) : (
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
              <color attach="background" args={[mode === 'light' ? '#F5F5F7' : '#000000']} />
              <HybridScene />
            </Canvas>
          )}
        </div>
        
        {/* Native HTML Scroll Content */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <Navbar />
          <div style={{ paddingTop: '80px' }}>
            <Hero />
            <About />
            <Services />
            <WhyUs />
            <Projects />
            <TechStack />
            <Process />
            <Testimonials />
            <Vision />
            <CTA />
            <Footer />
          </div>
        </div>

      </main>
    </SmoothScroll>
  )
}
