'use client'

import { useState } from 'react'
import MobileLoadingScreen from './MobileLoadingScreen'
import MobileHero from './MobileHero'
import MobileWorks from './MobileWorks'
import MobileJournal from './MobileJournal'
import MobileExplorations from './MobileExplorations'
import MobileStats from './MobileStats'
import MobileFooter from './MobileFooter'

export default function MobileLanding() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="mobile-layout min-h-screen bg-mobile-bg text-mobile-text font-body selection:bg-mobile-accent/30 selection:text-white" style={{ fontFamily: 'var(--font-inter)' }}>
      {isLoading && <MobileLoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <main>
          <MobileHero />
          <MobileWorks />
          <MobileJournal />
          <MobileExplorations />
          <MobileStats />
          <MobileFooter />
        </main>
      )}
    </div>
  )
}
