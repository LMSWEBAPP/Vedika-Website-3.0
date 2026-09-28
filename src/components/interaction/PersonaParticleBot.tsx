'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

// Global coordinate cache for instant 0ms revisits
const TARGET_CACHE = new Map<string, { targetWidth: number; targetHeight: number; targets: any[] }>();

interface PersonaParticleBotProps {
  src?: string;
  width?: number;
  height?: number;
  colorMode?: string;
  className?: string;
  particleStep?: number;
}

interface Particle {
  pindex: number;
  relX: number;
  relY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseR: number;
  baseG: number;
  baseB: number;
}

export default function PersonaParticleBot({
  src = '/assets/human-student.png',
  width = 280,
  height = 350,
  className = '',
  particleStep = 1.5,
}: PersonaParticleBotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setIsLoaded] = useState(false);

  // Mouse coordinate refs in canvas pixels
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current = {
      x: -9999,
      y: -9999,
      active: false,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let isInitialized = false;

    let targetWidth = width;
    let targetHeight = height;

    let canvasWidth = width;
    let canvasHeight = height;
    let dpr = 1;

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

    const img = new Image();
    img.crossOrigin = 'anonymous';

    function sampleFromImage(sourceImg: HTMLImageElement) {
      updateCanvasSize();
      const step = particleStep || 2.05;
      const imageSrc = sourceImg?.currentSrc || sourceImg?.src || src;
      const cacheKey = `${imageSrc}_${width}_${height}_s${step}_v11_particles`;

      if (TARGET_CACHE.has(cacheKey)) {
        const cached = TARGET_CACHE.get(cacheKey)!;
        targetWidth = cached.targetWidth;
        targetHeight = cached.targetHeight;
        return cached.targets;
      }

      const naturalW = sourceImg?.naturalWidth || 400;
      const naturalH = sourceImg?.naturalHeight || 400;
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
      const targets: any[] = [];

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (Math.floor(y) * sampleW + Math.floor(x)) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          if (a < 35) continue;

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);

          if (luminance < 10 && maxC < 14) continue;
          if (luminance > 248 && maxC - minC < 8 && a > 240) continue;

          const avg = (r + g + b) / 3;
          const satFactor = 1.40;
          let cr = avg + (r - avg) * satFactor;
          let cg = avg + (g - avg) * satFactor;
          let cb = avg + (b - avg) * satFactor;

          const brightFactor = 1.22;
          cr *= brightFactor;
          cg *= brightFactor;
          cb *= brightFactor;

          let baseR = Math.min(255, Math.max(0, Math.round(cr)));
          let baseG = Math.min(255, Math.max(0, Math.round(cg)));
          let baseB = Math.min(255, Math.max(0, Math.round(cb)));

          const lum = 0.299 * baseR + 0.587 * baseG + 0.114 * baseB;
          if (lum < 48) {
            const lift = 48 - lum;
            baseR = Math.min(255, Math.round(baseR + lift * 0.72));
            baseG = Math.min(255, Math.round(baseG + lift * 0.72));
            baseB = Math.min(255, Math.round(baseB + lift * 0.92));
          }

          const pRadius = 1.05;
          const relX = x * scaleX;
          const relY = y * scaleY;

          targets.push({
            relX,
            relY,
            radius: pRadius,
            baseR,
            baseG,
            baseB,
          });
        }
      }

      TARGET_CACHE.set(cacheKey, { targetWidth, targetHeight, targets });
      return targets;
    }

    function initParticles() {
      const targets = sampleFromImage(img);
      if (!targets || targets.length === 0) return;

      const robotX = (canvasWidth - targetWidth) / 2;
      const robotY = (canvasHeight - targetHeight) / 2;

      const newParticles: Particle[] = [];
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        const startX = robotX + t.relX;
        const startY = robotY + t.relY;
        newParticles.push({
          pindex: i,
          relX: t.relX,
          relY: t.relY,
          x: startX,
          y: startY,
          vx: 0,
          vy: 0,
          radius: t.radius,
          baseR: t.baseR,
          baseG: t.baseG,
          baseB: t.baseB,
        });
      }

      particles = newParticles;
      isInitialized = true;
      setIsLoaded(true);
    }

    img.onload = () => {
      if (!isMounted) return;
      initParticles();
    };
    img.src = src;

    // Interactive Hover Physics + Hologram Render Loop
    const render = () => {
      if (!isMounted) return;
      time += 0.022;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (isInitialized && particles.length > 0) {
        const robotX = (canvasWidth - targetWidth) / 2;
        const robotY = (canvasHeight - targetHeight) / 2;
        const breathY = Math.sin(time * 1.1) * 1.4;

        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        const isMouseActive = mousePosRef.current.active;
        const repelRadius = 60;
        const repelRadiusSq = repelRadius * repelRadius;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // 1. Interactive hover dispersion physics
          if (isMouseActive) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const distSq = dx * dx + dy * dy;

            if (distSq < repelRadiusSq && distSq > 0.1) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / repelRadius) * 5.5;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * force;
              p.vy += Math.sin(angle) * force;
            }
          }

          // 2. Elastic spring return to target home position
          const homeX = robotX + p.relX;
          const homeY = robotY + p.relY + breathY;

          p.vx += (homeX - p.x) * 0.14;
          p.vy += (homeY - p.y) * 0.14;
          p.vx *= 0.80;
          p.vy *= 0.80;

          p.x += p.vx;
          p.y += p.vy;

          // 3. Delicate starlight optical shimmer
          const alpha = 0.85 + Math.sin(time * 2.2 + p.pindex * 0.32) * 0.15;

          ctx.fillStyle = `rgba(${p.baseR}, ${p.baseG}, ${p.baseB}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, 6.28318);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
    };
  }, [src, width, height, particleStep]);

  return (
    <div
      ref={containerRef}
      className={`persona-bot-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'pointer',
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
