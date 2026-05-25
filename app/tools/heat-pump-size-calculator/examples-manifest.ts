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
    slug: '1000-sq-ft',
    title: 'Heat Pump Size for a 1,000 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 1,000 Sq Ft Home: Tonnage, Balance Point, Aux Heat',
    metaDescription:
      'Heat pump sizing for a 1,000 square foot home across climate zones, with cold-climate equipment and balance point analysis.',
    scenario:
      'A 1,000 square foot home — typical for small ranches, bungalows, and tiny homes — usually pairs with a 2-ton heat pump.',
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
      "Heat pump sizing for a 1,500 square foot home is the most-searched heat pump sizing query because the US median single-family home falls in this range per the Census American Community Survey. The calculator's recommendation shifts substantially with climate zone: a 1,500 sqft home in IECC zone 2 (Gulf Coast) needs roughly 3 tons of equipment driven by cooling load, while the same home in zone 6 (Minneapolis, Buffalo) needs roughly 3 tons driven by heating load — same tonnage, very different operating profile. The 10 worked use cases below cover the most common climate, envelope, and equipment combinations a homeowner faces when sizing a heat pump at this house size, including cold-climate (NEEP CCASHP listed) equipment selection, dual-fuel architecture, and Inflation Reduction Act incentive stacking.",
    houseContext:
      "1,500 sqft homes account for roughly 18 percent of US single-family stock per NREL ResStock data, concentrated in three archetypes: three-bedroom ranches (1950s-1980s), small two-story Colonials and Cape Cods (1940s-1960s), and modern townhomes (post-2000). Each has different envelope and ductwork characteristics that affect heat pump equipment selection. The mid-century ranch typically has R-7 to R-11 walls and R-19 attic with original or first-replacement windows — heating loads in zone 5 run around 33,000 BTU at design. The small two-story has more wall area per square foot (taller envelope) — heating load can run 10 percent higher than a ranch of the same total square footage. The modern townhome has 40 percent less exterior wall area because of party walls — heating load runs about 15 percent lower than the calculator's default for a free-standing home. These archetypal differences shift heat pump tonnage by half a ton in either direction at this house size.",
    equipmentNotes:
      "Equipment at 2.5-ton heat pump size splits into three categories. Standard (non-CCASHP) heat pumps: $5,500-$8,500 installed, deliver about 60 percent of rated heating capacity at 17°F per ENERGY STAR data. Balance point with this equipment in zone 5: high 20s°F. Adequate for milder climates (zones 3-4) and rare-extreme zone 5 areas; in cold zone 5 areas (Minneapolis, Buffalo, Burlington), aux heat fires too frequently. Cold-climate certified (NEEP CCASHP listed) heat pumps: $8,500-$13,000 installed, deliver 85 percent at 17°F and 70 percent at 5°F. Balance point drops to low teens°F — dramatically less aux heat runtime. NEEP maintains the public CCASHP qualified products list at ashp.neep.org. Dual-fuel (heat pump + gas furnace backup): $10,000-$16,000 installed. Heat pump handles cooling and shoulder-season heating; furnace takes over below the economic crossover temperature (typically 30-35°F). Best architecture in markets with cheap natural gas and expensive electricity, but Inflation Reduction Act incentives increasingly favor all-electric heat-pump-only installs. The 25C federal tax credit pays $2,000 for qualifying heat pumps; state and utility rebates add $500-$4,000 depending on jurisdiction.",
    climateVariation:
      "The 1,500 sqft figure plus climate zone determines equipment selection. Per ASHRAE Standard 169-2020 design temperatures, the heating-to-cooling load ratio shifts dramatically across zones: zone 2 has heating load roughly 0.5× cooling (cooling drives equipment); zone 4 has heating about 1.0× cooling (balanced); zone 5 has heating 1.3× cooling (heating drives); zone 6 has heating 1.6× cooling; zone 7 has heating 1.9× cooling. The implication for equipment: in cooling-dominated zones (1-3), equipment sized to cooling load handles heating easily and aux heat sees minimal use. In balanced zones (4), either heating or cooling can drive sizing depending on envelope details. In heating-dominated zones (5+), heating load drives equipment selection, and the cold-temperature capacity retention of the heat pump determines aux heat runtime. NEEP CCASHP testing protocols specifically measure capacity at 47°F, 17°F, and 5°F, plus rare-extreme conditions, providing the right comparison data for cold-climate equipment decisions.",
    realWorldNotes:
      "The calculator captures climate zone, envelope rating, and house size but does not directly model two factors that materially affect heat pump performance. First: defrost cycle behavior. Heat pumps in cold climates periodically reverse refrigerant flow to defrost the outdoor coil; during defrost (typically 3-10 minutes every 30-90 minutes in cold weather), the unit pulls heat from the home rather than delivering it. CCASHP models manage defrost more gracefully than standard equipment per NEEP testing — fewer defrost cycles in identical conditions, shorter cycle duration, and better resistance to ice buildup. See the article on heat pump defrost cycles for the full mechanism. Second: duct losses. Per DOE Building America research, attic ductwork that's leaky or poorly insulated can lose 25 to 35 percent of delivered heating capacity in cold-weather operation — even more than in cooling mode because the temperature differential is larger. A heat pump installed in a home with leaky attic ducts delivers a fraction of its rated capacity to conditioned space, effectively requiring larger equipment. Manual D-compliant duct sealing typically pays back faster on heat pump installs than AC-only installs.",
    commonMistakes:
      "Five common errors when sizing heat pumps for 1,500 sqft homes. First: sizing to cooling load only. A 1,500 sqft home in zone 5 has heating load roughly 1.3× cooling; sizing to cooling leaves heating capacity short, forcing aux heat to fire frequently. Aux heat (electric resistance) costs 2-3× more per BTU than heat pump heat at typical electricity rates — significant operating cost penalty. Second: skipping the CCASHP question in zones 5+. Standard equipment works in zone 5 but produces a balance point in the high 20s°F, meaning aux heat fires for most January and February operating hours. CCASHP shifts that balance point to the teens and dramatically reduces aux runtime. The CCASHP premium typically pays back in 7-12 years through reduced electricity bills, often less with stacked incentives. Third: incorrect aux heat sizing. Aux heat strip kits come in 5kW, 10kW, 15kW, 20kW standard sizes. Sizing aux to handle the full heating load at design temperature requires 10-15kW for a 2.5-ton heat pump in this size home. Undersized aux means the unit cannot keep up on coldest design days; oversized aux unnecessarily increases electrical service load. Fourth: ignoring the electrical service. Heat pumps with aux heat strips can draw 50-80 amps continuous in heating mode at design conditions; older 100-amp services struggle. Service upgrade ($1,500-$4,000) may be required before installation. Fifth: not running the dual-load calculation. AC sizing alone gives the wrong answer for heat pumps. Use this calculator, not the BTU or AC sizing calculator, for heat pump equipment decisions.",
    whenToUpgrade:
      "Use this calculator's recommendation when (1) early-planning evaluation of whether a heat pump retrofit makes sense, (2) comparing contractor quotes that vary in recommended tonnage, (3) sanity-check before committing to specific equipment, or (4) DIY-ing a window or single-zone mini-split install. Step up to a full Manual J + Manual S done by a licensed contractor with ACCA-approved software when (1) installing multi-zone or whole-home equipment where matching capacity to load precisely affects both efficiency and comfort, (2) federal/state/utility incentive programs require Manual J documentation (the IRA 25C tax credit increasingly does, NYSERDA Air-to-Air program does, Mass Save does, Efficiency Vermont does), (3) the home has had significant envelope changes that invalidate prior load assumptions, (4) considering dual-fuel architecture where the heat pump/furnace crossover temperature must be precisely set, (5) cold climate (zone 6+) where wrong sizing creates unbearable comfort gaps or excessive aux runtime. Most utility heat pump rebates in zone 5+ now require Manual J documentation — check the program before committing to an installer.",
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
    metaTitle: 'Heat Pump Size for 2,000 Sq Ft Home: Tonnage Across Climates',
    metaDescription:
      'Heat pump sizing for a 2,000 square foot home across climate zones, with cold-climate equipment, balance point, and aux heat capacity analysis.',
    scenario:
      'A 2,000 square foot home — typical newer three to four bedroom house — typically calls for a 3 to 3.5-ton heat pump.',
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
    slug: '2500-sq-ft',
    title: 'Heat Pump Size for a 2,500 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 2,500 Sq Ft Home: 4-Ton Equipment Decisions',
    metaDescription:
      'Heat pump sizing for a 2,500 sq ft home — typical four-bedroom and larger two-story houses. Tonnage, balance point, zoning, and CCASHP considerations.',
    scenario:
      'A 2,500 square foot home typically needs a 4-ton heat pump, often configured as a zoned multi-stage or variable-speed system.',
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
  },
  {
    slug: '3000-sq-ft',
    title: 'Heat Pump Size for a 3,000 Sq Ft Home',
    metaTitle: 'Heat Pump Size for 3,000 Sq Ft Home: Multi-Zone and Larger Equipment',
    metaDescription:
      'Heat pump sizing for a 3,000 square foot home — large single-family houses, multi-zone considerations, balance point and aux heat capacity.',
    scenario:
      'A 3,000 square foot home typically calls for a 5-ton heat pump or a multi-zone install with two outdoor units.',
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
