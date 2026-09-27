'use client';

import React, { useState, useEffect } from 'react';
import {
  Lightbulb,
  BookOpen,
  GraduationCap,
  Settings,
  Code2,
  BarChart3,
} from 'lucide-react';
import { useInteraction } from '@/hooks/useInteraction';

interface FeatureItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  color: string;
  leftPercent: number; // Horizontal placement
  topPercent: number;  // Vertical placement (snuggled close to wave crests and troughs)
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'concept',
    title: 'Concept Explanations',
    icon: Lightbulb,
    color: '#FBBF24', // Amber/Yellow
    leftPercent: 30,  // Crest 1
    topPercent: 38.0, // Above wave crest 1: title on top, icon below, not touching wave
    description: 'Deep, intuitive breakdowns of fundamental principles in simple language.',
  },
  {
    id: 'examples',
    title: 'Examples',
    icon: BookOpen,
    color: '#A855F7', // Violet
    leftPercent: 42,  // Trough 1
    topPercent: 77.0, // Below wave trough 1: icon on top, title below, near wave but not touching
    description: 'Real-world practical analogies, code snippets, and illustrated cases.',
  },
  {
    id: 'guidance',
    title: 'Step-by-Step Guidance',
    icon: GraduationCap,
    color: '#22D3EE', // Cyan
    leftPercent: 54,  // Crest 2
    topPercent: 37.0, // Above wave crest 2: title on top, icon below, not touching wave
    description: 'Structured sequential paths that guide you from beginner to mastery.',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    icon: Settings,
    color: '#F43F5E', // Pink/Rose
    leftPercent: 66,  // Trough 2
    topPercent: 77.0, // Below wave trough 2: icon on top, title below, near wave but not touching
    description: 'Interactive diagnostic workflows and algorithmic reasoning methods.',
  },
  {
    id: 'code-help',
    title: 'Code Help',
    icon: Code2,
    color: '#60A5FA', // Blue
    leftPercent: 78,  // Crest 3
    topPercent: 38.0, // Above wave crest 3: title on top, icon below, not touching wave
    description: 'Syntax debugging, architectural review, and instant idiomatic refactors.',
  },
  {
    id: 'build-understanding',
    title: 'Build Understanding',
    icon: BarChart3,
    color: '#C084FC', // Soft Purple
    leftPercent: 90,  // Trough 3
    topPercent: 77.0, // Below wave trough 3: icon on top, title below, near wave but not touching
    description: 'Adaptive knowledge synthesis tracking concept retention and mastery.',
  },
];

export function ExplorationSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { scrollProgress } = useInteraction();
  const [visibleCount, setVisibleCount] = useState(0);

  // Vedika is settled into Page 3 position between 1.65 and 2.08 (works forward and reverse)
  const isVedikaInPosition = scrollProgress >= 1.65 && scrollProgress <= 2.08;

  // Staggered sequential reveal: elements appear smoothly one after another along the wave
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    if (isVedikaInPosition) {
      const startDelay = 250;
      const stepInterval = 280;

      for (let i = 0; i < FEATURES.length; i++) {
        const timer = setTimeout(() => {
          setVisibleCount((prev) => Math.max(prev, i + 1));
        }, startDelay + i * stepInterval);
        timers.push(timer);
      }
    } else {
      setVisibleCount(0);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVedikaInPosition]);

  useEffect(() => {
    const handleFlowReset = () => {
      setVisibleCount(0);
    };

    window.addEventListener('vedika_wave_flow_reset', handleFlowReset);
    return () => {
      window.removeEventListener('vedika_wave_flow_reset', handleFlowReset);
    };
  }, []);

  return (
    <section
      aria-label="Ask anything to Vedika - Core Capabilities"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
        pointerEvents: 'none',
      }}
    >
      {/* TOP HEADER: Headline & Subtitle (brought down for navbar breathing space) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(5.5rem, 9.5vh, 7.5rem)',
          left: '50%',
          transform: isVedikaInPosition
            ? 'translateX(-50%) translateY(0)'
            : 'translateX(-50%) translateY(-22px)',
          opacity: isVedikaInPosition ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          textAlign: 'center',
          width: '90%',
          maxWidth: '860px',
          zIndex: 20,
          pointerEvents: isVedikaInPosition ? 'auto' : 'none',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 3.6vw, 3.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            margin: '0 0 10px 0',
            lineHeight: 1.15,
            color: '#FFFFFF',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.9), 0 1px 4px #000000',
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
            fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
            color: '#94A3B8',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.5,
            fontWeight: 400,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
          }}
        >
          Get clear explanations, examples and step-by-step guidance for any subject.
        </p>
      </div>

      {/* FEATURE ELEMENTS: Appear smoothly one after the other along the wave */}
      <div
        className="features-container"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          const isHovered = activeItem === feat.id;
          const isRevealed = idx < visibleCount;

          return (
            <div
              key={feat.id}
              className={'feature-node node-' + feat.id}
              onMouseEnter={() => setActiveItem(feat.id)}
              onMouseLeave={() => setActiveItem(null)}
              style={{
                position: 'absolute',
                left: feat.leftPercent + '%',
                top: feat.topPercent + '%',
                transform: isRevealed
                  ? (isHovered
                      ? 'translate(-50%, -50%) translateY(-6px) scale(1.06)'
                      : 'translate(-50%, -50%) translateY(0) scale(1.0)')
                  : 'translate(-50%, -50%) translateY(22px) scale(0.70)',
                opacity: isRevealed ? 1 : 0,
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                pointerEvents: isRevealed ? 'auto' : 'none',
                zIndex: isHovered ? 30 : 20,
              }}
            >
              {/* Feature item container: big background removed, clean transparent layout */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'transparent',
                  padding: '6px 10px',
                  transition: 'transform 0.2s ease',
                }}
              >
                {/* Top 3 elements: Name ON TOP, Icon BELOW. Bottom 3 elements: Icon ON TOP, Name BELOW */}
                {feat.topPercent < 55 ? (
                  <>
                    {/* Title Label on Top */}
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.015em',
                        color: isHovered ? '#FFFFFF' : '#CBD5E1',
                        minWidth: '120px',
                        maxWidth: '160px',
                        lineHeight: 1.35,
                        marginBottom: '8px',
                        transition: 'color 0.2s ease',
                        userSelect: 'none',
                        textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 2px #000000',
                      }}
                    >
                      {feat.title}
                    </span>

                    {/* Icon Below */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: isHovered ? 'scale(1.12)' : 'scale(1.0)',
                        transition: 'transform 0.25s ease',
                        filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.75)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.9))',
                      }}
                    >
                      <Icon size={38} color={feat.color} strokeWidth={2.2} />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Icon on Top */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '8px',
                        transform: isHovered ? 'scale(1.12)' : 'scale(1.0)',
                        transition: 'transform 0.25s ease',
                        filter: 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.75)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.9))',
                      }}
                    >
                      <Icon size={38} color={feat.color} strokeWidth={2.2} />
                    </div>

                    {/* Title Label Below */}
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.015em',
                        color: isHovered ? '#FFFFFF' : '#CBD5E1',
                        minWidth: '120px',
                        maxWidth: '160px',
                        lineHeight: 1.35,
                        transition: 'color 0.2s ease',
                        userSelect: 'none',
                        textShadow: '0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 2px #000000',
                      }}
                    >
                      {feat.title}
                    </span>
                  </>
                )}
              </div>

              {/* Clean Tooltip on Hover: Above for top elements, Below for bottom elements */}
              {isHovered && (() => {
                const isTop = feat.topPercent < 55;
                const isFarRight = feat.leftPercent >= 85;

                return (
                  <div
                    style={{
                      position: 'absolute',
                      top: isTop ? 'auto' : 'calc(100% + 12px)',
                      bottom: isTop ? 'calc(100% + 12px)' : 'auto',
                      left: isFarRight ? 'auto' : '50%',
                      right: isFarRight ? '-10px' : 'auto',
                      transform: isFarRight ? 'none' : 'translateX(-50%)',
                      width: '210px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: '#0F172A',
                      border: '1px solid #334155',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.85)',
                      zIndex: 40,
                      animation: isTop ? 'tooltipFadeAbove 0.16s ease-out' : 'tooltipFadeBelow 0.16s ease-out',
                      pointerEvents: 'none',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.72rem',
                        color: '#E2E8F0',
                        margin: 0,
                        lineHeight: 1.4,
                      }}
                    >
                      {feat.description}
                    </p>
                  </div>
                );
              })()}
            </div>
          );
        })}
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

        @keyframes tooltipFadeAbove {
          from {
            opacity: 0;
            margin-bottom: -4px;
          }
          to {
            opacity: 1;
            margin-bottom: 0px;
          }
        }

        @keyframes tooltipFadeBelow {
          from {
            opacity: 0;
            margin-top: -4px;
          }
          to {
            opacity: 1;
            margin-top: 0px;
          }
        }

        @media (max-width: 900px) {
          :global(.features-container) {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
            position: relative !important;
            padding: 8rem 2rem 2rem 2rem !important;
            overflow-y: auto !important;
            pointer-events: auto !important;
          }
          :global(.feature-node) {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
