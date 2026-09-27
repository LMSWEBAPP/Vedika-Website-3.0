'use client';

import React from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { Sparkles, X } from 'lucide-react';

export function ParticleSphereSection() {
  const { scrollProgress, isLabsExpanded, setIsLabsExpanded } = useInteraction();

  const isPage4Active = scrollProgress >= 2.65 && scrollProgress <= 3.35;

  // Auto collapse if user scrolls back to previous pages or forward to Page 5
  React.useEffect(() => {
    if ((scrollProgress < 2.45 || scrollProgress > 3.35) && isLabsExpanded) {
      setIsLabsExpanded(false);
    }
  }, [scrollProgress, isLabsExpanded, setIsLabsExpanded]);

  if (!isPage4Active) return null;

  return (
    <section
      aria-label="Vedika Labs - Interactive Core"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 30,
      }}
    >
      {/* INVISIBLE CENTRAL CLICK TRIGGER DIRECTLY OVER VEDIKA (Centered at 50%) */}
      <div
        onClick={() => setIsLabsExpanded((prev) => !prev)}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '230px',
          height: '280px',
          borderRadius: '50%',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 35,
        }}
        title={isLabsExpanded ? 'Click to close Labs' : 'Click Vedika to open Labs'}
        aria-label="Toggle Vedika Labs"
      />

      {/* 5 LAB NAME LABELS: Rendered natively in DOM (Permanently eliminates Drei createRoot unmount bug) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isLabsExpanded ? 1 : 0,
          transition: 'opacity 0.35s ease 0.12s',
          zIndex: 32,
        }}
      >
        {/* Math Lab: Right side of Top Sphere */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 115px)',
            top: 'calc(50% - 295px)',
            transform: 'translate(0%, -50%)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          Math Lab
        </div>

        {/* Computer Lab: Upper Left (Pushed further left) */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 395px)',
            top: 'calc(50% - 90px)',
            transform: 'translate(-100%, -50%)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          Computer Lab
        </div>

        {/* Biology Lab: Lower Left (Pushed further left) */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 290px)',
            top: 'calc(50% + 238px)',
            transform: 'translate(-100%, -50%)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          Biology Lab
        </div>

        {/* Physics Lab: Upper Right (Pushed further right) */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 395px)',
            top: 'calc(50% - 90px)',
            transform: 'translate(0%, -50%)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          Physics Lab
        </div>

        {/* Chemistry Lab: Lower Right (Pushed further right) */}
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% + 290px)',
            top: 'calc(50% + 238px)',
            transform: 'translate(0%, -50%)',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.04em',
            color: '#0F172A',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.95)',
            whiteSpace: 'nowrap',
          }}
        >
          Chemistry Lab
        </div>
      </div>

      {/* SUBTLE BOTTOM TOGGLE PILL OPTIMIZED FOR PURE WHITE BACKGROUND */}
      <div
        onClick={() => setIsLabsExpanded((prev) => !prev)}
        style={{
          position: 'absolute',
          bottom: 'clamp(2.0rem, 4.5vh, 3.2rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 22px',
          borderRadius: '24px',
          background: isLabsExpanded
            ? 'rgba(239, 68, 68, 0.08)'
            : 'rgba(15, 23, 42, 0.90)',
          border: isLabsExpanded
            ? '1px solid rgba(239, 68, 68, 0.35)'
            : '1px solid rgba(15, 23, 42, 0.20)',
          boxShadow: isLabsExpanded
            ? '0 8px 25px rgba(239, 68, 68, 0.12)'
            : '0 8px 30px rgba(15, 23, 42, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(12px)',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 40,
          transition: 'all 0.25s ease',
        }}
      >
        {isLabsExpanded ? (
          <>
            <X size={14} color="#E11D48" />
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 600,
                color: '#BE123C',
                letterSpacing: '0.03em',
              }}
            >
              Close Labs
            </span>
          </>
        ) : (
          <>
            <Sparkles size={14} color="#A855F7" />
            <span
              style={{
                fontSize: '0.80rem',
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '0.03em',
              }}
            >
              Click Vedika to explore Labs
            </span>
          </>
        )}
      </div>
    </section>
  );
}
