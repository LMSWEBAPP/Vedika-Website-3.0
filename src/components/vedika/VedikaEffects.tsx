'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';

import { useModelTuner } from '@/hooks/useModelTuner';
import { useInteraction } from '@/hooks/useInteraction';

export function VedikaEffects() {
  const { theme } = useTheme();
  const { size } = useThree();
  const { values } = useModelTuner();
  const { scrollProgress } = useInteraction();
  const meshRef = useRef<THREE.Mesh | null>(null);

  const isMobile = size.width < 768;

  // Generate smooth circular gradient canvas texture
  const glowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      opacity: theme.lighting.envGlowIntensity,
      color: new THREE.Color(theme.lighting.envGlowColor),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [glowTexture, theme.lighting.envGlowColor, theme.lighting.envGlowIntensity]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    if (mat) {
      const targetColor = new THREE.Color(theme.lighting.envGlowColor);
      mat.color.lerp(targetColor, Math.min(delta * 3, 0.1));

      // Strictly fade hero head glow to 0 past Page 1 so no light bleeds onto Page 2 or Page 3
      const targetGlowOpacity = Math.max(0, 1 - scrollProgress * 2.0) * theme.lighting.envGlowIntensity;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetGlowOpacity, Math.min(delta * 8, 0.25));
      meshRef.current.visible = scrollProgress < 0.95;
    }

    const p1Progress = Math.min(1, Math.max(0, scrollProgress));
    const p1X = isMobile ? 0 : values.posX;
    const p2X = 0;
    const curX = THREE.MathUtils.lerp(p1X, p2X, p1Progress);

    const p1Y = isMobile ? -0.1 : values.posY + 0.55;
    const p2Y = isMobile ? -0.1 : -0.1;
    const curY = THREE.MathUtils.lerp(p1Y, p2Y, p1Progress);

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, curX, Math.min(delta * 6, 0.2));
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, curY, Math.min(delta * 6, 0.2));
  });

  if (!glowTexture) return null;

  return (
    <mesh ref={meshRef} position={[isMobile ? 0 : values.posX, values.posY + 0.55, -0.6]} material={material} renderOrder={-1}>
      <planeGeometry args={[2.8, 2.8]} />
    </mesh>
  );
}
