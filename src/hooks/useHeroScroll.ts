'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollState {
  progress: number;
  xOffset: number; // 0 = left, 1 = center
  scaleMultiplier: number;
  contentOpacity: number;
}

export function useHeroScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<ScrollState>({
    progress: 0,
    xOffset: 0,
    scaleMultiplier: 1,
    contentOpacity: 1,
  });

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      // In reduced motion, keep static
      scrollRef.current = {
        progress: 0,
        xOffset: 0,
        scaleMultiplier: 1,
        contentOpacity: 1,
      };
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=800',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        scrollRef.current = {
          progress: p,
          // Move toward center smoothly
          xOffset: p,
          // Slight physical presence scale up as she centers
          scaleMultiplier: 1 + p * 0.12,
          // Content gently eases down in opacity as she takes center stage
          contentOpacity: Math.max(0, 1 - p * 1.5),
        };
      },
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef]);

  return { scrollProgress, scrollRef };
}
