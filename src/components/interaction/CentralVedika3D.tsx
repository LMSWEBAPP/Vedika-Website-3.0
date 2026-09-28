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

    // Auto-center the model to its exact bounding box geometric center
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center);

    return clone;
  }, [scene]);

  // Calibrated alignment offsets to place Vedika in the dead-center of the circular progress ring
  // Offsets compensate for model bounding-box asymmetry and visual mass of the head
  const CALIBRATED_OFFSET_X = 0.042; // Shifts right to balance left-right margin to the ring
  const CALIBRATED_OFFSET_Y = -0.072; // Shifts down to balance top-bottom margin to the ring

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Perfectly centered idle breathing oscillation in the dead-center of the ring
    groupRef.current.position.x = CALIBRATED_OFFSET_X;
    groupRef.current.position.y = CALIBRATED_OFFSET_Y + Math.sin(t * 1.3) * 0.018;
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.16;
  });

  return (
    <group ref={groupRef} position={[CALIBRATED_OFFSET_X, CALIBRATED_OFFSET_Y, 0]} scale={[0.66, 0.66, 0.66]}>
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
