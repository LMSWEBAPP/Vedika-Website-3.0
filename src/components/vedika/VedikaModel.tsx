'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useVedikaIdle } from '@/hooks/useVedikaIdle';
import { useModelTuner } from '@/hooks/useModelTuner';
import { useInteraction } from '@/hooks/useInteraction';

export function VedikaModel() {
  const groupRef = useRef<THREE.Group | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const { size } = useThree();
  const { values } = useModelTuner();
  const { scrollProgress, interactionState, activeMode, isLabsExpanded, setIsLabsExpanded } =
    useInteraction();

  const isMobile = size.width < 768;

  // Load existing Vedika model from public folder
  const { scene } = useGLTF('/vedika-M1.glb');

  // Clone scene to isolate instances cleanly
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });
    return clone;
  }, [scene]);

  // Hook for subtle physical idle floating and gentle breathing
  useVedikaIdle(modelRef, {
    enabled: values.idleEnabled,
    baseY: 0,
    baseX: 0,
    baseZ: 0,
  });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Page 1 targets (tuned left position)
    const p1X = isMobile ? 0 : values.posX;
    const p1Y = isMobile ? -0.55 : values.posY;
    const p1Scale = isMobile ? values.scale * 0.85 : values.scale;
    const p1RotY = (values.rotY * Math.PI) / 180;
    const p1RotX = (values.rotX * Math.PI) / 180;

    // Page 2 targets (full body centered exactly in viewport)
    const p2X = 0;
    const p2Y = isMobile ? -0.02 : -0.04;
    const p2Scale = isMobile ? 0.48 : 0.60;
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

    // Page 3 targets (standing at far left of screen, looking toward the center - tuned via useModelTuner)
    const p3X = isMobile ? 0 : values.p3X;
    const p3Y = isMobile ? -0.45 : values.p3Y;
    const p3Scale = isMobile ? values.p3Scale * 0.75 : values.p3Scale;
    const p3RotY = (values.p3RotY * Math.PI) / 180;
    const p3RotX = (values.p3RotX * Math.PI) / 180;
    const p3Z = values.p3Z ?? 0;

    // Page 4 targets: completely centered in the exact middle of the page
    const p4X = 0;
    const p4Y = isMobile ? -0.02 : -0.04;
    const p4Scale = isMobile ? 0.46 : 0.54;
    const p4RotY = 0;
    const p4RotX = 0;
    const p4Z = 0;

    // Smooth scrub interpolation across Page 1 -> Page 2 -> Page 3 -> Page 4
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
      // Vedika smoothly travels from Page 2 center (p2) to Page 3 left position (p3)
      // Completes transit by scrollProgress = 1.65 so she settles before waves and text emerge
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 1.0) / 0.65));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      targetX = THREE.MathUtils.lerp(p2X, p3X, p);
      targetY = THREE.MathUtils.lerp(p2Y, p3Y, p);
      targetScale = THREE.MathUtils.lerp(p2Scale, p3Scale, p);
      targetRotY = THREE.MathUtils.lerp(p2RotY, p3RotY, p);
      targetRotX = THREE.MathUtils.lerp(p2RotX, p3RotX, p);
      targetZ = THREE.MathUtils.lerp(0, p3Z, p);
    } else if (scrollProgress <= 3.25) {
      // Transition from Page 3 to Page 4: Vedika smoothly travels from left position to exact center inside spherical particles
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 2.0) / 0.70));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      targetX = THREE.MathUtils.lerp(p3X, p4X, p);
      targetY = THREE.MathUtils.lerp(p3Y, p4Y, p);
      targetScale = THREE.MathUtils.lerp(p3Scale, p4Scale, p);
      targetRotY = THREE.MathUtils.lerp(p3RotY, p4RotY, p);
      targetRotX = THREE.MathUtils.lerp(p3RotX, p4RotX, p);
      targetZ = THREE.MathUtils.lerp(p3Z, p4Z, p);
    } else {
      // Page 5: Vedika sits prominently in the center of the circular transformation engine
      // Smoothly glides from Page 4 (scrollProgress 3.10 -> 3.75) and stays anchored as the central AI intelligence
      const pTravel = Math.max(0, Math.min(1, (scrollProgress - 3.10) / 0.65));
      const p = pTravel * pTravel * (3 - 2 * pTravel);
      const p5Y = isMobile ? -0.04 : -0.07;
      const p5Scale = isMobile ? 0.44 : 0.52;
      targetX = 0;
      targetY = THREE.MathUtils.lerp(p4Y, p5Y, p);
      targetScale = THREE.MathUtils.lerp(p4Scale, p5Scale, p);
      targetRotY = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.12;
      targetRotX = Math.sin(state.clock.getElapsedTime() * 1.0) * 0.05;
      targetZ = 0;
    }
    const lerpFactor = Math.min(delta * 7, 0.22);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      lerpFactor
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      lerpFactor
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      lerpFactor
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      lerpFactor
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      lerpFactor
    );

    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, lerpFactor);
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0 : values.posX, values.posY, 0]}
      onClick={(e) => {
        if (scrollProgress >= 2.6 && scrollProgress <= 3.3) {
          e.stopPropagation();
          setIsLabsExpanded((prev) => !prev);
        }
      }}
      onPointerOver={(e) => {
        if (scrollProgress >= 2.6 && scrollProgress <= 3.3) {
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
