'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import '@/styles/knowledge-waves.css';

interface WaveConfig {
  id: string;
  name: string;
  gradientId: string;
  coreColor: string;
  strokeColor: string;
  auraColor: string;
  baseOffset: number; // Vertical offset relative to corridor center
  amplitude: number;  // Elegant low-to-medium wave height
  speed: number;      // Calm, slow flow speed (left to right)
  phase: number;      // Subtle phase offset (waves stay related, few crossings)
  bodyWidth: number;  // Soft ribbon body width
  auraWidth: number;  // Wide atmospheric aura width
  auraOpacity: number;
  bodyOpacity: number;
}

const WAVES: WaveConfig[] = [
  // ── Wave 0: Luminous Electric Cyan ──
  {
    id: 'wave-cyan',
    name: 'Electric Cyan',
    gradientId: 'grad-cyan',
    coreColor: '#E0F7FA',
    strokeColor: '#22D3EE',
    auraColor: '#06B6D4',
    baseOffset: -8,
    amplitude: 104,
    speed: 0.65,
    phase: -0.04,
    bodyWidth: 24,
    auraWidth: 60,
    auraOpacity: 0.18,
    bodyOpacity: 0.35,
  },
  // ── Wave 1: Royal Violet Stream ──
  {
    id: 'wave-violet',
    name: 'Royal Violet',
    gradientId: 'grad-violet',
    coreColor: '#EDE9FE',
    strokeColor: '#8B5CF6',
    auraColor: '#7C3AED',
    baseOffset: 8,
    amplitude: 100,
    speed: 0.65,
    phase: 0.04,
    bodyWidth: 26,
    auraWidth: 64,
    auraOpacity: 0.16,
    bodyOpacity: 0.33,
  },
  // ── Wave 2: Electric Sky Blue ──
  {
    id: 'wave-blue',
    name: 'Electric Sky Blue',
    gradientId: 'grad-blue',
    coreColor: '#F0F9FF',
    strokeColor: '#38BDF8',
    auraColor: '#0284C7',
    baseOffset: -4,
    amplitude: 108,
    speed: 0.65,
    phase: -0.02,
    bodyWidth: 22,
    auraWidth: 56,
    auraOpacity: 0.17,
    bodyOpacity: 0.38,
  },
  // ── Wave 3: Celestial Teal / Aquamarine ──
  {
    id: 'wave-teal',
    name: 'Celestial Teal',
    gradientId: 'grad-teal',
    coreColor: '#F0FDFA',
    strokeColor: '#2DD4BF',
    auraColor: '#0D9488',
    baseOffset: 12,
    amplitude: 96,
    speed: 0.65,
    phase: 0.02,
    bodyWidth: 22,
    auraWidth: 54,
    auraOpacity: 0.15,
    bodyOpacity: 0.32,
  },
  // ── Wave 4: Cosmic Magenta / Subtle Pink ──
  {
    id: 'wave-pink',
    name: 'Cosmic Magenta',
    gradientId: 'grad-pink',
    coreColor: '#FDF2F8',
    strokeColor: '#EC4899',
    auraColor: '#DB2777',
    baseOffset: 4,
    amplitude: 102,
    speed: 0.65,
    phase: 0.03,
    bodyWidth: 20,
    auraWidth: 52,
    auraOpacity: 0.14,
    bodyOpacity: 0.32,
  },
  // ── Wave 5: Deep Starlight Indigo ──
  {
    id: 'wave-indigo',
    name: 'Starlight Indigo',
    gradientId: 'grad-indigo',
    coreColor: '#EEF2FF',
    strokeColor: '#6366F1',
    auraColor: '#4F46E5',
    baseOffset: -12,
    amplitude: 106,
    speed: 0.65,
    phase: -0.03,
    bodyWidth: 24,
    auraWidth: 58,
    auraOpacity: 0.16,
    bodyOpacity: 0.34,
  },
  // ── Wave 6: Celestial Ice Veil (Soft Cyan-White) ──
  {
    id: 'wave-ice',
    name: 'Celestial Ice',
    gradientId: 'grad-ice',
    coreColor: '#FFFFFF',
    strokeColor: '#E0F2FE',
    auraColor: '#38BDF8',
    baseOffset: 0,
    amplitude: 102,
    speed: 0.65,
    phase: 0.01,
    bodyWidth: 18,
    auraWidth: 50,
    auraOpacity: 0.20,
    bodyOpacity: 0.40,
  },
  // ── Wave 7: Fairy Gold / Ethereal Amber Shimmer ──
  {
    id: 'wave-gold',
    name: 'Fairy Gold',
    gradientId: 'grad-gold',
    coreColor: '#FEFCE8',
    strokeColor: '#FBBF24',
    auraColor: '#D97706',
    baseOffset: -6,
    amplitude: 94,
    speed: 0.65,
    phase: -0.01,
    bodyWidth: 18,
    auraWidth: 48,
    auraOpacity: 0.13,
    bodyOpacity: 0.30,
  },
];

interface SparkleParticle {
  waveIndex: number;
  progress: number;
  speed: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  color: string;
}

const TOTAL_PARTICLES = 36;
const FAIRY_COLORS = ['#FFFFFF', '#A5F3FC', '#E9D5FF', '#FCE7F3', '#FEF08A', '#A7F3D0'];

function createSparkles(): SparkleParticle[] {
  const list: SparkleParticle[] = [];
  for (let i = 0; i < TOTAL_PARTICLES; i++) {
    list.push({
      waveIndex: i % WAVES.length,
      progress: Math.random(),
      speed: 0.00022 + Math.random() * 0.00030,
      radius: 1.2 + Math.random() * 1.5,
      baseAlpha: 0.45 + Math.random() * 0.45,
      pulsePhase: Math.random() * Math.PI * 2,
      color: FAIRY_COLORS[i % FAIRY_COLORS.length],
    });
  }
  return list;
}

/**
 * Builds smooth cubic Bézier segments connecting an array of points using Catmull-Rom tangents.
 */
function pointsToSplinePath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 2) return '';
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function KnowledgeWaves() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollProgress } = useInteraction();

  // Layer path references for each wave
  const auraRefs = useRef<(SVGPathElement | null)[]>([]);
  const bodyRefs = useRef<(SVGPathElement | null)[]>([]);
  const spineRefs = useRef<(SVGPathElement | null)[]>([]);
  const particleRefs = useRef<(SVGCircleElement | null)[]>([]);

  const particlesDataRef = useRef<SparkleParticle[]>(createSparkles());
  const [hasStarted, setHasStarted] = useState(false);

  // Vedika settles into Page 3 position when scrollProgress is >= 1.65 and <= 2.10
  const isVedikaSettled = scrollProgress >= 1.65 && scrollProgress <= 2.10;

  useEffect(() => {
    if (isVedikaSettled && !hasStarted) {
      setHasStarted(true);
    } else if (!isVedikaSettled && hasStarted) {
      setHasStarted(false);
    }
  }, [isVedikaSettled, hasStarted]);

  // Main 60fps calm animation loop
  useEffect(() => {
    if (!hasStarted) return;

    let animId: number;
    let startTime: number | null = null;

    // ViewBox coordinate space: 1920 x 1080
    const VIEW_W = 1920;
    const VIEW_H = 1080;
    // Central horizontal corridor: 57% of 1080 = 615px (between upper icons ~470px and lower icons ~740px)
    const BASE_Y = 615;

    // Number of control points sampled along X for silky smooth interpolation
    const SAMPLES = 64;
    const X_START = -60;
    const X_END = VIEW_W + 60;
    const X_STEP = (X_END - X_START) / (SAMPLES - 1);

    // Increased wave frequency: ~3.125 full wave cycles across the 1920px screen width (3 to 4 visible crests and troughs)
    const K_BASE = (2 * Math.PI) / (VIEW_W * 0.32);

    const particles = particlesDataRef.current;

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const t = (now - startTime) * 0.001; // elapsed time in seconds

      // Store point arrays for particle positioning
      const wavePointsList: { x: number; y: number }[][] = [];

      for (let w = 0; w < WAVES.length; w++) {
        const config = WAVES[w];
        const points: { x: number; y: number }[] = [];

        // All waves share the exact same spatial wavelength so crests & troughs stay accumulated and aligned
        const k = K_BASE;
        const waveSpeed = config.speed;
        const wavePhase = config.phase;
        const amp = config.amplitude;
        const yOffset = config.baseOffset;

        // Emergence parameters: waves emerge directly from the back of Vedika (x ~ 220px to 440px)
        const VEDIKA_EMERGE_START = 220;
        const VEDIKA_EMERGE_FULL = 440;

        for (let s = 0; s < SAMPLES; s++) {
          const x = X_START + s * X_STEP;
          const normX = (x - X_START) / (X_END - X_START);

          // Envelope: 0 to the left of Vedika, easing smoothly to full height as it streams from Vedika's back
          let vedikaEnvelope = 1;
          if (x < VEDIKA_EMERGE_START) {
            vedikaEnvelope = 0;
          } else if (x < VEDIKA_EMERGE_FULL) {
            const envT = (x - VEDIKA_EMERGE_START) / (VEDIKA_EMERGE_FULL - VEDIKA_EMERGE_START);
            vedikaEnvelope = envT * envT * (3 - 2 * envT);
          }

          // 1. Unified traveling carrier wave: ALL waves peak and trough in harmony together
          const carrier = Math.sin(k * x - t * waveSpeed + wavePhase) * amp;

          // 2. Fairy & flowy silk ripples: delicate, breathing gossamer harmonics shimmering along the ribbons
          const flowy1 = Math.sin(k * 2.4 * x - t * 1.15 + w * 0.5) * 5.5;
          const flowy2 = Math.cos(k * 4.2 * x - t * 1.55 + w * 0.9) * 3.0;
          const fairyBreath = Math.sin(t * 1.4 + normX * 4.8 + w * 0.7) * 3.5;

          const y = BASE_Y + (yOffset + carrier + flowy1 + flowy2 + fairyBreath) * vedikaEnvelope;
          points.push({ x, y });
        }

        wavePointsList.push(points);
        const pathData = pointsToSplinePath(points);

        // Update DOM paths directly for 60fps performance
        const auraEl = auraRefs.current[w];
        if (auraEl) auraEl.setAttribute('d', pathData);

        const bodyEl = bodyRefs.current[w];
        if (bodyEl) bodyEl.setAttribute('d', pathData);

        const spineEl = spineRefs.current[w];
        if (spineEl) spineEl.setAttribute('d', pathData);
      }

      // Update fairy starlight dust particles floating with gentle flutter and twinkle
      for (let p = 0; p < particles.length; p++) {
        const pt = particles[p];
        pt.progress += pt.speed;
        if (pt.progress > 1) pt.progress -= 1;

        const wavePts = wavePointsList[pt.waveIndex];
        const circleEl = particleRefs.current[p];
        if (wavePts && wavePts.length > 1 && circleEl) {
          const sampleIdx = pt.progress * (wavePts.length - 1);
          const idxLow = Math.floor(sampleIdx);
          const idxHigh = Math.min(wavePts.length - 1, idxLow + 1);
          const frac = sampleIdx - idxLow;

          const px = wavePts[idxLow].x + (wavePts[idxHigh].x - wavePts[idxLow].x) * frac;
          const py = wavePts[idxLow].y + (wavePts[idxHigh].y - wavePts[idxLow].y) * frac;

          // Fairy flutter bobbing and soft twinkling
          const fairyFlutterY = Math.sin(t * 2.6 + pt.pulsePhase) * 4.5;
          const currentRadius = Math.max(0.8, pt.radius + Math.sin(t * 3.4 + pt.pulsePhase) * 0.5);

          circleEl.setAttribute('cx', px.toFixed(1));
          circleEl.setAttribute('cy', (py + fairyFlutterY).toFixed(1));
          circleEl.setAttribute('r', currentRadius.toFixed(2));

          // Fade smoothly: only visible as it streams out from behind Vedika and before right edge
          const startFade = Math.max(0, Math.min(1, (px - 260) / 160));
          const twinkle = 0.85 + Math.sin(t * 4.0 + pt.pulsePhase) * 0.15;
          const edgeFade = Math.sin(pt.progress * Math.PI) * startFade * twinkle;
          circleEl.setAttribute('opacity', (pt.baseAlpha * edgeFade).toFixed(3));
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [hasStarted]);

  return (
    <div
      ref={containerRef}
      className="vedika-knowledge-waves"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: hasStarted ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <svg
        className="vedika-knowledge-waves-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <defs>
          {/* 1. Large Subtle Atmospheric Aurora Blur */}
          <filter id="aurora-glow-heavy" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="28" result="blur" />
          </filter>

          {/* 2. Soft Translucent Ribbon Blur */}
          <filter id="ribbon-glow-soft" x="-15%" y="-80%" width="130%" height="260%">
            <feGaussianBlur stdDeviation="8" result="blur" />
          </filter>

          {/* 3. Crisp Core Line Glow */}
          <filter id="core-glow-crisp" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear Gradients: Waves emerge directly from the back of Vedika (0% to 13% transparent) */}
          <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="13%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="19%" stopColor="#06B6D4" stopOpacity="0.45" />
            <stop offset="27%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="60%" stopColor="#22D3EE" stopOpacity="1" />
            <stop offset="86%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-violet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="13%" stopColor="#6366F1" stopOpacity="0" />
            <stop offset="19%" stopColor="#7C3AED" stopOpacity="0.4" />
            <stop offset="27%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="86%" stopColor="#A855F7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0" />
            <stop offset="13%" stopColor="#0284C7" stopOpacity="0" />
            <stop offset="19%" stopColor="#0284C7" stopOpacity="0.45" />
            <stop offset="27%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="86%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DB2777" stopOpacity="0" />
            <stop offset="13%" stopColor="#DB2777" stopOpacity="0" />
            <stop offset="19%" stopColor="#DB2777" stopOpacity="0.4" />
            <stop offset="27%" stopColor="#EC4899" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#EC4899" stopOpacity="0.95" />
            <stop offset="86%" stopColor="#F472B6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-ice" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="13%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="19%" stopColor="#BAE6FD" stopOpacity="0.45" />
            <stop offset="27%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="86%" stopColor="#E0F2FE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0" />
            <stop offset="13%" stopColor="#0D9488" stopOpacity="0" />
            <stop offset="19%" stopColor="#0D9488" stopOpacity="0.4" />
            <stop offset="27%" stopColor="#2DD4BF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#2DD4BF" stopOpacity="0.95" />
            <stop offset="86%" stopColor="#5EEAD4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="13%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="19%" stopColor="#4F46E5" stopOpacity="0.4" />
            <stop offset="27%" stopColor="#6366F1" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#6366F1" stopOpacity="0.95" />
            <stop offset="86%" stopColor="#818CF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0" />
            <stop offset="13%" stopColor="#D97706" stopOpacity="0" />
            <stop offset="19%" stopColor="#D97706" stopOpacity="0.35" />
            <stop offset="27%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="86%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </linearGradient>

          {/* Thin Bright Core Line Gradient: Emerges right from behind Vedika */}
          <linearGradient id="grad-core-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="13%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="19%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="27%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="86%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── LAYER 1: Large Extremely Subtle Atmospheric Aura (Fades smoothly into black) ── */}
        <g className="wave-layer-aura" style={{ pointerEvents: 'none' }}>
          {WAVES.map((w, idx) => (
            <path
              key={`aura-${w.id}`}
              ref={(el) => {
                auraRefs.current[idx] = el;
              }}
              fill="none"
              stroke={`url(#${w.gradientId})`}
              strokeWidth={w.auraWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={w.auraOpacity}
              filter="url(#aurora-glow-heavy)"
              style={{ mixBlendMode: 'screen' }}
            />
          ))}
        </g>

        {/* ── LAYER 2: Soft Translucent Colored Ribbon Body Around Core ── */}
        <g className="wave-layer-body" style={{ pointerEvents: 'none' }}>
          {WAVES.map((w, idx) => (
            <path
              key={`body-${w.id}`}
              ref={(el) => {
                bodyRefs.current[idx] = el;
              }}
              fill="none"
              stroke={`url(#${w.gradientId})`}
              strokeWidth={w.bodyWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={w.bodyOpacity}
              filter="url(#ribbon-glow-soft)"
              style={{ mixBlendMode: 'screen' }}
            />
          ))}
        </g>

        {/* ── LAYER 3: Thin Bright Core Line (Sharp Luminous Filament emerging from back of Vedika) ── */}
        <g className="wave-layer-core" style={{ pointerEvents: 'none' }}>
          {WAVES.map((w, idx) => (
            <path
              key={`core-${w.id}`}
              ref={(el) => {
                spineRefs.current[idx] = el;
              }}
              fill="none"
              stroke="url(#grad-core-line)"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.92}
              filter="url(#core-glow-crisp)"
              style={{ mixBlendMode: 'screen' }}
            />
          ))}
        </g>

        {/* ── LAYER 4: Soft Starlight Data-Stream Pearls ── */}
        <g className="wave-layer-particles" style={{ pointerEvents: 'none' }}>
          {particlesDataRef.current.map((_, idx) => (
            <circle
              key={`sparkle-${idx}`}
              ref={(el) => {
                particleRefs.current[idx] = el;
              }}
              r={1.8}
              fill="#FFFFFF"
              filter="url(#core-glow-crisp)"
              style={{ mixBlendMode: 'screen' }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
export default KnowledgeWaves;
