import type { BtuInputs } from '@/lib/calculators/btu';
import type { FaqItem } from '@/components/seo/types';

export interface AcSizeScenarioEntry {
  title: string;
  location: string;
  inputs: BtuInputs;
  takeaway: string;
}

export interface AcSizeExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: BtuInputs;
  intro?: string;
  houseContext?: string;
  equipmentNotes?: string;
  climateVariation?: string;
  insulationImpact?: string;
  occupancyImpact?: string;
  realWorldNotes?: string;
  commonMistakes?: string;
  whenToUpgrade?: string;
  scenarios?: AcSizeScenarioEntry[];
  faq?: FaqItem[];
  sourceIds?: readonly string[];
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
    metaTitle: 'AC Size for 1,500 Sq Ft House: Equipment Selection, Tonnage, and Cost',
    metaDescription:
      'What size AC for a 1,500 sq ft house? 2.5 to 3 tons central AC for zone 4. Worked equipment decisions across 10 scenarios — replacement, heat pump conversion, mini-split, variable-speed selection.',
    scenario:
      'A 1,500 square foot home — the US median single-family house size — usually pairs with a 2.5 to 3-ton (30,000 to 36,000 BTU) central AC.',
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
    intro:
      "The 1,500 square foot house is the most-searched home size for AC sizing decisions because it sits at the US median per the Census American Community Survey. The calculator above recommends 2.5 to 3 tons (30,000 to 36,000 BTU) of central AC for a typical 1,500 sqft home in climate zone 4. This page focuses on the equipment decision: which class to pick, which efficiency tier, single-stage versus variable-speed, central versus mini-split. For the underlying methodology and BTU-number framing, see the BTU calculator's 1,500 sqft page; for permit-grade load calculation, see the Manual J calculator. The 10 worked equipment-decision scenarios below cover the most common situations a homeowner faces when replacing or installing AC at this house size.",
    houseContext:
      "Most 1,500 sqft AC installations fall into three replacement contexts. The first is like-for-like replacement: the existing central AC is end-of-life (typically 15 to 20 years old) and gets swapped for similar equipment. This represents about 60 percent of 1,500 sqft AC installations per industry data. The second is a system overhaul: the existing AC plus furnace get replaced together, often with a heat pump as the consolidated alternative, accelerated by Inflation Reduction Act tax credits and utility heat pump rebates. The third is a first install — newer construction or older homes that previously relied on window units. Each context calls for slightly different equipment evaluation. The first focuses on capacity matching and efficiency upgrade; the second on AC versus heat pump comparison; the third on system architecture (central versus ductless) and sizing from scratch.",
    equipmentNotes:
      "Equipment options at 30,000 to 36,000 BTU split into four practical categories. Central single-stage AC (15.2 to 16 SEER2): the lowest-cost option, $4,500 to $6,500 installed depending on region per industry pricing data. Handles whole-house cooling adequately but cycles on and off; humidity control is acceptable but not exceptional. Central two-stage AC (16 to 18 SEER2): modulates between low and high capacity, runs longer at low stage, better humidity control. About $5,500 to $8,000 installed. Central variable-speed (inverter) AC (18 to 22 SEER2): continuous modulation, best humidity control and efficiency, longest runtimes at lower output. $7,500 to $10,500 installed; ENERGY STAR Most Efficient list almost entirely consists of this category. Multi-zone ductless mini-split (single outdoor unit, 2 to 3 indoor heads): no duct losses, native zoning, $9,000 to $14,000 installed for whole-house coverage. Per AHRI's directory of certified equipment, the 30,000 to 36,000 BTU range has hundreds of listed models across all four categories — selection within tier comes down to brand preference, installer experience, and warranty terms (12 years parts is typical, some manufacturers offer 12 years parts plus 10 years compressor for the variable-speed line).",
    climateVariation:
      "The 1,500 sqft figure determines a range of acceptable tonnage; climate zone determines where in that range to land. Hot-humid zones (1 and 2 — south Florida, Gulf Coast, Hawaii) need 3 tons minimum for a 1,500 sqft home with average construction; latent load (humidity removal) drives equipment selection upward and favors variable-speed equipment for better humidity control at part-load. Hot-dry zones (2B and 3B — Phoenix, Las Vegas, El Paso) also need 3 tons but the latent fraction is smaller, so single-stage equipment performs acceptably and the variable-speed premium is harder to justify on pure performance. Mixed-humid zones (3A, 4A — Atlanta, DC, Richmond) typically size at 2.5 tons, the most common installation size. Mixed-dry zones (4B, 5B — Denver, Salt Lake City) often size at 2 to 2.5 tons because the cooling design temperature is lower. Cold zones (5A through 7 — Chicago, Minneapolis, Burlington) typically pair 2-ton AC with a heat pump or furnace for heating; in these climates, the heat pump's cooling capacity may dictate equipment size, not the AC sizing alone. Per ASHRAE Standard 169-2020, design temperatures used in these calculations are the 1 percent cooling and 99 percent heating values, meaning the equipment is sized to handle the hottest 88 hours per year.",
    insulationImpact:
      "Insulation quality shifts the AC size recommendation by ±20 percent at 1,500 sqft. A home with poor insulation in zone 4 — pre-1980 construction with R-7 walls, R-19 attic, single-pane U-1.0 windows, and ACH50 around 14 — pushes the recommendation to 3.5 tons (42,000 BTU). A home with good insulation in zone 4 — 2010s+ construction with R-19 walls, R-49 attic, U-0.35 windows, and ACH50 of 5 — drops to 2 to 2.5 tons (24,000 to 30,000 BTU). The pre-equipment-purchase question is whether to upgrade the envelope first: per LBNL research on residential air leakage and DOE Building America envelope retrofit studies, a $3,000 to $6,000 air sealing plus attic insulation top-off package returns equivalent comfort to a half-ton equipment upsize at lower lifetime energy cost. For older homes considering both upgrades in the same project, sequence matters: do the envelope work first, then size AC against the post-retrofit load. BPI-certified energy auditors run this analysis routinely and the audit cost is often covered by utility programs.",
    occupancyImpact:
      "The calculator adds 600 BTU per occupant above 2 — a Manual J convention for sensible plus latent occupant gain. For a 1,500 sqft home, the net effect of occupancy on AC sizing is modest: a family of 4 adds 1,200 BTU versus a 2-person household (about 4 percent of total load), a family of 6 adds 2,400 BTU. Lifestyle patterns matter more than headcount. A household that cooks elaborate meals daily, runs home-office equipment with multiple monitors and a desktop, or maintains aquariums larger than 50 gallons can add 3,000 to 6,000 BTU of internal gain — equivalent to a quarter to half a ton of equipment. Empty-nester transitions are the most common case where AC equipment becomes oversized: when children move out, an existing 3-ton system in a 1,500 sqft home often short-cycles for years before replacement. The replacement equipment should be sized for the new load, not matched to the old equipment.",
    realWorldNotes:
      "The calculator captures the major variables but misses several real-world factors that materially affect equipment selection. Ductwork condition tops the list: per DOE Building America research, leaky or poorly-insulated attic ductwork can lose 20 to 30 percent of delivered cooling capacity to unconditioned space. A 3-ton AC connected to leaky ducts effectively delivers 2 to 2.5 tons of cooling to the conditioned space. Manual D-compliant duct sealing typically returns 0.5 to 0.75 ton of effective capacity, allowing equipment downsizing on replacement. Window orientation is the second factor: a home with predominantly west-facing glass sees peak cooling loads 25 to 40 percent higher than the same home with north-facing glass at the same window area, per ACCA Manual J 8th Edition Appendix 3. The calculator's mixed-sun assumption averages these orientations. Specific equipment in the home matters too — server racks, dual ovens, multiple aquariums, and large televisions each contribute 1,000 to 4,000 BTU of internal gain that the calculator does not model. For homes with any of these unusual loads, add equipment-specific BTU values to the calculator output before equipment selection.",
    commonMistakes:
      "Six recurring mistakes show up in 1,500 sqft AC installations. First: oversizing 'to be safe.' An AC sized 25 percent above load short-cycles, controls humidity poorly, and costs more without delivering better comfort — the DOE explicitly identifies oversizing as a top-three residential AC problem. Second: matching the new AC to the old AC's nameplate without checking. Older equipment may have been oversized at install or have lost effective capacity over its lifespan; the right replacement size is whatever the current load calculation says. Third: ignoring envelope improvements made over the years. New windows, attic insulation top-off, air sealing — these accumulate and a current-load Manual J typically returns a smaller equipment size than the original AC. Fourth: assuming variable-speed AC saves money in moderate climates. The premium for variable-speed equipment over single-stage runs $2,000 to $4,000; payback in mild zone 4 or 5 climates with seasonal cooling under 1,000 hours per year can exceed equipment lifetime. Variable-speed makes more sense in zones 1 to 3 with high cooling runtimes. Fifth: skipping the duct evaluation. A new AC connected to leaky 25-year-old ducts delivers a fraction of its rated capacity. Always pair AC replacement with duct inspection. Sixth: not checking refrigerant compatibility with existing line set. New equipment uses R-410A or R-32 refrigerant; older line sets sized for R-22 may need replacement or flushing, adding $500 to $1,500 to the install cost.",
    whenToUpgrade:
      "Use this calculator for AC sizing decisions when (1) you're comparing contractor quotes and want a third-party reference number, (2) you're early in planning and need a rough equipment class and budget, (3) the replacement is like-for-like in a home with no major envelope changes, or (4) you're sizing window or portable AC for individual rooms. Step up to a full Manual J load calculation when (1) you're installing variable-speed or multi-stage equipment where matching capacity precisely justifies the planning effort, (2) you're switching from central AC to a heat pump and need dual-load analysis, (3) you've made significant envelope changes (window replacement, deep insulation retrofit, air sealing) and the old equipment sizing no longer applies, (4) you're installing new equipment that wasn't there before — additions, conversions from window-unit cooling to central, new construction, or (5) utility rebates, federal tax credits, or manufacturer warranties require documented load calculation. Per the Inflation Reduction Act implementation, the $2,000 federal heat pump tax credit and many state heat pump rebates require Manual J documentation submitted with the application.",
    scenarios: [
      {
        title: 'Replacing a 20-year-old 3-ton AC, like-for-like',
        location: 'Mid-Atlantic and Midwestern suburbs',
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
        takeaway:
          "Most common situation. Existing 3-ton single-stage AC from the early 2000s is end-of-life; the calculator confirms 2.5 to 3 tons is still right for the home. Two-step decision: same single-stage replacement at SEER2 15.2 (the 2023 federal minimum) for lowest upfront cost, or step up to 16 to 18 SEER2 variable-speed for better humidity control and lower operating cost. In zone 4 with typical cooling runtimes (~700 hours per year), variable-speed pays back in 8 to 12 years. Worth it if you plan to stay 10+ years; not worth it if you might sell within 5 years.",
      },
      {
        title: 'Switching from central AC + gas furnace to a heat pump',
        location: 'Anywhere considering the IRA $2,000 tax credit',
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
        takeaway:
          "Switching from a split system (central AC + gas furnace) to a heat pump consolidates equipment. Cooling load: 2.5 to 3 tons. Heating load in zone 4: typically 1.0× cooling, so the heat pump sized to cooling load also handles heating with electric resistance aux backup. Federal heat pump tax credit under IRA: up to $2,000 (30% of project cost up to that cap). Many utilities add $500 to $2,000 rebates. Cold-climate certified (NEEP CCASHP listed) equipment qualifies for higher rebates in zones 5+. Calculator above is the cooling load; use the heat pump size calculator for dual-load analysis with balance point.",
      },
      {
        title: 'New construction with IECC 2021 envelope',
        location: 'Newer suburban developments, infill, accessory dwellings',
        inputs: {
          squareFootage: 1500,
          climateZone: '4',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          "New construction to IECC 2021 envelope (R-21 walls, R-49+ attic, U-0.32 windows, ACH50 of 3) drops the AC size to 2 to 2.5 tons. Higher 9-foot ceilings common in newer construction add about 10 percent back, but the better envelope wins overall. At 24,000 BTU (2 tons), a single ductless mini-split serves the whole house well in open-plan layouts; for more conventional floor plans with separate bedrooms, central ducted equipment or a multi-zone mini-split with 2 to 3 heads works better. ENERGY STAR Most Efficient list contains many qualifying options in this size range.",
      },
      {
        title: 'Retrofit: deciding between duct upgrade or larger AC',
        location: 'Older homes with attic ductwork',
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
        takeaway:
          "Common dilemma in 30-50 year old homes: existing AC seems undersized for actual comfort delivered, and the contractor recommends jumping to 4 tons. Before upsizing, check the ducts. A Duct Blaster test reveals leakage; typical older attic ducts test at 20-30% leakage. Per DOE Building America, sealing and insulating ducts can recover 0.5 to 1 ton of effective capacity. Total cost: $1,000 to $2,500 for duct sealing versus $1,500 to $2,500 incremental for upsizing to 4-ton equipment. Duct upgrade typically wins on lifetime cost and avoids the humidity control penalties of an oversized AC.",
      },
      {
        title: 'Variable-speed vs single-stage decision at 2.5 tons',
        location: 'Anywhere considering premium equipment',
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
        takeaway:
          "Single-stage 2.5-ton at 15.2 SEER2: roughly $5,000 installed. Variable-speed 2.5-ton at 20 SEER2: roughly $8,000 installed. Annual cooling energy difference at zone 4 runtimes: roughly $80 to $150 per year. Simple payback on the variable-speed premium: 20 to 35 years — longer than the equipment lifetime in most cases. The case for variable-speed in moderate climates is comfort and humidity control, not energy payback. In zone 2 or 3 with 1,500+ cooling hours per year, payback drops to 10 to 15 years and the equation flips.",
      },
      {
        title: 'Window AC strategy for budget-constrained retrofit',
        location: 'Rental properties, older homes without ductwork',
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
        takeaway:
          "When central AC isn't feasible (no ductwork, rental restriction, budget under $2,000), multiple window units can cover a 1,500 sqft home. Strategy: one 12,000-14,000 BTU window unit in the primary living space + one 6,000-8,000 BTU unit per bedroom that needs cooling. Total: 2 to 4 units, $400 to $1,200 in equipment versus $5,000+ for central. Trade-off: window units are noisier, less efficient (typical CEER 11 to 13 versus equivalent central AC at 14-22 SEER2), and don't handle humidity as well. For multi-year rentals or older homes awaiting larger renovation, this is the rational choice.",
      },
      {
        title: 'Ductless mini-split conversion (removing central AC)',
        location: 'Older homes with failing ductwork, electrification retrofits',
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
        takeaway:
          "Replacing central AC with a multi-zone mini-split when existing ductwork is failing. For 1,500 sqft, typical configuration: one outdoor unit (2.5 to 3 ton) + 3 to 4 indoor heads (one in living area, one per bedroom). Per-zone control means each room can be cooled to its own setpoint; no duct losses; better efficiency at part-load. Cost: $11,000 to $16,000 installed for a 3-zone or 4-zone system versus $5,500 to $8,500 for equivalent central AC. The ductless system pays back over time through reduced energy bills and avoided ductwork costs, but the upfront premium is substantial.",
      },
      {
        title: 'Two-zone central AC for a 2-story 1,500 sqft house',
        location: 'Two-story Colonial, Cape Cod, smaller modern infills',
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
        takeaway:
          "Two-story 1,500 sqft homes with a single central AC and one thermostat typically run a 3-5°F differential between floors in summer (upstairs hotter, basement cooler). Solutions: install a two-zone system (motorized dampers + zone control + second thermostat) at $1,500 to $3,000 incremental over single-zone, or install a small upstairs ductless mini-split (12,000 BTU) supplementing the existing central AC at $2,000 to $3,500. Either approach delivers meaningfully better comfort. The zoned central AC is the cleaner solution if the install is greenfield; the supplemental mini-split is the typical retrofit when the existing central AC is mid-life and not due for replacement.",
      },
      {
        title: 'SEER2 efficiency tier ROI analysis',
        location: 'Homeowners weighing efficiency upgrade premium',
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
        takeaway:
          "2023 SEER2 minimums: 14.3 (south) / 15.2 (north). ENERGY STAR threshold: 15.2 SEER2 (north) / 16 SEER2 (south). ENERGY STAR Most Efficient: 18+ SEER2. For a 2.5-ton AC in zone 4 with 700 cooling hours per year and $0.16/kWh electricity, moving from 15.2 to 18 SEER2 saves roughly $60 to $90 per year. Premium for 18 SEER2: $1,500 to $2,500 over base equipment. Payback: 16 to 28 years. In zone 2 or 3 with 1,500+ cooling hours, the same upgrade saves $130 to $200 per year and pays back in 8 to 12 years. SEER2 tier choice should follow cooling-runtime expectations, not blanket 'higher is better' advice.",
      },
      {
        title: 'IRA tax credit + utility rebate stack for heat pump conversion',
        location: 'Climate-conscious replacement decisions, 2024+',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          "Stacking incentives can flip the AC-vs-heat-pump economics. Federal Inflation Reduction Act 25C credit: $2,000 for qualifying heat pump (typically ENERGY STAR Cold Climate-listed in zone 5+). State and utility rebates: $500 to $4,000 depending on jurisdiction (NYSERDA, Mass Save, ComEd, Xcel Energy all offer programs). High Efficiency Electric Home Rebate (HEEHR) IRA program: up to $8,000 for low/moderate income households as of 2024 rollouts. For a 1,500 sqft home in zone 5 considering an AC-only replacement (~$6,000) vs heat pump (~$10,000), stacked incentives can shrink the heat pump net cost below the AC option. Check the DOE's IRA savings calculator or your state energy office for current eligibility.",
      },
    ],
    faq: [
      {
        q: 'What size AC do I need for a 1,500 sq ft house?',
        a: 'In most US climates, 2.5 to 3 tons of central AC (30,000 to 36,000 BTU) is the right answer for a 1,500 sq ft home with average construction. Zone 4 (Mid-Atlantic) typically lands at 2.5 tons; zone 2 (Gulf Coast) at 3 tons; zone 5 (northern states) at 2 to 2.5 tons. Newer construction with high-performance envelope can size down by half a ton; older construction with poor insulation can size up by half a ton.',
      },
      {
        q: 'How much does AC for a 1,500 sq ft house cost in 2024?',
        a: 'Central AC installation for a 1,500 sq ft home runs $4,500 to $9,000 in 2024, depending on equipment efficiency tier, region, and whether ductwork needs work. Base single-stage 15.2 SEER2 equipment hits the lower end; variable-speed 20+ SEER2 ENERGY STAR Most Efficient equipment hits the upper end. Multi-zone ductless mini-split alternatives run $9,000 to $14,000 installed for whole-house coverage with separate thermostats per zone.',
      },
      {
        q: 'Should I install variable-speed AC for a 1,500 sq ft home?',
        a: 'Variable-speed AC delivers better humidity control and quieter operation at modest energy savings versus single-stage. The premium is $1,500 to $3,000 over base single-stage equipment. In zones 1 to 3 (high cooling runtimes), it pays back in 8 to 12 years. In zones 4 to 6 (moderate cooling runtimes), payback often exceeds equipment life. Buy variable-speed for the comfort benefit if you plan to stay 10+ years, not for the energy payback in mild climates.',
      },
      {
        q: 'What SEER2 should I buy for a 1,500 sq ft house?',
        a: '15.2 SEER2 is the federal minimum (north of 35°N latitude) as of 2023. ENERGY STAR threshold is 15.2 SEER2 north and 16 SEER2 south. ENERGY STAR Most Efficient hits 18+ SEER2. Go with 15.2 to 16 SEER2 for budget installs; step to 17 to 18 SEER2 for moderate climates and longer occupancy; consider 20+ SEER2 in hot climates with high runtimes or if utility rebates make the math work.',
      },
      {
        q: 'Is a heat pump better than AC for a 1,500 sq ft house?',
        a: "In zones 3 through 6, a cold-climate certified heat pump is increasingly the better long-term choice. It handles both cooling and heating from one unit (eliminating the furnace), qualifies for federal Inflation Reduction Act tax credits up to $2,000, and many states/utilities add $500 to $4,000 in rebates. The upfront premium over AC-only varies by region; stacked incentives often close the gap. Zone 7+ requires careful equipment selection (CCASHP listing) and possibly dual-fuel architecture.",
      },
      {
        q: 'Why does my contractor recommend a 4-ton AC for my 1,500 sq ft house?',
        a: "Two reasons usually. Either the contractor used a rule of thumb that overestimates load by half a ton or more (common in 'one ton per 500-600 sqft' shortcuts), or your home has poor envelope, predominantly west-facing windows, leaky attic ductwork, or other genuine factors that push the load up. Ask for the Manual J calculation. If they can't show one, get a second quote. Oversized AC short-cycles, controls humidity poorly, and wears out faster.",
      },
      {
        q: 'Can I cool a 1,500 sq ft house with window AC units?',
        a: 'Yes, with multiple units. Typical configuration: one 12,000-14,000 BTU unit in the primary living space + one 6,000-8,000 BTU unit per bedroom you want cooled. Total equipment cost: $400 to $1,200 versus $5,000+ for central AC. Trade-offs: noisier, lower efficiency (CEER 11-13 typical versus 14-22 SEER2 central), worse humidity control. For multi-year rentals or budget-constrained retrofits, this is the practical choice. Per ENERGY STAR Room AC Sizing Guide, size each unit individually using the BTU calculator.',
      },
      {
        q: "Do I need separate AC zones for a 1,500 sq ft two-story house?",
        a: 'Two-story 1,500 sqft homes with a single central AC and one thermostat typically run 3-5°F warmer upstairs in summer. A two-zone system with separate thermostats per floor solves this for $1,500 to $3,000 extra over single-zone. A supplemental mini-split head upstairs is the alternative for $2,000 to $3,500. Single-story 1,500 sqft homes usually do not need zoning.',
      },
      {
        q: 'What size return air do I need for a 3-ton AC in a 1,500 sq ft house?',
        a: "Per ACCA Manual D, return air sizing depends on the air handler's CFM rating. A 3-ton AC moves about 1,200 CFM (the 400 CFM-per-ton rule of thumb). For 1,200 CFM, total return grille free area should be roughly 200 to 300 square inches at typical velocity limits. This typically means a single 20×30 inch return grille or two smaller grilles totaling that area. Per Manual D, undersized return air is the most common cause of low system airflow and short equipment life. See the Manual D return air sizing article for specifics.",
      },
      {
        q: 'How long should AC run per cycle for a 1,500 sq ft house?',
        a: 'A properly-sized central AC for 1,500 sqft runs 15 to 30 minutes per cycle on typical summer days and 30 to 60 minutes on peak days. Cycles shorter than 10 minutes (short cycling) indicate oversizing and produce poor humidity control. Cycles longer than 90 minutes on a typical day indicate undersizing or a maintenance issue. Variable-speed equipment runs continuously at reduced capacity instead of cycling.',
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
      'acca-manual-d',
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
