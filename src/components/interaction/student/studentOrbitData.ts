export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  color: string;
  rgb: string;
  direction: 'left' | 'right' | 'top';
  cardRow: number;
}

/** Auto-advance interval in ms */
export const STEP_MS = 2500;

/**
 * 9 student capabilities in 5 perfectly spaced spacious vertical tiers:
 *   Level 1: Node 1 (Top Center, Y = -190)
 *   Level 2: Node 2 (Right, Y = -95) & Node 9 (Left, Y = -95)  [ΔY = 95px]
 *   Level 3: Node 3 (Right, Y = 0)   & Node 8 (Left, Y = 0)    [ΔY = 95px]
 *   Level 4: Node 4 (Right, Y = +95) & Node 7 (Left, Y = +95)  [ΔY = 95px]
 *   Level 5: Node 5 (Right, Y = +185)& Node 6 (Left, Y = +185) [ΔY = 90px]
 */
export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  // ── LEVEL 1: TOP (Subtle Warm Champagne Gold like Teacher/Admin panels) ───
  {
    id: 'non-judgmental',
    index: 1,
    title: 'Non-Judgmental Space',
    desc: 'Ask freely and make mistakes without fear.',
    shortLabel: 'Learn without fear',
    color: '#D4AF37',
    rgb: '212, 175, 55',
    direction: 'top',
    cardRow: 0,
  },

  // ── RIGHT SIDE (Levels 2 → 5) ─────────────────────────────────────────────
  {
    id: 'own-pace',
    index: 2,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics comfortably.',
    shortLabel: 'Your pace',
    color: '#38BDF8',
    rgb: '56, 189, 248',
    direction: 'right',
    cardRow: 1,
  },
  {
    id: 'concept-clarity',
    index: 3,
    title: 'Concept Clarity',
    desc: 'Step-by-step simple explanations with examples.',
    shortLabel: 'Understand deeply',
    color: '#10B981',
    rgb: '16, 185, 129',
    direction: 'right',
    cardRow: 2,
  },
  {
    id: 'personalized-support',
    index: 4,
    title: 'Personalized Support',
    desc: 'Adapts to your style and targets weak areas.',
    shortLabel: 'Made for you',
    color: '#FB7185',
    rgb: '251, 113, 133',
    direction: 'right',
    cardRow: 3,
  },
  {
    id: 'build-confidence',
    index: 5,
    title: 'Build Confidence',
    desc: 'Turn doubts into lasting mastery and curiosity.',
    shortLabel: 'Confidence first',
    color: '#A78BFA',
    rgb: '167, 139, 250',
    direction: 'right',
    cardRow: 4,
  },

  // ── LEFT SIDE (Levels 5 → 2) ──────────────────────────────────────────────
  {
    id: 'practice-exam',
    index: 6,
    title: 'Practice & Exam Ready',
    desc: 'Instant quizzes, mock tests and instant feedback.',
    shortLabel: 'Exam ready',
    color: '#0EA5E9',
    rgb: '14, 165, 233',
    direction: 'left',
    cardRow: 4,
  },
  {
    id: 'interactive-learning',
    index: 7,
    title: 'Interactive Learning',
    desc: '3D visual simulations and active experiments.',
    shortLabel: 'Learn by doing',
    color: '#2DD4BF',
    rgb: '45, 212, 191',
    direction: 'left',
    cardRow: 3,
  },
  {
    id: 'unlimited-questions',
    index: 8,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything anytime, as often as needed.',
    shortLabel: 'Zero limits',
    color: '#60A5FA',
    rgb: '96, 165, 250',
    direction: 'left',
    cardRow: 2,
  },
  {
    id: 'study-companion',
    index: 9,
    title: '24/7 Study Companion',
    desc: 'Get help whenever you need it — day or night.',
    shortLabel: 'Always available',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    direction: 'left',
    cardRow: 1,
  },
];

/** Progress ring radius (125px, diameter 250px) and spacious 600x600 canvas */
export const PROGRESS_R = 125;
export const ICON_R = 175;
export const ORBIT_SIZE = 600;
export const ORBIT_CENTER = 300;

/**
 * Progress ring bead angle (degrees) for each active step.
 * Aligned with the exact radial direction of each orbital node.
 */
export const BEAD_ANGLES: Record<number, number> = {
  1: 270,
  2: 330,
  3: 360,
  4: 30,
  5: 65,
  6: 115,
  7: 150,
  8: 180,
  9: 210,
};

export interface OrbitSegmentData {
  segmentIndex: number;
  fromFeatureIndex: number;
  toFeatureIndex: number;
  startAngleDeg: number;
  endAngleDeg: number;
  spanDeg: number;
  arcLength: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  pathD: string;
  fromColor: string;
  toColor: string;
  fromRgb: [number, number, number];
  toRgb: [number, number, number];
  gradientId: string;
}

function parseRgbString(rgbStr: string): [number, number, number] {
  const parts = rgbStr.split(',').map((s) => parseInt(s.trim(), 10));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

/**
 * Pre-computes the 9 continuous arc segments on the progress ring (R=125).
 */
export function buildOrbitSegments(): OrbitSegmentData[] {
  const R = PROGRESS_R;
  const C = ORBIT_CENTER;
  const count = STUDENT_ORBIT_FEATURES.length; // 9

  const featureAngles = [270, 330, 360, 30, 65, 115, 150, 180, 210];

  const segments: OrbitSegmentData[] = [];

  for (let i = 0; i < count; i++) {
    const nextI = (i + 1) % count;
    const a1 = featureAngles[i];
    let a2 = featureAngles[nextI];
    let span = a2 - a1;
    if (span <= 0) span += 360;

    const arcLength = parseFloat(((span / 360) * 2 * Math.PI * R).toFixed(2));

    const rad1 = (a1 * Math.PI) / 180;
    const rad2 = (a2 * Math.PI) / 180;

    const startX = parseFloat((C + R * Math.cos(rad1)).toFixed(2));
    const startY = parseFloat((C + R * Math.sin(rad1)).toFixed(2));
    const endX = parseFloat((C + R * Math.cos(rad2)).toFixed(2));
    const endY = parseFloat((C + R * Math.sin(rad2)).toFixed(2));

    const pathD = `M ${startX} ${startY} A ${R} ${R} 0 0 1 ${endX} ${endY}`;
    const featFrom = STUDENT_ORBIT_FEATURES[i];
    const featTo = STUDENT_ORBIT_FEATURES[nextI];

    segments.push({
      segmentIndex: i,
      fromFeatureIndex: featFrom.index,
      toFeatureIndex: featTo.index,
      startAngleDeg: a1,
      endAngleDeg: a2,
      spanDeg: span,
      arcLength,
      startX,
      startY,
      endX,
      endY,
      pathD,
      fromColor: featFrom.color,
      toColor: featTo.color,
      fromRgb: parseRgbString(featFrom.rgb),
      toRgb: parseRgbString(featTo.rgb),
      gradientId: `orbitSegGrad_${i}`,
    });
  }

  return segments;
}

export const ORBIT_SEGMENTS: OrbitSegmentData[] = buildOrbitSegments();

export interface NodePositionData {
  cardX: number;
  cardY: number;
  nodeAngleDeg: number;
  connectorD: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  iconCx: number;
  iconCy: number;
  cardCss: React.CSSProperties;
}

/**
 * 9 Card Positions & Gradient Connector Coordinates matching reference image:
 *   Node 1: Top Center (0, -195)
 *   Node 2: Upper Right (265, -110)
 *   Node 3: Middle Right (285, 0)
 *   Node 4: Lower Right (265, 110)
 *   Node 5: Bottom Right (145, 205)
 *   Node 6: Bottom Left (-145, 205)
 *   Node 7: Lower Left (-265, 110)
 *   Node 8: Middle Left (-285, 0)
 *   Node 9: Upper Left (-265, -110)
 */
export const NODE_POSITIONS: Record<number, NodePositionData> = {
  1: {
    cardX: 0,
    cardY: -195,
    nodeAngleDeg: 270,
    connectorD: 'M 300 175 L 300 132',
    x1: 300,
    y1: 175,
    x2: 300,
    y2: 132,
    iconCx: 0,
    iconCy: -195,
    cardCss: {},
  },
  2: {
    cardX: 265,
    cardY: -110,
    nodeAngleDeg: 330,
    connectorD: 'M 408.25 237.5 L 434 190',
    x1: 408.25,
    y1: 237.5,
    x2: 434,
    y2: 190,
    iconCx: 265,
    iconCy: -110,
    cardCss: {},
  },
  3: {
    cardX: 285,
    cardY: 0,
    nodeAngleDeg: 0,
    connectorD: 'M 425 300 L 454 300',
    x1: 425,
    y1: 300,
    x2: 454,
    y2: 300,
    iconCx: 285,
    iconCy: 0,
    cardCss: {},
  },
  4: {
    cardX: 265,
    cardY: 110,
    nodeAngleDeg: 30,
    connectorD: 'M 408.25 362.5 L 434 410',
    x1: 408.25,
    y1: 362.5,
    x2: 434,
    y2: 410,
    iconCx: 265,
    iconCy: 110,
    cardCss: {},
  },
  5: {
    cardX: 145,
    cardY: 205,
    nodeAngleDeg: 65,
    connectorD: 'M 352.8 413.3 L 385 478',
    x1: 352.8,
    y1: 413.3,
    x2: 385,
    y2: 478,
    iconCx: 145,
    iconCy: 205,
    cardCss: {},
  },
  6: {
    cardX: -145,
    cardY: 205,
    nodeAngleDeg: 115,
    connectorD: 'M 247.2 413.3 L 215 478',
    x1: 247.2,
    y1: 413.3,
    x2: 215,
    y2: 478,
    iconCx: -145,
    iconCy: 205,
    cardCss: {},
  },
  7: {
    cardX: -265,
    cardY: 110,
    nodeAngleDeg: 150,
    connectorD: 'M 191.75 362.5 L 166 410',
    x1: 191.75,
    y1: 362.5,
    x2: 166,
    y2: 410,
    iconCx: -265,
    iconCy: 110,
    cardCss: {},
  },
  8: {
    cardX: -285,
    cardY: 0,
    nodeAngleDeg: 180,
    connectorD: 'M 175 300 L 146 300',
    x1: 175,
    y1: 300,
    x2: 146,
    y2: 300,
    iconCx: -285,
    iconCy: 0,
    cardCss: {},
  },
  9: {
    cardX: -265,
    cardY: -110,
    nodeAngleDeg: 210,
    connectorD: 'M 191.75 237.5 L 166 190',
    x1: 191.75,
    y1: 237.5,
    x2: 166,
    y2: 190,
    iconCx: -265,
    iconCy: -110,
    cardCss: {},
  },
};

/** Initial bead position (Node 1, top center, 270°, on R=125, C=300) */
export const BEAD_START_X = ORBIT_CENTER;
export const BEAD_START_Y = ORBIT_CENTER - PROGRESS_R; // 300 - 125 = 175
