'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// ============================================================================
// 1. MATH LAB 3D: PROMINENT, BOLD 3D PI (π) IN HIGH-CONTRAST ROYAL COBALT &
// ELECTRIC CYAN WITH THICK 3D INFINITY (∞) LEMNISCATE & ASTROLABE GIMBAL RINGS
// Redesigned with commanding scale, chunky solid geometry, and maximum contrast:
// - Bold architectural 3D Pi (π) with prominent serif crown & sculpted J-hook
// - Thick luminous Electric Cyan & Aquamarine 3D Infinity (∞) ribbon foundation
// - Heavy-gauge Astrolabe Armillary Gimbal Rings with glowing graduation ticks
// - Prominent orbiting mathematical satellites: Bold Sigma (∑) & Delta (Δ)
// - Base-free, cleanly floating and levitating within the spherical particle cage!
// ============================================================================

class LemniscateCurve extends THREE.Curve<THREE.Vector3> {
  scale: number;
  yOffset: number;

  constructor(scale = 0.105, yOffset = -0.052) {
    super();
    this.scale = scale;
    this.yOffset = yOffset;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()): THREE.Vector3 {
    const theta = t * 2 * Math.PI;
    const sinT = Math.sin(theta);
    const cosT = Math.cos(theta);
    const denom = 1 + sinT * sinT;
    const x = (this.scale * cosT) / denom;
    const z = (this.scale * sinT * cosT * 1.35) / denom;
    const y = this.yOffset + Math.sin(theta * 2) * 0.010;
    return optionalTarget.set(x, y, z);
  }
}

export function MathLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const piRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const infinityRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Group | null>(null);
  const ring2Ref = useRef<THREE.Group | null>(null);
  const sigmaRef = useRef<THREE.Group | null>(null);
  const deltaRef = useRef<THREE.Group | null>(null);

  // Thick, prominent 3D Bernoulli Lemniscate Tube Geometry for Infinity (∞)
  const infinityGeometry = useMemo(() => {
    const curve = new LemniscateCurve(0.105, -0.052);
    return new THREE.TubeGeometry(curve, 64, 0.0075, 14, true);
  }, []);

  // 12 Degree Graduation Tick angles on the Astrolabe Ring
  const tickAngles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.0 : 1.1;

    // Harmonic levitation bobbing
    groupRef.current.position.y = Math.sin(t * 1.9) * 0.008;

    // Majestic slow rotation of the 3D Pi (π) centerpiece
    if (piRef.current) {
      piRef.current.rotation.y += delta * speed * 0.70;
      piRef.current.rotation.x = Math.sin(t * 1.1) * 0.08 + 0.05;
    }

    // Counter-rotating inner singularity jewel
    if (coreRef.current) {
      coreRef.current.rotation.y -= delta * speed * 1.4;
      coreRef.current.rotation.z += delta * speed * 0.9;
      const pulse = 1.0 + Math.sin(t * 2.8) * 0.10;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Counter-rotating 3D Infinity (∞) loop
    if (infinityRef.current) {
      infinityRef.current.rotation.y -= delta * speed * 0.45;
      const pulse = 1.0 + Math.sin(t * 2.5) * 0.05;
      infinityRef.current.scale.set(pulse, pulse, pulse);
    }

    // Coordinate Armillary Gimbal Rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * speed * 0.55;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * speed * 0.65;
    }

    // Orbiting Mathematical Satellite Glyphs
    const orbitSpeed = speed * 0.85;
    if (sigmaRef.current) {
      const angle = t * orbitSpeed;
      sigmaRef.current.position.x = Math.cos(angle) * 0.138;
      sigmaRef.current.position.z = Math.sin(angle) * 0.138;
      sigmaRef.current.position.y = 0.022 + Math.sin(t * 2.2) * 0.014;
      sigmaRef.current.rotation.y = -angle + Math.PI / 2;
    }
    if (deltaRef.current) {
      const angle = t * orbitSpeed + Math.PI;
      deltaRef.current.position.x = Math.cos(angle) * 0.138;
      deltaRef.current.position.z = Math.sin(angle) * 0.138;
      deltaRef.current.position.y = 0.022 + Math.cos(t * 2.2) * 0.014;
      deltaRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.25 : 1.15}>
      {/* ======================================================== */}
      {/* 1. SCULPTED 3D PI (π) SYMBOL (Bold, Thick, Prominent)    */}
      {/* High-contrast Royal Cobalt & Cyan with robust volume     */}
      {/* ======================================================== */}
      <group ref={piRef} position={[0, 0.010, 0]}>
        {/* Horizontal Roof Crossbar (Thick Architectural Beam) */}
        <mesh position={[0, 0.046, 0]}>
          <boxGeometry args={[0.114, 0.018, 0.020]} />
          <meshStandardMaterial
            color="#1E40AF"
            emissive="#2563EB"
            emissiveIntensity={2.8}
            transparent
            opacity={0.86}
            metalness={0.7}
            roughness={0.08}
          />
        </mesh>
        {/* Left Serif Crown Block (Vivid Electric Cyan) */}
        <mesh position={[-0.057, 0.040, 0]}>
          <boxGeometry args={[0.014, 0.024, 0.020]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0284C7"
            emissiveIntensity={3.6}
            transparent
            opacity={0.90}
            metalness={0.65}
            roughness={0.08}
          />
        </mesh>
        {/* Right Serif Crown Block (Vivid Electric Cyan) */}
        <mesh position={[0.057, 0.047, 0]}>
          <boxGeometry args={[0.014, 0.020, 0.020]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0284C7"
            emissiveIntensity={3.6}
            transparent
            opacity={0.90}
            metalness={0.65}
            roughness={0.08}
          />
        </mesh>

        {/* Left Straight Pillar Leg (Thick Solid Pillar) */}
        <mesh position={[-0.027, 0.002, 0]}>
          <boxGeometry args={[0.018, 0.076, 0.018]} />
          <meshStandardMaterial
            color="#1E40AF"
            emissive="#2563EB"
            emissiveIntensity={2.8}
            transparent
            opacity={0.86}
            metalness={0.7}
            roughness={0.08}
          />
        </mesh>
        {/* Left Grounded Foot Cap (Electric Cyan) */}
        <mesh position={[-0.027, -0.038, 0]}>
          <boxGeometry args={[0.026, 0.010, 0.022]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0284C7"
            emissiveIntensity={3.4}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>

        {/* Right Pillar Leg with Signature J-Curve Hook (Solid & Chunky) */}
        <mesh position={[0.027, 0.012, 0]}>
          <boxGeometry args={[0.018, 0.056, 0.018]} />
          <meshStandardMaterial
            color="#1E40AF"
            emissive="#2563EB"
            emissiveIntensity={2.8}
            metalness={0.9}
            roughness={0.12}
          />
        </mesh>
        <mesh position={[0.034, -0.022, 0]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.018, 0.026, 0.018]} />
          <meshStandardMaterial
            color="#1E40AF"
            emissive="#2563EB"
            emissiveIntensity={2.8}
            metalness={0.9}
            roughness={0.12}
          />
        </mesh>
        <mesh position={[0.046, -0.030, 0]} rotation={[0, 0, -1.1]}>
          <boxGeometry args={[0.016, 0.024, 0.018]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#0284C7"
            emissiveIntensity={3.4}
            metalness={0.85}
            roughness={0.12}
          />
        </mesh>
        <mesh position={[0.056, -0.024, 0]}>
          <sphereGeometry args={[0.009, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#00F5D4"
            emissiveIntensity={4.2}
          />
        </mesh>

        {/* Central Luminous Singularity Jewel in the Arch of π (Radiant Magenta) */}
        <mesh ref={coreRef} position={[0, 0.005, 0]}>
          <octahedronGeometry args={[0.022, 0]} />
          <meshStandardMaterial
            color="#D946EF"
            emissive="#C026D3"
            emissiveIntensity={3.8}
          />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. THICK 3D INFINITY (∞) MÖBIUS LEMNISCATE RIBBON        */}
      {/* Heavy-gauge glowing Electric Cyan & Aquamarine ribbon    */}
      {/* ======================================================== */}
      <mesh ref={infinityRef} geometry={infinityGeometry}>
        <meshStandardMaterial
          color="#00F5D4"
          emissive="#0284C7"
          emissiveIntensity={3.5}
          metalness={0.85}
          roughness={0.10}
        />
      </mesh>

      {/* ======================================================== */}
      {/* 3. COORDINATE ASTROLABE ARMILLARY GIMBAL RINGS           */}
      {/* Heavy-gauge defining circles with prominent tick markers */}
      {/* ======================================================== */}
      {/* Ring 1 (Midnight Navy with 12 Electric Cyan Degree Ticks) */}
      <group ref={ring1Ref} rotation={[0.65, 0.35, 0]}>
        <mesh>
          <torusGeometry args={[0.118, 0.0055, 16, 64]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E3A8A"
            emissiveIntensity={1.8}
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>
        {/* 12 Prominent Degree Graduation Ticks in Glowing Cyan */}
        {tickAngles.map((ang, idx) => (
          <mesh
            key={`tick-${idx}`}
            position={[Math.cos(ang) * 0.118, Math.sin(ang) * 0.118, 0]}
            rotation={[0, 0, ang]}
          >
            <boxGeometry args={[0.011, 0.0035, 0.006]} />
            <meshStandardMaterial
              color="#00F5D4"
              emissive="#0284C7"
              emissiveIntensity={3.4}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 2 (Radiant Royal Violet / Magenta Meridian Ring) */}
      <group ref={ring2Ref} rotation={[-0.55, 0.65, 0.2]}>
        <mesh>
          <torusGeometry args={[0.108, 0.0048, 16, 64]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#A855F7"
            emissiveIntensity={3.0}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. ORBITING MATHEMATICAL SATELLITE GLYPHS (Bold Scale)   */}
      {/* ======================================================== */}
      {/* Floating 3D Sigma (∑ Summation) Symbol in Radiant Emerald/Mint */}
      <group ref={sigmaRef} position={[0.138, 0.022, 0]}>
        {/* Top Horizontal Bar */}
        <mesh position={[0, 0.022, 0]}>
          <boxGeometry args={[0.032, 0.0065, 0.008]} />
          <meshStandardMaterial color="#10B981" emissive="#00F5D4" emissiveIntensity={3.6} />
        </mesh>
        {/* Upper Diagonal */}
        <mesh position={[-0.007, 0.011, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.024, 0.0065, 0.008]} />
          <meshStandardMaterial color="#10B981" emissive="#00F5D4" emissiveIntensity={3.6} />
        </mesh>
        {/* Lower Diagonal */}
        <mesh position={[-0.007, -0.011, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.024, 0.0065, 0.008]} />
          <meshStandardMaterial color="#10B981" emissive="#00F5D4" emissiveIntensity={3.6} />
        </mesh>
        {/* Bottom Horizontal Bar */}
        <mesh position={[0, -0.022, 0]}>
          <boxGeometry args={[0.032, 0.0065, 0.008]} />
          <meshStandardMaterial color="#10B981" emissive="#00F5D4" emissiveIntensity={3.6} />
        </mesh>
      </group>

      {/* Floating 3D Delta (Δ Triangle) Symbol in Radiant Crimson / Rose */}
      <group ref={deltaRef} position={[-0.138, 0.022, 0]}>
        {/* Left Strut */}
        <mesh position={[-0.009, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.038, 8]} />
          <meshStandardMaterial color="#E11D48" emissive="#F43F5E" emissiveIntensity={3.6} />
        </mesh>
        {/* Right Strut */}
        <mesh position={[0.009, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.038, 8]} />
          <meshStandardMaterial color="#E11D48" emissive="#F43F5E" emissiveIntensity={3.6} />
        </mesh>
        {/* Base Strut */}
        <mesh position={[0, -0.016, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.036, 8]} />
          <meshStandardMaterial color="#E11D48" emissive="#F43F5E" emissiveIntensity={3.6} />
        </mesh>
        {/* Apex Jewel Node */}
        <mesh position={[0, 0.019, 0]}>
          <sphereGeometry args={[0.0065, 14, 14]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#F43F5E" emissiveIntensity={4.2} />
        </mesh>
      </group>

      {/* High-Contrast Electric Cyan Primary Glow & Royal Blue Accent Light */}
      <pointLight color="#00F5D4" intensity={hovered ? 4.5 : 3.5} distance={0.80} />
      <pointLight position={[0, -0.05, 0]} color="#2563EB" intensity={hovered ? 3.2 : 2.2} distance={0.65} />
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

        {/* 2. LUMINOUS PLANETARY RINGS (Gradient Faded Celestial Multi-Band Structure) */}
        {/* Main Sapphire Cyan Ring Disc with Gradient Transparency */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.078, 0.138, 64]} />
          <meshStandardMaterial
            color="#0284C7"
            emissive="#00F5D4"
            emissiveIntensity={2.2}
            transparent
            opacity={0.72}
            side={THREE.DoubleSide}
            roughness={0.08}
            metalness={0.2}
          />
        </mesh>

        {/* Outer Ring Luminous Border Accent (Brilliant Neon Cyan Gradient Rim) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.138, 0.0032, 16, 64]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#38BDF8"
            emissiveIntensity={3.6}
            transparent
            opacity={0.85}
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

      <pointLight color="#0284C7" intensity={hovered ? 3.8 : 2.8} distance={0.65} />
    </group>
  );
}

// ============================================================================
// 3. CHEMISTRY LAB 3D: ERLENMEYER BEAKER WITH BUBBLING CHEMICAL & VIBRANT
// CONTRASTING STEAM VAPOR
// Redesigned for crisp visibility against white backgrounds and ruby particles:
// - Enlarged, neat borosilicate glass Erlenmeyer beaker with dark contours & graduations
// - High-contrast Bioluminescent Emerald Green chemical potion (contrasts ruby particles)
// - Ultra-bright sparkling electric cyan & pearl white effervescent micro-bubbles
// - Prominent, dense, billowing Electric Mint & Cyan steam clouds & vent rings
// - Base-free floating design neatly centered within the spherical particle cage!
// ============================================================================
export function ChemistryLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);

  // 10 delicate micro-bubbles rising inside the beaker liquid
  const b1 = useRef<THREE.Mesh | null>(null);
  const b2 = useRef<THREE.Mesh | null>(null);
  const b3 = useRef<THREE.Mesh | null>(null);
  const b4 = useRef<THREE.Mesh | null>(null);
  const b5 = useRef<THREE.Mesh | null>(null);
  const b6 = useRef<THREE.Mesh | null>(null);
  const b7 = useRef<THREE.Mesh | null>(null);
  const b8 = useRef<THREE.Mesh | null>(null);
  const b9 = useRef<THREE.Mesh | null>(null);
  const b10 = useRef<THREE.Mesh | null>(null);

  // Expanding steam rings venting from the mouth of the beaker
  const steamRing1 = useRef<THREE.Mesh | null>(null);
  const steamRing2 = useRef<THREE.Mesh | null>(null);

  // 18 billowing steam cloud puffs ascending and curling into the air
  const steamPuffs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 1.8 : 1.1;

    // Gentle 3D levitation and subtle laboratory tilt
    groupRef.current.position.y = Math.sin(t * 1.8 + 2) * 0.008;
    groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.12;

    // 10 Delicate effervescent micro-bubbles rising through the chemical liquid
    const bubbleRefs = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];
    const bParams = [
      { speed: 0.052, offset: 0.00, xOff: 0.014, zOff: 0.010, wobble: 3.2 },
      { speed: 0.062, offset: 0.12, xOff: -0.018, zOff: 0.012, wobble: 4.1 },
      { speed: 0.046, offset: 0.25, xOff: 0.010, zOff: -0.016, wobble: 3.6 },
      { speed: 0.058, offset: 0.38, xOff: -0.012, zOff: -0.010, wobble: 2.8 },
      { speed: 0.066, offset: 0.50, xOff: 0.022, zOff: -0.006, wobble: 4.5 },
      { speed: 0.048, offset: 0.62, xOff: -0.008, zOff: 0.020, wobble: 3.8 },
      { speed: 0.060, offset: 0.74, xOff: 0.018, zOff: 0.014, wobble: 4.2 },
      { speed: 0.050, offset: 0.82, xOff: -0.020, zOff: -0.014, wobble: 3.4 },
      { speed: 0.064, offset: 0.90, xOff: 0.006, zOff: 0.016, wobble: 4.0 },
      { speed: 0.054, offset: 0.96, xOff: -0.014, zOff: 0.004, wobble: 3.7 },
    ];

    bubbleRefs.forEach((bRef, i) => {
      if (!bRef.current) return;
      const bp = bParams[i];
      const progress = (t * bp.speed * speed + bp.offset) % 1;
      // y moves from beaker bottom (-0.054) up to meniscus surface (+0.012)
      bRef.current.position.y = -0.054 + progress * 0.066;
      // Spread narrows slightly as beaker conical body tapers upward
      const taper = 1.0 - progress * 0.45;
      bRef.current.position.x = bp.xOff * taper + Math.sin(t * bp.wobble + i) * 0.003;
      bRef.current.position.z = bp.zOff * taper + Math.cos(t * bp.wobble + i) * 0.003;
      // Pop / fade right near the meniscus surface
      const popScale = progress > 0.92 ? Math.max(0, (1 - progress) / 0.08) : 1;
      const s = (0.65 + progress * 0.40) * popScale;
      bRef.current.scale.set(s, s, s);
    });

    // Rising animated steam rings venting from beaker mouth (mouth lip at y = 0.075)
    if (steamRing1.current) {
      const ring1Cycle = (t * 0.38 * speed) % 1;
      steamRing1.current.position.y = 0.075 + ring1Cycle * 0.095;
      const s1 = 0.70 + ring1Cycle * 1.8;
      steamRing1.current.scale.set(s1, s1, s1);
      steamRing1.current.rotation.x = Math.PI / 2 + Math.sin(t * 1.5) * 0.15;
      const mat = steamRing1.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.opacity = Math.sin(ring1Cycle * Math.PI) * 0.75;
    }
    if (steamRing2.current) {
      const ring2Cycle = (t * 0.38 * speed + 0.5) % 1;
      steamRing2.current.position.y = 0.075 + ring2Cycle * 0.095;
      const s2 = 0.70 + ring2Cycle * 1.8;
      steamRing2.current.scale.set(s2, s2, s2);
      steamRing2.current.rotation.x = Math.PI / 2 + Math.cos(t * 1.5) * 0.15;
      const mat = steamRing2.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.opacity = Math.sin(ring2Cycle * Math.PI) * 0.75;
    }

    // 18 Billowing steam cloud puffs curling high into the air
    steamPuffs.current.forEach((puff, i) => {
      if (!puff) return;
      const count = 18;
      const puffOffset = i / count;
      const puffSpeed = (0.050 + (i % 5) * 0.008) * speed;
      const cycle = (t * puffSpeed + puffOffset) % 1;

      // Height: Starts right at beaker mouth (+0.075), billows high into the air (+0.28)
      puff.position.y = 0.075 + cycle * 0.205;

      // Swirling atmospheric steam convection eddies
      const swirlAngle = (i * Math.PI * 2) / count + t * 1.2;
      const driftRad = 0.006 + cycle * 0.055;
      puff.position.x = Math.cos(swirlAngle) * driftRad + Math.sin(t * 1.5 + i) * 0.008;
      puff.position.z = Math.sin(swirlAngle) * driftRad + Math.cos(t * 1.3 + i) * 0.008;

      // Billowing expansion as steam disperses into the air
      const scaleVal = 0.55 + cycle * 3.4;
      puff.scale.set(scaleVal, scaleVal, scaleVal);

      // Steam opacity curve (thick, opaque puff emerging, expanding, then dissipating)
      const mat = puff.material as THREE.MeshStandardMaterial;
      if (mat) {
        let opacity = 0;
        if (cycle < 0.12) {
          opacity = (cycle / 0.12) * 0.85;
        } else if (cycle < 0.55) {
          opacity = 0.85;
        } else {
          opacity = Math.max(0, (1 - (cycle - 0.55) / 0.45) * 0.85);
        }
        mat.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.15 : 1.05}>
      {/* ============================================================ */}
      {/* 1. LABORATORY ERLENMEYER BEAKER (Enlarged, Neat, Base-Free)  */}
      {/* ============================================================ */}
      <group position={[0, -0.015, 0]}>
        {/* Cylindrical Glass Neck */}
        <mesh position={[0, 0.051, 0]}>
          <cylinderGeometry args={[0.028, 0.028, 0.048, 32, 1, true]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.08}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Flared Dark Glass Top Lip Rim (Crisp, High-Contrast Silhouette) */}
        <mesh position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.029, 0.0040, 16, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={1.0}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Expanding Conical Glass Body with Defined Contours */}
        <mesh position={[0, -0.016, 0]}>
          <cylinderGeometry args={[0.028, 0.080, 0.086, 32, 1, true]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.08}
            transparent
            opacity={0.32}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Defined Polished Base Rim Ring */}
        <mesh position={[0, -0.059, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.080, 0.0040, 16, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={1.0}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Flat Glass Base Bottom (Neatly sealed beaker base) */}
        <mesh position={[0, -0.059, 0]}>
          <cylinderGeometry args={[0.080, 0.080, 0.002, 32]} />
          <meshStandardMaterial
            color="#0F172A"
            emissive="#1E293B"
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.1}
          />
        </mesh>

        {/* Dark Etched Graduation Measurement Lines */}
        <mesh position={[0, -0.044, 0]}>
          <cylinderGeometry args={[0.066, 0.066, 0.0024, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0, -0.026, 0]}>
          <cylinderGeometry args={[0.054, 0.054, 0.0024, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0, -0.008, 0]}>
          <cylinderGeometry args={[0.042, 0.042, 0.0024, 32, 1, true]} />
          <meshStandardMaterial color="#0F172A" emissive="#334155" emissiveIntensity={1.6} />
        </mesh>

        {/* ============================================================ */}
        {/* 2. BIOLUMINESCENT EMERALD GREEN CHEMICAL POTION             */}
        {/* Contrasting sharply against ruby/pink satellite particles    */}
        {/* ============================================================ */}
        {/* Conical Liquid Volume inside Beaker */}
        <mesh position={[0, -0.023, 0]}>
          <cylinderGeometry args={[0.040, 0.076, 0.072, 32]} />
          <meshStandardMaterial
            color="#059669"
            emissive="#10B981"
            emissiveIntensity={2.8}
            roughness={0.15}
            metalness={0.25}
          />
        </mesh>

        {/* Liquid Meniscus Surface Cap (Radiant Electric Cyan/Mint) */}
        <mesh position={[0, 0.013, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.040, 32]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#10B981"
            emissiveIntensity={3.6}
            roughness={0.1}
          />
        </mesh>

        {/* ============================================================ */}
        {/* 3. ACTIVE EFFERVESCENT MICRO-BUBBLES (Ultra-Bright White/Cyan) */}
        {/* Contrasting against emerald potion & ruby cage particles     */}
        {/* ============================================================ */}
        <mesh ref={b1}>
          <sphereGeometry args={[0.0038, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b2}>
          <sphereGeometry args={[0.0032, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b3}>
          <sphereGeometry args={[0.0028, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b4}>
          <sphereGeometry args={[0.0042, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b5}>
          <sphereGeometry args={[0.0026, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b6}>
          <sphereGeometry args={[0.0036, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b7}>
          <sphereGeometry args={[0.0030, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b8}>
          <sphereGeometry args={[0.0044, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b9}>
          <sphereGeometry args={[0.0032, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>
        <mesh ref={b10}>
          <sphereGeometry args={[0.0028, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#00F5D4" emissiveIntensity={4.2} roughness={0.05} metalness={0.1} />
        </mesh>

        {/* ============================================================ */}
        {/* 4. BILLOWING LABORATORY STEAM & STEAM RINGS                  */}
        {/* High-contrast Electric Mint / Cyan / Aquamarine palette       */}
        {/* ============================================================ */}
        {/* Steam Ring Vent 1 */}
        <mesh ref={steamRing1} position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.018, 0.0030, 16, 32]} />
          <meshStandardMaterial
            color="#E6FFFA"
            emissive="#00F5D4"
            emissiveIntensity={2.8}
            transparent
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>

        {/* Steam Ring Vent 2 */}
        <mesh ref={steamRing2} position={[0, 0.075, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.024, 0.0034, 16, 32]} />
          <meshStandardMaterial
            color="#A7F3D0"
            emissive="#10B981"
            emissiveIntensity={2.8}
            transparent
            opacity={0.65}
            roughness={0.2}
          />
        </mesh>

        {/* 18 Billowing Steam Cloud Puffs in Saturated Contrasting Colors */}
        {[
          { color: '#E6FFFA', emissive: '#00F5D4', size: 0.017 },
          { color: '#A7F3D0', emissive: '#10B981', size: 0.020 },
          { color: '#6EE7B7', emissive: '#059669', size: 0.016 },
          { color: '#00F5D4', emissive: '#00F5D4', size: 0.019 },
          { color: '#E6FFFA', emissive: '#34D399', size: 0.021 },
          { color: '#34D399', emissive: '#10B981', size: 0.018 },
          { color: '#A7F3D0', emissive: '#00F5D4', size: 0.020 },
          { color: '#E6FFFA', emissive: '#10B981', size: 0.016 },
          { color: '#6EE7B7', emissive: '#059669', size: 0.019 },
          { color: '#00F5D4', emissive: '#00F5D4', size: 0.021 },
          { color: '#E6FFFA', emissive: '#34D399', size: 0.017 },
          { color: '#A7F3D0', emissive: '#10B981', size: 0.020 },
          { color: '#34D399', emissive: '#059669', size: 0.018 },
          { color: '#E6FFFA', emissive: '#00F5D4', size: 0.021 },
          { color: '#6EE7B7', emissive: '#10B981', size: 0.017 },
          { color: '#00F5D4', emissive: '#00F5D4', size: 0.020 },
          { color: '#A7F3D0', emissive: '#34D399', size: 0.019 },
          { color: '#E6FFFA', emissive: '#10B981', size: 0.022 },
        ].map((v, i) => (
          <mesh
            key={`steam-puff-${i}`}
            ref={(el) => {
              steamPuffs.current[i] = el;
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

      {/* 5. FLOATING CHEMICAL MOLECULE NODES (Contrasting Emerald & Electric Cyan) */}
      <group position={[0, -0.010, 0]}>
        {/* Bonded Molecule Cluster 1 (Left side: Emerald Core + Cyan Atoms) */}
        <group position={[-0.115, 0.020, 0.02]}>
          <mesh position={[0, 0.012, 0]}>
            <sphereGeometry args={[0.011, 12, 12]} />
            <meshStandardMaterial color="#059669" emissive="#10B981" emissiveIntensity={2.8} />
          </mesh>
          <mesh position={[0.015, -0.010, 0]}>
            <sphereGeometry args={[0.0085, 12, 12]} />
            <meshStandardMaterial color="#00F5D4" emissive="#34D399" emissiveIntensity={3.0} />
          </mesh>
          <mesh position={[-0.015, -0.010, 0]}>
            <sphereGeometry args={[0.0085, 12, 12]} />
            <meshStandardMaterial color="#00F5D4" emissive="#34D399" emissiveIntensity={3.0} />
          </mesh>
        </group>

        {/* Bonded Molecule Cluster 2 (Right side: Cyan Core + Mint Atoms) */}
        <group position={[0.115, 0.048, -0.02]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.011, 12, 12]} />
            <meshStandardMaterial color="#0284C7" emissive="#00F5D4" emissiveIntensity={3.0} />
          </mesh>
          <mesh position={[0.016, 0.014, 0]}>
            <sphereGeometry args={[0.0085, 12, 12]} />
            <meshStandardMaterial color="#10B981" emissive="#6EE7B7" emissiveIntensity={2.8} />
          </mesh>
        </group>
      </group>

      {/* Dynamic Colored Evaporation & Chemical Reaction Glow (Contrasting Electric Mint & Cyan) */}
      <pointLight color="#00F5D4" intensity={hovered ? 4.2 : 3.2} distance={0.7} position={[0, 0.02, 0]} />
      <pointLight color="#10B981" intensity={hovered ? 3.2 : 2.4} distance={0.6} position={[0, 0.14, 0]} />
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
  const rungsGroupRef = useRef<(THREE.Group | null)[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.9 + 3) * 0.012;
    if (helixRef.current) {
      helixRef.current.rotation.y += delta * (hovered ? 2.4 : 1.4);
    }
    // Traveling bioluminescent heartbeat wave up the helix
    rungsGroupRef.current.forEach((rung, i) => {
      if (!rung) return;
      const wave = Math.sin(t * 3.2 - i * 0.45);
      const s = 1.0 + wave * 0.12;
      rung.scale.set(s, s, s);
    });
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
    <group ref={groupRef} scale={hovered ? 1.15 : 1.02}>
      <group ref={helixRef}>
        {rungs.map((r, i) => (
          <group
            key={i}
            ref={(el) => {
              rungsGroupRef.current[i] = el;
            }}
            position={[0, r.y, 0]}
          >
            {/* Strand A: Gradient Faded Royal Violet / Orchid Nucleotide */}
            <mesh position={[r.x1, 0, r.z1]}>
              <sphereGeometry args={[0.024, 16, 16]} />
              <meshStandardMaterial
                color="#8B5CF6"
                emissive="#A855F7"
                emissiveIntensity={2.5}
                transparent
                opacity={0.85}
                roughness={0.12}
                metalness={0.2}
              />
            </mesh>
            {/* Strand B: Gradient Faded Vivid Fuchsia / Rose Nucleotide */}
            <mesh position={[r.x2, 0, r.z2]}>
              <sphereGeometry args={[0.024, 16, 16]} />
              <meshStandardMaterial
                color="#EC4899"
                emissive="#F43F5E"
                emissiveIntensity={2.5}
                transparent
                opacity={0.85}
                roughness={0.12}
                metalness={0.2}
              />
            </mesh>
            {/* Bioluminescent Double Rung Connection Bridge */}
            <mesh rotation={[0, -r.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.0055, 0.0055, 0.15, 8]} />
              <meshStandardMaterial
                color="#C084FC"
                emissive="#7C3AED"
                emissiveIntensity={2.0}
                transparent
                opacity={0.78}
                roughness={0.15}
              />
            </mesh>
            {/* Central Genetic Spark Node */}
            <mesh>
              <sphereGeometry args={[0.007, 12, 12]} />
              <meshStandardMaterial
                color="#FFFFFF"
                emissive="#00F5D4"
                emissiveIntensity={4.0}
              />
            </mesh>
          </group>
        ))}
      </group>

      <pointLight color="#A855F7" intensity={hovered ? 3.8 : 2.8} distance={0.70} />
      <pointLight color="#EC4899" intensity={hovered ? 2.8 : 1.8} distance={0.60} position={[0, -0.05, 0]} />
    </group>
  );
}

// ============================================================================
// 5. COMPUTER LAB 3D: ALIVE 3D QUANTUM NEURAL CORE WITH GRADIENT FADED
// HOLOGRAPHIC DATA RIBBONS & PULSING CYBERNETIC JEWEL MATRIX
// Replaces the flat logo disc with an alive, breathing, volumetric 3D entity:
// - Intersecting glowing Quantum Octahedron core that pulses like an active CPU
// - Dual counter-rotating gradient-faded cybernetic data rings in Electric Cyan & Sapphire
// - Floating levitating neural data nodes with soft radiant glow
// - Ethereal transparent falloff and living kinetic respiration!
// ============================================================================
export function ComputerLab3D({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Group | null>(null);
  const ring2Ref = useRef<THREE.Group | null>(null);
  const ring3Ref = useRef<THREE.Group | null>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const speed = hovered ? 2.2 : 1.2;

    // Alive organic levitation respiration
    groupRef.current.position.y = Math.sin(t * 1.9 + 4) * 0.012;

    // Pulsing alive Quantum Core
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * speed * 0.85;
      coreRef.current.rotation.x = Math.sin(t * 1.4) * 0.15;
      const pulse = 1.0 + Math.sin(t * 3.2) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Fast counter-rotating inner singularity crystal
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= delta * speed * 1.6;
      innerCoreRef.current.rotation.z += delta * speed * 1.1;
      const pulse2 = 1.0 + Math.cos(t * 4.0) * 0.12;
      innerCoreRef.current.scale.set(pulse2, pulse2, pulse2);
    }

    // Counter-rotating Holographic Gradient Data Rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * speed * 0.70;
      ring1Ref.current.rotation.y = Math.sin(t * 1.1) * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * speed * 0.80;
      ring2Ref.current.rotation.z += delta * speed * 0.50;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * speed * 0.90;
      ring3Ref.current.rotation.x = Math.cos(t * 1.3) * 0.30;
    }

    // Orbiting alive neural data nodes
    nodesRef.current.forEach((node, i) => {
      if (!node) return;
      const angle = t * speed * 1.2 + (i * Math.PI * 2) / 6;
      const r = 0.125 + Math.sin(t * 2.0 + i) * 0.015;
      node.position.set(
        Math.cos(angle) * r,
        Math.sin(angle * 2) * 0.025,
        Math.sin(angle) * r
      );
      const s = 0.8 + Math.sin(t * 4.0 + i) * 0.35;
      node.scale.set(s, s, s);
    });
  });

  return (
    <group ref={groupRef} scale={hovered ? 1.18 : 1.05}>
      {/* 1. CENTRAL QUANTUM NEURAL CORE (Gradient Faded Translucent Octahedron) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.072, 0]} />
        <meshStandardMaterial
          color="#1D4ED8"
          emissive="#38BDF8"
          emissiveIntensity={2.8}
          transparent
          opacity={0.82}
          roughness={0.08}
          metalness={0.4}
        />
      </mesh>

      {/* 2. INNER GLOWING SINGULARITY JEWEL */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[0.038, 0]} />
        <meshStandardMaterial
          color="#00F5D4"
          emissive="#60A5FA"
          emissiveIntensity={4.5}
          roughness={0.05}
          metalness={0.2}
        />
      </mesh>

      {/* 3. DUAL HOLOGRAPHIC DATA RINGS WITH GRADIENT FADED TRANSPARENCY */}
      {/* Ring 1: Electric Cyan Gradient Ring */}
      <group ref={ring1Ref} rotation={[0.45, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[0.108, 0.0042, 16, 64]} />
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#38BDF8"
            emissiveIntensity={3.2}
            transparent
            opacity={0.78}
            roughness={0.1}
          />
        </mesh>
        {/* Luminous micro-circuit nodes along Ring 1 */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
          <mesh
            key={`node1-${idx}`}
            position={[Math.cos(ang) * 0.108, Math.sin(ang) * 0.108, 0]}
          >
            <sphereGeometry args={[0.007, 12, 12]} />
            <meshStandardMaterial
              color="#FFFFFF"
              emissive="#00F5D4"
              emissiveIntensity={4.8}
            />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Royal Cobalt Meridian Ring */}
      <group ref={ring2Ref} rotation={[-0.55, 0.4, 0.3]}>
        <mesh>
          <torusGeometry args={[0.096, 0.0038, 16, 64]} />
          <meshStandardMaterial
            color="#2563EB"
            emissive="#60A5FA"
            emissiveIntensity={2.8}
            transparent
            opacity={0.75}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Ring 3: Delicate Equatorial Gyro Ring */}
      <group ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.122, 0.0028, 16, 64]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00F5D4"
            emissiveIntensity={2.5}
            transparent
            opacity={0.65}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* 4. 6 ORBITING ALIVE NEURAL DATA NODES */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`node-${i}`}
          ref={(el) => {
            nodesRef.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.0065, 12, 12]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#00F5D4' : '#60A5FA'}
            emissive={i % 2 === 0 ? '#38BDF8' : '#3B82F6'}
            emissiveIntensity={4.5}
          />
        </mesh>
      ))}

      {/* Living Atmospheric Cyber Glow Light */}
      <pointLight color="#00F5D4" intensity={hovered ? 4.2 : 3.0} distance={0.75} />
      <pointLight color="#3B82F6" intensity={hovered ? 3.0 : 2.0} distance={0.65} position={[0, -0.05, 0]} />
    </group>
  );
}
