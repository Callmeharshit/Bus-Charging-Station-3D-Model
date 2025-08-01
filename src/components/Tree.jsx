import React, { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const Tree = ({ position = [0, 0, 0], scale = 3 }) => {
  const { scene } = useGLTF('/models/tree.glb');

  const treeModel = useMemo(() => {
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Optional: adjust leaf and bark reflectivity
        if (child.material) {
          child.material.roughness = 0.8;
          child.material.metalness = 0.05;
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <Suspense fallback={null}>
      <primitive object={treeModel} position={position} scale={scale} />
    </Suspense>
  );
};

useGLTF.preload('/models/tree.glb');

export default Tree;
