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
          const enhanceMat = (m: THREE.Material) => {
            const newMat = m.clone();
            newMat.transparent = false;
            newMat.opacity = 1.0;
            if ('roughness' in newMat) {
              (newMat as any).roughness = Math.min((newMat as any).roughness ?? 0.5, 0.35);
            }
            if ('metalness' in newMat) {
              (newMat as any).metalness = Math.min((newMat as any).metalness ?? 0.1, 0.12);
            }
            newMat.needsUpdate = true;
            return newMat;
          };
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(enhanceMat);
          } else {
            mesh.material = enhanceMat(mesh.material);
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
  const CALIBRATED_OFFSET_Y = 0.065; // Shifts up so Vedika and pedestal are completely inside the ring

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Perfectly centered idle breathing oscillation in the dead-center of the ring
    groupRef.current.position.x = CALIBRATED_OFFSET_X;
    groupRef.current.position.y = CALIBRATED_OFFSET_Y + Math.sin(t * 1.3) * 0.018;
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.16;
  });

  return (
    <group ref={groupRef} position={[CALIBRATED_OFFSET_X, CALIBRATED_OFFSET_Y, 0]} scale={[0.62, 0.62, 0.62]}>
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
        <ambientLight intensity={3.6} />
        <directionalLight position={[0, 2.5, 3.5]} intensity={4.2} color="#FFFFFF" />
        <directionalLight position={[-2.5, 1, 2.5]} intensity={2.6} color="#E0F2FE" />
        <directionalLight position={[2.5, 1, 2.5]} intensity={2.6} color="#FEF3C7" />
        {/* Direct frontal spotlight for bright, vibrant chassis illumination */}
        <pointLight position={[0, 0.35, 1.9]} intensity={3.4} color="#FFFFFF" distance={5} />
        {/* Upward stage bounce light to illuminate chest and feet */}
        <pointLight position={[0, -0.6, 1.2]} intensity={3.0} color="#FDE68A" distance={4} />
        <Suspense fallback={null}>
          <VedikaRobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/vedika-M1.glb');
