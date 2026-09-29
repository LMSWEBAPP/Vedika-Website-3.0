'use client';

import React, { useMemo } from 'react';
import { useInteraction } from '@/hooks/useInteraction';
import { FlexCarousel } from '@/components/interaction/FlexCarousel';
import { getCarouselItems } from '@/components/interaction/carouselCards';

export function ExplorationSection() {
  const { scrollProgress } = useInteraction();

  // Vedika is settled into Page 3 position between 1.65 and 2.25
  const isVedikaInPosition = scrollProgress >= 1.65 && scrollProgress <= 2.25;

  // 6 high-res knowledge cards
  const carouselItems = useMemo(() => getCarouselItems(), []);

  return (
    <section
      aria-label="Ask anything to Vedika - Core Capabilities"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        pointerEvents: isVedikaInPosition ? 'auto' : 'none',
      }}
    >
      {/* TOP HEADER: Headline & Subtitle (placed near top to avoid any overlap with Vedika) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1.6rem, 3.2vh, 2.6rem)',
          left: '50%',
          transform: isVedikaInPosition
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-22px)',
          opacity: isVedikaInPosition ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '860px',
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2.0rem, 3.2vw, 3.0rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            margin: '0 0 6px 0',
            lineHeight: 1.15,
            color: '#FFFFFF',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.95), 0 1px 4px #000000',
          }}
        >
          Ask anything to{' '}
          <span
            className="vedika-gradient-text"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #F472B6 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              textShadow: 'none',
            }}
          >
            Vedika
          </span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.90rem, 1.15vw, 1.05rem)',
            color: '#94A3B8',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.45,
            fontWeight: 400,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
          }}
        >
          Get clear explanations, examples and step-by-step guidance for any subject.
        </p>
      </div>

      {/* 3D FLEX CAROUSEL (Longer, wider cards with fewer visible in viewport) */}
      <div
        style={{
          position: 'absolute',
          top: '63%',
          left: 0,
          width: '100%',
          height: 'clamp(460px, 58vh, 640px)',
          transform: isVedikaInPosition
            ? 'translateY(-50%) scale(1)'
            : 'translateY(-46%) scale(0.96)',
          opacity: isVedikaInPosition ? 1 : 0,
          transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 20,
          pointerEvents: isVedikaInPosition ? 'auto' : 'none',
        }}
      >
        <FlexCarousel
          items={carouselItems}
          preset="liquid"
          intro="rise"
          cardHeight={0.48}
          gap={48}
          squeeze={0.16}
          focusOnClick
          captions
          fit="portrait"
          radius={28}
          lensWidth={0.76}
          lensHeight={1.16}
          tilt={58}
          roundness={1}
          bend={0.32}
          reach={0.38}
          curl="twist"
          dispersion={0.42}
          liquid={0.12}
          followCursor={false}
          autoplay={false}
          interval={4}
          captureWheel
        />
      </div>

      <style jsx>{`
        .vedika-gradient-text {
          background: linear-gradient(135deg, #22D3EE 0%, #A855F7 50%, #F472B6 100%);
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          color: transparent !important;
          text-shadow: none !important;
        }
      `}</style>
    </section>
  );
}

export default ExplorationSection;
