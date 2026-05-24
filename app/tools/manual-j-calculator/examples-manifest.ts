import type { ManualJInputs } from '@/lib/calculators/manual-j';

export interface ManualJExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: ManualJInputs;
}

export const manualJExamples: readonly ManualJExample[] = [
  {
    slug: '1500-sq-ft-pre-1980-zone-5',
    title: 'Manual J for 1,500 Sq Ft Pre-1980 Home — Zone 5',
    metaTitle: 'Manual J Load Calculation for 1,500 Sq Ft Pre-1980 Home (Zone 5)',
    metaDescription:
      'Manual J-style load calculation for a 1,500 sq ft pre-1980 home in IECC climate zone 5. Heating, cooling, and equipment sizing.',
    scenario:
      'A 1,500 square foot home built before 1980 in zone 5 typically has poor envelope characteristics: R-7 walls, R-19 attic, U-1.0 windows, and ACH50 around 14. This drives a much larger heating load than the same-size newer home. The calculation below shows component-by-component breakdown so you can see where heat is lost.',
    inputs: {
      squareFootage: 1500,
      climateZone: '5',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: 'pre-1980',
    },
  },
  {
    slug: '1500-sq-ft-2000s-zone-5',
    title: 'Manual J for 1,500 Sq Ft 2000s Home — Zone 5',
    metaTitle: 'Manual J Load Calculation for 1,500 Sq Ft 2000s Home (Zone 5)',
    metaDescription:
      'Manual J load calculation for a 1,500 sq ft home built in the 2000s in zone 5. Modern envelope, balanced loads.',
    scenario:
      'A 1,500 square foot home built between 2000 and 2009 in zone 5 has substantially better envelope than older homes: R-13 walls, R-38 attic, U-0.55 windows. The calculation shows the load drop versus pre-1980 construction and the corresponding smaller equipment requirement.',
    inputs: {
      squareFootage: 1500,
      climateZone: '5',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2000-2009',
    },
  },
  {
    slug: '1500-sq-ft-new-2020-zone-5',
    title: 'Manual J for 1,500 Sq Ft New (2020+) Home — Zone 5',
    metaTitle: 'Manual J for 1,500 Sq Ft New Construction (2020+) in Zone 5',
    metaDescription:
      'Manual J load calculation for a 1,500 sq ft new-construction home in zone 5. Modern envelope, IECC 2021 minimums.',
    scenario:
      'A 1,500 square foot home built to 2021 IECC code has R-21 walls, R-60 attic, U-0.28 windows, and ACH50 of 3 (a tight envelope). Heating and cooling loads are dramatically lower than older homes the same size — often allowing equipment downsizing to a smaller-than-typical heat pump or central AC.',
    inputs: {
      squareFootage: 1500,
      climateZone: '5',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2020+',
    },
  },
  {
    slug: '2000-sq-ft-2010s-zone-4',
    title: 'Manual J for 2,000 Sq Ft 2010s Home — Zone 4',
    metaTitle: 'Manual J for 2,000 Sq Ft 2010s Home (Zone 4): Cooling-Dominated',
    metaDescription:
      'Manual J load calculation for a 2,000 sq ft 2010s-era home in IECC climate zone 4. Balanced heating/cooling loads.',
    scenario:
      'A 2,000 square foot home built in the 2010s in zone 4 has R-19 walls, R-49 attic, U-0.35 windows, and ACH50 of 5. Climate zone 4 has balanced heating and cooling design temperatures, so the heating and cooling loads come out roughly equal. Equipment selection follows the larger.',
    inputs: {
      squareFootage: 2000,
      climateZone: '4',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2010-2019',
    },
  },
  {
    slug: '2000-sq-ft-2010s-zone-5',
    title: 'Manual J for 2,000 Sq Ft 2010s Home — Zone 5',
    metaTitle: 'Manual J Load Calculation for 2,000 Sq Ft 2010s Home (Zone 5)',
    metaDescription:
      'Manual J load calculation for a 2,000 sq ft 2010s-era home in IECC climate zone 5. Component breakdown and equipment sizing.',
    scenario:
      'A 2,000 square foot 2010s-era home in zone 5 is the central use case — a typical newer home in the northern US. The calculation below shows component-by-component heating and cooling loads, plus the equipment recommendation. Heating dominates in this climate; cooling is the secondary load.',
    inputs: {
      squareFootage: 2000,
      climateZone: '5',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2010-2019',
    },
  },
  {
    slug: '2000-sq-ft-2010s-zone-6',
    title: 'Manual J for 2,000 Sq Ft 2010s Home — Zone 6',
    metaTitle: 'Manual J for 2,000 Sq Ft 2010s Home (Zone 6): Heating-Dominated',
    metaDescription:
      'Manual J load calculation for a 2,000 sq ft 2010s home in IECC climate zone 6. Heating-dominated load profile.',
    scenario:
      'A 2,000 square foot 2010s-era home in zone 6 (northern Midwest, New England, Rockies) is strongly heating-dominated. The heating load is roughly 1.6× the cooling load. This climate severity is where cold-climate certified heat pump equipment delivers the biggest payoff.',
    inputs: {
      squareFootage: 2000,
      climateZone: '6',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2010-2019',
    },
  },
  {
    slug: '2500-sq-ft-2-story-2010s-zone-4',
    title: 'Manual J for 2,500 Sq Ft 2-Story 2010s Home — Zone 4',
    metaTitle: 'Manual J for 2,500 Sq Ft 2-Story 2010s Home (Zone 4)',
    metaDescription:
      'Manual J load calculation for a 2,500 sq ft 2-story 2010s-era home in IECC climate zone 4. Wall area scales differently with stories.',
    scenario:
      'A 2,500 square foot two-story home in zone 4 has notably more wall area than a same-size single-story for the same footprint. The two-story calculation reflects this geometry: walls account for a larger share of envelope loss. Two-story layouts also typically benefit from zoned equipment.',
    inputs: {
      squareFootage: 2500,
      climateZone: '4',
      stories: 2,
      ceilingHeight: 8,
      constructionEra: '2010-2019',
    },
  },
  {
    slug: '3000-sq-ft-2-story-2010s-zone-5',
    title: 'Manual J for 3,000 Sq Ft 2-Story 2010s Home — Zone 5',
    metaTitle: 'Manual J for 3,000 Sq Ft 2-Story 2010s Home (Zone 5)',
    metaDescription:
      'Manual J load calculation for a 3,000 sq ft 2-story 2010s-era home in IECC climate zone 5. Equipment sizing and zoning considerations.',
    scenario:
      'A 3,000 square foot two-story 2010s home in zone 5 is a large modern build. Equipment sizing approaches 5 tons. At this size, zoned systems (two or more thermostats / dampers) outperform a single-zone install on both comfort and efficiency. The calculator output justifies the zoning investment.',
    inputs: {
      squareFootage: 3000,
      climateZone: '5',
      stories: 2,
      ceilingHeight: 9,
      constructionEra: '2010-2019',
    },
  },
  {
    slug: '1200-sq-ft-1990s-zone-4',
    title: 'Manual J for 1,200 Sq Ft 1990s Home — Zone 4',
    metaTitle: 'Manual J Load Calculation for 1,200 Sq Ft 1990s Home (Zone 4)',
    metaDescription:
      'Manual J load calculation for a 1,200 sq ft 1990s home in IECC climate zone 4. Common older starter-home envelope.',
    scenario:
      'A 1,200 square foot 1990s-era home in zone 4 has R-11 walls, R-30 attic, U-0.7 windows, and ACH50 of 10. This is typical for starter homes and older two-bedroom houses in the Mid-Atlantic. The calculation shows the load that current envelope would impose on new heating and cooling equipment.',
    inputs: {
      squareFootage: 1200,
      climateZone: '4',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '1980-1999',
    },
  },
  {
    slug: '1800-sq-ft-pre-1980-zone-4',
    title: 'Manual J for 1,800 Sq Ft Pre-1980 Home — Zone 4',
    metaTitle: 'Manual J for 1,800 Sq Ft Pre-1980 Home (Zone 4): Envelope Upgrade ROI',
    metaDescription:
      'Manual J load calculation for an 1,800 sq ft pre-1980 home in IECC climate zone 4. Shows envelope upgrade ROI.',
    scenario:
      'An 1,800 square foot pre-1980 home in zone 4 has substantial envelope losses through walls and windows. The calculator shows the breakdown: typically infiltration plus window losses account for 40-50% of total heating load. Air sealing and window upgrades shift this dramatically — worth modeling both pre- and post-retrofit.',
    inputs: {
      squareFootage: 1800,
      climateZone: '4',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: 'pre-1980',
    },
  },
  {
    slug: '1500-sq-ft-new-2020-zone-2',
    title: 'Manual J for 1,500 Sq Ft New Home — Zone 2 (Hot South)',
    metaTitle: 'Manual J for 1,500 Sq Ft New Construction (Zone 2): Cooling-Dominated',
    metaDescription:
      'Manual J load calculation for a 1,500 sq ft new-construction home in IECC climate zone 2. Cooling-dominated load profile.',
    scenario:
      'A 1,500 square foot new-construction home in zone 2 (Gulf Coast) is heavily cooling-dominated. Heating load is small — design temp around 30°F. Cooling load includes high latent (humidity) fraction: 35% of sensible. Equipment selection follows the cooling-total, and dehumidification capacity matters more than at colder climates.',
    inputs: {
      squareFootage: 1500,
      climateZone: '2',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '2020+',
    },
  },
  {
    slug: '2500-sq-ft-1980s-zone-6',
    title: 'Manual J for 2,500 Sq Ft 1980s Home — Zone 6',
    metaTitle: 'Manual J for 2,500 Sq Ft 1980s Home (Zone 6): Older Cold-Climate Envelope',
    metaDescription:
      'Manual J load calculation for a 2,500 sq ft 1980s-era home in IECC climate zone 6. Cold climate plus older envelope.',
    scenario:
      'A 2,500 square foot 1980s home in zone 6 combines significant climate severity with an envelope that doesn\'t meet modern standards: R-11 walls, R-30 attic, U-0.7 windows. Heating load is substantial. Envelope retrofit (air sealing + attic top-off + window upgrade) before equipment replacement can downsize the equipment by 25-30%.',
    inputs: {
      squareFootage: 2500,
      climateZone: '6',
      stories: 1,
      ceilingHeight: 8,
      constructionEra: '1980-1999',
    },
  },
] as const;

export function findManualJExampleBySlug(slug: string): ManualJExample | undefined {
  return manualJExamples.find((e) => e.slug === slug);
}

export function getRelatedManualJExamples(slug: string, count = 5): ManualJExample[] {
  const current = findManualJExampleBySlug(slug);
  if (!current) return [];

  const currentZone = Number(current.inputs.climateZone);
  return manualJExamples
    .filter((e) => e.slug !== slug)
    .map((e) => {
      const sqftDiff = Math.abs(e.inputs.squareFootage - current.inputs.squareFootage) / 10;
      const zoneDiff = Math.abs(Number(e.inputs.climateZone) - currentZone) * 50;
      const eraDiff = e.inputs.constructionEra === current.inputs.constructionEra ? 0 : 100;
      return { example: e, score: sqftDiff + zoneDiff + eraDiff };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);
}
