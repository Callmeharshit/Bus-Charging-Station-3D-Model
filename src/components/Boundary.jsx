// src/components/Boundary.jsx

import React, { useMemo } from 'react';

const Boundary = ({
  boundaryLength = 200,     // total length of each side
  boundaryHeight = 10,       // wall height
  boundaryThickness = 1,    // wall thickness
  gateWidth = 40            // width of the gate gap
}) => {
  const halfLen = boundaryLength / 2
  const halfGate = gateWidth / 2
  const wallY = boundaryHeight / 2

  const walls = useMemo(() => {
    const segments = []

    // FRONT WALL: split into two segments, leaving a central gap
    const frontSegmentLength = (boundaryLength - gateWidth) / 2.06

    // front‐left segment
    segments.push(
      <mesh
        key="front-left"
        position={[-halfLen + frontSegmentLength / 2, wallY, -halfLen]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[frontSegmentLength, boundaryHeight, boundaryThickness]} />
        <meshStandardMaterial color="#072f5f" roughness={0.7} metalness={0.1} />
      </mesh>
    )

    // front‐right segment
    segments.push(
      <mesh
        key="front-right"
        position={[halfLen - frontSegmentLength / 2, wallY, -halfLen]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[frontSegmentLength, boundaryHeight, boundaryThickness]} />
        <meshStandardMaterial color="#072f5f" roughness={0.7} metalness={0.1} />
      </mesh>
    )

    // BACK WALL: full span
    segments.push(
      <mesh
        key="back"
        position={[0, wallY, halfLen]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boundaryLength, boundaryHeight, boundaryThickness]} />
        <meshStandardMaterial color="#072f5f" roughness={0.7} metalness={0.1} />
      </mesh>
    )

    // LEFT WALL: full span
    segments.push(
      <mesh
        key="left"
        position={[-halfLen, wallY, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boundaryThickness, boundaryHeight, boundaryLength]} />
        <meshStandardMaterial color="#072f5f" roughness={0.7} metalness={0.1} />
      </mesh>
    )

    // RIGHT WALL: full span
    segments.push(
      <mesh
        key="right"
        position={[halfLen, wallY, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[boundaryThickness, boundaryHeight, boundaryLength]} />
        <meshStandardMaterial color="#072f5f" roughness={0.7} metalness={0.1} />
      </mesh>
    )

    return segments
  }, [boundaryLength, boundaryHeight, boundaryThickness, gateWidth])

  return <>{walls}</>
}

export default Boundary
