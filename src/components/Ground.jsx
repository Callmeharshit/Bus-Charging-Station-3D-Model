// src/components/Ground.jsx
import React, { useMemo, Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Ground = ({ position = [0, 0, 0], size = [200, 200], tile = 10 }) => {
  const [colorMap, normalMap, roughnessMap] = useMemo(() => [
    useLoader(THREE.TextureLoader, '/textures/ground/color.jpg'),
    useLoader(THREE.TextureLoader, '/textures/ground/normal.jpg'),
    useLoader(THREE.TextureLoader, '/textures/ground/roughness.jpg'),
  ], []);

  useMemo(() => {
    [colorMap, normalMap, roughnessMap].forEach((map) => {
      map.wrapS = map.wrapT = THREE.RepeatWrapping;
      map.repeat.set(tile, tile);
    });
  }, [colorMap, normalMap, roughnessMap, tile]);

  return (
    <Suspense fallback={null}>
      <mesh
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={size} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </mesh>
    </Suspense>
  );
};

export default Ground;
