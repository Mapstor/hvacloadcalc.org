import type { HeatPumpInputs } from '@/lib/calculators/heat-pump-size';

export interface HeatPumpExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: HeatPumpInputs;
}

export const heatPumpExamples: readonly HeatPumpExample[] = [
  {
    slug: '1000-sq-ft-zone-4',
    title: 'Heat Pump Size for 1,000 Sq Ft Home — Zone 4',
    metaTitle: 'Heat Pump Size for 1,000 Sq Ft Home (Zone 4): Tonnage and Balance Point',
    metaDescription:
      'Heat pump sizing for a 1,000 square foot home in IECC climate zone 4. Tonnage, balance point, and aux heat requirements.',
    scenario:
      'A 1,000 square foot home in zone 4 (Mid-Atlantic, Ohio Valley) is at the small end of single-family houses. With balanced heating and cooling loads in this climate, a standard 2-ton heat pump handles year-round comfort with minimal aux heat use. The balance point typically sits in the high 20s°F.',
    inputs: {
      squareFootage: 1000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '1500-sq-ft-zone-4',
    title: 'Heat Pump Size for 1,500 Sq Ft Home — Zone 4',
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home (Zone 4): Tonnage and Balance Point',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home in zone 4. Recommended tonnage, balance point estimate, and equipment class.',
    scenario:
      'A 1,500 square foot home — US median house size — in zone 4 typically pairs with a 2.5 to 3-ton standard heat pump. Heating and cooling loads are well balanced in this climate, and a single-stage standard heat pump handles both with the balance point landing near the freezing mark.',
    inputs: {
      squareFootage: 1500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '2000-sq-ft-zone-4',
    title: 'Heat Pump Size for 2,000 Sq Ft Home — Zone 4',
    metaTitle: 'Heat Pump Size for 2,000 Sq Ft Home (Zone 4): Tonnage and Equipment',
    metaDescription:
      'Heat pump sizing for a 2,000 sq ft home in IECC climate zone 4. Tonnage, balance point, and aux heat requirements.',
    scenario:
      'A 2,000 square foot home in zone 4 typically calls for a 3.5-ton standard heat pump. Heating and cooling loads are balanced in this climate. Aux heat (electric resistance backup) sees minimal use, only during the coldest design-day conditions.',
    inputs: {
      squareFootage: 2000,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '2500-sq-ft-zone-4',
    title: 'Heat Pump Size for 2,500 Sq Ft Home — Zone 4',
    metaTitle: 'Heat Pump Size for 2,500 Sq Ft Home (Zone 4): Tonnage and Balance Point',
    metaDescription:
      'Heat pump sizing for a 2,500 sq ft home in zone 4. Tonnage, balance point, and aux heat capacity.',
    scenario:
      'A 2,500 square foot home in zone 4 typically needs a 4-ton heat pump, often as a zoned multi-stage or variable-speed system to manage the cooling load on milder days. Heating-to-cooling load ratio is near 1.0× in this climate.',
    inputs: {
      squareFootage: 2500,
      climateZone: '4',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '1500-sq-ft-zone-2',
    title: 'Heat Pump Size for 1,500 Sq Ft Home — Zone 2 (Cooling-Dominated)',
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home (Zone 2): Cooling-Dominated Sizing',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home in IECC climate zone 2 (Gulf Coast). Cooling load dominates equipment selection.',
    scenario:
      'A 1,500 square foot home in zone 2 (Gulf Coast, lower south) has cooling loads that dominate equipment sizing — the heating load is only about 0.5× cooling. A standard 2.5 to 3-ton heat pump sized to the cooling load handles winter heating easily, with aux heat rarely needed.',
    inputs: {
      squareFootage: 1500,
      climateZone: '2',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'heavy',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '1500-sq-ft-zone-5',
    title: 'Heat Pump Size for 1,500 Sq Ft Home — Zone 5',
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home (Zone 5): Northern Climate Sizing',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home in IECC climate zone 5. Heating-dominated load, cold-climate equipment considerations.',
    scenario:
      'A 1,500 square foot home in zone 5 (northern states) has heating loads about 1.3× cooling load. Standard heat pumps work but with aux heat picking up the slack on cold nights. A cold-climate (NEEP CCASHP listed) model significantly reduces aux runtime and is the more efficient long-term choice.',
    inputs: {
      squareFootage: 1500,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '2000-sq-ft-zone-5',
    title: 'Heat Pump Size for 2,000 Sq Ft Home — Zone 5',
    metaTitle: 'Heat Pump Size for 2,000 Sq Ft Home (Zone 5): Tonnage and Aux Heat',
    metaDescription:
      'Heat pump sizing for a 2,000 sq ft home in IECC climate zone 5. Tonnage, balance point, aux heat capacity.',
    scenario:
      'A 2,000 square foot home in zone 5 is heating-dominated: the heating load is roughly 1.3× the cooling load. A standard 3 to 3.5-ton heat pump works but expect aux heat runtime throughout winter nights. For lower lifetime operating costs, consider a cold-climate certified model.',
    inputs: {
      squareFootage: 2000,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '2000-sq-ft-zone-5-cold-climate',
    title: 'Heat Pump Size for 2,000 Sq Ft Home — Zone 5 (Cold-Climate Model)',
    metaTitle: 'Cold-Climate Heat Pump for 2,000 Sq Ft Home (Zone 5)',
    metaDescription:
      'Cold-climate (CCASHP) heat pump sizing for a 2,000 sq ft home in zone 5. Compare balance point vs standard equipment.',
    scenario:
      'A 2,000 square foot home in zone 5 with a cold-climate (NEEP CCASHP listed) heat pump shifts the balance point dramatically lower than a standard model. CCASHP units maintain about 85% of rated capacity at 17°F vs 60% for standard, which directly translates to fewer aux heat hours over the heating season and lower operating cost.',
    inputs: {
      squareFootage: 2000,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: true,
    },
  },
  {
    slug: '1500-sq-ft-zone-6',
    title: 'Heat Pump Size for 1,500 Sq Ft Home — Zone 6',
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home (Zone 6): Cold-Climate Equipment',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home in IECC climate zone 6. Cold-climate certified equipment recommended.',
    scenario:
      'A 1,500 square foot home in zone 6 (northern Midwest, New England, Rockies) is heating-dominated at about 1.6× the cooling load. Cold-climate certified equipment is strongly recommended at this climate severity; standard heat pumps see significantly more aux heat runtime through January and February.',
    inputs: {
      squareFootage: 1500,
      climateZone: '6',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: '1500-sq-ft-zone-6-cold-climate',
    title: 'Cold-Climate Heat Pump for 1,500 Sq Ft Home — Zone 6',
    metaTitle: 'Cold-Climate Heat Pump for 1,500 Sq Ft Home (Zone 6): Tonnage',
    metaDescription:
      'Cold-climate (CCASHP) heat pump sizing for a 1,500 sq ft home in IECC climate zone 6. Balance point and aux heat.',
    scenario:
      'A 1,500 square foot home in zone 6 with cold-climate (CCASHP) equipment maintains useful heating capacity well below 17°F. The balance point sits substantially below freezing — most homes can run on the heat pump alone for most of the heating season, with aux heat only filling in on the coldest design days.',
    inputs: {
      squareFootage: 1500,
      climateZone: '6',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: true,
    },
  },
  {
    slug: '1500-sq-ft-zone-7-cold-climate',
    title: 'Cold-Climate Heat Pump for 1,500 Sq Ft Home — Zone 7',
    metaTitle: 'Cold-Climate Heat Pump for 1,500 Sq Ft Home (Zone 7): CCASHP Required',
    metaDescription:
      'Cold-climate (CCASHP) heat pump sizing for a 1,500 sq ft home in IECC climate zone 7. CCASHP required, dual-fuel option.',
    scenario:
      'A 1,500 square foot home in zone 7 (northern Minnesota, mountain west) has heating loads about 1.9× cooling. Cold-climate certified equipment is required — standard heat pumps lose too much capacity at the zone 7 heating design temperature. Dual-fuel backup (heat pump + gas furnace) is also a reasonable architecture in this climate.',
    inputs: {
      squareFootage: 1500,
      climateZone: '7',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: true,
    },
  },
  {
    slug: '2500-sq-ft-zone-5-cold-climate',
    title: 'Cold-Climate Heat Pump for 2,500 Sq Ft Home — Zone 5',
    metaTitle: 'Cold-Climate Heat Pump for 2,500 Sq Ft Home (Zone 5): Tonnage',
    metaDescription:
      'Cold-climate (CCASHP) heat pump sizing for a larger 2,500 sq ft home in zone 5. Tonnage and balance point.',
    scenario:
      'A 2,500 square foot home in zone 5 with cold-climate equipment typically calls for a 4-ton CCASHP-listed model. Larger homes benefit especially from cold-climate equipment because aux heat capacity scales with home size; reducing aux runtime saves more electricity in absolute terms.',
    inputs: {
      squareFootage: 2500,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: true,
    },
  },
  {
    slug: '3000-sq-ft-zone-5',
    title: 'Heat Pump Size for 3,000 Sq Ft Home — Zone 5',
    metaTitle: 'Heat Pump Size for 3,000 Sq Ft Home (Zone 5): Multi-Zone Sizing',
    metaDescription:
      'Heat pump sizing for a 3,000 sq ft home in zone 5. Multi-zone considerations, balance point, aux heat capacity.',
    scenario:
      'A 3,000 square foot home in zone 5 typically calls for a 5-ton heat pump or a multi-zone install (e.g., a 3-ton and a 2-ton serving different floors). At this size, zoning improves both comfort and efficiency: a single-thermostat system tends to overheat downstairs while underheating upstairs in winter.',
    inputs: {
      squareFootage: 3000,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 5,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: 'older-1500-sq-ft-home-zone-5',
    title: 'Heat Pump Size for Older 1,500 Sq Ft Home — Zone 5',
    metaTitle: 'Heat Pump Size for Older 1,500 Sq Ft Home (Zone 5): Poor Insulation',
    metaDescription:
      'Heat pump sizing for an older 1,500 sq ft home with poor insulation in IECC climate zone 5. Higher tonnage requirement.',
    scenario:
      'An older 1,500 square foot home in zone 5 with poor insulation (pre-1980 envelope, below current code) needs a larger heat pump than the same-size home with average insulation — about 30% more capacity. Many homeowners consider an envelope retrofit (added attic insulation, air sealing) before installing the heat pump; that can shift the equipment one full tonnage smaller.',
    inputs: {
      squareFootage: 1500,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'poor',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
  },
  {
    slug: 'well-insulated-2000-sq-ft-zone-6',
    title: 'Heat Pump Size for Well-Insulated 2,000 Sq Ft Home — Zone 6',
    metaTitle: 'Heat Pump Size for Well-Insulated 2,000 Sq Ft Home (Zone 6)',
    metaDescription:
      'Heat pump sizing for a well-insulated 2,000 sq ft home in IECC climate zone 6. Smaller equipment, cold-climate equipment recommendation.',
    scenario:
      'A well-insulated 2,000 square foot home in zone 6 with above-code insulation needs about 10% less capacity than an average-insulation home of the same size. Combined with cold-climate equipment, a well-insulated home in zone 6 can hit a balance point well below freezing — meaningfully reducing aux heat runtime through the season.',
    inputs: {
      squareFootage: 2000,
      climateZone: '6',
      ceilingHeight: '8',
      insulationLevel: 'good',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: true,
    },
  },
] as const;

export function findHeatPumpExampleBySlug(slug: string): HeatPumpExample | undefined {
  return heatPumpExamples.find((e) => e.slug === slug);
}

export function getRelatedHeatPumpExamples(slug: string, count = 5): HeatPumpExample[] {
  const current = findHeatPumpExampleBySlug(slug);
  if (!current) return [];

  return heatPumpExamples
    .filter((e) => e.slug !== slug)
    .map((e) => {
      const sqftDiff = Math.abs(e.inputs.squareFootage - current.inputs.squareFootage);
      const zoneDiff = Math.abs(Number(e.inputs.climateZone) - Number(current.inputs.climateZone)) * 200;
      return { example: e, score: sqftDiff + zoneDiff };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);
}
