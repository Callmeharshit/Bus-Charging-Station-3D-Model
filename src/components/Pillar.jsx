import React, { useMemo } from 'react';

const Pillar = ({ position = [0, 0, 0], height = 15, radius = 0.3, color = 'white' }) => {
  const meshPosition = useMemo(() => [position[0], height / 2, position[2]], [position, height]);

  return (
    <mesh position={meshPosition} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.15}
      />
    </mesh>
  );
};

export default Pillar;
