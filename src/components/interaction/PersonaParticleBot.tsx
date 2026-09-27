'use client';

import React, { useEffect, useRef, useState } from 'react';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: any[] = [];
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
      // Ultra-tight 1.15px step with 1.95px particles = 100% gapless, dense, solid starlight mosaic
      const step = particleStep || 1.15;
      const imageSrc = sourceImg?.currentSrc || sourceImg?.src || src;
      const cacheKey = `${imageSrc}_${width}_${height}_s${step}_v8_gapless`;

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

          // Discard alpha transparent pixels
          if (a < 35) continue;

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);

          // Discard pure black background or edge artifacts
          if (luminance < 10 && maxC < 14) continue;
          // Discard pure solid white background padding
          if (luminance > 248 && maxC - minC < 8 && a > 240) continue;

          // Pure, saturated, prominent color tuning
          const avg = (r + g + b) / 3;
          const satFactor = 1.45;
          let cr = avg + (r - avg) * satFactor;
          let cg = avg + (g - avg) * satFactor;
          let cb = avg + (b - avg) * satFactor;

          const brightFactor = 1.25;
          cr *= brightFactor;
          cg *= brightFactor;
          cb *= brightFactor;

          let baseR = Math.min(255, Math.max(0, Math.round(cr)));
          let baseG = Math.min(255, Math.max(0, Math.round(cg)));
          let baseB = Math.min(255, Math.max(0, Math.round(cb)));

          // Lift dark shadow areas so hair and clothing silhouettes are visibly clear
          const lum = 0.299 * baseR + 0.587 * baseG + 0.114 * baseB;
          if (lum < 52) {
            const lift = 52 - lum;
            baseR = Math.min(255, Math.round(baseR + lift * 0.72));
            baseG = Math.min(255, Math.round(baseG + lift * 0.72));
            baseB = Math.min(255, Math.round(baseB + lift * 0.92));
          }

          // 1.95px particle size with 1.15px step ensures 100% gap-free, seamless, solid starlight coverage
          const pSize = 1.95;

          const relX = x * scaleX;
          const relY = y * scaleY;

          targets.push({
            relX,
            relY,
            size: pSize,
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

      const newParticles: any[] = [];
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        newParticles.push({
          pindex: i,
          relX: t.relX,
          relY: t.relY,
          size: t.size,
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

    // Classy, stable render loop:
    // - NO erratic individual particle jitter
    // - NO mouse hover scattering (stays 100% stable on hover per user request)
    // - Subtle organic character breathing
    const render = () => {
      if (!isMounted) return;
      time += 0.022;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (isInitialized && particles.length > 0) {
        const robotX = (canvasWidth - targetWidth) / 2;
        const robotY = (canvasHeight - targetHeight) / 2;

        // Subtle organic breathing motion for the entire figure
        const breathY = Math.sin(time * 1.1) * 1.4;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const px = robotX + p.relX;
          const py = robotY + p.relY + breathY;

          // Pure solid color fill with zero gaps
          ctx.fillStyle = `rgb(${p.baseR}, ${p.baseG}, ${p.baseB})`;
          ctx.fillRect(px, py, p.size, p.size);
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
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
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
