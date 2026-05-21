'use client'

import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

interface HlsVideoProps {
  src: string
  className?: string
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
  playsInline?: boolean
}

export default function HlsVideo({
  src,
  className = '',
  muted = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
}: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls

    if (Hls.isSupported()) {
      hls = new Hls({
        startPosition: -1,
        capLevelToPlayerSize: true,
      })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch((e) => console.log('Autoplay prevented:', e))
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = src
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) {
          video.play().catch((e) => console.log('Autoplay prevented:', e))
        }
      })
    }

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src, autoPlay])

  return (
    <video
      ref={videoRef}
      className={className}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
      playsInline={playsInline}
    />
  )
}
