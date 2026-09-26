'use client';

import React, { useEffect, useRef } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { getStreamAnchors } from './streamLayout';

interface Particle {
  x: number;
  y: number;
  baseY: number;
  size: number;
  speed: number;
  alpha: number;
  color: string;
}

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

export function MultimodalWaveStream() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeMode } = useInteraction();
  const activeModeRef = useRef(activeMode);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const updateDimensions = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', updateDimensions);

    // Initialize Speech Particles (Left side) - Increased count & size
    const particleColors = ['#A855F7', '#C084FC', '#22D3EE', '#38BDF8', '#818CF8'];
    const speechParticles: Particle[] = [];
    const numSpeechParticles = 38;

    for (let i = 0; i < numSpeechParticles; i++) {
      const { leftOrbX, midX, centerY, orbRadius } = getStreamAnchors(width, height);
      const startX = leftOrbX + orbRadius;
      const span = midX - startX;
      speechParticles.push({
        x: startX + Math.random() * span,
        y: centerY + (Math.random() - 0.5) * 65,
        baseY: centerY + (Math.random() - 0.5) * 45,
        size: Math.random() * 3.0 + 1.4,
        speed: Math.random() * 1.0 + 0.65,
        alpha: Math.random() * 0.65 + 0.35,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    // 60% English Alphabets (Uppercase & Lowercase)
    const englishGlyphs = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
      'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'm', 'n', 'r', 's', 't', 'v', 'w', 'y', 'z'
    ];

    // 40% Indian Alphabets across major scripts
    const indicGlyphs = [
      // Devanagari (Hindi, Sanskrit, Marathi)
      'अ', 'आ', 'क', 'ख', 'ग', 'च', 'ज', 'त', 'द', 'न', 'प', 'म', 'य', 'र', 'ल', 'व', 'स', 'ह', 'ॐ',
      // Tamil
      'அ', 'ஆ', 'க', 'ச', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ',
      // Telugu
      'అ', 'ఆ', 'క', 'గ', 'చ', 'జ', 'త', 'ద', 'న', 'ప', 'మ', 'య', 'ర', 'ల', 'వ', 'స',
      // Kannada
      'ಅ', 'ಆ', 'ಕ', 'ಗ', 'ಚ', 'ಜ', 'ತ', 'ದ', 'ನ', 'ಪ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಸ',
      // Bengali
      'অ', 'আ', 'ক', 'খ', 'গ', 'চ', 'জ', 'ত', 'দ', 'ন', 'প', 'ম', 'য', 'র', 'ল', 'ব', 'স',
      // Malayalam
      'അ', 'ആ', 'ക', 'ഗ', 'ച', 'ജ', 'ത', 'ദ', 'ന', 'പ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ള',
      // Gujarati
      'અ', 'આ', 'ક', 'ખ', 'ગ', 'ચ', 'જ', 'ત', 'દ', 'ન', 'પ', 'મ', 'ય', 'ર', 'લ', 'વ', 'સ',
      // Gurmukhi (Punjabi)
      'ੳ', 'ਅ', 'ਕ', 'ਖ', 'ਗ', 'ਚ', 'ਜ', 'ਤ', 'ਦ', 'ਨ', 'ਪ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ਸ',
      // Odia
      'ଅ', 'ଆ', 'କ', 'ଖ', 'ଗ', 'ଚ', 'ଜ', 'ତ', 'ଦ', 'ନ', 'ପ', 'ମ', 'ଯ', 'ର', 'ଲ', 'ସ'
    ];

    // Weighted selector: 60% English / 40% Indian alphabets
    const getRandomGlyph = () => {
      return Math.random() < 0.60
        ? englishGlyphs[Math.floor(Math.random() * englishGlyphs.length)]
        : indicGlyphs[Math.floor(Math.random() * indicGlyphs.length)];
    };

    const letterColors = [
      '#D97706', // Amber 600
      '#F59E0B', // Amber 500
      '#FBBF24', // Amber 400
      '#B45309', // Amber 700
      '#EAB308', // Yellow 500
      '#CA8A04', // Yellow 600
    ];

    const indicFontFamily =
      "'Nirmala UI', 'Noto Sans Indic', 'Kohinoor Devanagari', 'Mukti', system-ui, -apple-system, sans-serif";

    const textLetters: LetterParticle[] = [];
    const numLetters = 32;

    for (let i = 0; i < numLetters; i++) {
      const { midX, rightOrbX, centerY, orbRadius } = getStreamAnchors(width, height);
      const endX = rightOrbX - orbRadius;
      const span = endX - midX;
      textLetters.push({
        char: getRandomGlyph(),
        x: midX + Math.random() * span,
        y: centerY + (Math.random() - 0.5) * 60,
        baseY: centerY + (Math.random() - 0.5) * 45,
        size: Math.floor(Math.random() * 12) + 16, // 16px to 28px
        speed: Math.random() * 0.95 + 0.55,
        rotation: (Math.random() - 0.5) * 0.6,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        alpha: Math.random() * 0.65 + 0.35,
        color: letterColors[Math.floor(Math.random() * letterColors.length)],
        fontFamily: indicFontFamily,
        fontWeight: Math.random() > 0.4 ? 'bold' : '600',
      });
    }

    // Golden sparkles (Right side)
    const sparkles: Particle[] = [];
    const sparkleColors = ['#F59E0B', '#FBBF24', '#FDE68A', '#FEF08A', '#FCD34D'];
    for (let i = 0; i < 26; i++) {
      const { midX, rightOrbX, centerY, orbRadius } = getStreamAnchors(width, height);
      const endX = rightOrbX - orbRadius;
      const span = endX - midX;
      sparkles.push({
        x: midX + Math.random() * span,
        y: centerY + (Math.random() - 0.5) * 60,
        baseY: centerY + (Math.random() - 0.5) * 45,
        size: Math.random() * 2.2 + 1.0,
        speed: Math.random() * 1.1 + 0.6,
        alpha: Math.random() * 0.6 + 0.3,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isSTT = activeModeRef.current === 'STT';
      const flowDir = isSTT ? 1 : -1;

      time += 0.032;
      const { leftOrbX, midX, rightOrbX, centerY, orbRadius } = getStreamAnchors(width, height);

      // ==========================================
      // 1. LEFT STREAM: SPEECH TO TEXT WAVES (Left Mic Orb ➔ Mid Behind Vedika)
      // ==========================================
      const speechStartX = leftOrbX + orbRadius - 4;
      const speechEndX = midX;
      const speechSpan = speechEndX - speechStartX;

      if (speechSpan > 50) {
        // Undulating Cyan/Violet Fluid Ribbons - Increased wave amplitude & presence
        const speechRibbons = [
          {
            amp: 30, // Increased amplitude
            freq: 0.016,
            speed: 1.8 * flowDir,
            phase: 0,
            color1: 'rgba(34, 211, 238, 0.48)', // Cyan
            color2: 'rgba(168, 85, 247, 0.38)', // Purple
            yOffset: 0,
          },
          {
            amp: 24, // Increased amplitude
            freq: 0.022,
            speed: 2.2 * flowDir,
            phase: 1.2,
            color1: 'rgba(129, 140, 248, 0.42)', // Indigo
            color2: 'rgba(192, 132, 252, 0.30)', // Violet
            yOffset: 4,
          },
          {
            amp: 18, // Increased amplitude
            freq: 0.026,
            speed: 1.4 * flowDir,
            phase: 2.5,
            color1: 'rgba(56, 189, 248, 0.35)',
            color2: 'rgba(147, 51, 234, 0.24)',
            yOffset: -4,
          },
        ];

        speechRibbons.forEach((ribbon) => {
          ctx.beginPath();
          ctx.moveTo(speechStartX, centerY);

          for (let x = speechStartX; x <= speechEndX; x += 6) {
            const p = (x - speechStartX) / speechSpan;
            const env = Math.sin(p * Math.PI);
            const y =
              centerY +
              ribbon.yOffset +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
              Math.cos(x * 0.03 - time * flowDir) * 8 * env;
            ctx.lineTo(x, y);
          }

          for (let x = speechEndX; x >= speechStartX; x -= 6) {
            const p = (x - speechStartX) / speechSpan;
            const env = Math.sin(p * Math.PI);
            const y =
              centerY +
              ribbon.yOffset +
              18 * env + // Increased bottom wave depth
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase + 0.4) * ribbon.amp * env;
            ctx.lineTo(x, y);
          }

          ctx.closePath();
          const grad = ctx.createLinearGradient(speechStartX, 0, speechEndX, 0);
          grad.addColorStop(0, ribbon.color1);
          grad.addColorStop(0.65, ribbon.color2);
          grad.addColorStop(1, 'rgba(168, 85, 247, 0.04)'); // Tapers smoothly behind Vedika
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Audio Frequency Equalizer Bars - Enlarged & Height Multiplier increased to 92
        const numBars = 24; // Increased from 20
        const barWidth = 5.2; // Increased from 4.2
        const barGap = 4.0; // Increased from 3.5
        const barGroupWidth = numBars * (barWidth + barGap);
        const barStartX = speechStartX + (speechSpan - barGroupWidth) * 0.50;

        for (let i = 0; i < numBars; i++) {
          const x = barStartX + i * (barWidth + barGap);
          const centerDist = Math.abs(i - numBars / 2) / (numBars / 2);
          const env = Math.cos(centerDist * (Math.PI / 2.3));

          // Significantly larger dynamic range & amplitude for the sound wave
          const barHeight = Math.max(
            8,
            (Math.sin(time * 3.4 + i * 0.42) * 0.38 +
              Math.cos(time * 6.0 + i * 0.3) * 0.28 +
              0.58) *
              92 * // Increased from 60 to 92
              env
          );

          const y = centerY - barHeight / 2;
          const barGrad = ctx.createLinearGradient(x, y, x, y + barHeight);
          barGrad.addColorStop(0, '#C084FC'); // Neon violet top
          barGrad.addColorStop(0.45, '#7C3AED'); // Deep purple center
          barGrad.addColorStop(1, '#06B6D4'); // Electric cyan base

          ctx.save();
          ctx.shadowColor = 'rgba(168, 85, 247, 0.45)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = barGrad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [3.5, 3.5, 3.5, 3.5]);
          ctx.fill();
          ctx.restore();
        }

        // Luminous Speech Particles
        speechParticles.forEach((p) => {
          if (isSTT) {
            p.x += p.speed * 1.6;
            if (p.x > speechEndX) {
              p.x = speechStartX;
              p.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          } else {
            p.x -= p.speed * 1.6;
            if (p.x < speechStartX) {
              p.x = speechEndX;
              p.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          }

          const progress = (p.x - speechStartX) / speechSpan;
          const env = Math.sin(Math.max(0, Math.min(1, progress)) * Math.PI);
          const waveY = Math.sin(p.x * 0.02 + time * 2.2 * flowDir) * 18 * env;
          const currentY = p.baseY + waveY;

          ctx.beginPath();
          ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * Math.max(0.2, env);
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        });
      }

      // ==========================================
      // 2. RIGHT STREAM: TEXT TO SPEECH WAVES (Mid Behind Vedika ➔ Right Doc Orb)
      // ==========================================
      const textStartX = midX;
      const textEndX = rightOrbX - orbRadius + 4;
      const textSpan = textEndX - textStartX;

      if (textSpan > 50) {
        // Undulating Golden Fluid Ribbons directly touching the doc orb
        const textRibbons = [
          {
            amp: 24,
            freq: 0.016,
            speed: 1.7 * flowDir,
            phase: 0.5,
            color1: 'rgba(251, 191, 36, 0.42)', // Amber 400
            color2: 'rgba(245, 158, 11, 0.36)', // Amber 500
            yOffset: -2,
          },
          {
            amp: 18,
            freq: 0.022,
            speed: 2.1 * flowDir,
            phase: 1.8,
            color1: 'rgba(253, 230, 138, 0.38)',
            color2: 'rgba(217, 119, 6, 0.30)',
            yOffset: 3,
          },
          {
            amp: 14,
            freq: 0.028,
            speed: 1.3 * flowDir,
            phase: 3.1,
            color1: 'rgba(245, 158, 11, 0.32)',
            color2: 'rgba(254, 240, 138, 0.25)',
            yOffset: -3,
          },
        ];

        textRibbons.forEach((ribbon) => {
          ctx.beginPath();
          ctx.moveTo(textStartX, centerY);

          for (let x = textStartX; x <= textEndX; x += 6) {
            const p = (x - textStartX) / textSpan;
            const env = Math.sin(p * Math.PI);
            const y =
              centerY +
              ribbon.yOffset +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
              Math.cos(x * 0.03 - time * flowDir) * 6 * env;
            ctx.lineTo(x, y);
          }

          for (let x = textEndX; x >= textStartX; x -= 6) {
            const p = (x - textStartX) / textSpan;
            const env = Math.sin(p * Math.PI);
            const y =
              centerY +
              ribbon.yOffset +
              14 * env +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase + 0.4) * ribbon.amp * env;
            ctx.lineTo(x, y);
          }

          ctx.closePath();
          const grad = ctx.createLinearGradient(textStartX, 0, textEndX, 0);
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.04)'); // Tapers smoothly behind Vedika
          grad.addColorStop(0.35, ribbon.color1);
          grad.addColorStop(1, ribbon.color2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Floating Typographic Glyphs (Indic scripts + English)
        textLetters.forEach((l) => {
          if (isSTT) {
            l.x += l.speed * 1.5;
            l.rotation += l.rotSpeed;
            if (l.x > textEndX) {
              l.x = textStartX;
              l.baseY = centerY + (Math.random() - 0.5) * 45;
              l.char = getRandomGlyph();
            }
          } else {
            l.x -= l.speed * 1.5;
            l.rotation -= l.rotSpeed;
            if (l.x < textStartX) {
              l.x = textEndX;
              l.baseY = centerY + (Math.random() - 0.5) * 45;
              l.char = getRandomGlyph();
            }
          }

          const progress = (l.x - textStartX) / textSpan;
          const env = Math.sin(Math.max(0, Math.min(1, progress)) * Math.PI);
          const waveY = Math.sin(l.x * 0.018 + time * 1.8 * flowDir) * 18 * env;
          const currentY = l.baseY + waveY;

          ctx.save();
          ctx.translate(l.x, currentY);
          ctx.rotate(l.rotation);

          ctx.font = `${l.fontWeight} ${l.size}px ${l.fontFamily}`;
          ctx.fillStyle = l.color;
          ctx.globalAlpha = l.alpha * Math.max(0.18, env);
          ctx.shadowColor = 'rgba(245, 158, 11, 0.45)';
          ctx.shadowBlur = 6;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(l.char, 0, 0);

          ctx.restore();
        });

        // Golden Sparkles
        sparkles.forEach((s) => {
          if (isSTT) {
            s.x += s.speed * 1.6;
            if (s.x > textEndX) {
              s.x = textStartX;
              s.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          } else {
            s.x -= s.speed * 1.6;
            if (s.x < textStartX) {
              s.x = textEndX;
              s.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          }

          const progress = (s.x - textStartX) / textSpan;
          const env = Math.sin(Math.max(0, Math.min(1, progress)) * Math.PI);
          const waveY = Math.sin(s.x * 0.02 + time * 2.2 * flowDir) * 14 * env;
          const currentY = s.baseY + waveY;

          ctx.beginPath();
          ctx.arc(s.x, currentY, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha * Math.max(0.2, env);
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
}
