'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HlsVideo from './HlsVideo'

export default function MobileFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 20,
        ease: "none",
        repeat: -1
      })
    }
  }, [])

  return (
    <footer className="mobile-layout relative bg-mobile-bg pt-16 pb-8 safe-pb overflow-hidden border-t border-mobile-stroke">
      
      {/* Flipped Background Video */}
      <div className="absolute inset-0 z-0 scale-y-[-1]">
        <HlsVideo 
          src="https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        {/* Heavy Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10">
        
        {/* GSAP Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap mb-16">
          <div ref={marqueeRef} className="flex">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex text-4xl sm:text-6xl text-mobile-text/50 font-display italic tracking-widest px-4" style={{ fontFamily: 'var(--font-instrument)' }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="mr-8">BUILDING THE FUTURE •</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center text-center px-4 mb-16">
          <h2 className="text-3xl text-mobile-text mb-8">
            Ready to <span className="font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>innovate?</span>
          </h2>
          <a href="mailto:hello@quantumpixels.dev" className="group relative rounded-full inline-block">
            <span className="absolute inset-[-2px] rounded-full mobile-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-mobile-surface backdrop-blur-md px-8 py-4 rounded-full text-mobile-text font-medium text-lg flex items-center gap-2">
              hello@quantumpixels.dev <span className="text-sm">↗</span>
            </div>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-6 pt-8 border-t border-mobile-stroke/50">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-xs text-mobile-muted">Available for projects</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-mobile-muted">
            <a href="#" className="hover:text-mobile-text transition-colors">Twitter</a>
            <a href="#" className="hover:text-mobile-text transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-mobile-text transition-colors">GitHub</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
