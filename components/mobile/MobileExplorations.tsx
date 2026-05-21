'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EXPLORATIONS = [
  { id: 1, src: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop', speed: 0.5 },
  { id: 2, src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop', speed: 0.8 },
  { id: 3, src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop', speed: 0.6 },
  { id: 4, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop', speed: 0.9 },
  { id: 5, src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=400&auto=format&fit=crop', speed: 0.4 },
  { id: 6, src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop', speed: 0.7 },
]

export default function MobileExplorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const pin = pinRef.current
    const columns = columnsRef.current

    if (!section || !pin || !columns) return

    // Pin the center content
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pin,
      pinSpacing: false,
    })

    // Parallax the columns
    const columnElements = gsap.utils.toArray('.parallax-item', columns) as HTMLElement[]
    
    columnElements.forEach((item, i) => {
      const speed = EXPLORATIONS[i].speed
      
      // We animate from bottom to top as we scroll
      gsap.fromTo(item, 
        { y: window.innerHeight },
        {
          y: -window.innerHeight * 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    })

    return () => {
      pinTrigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="mobile-layout relative bg-mobile-bg min-h-[300vh]">
      {/* Pinned Center Layer */}
      <div ref={pinRef} className="absolute inset-0 z-10 w-full h-[100dvh] flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-px bg-mobile-stroke" />
          <span className="text-xs text-mobile-muted uppercase tracking-[0.3em]">Explorations</span>
          <div className="w-8 h-px bg-mobile-stroke" />
        </div>
        
        <h2 className="text-5xl text-mobile-text mb-6">
          Visual <span className="font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>playground</span>
        </h2>
        
        <p className="text-mobile-muted text-sm max-w-[280px] mb-8">
          A collection of experiments, prototypes, and conceptual designs.
        </p>

        <button className="pointer-events-auto group relative rounded-full text-sm px-6 py-3 transition-transform hover:scale-105 border-2 border-mobile-stroke bg-mobile-bg text-mobile-text font-medium hover:border-transparent">
          <span className="absolute inset-[-2px] rounded-full mobile-accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 block px-6 py-3 rounded-full -m-[14px] bg-mobile-bg">View Dribbble</span>
        </button>
      </div>

      {/* Parallax Columns Layer */}
      <div className="absolute inset-0 z-20 w-full h-full pointer-events-none overflow-hidden">
        <div ref={columnsRef} className="max-w-[800px] mx-auto h-full px-4 relative">
          <div className="grid grid-cols-2 gap-4 h-full relative pt-[50vh]">
            {EXPLORATIONS.map((exp, i) => (
              <div 
                key={exp.id}
                className={`parallax-item w-full aspect-square rounded-3xl overflow-hidden border border-white/10 ${i % 2 === 0 ? 'mt-0' : 'mt-32'}`}
              >
                <img 
                  src={exp.src} 
                  alt={`Exploration ${exp.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dark gradient fades at top and bottom to blend with other sections */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-mobile-bg to-transparent z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mobile-bg to-transparent z-30 pointer-events-none" />
    </section>
  )
}
