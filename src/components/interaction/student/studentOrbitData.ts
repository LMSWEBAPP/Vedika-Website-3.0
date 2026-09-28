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
  // ── LEVEL 1: TOP ──────────────────────────────────────────────────────────
  {
    id: 'non-judgmental',
    index: 1,
    title: 'Non-Judgmental Space',
    desc: 'Ask freely and make mistakes without fear.',
    shortLabel: 'Learn without fear',
    color: '#EC4899',
    rgb: '236, 72, 153',
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
    color: '#3B82F6',
    rgb: '59, 130, 246',
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
    color: '#F43F5E',
    rgb: '244, 63, 94',
    direction: 'right',
    cardRow: 3,
  },
  {
    id: 'build-confidence',
    index: 5,
    title: 'Build Confidence',
    desc: 'Turn doubts into lasting mastery and curiosity.',
    shortLabel: 'Confidence first',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
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
    color: '#0284C7',
    rgb: '2, 132, 199',
    direction: 'left',
    cardRow: 4,
  },
  {
    id: 'interactive-learning',
    index: 7,
    title: 'Interactive Learning',
    desc: '3D visual simulations and active experiments.',
    shortLabel: 'Learn by doing',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    direction: 'left',
    cardRow: 3,
  },
  {
    id: 'unlimited-questions',
    index: 8,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything anytime, as often as needed.',
    shortLabel: 'Zero limits',
    color: '#A855F7',
    rgb: '168, 85, 247',
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

/** Progress ring radius (135px, diameter 270px) and spacious canvas dimensions */
export const PROGRESS_R = 135;
export const ICON_R = 195;
export const ORBIT_SIZE = 380;
export const ORBIT_CENTER = 190;

/**
 * Progress ring bead angle (degrees) for each active step.
 * Aligned with the exact radial direction of each orbital node.
 */
export const BEAD_ANGLES: Record<number, number> = {
  1: 270,
  2: 331,
  3: 360,
  4: 29,
  5: 66,
  6: 114,
  7: 151,
  8: 180,
  9: 209,
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
 * Pre-computes the 9 continuous arc segments on the spacious progress ring (R=135).
 */
export function buildOrbitSegments(): OrbitSegmentData[] {
  const R = PROGRESS_R;
  const C = ORBIT_CENTER;
  const count = STUDENT_ORBIT_FEATURES.length; // 9

  const featureAngles = [270, 331, 360, 29, 66, 114, 151, 180, 209];

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
  iconCx: number;
  iconCy: number;
  cardCss: React.CSSProperties;
}

/**
 * 5 Spacious, perfectly equalized vertical tiers:
 *   Level 1: Y = -190 (Node 1)
 *   Level 2: Y = -95  (Nodes 2 & 9)   [gap = 95px]
 *   Level 3: Y = 0    (Nodes 3 & 8)   [gap = 95px]
 *   Level 4: Y = +95  (Nodes 4 & 7)   [gap = 95px]
 *   Level 5: Y = +185 (Nodes 5 & 6)   [gap = 90px]
 */
export const NODE_POSITIONS: Record<number, NodePositionData> = {
  1: {
    iconCx: 0,
    iconCy: -190,
    cardCss: {},
  },
  2: {
    iconCx: 175,
    iconCy: -95,
    cardCss: {},
  },
  3: {
    iconCx: 205,
    iconCy: 0,
    cardCss: {},
  },
  4: {
    iconCx: 175,
    iconCy: 95,
    cardCss: {},
  },
  5: {
    iconCx: 85,
    iconCy: 185,
    cardCss: {},
  },
  6: {
    iconCx: -85,
    iconCy: 185,
    cardCss: {},
  },
  7: {
    iconCx: -175,
    iconCy: 95,
    cardCss: {},
  },
  8: {
    iconCx: -205,
    iconCy: 0,
    cardCss: {},
  },
  9: {
    iconCx: -175,
    iconCy: -95,
    cardCss: {},
  },
};

/** Initial bead position (Node 1, top center, 270°, on R=135) */
export const BEAD_START_X = ORBIT_CENTER;
export const BEAD_START_Y = ORBIT_CENTER - PROGRESS_R; // 190 - 135 = 55
