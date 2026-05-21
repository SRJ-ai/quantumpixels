'use client'

import { useEffect, useRef } from 'react'

export default function SoundManager() {
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context only on first interaction to respect browser autoplay policies
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        
        // Trigger AI Voice Greeting
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Welcome to Quantum Pixels. System initialized.')
          utterance.rate = 0.9
          utterance.pitch = 0.8
          window.speechSynthesis.speak(utterance)
        }
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }

    const playHoverSound = () => {
      if (!audioCtxRef.current) return
      
      const ctx = audioCtxRef.current
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, ctx.currentTime) // High tech blip
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05)
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01) // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start()
      osc.stop(ctx.currentTime + 0.06)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null
        
      if (isClickable) {
        playHoverSound()
      }
    }

    // Bind interaction events to initialize audio context
    window.addEventListener('click', initAudio, { once: true })
    window.addEventListener('keydown', initAudio, { once: true })
    
    // Bind hover sounds
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('click', initAudio)
      window.removeEventListener('keydown', initAudio)
    }
  }, [])

  return null
}
