// Transformer.jsx
import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const Transformer = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [10] }) => {
  const { scene } = useGLTF('/models/transformer.glb'); // Update path if needed

  // Use memo for performance if transformer is static
  const transformerScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive
      object={transformerScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default Transformer;
