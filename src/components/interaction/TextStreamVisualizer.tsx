'use client';

import React, { useEffect, useRef } from 'react';

interface LetterParticle {
  char: string;
  x: number;
  y: number;
  baseY: number;
  size: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  color: string;
  fontFamily: string;
  fontWeight: string;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

export function TextStreamVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const width = (canvas.width = canvas.offsetWidth || 540);
    const height = (canvas.height = canvas.offsetHeight || 220);
    const centerY = height / 2;

    // Glyphs from the reference image: 'A', 'b', 'C', 'd', '6', 'f', '8', 'T', 'e', 'k'
    const glyphs = ['A', 'b', 'C', 'd', '6', 'f', '8', 'T', 'e', 'k', 'a', 'B', '5', 'm'];
    const letterColors = [
      '#D97706', // Amber 600
      '#F59E0B', // Amber 500
      '#FBBF24', // Amber 400
      '#B45309', // Amber 700
      '#EAB308', // Yellow 500
      '#CA8A04', // Yellow 600
    ];

    const letters: LetterParticle[] = [];
    for (let i = 0; i < 22; i++) {
      letters.push({
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
        x: Math.random() * (width - 100),
        y: centerY + (Math.random() - 0.5) * 70,
        baseY: centerY + (Math.random() - 0.5) * 50,
        size: Math.floor(Math.random() * 16) + 14, // 14px to 30px
        speed: Math.random() * 0.75 + 0.45,
        rotation: (Math.random() - 0.5) * 0.8,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        alpha: Math.random() * 0.6 + 0.4,
        color: letterColors[Math.floor(Math.random() * letterColors.length)],
        fontFamily: Math.random() > 0.5 ? 'Georgia, serif' : 'Inter, sans-serif',
        fontWeight: Math.random() > 0.4 ? 'bold' : '600',
      });
    }

    // Golden ambient sparkle particles
    const sparkles: SparkleParticle[] = [];
    const sparkleColors = ['#F59E0B', '#FBBF24', '#FDE68A', '#FEF08A', '#FCD34D'];
    for (let i = 0; i < 26; i++) {
      sparkles.push({
        x: Math.random() * (width - 80),
        y: centerY + (Math.random() - 0.5) * 80,
        size: Math.random() * 2.2 + 1.0,
        speed: Math.random() * 0.85 + 0.5,
        alpha: Math.random() * 0.65 + 0.35,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.032;

      // 1. Draw Undulating Golden/Amber Fluid Ribbon Waves
      const ribbons = [
        {
          amp: 24,
          freq: 0.016,
          speed: 1.7,
          phase: 0.5,
          color1: 'rgba(251, 191, 36, 0.45)', // Amber 400
          color2: 'rgba(245, 158, 11, 0.38)', // Amber 500
          yOffset: -2,
        },
        {
          amp: 18,
          freq: 0.022,
          speed: 2.1,
          phase: 1.8,
          color1: 'rgba(253, 230, 138, 0.42)', // Amber 200
          color2: 'rgba(217, 119, 6, 0.32)',  // Amber 600
          yOffset: 3,
        },
        {
          amp: 14,
          freq: 0.028,
          speed: 1.3,
          phase: 3.1,
          color1: 'rgba(245, 158, 11, 0.35)',
          color2: 'rgba(254, 240, 138, 0.28)',
          yOffset: -5,
        },
      ];

      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const startX = 0;
        const endX = width - 60;

        // Top curve of golden ribbon
        ctx.moveTo(startX, centerY);
        for (let x = startX; x <= endX; x += 6) {
          const progress = x / endX;
          const env = Math.sin(progress * Math.PI);
          const y =
            centerY +
            ribbon.yOffset +
            Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
            Math.cos(x * 0.032 - time) * 7 * env;
          ctx.lineTo(x, y);
        }

        // Bottom curve of golden ribbon
        for (let x = endX; x >= startX; x -= 6) {
          const progress = x / endX;
          const env = Math.sin(progress * Math.PI);
          const y =
            centerY +
            ribbon.yOffset +
            15 * env +
            Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.phase + 0.45) * ribbon.amp * env;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        const grad = ctx.createLinearGradient(startX, 0, endX, 0);
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
        grad.addColorStop(0.45, ribbon.color1);
        grad.addColorStop(1, ribbon.color2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 2. Draw Floating & Rotating Typographic Glyphs along the wave
      letters.forEach((l) => {
        l.x += l.speed;
        l.rotation += l.rotSpeed;

        if (l.x > width - 75) {
          l.x = 10;
          l.baseY = centerY + (Math.random() - 0.5) * 55;
          l.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        }

        // Ribbon wave oscillation for letter vertical motion
        const waveY = Math.sin(l.x * 0.018 + time * 1.8) * 20;
        const currentY = l.baseY + waveY;

        ctx.save();
        ctx.translate(l.x, currentY);
        ctx.rotate(l.rotation);

        ctx.font = `${l.fontWeight} ${l.size}px ${l.fontFamily}`;
        ctx.fillStyle = l.color;
        ctx.globalAlpha = l.alpha;
        ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
        ctx.shadowBlur = 6;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(l.char, 0, 0);

        ctx.restore();
      });

      // 3. Draw Floating Golden Sparkle Particles
      sparkles.forEach((s) => {
        s.x += s.speed;
        if (s.x > width - 70) {
          s.x = 5;
          s.y = centerY + (Math.random() - 0.5) * 60;
        }

        const waveY = Math.sin(s.x * 0.02 + time * 2) * 14;
        const currentY = s.y + waveY;

        ctx.beginPath();
        ctx.arc(s.x, currentY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
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
        justifyContent: 'flex-end',
        width: '100%',
        maxWidth: '560px',
        height: '220px',
      }}
    >
      {/* Dynamic Golden Ribbon Wave & Typographic Glyphs Canvas */}
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

      {/* Radiant Glowing Amber/Golden Document Orb (Far Right) */}
      <div
        style={{
          position: 'absolute',
          right: '10px',
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
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.32) 0%, rgba(217, 119, 6, 0.12) 55%, transparent 75%)',
            animation: 'orbPulseGold 3s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '95px',
            height: '95px',
            borderRadius: '50%',
            border: '1.5px solid rgba(251, 191, 36, 0.5)',
            boxShadow: '0 0 24px rgba(245, 158, 11, 0.5), inset 0 0 16px rgba(217, 119, 6, 0.3)',
            animation: 'ringExpandGold 4s linear infinite',
          }}
        />

        {/* Central Glowing Golden Orb Button with Document Graphic */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 32px rgba(245, 158, 11, 0.75), 0 4px 16px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Document SVG with 'T' and lines matching the reference image */}
          <svg
            width="30"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}
          >
            {/* White Document Page Base */}
            <path
              d="M7 6C7 4.89543 7.89543 4 9 4H19L25 10V26C25 27.1046 24.1046 28 23 28H9C7.89543 28 7 27.1046 7 26V6Z"
              fill="#FFFFFF"
            />
            {/* Folded Corner */}
            <path
              d="M19 4V9C19 9.55228 19.4477 10 20 10H25L19 4Z"
              fill="#FDE68A"
            />
            {/* Bold Letter 'T' inside document */}
            <text
              x="10.5"
              y="18"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontSize="10"
              fontWeight="900"
              fill="#D97706"
            >
              T
            </text>
            {/* Text lines next to T */}
            <line x1="18" y1="13.5" x2="22.5" y2="13.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="18" y1="17.5" x2="22.5" y2="17.5" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="11" y1="22" x2="22.5" y2="22" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbPulseGold {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.95;
          }
        }
        @keyframes ringExpandGold {
          0% {
            transform: scale(0.92) rotate(0deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.06) rotate(180deg);
            opacity: 0.45;
          }
          100% {
            transform: scale(0.92) rotate(360deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
