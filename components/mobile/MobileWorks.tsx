'use client'

import { motion } from 'framer-motion'

const PROJECTS = [
  { id: 1, title: 'Quantum Learn', src: '/projects/quantum_learn_bg_1779347035399.png' },
  { id: 2, title: 'PixelForge', src: '/projects/pixel_forge_bg_1779347051532.png' },
  { id: 3, title: 'NeuralBoard', src: '/projects/neural_board_bg_1779347071411.png' },
  { id: 4, title: 'CodeQuest', src: '/projects/code_quest_bg_1779347089933.png' },
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

              {/* Mobile Default Label */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center transition-opacity duration-300">
                <div className="gpu-accelerate bg-mobile-bg/70 backdrop-blur-xl border border-white/20 px-5 py-2.5 rounded-full text-mobile-text font-display italic text-lg shadow-xl" style={{ fontFamily: 'var(--font-instrument)' }}>
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
