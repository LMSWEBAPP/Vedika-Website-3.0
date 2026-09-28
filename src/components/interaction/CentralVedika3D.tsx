'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function VedikaRobotModel() {
  const { scene } = useGLTF('/vedika-M1.glb');
  const groupRef = useRef<THREE.Group | null>(null);

  // Deep clone scene AND materials so other instances never alter our visibility or materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => {
              const newMat = m.clone();
              newMat.transparent = false;
              newMat.opacity = 1.0;
              newMat.needsUpdate = true;
              return newMat;
            });
          } else {
            const newMat = (mesh.material as THREE.Material).clone();
            newMat.transparent = false;
            newMat.opacity = 1.0;
            newMat.needsUpdate = true;
            mesh.material = newMat;
          }
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Perfectly centered idle breathing oscillation in the dead-center of the ring
    groupRef.current.position.y = -0.06 + Math.sin(t * 1.3) * 0.02;
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.16;
  });

  return (
    <group ref={groupRef} position={[0, -0.06, 0]} scale={[0.65, 0.65, 0.65]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function CentralVedika3D() {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 2.3], fov: 40 }}
        gl={{ powerPreference: 'high-performance', alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={2.2} />
        <directionalLight position={[2, 3, 4]} intensity={2.4} />
        <pointLight position={[-2, -0.2, 1]} intensity={1.1} color="#06B6D4" />
        <pointLight position={[2, -0.2, 1]} intensity={1.1} color="#A855F7" />
        <Suspense fallback={null}>
          <VedikaRobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/vedika-M1.glb');
