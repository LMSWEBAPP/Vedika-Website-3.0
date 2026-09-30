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
          const enhanceMaterial = (origMat: THREE.Material) => {
            const newMat = origMat.clone();
            newMat.transparent = false;
            newMat.opacity = 1.0;
            if ((newMat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const std = newMat as THREE.MeshStandardMaterial;
              std.roughness = Math.min(std.roughness ?? 0.4, 0.28);
              std.metalness = Math.min(std.metalness ?? 0.15, 0.08);
              // If material has color, brighten base casing tone
              if (std.color) {
                std.color.offsetHSL(0, 0, 0.09);
              }
              // Boost emissive glow on robot face screen & eyes
              if (std.emissive && std.emissive.getHex() > 0) {
                std.emissiveIntensity = 2.4;
              }
            }
            newMat.needsUpdate = true;
            return newMat;
          };

          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map(enhanceMaterial);
          } else {
            mesh.material = enhanceMaterial(mesh.material);
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
  const CALIBRATED_OFFSET_X = 0.042;
  const CALIBRATED_OFFSET_Y = 0.062;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Perfectly centered idle breathing oscillation in the dead-center of the ring
    groupRef.current.position.x = CALIBRATED_OFFSET_X;
    groupRef.current.position.y = CALIBRATED_OFFSET_Y + Math.sin(t * 1.3) * 0.016;
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
        gl={{
          powerPreference: 'high-performance',
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
        }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      >
        {/* Crisp omnidirectional studio ambient light */}
        <ambientLight intensity={3.4} color="#FFFFFF" />

        {/* Primary Key light pointing directly at front face and body */}
        <directionalLight position={[0, 2.5, 4.5]} intensity={4.5} color="#FFFFFF" />

        {/* Upward stage bounce light from glowing gold pedestal */}
        <pointLight position={[0, -0.9, 1.4]} intensity={4.0} color="#FEF3C7" distance={6} />

        {/* Left fill light: clean cool highlight */}
        <directionalLight position={[-3, 1.5, 3]} intensity={2.8} color="#F0F9FF" />

        {/* Right fill light: warm golden accent */}
        <directionalLight position={[3, 1.5, 3]} intensity={2.8} color="#FFFBEB" />

        {/* Top rim light: head and shoulder edge definition */}
        <directionalLight position={[0, 4, 0]} intensity={3.2} color="#FFFFFF" />

        <Suspense fallback={null}>
          <VedikaRobotModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/vedika-M1.glb');
