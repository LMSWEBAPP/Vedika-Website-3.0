'use client';

import React from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { STUDENT_ORBIT_FEATURES, StudentOrbitFeature } from './studentOrbitData';

interface OrbitControlsBarProps {
  currentStep: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectStep: (step: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export default function OrbitControlsBar({
  currentStep,
  isPlaying,
  onTogglePlay,
  onSelectStep,
  onPrev,
  onNext,
  onReset,
}: OrbitControlsBarProps) {
  const activeFeature = STUDENT_ORBIT_FEATURES[currentStep - 1] || STUDENT_ORBIT_FEATURES[0];
  const arcDegrees = Math.round((currentStep / 8) * 360);
  const isComplete = currentStep === 8;

  return (
    <div
      className="orbit-controls-pill-bar"
      role="toolbar"
      aria-label="Student ecosystem storytelling and navigation controls"
    >
      {/* 1. Play / Pause / Replay Button */}
      <button
        type="button"
        className="orbit-ctrl-btn play-pause-btn"
        onClick={isComplete && !isPlaying ? onReset : onTogglePlay}
        aria-label={
          isComplete && !isPlaying
            ? 'Restart learning ecosystem cycle'
            : isPlaying
            ? 'Pause sequential storytelling'
            : 'Resume automatic storytelling'
        }
        title={
          isComplete && !isPlaying
            ? 'Restart Cycle (360°)'
            : isPlaying
            ? 'Pause Autoplay'
            : 'Play Autoplay'
        }
      >
        {isComplete && !isPlaying ? (
          <RotateCcw size={13} strokeWidth={2.4} />
        ) : isPlaying ? (
          <Pause size={13} strokeWidth={2.4} />
        ) : (
          <Play size={13} strokeWidth={2.4} fill="currentColor" />
        )}
      </button>

      {/* 2. Step Prev */}
      <button
        type="button"
        className="orbit-ctrl-btn step-arrow-btn"
        onClick={onPrev}
        aria-label="Previous capability"
        title="Previous capability"
      >
        <ChevronLeft size={14} strokeWidth={2.5} />
      </button>

      {/* 3. 8 Interactive Step Indicators */}
      <div className="orbit-step-pills-row" role="tablist" aria-label="Ecosystem capabilities">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const isActive = feat.index === currentStep;
          const isPassed = feat.index <= currentStep;
          return (
            <button
              key={`ctrl-step-${feat.id}`}
              type="button"
              className={`orbit-step-dot ${isActive ? 'is-active' : ''} ${
                isPassed ? 'is-passed' : ''
              }`}
              onClick={() => onSelectStep(feat.index)}
              style={{
                '--dot-color': feat.color,
              } as React.CSSProperties}
              aria-label={`Jump to capability 0${feat.index}: ${feat.title}`}
              aria-selected={isActive}
              role="tab"
              title={`0${feat.index} — ${feat.title} (${feat.shortLabel})`}
            >
              <span className="dot-index">0{feat.index}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Step Next */}
      <button
        type="button"
        className="orbit-ctrl-btn step-arrow-btn"
        onClick={onNext}
        aria-label="Next capability"
        title="Next capability"
      >
        <ChevronRight size={14} strokeWidth={2.5} />
      </button>

      {/* 5. Arc Progress Telemetry Badge */}
      <div
        className="orbit-telemetry-badge"
        style={{
          borderColor: `${activeFeature.color}55`,
          color: activeFeature.color,
        }}
      >
        <span className="telemetry-degree">{arcDegrees}°</span>
        <span className="telemetry-label">
          {isComplete ? '360° ECOSYSTEM' : `STEP 0${currentStep} / 08`}
        </span>
      </div>
    </div>
  );
}
