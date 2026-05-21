'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleCosmos() {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()
  
  // Track native scroll progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Init
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate a massive galaxy/cosmos of particles
  const count = 15000
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorA = new THREE.Color('#00FFB2') // Cyber cyan
    const colorB = new THREE.Color('#A855F7') // Purple
    const colorMix = new THREE.Color()

    for (let i = 0; i < count; i++) {
      // Create a long tube/tunnel of particles that we can fly through
      const radius = 2 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      // Stretch them deeply along the Z axis (from 10 to -200)
      const z = 10 - Math.random() * 250

      pos[i * 3] = Math.cos(theta) * radius
      pos[i * 3 + 1] = Math.sin(theta) * radius
      pos[i * 3 + 2] = z

      // Mix colors based on radius and depth
      colorMix.lerpColors(colorA, colorB, Math.random())
      col[i * 3] = colorMix.r
      col[i * 3 + 1] = colorMix.g
      col[i * 3 + 2] = colorMix.b
    }
    return [pos, col]
  }, [])

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    // Rotate the entire cosmos slowly
    pointsRef.current.rotation.z += delta * 0.05
    pointsRef.current.rotation.y += delta * 0.02

    // Fly the camera through the tunnel based on native scroll
    // Start at z=5, end deep at z=-180
    const targetZ = THREE.MathUtils.lerp(5, -180, scrollProgress)
    
    // Add a slight wobble/pan to the camera based on scroll
    const targetX = Math.sin(scrollProgress * Math.PI * 4) * 2
    const targetY = Math.cos(scrollProgress * Math.PI * 4) * 2

    // Smooth camera movement
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
