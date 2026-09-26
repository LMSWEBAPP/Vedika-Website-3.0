'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  color: string;
  seed: number;
}

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const count = theme.particles.count || 30;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isAltColor = i % 3 === 0;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * theme.particles.size + 1.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.2 + 0.08) * theme.particles.speed,
        baseAlpha: Math.random() * theme.particles.opacity + 0.08,
        color: isAltColor ? theme.particles.secondaryColor : theme.particles.color,
        seed: Math.random() * 100,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!isReduced) {
          p.y += p.vy;
          p.x += Math.sin(time + p.seed) * 0.2;

          // Wrap around edges seamlessly
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Soft particle rendering with subtle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(time * 1.5 + p.seed));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      if (!isReduced) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
