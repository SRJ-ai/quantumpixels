'use client'

import { motion } from 'framer-motion'

const ENTRIES = [
  { id: 1, title: 'The Future of Web3 Gaming', date: 'Oct 12', readTime: '5 min read', src: '/projects/pixel_forge_bg_1779347051532.png' },
  { id: 2, title: 'Engineering Scalable AI Systems', date: 'Sep 28', readTime: '8 min read', src: '/projects/quantum_learn_bg_1779347035399.png' },
  { id: 3, title: 'Building Fluid Digital Interfaces', date: 'Sep 15', readTime: '4 min read', src: '/projects/neural_board_bg_1779347071411.png' },
  { id: 4, title: 'Optimizing Next.js for the Edge', date: 'Aug 30', readTime: '6 min read', src: '/projects/code_quest_bg_1779347089933.png' },
]

export default function MobileJournal() {
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
            <span className="text-xs text-mobile-muted uppercase tracking-[0.3em]">Journal</span>
          </div>
          <h2 className="text-4xl text-mobile-text mb-4">
            Recent <span className="font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>thoughts</span>
          </h2>
          <p className="text-mobile-muted text-sm max-w-sm">
            Insights on engineering, design, and building the future.
          </p>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <a 
              key={entry.id}
              href={`#journal-${entry.id}`}
              className="group block min-h-[44px]"
            >
              <div className="flex items-center gap-4 py-4 border-b border-mobile-stroke/50">
                
                {/* Number */}
                <span className="text-xs text-mobile-muted w-6 flex-shrink-0">
                  0{entry.id}
                </span>

                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-mobile-surface">
                  <img 
                    src={entry.src} 
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-mobile-text font-medium text-lg leading-tight truncate mb-1" style={{ fontFamily: 'var(--font-inter)' }}>
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-mobile-muted">
                    <span>{entry.date}</span>
                    <span className="w-1 h-1 rounded-full bg-mobile-stroke" />
                    <span>{entry.readTime}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-8 h-8 rounded-full border border-mobile-stroke flex items-center justify-center text-mobile-muted group-hover:text-mobile-text group-hover:border-mobile-text transition-colors flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>

              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
