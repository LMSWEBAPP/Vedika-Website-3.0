'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. MATH LAB 3D: Bold Golden Greek Pi (π) Symbol & Rotating Compass Core
// High-contrast 24K gold with deep bronze shadows, clear on pure white!
// ============================================================================
export function MathLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);
  const polyRef = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.4 : 1.2;

    groupRef.current.position.y = Math.sin(t * 2.2) * 0.008;

    if (coreRef.current) {
      coreRef.current.rotation.y = Math.sin(t * 1.2) * 0.25;
      coreRef.current.rotation.x = Math.cos(t * 1.0) * 0.12;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed * 0.8;
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 1.5) * 0.2;
    }
    if (polyRef.current) {
      polyRef.current.rotation.x += delta * speed * 1.2;
      polyRef.current.rotation.y += delta * speed * 1.5;
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.08 : 0.96}>
      {/* Central Bold 3D Golden Greek Pi (π) */}
      <group ref={coreRef}>
        {/* Top Horizontal Arch of Pi */}
        <mesh position={[0, 0.038, 0]}>
          <boxGeometry args={[0.096, 0.016, 0.016]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.65}
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>
        {/* Beveled Left & Right End Caps */}
        <mesh position={[-0.048, 0.038, 0]}>
          <boxGeometry args={[0.008, 0.020, 0.018]} />
          <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.048, 0.038, 0]}>
          <boxGeometry args={[0.008, 0.020, 0.018]} />
          <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Left Column of Pi */}
        <mesh position={[-0.024, -0.012, 0]}>
          <boxGeometry args={[0.015, 0.082, 0.015]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.65}
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>
        {/* Left Base Foot */}
        <mesh position={[-0.024, -0.052, 0]}>
          <boxGeometry args={[0.024, 0.008, 0.018]} />
          <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Right Column of Pi */}
        <mesh position={[0.024, -0.006, 0]}>
          <boxGeometry args={[0.015, 0.070, 0.015]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.65}
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>
        {/* Right Lower Hook of Pi */}
        <mesh position={[0.034, -0.046, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.014, 0.028, 0.015]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#B45309"
            emissiveIntensity={0.65}
            metalness={0.88}
            roughness={0.18}
          />
        </mesh>

        {/* Floating Sacred Octahedron Gem at Heart of Pi */}
        <mesh ref={polyRef} position={[0, -0.005, 0.012]}>
          <octahedronGeometry args={[0.020, 0]} />
          <meshStandardMaterial
            color="#FCD34D"
            emissive="#F59E0B"
            emissiveIntensity={1.4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Orbiting Celestial Golden Math Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.115, 0.006, 16, 48]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#D97706"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
        {/* Cardinal Jewels */}
        <mesh position={[0.115, 0, 0]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FCD34D" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[-0.115, 0, 0]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FCD34D" emissiveIntensity={1.5} />
        </mesh>
      </group>

      <pointLight color="#F59E0B" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 2. PHYSICS LAB 3D: Radiant Quantum Atom with Orbiting Electrons
// High-contrast Electric Teal / Deep Cyan with thick luminous rings!
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

      {/* 2. Ring 1: Thick Solid Torus */}
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
// 3. CHEMISTRY LAB 3D: Solid Crimson/Ruby Flask + Bubbling Potion & Molecule
// Vibrant, high-contrast ruby colors that pop clearly on white!
// ============================================================================
export function ChemistryLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const bubble1Ref = useRef<THREE.Mesh | null>(null);
  const bubble2Ref = useRef<THREE.Mesh | null>(null);
  const bubble3Ref = useRef<THREE.Mesh | null>(null);
  const moleculeRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 2.0 + 2) * 0.010;
    groupRef.current.rotation.y = Math.sin(t * 1.4) * 0.22;

    if (bubble1Ref.current) {
      bubble1Ref.current.position.y = -0.04 + ((t * 0.10) % 0.11);
      bubble1Ref.current.position.x = Math.sin(t * 4.5) * 0.018;
    }
    if (bubble2Ref.current) {
      bubble2Ref.current.position.y = -0.05 + (((t + 0.4) * 0.09) % 0.12);
      bubble2Ref.current.position.x = Math.cos(t * 4.0) * 0.016;
    }
    if (bubble3Ref.current) {
      bubble3Ref.current.position.y = -0.03 + (((t + 0.8) * 0.11) % 0.11);
      bubble3Ref.current.position.z = Math.sin(t * 3.5) * 0.015;
    }

    if (moleculeRef.current) {
      moleculeRef.current.rotation.y += delta * 1.8;
      moleculeRef.current.rotation.z += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* 1. Glass Flask Body with Dark Ruby Outline Rim (Clear against white!) */}
      <mesh position={[0, -0.016, 0]}>
        <cylinderGeometry args={[0.038, 0.105, 0.125, 24]} />
        <meshStandardMaterial
          color="#BE123C"
          emissive="#881337"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 2. Glass Flask Neck */}
      <mesh position={[0, 0.062, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.055, 24]} />
        <meshStandardMaterial
          color="#BE123C"
          emissive="#881337"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.2}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 3. Glowing Lip Collar Rim */}
      <mesh position={[0, 0.090, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.032, 0.007, 16, 24]} />
        <meshStandardMaterial
          color="#F43F5E"
          emissive="#E11D48"
          emissiveIntensity={1.5}
          roughness={0.1}
        />
      </mesh>

      {/* 4. Deep Glowing Crimson Liquid inside */}
      <mesh position={[0, -0.040, 0]}>
        <cylinderGeometry args={[0.034, 0.098, 0.075, 24]} />
        <meshStandardMaterial
          color="#E11D48"
          emissive="#BE123C"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>

      {/* 5. Liquid Meniscus Top Cap */}
      <mesh position={[0, -0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.038, 24]} />
        <meshStandardMaterial color="#FDA4AF" emissive="#F43F5E" emissiveIntensity={1.5} />
      </mesh>

      {/* 6. Effervescent Bubbles */}
      <mesh ref={bubble1Ref} position={[0, -0.03, 0]}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.0} />
      </mesh>
      <mesh ref={bubble2Ref} position={[0.016, -0.04, 0]}>
        <sphereGeometry args={[0.009, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.0} />
      </mesh>
      <mesh ref={bubble3Ref} position={[-0.014, -0.03, 0]}>
        <sphereGeometry args={[0.010, 12, 12]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={2.0} />
      </mesh>

      {/* 7. Hovering 3D Molecule above Flask */}
      <group ref={moleculeRef} position={[0, 0.138, 0]}>
        {/* Central Red Atom */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial
            color="#E11D48"
            emissive="#BE123C"
            emissiveIntensity={1.5}
            roughness={0.15}
          />
        </mesh>
        {/* Satellite Atom 1 (White) */}
        <mesh position={[0.040, 0.024, 0]}>
          <sphereGeometry args={[0.014, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FDA4AF" emissiveIntensity={1.0} />
        </mesh>
        {/* Satellite Atom 2 (Blue) */}
        <mesh position={[-0.040, 0.020, 0]}>
          <sphereGeometry args={[0.014, 16, 16]} />
          <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={1.5} />
        </mesh>
        {/* Bonds */}
        <mesh position={[0.020, 0.012, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.004, 0.004, 0.046, 8]} />
          <meshStandardMaterial color="#B45309" metalness={0.8} />
        </mesh>
        <mesh position={[-0.020, 0.010, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <cylinderGeometry args={[0.004, 0.004, 0.046, 8]} />
          <meshStandardMaterial color="#B45309" metalness={0.8} />
        </mesh>
      </group>

      <pointLight color="#E11D48" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 4. BIOLOGY LAB 3D: Bold Saturated DNA Double Helix
// Rich Violet & Magenta nucleotides with thick rungs, high contrast!
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
// 5. COMPUTER LAB 3D: Front-Facing Cyber Microchip + Gold Pins & Circuit Laser
// Bold Sapphire-Navy silicon die with glowing cyan traces and 24K gold pins!
// ============================================================================
export function ComputerLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 2.0 + 4) * 0.010;

    // Face forward towards camera with gentle 3D isometric wobble
    groupRef.current.rotation.y = Math.sin(t * 1.3) * 0.18;
    groupRef.current.rotation.x = Math.cos(t * 1.1) * 0.10 + 0.12;

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (hovered ? 2.4 : 1.2);
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.05 : 0.94}>
      {/* 1. Deep Sapphire-Navy Base Substrate */}
      <mesh>
        <boxGeometry args={[0.15, 0.15, 0.024]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive="#1E3A8A"
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Elevated Royal Sky-Blue Metal Heat Spreader */}
      <mesh position={[0, 0, 0.013]}>
        <boxGeometry args={[0.11, 0.11, 0.008]} />
        <meshStandardMaterial
          color="#1D4ED8"
          emissive="#1E40AF"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* 3. Glowing Neon Silicon Core */}
      <mesh position={[0, 0, 0.018]}>
        <boxGeometry args={[0.060, 0.060, 0.006]} />
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#2563EB"
          emissiveIntensity={hovered ? 3.2 : 2.5}
        />
      </mesh>

      {/* 4. Starlight Core Accent */}
      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[0.026, 0.026, 0.002]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* 5. 16 Gleaming 24K Gold Interface Pins */}
      {[-0.045, -0.015, 0.015, 0.045].map((offset, i) => (
        <React.Fragment key={i}>
          {/* North */}
          <mesh position={[offset, 0.083, 0]}>
            <boxGeometry args={[0.016, 0.018, 0.008]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.8}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
          {/* South */}
          <mesh position={[offset, -0.083, 0]}>
            <boxGeometry args={[0.016, 0.018, 0.008]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.8}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
          {/* East */}
          <mesh position={[0.083, offset, 0]}>
            <boxGeometry args={[0.018, 0.016, 0.008]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.8}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
          {/* West */}
          <mesh position={[-0.083, offset, 0]}>
            <boxGeometry args={[0.018, 0.016, 0.008]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.8}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        </React.Fragment>
      ))}

      {/* 6. Orbiting Holographic Data Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[0.13, 0.004, 16, 48]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={1.2}
          />
        </mesh>
        <mesh position={[0.13, 0, 0]}>
          <sphereGeometry args={[0.014, 12, 12]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      <pointLight color="#2563EB" intensity={hovered ? 3.0 : 2.2} distance={0.65} />
    </group>
  );
}
