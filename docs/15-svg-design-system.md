# 15 — SVG Design System

## Purpose

This document is the canonical reference for every SVG on the site. Color palette, typography, viewBox standards, animation rules, accessibility patterns, and shared component primitives.

This complements `12-image-policy.md` (the what/when of visual content). This doc is the how (the specific implementation rules).

---

## Brand color palette

### Core tokens

```ts
// components/svg/tokens.ts
export const colors = {
  // Brand
  brand: {
    primary: '#1e40af',    // blue-800
    primaryLight: '#3b82f6', // blue-500
    primaryDark: '#1e3a8a',  // blue-900
    accent: '#0891b2',     // cyan-600
    accentLight: '#22d3ee', // cyan-400
  },

  // Ink (text and lines)
  ink: {
    900: '#0f172a',  // primary text, axis lines
    700: '#334155',  // body text on SVG labels
    500: '#64748b',  // muted labels, secondary lines
    300: '#cbd5e1',  // grid lines, subtle dividers
    100: '#f1f5f9',  // backgrounds
  },

  // Semantic
  good: '#059669',     // green-600, "normal" state
  warn: '#d97706',     // amber-600, "warning" state
  danger: '#dc2626',   // red-600, "problem" state
  info: '#0284c7',     // sky-600, "information" state

  // Backgrounds
  surface: {
    canvas: '#ffffff',
    subtle: '#f8fafc',  // very subtle gray
    contrast: '#1e293b', // slate-800, dark mode equivalent
  },

  // Data viz palette (for charts with 2-4 series)
  series: {
    primary: '#1e40af',  // blue
    secondary: '#d97706', // amber
    tertiary: '#059669',  // green
    quaternary: '#7c3aed', // purple
  },

  // Zone shading (translucent overlays on charts)
  zones: {
    danger: 'rgba(220, 38, 38, 0.12)',    // red 12% alpha
    warn: 'rgba(217, 119, 6, 0.12)',      // amber 12%
    good: 'rgba(5, 150, 105, 0.12)',      // green 12%
    info: 'rgba(2, 132, 199, 0.10)',      // sky 10%
  },
};
```

### Color usage rules

**Charts with comparing series**: use `series.primary` and `series.secondary` (blue + amber). Both legible in color-blind palettes. Add `series.tertiary` (green) only if a third series is essential.

**Status indicators**:
- Good / normal: `good` (green)
- Warning / caution: `warn` (amber)
- Problem / failure: `danger` (red)
- Information / neutral: `info` (sky) or `ink.700`

**Zone shading on charts**: use `zones.*` colors at low alpha to mark regions ("Aux heat zone", "Below balance point", etc.).

**Text on SVGs**:
- Primary labels: `ink.900`
- Body text: `ink.700`
- Muted: `ink.500`
- Grid lines: `ink.300`

**Never**:
- Use color as the only signal (always pair with labels, patterns, or icons)
- Mix multiple semantic colors on one chart without explicit meaning
- Use pure black (#000) for text (use `ink.900` instead — softer, more readable)
- Use bright saturated red for normal data (reserve `danger` for actual problem states)

---

## Typography in SVGs

### Font stack

```css
font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

System fonts only. No custom web fonts in SVGs — they fail to load before SVG renders, cause layout shifts, and add weight.

### Size scale

| Element | Size | Weight | Color |
|---|---|---|---|
| SVG hero title (if rendered inside SVG) | 28-32px | 600 | ink.900 |
| Chart title | 20-24px | 600 | ink.900 |
| Axis labels (x, y) | 14-16px | 500 | ink.700 |
| Tick labels | 12-13px | 400 | ink.500 |
| Data point labels | 13-14px | 500 | ink.900 |
| Annotation text | 12-13px | 400 italic | ink.700 |
| Legend text | 13-14px | 400 | ink.700 |
| Caption text (below SVG, NOT inside) | 14px italic | 400 | ink.500 |

### Text positioning rules

- Center-align titles
- Right-align y-axis tick labels (numbers)
- Center-align x-axis tick labels (numbers)
- Left-align legend text
- Annotation arrows should NOT overlap data points; offset by 8-12px

---

## Standard viewBoxes

| Use | viewBox | Aspect | Rendered size |
|---|---|---|---|
| Hero (article) | `0 0 1200 600` | 2:1 | Full body width, max 800px |
| Hero (full-bleed, hub) | `0 0 1200 540` | 20:9 | Full viewport width on desktop |
| OG image (social) | `0 0 1200 630` | 1.9:1 | Generated to PNG, 1200×630 |
| Inline chart | `0 0 800 500` | 8:5 | Body width (max ~700px) |
| Inline diagram | `0 0 1000 600` | 5:3 | Body width |
| Decision matrix | `0 0 1000 700` | 10:7 | Body width, tall |
| Component cutaway | `0 0 800 600` | 4:3 | Body width |
| Small inline chart | `0 0 600 400` | 3:2 | Half body width or sidebar |
| Icon | `0 0 24 24` | 1:1 | 16-32px in UI |
| Calculator gauge / dial | `0 0 400 240` | 5:3 | Within widget |

### viewBox padding

Reserve internal margins:
- Top: 40px (room for title if rendered)
- Bottom: 60px (room for x-axis labels)
- Left: 60px (room for y-axis labels)
- Right: 20-40px (room for end-of-line labels)

These are minimums. Larger margins are fine for clarity.

---

## SVG component pattern

Every SVG is a React component in `components/svg/`. The pattern:

```tsx
// components/svg/inline/BalancePointChart.tsx
interface Props {
  className?: string;
  // any data-driving props
}

export function BalancePointChart({ className }: Props) {
  const titleId = 'balance-point-chart-title';
  const descId = 'balance-point-chart-desc';

  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
    >
      <title id={titleId}>
        Heat pump balance point chart
      </title>
      <desc id={descId}>
        Chart showing heat pump capacity declining and home heat loss rising as outdoor temperature drops; the intersection at 20 degrees Fahrenheit is the balance point, below which auxiliary heat fills the gap.
      </desc>

      {/* Background */}
      <rect width="800" height="500" fill="var(--svg-surface, #ffffff)" />

      {/* Grid */}
      {/* Axes */}
      {/* Curves */}
      {/* Labels */}
    </svg>
  );
}
```

### Required wrapper

For consistency, use the shared `<SvgWrapper>` primitive:

```tsx
// components/svg/primitives.tsx
interface WrapperProps {
  viewBox: string;
  titleId: string;
  descId: string;
  title: string;
  desc: string;
  children: React.ReactNode;
  className?: string;
}

export function SvgWrapper({
  viewBox, titleId, descId, title, desc, children, className
}: WrapperProps) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      {children}
    </svg>
  );
}
```

This guarantees every SVG has the required accessibility attributes.

---

## Reusable SVG primitives

### Grid lines

```tsx
// components/svg/primitives.tsx
interface GridProps {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  xSteps: number;
  ySteps: number;
}

export function ChartGrid({ xStart, xEnd, yStart, yEnd, xSteps, ySteps }: GridProps) {
  // generate horizontal and vertical grid lines
  // stroke: colors.ink[300], stroke-width: 1, stroke-dasharray: "2,2"
}
```

### Axes

```tsx
interface AxisProps {
  orientation: 'x' | 'y';
  start: number;
  end: number;
  label: string;
  ticks: Array<{ value: number; position: number; label: string }>;
}

export function ChartAxis({ orientation, start, end, label, ticks }: AxisProps) {
  // draw axis line + ticks + labels
  // axis: colors.ink[700], stroke-width: 1.5
  // ticks: colors.ink[700], length 6
}
```

### Data series

```tsx
interface SeriesProps {
  points: Array<{ x: number; y: number }>;
  color: string;
  strokeWidth?: number;
  fill?: string;
  label?: string;
  showDots?: boolean;
}

export function DataSeries({ points, color, strokeWidth = 2.5, ...rest }: SeriesProps) {
  // render a path through the points
  // optional dots at each point
  // optional fill below the line for area charts
}
```

### Annotations

```tsx
interface AnnotationProps {
  x: number;
  y: number;
  text: string;
  arrow?: { fromX: number; fromY: number };
}

export function Annotation({ x, y, text, arrow }: AnnotationProps) {
  // text + optional arrow pointing to a data point
}
```

These primitives live in `components/svg/primitives.tsx` and are used across all charts/diagrams.

---

## Animation rules

Animations are used sparingly. Default: SVGs are static.

### When animation is appropriate

- **Flow diagrams**: show direction with subtle arrow movement (refrigerant flow, airflow)
- **Sequence diagrams**: highlight the active step
- **Loading states**: indicate calculator is computing
- **Chart entrance**: subtle fade-in on first view (NOT continuous)

### When animation is NOT appropriate

- Decorative bouncing/spinning (distracting, no information value)
- Color cycling (epilepsy risk + visual noise)
- Continuous looping that doesn't reflect data
- Anything that distracts from reading the article
- Anything that hurts performance (Web Vitals INP)

### Animation implementation

Prefer CSS animations over SMIL:

```tsx
<path
  d="M ..."
  stroke={colors.brand.primary}
  strokeWidth={2}
  style={{
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    animation: 'draw-in 0.8s ease-out forwards',
  }}
/>

<style>
  {`
    @keyframes draw-in {
      to { stroke-dashoffset: 0; }
    }
  `}
</style>
```

### `prefers-reduced-motion`

EVERY animated SVG must respect this preference:

```css
@media (prefers-reduced-motion: reduce) {
  .svg-animation {
    animation: none !important;
    transition: none !important;
  }
}
```

Without the override, motion-sensitive users get no animation.

### Animation duration

- Entrance animations: 400-800ms, never more
- Step transitions: 200-400ms
- Hover effects: 150-200ms

Long animations feel sluggish; short ones feel jarring. The above range is the sweet spot.

---

## Inline SVG vs imported asset

### Inline SVG (in React)

Use when:
- SVG is unique to a single article or component
- SVG benefits from React state (interactive, animated)
- SVG uses CSS variables for theming
- SVG is part of the visual hierarchy of the page

How: React component in `components/svg/`, imported and rendered as JSX.

### External SVG asset (in `public/`)

Use when:
- SVG is referenced in `<img>` tags from MDX
- SVG is loaded for OG image generation
- SVG is the site logo / favicon

How: file in `public/`, referenced by URL.

### Default

Inline React component. External assets are reserved for the few cases where they're necessary.

---

## OG image generation pipeline

Goal: Generate a 1200×630 PNG per article for social sharing.

Process:
1. `scripts/generate-og-images.ts` reads every page's frontmatter
2. For each page, render an OG template:
   - Site logo (top-left)
   - Article H1 (large, center)
   - Hub name (top-right)
   - Author byline + URL (bottom-left)
3. Render template via Satori → SVG → PNG (via @resvg/resvg-js)
4. Output to `public/og-images/[slug].png`
5. Run at build time (cached if input unchanged)

### Template structure

```tsx
// scripts/og-template.tsx
export function OGImageTemplate({ h1, hub, slug }: Props) {
  return (
    <div style={{
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 60,
      background: '#f8fafc',
      fontFamily: 'system-ui',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Logo />
        <span style={{ color: '#64748b', fontSize: 20, fontWeight: 500, textTransform: 'uppercase' }}>
          {hub}
        </span>
      </div>

      <h1 style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: '#0f172a' }}>
        {h1}
      </h1>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: '#334155', fontSize: 24 }}>Jonathan S. — hvacloadcalc.org</span>
      </div>
    </div>
  );
}
```

### Brand color usage in OG images

- Background: surface.subtle (#f8fafc)
- H1 text: ink.900 (#0f172a)
- Hub tag: ink.500 (#64748b), uppercase, 20px
- Byline text: ink.700 (#334155)
- Logo: brand.primary (#1e40af)

OG images use a quieter palette than article hero SVGs (which can be bolder).

---

## Calculator-specific SVG patterns

### Calculator gauge / dial

For showing a result on a scale (e.g., "Your home needs 36,000 BTU"):

```
viewBox: 0 0 400 240
- Semicircle arc from low to high
- Gradient fill: blue (low) → amber (mid) → red (high)
- Needle pointing to result value
- Result number large in center
- Min/max labels at ends of arc
```

### Calculator slider

For interactive input (e.g., square footage slider):

- Use a native `<input type="range">` styled with CSS, NOT an SVG slider
- SVG is for visualization of result, not input controls

### Calculator result visualization

- Always show the result as a clear number first (large, prominent)
- Supplementary SVG (chart, gauge) shows context (e.g., "your result vs typical range")
- Always include "Methodology" link below the result for transparency

---

## Performance considerations

### File size limits

- Inline SVG: try to stay under 30 KB per component
- External SVG asset: target under 10 KB
- Heavy diagrams (>50 KB) should be split into multiple components OR rasterized to WebP for very dense images (rare)

### Optimization

- Strip unnecessary attributes (use SVGO equivalent or manual cleanup)
- Round coordinates to integers where precision allows
- Use `<use>` elements for repeated shapes
- Combine paths where possible
- Avoid embedded fonts/binary data

### Rendering performance

- Avoid SVG filters (drop-shadow, blur) — they're expensive
- Avoid mask/clip-path on large areas
- Animation should be GPU-accelerated (transform, opacity) — avoid animating geometry properties

---

## Quality checklist for new SVGs

Before merging any SVG component:

- [ ] `viewBox` set, no `width`/`height` attributes
- [ ] `role="img"` + `aria-labelledby` referencing `<title>` and `<desc>`
- [ ] `<title>` is short (≤80 chars), describes content
- [ ] `<desc>` is full description of what the SVG teaches
- [ ] Uses palette colors from `tokens.ts`, no one-off hex codes
- [ ] Color contrast meets WCAG AA
- [ ] No color-alone information
- [ ] Text uses system font stack
- [ ] Animations (if any) respect `prefers-reduced-motion`
- [ ] Readable at 200px wide (thumbnail test)
- [ ] File size reasonable (<30 KB for inline)
- [ ] Component renders without errors in browser
- [ ] No console warnings about invalid SVG attributes
