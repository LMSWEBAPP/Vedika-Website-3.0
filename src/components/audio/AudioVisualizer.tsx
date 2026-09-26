'use client';

import React, { useEffect, useRef } from 'react';
import { AudioAnalyzer } from '@/audio/AudioAnalyzer';

interface AudioVisualizerProps {
  analyzerRef?: React.RefObject<AudioAnalyzer | null>;
  active?: boolean;
  simulatedEnergy?: number; // 0 to 1 for TTS playback
  barCount?: number;
  height?: number;
  mode?: 'mic' | 'tts';
}

export function AudioVisualizer({
  analyzerRef,
  active = false,
  simulatedEnergy = 0,
  barCount = 28,
  height = 90,
  mode = 'mic',
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const bars: number[] = new Array(barCount).fill(4);
    const peaks: number[] = new Array(barCount).fill(4);

    let time = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, height);

      time += 0.04;

      // Extract real audio frequency data if available
      let freqData: Uint8Array<ArrayBuffer> | null = null;
      if (mode === 'mic' && active && analyzerRef?.current) {
        freqData = analyzerRef.current.getFrequencyData();
      }

      const totalBars = barCount;
      const gap = 3;
      const barWidth = Math.max(2, (width - (totalBars - 1) * gap) / totalBars);

      for (let i = 0; i < totalBars; i++) {
        let targetHeight = 4;

        if (freqData && freqData.length > 0) {
          // Map frequency bins to bars (symmetrically or progressive)
          const binIndex = Math.min(
            freqData.length - 1,
            Math.floor((i / totalBars) * (freqData.length * 0.75))
          );
          const rawValue = freqData[binIndex] || 0;
          // Apply slight center emphasis
          const centerFactor = 1 - Math.abs((i - totalBars / 2) / (totalBars / 2)) * 0.3;
          targetHeight = Math.max(4, (rawValue / 255) * (h - 12) * centerFactor);
        } else if (mode === 'tts' && active && simulatedEnergy > 0) {
          // Synthetic voice cadence modulation
          const harmonic =
            Math.sin(time * 3 + i * 0.4) * 0.35 +
            Math.cos(time * 5 + i * 0.2) * 0.25;
          const centerCurve = Math.sin((i / (totalBars - 1)) * Math.PI);
          targetHeight = Math.max(
            4,
            simulatedEnergy * (h - 14) * centerCurve * (0.6 + harmonic)
          );
        } else {
          // Ambient gentle resting breathing wave
          const wave = Math.sin(time + i * 0.25) * 0.5 + 0.5;
          targetHeight = 4 + wave * 6;
        }

        // Smooth interpolation
        bars[i] += (targetHeight - bars[i]) * 0.28;

        // Falloff peaks
        if (bars[i] > peaks[i]) {
          peaks[i] = bars[i];
        } else {
          peaks[i] = Math.max(4, peaks[i] - 1.2);
        }

        const x = i * (barWidth + gap);
        const barH = Math.max(3, bars[i]);
        const y = h - barH;

        // Create rich multi-color gradient (Cyan -> Electric Blue -> Violet -> Magenta -> Pink)
        const gradient = ctx.createLinearGradient(0, h, 0, y);
        const colorT = i / (totalBars - 1);

        if (colorT < 0.25) {
          gradient.addColorStop(0, '#27D9E8'); // Cyan
          gradient.addColorStop(0.5, '#3A82F6'); // Electric Blue
          gradient.addColorStop(1, '#8B5CF6'); // Violet
        } else if (colorT < 0.6) {
          gradient.addColorStop(0, '#3A82F6'); // Blue
          gradient.addColorStop(0.5, '#8B5CF6'); // Purple
          gradient.addColorStop(1, '#D946EF'); // Magenta
        } else {
          gradient.addColorStop(0, '#8B5CF6'); // Violet
          gradient.addColorStop(0.5, '#EC4899'); // Pink
          gradient.addColorStop(1, '#F43F5E'); // Rose Pink
        }

        // Draw pill-shaped bar
        ctx.fillStyle = gradient;
        ctx.beginPath();
        const radius = Math.min(barWidth / 2, 3);
        ctx.roundRect(x, y, barWidth, barH, [radius, radius, 1, 1]);
        ctx.fill();

        // Draw delicate floating peak cap
        if (active) {
          const peakY = Math.max(0, h - peaks[i] - 3);
          ctx.fillStyle = colorT > 0.5 ? '#F472B6' : '#67E8F9';
          ctx.beginPath();
          ctx.roundRect(x, peakY, barWidth, 2, [1, 1, 1, 1]);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [analyzerRef, active, simulatedEnergy, barCount, height, mode]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        width={340}
        height={height}
        style={{
          width: '100%',
          height: `${height}px`,
          filter: active
            ? 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.4))'
            : 'drop-shadow(0 0 6px rgba(39, 217, 232, 0.15))',
          transition: 'filter 0.3s ease',
        }}
      />
    </div>
  );
}
