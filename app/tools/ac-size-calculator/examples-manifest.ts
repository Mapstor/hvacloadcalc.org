import type { BtuInputs } from '@/lib/calculators/btu';

export interface AcSizeExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: BtuInputs;
}

export const acSizeExamples: readonly AcSizeExample[] = [
  {
    slug: '100-sq-ft-bedroom',
    title: 'AC Size for a 100 Sq Ft Bedroom',
    metaTitle: 'AC Size for 100 Sq Ft Bedroom: Window Unit BTU and Tonnage',
    metaDescription:
      'What size AC do you need for a 100 square foot bedroom? Equipment-class recommendation, tonnage, and BTU calculation.',
    scenario:
      'A 100 square foot bedroom is small enough that a 5,000 BTU window AC handles the cooling load comfortably — the smallest standard window unit. At this size you almost always pick a window AC over portable: window units are quieter, more efficient, and cheaper. The calculation below assumes climate zone 4, average insulation, and two occupants.',
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
    title: 'AC Size for a 200 Sq Ft Bedroom',
    metaTitle: 'AC Size for 200 Sq Ft Bedroom: Window Unit Recommendation',
    metaDescription:
      'What size AC do you need for a 200 square foot bedroom? Window AC tonnage and BTU calculation.',
    scenario:
      'A 200 square foot bedroom is the standard size for second bedrooms in US homes. A 5,000 to 6,000 BTU window AC (about 0.5 tons) is the right pick. Avoid the temptation to oversize: a too-large unit short cycles, hurting humidity control and accelerating compressor wear.',
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
    slug: '300-sq-ft-master-bedroom',
    title: 'AC Size for a 300 Sq Ft Master Bedroom',
    metaTitle: 'AC Size for 300 Sq Ft Master Bedroom: Window vs Mini Split',
    metaDescription:
      'What size AC do you need for a 300 square foot master bedroom? Compare window and mini split options.',
    scenario:
      'A 300 square foot master bedroom is at the upper edge of single window AC capacity. A 8,000 BTU window unit works, but a 9,000 BTU mini-split delivers quieter operation, better humidity control, and inverter efficiency — worth the extra cost on a unit you sleep next to nightly.',
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
    slug: '400-sq-ft-living-room',
    title: 'AC Size for a 400 Sq Ft Living Room',
    metaTitle: 'AC Size for 400 Sq Ft Living Room: Window or Portable AC',
    metaDescription:
      'What size AC do you need for a 400 square foot living room? Window vs portable tonnage recommendation.',
    scenario:
      'A 400 square foot living room is on the boundary between window AC and mini split territory. A 12,000 BTU window unit handles it, but a single-zone mini-split provides quieter operation and zoning flexibility for spaces used daily. For portable AC, size up to 14,000 BTU to compensate for the 20-30% real-world capacity penalty.',
    inputs: {
      squareFootage: 400,
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
    slug: '500-sq-ft-studio',
    title: 'AC Size for a 500 Sq Ft Studio',
    metaTitle: 'AC Size for 500 Sq Ft Studio: Mini Split vs Window Unit',
    metaDescription:
      'What size AC do you need for a 500 square foot studio apartment? Mini split tonnage and BTU calculation.',
    scenario:
      'A 500 square foot studio apartment usually pairs best with a 14,000 to 18,000 BTU mini-split head — about 1.25 to 1.5 tons. A studio is a single open space, so a mini-split handles everything from one outlet. Window AC works as a budget alternative but you may need two units for even distribution.',
    inputs: {
      squareFootage: 500,
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
    slug: '800-sq-ft-apartment',
    title: 'AC Size for an 800 Sq Ft Apartment',
    metaTitle: 'AC Size for 800 Sq Ft Apartment: Mini Split BTU and Tonnage',
    metaDescription:
      'What size AC do you need for an 800 square foot apartment? Mini split sizing for a typical one-bedroom unit.',
    scenario:
      'An 800 square foot apartment — typical for a one-bedroom unit — usually calls for an 18,000 BTU (1.5 ton) mini-split or a comparable central system. If you can place a single mini-split head where it reaches both the living room and the bedroom hallway, one unit handles the whole apartment. Multi-zone systems work too but cost more.',
    inputs: {
      squareFootage: 800,
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
    title: 'AC Size for a 1,000 Sq Ft House',
    metaTitle: 'AC Size for 1,000 Sq Ft House: 2-Ton Central AC',
    metaDescription:
      'What size AC do you need for a 1,000 square foot house? Central AC tonnage and BTU calculation.',
    scenario:
      'A 1,000 square foot home — typical for small ranches, bungalows, and tiny houses — usually pairs with a 2-ton (24,000 BTU) central AC. Mini-split alternatives work too: a single 24,000 BTU head if the layout allows, or a multi-zone system with two 12,000 BTU heads for better room-by-room control.',
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
    slug: '1200-sq-ft-ranch',
    title: 'AC Size for a 1,200 Sq Ft Ranch',
    metaTitle: 'AC Size for 1,200 Sq Ft Ranch: Central AC Tonnage',
    metaDescription:
      'What size central AC do you need for a 1,200 square foot ranch home? Tonnage recommendation and BTU calculation.',
    scenario:
      'A 1,200 square foot ranch — a common two-bedroom or three-bedroom single-story home — is in the 2 to 2.5-ton central AC range. Ranches benefit from central distribution: single-floor layouts move air efficiently, and existing ductwork is usually straightforward to size or modify.',
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
    title: 'AC Size for a 1,500 Sq Ft House',
    metaTitle: 'AC Size for 1,500 Sq Ft House: 2.5 to 3-Ton Central AC',
    metaDescription:
      'What size AC do you need for a 1,500 square foot house? Central AC tonnage recommendation and BTU breakdown.',
    scenario:
      'A 1,500 square foot home — the US median single-family house size — usually pairs with a 2.5 to 3-ton (30,000 to 36,000 BTU) central AC. This is the most-installed equipment size in residential US AC. Insulation quality and sun exposure can shift the recommendation half a ton up or down; for accurate central AC selection, get a Manual J calculation.',
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
    title: 'AC Size for a 1,800 Sq Ft House',
    metaTitle: 'AC Size for 1,800 Sq Ft House: 3-Ton Central AC',
    metaDescription:
      'What size central AC do you need for a 1,800 square foot house? Tonnage recommendation and worked calculation.',
    scenario:
      'An 1,800 square foot home — common for three-bedroom houses and small two-story builds — usually calls for a 3-ton (36,000 BTU) central AC. For two-story layouts, consider a zoned system: a single 3-ton condenser with two air handlers and separate thermostats per floor delivers better comfort than a single-thermostat install.',
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
    title: 'AC Size for a 2,000 Sq Ft House',
    metaTitle: 'AC Size for 2,000 Sq Ft House: 3 to 3.5-Ton Central AC',
    metaDescription:
      'What size central AC do you need for a 2,000 square foot house? Tonnage and BTU recommendation.',
    scenario:
      'A 2,000 square foot home — common for newer three to four bedroom houses — calls for a 3 to 3.5-ton central AC. At this size most installs use a 3.5-ton single-stage system, though variable-speed (inverter) condensers allow slight oversizing without short-cycling penalties.',
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
    slug: '2400-sq-ft-house',
    title: 'AC Size for a 2,400 Sq Ft House',
    metaTitle: 'AC Size for 2,400 Sq Ft House: 4-Ton Central AC',
    metaDescription:
      'What size central AC do you need for a 2,400 square foot house? Tonnage and BTU recommendation for larger homes.',
    scenario:
      'A 2,400 square foot home — typical for four-bedroom houses and larger two-story builds — pairs with a 4-ton (48,000 BTU) central AC. At this size, zoning becomes especially important: a single 4-ton single-stage condenser tied to one thermostat tends to overcool downstairs while undercooling upstairs.',
    inputs: {
      squareFootage: 2400,
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
    slug: '2800-sq-ft-house',
    title: 'AC Size for a 2,800 Sq Ft House',
    metaTitle: 'AC Size for 2,800 Sq Ft House: 4 to 5-Ton Central AC',
    metaDescription:
      'What size central AC do you need for a 2,800 square foot house? Tonnage and equipment recommendation.',
    scenario:
      'A 2,800 square foot home — a larger US single-family house — calls for a 4.5 to 5-ton central AC. At this scale a multi-zone or two-zone system usually outperforms a single-zone install. Manual J calculation is strongly recommended at this size because the difference between a properly-sized and an oversized system shows up as ~15% energy waste.',
    inputs: {
      squareFootage: 2800,
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
    slug: '500-sq-ft-garage-mini-split',
    title: 'AC Size for a 500 Sq Ft Garage',
    metaTitle: 'AC Size for 500 Sq Ft Garage: Mini Split BTU Recommendation',
    metaDescription:
      'What size mini split do you need to cool a 500 square foot garage? BTU calculation with attic/2nd-floor space-type factor.',
    scenario:
      'A 500 square foot garage — typical for a 2-car attached garage being converted to a cooled workshop or hangout — has a much higher cooling load per square foot than interior living space. Garages have minimal insulation, lots of west-facing wall area, and direct roof exposure. The space-type factor used here (+30%) approximates an attic or top-floor scenario. A mini-split is the only practical option; window units do not handle this load reliably.',
    inputs: {
      squareFootage: 500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'poor',
      sunExposure: 'heavy',
      occupants: 2,
      isKitchen: false,
      spaceType: 'attic-or-second-floor',
    },
  },
  {
    slug: '200-sq-ft-kitchen',
    title: 'AC Size for a 200 Sq Ft Kitchen',
    metaTitle: 'AC Size for 200 Sq Ft Kitchen: Cooking Heat Adjustment',
    metaDescription:
      'What size AC do you need for a 200 square foot kitchen? Cooking heat gain adds 4,000 BTU to the calculation.',
    scenario:
      'A 200 square foot kitchen needs noticeably more cooling capacity than a same-size living room. Cooking heat (oven, stovetop, refrigerator, lighting) adds about 4,000 BTU of constant load during cooking hours, plus elevated humidity from boiling and steaming. The kitchen flag in the calculator applies this +4,000 BTU adjustment.',
    inputs: {
      squareFootage: 200,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 2,
      isKitchen: true,
      spaceType: 'kitchen',
    },
  },
] as const;

export function findAcSizeExampleBySlug(slug: string): AcSizeExample | undefined {
  return acSizeExamples.find((e) => e.slug === slug);
}

export function getRelatedAcSizeExamples(slug: string, count = 5): AcSizeExample[] {
  const current = findAcSizeExampleBySlug(slug);
  if (!current) return [];

  return acSizeExamples
    .filter((e) => e.slug !== slug)
    .map((e) => {
      const sqftDiff = Math.abs(e.inputs.squareFootage - current.inputs.squareFootage);
      const sameSpace = e.inputs.spaceType === current.inputs.spaceType ? 0 : 1000;
      return { example: e, score: sqftDiff + sameSpace };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);
}
