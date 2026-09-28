'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import CentralVedika3D from '../CentralVedika3D';
import OrbitProgressRing from './OrbitProgressRing';
import OrbitFeatureNode from './OrbitFeatureNode';
import { useInteraction } from '@/hooks/useInteraction';
import {
  STUDENT_ORBIT_FEATURES,
  StudentOrbitFeature,
  NODE_POSITIONS,
  ORBIT_SEGMENTS,
  PROGRESS_R,
  ORBIT_CENTER,
  BEAD_START_X,
  BEAD_START_Y,
} from './studentOrbitData';
import '@/styles/student-orbit.css';

export default function VedikaOrbitStage() {
  const interactionContext = useInteraction();
  const scrollProgress = interactionContext?.scrollProgress ?? 4.0;
  // Page 5 is completely loaded when scrollProgress >= 3.48 (or true if standalone)
  const isPage5Active = interactionContext ? scrollProgress >= 3.48 : true;

  // Active feature spotlight (0 = none/settled, 1..9 = current step)
  const [activeStep, setActiveStep] = useState<number>(0);
  // Icons that have been reached and stay visible
  const [revealedIcons, setRevealedIcons] = useState<Set<number>>(() => new Set());
  // Cards that have unfolded and stay visible
  const [revealedCards, setRevealedCards] = useState<Set<number>>(() => new Set());
  // Feature nodes that have been completed and stay prominently illuminated
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set());
  // Tracks if the sequential animation has permanently finished
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

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

  // Construct master GSAP timeline
  const buildTimeline = useCallback(() => {
    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsAnimationFinished(true);
        // Ensure all 9 segments remain permanently visible as a full curved spectrum
        segmentRefs.current.forEach((el) => {
          if (el) {
            el.style.strokeDashoffset = '0px';
            el.style.opacity = '1';
            el.style.visibility = 'visible';
          }
        });
        // All 9 icons and all 9 cards stay permanently revealed
        setCompletedSteps(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setRevealedIcons(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setRevealedCards(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        setActiveStep(0);
        // Softly settle the energy bead into the completed ring
        if (beadGroupRef.current) {
          gsap.to(beadGroupRef.current, { opacity: 0, duration: 0.5 });
        }
      },
    });

    const S_TRAVEL = 0.95;  // Smooth 0.95s travel for each equal 40-degree segment
    const ICON_WAIT = 0.28; // 0.28s pause so ICON arrives first!
    const C_EXPAND = 0.35;  // 0.35s card unfold
    const C_READ = 1.30;    // 1.30s display for card reading

    // ──────────────────────────────────────────────────────────────────────────
    // STEP 0: Reveal Node 1 ICON FIRST, then POINT (Card)
    // ──────────────────────────────────────────────────────────────────────────
    tl.call(() => {
      // 1. Icon 1 appears smoothly first!
      setRevealedIcons(new Set([1]));
      setCompletedSteps(new Set([1]));
      if (beadGroupRef.current) {
        beadGroupRef.current.style.opacity = '1';
      }
    });
    // Brief pause so icon is established
    tl.to({}, { duration: ICON_WAIT });
    // 2. Point 1 (card) smoothly fades in and unfolds after icon!
    tl.call(() => {
      setActiveStep(1);
      setRevealedCards(new Set([1]));
    });
    // Card 1 expands and STAYS open!
    tl.to({}, { duration: C_EXPAND + C_READ });

    // ──────────────────────────────────────────────────────────────────────────
    // STEPS 1 through 7: Segments connecting Node 1 → 2 → 3 → ... → 9
    // As the energy point travels along each 40° arc, the ring paints dynamically.
    // At node k: ICON arrives first, then POINT (card) smoothly fades in!
    // ──────────────────────────────────────────────────────────────────────────
    for (let i = 0; i < 8; i++) {
      const seg = ORBIT_SEGMENTS[i];
      const targetFeatureIndex = i + 2; // 1-based index of arriving node (2..9)
      const travelLabel = `seg-travel-${i}`;

      const beadState = {
        angle: seg.startAngleDeg,
        r: seg.fromRgb[0],
        g: seg.fromRgb[1],
        b: seg.fromRgb[2],
      };

      tl.addLabel(travelLabel);

      // Move energy bead along the circular path while simultaneously painting the stroke
      tl.to(
        beadState,
        {
          angle: seg.startAngleDeg + seg.spanDeg,
          r: seg.toRgb[0],
          g: seg.toRgb[1],
          b: seg.toRgb[2],
          duration: S_TRAVEL,
          ease: 'power1.inOut',
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

      // 1. Energy bead arrives: ICON COMES FIRST!
      tl.call(() => {
        setRevealedIcons((prev) => new Set(prev).add(targetFeatureIndex));
        setCompletedSteps((prev) => new Set(prev).add(targetFeatureIndex));
      });

      // Brief pause so icon settles
      tl.to({}, { duration: ICON_WAIT });

      // 2. THEN POINT (CARD) COMES IN SMOOTH FADE-IN!
      tl.call(() => {
        setActiveStep(targetFeatureIndex);
        setRevealedCards((prev) => new Set(prev).add(targetFeatureIndex));
      });

      // Card unfolds and displays while previous cards stay visible
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
        ease: 'power1.inOut',
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
    // Reset all 9 segments to empty initial state
    segmentRefs.current.forEach((el, idx) => {
      const seg = ORBIT_SEGMENTS[idx];
      if (el && seg) {
        el.style.strokeDasharray = `${seg.arcLength}px ${seg.arcLength}px`;
        el.style.strokeDashoffset = `${seg.arcLength}px`;
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });

    // Reset bead to starting position (Node 1 Pink) but hidden until page 5 activates
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

  // Gated trigger: Start only when Page 5 is completely loaded!
  useEffect(() => {
    if (!timelineRef.current) return;

    if (isPage5Active && !hasStartedRef.current) {
      hasStartedRef.current = true;
      // Start smoothly after page transition settles
      const startTimer = setTimeout(() => {
        timelineRef.current?.play();
      }, 350);
      return () => clearTimeout(startTimer);
    } else if (hasStartedRef.current && !isAnimationFinished) {
      if (!isPage5Active) {
        timelineRef.current.pause();
      } else if (timelineRef.current.paused()) {
        timelineRef.current.resume();
      }
    }
  }, [isPage5Active, isAnimationFinished]);

  // Click handler: user can inspect any feature card
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
      setCompletedSteps(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      setRevealedIcons(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      setRevealedCards(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
      if (beadGroupRef.current) {
        beadGroupRef.current.style.opacity = '0';
      }
    }

    setActiveStep(stepIndex);
  };

  const handleCardMouseEnter = (stepIndex: number) => {
    if (isAnimationFinished) {
      setActiveStep(stepIndex);
    }
  };

  return (
    <div
      ref={stageRef}
      className="vedika-orbit-stage-clean"
      role="region"
      aria-label="Student Learning Ecosystem 360-Degree Circular Orbit"
    >
      {/* ── CENTER: 3D BOT + PROGRESSIVE MULTICOLOR RING ───────────────── */}
      <div className="vedika-center-pod-clean">
        {/* SVG Progress Ring with 9 individual multicolor arc segments + energy bead */}
        <div className="vedika-ring-wrap">
          <OrbitProgressRing
            segmentRefs={segmentRefs}
            beadGroupRef={beadGroupRef}
            beadHaloRef={beadHaloRef}
            beadCoreRef={beadCoreRef}
          />
        </div>

        {/* Central 3D Vedika Robot Canvas */}
        <div className="vedika-robot-canvas-box">
          <CentralVedika3D />
        </div>
      </div>

      {/* ── 9 ORBITAL NODES (Pins & Cards) ──────────────────────────────── */}
      <div className="vedika-orbit-nodes-layer">
        {STUDENT_ORBIT_FEATURES.map((feat: StudentOrbitFeature) => {
          const pos = NODE_POSITIONS[feat.index];
          const isCurrentActive = feat.index === activeStep;
          const isIconVis = revealedIcons.has(feat.index);
          const isCardExp = revealedCards.has(feat.index);
          const isAlreadyCompleted = completedSteps.has(feat.index);

          return (
            <OrbitFeatureNode
              key={feat.id}
              feature={feat}
              isActive={isCurrentActive}
              isIconVisible={isIconVis}
              isExpanded={isCardExp}
              isCompleted={isAlreadyCompleted}
              iconCx={pos.iconCx}
              iconCy={pos.iconCy}
              cardCss={pos.cardCss}
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
