'use client';

export interface CarouselCardData {
  id: string;
  tag: string;
  title: string;
  lines: [string, string, string];
  accentColor: string;
  secondaryColor: string;
  iconSvg: string;
}

export const CAROUSEL_CARDS: CarouselCardData[] = [
  // ── Card 1: Concept Explanations ──
  {
    id: 'concept',
    tag: '01 • FOUNDATION',
    title: 'Concept Explanations',
    lines: [
      'Deep, intuitive breakdowns of',
      'core fundamentals in simple,',
      'crystal-clear language.',
    ],
    accentColor: '#FBBF24', // Amber/Yellow
    secondaryColor: '#D97706',
    iconSvg: `
      <!-- Lightbulb -->
      <path d="M460 170 C400 170 350 220 350 280 C350 326 376 364 414 382 L414 425 C414 433 421 440 430 440 L490 440 C499 440 506 433 506 425 L506 382 C544 364 570 326 570 280 C570 220 520 170 460 170 Z" fill="none" stroke="#FBBF24" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M430 470 L490 470" stroke="#FBBF24" stroke-width="10" stroke-linecap="round" />
      <path d="M442 500 L478 500" stroke="#FBBF24" stroke-width="10" stroke-linecap="round" />
      <path d="M430 280 Q460 240 460 340 Q460 240 490 280" fill="none" stroke="#FEF08A" stroke-width="8" stroke-linecap="round" />
      <line x1="460" y1="120" x2="460" y2="140" stroke="#FBBF24" stroke-width="8" stroke-linecap="round" opacity="0.8" />
      <line x1="340" y1="170" x2="355" y2="185" stroke="#FBBF24" stroke-width="8" stroke-linecap="round" opacity="0.8" />
      <line x1="580" y1="170" x2="565" y2="185" stroke="#FBBF24" stroke-width="8" stroke-linecap="round" opacity="0.8" />
    `,
  },
  // ── Card 2: Real-World Examples ──
  {
    id: 'examples',
    tag: '02 • APPLICATION',
    title: 'Real-World Examples',
    lines: [
      'Practical analogies, code snippets,',
      'and illustrated real-world cases',
      'for rapid assimilation.',
    ],
    accentColor: '#A855F7', // Violet
    secondaryColor: '#7C3AED',
    iconSvg: `
      <!-- Open Book -->
      <path d="M460 240 C420 210 360 210 320 220 L320 410 C360 400 420 400 460 430 C500 400 560 400 600 410 L600 220 C560 210 500 210 460 240 Z" fill="none" stroke="#A855F7" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="460" y1="240" x2="460" y2="430" stroke="#E9D5FF" stroke-width="10" stroke-linecap="round" />
      <line x1="350" y1="270" x2="430" y2="260" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
      <line x1="350" y1="310" x2="430" y2="300" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
      <line x1="350" y1="350" x2="410" y2="340" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
      <line x1="490" y1="260" x2="570" y2="270" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
      <line x1="490" y1="300" x2="570" y2="310" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
      <line x1="490" y1="340" x2="550" y2="350" stroke="#C084FC" stroke-width="6" stroke-linecap="round" opacity="0.8" />
    `,
  },
  // ── Card 3: Step-by-Step Guidance ──
  {
    id: 'guidance',
    tag: '03 • ROADMAP',
    title: 'Step-by-Step Guidance',
    lines: [
      'Structured sequential paths that',
      'guide you systematically from',
      'beginner to mastery.',
    ],
    accentColor: '#22D3EE', // Cyan
    secondaryColor: '#0891B2',
    iconSvg: `
      <!-- Graduation Cap -->
      <polygon points="460,190 610,260 460,330 310,260" fill="none" stroke="#22D3EE" stroke-width="12" stroke-linejoin="round" />
      <path d="M360 286 L360 370 C360 410 560 410 560 370 L560 286" fill="none" stroke="#22D3EE" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M570 278 L590 350 L580 390 L600 390 L590 350" fill="none" stroke="#A5F3FC" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="570" cy="278" r="6" fill="#A5F3FC" />
    `,
  },
  // ── Card 4: Problem Solving ──
  {
    id: 'problem-solving',
    tag: '04 • DIAGNOSTICS',
    title: 'Problem Solving',
    lines: [
      'Interactive diagnostic workflows',
      'and algorithmic reasoning methods',
      'to conquer any blockers.',
    ],
    accentColor: '#F43F5E', // Rose/Pink
    secondaryColor: '#E11D48',
    iconSvg: `
      <!-- Diagnostic Cog / Target -->
      <circle cx="460" cy="300" r="85" fill="none" stroke="#F43F5E" stroke-width="12" />
      <circle cx="460" cy="300" r="42" fill="none" stroke="#FECDD3" stroke-width="10" />
      <circle cx="460" cy="300" r="14" fill="#F43F5E" />
      <line x1="460" y1="180" x2="460" y2="215" stroke="#F43F5E" stroke-width="12" stroke-linecap="round" />
      <line x1="460" y1="385" x2="460" y2="420" stroke="#F43F5E" stroke-width="12" stroke-linecap="round" />
      <line x1="340" y1="300" x2="375" y2="300" stroke="#F43F5E" stroke-width="12" stroke-linecap="round" />
      <line x1="545" y1="300" x2="580" y2="300" stroke="#F43F5E" stroke-width="12" stroke-linecap="round" />
      <circle cx="375" cy="215" r="9" fill="#FB7185" />
      <circle cx="545" cy="215" r="9" fill="#FB7185" />
      <circle cx="375" cy="385" r="9" fill="#FB7185" />
      <circle cx="545" cy="385" r="9" fill="#FB7185" />
    `,
  },
  // ── Card 5: Code Help & Refactoring ──
  {
    id: 'code-help',
    tag: '05 • ENGINEERING',
    title: 'Code Help &amp; Review',
    lines: [
      'Syntax debugging, architectural',
      'review, and instant idiomatic',
      'refactors on the fly.',
    ],
    accentColor: '#38BDF8', // Sky Blue
    secondaryColor: '#0284C7',
    iconSvg: `
      <!-- Code Brackets -->
      <polyline points="390,230 310,300 390,370" fill="none" stroke="#38BDF8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="530,230 610,300 530,370" fill="none" stroke="#38BDF8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="490" y1="210" x2="430" y2="390" stroke="#BAE6FD" stroke-width="12" stroke-linecap="round" />
    `,
  },
  // ── Card 6: Build Understanding ──
  {
    id: 'build-understanding',
    tag: '06 • SYNTHESIS',
    title: 'Build Understanding',
    lines: [
      'Adaptive knowledge synthesis',
      'tracking concept retention,',
      'confidence, and mastery.',
    ],
    accentColor: '#C084FC', // Soft Lavender
    secondaryColor: '#9333EA',
    iconSvg: `
      <!-- Bar Chart with Growth Curve -->
      <rect x="330" y="340" width="45" height="90" rx="8" fill="none" stroke="#C084FC" stroke-width="10" />
      <rect x="405" y="280" width="45" height="150" rx="8" fill="none" stroke="#C084FC" stroke-width="10" />
      <rect x="480" y="220" width="45" height="210" rx="8" fill="none" stroke="#C084FC" stroke-width="10" />
      <rect x="555" y="160" width="45" height="270" rx="8" fill="none" stroke="#C084FC" stroke-width="10" />
      <path d="M320 330 Q430 260 585 140" fill="none" stroke="#F3E8FF" stroke-width="10" stroke-linecap="round" />
      <circle cx="585" cy="140" r="10" fill="#F3E8FF" />
    `,
  },
  // ── Card 7: Interactive Practice ──
  {
    id: 'practice',
    tag: '07 • PRACTICE',
    title: 'Interactive Practice',
    lines: [
      'Targeted challenge drills with',
      'instant AI evaluation to solidify',
      'your mental models.',
    ],
    accentColor: '#34D399', // Mint Emerald
    secondaryColor: '#059669',
    iconSvg: `
      <!-- Spark / Diamond Compass -->
      <polygon points="460,180 495,265 580,300 495,335 460,420 425,335 340,300 425,265" fill="none" stroke="#34D399" stroke-width="12" stroke-linejoin="round" />
      <circle cx="460" cy="300" r="28" fill="none" stroke="#A7F3D0" stroke-width="8" />
      <circle cx="460" cy="300" r="10" fill="#34D399" />
    `,
  },
  // ── Card 8: Adaptive Memory & Review ──
  {
    id: 'revision',
    tag: '08 • REVISION',
    title: 'Adaptive Memory',
    lines: [
      'Personalized spaced recall and',
      'dynamic reinforcement for',
      'permanent long-term retention.',
    ],
    accentColor: '#FB7185', // Coral Pink
    secondaryColor: '#E11D48',
    iconSvg: `
      <!-- Neural Loop / Infinity -->
      <path d="M390 300 C330 240 300 360 390 360 C440 360 480 240 530 240 C620 240 590 360 530 300 C480 240 440 360 390 300 Z" fill="none" stroke="#FB7185" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="370" cy="300" r="10" fill="#FECDD3" />
      <circle cx="550" cy="300" r="10" fill="#FECDD3" />
    `,
  },
];

/**
 * Generates an ultra-crisp, high-DPI SVG Data URL for each card.
 * Uses 1000x900 aspect ratio for wide, luxury cards with large, high-readability text.
 */
export function generateCardSvg(data: CarouselCardData): string {
  const { tag, title, lines, accentColor, secondaryColor, iconSvg } = data;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 900" width="1000" height="900">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bg-grad-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" />
      <stop offset="45%" stop-color="#090D16" />
      <stop offset="100%" stop-color="#020408" />
    </linearGradient>

    <!-- Border Accent Gradient -->
    <linearGradient id="border-grad-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.9" />
      <stop offset="40%" stop-color="${secondaryColor}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#1E293B" stop-opacity="0.2" />
    </linearGradient>

    <!-- Radial Glow Halo -->
    <radialGradient id="halo-${data.id}" cx="50%" cy="28%" r="52%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25" />
      <stop offset="50%" stop-color="${accentColor}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0" />
    </radialGradient>

    <!-- Icon Radial Glow -->
    <radialGradient id="icon-glow-${data.id}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.38" />
      <stop offset="100%" stop-color="${accentColor}" stop-opacity="0" />
    </radialGradient>

    <!-- Drop-shadow filter -->
    <filter id="shadow-${data.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Card Background -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="url(#bg-grad-${data.id})" />

  <!-- Radial Atmosphere Bloom -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="url(#halo-${data.id})" />

  <!-- Outer Glassmorphic Border -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="none" stroke="url(#border-grad-${data.id})" stroke-width="4.5" />
  <!-- Inner Subtle Specular Border -->
  <rect x="16" y="16" width="968" height="868" rx="44" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1.5" />

  <!-- TOP PILL BADGE -->
  <g transform="translate(500, 72)">
    <rect x="-125" y="-18" width="250" height="36" rx="18" fill="#1E293B" fill-opacity="0.85" stroke="${accentColor}" stroke-opacity="0.45" stroke-width="1.5" />
    <circle cx="-100" cy="0" r="4.5" fill="${accentColor}" filter="url(#shadow-${data.id})" />
    <text x="-80" y="5" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" letter-spacing="2" fill="${accentColor}">
      ${tag}
    </text>
  </g>

  <!-- HERO ICON AREA (Centered at x=500, y=250) -->
  <circle cx="500" cy="250" r="150" fill="url(#icon-glow-${data.id})" />
  <circle cx="500" cy="250" r="125" fill="none" stroke="${accentColor}" stroke-opacity="0.20" stroke-width="2" stroke-dasharray="8 8" />
  <circle cx="500" cy="250" r="92" fill="#0B132B" fill-opacity="0.5" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="2" />

  <g id="icon-group-${data.id}" transform="translate(40, -50)">
    ${iconSvg}
  </g>

  <!-- DIVIDER / ACCENT LINE -->
  <line x1="360" y1="450" x2="640" y2="450" stroke="${accentColor}" stroke-opacity="0.65" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="500" cy="450" r="4.5" fill="${accentColor}" />

  <!-- TITLE (Big, bold, high contrast) -->
  <text x="500" y="525" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" letter-spacing="-0.5" fill="#FFFFFF">
    ${title}
  </text>

  <!-- SUBTITLE / DESCRIPTION (Large 33px font, high-contrast white-slate, crystal clear to naked eye) -->
  <text x="500" y="598" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="33" font-weight="600" fill="#F8FAFC" letter-spacing="0.3">
    <tspan x="500" dy="0">${lines[0]}</tspan>
    <tspan x="500" dy="44">${lines[1]}</tspan>
    <tspan x="500" dy="44">${lines[2]}</tspan>
  </text>

  <!-- BOTTOM INTERACTIVE CHIP -->
  <g transform="translate(500, 810)">
    <rect x="-150" y="-18" width="300" height="36" rx="18" fill="#0B0F19" fill-opacity="0.85" stroke="#334155" stroke-width="1.2" />
    <circle cx="-120" cy="0" r="4" fill="${accentColor}" />
    <text x="5" y="4" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" letter-spacing="1.5" fill="#CBD5E1">
      EXPLORE WITH VEDIKA &#8594;
    </text>
  </g>
</svg>
  `.trim();

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export function getCarouselItems() {
  return CAROUSEL_CARDS.map((card) => ({
    src: generateCardSvg(card),
    alt: card.title.replace('&amp;', '&'),
    title: card.title.replace('&amp;', '&'),
    subtitle: card.lines.join(' '),
  }));
}
