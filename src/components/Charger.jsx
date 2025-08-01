import React, { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const Charger = ({ position = [0, 0, 0], scale = 1.5 }) => {
  const { scene } = useGLTF('/models/charger.glb');

  const chargerModel = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = 0.5;
          child.material.metalness = 0.2;
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <Suspense fallback={null}>
      <primitive object={chargerModel} position={position} scale={scale} />
    </Suspense>
  );
};

useGLTF.preload('/models/charger.glb');

export default Charger;
