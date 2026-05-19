# 16 — Calculator Architecture

## The decision

Calculators use **Option C**: SSR default state with worked example + client-side interactivity + separate `/examples/` URLs for long-tail SEO.

Every calculator is implemented this way. No variations.

---

## Why Option C

Three competing concerns:
1. **SEO**: Calculators need crawlable content for indexation
2. **UX**: Calculators need interactive controls users can manipulate
3. **Long-tail traffic**: Specific calculator inputs (e.g., "what size heat pump for 1,500 sq ft in zone 5") should rank for their specific query

Option A (pure client-side): bad for SEO. Google can't index interactive widgets well.
Option B (server-side only): bad for UX. Users can't try different inputs.
Option C: SSR a default state with worked example explanation, hydrate the widget client-side for interaction, AND publish pre-computed example variants at their own URLs.

This gives us:
- The main calculator page indexes with substantive content (default state explained)
- Users get full interactivity after JS loads
- 12-20 example URLs per calculator capture long-tail SEO
- Each example URL is server-rendered with its specific data

---

## Anatomy of a calculator page

```
URL: /tools/heat-pump-size-calculator/

[Breadcrumbs]
# H1 — Calculator Name (e.g., "Heat Pump Size Calculator")
By Jonathan S. | Reviewed [date]

[Planning-grade disclaimer callout]

[Calculator Widget — SSR'd with default state]
┌─────────────────────────────────────────┐
│ INPUTS                  RESULT          │
│ Square footage: 1500    36,000 BTU      │
│ Climate zone: 5         (3.0 tons)      │
│ Insulation: Average     Range: 30k-42k  │
│ [Calculate button]                      │
└─────────────────────────────────────────┘

[KeyTakeaways]
- What this calculator computes
- How to interpret the result
- Key caveats

Intro paragraph (1 paragraph, max 3 sentences)

## Worked example: how this default came out to 36,000 BTU

[Explains the math behind the SSR'd default state, step by step]

## Methodology

[Formula, sources, limits]

## What the inputs mean

### Square footage
[Explanation of input 1]

### Climate zone
[Explanation of input 2]

### Insulation quality
[Explanation of input 3]

## Common scenarios

[Examples Grid: 12-20 pre-computed variants linked]
┌─────────────┬─────────────┬─────────────┐
│ 1000 sqft   │ 1500 sqft   │ 2000 sqft   │
│ Zone 3      │ Zone 5      │ Zone 6      │
│ 24k BTU     │ 36k BTU     │ 60k BTU     │
│ [View]      │ [View]      │ [View]      │
└─────────────┴─────────────┴─────────────┘

## FAQ

[5-10 questions about using the calculator and interpreting results]

## Related calculators
[Links to 2-3 related tools]

## Related articles
[Links to 3-5 articles that explain the underlying concepts]

[Sources]
[Author Byline]
[Footer]
```

---

## SSR default state

Every calculator opens with sensible defaults pre-computed and rendered server-side. The defaults are chosen to:

- Represent a "typical" use case the reader can identify with
- Produce a result that's a round number (1,500 sqft → 36,000 BTU is cleaner than 1,427 sqft → 34,248 BTU)
- Be referenced in the worked example explanation

### Standard defaults across calculators

| Input | Default | Rationale |
|---|---|---|
| Square footage | 1,500 sqft | Median US home size |
| Climate zone | 5 | Mid-range climate (Denver, Indianapolis, KC) |
| Insulation quality | Average | Mid-range envelope |
| Ceiling height | 8 ft | Most common |
| Number of stories | 1 | Simplest case |
| Window-to-wall ratio | 15% | Typical |
| Number of occupants | 4 | Average household |
| Indoor design temp (heat) | 70°F | Manual J default |
| Indoor design temp (cool) | 75°F | Manual J default |
| Heat pump COP | 3.0 | Mid-range conventional |
| Resistance heat COP | 1.0 | Always 1.0 |
| Electricity rate | $0.16/kWh | US average per EIA |

These defaults are coded as constants in `lib/constants.ts` and reused across calculators for consistency.

---

## Client-side interactivity

After SSR'd content loads, JavaScript hydrates the widget:

- Input fields become editable
- Sliders, dropdowns, radio buttons work
- Result updates in real-time as inputs change (debounced ~100ms)
- "Reset to defaults" button restores the SSR'd state
- "Share this calculation" copies URL with query params

### Component pattern

```tsx
// app/tools/heat-pump-size-calculator/page.tsx
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { HeatPumpSizeCalculator } from '@/components/calculator/HeatPumpSizeCalculator';
import { calculateHeatPumpSize } from '@/lib/calculators/heat-pump-size';
import { DEFAULT_INPUTS } from '@/lib/constants';

export default function HeatPumpSizeCalculatorPage({ searchParams }: PageProps) {
  // Read inputs from URL params if present (for /examples/ pages and share URLs)
  const inputs = parseInputsFromParams(searchParams) ?? DEFAULT_INPUTS;

  // Pre-compute the result on the server
  const result = calculateHeatPumpSize(inputs);

  return (
    <CalculatorShell title="Heat Pump Size Calculator" disclaimer="planning-grade">
      <HeatPumpSizeCalculator
        initialInputs={inputs}
        initialResult={result}
      />
      {/* ... rest of page content (worked example, methodology, FAQ, etc.) */}
    </CalculatorShell>
  );
}
```

```tsx
// components/calculator/HeatPumpSizeCalculator.tsx
'use client';

import { useState } from 'react';
import { calculateHeatPumpSize, type Inputs, type Result } from '@/lib/calculators/heat-pump-size';

export function HeatPumpSizeCalculator({ initialInputs, initialResult }: Props) {
  const [inputs, setInputs] = useState(initialInputs);
  const [result, setResult] = useState(initialResult);

  function handleChange(field: keyof Inputs, value: number) {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    setResult(calculateHeatPumpSize(newInputs));
  }

  return (
    <div className="calculator-widget">
      {/* Input controls */}
      {/* Result display */}
      {/* Visualization SVG */}
    </div>
  );
}
```

### Math lives in `lib/calculators/`

Each calculator has a pure function in `lib/calculators/[name].ts`:

```ts
// lib/calculators/heat-pump-size.ts
export interface Inputs {
  squareFootage: number;
  climateZone: ClimateZone;
  insulationQuality: 'poor' | 'average' | 'good';
  ceilingHeight: number;
  numberOfStories: number;
  // ... other inputs
}

export interface Result {
  heatingBtu: number;
  coolingBtu: number;
  recommendedTons: number;
  lowEstimate: number;
  highEstimate: number;
  methodology: string;
}

export function calculateHeatPumpSize(inputs: Inputs): Result {
  // pure function, no side effects, fully unit-testable
}
```

These functions are:
- Pure (no DOM, no network, no side effects)
- Unit-tested in `tests/calculators/`
- Reused by both SSR rendering and client-side hydration

---

## URL state for sharing

Every calculator supports inputs as URL query parameters:

```
/tools/heat-pump-size-calculator/?sqft=2000&zone=6&insulation=good
```

When the URL has these params:
- SSR renders with these inputs
- Client hydrates with these inputs
- "Share this calculation" copies this URL

When the URL has no params:
- SSR renders with defaults
- Client hydrates with defaults

This makes results shareable without needing a backend.

---

## The `/examples/` sub-pages

Each calculator publishes 12-20 example URLs that bake in specific inputs.

### URL pattern

```
/tools/heat-pump-size-calculator/examples/1500-sq-ft-zone-5/
/tools/heat-pump-size-calculator/examples/2000-sq-ft-zone-6/
/tools/heat-pump-size-calculator/examples/1000-sq-ft-zone-3/
```

### Page structure

```
# H1: 1,500 sq ft Heat Pump Size — Climate Zone 5

[Same widget as main calculator, but initial state is THIS variant]

## What this calculation is

A heat pump sized for a 1,500 square foot home in climate zone 5 (e.g., Denver, Indianapolis) typically requires 30,000 to 42,000 BTU of heating capacity. This page shows the full calculation for this specific case.

## The result

For a 1,500 sqft home in climate zone 5 with average insulation:
- Heating: 36,000 BTU
- Cooling: 30,000 BTU
- Recommended: 3.0 ton heat pump

## How this calculation was reached

[Worked example showing the math for THIS variant]

## Adjust the inputs

[Same interactive widget — users can change any input from this starting point]

## Try other examples

[Links to 5-6 nearby variants — 1200 sqft zone 5, 1500 sqft zone 4, 1500 sqft zone 6, etc.]

## Methodology

[Same methodology block as main calculator page]
```

### Example generation

Examples are defined in a manifest per calculator:

```ts
// app/tools/heat-pump-size-calculator/examples-manifest.ts
export const examples = [
  { slug: '1000-sq-ft-zone-3', inputs: { sqft: 1000, zone: '3', insulation: 'average' } },
  { slug: '1000-sq-ft-zone-5', inputs: { sqft: 1000, zone: '5', insulation: 'average' } },
  { slug: '1500-sq-ft-zone-3', inputs: { sqft: 1500, zone: '3', insulation: 'average' } },
  { slug: '1500-sq-ft-zone-5', inputs: { sqft: 1500, zone: '5', insulation: 'average' } },
  { slug: '1500-sq-ft-zone-6', inputs: { sqft: 1500, zone: '6', insulation: 'average' } },
  { slug: '2000-sq-ft-zone-4', inputs: { sqft: 2000, zone: '4', insulation: 'average' } },
  // ... 12-20 entries
];
```

Next.js generates a static page for each example at build time via `generateStaticParams`.

### Example variant selection rules

For each calculator, select 12-20 examples that:

1. Cover the range of plausible inputs (small home to large home, mild to cold climate)
2. Map to keywords with confirmed search volume (from the cluster data)
3. Don't overlap (each example is meaningfully different from others)
4. Include both common cases (1500 sqft, average) and outlier cases (3000 sqft, cold)

Example selection is part of each calculator's brief.

---

## Methodology block

Every calculator MUST include a `<Methodology>` block. This:

- Explains the formula(s) used
- Cites the standards (ACCA Manual J, ASHRAE, NEEP, DOE)
- States the limitations (what the calculator doesn't account for)
- Provides links to deeper explanations

### Methodology block structure

```tsx
<Methodology>
  <h2>Methodology</h2>

  <p>
    This calculator estimates heating and cooling load using a simplified Manual J-style approach.
    The formula is:
  </p>

  <Formula>
    Load (BTU/hr) = Σ (U × A × ΔT) + Infiltration losses + Internal gains
  </Formula>

  <p>
    Where U is the assembly U-factor, A is area, and ΔT is the temperature difference between
    indoor and outdoor design conditions.
  </p>

  <SourcesList>
    <Source id="acca-manual-j-8" />
    <Source id="ashrae-fundamentals-2021" />
    <Source id="doe-building-america" />
  </SourcesList>

  <h3>Limitations</h3>
  <ul>
    <li>Does not perform room-by-room load calculation (whole-home only)</li>
    <li>Assumes uniform insulation throughout the envelope</li>
    <li>Does not include duct losses to unconditioned spaces</li>
    <li>Does not account for site-specific shading, orientation, or wind exposure</li>
    <li>Internal gains use average occupancy and appliance assumptions</li>
  </ul>

  <p>
    For permit-grade load calculation, consult a licensed HVAC contractor using ACCA-approved
    software with site-specific measurements.
  </p>
</Methodology>
```

### Methodology rules

- Always above the H2 sections that explain individual inputs
- Always lists at least 2 limitations
- Always points to professional consultation for high-stakes use
- Never claims the calculator produces permit-grade results

---

## Worked example

Every calculator includes a worked example explaining how the default state arrived at its result.

### Worked example structure

```tsx
<WorkedExample>
  <h2>Worked example: how we got to 36,000 BTU for a 1,500 sqft home</h2>

  <p>
    The default state shows a 1,500 sqft home in climate zone 5 with average insulation,
    yielding a heating load of 36,000 BTU. Here's the math.
  </p>

  <Step number={1} title="Establish design conditions">
    <p>
      Climate zone 5 has a 99% heating design temperature of approximately 5°F. With an indoor
      setpoint of 70°F, the design ΔT is 65°F.
    </p>
  </Step>

  <Step number={2} title="Estimate envelope loss">
    {/* ... */}
  </Step>

  <Step number={3} title="Add infiltration">
    {/* ... */}
  </Step>

  <Step number={4} title="Subtract internal gains">
    {/* ... */}
  </Step>

  <Step number={5} title="Sum to total load">
    <p>
      Envelope loss + infiltration − internal gains = 36,000 BTU/hr.
    </p>
  </Step>
</WorkedExample>
```

The worked example shows the math, not just the result. This is critical for AI citation and reader trust.

---

## Performance considerations

### SSR rendering

- All math runs server-side for the SSR'd state
- Result is in the HTML before any JS runs
- Web Vitals (LCP) sees the result content as part of the initial HTML

### Client hydration

- Widget hydrates progressively
- Inputs are usable within ~200ms of HTML render
- No blocking JS during page load
- Calculation runs in a Web Worker for heavy calculators (Manual J full); simple ones run on main thread

### Static pre-generation

- Main calculator page: static at build time
- Each example page: static at build time via `generateStaticParams`
- Total static pages per calculator: 1 main + 12-20 examples = 13-21 pages

This scales: 21 calculators × ~15 examples = 315 calculator-related static pages.

---

## Accessibility

Calculator widgets must:

- Have proper form labels (`<label for>`)
- Use semantic HTML (`<input>`, `<select>`, `<output>`)
- Be operable via keyboard alone
- Have focus indicators on all interactive elements
- Announce result changes to screen readers (use `aria-live="polite"` on result container)
- Provide units in input labels ("Square footage (sq ft)", "Temperature (°F)")
- Have meaningful error messages for invalid inputs

---

## Per-calculator brief structure

Each calculator brief in `content/briefs/tools/` follows the same template with these additions:

### Calculator-specific frontmatter

```yaml
calculator:
  default_inputs:
    sqft: 1500
    zone: "5"
    insulation: average
    # ... all default inputs
  validators:
    sqft: { min: 100, max: 20000 }
    zone: { enum: ["1A","1B","2A","2B","3A","3B","3C","4A","4B","4C","5A","5B","6A","6B","7","8"] }
  examples:
    - { slug: "1000-sq-ft-zone-3", title: "1,000 sq ft Heat Pump Size — Climate Zone 3" }
    # ... 12-20 examples
  formulas:
    primary: "BTU = sqft × multiplier × climate_factor × insulation_factor"
    sources: ["acca-manual-j-8", "ashrae-fundamentals-2021"]
  limitations:
    - "Whole-home estimate only, not room-by-room"
    - "Assumes uniform insulation"
    - "Does not include duct losses"
```

### Calculator-specific sections in body

In addition to the standard brief sections:

- **Formula derivation**: where the math comes from
- **Input justifications**: why each input is included
- **Validation rules**: what's a valid range for each input
- **Edge cases**: what happens when inputs are extreme

---

## Calculator launch sequence

For each new calculator:

1. **Brief written** in `content/briefs/tools/`
2. **Math implemented** in `lib/calculators/`
3. **Unit tests written** in `tests/calculators/`
4. **Widget component built** in `components/calculator/`
5. **Page route built** in `app/tools/[name]/page.tsx`
6. **Examples manifest written** in `app/tools/[name]/examples-manifest.ts`
7. **Examples sub-pages generated** via `generateStaticParams`
8. **Brief content (intro, methodology, worked example, FAQ) written**
9. **Quality gate passed** (per `14-quality-checklist.md`)
10. **Build verified locally on `:3007`**
11. **Deploy**

---

## Maintenance

- Each calculator's math reviewed annually against current standards
- Examples manifest updated if input ranges change
- Methodology block updated when standards revise
- Performance regressions caught by Lighthouse CI

If a calculator's underlying methodology changes (e.g., ACCA revises Manual J), update the calculator AND the related articles in the same PR.
