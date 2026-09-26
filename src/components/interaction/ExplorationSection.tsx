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
  topPercent: number;  // Vertical placement (shifted slightly down for balance)
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'concept',
    title: 'Concept Explanations',
    icon: Lightbulb,
    color: '#FBBF24', // Amber/Yellow
    leftPercent: 30,  // Crest 1
    topPercent: 36.5, // Shifted down along wave crest 1
    description: 'Deep, intuitive breakdowns of fundamental principles in simple language.',
  },
  {
    id: 'examples',
    title: 'Examples',
    icon: BookOpen,
    color: '#A855F7', // Violet
    leftPercent: 42,  // Trough 1
    topPercent: 71.5, // Shifted down along wave trough 1
    description: 'Real-world practical analogies, code snippets, and illustrated cases.',
  },
  {
    id: 'guidance',
    title: 'Step-by-Step Guidance',
    icon: GraduationCap,
    color: '#22D3EE', // Cyan
    leftPercent: 54,  // Crest 2
    topPercent: 35.5, // Shifted down along wave crest 2
    description: 'Structured sequential paths that guide you from beginner to mastery.',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    icon: Settings,
    color: '#F43F5E', // Pink/Rose
    leftPercent: 66,  // Trough 2
    topPercent: 71.5, // Shifted down along wave trough 2
    description: 'Interactive diagnostic workflows and algorithmic reasoning methods.',
  },
  {
    id: 'code-help',
    title: 'Code Help',
    icon: Code2,
    color: '#60A5FA', // Blue
    leftPercent: 78,  // Crest 3
    topPercent: 36.5, // Shifted down along wave crest 3
    description: 'Syntax debugging, architectural review, and instant idiomatic refactors.',
  },
  {
    id: 'build-understanding',
    title: 'Build Understanding',
    icon: BarChart3,
    color: '#C084FC', // Soft Purple
    leftPercent: 90,  // Trough 3
    topPercent: 71.5, // Shifted down along wave trough 3
    description: 'Adaptive knowledge synthesis tracking concept retention and mastery.',
  },
];

export function ExplorationSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { scrollProgress } = useInteraction();
  const [elementsVisible, setElementsVisible] = useState(false);

  // Vedika arrives at Page 3 at scrollProgress >= 1.65
  const isVedikaInPosition = scrollProgress >= 1.65;

  useEffect(() => {
    const handleFlowComplete = () => {
      setElementsVisible(true);
    };

    const handleFlowReset = () => {
      setElementsVisible(false);
    };

    window.addEventListener('vedika_wave_flow_complete', handleFlowComplete);
    window.addEventListener('vedika_wave_flow_reset', handleFlowReset);

    return () => {
      window.removeEventListener('vedika_wave_flow_complete', handleFlowComplete);
      window.removeEventListener('vedika_wave_flow_reset', handleFlowReset);
    };
  }, []);

  useEffect(() => {
    if (scrollProgress < 1.4) {
      setElementsVisible(false);
    }
  }, [scrollProgress]);

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
      {/* TOP HEADER: Headline & Subtitle (appears when Vedika comes into position, shifted down) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(3.8rem, 6.5vh, 5.5rem)',
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
            style={{
              background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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

      {/* FEATURE ELEMENTS: Appear one after another once wave reaches the right end, with black shadow */}
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

          // Staggered reveal timing: each element comes in 130ms after the previous
          const staggerDelay = idx * 130 + 'ms';

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
                transform: elementsVisible
                  ? (isHovered
                      ? 'translate(-50%, -50%) translateY(-6px) scale(1.05)'
                      : 'translate(-50%, -50%) scale(1.0)')
                  : 'translate(-50%, -50%) scale(0.60) translateY(24px)',
                opacity: elementsVisible ? 1 : 0,
                transition: elementsVisible
                  ? 'opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ' + staggerDelay + ', transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ' + staggerDelay
                  : 'opacity 0.25s ease-out, transform 0.25s ease-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                pointerEvents: elementsVisible ? 'auto' : 'none',
                zIndex: isHovered ? 30 : 20,
              }}
            >
              {/* Black Shadow Backing Capsule ensuring crisp separation from wave glow */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.50) 65%, transparent 85%)',
                  padding: '12px 18px',
                  borderRadius: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.95), 0 2px 8px rgba(0, 0, 0, 1.0)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
              >
                {/* Pure Icon with distinct deep black drop-shadow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    transform: isHovered ? 'scale(1.12)' : 'scale(1.0)',
                    transition: 'transform 0.25s ease',
                    filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.98)) drop-shadow(0 2px 4px #000000)',
                  }}
                >
                  <Icon size={38} color={feat.color} strokeWidth={2.2} />
                </div>

                {/* Title Label with heavy black text-shadow */}
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
                    textShadow: '0 2px 10px #000000, 0 4px 18px rgba(0,0,0,0.95), 0 1px 3px #000000',
                  }}
                >
                  {feat.title}
                </span>
              </div>

              {/* Clean Tooltip on Hover */}
              {isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    top: feat.topPercent < 50 ? '118%' : 'auto',
                    bottom: feat.topPercent >= 50 ? '118%' : 'auto',
                    width: '210px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#0F172A',
                    border: '1px solid #334155',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.85)',
                    zIndex: 40,
                    animation: 'tooltipFade 0.15s ease-out',
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
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
