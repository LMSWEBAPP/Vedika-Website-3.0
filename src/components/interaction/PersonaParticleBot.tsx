'use client';

import React, { useEffect, useRef, useState } from 'react';

// Global coordinate cache for instant 0ms revisits across tab switches
const TARGET_CACHE = new Map<string, { targetWidth: number; targetHeight: number; targets: any[] }>();

interface PersonaParticleBotProps {
  src?: string;
  width?: number;
  height?: number;
  colorMode?: string;
  className?: string;
  particleStep?: number;
}

interface ParticleTarget {
  relX: number;
  relY: number;
  radius: number;
  baseR: number;
  baseG: number;
  baseB: number;
  baseAlpha: number;
  isHighlight: boolean;
  jitter: number;
  twinklePhase: number;
  floatSpeed: number;
}

interface AmbientMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  phase: number;
  color: string;
}

export default function PersonaParticleBot({
  src = '/assets/human-student.png',
  width = 270,
  height = 335,
  className = '',
  particleStep = 2.75,
}: PersonaParticleBotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: ParticleTarget[] = [];
    let ambientMotes: AmbientMote[] = [];
    let isInitialized = false;

    let targetWidth = width;
    let targetHeight = height;

    let canvasWidth = width;
    let canvasHeight = height;
    let dpr = 1;

    // Mouse tracking for subtle interactive holographic reaction
    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      isHovering = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const updateCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasWidth = width;
      canvasHeight = height;
      canvas.width = Math.floor(canvasWidth * dpr);
      canvas.height = Math.floor(canvasHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    let isMounted = true;
    let time = 0;

    // Initialize 36 ambient cosmic stardust motes that drift around the avatar
    const colors = [
      'rgba(168, 85, 247, ', // purple
      'rgba(56, 189, 248, ', // sky cyan
      'rgba(244, 63, 94, ',  // rose
      'rgba(255, 255, 255, ', // white star
    ];

    ambientMotes = Array.from({ length: 36 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.2 - Math.random() * 0.35, // gentle upward cosmic drift
      size: 0.75 + Math.random() * 1.1,
      baseAlpha: 0.25 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      color: colors[i % colors.length],
    }));

    const img = new Image();
    img.crossOrigin = 'anonymous';

    function sampleFromImage(sourceImg: HTMLImageElement): ParticleTarget[] | null {
      updateCanvasSize();

      // Step of ~2.75px with 0.8px-1.15px radius creates clearly distinct, beautifully separated starlight particles
      const step = particleStep || 2.75;
      const imageSrc = sourceImg?.currentSrc || sourceImg?.src || src;
      const cacheKey = `${imageSrc}_${width}_${height}_s${step}_v12_starlight`;

      if (TARGET_CACHE.has(cacheKey)) {
        const cached = TARGET_CACHE.get(cacheKey)!;
        targetWidth = cached.targetWidth;
        targetHeight = cached.targetHeight;
        return cached.targets;
      }

      const naturalW = sourceImg?.naturalWidth || 448;
      const naturalH = sourceImg?.naturalHeight || 600;
      if (!naturalW || !naturalH) return null;

      const aspect = naturalW / naturalH;
      targetHeight = Math.max(10, Math.floor(height * 0.94));
      targetWidth = Math.max(10, Math.floor(targetHeight * aspect));
      if (targetWidth > width * 0.96) {
        targetWidth = Math.max(10, Math.floor(width * 0.96));
        targetHeight = Math.max(10, Math.floor(targetWidth / aspect));
      }

      const sampleW = targetWidth;
      const sampleH = targetHeight;

      const offscreen = document.createElement('canvas');
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return null;

      offCtx.drawImage(sourceImg, 0, 0, sampleW, sampleH);

      let imgData: ImageData | null = null;
      try {
        imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
      } catch (err) {
        console.warn('PersonaParticleBot: getImageData skipped', err);
        return null;
      }
      if (!imgData || !imgData.data) return null;

      const data = imgData.data;
      const scaleX = targetWidth / sampleW;
      const scaleY = targetHeight / sampleH;
      const targets: ParticleTarget[] = [];

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (Math.floor(y) * sampleW + Math.floor(x)) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Discard alpha transparent pixels
          if (a < 35) continue;

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);

          // Discard pure black background or edge artifacts
          if (luminance < 10 && maxC < 14) continue;
          // Discard pure solid white background padding
          if (luminance > 248 && maxC - minC < 8 && a > 240) continue;

          // Vibrant, saturated, futuristic color grading
          const avg = (r + g + b) / 3;
          const satFactor = 1.36;
          let cr = avg + (r - avg) * satFactor;
          let cg = avg + (g - avg) * satFactor;
          let cb = avg + (b - avg) * satFactor;

          const brightFactor = 1.20;
          cr *= brightFactor;
          cg *= brightFactor;
          cb *= brightFactor;

          let baseR = Math.min(255, Math.max(0, Math.round(cr)));
          let baseG = Math.min(255, Math.max(0, Math.round(cg)));
          let baseB = Math.min(255, Math.max(0, Math.round(cb)));

          // Lift dark shadow areas so hair silhouettes and suit folds remain distinct
          const lum = 0.299 * baseR + 0.587 * baseG + 0.114 * baseB;
          if (lum < 46) {
            const lift = 46 - lum;
            baseR = Math.min(255, Math.round(baseR + lift * 0.75));
            baseG = Math.min(255, Math.round(baseG + lift * 0.75));
            baseB = Math.min(255, Math.round(baseB + lift * 0.95));
          }

          // Varied particle radii based on luminance:
          // Bright highlights get slightly larger starlight beads (1.15px),
          // midtones get 0.95px, and deep shadows get fine 0.75px micro-points.
          // With step 2.75px, there is a visible, clean 0.85px - 1.25px gap between particles!
          let pRadius = 0.95;
          const isHighlight = lum > 165;
          if (lum > 175) {
            pRadius = 1.15;
          } else if (lum < 75) {
            pRadius = 0.75;
          }

          const relX = x * scaleX;
          const relY = y * scaleY;

          // Organic float seed and twinkle phase
          const jitter = 0.45 + ((Math.floor(x) * 17 + Math.floor(y) * 31) % 10) * 0.07; // 0.45px to 1.1px
          const twinklePhase = ((Math.floor(x) * 13 + Math.floor(y) * 23) % 100) / 100 * Math.PI * 2;
          const floatSpeed = 0.9 + ((Math.floor(x) * 7 + Math.floor(y) * 11) % 6) * 0.12;

          targets.push({
            relX,
            relY,
            radius: pRadius,
            baseR,
            baseG,
            baseB,
            baseAlpha: Math.min(1, Math.max(0.65, a / 255)),
            isHighlight,
            jitter,
            twinklePhase,
            floatSpeed,
          });
        }
      }

      TARGET_CACHE.set(cacheKey, { targetWidth, targetHeight, targets });
      return targets;
    }

    function initParticles() {
      const targets = sampleFromImage(img);
      if (!targets || targets.length === 0) return;

      particles = targets;
      isInitialized = true;
      setIsLoaded(true);
    }

    img.onload = () => {
      if (!isMounted) return;
      initParticles();
    };
    img.src = src;

    // =========================================================================
    // Holographic Celestial Particle Avatar Render Loop:
    // - Distinct, visible circular particles with clean cosmic spacing
    // - Micro-float vibration / organic living swarm physics
    // - Twinkling starlight scintillation
    // - Holographic energy sweep wave (vertical scanning glow)
    // - Ambient drifting stardust motes around avatar
    // =========================================================================
    const render = () => {
      if (!isMounted) return;
      time += 0.024;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // 1. Render ambient drifting cosmic motes
      for (let i = 0; i < ambientMotes.length; i++) {
        const m = ambientMotes[i];
        m.x += m.vx;
        m.y += m.vy;

        if (m.y < -10) m.y = canvasHeight + 10;
        if (m.y > canvasHeight + 10) m.y = -10;
        if (m.x < -10) m.x = canvasWidth + 10;
        if (m.x > canvasWidth + 10) m.x = -10;

        const mTwinkle = 0.45 + 0.55 * Math.sin(time * 2.0 + m.phase);
        const mAlpha = Math.max(0.1, m.baseAlpha * mTwinkle);

        ctx.fillStyle = `${m.color}${mAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, 6.28318);
        ctx.fill();
      }

      // 2. Render Body Particles
      if (isInitialized && particles.length > 0) {
        const robotX = (canvasWidth - targetWidth) / 2;
        const robotY = (canvasHeight - targetHeight) / 2;

        // Whole-figure subtle organic breathing motion
        const breathY = Math.sin(time * 1.1) * 1.6;

        // Smooth vertical holographic scanline wave (period ~3.8s)
        const scanProgress = Math.sin(time * 0.95) * 0.5 + 0.5;
        const scanY = scanProgress * targetHeight;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Micro-float oscillation gives genuine particle cloud life
          const floatX = Math.sin(time * p.floatSpeed + p.twinklePhase) * p.jitter;
          const floatY = Math.cos(time * p.floatSpeed * 1.1 + p.twinklePhase) * p.jitter;

          let px = robotX + p.relX + floatX;
          let py = robotY + p.relY + breathY + floatY;

          // Interactive subtle mouse repulsion/magnetic ripple
          if (isHovering) {
            const dx = px - mouseX;
            const dy = py - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 42 && dist > 0.01) {
              const force = (1 - dist / 42) * 2.8;
              px += (dx / dist) * force;
              py += (dy / dist) * force;
            }
          }

          // Twinkling starlight alpha
          const twinkle = 0.65 + 0.35 * Math.sin(time * 2.4 + p.twinklePhase);

          // Holographic scan wave energy pulse
          const distToScan = Math.abs(p.relY - scanY);
          let scanGlow = 0;
          if (distToScan < 22) {
            scanGlow = (1 - distToScan / 22) * 0.42;
          }

          // Color calculation with scan wave boost
          const r = Math.min(255, Math.round(p.baseR + scanGlow * 65));
          const g = Math.min(255, Math.round(p.baseG + scanGlow * 75));
          const b = Math.min(255, Math.round(p.baseB + scanGlow * 105));
          const alpha = Math.min(1, Math.max(0.3, p.baseAlpha * twinkle + scanGlow * 0.35));

          // Soft starlight halo for highlights or when illuminated by holographic scan wave
          if (p.isHighlight || scanGlow > 0.18) {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.26).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(px, py, p.radius * 2.2, 0, 6.28318);
            ctx.fill();
          }

          // Crisp circular starlight particle point
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, 6.28318);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [src, width, height, particleStep]);

  return (
    <div
      ref={containerRef}
      className={`persona-bot-container ${className}`}
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
