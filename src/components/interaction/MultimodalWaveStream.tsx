'use client';

import React, { useEffect, useRef } from 'react';
import { useInteraction, globalScrollRef } from '@/hooks/useInteraction';
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

interface ChestSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  size: number;
}

export const MultimodalWaveStream = React.memo(function MultimodalWaveStream() {
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
    let lastTime = performance.now();

    // Sequence state
    let seqTime = 0;
    let sequenceActive = false;
    let hasDispatchedReveal = false;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const updateDimensions = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', updateDimensions);

    // Initialize Speech Particles (Left side)
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
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'm', 'n', 'r', 's', 't', 'v', 'w', 'y', 'z',
    ];

    // 40% Indian Alphabets across major scripts
    const indicGlyphs = [
      'अ', 'आ', 'क', 'ख', 'ग', 'च', 'ज', 'त', 'द', 'न', 'प', 'म', 'य', 'र', 'ल', 'व', 'स', 'ह', 'ॐ',
      'அ', 'ஆ', 'க', 'ச', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ',
      'అ', 'ఆ', 'క', 'గ', 'చ', 'జ', 'త', 'ద', 'న', 'ప', 'మ', 'య', 'ర', 'ల', 'వ', 'స',
      'ಅ', 'ಆ', 'ಕ', 'ಗ', 'ಚ', 'ಜ', 'ತ', 'ದ', 'ನ', 'ಪ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಸ',
      'অ', 'আ', 'ক', 'খ', 'গ', 'চ', 'জ', 'ত', 'দ', 'ন', 'প', 'ম', 'য', 'র', 'ল', 'ব', 'স',
      'അ', 'ആ', 'ക', 'ഗ', 'ച', 'ജ', 'ത', 'ദ', 'ന', 'പ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ള',
      'અ', 'આ', 'ક', 'ખ', 'ગ', 'ચ', 'જ', 'ત', 'દ', 'ન', 'પ', 'મ', 'ય', 'ર', 'લ', 'વ', 'સ',
      'ੳ', 'ਅ', 'ਕ', 'ਖ', 'ਗ', 'ਚ', 'ਜ', 'ਤ', 'ਦ', 'ਨ', 'ਪ', 'ਮ', 'ਯ', 'ਰ', 'ল', 'ਵ', 'ਸ',
      'ଅ', 'ଆ', 'କ', 'ଖ', 'ଗ', 'ଚ', 'ଜ', 'ତ', 'ଦ', 'ନ', 'ପ', 'ମ', 'ଯ', 'ର', 'ଲ', 'ସ',
    ];

    const getRandomGlyph = () => {
      return Math.random() < 0.6
        ? englishGlyphs[Math.floor(Math.random() * englishGlyphs.length)]
        : indicGlyphs[Math.floor(Math.random() * indicGlyphs.length)];
    };

    const letterColors = [
      '#D97706',
      '#F59E0B',
      '#FBBF24',
      '#B45309',
      '#EAB308',
      '#CA8A04',
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
        size: Math.floor(Math.random() * 12) + 16,
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

    // Chest transformation spark particles
    let chestSparks: ChestSpark[] = [];
    const chestSparkColors = ['#F59E0B', '#FBBF24', '#C084FC', '#22D3EE', '#FFFFFF', '#FDE68A'];

    const triggerChestSparks = (cx: number, cy: number) => {
      chestSparks = [];
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const spd = Math.random() * 3.2 + 1.2;
        chestSparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd * 0.7,
          color: chestSparkColors[Math.floor(Math.random() * chestSparkColors.length)],
          life: 1.0,
          maxLife: Math.random() * 0.7 + 0.7,
          size: Math.random() * 2.8 + 1.4,
        });
      }
    };

    let hasTriggeredSparks = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const sp = globalScrollRef.current;
      // Page 2 active center range: when Vedika arrives in the middle
      const isAtMiddle = sp >= 0.78 && sp <= 1.25;

      if (isAtMiddle) {
        if (!sequenceActive) {
          sequenceActive = true;
          seqTime = 0;
          hasDispatchedReveal = false;
          hasTriggeredSparks = false;
          window.dispatchEvent(new CustomEvent('vedika_wave_text_orb', { detail: { visible: false } }));
        }
        seqTime += delta;
      } else if (sp < 0.62 || sp > 1.35) {
        if (sequenceActive || hasDispatchedReveal) {
          sequenceActive = false;
          seqTime = 0;
          hasDispatchedReveal = false;
          hasTriggeredSparks = false;
          chestSparks = [];
          window.dispatchEvent(new CustomEvent('vedika_wave_text_orb', { detail: { visible: false } }));
        }
      }

      // If user is far from Page 2 and not active, don't draw
      if (!sequenceActive && (sp < 0.65 || sp > 1.35)) {
        animId = requestAnimationFrame(render);
        return;
      }

      const isSTT = activeModeRef.current === 'STT';
      const flowDir = isSTT ? 1 : -1;
      time += 0.032;

      const { leftOrbX, midX, rightOrbX, centerY, orbRadius } = getStreamAnchors(width, height);

      // =========================================================================
      // TIMELINE CALCULATION
      // =========================================================================
      // Phase 1: Left Speech Waves travel from Left Orb to Vedika (0s -> 1.15s)
      const leftDuration = 1.15;
      const leftRaw = Math.min(1, Math.max(0, seqTime / leftDuration));
      const leftProgress = leftRaw < 1 ? 1 - Math.pow(1 - leftRaw, 3) : 1;

      // Phase 2: Speech wave touches Vedika's chest (1.08s -> 1.50s)
      const chestHitTime = Math.max(0, seqTime - 1.08);

      // Phase 3: Golden Waves emerge from Vedika and travel to Right Text Orb (1.15s -> 2.35s)
      const rightDelay = 1.15;
      const rightDuration = 1.20;
      const rightRaw = Math.min(1, Math.max(0, (seqTime - rightDelay) / rightDuration));
      const rightProgress = rightRaw < 1 ? 1 - Math.pow(1 - rightRaw, 3) : 1;

      // Phase 4: Arrival at Right Text Icon (around 2.35s)
      if (rightProgress >= 0.95 && !hasDispatchedReveal) {
        hasDispatchedReveal = true;
        window.dispatchEvent(new CustomEvent('vedika_wave_text_orb', { detail: { visible: true } }));
      }

      // =========================================================================
      // 1. LEFT STREAM: SPEECH TO TEXT WAVES (Left Mic Orb ➔ Vedika Chest)
      // =========================================================================
      const speechStartX = leftOrbX + orbRadius - 4;
      const speechEndX = midX;
      const speechSpan = speechEndX - speechStartX;

      if (speechSpan > 50 && leftProgress > 0.02) {
        const currentSpeechX = speechStartX + leftProgress * speechSpan;

        const speechRibbons = [
          {
            amp: 30,
            freq: 0.016,
            speed: 1.8 * flowDir,
            phase: 0,
            color1: 'rgba(34, 211, 238, 0.48)',
            color2: 'rgba(168, 85, 247, 0.38)',
            yOffset: 0,
          },
          {
            amp: 24,
            freq: 0.022,
            speed: 2.2 * flowDir,
            phase: 1.2,
            color1: 'rgba(129, 140, 248, 0.42)',
            color2: 'rgba(192, 132, 252, 0.30)',
            yOffset: 4,
          },
          {
            amp: 18,
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

          const step = 5;
          for (let x = speechStartX; x <= currentSpeechX; x += step) {
            const p = (x - speechStartX) / speechSpan;
            // Smooth aerodynamic tip taper at the leading edge
            const tipDist = currentSpeechX - x;
            const tipTaper = leftProgress < 1 ? Math.min(1, tipDist / 35) : 1;
            const startDist = x - speechStartX;
            const startTaper = Math.min(1, startDist / 25);
            const env = Math.sin(p * Math.PI) * tipTaper * startTaper;

            const y =
              centerY +
              ribbon.yOffset +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
              Math.cos(x * 0.03 - time * flowDir) * 8 * env;
            ctx.lineTo(x, y);
          }

          // Close bottom contour back to start
          ctx.lineTo(currentSpeechX, centerY);
          for (let x = currentSpeechX; x >= speechStartX; x -= step) {
            const p = (x - speechStartX) / speechSpan;
            const tipDist = currentSpeechX - x;
            const tipTaper = leftProgress < 1 ? Math.min(1, tipDist / 35) : 1;
            const startDist = x - speechStartX;
            const startTaper = Math.min(1, startDist / 25);
            const env = Math.sin(p * Math.PI) * tipTaper * startTaper;

            const y =
              centerY +
              ribbon.yOffset +
              18 * env +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase + 0.4) * ribbon.amp * env;
            ctx.lineTo(x, y);
          }

          ctx.closePath();
          const grad = ctx.createLinearGradient(speechStartX, 0, currentSpeechX, 0);
          grad.addColorStop(0, ribbon.color1);
          grad.addColorStop(0.65, ribbon.color2);
          grad.addColorStop(1, leftProgress >= 0.98 ? 'rgba(168, 85, 247, 0.08)' : ribbon.color1);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Leading glowing tip while wave is traveling to Vedika
        if (leftProgress < 0.98) {
          ctx.save();
          const tipGrad = ctx.createRadialGradient(
            currentSpeechX,
            centerY,
            0,
            currentSpeechX,
            centerY,
            24
          );
          tipGrad.addColorStop(0, '#C084FC');
          tipGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.6)');
          tipGrad.addColorStop(1, 'rgba(34, 211, 238, 0)');
          ctx.fillStyle = tipGrad;
          ctx.beginPath();
          ctx.arc(currentSpeechX, centerY, 24, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(currentSpeechX, centerY, 4.5 + Math.sin(time * 8) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#22D3EE';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }

        // Audio Frequency Equalizer Bars - Sequentially ignited as wave sweeps past
        const numBars = 24;
        const barWidth = 5.2;
        const barGap = 4.0;
        const barGroupWidth = numBars * (barWidth + barGap);
        const barStartX = speechStartX + (speechSpan - barGroupWidth) * 0.5;

        for (let i = 0; i < numBars; i++) {
          const x = barStartX + i * (barWidth + barGap);

          // Only draw bar if the speech wave has reached its position
          if (currentSpeechX >= x) {
            const centerDist = Math.abs(i - numBars / 2) / (numBars / 2);
            const env = Math.cos(centerDist * (Math.PI / 2.3));

            // Smooth spring pop-in as wave edge passes over bar
            const barSweepDist = currentSpeechX - x;
            const barReveal = Math.min(1, Math.max(0, barSweepDist / 28));
            const barPop = barReveal < 1 ? Math.sin(barReveal * Math.PI * 0.5) : 1;

            const barHeight = Math.max(
              8,
              (Math.sin(time * 3.4 + i * 0.42) * 0.38 +
                Math.cos(time * 6.0 + i * 0.3) * 0.28 +
                0.58) *
                92 *
                env *
                barPop
            );

            const y = centerY - barHeight / 2;
            const barGrad = ctx.createLinearGradient(x, y, x, y + barHeight);
            barGrad.addColorStop(0, '#C084FC');
            barGrad.addColorStop(0.45, '#7C3AED');
            barGrad.addColorStop(1, '#06B6D4');

            ctx.save();
            ctx.shadowColor = 'rgba(168, 85, 247, 0.45)';
            ctx.shadowBlur = 8;
            ctx.fillStyle = barGrad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [3.5, 3.5, 3.5, 3.5]);
            ctx.fill();
            ctx.restore();
          }
        }

        // Luminous Speech Particles
        speechParticles.forEach((p) => {
          if (isSTT) {
            p.x += p.speed * 1.6;
            if (p.x > currentSpeechX) {
              p.x = speechStartX;
              p.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          } else {
            p.x -= p.speed * 1.6;
            if (p.x < speechStartX) {
              p.x = currentSpeechX;
              p.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          }

          if (p.x <= currentSpeechX) {
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
          }
        });
      }

      // =========================================================================
      // 2. CHEST IMPACT & COLOR TRANSFORMATION CORE (At Vedika's Chest: midX, centerY)
      // =========================================================================
      if (chestHitTime > 0) {
        // Trigger particle burst once when wave touches chest
        if (!hasTriggeredSparks) {
          hasTriggeredSparks = true;
          triggerChestSparks(midX, centerY);
        }

        ctx.save();

        // Luminous core aura expanding and color-shifting from purple/cyan to gold
        const coreRadius = 75 + Math.sin(time * 3.5) * 8;
        const coreGrad = ctx.createRadialGradient(midX, centerY, 0, midX, centerY, coreRadius);

        // Core blends from violet to brilliant amber
        const goldWeight = Math.min(1, Math.max(0, chestHitTime / 0.8));
        coreGrad.addColorStop(
          0,
          goldWeight > 0.5 ? 'rgba(251, 191, 36, 0.45)' : 'rgba(192, 132, 252, 0.45)'
        );
        coreGrad.addColorStop(
          0.4,
          goldWeight > 0.5 ? 'rgba(245, 158, 11, 0.28)' : 'rgba(168, 85, 247, 0.25)'
        );
        coreGrad.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(midX, centerY, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // Expanding concentric transformation ripples
        for (let r = 0; r < 3; r++) {
          const cycle = 1.3;
          const prog = ((chestHitTime * 1.2 + r * 0.42) % cycle) / cycle;
          const rippleRadius = prog * 68;
          const rippleAlpha = Math.max(0, (1 - prog) * 0.65);

          ctx.beginPath();
          ctx.arc(midX, centerY, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle =
            r % 2 === 0
              ? `rgba(251, 191, 36, ${rippleAlpha})`
              : `rgba(192, 132, 252, ${rippleAlpha})`;
          ctx.lineWidth = 2.0 * (1 - prog * 0.5);
          ctx.shadowColor = '#F59E0B';
          ctx.shadowBlur = 8;
          ctx.stroke();
        }

        // Center jewel spark
        ctx.beginPath();
        ctx.arc(midX, centerY, 4.5 + Math.sin(time * 6) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFBEB';
        ctx.shadowColor = '#FBBF24';
        ctx.shadowBlur = 14;
        ctx.fill();

        ctx.restore();

        // Update and render transformation sparks
        for (let i = chestSparks.length - 1; i >= 0; i--) {
          const spk = chestSparks[i];
          spk.x += spk.vx;
          spk.y += spk.vy;
          spk.life -= delta / spk.maxLife;

          if (spk.life <= 0) {
            chestSparks.splice(i, 1);
          } else {
            ctx.save();
            ctx.beginPath();
            ctx.arc(spk.x, spk.y, spk.size * spk.life, 0, Math.PI * 2);
            ctx.fillStyle = spk.color;
            ctx.globalAlpha = spk.life * 0.85;
            ctx.shadowColor = spk.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // =========================================================================
      // 3. RIGHT STREAM: TEXT TO SPEECH WAVES (Vedika Chest ➔ Right Doc Orb)
      // =========================================================================
      const textStartX = midX;
      const textEndX = rightOrbX - orbRadius + 4;
      const textSpan = textEndX - textStartX;

      if (textSpan > 50 && rightProgress > 0.02) {
        const currentTextX = textStartX + rightProgress * textSpan;

        const textRibbons = [
          {
            amp: 24,
            freq: 0.016,
            speed: 1.7 * flowDir,
            phase: 0.5,
            color1: 'rgba(251, 191, 36, 0.42)',
            color2: 'rgba(245, 158, 11, 0.36)',
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

          const step = 5;
          for (let x = textStartX; x <= currentTextX; x += step) {
            const p = (x - textStartX) / textSpan;
            const tipDist = currentTextX - x;
            const tipTaper = rightProgress < 1 ? Math.min(1, tipDist / 35) : 1;
            const startDist = x - textStartX;
            const startTaper = Math.min(1, startDist / 25);
            const env = Math.sin(p * Math.PI) * tipTaper * startTaper;

            const y =
              centerY +
              ribbon.yOffset +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase) * ribbon.amp * env +
              Math.cos(x * 0.03 - time * flowDir) * 6 * env;
            ctx.lineTo(x, y);
          }

          ctx.lineTo(currentTextX, centerY);
          for (let x = currentTextX; x >= textStartX; x -= step) {
            const p = (x - textStartX) / textSpan;
            const tipDist = currentTextX - x;
            const tipTaper = rightProgress < 1 ? Math.min(1, tipDist / 35) : 1;
            const startDist = x - textStartX;
            const startTaper = Math.min(1, startDist / 25);
            const env = Math.sin(p * Math.PI) * tipTaper * startTaper;

            const y =
              centerY +
              ribbon.yOffset +
              14 * env +
              Math.sin(x * ribbon.freq - time * ribbon.speed + ribbon.phase + 0.4) * ribbon.amp * env;
            ctx.lineTo(x, y);
          }

          ctx.closePath();
          const grad = ctx.createLinearGradient(textStartX, 0, currentTextX, 0);
          grad.addColorStop(0, 'rgba(245, 158, 11, 0.06)');
          grad.addColorStop(0.35, ribbon.color1);
          grad.addColorStop(1, ribbon.color2);
          ctx.fillStyle = grad;
          ctx.fill();
        });

        // Leading glowing golden tip while wave is traveling to Right Text Orb
        if (rightProgress < 0.98) {
          ctx.save();
          const tipGrad = ctx.createRadialGradient(
            currentTextX,
            centerY,
            0,
            currentTextX,
            centerY,
            24
          );
          tipGrad.addColorStop(0, '#FEF08A');
          tipGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.65)');
          tipGrad.addColorStop(1, 'rgba(217, 119, 6, 0)');
          ctx.fillStyle = tipGrad;
          ctx.beginPath();
          ctx.arc(currentTextX, centerY, 24, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(currentTextX, centerY, 4.5 + Math.sin(time * 8) * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FBBF24';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }

        // Floating Typographic Glyphs (Indic scripts + English)
        textLetters.forEach((l) => {
          if (isSTT) {
            l.x += l.speed * 1.5;
            l.rotation += l.rotSpeed;
            if (l.x > currentTextX) {
              l.x = textStartX;
              l.baseY = centerY + (Math.random() - 0.5) * 45;
              l.char = getRandomGlyph();
            }
          } else {
            l.x -= l.speed * 1.5;
            l.rotation -= l.rotSpeed;
            if (l.x < textStartX) {
              l.x = currentTextX;
              l.baseY = centerY + (Math.random() - 0.5) * 45;
              l.char = getRandomGlyph();
            }
          }

          if (l.x <= currentTextX) {
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
          }
        });

        // Golden Sparkles
        sparkles.forEach((s) => {
          if (isSTT) {
            s.x += s.speed * 1.6;
            if (s.x > currentTextX) {
              s.x = textStartX;
              s.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          } else {
            s.x -= s.speed * 1.6;
            if (s.x < textStartX) {
              s.x = currentTextX;
              s.baseY = centerY + (Math.random() - 0.5) * 45;
            }
          }

          if (s.x <= currentTextX) {
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
          }
        });

        // Arrival shockwave when golden wave hits the right text orb
        if (rightProgress >= 0.95) {
          const arrivalAge = seqTime - (rightDelay + rightDuration * 0.95);
          if (arrivalAge > 0 && arrivalAge < 1.4) {
            const arrP = arrivalAge / 1.4;
            const arrR = arrP * 65;
            const arrAlpha = (1 - arrP) * 0.75;

            ctx.save();
            ctx.beginPath();
            ctx.arc(rightOrbX, centerY, arrR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(245, 158, 11, ${arrAlpha})`;
            ctx.lineWidth = 2.5 * (1 - arrP);
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 12;
            ctx.stroke();
            ctx.restore();
          }
        }
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
});
