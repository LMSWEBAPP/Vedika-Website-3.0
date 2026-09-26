import { VedikaTheme } from './types';

export const midnightCyan: VedikaTheme = {
  id: 'midnight-cyan',
  name: 'Midnight Cyan',
  tagline: 'Futuristic Intelligent Guidance',
  colors: {
    backgroundDeepest: '#05070A',
    backgroundPrimary: '#081017',
    backgroundSecondary: '#0D1821',
    accent: '#27D9E8',
    accentBright: '#5EE7F2',
    accentWarm: '#F4B860',
    textPrimary: '#F4F7F8',
    textSecondary: '#9DAAB2',
    textMuted: '#64727C',
    border: 'rgba(255, 255, 255, 0.10)',
    glow: 'rgba(39, 217, 232, 0.20)',
    gradient: `radial-gradient(
      circle at 72% 35%,
      rgba(39, 217, 232, 0.10) 0%,
      rgba(39, 217, 232, 0.04) 25%,
      transparent 55%
    ),
    radial-gradient(
      circle at 25% 80%,
      rgba(244, 184, 96, 0.08) 0%,
      transparent 45%
    ),
    linear-gradient(
      135deg,
      #05070A 0%,
      #081017 45%,
      #0D1821 75%,
      #05070A 100%
    )`
  },
  lighting: {
    keyColor: '#EDF8FB',
    keyIntensity: 2.2,
    keyPosition: [3, 4, 3],
    fillColor: '#36536D',
    fillIntensity: 1.0,
    fillPosition: [-3, -1, 2],
    rimColor: '#27D9E8',
    rimIntensity: 3.2,
    rimPosition: [-3.5, 2.5, -2],
    ambientColor: '#091522',
    ambientIntensity: 0.65,
    envGlowColor: '#27D9E8',
    envGlowIntensity: 0.25
  },
  particles: {
    color: '#27D9E8',
    secondaryColor: '#F4B860',
    count: 32,
    size: 2.2,
    speed: 0.25,
    opacity: 0.22
  }
};
