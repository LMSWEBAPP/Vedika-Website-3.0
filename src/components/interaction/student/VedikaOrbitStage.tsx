'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import NeuralNoiseBackground from './NeuralNoiseBackground';
import { useInteraction } from '@/hooks/useInteraction';
import {
  STUDENT_ORBIT_FEATURES,
  StudentOrbitFeature,
  NODE_POSITIONS,
  ORBIT_SEGMENTS,
  PROGRESS_R,
  ORBIT_CENTER,
} from './studentOrbitData';
import '@/styles/student-orbit.css';

export default function VedikaOrbitStage() {
  const interactionContext = useInteraction();
  const scrollProgress = interactionContext?.scrollProgress ?? 4.0;
  // Page 5 is active when scrollProgress >= 3.48 (or true if standalone)
  const isPage5Active = interactionContext ? scrollProgress >= 3.48 : true;

  // Active feature spotlight
  const [activeStep, setActiveStep] = useState<number>(1);
  // Tracks which nodes have appeared (initially in compact icon form)
  const [revealedIcons, setRevealedIcons] = useState<Set<number>>(() => new Set());
  // Tracks which nodes have expanded their bar (they STAY visible and never disappear)
  const [revealedBars, setRevealedBars] = useState<Set<number>>(() => new Set());
  // Tracks completed steps
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set());
  // Tracks if the sequential animation has permanently finished
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);
  // Controls smooth fade-in of the center bot on Page 5 entry
  const [isBotFadedIn, setIsBotFadedIn] = useState<boolean>(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasStartedRef = useRef<boolean>(false);

  // SVG animated element refs
  const segmentRefs = useRef<(SVGPathElement | null)[]>(new Array(9).fill(null));
  const beadGroupRef = useRef<SVGGElement | null>(null);
  const beadHaloRef = useRef<SVGCircleElement | null>(null);
  const beadCoreRef = useRef<SVGCircleElement | null>(null);

  // Helper to update bead position and color dynamically on GSAP frames
  const updateBead = useCallback((angleDeg: number, r: number, g: number, b: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const bx = ORBIT_CENTER + PROGRESS_R * Math.cos(rad);
    const by = ORBIT_CENTER + PROGRESS_R * Math.sin(rad);

    if (beadGroupRef.current) {
      beadGroupRef.current.setAttribute('transform', `translate(${bx.toFixed(2)}, ${by.toFixed(2)})`);
    }

    const rgbColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    if (beadCoreRef.current) {
      beadCoreRef.current.setAttribute('fill', rgbColor);
    }
    if (beadHaloRef.current) {
      beadHaloRef.current.setAttribute('fill', rgbColor);
    }
  }, []);

  // Construct master GSAP timeline with optimized, brisk, and fluid timings
  const buildTimeline = useCallback(() => {
    // Reset all 9 segment paths to be completely hidden before starting
    segmentRefs.current.forEach((el, i) => {
      if (el) {
        const seg = ORBIT_SEGMENTS[i];
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.style.strokeDasharray = `${seg.arcLength}px ${seg.arcLength}px`;
        el.style.strokeDashoffset = `${seg.arcLength}px`;
      }
    });
    if (beadGroupRef.current) {
      beadGroupRef.current.style.opacity = '0';
    }

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAnimationFinished(true);
        // Ensure all 9 segments remain permanently visible as a full curved ring
        segmentRefs.current.forEach((el) => {
          if (el) {
            el.style.strokeDashoffset = '0px';
            el.style.opacity = '1';
            el.style.visibility = 'visible';
          }
        });
        // All 9 icons and all 9 bars remain permanently visible around the ring
        const allSteps = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        setCompletedSteps(allSteps);
        setRevealedIcons(allSteps);
        setRevealedBars(allSteps);
        setActiveStep(1);

        // Softly settle the energy bead into the completed ring
        if (beadGroupRef.current) {
          gsap.to(beadGroupRef.current, { opacity: 0, duration: 0.4 });
        }
      },
    });

    // Snappy, energetic, high-momentum timings (1.2s per node, full tour ~11s)
    const S_TRAVEL = 0.40;   // 0.40s swift, fluid glide along the circular neon arc
    const ICON_WAIT = 0.12;  // 0.12s responsive icon arrival
    const C_EXPAND = 0.28;   // 0.28s smooth snappy rollout of the point content
    const C_READ = 0.45;     // 0.45s display before the bead progresses

    // ──────────────────────────────────────────────────────────────────────────
    // STEP 0: Node 1 (Pink, Non-Judgmental Space)
    // ──────────────────────────────────────────────────────────────────────────
    tl.call(() => {
      setRevealedIcons(new Set([1]));
      setCompletedSteps(new Set([1]));
      if (beadGroupRef.current) {
        gsap.to(beadGroupRef.current, { opacity: 1, duration: 0.3 });
      }
    });

    tl.to({}, { duration: ICON_WAIT });

    tl.call(() => {
      setRevealedBars(new Set([1]));
      setActiveStep(1);
    });

    tl.to({}, { duration: C_EXPAND + C_READ });

    // ──────────────────────────────────────────────────────────────────────────
    // STEPS 1 through 7: Segments connecting Node 1 → 2 → 3 → ... → 9
    // ──────────────────────────────────────────────────────────────────────────
    for (let i = 0; i < 8; i++) {
      const seg = ORBIT_SEGMENTS[i];
      const targetFeatureIndex = i + 2;
      const travelLabel = `seg-travel-${i}`;

      const beadState = {
        angle: seg.startAngleDeg,
        r: seg.fromRgb[0],
        g: seg.fromRgb[1],
        b: seg.fromRgb[2],
      };

      tl.addLabel(travelLabel);

      tl.to(
        beadState,
        {
          angle: seg.startAngleDeg + seg.spanDeg,
          r: seg.toRgb[0],
          g: seg.toRgb[1],
          b: seg.toRgb[2],
          duration: S_TRAVEL,
          ease: 'power2.inOut',
          onStart: () => {
            const pathEl = segmentRefs.current[i];
            if (pathEl) {
              pathEl.style.visibility = 'visible';
              pathEl.style.opacity = '1';
            }
          },
          onUpdate: () => {
            updateBead(beadState.angle, beadState.r, beadState.g, beadState.b);
            const p = (beadState.angle - seg.startAngleDeg) / seg.spanDeg;
            const progress = Math.max(0, Math.min(1, p));
            const currentOffset = seg.arcLength * (1 - progress);
            const pathEl = segmentRefs.current[i];
            if (pathEl) {
              pathEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
            }
          },
          onComplete: () => {
            const pathEl = segmentRefs.current[i];
            if (pathEl) {
              pathEl.style.strokeDashoffset = '0px';
            }
          },
        },
        travelLabel
      );

      // Node k icon arrives
      tl.call(() => {
        setRevealedIcons((prev) => new Set(prev).add(targetFeatureIndex));
        setCompletedSteps((prev) => new Set(prev).add(targetFeatureIndex));
      });

      tl.to({}, { duration: ICON_WAIT });

      // Node k bar smoothly expands and stays visible
      tl.call(() => {
        setRevealedBars((prev) => new Set(prev).add(targetFeatureIndex));
        setActiveStep(targetFeatureIndex);
      });

      tl.to({}, { duration: C_EXPAND + C_READ });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // STEP 8: Final Closing Segment (Node 9 back to Node 1, completing 360°)
    // ──────────────────────────────────────────────────────────────────────────
    const finalSeg = ORBIT_SEGMENTS[8];
    const finalLabel = 'seg-travel-final';

    const finalBeadState = {
      angle: finalSeg.startAngleDeg,
      r: finalSeg.fromRgb[0],
      g: finalSeg.fromRgb[1],
      b: finalSeg.fromRgb[2],
    };

    tl.addLabel(finalLabel);

    tl.to(
      finalBeadState,
      {
        angle: finalSeg.startAngleDeg + finalSeg.spanDeg,
        r: finalSeg.toRgb[0],
        g: finalSeg.toRgb[1],
        b: finalSeg.toRgb[2],
        duration: S_TRAVEL,
        ease: 'power2.inOut',
        onStart: () => {
          const pathEl = segmentRefs.current[8];
          if (pathEl) {
            pathEl.style.visibility = 'visible';
            pathEl.style.opacity = '1';
          }
        },
        onUpdate: () => {
          updateBead(finalBeadState.angle, finalBeadState.r, finalBeadState.g, finalBeadState.b);
          const p = (finalBeadState.angle - finalSeg.startAngleDeg) / finalSeg.spanDeg;
          const progress = Math.max(0, Math.min(1, p));
          const currentOffset = finalSeg.arcLength * (1 - progress);
          const pathEl = segmentRefs.current[8];
          if (pathEl) {
            pathEl.style.strokeDashoffset = `${currentOffset.toFixed(2)}px`;
          }
        },
        onComplete: () => {
          const pathEl = segmentRefs.current[8];
          if (pathEl) {
            pathEl.style.strokeDashoffset = '0px';
          }
        },
      },
      finalLabel
    );

    return tl;
  }, [updateBead]);

  // Clean initialization
  useEffect(() => {
    segmentRefs.current.forEach((el, idx) => {
      const seg = ORBIT_SEGMENTS[idx];
      if (el && seg) {
        el.style.strokeDasharray = `${seg.arcLength}px ${seg.arcLength}px`;
        el.style.strokeDashoffset = `${seg.arcLength}px`;
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });

    const firstSeg = ORBIT_SEGMENTS[0];
    updateBead(firstSeg.startAngleDeg, firstSeg.fromRgb[0], firstSeg.fromRgb[1], firstSeg.fromRgb[2]);
    if (beadGroupRef.current) {
      beadGroupRef.current.style.opacity = '0';
    }

    const tl = buildTimeline();
    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [buildTimeline, updateBead]);

  // Gated trigger: Fade in 5th page bot & kid first, then start ring animation smoothly
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isPage5Active && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // 1. Immediately trigger smooth fade-in of Page 5 Vedika robot and kid
      setIsBotFadedIn(true);

      // 2. Start ring sequential tour after the bots have gracefully faded in (~750ms)
      const startTimer = setTimeout(() => {
        timelineRef.current?.play();
      }, 750);
      return () => clearTimeout(startTimer);
    } else if (hasStartedRef.current && !isAnimationFinished) {
      if (!isPage5Active) {
        timelineRef.current.pause();
      } else if (timelineRef.current.paused()) {
        timelineRef.current.resume();
      }
    }
  }, [isPage5Active, isAnimationFinished]);

  // Click handler
  const handleCardClick = (stepIndex: number) => {
    if (!isAnimationFinished) {
      timelineRef.current?.pause();
      setIsAnimationFinished(true);
      segmentRefs.current.forEach((el) => {
        if (el) {
          el.style.strokeDashoffset = '0px';
          el.style.opacity = '1';
          el.style.visibility = 'visible';
        }
      });
      const allSteps = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      setCompletedSteps(allSteps);
      setRevealedIcons(allSteps);
      setRevealedBars(allSteps);
      if (beadGroupRef.current) {
        beadGroupRef.current.style.opacity = '0';
      }
    }

    setActiveStep(stepIndex);
  };

  const handleCardMouseEnter = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };

  return (
    <div
      ref={stageRef}
      className={`vedika-orbit-stage-clean ${isBotFadedIn ? 'stage-faded-in' : 'stage-fading-in'}`}
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ── Subdued Golden & Black Neural Noise Wavy Background ─────── */}
      <NeuralNoiseBackground />

      {/* ── CENTER: 3D BOT + PROGRESSIVE NEON RING ───────────────── */}
      <div className={`vedika-center-pod-clean ${isBotFadedIn ? 'bot-visible' : 'bot-entering'}`}>
        {/* SVG Progress Ring with 9 individual multicolor arc segments + energy bead */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            segmentRefs={segmentRefs}
            beadGroupRef={beadGroupRef}
            beadHaloRef={beadHaloRef}
            beadCoreRef={beadCoreRef}
            revealedSteps={revealedBars}
          />
        </div>

        {/* Central 3D Vedika Robot Canvas (floating dead-center in the ring) */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>

        {/* Hologram Stage Pedestal beneath Vedika (exact match to reference image) */}
        <div className="vedika-hologram-pedestal" aria-hidden="true">
          <div className="hologram-projection-cone" />
          <div className="hologram-glow-floor" />
          <div className="hologram-disc-outer">
            <div className="hologram-disc-inner">
              <div className="hologram-flare-core" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 9 ORBITAL NODES (Unified Single Bar: Icon + Expanding Point) ── */}
      <div className="vedika-orbit-nodes-layer">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const pos = NODE_POSITIONS[feat.index];
          const isCurrentActive = feat.index === activeStep;
          const isIconVis = revealedIcons.has(feat.index);
          const isBarExp = revealedBars.has(feat.index);
          const isAlreadyCompleted = completedSteps.has(feat.index);

          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={isCurrentActive}
              isIconVisible={isIconVis}
              isExpanded={isBarExp}
              isCompleted={isAlreadyCompleted}
              iconCx={pos.iconCx}
              iconCy={pos.iconCy}
              onClick={() => handleCardClick(feat.index)}
              onMouseEnter={() => handleCardMouseEnter(feat.index)}
              onMouseLeave={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
