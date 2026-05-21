'use client'

import { motion } from 'framer-motion'

const PROJECTS = [
  { id: 1, title: 'AI Automation', src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Immersive Gaming', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Education Platforms', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'System Architecture', src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
]

export default function MobileWorks() {
  return (
    <section className="mobile-layout bg-mobile-bg py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-mobile-stroke" />
            <span className="text-xs text-mobile-muted uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <h2 className="text-4xl text-mobile-text mb-4">
            Featured <span className="font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>projects</span>
          </h2>
          <p className="text-mobile-muted text-sm max-w-sm">
            A selection of projects we've engineered, from concept to launch.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="flex flex-col gap-5">
          {PROJECTS.map((p, i) => (
            <div 
              key={p.id}
              className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-mobile-surface border border-mobile-stroke"
            >
              {/* Background Image */}
              <img 
                src={p.src} 
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}
              />

              {/* Hover Darken (mostly for tablets, touch devices don't hover well but nice to have) */}
              <div className="absolute inset-0 bg-mobile-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

              {/* Hover Label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="relative p-[1px] rounded-full mobile-accent-gradient shadow-lg">
                  <div className="bg-white text-black px-5 py-2 rounded-full flex items-center gap-2">
                    <span className="text-sm font-medium">View —</span>
                    <span className="font-display italic text-lg" style={{ fontFamily: 'var(--font-instrument)' }}>{p.title}</span>
                  </div>
                </div>
              </div>

              {/* Mobile Default Label (Since touch doesn't hover) */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center group-hover:opacity-0 transition-opacity duration-300">
                <div className="bg-mobile-bg/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-mobile-text font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>
                  {p.title}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
