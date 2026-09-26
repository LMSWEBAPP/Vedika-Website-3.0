'use client';

import React, { useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

export function SpeechStreamVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const width = (canvas.width = canvas.offsetWidth || 520);
    const height = (canvas.height = canvas.offsetHeight || 220);
    const centerY = height / 2;

    // Luminous particles flowing from left (orb) to right (Vedika)
    const particleColors = ['#A855F7', '#C084FC', '#22D3EE', '#38BDF8', '#818CF8'];
    const particles: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * width,
        y: centerY + (Math.random() - 0.5) * 80,
        size: Math.random() * 2.5 + 1.2,
        speed: Math.random() * 0.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    // Audio frequency bars count
    const numBars = 22;
    const barWidth = 4.5;
    const barGap = 3.5;
    const barStartX = width * 0.38;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.035;

      // 1. Draw Undulating Fluid Ribbon Waves (Cyan to Purple/Violet)
      const ribbons = [
        {
          amp: 24,
          freq: 0.015,
          speed: 1.8,
          phase: 0,
          color1: 'rgba(34, 211, 238, 0.45)', // Cyan
          color2: 'rgba(168, 85, 247, 0.35)', // Purple
          yOffset: 0,
        },
        {
          amp: 18,
          freq: 0.02,
          speed: 2.2,
          phase: 1.2,
          color1: 'rgba(129, 140, 248, 0.4)', // Indigo
          color2: 'rgba(192, 132, 252, 0.3)', // Violet
          yOffset: 4,
        },
        {
          amp: 14,
          freq: 0.025,
          speed: 1.4,
          phase: 2.4,
          color1: 'rgba(56, 189, 248, 0.35)', // Sky Blue
          color2: 'rgba(147, 51, 234, 0.25)', // Deep Purple
          yOffset: -5,
        },
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const startX = 60;
        const endX = width;

        // Top curve of ribbon
        ctx.moveTo(startX, centerY);
        for (let x = startX; x <= endX; x += 6) {
          const progress = (x - startX) / (endX - startX);
          // Amplitude envelope: smaller at ends, full in middle
          const env = Math.sin(progress * Math.PI);
          const y =
            centerY +
            ribbon.yOffset +
            Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
            Math.cos(x * 0.035 - time) * 6 * env;
          ctx.lineTo(x, y);
        }

        // Bottom curve of ribbon
        for (let x = endX; x >= startX; x -= 6) {
          const progress = (x - startX) / (endX - startX);
          const env = Math.sin(progress * Math.PI);
          const y =
            centerY +
            ribbon.yOffset +
            14 * env +
            Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.phase + 0.4) * ribbon.amp * env;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        const grad = ctx.createLinearGradient(startX, 0, endX, 0);
        grad.addColorStop(0, ribbon.color1);
        grad.addColorStop(0.55, ribbon.color2);
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.08)');
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 2. Draw Center Equalizer Frequency Bars (Vibrant Violet / Purple / Cyan)
      for (let i = 0; i < numBars; i++) {
        const x = barStartX + i * (barWidth + barGap);
        const centerDist = Math.abs(i - numBars / 2) / (numBars / 2);
        const env = Math.cos(centerDist * (Math.PI / 2.3));

        // Harmonic oscillating bar heights mimicking voice audio frequency
        const barHeight =
          Math.max(
            6,
            (Math.sin(time * 3 + i * 0.45) * 0.35 +
              Math.cos(time * 5.5 + i * 0.3) * 0.25 +
              0.55) *
              65 *
              env
          );

        const y = centerY - barHeight / 2;

        const barGrad = ctx.createLinearGradient(x, y, x, y + barHeight);
        barGrad.addColorStop(0, '#A855F7'); // Vivid Violet
        barGrad.addColorStop(0.5, '#7C3AED'); // Deep Purple
        barGrad.addColorStop(1, '#06B6D4'); // Cyan

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 3, 3]);
        ctx.fill();
      }

      // 3. Draw Floating Luminous Particles
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width) {
          p.x = 65;
          p.y = centerY + (Math.random() - 0.5) * 60;
        }

        const waveY = Math.sin(p.x * 0.02 + time * 2) * 16;
        const currentY = p.y + waveY;

        ctx.beginPath();
        ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '560px',
        height: '220px',
      }}
    >
      {/* 1. Neon Glowing Microphone Orb (Far Left) */}
      <div
        style={{
          position: 'absolute',
          left: '10px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Outer Radiant Glowing Wave Rings */}
        <div
          style={{
            position: 'absolute',
            width: '115px',
            height: '115px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.12) 55%, transparent 75%)',
            animation: 'orbPulsePurple 3s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '95px',
            height: '95px',
            borderRadius: '50%',
            border: '1.5px solid rgba(192, 132, 252, 0.45)',
            boxShadow: '0 0 24px rgba(168, 85, 247, 0.5), inset 0 0 16px rgba(147, 51, 234, 0.3)',
            animation: 'ringExpand 4s linear infinite',
          }}
        />

        {/* Central Glowing Orb Button */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 50%, #4C1D95 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 32px rgba(168, 85, 247, 0.75), 0 4px 16px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Mic size={26} color="#FFFFFF" />
          {/* Subtle audio emission arcs */}
          <div
            style={{
              position: 'absolute',
              right: '-6px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '12px',
              height: '24px',
              borderRight: '2px solid rgba(255, 255, 255, 0.7)',
              borderRadius: '0 50% 50% 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '-11px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              height: '32px',
              borderRight: '1.5px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '0 50% 50% 0',
            }}
          />
        </div>
      </div>

      {/* 2. Audio Wave & Equalizer Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        @keyframes orbPulsePurple {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
        @keyframes ringExpand {
          0% {
            transform: rotate(0deg) scale(0.96);
          }
          50% {
            transform: rotate(180deg) scale(1.04);
          }
          100% {
            transform: rotate(360deg) scale(0.96);
          }
        }
      `}</style>
    </div>
  );
}
