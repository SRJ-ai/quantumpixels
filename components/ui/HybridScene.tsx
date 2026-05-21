'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics, RigidBody, InstancedRigidBodies, BallCollider, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three'
import { useTheme } from '@/components/ThemeContext'

// 1. Abstract Glass (Hero Section)
function AbstractGlass() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <Float floatIntensity={2} rotationIntensity={1} speed={2} position={[2, 0, -5]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.5, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.8}
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
          attenuationDistance={2}
          attenuationColor={useTheme().colors.primary}
        />
        <mesh>
          <icosahedronGeometry args={[2.51, 0]} />
          <meshBasicMaterial color={useTheme().colors.primary} wireframe transparent opacity={0.15} />
        </mesh>
      </mesh>
    </Float>
  )
}

// 2. Particle Cosmos (Middle Sections)
function ParticleCosmos() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 12000

  const { colors: themeColors } = useTheme()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorA = new THREE.Color(themeColors.primary)
    const colorB = new THREE.Color(themeColors.secondary)
    const colorMix = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      // Particles span from z=-20 to z=-120
      const z = -20 - Math.random() * 100

      pos[i * 3] = Math.cos(theta) * radius
      pos[i * 3 + 1] = Math.sin(theta) * radius
      pos[i * 3 + 2] = z

      colorMix.lerpColors(colorA, colorB, Math.random())
      col[i * 3] = colorMix.r
      col[i * 3 + 1] = colorMix.g
      col[i * 3 + 2] = colorMix.b
    }
    return [pos, col]
  }, [])

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// 3. Geometric Architecture (Footer Sections)
function GeometricArchitecture() {
  const groupRef = useRef<THREE.Group>(null)
  
  const blocks = useMemo(() => {
    const arr = []
    for (let i = 0; i < 40; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          -120 - Math.random() * 80 // Spans from -120 to -200
        ] as [number, number, number],
        scale: [
          2 + Math.random() * 8,
          2 + Math.random() * 20,
          2 + Math.random() * 8
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ] as [number, number, number]
      })
    }
    return arr
  }, [])

  const { colors } = useTheme()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {blocks.map((props, i) => (
        <mesh key={i} position={props.position} scale={props.scale} rotation={props.rotation}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#050816" 
            metalness={0.8} 
            roughness={0.2} 
            emissive={i % 5 === 0 ? colors.secondary : "#000000"}
            emissiveIntensity={0.5}
          />
          {/* Wireframe edges for cyberpunk feel */}
          <mesh>
            <boxGeometry args={[1.001, 1.001, 1.001]} />
            <meshBasicMaterial color={i % 3 === 0 ? colors.primary : "#333333"} wireframe transparent opacity={0.3} />
          </mesh>
        </mesh>
      ))}
      <directionalLight position={[0, 10, -150]} intensity={2} color={colors.primary} />
      <pointLight position={[0, -10, -180]} intensity={5} color={colors.secondary} distance={100} />
    </group>
  )
}

// 4. Interactive Physics Orbs (Services area)
function PhysicsOrbs() {
  const { colors } = useTheme()
  const rigidBodies = useRef<any>(null)
  const orbs = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10 - 60] as [number, number, number],
      scale: Math.random() * 0.8 + 0.4
    }))
  }, [])

  useEffect(() => {
    const handleHacked = () => {
      if (rigidBodies.current) {
        orbs.forEach((_, i) => {
          const body = rigidBodies.current?.at(i)
          if (body && body.applyImpulse) {
            body.applyImpulse({
              x: (Math.random() - 0.5) * 500,
              y: (Math.random() - 0.5) * 500,
              z: (Math.random() - 0.5) * 500
            }, true)
          }
        })
      }
    }
    window.addEventListener('hacked', handleHacked)
    return () => window.removeEventListener('hacked', handleHacked)
  }, [orbs])

  return (
    <group position={[0, -20, -50]}>
      {/* Invisible walls to keep orbs in bounds */}
      <RigidBody type="fixed">
        <CuboidCollider args={[20, 20, 1]} position={[0, 0, -20]} />
        <CuboidCollider args={[20, 20, 1]} position={[0, 0, 10]} />
        <CuboidCollider args={[20, 1, 20]} position={[0, -15, 0]} />
        <CuboidCollider args={[20, 1, 20]} position={[0, 15, 0]} />
        <CuboidCollider args={[1, 20, 20]} position={[-15, 0, 0]} />
        <CuboidCollider args={[1, 20, 20]} position={[15, 0, 0]} />
      </RigidBody>

      {/* Orbs */}
      <InstancedRigidBodies
        ref={rigidBodies}
        instances={orbs.map((o, i) => ({
          key: i,
          position: o.position,
          scale: [o.scale, o.scale, o.scale],
          restitution: 0.8,
          friction: 0.1
        }))}
        colliders="ball"
      >
        <instancedMesh args={[undefined, undefined, 30]} receiveShadow castShadow>
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial 
            color="#050816" 
            metalness={0.9} 
            roughness={0.1} 
            emissive={colors.primary}
            emissiveIntensity={0.2}
          />
        </instancedMesh>
      </InstancedRigidBodies>
      
      {/* Mouse pointer collider to push orbs around */}
      <PointerCollider />
    </group>
  )
}

function PointerCollider() {
  const ref = useRef<any>(null)
  const { viewport } = useThree()
  
  useFrame(({ mouse }) => {
    if (ref.current) {
      // Map mouse to 3D space. Z is chosen to be around the middle of the orb cluster.
      ref.current.setTranslation({
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2 - 20,
        z: -50
      })
    }
  })

  return (
    <RigidBody type="kinematicPosition" ref={ref}>
      <BallCollider args={[2]} />
    </RigidBody>
  )
}

// Master Controller
export default function HybridScene() {
  const { camera } = useThree()
  const { colors } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [dpr, setDpr] = useState(1.5)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    // Smooth camera Z movement based on scroll (-200 is deep inside the scene)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 20 - scrollProgress * 220, 4, 0.016)
    
    // Add some subtle mouse-driven camera sway
    camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 2, 0.016)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0, 2, 0.016)
  })

  return (
    <PerformanceMonitor onIncline={() => setDpr(1.5)} onDecline={() => setDpr(1)}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color={colors.primary} />
      <Environment preset="city" />

      <AbstractGlass />
      <ParticleCosmos />
      <GeometricArchitecture />
      
      <Physics gravity={[0, 0, 0]}>
        <PhysicsOrbs />
      </Physics>
      
      {/* Cinematic Post-Processing */}
      {dpr > 1 && (
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            luminanceThreshold={0.5} 
            mipmapBlur 
            intensity={1.2} 
          />
        </EffectComposer>
      )}

      {/* Fog to blend the transitions between zones */}
      <fog attach="fog" args={['#000000', 10, 60]} />
    </PerformanceMonitor>
  )
}
