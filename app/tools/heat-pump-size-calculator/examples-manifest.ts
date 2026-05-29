import type { HeatPumpInputs } from '@/lib/calculators/heat-pump-size';
import type { FaqItem } from '@/components/seo/types';

export interface HeatPumpScenarioEntry {
  title: string;
  location: string;
  inputs: HeatPumpInputs;
  takeaway: string;
}

export interface Archetype {
  title: string;
  era: string;
  characteristics: readonly string[];
  loadProfile: string;
}

export interface EquipmentOption {
  name: string;
  tagline: string;
  costRange: string;
  capacity17F?: string;
  balancePoint?: string;
  bestFor: string;
  pros: readonly string[];
  cons: readonly string[];
}

export interface ClimateRow {
  zone: string;
  cities: string;
  designTemp: string;
  loadRatio: string;
  equipment: string;
  auxNotes: string;
}

export interface InsulationLevelDetail {
  label: string;
  envelope: string;
  heatingLoad: string;
  equipment: string;
}

export interface InsulationLevels {
  poor: InsulationLevelDetail;
  average: InsulationLevelDetail;
  good: InsulationLevelDetail;
}

export interface AdditionalConsideration {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
}

export interface Mistake {
  title: string;
  description: string;
}

export interface UpgradeDecision {
  useThisFor: readonly string[];
  upgradeFor: readonly string[];
}

export interface HeatPumpExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: HeatPumpInputs;
  intro?: string;
  archetypes?: readonly Archetype[];
  equipmentOptions?: readonly EquipmentOption[];
  climateTable?: readonly ClimateRow[];
  insulationLevels?: InsulationLevels;
  occupancyNotes?: string;
  additionalConsiderations?: readonly AdditionalConsideration[];
  mistakes?: readonly Mistake[];
  upgradeDecision?: UpgradeDecision;
  scenarios?: HeatPumpScenarioEntry[];
  faq?: FaqItem[];
  sourceIds?: readonly string[];
}

export const heatPumpExamples: readonly HeatPumpExample[] = [
  {
    slug: '1000-sq-ft',
    title: 'Heat Pump Size for a 1,000 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 1,000 Sq Ft Home: 10 Worked Use Cases Across Climates',
    metaDescription:
      'Heat pump sizing for a 1,000 sq ft home — small ranches, bungalows, tiny homes. 10 use cases covering climate zones, CCASHP vs standard equipment, balance point, aux heat.',
    scenario:
      'A 1,000 square foot home typically pairs with a 2-ton heat pump in moderate US climates.',
    inputs: {
      squareFootage: 1000,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
    intro:
      "Heat pump sizing for a 1,000 square foot home is the typical query for owners of small ranches, post-war bungalows, condos, and accessory dwelling units. The lower square footage means lower equipment cost ($4,500-$7,500 installed for standard equipment in this size range) and smaller electrical service requirements — relevant for older homes with 100-amp panels. The calculator recommends a 2-ton heat pump (24,000 BTU) for an average-envelope home in zone 5; this page walks through 10 use cases showing how climate, envelope, and equipment class shift that answer.",
    archetypes: [
      {
        title: 'Small post-war ranch',
        era: '1945–1965 — most common at this size',
        characteristics: [
          'Original R-7 walls, R-19 attic',
          'Single-pane or original double-pane windows',
          'Single-story rectangular footprint',
          'Often 100-amp electrical service',
        ],
        loadProfile: '~22,000 BTU heating load in zone 5',
      },
      {
        title: '1BR / 2BR condo unit',
        era: 'Mixed era, often retrofitted',
        characteristics: [
          'Party walls reduce envelope load 30–40%',
          'Smaller HVAC tonnage requirement',
          'Often constrained by HOA rules on outdoor units',
          'Ductless mini-split common',
        ],
        loadProfile: '~16,000 BTU heating load in zone 5',
      },
      {
        title: 'Tiny home / accessory dwelling',
        era: '2010s+',
        characteristics: [
          'Modern envelope per IECC code',
          'Often R-19+ walls, R-49 attic',
          'Heat pump common as sole HVAC',
          'Single mini-split head typical',
        ],
        loadProfile: '~17,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Standard heat pump',
        tagline: 'Lowest upfront cost',
        costRange: '$4,500–$7,500 installed',
        capacity17F: '60% of rated',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Zones 2–4, mild zone 5',
        pros: [
          'Lowest upfront cost in this size range',
          'Wide model selection at 2-ton',
          'Fits 100-amp electrical service with proper aux sizing',
        ],
        cons: [
          'Aux heat fires often in zone 5+',
          'Higher operating cost in cold climates',
        ],
      },
      {
        name: 'Cold-climate (NEEP CCASHP)',
        tagline: 'Best for cold climates',
        costRange: '$7,000–$10,500 installed',
        capacity17F: '85% of rated',
        balancePoint: 'Low teens°F (zone 5)',
        bestFor: 'Zones 5–7, all-electric homes',
        pros: [
          'Minimal aux heat use through winter',
          'Qualifies for $2,000 IRA 25C tax credit',
          'Stronger rebates than standard in cold zones',
        ],
        cons: [
          '$2,000–$3,500 premium over standard',
          'Smaller model selection at 2-ton',
        ],
      },
      {
        name: 'Single-zone ductless mini-split',
        tagline: 'No ductwork required',
        costRange: '$5,500–$9,500 installed',
        capacity17F: '80–90% (variable-speed)',
        balancePoint: 'Mid-teens°F',
        bestFor: 'Open-plan homes, ductless retrofits',
        pros: [
          'No ductwork installation or losses',
          'Variable-speed efficiency at small loads',
          'Easy IRA / utility rebate eligibility',
        ],
        cons: [
          'Single zone may underserve closed bedrooms',
          'Indoor unit visible on wall',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: '2-ton standard',
        auxNotes: 'Minimal — cooling drives sizing',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: '1.5–2 ton standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: '2-ton standard or CCASHP',
        auxNotes: 'Occasional aux on cold nights',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: '2-ton CCASHP recommended',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: '2–2.5 ton CCASHP',
        auxNotes: 'Moderate even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: '2.5-ton CCASHP required',
        auxNotes: 'Significant + consider dual-fuel',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~28,000 BTU',
        equipment: '2.5-ton CCASHP',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~22,000 BTU',
        equipment: '2-ton standard or CCASHP',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~18,000 BTU',
        equipment: '1.5-ton mini-split or 2-ton CCASHP',
      },
    },
    occupancyNotes:
      'For a 1,000 sqft home, occupancy difference between 2 and 4 occupants shifts heating load only about 500 BTU. Larger effect: home offices and concentrated electrical loads can add 2,000-3,000 BTU/hr of effective heating offset, occasionally enabling equipment downsize.',
    additionalConsiderations: [
      {
        title: '100-amp electrical service consideration',
        description:
          'At 1,000 sqft, the heat pump itself is small (2-ton draws about 20 amps under full load), but aux heat strips can push a 100-amp service past capacity if other major loads (electric water heater, range, dryer) run concurrently. Load management technology or service upgrade may be needed.',
        linkText: 'Read: heat pump aux heat',
        linkUrl: '/heat-pump/aux-heat/',
      },
      {
        title: 'Defrost cycle behavior',
        description:
          'Heat pumps periodically reverse refrigerant flow to defrost the outdoor coil — 3–10 minutes every 30–90 minutes in cold weather. During defrost the unit pulls heat from the home rather than delivering it. CCASHP models manage defrost more gracefully per NEEP testing.',
        linkText: 'Read: heat pump defrost cycles',
        linkUrl: '/heat-pump/cold-climate/defrost-cycle/',
      },
    ],
    mistakes: [
      {
        title: 'Oversizing to a 3-ton unit',
        description:
          'A 3-ton heat pump on a 1,000 sqft home short-cycles severely, hurting humidity control in summer and producing uneven temperatures in winter. The calculator-recommended 2-ton is correct for most homes at this size.',
      },
      {
        title: 'Skipping CCASHP in zones 5+',
        description:
          'Standard 2-ton heat pumps in zone 5 produce a balance point in the high 20s°F, with aux heat firing through most of January and February. CCASHP shifts to the teens°F, reducing aux runtime 60-80%.',
      },
      {
        title: 'Aux heat strip sized to full load',
        description:
          '5kW typically suffices for a 2-ton heat pump in zones 4-5; CCASHP equipment can often use just 5kW even in zone 6. Oversized aux strips unnecessarily increase electrical service load.',
      },
      {
        title: 'Ignoring electrical panel capacity',
        description:
          '1,000 sqft homes commonly have 100-amp service. Heat pump aux heat strips plus other electric loads can exceed panel capacity. Check panel ratings before equipment selection.',
      },
      {
        title: 'Using the wrong calculator',
        description:
          'AC sizing alone gives the wrong answer for heat pumps. Use this dual-load calculator, not the BTU or AC sizing calculator, for heat pump equipment decisions.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Small home heat pump sizing and budget estimation',
        'Comparing contractor quotes for replacement equipment',
        'Sanity check before mini-split DIY purchase',
        'Tiny home or ADU heat pump sizing',
      ],
      upgradeFor: [
        'IRA 25C tax credit applications requiring documentation',
        'Multi-zone install with multiple indoor heads',
        'After significant envelope retrofit (new load is different)',
        'Cold climate (zone 6+) precise sizing for aux strip selection',
        'Electrical service capacity planning before equipment install',
      ],
    },
    scenarios: [
      {
        title: '1,000 sqft in zone 2 — Gulf Coast',
        location: 'Houston, NOLA, Tampa, Orlando',
        inputs: {
          squareFootage: 1000,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Cooling-dominated climate. A 2-ton standard heat pump handles cooling load with comfortable margin; heating load is small and aux heat rarely fires. Variable-speed (inverter) equipment is the better pick because long cooling runtimes (1,500+ hours per year) benefit from part-load humidity control.",
      },
      {
        title: '1,000 sqft in zone 4 — balanced load',
        location: 'DC, Cincinnati, Louisville',
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
        takeaway:
          "Zone 4 balanced case: heating and cooling loads roughly equal. A 2-ton standard heat pump handles both with aux heat needed only on coldest days. Balance point lands near freezing. Federal IRA 25C tax credit qualifies for ENERGY STAR equipment in this size range.",
      },
      {
        title: '1,000 sqft in zone 5 — standard equipment',
        location: 'Cleveland, Indianapolis, Denver',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Standard 2-ton heat pump in zone 5: works but expect aux runtime through winter. Heating load roughly 1.3× cooling. Annual heating cost in moderate zone 5 weather: $500-$750 at $0.14/kWh. CCASHP variant below saves $100-$200/year.",
      },
      {
        title: '1,000 sqft in zone 5 — CCASHP variant',
        location: 'Same zone 5 cities, electrification retrofits',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Same home with CCASHP. Balance point drops from upper 20s to low teens°F. Aux runtime drops 60-80%. Premium $2,000-$3,500 over standard, partially offset by $2,000 federal tax credit. Net cost can be comparable to standard equipment after stacked incentives.",
      },
      {
        title: '1,000 sqft in zone 6 — CCASHP recommended',
        location: 'Minneapolis, Buffalo, Burlington',
        inputs: {
          squareFootage: 1000,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Zone 6 heating-dominated at 1.6× cooling. CCASHP equipment recommended. 2-ton CCASHP handles heating with manageable aux runtime. Variable-speed CCASHP is the sweet spot for small homes in cold climates — handles low base loads without short-cycling.",
      },
      {
        title: '1,000 sqft tiny home / ADU with mini-split',
        location: 'Accessory dwellings, backyard cottages',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 2,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Modern tiny home or ADU with IECC 2021 envelope: 1.5-ton ductless mini-split is the right size. Single indoor head can serve an open-plan layout; multi-head for separated bedrooms. Variable-speed mini-splits modulate from 25% capacity, perfect for tight envelopes.",
      },
      {
        title: 'Older 1,000 sqft post-war ranch',
        location: 'Older mid-Atlantic and northern suburbs',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor insulation pushes heating load 30% higher. Equipment climbs to 2.5-ton CCASHP. Better approach: envelope retrofit first. Attic top-off + air sealing + window storm panels can drop the load back to 2-ton territory and avoid the larger equipment investment.",
      },
      {
        title: '1BR condo conversion (party walls)',
        location: 'Older condo buildings retrofitting from electric resistance',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'average',
          sunExposure: 'shaded',
          occupants: 2,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Condo with party walls on 2 sides loses 40% of envelope area. Effective heating load drops 20-25%. A 1.5-ton mini-split typically suffices. HOA rules often dictate outdoor unit placement, making ductless multi-split (one outdoor + two indoor heads) the typical install.",
      },
      {
        title: '1,000 sqft empty nester home',
        location: 'Downsized retirement homes',
        inputs: {
          squareFootage: 1000,
          climateZone: '4',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 2,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Lower occupancy and quieter daytime demand allow a 1.5 to 2-ton CCASHP. Variable-speed equipment is especially good here — modulates output for the low base load and runs continuously at reduced capacity rather than cycling. Federal IRA credit applies.",
      },
      {
        title: 'All-electric retrofit (replacing electric resistance)',
        location: 'Northeast homes with baseboard heat',
        inputs: {
          squareFootage: 1000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Highest-ROI heat pump retrofit: electric resistance heat costs $1,200-$1,800/year for a 1,000 sqft zone 5 home, versus $400-$650 for CCASHP. Annual savings $800-$1,200. Payback typically under 5 years even at full equipment cost; under 2 years with stacked incentives.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 1,000 sq ft house?',
        a: 'A 2-ton (24,000 BTU) heat pump is the typical recommendation for a 1,000 sq ft home with average construction. Climate zone shifts this: zone 2 (Gulf Coast) lands at 1.5-2 tons driven by cooling; zone 5+ lands at 2 tons with cold-climate equipment recommended; well-insulated tiny homes can size down to 1.5-ton mini-split.',
      },
      {
        q: 'How much does a heat pump for a 1,000 sq ft house cost?',
        a: 'Standard central heat pump: $4,500-$7,500 installed in 2024. Cold-climate certified (CCASHP): $7,000-$10,500. Single-zone ductless mini-split: $5,500-$9,500. Federal IRA 25C tax credit returns up to $2,000 on qualifying installations; state and utility rebates add $500-$2,500.',
      },
      {
        q: 'Is a 2-ton heat pump too big for a 1,000 sq ft house?',
        a: '2-ton is right for most 1,000 sqft homes with average construction in zones 4-5. Well-insulated newer construction or condo units with party walls can size down to 1.5-ton mini-split equipment. A 3-ton heat pump would short-cycle severely at this house size and is not recommended unless envelope is extremely poor or zone is very cold (zone 7+).',
      },
      {
        q: 'Can I install a heat pump on a 100-amp service?',
        a: 'Often yes, but check panel capacity. A 2-ton heat pump draws about 20 amps; aux heat strips add 20-80 amps depending on size. Combined with electric water heater and range, 100-amp service may be at capacity. Load management technology (e.g., Span panel) can prevent simultaneous peak draw and avoid service upgrade.',
      },
      {
        q: 'Should I use a mini-split or central heat pump for 1,000 sq ft?',
        a: 'Open-plan layouts: single-zone ductless mini-split serves well, simpler install, no duct losses. Layouts with separated bedrooms: central ducted heat pump with proper ductwork, or multi-zone ductless (one outdoor, 2-3 indoor heads). Cost: ductless multi-zone typically 20-30% more than central but avoids duct losses.',
      },
      {
        q: 'Do small homes need cold-climate heat pumps?',
        a: 'Same logic as larger homes: in zones 5+, CCASHP equipment reduces aux heat runtime substantially. The smaller absolute energy savings for small homes ($100-$200/year vs $200-$400 for larger) means CCASHP payback is longer in pure energy terms. But IRA tax credit makes the CCASHP premium near-zero net cost in many markets.',
      },
      {
        q: 'What is the balance point for a 2-ton heat pump in zone 5?',
        a: 'For a 1,000 sqft zone 5 home with a 2-ton standard heat pump and average envelope: balance point sits in the upper 20s°F. With CCASHP equipment: drops to low teens°F. Well-insulated homes have lower balance points (less aux heat); poorly-insulated homes have higher balance points (more aux heat).',
      },
      {
        q: 'How much aux heat for a 1,000 sq ft home?',
        a: '5kW typically suffices for a 2-ton heat pump in zones 4-5; some installs go 10kW for safety margin. CCASHP equipment can often use 5kW even in zone 6 because the heat pump maintains capacity at low temperatures. Zone 7+ may need 10-15kW even with CCASHP.',
      },
      {
        q: 'Will a heat pump work in a tiny home?',
        a: 'Yes — heat pumps are well-suited to tiny homes and ADUs. Modern variable-speed mini-splits modulate down to 25% of rated capacity (about 3,000 BTU at 1-ton size), matching the low base load of a well-insulated tiny home without short-cycling. Single-zone install typically $4,000-$7,000.',
      },
      {
        q: 'Can I cool a 1,000 sq ft home with a window AC instead?',
        a: 'For cooling-only retrofit on a budget, two 8,000-10,000 BTU window units can cover a 1,000 sqft home. Total equipment $300-$700 vs $4,500+ for heat pump. Trade-offs: no heating, lower efficiency (CEER 11-13 vs SEER2 15+ for heat pump), no IRA incentive. For rentals or short-term solutions, window AC works; for long-term, heat pump pays back.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
  },
  {
    slug: '1200-sq-ft',
    title: 'Heat Pump Size for a 1,200 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 1,200 Sq Ft Home: Tonnage, Balance Point, 10 Use Cases',
    metaDescription:
      'Heat pump sizing for a 1,200 sq ft home — common ranches and split-levels. 10 use cases covering climate zones, CCASHP equipment, balance point, aux heat.',
    scenario:
      'A 1,200 square foot home typically pairs with a 2 to 2.5-ton heat pump.',
    inputs: {
      squareFootage: 1200,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 3,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
    intro:
      "Heat pump sizing for a 1,200 square foot home is the typical query for owners of small ranches, split-levels, and starter homes. This footprint sits between the 1,000-sqft tiny-home territory and the 1,500-sqft median, and the calculator's recommendation reflects that — a 2 to 2.5-ton heat pump in moderate climates, scaling up in cold zones or down with good envelope. This page walks through 10 use cases showing how climate, envelope, and architecture shift the answer at this house size.",
    archetypes: [
      {
        title: '2-bedroom ranch',
        era: '1955–1985 — most common archetype',
        characteristics: [
          'Single-story rectangular footprint',
          'R-11 walls, R-30 attic (after retrofit)',
          'Original or first-replacement windows U-0.55 to U-0.7',
          'ACH50 typically 8–12',
        ],
        loadProfile: '~28,000 BTU heating load in zone 5',
      },
      {
        title: 'Split-level',
        era: '1960s-1980s',
        characteristics: [
          'Two short flights between levels',
          'Lower level partially below grade',
          'Stack effect modest compared to two-story',
          'R-11 walls typical, R-19 to R-30 attic',
        ],
        loadProfile: '~27,000 BTU heating load in zone 5',
      },
      {
        title: 'Starter home / first-time buyer house',
        era: '1990s-2000s',
        characteristics: [
          'R-13 walls, R-38 attic',
          'Double-pane windows U-0.55',
          'ACH50 typically 7–9',
          '200-amp service typical',
        ],
        loadProfile: '~25,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Standard heat pump',
        tagline: 'Lowest upfront cost',
        costRange: '$5,000–$8,000 installed',
        capacity17F: '60% of rated',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Zones 2–4, mild zone 5',
        pros: [
          'Lower upfront cost',
          'Wide model selection at 2 to 2.5-ton',
          'Compatible with existing 200-amp service',
        ],
        cons: [
          'Aux heat fires often in zone 5+',
          'Higher operating cost in cold climates',
        ],
      },
      {
        name: 'Cold-climate (NEEP CCASHP)',
        tagline: 'Best for cold climates',
        costRange: '$7,500–$11,000 installed',
        capacity17F: '85% of rated',
        balancePoint: 'Low teens°F (zone 5)',
        bestFor: 'Zones 5–7, all-electric homes',
        pros: [
          'Minimal aux heat use through winter',
          'Qualifies for $2,000 IRA 25C tax credit',
          'Strong state and utility rebates',
        ],
        cons: [
          '$2,500–$4,000 premium over standard',
          'Smaller model selection',
        ],
      },
      {
        name: 'Dual-fuel (HP + gas furnace)',
        tagline: 'Best with cheap natural gas',
        costRange: '$9,500–$14,000 installed',
        balancePoint: 'Crossover at 30–35°F',
        bestFor: 'Cheap gas markets, transitional retrofits',
        pros: [
          'Optimized operating cost with cheap gas',
          'Furnace handles deep cold reliably',
        ],
        cons: [
          'Highest capital cost',
          'Reduced IRA incentive eligibility',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: '2.5-ton standard',
        auxNotes: 'Minimal',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: '2 to 2.5-ton standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: '2 to 2.5-ton standard or CCASHP',
        auxNotes: 'Occasional aux',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: '2.5-ton CCASHP recommended',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: '2.5 to 3-ton CCASHP',
        auxNotes: 'Moderate even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: '3-ton CCASHP + dual-fuel option',
        auxNotes: 'Significant',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~34,000 BTU',
        equipment: '3-ton CCASHP',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~26,000 BTU',
        equipment: '2.5-ton standard or CCASHP',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~21,000 BTU',
        equipment: '2-ton CCASHP',
      },
    },
    occupancyNotes:
      'Occupancy effect is small for a 1,200 sqft home — about 4% of total load between 2 and 4 occupants. Internal electrical loads (home offices, electric cooking, indoor laundry) contribute 2,000-4,000 BTU/hr of effective heating offset and meaningfully reduce practical equipment runtime in cold-climate scenarios.',
    additionalConsiderations: [
      {
        title: 'Defrost cycle behavior',
        description:
          'Heat pumps periodically reverse to defrost the outdoor coil (3–10 min every 30–90 min in cold weather). CCASHP models defrost more efficiently per NEEP testing — fewer cycles in similar conditions, less ice buildup.',
        linkText: 'Read: heat pump defrost cycles',
        linkUrl: '/heat-pump/cold-climate/defrost-cycle/',
      },
      {
        title: 'Duct losses (split-level layouts)',
        description:
          'Split-level homes commonly have ductwork running through unconditioned spaces (crawlspaces, partial basements). Per DOE Building America research, leaky ducts in unconditioned space lose 20–30% of delivered capacity. Duct sealing typically pays back within 5 years on heat pump installs.',
        linkText: 'Read: Manual D return air sizing',
        linkUrl: '/manual-d/return-air-sizing/',
      },
    ],
    mistakes: [
      {
        title: 'Sizing to cooling load only',
        description:
          '1,200 sqft in zone 5 has heating load ~1.3× cooling. Sizing to cooling leaves heating capacity short, forcing aux heat to fire — at 2-3× the cost of heat pump heat.',
      },
      {
        title: 'Skipping CCASHP in zones 5+',
        description:
          'Standard 2.5-ton in zone 5 produces balance point in high 20s°F. CCASHP drops to teens°F, reducing aux runtime 60-80%. Premium pays back in 6-10 years through reduced electricity bills.',
      },
      {
        title: 'Replacing 3-ton with 3-ton automatically',
        description:
          'Many 1,200 sqft homes were originally oversized at 3-ton based on rule-of-thumb sizing. Current envelope (after typical 20+ years of incremental improvements) often supports 2 to 2.5-ton equipment. Use the calculator, not the old equipment nameplate.',
      },
      {
        title: 'Not running the dual-load calculation',
        description:
          'AC sizing alone gives the wrong answer for heat pumps. Use this calculator, not the BTU calculator, for heat pump equipment decisions.',
      },
      {
        title: 'Aux heat sized to full load',
        description:
          '5-10kW aux suffices for 2 to 2.5-ton heat pumps in zone 5. Sizing aux to handle the entire heating load at design temperature is unnecessary if the heat pump itself meets most of the load.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Small home heat pump sizing and budget estimation',
        'Comparing contractor quotes',
        'Sanity check before equipment purchase',
        'Like-for-like replacement evaluation',
      ],
      upgradeFor: [
        'IRA 25C tax credit applications',
        'State / utility rebates requiring documentation',
        'Multi-zone install',
        'After significant envelope retrofit',
        'Cold-climate installs for precise aux sizing',
      ],
    },
    scenarios: [
      {
        title: '1,200 sqft in zone 2 — Gulf Coast',
        location: 'Houston, NOLA, Tampa',
        inputs: {
          squareFootage: 1200,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Cooling-dominated. 2.5-ton standard heat pump handles cooling load with good margin; heating load small. Variable-speed equipment recommended for humidity control during long cooling season.",
      },
      {
        title: '1,200 sqft in zone 4 — balanced load',
        location: 'DC, Cincinnati, St Louis',
        inputs: {
          squareFootage: 1200,
          climateZone: '4',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Zone 4 balanced case. 2.5-ton standard heat pump handles both loads with aux on coldest days only. Balance point near freezing. Either standard or CCASHP works; CCASHP slightly better for the coldest weeks but standard is fine.",
      },
      {
        title: '1,200 sqft in zone 5 — standard equipment',
        location: 'Cleveland, Indianapolis, Pittsburgh',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Standard 2.5-ton in zone 5 works but expect frequent aux runtime. Heating load 1.3× cooling. Annual heating cost: $600-$900 at $0.14/kWh. CCASHP variant below cuts aux runtime substantially.",
      },
      {
        title: '1,200 sqft in zone 5 — CCASHP variant',
        location: 'Same zone 5 cities, electrification retrofits',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Same home with CCASHP. Balance point drops from upper 20s°F to low teens°F. Aux runtime drops 60-80%. CCASHP premium $2,500-$4,000, partially offset by IRA $2,000 credit. Annual heating savings $150-$300.",
      },
      {
        title: '1,200 sqft in zone 6 — CCASHP strongly recommended',
        location: 'Minneapolis, Buffalo, Burlington',
        inputs: {
          squareFootage: 1200,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Zone 6 heating-dominated at 1.6× cooling. CCASHP strongly recommended. 2.5 to 3-ton CCASHP handles heating with moderate aux. Variable-speed CCASHP is the sweet spot — modulates output and avoids short-cycling on milder winter days.",
      },
      {
        title: '1,200 sqft split-level with crawlspace ductwork',
        location: 'Older split-level homes',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Split-level homes commonly have ductwork in unconditioned crawlspaces. Duct losses can reach 25-30% of delivered capacity. Duct sealing before equipment replacement typically recovers 0.5-ton of effective capacity and pays back within 5 years through reduced heating bills.",
      },
      {
        title: 'Older 1,200 sqft starter home (pre-1980)',
        location: 'Older mid-Atlantic and northern starter homes',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor insulation pushes heating load 30% higher. Equipment climbs to 3-ton CCASHP. Envelope retrofit (air sealing + attic top-off) typically drops the load 20-25%, allowing 2.5-ton CCASHP and avoiding the equipment upsize. Total project cost (envelope + heat pump) often similar to oversized heat pump alone.",
      },
      {
        title: 'New construction 1,200 sqft with IECC 2021 envelope',
        location: 'Newer townhomes, infill construction',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Modern envelope drops heating load. 2-ton CCASHP suffices. Single ducted variable-speed mini-split serves well in open-plan layouts; multi-zone ductless (one outdoor + 2 indoor heads) for separated bedroom layouts. ENERGY STAR Most Efficient list has many qualifying options.",
      },
      {
        title: 'All-electric retrofit (replacing oil furnace)',
        location: 'New England, upstate NY oil-heated homes',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Oil heat at $4-5/gallon costs $1,500-$2,000/year for a 1,200 sqft zone 5 home. CCASHP costs $550-$850. Annual savings $950-$1,450. State programs (NYSERDA Clean Heat, Mass Save, Efficiency Vermont) often cover 30-50% of project cost for oil replacement. Total net cost after incentives can be lower than oil furnace replacement.",
      },
      {
        title: 'Dual-fuel (heat pump + gas furnace) in cheap-gas market',
        location: 'Midwest, mid-Atlantic with low gas prices',
        inputs: {
          squareFootage: 1200,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 3,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Dual-fuel pairs standard heat pump (cooling + shoulder-season heating) with gas furnace (deep cold). Crossover set at 30-35°F. Total installed cost $9,500-$14,000. Operating cost optimized in cheap-gas regions but IRA tax credit and many rebates favor all-electric installs. Check incentive eligibility before specifying.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 1,200 sq ft house?',
        a: 'A 2 to 2.5-ton (24,000-30,000 BTU) heat pump is the typical recommendation. Climate zone shifts this: zone 2 typically 2.5 ton driven by cooling; zone 4 lands at 2 to 2.5 ton balanced; zone 5 at 2.5 ton with CCASHP recommended; zone 6 at 2.5-3 ton CCASHP; well-insulated new construction can downsize to 2 ton.',
      },
      {
        q: 'How much does a heat pump for a 1,200 sq ft house cost?',
        a: 'Standard central heat pump: $5,000-$8,000 installed. CCASHP equipment: $7,500-$11,000. Dual-fuel: $9,500-$14,000. Federal IRA 25C tax credit: up to $2,000. State/utility rebates: $500-$3,000 typical, more in oil-replacement programs.',
      },
      {
        q: 'Is a 2-ton or 2.5-ton better for 1,200 sq ft?',
        a: '2-ton works for well-insulated newer homes in zones 4-5. 2.5-ton is right for average-envelope older homes in zones 4-5 and standard for zones 5-6. The half-ton difference shows up as more aux heat runtime if undersized, more short-cycling if oversized. Variable-speed equipment tolerates the boundary better.',
      },
      {
        q: 'Do I need cold-climate equipment for 1,200 sq ft in zone 5?',
        a: 'Recommended but not required. Standard heat pumps produce a balance point in the high 20s°F in zone 5, with aux heat firing through winter. CCASHP drops balance point to low teens°F, reducing aux runtime 60-80%. Payback typically 7-12 years through reduced electricity bills; less with IRA incentive.',
      },
      {
        q: 'Can I replace my existing 3-ton AC with a 2.5-ton heat pump for a 1,200 sq ft house?',
        a: 'Often yes. Many older 3-ton installs were oversized using rule-of-thumb sizing (one-ton per 400 sqft). Current Manual J for a 1,200 sqft home with average envelope typically lands at 2 to 2.5 tons. The smaller heat pump runs longer cycles, dehumidifies better, and costs less to operate. Check load with calculator above before downsizing.',
      },
      {
        q: 'What aux heat strip size for a 1,200 sq ft heat pump?',
        a: '5-10kW aux is typical for a 2 to 2.5-ton heat pump in zones 4-5. CCASHP equipment can often use 5-10kW even in zone 6. Zone 7+ may need 10-15kW. Don\'t oversize aux — it unnecessarily increases peak electrical draw and panel capacity requirements.',
      },
      {
        q: 'Should I get a heat pump or replace my gas furnace?',
        a: 'In zones 3-5, heat pump increasingly the right call given IRA incentives. CCASHP handles zone 5 winters. Caveats: if gas furnace is new (under 5 years), keep it as dual-fuel backup. If electrical service is constrained, panel upgrade may be needed. In zones 6-7, dual-fuel or CCASHP both reasonable.',
      },
      {
        q: 'Will a 2.5-ton heat pump cool 1,200 sq ft adequately?',
        a: 'Yes — 2.5-ton (30,000 BTU) handles cooling for a 1,200 sqft home comfortably in zones 1-5. Cooling load for 1,200 sqft is typically 24,000-28,000 BTU; 2.5-ton provides 10-20% margin for hot days. Don\'t oversize to 3-ton unless envelope or sun exposure is unusually poor.',
      },
      {
        q: 'How does a split-level layout affect heat pump sizing?',
        a: 'Split-level homes have modest stack effect (less than two-story) but commonly have ductwork in unconditioned crawlspaces. Duct losses are the bigger consideration. Heat pump sizing itself follows the same calculator output; the install requires extra attention to duct sealing to recover effective capacity.',
      },
      {
        q: 'How long should the heat pump run per cycle?',
        a: 'Properly-sized heat pump cycles 30-90 minutes in heating mode on cold days, often continuous on the coldest days. Cooling cycles: 15-30 minutes typical. Variable-speed equipment runs continuously at reduced output. Cycles under 15 minutes indicate oversizing; constant runtime without reaching setpoint indicates undersizing.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
  },
  {
    slug: '1500-sq-ft',
    title: 'Heat Pump Size for a 1,500 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home: 10 Worked Use Cases Across Climates',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home — the US median house size. 10 worked use cases covering climate zones 2-7, CCASHP vs standard equipment, balance point, aux heat, and IRA incentives.',
    scenario:
      'A 1,500 square foot home — US median house size — typically pairs with a 2.5-ton heat pump.',
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
    intro:
      "The 1,500 square foot home is the most-searched heat pump sizing query because the US median single-family home falls in this range per Census ACS data. The same home needs different equipment depending on climate zone, envelope, and architecture — this page walks through the choices visually.",
    archetypes: [
      {
        title: 'Mid-century ranch',
        era: '1955–1985 — most common at this size',
        characteristics: [
          'R-7 to R-11 wall insulation',
          'R-19 attic insulation',
          'Original or first-replacement double-pane windows (U-0.6 to U-0.8)',
          'Air leakage around ACH50 10–14 (leaky)',
        ],
        loadProfile: '~33,000 BTU heating load in zone 5',
      },
      {
        title: 'Small two-story Colonial / Cape Cod',
        era: '1940s–1960s',
        characteristics: [
          'More wall area per square foot than ranch',
          'Bedrooms upstairs, often warmer in summer',
          'R-11 walls, R-30 attic typical (after retrofit)',
          'Higher stack-effect infiltration',
        ],
        loadProfile: '~36,000 BTU heating load in zone 5',
      },
      {
        title: 'Modern townhome',
        era: '2000s+',
        characteristics: [
          'Party walls on one or both sides (interior unit)',
          '40 percent less exterior wall area than free-standing',
          'R-13+ walls, R-38+ attic',
          'ACH50 typically 5–7 (tighter envelope)',
        ],
        loadProfile: '~28,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Standard heat pump',
        tagline: 'Lowest upfront cost',
        costRange: '$5,500–$8,500 installed',
        capacity17F: '60% of rated',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Zones 2–4, mild zone 5',
        pros: [
          'Wide model selection',
          'Simpler equipment, easier service',
          'Lower upfront cost',
        ],
        cons: [
          'Aux heat fires often in zone 5+',
          'Higher operating cost in cold climates',
          'Smaller IRA incentive in cold climates',
        ],
      },
      {
        name: 'Cold-climate (NEEP CCASHP)',
        tagline: 'Best for cold climates',
        costRange: '$8,500–$13,000 installed',
        capacity17F: '85% of rated',
        balancePoint: 'Low teens°F (zone 5)',
        bestFor: 'Zones 5–7, all-electric homes',
        pros: [
          'Minimal aux heat use through winter',
          'Qualifies for $2,000 IRA 25C tax credit',
          'Strong state and utility rebates available',
        ],
        cons: [
          '$2,500–$4,500 premium over standard',
          'Smaller model selection',
          'Higher installer skill requirement',
        ],
      },
      {
        name: 'Dual-fuel (HP + gas furnace)',
        tagline: 'Cheapest to operate with cheap gas',
        costRange: '$10,000–$16,000 installed',
        balancePoint: 'Crossover at 30–35°F',
        bestFor: 'Cheap natural gas markets, transition strategy',
        pros: [
          'Optimized operating cost in cheap-gas regions',
          'Furnace handles deep cold reliably',
          'Backup heat already in place',
        ],
        cons: [
          'Highest capital cost',
          'Reduced IRA / state incentive eligibility',
          'Two systems to maintain over time',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: 'Standard',
        auxNotes: 'Minimal — cooling drives sizing',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: 'Standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: 'Standard or CCASHP',
        auxNotes: 'Occasional aux on cold nights',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: 'CCASHP recommended',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: 'CCASHP strongly recommended',
        auxNotes: 'Moderate even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: 'CCASHP required',
        auxNotes: 'Significant + consider dual-fuel',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~42,000 BTU',
        equipment: '3-ton CCASHP',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~33,000 BTU',
        equipment: '2.5-ton standard or CCASHP',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~26,000 BTU',
        equipment: '2-ton CCASHP',
      },
    },
    occupancyNotes:
      'Occupancy adds 250 BTU/hr per occupant of heating-season offset per Manual J convention. For 1,500 sqft, the difference between 2 and 4 occupants shifts heating load only about 500 BTU — small. Larger effect comes from internal electrical loads: home offices, electric cooking, indoor laundry contribute 2,000–5,000 BTU/hr of effective heating gain that lowers the practical heat pump runtime.',
    additionalConsiderations: [
      {
        title: 'Defrost cycle behavior',
        description:
          'Heat pumps in cold climates periodically reverse refrigerant flow to defrost the outdoor coil (3–10 minutes every 30–90 minutes in cold weather). During defrost the unit pulls heat from the home rather than delivering it. CCASHP models manage defrost more gracefully per NEEP testing.',
        linkText: 'Read: heat pump defrost cycles',
        linkUrl: '/heat-pump/cold-climate/defrost-cycle/',
      },
      {
        title: 'Duct losses in unconditioned space',
        description:
          'Per DOE Building America research, leaky or poorly-insulated attic ductwork loses 25–35 percent of delivered heating capacity in cold-weather operation. Manual D-compliant duct sealing typically pays back faster on heat pump installs than AC-only installs.',
        linkText: 'Read: Manual D return air sizing',
        linkUrl: '/manual-d/return-air-sizing/',
      },
    ],
    mistakes: [
      {
        title: 'Sizing to cooling load only',
        description:
          'A 1,500 sqft home in zone 5 has heating load ~1.3× cooling. Sizing to cooling alone leaves heating capacity short, forcing aux heat to fire — at 2–3× the operating cost of heat pump heat.',
      },
      {
        title: 'Skipping the CCASHP question in zones 5+',
        description:
          'Standard heat pumps work in zone 5 but produce a balance point in the high 20s°F. CCASHP shifts to the teens°F, reducing aux runtime 60–80 percent. Premium pays back in 6–12 years.',
      },
      {
        title: 'Incorrect aux heat strip sizing',
        description:
          '10kW typically suffices for a 2.5-ton heat pump at this house size; CCASHP equipment can often use 5–10kW. Zone 7+ may need 15kW even with CCASHP. Undersized aux fails on coldest design days.',
      },
      {
        title: 'Ignoring electrical service capacity',
        description:
          'Heat pumps with aux heat strips can draw 50–80 amps in heating mode at design conditions. Older 100-amp services may need upgrade ($1,500–$4,000) before installation.',
      },
      {
        title: 'Using the wrong calculator',
        description:
          'AC sizing alone gives the wrong answer for heat pumps. Use this dual-load calculator, not the BTU or AC sizing calculator, for heat pump equipment decisions.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Early-planning evaluation of a heat pump retrofit',
        'Comparing contractor quotes with varying recommended tonnage',
        'Sanity-check before committing to specific equipment',
        'DIY-ing a window or single-zone mini-split install',
      ],
      upgradeFor: [
        'Multi-zone or whole-home equipment matching',
        'Federal IRA 25C tax credit and most state / utility rebate applications',
        'Homes with significant envelope changes since the last load calculation',
        'Dual-fuel architecture with precise crossover setting',
        'Cold-climate installs (zone 6+) where wrong sizing causes excess aux runtime',
      ],
    },
    scenarios: [
      {
        title: '1,500 sqft in zone 2 — Gulf Coast (cooling-dominated)',
        location: 'Houston, New Orleans, Tampa, Orlando',
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
        takeaway:
          "Heating load only about 0.5× cooling load — cooling drives equipment selection. A standard 3-ton heat pump sized to the cooling load handles the modest winter heating easily, with aux heat rarely firing. CCASHP equipment is not needed in this climate. Variable-speed (inverter) equipment is the better pick here because cooling runtimes are long (1,500+ hours per year) and humidity control matters — variable speed handles part-load humidity removal better than single-stage. ENERGY STAR Most Efficient list has many qualifying options at 3-ton.",
      },
      {
        title: '1,500 sqft in zone 4 — Mid-Atlantic (balanced load)',
        location: 'Washington DC, Cincinnati, Louisville, Richmond, St. Louis',
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
        takeaway:
          "Zone 4 is the balanced case — heating load roughly 1.0× cooling. A 2.5-ton standard heat pump handles both with aux heat needed only on the coldest days. Balance point lands near freezing. CCASHP equipment is optional but offers comfort benefits during cold snaps; the cost premium pays back over 10+ years through reduced aux heat use. Federal IRA 25C tax credit qualifies for ENERGY STAR certified equipment — $2,000 on qualifying installs.",
      },
      {
        title: '1,500 sqft in zone 5 — northern states (standard equipment)',
        location: 'Cleveland, Indianapolis, Pittsburgh, Kansas City, Denver',
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
        takeaway:
          "Zone 5 with standard heat pump — works, but expect aux heat runtime through winter. Heating load roughly 1.3× cooling at zone 5 design temperatures. Standard heat pump produces a balance point in the upper 20s°F per ENERGY STAR performance data, meaning aux heat fires whenever outdoor temperature drops below freezing. Annual heating cost in moderate zone 5 weather: roughly $700-$1,100 at $0.14/kWh. Compare to the CCASHP scenario below.",
      },
      {
        title: '1,500 sqft in zone 5 — same home with CCASHP equipment',
        location: 'Same zone 5 cities, electrification-focused replacement',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Same home, cold-climate certified equipment. Balance point drops from upper 20s°F to low teens°F per NEEP testing of CCASHP-listed models (Mitsubishi Hyper Heat, Daikin Aurora, Bosch IDS series, Trane XV20i, Lennox SL18XP1). Aux heat runtime drops 60-80 percent. CCASHP premium: $2,500-$4,500 over standard. Federal IRA 25C credit: $2,000. State/utility rebates: $500-$4,000 depending on jurisdiction. Annual heating savings: $200-$400 versus standard. Payback: 6-12 years depending on incentives.",
      },
      {
        title: '1,500 sqft in zone 6 — far north (CCASHP recommended)',
        location: 'Minneapolis, Milwaukee, Buffalo, Burlington, Spokane',
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
        takeaway:
          "Zone 6 heating-dominated: heating load roughly 1.6× cooling. CCASHP equipment is strongly recommended; standard heat pumps in this climate produce balance points high enough that aux heat runs for most of December through February. CCASHP shifts the balance point well below freezing — 1,500 sqft homes in zone 6 typically operate on the heat pump alone for 80 percent of heating-season hours. Variable-speed CCASHP equipment is the sweet spot here. Total installed cost: $9,500-$13,500.",
      },
      {
        title: '1,500 sqft in zone 7 — extreme cold (CCASHP required + dual-fuel option)',
        location: 'Northern Minnesota, mountain west, northern Vermont',
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
        takeaway:
          "Zone 7 design temperatures around -10°F. CCASHP equipment is required — standard heat pumps lose too much capacity at this design temperature. Even CCASHP equipment needs substantial aux heat capacity for the coldest design days. Dual-fuel architecture (heat pump + gas furnace) is a reasonable alternative where natural gas service is available; the heat pump handles cooling and shoulder seasons while the furnace handles deep cold. Grid capacity is a real consideration in zone 7 — many regions cannot support widespread heat pump adoption with electric resistance backup, making dual-fuel the grid-friendly choice.",
      },
      {
        title: 'Older 1,500 sqft home with poor envelope (zone 5)',
        location: 'Pre-1980 ranches, older mid-Atlantic and northern homes',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor insulation (R-7 walls, R-19 attic, U-1.0 windows, ACH50 around 14) drives heating load 30 percent higher. Equipment recommendation climbs to 3-ton; CCASHP becomes effectively mandatory because aux heat runtime at 3-ton standard equipment balance point would be impractical. Better approach: envelope retrofit first. Attic insulation top-off + air sealing + window storm panels reduces heating load 20-30 percent, allowing equipment to size down to 2.5-ton. Total project cost (envelope + heat pump) often within 15 percent of heat pump alone, with materially lower operating costs and better comfort.",
      },
      {
        title: '1,500 sqft new construction with IECC 2021 envelope (zone 5)',
        location: 'Newer suburban infill, accessory dwellings, retrofitted Passive House',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "New construction meeting IECC 2021 envelope (R-21 walls, R-60 attic, U-0.28 windows, ACH50 ≤ 3) drops heating load substantially. Equipment can size down to 2-ton CCASHP. At this load level, ductless mini-split systems often serve better than central — variable-speed mini-splits modulate down to 25 percent of rated capacity, matching the low base load of a tight envelope without short-cycling. Single-head ducted variable-speed mini-splits also work well in open-plan layouts. ENERGY STAR Most Efficient list has many qualifying options.",
      },
      {
        title: 'All-electric retrofit replacing oil furnace (zone 5+)',
        location: 'New England, upstate NY oil-heated homes',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Oil furnace replacement is one of the highest-ROI heat pump conversions. Oil heat at $4-5/gallon costs roughly $1,800-$2,500/year for a 1,500 sqft zone 5 home versus $700-$1,100 for CCASHP electric. State programs in NY (NYSERDA Clean Heat), MA (Mass Save), CT (Energize CT), VT (Efficiency Vermont) offer substantial rebates on top of the federal IRA credit. Some cover 50 percent of project cost for oil-replacement specifically. Total net cost after stacked incentives can be below oil furnace replacement.",
      },
      {
        title: 'Dual-fuel architecture for markets with cheap natural gas',
        location: 'Midwest, mid-Atlantic with low gas prices and high electric rates',
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
        takeaway:
          "Dual-fuel pairs a standard heat pump (handling cooling and shoulder-season heating) with a high-efficiency gas furnace (taking over below the economic crossover temperature, typically 30-35°F). Common in markets with cheap natural gas where electricity is expensive. Total installed cost: $10,000-$16,000. Operating cost optimized but capital cost high. Note: the IRA 25C tax credit and many state rebates favor all-electric installs over dual-fuel; check eligibility before specifying. NEEP CCASHP heat pumps with electric resistance aux are increasingly cost-competitive with dual-fuel after incentives.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 1,500 sq ft house?',
        a: 'A 2.5-ton (30,000 BTU) heat pump is the typical recommendation for a 1,500 sq ft home with average construction. Climate zone shifts this: zone 2 (Gulf Coast) typically needs 3 tons driven by cooling load; zone 4 (Mid-Atlantic) lands at 2.5 tons balanced; zones 5-6 lands at 2.5 tons heating-dominated; zone 7 needs 3+ tons with mandatory cold-climate equipment. Use the calculator above for a climate-specific answer.',
      },
      {
        q: 'Do I need a cold-climate heat pump in zone 5?',
        a: 'Cold-climate (NEEP CCASHP listed) equipment is recommended but not absolutely required in zone 5. Standard heat pumps work but produce a balance point in the high 20s°F, meaning aux heat fires frequently through winter — this raises operating costs. CCASHP equipment drops the balance point to the low teens°F and reduces aux heat runtime 60-80 percent. The CCASHP premium typically pays back in 6-12 years, often less with federal IRA and state/utility incentives stacked.',
      },
      {
        q: 'What is the balance point for a heat pump in a 1,500 sq ft home?',
        a: "The balance point is the outdoor temperature at which the heat pump's heating capacity equals the home's heating load — below this, aux heat must supplement. For a 1,500 sqft home with average envelope and a 2.5-ton standard heat pump in zone 5: balance point is in the upper 20s°F. With a 2.5-ton CCASHP heat pump: low teens°F. Better-insulated homes have lower balance points (less aux heat use); poorly-insulated homes have higher balance points (more aux heat use).",
      },
      {
        q: 'How much aux heat do I need for a 1,500 sq ft heat pump install?',
        a: 'Aux heat strip kits come in standard sizes (5kW, 10kW, 15kW, 20kW). For a 1,500 sqft home with a 2.5-ton heat pump, 10kW typically suffices to cover full heating load at design temperature for standard equipment; CCASHP equipment can often use 5-10kW because the heat pump maintains more capacity at low temperatures. Zone 7+ may need 15kW even with CCASHP.',
      },
      {
        q: 'How much does a heat pump for a 1,500 sq ft house cost in 2024?',
        a: 'Standard central heat pump: $5,500 to $8,500 installed. Cold-climate certified (CCASHP) equipment: $8,500 to $13,000 installed. Multi-zone ductless mini-split (3-4 zones): $11,000 to $15,000 installed. Federal IRA 25C tax credit returns up to $2,000 on qualifying installations; state and utility rebates add $500-$4,000 depending on jurisdiction. Net cost after incentives often within $1,000-$3,000 of like-for-like AC + furnace replacement.',
      },
      {
        q: 'Is a 2-ton heat pump enough for a 1,500 sq ft house?',
        a: '2 ton (24,000 BTU) is at the small end of acceptable for a 1,500 sqft home. It works if the envelope is good (R-19+ walls, R-49+ attic, U-0.35 windows, ACH50 ≤ 5) — typical of homes built post-2010 to current code, or thoroughly retrofitted older homes. For average-envelope older homes in zones 5+, 2.5-ton is the safer pick. 2-ton CCASHP equipment can work where 2-ton standard would not, because of better cold-weather capacity retention.',
      },
      {
        q: 'Should I replace my AC and furnace with one heat pump?',
        a: 'Increasingly the right call given Inflation Reduction Act incentives. A single heat pump replaces both AC and furnace functions, simplifies the system, and qualifies for federal tax credit. CCASHP equipment handles zone 5+ winters with manageable aux heat use. Caveats: if your gas furnace is new (under 5 years old), keeping it as dual-fuel backup makes economic sense. If your electrical service is at capacity, panel upgrade may be needed first.',
      },
      {
        q: 'How does climate zone affect heat pump sizing for a 1,500 sq ft house?',
        a: 'Per ASHRAE Standard 169-2020, heating design temperatures shift dramatically across zones: zone 4 around 15°F, zone 5 around 5°F, zone 6 around -2°F, zone 7 around -10°F. Same 1,500 sqft home: zone 4 needs 2.5 tons, zone 5 needs 2.5 tons, zone 6 needs 3 tons with CCASHP, zone 7 needs 3+ tons with CCASHP mandatory and dual-fuel optional. Heating load grows roughly 30 percent per zone above 4.',
      },
      {
        q: 'Will my heat pump work below zero?',
        a: 'CCASHP-listed heat pumps maintain useful heating capacity well below 0°F per NEEP testing protocols — about 50-70 percent of rated capacity at -5°F. Standard heat pumps drop to 25-35 percent at the same temperature. Both keep working at zone 5 design temperatures (around 5°F) and below; the difference is how much aux heat supplements them. Modern equipment does not just shut off in cold weather — that was older heat pump behavior from the 1980s-90s.',
      },
      {
        q: 'How long should a heat pump run per cycle?',
        a: 'A properly-sized heat pump runs in longer cycles than AC-only operation because heating demand is more sustained. Typical heating cycles: 30-90 minutes on cold days, often continuous on the coldest days. Variable-speed equipment runs continuously at modulated output for most of the heating season. Cycles shorter than 15 minutes indicate oversizing; cycles where the unit cannot maintain setpoint despite running continuously indicate undersizing or low refrigerant.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
  },
  {
    slug: '2000-sq-ft',
    title: 'Heat Pump Size for a 2,000 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 2,000 Sq Ft Home: 10 Worked Use Cases Across Climates',
    metaDescription:
      'Heat pump sizing for a 2,000 sq ft home — typical 3-4 bedroom houses. 10 use cases covering climate zones 2-7, CCASHP equipment, balance point, IRA incentives.',
    scenario:
      'A 2,000 square foot home typically pairs with a 3 to 3.5-ton heat pump.',
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
    intro:
      "Heat pump sizing for a 2,000 square foot home is the second-most-searched heat pump query after 1,500 sqft. This footprint represents the typical newer three-to-four bedroom single-family house — common across suburban developments built from the 1990s onward. The calculator recommends a 3 to 3.5-ton heat pump (36,000-42,000 BTU) for an average-envelope home in zone 5; this page walks through 10 use cases showing how climate, equipment class, envelope, and architecture shift the answer.",
    archetypes: [
      {
        title: 'Modern 3-4 BR ranch',
        era: '1990s-2010s',
        characteristics: [
          'R-13 walls, R-38 attic',
          'Double-pane low-E windows U-0.40 to U-0.55',
          'ACH50 typically 5-8',
          '200-amp electrical service',
        ],
        loadProfile: '~38,000 BTU heating load in zone 5',
      },
      {
        title: '2-story Colonial / Cape',
        era: '1990s-2000s',
        characteristics: [
          'More wall area per square foot than ranch',
          'Stack effect causes upstairs imbalance',
          'R-13 walls, R-38 attic typical',
          'Often benefits from zoning',
        ],
        loadProfile: '~40,000 BTU heating load in zone 5',
      },
      {
        title: '2010s+ new build (IECC code)',
        era: 'Post-2010',
        characteristics: [
          'R-19+ walls, R-49+ attic',
          'Low-E low-SHGC windows U-0.35 or below',
          'ACH50 typically 3-5',
          'Built for heat pump heating',
        ],
        loadProfile: '~30,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Standard heat pump',
        tagline: 'Lowest upfront cost',
        costRange: '$6,500–$9,500 installed',
        capacity17F: '60% of rated',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Zones 2–4, mild zone 5',
        pros: [
          'Wide model selection at 3 to 3.5-ton',
          'Lower upfront cost',
          'Compatible with existing ductwork',
        ],
        cons: [
          'Aux heat fires often in zone 5+',
          'Higher operating cost in cold climates',
        ],
      },
      {
        name: 'Cold-climate (NEEP CCASHP)',
        tagline: 'Best for cold climates',
        costRange: '$9,500–$14,000 installed',
        capacity17F: '85% of rated',
        balancePoint: 'Low teens°F (zone 5)',
        bestFor: 'Zones 5–7, all-electric homes',
        pros: [
          'Minimal aux heat use through winter',
          'Qualifies for $2,000 IRA 25C tax credit',
          'Strong state and utility rebates',
        ],
        cons: [
          '$3,000–$5,000 premium over standard',
          'Smaller model selection',
        ],
      },
      {
        name: 'Variable-speed multi-zone mini-split',
        tagline: 'Native zoning, no duct losses',
        costRange: '$13,000–$18,000 installed',
        capacity17F: '85-95% (variable-speed CCASHP)',
        balancePoint: 'Low teens to single digits°F',
        bestFor: '2-story homes, comfort priority',
        pros: [
          'Native zoning per indoor head',
          'No duct losses',
          'Best part-load efficiency',
        ],
        cons: [
          'Highest installed cost',
          'Indoor heads visible on walls',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: '3.5-ton standard',
        auxNotes: 'Minimal — cooling drives sizing',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: '3-ton standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: '3-ton standard or CCASHP',
        auxNotes: 'Occasional aux',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: '3 to 3.5-ton CCASHP recommended',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: '3.5-ton CCASHP',
        auxNotes: 'Moderate even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: '4-ton CCASHP + dual-fuel option',
        auxNotes: 'Significant',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~48,000 BTU',
        equipment: '4-ton CCASHP',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~38,000 BTU',
        equipment: '3 to 3.5-ton standard or CCASHP',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~30,000 BTU',
        equipment: '2.5 to 3-ton CCASHP',
      },
    },
    occupancyNotes:
      'For a 2,000 sqft home, occupancy contributes about 1,200 BTU/hr offset for a family of 4 versus 2 occupants. Lifestyle patterns matter more: heavy daytime cooking, home offices with multiple workstations, or other internal gain sources can add 3,000-6,000 BTU/hr of effective heating offset.',
    additionalConsiderations: [
      {
        title: 'Defrost cycle behavior',
        description:
          'Heat pumps periodically reverse to defrost the outdoor coil (3–10 min every 30–90 min in cold weather). CCASHP models defrost more efficiently per NEEP testing.',
        linkText: 'Read: heat pump defrost cycles',
        linkUrl: '/heat-pump/cold-climate/defrost-cycle/',
      },
      {
        title: 'Two-story stack effect',
        description:
          'Two-story 2,000 sqft homes commonly run 3-5°F temperature differential between floors with single-zone systems. Zoning (two thermostats, motorized dampers) or supplemental upstairs mini-split addresses the imbalance.',
        linkText: 'Read: Manual D return air sizing',
        linkUrl: '/manual-d/return-air-sizing/',
      },
    ],
    mistakes: [
      {
        title: 'Sizing to cooling load only',
        description:
          'A 2,000 sqft home in zone 5 has heating load ~1.3× cooling. Sizing to cooling alone leaves heating short, forcing aux to fire at 2-3× heat pump operating cost.',
      },
      {
        title: 'Skipping CCASHP question in zones 5+',
        description:
          'Standard 3.5-ton in zone 5 produces balance point in high 20s°F. CCASHP drops to teens°F, reducing aux runtime 60-80%. CCASHP premium pays back in 7-12 years.',
      },
      {
        title: 'Single-zone install on 2-story layouts',
        description:
          'Two-story 2,000 sqft homes run 3-5°F differential between floors with single-zone systems. Zoning costs $1,500-$3,000 more but delivers materially better comfort.',
      },
      {
        title: 'Electrical service capacity',
        description:
          'Heat pumps with aux strips can draw 60-100 amps in heating mode. 100-amp services often need upgrade ($1,500-$4,000) before installation. 200-amp services are typically fine.',
      },
      {
        title: 'Skipping Manual J for incentive applications',
        description:
          'IRA 25C tax credit and most state/utility rebates increasingly require Manual J load documentation. Get the calculation done by a certified contractor before assuming eligibility.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Early-planning evaluation of heat pump retrofit',
        'Comparing contractor quotes with varying tonnage',
        'Sanity check before committing to specific equipment',
        'Budget estimation for renovation projects',
      ],
      upgradeFor: [
        'IRA 25C tax credit applications',
        'State / utility rebate documentation (NYSERDA, Mass Save, etc.)',
        'Multi-zone install with multiple indoor heads or dampers',
        'After significant envelope retrofit',
        'Cold-climate installs for precise aux strip sizing',
      ],
    },
    scenarios: [
      {
        title: '2,000 sqft in zone 2 — Gulf Coast',
        location: 'Houston, NOLA, Tampa',
        inputs: {
          squareFootage: 2000,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Cooling-dominated climate. 3.5-ton standard heat pump handles cooling with good margin; heating load small. Variable-speed equipment is the better pick for long cooling seasons (1,500+ hours/year) with humidity control benefit.",
      },
      {
        title: '2,000 sqft in zone 4 — balanced load',
        location: 'DC, Cincinnati, St Louis',
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
        takeaway:
          "Zone 4 balanced case. 3-ton standard heat pump handles both loads with occasional aux. Either standard or CCASHP works; CCASHP slightly better for coldest weeks. IRA 25C credit qualifies for ENERGY STAR equipment.",
      },
      {
        title: '2,000 sqft in zone 5 — standard equipment',
        location: 'Cleveland, Indianapolis, Pittsburgh',
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
        takeaway:
          "Standard 3.5-ton in zone 5 works but expect aux runtime through winter. Heating load 1.3× cooling. Annual heating cost: $900-$1,300 at $0.14/kWh. CCASHP variant below saves $200-$400/year.",
      },
      {
        title: '2,000 sqft in zone 5 — CCASHP variant',
        location: 'Same zone 5 cities, electrification retrofits',
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
        takeaway:
          "Same home with CCASHP. Balance point drops from upper 20s°F to low teens°F. Aux runtime drops 60-80%. Premium $3,000-$5,000 over standard, IRA credit $2,000. Payback typically 7-12 years.",
      },
      {
        title: '2,000 sqft in zone 6 — CCASHP recommended',
        location: 'Minneapolis, Buffalo, Burlington',
        inputs: {
          squareFootage: 2000,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Zone 6 strongly heating-dominated at 1.6× cooling. CCASHP recommended. 3.5-ton CCASHP handles heating with moderate aux. Larger absolute energy savings vs standard equipment ($300-$500/year) shortens payback.",
      },
      {
        title: '2-story Colonial with zoning',
        location: '2-story homes built 1990s-2010s',
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
        takeaway:
          "Two-story layout benefits significantly from zoning. Single-zone 3.5-ton system runs 3-5°F differential between floors. Two-zone system (separate thermostats, motorized dampers) costs $1,500-$3,000 more but delivers materially better comfort. Multi-zone mini-split with 3 indoor heads is an alternative.",
      },
      {
        title: 'Older 2,000 sqft home with poor envelope',
        location: 'Pre-1980 mid-Atlantic and northern homes',
        inputs: {
          squareFootage: 2000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor insulation drives heating load 30% higher; equipment climbs to 4-ton CCASHP. Envelope retrofit (air sealing + attic top-off + window storm panels) reduces load 20-30%, allowing 3 to 3.5-ton equipment. Total project (envelope + heat pump) often within 15% of equipment-only cost with better long-term operating cost.",
      },
      {
        title: 'New construction 2,000 sqft with IECC 2021 envelope',
        location: 'Newer suburban developments',
        inputs: {
          squareFootage: 2000,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Modern envelope drops heating load 25%. 2.5 to 3-ton CCASHP suffices. At this load, variable-speed equipment matches load especially well, modulating from 25% capacity. Multi-zone ductless or ducted central both work; choice depends on layout.",
      },
      {
        title: 'All-electric retrofit (oil furnace replacement)',
        location: 'New England, upstate NY oil-heated homes',
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
        takeaway:
          "Oil at $4-5/gallon costs $2,500-$3,500/year for a 2,000 sqft zone 5 home. CCASHP costs $900-$1,300. Annual savings $1,200-$2,200. State oil-replacement programs (NYSERDA, Mass Save, Efficiency Vermont) cover 30-50% of project cost. Among highest-ROI heat pump conversions.",
      },
      {
        title: 'Dual-fuel architecture for cheap-gas markets',
        location: 'Midwest, mid-Atlantic with low gas prices',
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
        takeaway:
          "Standard heat pump + gas furnace for backup. Heat pump handles cooling and shoulder seasons; furnace below 30-35°F crossover. Total installed cost $12,000-$16,000. Operating cost optimized in cheap-gas regions. IRA tax credit and many state rebates favor all-electric; check eligibility before specifying.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 2,000 sq ft house?',
        a: 'A 3 to 3.5-ton (36,000-42,000 BTU) heat pump is the typical recommendation. Climate zone shifts this: zone 2 typically 3.5 ton driven by cooling; zone 4-5 lands at 3 to 3.5 ton; zone 6 needs 3.5 ton CCASHP; zone 7 needs 4-ton CCASHP. Well-insulated new construction can downsize to 2.5 to 3-ton CCASHP.',
      },
      {
        q: 'How much does a heat pump for a 2,000 sq ft house cost?',
        a: 'Standard central heat pump: $6,500-$9,500 installed. CCASHP equipment: $9,500-$14,000. Multi-zone mini-split: $13,000-$18,000. Federal IRA 25C tax credit returns up to $2,000; state/utility rebates add $500-$4,000.',
      },
      {
        q: 'Is a 3-ton or 3.5-ton heat pump better for 2,000 sq ft?',
        a: '3-ton works for well-insulated newer homes and zones 3-4. 3.5-ton is the right pick for average-envelope homes in zones 4-6 and standard for older homes. Variable-speed equipment tolerates the boundary better than single-stage. The half-ton difference shows up as more aux heat (if undersized) or short-cycling (if oversized).',
      },
      {
        q: 'Should I get cold-climate equipment for 2,000 sq ft in zone 5?',
        a: 'Recommended. Standard heat pumps produce balance point in high 20s°F in zone 5, with aux heat firing through January-February. CCASHP drops balance point to low teens°F, reducing aux runtime 60-80%. Annual savings $200-$400 vs standard equipment. Premium pays back in 7-12 years; less with IRA incentive.',
      },
      {
        q: 'Do I need zoning for a 2,000 sq ft heat pump?',
        a: 'Two-story 2,000 sqft homes benefit substantially from zoning. Single-zone systems run 3-5°F differential between floors. Two-zone system with separate thermostats and motorized dampers costs $1,500-$3,000 extra. Single-story 2,000 sqft homes usually do not need zoning.',
      },
      {
        q: 'How much aux heat for a 2,000 sq ft heat pump?',
        a: '10-15kW aux is typical for a 3 to 3.5-ton heat pump in zones 4-5. CCASHP equipment can often use 10kW even in zone 6. Zone 7+ may need 15kW even with CCASHP. Aux strips draw 40-60+ amps under full load, important for electrical service planning.',
      },
      {
        q: 'What is the balance point for a 3-ton heat pump in zone 5?',
        a: 'For a 2,000 sqft zone 5 home with a 3 to 3.5-ton standard heat pump and average envelope: balance point sits in the upper 20s°F. With CCASHP equipment: low teens°F. Above the balance point, the heat pump keeps up alone. Below, aux heat supplements.',
      },
      {
        q: 'Should I replace my AC + furnace with one heat pump for 2,000 sq ft?',
        a: 'In zones 3-5, increasingly the right call given IRA incentives. CCASHP handles zone 5 winters well. Caveats: if furnace is new (under 5 years), dual-fuel pairing keeps it useful. If electrical service is at capacity, panel upgrade may be needed. In zones 6-7, CCASHP or dual-fuel both reasonable architectures.',
      },
      {
        q: 'How does ceiling height affect heat pump sizing?',
        a: 'Per the calculator, 9-foot ceilings add 10% to load, 10-foot add 20%, and cathedral 12-foot add 30%. A 2,000 sqft home with cathedral great room ceilings effectively has the load of a 2,600 sqft home with 8-foot ceilings throughout. Matters for open-plan modern builds.',
      },
      {
        q: 'How long should the heat pump run per cycle?',
        a: 'Heating cycles: 30-90 minutes on cold days, often continuous on the coldest days. Cooling cycles: 15-30 minutes. Variable-speed equipment runs continuously at reduced output. Cycles under 15 minutes indicate oversizing; constant runtime without reaching setpoint indicates undersizing or maintenance issue.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
  },
  {
    slug: '2500-sq-ft',
    title: 'Heat Pump Size for a 2,500 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 2,500 Sq Ft Home: 4-Ton Equipment, Zoning, CCASHP',
    metaDescription:
      'Heat pump sizing for a 2,500 sq ft home — typical 4-bedroom houses and larger two-story builds. 10 use cases covering climate zones, CCASHP, zoning, IRA incentives.',
    scenario:
      'A 2,500 square foot home typically needs a 4-ton heat pump.',
    inputs: {
      squareFootage: 2500,
      climateZone: '5',
      ceilingHeight: '8',
      insulationLevel: 'average',
      sunExposure: 'mixed',
      occupants: 4,
      isKitchen: false,
      spaceType: 'living-room',
      coldClimateEquipment: false,
    },
    intro:
      "Heat pump sizing for a 2,500 square foot home covers the larger end of typical single-family houses — four-bedroom homes, larger two-story Colonials, and modern infill builds. At this size, zoning becomes especially important because temperature differentials across floors compound, and a single thermostat rarely delivers comfort to every room. The calculator recommends a 4-ton heat pump (48,000 BTU) for an average-envelope home in zone 5; this page walks through 10 use cases including zoning choices, multi-zone mini-splits, and IRA incentive strategies.",
    archetypes: [
      {
        title: 'Four-bedroom modern home',
        era: '1995-2015',
        characteristics: [
          'R-13 walls, R-38 to R-49 attic',
          'Double-pane low-E windows U-0.40',
          'ACH50 typically 5-7',
          '200-amp service standard',
        ],
        loadProfile: '~46,000 BTU heating load in zone 5',
      },
      {
        title: 'Two-story Colonial with bonus room',
        era: '1990s-2010s',
        characteristics: [
          'More wall area per square foot',
          'Bonus room above garage common',
          'Stack effect significant',
          'Often benefits from 2-zone system',
        ],
        loadProfile: '~48,000 BTU heating load in zone 5',
      },
      {
        title: '2010s+ new construction',
        era: 'Post-2010',
        characteristics: [
          'R-19 to R-21 walls, R-49 to R-60 attic',
          'Low-E low-SHGC windows U-0.32 or below',
          'ACH50 typically 3-5',
          '200-amp service common',
        ],
        loadProfile: '~38,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Standard heat pump',
        tagline: 'Lowest upfront cost',
        costRange: '$7,500–$11,000 installed',
        capacity17F: '60% of rated',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Zones 2–4, mild zone 5',
        pros: [
          'Lower upfront cost',
          'Wide 4-ton model selection',
          'Compatible with existing ductwork',
        ],
        cons: [
          'Aux heat fires often in zone 5+',
          'Single-stage equipment cycles on milder days',
        ],
      },
      {
        name: 'Cold-climate (NEEP CCASHP)',
        tagline: 'Best for cold climates',
        costRange: '$11,000–$16,000 installed',
        capacity17F: '85% of rated',
        balancePoint: 'Low teens°F (zone 5)',
        bestFor: 'Zones 5–7, all-electric homes',
        pros: [
          'Minimal aux heat use through winter',
          'Qualifies for $2,000 IRA 25C tax credit',
          'Variable-speed available at 4-ton size',
        ],
        cons: [
          '$3,500–$5,000 premium over standard',
          'Smaller installer pool',
        ],
      },
      {
        name: '2-zone central heat pump (motorized dampers)',
        tagline: 'Best for 2-story homes',
        costRange: '$10,500–$15,500 installed',
        capacity17F: 'Same as base equipment',
        balancePoint: 'Same as base equipment',
        bestFor: '2-story homes with floor-by-floor comfort needs',
        pros: [
          'Native temperature control per floor',
          'Eliminates 3-5°F floor differential',
          'Standard ducted equipment',
        ],
        cons: [
          '$1,500-$3,000 premium for zoning hardware',
          'Requires Manual D-compliant duct design',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: '4-ton standard',
        auxNotes: 'Minimal — cooling drives sizing',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: '3.5-ton standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: '4-ton standard or CCASHP',
        auxNotes: 'Occasional aux',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: '4-ton CCASHP recommended',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: '4 to 4.5-ton CCASHP',
        auxNotes: 'Moderate even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: '5-ton CCASHP + dual-fuel',
        auxNotes: 'Significant',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~60,000 BTU',
        equipment: '5-ton CCASHP',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~46,000 BTU',
        equipment: '4-ton standard or CCASHP',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~38,000 BTU',
        equipment: '3 to 3.5-ton CCASHP',
      },
    },
    occupancyNotes:
      'Occupancy effect is modest at 2,500 sqft — about 1,200 BTU/hr difference between 2 and 4 occupants. Larger effect from concentrated electrical use: server racks, dual ovens, large televisions, aquariums each add 1,000-4,000 BTU/hr of internal gain.',
    additionalConsiderations: [
      {
        title: 'Two-zone vs multi-zone trade-offs',
        description:
          'For 2,500 sqft 2-story homes, a 2-zone central system (one outdoor unit, motorized dampers, separate thermostats per floor) costs $10,500-$15,500. A multi-zone ductless mini-split (one outdoor, 4-5 indoor heads) costs $15,000-$20,000 with better individual room control but visible indoor units.',
        linkText: 'Read: Manual D return air sizing',
        linkUrl: '/manual-d/return-air-sizing/',
      },
      {
        title: 'Defrost behavior matters more in larger systems',
        description:
          'Larger heat pumps need longer defrost cycles in cold weather. CCASHP equipment manages defrost more efficiently per NEEP testing — important consideration in zones 5+ where defrost cycles are frequent.',
        linkText: 'Read: heat pump defrost cycles',
        linkUrl: '/heat-pump/cold-climate/defrost-cycle/',
      },
    ],
    mistakes: [
      {
        title: 'Single-zone install on 2-story 2,500 sqft homes',
        description:
          'Single-zone systems run 3-5°F differential between floors. Two-zone system costs $1,500-$3,000 more but delivers materially better comfort. At this house size the zoning premium pays back in comfort and HVAC longevity.',
      },
      {
        title: 'Skipping CCASHP in zones 5+',
        description:
          'Standard 4-ton in zone 5 produces balance point in high 20s°F, with frequent aux runtime. CCASHP drops to teens°F. Larger absolute savings at 2,500 sqft ($300-$500/year) shortens CCASHP payback.',
      },
      {
        title: 'Oversizing to 5-ton automatically',
        description:
          'Many older 2,500 sqft homes had 5-ton equipment installed using rule-of-thumb sizing. Current envelope (after typical updates) often supports 4-ton. Manual J before equipment selection avoids oversizing.',
      },
      {
        title: 'Electrical service capacity',
        description:
          'Heat pumps with 10-15kW aux strips draw 80-120 amps in heating mode. 200-amp service is needed; older 100-amp services require panel upgrade ($2,000-$4,000).',
      },
      {
        title: 'Skipping Manual J for incentives',
        description:
          'IRA 25C tax credit and most utility rebates require Manual J at this house size. Many rebates also require Manual S equipment selection documentation.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Early-planning evaluation of heat pump retrofit',
        'Comparing contractor quotes',
        'Budget estimation for larger-home replacement',
        'Sanity check before committing to specific equipment',
      ],
      upgradeFor: [
        'IRA 25C tax credit applications (effectively required at this scale)',
        'State / utility rebate documentation',
        'Multi-zone or zoned install',
        'After significant envelope retrofit',
        '2-story layouts where zoning is being considered',
      ],
    },
    scenarios: [
      {
        title: '2,500 sqft in zone 2 — Gulf Coast',
        location: 'Houston, NOLA, Tampa',
        inputs: {
          squareFootage: 2500,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Cooling-dominated. 4-ton standard heat pump handles large cooling load; heating load small. Variable-speed equipment strongly recommended at this size for humidity control in long cooling seasons. ENERGY STAR Most Efficient list has many qualifying options.",
      },
      {
        title: '2,500 sqft in zone 4 — balanced load',
        location: 'DC, Cincinnati, St Louis',
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
        takeaway:
          "Zone 4 balanced case. 4-ton standard heat pump handles both loads. Two-zone install recommended for 2-story layouts. IRA 25C credit qualifies for ENERGY STAR equipment.",
      },
      {
        title: '2,500 sqft in zone 5 — standard equipment',
        location: 'Cleveland, Indianapolis, Pittsburgh',
        inputs: {
          squareFootage: 2500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Standard 4-ton in zone 5 works but expect aux runtime through winter. Heating load 1.3× cooling. Annual heating cost: $1,100-$1,600 at $0.14/kWh. CCASHP variant below saves $300-$500/year — payback under 10 years with IRA credit.",
      },
      {
        title: '2,500 sqft in zone 5 — CCASHP variant',
        location: 'Same zone 5 cities, electrification retrofits',
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
        takeaway:
          "Same home with CCASHP. Balance point drops from upper 20s°F to low teens°F. Aux runtime drops 60-80%. Premium $3,500-$5,000 over standard, IRA credit $2,000. Annual savings $300-$500. Payback 6-10 years.",
      },
      {
        title: '2,500 sqft in zone 6 — CCASHP strongly recommended',
        location: 'Minneapolis, Buffalo, Burlington',
        inputs: {
          squareFootage: 2500,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Zone 6 strongly heating-dominated. CCASHP necessary. 4-ton CCASHP handles heating with moderate aux. Variable-speed CCASHP recommended at this size. Larger absolute savings shortens payback.",
      },
      {
        title: '2-story Colonial with bonus room (zone 5)',
        location: '2-story homes built 1990s-2010s',
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
        takeaway:
          "Two-story Colonial with bonus room above garage: single-zone systems struggle here. Bonus room runs 5-8°F hotter in summer, colder in winter. Two-zone system or supplemental mini-split for the bonus room ($2,500-$4,000) addresses the imbalance.",
      },
      {
        title: 'Older 2,500 sqft with poor envelope',
        location: 'Pre-1980 larger homes',
        inputs: {
          squareFootage: 2500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor envelope pushes equipment to 5-ton CCASHP. Envelope retrofit (air sealing + attic top-off + window upgrade) reduces load 25-30%, allowing 4-ton equipment. Total project cost similar to oversized equipment alone but with materially better comfort and operating cost.",
      },
      {
        title: 'New construction 2,500 sqft (IECC 2021)',
        location: 'Newer 4-BR suburban builds',
        inputs: {
          squareFootage: 2500,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Modern envelope drops heating load 20-25%. 3 to 3.5-ton CCASHP suffices. Multi-zone mini-split with 3-4 indoor heads is excellent at this load level — modulates capacity per room and avoids duct losses. ENERGY STAR Most Efficient list has many qualifying options.",
      },
      {
        title: 'Multi-zone mini-split (4 indoor heads)',
        location: '2-story homes with separated bedroom layouts',
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
        takeaway:
          "Multi-zone ductless mini-split (one outdoor + 4 indoor heads serving living/kitchen/2 bedroom zones) costs $15,000-$20,000 installed. Native per-room zoning, no duct losses, best part-load efficiency. Premium $4,000-$6,000 over zoned central but delivers superior room-by-room comfort.",
      },
      {
        title: 'Dual-fuel architecture for cheap-gas markets',
        location: 'Midwest, mid-Atlantic with low gas prices',
        inputs: {
          squareFootage: 2500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Standard 4-ton heat pump + gas furnace. Heat pump handles cooling and shoulder seasons; furnace below 30-35°F crossover. Total installed cost $14,000-$18,000. Optimized operating cost in cheap-gas regions. IRA 25C and most state rebates favor all-electric; check eligibility.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 2,500 sq ft house?',
        a: 'A 4-ton (48,000 BTU) heat pump is the typical recommendation for an average-envelope 2,500 sqft home. Climate zone shifts this: zone 2 typically 4 ton driven by cooling; zone 4-5 lands at 4 ton; zone 6 needs 4 to 4.5 ton CCASHP; zone 7 needs 5-ton CCASHP. Well-insulated new construction can downsize to 3 to 3.5-ton CCASHP.',
      },
      {
        q: 'How much does a heat pump for a 2,500 sq ft house cost?',
        a: 'Standard central heat pump: $7,500-$11,000 installed. CCASHP: $11,000-$16,000. Zoned central system: $10,500-$15,500. Multi-zone ductless mini-split: $15,000-$20,000. Federal IRA 25C tax credit: up to $2,000. State/utility rebates: $500-$5,000+.',
      },
      {
        q: 'Do I need zoning for a 2,500 sq ft heat pump?',
        a: 'For 2-story 2,500 sqft homes, zoning is strongly recommended. Single-zone systems run 3-5°F differential between floors, often worse in homes with bonus rooms above garages. Two-zone central system costs $1,500-$3,000 more than single-zone. Multi-zone ductless is an alternative with native per-room control.',
      },
      {
        q: 'Should I get cold-climate equipment for 2,500 sq ft in zone 5?',
        a: 'Strongly recommended at this house size. Standard heat pumps produce balance point in high 20s°F, with frequent aux runtime. CCASHP drops balance point to low teens°F. Larger absolute savings ($300-$500/year vs $150-$250 for smaller homes) shortens CCASHP payback to 6-10 years.',
      },
      {
        q: 'What aux heat strip size for a 2,500 sq ft heat pump?',
        a: '15kW aux is typical for a 4-ton heat pump in zones 4-5. CCASHP equipment can often use 10-15kW even in zone 6. Zone 7+ may need 15-20kW. Aux strips at 15kW draw 60+ amps under full load; requires 200-amp electrical service.',
      },
      {
        q: 'Single ducted system or multi-zone mini-split for 2,500 sq ft?',
        a: 'Single ducted central is the conventional answer — uses existing ductwork, simpler install. Multi-zone mini-split (4 heads) provides better per-room comfort and avoids duct losses; costs $4,000-$6,000 more. For 2-story homes with bonus rooms or separated bedrooms, multi-zone mini-split often justifies the premium.',
      },
      {
        q: 'What is the balance point for a 4-ton heat pump in zone 5?',
        a: 'For a 2,500 sqft zone 5 home with a 4-ton standard heat pump and average envelope: balance point sits in the upper 20s°F. With CCASHP equipment: low teens°F. Above balance point, heat pump alone keeps up. Below, aux supplements.',
      },
      {
        q: 'Should I replace my AC + furnace with one 4-ton heat pump?',
        a: 'In zones 3-6, increasingly the right call given IRA incentives at this house size. The $2,000 federal credit plus state/utility rebates often makes the heat pump cost comparable to like-for-like AC+furnace replacement. CCASHP handles zone 5+ winters. Dual-fuel remains reasonable in markets with very cheap natural gas.',
      },
      {
        q: 'How does ceiling height affect heat pump sizing?',
        a: 'Per the calculator, 9-foot ceilings add 10% to load, 10-foot add 20%, cathedral 12-foot add 30%. A 2,500 sqft home with cathedral great room ceilings effectively has the load of a 3,250 sqft home with 8-foot ceilings. Common in modern open-plan builds.',
      },
      {
        q: 'How long should a 4-ton heat pump run per cycle?',
        a: 'Heating cycles: 30-90 minutes on cold days, often continuous on coldest days. Cooling cycles: 15-30 minutes. Variable-speed equipment runs continuously at reduced output. Short cycles (under 15 min) indicate oversizing; constant runtime without setpoint indicates undersizing or maintenance issue.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
  },
  {
    slug: '3000-sq-ft',
    title: 'Heat Pump Size for a 3,000 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 3,000 Sq Ft Home: 5-Ton or Multi-Zone Equipment',
    metaDescription:
      'Heat pump sizing for a 3,000 sq ft home — large single-family houses. 10 use cases covering single 5-ton vs dual systems, CCASHP, zoning, IRA incentives.',
    scenario:
      'A 3,000 square foot home typically calls for a 5-ton heat pump or a dual-system install.',
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
    intro:
      "Heat pump sizing for a 3,000 square foot home is the threshold above which a single residential heat pump (max standard 5-ton) is the upper edge of feasible single-equipment sizing. At this size, two installation strategies dominate: a single 5-ton system serving the whole home (lowest cost), or a dual-system install with separate equipment for upstairs and downstairs (best comfort). The calculator recommends a 5-ton heat pump (60,000 BTU) for an average-envelope home in zone 5; this page walks through 10 use cases including dual-system strategies, multi-zone mini-split alternatives, and IRA incentive considerations at this scale.",
    archetypes: [
      {
        title: 'Large 4-5 BR family home',
        era: '1995-2015',
        characteristics: [
          'R-13 walls, R-38 to R-49 attic',
          'Double-pane low-E windows U-0.40',
          'ACH50 typically 5-7',
          '200-amp service standard',
        ],
        loadProfile: '~57,000 BTU heating load in zone 5',
      },
      {
        title: '2-story Colonial with finished basement',
        era: '1990s-2010s',
        characteristics: [
          'Three conditioned levels (basement + 1st + 2nd)',
          'Significant stack effect',
          'Often benefits from 3-zone system',
          'Basement at ground temp, milder load',
        ],
        loadProfile: '~60,000 BTU heating load in zone 5',
      },
      {
        title: '2010s+ luxury new build',
        era: 'Post-2010',
        characteristics: [
          'R-21+ walls, R-60 attic',
          'High-performance windows U-0.28 or below',
          'ACH50 typically 3 or below',
          'Often built for zoned heat pump from start',
        ],
        loadProfile: '~46,000 BTU heating load in zone 5',
      },
    ],
    equipmentOptions: [
      {
        name: 'Single 5-ton central',
        tagline: 'Lowest upfront cost',
        costRange: '$8,500–$13,000 installed',
        capacity17F: '60% of rated (standard)',
        balancePoint: 'High 20s°F (zone 5)',
        bestFor: 'Single-story or open-plan layouts',
        pros: [
          'Lowest upfront cost',
          'One outdoor unit, simpler maintenance',
          'Compatible with existing ductwork',
        ],
        cons: [
          'Single-zone struggles with 3,000 sqft comfort',
          'At upper edge of residential equipment sizing',
        ],
      },
      {
        name: 'Dual-system (2x 2.5-3 ton)',
        tagline: 'Best comfort',
        costRange: '$15,000–$22,000 installed',
        capacity17F: 'Depends on equipment class',
        balancePoint: 'Same as base equipment',
        bestFor: '2-story homes, comfort priority',
        pros: [
          'Native floor-by-floor control',
          'Redundancy if one system fails',
          'Smaller equipment runs at better efficiency',
        ],
        cons: [
          'Highest upfront cost',
          'Two outdoor units, double maintenance',
        ],
      },
      {
        name: 'Multi-zone mini-split (5-6 heads)',
        tagline: 'Best zoning, no ducts',
        costRange: '$18,000–$25,000 installed',
        capacity17F: '85-95% (variable-speed CCASHP)',
        balancePoint: 'Low teens°F (CCASHP)',
        bestFor: 'No existing ductwork, room-by-room control',
        pros: [
          'Native zoning per indoor head',
          'No duct losses',
          'Best part-load efficiency',
        ],
        cons: [
          'Highest cost',
          'Indoor heads visible on walls',
        ],
      },
    ],
    climateTable: [
      {
        zone: 'Zone 2',
        cities: 'Houston, New Orleans, Tampa',
        designTemp: '30°F',
        loadRatio: '0.5×',
        equipment: '5-ton standard',
        auxNotes: 'Minimal — cooling drives',
      },
      {
        zone: 'Zone 3',
        cities: 'Atlanta, Memphis, Charlotte',
        designTemp: '22°F',
        loadRatio: '0.7×',
        equipment: '4.5-ton standard',
        auxNotes: 'Low aux runtime',
      },
      {
        zone: 'Zone 4',
        cities: 'DC, Cincinnati, St Louis',
        designTemp: '15°F',
        loadRatio: '1.0×',
        equipment: '5-ton standard or CCASHP',
        auxNotes: 'Occasional aux',
      },
      {
        zone: 'Zone 5',
        cities: 'Cleveland, Boston, Denver',
        designTemp: '5°F',
        loadRatio: '1.3×',
        equipment: '5-ton CCASHP or dual-system',
        auxNotes: 'Frequent (standard) / Rare (CCASHP)',
      },
      {
        zone: 'Zone 6',
        cities: 'Minneapolis, Buffalo, Burlington',
        designTemp: '-2°F',
        loadRatio: '1.6×',
        equipment: 'Dual CCASHP recommended',
        auxNotes: 'Significant even with CCASHP',
      },
      {
        zone: 'Zone 7',
        cities: 'N Minnesota, mountain west',
        designTemp: '-10°F',
        loadRatio: '1.9×',
        equipment: 'Dual-fuel or dual CCASHP',
        auxNotes: 'Substantial',
      },
    ],
    insulationLevels: {
      poor: {
        label: 'Poor envelope (pre-1980)',
        envelope: 'R-7 walls, R-19 attic, U-1.0 windows, ACH50 ~14',
        heatingLoad: '~74,000 BTU',
        equipment: 'Dual 3-ton CCASHP (oversized for single)',
      },
      average: {
        label: 'Average envelope (current code)',
        envelope: 'R-13 walls, R-38 attic, U-0.55 windows, ACH50 ~7',
        heatingLoad: '~57,000 BTU',
        equipment: '5-ton CCASHP or dual 2.5-3 ton',
      },
      good: {
        label: 'Good envelope (above code / 2010s+)',
        envelope: 'R-19 walls, R-49 attic, U-0.35 windows, ACH50 ~5',
        heatingLoad: '~46,000 BTU',
        equipment: '4-ton CCASHP',
      },
    },
    occupancyNotes:
      'At 3,000 sqft, occupancy effect is modest — about 1,800 BTU/hr offset for a family of 5 vs 2 occupants. Concentrated electrical loads matter more: home offices with multiple workstations, restaurant-grade kitchens, server racks for home businesses each add 3,000-8,000 BTU/hr of internal gain.',
    additionalConsiderations: [
      {
        title: 'Dual-system vs single-system trade-offs',
        description:
          'A dual-system install ($15,000-$22,000) costs $5,000-$10,000 more than a single 5-ton ($8,500-$13,000) but delivers materially better comfort in 2-story layouts. Two smaller systems also run at better individual efficiency than one oversized system, partially offsetting the cost difference through lower operating cost.',
        linkText: 'Read: Manual D return air sizing',
        linkUrl: '/manual-d/return-air-sizing/',
      },
      {
        title: 'Electrical service planning',
        description:
          'Dual heat pump systems with 15kW aux each can draw 150+ amps in heating mode at design conditions. 200-amp service may need supplementation by load management technology or upgrade to 320-amp service. Cost: $3,000-$5,000 for service upgrade.',
        linkText: 'Read: heat pump aux heat',
        linkUrl: '/heat-pump/aux-heat/',
      },
    ],
    mistakes: [
      {
        title: 'Single 5-ton on 2-story 3,000 sqft homes',
        description:
          'Single-zone 5-ton systems struggle with 3,000 sqft 2-story comfort — typical 4-7°F differential between floors. Dual-system install or supplemental upstairs equipment delivers materially better comfort.',
      },
      {
        title: 'Skipping CCASHP in zones 5+',
        description:
          'Standard 5-ton in zone 5 produces balance point in high 20s°F, with significant aux runtime. CCASHP drops balance point to teens°F. Larger absolute savings at this scale ($400-$700/year) shortens CCASHP payback.',
      },
      {
        title: 'Electrical service oversight',
        description:
          'Heat pumps with 15-20kW aux strips can draw 80-100+ amps continuously. Older 100-amp services typically need upgrade ($2,000-$4,000) before installation; 200-amp services may need careful aux sizing.',
      },
      {
        title: 'Skipping Manual J at this scale',
        description:
          'IRA 25C tax credit, most state rebates, and utility programs require Manual J at this house size. Manual S equipment selection documentation often also required for highest-tier incentives.',
      },
      {
        title: 'Not running dual-fuel analysis',
        description:
          'In zones 6-7 with cheap natural gas access, dual-fuel architecture may outperform all-electric on lifetime operating cost. Analysis requires actual gas and electric rates for the location.',
      },
    ],
    upgradeDecision: {
      useThisFor: [
        'Early-planning evaluation for larger-home retrofit',
        'Comparing contractor quotes (often vary significantly at this scale)',
        'Budget estimation',
        'Sanity check on contractor sizing',
      ],
      upgradeFor: [
        'IRA 25C tax credit applications (effectively required)',
        'State / utility rebate documentation',
        'Dual-system or multi-zone install configuration',
        'After significant envelope retrofit',
        'Electrical service capacity planning',
      ],
    },
    scenarios: [
      {
        title: '3,000 sqft in zone 2 — Gulf Coast',
        location: 'Houston, NOLA, Tampa, Orlando',
        inputs: {
          squareFootage: 3000,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Cooling-dominated. 5-ton standard or dual-system. Variable-speed equipment strongly recommended at this scale for humidity control. Dual-system (2x 2.5-3 ton) may outperform single 5-ton on comfort and efficiency.",
      },
      {
        title: '3,000 sqft in zone 4 — balanced load',
        location: 'DC, Cincinnati, St Louis',
        inputs: {
          squareFootage: 3000,
          climateZone: '4',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Zone 4 balanced case. 5-ton standard or dual-system. Two-story layouts strongly benefit from dual-system or zoned approach. IRA 25C credit applies.",
      },
      {
        title: '3,000 sqft in zone 5 — single 5-ton standard',
        location: 'Cleveland, Indianapolis, Pittsburgh',
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
        takeaway:
          "Single 5-ton standard at the upper edge of residential equipment. Works but expect significant aux runtime in zone 5 winter. Heating load 1.3× cooling. Annual heating cost: $1,400-$2,000 at $0.14/kWh. CCASHP or dual-system variants below provide better long-term economics.",
      },
      {
        title: '3,000 sqft in zone 5 — CCASHP equipment',
        location: 'Same zone 5 cities, electrification retrofits',
        inputs: {
          squareFootage: 3000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "5-ton CCASHP. Balance point drops to low teens°F. Aux runtime drops 60-80%. Premium $4,500-$6,500 over standard, IRA credit $2,000. Annual savings $400-$700. Payback 6-10 years. Variable-speed CCASHP recommended for part-load efficiency.",
      },
      {
        title: 'Dual-system install (2x 2.5-3 ton) zone 5',
        location: '2-story 3,000 sqft homes',
        inputs: {
          squareFootage: 3000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Two separate systems (e.g., 3-ton serving upstairs + 2.5-ton serving downstairs) deliver materially better comfort than single 5-ton. Each smaller system runs at better efficiency. Total installed cost $15,000-$22,000 vs $11,000-$16,000 for single CCASHP, but operating cost savings and comfort justify premium in 2-story homes.",
      },
      {
        title: '3,000 sqft in zone 6 — dual CCASHP recommended',
        location: 'Minneapolis, Buffalo, Burlington',
        inputs: {
          squareFootage: 3000,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Zone 6 strongly heating-dominated. Single 5-ton CCASHP marginal at design conditions; dual-system (3-ton + 2.5-ton CCASHP each) provides better margin and redundancy. Annual operating cost optimized through right-sized smaller systems.",
      },
      {
        title: 'Older 3,000 sqft with poor envelope',
        location: 'Pre-1980 larger homes',
        inputs: {
          squareFootage: 3000,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Poor envelope drives heating load to ~74,000 BTU — exceeds single 5-ton capacity. Either upsize to dual-system or sequence envelope retrofit before equipment. Envelope retrofit typically drops load 25-30%, allowing single 5-ton CCASHP. Strongly recommended sequence.",
      },
      {
        title: 'New construction 3,000 sqft (IECC 2021)',
        location: 'Newer larger suburban builds',
        inputs: {
          squareFootage: 3000,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Modern envelope drops load 20-25%. 4-ton CCASHP suffices. Multi-zone mini-split (5-6 heads) is excellent at this load — modulates capacity per room, no duct losses, native zoning. Costs $18,000-$25,000 but delivers superior comfort and lowest operating cost.",
      },
      {
        title: 'Multi-zone mini-split (6 heads) for large open-plan',
        location: 'Modern luxury homes, ductless conversions',
        inputs: {
          squareFootage: 3000,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Multi-zone ductless system (one outdoor + 5-6 indoor heads) serves large open-plan or modern layouts well. Native per-room control. Total installed cost $18,000-$25,000. For homes without existing ductwork, this avoids the $5,000+ ductwork installation cost typical of ducted central retrofits.",
      },
      {
        title: 'Dual-fuel architecture in zone 6 cheap-gas market',
        location: 'Midwest, mountain west with low gas prices',
        inputs: {
          squareFootage: 3000,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 5,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: false,
        },
        takeaway:
          "Standard 5-ton heat pump + gas furnace for deep cold. Heat pump handles cooling and shoulder-season heating; furnace below 30-35°F crossover. Total installed cost $16,000-$22,000. Optimized operating cost in cheap-gas regions. IRA tax credit and most state rebates favor all-electric; check eligibility carefully.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 3,000 sq ft house?',
        a: 'A 5-ton (60,000 BTU) heat pump is the typical recommendation for an average-envelope 3,000 sqft home. Climate zone shifts this: zone 2 typically 5 ton driven by cooling; zone 4-5 lands at 5 ton; zone 6+ often calls for dual-system architecture; zone 7 dual-system or dual-fuel. Well-insulated new construction can downsize to 4-ton CCASHP.',
      },
      {
        q: 'Can a single heat pump cool 3,000 sq ft?',
        a: 'Yes — a 5-ton single heat pump can cool 3,000 sqft with average envelope. But comfort suffers in 2-story layouts (3-5°F floor differential typical). For 2-story homes at this size, dual-system or zoned installations deliver materially better comfort. Single-story homes can work fine with a single 5-ton.',
      },
      {
        q: 'How much does a heat pump for a 3,000 sq ft house cost?',
        a: 'Single 5-ton central: $8,500-$13,000 installed. Single 5-ton CCASHP: $11,000-$16,000. Dual-system: $15,000-$22,000. Multi-zone ductless mini-split: $18,000-$25,000. Federal IRA 25C credit: up to $2,000. State/utility rebates: $1,000-$8,000+.',
      },
      {
        q: 'Should I use one or two heat pump systems for 3,000 sq ft?',
        a: 'Single 5-ton: cheapest, works for single-story or open-plan layouts. Dual-system: best comfort for 2-story layouts, more expensive but smaller systems run at better efficiency. Multi-zone mini-split: best for room-by-room control, no duct losses, highest cost. Decision depends on layout, budget, and comfort priority.',
      },
      {
        q: 'Do I need cold-climate equipment for 3,000 sq ft in zone 5?',
        a: 'Strongly recommended at this scale. Larger homes have larger absolute energy savings from CCASHP ($400-$700/year vs $200-$400 for smaller homes), shortening payback to 6-10 years. The IRA tax credit also makes CCASHP near-zero net premium in many markets.',
      },
      {
        q: 'What aux heat strip size for a 3,000 sq ft heat pump?',
        a: '15-20kW aux is typical for a 5-ton heat pump in zones 4-5. Dual-system installs can use smaller aux per system. CCASHP equipment can often use 15kW even in zone 6. Aux strips at 20kW draw 80+ amps under full load; requires 200-amp service.',
      },
      {
        q: 'Can my 200-amp electrical service handle a heat pump for 3,000 sq ft?',
        a: 'Usually yes with CCASHP equipment and properly-sized aux strips (under 15kW). Aggressive aux sizing (20kW) plus other electric loads (EV charger, electric water heater, range) can exceed 200-amp service capacity. Load management technology or service upgrade to 320-amp may be needed.',
      },
      {
        q: 'What is the balance point for a 5-ton heat pump in zone 5?',
        a: 'For a 3,000 sqft zone 5 home with a 5-ton standard heat pump and average envelope: balance point sits in the upper 20s°F. With CCASHP equipment: low teens°F. Dual-system installs have the same per-system balance point but the smaller equipment per zone allows better part-load operation.',
      },
      {
        q: 'Does ceiling height affect heat pump sizing for large homes?',
        a: 'Yes — common in 3,000 sqft modern builds with great rooms. 9-foot ceilings add 10% to load, 10-foot add 20%, cathedral 12-foot add 30%. A 3,000 sqft home with 12-foot great room ceilings effectively has the load of a 3,900 sqft home with 8-foot ceilings throughout.',
      },
      {
        q: 'How long should a 5-ton heat pump run per cycle?',
        a: 'Heating cycles: 30-90 minutes on cold days, often continuous on coldest days. Cooling cycles: 15-30 minutes. Variable-speed equipment runs continuously at reduced output. Dual-system installs may have different cycle behavior per system depending on zone load.',
      },
    ],
    sourceIds: [
      'energy-star-room-ac',
      'energy-star-central-ac-buying',
      'doe-central-ac',
      'doe-sizing',
      'doe-building-america',
      'acca-manual-j-8',
      'acca-manual-s',
      'us-census-acs-housing',
      'nrel-resstock',
      'doe-seer2-rule',
      'ahri-210-240',
      'ashrae-169',
      'neep-ccashp',
      'lbnl-air-leakage',
      'bpi-1200',
    ],
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
      return { example: e, score: sqftDiff };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, count)
    .map((s) => s.example);
}
