import React, { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const Building = ({ position = [0, 0, 0], scale = 10 }) => {
  const { scene } = useGLTF('/models/building.glb');

  const model = useMemo(() => {
    const cloned = scene.clone();

    // Optional: enable shadows on all meshes
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Optional: tweak material roughness/metalness for realism
        if (child.material) {
          child.material.roughness = 0.6;
          child.material.metalness = 0.1;
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <Suspense fallback={null}>
      <primitive object={model} position={position} scale={scale} />
    </Suspense>
  );
};

useGLTF.preload('/models/building.glb'); // Preload for faster response

export default Building;
