# 12 — Image and Visual Policy

## Core principle

This site is visually distinctive on purpose. Almost every other HVAC site uses stock photos of contractors smiling in front of AC units, AI-generated illustrations of cartoon houses, and decorative graphics that add nothing. We don't.

**Every visual on this site teaches the reader something.** If a visual doesn't add information, it doesn't appear.

---

## Hierarchy of visual types

In order of preference:

1. **Hand-crafted SVG diagrams** — first choice for every concept that can be diagrammed
2. **Hand-crafted SVG charts** — for data visualizations
3. **Hand-crafted SVG illustrations** — for component cutaways, sequence diagrams, system overviews
4. **Photos of specific physical things** — only when documenting something that must be photographed (NFRC label, AHRI plate, return air grille variant, thermostat aux indicator)
5. **Author photo (Jonathan S.)** — one canonical AI-generated headshot, used everywhere consistently
6. **Logo/icon SVGs** — site logo and minimal iconography

**Not used, ever:**
- Stock photos
- Decorative AI-generated images
- Generic clip art
- Free icon libraries (Heroicons, Feather, etc.) — we build our own where icons are needed

---

## SVG-first rationale

SVGs serve every project goal:

- **Performance**: smaller file size than equivalent PNG, scales without quality loss
- **Accessibility**: text-based, screen-reader friendly with proper `<title>` and `<desc>`
- **SEO**: no separate HTTP request, no `alt` text indexing limits
- **Customization**: respond to theme/dark mode via CSS variables
- **Authority signal**: hand-crafted diagrams suggest expertise; stock photos suggest a content farm
- **AI citation friendliness**: LLMs cite text-rich pages more readily; SVGs are text
- **Edit-ability**: anyone with the source can update labels, colors, ranges

See `15-svg-design-system.md` for the design system (color tokens, viewBox standards, animation rules, accessibility patterns).

---

## When SVGs are required

Every article-type page MUST have:
- **1 hero SVG** above the H1, illustrating the article's core concept
- **2-5 inline SVGs** distributed through H2 sections, each teaching a specific sub-concept

Every calculator page MUST have:
- **1 hero SVG** illustrating what the calculator computes
- **1 SVG within the worked example** showing the math visually
- **Calculator widget SVGs** (sliders, gauges, results displays) — see `16-calculator-architecture.md`

Every hub page SHOULD have:
- **1 hero SVG** illustrating the hub topic
- **SVG icons in `<HubCard>` components** for each spoke

Every glossary page MAY have:
- **1 inline SVG** if the term benefits from visualization (e.g., balance point, psychrometric chart, defrost cycle); not required for purely textual terms (e.g., AFUE, COP)

Every programmatic page generates:
- **1 dynamic SVG** showing the specific data point (e.g., chart with the variant's data highlighted)

---

## SVG specifications

### Required attributes

```xml
<svg
  viewBox="0 0 [width] [height]"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-labelledby="svg-title-[unique-id] svg-desc-[unique-id]"
>
  <title id="svg-title-[unique-id]">[Short title, ≤80 chars]</title>
  <desc id="svg-desc-[unique-id]">[Full description, what the diagram teaches]</desc>
  <!-- content -->
</svg>
```

- `viewBox`: always set, never use raw `width`/`height` for scaling
- `role="img"`: required for accessibility
- `aria-labelledby`: references title + desc
- `<title>`: short label for screen readers
- `<desc>`: full description of what the SVG teaches

### Standard viewBoxes

| Use | viewBox | Notes |
|---|---|---|
| Hero (desktop+mobile) | `0 0 1200 600` | 2:1 aspect, full-width article |
| Inline chart | `0 0 800 500` | 8:5 aspect, body-width |
| Inline diagram | `0 0 1000 600` | 5:3 aspect, body-width |
| Decision matrix | `0 0 1000 700` | Tall, for side-by-side layouts |
| Component cutaway | `0 0 800 600` | 4:3 aspect |
| Icon | `0 0 24 24` | Standard icon grid |

Hero SVGs may extend beyond article body width (full-bleed); inline SVGs stay within the prose column (max ~700px rendered).

### Color tokens

(Full palette in `15-svg-design-system.md`; summary here.)

- Primary blue: `#1e40af` (brand)
- Accent cyan: `#0891b2`
- Ink: `#0f172a` (high), `#334155` (body), `#64748b` (muted)
- Warn amber: `#d97706`
- Danger red: `#dc2626`
- Good green: `#059669`
- Surfaces: `#f1f5f9` (subtle bg), `#ffffff` (canvas)

Use CSS variables in SVGs where possible:

```xml
<rect fill="var(--color-brand, #1e40af)" />
```

This enables theme/dark mode adaptation without editing every SVG.

### Typography in SVGs

- Use a single font stack: `system-ui, -apple-system, sans-serif`
- Labels: 14-18px, regular weight
- Axis labels: 12-14px, regular
- Headings within SVG: 18-24px, medium/semibold
- Annotations: 12-14px, often italic
- **No custom fonts loaded for SVG text** — system fonts only (performance + reliability)

### Accessibility

- Color contrast: minimum 4.5:1 for any text, 3:1 for large text and meaningful UI elements
- Never use color alone to convey information — pair with labels, patterns, or icons
- Provide text equivalents in `<desc>` for any data shown visually
- Animations: respect `prefers-reduced-motion` media query (no animation if user requests reduced motion)

---

## Photos: when allowed

Photos are permitted ONLY for:

1. **Documenting specific physical things**:
   - NFRC window labels (showing U-factor, SHGC, etc.)
   - AHRI rating plates on equipment
   - Manual J HTM table excerpts (scanned from the source)
   - Specific equipment components (return air grilles, registers, thermostat displays)
   - Insulation types and installations
   - Real-world condition examples (frost on a heat pump coil, ice on a defrost line)

2. **Author headshot**:
   - One canonical Jonathan S. portrait
   - Used in `<AuthorByline>`, `/authors/jonathan-s/`, OG images
   - No variations — same image everywhere

Photos NOT permitted:
- Hero photos for articles (use hero SVG instead)
- Lifestyle photos (homeowners thinking, contractors working, etc.)
- Stock photos of buildings, houses, equipment for general illustration
- AI-generated photographs of any subject

### Photo requirements (when used)

- **Source attribution**: every photo cites its source (NFRC.org, manufacturer documentation, building science publication)
- **Permission**: only photos we own, have license to use, or are clearly fair use (e.g., a manufacturer's product page screenshot for documentation)
- **Format**: WebP preferred (smaller); JPG acceptable
- **Resolution**: 800px wide minimum for content photos
- **File size**: ≤150 KB after compression
- **Alt text**: content-describing, ≤125 chars
- **Caption**: present below photo, explains what the photo shows + source

---

## Hero image specs

Every article has a hero SVG above the H1. The hero:

- Establishes the article's topic visually
- Is the OG image source (rendered to PNG via Satori for social shares)
- Spans full article body width on desktop (or full-bleed for hub pages)
- Scales responsively to mobile

### Hero SVG creation process

1. Brief specifies the hero SVG's content (see `_template.md` schema)
2. Brief includes full description, labeled elements, color hints, layout
3. CC writes the SVG as a React component in `components/svg/hero/`
4. Component is imported in the MDX page or referenced in the page.tsx
5. OG image generation (`scripts/generate-og-images.ts`) reads the SVG and produces a PNG variant for social cards

### Hero SVG content rules

- Must teach something meaningful (not just decorative)
- Must be readable at thumbnail size (200px wide) — no ultra-fine detail
- Must work in OG ratio (1200×630) and article-width (1200×600)
- Must use the standard color palette
- Must be original — never copied from competitor sites or standards documents

---

## Inline diagram standards

Inline SVGs distributed through articles:

### Placement rules

- After paragraph 1 of an H2 section (lets the prose set context first)
- Never at the very start of an article (hero handles that)
- Never inside a `<KeyTakeaways>` or `<FAQ>` or `<Callout>`
- Captions go below the SVG, italic, 14px text

### Caption format

```
Figure [N]. [Description of what the figure shows]. Source: [if applicable].
```

Example:

```
Figure 2. Heat pump capacity declines as outdoor temperature drops while home heat loss rises; the intersection is the system's balance point. Adapted from typical NEEP cold-climate heat pump performance data.
```

### Caption rules

- Always begin with "Figure [N]."
- Number figures sequentially within the article (Figure 1, 2, 3...)
- Source attribution when adapted from a published source
- Single sentence preferred; max two

---

## Chart-specific rules

Charts are a sub-type of inline SVG. Additional rules:

### Axis labels
- Always labeled, never assumed
- Units included (°F, BTU/hour, $/kWh, etc.)
- Origin visible when relevant
- Tick marks at meaningful intervals (5°F not 7°F)

### Data labels
- Key data points labeled directly on the chart (not just in a legend)
- Critical values highlighted (e.g., "Balance Point — 20°F")
- Annotation arrows where the relationship between two elements matters

### Legends
- Only when more than 2 series and direct labeling isn't practical
- Position: top or right of chart
- Inline with the chart, not floating

### Color usage in charts
- Two-series comparison: blue + amber (high contrast)
- Three-series: add green
- Four-series: avoid; redesign the chart
- "Zone" shading (e.g., aux heat zone below balance point): use a tinted version of the main palette color at 20% opacity

---

## Component cutaways and sequence diagrams

When showing how something works mechanically (heat pump operation, air handler airflow, refrigerant cycle):

- **Use cutaway views** — show the inside, not just the exterior
- **Label every component** — no unlabeled boxes
- **Show flow with arrows** — refrigerant flow, airflow, heat transfer
- **Use color consistently** — refrigerant hot side red, cold side blue, electrical yellow, airflow gray
- **Number sequence steps** — for sequence diagrams, number 1, 2, 3...

### Decision matrices and flow diagrams

For "is this normal vs problem" content (see `01-heat-pump-aux-heat.md` brief, section 5):

- Two-column layout (green left, red right)
- Each cell: icon + brief description
- Clear column headers
- Brief takeaway at the bottom of the matrix

---

## Icons

When icons are needed (rarely — most concepts get diagrams, not icons):

- **Hand-crafted SVGs in `components/svg/icons/`**
- Standard 24×24 viewBox
- Single-color (currentColor) for theme adaptation
- Stroke-based when possible (more visually consistent at small sizes)
- No fill except for explicit "filled" variants
- 1.5-2px stroke weight

**Do not use icon libraries** (Heroicons, Feather, Lucide, etc.). We build our own minimal set:
- Arrow (right, down, up, left)
- Check (good state)
- X (problem state)
- Info (callout)
- Warning (callout)
- External link
- Search
- Menu (mobile)
- Close (mobile)

This is the icon ceiling — about 10-12 icons total. If a need arises beyond these, design a new icon or rethink the UI.

---

## OG image generation

OG images are generated programmatically from article frontmatter using Satori (`scripts/generate-og-images.ts`).

### OG image template

```
┌────────────────────────────────────────────┐
│  hvacloadcalc.org                  HUB     │
│                                            │
│                                            │
│     [Article H1]                           │
│                                            │
│     [Optional 1-line subtitle]             │
│                                            │
│                                            │
│  Jonathan S. — hvacloadcalc.org            │
└────────────────────────────────────────────┘
```

### OG image specs

- 1200×630
- PNG output, ≤200 KB
- Brand colors only
- System font stack
- Built once at build time, cached
- Filename: `og-images/[slug].png`

### OG variants

If an article needs a customized OG (rare):
- Add `og_image_custom: true` to frontmatter
- Specify hero SVG to use
- Otherwise, default template applies

---

## File organization

```
public/
├── og-images/
│   ├── heat-pump-aux-heat.png  # generated
│   └── ...
└── authors/
    └── jonathan-s.jpg          # canonical

components/svg/
├── hero/                       # one SVG component per article hero
│   ├── HeroAuxHeatFlow.tsx
│   └── ...
├── inline/                     # inline diagrams, charts, etc.
│   ├── BalancePointChart.tsx
│   ├── ThermostatCallFlow.tsx
│   └── ...
├── icons/                      # the minimal icon set
│   ├── ArrowRight.tsx
│   └── ...
├── calculator/                 # SVGs that live inside calculators
│   └── ...
├── tokens.ts                   # color tokens, gradient defs, common patterns
└── primitives.tsx              # shared SVG primitives (Title+Desc wrapper, etc.)
```

---

## Quality gate for visuals

Before any visual ships, verify:

- [ ] SVG has `viewBox`, `role="img"`, `aria-labelledby`, `<title>`, `<desc>`
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] No color-alone information conveyance
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Readable at 200px wide (thumbnail test)
- [ ] Works in light mode and (when implemented) dark mode
- [ ] No external font dependencies
- [ ] Caption present (for inline SVGs), with figure number
- [ ] File size reasonable (most SVGs <50KB; if exceeding, audit)
- [ ] Alt text and `<desc>` are content-describing, not appearance-describing
- [ ] No competitor or standards-document imagery reused

---

## Common mistakes to avoid

1. **Using `width` and `height` attributes instead of `viewBox`** — breaks responsive scaling
2. **Decorative SVGs without `<title>`/`<desc>`** — accessibility violation
3. **Color as the only information signal** — fails for color-blind users
4. **Embedding raster images inside SVG** — defeats the purpose, increases file size
5. **Forgetting unit labels on charts** — readers can't interpret numbers
6. **Inline styles in SVGs instead of CSS variables** — kills theming
7. **Generating icons via AI** — looks generic, inconsistent
8. **Stock photo hero images** — kills the site's distinctive look
9. **Charts that don't fit the brand palette** — visual inconsistency
10. **OG images that don't match the article hero** — confuses social shares
