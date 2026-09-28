export interface StudentOrbitFeature {
  id: string;
  index: number;
  title: string;
  desc: string;
  shortLabel: string;
  accentName: string;
  color: string;
  rgb: string;
  angleDeg: number; // Angle on the 360 circle (225 = Top-Left)
  positionClass: string;
  orbitAnchor: { x: number; y: number };
  nodeAnchor: { x: number; y: number };
}

export const STUDENT_ORBIT_FEATURES: StudentOrbitFeature[] = [
  {
    id: 'study-companion',
    index: 1,
    title: '24/7 Study Companion',
    desc: 'Get help whenever you need it — morning, evening, or late at night. Vedika is always there when you want to study.',
    shortLabel: 'Always available',
    accentName: 'Amber / Orange',
    color: '#F59E0B',
    rgb: '245, 158, 11',
    angleDeg: 225,
    positionClass: 'orbit-pos-top-left',
    orbitAnchor: { x: 405, y: 205 },
    nodeAnchor: { x: 140, y: 70 },
  },
  {
    id: 'non-judgmental',
    index: 2,
    title: 'Non-Judgmental Space',
    desc: 'Ask questions freely, make mistakes, and try again without feeling embarrassed or judged.',
    shortLabel: 'Learn without fear',
    accentName: 'Pink / Rose',
    color: '#EC4899',
    rgb: '236, 72, 153',
    angleDeg: 270,
    positionClass: 'orbit-pos-top-center',
    orbitAnchor: { x: 500, y: 165 },
    nodeAnchor: { x: 500, y: 58 },
  },
  {
    id: 'unlimited-questions',
    index: 3,
    title: 'Ask Unlimited Questions',
    desc: 'Ask anything, at any point, and come back to the same concept as many times as you need.',
    shortLabel: 'No limits',
    accentName: 'Violet / Purple',
    color: '#A855F7',
    rgb: '168, 85, 247',
    angleDeg: 315,
    positionClass: 'orbit-pos-top-right',
    orbitAnchor: { x: 595, y: 205 },
    nodeAnchor: { x: 860, y: 70 },
  },
  {
    id: 'own-pace',
    index: 4,
    title: 'Learn at Your Own Pace',
    desc: 'Take your time, revisit difficult topics, and move forward only when you feel ready.',
    shortLabel: 'Your pace',
    accentName: 'Electric Blue',
    color: '#3B82F6',
    rgb: '59, 130, 246',
    angleDeg: 0,
    positionClass: 'orbit-pos-mid-right',
    orbitAnchor: { x: 635, y: 300 },
    nodeAnchor: { x: 890, y: 295 },
  },
  {
    id: 'concept-clarity',
    index: 5,
    title: 'Concept Clarity',
    desc: 'Break difficult ideas into simple, step-by-step explanations with examples that make concepts easier to understand.',
    shortLabel: 'Understand deeply',
    accentName: 'Teal / Cyan',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    angleDeg: 45,
    positionClass: 'orbit-pos-lower-right',
    orbitAnchor: { x: 595, y: 395 },
    nodeAnchor: { x: 840, y: 490 },
  },
  {
    id: 'interactive-learning',
    index: 6,
    title: 'Interactive Learning',
    desc: 'Explore concepts through interactive simulations, visual explanations, virtual experiments, and real-world examples.',
    shortLabel: 'Learn by exploring',
    accentName: 'Green / Emerald',
    color: '#10B981',
    rgb: '16, 185, 129',
    angleDeg: 90,
    positionClass: 'orbit-pos-bottom-center',
    orbitAnchor: { x: 500, y: 435 },
    nodeAnchor: { x: 500, y: 515 },
  },
  {
    id: 'practice-exam',
    index: 7,
    title: 'Practice & Exam Ready',
    desc: 'Turn understanding into confidence with quizzes, practice questions, instant feedback, and revision support.',
    shortLabel: 'Build confidence',
    accentName: 'Blue / Indigo',
    color: '#6366F1',
    rgb: '99, 102, 241',
    angleDeg: 135,
    positionClass: 'orbit-pos-lower-left',
    orbitAnchor: { x: 405, y: 395 },
    nodeAnchor: { x: 160, y: 490 },
  },
  {
    id: 'personalized-support',
    index: 8,
    title: 'Personalized Support',
    desc: 'Vedika adapts explanations and practice to the learner’s needs, helping focus on areas that need more attention.',
    shortLabel: 'Made for you',
    accentName: 'Magenta / Fuchsia',
    color: '#D946EF',
    rgb: '217, 70, 239',
    angleDeg: 180,
    positionClass: 'orbit-pos-mid-left',
    orbitAnchor: { x: 365, y: 300 },
    nodeAnchor: { x: 110, y: 295 },
  },
];
