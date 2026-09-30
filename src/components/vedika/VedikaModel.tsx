'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useVedikaIdle } from '@/hooks/useVedikaIdle';
import { useModelTuner } from '@/hooks/useModelTuner';
import { useInteraction, globalScrollRef } from '@/hooks/useInteraction';

export function VedikaModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const { size } = useThree();
  const { values } = useModelTuner();
  const { interactionState, activeMode, isLabsExpanded, setIsLabsExpanded } =
    useInteraction();

  const isMobile = size.width < 768;

  // Load existing Vedika model from public folder
  const { scene } = useGLTF('/vedika-M1.glb');

  // Clone scene to isolate instances cleanly with private materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material = mesh.material.map((m) => m.clone());
          } else {
            mesh.material = (mesh.material as THREE.Material).clone();
          }
        }
      }
    });
    return clone;
  }, [scene]);

  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const mats: THREE.MeshStandardMaterial[] = [];
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const m = (child as THREE.Mesh).material;
        if (Array.isArray(m)) {
          mats.push(...(m as THREE.MeshStandardMaterial[]));
        } else {
          mats.push(m as THREE.MeshStandardMaterial);
        }
      }
    });
    materialsRef.current = mats;
  }, [clonedScene]);

  // Hook for subtle physical idle floating and gentle breathing
  useVedikaIdle(modelRef, {
    enabled: values.idleEnabled,
    baseY: 0,
    baseX: 0,
    baseZ: 0,
  });

  // Track carousel movement so Vedika turns head along carousel motion
  const carouselLookRef = useRef({ rotY: 0, rotX: 0, targetRotY: 0, targetRotX: 0 });

  useEffect(() => {
    const handleLook = (e: Event) => {
      const custom = e as CustomEvent<{ lookAngle: number; vel: number }>;
      if (custom.detail) {
        carouselLookRef.current.targetRotY = custom.detail.lookAngle;
        carouselLookRef.current.targetRotX = Math.abs(custom.detail.lookAngle) * 0.05;
      }
    };
    window.addEventListener('vedika_carousel_look', handleLook);
    return () => window.removeEventListener('vedika_carousel_look', handleLook);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scrollProgress = globalScrollRef.current;
    const time = state.clock.getElapsedTime();

    // Smooth head turning lerp for carousel tracking
    carouselLookRef.current.rotY = THREE.MathUtils.lerp(
      carouselLookRef.current.rotY,
      carouselLookRef.current.targetRotY,
      Math.min(delta * 8.0, 0.3)
    );
    carouselLookRef.current.rotX = THREE.MathUtils.lerp(
      carouselLookRef.current.rotX,
      carouselLookRef.current.targetRotX,
      Math.min(delta * 8.0, 0.3)
    );

    // Page 1 targets (tuned left position)
    const p1X = isMobile ? 0 : values.posX;
    const p1Y = isMobile ? -0.55 : values.posY;
    const p1Scale = isMobile ? values.scale * 0.85 : values.scale;
    const p1RotY = (values.rotY * Math.PI) / 180;
    const p1RotX = (values.rotX * Math.PI) / 180;

    // Page 2 targets (full body centered exactly in viewport, clear headroom)
    const p2X = 0;
    const p2Y = isMobile ? -0.05 : -0.07;
    const p2Scale = isMobile ? 0.42 : 0.50;
    let p2RotY = activeMode === 'STT' ? -0.05 : 0.05;
    let p2RotX = 0;

    if (scrollProgress >= 0.5 && scrollProgress <= 1.4) {
      if (interactionState === 'LISTENING') {
        p2RotY = -0.12;
        p2RotX = 0.04;
      } else if (interactionState === 'SPEAKING') {
        p2RotY = Math.sin(time * 2.5) * 0.05;
        p2RotX = Math.sin(time * 5.5) * 0.035;
      } else if (interactionState === 'PROCESSING') {
        p2RotX = -0.04;
      }
    }

    // Page 3 targets (centered in the middle, elevated into clear zone)
    const p3X = 0;
    const p3Y = isMobile ? 0.10 : 0.16;
    const p3Scale = isMobile ? 0.46 : 0.55;
    const p3RotY = isMobile ? 0 : carouselLookRef.current.rotY;
    const p3RotX = isMobile ? 0 : carouselLookRef.current.rotX;
    const p3Z = 0;

    // Page 4 targets: positioned in the right partition for side-by-side layout
    const p4X = isMobile ? 0 : 0.52;
    const p4Y = isMobile ? -0.02 : -0.04;
    const p4Scale = isMobile ? 0.46 : 0.54;
    const p4RotY = 0;
    const p4RotX = 0;
    const p4Z = 0;

    // Direct interpolation across Page 1 -> Page 2 -> Page 3 -> Page 4
    let targetX: number;
    let targetY: number;
    let targetScale: number;
    let targetRotY: number;
    let targetRotX: number;
    let targetZ: number;

    if (scrollProgress <= 1.0) {
      const p = Math.max(0, Math.min(1, scrollProgress));
      targetX = THREE.MathUtils.lerp(p1X, p2X, p);
      targetY = THREE.MathUtils.lerp(p1Y, p2Y, p);
      targetScale = THREE.MathUtils.lerp(p1Scale, p2Scale, p);
      targetRotY = THREE.MathUtils.lerp(p1RotY, p2RotY, p);
      targetRotX = THREE.MathUtils.lerp(p1RotX, p2RotX, p);
      targetZ = THREE.MathUtils.lerp(values.posZ || 0, 0, p);
    } else if (scrollProgress <= 2.0) {
      // Vedika smoothly stays centered from Page 2 to Page 3
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 1.0) / 0.65));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      targetX = THREE.MathUtils.lerp(p2X, p3X, p);
      targetY = THREE.MathUtils.lerp(p2Y, p3Y, p);
      targetScale = THREE.MathUtils.lerp(p2Scale, p3Scale, p);
      targetRotY = THREE.MathUtils.lerp(p2RotY, p3RotY, p);
      targetRotX = THREE.MathUtils.lerp(p2RotX, p3RotX, p);
      targetZ = THREE.MathUtils.lerp(0, p3Z, p);
    } else if (scrollProgress <= 3.25) {
      // Transition from Page 3 to Page 4: stays centered inside spherical particles
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 2.0) / 0.70));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      targetX = THREE.MathUtils.lerp(p3X, p4X, p);
      targetY = THREE.MathUtils.lerp(p3Y, p4Y, p);
      targetScale = THREE.MathUtils.lerp(p3Scale, p4Scale, p);
      targetRotY = THREE.MathUtils.lerp(p3RotY, p4RotY, p);
      targetRotX = THREE.MathUtils.lerp(p3RotX, p4RotX, p);
      targetZ = THREE.MathUtils.lerp(p3Z, p4Z, p);
    } else {
      // Page 5: Dedicated 3-Panel Particle Experience
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 3.20) / 0.40));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      targetX = THREE.MathUtils.lerp(p4X, 0, p);
      targetY = THREE.MathUtils.lerp(p4Y, -0.3, p);
      targetScale = THREE.MathUtils.lerp(p4Scale, 0, p);
      targetRotY = p4RotY;
      targetRotX = p4RotX;
      targetZ = THREE.MathUtils.lerp(p4Z, -0.8, p);
    }

    // Direct 1:1 lockstep sync with scrollProgress — completely removes lag and glitchy slow crawl!
    groupRef.current.position.set(targetX, targetY, targetZ);
    groupRef.current.rotation.y = targetRotY;
    groupRef.current.rotation.x = targetRotX;
    groupRef.current.scale.set(targetScale, targetScale, targetScale);

    // Optimized material opacity dissolution (zero traversal overhead)
    if (scrollProgress > 3.15) {
      const fadeProgress = Math.max(0, Math.min(1, (scrollProgress - 3.15) / 0.45));
      const opacity = Math.max(0, 1 - fadeProgress * fadeProgress * (3 - 2 * fadeProgress));
      const mats = materialsRef.current;
      for (let i = 0; i < mats.length; i++) {
        mats[i].transparent = true;
        mats[i].opacity = opacity;
      }
    } else {
      const mats = materialsRef.current;
      if (mats.length > 0 && mats[0].opacity !== 1) {
        for (let i = 0; i < mats.length; i++) {
          mats[i].transparent = false;
          mats[i].opacity = 1;
        }
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0 : values.posX, values.posY, 0]}
      onClick={(e) => {
        if (globalScrollRef.current >= 2.45 && globalScrollRef.current <= 3.55) {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }
      }}
      onPointerOver={(e) => {
        if (globalScrollRef.current >= 2.45 && globalScrollRef.current <= 3.55) {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <group ref={modelRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

useGLTF.preload('/vedika-M1.glb');
