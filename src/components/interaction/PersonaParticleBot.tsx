'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * TouchTexture
 * Off-screen trail canvas implementation from Bruno Imbrizi (interactive-particles).
 * Maintains a fading history of cursor positions drawn with soft radial gradients
 * and easeOutSine easing.
 */
class TouchTexture {
  size: number;
  maxAge: number;
  radius: number;
  trail: { x: number; y: number; age: number; force: number }[];
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;

  constructor(size = 64, maxAge = 75, radius = 0.22) {
    this.size = size;
    this.maxAge = maxAge;
    this.radius = radius;
    this.trail = [];

    if (typeof document !== 'undefined') {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
      this.clear();
    } else {
      this.canvas = null;
      this.ctx = null;
    }
  }

  clear() {
    if (!this.ctx) return;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.size, this.size);
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0.4;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(Math.max(dd * 10000, 0.4), 1.0);
    }
    this.trail.push({
      x: point.x,
      y: point.y,
      age: 0,
      force,
    });
  }

  update() {
    this.clear();
    if (!this.ctx) return;

    for (let i = this.trail.length - 1; i >= 0; i--) {
      const p = this.trail[i];
      p.age++;
      if (p.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    }

    for (let i = 0; i < this.trail.length; i++) {
      this.drawTouch(this.trail[i]);
    }
  }

  drawTouch(point: { x: number; y: number; age: number; force: number }) {
    if (!this.ctx) return;
    const posX = point.x * this.size;
    const posY = point.y * this.size;

    let intensity = 1;
    const ramp = this.maxAge * 0.28;
    if (point.age < ramp) {
      intensity = Math.sin((point.age / ramp) * (Math.PI / 2));
    } else {
      const fadeProgress = (point.age - ramp) / (this.maxAge * 0.72);
      intensity = Math.sin((1 - Math.min(1, fadeProgress)) * (Math.PI / 2));
    }

    intensity *= point.force;
    const radius = this.size * this.radius * intensity;
    if (radius <= 0.4) return;

    const grd = this.ctx.createRadialGradient(
      posX, posY, radius * 0.15,
      posX, posY, radius
    );
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0.0)');

    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  getImageData(): Uint8ClampedArray | null {
    if (!this.ctx) return null;
    return this.ctx.getImageData(0, 0, this.size, this.size).data;
  }
}

// Global target cache for instant 0ms revisits
const TARGET_CACHE = new Map<string, { targetWidth: number; targetHeight: number; targets: any[] }>();

interface PersonaParticleBotProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  particleStep?: number;
}

interface Particle {
  pindex: number;
  relX: number;
  relY: number;
  angle: number;
  rnd: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  baseR: number;
  baseG: number;
  baseB: number;
  floatPower: number;
  seed: number;
}

export default function PersonaParticleBot({
  src = '/assets/human-student.png',
  width = 270,
  height = 335,
  className = '',
  particleStep = 2.05,
}: PersonaParticleBotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setIsLoaded] = useState(false);

  const touchTextureRef = useRef<TouchTexture | null>(null);

  if (!touchTextureRef.current && typeof window !== 'undefined') {
    touchTextureRef.current = new TouchTexture(64, 75, 0.22);
  }

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !touchTextureRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const uvX = mouseX / rect.width;
    const uvY = mouseY / rect.height;

    if (uvX >= -0.15 && uvX <= 1.15 && uvY >= -0.15 && uvY <= 1.15) {
      touchTextureRef.current.addTouch({ x: uvX, y: uvY });
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !touchTextureRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const uvX = (e.clientX - rect.left) / rect.width;
    const uvY = (e.clientY - rect.top) / rect.height;
    if (uvX >= 0 && uvX <= 1 && uvY >= 0 && uvY <= 1) {
      touchTextureRef.current.addTouch({ x: uvX, y: uvY });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const touchTexture = touchTextureRef.current;
    if (!canvas || !container || !touchTexture) return;

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
    const PERSPECTIVE_FOV = 420;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    function sampleFromImage(sourceImg: HTMLImageElement) {
      updateCanvasSize();
      const step = particleStep || 2.05;
      const imageSrc = sourceImg?.currentSrc || sourceImg?.src || src;
      const cacheKey = `${imageSrc}_${width}_${height}_s${step}_v12`;

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

          // Pure, saturated, prominent color tuning
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
        const angle = Math.random() * Math.PI * 2;
        const rnd = 0.6 + Math.random() * 1.4;

        newParticles.push({
          pindex: i,
          relX: t.relX,
          relY: t.relY,
          angle,
          rnd,
          x: startX,
          y: startY,
          z: 0,
          vx: 0,
          vy: 0,
          vz: 0,
          radius: t.radius,
          baseR: t.baseR,
          baseG: t.baseG,
          baseB: t.baseB,
          floatPower: 14.0 + Math.random() * 6.0,
          seed: Math.random() * 1000,
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

    // Bruno Imbrizi Interactive Particles Render Loop
    const render = () => {
      if (!isMounted) return;
      time += 0.020;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update TouchTexture trail
      touchTexture.update();
      const touchData = touchTexture.getImageData();

      if (isInitialized && particles.length > 0) {
        const robotX = (canvasWidth - targetWidth) / 2;
        const robotY = (canvasHeight - targetHeight) / 2;
        const centerX = robotX + targetWidth / 2;
        const centerY = robotY + targetHeight / 2;
        const breathY = Math.sin(time * 1.1) * 1.4;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // 1. Sample brightness t from TouchTexture at particle's normalized UV
          let t = 0;
          if (touchData) {
            const u = p.relX / targetWidth;
            const v = p.relY / targetHeight;
            const tx = Math.max(0, Math.min(63, (u * 63) | 0));
            const ty = Math.max(0, Math.min(63, (v * 63) | 0));
            t = touchData[(ty * 64 + tx) * 4] / 255;
          }

          // 2. Harmonic Simplex Oscillation along intrinsic angle
          const noise = Math.sin(time * 1.6 + p.pindex * 0.12) * Math.cos(time * 0.9 + p.seed * 0.1);
          const rndz = p.rnd + noise * 0.55;

          let dispX = 0;
          let dispY = 0;
          let dispZ = 0;

          if (t > 0.005) {
            const floatAmount = t * p.floatPower * rndz;
            dispX = Math.cos(p.angle) * floatAmount;
            dispY = Math.sin(p.angle) * floatAmount;
            dispZ = -t * 36.0 * Math.abs(rndz);
          }

          // 3. Elastic Spring Physics toward target coordinates
          const targetX = robotX + p.relX + dispX;
          const targetY = robotY + p.relY + breathY + dispY;
          const targetZ = dispZ;

          p.vx += (targetX - p.x) * 0.14;
          p.vy += (targetY - p.y) * 0.14;
          p.vz += (targetZ - p.z) * 0.14;

          p.vx *= 0.80;
          p.vy *= 0.80;
          p.vz *= 0.80;

          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // 4. Perspective Projection for genuine 3D holographic depth
          const scale = PERSPECTIVE_FOV / (PERSPECTIVE_FOV + p.z);
          const screenX = centerX + (p.x - centerX) * scale;
          const screenY = centerY + (p.y - centerY) * scale;
          const renderRadius = Math.max(0.5, p.radius * scale);

          // 5. Delicate starlight optical shimmer
          const alpha = 0.85 + Math.sin(time * 2.2 + p.pindex * 0.32) * 0.15;

          ctx.fillStyle = `rgba(${p.baseR}, ${p.baseG}, ${p.baseB}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, renderRadius, 0, 6.28318);
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
      onMouseMove={handlePointerMove}
      onClick={handleClick}
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
