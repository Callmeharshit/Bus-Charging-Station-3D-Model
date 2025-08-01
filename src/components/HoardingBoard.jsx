// src/components/HoardingBoard.jsx

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'

export default function HoardingBoard({
  companyName = 'EV Charge Co.',
  position = [0, 0, 0],
  scale = 1,
}) {
  const boardRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // subtle floating animation on the board panel
    boardRef.current.position.y = 3 + Math.sin(t * 0.5) * 0.05

    // ensure the board's front face is always facing forward
    boardRef.current.rotation.y = Math.PI
  })

  return (
    <group position={position} scale={scale}>
      {/* Hoarding Panel with Rounded Corners */}
      <mesh
        ref={boardRef}
        castShadow
        receiveShadow
        // initial flip so the front side shows
        rotation={[0, Math.PI, 0]}
      >
        <RoundedBox args={[4, 2.5, 0.1]} radius={0.05} smoothness={8}>
          <meshStandardMaterial
            color="#1e272e"
            metalness={0.5}
            roughness={0.3}
            emissive="#0f1113"
            emissiveIntensity={0.15}
          />
        </RoundedBox>

        {/* Company Name Text */}
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.5}
          letterSpacing={-0.02}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {companyName}
        </Text>
      </mesh>

      {/* Angled Support Legs */}
      <mesh position={[-1.7, 1.2, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
        <meshStandardMaterial color="#55575a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.7, 1.2, 0]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 3, 16]} />
        <meshStandardMaterial color="#55575a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Base Plate for Stability */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Overhead Spotlight to Illuminate the Board */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        intensity={1.5}
        color="#fafafa"
        castShadow
      />
    </group>
  )
}
