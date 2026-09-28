'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. MATH LAB 3D: STANDOUT 4D GOLDEN TESSERACT (HYPERCUBE) & ASTROLABE
// Represents higher-dimensional mathematics, tensor calculus & sacred geometry.
// Outer 24K golden hyperframe, suspended counter-rotating inner core,
// 8 dimensional vectors, and central glowing singularity gem!
// ============================================================================
export function MathLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const outerCubeRef = useRef<THREE.Group | null>(null);
  const innerCubeRef = useRef<THREE.Group | null>(null);
  const gemRef = useRef<THREE.Mesh | null>(null);

  // Outer cube half-size and inner cube half-size
  const Rout = 0.062;
  const Rin = 0.031;

  // Precompute 8 diagonal struts connecting outer vertices to inner vertices
  const diagonalStruts = useMemo(() => {
    const struts: { position: [number, number, number]; rotation: [number, number, number]; length: number }[] = [];
    const signs = [-1, 1];
    const up = new THREE.Vector3(0, 1, 0);

    for (const sx of signs) {
      for (const sy of signs) {
        for (const sz of signs) {
          const pOut = new THREE.Vector3(sx * Rout, sy * Rout, sz * Rout);
          const pIn = new THREE.Vector3(sx * Rin, sy * Rin, sz * Rin);
          const mid = new THREE.Vector3().addVectors(pOut, pIn).multiplyScalar(0.5);
          const dir = new THREE.Vector3().subVectors(pOut, pIn);
          const len = dir.length();

          dir.normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
          const euler = new THREE.Euler().setFromQuaternion(quat);

          struts.push({
            position: [mid.x, mid.y, mid.z],
            rotation: [euler.x, euler.y, euler.z],
            length: len,
          });
        }
      }
    }
    return struts;
  }, [Rout, Rin]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.1;

    // Levitation bobbing
    groupRef.current.position.y = Math.sin(t * 2.2) * 0.008;

    // 4D Dimensional Tesseract Gyroscopic Rotation
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.y += delta * speed * 0.65;
      outerCubeRef.current.rotation.x = Math.sin(t * 1.2) * 0.22 + 0.12;
      outerCubeRef.current.rotation.z = Math.cos(t * 0.9) * 0.15;
    }

    if (innerCubeRef.current) {
      // Counter-rotation to showcase 4D inversion perspective
      innerCubeRef.current.rotation.y -= delta * speed * 1.1;
      innerCubeRef.current.rotation.x = Math.cos(t * 1.4) * 0.30;
      innerCubeRef.current.rotation.z = Math.sin(t * 1.0) * 0.20;

      // 4D breathing expansion/contraction pulsation
      const pulse = 1.0 + Math.sin(t * 2.4) * 0.08;
      innerCubeRef.current.scale.set(pulse, pulse, pulse);
    }

    if (gemRef.current) {
      gemRef.current.rotation.x += delta * speed * 1.8;
      gemRef.current.rotation.y += delta * speed * 2.2;
    }
  });

  const signs = [-1, 1];

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* 1. OUTER HYPERCUBE (High-Contrast Metallic Cobalt & Royal Indigo, No Rings) */}
      <group ref={outerCubeRef}>
        {/* 12 Outer Frame Struts */}
        {/* 4 Struts along X */}
        {signs.map((sy, i) =>
          signs.map((sz, j) => (
            <mesh
              key={`ox-${i}-${j}`}
              position={[0, sy * Rout, sz * Rout]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.0035, 0.0035, Rout * 2, 8]} />
              <meshStandardMaterial
                color="#1E3A8A"
                emissive="#2563EB"
                emissiveIntensity={0.85}
                metalness={0.92}
                roughness={0.12}
              />
            </mesh>
          ))
        )}
        {/* 4 Struts along Y */}
        {signs.map((sx, i) =>
          signs.map((sz, j) => (
            <mesh key={`oy-${i}-${j}`} position={[sx * Rout, 0, sz * Rout]}>
              <cylinderGeometry args={[0.0035, 0.0035, Rout * 2, 8]} />
              <meshStandardMaterial
                color="#1E3A8A"
                emissive="#2563EB"
                emissiveIntensity={0.85}
                metalness={0.92}
                roughness={0.12}
              />
            </mesh>
          ))
        )}
        {/* 4 Struts along Z */}
        {signs.map((sx, i) =>
          signs.map((sy, j) => (
            <mesh
              key={`oz-${i}-${j}`}
              position={[sx * Rout, sy * Rout, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.0035, 0.0035, Rout * 2, 8]} />
              <meshStandardMaterial
                color="#1E3A8A"
                emissive="#2563EB"
                emissiveIntensity={0.85}
                metalness={0.92}
                roughness={0.12}
              />
            </mesh>
          ))
        )}

        {/* 8 Outer Vertex Jewels (Electric Neon Cyan) */}
        {signs.map((sx, i) =>
          signs.map((sy, j) =>
            signs.map((sz, k) => (
              <mesh
                key={`ov-${i}-${j}-${k}`}
                position={[sx * Rout, sy * Rout, sz * Rout]}
              >
                <sphereGeometry args={[0.0075, 12, 12]} />
                <meshStandardMaterial
                  color="#00F0FF"
                  emissive="#06B6D4"
                  emissiveIntensity={2.5}
                  roughness={0.1}
                />
              </mesh>
            ))
          )
        )}

        {/* 8 Diagonal 4D Dimension Vectors (Luminous Ice Cyan) */}
        {diagonalStruts.map((s, idx) => (
          <mesh key={`diag-${idx}`} position={s.position} rotation={s.rotation}>
            <cylinderGeometry args={[0.0028, 0.0028, s.length, 8]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#38BDF8"
              emissiveIntensity={1.0}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* 2. INNER CORE CUBE (Radiant Electric Cyan Hyper-Core) */}
        <group ref={innerCubeRef}>
          {/* 12 Inner Frame Struts */}
          {signs.map((sy, i) =>
            signs.map((sz, j) => (
              <mesh
                key={`ix-${i}-${j}`}
                position={[0, sy * Rin, sz * Rin]}
                rotation={[0, 0, Math.PI / 2]}
              >
                <cylinderGeometry args={[0.0032, 0.0032, Rin * 2, 8]} />
                <meshStandardMaterial
                  color="#22D3EE"
                  emissive="#06B6D4"
                  emissiveIntensity={1.5}
                  metalness={0.85}
                  roughness={0.1}
                />
              </mesh>
            ))
          )}
          {signs.map((sx, i) =>
            signs.map((sz, j) => (
              <mesh key={`iy-${i}-${j}`} position={[sx * Rin, 0, sz * Rin]}>
                <cylinderGeometry args={[0.0032, 0.0032, Rin * 2, 8]} />
                <meshStandardMaterial
                  color="#22D3EE"
                  emissive="#06B6D4"
                  emissiveIntensity={1.5}
                  metalness={0.85}
                  roughness={0.1}
                />
              </mesh>
            ))
          )}
          {signs.map((sx, i) =>
            signs.map((sy, j) => (
              <mesh
                key={`iz-${i}-${j}`}
                position={[sx * Rin, sy * Rin, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <cylinderGeometry args={[0.0032, 0.0032, Rin * 2, 8]} />
                <meshStandardMaterial
                  color="#22D3EE"
                  emissive="#06B6D4"
                  emissiveIntensity={1.5}
                  metalness={0.85}
                  roughness={0.1}
                />
              </mesh>
            ))
          )}

          {/* 8 Inner Vertex Core Nodes */}
          {signs.map((sx, i) =>
            signs.map((sy, j) =>
              signs.map((sz, k) => (
                <mesh
                  key={`iv-${i}-${j}-${k}`}
                  position={[sx * Rin, sy * Rin, sz * Rin]}
                >
                  <sphereGeometry args={[0.006, 12, 12]} />
                  <meshStandardMaterial
                    color="#FFFFFF"
                    emissive="#E0F2FE"
                    emissiveIntensity={2.5}
                  />
                </mesh>
              ))
            )
          )}

          {/* 3. CENTRAL SINGULARITY GEM (Glowing Diamond Magenta / White Icosahedron) */}
          <mesh ref={gemRef}>
            <icosahedronGeometry args={[0.016, 0]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#EC4899"
              emissiveIntensity={3.0}
              metalness={0.8}
              roughness={0.08}
            />
          </mesh>
        </group>
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 2. PHYSICS LAB 3D: RADIANT QUANTUM ATOM (RING-FREE)
// High-contrast fiery ruby & solar amber nucleus with 4 energetic electrons
// orbiting freely on dynamic 3D paths with zero physical torus rings!
// ============================================================================
export function PhysicsLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);
  const e1Ref = useRef<THREE.Mesh | null>(null);
  const e2Ref = useRef<THREE.Mesh | null>(null);
  const e3Ref = useRef<THREE.Mesh | null>(null);
  const e4Ref = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.8 : 1.6;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * speed * 0.8;
      coreRef.current.rotation.x = Math.sin(t * 1.5) * 0.25;
    }

    const R = 0.115;
    // Electron 1: XY orbit with inclination
    if (e1Ref.current) {
      const angle = t * speed * 2.2;
      e1Ref.current.position.set(
        Math.cos(angle) * R,
        Math.sin(angle) * R * 0.85,
        Math.sin(angle) * R * 0.52
      );
    }
    // Electron 2: YZ orbit with inclination
    if (e2Ref.current) {
      const angle = (t + 1.2) * speed * 2.0;
      e2Ref.current.position.set(
        Math.sin(angle) * R * 0.55,
        Math.cos(angle) * R,
        Math.sin(angle) * R * 0.85
      );
    }
    // Electron 3: XZ orbit with inclination
    if (e3Ref.current) {
      const angle = (t + 2.5) * speed * 2.4;
      e3Ref.current.position.set(
        Math.sin(angle) * R * 0.85,
        Math.cos(angle) * R * 0.50,
        Math.cos(angle) * R
      );
    }
    // Electron 4: Diagonal reverse orbit
    if (e4Ref.current) {
      const angle = -(t + 3.8) * speed * 1.9;
      e4Ref.current.position.set(
        Math.cos(angle) * R * 0.80,
        Math.sin(angle) * R * 0.80,
        -Math.cos(angle) * R * 0.60
      );
    }

    groupRef.current.position.y = Math.sin(t * 2.1 + 1) * 0.010;
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* 1. Bold Solid Nucleus (High-Contrast Fiery Ruby & Solar Amber Core) */}
      <group ref={coreRef}>
        {/* Core Proton 1 (Blazing Ruby) */}
        <mesh position={[0.015, 0.012, 0.010]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial
            color="#EF4444"
            emissive="#DC2626"
            emissiveIntensity={2.2}
            roughness={0.12}
          />
        </mesh>
        {/* Core Proton 2 (Solar Amber) */}
        <mesh position={[-0.015, -0.010, 0.012]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={2.0}
            roughness={0.12}
          />
        </mesh>
        {/* Core Neutron 1 (Fiery Orange) */}
        <mesh position={[0.012, -0.015, -0.010]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial
            color="#EA580C"
            emissive="#C2410C"
            emissiveIntensity={2.0}
            roughness={0.12}
          />
        </mesh>
        {/* Core Neutron 2 (Rose Gold / Ruby Glow) */}
        <mesh position={[-0.010, 0.015, -0.012]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial
            color="#FB7185"
            emissive="#E11D48"
            emissiveIntensity={2.0}
            roughness={0.12}
          />
        </mesh>

        {/* Quantum Magnetic Flux Axis Pins (Representing field polarity, NO rings) */}
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.14, 8]} />
          <meshStandardMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={1.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.14, 8]} />
          <meshStandardMaterial color="#F97316" emissive="#EA580C" emissiveIntensity={1.5} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0025, 0.0025, 0.14, 8]} />
          <meshStandardMaterial color="#EF4444" emissive="#DC2626" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* 2. Freely Orbiting Luminous Quantum Electrons (NO rings) */}
      <mesh ref={e1Ref}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FEF08A"
          emissiveIntensity={3.5}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={e2Ref}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FDE047"
          emissiveIntensity={3.5}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={e3Ref}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FEF08A"
          emissiveIntensity={3.5}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={e4Ref}>
        <sphereGeometry args={[0.016, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#F59E0B"
          emissiveIntensity={3.2}
          roughness={0.1}
        />
      </mesh>

      <pointLight color="#F59E0B" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 3. CHEMISTRY LAB 3D: LABORATORY GLASS FUNNEL WITH REACTING CHEMICAL,
// FORMING BUBBLES & SLOW EVAPORATION (RING-FREE)
// Borosilicate glass funnel holding bioluminescent emerald solution with
// continuous bubbling from throat and slow vapor evaporation emerging upward!
// ============================================================================
export function ChemistryLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  // 6 micro-bubbles rising through liquid
  const b1 = useRef<THREE.Mesh | null>(null);
  const b2 = useRef<THREE.Mesh | null>(null);
  const b3 = useRef<THREE.Mesh | null>(null);
  const b4 = useRef<THREE.Mesh | null>(null);
  const b5 = useRef<THREE.Mesh | null>(null);
  const b6 = useRef<THREE.Mesh | null>(null);

  // 8 slow evaporation vapor puffs ascending above the funnel
  const vaporPuffs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 1.8 : 1.0;

    // Gentle 3D levitation and subtle laboratory tilt
    groupRef.current.position.y = Math.sin(t * 1.9 + 2) * 0.008;
    groupRef.current.rotation.y = Math.sin(t * 0.9) * 0.15;
    groupRef.current.rotation.z = Math.cos(t * 0.7) * 0.05;

    // Bubbles forming and rising inside the liquid
    const bubbleRefs = [b1, b2, b3, b4, b5, b6];
    const bParams = [
      { speed: 0.045, offset: 0.0, xOffset: 0.008, zOffset: 0.004, wobble: 3.2 },
      { speed: 0.055, offset: 0.2, xOffset: -0.010, zOffset: 0.006, wobble: 4.1 },
      { speed: 0.040, offset: 0.45, xOffset: 0.004, zOffset: -0.008, wobble: 3.6 },
      { speed: 0.050, offset: 0.65, xOffset: -0.006, zOffset: -0.004, wobble: 2.8 },
      { speed: 0.060, offset: 0.85, xOffset: 0.012, zOffset: -0.002, wobble: 4.5 },
      { speed: 0.048, offset: 0.15, xOffset: -0.003, zOffset: 0.010, wobble: 3.8 },
    ];

    bubbleRefs.forEach((bRef, i) => {
      if (!bRef.current) return;
      const bp = bParams[i];
      const progress = (t * bp.speed * speed + bp.offset) % 1;
      // y moves from throat (-0.038) up to liquid surface (+0.026)
      bRef.current.position.y = -0.038 + progress * 0.064;
      const spread = 0.3 + progress * 0.7;
      bRef.current.position.x = bp.xOffset * spread + Math.sin(t * bp.wobble + i) * 0.003;
      bRef.current.position.z = bp.zOffset * spread + Math.cos(t * bp.wobble + i) * 0.003;
      const s = 0.7 + progress * 0.5;
      bRef.current.scale.set(s, s, s);
    });

    // 8 Slow evaporation vapor puffs ascending from liquid surface into the air
    vaporPuffs.current.forEach((puff, i) => {
      if (!puff) return;
      const puffOffset = i / 8;
      const puffSpeed = (0.07 + (i % 3) * 0.015) * speed;
      const cycle = (t * puffSpeed + puffOffset) % 1;

      // Height: starts just at liquid surface (+0.028) and drifts above funnel top (+0.14)
      puff.position.y = 0.028 + cycle * 0.115;

      // Slow drifting & outward dispersion
      const angle = (i * Math.PI) / 4 + t * 0.3;
      const driftRad = cycle * 0.038;
      puff.position.x = Math.cos(angle) * driftRad + Math.sin(t * 1.5 + i) * 0.004;
      puff.position.z = Math.sin(angle) * driftRad + Math.cos(t * 1.2 + i) * 0.004;

      // Expansion as vapor disperses
      const scaleVal = 0.7 + cycle * 1.6;
      puff.scale.set(scaleVal, scaleVal, scaleVal);

      // Smooth fade out as it reaches the top of evaporation
      const mat = puff.material as THREE.MeshStandardMaterial;
      if (mat) {
        const opacity = cycle < 0.2 ? (cycle / 0.2) * 0.65 : (1 - (cycle - 0.2) / 0.8) * 0.65;
        mat.opacity = Math.max(0, opacity);
      }
    });
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* ============================================================ */}
      {/* 1. LABORATORY GLASS FUNNEL (Translucent Borosilicate Glass) */}
      {/* ============================================================ */}
      {/* Upper Conical Funnel Bowl (Wide top rim, tapering to throat) */}
      <mesh position={[0, 0.024, 0]}>
        <cylinderGeometry args={[0.075, 0.015, 0.078, 32, 1, true]} />
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

      {/* Flared Glass Top Lip (Subtle bevel collar, NO torus ring) */}
      <mesh position={[0, 0.063, 0]}>
        <cylinderGeometry args={[0.078, 0.075, 0.004, 32, 1, true]} />
        <meshStandardMaterial
          color="#BAE6FD"
          emissive="#0EA5E9"
          emissiveIntensity={0.6}
          roughness={0.1}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Slender Glass Stem (Drain tube extending down) */}
      <mesh position={[0, -0.050, 0]}>
        <cylinderGeometry args={[0.014, 0.011, 0.070, 24, 1, false]} />
        <meshStandardMaterial
          color="#E0F2FE"
          emissive="#38BDF8"
          emissiveIntensity={0.35}
          metalness={0.15}
          roughness={0.08}
          transparent
          opacity={0.36}
        />
      </mesh>

      {/* ============================================================ */}
      {/* 2. GLOWING CHEMICAL LIQUID INSIDE THE FUNNEL */}
      {/* High-contrast Bioluminescent Emerald & Vibrant Electric Mint */}
      {/* ============================================================ */}
      {/* Liquid in the Conical Bowl */}
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.048, 0.013, 0.042, 32]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#059669"
          emissiveIntensity={2.5}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      {/* Liquid column in the Stem */}
      <mesh position={[0, -0.045, 0]}>
        <cylinderGeometry args={[0.010, 0.008, 0.060, 24]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#059669"
          emissiveIntensity={2.3}
          roughness={0.15}
        />
      </mesh>

      {/* Liquid Meniscus Surface Cap */}
      <mesh position={[0, 0.026, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.048, 32]} />
        <meshStandardMaterial
          color="#6EE7B7"
          emissive="#34D399"
          emissiveIntensity={2.8}
          roughness={0.1}
        />
      </mesh>

      {/* ============================================================ */}
      {/* 3. ACTIVE MICRO-BUBBLES FORMING INSIDE THE CHEMICAL LIQUID */}
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

      {/* ============================================================ */}
      {/* 4. SLOWLY EVAPORATING CHEMICAL VAPOR PUFFS (Emerging upward) */}
      {/* ============================================================ */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh
          key={`vapor-${i}`}
          ref={(el) => {
            vaporPuffs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.010, 14, 14]} />
          <meshStandardMaterial
            color="#A7F3D0"
            emissive="#34D399"
            emissiveIntensity={2.2}
            transparent
            opacity={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Dynamic Emerald/Mint Reaction Glow */}
      <pointLight color="#10B981" intensity={hovered ? 3.6 : 2.5} distance={0.65} />
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
