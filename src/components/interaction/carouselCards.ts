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
      <!-- 3D Soft Lightbulb (Translucent Glass + Warm Radiant Core) -->
      <g filter="url(#soft3d-drop-concept)">
        <!-- Ambient Warm Glow behind Bulb -->
        <circle cx="500" cy="225" r="75" fill="#FBBF24" opacity="0.22" filter="url(#soft3d-glow-concept)" />
        
        <!-- 3D Volumetric Glass Bulb -->
        <path d="M500 152 C452 152 420 190 420 236 C420 270 440 298 468 316 L468 340 C468 346 473 350 478 350 L522 350 C527 350 532 346 532 340 L532 316 C560 298 580 270 580 236 C580 190 548 152 500 152 Z" 
              fill="url(#bulb-body-concept)" stroke="#FBBF24" stroke-opacity="0.45" stroke-width="2.5" />
        
        <!-- Soft 3D Specular Highlight crescent on glass dome -->
        <path d="M465 174 C482 164 515 168 535 180 C505 172 475 182 465 198 C462 188 463 180 465 174 Z" 
              fill="#FFFFFF" opacity="0.75" />
        
        <!-- 3D Glowing Filament Loop with soft amber bloom -->
        <path d="M474 275 Q500 215 500 240 Q500 215 526 275" 
              fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" filter="url(#soft3d-glow-concept)" />
        <circle cx="500" cy="235" r="9" fill="#FFFBEB" />

        <!-- 3D Metallic Screw Base (3 soft volumetric rounded metallic rings) -->
        <rect x="470" y="348" width="60" height="11" rx="5.5" fill="url(#metal-screw-concept)" />
        <rect x="473" y="362" width="54" height="10" rx="5" fill="url(#metal-screw-concept)" />
        <rect x="477" y="375" width="46" height="9" rx="4.5" fill="url(#metal-screw-concept)" />
        
        <!-- Golden Base Contact Tip -->
        <path d="M485 386 C485 396 515 396 515 386 Z" fill="#D97706" />
      </g>
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
      <!-- 3D Soft Open Codex / Book -->
      <g filter="url(#soft3d-drop-examples)">
        <!-- Ambient Violet Glow -->
        <ellipse cx="500" cy="245" rx="85" ry="60" fill="#A855F7" opacity="0.22" filter="url(#soft3d-glow-examples)" />

        <!-- 3D Book Base Spine Platform -->
        <path d="M415 318 Q500 338 585 318 L585 332 Q500 352 415 332 Z" fill="#4C1D95" />

        <!-- Left Page with 3D Curvature & Gradient -->
        <path d="M496 200 C450 180 395 188 360 205 L365 315 C400 298 452 292 496 310 Z" 
              fill="url(#book-left-examples)" stroke="#E9D5FF" stroke-opacity="0.4" stroke-width="2" />
        
        <!-- Right Page with 3D Curvature & Gradient -->
        <path d="M504 200 C550 180 605 188 640 205 L635 315 C600 298 548 292 504 310 Z" 
              fill="url(#book-right-examples)" stroke="#E9D5FF" stroke-opacity="0.4" stroke-width="2" />

        <!-- Page Thickness Edge Layers underneath -->
        <path d="M360 205 L365 315 L362 323 L356 213 Z" fill="#581C87" opacity="0.85" />
        <path d="M640 205 L635 315 L638 323 L644 213 Z" fill="#581C87" opacity="0.85" />

        <!-- Soft Specular Sheen across top page curves -->
        <path d="M496 202 C455 184 410 190 380 206 C410 194 455 190 496 208 Z" fill="#FFFFFF" opacity="0.5" />
        <path d="M504 202 C545 184 590 190 620 206 C590 194 545 190 504 208 Z" fill="#FFFFFF" opacity="0.5" />

        <!-- Central 3D Binding Ridge -->
        <line x1="500" y1="198" x2="500" y2="312" stroke="#2E1065" stroke-width="4" />

        <!-- Draped 3D Silk Bookmark Ribbon -->
        <path d="M500 196 Q508 250 514 330 L504 344 L494 330 Q500 250 500 196 Z" fill="#F472B6" filter="url(#soft3d-drop-examples)" />

        <!-- Soft Embossed Content Lines -->
        <line x1="395" y1="230" x2="465" y2="225" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        <line x1="395" y1="250" x2="470" y2="245" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        <line x1="395" y1="270" x2="450" y2="265" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        <line x1="535" y1="225" x2="605" y2="230" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        <line x1="530" y1="245" x2="605" y2="250" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
        <line x1="550" y1="265" x2="605" y2="270" stroke="#FFFFFF" stroke-opacity="0.5" stroke-width="4" stroke-linecap="round" />
      </g>
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
      <!-- 3D Soft Graduation Cap & Milestone Platform -->
      <g filter="url(#soft3d-drop-guidance)">
        <!-- Ambient Cyan Glow -->
        <ellipse cx="500" cy="245" rx="85" ry="60" fill="#22D3EE" opacity="0.22" filter="url(#soft3d-glow-guidance)" />

        <!-- 3D Skull Cap Cylinder underneath -->
        <path d="M435 250 Q500 310 565 250 L565 285 Q500 345 435 285 Z" fill="url(#cap-base-guidance)" />

        <!-- 3D Mortarboard Diamond Top - Volumetric Bevels -->
        <!-- Left Side Bevel Thickness -->
        <polygon points="360,215 500,270 500,285 360,230" fill="#0891B2" />
        <!-- Right Side Bevel Thickness -->
        <polygon points="640,215 500,270 500,285 640,230" fill="#0E7490" />
        <!-- Main Isometric Top Diamond Surface -->
        <polygon points="500,160 640,215 500,270 360,215" fill="url(#mortar-top-guidance)" stroke="#E0F2FE" stroke-opacity="0.35" stroke-width="2" />

        <!-- Soft Specular Light across top corner -->
        <polygon points="500,162 570,189 500,216 430,189" fill="#FFFFFF" opacity="0.4" />

        <!-- Center Golden/Cyan 3D Button -->
        <ellipse cx="500" cy="215" rx="10" ry="6" fill="#FBBF24" />
        <circle cx="498" cy="213" r="3" fill="#FFFFFF" opacity="0.85" />

        <!-- 3D Flowing Silk Tassel hanging over right corner with drop shadow -->
        <path d="M500 215 Q590 220 622 235 Q632 265 628 320" fill="none" stroke="#FBBF24" stroke-width="5" stroke-linecap="round" />
        <!-- Tassel Brush Fringe -->
        <path d="M624 318 L634 322 L630 358 L620 358 Z" fill="#F59E0B" />
        <circle cx="628" cy="320" r="5" fill="#FBBF24" />
      </g>
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
      <!-- 3D Soft Diagnostic Radar Prism -->
      <g filter="url(#soft3d-drop-problem-solving)">
        <circle cx="500" cy="240" r="85" fill="#F43F5E" opacity="0.20" filter="url(#soft3d-glow-problem-solving)" />

        <!-- Outer 3D Beveled Disc Rim -->
        <circle cx="500" cy="240" r="82" fill="url(#radar-outer-problem-solving)" stroke="#FECDD3" stroke-opacity="0.35" stroke-width="3" />
        <circle cx="500" cy="240" r="66" fill="#1C1917" opacity="0.75" />

        <!-- Middle Floating 3D Gyro Ring -->
        <circle cx="500" cy="240" r="50" fill="none" stroke="url(#radar-mid-problem-solving)" stroke-width="9" />
        <!-- Ring Specular Highlight -->
        <path d="M465 205 A 50 50 0 0 1 535 205" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity="0.75" />

        <!-- Central 3D Glowing Core Sphere with Specular Gloss -->
        <circle cx="500" cy="240" r="24" fill="url(#radar-core-problem-solving)" />
        <circle cx="493" cy="233" r="6" fill="#FFFFFF" opacity="0.88" />

        <!-- 4 Soft 3D Precision Calipers -->
        <rect x="495" y="142" width="10" height="24" rx="5" fill="#FDA4AF" />
        <rect x="495" y="314" width="10" height="24" rx="5" fill="#FDA4AF" />
        <rect x="402" y="235" width="24" height="10" rx="5" fill="#FDA4AF" />
        <rect x="574" y="235" width="24" height="10" rx="5" fill="#FDA4AF" />
      </g>
    `,
  },
  // ── Card 5: Code Help & Refactoring ──
  {
    id: 'code-help',
    tag: '05 • ENGINEERING',
    title: 'Code Help & Review',
    lines: [
      'Syntax debugging, architectural',
      'review, and instant idiomatic',
      'refactors on the fly.',
    ],
    accentColor: '#38BDF8', // Sky Blue
    secondaryColor: '#0284C7',
    iconSvg: `
      <!-- 3D Soft Code Terminal Brackets -->
      <g filter="url(#soft3d-drop-code-help)">
        <ellipse cx="500" cy="240" rx="85" ry="60" fill="#38BDF8" opacity="0.22" filter="url(#soft3d-glow-code-help)" />

        <!-- 3D Backing Glass Terminal Plate -->
        <rect x="360" y="165" width="280" height="150" rx="28" fill="url(#code-plate-code-help)" stroke="#BAE6FD" stroke-opacity="0.35" stroke-width="2.5" />
        
        <!-- Left 3D Rounded Bracket < -->
        <path d="M435 195 L395 240 L435 285" fill="none" stroke="url(#code-bracket-code-help)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M435 195 L395 240 L435 285" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.75" />

        <!-- Right 3D Rounded Bracket > -->
        <path d="M565 195 L605 240 L565 285" fill="none" stroke="url(#code-bracket-code-help)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M565 195 L605 240 L565 285" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.75" />

        <!-- Central 3D Glowing Slash / -->
        <line x1="520" y1="180" x2="480" y2="300" stroke="#E0F2FE" stroke-width="14" stroke-linecap="round" />
        <line x1="520" y1="180" x2="480" y2="300" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity="0.88" />
      </g>
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
      <!-- 3D Soft Ascending Growth Pillars -->
      <g filter="url(#soft3d-drop-build-understanding)">
        <ellipse cx="500" cy="240" rx="85" ry="60" fill="#C084FC" opacity="0.22" filter="url(#soft3d-glow-build-understanding)" />

        <!-- Pillar 1 (Left - lowest) -->
        <path d="M375 260 L425 260 L425 330 L375 330 Z" fill="url(#pillar-body-1-build-understanding)" />
        <ellipse cx="400" cy="260" rx="25" ry="11" fill="url(#pillar-cap-1-build-understanding)" />
        <ellipse cx="400" cy="260" rx="16" ry="6" fill="#FFFFFF" opacity="0.55" />

        <!-- Pillar 2 (Mid - medium) -->
        <path d="M440 215 L490 215 L490 330 L440 330 Z" fill="url(#pillar-body-2-build-understanding)" />
        <ellipse cx="465" cy="215" rx="25" ry="11" fill="url(#pillar-cap-2-build-understanding)" />
        <ellipse cx="465" cy="215" rx="16" ry="6" fill="#FFFFFF" opacity="0.55" />

        <!-- Pillar 3 (Right - highest) -->
        <path d="M505 165 L555 165 L555 330 L505 330 Z" fill="url(#pillar-body-3-build-understanding)" />
        <ellipse cx="530" cy="165" rx="25" ry="11" fill="url(#pillar-cap-3-build-understanding)" />
        <ellipse cx="530" cy="165" rx="16" ry="6" fill="#FFFFFF" opacity="0.65" />

        <!-- 3D Ascending Trajectory Ribbon -->
        <path d="M380 250 Q460 210 575 145" fill="none" stroke="#F3E8FF" stroke-width="10" stroke-linecap="round" filter="url(#soft3d-glow-build-understanding)" />
        <!-- Leading Star Crest -->
        <circle cx="575" cy="145" r="14" fill="#FFFFFF" />
        <circle cx="575" cy="145" r="7" fill="#C084FC" />
      </g>
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
      <!-- 3D Soft Faceted Crystal Star -->
      <g filter="url(#soft3d-drop-practice)">
        <circle cx="500" cy="240" r="85" fill="#34D399" opacity="0.22" filter="url(#soft3d-glow-practice)" />

        <!-- 3D Faceted Star Body -->
        <!-- North Facets -->
        <polygon points="500,140 500,240 450,210" fill="#A7F3D0" />
        <polygon points="500,140 500,240 550,210" fill="#6EE7B7" />
        <!-- East Facets -->
        <polygon points="600,240 500,240 550,210" fill="#34D399" />
        <polygon points="600,240 500,240 550,270" fill="#10B981" />
        <!-- South Facets -->
        <polygon points="500,340 500,240 550,270" fill="#059669" />
        <polygon points="500,340 500,240 450,270" fill="#047857" />
        <!-- West Facets -->
        <polygon points="400,240 500,240 450,270" fill="#065F46" />
        <polygon points="400,240 500,240 450,210" fill="#34D399" />

        <!-- Soft 3D Inner Specular Gem -->
        <circle cx="500" cy="240" r="28" fill="url(#gem-core-practice)" stroke="#ECFDF5" stroke-opacity="0.65" stroke-width="2.5" />
        <circle cx="492" cy="232" r="7" fill="#FFFFFF" opacity="0.88" />
      </g>
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
      <!-- 3D Soft Infinity Synapse Ribbon -->
      <g filter="url(#soft3d-drop-revision)">
        <ellipse cx="500" cy="240" rx="95" ry="60" fill="#FB7185" opacity="0.22" filter="url(#soft3d-glow-revision)" />

        <!-- Continuous 3D Volumetric Torus Loop -->
        <path d="M430 240 C360 170 330 310 430 310 C480 310 520 170 570 170 C670 170 640 310 570 240 C520 170 480 310 430 240 Z" 
              fill="none" stroke="url(#infinity-tube-revision)" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Specular Ridge Line along spine of the 3D tube -->
        <path d="M430 240 C360 170 330 310 430 310 C480 310 520 170 570 170 C670 170 640 310 570 240 C520 170 480 310 430 240 Z" 
              fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.6" />

        <!-- Left Glowing Memory Node Sphere with Specular Highlight -->
        <circle cx="410" cy="240" r="18" fill="url(#node-sphere-revision)" />
        <circle cx="405" cy="235" r="5" fill="#FFFFFF" opacity="0.88" />

        <!-- Right Glowing Memory Node Sphere with Specular Highlight -->
        <circle cx="590" cy="240" r="18" fill="url(#node-sphere-revision)" />
        <circle cx="585" cy="235" r="5" fill="#FFFFFF" opacity="0.88" />
      </g>
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

    <!-- Soft 3D Drop Shadow Filter for tactile icon depth -->
    <filter id="soft3d-drop-${data.id}" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.65" />
    </filter>

    <!-- Soft 3D Glow Filter -->
    <filter id="soft3d-glow-${data.id}" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="14" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Soft 3D Icon Specific Gradients -->
    <!-- Card 1: Lightbulb -->
    <radialGradient id="bulb-body-${data.id}" cx="42%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="45%" stop-color="#FBBF24" />
      <stop offset="85%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#92400E" />
    </radialGradient>
    <linearGradient id="metal-screw-${data.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78716C" />
      <stop offset="35%" stop-color="#E7E5E4" />
      <stop offset="70%" stop-color="#A8A29E" />
      <stop offset="100%" stop-color="#57534E" />
    </linearGradient>

    <!-- Card 2: Open Book -->
    <linearGradient id="book-left-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DDD6FE" />
      <stop offset="40%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
    <linearGradient id="book-right-${data.id}" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E9D5FF" />
      <stop offset="40%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#581C87" />
    </linearGradient>

    <!-- Card 3: Graduation Cap -->
    <linearGradient id="mortar-top-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A5F3FC" />
      <stop offset="35%" stop-color="#22D3EE" />
      <stop offset="85%" stop-color="#0891B2" />
      <stop offset="100%" stop-color="#0E7490" />
    </linearGradient>
    <linearGradient id="cap-base-${data.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E7490" />
      <stop offset="100%" stop-color="#164E63" />
    </linearGradient>

    <!-- Card 4: Radar -->
    <radialGradient id="radar-outer-${data.id}" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FDA4AF" />
      <stop offset="60%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#9F1239" />
    </radialGradient>
    <linearGradient id="radar-mid-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FECDD3" />
      <stop offset="50%" stop-color="#FB7185" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>
    <radialGradient id="radar-core-${data.id}" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#FB7185" />
      <stop offset="100%" stop-color="#E11D48" />
    </radialGradient>

    <!-- Card 5: Code Terminal -->
    <linearGradient id="code-plate-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(30, 41, 59, 0.9)" />
      <stop offset="100%" stop-color="rgba(15, 23, 42, 0.95)" />
    </linearGradient>
    <linearGradient id="code-bracket-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7DD3FC" />
      <stop offset="50%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>

    <!-- Card 6: Growth Pillars -->
    <linearGradient id="pillar-cap-1-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9D5FF" />
      <stop offset="100%" stop-color="#C084FC" />
    </linearGradient>
    <linearGradient id="pillar-body-1-${data.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#581C87" />
    </linearGradient>
    <linearGradient id="pillar-cap-2-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3E8FF" />
      <stop offset="100%" stop-color="#D8B4FE" />
    </linearGradient>
    <linearGradient id="pillar-body-2-${data.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#9333EA" />
      <stop offset="100%" stop-color="#4C1D95" />
    </linearGradient>
    <linearGradient id="pillar-cap-3-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF5FF" />
      <stop offset="100%" stop-color="#E9D5FF" />
    </linearGradient>
    <linearGradient id="pillar-body-3-${data.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7E22CE" />
      <stop offset="100%" stop-color="#3B0764" />
    </linearGradient>

    <!-- Card 7: Gem -->
    <radialGradient id="gem-core-${data.id}" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ECFDF5" />
      <stop offset="45%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </radialGradient>

    <!-- Card 8: Infinity -->
    <linearGradient id="infinity-tube-${data.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDA4AF" />
      <stop offset="35%" stop-color="#FB7185" />
      <stop offset="70%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#9F1239" />
    </linearGradient>
    <radialGradient id="node-sphere-${data.id}" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="45%" stop-color="#FDA4AF" />
      <stop offset="100%" stop-color="#E11D48" />
    </radialGradient>
  </defs>

  <!-- Card Background -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="url(#bg-grad-${data.id})" />

  <!-- Radial Atmosphere Bloom -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="url(#halo-${data.id})" />

  <!-- Outer Glassmorphic Border -->
  <rect x="12" y="12" width="976" height="876" rx="48" fill="none" stroke="url(#border-grad-${data.id})" stroke-width="4.5" />
  <!-- Inner Subtle Specular Border -->
  <rect x="16" y="16" width="968" height="868" rx="44" fill="none" stroke="#FFFFFF" stroke-opacity="0.10" stroke-width="1.5" />

  <!-- TOP PILL BADGE (Big, bold, high contrast, 100% visible) -->
  <g transform="translate(500, 78)">
    <rect x="-165" y="-24" width="330" height="48" rx="24" fill="#0B132B" fill-opacity="0.92" stroke="${accentColor}" stroke-opacity="0.85" stroke-width="2.5" />
    <circle cx="-130" cy="0" r="7" fill="${accentColor}" filter="url(#shadow-${data.id})" />
    <text x="-110" y="7" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" letter-spacing="3" fill="#FFFFFF">
      ${tag}
    </text>
  </g>

  <!-- HERO ICON PEDESTAL AREA (Centered at x=500, y=240) -->
  <circle cx="500" cy="240" r="145" fill="url(#icon-glow-${data.id})" />
  <circle cx="500" cy="240" r="120" fill="none" stroke="${accentColor}" stroke-opacity="0.24" stroke-width="2" stroke-dasharray="8 8" />
  <circle cx="500" cy="240" r="88" fill="#090E1A" fill-opacity="0.75" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="2" />

  <!-- 3D SOFT ICON -->
  <g id="icon-group-${data.id}">
    ${iconSvg}
  </g>

  <!-- ACCENT DIVIDER -->
  <line x1="360" y1="445" x2="640" y2="445" stroke="${accentColor}" stroke-opacity="0.7" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="500" cy="445" r="4.5" fill="${accentColor}" />

  <!-- TITLE (Hero headline - 52px bold, glowing crisp white) -->
  <text x="500" y="520" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-0.5" fill="#FFFFFF">
    ${title}
  </text>

  <!-- SUBTITLE / DESCRIPTION (31px font, rich slate-white, clear and legible) -->
  <text x="500" y="595" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif" font-size="31" font-weight="500" fill="#E2E8F0" letter-spacing="0.2">
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
