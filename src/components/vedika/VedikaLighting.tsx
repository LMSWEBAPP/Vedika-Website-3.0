'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '@/hooks/useTheme';
import { useInteraction } from '@/hooks/useInteraction';
import { useModelTuner } from '@/hooks/useModelTuner';

export function VedikaLighting() {
  const { theme } = useTheme();
  const { interactionState, scrollProgress } = useInteraction();
  const { values } = useModelTuner();
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);

  // Soft contact floor shadow for Page 2 white stage
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.5)');
      gradient.addColorStop(0.3, 'rgba(15, 23, 42, 0.25)');
      gradient.addColorStop(0.65, 'rgba(15, 23, 42, 0.06)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Smoothly damp light intensities and colors during theme changes, Page 2 white transition & interaction states
  useFrame((_, delta) => {
    const factor = Math.min(delta * 5, 0.2);

    // Transitions across Page 1 -> Page 2 -> Page 3
    let targetAmbientColor: THREE.Color;
    let targetAmbientIntensity: number;
    let targetKeyColor: THREE.Color;
    let targetKeyIntensity: number;
    let targetRimColor = theme.lighting.rimColor;
    let targetRimIntensity = theme.lighting.rimIntensity;

    if (scrollProgress <= 1.0) {
      const p = Math.min(1, Math.max(0, (scrollProgress - 0.2) * 1.3));
      const p1AmbientColor = new THREE.Color(theme.lighting.ambientColor);
      const p2AmbientColor = new THREE.Color('#FFFFFF');
      targetAmbientColor = p1AmbientColor.clone().lerp(p2AmbientColor, p);
      targetAmbientIntensity = THREE.MathUtils.lerp(theme.lighting.ambientIntensity, 1.25, p);

      const p1KeyColor = new THREE.Color(theme.lighting.keyColor);
      const p2KeyColor = new THREE.Color('#FFFFFF');
      targetKeyColor = p1KeyColor.clone().lerp(p2KeyColor, p);
      targetKeyIntensity = THREE.MathUtils.lerp(theme.lighting.keyIntensity, 2.8, p);
      targetRimIntensity = THREE.MathUtils.lerp(theme.lighting.rimIntensity, 1.5, p);
    } else {
      // Transition from Page 2 (white stage) to Page 3 (complete black with neon rim lights)
      const p = Math.min(1, Math.max(0, scrollProgress - 1.0));
      targetAmbientColor = new THREE.Color('#FFFFFF').lerp(new THREE.Color('#0F172A'), p);
      targetAmbientIntensity = THREE.MathUtils.lerp(1.25, 0.85, p);

      targetKeyColor = new THREE.Color('#FFFFFF');
      targetKeyIntensity = THREE.MathUtils.lerp(2.8, 2.4, p);

      // Neon magenta/violet rim reflection from the flowing tube wave
      targetRimColor = '#F967FB';
      targetRimIntensity = THREE.MathUtils.lerp(1.5, 2.5, p);
    }

    if (interactionState === 'LISTENING') {
      targetRimColor = theme.colors.accentBright || '#5EE7F2';
      targetRimIntensity = 2.4;
    } else if (interactionState === 'SPEAKING') {
      targetKeyIntensity = 3.2;
      targetRimIntensity = 2.0;
    } else if (interactionState === 'ERROR') {
      targetRimColor = '#F87171';
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.lerp(targetAmbientColor, factor);
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        targetAmbientIntensity,
        factor
      );
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(targetKeyColor, factor);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        targetKeyIntensity,
        factor
      );
    }

    if (rimLightRef.current) {
      rimLightRef.current.color.lerp(new THREE.Color(targetRimColor), factor);
      rimLightRef.current.intensity = THREE.MathUtils.lerp(
        rimLightRef.current.intensity,
        targetRimIntensity,
        factor
      );
    }
  });

  return (
    <group name="vedika-lighting-rig">
      {/* Soft Ambient Environmental Light */}
      <ambientLight
        ref={ambientLightRef}
        color={theme.lighting.ambientColor}
        intensity={theme.lighting.ambientIntensity}
      />

      {/* Hemisphere Light for natural sky/ground environmental gradients */}
      <hemisphereLight
        args={['#FFFFFF', '#E2E8F0', 0.6]}
      />

      {/* Primary Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[3, 4, 3]}
        color={theme.lighting.keyColor}
        intensity={theme.lighting.keyIntensity}
        castShadow={false}
      />

      {/* Subtle Soft Fill Light */}
      <directionalLight
        position={[-3, -0.5, 2]}
        color={theme.lighting.fillColor}
        intensity={theme.lighting.fillIntensity}
      />

      {/* Theme-dependent Sharp Rim Light (Back-Left) */}
      <directionalLight
        ref={rimLightRef}
        position={theme.lighting.rimPosition}
        color={theme.lighting.rimColor}
        intensity={theme.lighting.rimIntensity}
      />

      {/* Secondary Rim/Kick Accent Light */}
      <directionalLight
        position={[3, 1.5, -2.5]}
        color={theme.lighting.rimColor}
        intensity={theme.lighting.rimIntensity * 0.35}
      />

      {/* Ground Contact Shadow across Page 2 and Page 3 */}
      {shadowTexture && (() => {
        let shadowX = 0;
        let shadowY = -0.615;
        let shadowOpacity = 0;

        if (scrollProgress <= 1.0) {
          shadowX = 0;
          shadowY = -0.615;
          shadowOpacity = Math.min(0.52, scrollProgress * 0.52);
        } else {
          const pTravel = Math.max(0, Math.min(1, (scrollProgress - 1.0) / 0.65));
          const p = pTravel * pTravel * (3 - 2 * pTravel);
          const p3ShadowX = values.p3X ?? -1.6;
          const p3ShadowY = values.p3Y - (values.p3Scale * 0.55);
          shadowX = THREE.MathUtils.lerp(0, p3ShadowX, p);
          shadowY = THREE.MathUtils.lerp(-0.615, p3ShadowY, p);
          shadowOpacity = THREE.MathUtils.lerp(0.52, 0, p);
        }

        return (
          <mesh
            position={[shadowX, shadowY, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            renderOrder={0}
          >
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial
              map={shadowTexture}
              transparent={true}
              opacity={shadowOpacity}
              depthWrite={false}
            />
          </mesh>
        );
      })()}
    </group>
  );
}
