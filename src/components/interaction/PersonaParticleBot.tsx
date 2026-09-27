'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * TouchTexture:
 * Off-screen trail canvas implementation from Bruno Imbrizi (interactive-particles).
 * Maintains a fading history of cursor positions drawn with soft radial gradients
 * and easeOutSine easing.
 */
class TouchTexture {
  size: number;
  maxAge: number;
  radius: number;
  trail: Array<{ x: number; y: number; age: number; force: number }>;
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
      posX,
      posY,
      radius * 0.15,
      posX,
      posY,
      radius
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

// Global target coordinate cache for zero latency on revisits
const TARGET_CACHE = new Map<string, { targetWidth: number; targetHeight: number; targets: any[] }>();

interface PersonaParticleBotProps {
  src?: string;
  width?: number;
  height?: number;
  colorMode?: 'purple' | 'cosmic-purple' | 'golden' | 'emerald-green' | 'green' | 'vibrant' | string;
  className?: string;
  inline?: boolean;
  particleStep?: number;
}

export default function PersonaParticleBot({
  src = '/assets/vedika-bot-school.png',
  width = 240,
  height = 320,
  colorMode = 'cosmic-purple',
  className = '',
  inline = true,
  particleStep = 2,
}: PersonaParticleBotProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    let particles: any[] = [];
    let isInitialized = false;

    let targetWidth = 240;
    let targetHeight = 320;

    const touchTexture = new TouchTexture(64, 75, 0.24);

    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      isHovered: false,
    };

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
      const step = particleStep || 2;
      const imageSrc = sourceImg?.currentSrc || sourceImg?.src || src;
      const cacheKey = `${imageSrc}_${width}_${height}_${colorMode}_s${step}_v2`;

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
      const sizeFactor = 0.98;

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (y * sampleW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Discard alpha transparent pixels
          if (a < 45) continue;

          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          const maxC = Math.max(r, g, b);
          const minC = Math.min(r, g, b);
          const alphaNorm = a / 255;

          // Discard near-black background
          if (luminance < 14 && maxC < 20) continue;
          // Discard pure solid white background padding
          if (luminance > 248 && maxC - minC < 12 && a > 240) continue;

          let pSize = 1.9 * sizeFactor;
          let baseR = r;
          let baseG = g;
          let baseB = b;
          let baseAlpha = 1.0;

          const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;

          if (colorMode === 'purple' || colorMode === 'cosmic-purple') {
            if ((luminance > 170 && saturation < 0.26) || luminance > 215) {
              baseR = 255;
              baseG = 255;
              baseB = 255;
              baseAlpha = 1.0;
              pSize = 2.1 * sizeFactor;
            } else if (luminance < 115 && ((b > 35 && b > g + 8) || (r > 25 && b > 40) || luminance < 65)) {
              baseR = 35;
              baseG = 15;
              baseB = 75;
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if ((b > 115 && b > g + 20) || saturation > 0.18) {
              baseR = Math.min(255, Math.round(r * 1.25));
              baseG = Math.min(255, Math.round(g * 1.05));
              baseB = Math.min(255, Math.round(b * 1.30));
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if (luminance > 75) {
              baseR = Math.min(255, Math.round(r * 1.10));
              baseG = Math.min(255, Math.round(g * 1.05));
              baseB = Math.min(255, Math.round(b * 1.20));
              baseAlpha = Math.min(0.96, Math.max(0.85, alphaNorm * 0.95));
              pSize = 1.85 * sizeFactor;
            } else {
              baseR = Math.max(45, Math.round(r * 0.9));
              baseG = Math.max(20, Math.round(g * 0.8));
              baseB = Math.max(80, Math.round(b * 1.05));
              baseAlpha = Math.min(0.88, Math.max(0.70, alphaNorm * 0.85));
              pSize = 1.7 * sizeFactor;
            }
          } else if (colorMode === 'golden' || colorMode === 'gold') {
            if ((luminance > 175 && saturation < 0.28) || luminance > 215) {
              baseR = 255;
              baseG = 255;
              baseB = 255;
              baseAlpha = 1.0;
              pSize = 2.1 * sizeFactor;
            } else if (luminance < 115 && (saturation < 0.35 || luminance < 60)) {
              baseR = 25;
              baseG = 20;
              baseB = 10;
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if (saturation > 0.20 || maxC > 140) {
              baseR = Math.min(255, Math.round(r * 1.25 + 15));
              baseG = Math.min(255, Math.round(g * 1.15 + 10));
              baseB = Math.max(0, Math.round(b * 0.8));
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if (luminance > 70) {
              baseR = 245;
              baseG = 165;
              baseB = 35;
              baseAlpha = Math.min(0.96, Math.max(0.85, alphaNorm * 0.95));
              pSize = 1.85 * sizeFactor;
            } else {
              baseR = 190;
              baseG = 115;
              baseB = 20;
              baseAlpha = Math.min(0.88, Math.max(0.70, alphaNorm * 0.85));
              pSize = 1.7 * sizeFactor;
            }
          } else if (colorMode === 'emerald-green' || colorMode === 'green') {
            if ((luminance > 175 && saturation < 0.28) || luminance > 215) {
              baseR = 255;
              baseG = 255;
              baseB = 255;
              baseAlpha = 1.0;
              pSize = 2.1 * sizeFactor;
            } else if (luminance < 115 && (saturation < 0.35 || luminance < 60)) {
              baseR = 8;
              baseG = 30;
              baseB = 20;
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if (saturation > 0.18 || maxC > 130) {
              baseR = Math.min(255, Math.round(r * 0.85));
              baseG = Math.min(255, Math.round(g * 1.35 + 20));
              baseB = Math.min(255, Math.round(b * 1.15 + 15));
              baseAlpha = 1.0;
              pSize = 2.0 * sizeFactor;
            } else if (luminance > 70) {
              baseR = 20;
              baseG = 195;
              baseB = 145;
              baseAlpha = Math.min(0.96, Math.max(0.85, alphaNorm * 0.95));
              pSize = 1.85 * sizeFactor;
            } else {
              baseR = 10;
              baseG = 125;
              baseB = 90;
              baseAlpha = Math.min(0.88, Math.max(0.70, alphaNorm * 0.85));
              pSize = 1.7 * sizeFactor;
            }
          }

          const relX = x * scaleX;
          const relY = y * scaleY;
          const pColor = `rgba(${baseR}, ${baseG}, ${baseB}, ${baseAlpha.toFixed(2)})`;

          targets.push({
            relX,
            relY,
            size: pSize,
            color: pColor,
            baseR,
            baseG,
            baseB,
            baseAlpha,
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

      const newParticles: any[] = [];
      for (let i = 0; i < targets.length; i++) {
        const t = targets[i];
        const spawnX = robotX + t.relX + (Math.random() - 0.5) * 14;
        const spawnY = robotY + t.relY + (Math.random() - 0.5) * 14;
        const spawnZ = -30 - Math.random() * 30;

        newParticles.push({
          relX: t.relX,
          relY: t.relY,
          angle: Math.random() * Math.PI * 2,
          rnd: 0.6 + Math.random() * 1.4,
          x: spawnX,
          y: spawnY,
          z: spawnZ,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          vz: 0,
          size: t.size,
          color: t.color,
          baseR: t.baseR,
          baseG: t.baseG,
          baseB: t.baseB,
          baseAlpha: t.baseAlpha,
          spring: 0.095,
          friction: 0.74,
          floatPower: 10.0,
        });
      }

      particles = newParticles;
      isInitialized = true;
      setIsLoaded(true);
    }

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      if (mouse.prevX > -9000) {
        mouse.vx = (newX - mouse.prevX) * 0.7;
        mouse.vy = (newY - mouse.prevY) * 0.7;
      }
      mouse.prevX = newX;
      mouse.prevY = newY;
      mouse.x = newX;
      mouse.y = newY;
      mouse.isHovered = true;

      const robotX = (canvasWidth - targetWidth) / 2;
      const robotY = (canvasHeight - targetHeight) / 2;
      const uvX = (newX - robotX) / targetWidth;
      const uvY = (newY - robotY) / targetHeight;

      if (uvX >= -0.15 && uvX <= 1.15 && uvY >= -0.15 && uvY <= 1.15) {
        touchTexture.addTouch({ x: uvX, y: uvY });
      }
    };

    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.prevX = -9999;
      mouse.prevY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.isHovered = false;
    };

    container.addEventListener('pointermove', handlePointerMove as any);
    container.addEventListener('pointerleave', handlePointerLeave);

    img.onload = () => {
      if (!isMounted) return;
      initParticles();
    };
    img.src = src;

    // Simulation render loop
    const render = () => {
      if (!isMounted) return;
      time += 0.022;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (isInitialized && particles.length > 0) {
        touchTexture.update();
        const touchData = touchTexture.getImageData();

        const robotX = (canvasWidth - targetWidth) / 2;
        const robotY = (canvasHeight - targetHeight) / 2;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Gentle ambient float oscillation
          const floatX = Math.cos(p.angle + time * 0.75) * 1.35 * p.rnd;
          const floatY = Math.sin(p.angle + time * 0.65) * 1.35 * p.rnd;

          let targetX = robotX + p.relX + floatX;
          let targetY = robotY + p.relY + floatY;

          // Touch texture interaction
          if (touchData) {
            const uvX = Math.max(0, Math.min(63, Math.floor((p.relX / targetWidth) * 64)));
            const uvY = Math.max(0, Math.min(63, Math.floor((p.relY / targetHeight) * 64)));
            const pIdx = (uvY * 64 + uvX) * 4;
            const touchForce = touchData[pIdx] / 255;

            if (touchForce > 0.02) {
              const repelAngle = Math.atan2(
                p.relY - (mouse.y - robotY),
                p.relX - (mouse.x - robotX)
              );
              const push = touchForce * 32.0;
              p.vx += Math.cos(repelAngle) * push * 0.35;
              p.vy += Math.sin(repelAngle) * push * 0.35;
            }
          }

          // Spring physics back to target anchor
          const dx = targetX - p.x;
          const dy = targetY - p.y;
          p.vx += dx * p.spring;
          p.vy += dy * p.spring;
          p.vx *= p.friction;
          p.vy *= p.friction;

          p.x += p.vx;
          p.y += p.vy;

          // Render particle dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove as any);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [src, width, height, colorMode, particleStep]);

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
        cursor: 'grab',
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
