import { VedikaTheme } from './types';

export const maroonIvory: VedikaTheme = {
  id: 'maroon-ivory',
  name: 'Maroon & Ivory',
  tagline: 'Sophisticated Editorial Elegance',
  colors: {
    backgroundDeepest: '#240A12',
    backgroundPrimary: '#3A101C',
    backgroundSecondary: '#4A1422',
    deepAccent: '#6A2032',
    accent: '#7D3041',
    accentBright: '#C7A56A',
    accentWarm: '#6A2032',
    textPrimary: '#F4EFE6',
    textSecondary: '#D8D0C4',
    textMuted: '#A99E94',
    textDark: '#171114',
    border: 'rgba(244, 239, 230, 0.14)',
    glow: 'rgba(125, 48, 65, 0.22)',
    gradient: `radial-gradient(
      circle at 70% 32%,
      rgba(125, 48, 65, 0.24) 0%,
      rgba(74, 20, 34, 0.12) 30%,
      transparent 60%
    ),
    radial-gradient(
      circle at 18% 82%,
      rgba(199, 165, 106, 0.08) 0%,
      transparent 45%
    ),
    linear-gradient(
      135deg,
      #240A12 0%,
      #3A101C 48%,
      #4A1422 72%,
      #240A12 100%
    )`
  },
  lighting: {
    keyColor: '#FDFBF7',
    keyIntensity: 2.1,
    keyPosition: [3, 4, 3],
    fillColor: '#6A2032',
    fillIntensity: 1.15,
    fillPosition: [-3, -1, 2],
    rimColor: '#7D3041',
    rimIntensity: 3.3,
    rimPosition: [-3.5, 2.5, -2],
    ambientColor: '#250B13',
    ambientIntensity: 0.65,
    envGlowColor: '#C7A56A',
    envGlowIntensity: 0.2
  },
  particles: {
    color: '#D8D0C4',
    secondaryColor: '#C7A56A',
    count: 28,
    size: 2.0,
    speed: 0.2,
    opacity: 0.2
  }
};
