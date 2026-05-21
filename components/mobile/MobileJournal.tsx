'use client'

import { motion } from 'framer-motion'

const ENTRIES = [
  { id: 1, title: 'The Future of Web3 Gaming', date: 'Oct 12', readTime: '5 min read', src: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=200&auto=format&fit=crop' },
  { id: 2, title: 'Engineering Scalable AI Systems', date: 'Sep 28', readTime: '8 min read', src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=200&auto=format&fit=crop' },
  { id: 3, title: 'Building Fluid Digital Interfaces', date: 'Sep 15', readTime: '4 min read', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop' },
  { id: 4, title: 'Optimizing Next.js for the Edge', date: 'Aug 30', readTime: '6 min read', src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop' },
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
          {ENTRIES.map((entry) => (
            <div 
              key={entry.id}
              className="flex items-center gap-4 p-3 bg-mobile-surface/30 hover:bg-mobile-surface border border-mobile-stroke rounded-[32px] transition-colors cursor-pointer"
            >
              <img 
                src={entry.src} 
                alt={entry.title}
                className="w-16 h-16 rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 className="text-mobile-text text-sm font-medium truncate">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-mobile-muted">
                  <span>{entry.date}</span>
                  <span className="w-1 h-1 rounded-full bg-mobile-stroke" />
                  <span>{entry.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
