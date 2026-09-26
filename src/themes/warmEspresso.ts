import { VedikaTheme } from './types';

export const warmEspresso: VedikaTheme = {
  id: 'warm-espresso',
  name: 'Warm Espresso',
  tagline: 'Cinematic Luxurious Atmosphere',
  colors: {
    backgroundDeepest: '#140602',
    backgroundPrimary: '#230902',
    backgroundSecondary: '#300B01',
    deepAccent: '#411202',
    accent: '#722B05',
    accentBright: '#C98A32',
    accentWarm: '#5F2A0B',
    textPrimary: '#F5F1E8',
    textSecondary: '#C9BBA8',
    textMuted: '#8D7967',
    border: 'rgba(245, 241, 232, 0.12)',
    glow: 'rgba(201, 138, 50, 0.20)',
    gradient: `radial-gradient(
      circle at 72% 38%,
      rgba(114, 43, 5, 0.32) 0%,
      rgba(65, 18, 2, 0.20) 25%,
      rgba(20, 6, 2, 0) 58%
    ),
    radial-gradient(
      circle at 18% 82%,
      rgba(95, 42, 11, 0.18) 0%,
      rgba(20, 6, 2, 0) 48%
    ),
    linear-gradient(
      135deg,
      #140602 0%,
      #230902 42%,
      #300B01 72%,
      #140602 100%
    )`
  },
  lighting: {
    keyColor: '#FFF6EB',
    keyIntensity: 2.1,
    keyPosition: [3, 4, 3],
    fillColor: '#5F2A0B',
    fillIntensity: 1.2,
    fillPosition: [-3, -1, 2],
    rimColor: '#C98A32',
    rimIntensity: 3.4,
    rimPosition: [-3.5, 2.5, -2],
    ambientColor: '#200A04',
    ambientIntensity: 0.6,
    envGlowColor: '#C98A32',
    envGlowIntensity: 0.22
  },
  particles: {
    color: '#C98A32',
    secondaryColor: '#5F2A0B',
    count: 30,
    size: 2.0,
    speed: 0.22,
    opacity: 0.24
  }
};
