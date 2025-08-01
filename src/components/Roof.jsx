// Roof.jsx
import React, { useMemo } from 'react'
import * as THREE from 'three'

const Roof = ({
  position = [0, 8, -5],
  size = [100, 1, 20],    // [width, thickness (ignored), depth]
  color = '#1e90ff',
  curveHeight = 10,       // peak height of the arch
  curveSegments = 32      // smoothness of the curve
}) => {
  const [width, , depth] = size

  // 1. Define a 2D arch shape in the X–Y plane
  const shape = useMemo(() => {
    const s = new THREE.Shape()
    s.moveTo(-width / 2, 0)
    s.quadraticCurveTo(0, curveHeight, width / 2, 0)
    return s
  }, [width, curveHeight])

  // 2. Extrude that shape along the Z-axis by “depth”
  const extrudeSettings = useMemo(
    () => ({
      depth,
      steps: 1,
      bevelEnabled: false
    }),
    [depth]
  )

  // 3. Build and center the geometry so that mesh.position is its true center
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    return geo
  }, [shape, extrudeSettings])

  return (
    <mesh
      position={position}
      geometry={geometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  )
}

export default Roof
