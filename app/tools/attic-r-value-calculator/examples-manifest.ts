import type { AtticRValueInputs } from '@/lib/calculators/attic-r-value';

export interface AtticRValueExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: AtticRValueInputs;
}

export const atticRValueExamples: readonly AtticRValueExample[] = [
  {
    slug: 'r19-fiberglass-zone-4',
    title: 'R-19 Attic Insulation in Zone 4',
    metaTitle: 'R-19 Attic Insulation in Zone 4: Is It Enough?',
    metaDescription:
      'Is R-19 attic insulation enough in IECC climate zone 4? DOE recommendation, upgrade depth, and material options.',
    scenario:
      '6.3 inches of fiberglass batt insulation (R-19) is what many homes built in the 1990s have in the attic. In zone 4, the DOE recommendation is R-38 to R-60 — significantly above R-19. The calculator below shows how much additional insulation to add to reach R-38 in various materials.',
    inputs: {
      layers: [{ type: 'fiberglass-batt', depthInches: 6.3 }],
      climateZone: '4',
    },
  },
  {
    slug: 'r30-cellulose-zone-4',
    title: 'R-30 Blown Cellulose in Zone 4',
    metaTitle: 'R-30 Blown Cellulose Attic Insulation in Zone 4',
    metaDescription:
      'R-30 blown cellulose attic insulation in IECC climate zone 4. DOE recommendation, IECC code, upgrade path.',
    scenario:
      'About 8.3 inches of blown cellulose gives you R-30 — a common retrofit target for older homes. In zone 4, R-30 is below the DOE recommended range (R-38 to R-60) but above the older IECC code minimum. Worth topping off to R-38 for the long-term comfort and energy benefit.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 8.3 }],
      climateZone: '4',
    },
  },
  {
    slug: 'r38-cellulose-zone-4',
    title: 'R-38 Blown Cellulose in Zone 4',
    metaTitle: 'R-38 Blown Cellulose Attic Insulation in Zone 4',
    metaDescription:
      'R-38 blown cellulose attic insulation in zone 4. Meets DOE recommended minimum and IECC code.',
    scenario:
      '10.5 inches of blown cellulose gives you R-38 — the DOE recommended minimum for zone 4 retrofits and the IECC 2021 code minimum for new construction in zones 2-4. This is a comfortable target for most existing homes in zone 4; the calculator confirms it lands in the DOE recommended range.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 10.5 }],
      climateZone: '4',
    },
  },
  {
    slug: 'r49-cellulose-zone-5',
    title: 'R-49 Blown Cellulose in Zone 5',
    metaTitle: 'R-49 Blown Cellulose Attic Insulation in Zone 5',
    metaDescription:
      'R-49 blown cellulose attic insulation in IECC climate zone 5. DOE recommendation, code, comparison to other materials.',
    scenario:
      '13.6 inches of blown cellulose gives R-49 — the DOE recommended minimum for zone 5 retrofits. For most homes in northern states, this is the right target: deeper than older code, not so deep that the cost-benefit drops off. The calculator confirms R-49 is in the DOE recommended range for zone 5.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 13.6 }],
      climateZone: '5',
    },
  },
  {
    slug: 'r60-cellulose-zone-6',
    title: 'R-60 Blown Cellulose in Zone 6',
    metaTitle: 'R-60 Blown Cellulose Attic Insulation in Zone 6',
    metaDescription:
      'R-60 blown cellulose attic insulation in IECC climate zone 6. DOE upper-end recommendation.',
    scenario:
      '16.7 inches of blown cellulose gives R-60 — the DOE recommended upper end for zone 6 (northern Midwest, New England, Rockies). At this depth, you are at the IECC 2021 code minimum for zones 5-8 and at the high end of the DOE recommendation. Returns from going deeper start to drop after this.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 16.7 }],
      climateZone: '6',
    },
  },
  {
    slug: '6-inches-fiberglass-batt-zone-5',
    title: '6 Inches Fiberglass Batt in Zone 5',
    metaTitle: '6 Inches Fiberglass Batt Attic Insulation in Zone 5',
    metaDescription:
      'Is 6 inches of fiberglass batt enough attic insulation in zone 5? R-value calculation and upgrade recommendation.',
    scenario:
      'Six inches of fiberglass batt is about R-18 — well below current DOE recommendation for zone 5 (R-49 to R-60). This is typical for homes built before about 1995. The calculator shows how much additional insulation to add, in either blown cellulose, loose-fill fiberglass, or closed-cell spray foam.',
    inputs: {
      layers: [{ type: 'fiberglass-batt', depthInches: 6 }],
      climateZone: '5',
    },
  },
  {
    slug: '12-inches-cellulose-zone-5',
    title: '12 Inches Blown Cellulose in Zone 5',
    metaTitle: '12 Inches Blown Cellulose Attic Insulation in Zone 5',
    metaDescription:
      'R-value of 12 inches of blown cellulose attic insulation in zone 5. Upgrade recommendation and code check.',
    scenario:
      'Twelve inches of blown cellulose gives R-43 — slightly below the DOE recommended R-49 for zone 5. This depth is common in mid-2000s retrofits where R-38 was the target; rules have since tightened. A modest top-off to ~14 inches gets you to R-49.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 12 }],
      climateZone: '5',
    },
  },
  {
    slug: 'original-plus-new-layer-zone-5',
    title: '6″ Fiberglass + 8″ Cellulose Top-Off in Zone 5',
    metaTitle: 'Multi-Layer Attic Insulation: Fiberglass + Cellulose in Zone 5',
    metaDescription:
      'Multi-layer attic with original 6 inch fiberglass batt plus 8 inch new blown cellulose. R-value calculation in zone 5.',
    scenario:
      'A common retrofit: leave the original 6 inch fiberglass batt layer in place and blow 8 inches of new cellulose on top. Total R-value adds the layers together: R-18 (fiberglass) + R-29 (cellulose) = R-47. Just under DOE recommended R-49 for zone 5; consider blowing a couple more inches to clear the recommendation.',
    inputs: {
      layers: [
        { type: 'fiberglass-batt', depthInches: 6 },
        { type: 'loose-fill-cellulose', depthInches: 8 },
      ],
      climateZone: '5',
    },
  },
  {
    slug: 'closed-cell-spray-foam-5-inches-zone-5',
    title: '5 Inches Closed-Cell Spray Foam in Zone 5',
    metaTitle: '5 Inches Closed-Cell Spray Foam Attic in Zone 5',
    metaDescription:
      'R-value of 5 inches of closed-cell spray foam in IECC climate zone 5. Compare to blown cellulose and fiberglass.',
    scenario:
      'Five inches of closed-cell spray foam delivers R-32.5 in a much thinner depth than blown materials — useful in cathedral ceilings or where attic depth is constrained. In zone 5, R-32.5 is below the DOE recommendation of R-49; more foam (or an added layer above) is worth considering. Spray foam costs more per R-value than blown cellulose.',
    inputs: {
      layers: [{ type: 'closed-cell-spray-foam', depthInches: 5 }],
      climateZone: '5',
    },
  },
  {
    slug: 'r30-zone-3',
    title: 'R-30 Attic in Zone 3',
    metaTitle: 'R-30 Attic Insulation in Zone 3: Adequate for the South?',
    metaDescription:
      'Is R-30 attic insulation adequate in IECC climate zone 3 (mid-south)? DOE recommendation and code check.',
    scenario:
      '8.3 inches of blown cellulose gives R-30 — at the low end of the DOE recommended range for zone 3 (R-30 to R-60). For most mid-south homes, R-30 is adequate but topping up to R-38 gives modest extra summer cooling savings without much added cost.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 8.3 }],
      climateZone: '3',
    },
  },
  {
    slug: 'r38-zone-5',
    title: 'R-38 Attic in Zone 5',
    metaTitle: 'R-38 Attic Insulation in Zone 5: Below DOE Recommended',
    metaDescription:
      'R-38 attic insulation in IECC climate zone 5 — below the DOE recommended R-49 minimum. Upgrade options.',
    scenario:
      'R-38 (about 10.5 inches of blown cellulose) was the standard target in zone 5 retrofits in the early 2000s. Current DOE recommendation is R-49 to R-60 — R-38 leaves comfort and energy savings on the table. A 3 inch cellulose top-off brings the attic to R-49.',
    inputs: {
      layers: [{ type: 'loose-fill-cellulose', depthInches: 10.5 }],
      climateZone: '5',
    },
  },
  {
    slug: 'r19-zone-7',
    title: 'R-19 Attic in Zone 7',
    metaTitle: 'R-19 Attic Insulation in Zone 7: Significantly Below Code',
    metaDescription:
      'R-19 attic insulation in IECC climate zone 7 (northern Minnesota, mountain west) is significantly below DOE and code.',
    scenario:
      'R-19 attic insulation in zone 7 is far below current recommendations (R-49 to R-60). Heating costs in this climate are significant, and an undersized attic adds materially to that bill. Adding 10+ inches of blown cellulose is one of the highest-ROI energy retrofits available for older homes in cold climates.',
    inputs: {
      layers: [{ type: 'fiberglass-batt', depthInches: 6.3 }],
      climateZone: '7',
    },
  },
] as const;

export function findAtticRExampleBySlug(slug: string): AtticRValueExample | undefined {
  return atticRValueExamples.find((e) => e.slug === slug);
}

export function getRelatedAtticRExamples(slug: string, count = 5): AtticRValueExample[] {
  const current = findAtticRExampleBySlug(slug);
  if (!current) return [];

  const currentZone = Number(current.inputs.climateZone);
  return atticRValueExamples
    .filter((e) => e.slug !== slug)
    .map((e) => {
      const zoneDiff = Math.abs(Number(e.inputs.climateZone) - currentZone) * 5;
      const totalDepthDiff = Math.abs(
        e.inputs.layers.reduce((s, l) => s + l.depthInches, 0) -
          current.inputs.layers.reduce((s, l) => s + l.depthInches, 0),
      );
      return { example: e, score: zoneDiff + totalDepthDiff };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);
}
