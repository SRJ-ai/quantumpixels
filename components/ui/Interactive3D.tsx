'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshTransmissionMaterial, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [targetRot] = useState(() => new THREE.Vector2())
  const [currentRot] = useState(() => new THREE.Vector2())

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      targetRot.x = y * 0.5
      targetRot.y = x * 0.5
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [targetRot])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    // Smoothly interpolate rotation towards the mouse target
    currentRot.x = THREE.MathUtils.damp(currentRot.x, targetRot.x, 3, delta)
    currentRot.y = THREE.MathUtils.damp(currentRot.y, targetRot.y, 3, delta)
    
    meshRef.current.rotation.x = currentRot.x
    meshRef.current.rotation.y = currentRot.y
  })

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          clearcoat={1}
          clearcoatRoughness={0}
          roughness={0.1}
          transmission={1}
          color="#ffffff"
          attenuationDistance={1}
          attenuationColor="#00FFB2"
        />
        {/* Wireframe overlay for a technical/cyber look */}
        <mesh>
          <icosahedronGeometry args={[1.501, 0]} />
          <meshBasicMaterial color="#00FFB2" wireframe transparent opacity={0.15} />
        </mesh>
      </mesh>
    </Float>
  )
}

export default function Interactive3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00FFB2" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#A855F7" />
        
        <AbstractShape />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#00FFB2" />
      </Canvas>
    </div>
  )
}
