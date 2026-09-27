'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import {
  HelpCircle,
  MessageSquare,
  FileText,
  CheckCircle2,
  Users,
  UserCheck,
  Clock,
  HeartHandshake,
  Folder,
  FolderCheck,
  BookOpen,
  GraduationCap,
  Sparkles,
  Compass,
  Star,
} from 'lucide-react';

// ============================================================================
// DATA: 5 TRANSFORMATION PAIRS (CHALLENGE -> VEDIKA -> SOLUTION)
// Content strictly adheres to user specification
// ============================================================================
export interface TransformationPair {
  id: string;
  index: number;
  challenge: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    accentColor: string;
    glowColor: string;
  };
  solution: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
    accentColor: string;
    glowColor: string;
  };
  // Vertical percentage offset on desktop layout
  topPercent: number;
  // Horizontal offset from outer edge (for natural curved framing)
  horizontalOffsetPx: number;
}

const TRANSFORMATION_PAIRS: TransformationPair[] = [
  {
    id: 'doubts',
    index: 0,
    challenge: {
      title: 'Repetitive Questions',
      subtitle: 'Same doubts, again and again',
      icon: HelpCircle,
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    solution: {
      title: 'Instant Doubt Resolution',
      subtitle: '24/7 AI support for students',
      icon: MessageSquare,
      accentColor: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.45)',
    },
    topPercent: 33,
    horizontalOffsetPx: 18,
  },
  {
    id: 'grading',
    index: 1,
    challenge: {
      title: 'Grading Pressure',
      subtitle: 'Late nights, endless papers',
      icon: FileText,
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    solution: {
      title: 'Automated Assessment',
      subtitle: 'Fast, accurate grading',
      icon: CheckCircle2,
      accentColor: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.45)',
    },
    topPercent: 47,
    horizontalOffsetPx: 0,
  },
  {
    id: 'attention',
    index: 2,
    challenge: {
      title: 'Limited Personal Attention',
      subtitle: 'Hard to support every student',
      icon: Users,
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    solution: {
      title: 'Personalized Learning',
      subtitle: 'Tailored support for every student',
      icon: UserCheck,
      accentColor: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.45)',
    },
    topPercent: 61,
    horizontalOffsetPx: 12,
  },
  {
    id: 'time',
    index: 3,
    challenge: {
      title: 'Time & Mental Exhaustion',
      subtitle: 'Leaves little time for real teaching',
      icon: Clock,
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    solution: {
      title: 'More Time for Teaching',
      subtitle: 'Focus on what you love',
      icon: HeartHandshake,
      accentColor: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.45)',
    },
    topPercent: 75,
    horizontalOffsetPx: 38,
  },
  {
    id: 'resources',
    index: 4,
    challenge: {
      title: 'Scattered Resources',
      subtitle: 'Hard to organize and manage',
      icon: Folder,
      accentColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.45)',
    },
    solution: {
      title: 'Organized Knowledge',
      subtitle: 'All resources in one place',
      icon: FolderCheck,
      accentColor: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.45)',
    },
    topPercent: 88,
    horizontalOffsetPx: 80,
  },
];

// Floating education badges on concentric orbital rings (as in reference image)
const ORBITAL_BADGES = [
  { icon: BookOpen, color: '#A855F7', angleDeg: 140, radiusPx: 145 },
  { icon: GraduationCap, color: '#22D3EE', angleDeg: 40, radiusPx: 145 },
  { icon: FileText, color: '#F43F5E', angleDeg: 180, radiusPx: 135 },
  { icon: Star, color: '#38BDF8', angleDeg: 0, radiusPx: 135 },
  { icon: Clock, color: '#C084FC', angleDeg: 220, radiusPx: 145 },
  { icon: Compass, color: '#06B6D4', angleDeg: 320, radiusPx: 145 },
];

interface Point {
  x: number;
  y: number;
}

interface PathData {
  challengePath: string;
  solutionPath: string;
  challengePort: Point;
  solutionPort: Point;
  coreEntry: Point;
  coreExit: Point;
}

export function ProblemSolutionSection() {
  const { scrollProgress } = useInteraction();
  const [activePair, setActivePair] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const challengePortRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionPortRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<PathData[]>([]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ambient rhythmic cycling when no item is hovered (demonstrates continuous flow in 3 seconds)
  useEffect(() => {
    if (activePair !== null) return;
    const interval = setInterval(() => {
      setActivePair((prev) => (prev === null ? 0 : (prev + 1) % 5));
    }, 2800);
    return () => clearInterval(interval);
  }, [activePair]);

  // Pixel-perfect SVG Bezier curve calculation connecting capsules to the central intelligence ring
  const updatePaths = useCallback(() => {
    if (isMobile || !containerRef.current || !coreRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const coreRect = coreRef.current.getBoundingClientRect();

    const coreCenter: Point = {
      x: coreRect.left + coreRect.width / 2 - containerRect.left,
      y: coreRect.top + coreRect.height / 2 - containerRect.top,
    };
    const coreRadius = coreRect.width / 2;

    const newPaths: PathData[] = TRANSFORMATION_PAIRS.map((pair, idx) => {
      const cPortEl = challengePortRefs.current[idx];
      const sPortEl = solutionPortRefs.current[idx];

      let cPort: Point = { x: 0, y: 0 };
      let sPort: Point = { x: 0, y: 0 };

      if (cPortEl) {
        const rect = cPortEl.getBoundingClientRect();
        cPort = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }

      if (sPortEl) {
        const rect = sPortEl.getBoundingClientRect();
        sPort = {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      }

      // Compute entry and exit docking nodes on the perimeter of the circular core
      // Challenge enters on left perimeter (angles from 145 deg down to 230 deg)
      const entryAngleRad = ((150 + idx * 18) * Math.PI) / 180;
      const coreEntry: Point = {
        x: coreCenter.x + Math.cos(entryAngleRad) * coreRadius,
        y: coreCenter.y - Math.sin(entryAngleRad) * (coreRadius * 0.82),
      };

      // Solution exits on right perimeter (angles from 30 deg down to -50 deg)
      const exitAngleRad = ((30 - idx * 18) * Math.PI) / 180;
      const coreExit: Point = {
        x: coreCenter.x + Math.cos(exitAngleRad) * coreRadius,
        y: coreCenter.y - Math.sin(exitAngleRad) * (coreRadius * 0.82),
      };

      // Challenge cubic bezier: flows smoothly inward from left capsule to core
      const cDx = coreEntry.x - cPort.x;
      const cCp1: Point = { x: cPort.x + cDx * 0.52, y: cPort.y };
      const cCp2: Point = { x: coreEntry.x - cDx * 0.20, y: coreEntry.y };
      const challengePath = `M ${cPort.x} ${cPort.y} C ${cCp1.x} ${cCp1.y}, ${cCp2.x} ${cCp2.y}, ${coreEntry.x} ${coreEntry.y}`;

      // Solution cubic bezier: flows smoothly outward from core to right capsule
      const sDx = sPort.x - coreExit.x;
      const sCp1: Point = { x: coreExit.x + sDx * 0.20, y: coreExit.y };
      const sCp2: Point = { x: sPort.x - sDx * 0.52, y: sPort.y };
      const solutionPath = `M ${coreExit.x} ${coreExit.y} C ${sCp1.x} ${sCp1.y}, ${sCp2.x} ${sCp2.y}, ${sPort.x} ${sPort.y}`;

      return {
        challengePath,
        solutionPath,
        challengePort: cPort,
        solutionPort: sPort,
        coreEntry,
        coreExit,
      };
    });

    setPaths(newPaths);
  }, [isMobile]);

  useEffect(() => {
    updatePaths();
    window.addEventListener('resize', updatePaths);
    return () => window.removeEventListener('resize', updatePaths);
  }, [updatePaths]);

  // Recalculate on scroll/transition settle
  useEffect(() => {
    const timer = setTimeout(updatePaths, 150);
    return () => clearTimeout(timer);
  }, [scrollProgress, updatePaths]);

  return (
    <section
      aria-label="From Challenges to Confident Teaching"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. HERO / SECTION HEADER (Top Center) */}
      <div
        className="header-wrapper"
        style={{
          position: 'absolute',
          top: 'clamp(3.8rem, 6.5vh, 5.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '92%',
          maxWidth: '880px',
          zIndex: 30,
          pointerEvents: 'auto',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2.0rem, 3.4vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: '0 0 10px 0',
            lineHeight: 1.15,
            color: '#FFFFFF',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.95)',
          }}
        >
          From{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #F43F5E 0%, #FB7185 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Challenges
          </span>
          <br />
          to{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #34D399 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Confident Teaching
          </span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.90rem, 1.15vw, 1.05rem)',
            color: '#94A3B8',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.5,
            fontWeight: 400,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
          }}
        >
          Vedika transforms everyday teaching obstacles into a seamless, joyful teaching experience.
        </p>
      </div>

      {/* 2. MAIN WORKSPACE / CIRCULAR COMPOSITION CONTAINER */}
      <div
        ref={containerRef}
        className="composition-container"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* DESKTOP SVG ENERGETIC FLOWING STREAMS */}
        {!isMobile && (
          <svg
            className="energy-streams-svg"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 15,
            }}
          >
            <defs>
              {/* Pink/Red Challenge Energy Gradient */}
              <linearGradient id="challengeEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#BE123C" stopOpacity="1" />
              </linearGradient>

              {/* Cyan/Emerald Solution Energy Gradient */}
              <linearGradient id="solutionEnergyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0D9488" stopOpacity="1" />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.85" />
              </linearGradient>

              {/* Filter for neon glowing pulse */}
              <filter id="glowPink" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glowCyan" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {paths.map((p, idx) => {
              const isActive = activePair === idx;
              const hasActivePair = activePair !== null;
              const dimFactor = hasActivePair && !isActive ? 0.35 : 1;

              return (
                <g key={`path-group-${idx}`} style={{ transition: 'opacity 0.3s ease' }}>
                  {/* A. Challenge -> Vedika Stream (Red/Pink flowing INWARD) */}
                  {/* Subtle Background Guide Track */}
                  <path
                    d={p.challengePath}
                    fill="none"
                    stroke="rgba(244, 63, 94, 0.22)"
                    strokeWidth={isActive ? 3.0 : 1.8}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-width 0.3s ease, stroke 0.3s ease' }}
                  />

                  {/* Animated Flowing Energy Particle Stream (Flows Inward) */}
                  <path
                    d={p.challengePath}
                    fill="none"
                    stroke="url(#challengeEnergyGrad)"
                    strokeWidth={isActive ? 3.5 : 2.2}
                    strokeDasharray="8 14"
                    className="flowing-stream-inward"
                    filter={isActive ? 'url(#glowPink)' : undefined}
                    opacity={dimFactor}
                  />

                  {/* Challenge Entry Arrowhead / Terminal Beacon */}
                  <circle
                    cx={p.coreEntry.x}
                    cy={p.coreEntry.y}
                    r={isActive ? 5 : 3.5}
                    fill="#F43F5E"
                    filter="url(#glowPink)"
                    opacity={dimFactor}
                  />

                  {/* B. Vedika -> Solution Stream (Cyan/Teal flowing OUTWARD) */}
                  {/* Subtle Background Guide Track */}
                  <path
                    d={p.solutionPath}
                    fill="none"
                    stroke="rgba(34, 211, 238, 0.22)"
                    strokeWidth={isActive ? 3.0 : 1.8}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-width 0.3s ease, stroke 0.3s ease' }}
                  />

                  {/* Animated Flowing Energy Particle Stream (Flows Outward) */}
                  <path
                    d={p.solutionPath}
                    fill="none"
                    stroke="url(#solutionEnergyGrad)"
                    strokeWidth={isActive ? 3.5 : 2.2}
                    strokeDasharray="8 14"
                    className="flowing-stream-outward"
                    filter={isActive ? 'url(#glowCyan)' : undefined}
                    opacity={dimFactor}
                  />

                  {/* Solution Port Dot / Terminal Beacon */}
                  <circle
                    cx={p.solutionPort.x}
                    cy={p.solutionPort.y}
                    r={isActive ? 5 : 3.5}
                    fill="#22D3EE"
                    filter="url(#glowCyan)"
                    opacity={dimFactor}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* 3. CENTRAL VEDIKA FUTURISTIC CIRCULAR ENVIRONMENT */}
        <div
          ref={coreRef}
          className="central-vedika-pod"
          style={{
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'clamp(280px, 24vw, 340px)',
            height: 'clamp(280px, 24vw, 340px)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* A. Outer Rotating Concentric Cyber Ring with dashed notches */}
          <div
            className="ring-outer-dashed"
            style={{
              position: 'absolute',
              inset: '-18px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(34, 211, 238, 0.38)',
              boxShadow: '0 0 35px rgba(34, 211, 238, 0.12)',
              animation: 'spinClockwise 45s linear infinite',
            }}
          />

          {/* B. Mid Glowing Orbital Ring */}
          <div
            className="ring-mid-glow"
            style={{
              position: 'absolute',
              inset: '6px',
              borderRadius: '50%',
              border: '1px solid rgba(168, 85, 247, 0.40)',
              boxShadow: '0 0 40px rgba(168, 85, 247, 0.18), inset 0 0 20px rgba(34, 211, 238, 0.12)',
              animation: 'spinCounterClockwise 55s linear infinite',
            }}
          />

          {/* C. Inner Halo Ring around Vedika */}
          <div
            className="ring-inner-halo"
            style={{
              position: 'absolute',
              inset: '28px',
              borderRadius: '50%',
              border: '1.5px solid rgba(34, 211, 238, 0.65)',
              boxShadow: '0 0 30px rgba(34, 211, 238, 0.35)',
            }}
          />

          {/* D. Floating Education Badges on Orbital Ring (From Reference Image) */}
          {!isMobile &&
            ORBITAL_BADGES.map((b, i) => {
              const rad = (b.angleDeg * Math.PI) / 180;
              const bx = Math.cos(rad) * b.radiusPx;
              const by = Math.sin(rad) * b.radiusPx;
              const BIcon = b.icon;

              return (
                <div
                  key={`badge-${i}`}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${bx}px)`,
                    top: `calc(50% + ${by}px)`,
                    transform: 'translate(-50%, -50%)',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(15, 23, 42, 0.88)',
                    border: `1px solid ${b.color}55`,
                    boxShadow: `0 4px 14px ${b.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    zIndex: 18,
                    animation: `badgeFloat ${3 + (i % 3)}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                >
                  <BIcon size={15} color={b.color} />
                </div>
              );
            })}

          {/* E. Holographic Concentric Platform Ellipse Beneath Vedika's Feet */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '56px',
              borderRadius: '50%',
              border: '2px solid rgba(34, 211, 238, 0.60)',
              background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.28) 0%, rgba(14, 165, 233, 0.08) 55%, transparent 75%)',
              boxShadow: '0 0 35px rgba(34, 211, 238, 0.45)',
              zIndex: 11,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '160px',
                height: '34px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.50)',
                boxShadow: '0 0 18px rgba(34, 211, 238, 0.70)',
              }}
            />
          </div>

          {/* F. VEDIKA Identity Badge Pill (Directly beneath platform as in reference) */}
          <div
            style={{
              position: 'absolute',
              bottom: '-38px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '6px 20px',
              borderRadius: '24px',
              background: 'rgba(15, 23, 42, 0.88)',
              border: '1px solid rgba(34, 211, 238, 0.40)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(34, 211, 238, 0.20)',
              backdropFilter: 'blur(12px)',
              pointerEvents: 'auto',
              zIndex: 22,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#FFFFFF',
              }}
            >
              VEDIKA
            </span>
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 500,
                color: '#94A3B8',
                letterSpacing: '0.04em',
              }}
            >
              Your AI Teaching Assistant
            </span>
          </div>
        </div>

        {/* 4. DESKTOP FLOATING TRANSFORMATION CAPSULES (CIRCULAR/CURVED RHYTHM) */}
        {!isMobile ? (
          <div
            className="capsules-layer"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 25,
            }}
          >
            {TRANSFORMATION_PAIRS.map((pair, idx) => {
              const CIcon = pair.challenge.icon;
              const SIcon = pair.solution.icon;
              const isActive = activePair === idx;
              const hasActive = activePair !== null;
              const dimStyle = hasActive && !isActive ? { opacity: 0.55 } : { opacity: 1 };

              return (
                <React.Fragment key={pair.id}>
                  {/* A. CHALLENGE CAPSULE (Left Side, flows toward center) */}
                  <div
                    onMouseEnter={() => setActivePair(idx)}
                    onMouseLeave={() => setActivePair(null)}
                    style={{
                      position: 'absolute',
                      left: `calc(13% + ${pair.horizontalOffsetPx}px)`,
                      top: `${pair.topPercent}%`,
                      transform: isActive
                        ? 'translateY(-50%) scale(1.04)'
                        : 'translateY(-50%) scale(1.0)',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 16px 8px 10px',
                      borderRadius: '9999px',
                      background: isActive
                        ? 'rgba(30, 27, 46, 0.94)'
                        : 'rgba(15, 23, 42, 0.78)',
                      border: isActive
                        ? '1px solid rgba(244, 63, 94, 0.85)'
                        : '1px solid rgba(244, 63, 94, 0.35)',
                      boxShadow: isActive
                        ? '0 12px 35px rgba(244, 63, 94, 0.30), 0 0 25px rgba(244, 63, 94, 0.20)'
                        : '0 8px 25px rgba(0, 0, 0, 0.70)',
                      backdropFilter: 'blur(16px)',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      ...dimStyle,
                    }}
                  >
                    {/* Left Icon Badge */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(244, 63, 94, 0.45)',
                        flexShrink: 0,
                      }}
                    >
                      <CIcon size={18} color="#FFFFFF" />
                    </div>

                    {/* Text Hierarchy: Title -> Tiny Description */}
                    <div style={{ textAlign: 'left', minWidth: '150px' }}>
                      <div
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {pair.challenge.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: '#94A3B8',
                          lineHeight: 1.2,
                          marginTop: '2px',
                        }}
                      >
                        {pair.challenge.subtitle}
                      </div>
                    </div>

                    {/* Right Connection Port Dot */}
                    <div
                      ref={(el) => {
                        challengePortRefs.current[idx] = el;
                      }}
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: isActive ? '#F43F5E' : 'rgba(244, 63, 94, 0.75)',
                        boxShadow: '0 0 10px #F43F5E',
                        flexShrink: 0,
                        marginLeft: '4px',
                      }}
                    />
                  </div>

                  {/* B. SOLUTION CAPSULE (Right Side, emerges from center) */}
                  <div
                    onMouseEnter={() => setActivePair(idx)}
                    onMouseLeave={() => setActivePair(null)}
                    style={{
                      position: 'absolute',
                      right: `calc(13% + ${pair.horizontalOffsetPx}px)`,
                      top: `${pair.topPercent}%`,
                      transform: isActive
                        ? 'translateY(-50%) scale(1.04)'
                        : 'translateY(-50%) scale(1.0)',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 10px 8px 16px',
                      borderRadius: '9999px',
                      background: isActive
                        ? 'rgba(19, 42, 49, 0.94)'
                        : 'rgba(15, 23, 42, 0.78)',
                      border: isActive
                        ? '1px solid rgba(34, 211, 238, 0.85)'
                        : '1px solid rgba(34, 211, 238, 0.35)',
                      boxShadow: isActive
                        ? '0 12px 35px rgba(34, 211, 238, 0.30), 0 0 25px rgba(34, 211, 238, 0.20)'
                        : '0 8px 25px rgba(0, 0, 0, 0.70)',
                      backdropFilter: 'blur(16px)',
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      ...dimStyle,
                    }}
                  >
                    {/* Left Connection Port Dot */}
                    <div
                      ref={(el) => {
                        solutionPortRefs.current[idx] = el;
                      }}
                      style={{
                        width: '9px',
                        height: '9px',
                        borderRadius: '50%',
                        background: isActive ? '#22D3EE' : 'rgba(34, 211, 238, 0.75)',
                        boxShadow: '0 0 10px #22D3EE',
                        flexShrink: 0,
                        marginRight: '4px',
                      }}
                    />

                    {/* Left Icon Badge */}
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22D3EE 0%, #0D9488 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(34, 211, 238, 0.45)',
                        flexShrink: 0,
                      }}
                    >
                      <SIcon size={18} color="#FFFFFF" />
                    </div>

                    {/* Text Hierarchy: Title -> Tiny Description */}
                    <div style={{ textAlign: 'left', minWidth: '150px' }}>
                      <div
                        style={{
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {pair.solution.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          color: '#94A3B8',
                          lineHeight: 1.2,
                          marginTop: '2px',
                        }}
                      >
                        {pair.solution.subtitle}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          /* 5. MOBILE VERTICAL NARRATIVE FLOW (Scroll-friendly and responsive) */
          <div
            className="mobile-narrative-flow"
            style={{
              position: 'relative',
              width: '92%',
              maxWidth: '440px',
              margin: '180px auto 40px auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              pointerEvents: 'auto',
              zIndex: 30,
              paddingBottom: '60px',
            }}
          >
            {TRANSFORMATION_PAIRS.map((pair, idx) => {
              const CIcon = pair.challenge.icon;
              const SIcon = pair.solution.icon;

              return (
                <div
                  key={`mobile-${pair.id}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '16px',
                    borderRadius: '20px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65)',
                  }}
                >
                  {/* Challenge Capsule */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '16px',
                      background: 'rgba(244, 63, 94, 0.12)',
                      border: '1px solid rgba(244, 63, 94, 0.35)',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#F43F5E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <CIcon size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.80rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {pair.challenge.title}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>
                        {pair.challenge.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#22D3EE',
                      fontSize: '0.70rem',
                      fontWeight: 600,
                      gap: '6px',
                    }}
                  >
                    <Sparkles size={12} color="#A855F7" />
                    <span>Vedika AI Transforms</span>
                    <Sparkles size={12} color="#22D3EE" />
                  </div>

                  {/* Solution Capsule */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      borderRadius: '16px',
                      background: 'rgba(34, 211, 238, 0.12)',
                      border: '1px solid rgba(34, 211, 238, 0.35)',
                    }}
                  >
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#22D3EE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <SIcon size={16} color="#FFFFFF" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.80rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {pair.solution.title}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: '#94A3B8' }}>
                        {pair.solution.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spinClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinCounterClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes badgeFloat {
          0% {
            transform: translate(-50%, -50%) translateY(-3px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(3px);
          }
        }

        .flowing-stream-inward {
          animation: dashFlowInward 1.8s linear infinite;
        }

        .flowing-stream-outward {
          animation: dashFlowOutward 1.8s linear infinite;
        }

        @keyframes dashFlowInward {
          from {
            stroke-dashoffset: 44;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes dashFlowOutward {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -44;
          }
        }
      `}</style>
    </section>
  );
}
