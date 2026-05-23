import type { BtuInputs } from '@/lib/calculators/btu';

export interface BtuExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: BtuInputs;
}

export const btuExamples: readonly BtuExample[] = [
  {
    slug: '100-sq-ft-bedroom',
    title: '100 Sq Ft Bedroom AC BTU',
    metaTitle: 'BTU for 100 Sq Ft Bedroom: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 100 square foot bedroom need? Worked calculation with climate, ceiling, insulation, and occupancy adjustments.',
    scenario:
      'A 100 square foot bedroom is at the small end of typical residential rooms — common for guest bedrooms in older homes, nursery rooms, or studio sleeping nooks. At this size a small window AC or portable unit is the right equipment class. The calculation below assumes climate zone 4, 8-foot ceilings, average insulation, and standard 2-occupant load.',
    inputs: {
      squareFootage: 100,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
      spaceType: 'bedroom',
    },
  },
  {
    slug: '200-sq-ft-bedroom',
    title: '200 Sq Ft Bedroom AC BTU',
    metaTitle: 'BTU for 200 Sq Ft Bedroom: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 200 square foot bedroom need? Worked calculation showing climate, ceiling, insulation, and occupancy factors.',
    scenario:
      'A 200 square foot bedroom is the most common size for second bedrooms in US homes. A 5,000 to 6,000 BTU window AC unit typically covers this comfortably, though heavy west sun or older single-pane windows can push the load higher. The calculation below uses climate zone 4 with average insulation.',
    inputs: {
      squareFootage: 200,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
      spaceType: 'bedroom',
    },
  },
  {
    slug: '300-sq-ft-bedroom',
    title: '300 Sq Ft Master Bedroom AC BTU',
    metaTitle: 'BTU for 300 Sq Ft Bedroom: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 300 square foot bedroom need? Worked calculation with all adjustment factors shown.',
    scenario:
      'A 300 square foot master bedroom is typical for newer homes and renovated suites. At this size you are at the upper end of single window AC capacity — a small mini split is often a better fit, especially with attached bathroom and walk-in closet. The calculation assumes climate zone 4 with average insulation.',
    inputs: {
      squareFootage: 300,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
      spaceType: 'bedroom',
    },
  },
  {
    slug: '400-sq-ft-room',
    title: '400 Sq Ft Room AC BTU',
    metaTitle: 'BTU for 400 Sq Ft Room: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 400 square foot room need? Full calculation with climate, ceiling, insulation, sun, and space-type factors.',
    scenario:
      'A 400 square foot room is the size of a small studio apartment or a large living room. Window AC capacity caps out around 14,000 BTU; for sustained comfort at this size, a single-zone mini split is the more flexible choice. The calculation uses climate zone 4 and living-room space type.',
    inputs: {
      squareFootage: 400,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '500-sq-ft-room',
    title: '500 Sq Ft Room AC BTU',
    metaTitle: 'BTU for 500 Sq Ft Room: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 500 square foot space need? Detailed calculation with all adjustment factors.',
    scenario:
      'A 500 square foot space is typical for a one-bedroom studio or a large open-plan living area. At this size most installs go with mini split or central AC rather than a window unit. The calculation below assumes mixed sun exposure, average insulation, and three occupants.',
    inputs: {
      squareFootage: 500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '700-sq-ft-apartment',
    title: '700 Sq Ft Apartment AC BTU',
    metaTitle: 'BTU for 700 Sq Ft Apartment: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 700 square foot apartment need? Worked calculation with all factors shown.',
    scenario:
      'A 700 square foot apartment is a typical one-bedroom in many US cities. A mini split sized in the 14,000 to 18,000 BTU range usually handles the cooling load comfortably. The calculation assumes a typical apartment envelope: climate zone 4, average insulation, mixed sun, and a 2 to 3 occupant household.',
    inputs: {
      squareFootage: 700,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '1000-sq-ft-house',
    title: '1,000 Sq Ft House AC BTU',
    metaTitle: 'BTU for 1,000 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 1,000 square foot house need? Full calculation with climate, insulation, and occupancy adjustments.',
    scenario:
      'A 1,000 square foot home is typical for small single-family houses, older bungalows, and tiny homes. At this size a 2-ton (24,000 BTU) central AC or mini split is usually appropriate. The calculation below uses climate zone 4, average insulation, and three occupants.',
    inputs: {
      squareFootage: 1000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '1200-sq-ft-house',
    title: '1,200 Sq Ft House AC BTU',
    metaTitle: 'BTU for 1,200 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 1,200 square foot house need? Full Manual J-style calculation with all factors.',
    scenario:
      'A 1,200 square foot home is common for two-bedroom houses and small ranches across the US. At climate zone 4 with average insulation, the cooling load lands in the 2-ton central AC range. The calculation below uses standard 8-foot ceilings, mixed sun exposure, and a 3-person household.',
    inputs: {
      squareFootage: 1200,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '1500-sq-ft-house',
    title: '1,500 Sq Ft House AC BTU',
    metaTitle: 'BTU for 1,500 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 1,500 square foot house need? Worked calculation showing every factor that goes into AC sizing.',
    scenario:
      'A 1,500 square foot home is the US median single-family house size, making this the most-searched BTU calculation. With average insulation in climate zone 4, expect a 2.5 to 3-ton (30,000 to 36,000 BTU) central AC. The calculation below uses living-room space type, 8-foot ceilings, and four occupants.',
    inputs: {
      squareFootage: 1500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '1800-sq-ft-house',
    title: '1,800 Sq Ft House AC BTU',
    metaTitle: 'BTU for 1,800 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 1,800 square foot house need? Full calculation with all adjustment factors shown.',
    scenario:
      'A 1,800 square foot home is common for three-bedroom houses and small two-story homes. At this size a 3-ton central AC is the typical fit, though insulation quality and sun exposure can push the requirement up or down by half a ton. The calculation uses climate zone 4 and average insulation.',
    inputs: {
      squareFootage: 1800,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '2000-sq-ft-house',
    title: '2,000 Sq Ft House AC BTU',
    metaTitle: 'BTU for 2,000 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 2,000 square foot house need? Worked calculation with climate, insulation, and occupancy factors.',
    scenario:
      'A 2,000 square foot home is typical for newer three to four bedroom houses. With average insulation in climate zone 4, a 3 to 3.5-ton central AC is the standard fit. The calculation below uses 8-foot ceilings, mixed sun exposure, and a 4-person household.',
    inputs: {
      squareFootage: 2000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '2500-sq-ft-house',
    title: '2,500 Sq Ft House AC BTU',
    metaTitle: 'BTU for 2,500 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 2,500 square foot house need? Full calculation showing every adjustment factor.',
    scenario:
      'A 2,500 square foot home is typical for four-bedroom houses and modern two-story builds. At this size a 4-ton central AC or zoned mini-split system is standard. The calculation below uses climate zone 4, average insulation, mixed sun, and a 4-person household.',
    inputs: {
      squareFootage: 2500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '3000-sq-ft-house',
    title: '3,000 Sq Ft House AC BTU',
    metaTitle: 'BTU for 3,000 Sq Ft House: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 3,000 square foot house need? Worked calculation with all factors shown.',
    scenario:
      'A 3,000 square foot home is on the larger side of US single-family homes — typical for five-bedroom houses, executive homes, and multi-story builds. At this size most installs use either a 5-ton single-stage system or a zoned multi-zone approach. The calculation uses climate zone 4 and a 5-person household.',
    inputs: {
      squareFootage: 3000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 5,
      isKitchen: false,
      spaceType: 'living-room',
    },
  },
  {
    slug: '300-sq-ft-sunroom',
    title: '300 Sq Ft Sunroom AC BTU',
    metaTitle: 'BTU for 300 Sq Ft Sunroom: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 300 square foot sunroom need? Sun rooms have unusually high cooling loads because of glass area.',
    scenario:
      'A 300 square foot sun room is a glass-heavy enclosed porch or conservatory addition. Sun rooms have unusually high cooling loads because glass admits roughly four times the solar gain of an insulated wall. The space-type factor for sun rooms is +75%, which is the highest multiplier in the calculation. Most sun rooms need a dedicated mini-split head sized well above what the floor area alone would suggest.',
    inputs: {
      squareFootage: 300,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'heavy',
      occupants: 2,
      isKitchen: false,
      spaceType: 'sun-room',
    },
  },
  {
    slug: '800-sq-ft-finished-basement',
    title: '800 Sq Ft Finished Basement AC BTU',
    metaTitle: 'BTU for 800 Sq Ft Finished Basement: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 800 square foot finished basement need? Basement spaces have lower cooling loads because of earth contact.',
    scenario:
      'An 800 square foot finished basement above grade has a meaningfully lower cooling load than a comparable above-grade room. Below-grade and partially-buried walls stay cooler than outside air, and basements receive less direct sun. The space-type factor for above-grade basements is -20% (and -40% for fully below-grade). The calculation below uses an above-grade basement scenario.',
    inputs: {
      squareFootage: 800,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'shaded',
      occupants: 3,
      isKitchen: false,
      spaceType: 'basement-above-grade',
    },
  },
  {
    slug: '400-sq-ft-attic-bedroom',
    title: '400 Sq Ft Attic Bedroom AC BTU',
    metaTitle: 'BTU for 400 Sq Ft Attic Bedroom: AC Size and Worked Calculation',
    metaDescription:
      'How many BTU does a 400 square foot attic bedroom need? Top-floor and attic spaces need more capacity than ground-floor rooms.',
    scenario:
      'A 400 square foot attic bedroom or finished top-floor conversion has a higher cooling load than a ground-floor room of the same size. Attics and second floors are typically hotter because heat rises through the building, the roof gains a lot of sun, and insulation between conditioned space and the roof deck is often thinner than wall insulation. The space-type factor for attic and second-floor rooms is +30%.',
    inputs: {
      squareFootage: 400,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'heavy',
      occupants: 2,
      isKitchen: false,
      spaceType: 'attic-or-second-floor',
    },
  },
] as const;

export function findExampleBySlug(slug: string): BtuExample | undefined {
  return btuExamples.find((e) => e.slug === slug);
}

export function getRelatedExamples(slug: string, count = 5): BtuExample[] {
  const current = findExampleBySlug(slug);
  if (!current) return [];

  const scored = btuExamples
    .filter((e) => e.slug !== slug)
    .map((e) => {
      const sqftDiff = Math.abs(e.inputs.squareFootage - current.inputs.squareFootage);
      const sameSpace = e.inputs.spaceType === current.inputs.spaceType ? 0 : 1000;
      return { example: e, score: sqftDiff + sameSpace };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);

  return scored;
}
