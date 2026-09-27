'use client';

import React, { useEffect, useRef } from 'react';
import { useModelTuner } from '@/hooks/useModelTuner';
import { useInteraction } from '@/hooks/useInteraction';

interface SparkleParticle {
  x: number;
  progress: number;
  size: number;
  speed: number;
  alpha: number;
  ribbonIndex: number;
  hasFlare: boolean;
}

export function TubesWaveStream() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { values } = useModelTuner();
  const { scrollProgress } = useInteraction();

  const tunerRef = useRef(values);
  useEffect(() => {
    tunerRef.current = values;
  }, [values]);

  const scrollRef = useRef(scrollProgress);
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Flow expansion state (0.0 = at Vedika hand, 1.0 = reached right edge)
    let flowProgress = 0.0;
    let hasCompletedFlow = false;
    let flowStartTime = 0;

    // Luminous starlight pearls & energy nodes flowing along the ribbons
    const sparkles: SparkleParticle[] = [];
    const numSparkles = 55;
    for (let i = 0; i < numSparkles; i++) {
      sparkles.push({
        x: 0,
        progress: Math.random(),
        size: Math.random() * 2.2 + 1.0,
        speed: Math.random() * 0.0018 + 0.0008,
        alpha: Math.random() * 0.5 + 0.45,
        ribbonIndex: Math.floor(Math.random() * 5),
        hasFlare: Math.random() > 0.55,
      });
    }

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const tuner = tunerRef.current;
      const currentScroll = scrollRef.current;
      time += 0.018 * (tuner.waveSpeed || 0.8);

      const isMobile = width < 800;

      // Start wave cleanly at Vedika's outstretched hand at left (shifted a little down)
      const startX = isMobile ? width * 0.08 : width * 0.17;
      const startY = height * 0.525 + (tuner.waveYOffset ?? 68);
      const endX = width + 40;
      const totalSpan = endX - startX;

      // Check if Vedika has arrived and settled into Page 3 position (both forward and reverse)
      const isVedikaInPosition = currentScroll >= 1.65 && currentScroll <= 2.08;

      if (!isVedikaInPosition) {
        // Reset wave flow so it re-triggers fresh when scrolling back down
        flowProgress = 0.0;
        hasCompletedFlow = false;
        flowStartTime = 0;
        window.dispatchEvent(new CustomEvent('vedika_wave_flow_reset'));
      } else {
        if (!flowStartTime) flowStartTime = now;
        // Wave flows from Vedika to right end over ~1.3 seconds with smooth ease-out
        if (flowProgress < 1.0) {
          flowProgress += 0.016; // Smooth horizontal expansion
          if (flowProgress >= 1.0) {
            flowProgress = 1.0;
            if (!hasCompletedFlow) {
              hasCompletedFlow = true;
              window.dispatchEvent(new CustomEvent('vedika_wave_flow_complete'));
            }
          }
        }
      }

      // If wave hasn't started yet, keep clear
      if (flowProgress <= 0.001) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Visible reach along the screen width
      const visibleEndX = startX + totalSpan * Math.min(1, flowProgress);

      // Alignment base: Crest 1 at 30%, Crest 2 at 54%, Crest 3 at 78%
      const crestRefX = width * 0.30;
      const wavelength = width * 0.24;
      const waveK = (Math.PI * 2) / wavelength;

      const baseAmp = tuner.waveAmp ?? 42;
      const baseThickness = tuner.waveThickness ?? 39;

      // 5 ORGANIC, MULTI-AMPLITUDE, RANDOMIZED FLUID RIBBONS
      const ribbons = [
        // Ribbon 0: Grand Electric Cyan Aurora (Outer sweeping apex)
        {
          colorTop: 'rgba(34, 211, 238, 0.44)',
          colorBottom: 'rgba(14, 165, 233, 0.02)',
          spineColor: '#38BDF8',
          spineGlow: '#22D3EE',
          thickness: baseThickness * 1.15,
          lineWidth: 2.4,
          glowBlur: 14,
          getY: (normX: number, theta: number, blend: number) => {
            const localAmp = baseAmp * (1.45 + Math.sin(normX * 9.5 + time * 1.1) * 0.35 + Math.cos(normX * 15.2) * 0.20);
            const secondaryHarmonic = Math.sin(theta * 1.35 - time * 0.9) * 11;
            return (-Math.cos(theta) * localAmp + secondaryHarmonic) * blend;
          },
        },
        // Ribbon 1: Cosmic Magenta / Neon Pink Flare (Mid harmonic cross-wave)
        {
          colorTop: 'rgba(244, 63, 94, 0.40)',
          colorBottom: 'rgba(236, 72, 153, 0.02)',
          spineColor: '#FB7185',
          spineGlow: '#F43F5E',
          thickness: baseThickness * 0.95,
          lineWidth: 2.0,
          glowBlur: 12,
          getY: (normX: number, theta: number, blend: number) => {
            const localAmp = baseAmp * (1.18 + Math.cos(normX * 8.2 - time * 1.3) * 0.28);
            const counterHarmonic = Math.sin(theta * 0.85 + time * 0.7) * 14;
            return (-Math.cos(theta + 0.18) * localAmp + counterHarmonic) * blend;
          },
        },
        // Ribbon 2: Electric Sky Blue Core (Intense focused spine)
        {
          colorTop: 'rgba(56, 189, 248, 0.50)',
          colorBottom: 'rgba(56, 189, 248, 0.02)',
          spineColor: '#FFFFFF',
          spineGlow: '#67E8F9',
          thickness: baseThickness * 0.72,
          lineWidth: 1.8,
          glowBlur: 10,
          getY: (normX: number, theta: number, blend: number) => {
            const localAmp = baseAmp * (0.85 + Math.sin(normX * 12.0 - time * 1.5) * 0.38);
            const crossoverHarmonic = Math.cos(theta * 1.5 + time * 1.1) * 12;
            return (-Math.cos(theta - 0.12) * localAmp + crossoverHarmonic) * blend;
          },
        },
        // Ribbon 3: Deep Royal Violet Undercurrent (Low-amplitude foundation)
        {
          colorTop: 'rgba(168, 85, 247, 0.32)',
          colorBottom: 'rgba(124, 58, 237, 0.02)',
          spineColor: '#C084FC',
          spineGlow: '#A855F7',
          thickness: baseThickness * 0.65,
          lineWidth: 1.6,
          glowBlur: 8,
          getY: (normX: number, theta: number, blend: number) => {
            const localAmp = baseAmp * (0.48 + Math.sin(normX * 6.5 + time * 0.8) * 0.22);
            const slowHarmonic = Math.sin(theta * 0.65 - time * 0.6) * 7;
            return (-Math.cos(theta + 0.22) * localAmp + slowHarmonic) * blend;
          },
        },
        // Ribbon 4: Warm Rose / Amber Starlight Filament (Delicate accent stream)
        {
          colorTop: 'rgba(251, 191, 36, 0.28)',
          colorBottom: 'rgba(244, 63, 94, 0.02)',
          spineColor: '#FDE047',
          spineGlow: '#FBBF24',
          thickness: baseThickness * 0.55,
          lineWidth: 1.4,
          glowBlur: 9,
          getY: (normX: number, theta: number, blend: number) => {
            const localAmp = baseAmp * (0.92 + Math.cos(normX * 11.0 + time * 1.4) * 0.32);
            const ripple = Math.sin(theta * 2.0 - time * 1.7) * 9;
            return (-Math.cos(theta - 0.24) * localAmp + ripple) * blend;
          },
        },
      ];

      // 1. RENDER VOLUMETRIC TRANSLUCENT RIBBONS UP TO visibleEndX
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      ribbons.forEach((ribbon, rIndex) => {
        const topPoints: { x: number; y: number }[] = [];
        const botPoints: { x: number; y: number }[] = [];
        const spinePoints: { x: number; y: number }[] = [];

        const step = 5;
        const currentEnd = Math.min(endX, visibleEndX);

        for (let x = startX; x <= currentEnd; x += step) {
          const normX = (x - startX) / totalSpan;

          // Smooth emergence from Vedika's hand
          const handProgress = Math.min(1, Math.max(0, (x - startX) / (width * 0.07)));
          const blend = handProgress * handProgress * (3 - 2 * handProgress);

          const theta = waveK * (x - crestRefX);
          const waveElevation = ribbon.getY(normX, theta, blend);
          const centerY = startY + waveElevation;

          // Taper at the leading tip while flowing
          let tipTaper = 1.0;
          if (flowProgress < 0.99) {
            const tipDist = (visibleEndX - x) / (width * 0.06);
            tipTaper = Math.min(1, Math.max(0, tipDist));
          }

          const thickness =
            ribbon.thickness *
            (0.85 + Math.sin(x * 0.003 - time * 1.2 + rIndex) * 0.22) *
            blend *
            tipTaper;

          const yTop = centerY - thickness * 0.5;
          const yBot = centerY + thickness * 0.5;

          topPoints.push({ x, y: yTop });
          botPoints.push({ x, y: yBot });
          spinePoints.push({ x, y: centerY });
        }

        if (topPoints.length < 2) return;

        // Fill Ribbon Body
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 1; i < topPoints.length; i++) {
          ctx.lineTo(topPoints[i].x, topPoints[i].y);
        }
        for (let i = botPoints.length - 1; i >= 0; i--) {
          ctx.lineTo(botPoints[i].x, botPoints[i].y);
        }
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, startY - baseAmp * 2.2, 0, startY + baseAmp * 1.8);
        grad.addColorStop(0, ribbon.colorTop);
        grad.addColorStop(0.5, ribbon.colorTop);
        grad.addColorStop(1, ribbon.colorBottom);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Glowing Specular Spine Filament Line
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(spinePoints[0].x, spinePoints[0].y);
        for (let i = 1; i < spinePoints.length; i++) {
          ctx.lineTo(spinePoints[i].x, spinePoints[i].y);
        }
        ctx.strokeStyle = ribbon.spineColor;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.shadowColor = ribbon.spineGlow;
        ctx.shadowBlur = ribbon.glowBlur;
        ctx.globalAlpha = 0.85;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();

        // Upper Edge Filament
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(topPoints[0].x, topPoints[0].y);
        for (let i = 1; i < topPoints.length; i++) {
          ctx.lineTo(topPoints[i].x, topPoints[i].y);
        }
        ctx.strokeStyle = ribbon.spineGlow;
        ctx.lineWidth = 1.0;
        ctx.globalAlpha = 0.38;
        ctx.stroke();
        ctx.restore();
      });

      ctx.restore();

      // 2. SOFT SOURCE GLOW AT VEDIKA'S HAND (EMISSION POINT)
      ctx.save();
      const originGlow = ctx.createRadialGradient(startX + 6, startY, 2, startX + 6, startY, 65);
      originGlow.addColorStop(0, 'rgba(34, 211, 238, 0.65)');
      originGlow.addColorStop(0.35, 'rgba(249, 103, 251, 0.30)');
      originGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = originGlow;
      ctx.beginPath();
      ctx.arc(startX + 6, startY, 65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. LEADING TIP ENERGY GLOW (Smooth organic circular aura, no '+' cross)
      if (flowProgress > 0.02 && flowProgress < 0.99) {
        ctx.save();
        const tipX = visibleEndX;
        const tipNormX = (tipX - startX) / totalSpan;
        const tipTheta = waveK * (tipX - crestRefX);
        const tipY = startY + ribbons[0].getY(tipNormX, tipTheta, 1.0);

        const tipGlow = ctx.createRadialGradient(tipX, tipY, 2, tipX, tipY, 32);
        tipGlow.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        tipGlow.addColorStop(0.3, 'rgba(34, 211, 238, 0.55)');
        tipGlow.addColorStop(0.7, 'rgba(168, 85, 247, 0.25)');
        tipGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. LUMINOUS STARLIGHT PEARLS & TWINKLE FLARES (drawn within visible reach)
      sparkles.forEach((s) => {
        s.progress += s.speed;
        if (s.progress > 1) {
          s.progress = 0;
          s.ribbonIndex = Math.floor(Math.random() * ribbons.length);
        }

        const currentX = startX + s.progress * totalSpan;
        if (currentX > visibleEndX) return; // Only show sparkles along the emerged wave

        const normX = s.progress;
        const handProgress = Math.min(1, Math.max(0, (currentX - startX) / (width * 0.07)));
        const blend = handProgress * handProgress * (3 - 2 * handProgress);

        const ribbon = ribbons[s.ribbonIndex];
        const theta = waveK * (currentX - crestRefX);
        const waveElevation = ribbon.getY(normX, theta, blend);
        const currentY = startY + waveElevation;

        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, currentY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = ribbon.spineGlow;
        ctx.globalAlpha = s.alpha * blend;
        ctx.shadowColor = ribbon.spineGlow;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
}
