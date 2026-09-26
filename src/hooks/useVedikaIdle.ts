'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface IdleOptions {
  enabled?: boolean;
  baseY?: number;
  baseX?: number;
  baseZ?: number;
}

export function useVedikaIdle(
  groupRef: React.RefObject<THREE.Group | null>,
  options: IdleOptions = {}
) {
  const { enabled = true, baseY = -0.45, baseX = -0.85, baseZ = 0 } = options;
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !enabled) return;

    const time = state.clock.getElapsedTime();
    const group = groupRef.current;
    const isReduced = reducedMotionRef.current;

    // Subtle breathing & vertical floating cycle (4.8 to 5.2 seconds period)
    const floatAmplitude = isReduced ? 0.005 : 0.035; // ~4-8px equivalent in 3D projection
    const floatOffset = Math.sin((time * Math.PI * 2) / 5.2) * floatAmplitude;

    // Subtle rotation (0.5 to 1.0 degree = ~0.009 to 0.017 rad)
    const rotAmplitude = isReduced ? 0.002 : 0.012;
    const rotY = Math.sin((time * Math.PI * 2) / 5.8) * rotAmplitude;
    const rotX = Math.cos((time * Math.PI * 2) / 5.0) * (rotAmplitude * 0.4);

    // Subtle pointer parallax (restrained and elegant)
    const mouseX = isReduced ? 0 : state.pointer.x * 0.08;
    const mouseY = isReduced ? 0 : state.pointer.y * 0.06;

    // Smooth lerp to prevent any sudden jumps
    const factor = Math.min(delta * 4, 0.1);

    group.position.y = THREE.MathUtils.lerp(group.position.y, baseY + floatOffset + mouseY * 0.2, factor);
    group.position.x = THREE.MathUtils.lerp(group.position.x, baseX + mouseX * 0.15, factor);
    group.position.z = THREE.MathUtils.lerp(group.position.z, baseZ, factor);

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, rotY + mouseX, factor);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, rotX - mouseY * 0.5, factor);

    // Very subtle breathing scale (0.4% expansion)
    const breathScale = 1 + Math.sin((time * Math.PI * 2) / 4.6) * 0.004;
    group.scale.set(breathScale, breathScale, breathScale);
  });
}
