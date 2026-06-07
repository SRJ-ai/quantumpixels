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

import Vision from '@/components/sections/Vision'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const { mode } = useTheme()

  return (
    <SmoothScroll>
      <main style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        
        {/* Premium Mobile Fallback / Desktop 3D Canvas */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
            <color attach="background" args={['#000000']} />
            <HybridScene />
          </Canvas>
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

            <Vision />
            <CTA />
            <Footer />
          </div>
        </div>

      </main>
    </SmoothScroll>
  )
}
