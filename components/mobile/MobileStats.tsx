'use client'

export default function MobileStats() {
  return (
    <section className="mobile-layout bg-mobile-bg py-16 md:py-24 px-4 border-t border-mobile-stroke">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 gap-12 text-center">
          
          <div className="flex flex-col items-center gap-2">
            <div className="text-6xl text-mobile-text font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>
              10+
            </div>
            <div className="text-xs text-mobile-muted uppercase tracking-[0.2em]">
              Years Experience
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-6xl text-mobile-text font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>
              95+
            </div>
            <div className="text-xs text-mobile-muted uppercase tracking-[0.2em]">
              Projects Done
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-6xl text-mobile-text font-display italic" style={{ fontFamily: 'var(--font-instrument)' }}>
              200%
            </div>
            <div className="text-xs text-mobile-muted uppercase tracking-[0.2em]">
              Satisfied Clients
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
