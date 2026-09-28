# VEDIKA --- Student Experience Circular Orbit Content Design

## 1. Objective

Redesign the **student experience content section** of the Vedika
landing page using the existing dark futuristic visual language.

The reference direction is the **Circular Orbit Menu / Option 1**:

-   Vedika robot remains at the center.
-   Student-learning benefits are arranged around Vedika on a circular
    orbit.
-   Content appears progressively, one item after another.
-   A circular progress ring fills as each content item is revealed.
-   Every content item has its own distinct accent color.
-   The overall result should feel like an interactive AI learning
    system, not a collection of ordinary SaaS cards.

Do **not** redesign the surrounding Student / Teacher / Admin navigation
or the existing right-side student experience panel unless required for
responsive behavior.

------------------------------------------------------------------------

# 2. Core Visual Concept

The central visual is:

``` text
                    [ 02 NON-JUDGMENTAL ]
                           💗
                           │
             [01] ────────╭────────╮─────── [03]
                           │        │
             [06] ────────│ VEDIKA │─────── [04]
                           │  ROBOT │
             [05] ────────╰────────╯───────
                           │
                    [07 / progress]
```

The actual implementation should be more elegant and circular than this
diagram.

Vedika is the **visual anchor**.

Around Vedika:

-   6--8 benefit nodes/cards
-   one circular progress ring
-   thin glowing connection lines
-   small orbital particles
-   color-coded feature states
-   smooth sequential reveal animation

The circle should visually communicate:

> Every capability adds another part to the student's learning
> experience.

------------------------------------------------------------------------

# 3. Main Content

Use these core student benefits.

## 01 --- 24/7 Study Companion

**Title:** 24/7 Study Companion

**Description:** Get help whenever you need it --- morning, evening, or
late at night. Vedika is always there when you want to study.

**Short label:** Always available

**Accent:** Warm orange / amber

------------------------------------------------------------------------

## 02 --- Non-Judgmental Space

**Title:** Non-Judgmental Space

**Description:** Ask questions freely, make mistakes, and try again
without feeling embarrassed or judged.

**Short label:** Learn without fear

**Accent:** Pink / rose

------------------------------------------------------------------------

## 03 --- Ask Unlimited Questions

**Title:** Ask Unlimited Questions

**Description:** Ask anything, at any point, and come back to the same
concept as many times as you need.

**Short label:** No limits

**Accent:** Violet / purple

------------------------------------------------------------------------

## 04 --- Learn at Your Own Pace

**Title:** Learn at Your Own Pace

**Description:** Take your time, revisit difficult topics, and move
forward only when you feel ready.

**Short label:** Your pace

**Accent:** Electric blue

------------------------------------------------------------------------

## 05 --- Concept Clarity

**Title:** Concept Clarity

**Description:** Break difficult ideas into simple, step-by-step
explanations with examples that make concepts easier to understand.

**Short label:** Understand deeply

**Accent:** Teal / cyan

------------------------------------------------------------------------

## 06 --- Interactive Learning

**Title:** Interactive Learning

**Description:** Explore concepts through interactive simulations,
visual explanations, virtual experiments, and real-world examples.

**Short label:** Learn by exploring

**Accent:** Green / emerald

------------------------------------------------------------------------

## 07 --- Practice & Exam Ready

**Title:** Practice & Exam Ready

**Description:** Turn understanding into confidence with quizzes,
practice questions, instant feedback, and revision support.

**Short label:** Build confidence

**Accent:** Blue / indigo

------------------------------------------------------------------------

## 08 --- Personalized Support

**Title:** Personalized Support

**Description:** Vedika adapts explanations and practice to the
learner's needs, helping focus on areas that need more attention.

**Short label:** Made for you

**Accent:** Magenta / fuchsia

------------------------------------------------------------------------

# 4. Circular Progress System

This is the most important interaction.

The orbit should behave like a **circular progress bar combined with a
feature navigation system**.

## Initial state

When the section loads:

-   Vedika is visible immediately.
-   The circular ring is present but mostly dim.
-   Feature nodes are present in a low-opacity / inactive state.
-   No large feature card should dominate the screen.
-   The interface should feel calm and ready to activate.

Progress:

``` text
0 / 8
```

Ring:

``` text
mostly dark
```

------------------------------------------------------------------------

# 5. Sequential Activation

Features activate one after another.

Example:

``` text
01 → 02 → 03 → 04 → 05 → 06 → 07 → 08
```

When feature 01 activates:

-   its node becomes bright
-   its icon glows
-   its connection line illuminates
-   the circular progress arc advances
-   its content card fades/slides into focus
-   other features remain dim

Then feature 02 activates.

The previous feature should remain visible but slightly reduced in
brightness.

The ring continues filling.

At feature 08:

``` text
360° COMPLETE
```

The entire circle should be illuminated.

------------------------------------------------------------------------

# 6. Circular Progress Bar

Implement the progress ring using **SVG**, not a raster image.

Preferred structure:

``` html
<svg class="progress-ring">
    <circle class="progress-track"></circle>
    <circle class="progress-value"></circle>
</svg>
```

Use:

``` css
stroke-dasharray
stroke-dashoffset
```

to animate the progress.

The progress value should be calculated from the active feature index.

For 8 features:

``` text
1 / 8 = 45°
2 / 8 = 90°
3 / 8 = 135°
4 / 8 = 180°
5 / 8 = 225°
6 / 8 = 270°
7 / 8 = 315°
8 / 8 = 360°
```

Do not jump instantly between values.

Use a smooth easing animation.

Preferred GSAP behavior:

``` text
power2.out
```

or a similarly smooth easing curve.

------------------------------------------------------------------------

# 7. Neon Progress Effect

The progress ring should have:

1.  A subtle dark base ring.
2.  A bright active SVG stroke.
3.  A soft glow around the active stroke.
4.  A small moving energy point at the current progress position.
5.  Tiny particles following the active arc.

The active arc should feel like **energy travelling around Vedika**.

Avoid excessive glow that makes the text unreadable.

The visual hierarchy must remain:

``` text
Vedika
↓
active feature
↓
progress ring
↓
inactive features
```

------------------------------------------------------------------------

# 8. Feature Colors

Every feature must have its own accent color.

Do NOT use one purple color for every card.

Recommended palette:

  Feature                   Accent
  ------------------------- ----------------
  24/7 Study Companion      Amber / Orange
  Non-Judgmental Space      Pink / Rose
  Ask Unlimited Questions   Violet
  Learn at Your Own Pace    Electric Blue
  Concept Clarity           Cyan / Teal
  Interactive Learning      Emerald Green
  Practice & Exam Ready     Indigo / Blue
  Personalized Support      Magenta

The color should appear consistently in:

-   icon
-   node
-   connection line
-   card border
-   active text highlight
-   progress segment
-   glow
-   micro-particles

Keep the main background neutral/dark so the colors feel meaningful.

------------------------------------------------------------------------

# 9. Feature Node Design

Do not make the nodes look like standard dashboard cards.

Each feature should feel like an **orbital information node**.

Structure:

``` text
       ○ icon
    ┌──────────────┐
    │ Feature      │
    │ Description  │
    └──────────────┘
```

Possible visual treatment:

-   translucent glass background
-   1px colored border
-   colored icon circle
-   subtle blur
-   soft colored shadow/glow
-   tiny connection point to orbit

The node should visually connect to the central Vedika system.

------------------------------------------------------------------------

# 10. Interaction

The user must be able to interact with every feature.

### Click

Clicking a feature:

1.  makes it active
2.  updates the progress ring
3.  highlights its connection
4.  brings its content into focus
5.  dims unrelated nodes
6.  updates the center micro-label

Example:

``` text
ACTIVE
Ask Unlimited Questions

Ask anything, at any point,
and come back as many times
as you need.
```

### Hover

Desktop hover may:

-   increase node glow
-   slightly scale the node
-   brighten its connector
-   reveal the full description

Do not make hover the only way to access information.

### Keyboard

Every feature should be keyboard accessible.

Use buttons or accessible interactive elements rather than clickable
generic divs.

------------------------------------------------------------------------

# 11. Automatic Storytelling

The section should also work automatically.

Recommended sequence:

``` text
Feature 01
↓
pause
↓
Feature 02
↓
pause
↓
Feature 03
↓
...
↓
Feature 08
↓
complete circle
↓
pause
↓
restart or remain complete
```

Recommended timing:

``` text
activation: 500–700ms
reading pause: 1800–2500ms
transition: 500–800ms
```

Do not make it feel rushed.

The user should have enough time to read each feature.

------------------------------------------------------------------------

# 12. Scroll Interaction

The preferred behavior is to combine scroll with the sequence.

When the section enters the viewport:

-   initialize the first state
-   progressively reveal the feature nodes

If the existing project already uses GSAP ScrollTrigger, reuse it.

Preferred behavior:

``` text
Scroll enters section
        ↓
Feature 01 activates
        ↓
small scroll progression
        ↓
Feature 02
        ↓
Feature 03
        ↓
...
        ↓
full circle
```

Do not introduce ScrollTrigger if the existing project already has
another reliable animation architecture.

Inspect the existing code first.

------------------------------------------------------------------------

# 13. Center Vedika

Use the **existing Vedika robot / 3D model / image asset already present
in the project**.

Do not generate a replacement mascot.

The center should contain:

``` text
        Vedika
          ↓
      AI STUDY
     COMPANION
```

Optional small label:

``` text
Your 24/7 Learning Companion
```

Vedika should have:

-   subtle floating animation
-   very soft ambient glow
-   small circular platform
-   light orbital particles
-   no excessive movement

The robot itself should remain visually stable while the information
system around it moves.

------------------------------------------------------------------------

# 14. Center Ring System

Use multiple subtle rings.

Suggested:

``` text
Outer ring       → progress
Middle ring      → feature connectors
Inner ring       → Vedika aura
```

Example:

``` text
        ───────────────
      ╱                 ╲
     │   PROGRESS RING   │
     │    ───────────    │
     │   │   VEDIKA  │   │
     │   └───────────┘   │
      ╲                 ╱
        ───────────────
```

Only the progress ring should be strongly animated.

Other rings remain subtle.

------------------------------------------------------------------------

# 15. Connector Lines

Connect every feature to the orbital system.

Use SVG paths or SVG lines.

Connector behavior:

### Inactive

``` text
opacity: 0.15–0.25
```

### Hover

``` text
opacity: 0.7
```

### Active

``` text
opacity: 1
```

Add a small animated particle travelling from the feature toward Vedika.

The particle should follow the connector direction.

------------------------------------------------------------------------

# 16. Layout

Keep the existing page structure.

### Left/content area

Contains:

``` text
Eyebrow
Headline
Description

        Circular Vedika System

Feature nodes around Vedika

Progress / interaction controls
```

### Right panel

Keep the existing:

``` text
STUDENT EXPERIENCE
character / student visual
Explore Student Experience →
```

Do not allow the radial system to overlap the right panel.

------------------------------------------------------------------------

# 17. Responsive Design

Desktop:

``` text
┌─────────────────────────────────────┬─────────────┐
│                                     │             │
│       Circular Vedika System        │   Student   │
│                                     │   Panel     │
│                                     │             │
└─────────────────────────────────────┴─────────────┘
```

Tablet:

-   reduce orbit radius
-   reduce card size
-   preserve circular structure where possible

Mobile:

Do not force a tiny circle.

Transform into:

``` text
        Vedika

     circular progress

01  24/7 Companion
02  Non-Judgmental
03  Unlimited Questions
04  Own Pace
05  Concept Clarity
...
```

The mobile version should preserve the sequential storytelling idea.

------------------------------------------------------------------------

# 18. Animation Rules

Use the project's existing animation library.

If GSAP is already installed, use GSAP.

Avoid adding another animation framework.

Animations should include:

-   ring progress
-   node activation
-   connector illumination
-   subtle icon pulse
-   card entrance
-   particle movement
-   Vedika floating
-   active-state glow

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

-   disable continuous particle movement
-   disable unnecessary floating
-   keep state transitions short
-   preserve all information and interaction

------------------------------------------------------------------------

# 19. Important UX Rule

This is **not a dashboard**.

Do not turn every feature into a large rectangular card.

The visual idea should remain:

> **One AI companion at the center, with a learning ecosystem
> progressively forming around it.**

The circle itself is part of the storytelling.

------------------------------------------------------------------------

# 20. Visual Style

Overall aesthetic:

-   premium
-   futuristic
-   educational
-   trustworthy
-   playful but not childish
-   dark
-   cinematic
-   sophisticated
-   AI-native

Use:

-   black / near-black background
-   subtle galaxy texture
-   glassmorphism
-   thin borders
-   neon accents
-   controlled bloom
-   soft gradients
-   subtle particles
-   clean typography

Avoid:

-   excessive glass cards
-   generic dashboard appearance
-   stock illustrations
-   flat corporate UI
-   excessive gradients
-   huge text inside cards
-   clutter
-   unnecessary 3D effects

------------------------------------------------------------------------

# 21. Typography

Use the existing project typography.

Preferred hierarchy:

``` text
Eyebrow:
12–14px / uppercase / tracking

Headline:
48–64px desktop

Body:
16–18px

Feature title:
15–18px

Feature description:
12–14px

Micro label:
10–12px
```

Do not change the global typography system unless necessary.

------------------------------------------------------------------------

# 22. Content Animation Example

State 1:

``` text
           24/7 Study Companion
                    🟠
                   ╱
              [VEDIKA]

Progress:
◔
```

State 2:

``` text
           24/7 Companion 🟠
                    ╲
              [VEDIKA]
                    ╱
          Non-Judgmental 💗

Progress:
◑
```

State 3:

``` text
       Non-Judgmental 💗
                ╲
  Unlimited 💜 — [VEDIKA] — Own Pace 🔵

Progress:
◕
```

Continue until the complete circle is formed.

At completion:

``` text
      🟠 ─ 💗 ─ 💜 ─ 🔵
       │             │
      🟢 ─ [VEDIKA] ─ 🩵
       │             │
      🔵 ─ 💗 ───────┘

             360°
        LEARNING ECOSYSTEM
```

------------------------------------------------------------------------

# 23. Implementation Architecture

Keep the implementation modular.

Suggested structure:

``` text
components/
  student/
    VedikaOrbit.tsx
    OrbitFeature.tsx
    OrbitProgress.tsx
    OrbitConnector.tsx
    OrbitParticles.tsx
```

If the existing project uses a different structure, follow the project's
architecture instead of forcing this structure.

Data should be separated from presentation.

Example:

``` js
const studentBenefits = [
  {
    id: 1,
    title: "24/7 Study Companion",
    description: "...",
    shortLabel: "Always available",
    color: "amber"
  },
  ...
]
```

The UI should render from this data rather than hardcoding each card.

------------------------------------------------------------------------

# 24. Performance

Important because this section may contain many animations.

Requirements:

-   use CSS transforms where possible
-   avoid expensive layout recalculation
-   avoid unnecessary React re-renders
-   animate opacity/transform/stroke properties
-   reuse SVG elements
-   avoid creating hundreds of DOM particles
-   keep particle count low
-   clean up GSAP timelines/listeners
-   use responsive sizing rather than fixed pixel-heavy positioning

------------------------------------------------------------------------

# 25. Existing Project First

Before writing code:

1.  Inspect the current project structure.
2.  Identify the existing student section component.
3.  Identify the existing Vedika asset/model.
4.  Identify the existing animation library.
5.  Identify existing CSS/design tokens.
6.  Identify existing Student/Teacher/Admin state management.
7.  Identify the current carousel/navigation implementation.
8.  Reuse existing infrastructure wherever possible.

Do not rewrite unrelated components.

Do not replace working functionality.

Do not duplicate the existing Vedika model.

------------------------------------------------------------------------

# 26. Scope

Only redesign the **student content experience section**.

Keep:

-   global navigation
-   Student / Teacher / Admin switcher
-   right-side student experience panel
-   existing CTA behavior
-   existing carousel/page navigation
-   existing backend/data
-   existing routing

unless a small integration change is required.

------------------------------------------------------------------------

# 27. Final Quality Checklist

Before considering the implementation complete, verify:

-   [ ] Vedika is centered.
-   [ ] Features form a genuine circular/orbital system.
-   [ ] Progress ring is SVG based.
-   [ ] Ring gradually fills from 0° → 360°.
-   [ ] Each feature has a different accent color.
-   [ ] Feature activation is sequential.
-   [ ] Clicking a feature updates the ring.
-   [ ] Hover enhances the feature without being required.
-   [ ] Keyboard interaction works.
-   [ ] Connector lines illuminate.
-   [ ] The active feature is clearly readable.
-   [ ] Inactive features remain visible but subdued.
-   [ ] Vedika remains visually stable.
-   [ ] Animations are smooth.
-   [ ] Reduced-motion mode works.
-   [ ] Mobile layout does not break.
-   [ ] Existing assets are reused.
-   [ ] Existing project architecture is respected.
-   [ ] No unrelated sections are modified.
-   [ ] No unnecessary dependencies are added.
-   [ ] No horizontal overflow occurs.
-   [ ] No generic dashboard-card appearance.
-   [ ] Final result matches the premium Vedika visual language.

------------------------------------------------------------------------

# 28. Design Intent

The final experience should communicate this idea visually:

> **A student doesn't have to adapt to Vedika. Vedika adapts to the
> student's learning journey.**

The circle progressively becoming complete represents the student's
learning ecosystem coming together:

**Anytime → Ask freely → Learn safely → Learn at your pace → Understand
→ Explore → Practice → Grow.**

The animation should make this feel like a living AI learning system
rather than a static feature list.
