import type { HeatPumpInputs } from '@/lib/calculators/heat-pump-size';
import type { FaqItem } from '@/components/seo/types';

export interface HeatPumpScenarioEntry {
  title: string;
  location: string;
  inputs: HeatPumpInputs;
  takeaway: string;
}

export interface HeatPumpExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: HeatPumpInputs;
  intro?: string;
  houseContext?: string;
  equipmentNotes?: string;
  climateVariation?: string;
  insulationImpact?: string;
  occupancyImpact?: string;
  realWorldNotes?: string;
  commonMistakes?: string;
  whenToUpgrade?: string;
  scenarios?: HeatPumpScenarioEntry[];
  faq?: FaqItem[];
  sourceIds?: readonly string[];
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
    metaTitle: 'Heat Pump Size for 1,500 Sq Ft Home (Zone 5): CCASHP, Balance Point, Aux Heat',
    metaDescription:
      'Heat pump sizing for a 1,500 sq ft home in zone 5: 2.5 tons, balance point, aux heat capacity, cold-climate (CCASHP) vs standard equipment. 10 worked scenarios.',
    scenario:
      'A 1,500 square foot home in zone 5 (northern states) typically pairs with a 2.5-ton heat pump.',
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
      "Heat pump sizing for a 1,500 square foot home in IECC climate zone 5 (Chicago, Cleveland, Denver, Boston, Pittsburgh) is the most-searched heat pump sizing query, reflecting the fact that the US median home size sits at this footprint and zone 5 is the country's largest population center by climate band. The calculator above recommends a 2.5-ton heat pump (30,000 to 36,000 BTU) with a balance point in the upper 20s°F for standard equipment, or in the low teens for cold-climate (NEEP CCASHP listed) equipment. The decision is rarely just about tonnage — it's about the equipment class, balance point target, aux heat sizing, and whether to lean toward cold-climate certified or standard equipment given local electricity rates and gas backup availability. The 10 worked scenarios below cover the most common configurations across this house size and climate band.",
    houseContext:
      "Zone 5 covers a broad swath of the US: roughly 25 percent of US single-family homes per NREL's ResStock dataset. At 1,500 sqft, the dominant archetypes in this climate are mid-century ranches (1950s-1970s), 1980s-1990s split-levels, and early-2000s starter homes. Each has materially different envelope characteristics that affect heat pump sizing. The mid-century ranch typically has R-7 to R-11 walls and R-19 attic — heating loads run high. The 1980s-1990s split-level has R-11 to R-13 walls and R-30 attic — moderate heating loads. The 2000s starter home has R-13 walls and R-38 attic — closer to modern envelope. Newer construction in zone 5 (post-2015) meeting current IECC code can drop heat pump size by half a ton. Per the DOE Building America housing characterization, the median zone 5 home in this size range has cooling load around 27,000 BTU and heating load around 35,000 BTU at design conditions, pushing equipment selection toward 2.5 to 3 tons with attention to the heating side.",
    equipmentNotes:
      "At the 2.5-ton size for zone 5, the equipment market splits into three categories. Standard (non-cold-climate-certified) heat pumps deliver around 60 percent of rated heating capacity at 17°F and 33 percent at 5°F per ENERGY STAR's published performance data. These cost $5,500 to $8,500 installed and produce a balance point in the high 20s°F for a 1,500 sqft zone 5 home, meaning aux heat fires frequently through the heating season. Cold-climate certified (CCASHP, NEEP-listed) heat pumps deliver about 85 percent at 17°F and 70 percent at 5°F. These cost $8,500 to $13,000 installed but drop the balance point to the low teens, dramatically reducing aux runtime — often by 60 to 80 percent of seasonal hours. The Inflation Reduction Act 25C tax credit ($2,000) and many state/utility rebates (NYSERDA, Mass Save, Efficiency Vermont, etc.) prefer or require CCASHP listing. The third category is dual-fuel: heat pump + gas furnace, where the heat pump handles cooling and shoulder-season heating, the furnace handles peak heating below balance point. This architecture costs $10,000 to $16,000 installed and makes sense when natural gas is cheap and electricity is expensive — though the IRA incentive structure increasingly favors all-electric heat pump only.",
    climateVariation:
      "The 1,500 sqft figure plus zone 5 is one waypoint in a continuum. Same home in zone 4 (Mid-Atlantic — Columbus, DC, Cincinnati): heating load drops to about 30,000 BTU; balance point shifts upward; standard equipment becomes more viable. Same home in zone 6 (Buffalo, Minneapolis, Burlington): heating load climbs to about 42,000 BTU at 1.6× cooling; CCASHP equipment becomes strongly recommended. Same home in zone 7 (northern Minnesota, Vermont mountains): heating load near 50,000 BTU at 1.9× cooling; CCASHP equipment required, dual-fuel often the right architecture given grid capacity. The takeaway: within a single home size, climate zone shifts equipment selection from 2 to 3 tons and from optional to mandatory cold-climate certification. Per ASHRAE 169-2020 climate data and NEEP CCASHP testing protocols, the 17°F and 5°F capacity benchmarks are the right way to compare equipment across these zones — not just SEER2/HSPF2 ratings, which average across all temperatures and obscure cold-weather behavior.",
    insulationImpact:
      "Insulation quality has a larger effect on heat pump sizing than on AC-only sizing because heating runtimes are longer and heating losses depend more strongly on envelope. A 1,500 sqft zone 5 home with poor insulation (R-7 walls, R-19 attic, U-1.0 windows — typical 1960s-1970s) drives the heating load up about 30 percent, pushing equipment to 3-ton. Cold-climate equipment becomes effectively mandatory in this case because aux heat runtime at a 3-ton standard heat pump's balance point would be impractical for electric resistance backup. The opposite case — same home with good insulation (R-19+ walls, R-49+ attic, U-0.35 windows — typical 2010s construction or thoroughly retrofitted older home) — drops heating load 25 percent, allowing 2-ton equipment with comfortable aux margins. Per LBNL air leakage studies, ACH50 matters substantially in cold climates: a tight envelope at ACH50 of 3 cuts infiltration heating load by half versus a leaky envelope at ACH50 of 14. For older zone 5 homes considering both an envelope retrofit and a heat pump install in the same project, sequence the envelope work first — the heat pump sized against post-retrofit load is materially smaller and cheaper.",
    occupancyImpact:
      "Occupancy affects heat pump sizing through internal gain that offsets heating load. Per ACCA Manual J convention, each occupant contributes about 250 BTU/hr to heating-season offset (lower than the 600 cooling-season number because metabolism and indoor activities don't add as much to heating in cold-design conditions). For a 1,500 sqft home, the difference between a 2-person and 4-person household is about 500 BTU — small. Lifestyle has a larger effect through electricity-driven gains: a home that runs computer equipment, electric cooking, and dries clothes indoors gains 2,000 to 5,000 BTU/hr of effective heating from those electrical loads, lowering the actual heat pump runtime requirement. For empty-nester households in zone 5, this means the calculator-recommended size is often slightly conservative, leaving some headroom in shoulder seasons. For larger working-from-home households with heavy electronic equipment, the calculator size is appropriate or slightly undersized.",
    realWorldNotes:
      "The calculator captures climate zone, envelope rating, and house size but does not directly model two factors that materially affect heat pump performance in zone 5. First: defrost cycle behavior. Heat pumps in cold climates periodically reverse to defrost the outdoor coil; during defrost (typically 3-10 minutes every 30-90 minutes in cold weather), the unit pulls heat from the home rather than delivering it. CCASHP models manage defrost better than standard equipment per NEEP testing protocols. The article on heat pump defrost cycles covers this in detail. Second: duct losses. Per DOE Building America research, attic ductwork that's leaky or poorly insulated can lose 25 to 35 percent of delivered heating capacity in cold-weather operation — even more than in cooling because the temperature differential is larger. A heat pump system with leaky attic ducts effectively delivers 1.5 to 2 tons of heating from a 2.5-ton rated installation. Manual D-compliant duct sealing typically pays back faster on heat pump installs than AC installs because of the larger delta-T in heating mode.",
    commonMistakes:
      "Five common errors in zone 5 heat pump installs. First: sizing to cooling load only. A 1,500 sqft home in zone 5 has heating load roughly 1.3× cooling; sizing to cooling leaves about 8,000 BTU of heating capacity unfilled, requiring aux heat to make up the gap. Aux heat (electric resistance) at typical zone 5 electricity rates costs 2-3× more per BTU than heat pump heat — significant operating cost penalty over decades. Second: skipping the CCASHP question in zone 5. Standard equipment works in zone 5 but produces a balance point in the high 20s°F, meaning aux heat fires for most January and February operating hours. CCASHP shifts that balance point to the teens and dramatically reduces aux runtime. The CCASHP premium typically pays back in 7-12 years through reduced electricity bills. Third: incorrect aux heat sizing. Aux heat strip kits come in standard sizes (5kW, 10kW, 15kW, 20kW). Sizing aux to handle the full heating load at design temperature (5°F in zone 5) requires 15kW for a 2.5-ton heat pump in this size home. Undersized aux heat means the unit cannot keep up on the coldest design days; oversized aux unnecessarily increases electrical service load. Fourth: ignoring the electrical service. Heat pumps with aux heat strips can draw 50-80 amps continuous in heating mode at design conditions; older 100-amp services struggle. Service upgrade ($1,500 to $4,000) may be required before installation. Fifth: not running the dual-load calculation. AC sizing alone gives the wrong answer for heat pumps. Use the heat pump size calculator above, not the BTU or AC sizing calculator, for heat pump equipment decisions.",
    whenToUpgrade:
      "Use this calculator's recommendation when (1) early-planning evaluation of whether a heat pump retrofit makes sense for the home, (2) comparing contractor quotes that vary in recommended tonnage, (3) sanity-check before committing to specific equipment, or (4) DIY-ing a window or single-zone mini-split install. Step up to a full Manual J + Manual S done by a licensed contractor with ACCA-approved software when (1) installing a multi-zone or whole-home heat pump system where matching capacity to load precisely matters for both efficiency and comfort, (2) federal/state/utility incentive programs require Manual J documentation in the rebate application (the IRA 25C tax credit, NYSERDA Air-to-Air program, Mass Save, etc.), (3) the home has had significant envelope changes that invalidate prior load assumptions, (4) you're considering dual-fuel architecture where the heat pump/furnace crossover temperature must be precisely set, (5) cold climate (zone 6+) where wrong sizing creates either unbearable comfort gaps or excessive aux runtime. Most utility heat pump rebates in zone 5+ now require Manual J documentation as a prerequisite — check the program before committing to an installer.",
    scenarios: [
      {
        title: '2.5-ton standard heat pump, zone 5 baseline',
        location: 'Cleveland, Indianapolis, Pittsburgh, Kansas City — central north',
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
          "Default zone 5 baseline. 2.5-ton standard heat pump handles cooling and most heating; balance point lands in the upper 20s°F. Aux heat (electric resistance strips, typically 10-15 kW) covers the coldest design days. Per NEEP's CCASHP testing, standard equipment in this configuration delivers about 60% of rated capacity at 17°F — adequate for zone 5 but not exceptional. Total installed cost: $5,500 to $8,500. Annual heating cost in moderate Cleveland weather at $0.14/kWh: roughly $700 to $1,100 versus gas furnace's $600 to $900 at $1.20/therm. Margin shrinks as electricity-to-gas price ratio shifts.",
      },
      {
        title: '2.5-ton CCASHP, zone 5 with reduced aux runtime',
        location: 'Same zone 5 cities, climate-conscious replacement',
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
          "Same home, cold-climate certified equipment. Balance point drops from upper-20s to low-teens°F per NEEP testing of CCASHP-listed models (Mitsubishi Hyper Heat, Daikin Aurora, Bosch IDS series, etc.). Aux heat runtime drops 60-80 percent. Total installed cost premium over standard: $2,500 to $4,500. Federal IRA 25C tax credit: $2,000. State/utility rebates in zone 5: $500-$4,000 depending on jurisdiction. Net cost often within a few thousand of standard equipment after incentives. Annual heating cost savings: typically $200 to $400 versus standard. Payback: 6 to 12 years depending on incentives and electricity rate.",
      },
      {
        title: 'Older 1,500 sqft home, poor envelope, zone 5',
        location: 'Pre-1980 ranches, older mid-Atlantic homes',
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
          "Poor insulation drives heating load up about 30%. Equipment recommendation climbs to 3-ton; CCASHP becomes effectively mandatory because aux runtime at a 3-ton standard equipment balance point is impractical. Better approach: invest in envelope retrofit first. Attic insulation top-off + air sealing + window storm panels typically reduces heating load by 25%, allowing equipment to size down to 2.5-ton CCASHP. Total project cost (envelope + heat pump) often within 15% of heat pump alone but with materially lower operating costs and better comfort.",
      },
      {
        title: 'IECC 2021 envelope, 1,500 sqft new build, zone 5',
        location: 'New construction zone 5, 2021+',
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
          "Modern envelope drops heating load substantially. Equipment can size down to 2-ton CCASHP. At this load level, a single ducted heat pump works for open-plan layouts; ductless multi-zone with 2-3 heads serves more traditional floor plans well. Balance point with 2-ton CCASHP in a tight envelope: low teens to single digits°F. Aux heat sized at 5-10kW suffices. ENERGY STAR Most Efficient list contains many qualifying options in this size range.",
      },
      {
        title: '2-story 1,500 sqft Colonial with attic ductwork',
        location: 'Older two-story homes with attic ducts',
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
          "Two-story Colonial or Cape Cod in zone 5 with attic ductwork has two compounding issues: stack effect causes upstairs to overheat in summer and underheat in winter, and attic ductwork loses 25-35% of delivered capacity. Solutions: (1) seal ductwork to Manual D standards, recovering 0.5-1 ton of effective capacity; (2) install zoned heat pump system with separate thermostats per floor; (3) consider ductless mini-split system that bypasses attic ducts entirely. Option 3 costs $11,000-15,000 but eliminates the duct loss problem permanently and qualifies for both IRA tax credit and many utility rebates.",
      },
      {
        title: 'All-electric retrofit (was AC + oil furnace)',
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
          "Oil furnace replacement is one of the highest-ROI heat pump conversions: oil heat at $4-5/gallon costs roughly $1,800-2,500/year for a 1,500 sqft zone 5 home, versus $700-1,100 for CCASHP electric heating. CCASHP equipment strongly preferred to handle deep cold. State programs in NY (NYSERDA Clean Heat), MA (Mass Save), CT (Energize CT), VT (Efficiency Vermont) offer substantial additional rebates on top of federal IRA credit. Some programs cover up to 50% of project cost for oil-replacement specifically. Total net cost after incentives can be lower than oil furnace replacement.",
      },
      {
        title: 'Dual-fuel: heat pump + gas furnace backup',
        location: 'Areas with cheap natural gas, zone 5+',
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
          "Dual-fuel pairs a standard heat pump (handling cooling and shoulder-season heating) with a high-efficiency gas furnace (taking over below the economic crossover temperature). Common in markets with cheap natural gas where electricity is expensive. The crossover temperature is set in the thermostat — typically 30-35°F. Above crossover: heat pump runs (cheaper to operate). Below: furnace runs (cheaper at low ambient temps). Total installed cost: $10,000-16,000. Operating cost optimized but capital cost high. Note: the IRA tax credit and many state rebates favor all-electric installs over dual-fuel; check eligibility before specifying.",
      },
      {
        title: 'Empty-nester home, smaller equipment',
        location: 'Households where children have moved out',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 2,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Lower occupancy and quieter daytime cooling/heating demand allows slight downsizing — the 2.5-ton recommendation still applies but the lower bound (2-ton CCASHP) becomes more viable, especially with a good thermostat schedule. Variable-speed CCASHP equipment is particularly well-suited here because it modulates output for the low-demand baseline most days. Empty-nester transitions are the most common case where the old equipment was oversized for current load; right-sized replacement returns better comfort and lower operating cost.",
      },
      {
        title: 'Whole-home electrification with EV charging',
        location: 'Homes adding heat pump + EV simultaneously',
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
          "Stacking heat pump + EV charger + electric water heater + induction range exceeds the load capacity of typical 100-amp electrical services. Service upgrade to 200-amp panel typically required, adding $1,500-4,000. Alternative: load management technology (e.g., Span panel, Schneider Square D Energy Center) that prevents simultaneous peak draw and avoids the service upgrade — costs $2,500-5,000 but often net cheaper than panel upgrade when factoring in incentives and complexity. Heat pump aux heat strip sizing matters here: smaller aux (5kW) reduces peak electrical draw, important when total panel capacity is constrained.",
      },
      {
        title: 'Modulating CCASHP for very tight envelope',
        location: 'Passive House, net-zero homes, deep retrofits',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
          coldClimateEquipment: true,
        },
        takeaway:
          "Very low load (tight envelope, good insulation, etc.) means a 2-ton conventional heat pump cycles inefficiently at part-load. Variable-speed CCASHP equipment that modulates from 25-100% capacity handles this better — runs continuously at low output rather than cycling. Mini-split heat pumps are particularly good at this; certain ducted variable-speed models like Carrier Greenspeed and Trane XV series also handle low-load operation well. Worth noting: the smallest reasonable heat pump sizes are typically 1.5 to 2-ton; below that, single-zone mini-splits (12,000-18,000 BTU per head) become the appropriate equipment class.",
      },
    ],
    faq: [
      {
        q: 'What size heat pump for a 1,500 sq ft house in zone 5?',
        a: 'A 2.5-ton (30,000 BTU) heat pump is the typical recommendation for a 1,500 sq ft home in IECC climate zone 5 with average insulation. Cold-climate certified (NEEP CCASHP listed) equipment is strongly recommended over standard equipment in this zone for lower aux heat runtime through winter.',
      },
      {
        q: 'Do I need a cold-climate heat pump in zone 5?',
        a: 'Cold-climate (CCASHP) equipment is recommended but not absolutely required in zone 5. Standard heat pumps work, but produce a balance point in the high 20s°F, meaning aux heat fires frequently through winter — this raises operating costs. CCASHP equipment drops the balance point to the low teens°F and reduces aux heat runtime 60-80%. The CCASHP premium typically pays back in 7-12 years through reduced electricity bills.',
      },
      {
        q: 'What is the balance point for a heat pump in zone 5?',
        a: "The balance point is the outdoor temperature at which the heat pump's capacity equals the home's heating load — below this, aux heat must supplement. For a 1,500 sqft zone 5 home with a 2.5-ton standard heat pump: balance point is in the high 20s°F. With a 2.5-ton CCASHP heat pump: balance point drops to the low teens°F. Lower balance point means less aux heat runtime, lower operating cost.",
      },
      {
        q: 'How much aux heat do I need for a 1,500 sq ft zone 5 home?',
        a: 'Aux heat strip kits come in standard sizes (5kW, 10kW, 15kW, 20kW). For a 1,500 sqft zone 5 home with a 2.5-ton heat pump, 10kW (34,000 BTU) typically suffices to cover full heating load at design temperature for standard equipment; CCASHP equipment can often use 5-10kW because the heat pump itself maintains more capacity at low temperatures.',
      },
      {
        q: 'How much does a heat pump for a 1,500 sq ft house cost?',
        a: 'Standard heat pump: $5,500 to $8,500 installed in 2024 dollars. Cold-climate certified (CCASHP) equipment: $8,500 to $13,000 installed. Multi-zone ductless mini-split heat pump (3-4 zones): $11,000 to $15,000 installed. Federal IRA 25C tax credit returns up to $2,000 on qualifying installations; state and utility rebates add $500-$4,000 depending on jurisdiction. Net cost after incentives often within $1,000-$3,000 of like-for-like AC + furnace replacement.',
      },
      {
        q: 'Is a 2-ton heat pump enough for a 1,500 sq ft house in zone 5?',
        a: '2 ton (24,000 BTU) is at the small end of the acceptable range for a 1,500 sqft zone 5 home. It works if the envelope is good (R-19+ walls, R-49+ attic, U-0.35 windows, ACH50 of 5 or below) — typical of homes built post-2010 to current code. For average-envelope older homes, 2.5-ton is the safer pick. 2-ton CCASHP equipment can work where 2-ton standard would not, because of better cold-weather capacity retention.',
      },
      {
        q: 'Should I replace my AC and furnace with one heat pump?',
        a: 'In zone 5, yes — increasingly the right call given Inflation Reduction Act incentives. A single heat pump replaces both AC and furnace functions, simplifies the system, and qualifies for federal tax credit. CCASHP equipment handles zone 5 winters with manageable aux heat use. Caveats: if your existing gas furnace is new (under 5 years old), keeping it as dual-fuel backup makes economic sense. If your electrical service is at capacity, panel upgrade may be needed first.',
      },
      {
        q: 'How does climate zone affect heat pump sizing?',
        a: 'Per ASHRAE Standard 169-2020 climate data, heating design temperatures shift dramatically across zones: zone 4 around 15°F, zone 5 around 5°F, zone 6 around -2°F, zone 7 around -10°F. Same 1,500 sqft home: zone 4 needs 2.5-ton, zone 5 needs 2.5-ton, zone 6 needs 3-ton, zone 7 needs 3+ ton with CCASHP mandatory. Heating load grows roughly 30% per zone above 4. Cold-climate certification importance grows in parallel.',
      },
      {
        q: 'Will my heat pump work below zero in zone 5?',
        a: 'CCASHP-listed heat pumps maintain useful heating capacity well below 0°F per NEEP testing protocols — about 50-70% of rated capacity at -5°F. Standard heat pumps drop to 25-35% at the same temperature. Both keep working at zone 5 design temperatures (around 5°F) and below; the difference is how much aux heat supplements them. Modern equipment does not just shut off in cold weather — that was older heat pump behavior from the 1980s-90s.',
      },
      {
        q: 'How long should a heat pump run per cycle in zone 5?',
        a: 'A properly-sized heat pump in zone 5 should run in longer cycles than AC-only operation because heating demand is more sustained. Typical heating cycles: 30-90 minutes on cold days, often continuous on the coldest days. Variable-speed equipment runs continuously at modulated output for most of the heating season. Cycles shorter than 15 minutes indicate oversizing; cycles where the unit cannot maintain setpoint despite running continuously (no aux heat firing) indicate undersizing or low refrigerant.',
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
