// src/components/Gate.jsx

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Gate({
  url = '/models/gate.glb',       // path to your GLB file
  position = [0, 0, 0],           // where to place the gate
  rotation = [Math.PI, 0, 0],     // flip 180° around X to correct upside-down
  scale = 1,                      // uniform scale factor
}) {
  const group = useRef()
  const { scene } = useGLTF(url)

  useEffect(() => {
    // enable shadows on all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

// preload for better UX
useGLTF.preload('/models/gate.glb')
