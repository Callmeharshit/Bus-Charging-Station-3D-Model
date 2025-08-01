import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Sky } from '@react-three/drei'
import Boundary from '../components/Boundary'
import Ground from '../components/Ground'
import Building from '../components/Building'
import Building2 from '../components/Building2'
import Pillar from '../components/Pillar'
import Roof from '../components/Roof'
import Charger from '../components/Charger'
import SolarPanel from '../components/SolarPanel'
import Bus from '../components/Bus'
import Tree from '../components/Tree'
import HoardingBoard from '../components/HoardingBoard'
import Gate from '../components/Gate'
import Transformer from '../components/Transformer'


const BusDepotScene = () => {
  const elevation = 0

  // Hoarding board position
  const hoardingPositions = useMemo(() => [[60, 1, -90]], [])

  // Gate positioned to the right of the hoarding board
  const gatePositions = useMemo(
    () =>
      [[0, 11.5, -100]],
    []
  )

  // Other scene objects
  const pillarPositions = useMemo(
    () => [
      [-85, 5, -30],
      [-85, 5, 22],
      [85, 5, -30],
      [85, 5, 22],
    ],
    []
  )

  

  const solarPanelPositions = useMemo(
    () => [
      [80, 33, 75],
      [-2, 49, 75],
    ],
    []
  )

  const transformerPosition = useMemo(
    () => [
      [-80, 0, 80]
    ],
    []
  )

  const chargerPositions = useMemo(
    () => [
      [-40, 5, 5],
      [-15, 5, 5],
      [17, 5, 5],
      [42, 5, 5],
      [-65, 5, 5],
      [67, 5, 5],
    ],
    []
  )

  const busPositions = useMemo(
    () => [
      [-42, 6, -5],
      [-17, 6, -5],
      [15, 6, -5],
      [40, 6, -5],
      [-67, 6, -5],
      [62, 6, -5],
    ],
    []
  )

  const treePositions = useMemo(
    () => [
      [-80, 19, -80],
      // [-80, 19, 80],
      [80, 19, -80],
      [80, 19, 80],
      [70, 19, 50],
      [-55, 19, 50],
    ],
    []
  )

  return (
    <Canvas
      shadows
      camera={{ position: [50, 50, 120], fov: 50 }}
    >
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="city" />

      <ambientLight intensity={1} />
      <directionalLight
        position={[50, 80, 50]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Suspense fallback={null}>
        <Ground position={[0, -elevation, 0]} />

        <group position={[0, elevation, 0]}>
          <Boundary />

          <Building position={[25, 0, 75]} scale={40} />
          <Building2 position={[-35, 0, 75]} scale={40} />
        
          {hoardingPositions.map((pos, i) => (
            <HoardingBoard
              key={i}
              position={pos}
              scale={5}
              companyName="Bus Depot"
            />
          ))}

          {transformerPosition.map((pos, i) => (
            <Transformer key={i} position={pos} scale={[8, 8, 8]} />
          ))}

          {pillarPositions.map((pos, i) => (
            <Pillar key={i} position={pos} height={15} />
          ))}

          {solarPanelPositions.map((pos, i) => (
            <SolarPanel key={i} position={pos} scale={0.06} />
          ))}

          <Roof position={[0, 17, -5]} size={[180, 1, 60]} color="#1565c0" />

          {chargerPositions.map((pos, i) => (
            <Charger key={i} position={pos} scale={5} />
          ))}

          {gatePositions.map((pos, i) => (
            <Gate key={i} position={pos} scale={10} />
          ))}

          {busPositions.map((pos, i) => (
            <Bus key={i} position={pos} scale={10} />
          ))}

          {treePositions.map((pos, i) => (
            <Tree key={i} position={pos} scale={15} />
          ))}
        </group>
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}

export default BusDepotScene
