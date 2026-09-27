'use client';

import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useInteraction } from '@/hooks/useInteraction';
import {
  MathLab3D,
  PhysicsLab3D,
  ChemistryLab3D,
  BiologyLab3D,
  ComputerLab3D,
} from './LabIcons3D';

// ============================================================================
// ============================================================================
// CONFIGURATION: 5 SATELLITES FORMING A PERFECT 360-DEGREE CIRCLE
// Radius R = 0.84, Spaced exactly 72 degrees apart
// Math (Top 90°): [0, +0.84] -- elevated well above Vedika's head
// Physics (Upper Right 18°): [+0.80, +0.26]
// Chemistry (Lower Right -54°): [+0.49, -0.68]
// Biology (Lower Left -126°): [-0.49, -0.68]
// Computer (Upper Left 162°): [-0.80, +0.26]
// ============================================================================
export interface SatelliteConfig {
  id: string;
  name: string;
  color1: string;
  color2: string;
  targetX: number;
  targetY: number;
  rotYOffset: number;
  labelPlacement: 'top' | 'left' | 'right';
}

const SATELLITE_LABS: SatelliteConfig[] = [
  {
    id: 'math',
    name: 'Math Lab',
    color1: '#D97706', // Rich amber gold
    color2: '#F59E0B',
    targetX: 0,
    targetY: 0.84,
    rotYOffset: 0,
    labelPlacement: 'right',
  },
  {
    id: 'physics',
    name: 'Physics Lab',
    color1: '#0891B2', // Rich electric teal / cyan
    color2: '#06B6D4',
    targetX: 0.80,
    targetY: 0.26,
    rotYOffset: (2 * Math.PI) / 5,
    labelPlacement: 'right',
  },
  {
    id: 'chemistry',
    name: 'Chemistry Lab',
    color1: '#BE123C', // Rich cosmic ruby crimson
    color2: '#E11D48',
    targetX: 0.49,
    targetY: -0.68,
    rotYOffset: (4 * Math.PI) / 5,
    labelPlacement: 'right',
  },
  {
    id: 'biology',
    name: 'Biology Lab',
    color1: '#6D28D9', // Rich radiant violet
    color2: '#7C3AED',
    targetX: -0.49,
    targetY: -0.68,
    rotYOffset: (6 * Math.PI) / 5,
    labelPlacement: 'left',
  },
  {
    id: 'computer',
    name: 'Computer Lab',
    color1: '#1D4ED8', // Rich sapphire sky blue
    color2: '#2563EB',
    targetX: -0.80,
    targetY: 0.26,
    rotYOffset: (8 * Math.PI) / 5,
    labelPlacement: 'left',
  },
];

// Balanced particle count: 12 slices x 36 particles = 432 particles per sphere
// Gives a clean, complete spherical contour without crowding out the 3D icon!
const SLICES_PER_SATELLITE = 12;
const PARTICLES_PER_SLICE = 36;
const BIG_SPHERE_RADIUS = 0.84;
const MINI_SPHERE_SCALE = 0.28;

/**
 * Creates smooth anti-aliased radial disc texture for particles
 */
function createSparkleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ============================================================================
// MAIN EXPORT: SEAMLESS CONVERTING SPHERICAL PARTICLE CAGE
// ============================================================================
export function SphericalParticleCage() {
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const satelliteGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const satelliteSliceRefs = useRef<(THREE.Group | null)[][]>([[], [], [], [], []]);
  const iconGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const transitionTRef = useRef<number>(0);

  const { scrollProgress, isLabsExpanded } = useInteraction();
  const { size } = useThree();
  const isMobile = size.width < 768;

  const [hoveredLab, setHoveredLab] = useState<string | null>(null);

  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createSparkleTexture();
  }, []);

  // Pre-generate clean slice geometries for each of the 5 satellites
  const satelliteData = useMemo(() => {
    const deg = Math.PI / 180;
    return SATELLITE_LABS.map((lab) => {
      const slices = [];
      for (let ix = 0; ix < SLICES_PER_SATELLITE; ix++) {
        const positions = new Float32Array(PARTICLES_PER_SLICE * 3);
        const colors = new Float32Array(PARTICLES_PER_SLICE * 3);

        for (let iy = 0; iy < PARTICLES_PER_SLICE; iy++) {
          const theta = (iy / PARTICLES_PER_SLICE) * Math.PI * 2;
          const r = BIG_SPHERE_RADIUS * (0.98 + Math.sin(iy * 4.2 + ix) * 0.02);

          positions[iy * 3] = Math.sin(theta) * r;
          positions[iy * 3 + 1] = Math.cos(theta) * r;
          positions[iy * 3 + 2] = Math.sin(theta * 2 + ix) * 0.012;

          const c = new THREE.Color();
          const ratio = iy / PARTICLES_PER_SLICE;
          if (ratio < 0.6) {
            c.set(lab.color1);
          } else {
            c.set(lab.color2);
          }

          colors[iy * 3] = c.r;
          colors[iy * 3 + 1] = c.g;
          colors[iy * 3 + 2] = c.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const rotX = deg * ((ix / SLICES_PER_SATELLITE) * 180);
        const rotY = deg * ((ix / SLICES_PER_SATELLITE) * 180 * 2);
        const rotZ = deg * ((ix / SLICES_PER_SATELLITE) * 180 * 3);

        slices.push({ geometry, rotX, rotY, rotZ });
      }

      // Slightly reduced particle size and subtle opacity for clean transparency
      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.020 : 0.016,
        map: texture || undefined,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      return { lab, slices, material };
    });
  }, [texture, isMobile]);

  useFrame((state, delta) => {
    if (!mainGroupRef.current) return;

    const time = state.clock.getElapsedTime();

    // Smooth reveal as user scrolls to Page 4, and smooth exit as user leaves to Page 5
    const revealProgress = Math.max(0, Math.min(1, (scrollProgress - 2.10) / 0.65));
    const exitProgress = Math.max(0, Math.min(1, (scrollProgress - 3.25) / 0.50));
    const smoothReveal =
      revealProgress *
      revealProgress *
      (3 - 2 * revealProgress) *
      (1 - exitProgress * exitProgress * (3 - 2 * exitProgress));

    if (smoothReveal <= 0.001) {
      mainGroupRef.current.visible = false;
      return;
    }

    mainGroupRef.current.visible = true;

    // Smooth transition progress: 0 (Big Sphere around Vedika) -> 1 (5 Mini Spheres around Vedika)
    const targetT = isLabsExpanded ? 1.0 : 0.0;
    transitionTRef.current = THREE.MathUtils.lerp(
      transitionTRef.current,
      targetT,
      Math.min(delta * 4.2, 0.20)
    );
    const t = transitionTRef.current;
    const easeT = t * t * (3 - 2 * t);

    const posMultiplier = isMobile ? 0.78 : 1.0;

    satelliteData.forEach(({ material }, idx) => {
      // Gently reduce mini sphere brightness / opacity when expanded so the 3D icons pop cleanly!
      // In big sphere: opacity 0.85; In mini spheres: opacity 0.38
      material.opacity = THREE.MathUtils.lerp(0.85, 0.38, easeT);
    });

    SATELLITE_LABS.forEach((lab, idx) => {
      const satGroup = satelliteGroupRefs.current[idx];
      if (!satGroup) return;

      // 1. Position: Lerp from Vedika center (0, 0) to orbit position (targetX, targetY)
      const targetPosX = lab.targetX * posMultiplier;
      const targetPosY = lab.targetY * posMultiplier;
      satGroup.position.x = THREE.MathUtils.lerp(0, targetPosX, easeT);
      satGroup.position.y = THREE.MathUtils.lerp(0, targetPosY, easeT);
      satGroup.position.z = 0;

      // 2. Scale: Lerp from Big Sphere (1.0) to Mini Sphere (MINI_SPHERE_SCALE)
      const targetScale = THREE.MathUtils.lerp(1.0, MINI_SPHERE_SCALE, easeT) * smoothReveal;
      satGroup.scale.set(targetScale, targetScale, targetScale);

      // 3. Rotation
      satGroup.rotation.y = THREE.MathUtils.lerp(lab.rotYOffset, 0, easeT);

      // 4. Continuous starlight rotation for each individual slice
      const sliceList = satelliteSliceRefs.current[idx];
      if (sliceList) {
        sliceList.forEach((slice, i) => {
          if (!slice) return;
          slice.rotation.x += 0.0016 + 0.00015 * i;
          slice.rotation.y += 0.0020 + 0.00015 * i;
          slice.rotation.z += 0.0024 + 0.00015 * i;
        });
      }

      // 5. 3D Icon Scale: bold, prominent, and clearly visible inside the mini sphere
      const iconGroup = iconGroupRefs.current[idx];
      if (iconGroup) {
        const isHovered = hoveredLab === lab.id;
        const iconProgress = Math.max(0, (t - 0.15) / 0.85);
        const iconScale = iconProgress * (isHovered ? 3.30 : 2.90);
        iconGroup.scale.set(iconScale, iconScale, iconScale);
        iconGroup.visible = iconScale > 0.01;
      }
    });

    // Subtle gentle celestial breathing of entire system
    mainGroupRef.current.rotation.y = Math.cos(time * 0.22) * 0.08;
    mainGroupRef.current.rotation.z = Math.sin(time * 0.18) * 0.05;
  });

  // Centered exactly in the middle of the page matching Vedika
  const cageCenterY = isMobile ? -0.02 : -0.04;

  return (
    <group ref={mainGroupRef} position={[0, cageCenterY, 0]} visible={false}>
      {/* Ambient illumination for the pure white stage */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[0, 4, 3]} intensity={1.8} />

      {/* THE 5 SATELLITE CLUSTERS */}
      {satelliteData.map(({ lab, slices, material }, idx) => {
        const isHovered = hoveredLab === lab.id;

        // Label position relative to the satellite group:
        // - Math Lab (top): centered above sphere [0, 1.02, 0]
        // - Left Labs (Computer, Biology): anchored to the LEFT [-1.02, 0, 0]
        // - Right Labs (Physics, Chemistry): anchored to the RIGHT [+1.02, 0, 0]
        const labelPos: [number, number, number] =
          lab.labelPlacement === 'top'
            ? [0, 1.02, 0]
            : lab.labelPlacement === 'left'
            ? [-1.02, 0, 0]
            : [1.02, 0, 0];

        const labelTransform =
          lab.labelPlacement === 'top'
            ? 'translate(-50%, -100%)'
            : lab.labelPlacement === 'left'
            ? 'translate(-100%, -50%)'
            : 'translate(0%, -50%)';

        const labelMargin =
          lab.labelPlacement === 'top'
            ? { marginBottom: '8px' }
            : lab.labelPlacement === 'left'
            ? { marginRight: '14px' }
            : { marginLeft: '14px' };

        return (
          <group
            key={lab.id}
            ref={(el) => {
              satelliteGroupRefs.current[idx] = el;
            }}
            position={[0, 0, 0]}
            onPointerOver={(e) => {
              if (transitionTRef.current > 0.5) {
                e.stopPropagation();
                setHoveredLab(lab.id);
                document.body.style.cursor = 'pointer';
              }
            }}
            onPointerOut={() => {
              setHoveredLab(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* A. The Starlight Particle Slices (subtle, clean, solid contour) */}
            {slices.map((slice, i) => (
              <group
                key={i}
                ref={(el) => {
                  if (!satelliteSliceRefs.current[idx]) {
                    satelliteSliceRefs.current[idx] = [];
                  }
                  satelliteSliceRefs.current[idx][i] = el;
                }}
                rotation={[slice.rotX, slice.rotY, slice.rotZ]}
              >
                <points geometry={slice.geometry} material={material} />
              </group>
            ))}

            {/* B. The 3D Lab Icon inside the mini particle sphere */}
            <group
              ref={(el) => {
                iconGroupRefs.current[idx] = el;
              }}
              scale={[0.0001, 0.0001, 0.0001]}
              visible={false}
            >
              {lab.id === 'math' && <MathLab3D hovered={isHovered} />}
              {lab.id === 'physics' && <PhysicsLab3D hovered={isHovered} />}
              {lab.id === 'chemistry' && <ChemistryLab3D hovered={isHovered} />}
              {lab.id === 'biology' && <BiologyLab3D hovered={isHovered} />}
              {lab.id === 'computer' && <ComputerLab3D hovered={isHovered} />}
            </group>
          </group>
        );
      })}
    </group>
  );
}
