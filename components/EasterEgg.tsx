'use client'

import { useEffect, useState } from 'react'

export default function EasterEgg() {
  const [sequence, setSequence] = useState<string>('')
  const target = 'quantum'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the new key to the sequence
      const newSequence = (sequence + e.key.toLowerCase()).slice(-target.length)
      setSequence(newSequence)

      if (newSequence === target) {
        // Trigger the hacked event
        const event = new CustomEvent('hacked')
        window.dispatchEvent(event)
        
        // Reset sequence so it doesn't fire continuously
        setSequence('')
        
        // Optional: invert colors of the document body for a true "glitch" feel
        document.body.style.filter = 'invert(1) hue-rotate(180deg)'
        setTimeout(() => {
          document.body.style.filter = 'none'
        }, 1000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence])

  return null
}
