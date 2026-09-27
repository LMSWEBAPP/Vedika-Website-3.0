'use client';

import React, { useRef, useMemo } from 'react';
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
      {/* 1. OUTER HYPERCUBE (24K Polished Gold Wireframe) */}
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
                color="#F59E0B"
                emissive="#D97706"
                emissiveIntensity={0.65}
                metalness={0.92}
                roughness={0.15}
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
                color="#F59E0B"
                emissive="#D97706"
                emissiveIntensity={0.65}
                metalness={0.92}
                roughness={0.15}
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
                color="#F59E0B"
                emissive="#D97706"
                emissiveIntensity={0.65}
                metalness={0.92}
                roughness={0.15}
              />
            </mesh>
          ))
        )}

        {/* 8 Outer Vertex Jewels */}
        {signs.map((sx, i) =>
          signs.map((sy, j) =>
            signs.map((sz, k) => (
              <mesh
                key={`ov-${i}-${j}-${k}`}
                position={[sx * Rout, sy * Rout, sz * Rout]}
              >
                <sphereGeometry args={[0.0075, 12, 12]} />
                <meshStandardMaterial
                  color="#FCD34D"
                  emissive="#F59E0B"
                  emissiveIntensity={1.4}
                  metalness={0.95}
                  roughness={0.1}
                />
              </mesh>
            ))
          )
        )}

        {/* 8 Diagonal 4D Dimension Vectors bridging outer to inner frame */}
        {diagonalStruts.map((s, idx) => (
          <mesh key={`diag-${idx}`} position={s.position} rotation={s.rotation}>
            <cylinderGeometry args={[0.0028, 0.0028, s.length, 8]} />
            <meshStandardMaterial
              color="#FBBF24"
              emissive="#D97706"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        ))}

        {/* 2. INNER CORE CUBE (Luminous Golden Hyper-Core) */}
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
                  color="#FDE68A"
                  emissive="#F59E0B"
                  emissiveIntensity={1.2}
                  metalness={0.85}
                  roughness={0.12}
                />
              </mesh>
            ))
          )}
          {signs.map((sx, i) =>
            signs.map((sz, j) => (
              <mesh key={`iy-${i}-${j}`} position={[sx * Rin, 0, sz * Rin]}>
                <cylinderGeometry args={[0.0032, 0.0032, Rin * 2, 8]} />
                <meshStandardMaterial
                  color="#FDE68A"
                  emissive="#F59E0B"
                  emissiveIntensity={1.2}
                  metalness={0.85}
                  roughness={0.12}
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
                  color="#FDE68A"
                  emissive="#F59E0B"
                  emissiveIntensity={1.2}
                  metalness={0.85}
                  roughness={0.12}
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
                    emissive="#FCD34D"
                    emissiveIntensity={2.0}
                  />
                </mesh>
              ))
            )
          )}

          {/* 3. CENTRAL SINGULARITY GEM (Glowing Diamond Icosahedron) */}
          <mesh ref={gemRef}>
            <icosahedronGeometry args={[0.016, 0]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#F59E0B"
              emissiveIntensity={2.5}
              metalness={0.8}
              roughness={0.08}
            />
          </mesh>
        </group>
      </group>

      {/* 4. CELESTIAL ASTROLABE RINGS (4D Mathematical Coordinates) */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[0.116, 0.0035, 16, 48]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Cardinal Coordinate Markers */}
        <mesh position={[0.116, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FCD34D" emissiveIntensity={2.0} />
        </mesh>
        <mesh position={[-0.116, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FCD34D" emissiveIntensity={2.0} />
        </mesh>
      </group>

      <group ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[0.116, 0.0028, 16, 48]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0.116, 0]}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#F59E0B" emissiveIntensity={2.0} />
        </mesh>
      </group>

      <pointLight color="#F59E0B" intensity={hovered ? 3.4 : 2.4} distance={0.65} />
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
      {/* 1. Bold Solid Nucleus (Multi-particle cluster) */}
      <group>
        {/* Core Proton 1 */}
        <mesh position={[0.015, 0.012, 0.010]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial
            color="#0891B2"
            emissive="#0284C7"
            emissiveIntensity={1.2}
            roughness={0.15}
          />
        </mesh>
        {/* Core Proton 2 */}
        <mesh position={[-0.015, -0.010, 0.012]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0369A1"
            emissiveIntensity={1.0}
            roughness={0.15}
          />
        </mesh>
        {/* Core Neutron 1 */}
        <mesh position={[0.012, -0.015, -0.010]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={1.5}
            roughness={0.15}
          />
        </mesh>
        {/* Core Neutron 2 */}
        <mesh position={[-0.010, 0.015, -0.012]}>
          <sphereGeometry args={[0.024, 16, 16]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#06B6D4"
            emissiveIntensity={1.8}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* 2. Ring 1 */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#0891B2"
            emissive="#06B6D4"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={e1Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#22D3EE"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* 3. Ring 2 */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#0891B2"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={e2Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#38BDF8"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      {/* 4. Ring 3 */}
      <group ref={ring3Ref} rotation={[0, -Math.PI / 3, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[0.11, 0.007, 16, 48]} />
          <meshStandardMaterial
            color="#0E7490"
            emissive="#06B6D4"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={e3Ref}>
          <sphereGeometry args={[0.020, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#22D3EE"
            emissiveIntensity={2.5}
          />
        </mesh>
      </group>

      <pointLight color="#06B6D4" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
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

        {/* Dense Glowing Chemical Liquid Core inside bulb */}
        <mesh position={[0, -0.034, 0]}>
          <sphereGeometry args={[0.054, 24, 24]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#BE123C"
            emissiveIntensity={2.2}
            roughness={0.2}
          />
        </mesh>

        {/* Liquid Meniscus Cap */}
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.042, 24]} />
          <meshStandardMaterial color="#FDA4AF" emissive="#F43F5E" emissiveIntensity={1.8} />
        </mesh>

        {/* Cylindrical Flask Neck */}
        <mesh position={[0, 0.042, 0]}>
          <cylinderGeometry args={[0.020, 0.022, 0.065, 24]} />
          <meshStandardMaterial
            color="#BE123C"
            emissive="#881337"
            emissiveIntensity={0.6}
            metalness={0.2}
            roughness={0.12}
            transparent
            opacity={0.50}
          />
        </mesh>

        {/* Flanged Frosted Glass Lip Rim */}
        <mesh position={[0, 0.074, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.020, 0.005, 16, 24]} />
          <meshStandardMaterial
            color="#FB7185"
            emissive="#E11D48"
            emissiveIntensity={1.6}
            roughness={0.1}
          />
        </mesh>

        {/* Crystal Ground Stopper */}
        <mesh position={[0, 0.086, 0]}>
          <coneGeometry args={[0.014, 0.022, 16]} />
          <meshStandardMaterial
            color="#FDA4AF"
            emissive="#F43F5E"
            emissiveIntensity={1.5}
            metalness={0.3}
            roughness={0.1}
          />
        </mesh>

        {/* Active Effervescent Reaction Micro-Bubbles */}
        <mesh ref={b1}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.5} />
        </mesh>
        <mesh ref={b2}>
          <sphereGeometry args={[0.007, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.5} />
        </mesh>
        <mesh ref={b3}>
          <sphereGeometry args={[0.006, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.5} />
        </mesh>
        <mesh ref={b4}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.5} />
        </mesh>
        <mesh ref={b5}>
          <sphereGeometry args={[0.005, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* 2. FLOATING 3D BENZENE MOLECULAR LATTICE (C6H6) */}
      <group ref={benzeneRef} position={[0, 0.020, 0]}>
        {/* Carbon Atoms (6 Ruby Spheres) */}
        {benzeneNodes.carbons.map((pos, idx) => (
          <mesh key={`c-${idx}`} position={pos}>
            <sphereGeometry args={[0.013, 16, 16]} />
            <meshStandardMaterial
              color="#BE123C"
              emissive="#9F1239"
              emissiveIntensity={1.6}
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
              emissive="#FDA4AF"
              emissiveIntensity={1.4}
            />
          </mesh>
        ))}

        {/* Carbon-Carbon Covalent Bond Cylinders */}
        {benzeneNodes.bonds.map((b, idx) => (
          <mesh key={`cc-bond-${idx}`} position={b.pos} rotation={b.rot}>
            <cylinderGeometry args={[0.0035, 0.0035, b.len, 8]} />
            <meshStandardMaterial
              color="#E11D48"
              emissive="#9F1239"
              emissiveIntensity={0.9}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* Carbon-Hydrogen Radial Bond Cylinders */}
        {benzeneNodes.chBonds.map((b, idx) => (
          <mesh key={`ch-bond-${idx}`} position={b.pos} rotation={b.rot}>
            <cylinderGeometry args={[0.0025, 0.0025, b.len, 8]} />
            <meshStandardMaterial
              color="#FDA4AF"
              emissive="#F43F5E"
              emissiveIntensity={0.8}
              metalness={0.7}
            />
          </mesh>
        ))}
      </group>

      {/* 3. GYROSCOPIC VALENCE ORBITALS (Quantum Atomic Clouds) */}
      <group ref={orbitalRef}>
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 6]}>
          <torusGeometry args={[0.116, 0.0030, 16, 48]} />
          <meshStandardMaterial
            color="#FB7185"
            emissive="#E11D48"
            emissiveIntensity={1.0}
          />
        </mesh>
        <mesh position={[0.116, 0, 0]}>
          <sphereGeometry args={[0.010, 12, 12]} />
          <meshStandardMaterial color="#06B6D4" emissive="#22D3EE" emissiveIntensity={2.5} />
        </mesh>

        <mesh rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[0.116, 0.0030, 16, 48]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#BE123C"
            emissiveIntensity={1.0}
          />
        </mesh>
        <mesh position={[-0.116, 0, 0]}>
          <sphereGeometry args={[0.010, 12, 12]} />
          <meshStandardMaterial color="#F59E0B" emissive="#FCD34D" emissiveIntensity={2.5} />
        </mesh>
      </group>

      <pointLight color="#E11D48" intensity={hovered ? 3.2 : 2.4} distance={0.65} />
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
// 5. COMPUTER LAB 3D: AUTHENTIC 3D PYTHON LOGO
// Interlocking dimensional Python Blue and Python Gold snake bodies,
// rounded snout heads, pupil eye nodes, and orbiting cyber data ring!
// ============================================================================
interface PythonHalfProps {
  color: string;
  emissive: string;
  eyeColor: string;
  eyeEmissive: string;
  rotationZ: number;
}

function PythonSnakeHalf({
  color,
  emissive,
  eyeColor,
  eyeEmissive,
  rotationZ,
}: PythonHalfProps) {
  // Proportions scaled to fit comfortably within the satellite sphere
  const depth = 0.028;

  return (
    <group rotation={[0, 0, rotationZ]}>
      {/* 1. Horizontal Head Section */}
      <mesh position={[0.015, 0.052, 0]}>
        <boxGeometry args={[0.060, 0.026, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* Rounded Snout Cap (Head Front at Right) */}
      <mesh position={[0.045, 0.052, 0]}>
        <cylinderGeometry args={[0.013, 0.013, depth, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* 2. Top-Left Shoulder */}
      <mesh position={[-0.038, 0.052, 0]}>
        <boxGeometry args={[0.030, 0.026, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[-0.038, 0.052, 0]}>
        <cylinderGeometry args={[0.013, 0.013, depth, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* 3. Left Vertical Body Trunk */}
      <mesh position={[-0.038, 0.016, 0]}>
        <boxGeometry args={[0.026, 0.046, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* 4. Bottom-Left Tail Turn Corner */}
      <mesh position={[-0.038, -0.014, 0]}>
        <boxGeometry args={[0.026, 0.020, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[-0.038, -0.014, 0]}>
        <cylinderGeometry args={[0.010, 0.010, depth, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* 5. Horizontal Tail Hook (Tucks into center cavity) */}
      <mesh position={[-0.015, -0.014, 0]}>
        <boxGeometry args={[0.030, 0.020, depth]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>
      {/* Rounded Tail Tip */}
      <mesh position={[0.000, -0.014, 0]}>
        <cylinderGeometry args={[0.010, 0.010, depth, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.35}
          roughness={0.25}
        />
      </mesh>

      {/* 6. Python Eye Dots (Front and Back for 3D visibility) */}
      <mesh position={[0.032, 0.056, depth / 2 + 0.002]}>
        <sphereGeometry args={[0.0048, 12, 12]} />
        <meshStandardMaterial
          color={eyeColor}
          emissive={eyeEmissive}
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh position={[0.032, 0.056, -(depth / 2 + 0.002)]}>
        <sphereGeometry args={[0.0048, 12, 12]} />
        <meshStandardMaterial
          color={eyeColor}
          emissive={eyeEmissive}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

export function ComputerLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);

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
      {/* Central 3D Python Logo: Two Interlocking 180-degree symmetrical halves */}
      <group>
        {/* Top Half: Python Blue Snake */}
        <PythonSnakeHalf
          color="#366994"
          emissive="#1E4870"
          eyeColor="#FFFFFF"
          eyeEmissive="#93C5FD"
          rotationZ={0}
        />

        {/* Bottom Half: Python Yellow Snake (Exact 180° rotation around Z) */}
        <PythonSnakeHalf
          color="#FFD43B"
          emissive="#D49B00"
          eyeColor="#1E3A8A"
          eyeEmissive="#0F172A"
          rotationZ={Math.PI}
        />
      </group>

      {/* Orbiting Holographic Cyber Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.116, 0.0035, 16, 48]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.116, 0, 0]}>
          <sphereGeometry args={[0.009, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.116, 0, 0]}>
          <sphereGeometry args={[0.007, 12, 12]} />
          <meshBasicMaterial color="#FFD43B" />
        </mesh>
      </group>

      <pointLight color="#38BDF8" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}
