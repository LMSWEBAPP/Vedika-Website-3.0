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
  const ring1Ref = useRef<THREE.Group | null>(null);
  const ring2Ref = useRef<THREE.Group | null>(null);

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

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * speed * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * speed * 0.7;
      ring2Ref.current.rotation.y += delta * speed * 0.5;
    }
  });

  const signs = [-1, 1];

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* 1. OUTER HYPERCUBE (High-Contrast Metallic Cobalt & Royal Indigo) */}
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

      {/* 4. CELESTIAL ASTROLABE RINGS (High-Contrast Sapphire & Cyan) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[0.116, 0.0035, 16, 48]} />
          <meshStandardMaterial
            color="#1D4ED8"
            emissive="#3B82F6"
            emissiveIntensity={0.9}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Cardinal Coordinate Markers */}
        <mesh position={[0.116, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#38BDF8" emissiveIntensity={2.2} />
        </mesh>
        <mesh position={[-0.116, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#38BDF8" emissiveIntensity={2.2} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[0.116, 0.0028, 16, 48]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#22D3EE"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 0.116, 0]}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F0FF" emissiveIntensity={2.2} />
        </mesh>
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 2. PHYSICS LAB 3D: RADIANT QUANTUM ATOM WITH ORBITING ELECTRONS
// High-contrast Electric Teal / Deep Cyan with luminous intersecting rings!
// ============================================================================
export function PhysicsLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const ring1Ref = useRef<THREE.Group | null>(null);
  const ring2Ref = useRef<THREE.Group | null>(null);
  const ring3Ref = useRef<THREE.Group | null>(null);
  const e1Ref = useRef<THREE.Mesh | null>(null);
  const e2Ref = useRef<THREE.Mesh | null>(null);
  const e3Ref = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 3.0 : 1.6;

    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * speed * 0.9;
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * speed * 1.0;
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * speed * 1.1;

    const R = 0.11;
    if (e1Ref.current) {
      e1Ref.current.position.set(Math.cos(t * speed * 2) * R, Math.sin(t * speed * 2) * R, 0);
    }
    if (e2Ref.current) {
      e2Ref.current.position.set(0, Math.cos(t * speed * 2.3) * R, Math.sin(t * speed * 2.3) * R);
    }
    if (e3Ref.current) {
      e3Ref.current.position.set(Math.sin(t * speed * 1.8) * R, 0, Math.cos(t * speed * 1.8) * R);
    }

    groupRef.current.position.y = Math.sin(t * 2.1 + 1) * 0.010;
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* 1. Bold Solid Nucleus (High-Contrast Fiery Ruby & Solar Amber Core) */}
      <group>
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
      </group>

      {/* 2. Ring 1 (24K Polished Gold) */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={e1Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FEF08A"
            emissiveIntensity={3.2}
          />
        </mesh>
      </group>

      {/* 3. Ring 2 (Radiant Solar Copper) */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#F97316"
            emissive="#EA580C"
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={e2Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FDE047"
            emissiveIntensity={3.2}
          />
        </mesh>
      </group>

      {/* 4. Ring 3 (Deep Gold Bronze) */}
      <group ref={ring3Ref} rotation={[0, -Math.PI / 3, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.9}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        <mesh ref={e3Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FEF08A"
            emissiveIntensity={3.2}
          />
        </mesh>
      </group>

      <pointLight color="#F59E0B" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 3. CHEMISTRY LAB 3D: STANDOUT VOLUMETRIC SYNTHESIS REACTOR & BENZENE LATTICE
// Crystalline spherical boiling flask with undulating ruby bioluminescence,
// rising effervescent bubbles, floating 3D Benzene ring & electron orbitals!
// ============================================================================
export function ChemistryLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const benzeneRef = useRef<THREE.Group | null>(null);
  const orbitalRef = useRef<THREE.Group | null>(null);

  // 5 micro-bubbles
  const b1 = useRef<THREE.Mesh | null>(null);
  const b2 = useRef<THREE.Mesh | null>(null);
  const b3 = useRef<THREE.Mesh | null>(null);
  const b4 = useRef<THREE.Mesh | null>(null);
  const b5 = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.2;

    // Levitation
    groupRef.current.position.y = Math.sin(t * 2.0 + 2) * 0.010;
    groupRef.current.rotation.y = Math.sin(t * 1.3) * 0.20;

    // Rising animated effervescent reaction bubbles
    if (b1.current) {
      b1.current.position.y = -0.065 + ((t * 0.09) % 0.065);
      b1.current.position.x = 0.010 + Math.sin(t * 3.5) * 0.008;
    }
    if (b2.current) {
      b2.current.position.y = -0.065 + (((t + 0.3) * 0.11) % 0.065);
      b2.current.position.x = -0.014 + Math.cos(t * 4.0) * 0.007;
    }
    if (b3.current) {
      b3.current.position.y = -0.065 + (((t + 0.6) * 0.08) % 0.065);
      b3.current.position.z = 0.012 + Math.sin(t * 3.8) * 0.006;
    }
    if (b4.current) {
      b4.current.position.y = -0.065 + (((t + 0.9) * 0.10) % 0.065);
      b4.current.position.z = -0.010 + Math.cos(t * 3.2) * 0.008;
    }
    if (b5.current) {
      b5.current.position.y = -0.065 + (((t + 1.2) * 0.12) % 0.065);
      b5.current.position.x = Math.sin(t * 4.2) * 0.009;
    }

    // Orbiting 3D Benzene molecular lattice
    if (benzeneRef.current) {
      benzeneRef.current.rotation.z += delta * speed * 0.9;
      benzeneRef.current.rotation.x = Math.sin(t * 1.2) * 0.25 + 0.35;
    }

    // Valence electron orbitals
    if (orbitalRef.current) {
      orbitalRef.current.rotation.y += delta * speed * 1.4;
      orbitalRef.current.rotation.z += delta * speed * 0.8;
    }
  });

  // Precompute 6 Carbon and 6 Hydrogen positions for 3D Benzene ring
  const benzeneNodes = useMemo(() => {
    const Rc = 0.092; // Carbon radius
    const Rh = 0.120; // Hydrogen radius
    const carbons: [number, number, number][] = [];
    const hydrogens: [number, number, number][] = [];
    const bonds: { pos: [number, number, number]; rot: [number, number, number]; len: number }[] = [];
    const chBonds: { pos: [number, number, number]; rot: [number, number, number]; len: number }[] = [];
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const nextAngle = ((i + 1) * Math.PI) / 3;

      const cx = Math.cos(angle) * Rc;
      const cy = Math.sin(angle) * Rc;
      carbons.push([cx, cy, 0]);

      const hx = Math.cos(angle) * Rh;
      const hy = Math.sin(angle) * Rh;
      hydrogens.push([hx, hy, 0]);

      // Carbon-Carbon perimeter bond
      const ncx = Math.cos(nextAngle) * Rc;
      const ncy = Math.sin(nextAngle) * Rc;
      const p1 = new THREE.Vector3(cx, cy, 0);
      const p2 = new THREE.Vector3(ncx, ncy, 0);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(p2, p1);
      const len = dir.length();
      dir.normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
      const e = new THREE.Euler().setFromQuaternion(q);
      bonds.push({ pos: [mid.x, mid.y, mid.z], rot: [e.x, e.y, e.z], len });

      // Carbon-Hydrogen radial bond
      const hp = new THREE.Vector3(hx, hy, 0);
      const chMid = new THREE.Vector3().addVectors(p1, hp).multiplyScalar(0.5);
      const chDir = new THREE.Vector3().subVectors(hp, p1);
      const chLen = chDir.length();
      chDir.normalize();
      const chQ = new THREE.Quaternion().setFromUnitVectors(up, chDir);
      const chE = new THREE.Euler().setFromQuaternion(chQ);
      chBonds.push({ pos: [chMid.x, chMid.y, chMid.z], rot: [chE.x, chE.y, chE.z], len: chLen });
    }

    return { carbons, hydrogens, bonds, chBonds };
  }, []);

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* 1. CRYSTALLINE FLORENCE BOILING FLASK (Semi-transparent Glass with Ruby Sheen) */}
      <group>
        {/* Spherical Boiling Bulb */}
        <mesh position={[0, -0.025, 0]}>
          <sphereGeometry args={[0.068, 32, 32]} />
          <meshStandardMaterial
            color="#BE123C"
            emissive="#881337"
            emissiveIntensity={0.65}
            metalness={0.2}
            roughness={0.12}
            transparent
            opacity={0.42}
          />
        </mesh>

        {/* Dense Glowing Chemical Liquid Core inside bulb (Bioluminescent Emerald) */}
        <mesh position={[0, -0.034, 0]}>
          <sphereGeometry args={[0.054, 24, 24]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={2.6}
            roughness={0.15}
          />
        </mesh>

        {/* Liquid Meniscus Cap (Radiant Mint Aqua) */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.042, 24]} />
          <meshStandardMaterial color="#6EE7B7" emissive="#34D399" emissiveIntensity={2.2} />
        </mesh>

        {/* Cylindrical Flask Neck (Translucent Ice Cyan Glass) */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.020, 0.022, 0.065, 24]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={0.6}
            metalness={0.2}
            roughness={0.12}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Flanged Frosted Glass Lip Rim */}
        <mesh position={[0, 0.074, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.020, 0.005, 16, 24]} />
          <meshStandardMaterial
            color="#2DD4BF"
            emissive="#0D9488"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>

        {/* Crystal Ground Stopper */}
        <mesh position={[0, 0.086, 0]}>
          <coneGeometry args={[0.014, 0.022, 16]} />
          <meshStandardMaterial
            color="#A7F3D0"
            emissive="#34D399"
            emissiveIntensity={1.8}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>

        {/* Active Effervescent Reaction Micro-Bubbles (Phosphorescent Cyan-White) */}
        <mesh ref={b1}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#67E8F9" emissiveIntensity={3.0} />
        </mesh>
        <mesh ref={b2}>
          <sphereGeometry args={[0.007, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#67E8F9" emissiveIntensity={3.0} />
        </mesh>
        <mesh ref={b3}>
          <sphereGeometry args={[0.006, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#67E8F9" emissiveIntensity={3.0} />
        </mesh>
        <mesh ref={b4}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#67E8F9" emissiveIntensity={3.0} />
        </mesh>
        <mesh ref={b5}>
          <sphereGeometry args={[0.005, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#67E8F9" emissiveIntensity={3.0} />
        </mesh>
      </group>

      {/* 2. FLOATING 3D BENZENE MOLECULAR LATTICE (Electric Cyan Turquoise & Pearl White) */}
      <group ref={benzeneRef} position={[0, 0.020, 0]}>
        {/* Carbon Atoms (6 Electric Turquoise Spheres) */}
        {benzeneNodes.carbons.map((pos, idx) => (
          <mesh key={`c-${idx}`} position={pos}>
            <sphereGeometry args={[0.013, 16, 16]} />
            <meshStandardMaterial
              color="#06B6D4"
              emissive="#0891B2"
              emissiveIntensity={2.0}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* Hydrogen Satellite Atoms (6 Pearl White Spheres) */}
        {benzeneNodes.hydrogens.map((pos, idx) => (
          <mesh key={`h-${idx}`} position={pos}>
            <sphereGeometry args={[0.008, 12, 12]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#E0F2FE"
              emissiveIntensity={2.0}
            />
          </mesh>
        ))}

        {/* Carbon-Carbon Covalent Bond Cylinders */}
        {benzeneNodes.bonds.map((b, idx) => (
          <mesh key={`cc-bond-${idx}`} position={b.pos} rotation={b.rot}>
            <cylinderGeometry args={[0.0035, 0.0035, b.len, 8]} />
            <meshStandardMaterial
              color="#14B8A6"
              emissive="#0D9488"
              emissiveIntensity={1.0}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* Carbon-Hydrogen Radial Bond Cylinders */}
        {benzeneNodes.chBonds.map((b, idx) => (
          <mesh key={`ch-bond-${idx}`} position={b.pos} rotation={b.rot}>
            <cylinderGeometry args={[0.0025, 0.0025, b.len, 8]} />
            <meshStandardMaterial
              color="#67E8F9"
              emissive="#06B6D4"
              emissiveIntensity={1.0}
              metalness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* 3. GYROSCOPIC VALENCE ORBITALS (High-Contrast Emerald & Solar Gold) */}
      <group ref={orbitalRef}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[0.116, 0.0030, 16, 48]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#059669"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.116, 0, 0]}>
          <sphereGeometry args={[0.010, 12, 12]} />
          <meshStandardMaterial color="#00F0FF" emissive="#06B6D4" emissiveIntensity={2.5} />
        </mesh>

        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.116, 0.0030, 16, 48]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[-0.116, 0, 0]}>
          <sphereGeometry args={[0.010, 12, 12]} />
          <meshStandardMaterial color="#FCD34D" emissive="#F59E0B" emissiveIntensity={2.5} />
        </mesh>
      </group>

      <pointLight color="#10B981" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 4. BIOLOGY LAB 3D: BOLD SATURATED DNA DOUBLE HELIX
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
// 5. COMPUTER LAB 3D: AUTHENTIC OFFICIAL PYTHON 3D LOGO
// Uses the exact, official Python Software Foundation vector paths & gradients.
// Rendered on a gleaming 3D cyber acrylic disc with metallic bezel,
// dual-sided emblem, and orbiting holographic data ring!
// ============================================================================
const PYTHON_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="110px" height="110px" viewBox="0.21 -0.077 110 110"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="63.8159" y1="56.6829" x2="118.4934" y2="1.8225" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"><stop offset="0" style="stop-color:#387EB8"/><stop offset="1" style="stop-color:#366994"/></linearGradient><path fill="url(#SVGID_1_)" d="M55.023-0.077c-25.971,0-26.25,10.081-26.25,12.156c0,3.148,0,12.594,0,12.594h26.75v3.781 c0,0-27.852,0-37.375,0c-7.949,0-17.938,4.833-17.938,26.25c0,19.673,7.792,27.281,15.656,27.281c2.335,0,9.344,0,9.344,0 s0-9.765,0-13.125c0-5.491,2.721-15.656,15.406-15.656c15.91,0,19.971,0,26.531,0c3.902,0,14.906-1.696,14.906-14.406 c0-13.452,0-17.89,0-24.219C82.054,11.426,81.515-0.077,55.023-0.077z M40.273,8.392c2.662,0,4.813,2.15,4.813,4.813 c0,2.661-2.151,4.813-4.813,4.813s-4.813-2.151-4.813-4.813C35.46,10.542,37.611,8.392,40.273,8.392z"/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="97.0444" y1="21.6321" x2="155.6665" y2="-34.5308" gradientTransform="matrix(1 0 0 -1 -53.2974 66.4321)"><stop offset="0" style="stop-color:#FFE052"/><stop offset="1" style="stop-color:#FFC331"/></linearGradient><path fill="url(#SVGID_2_)" d="M55.397,109.923c25.959,0,26.282-10.271,26.282-12.156c0-3.148,0-12.594,0-12.594H54.897v-3.781 c0,0,28.032,0,37.375,0c8.009,0,17.938-4.954,17.938-26.25c0-23.322-10.538-27.281-15.656-27.281c-2.336,0-9.344,0-9.344,0 s0,10.216,0,13.125c0,5.491-2.631,15.656-15.406,15.656c-15.91,0-19.476,0-26.532,0c-3.892,0-14.906,1.896-14.906,14.406 c0,14.475,0,18.265,0,24.219C28.366,100.497,31.562,109.923,55.397,109.923z M70.148,101.454c-2.662,0-4.813-2.151-4.813-4.813 s2.15-4.813,4.813-4.813c2.661,0,4.813,2.151,4.813,4.813S72.809,101.454,70.148,101.454z"/></svg>`
)}`;

export function ComputerLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);
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

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.2;

    // Gentle 3D levitation and isometric view
    groupRef.current.position.y = Math.sin(t * 2.0 + 4) * 0.010;
    groupRef.current.rotation.y = Math.sin(t * 1.3) * 0.24;
    groupRef.current.rotation.x = Math.cos(t * 1.1) * 0.12 + 0.10;

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * speed * 1.0;
    }
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

        {/* Outer Dual-Tone Glowing Rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.096, 0.0045, 16, 48]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.4}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

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

      {/* Orbiting Holographic Cyber Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.118, 0.0035, 16, 48]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.118, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.118, 0, 0]}>
          <sphereGeometry args={[0.007, 12, 12]} />
          <meshBasicMaterial color="#FFD43B" />
        </mesh>
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}
