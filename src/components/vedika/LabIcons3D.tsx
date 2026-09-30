'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. MATH LAB 3D: LUMINOUS 3D DIAMOND OCTAHEDRON & MATHEMATICAL POLYHEDRON
// High-contrast radiant Amber-Topaz crystal with bold obsidian-bronze struts,
// glowing golden vertex jewels, contrasting Royal Violet inner singularity core,
// floating multi-colored polyhedra, and defined emitter pedestal base!
// ============================================================================
export function MathLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const octaRef = useRef<THREE.Group | null>(null);
  const innerOctaRef = useRef<THREE.Mesh | null>(null);
  const floatItemsRef = useRef<THREE.Group | null>(null);

  // Octahedron geometry: 6 vertices, 12 edges (enlarged for prominent presence)
  const H = 0.096; // Top & bottom apex height
  const R = 0.080; // Equatorial radius

  const edges = useMemo(() => {
    const verts: [number, number, number][] = [
      [0, H, 0],
      [0, -H, 0],
      [R, 0, 0],
      [0, 0, R],
      [-R, 0, 0],
      [0, 0, -R],
    ];
    const pairs: [number, number][] = [
      [0, 2], [0, 3], [0, 4], [0, 5], // Top pyramid edges
      [1, 2], [1, 3], [1, 4], [1, 5], // Bottom pyramid edges
      [2, 3], [3, 4], [4, 5], [5, 2], // Equatorial perimeter edges
    ];
    const up = new THREE.Vector3(0, 1, 0);
    return pairs.map(([i, j]) => {
      const p1 = new THREE.Vector3(...verts[i]);
      const p2 = new THREE.Vector3(...verts[j]);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(p2, p1);
      const len = dir.length();
      dir.normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      const e = new THREE.Euler().setFromQuaternion(q);
      return { pos: [mid.x, mid.y, mid.z] as [number, number, number], rot: [e.x, e.y, e.z] as [number, number, number], len };
    });
  }, [H, R]);

  const vertexNodes: [number, number, number][] = useMemo(() => [
    [0, H, 0],
    [0, -H, 0],
    [R, 0, 0],
    [0, 0, R],
    [-R, 0, 0],
    [0, 0, -R],
  ], [H, R]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.2;

    // Levitation bobbing
    groupRef.current.position.y = Math.sin(t * 2.0) * 0.008;

    // Smooth crystal rotation
    if (octaRef.current) {
      octaRef.current.rotation.y += delta * speed * 0.75;
      octaRef.current.rotation.x = Math.sin(t * 1.1) * 0.12 + 0.08;
    }

    // Counter-rotating inner singularity core
    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.y -= delta * speed * 1.5;
      innerOctaRef.current.rotation.z += delta * speed * 1.0;
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.12;
      innerOctaRef.current.scale.set(pulse, pulse, pulse);
    }

    // Floating satellite math glyphs
    if (floatItemsRef.current) {
      floatItemsRef.current.rotation.y -= delta * speed * 0.45;
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.15 : 1.04}>
      {/* 1. MAIN GLOWING 3D DIAMOND OCTAHEDRON */}
      <group ref={octaRef} position={[0, 0.015, 0]}>
        {/* Solid Rich Translucent Crystal Faces (Vivid Amber-Topaz with Golden Sheen) */}
        <mesh>
          <octahedronGeometry args={[0.088, 0]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={1.8}
            roughness={0.10}
            metalness={0.35}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* 12 Thick Glowing Edge Struts (Crisp Dark Obsidian-Bronze with Amber Neon Edges) */}
        {edges.map((e, idx) => (
          <mesh key={`octa-edge-${idx}`} position={e.pos} rotation={e.rot}>
            <cylinderGeometry args={[0.0040, 0.0040, e.len, 8]} />
            <meshStandardMaterial
              color="#451A03"
              emissive="#D97706"
              emissiveIntensity={2.0}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* 6 Corner Vertex Node Jewels (Bright Radiant Golden Orbs) */}
        {vertexNodes.map((pos, idx) => (
          <mesh key={`octa-vert-${idx}`} position={pos}>
            <sphereGeometry args={[0.0075, 16, 16]} />
            <meshStandardMaterial
              color="#FEF08A"
              emissive="#F59E0B"
              emissiveIntensity={3.0}
            />
          </mesh>
        ))}

        {/* Central Contrasting Royal Violet / Magenta Singularity Diamond */}
        <mesh ref={innerOctaRef}>
          <octahedronGeometry args={[0.042, 0]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#A855F7"
            emissiveIntensity={3.2}
            metalness={0.8}
            roughness={0.08}
          />
        </mesh>
      </group>

      {/* 2. FLOATING MATHEMATICAL POLYHEDRA & GLYPHS (High-Contrast Saturated Colors) */}
      <group ref={floatItemsRef} position={[0, 0.015, 0]}>
        {/* Floating Mini Cube (Golden Amber) */}
        <mesh position={[0.105, 0.038, 0.02]} rotation={[0.4, 0.5, 0.2]}>
          <boxGeometry args={[0.020, 0.020, 0.020]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={2.2}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>

        {/* Floating Mini Tetrahedron (Royal Sapphire Blue) */}
        <mesh position={[-0.100, -0.032, 0.03]} rotation={[0.3, -0.4, 0.6]}>
          <tetrahedronGeometry args={[0.018, 0]} />
          <meshStandardMaterial
            color="#1D4ED8"
            emissive="#2563EB"
            emissiveIntensity={2.4}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Floating Pi / Symbol Node (Vivid Cosmic Ruby) */}
        <mesh position={[-0.092, 0.058, -0.025]}>
          <octahedronGeometry args={[0.015, 0]} />
          <meshStandardMaterial
            color="#BE123C"
            emissive="#E11D48"
            emissiveIntensity={2.8}
          />
        </mesh>
      </group>

      {/* 3. HOLOGRAPHIC EMITTER PEDESTAL BASE (High-Definition Grounded Base) */}
      <group position={[0, -0.075, 0]}>
        {/* Base Outer Bevel Disk */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.072, 0.076, 0.008, 32]} />
          <meshStandardMaterial
            color="#1E1B4B"
            emissive="#0F172A"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Golden Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.058, 0.0040, 16, 32]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.002, 24]} />
          <meshStandardMaterial
            color="#FDE68A"
            emissive="#F59E0B"
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>

      <pointLight color="#F59E0B" intensity={hovered ? 3.8 : 2.8} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 2. PHYSICS LAB 3D: COSMIC STRIPED RINGED PLANET & SATELLITE MOONS
// High-contrast Midnight Royal Cobalt planet core, electric vivid cyan stripes,
// prominent multi-band ring system with outer neon cyan border,
// distinct golden and cyan orbiting satellite moons, and defined base!
// ============================================================================
export function PhysicsLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const planetTiltRef = useRef<THREE.Group | null>(null);
  const planetCoreRef = useRef<THREE.Mesh | null>(null);
  const moon1Ref = useRef<THREE.Mesh | null>(null);
  const moon2Ref = useRef<THREE.Mesh | null>(null);
  const moon3Ref = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.2;

    // Levitation bobbing
    groupRef.current.position.y = Math.sin(t * 1.9 + 1) * 0.008;

    // Planet rotation on its polar axis
    if (planetCoreRef.current) {
      planetCoreRef.current.rotation.y += delta * speed * 0.8;
    }

    // Orbiting Satellite Moons
    const orbitSpeed = speed * 1.4;
    if (moon1Ref.current) {
      // Moon 1: outer edge of ring plane
      const angle = t * orbitSpeed * 1.2;
      moon1Ref.current.position.set(Math.cos(angle) * 0.145, 0, Math.sin(angle) * 0.145);
    }
    if (moon2Ref.current) {
      // Moon 2: slightly inclined orbit
      const angle = t * orbitSpeed * 1.6 + 2.0;
      moon2Ref.current.position.set(
        Math.cos(angle) * 0.120,
        Math.sin(angle * 2) * 0.022,
        Math.sin(angle) * 0.120
      );
    }
    if (moon3Ref.current) {
      // Moon 3: inner fast moon
      const angle = -t * orbitSpeed * 2.0 + 4.0;
      moon3Ref.current.position.set(Math.cos(angle) * 0.096, 0, Math.sin(angle) * 0.096);
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.15 : 1.04}>
      {/* 1. PLANET ASSEMBLY (Tilted at 26-degree planetary axial tilt) */}
      <group ref={planetTiltRef} rotation={[0.42, 0, 0.18]} position={[0, 0.015, 0]}>
        {/* Celestial Sphere with Deep Striped Bands */}
        <group ref={planetCoreRef}>
          {/* Base Midnight Royal Cobalt Planet Core */}
          <mesh>
            <sphereGeometry args={[0.060, 32, 32]} />
            <meshStandardMaterial
              color="#1E3A8A"
              emissive="#1E40AF"
              emissiveIntensity={1.5}
              roughness={0.20}
              metalness={0.25}
            />
          </mesh>

          {/* Central Equatorial Atmosphere Stripe (Electric Vivid Cyan) */}
          <mesh>
            <cylinderGeometry args={[0.0605, 0.0605, 0.022, 32, 1, true]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#06B6D4"
              emissiveIntensity={2.5}
              roughness={0.15}
            />
          </mesh>

          {/* North Temperate Atmospheric Band (Bright Teal / Aquamarine) */}
          <mesh position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.0545, 0.0545, 0.012, 32, 1, true]} />
            <meshStandardMaterial
              color="#0D9488"
              emissive="#14B8A6"
              emissiveIntensity={2.4}
              roughness={0.15}
            />
          </mesh>

          {/* South Temperate Atmospheric Band (Deep Midnight Navy) */}
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.0545, 0.0545, 0.012, 32, 1, true]} />
            <meshStandardMaterial
              color="#0F172A"
              emissive="#1E3A8A"
              emissiveIntensity={1.8}
              roughness={0.2}
            />
          </mesh>

          {/* North Polar Cap (Vivid Neon Electric Cyan) */}
          <mesh position={[0, 0.048, 0]}>
            <sphereGeometry args={[0.028, 24, 16]} />
            <meshStandardMaterial
              color="#00F5D4"
              emissive="#0891B2"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* 2. LUMINOUS PLANETARY RINGS (High-Opacity, Defined Multi-Band Structure) */}
        {/* Main Sapphire Cyan Ring Disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.080, 0.136, 64]} />
          <meshStandardMaterial
            color="#0369A1"
            emissive="#0284C7"
            emissiveIntensity={1.8}
            transparent
            opacity={0.94}
            side={THREE.DoubleSide}
            roughness={0.12}
          />
        </mesh>

        {/* Outer Ring Luminous Border Accent (Brilliant Neon Cyan) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.136, 0.0035, 16, 64]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#06B6D4"
            emissiveIntensity={3.2}
          />
        </mesh>

        {/* Dark Cassini Division Border Gap Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.108, 0.0026, 16, 64]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Inner Ring Division Border Accent (Deep Cyan) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.080, 0.0030, 16, 64]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0891B2"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* 3. ORBITING SATELLITE MOONS (Punchy High-Contrast Colors) */}
        {/* Moon 1: Fiery Golden Orb (Stunning complementary contrast) */}
        <mesh ref={moon1Ref}>
          <sphereGeometry args={[0.011, 16, 16]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={3.2}
          />
        </mesh>

        {/* Moon 2: Electric Cyan Orb */}
        <mesh ref={moon2Ref}>
          <sphereGeometry args={[0.009, 14, 14]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0891B2"
            emissiveIntensity={3.2}
          />
        </mesh>

        {/* Moon 3: Hot Magenta Plasma Orb */}
        <mesh ref={moon3Ref}>
          <sphereGeometry args={[0.007, 12, 12]} />
          <meshStandardMaterial
            color="#F43F5E"
            emissive="#E11D48"
            emissiveIntensity={3.4}
          />
        </mesh>
      </group>

      {/* 4. HOLOGRAPHIC EMITTER PEDESTAL BASE */}
      <group position={[0, -0.075, 0]}>
        {/* Base Bevel Disc */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.072, 0.076, 0.008, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Cyan Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.058, 0.0040, 16, 32]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#00F5D4"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.002, 24]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0284C7"
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>

      <pointLight color="#0284C7" intensity={hovered ? 3.8 : 2.8} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 3. CHEMISTRY LAB 3D: ERLENMEYER BEAKER WITH BUBBLING CHEMICAL & VIBRANT
// COLORED EVAPORATION VAPOR
// Redesigned for crisp visibility against white backgrounds:
// Defined borosilicate glass contours with sleek dark rims, vibrant glowing
// Cosmic Ruby potion filling 65% of the beaker, effervescent golden micro-bubbles,
// dense saturated ascending vapor clouds, and grounded dark pedestal base!
// ============================================================================
export function ChemistryLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  // 8 active micro-bubbles rising inside the beaker liquid
  const b1 = useRef<THREE.Mesh | null>(null);
  const b2 = useRef<THREE.Mesh | null>(null);
  const b3 = useRef<THREE.Mesh | null>(null);
  const b4 = useRef<THREE.Mesh | null>(null);
  const b5 = useRef<THREE.Mesh | null>(null);
  const b6 = useRef<THREE.Mesh | null>(null);
  const b7 = useRef<THREE.Mesh | null>(null);
  const b8 = useRef<THREE.Mesh | null>(null);

  // 10 vibrant colored evaporation vapor puffs ascending into the air
  const vaporPuffs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 1.8 : 1.1;

    // Gentle 3D levitation and subtle laboratory tilt
    groupRef.current.position.y = Math.sin(t * 1.8 + 2) * 0.008;
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.12;

    // 8 Active micro-bubbles rising through the chemical liquid
    const bubbleRefs = [b1, b2, b3, b4, b5, b6, b7, b8];
    const bParams = [
      { speed: 0.050, offset: 0.00, xOff: 0.012, zOff: 0.008, wobble: 3.2 },
      { speed: 0.060, offset: 0.15, xOff: -0.016, zOff: 0.010, wobble: 4.1 },
      { speed: 0.045, offset: 0.30, xOff: 0.008, zOff: -0.014, wobble: 3.6 },
      { speed: 0.055, offset: 0.45, xOff: -0.010, zOff: -0.008, wobble: 2.8 },
      { speed: 0.065, offset: 0.60, xOff: 0.020, zOff: -0.004, wobble: 4.5 },
      { speed: 0.050, offset: 0.72, xOff: -0.005, zOff: 0.018, wobble: 3.8 },
      { speed: 0.058, offset: 0.85, xOff: 0.015, zOff: 0.012, wobble: 4.2 },
      { speed: 0.048, offset: 0.92, xOff: -0.018, zOff: -0.012, wobble: 3.4 },
    ];

    bubbleRefs.forEach((bRef, i) => {
      if (!bRef.current) return;
      const bp = bParams[i];
      const progress = (t * bp.speed * speed + bp.offset) % 1;
      // y moves from beaker base (-0.050) up to meniscus surface (+0.010)
      bRef.current.position.y = -0.050 + progress * 0.058;
      // Spread narrows slightly as beaker body tapers upward
      const taper = 1.0 - progress * 0.40;
      bRef.current.position.x = bp.xOff * taper + Math.sin(t * bp.wobble + i) * 0.003;
      bRef.current.position.z = bp.zOff * taper + Math.cos(t * bp.wobble + i) * 0.003;
      const s = 0.75 + progress * 0.55;
      bRef.current.scale.set(s, s, s);
    });

    // 10 VIBRANT COLORED EVAPORATION VAPOR PUFFS (High-Contrast Saturated Billows)
    vaporPuffs.current.forEach((puff, i) => {
      if (!puff) return;
      const count = 10;
      const puffOffset = i / count;
      const puffSpeed = (0.065 + (i % 4) * 0.012) * speed;
      const cycle = (t * puffSpeed + puffOffset) % 1;

      // Height: Starts right at meniscus (+0.010), passes through neck (+0.04 to +0.06), ascends high into air (+0.17)
      puff.position.y = 0.010 + cycle * 0.165;

      // Swirling atmospheric convection eddy
      const swirlAngle = (i * Math.PI * 2) / count + t * 0.8;
      // Radius widens out above the beaker neck
      const driftRad = cycle > 0.35 ? 0.008 + (cycle - 0.35) * 0.045 : cycle * 0.012;
      puff.position.x = Math.cos(swirlAngle) * driftRad + Math.sin(t * 1.8 + i) * 0.003;
      puff.position.z = Math.sin(swirlAngle) * driftRad + Math.cos(t * 1.5 + i) * 0.003;

      // Expansion as vapor billows outward
      const scaleVal = 0.75 + cycle * 1.8;
      puff.scale.set(scaleVal, scaleVal, scaleVal);

      // Distinct colored visibility: high opacity emerging, soft dissipation at apex
      const mat = puff.material as THREE.MeshStandardMaterial;
      if (mat) {
        let opacity = 0.90;
        if (cycle < 0.12) {
          opacity = (cycle / 0.12) * 0.90;
        } else if (cycle > 0.70) {
          opacity = Math.max(0, (1 - (cycle - 0.70) / 0.30) * 0.90);
        }
        mat.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.15 : 1.04}>
      {/* ============================================================ */}
      {/* 1. LABORATORY ERLENMEYER BEAKER (Defined Borosilicate Glass) */}
      {/* ============================================================ */}
      <group position={[0, 0.008, 0]}>
        {/* Cylindrical Glass Neck with Defined Glass Shading */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.042, 32, 1, true]} />
          <meshStandardMaterial
            color="#1E293B"
            emissive="#0F172A"
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.08}
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Flared Dark Glass Top Lip Rim (Crisp, High-Contrast Silhouette) */}
        <mesh position={[0, 0.063, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.023, 0.0035, 16, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Expanding Conical Glass Body with Defined Contours */}
        <mesh position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.022, 0.066, 0.074, 32, 1, true]} />
          <meshStandardMaterial
            color="#1E293B"
            emissive="#0F172A"
            emissiveIntensity={0.45}
            metalness={0.3}
            roughness={0.08}
            transparent
            opacity={0.40}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Defined Polished Base Rim Ring */}
        <mesh position={[0, -0.053, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.066, 0.0035, 16, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Dark Etched Graduation Measurement Lines (Clearly visible against liquid & white) */}
        <mesh position={[0, -0.038, 0]}>
          <cylinderGeometry args={[0.0535, 0.0535, 0.0022, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, -0.022, 0]}>
          <cylinderGeometry args={[0.0440, 0.0440, 0.0022, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, -0.006, 0]}>
          <cylinderGeometry args={[0.0345, 0.0345, 0.0022, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.4} />
        </mesh>

        {/* ============================================================ */}
        {/* 2. VIBRANT COSMIC RUBY CHEMICAL POTION (Fills 65% of beaker) */}
        {/* ============================================================ */}
        {/* Conical Liquid Volume inside Beaker */}
        <mesh position={[0, -0.020, 0]}>
          <cylinderGeometry args={[0.034, 0.063, 0.062, 32]} />
          <meshStandardMaterial
            color="#BE123C"
            emissive="#9F1239"
            emissiveIntensity={2.4}
            roughness={0.15}
            metalness={0.20}
          />
        </mesh>

        {/* Liquid Meniscus Surface Cap (Radiant Hot Rose/Magenta) */}
        <mesh position={[0, 0.010, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.034, 32]} />
          <meshStandardMaterial
            color="#F43F5E"
            emissive="#E11D48"
            emissiveIntensity={3.2}
            roughness={0.1}
          />
        </mesh>

        {/* ============================================================ */}
        {/* 3. ACTIVE EFFERVESCENT REACTION MICRO-BUBBLES */}
        {/* ============================================================ */}
        <mesh ref={b1}>
          <sphereGeometry args={[0.0090, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b2}>
          <sphereGeometry args={[0.0075, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b3}>
          <sphereGeometry args={[0.0065, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b4}>
          <sphereGeometry args={[0.0085, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b5}>
          <sphereGeometry args={[0.0060, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b6}>
          <sphereGeometry args={[0.0080, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b7}>
          <sphereGeometry args={[0.0070, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b8}>
          <sphereGeometry args={[0.0085, 12, 12]} />
          <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={3.2} />
        </mesh>

        {/* ============================================================ */}
        {/* 4. VISIBLY COLORED EVAPORATION VAPOR BILLOWS (Ruby / Magenta) */}
        {/* ============================================================ */}
        {[
          { color: '#F43F5E', emissive: '#BE123C', size: 0.015 },
          { color: '#E11D48', emissive: '#9F1239', size: 0.017 },
          { color: '#FB7185', emissive: '#E11D48', size: 0.014 },
          { color: '#FDA4AF', emissive: '#BE123C', size: 0.016 },
          { color: '#F43F5E', emissive: '#9F1239', size: 0.018 },
          { color: '#E11D48', emissive: '#BE123C', size: 0.015 },
          { color: '#C084FC', emissive: '#7C3AED', size: 0.016 },
          { color: '#FB7185', emissive: '#E11D48', size: 0.015 },
          { color: '#F43F5E', emissive: '#BE123C', size: 0.017 },
          { color: '#E11D48', emissive: '#9F1239', size: 0.014 },
        ].map((v, i) => (
          <mesh
            key={`colored-vapor-${i}`}
            ref={(el) => {
              vaporPuffs.current[i] = el;
            }}
          >
            <sphereGeometry args={[v.size, 16, 16]} />
            <meshStandardMaterial
              color={v.color}
              emissive={v.emissive}
              emissiveIntensity={3.2}
              transparent
              opacity={0.90}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* 5. FLOATING CHEMICAL MOLECULE NODES */}
      <group position={[0, 0.015, 0]}>
        {/* Bonded Molecule Cluster 1 (Left side: Ruby Core + Golden Atoms) */}
        <group position={[-0.105, 0.018, 0.02]}>
          <mesh position={[0, 0.012, 0]}>
            <sphereGeometry args={[0.010, 12, 12]} />
            <meshStandardMaterial color="#BE123C" emissive="#9F1239" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.014, -0.009, 0]}>
            <sphereGeometry args={[0.008, 12, 12]} />
            <meshStandardMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={2.8} />
          </mesh>
          <mesh position={[-0.014, -0.009, 0]}>
            <sphereGeometry args={[0.008, 12, 12]} />
            <meshStandardMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={2.8} />
          </mesh>
        </group>

        {/* Bonded Molecule Cluster 2 (Right side: Sapphire Core + Rose Atoms) */}
        <group position={[0.105, 0.045, -0.02]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.010, 12, 12]} />
            <meshStandardMaterial color="#1D4ED8" emissive="#2563EB" emissiveIntensity={2.6} />
          </mesh>
          <mesh position={[0.015, 0.013, 0]}>
            <sphereGeometry args={[0.008, 12, 12]} />
            <meshStandardMaterial color="#FB7185" emissive="#E11D48" emissiveIntensity={2.6} />
          </mesh>
        </group>
      </group>

      {/* 6. HOLOGRAPHIC EMITTER PEDESTAL BASE */}
      <group position={[0, -0.075, 0]}>
        {/* Base Bevel Disk */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.072, 0.076, 0.008, 32]} />
          <meshStandardMaterial
            color="#1C1917"
            emissive="#4C0519"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Ruby Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.058, 0.0040, 16, 32]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#BE123C"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.002, 24]} />
          <meshStandardMaterial
            color="#FDA4AF"
            emissive="#E11D48"
            emissiveIntensity={2.4}
          />
        </mesh>
      </group>

      {/* Dynamic Colored Evaporation & Chemical Reaction Glow */}
      <pointLight color="#E11D48" intensity={hovered ? 4.0 : 2.8} distance={0.7} />
      <pointLight position={[0, 0.08, 0]} color="#F43F5E" intensity={hovered ? 2.8 : 2.0} distance={0.5} />
    </group>
  );
}

// ============================================================================
// 4. BIOLOGY LAB 3D: BOLD SATURATED DNA DOUBLE HELIX (RING-FREE)
// Rich Royal Violet & Magenta nucleotides with thick double rungs!
// ============================================================================
export function BiologyLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const helixRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.9 + 3) * 0.010;
    if (helixRef.current) {
      helixRef.current.rotation.y += delta * (hovered ? 2.4 : 1.4);
    }
  });

  const rungs = useMemo(() => {
    const list = [];
    const count = 9;
    const R = 0.075;
    for (let i = 0; i < count; i++) {
      const y = -0.11 + (i / (count - 1)) * 0.22;
      const angle = i * 0.62;
      const x1 = Math.cos(angle) * R;
      const z1 = Math.sin(angle) * R;
      const x2 = -x1;
      const z2 = -z1;
      list.push({ y, angle, x1, z1, x2, z2 });
    }
    return list;
  }, []);

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      <group ref={helixRef}>
        {rungs.map((r, i) => (
          <group key={i} position={[0, r.y, 0]}>
            {/* Strand A: Deep Royal Violet Nucleotide Sphere */}
            <mesh position={[r.x1, 0, r.z1]}>
              <sphereGeometry args={[0.024, 16, 16]} />
              <meshStandardMaterial
                color="#6D28D9"
                emissive="#5B21B6"
                emissiveIntensity={1.4}
                roughness={0.15}
              />
            </mesh>
            {/* Strand B: Vivid Fuchsia / Magenta Nucleotide Sphere */}
            <mesh position={[r.x2, 0, r.z2]}>
              <sphereGeometry args={[0.024, 16, 16]} />
              <meshStandardMaterial
                color="#BE185D"
                emissive="#9D174D"
                emissiveIntensity={1.4}
                roughness={0.15}
              />
            </mesh>
            {/* Thick Double Rung Connection Bridge */}
            <mesh rotation={[0, -r.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.0055, 0.0055, 0.15, 8]} />
              <meshStandardMaterial
                color="#7C3AED"
                emissive="#6D28D9"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      <pointLight color="#7C3AED" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 5. COMPUTER LAB 3D: AUTHENTIC OFFICIAL PYTHON 3D LOGO (RING-FREE)
// Uses the exact, official Python Software Foundation vector paths & gradients.
// Rendered on a gleaming 3D cyber emblem disc with floating microchip pins!
// ============================================================================
const PYTHON_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110px" height="110px" viewBox="0.21 -0.077 110 110"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="63.8159" y1="56.6829" x2="118.4934" y2="1.8225" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"><stop offset="0" style="stop-color:#387EB8"/><stop offset="1" style="stop-color:#366994"/></linearGradient><path fill="url(#SVGID_1_)" d="M55.023-0.077c-25.971,0-26.25,10.081-26.25,12.156c0,3.148,0,12.594,0,12.594h26.75v3.781 c0,0-27.852,0-37.375,0c-7.949,0-17.938,4.833-17.938,26.25c0,19.673,7.792,27.281,15.656,27.281c2.335,0,9.344,0,9.344,0 s0-9.765,0-13.125c0-5.491,2.721-15.656,15.406-15.656c15.91,0,19.971,0,26.531,0c3.902,0,14.906-1.696,14.906-14.406 c0-13.452,0-17.89,0-24.219C82.054,11.426,81.515-0.077,55.023-0.077z M40.273,8.392c2.662,0,4.813,2.15,4.813,4.813 c0,2.661-2.151,4.813-4.813,4.813s-4.813-2.151-4.813-4.813C35.46,10.542,37.611,8.392,40.273,8.392z"/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="97.0444" y1="21.6321" x2="155.6665" y2="-34.5308" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"><stop offset="0" style="stop-color:#FFE052"/><stop offset="1" style="stop-color:#FFC331"/></linearGradient><path fill="url(#SVGID_2_)" d="M55.397,109.923c25.959,0,26.282-10.271,26.282-12.156c0-3.148,0-12.594,0-12.594H54.897v-3.781 c0,0,28.032,0,37.375,0c8.009,0,17.938-4.954,17.938-26.25c0-23.322-10.538-27.281-15.656-27.281c-2.336,0-9.344,0-9.344,0 s0,10.216,0,13.125c0,5.491-2.631,15.656-15.406,15.656c-15.91,0-19.476,0-26.532,0c-3.892,0-14.906,1.896-14.906,14.406 c0,14.475,0,18.265,0,24.219C28.366,100.497,31.562,109.923,55.397,109.923z M70.148,101.454c-2.662,0-4.813-2.151-4.813-4.813 s2.15-4.813,4.813-4.813c2.661,0,4.813,2.151,4.813,4.813S72.809,101.454,70.148,101.454z"/></svg>`
)}`;

export function ComputerLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.clearRect(0, 0, 1024, 1024);
      // Center the official Python logo with crisp breathing margins
      ctx.drawImage(img, 72, 72, 880, 880);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      setTexture(tex);
    };
    img.src = PYTHON_SVG_DATA_URI;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle 3D levitation and isometric view
    groupRef.current.position.y = Math.sin(t * 2.0 + 4) * 0.010;
    groupRef.current.rotation.y = Math.sin(t * 1.3) * 0.24;
    groupRef.current.rotation.x = Math.cos(t * 1.1) * 0.12 + 0.10;
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* 3D Cyber Emblem Token holding the authentic official Python logo */}
      <group>
        {/* Sleek Dark Navy Disc Chassis */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.096, 0.096, 0.016, 40]} />
          <meshStandardMaterial
            color="#0B132B"
            emissive="#1E3A8A"
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>

        {/* Outer Beveled Edge Rim (Solid metallic cylinder, NO torus) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.098, 0.098, 0.008, 40, 1, true]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* 4 Corner Microchip Gold Connector Pins (NO rings) */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <mesh
            key={`pin-${idx}`}
            position={[Math.cos(ang) * 0.102, Math.sin(ang) * 0.102, 0]}
            rotation={[0, 0, ang]}
          >
            <boxGeometry args={[0.012, 0.008, 0.010]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={1.8}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* Front Face: Official Python Logo */}
        {texture && (
          <>
            <mesh position={[0, 0, 0.009]}>
              <planeGeometry args={[0.165, 0.165]} />
              <meshStandardMaterial
                map={texture}
                transparent
                alphaTest={0.01}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>

            {/* Back Face: Symmetrical for 3D viewing */}
            <mesh position={[0, 0, -0.009]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[0.165, 0.165]} />
              <meshStandardMaterial
                map={texture}
                transparent
                alphaTest={0.01}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>
          </>
        )}
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}
