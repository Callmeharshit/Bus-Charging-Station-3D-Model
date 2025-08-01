import React, { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const Bus = ({ position = [0, 0, 0], scale = 1.2 }) => {
  const { scene } = useGLTF('/models/bus.glb');

  const busModel = useMemo(() => {
    const cloned = scene.clone();

    // Enable realistic shadowing and tweak material properties
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.2;
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <Suspense fallback={null}>
      <primitive object={busModel} position={position} scale={scale} />
    </Suspense>
  );
};

useGLTF.preload('/models/bus.glb'); // Ensures smoother initial load

export default Bus;
