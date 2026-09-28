'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. MATH LAB 3D: LUMINOUS 3D DIAMOND OCTAHEDRON & MATHEMATICAL POLYHEDRON
// Directly inspired by the reference image: glowing translucent violet crystal
// octahedron with glowing edge struts, vertex jewels, inner singularity diamond,
// floating mathematical polyhedra/symbols, and holographic emitter base!
// ============================================================================
export function MathLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const octaRef = useRef<THREE.Group | null>(null);
  const innerOctaRef = useRef<THREE.Mesh | null>(null);
  const floatItemsRef = useRef<THREE.Group | null>(null);

  // Octahedron geometry: 6 vertices, 12 edges
  const H = 0.082; // Top & bottom apex height
  const R = 0.068; // Equatorial radius

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
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* 1. MAIN GLOWING 3D DIAMOND OCTAHEDRON */}
      <group ref={octaRef} position={[0, 0.012, 0]}>
        {/* Solid Translucent Crystal Faces (Vivid Royal Violet & Magenta Sheen) */}
        <mesh>
          <octahedronGeometry args={[0.076, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#6D28D9"
            emissiveIntensity={1.8}
            roughness={0.12}
            metalness={0.35}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* 12 Glowing Edge Struts (Neon Ice / Lavender White) */}
        {edges.map((e, idx) => (
          <mesh key={`octa-edge-${idx}`} position={e.pos} rotation={e.rot}>
            <cylinderGeometry args={[0.0026, 0.0026, e.len, 8]} />
            <meshStandardMaterial
              color="#E0E7FF"
              emissive="#A78BFA"
              emissiveIntensity={2.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}

        {/* 6 Corner Vertex Node Jewels */}
        {vertexNodes.map((pos, idx) => (
          <mesh key={`octa-vert-${idx}`} position={pos}>
            <sphereGeometry args={[0.0055, 12, 12]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#C4B5FD"
              emissiveIntensity={3.2}
            />
          </mesh>
        ))}

        {/* Central Glowing Singularity Core Diamond */}
        <mesh ref={innerOctaRef}>
          <octahedronGeometry args={[0.034, 0]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#EC4899"
            emissiveIntensity={3.0}
            metalness={0.8}
            roughness={0.08}
          />
        </mesh>
      </group>

      {/* 2. FLOATING MATHEMATICAL POLYHEDRA & GLYPHS (Matching Reference Card) */}
      <group ref={floatItemsRef} position={[0, 0.012, 0]}>
        {/* Floating Mini Cube (Gold / Amber) */}
        <mesh position={[0.095, 0.035, 0.02]} rotation={[0.4, 0.5, 0.2]}>
          <boxGeometry args={[0.016, 0.016, 0.016]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={2.0}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Floating Mini Tetrahedron (Electric Cyan) */}
        <mesh position={[-0.092, -0.030, 0.03]} rotation={[0.3, -0.4, 0.6]}>
          <tetrahedronGeometry args={[0.015, 0]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={2.2}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Floating Pi / Symbol Node (Bright Magenta) */}
        <mesh position={[-0.085, 0.055, -0.025]}>
          <octahedronGeometry args={[0.011, 0]} />
          <meshStandardMaterial
            color="#F43F5E"
            emissive="#E11D48"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* 3. HOLOGRAPHIC EMITTER PEDESTAL BASE (Matching Reference Card) */}
      <group position={[0, -0.075, 0]}>
        {/* Base Outer Bevel Disk */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.068, 0.072, 0.007, 32]} />
          <meshStandardMaterial
            color="#2E1065"
            emissive="#4C1D95"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Violet Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.055, 0.0035, 16, 32]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#7C3AED"
            emissiveIntensity={2.8}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.002, 24]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#9333EA"
            emissiveIntensity={2.2}
          />
        </mesh>
        {/* Holographic Projection Light Beam Cone */}
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.068, 0.035, 0.095, 32, 1, true]} />
          <meshBasicMaterial
            color="#A855F7"
            transparent
            opacity={0.11}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <pointLight color="#A855F7" intensity={hovered ? 3.6 : 2.5} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 2. PHYSICS LAB 3D: COSMIC STRIPED RINGED PLANET & SATELLITE MOONS
// Directly inspired by the reference image: a glowing striped Gas Giant planet
// (Saturn-like celestial world) in luminous cyan/sapphire with banded atmosphere,
// radiant tilted planetary ring disc, orbiting satellite moons, and emitter base!
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
      moon1Ref.current.position.set(Math.cos(angle) * 0.135, 0, Math.sin(angle) * 0.135);
    }
    if (moon2Ref.current) {
      // Moon 2: slightly inclined orbit
      const angle = t * orbitSpeed * 1.6 + 2.0;
      moon2Ref.current.position.set(
        Math.cos(angle) * 0.115,
        Math.sin(angle * 2) * 0.020,
        Math.sin(angle) * 0.115
      );
    }
    if (moon3Ref.current) {
      // Moon 3: inner fast moon
      const angle = -t * orbitSpeed * 2.0 + 4.0;
      moon3Ref.current.position.set(Math.cos(angle) * 0.092, 0, Math.sin(angle) * 0.092);
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* 1. PLANET ASSEMBLY (Tilted at 26-degree planetary axial tilt) */}
      <group ref={planetTiltRef} rotation={[0.42, 0, 0.18]} position={[0, 0.015, 0]}>
        {/* Celestial Sphere with Striped Bands */}
        <group ref={planetCoreRef}>
          {/* Base Oceanic Sapphire Planet Core */}
          <mesh>
            <sphereGeometry args={[0.054, 32, 32]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0369A1"
              emissiveIntensity={1.2}
              roughness={0.25}
              metalness={0.2}
            />
          </mesh>

          {/* Central Equatorial Atmosphere Stripe (Electric Cyan) */}
          <mesh>
            <cylinderGeometry args={[0.0545, 0.0545, 0.020, 32, 1, true]} />
            <meshStandardMaterial
              color="#38BDF8"
              emissive="#0EA5E9"
              emissiveIntensity={2.0}
              roughness={0.2}
            />
          </mesh>

          {/* North Temperate Atmospheric Band (Arctic Ice Cyan) */}
          <mesh position={[0, 0.022, 0]}>
            <cylinderGeometry args={[0.0485, 0.0485, 0.010, 32, 1, true]} />
            <meshStandardMaterial
              color="#67E8F9"
              emissive="#06B6D4"
              emissiveIntensity={2.2}
              roughness={0.2}
            />
          </mesh>

          {/* South Temperate Atmospheric Band (Deep Midnight Blue) */}
          <mesh position={[0, -0.022, 0]}>
            <cylinderGeometry args={[0.0485, 0.0485, 0.010, 32, 1, true]} />
            <meshStandardMaterial
              color="#1E3A8A"
              emissive="#1D4ED8"
              emissiveIntensity={1.5}
              roughness={0.2}
            />
          </mesh>

          {/* North Polar Cap (Luminous White-Cyan Ice) */}
          <mesh position={[0, 0.044, 0]}>
            <sphereGeometry args={[0.025, 24, 16]} />
            <meshStandardMaterial
              color="#E0F2FE"
              emissive="#38BDF8"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>

        {/* 2. LUMINOUS PLANETARY RINGS (Matching Reference Image) */}
        {/* Wide Translucent Planetary Ring Disc */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.074, 0.124, 64]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.8}
            transparent
            opacity={0.82}
            side={THREE.DoubleSide}
            roughness={0.15}
          />
        </mesh>

        {/* Outer Ring Luminous Border Accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.124, 0.0022, 16, 64]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={2.8}
          />
        </mesh>

        {/* Inner Ring Division Border Accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.074, 0.0020, 16, 64]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={2.0}
          />
        </mesh>

        {/* 3. ORBITING SATELLITE MOONS */}
        {/* Moon 1: Pearl White/Cyan Sphere */}
        <mesh ref={moon1Ref}>
          <sphereGeometry args={[0.009, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#7DD3FC"
            emissiveIntensity={3.2}
          />
        </mesh>

        {/* Moon 2: Electric Lapis Blue Sphere */}
        <mesh ref={moon2Ref}>
          <sphereGeometry args={[0.0075, 14, 14]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={2.8}
          />
        </mesh>

        {/* Moon 3: Radiant Inner Starlight Moon */}
        <mesh ref={moon3Ref}>
          <sphereGeometry args={[0.0055, 12, 12]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#38BDF8"
            emissiveIntensity={3.5}
          />
        </mesh>
      </group>

      {/* 4. HOLOGRAPHIC EMITTER PEDESTAL BASE (Matching Reference Card) */}
      <group position={[0, -0.075, 0]}>
        {/* Base Bevel Disc */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.068, 0.072, 0.007, 32]} />
          <meshStandardMaterial
            color="#082F49"
            emissive="#075985"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Cyan Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.055, 0.0035, 16, 32]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={2.8}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.002, 24]} />
          <meshStandardMaterial
            color="#7DD3FC"
            emissive="#0284C7"
            emissiveIntensity={2.2}
          />
        </mesh>
        {/* Holographic Projection Light Beam Cone */}
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.068, 0.035, 0.095, 32, 1, true]} />
          <meshBasicMaterial
            color="#0284C7"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.6 : 2.5} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 3. CHEMISTRY LAB 3D: ERLENMEYER BEAKER WITH BUBBLING CHEMICAL & VIBRANT
// COLORED EVAPORATION VAPOR
// Directly inspired by the reference image & user requirements:
// Classic conical laboratory beaker holding glowing emerald chemical liquid,
// continuous effervescent bubbling inside, and prominently visible colored
// evaporation vapor clouds rising upward with floating molecule clusters!
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
      // y moves from beaker base (-0.050) up to meniscus surface (-0.008)
      bRef.current.position.y = -0.050 + progress * 0.042;
      // Spread narrows slightly as beaker body tapers upward
      const taper = 1.0 - progress * 0.35;
      bRef.current.position.x = bp.xOff * taper + Math.sin(t * bp.wobble + i) * 0.003;
      bRef.current.position.z = bp.zOff * taper + Math.cos(t * bp.wobble + i) * 0.003;
      const s = 0.75 + progress * 0.55;
      bRef.current.scale.set(s, s, s);
    });

    // 10 VIBRANT COLORED EVAPORATION VAPOR PUFFS (High Visibility Emerald & Electric Mint)
    vaporPuffs.current.forEach((puff, i) => {
      if (!puff) return;
      const count = 10;
      const puffOffset = i / count;
      const puffSpeed = (0.065 + (i % 4) * 0.012) * speed;
      const cycle = (t * puffSpeed + puffOffset) % 1;

      // Height: Starts right at meniscus (-0.008), passes through neck (+0.04 to +0.06), ascends high into air (+0.16)
      puff.position.y = -0.008 + cycle * 0.170;

      // Swirling atmospheric convection eddy
      const swirlAngle = (i * Math.PI * 2) / count + t * 0.8;
      // Radius widens out above the beaker neck
      const driftRad = cycle > 0.38 ? 0.008 + (cycle - 0.38) * 0.045 : cycle * 0.012;
      puff.position.x = Math.cos(swirlAngle) * driftRad + Math.sin(t * 1.8 + i) * 0.003;
      puff.position.z = Math.sin(swirlAngle) * driftRad + Math.cos(t * 1.5 + i) * 0.003;

      // Expansion as vapor billows outward
      const scaleVal = 0.65 + cycle * 1.8;
      puff.scale.set(scaleVal, scaleVal, scaleVal);

      // Distinct colored visibility: high opacity emerging, soft dissipation at apex
      const mat = puff.material as THREE.MeshStandardMaterial;
      if (mat) {
        let opacity = 0.85;
        if (cycle < 0.15) {
          opacity = (cycle / 0.15) * 0.85;
        } else if (cycle > 0.65) {
          opacity = Math.max(0, (1 - (cycle - 0.65) / 0.35) * 0.85);
        }
        mat.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* ============================================================ */}
      {/* 1. LABORATORY ERLENMEYER BEAKER (Borosilicate Glass) */}
      {/* ============================================================ */}
      <group position={[0, 0.008, 0]}>
        {/* Cylindrical Glass Neck */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.022, 0.022, 0.042, 32, 1, true]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={0.35}
            metalness={0.15}
            roughness={0.08}
            transparent
            opacity={0.36}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Flared Glass Top Lip Rim */}
        <mesh position={[0, 0.063, 0]}>
          <cylinderGeometry args={[0.025, 0.022, 0.004, 32, 1, true]} />
          <meshStandardMaterial
            color="#BAE6FD"
            emissive="#0EA5E9"
            emissiveIntensity={0.65}
            roughness={0.1}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Expanding Conical Glass Body */}
        <mesh position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.022, 0.066, 0.074, 32, 1, true]} />
          <meshStandardMaterial
            color="#E0F2FE"
            emissive="#38BDF8"
            emissiveIntensity={0.32}
            metalness={0.15}
            roughness={0.08}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Flat Glass Base Bottom Plate */}
        <mesh position={[0, -0.053, 0]}>
          <cylinderGeometry args={[0.066, 0.066, 0.005, 32]} />
          <meshStandardMaterial
            color="#BAE6FD"
            emissive="#38BDF8"
            emissiveIntensity={0.4}
            metalness={0.2}
            roughness={0.1}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* White Etched Graduation Measurement Lines on Beaker Wall */}
        <mesh position={[0, -0.038, 0]}>
          <cylinderGeometry args={[0.0535, 0.0535, 0.0018, 32, 1, true]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#E0F2FE" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, -0.024, 0]}>
          <cylinderGeometry args={[0.0455, 0.0455, 0.0018, 32, 1, true]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#E0F2FE" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, -0.010, 0]}>
          <cylinderGeometry args={[0.0375, 0.0375, 0.0018, 32, 1, true]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#E0F2FE" emissiveIntensity={1.5} />
        </mesh>

        {/* ============================================================ */}
        {/* 2. BIOLUMINESCENT EMERALD CHEMICAL LIQUID */}
        {/* ============================================================ */}
        {/* Conical Liquid Volume inside Beaker */}
        <mesh position={[0, -0.030, 0]}>
          <cylinderGeometry args={[0.038, 0.063, 0.045, 32]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={2.8}
            roughness={0.15}
            metalness={0.15}
          />
        </mesh>

        {/* Liquid Meniscus Surface Cap */}
        <mesh position={[0, -0.0075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.038, 32]} />
          <meshStandardMaterial
            color="#6EE7B7"
            emissive="#34D399"
            emissiveIntensity={3.0}
            roughness={0.1}
          />
        </mesh>

        {/* ============================================================ */}
        {/* 3. ACTIVE EFFERVESCENT REACTION MICRO-BUBBLES */}
        {/* ============================================================ */}
        <mesh ref={b1}>
          <sphereGeometry args={[0.0085, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b2}>
          <sphereGeometry args={[0.0070, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b3}>
          <sphereGeometry args={[0.0060, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b4}>
          <sphereGeometry args={[0.0080, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b5}>
          <sphereGeometry args={[0.0055, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b6}>
          <sphereGeometry args={[0.0075, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b7}>
          <sphereGeometry args={[0.0065, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>
        <mesh ref={b8}>
          <sphereGeometry args={[0.0080, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#A7F3D0" emissiveIntensity={3.2} />
        </mesh>

        {/* ============================================================ */}
        {/* 4. VISIBLY COLORED EVAPORATION VAPOR BILLOWS (Emerald / Mint) */}
        {/* ============================================================ */}
        {[
          { color: '#00F5D4', emissive: '#059669', size: 0.013 },
          { color: '#10B981', emissive: '#047857', size: 0.015 },
          { color: '#34D399', emissive: '#10B981', size: 0.012 },
          { color: '#6EE7B7', emissive: '#059669', size: 0.014 },
          { color: '#00F5D4', emissive: '#059669', size: 0.016 },
          { color: '#10B981', emissive: '#047857', size: 0.013 },
          { color: '#4ADE80', emissive: '#16A34A', size: 0.015 },
          { color: '#6EE7B7', emissive: '#059669', size: 0.014 },
          { color: '#00F5D4', emissive: '#059669', size: 0.015 },
          { color: '#34D399', emissive: '#10B981', size: 0.012 },
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
              opacity={0.85}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* 5. FLOATING CHEMICAL MOLECULE NODES (Matching Reference Card) */}
      <group position={[0, 0.012, 0]}>
        {/* Bonded Molecule Cluster 1 (Left side) */}
        <group position={[-0.095, 0.015, 0.02]}>
          <mesh position={[0, 0.012, 0]}>
            <sphereGeometry args={[0.009, 12, 12]} />
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.012, -0.008, 0]}>
            <sphereGeometry args={[0.007, 12, 12]} />
            <meshStandardMaterial color="#00F5D4" emissive="#059669" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[-0.012, -0.008, 0]}>
            <sphereGeometry args={[0.007, 12, 12]} />
            <meshStandardMaterial color="#00F5D4" emissive="#059669" emissiveIntensity={2.5} />
          </mesh>
        </group>

        {/* Bonded Molecule Cluster 2 (Right side) */}
        <group position={[0.095, 0.040, -0.02]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.009, 12, 12]} />
            <meshStandardMaterial color="#34D399" emissive="#10B981" emissiveIntensity={2.5} />
          </mesh>
          <mesh position={[0.014, 0.012, 0]}>
            <sphereGeometry args={[0.007, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#6EE7B7" emissiveIntensity={2.2} />
          </mesh>
        </group>
      </group>

      {/* 6. HOLOGRAPHIC EMITTER PEDESTAL BASE (Matching Reference Card) */}
      <group position={[0, -0.075, 0]}>
        {/* Base Bevel Disk */}
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.068, 0.072, 0.007, 32]} />
          <meshStandardMaterial
            color="#064E3B"
            emissive="#065F46"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing Neon Emerald Emitter Ring */}
        <mesh position={[0, -0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.055, 0.0035, 16, 32]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={2.8}
          />
        </mesh>
        {/* Inner Luminous Core Disc */}
        <mesh position={[0, -0.003, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.002, 24]} />
          <meshStandardMaterial
            color="#6EE7B7"
            emissive="#10B981"
            emissiveIntensity={2.2}
          />
        </mesh>
        {/* Holographic Projection Light Beam Cone */}
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.068, 0.035, 0.095, 32, 1, true]} />
          <meshBasicMaterial
            color="#10B981"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Dynamic Colored Evaporation & Chemical Reaction Glow */}
      <pointLight color="#10B981" intensity={hovered ? 3.8 : 2.6} distance={0.7} />
      <pointLight position={[0, 0.08, 0]} color="#00F5D4" intensity={hovered ? 2.5 : 1.8} distance={0.5} />
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
