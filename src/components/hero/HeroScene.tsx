'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { VedikaModel } from '@/components/vedika/VedikaModel';
import { VedikaLighting } from '@/components/vedika/VedikaLighting';
import { VedikaEffects } from '@/components/vedika/VedikaEffects';
import { ScrollState } from '@/hooks/useHeroScroll';
import { useTheme } from '@/hooks/useTheme';

interface HeroSceneProps {
  scrollRef?: React.RefObject<ScrollState>;
}

export function HeroScene({ scrollRef }: HeroSceneProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <Suspense fallback={null}>
          <VedikaLighting />
          <VedikaEffects />
          <VedikaModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
