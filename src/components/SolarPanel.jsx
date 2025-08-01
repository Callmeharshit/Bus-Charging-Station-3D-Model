import React, { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';

const SolarPanel = ({ position = [0, 0, 0], scale = 0.5 }) => {
  const { scene } = useGLTF('/models/solar_panel2.glb');

  const panelModel = useMemo(() => {
    // Clone the GLTF scene
    const cloned = scene.clone();

    // Apply a base down‑scale so the panel isn't huge
    cloned.scale.set(0.3, 0.3, 0.3);

    // Traverse meshes to enable shadows and tweak materials
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.4;
          child.material.metalness = 0.6;
        }
      }
    });

    return cloned;
  }, [scene]);

  return (
    <Suspense fallback={null}>
      {/* 
        Apply additional uniform scale from props 
        (so you can do <SolarPanel scale={0.8} /> if you want slightly bigger) 
      */}
      <primitive
        object={panelModel}
        position={position}
        scale={Array.isArray(scale) ? scale : [scale, scale, scale]}
      />
    </Suspense>
  );
};

useGLTF.preload('/models/solar_panel2.glb');

export default SolarPanel;
