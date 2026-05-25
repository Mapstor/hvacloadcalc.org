import type { BtuInputs } from '@/lib/calculators/btu';
import type { FaqItem } from '@/components/seo/types';

export interface ScenarioEntry {
  /** H3 heading text, e.g., "1,500 sqft ranch in Atlanta, zone 3". */
  title: string;
  /** Short location/context line shown under the heading. */
  location: string;
  /** Calculator inputs for this scenario. */
  inputs: BtuInputs;
  /** Interpretation prose: when this applies + what to do with the result. ~150-200 words. */
  takeaway: string;
}

export interface BtuExample {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  scenario: string;
  inputs: BtuInputs;
  /** Optional expanded content fields. When present, the example page renders the deeper layout. */
  intro?: string;
  houseContext?: string;
  equipmentNotes?: string;
  climateVariation?: string;
  insulationImpact?: string;
  occupancyImpact?: string;
  realWorldNotes?: string;
  commonMistakes?: string;
  whenToUpgrade?: string;
  /** Named scenarios — sub-examples within this page showing different "uses of" the calculator. */
  scenarios?: ScenarioEntry[];
  faq?: FaqItem[];
  sourceIds?: readonly string[];
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
      'How many BTU does a 1,500 sq ft house need? 30,000 to 36,000 BTU (2.5 to 3 tons) for climate zone 4. Full worked calculation, equipment options, and climate-zone variation.',
    scenario:
      'A 1,500 square foot home is the US median single-family house size, making this the most-searched BTU calculation.',
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
      "A 1,500 square foot home is the most-searched size when homeowners look up AC sizing — and for good reason. The US Census American Community Survey reports the median US single-family detached home falls between 1,500 and 2,200 square feet, with three-bedroom houses concentrated near the lower end of that range. NREL's ResStock dataset confirms the same distribution: roughly 18 percent of US single-family homes sit within 100 sqft of the 1,500 mark, making it the single most common house size in the country. The short answer for climate zone 4 (Mid-Atlantic, Ohio Valley): the calculator above recommends 30,000 to 36,000 BTU, or 2.5 to 3 tons of cooling capacity. The longer answer — why the range, what shifts the number, which equipment to pick, which scenarios apply to which homes — is what this page walks through across 10 worked scenarios and a deep dive into the variables.",
    houseContext:
      "Homes at the 1,500 sqft mark come in a few common archetypes. The most frequent is the three-bedroom ranch: single-story, 1,400 to 1,600 sqft, typically built between 1955 and 1985, with an attached garage that may or may not be cooled. Per the DOE Building America housing characterization, this archetype dominates the US single-family stock and tends to have R-11 to R-13 walls, R-19 to R-30 ceilings, and original or first-replacement double-pane windows with U-factor around 0.6 to 0.7. Second most common is the small two-story Colonial or Cape Cod, 1,500 to 1,700 sqft total, where the bedrooms are upstairs and need to be cooled despite being naturally warmer than the lower level. A third archetype is the newer townhome (post-2000), typically 1,400 to 1,600 sqft with party walls on one or both sides — these have meaningfully lower cooling loads per square foot because shared walls do not contribute to envelope load. Townhomes can typically size 10 to 15 percent smaller than the calculator's default recommendation for a free-standing home of the same floor area. A fourth archetype, less common but increasing post-2010, is the high-performance new build that meets or exceeds IECC 2021 envelope requirements (R-21 walls, R-60 attic, U-0.28 windows, ACH50 of 3 or below). These can downsize one full equipment tier compared to average construction at the same square footage.",
    equipmentNotes:
      "At 30,000 to 36,000 BTU, the equipment class is central AC or a multi-zone mini-split system. Window AC and portable units max out around 14,000 BTU per unit and cannot reach this capacity from a single piece of equipment. Within central AC, the choice is between 2.5-ton and 3-ton equipment, with the right answer depending on three things: insulation quality, sun exposure, and how often the home is at peak occupancy. For homes with average insulation and mixed sun exposure, 2.5-ton single-stage equipment hits the lower bound of the acceptable range and runs efficiently. For homes with heavy west-facing sun, poor insulation, or a partially-cooled basement that needs to be included in the cooling load, 3-ton is the better fit. Variable-speed (inverter) condensers handle either size more gracefully — they modulate output to match the actual load rather than cycling on and off — and tolerate slight oversizing better than single-stage units. The DOE's 2023 SEER2 rule established 15.2 SEER2 (north) and 14.3 SEER2 (south) as the federal minimum for new central AC installations; mid-tier equipment now runs 16 to 18 SEER2, premium variable-speed equipment 18 to 22 SEER2. Mini-split heat pump systems sized for 30,000 to 36,000 BTU typically come as 2-zone or 3-zone configurations with one outdoor unit and 2 to 3 indoor heads. ENERGY STAR-certified central AC at this capacity costs roughly $4,500 to $9,000 installed (equipment + labor) depending on region; mini-split multi-zone equivalents typically cost 20 to 30 percent more but offer zoning benefits and avoid duct losses.",
    climateVariation:
      "The 1,500 sqft figure alone does not determine the AC size — climate zone shifts the result substantially because both cooling design temperature and indoor-outdoor delta-T vary by zone, per ASHRAE Standard 169-2020 climate data. The same home in climate zone 2 (Gulf Coast — Houston, New Orleans, Tampa) needs approximately 36,000 BTU (3 tons) because the higher cooling design temperature (around 95°F) drives a larger sensible load and humidity is a much bigger fraction of total cooling demand; latent load can add 30 to 40 percent on top of sensible. In climate zone 3 (mid-south — Atlanta, Charlotte, Memphis), expect about 32,000 to 36,000 BTU. Zone 4 (Mid-Atlantic — DC, Cincinnati, Louisville) lands at 30,000 to 33,000 BTU. In climate zone 5 (northern states — Chicago, Boston, Denver), the same home needs about 27,000 to 30,000 BTU (around 2.5 tons). In climate zones 6 and 7 (northern Midwest, mountain west, northern New England), where cooling design temperatures sit in the mid-80s, a properly-sized AC for a 1,500 sqft home can be as small as 22,000 to 24,000 BTU (2 tons) — though most installs in those climates pair AC with a heat pump or use a heat pump for both heating and cooling, where the heating load drives equipment size. Climate zone matters more than minor envelope variation; if you only know one input precisely, get the climate zone right.",
    insulationImpact:
      "Insulation quality shifts the cooling load by ±30 percent versus the calculator's average baseline. A 1,500 sqft home with poor insulation (R-7 walls, R-19 attic, U-1.0 single-pane windows — typical pre-1980 construction) needs about 39,000 BTU (3.5 tons) versus 30,000 BTU (2.5 tons) for the same home with average insulation in zone 4. The opposite case — a 1,500 sqft home with good insulation (R-19+ walls, R-49+ attic, U-0.35 windows — typical 2010s and later construction or thoroughly retrofitted older home) — needs about 27,000 BTU (2.25 tons), often rounding down to a 2.5-ton install. Of all the envelope variables, attic insulation has the largest leverage because the attic is the hottest surface of the cooling-season envelope; DOE Energy Saver recommends R-49 to R-60 in climate zones 4 through 8 and R-30 to R-49 in zones 1 through 3. Air sealing is the unsung hero: a home with ACH50 of 3 (tight new construction) has roughly half the infiltration load of a home with ACH50 of 7 (typical 2000s construction). For older homes considering an AC upgrade, having a BPI-certified energy auditor run a blower-door test before equipment selection typically returns its cost in correctly-sized (i.e., smaller) equipment.",
    occupancyImpact:
      "The calculator adds 600 BTU per occupant above 2 to account for occupant heat gain and humidity — a Manual J convention that approximates a sedentary adult's sensible plus latent contribution. For a 1,500 sqft home, this means a household of 4 adds 1,200 BTU versus a 2-person household, and a household of 6 adds 2,400 BTU. These adjustments are small in the context of a 30,000 BTU load (4 to 8 percent) but matter at the margins when sizing decisions sit on a tonnage boundary. Lifestyle patterns matter more than headcount in some cases: a household that cooks elaborate meals daily, runs multiple computer workstations from home, or operates a small home business with equipment in conditioned space can add 4,000 to 8,000 BTU of internal gain — equivalent to half a ton of equipment. Empty-nester households (2 occupants, daytime quiet, infrequent cooking) often find their previously-sized AC oversized after the children move out; this is a common scenario where the recommendation shifts from 3-ton to 2.5-ton on the next equipment replacement.",
    realWorldNotes:
      "The calculator captures the major variables (size, climate, ceiling, insulation, sun, occupancy, space type), but several real-world factors affect actual cooling demand and equipment selection that this simplified model does not model directly. Window orientation is one: per ACCA Manual J 8th Edition Appendix 3, south-facing and west-facing windows contribute 3 to 5 times the cooling load per square foot of north-facing windows at the same SHGC. A 1,500 sqft home with most windows on the south and west faces has a substantially higher peak cooling load than the same square footage with north-and-east-facing windows. Ductwork condition is another: per DOE Building America research, homes with attic ductwork that is poorly insulated or leaky can lose 20 to 30 percent of cooling capacity to the unconditioned attic, effectively requiring a larger AC than the load alone would indicate. Duct sealing (Manual D-compliant work) often reduces effective AC requirements by half a ton in older homes with leaky ducts. Internal gains from specific appliances also matter: server racks for home offices, dual ovens for home chefs, multiple large televisions, or aquariums each add 1,000 to 4,000 BTU of internal gain. For permit-grade sizing or a high-stakes equipment decision — the AC is a 15-year, $5,000 to $15,000 purchase — a full Manual J load calculation accounts for all of these and is worth the small extra effort.",
    commonMistakes:
      "Five recurring mistakes show up when sizing AC for a 1,500 sqft home. First: using square-foot rules of thumb (\"1 ton per 600 sqft\" or \"20 BTU per sqft\") that ignore climate. These rules can overshoot by a full ton in moderate climates or undershoot in extreme ones; the ENERGY STAR Room AC sizing guide explicitly recommends against them for central AC. Second: oversizing \"to be safe.\" An oversized central AC short-cycles (turns on and off rapidly), pulls less humidity from the air, wears down compressor components faster, and uses more energy per unit of cooling delivered than a properly-sized unit. The DOE explicitly identifies oversizing as one of the top three central AC problems in residential installations. Third: using one unit per floor in a two-story home of this size. A single zoned system with separate thermostats per floor delivers better comfort than two single-zone systems with their own complete equipment, and costs less in equipment and energy. Fourth: matching the new AC to the old AC's size without recalculating. Older homes have often had envelope improvements over the years (new windows, attic top-off, air sealing) that materially reduce the cooling load below the original equipment selection. Fifth: ignoring the heating side when buying a heat pump. A heat pump's nominal capacity refers to cooling; in colder climates the heating load can drive equipment selection upward by half a ton or more. See the heat pump sizing calculator for the dual-load analysis.",
    whenToUpgrade:
      "Use this calculator's recommendation as your sizing answer when you are: (1) installing window AC, portable AC, or single-zone mini-split equipment; (2) replacing a single-stage central AC with similar single-stage equipment and the envelope has not changed significantly; (3) comparing multiple contractor quotes and want a third-party sanity check; or (4) early in the planning process and just want to know the rough equipment class and ballpark cost. Upgrade to a full Manual J load calculation done by a BPI-certified energy auditor or HVAC contractor with ACCA-approved software (Wrightsoft Right-J, Cool Calc Manual J, Elite RHVAC) when you are: (1) installing variable-speed or multi-stage equipment where matching capacity-to-load precisely actually pays off in efficiency; (2) sizing a heat pump where both cooling and heating loads matter (a 5 percent error in heating load translates to meaningfully more aux heat runtime in cold climates); (3) installing new central AC or heat pump equipment that did not exist before (no prior install to compare against); (4) part of a deep envelope retrofit where the new AC will run a much different load than the old one; or (5) required by permit, manufacturer warranty, or rebate program documentation. Most utility rebates for high-efficiency central AC and heat pump equipment require a Manual J as part of the application package — check the rebate program before committing to a contractor.",
    scenarios: [
      {
        title: '1,500 sqft ranch in Atlanta — zone 3, average insulation',
        location: 'Atlanta, Charlotte, Raleigh, Birmingham, Memphis',
        inputs: {
          squareFootage: 1500,
          climateZone: '3',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'The central southeastern US case. Cooling design temperatures around 93°F (per ASHRAE 169-2020) drive a 3-ton central AC recommendation. Humidity is significant in this zone: latent load runs 30 percent of sensible per the climate-driven Manual J factors, so dehumidification performance matters as much as capacity. Variable-speed (inverter) equipment delivers better dehumidification at part-load than single-stage and is the recommended pick for zone 3 retrofits where the existing system is end-of-life and aging on its last legs.',
      },
      {
        title: '1,500 sqft ranch in Cleveland — zone 5, average insulation',
        location: 'Cleveland, Indianapolis, Kansas City, Pittsburgh, Denver',
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
          'The central northern US case. Cooling design temperature around 88°F; 2.5 tons handles peak loads with comfortable margin. If you are installing heating in the same project, a heat pump is increasingly the right call here — heating load in zone 5 is about 1.3× cooling, so a 2.5 to 3-ton heat pump with electric resistance aux backup serves both. Cold-climate certified (NEEP CCASHP listed) equipment is worth the premium in zone 5 if the home is occupied year-round.',
      },
      {
        title: '1,500 sqft ranch in Phoenix — zone 2, heavy west-facing sun',
        location: 'Phoenix, Tucson, Las Vegas, El Paso',
        inputs: {
          squareFootage: 1500,
          climateZone: '2',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'heavy',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'Hot-dry climate with extreme cooling demand. Average insulation combined with heavy west-facing sun pushes the load up substantially: 3.5 to 4 tons rather than the zone 4 baseline of 2.5. The sun factor in the calculator (+15 percent for heavy west exposure) approximates the orientation penalty, but real Manual J distributes solar gain by orientation per ACCA Manual J Appendix 3. For Phoenix-area installs specifically, reflective roofing, deep eaves over west windows, and exterior shading shift the load meaningfully and can downsize equipment by half a ton.',
      },
      {
        title: '1,500 sqft 2-story Colonial in Boston — zone 5, older windows',
        location: 'Boston, Hartford, Albany, Providence',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'A two-story Colonial or Cape Cod in zone 5 with original or aged double-pane windows (U-factor around 0.7 to 0.9) drives the calculator into "poor insulation" territory because windows are typically the dominant conductive loss. The recommendation climbs from 2.5-ton to 3-ton. Two-story layouts at this size benefit from zoned systems with separate thermostats per floor — a single 3-ton single-stage unit on one thermostat tends to overcool downstairs while undercooling upstairs in summer.',
      },
      {
        title: '1,500 sqft well-insulated bungalow in Minneapolis — zone 6',
        location: 'Minneapolis, Milwaukee, Buffalo, Burlington',
        inputs: {
          squareFootage: 1500,
          climateZone: '6',
          ceilingHeight: '8',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'Zone 6 has lower cooling design temperature (around 86°F per ASHRAE 169), and good insulation drops the load further. A 2-ton AC works. But in this climate, heating drives equipment selection — heating load is roughly 1.6× cooling load. If installing a heat pump, size for heating with cold-climate (NEEP CCASHP listed) equipment; the resulting size will exceed what AC alone requires. Standard heat pumps lose substantial capacity below 17°F per NEEP testing protocols, making CCASHP the right architecture in zone 6.',
      },
      {
        title: '1,500 sqft townhome with party walls in Denver — zone 5',
        location: 'Denver, Salt Lake City, Boise, Spokane',
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
          'The calculator above gives the worst-case answer for a 1,500 sqft townhome — it does not model party walls. In reality, an interior townhome with two party walls has roughly 40 percent less exterior wall area than the equivalent free-standing home, dropping the cooling load by 10 to 15 percent. End-unit townhomes (one party wall) get about half that benefit. Subtract about 10 percent from the calculator recommendation for end-units and 15 percent for interior units. For Denver specifically, watch for high-altitude derating: equipment loses 3 percent capacity per 1,000 feet above sea level per AHRI 210/240, so a townhome at 5,200 ft above sea level needs about 16 percent more nameplate capacity than the load calculation alone suggests.',
      },
      {
        title: '1,500 sqft 1970s rural ranch with single-pane windows — zone 4',
        location: 'Rural Ohio Valley, Mid-Atlantic, Appalachia',
        inputs: {
          squareFootage: 1500,
          climateZone: '4',
          ceilingHeight: '8',
          insulationLevel: 'poor',
          sunExposure: 'heavy',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'Older homes with original envelope can need significantly more AC than newer homes the same size: the calculator returns 42,000 to 48,000 BTU (3.5 to 4 tons) versus 30,000 to 33,000 for the same home with average insulation. The fix is rarely more AC. A blower-door test plus attic insulation top-off, basic air sealing, and window storm panels (or replacement) typically shift the load down by 25 to 35 percent — about a full ton of equipment. Per the LBNL air leakage research, retrofit air sealing returns 8 to 18 percent on heating and cooling energy use, often paying back in 3 to 6 years through HVAC bill reduction alone.',
      },
      {
        title: '1,500 sqft new construction with IECC 2021 envelope — zone 5',
        location: 'Newer suburban or infill construction, post-2021',
        inputs: {
          squareFootage: 1500,
          climateZone: '5',
          ceilingHeight: '9',
          insulationLevel: 'good',
          sunExposure: 'mixed',
          occupants: 4,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'New construction meeting IECC 2021 envelope requirements (R-21 walls, R-60 attic, U-0.28 windows, ACH50 of 3 or below) at 1,500 sqft drops to 2 tons in zone 5. Higher ceilings (9 ft typical in newer construction) partially offset the envelope improvement; the calculator captures this with the ceiling-height factor. For Net-Zero or Passive House construction at this square footage, equipment can go as small as 1.5 tons, but at that load level a single ducted mini-split or a multi-zone ductless system serves better than central AC because the equipment is rated for the lower capacity range and operates closer to its sweet spot.',
      },
      {
        title: '1,500 sqft empty-nester home with 2 occupants — zone 4',
        location: 'Post-children household, working-from-home retiree',
        inputs: {
          squareFootage: 1500,
          climateZone: '4',
          ceilingHeight: '8',
          insulationLevel: 'average',
          sunExposure: 'mixed',
          occupants: 2,
          isKitchen: false,
          spaceType: 'living-room',
        },
        takeaway:
          'Lower occupancy drops the internal gain contribution (no additional 1,200 BTU for occupants above 2). Net effect on a 1,500 sqft home is small — about 4 percent reduction in load. The bigger effect is comfort-related: a household of 2 has more flexibility to tolerate slightly slower temperature recovery from setback than a household of 4 with simultaneous showering and cooking. This means a slightly smaller AC (2.5 vs 3 ton boundary) can be acceptable for empty-nester homes where larger families would push for the 3-ton. Worth noting for replacement decisions where the previous AC was sized for a larger household.',
      },
      {
        title: '1,500 sqft home with finished walkout basement — zone 4',
        location: 'Hilly Mid-Atlantic and Midwest neighborhoods',
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
          'The calculator above gives the answer for the 1,500 sqft above-grade space only. A walkout basement of, say, 800 sqft adds to the conditioned area but at a lower per-square-foot cooling load because basement walls stay cooler than outdoor air (ground-coupled). Use the basement-above-grade space type (-20 percent factor) for the basement portion separately, then sum the loads. For 800 sqft of walkout basement at zone 4: roughly 11,000 to 13,000 BTU additional. Total system: 41,000 to 46,000 BTU (3.5 ton equipment, with a single zone or zoned system). Note: cooling a basement is optional in many households; if you only cool the upstairs, the 30,000 to 33,000 BTU calculator recommendation stands.',
      },
    ],
    faq: [
      {
        q: 'What size AC do I need for a 1,500 sq ft house?',
        a: 'In most US climates, a 1,500 sq ft house needs a 2.5 to 3-ton central AC (30,000 to 36,000 BTU). The exact number depends on climate zone, insulation quality, sun exposure, and ceiling height. Zone 4 (Mid-Atlantic) typically lands at 2.5 tons; zone 2 (Gulf Coast) typically needs 3 tons; zone 5 (northern states) often goes 2 to 2.5 tons. Use the calculator above for a zone-specific answer.',
      },
      {
        q: 'Is a 2-ton AC enough for a 1,500 sq ft house?',
        a: 'A 2-ton (24,000 BTU) AC is typically undersized for a 1,500 sq ft home in climate zones 2, 3, or 4. The unit will run continuously on the hottest days without reaching setpoint. A 2-ton unit can work in zone 5 or colder climates with good insulation, modest occupancy, and shaded exposure — see the Minneapolis well-insulated scenario above. In zone 1 or 2 with average insulation, a 2-ton AC will struggle to maintain comfortable temperatures during peak cooling periods.',
      },
      {
        q: 'How many tons of AC for 1,500 sq ft?',
        a: 'The standard answer is 2.5 to 3 tons of central AC for a 1,500 sq ft home in average US climate conditions. Multiply tons by 12,000 to get BTU per hour: 2.5 tons = 30,000 BTU, 3 tons = 36,000 BTU. The "1 ton per 600 sq ft" rule of thumb that contractors sometimes quote is a rough approximation that ignores climate, insulation, and orientation. The DOE Energy Saver guidance explicitly recommends against rules of thumb for central AC sizing.',
      },
      {
        q: 'Why does my contractor recommend a 4-ton AC for my 1,500 sq ft house?',
        a: 'Two common reasons: (1) the contractor used a rule of thumb that overestimates by half a ton or more, especially in moderate climates, or (2) the home has poor insulation, lots of unshaded south or west glass, or attic ductwork that leaks significantly, which can legitimately push a 1,500 sq ft home into 4-ton territory. Ask the contractor for the Manual J load calculation. If they cannot show one, get a second quote. An oversized AC short-cycles, controls humidity poorly, and wears out faster — DOE identifies oversizing as a top-three residential AC problem.',
      },
      {
        q: 'Will a 2.5-ton AC be too small for 1,500 sq ft in a hot climate?',
        a: 'In climate zone 1 or 2 (south Florida, Gulf Coast, lower south), a 2.5-ton AC is at the small end of acceptable for 1,500 sq ft. It will work if insulation is good and sun exposure is moderate, but expect long runtimes during heat waves. 3-ton is the more comfortable pick for these climates. In zones 3 through 6, a 2.5-ton AC is well-sized for a 1,500 sq ft home with average construction.',
      },
      {
        q: 'How much does a central AC for a 1,500 sq ft house cost?',
        a: 'Equipment plus installation for a 2.5 to 3-ton central AC typically runs $4,500 to $9,000 in 2024 dollars, depending on region, equipment efficiency tier, and whether ductwork modifications are needed. ENERGY STAR-certified equipment at the higher SEER2 ratings (18 to 22 SEER2) carries a premium of $1,500 to $3,000 over baseline (15.2 SEER2) equipment. Heat pump equivalents in this size range run 20 to 40 percent more than AC-only but qualify for federal tax credits and many utility rebates under the Inflation Reduction Act.',
      },
      {
        q: 'How long should AC run per cycle for a 1,500 sq ft house?',
        a: 'A properly-sized central AC for a 1,500 sq ft house should run in cycles of 15 to 30 minutes on a typical summer day and 30 to 60 minutes on a hot peak day. Cycles shorter than 10 minutes ("short cycling") indicate oversizing and produce poor humidity control. Cycles longer than 90 minutes on a typical (not peak) day indicate undersizing or a maintenance issue (low refrigerant, clogged filter, leaking ducts). Variable-speed equipment can run for hours at reduced capacity instead of cycling on and off.',
      },
      {
        q: 'Should I get a heat pump instead of an AC for a 1,500 sq ft house?',
        a: 'In most US climates south of zone 5, a heat pump is the better long-term value for a 1,500 sq ft home, especially given Inflation Reduction Act tax credits and utility rebates. A heat pump handles both cooling and heating; replacing a central AC plus furnace with a single heat pump simplifies the system and removes one piece of equipment to maintain. In zones 6 through 8, cold-climate (CCASHP) certified heat pumps are recommended over standard heat pumps to handle the heating side without excessive aux heat use. Per the DOE\'s 2023 IRA implementation guidance, qualifying heat pump installations earn up to $2,000 in federal tax credit plus state and utility incentives.',
      },
      {
        q: 'Does ceiling height matter for AC sizing in a 1,500 sq ft house?',
        a: 'Yes, meaningfully. The calculator applies a +10 percent factor for 9-foot ceilings, +20 percent for 10-foot, and +30 percent for cathedral/12-foot ceilings versus the 8-foot baseline. A 1,500 sq ft single-story home with cathedral ceilings throughout effectively needs the same equipment as a 1,950 sq ft home with 8-foot ceilings. This matters most for open-plan great rooms and contemporary builds with high ceilings; older ranch homes with 8-foot ceilings throughout do not need the adjustment.',
      },
      {
        q: 'Do I need separate AC zones for a 1,500 sq ft house?',
        a: 'Single-story 1,500 sq ft homes generally do not need zoning; a single thermostat handles whole-house cooling well at this size. Two-story 1,500 sq ft homes benefit meaningfully from zoning because hot air rises and second-floor bedrooms run warmer in summer; expect a 3-5°F differential between floors with a single-zone system. A two-zone system with separate thermostats per floor delivers better comfort. Mini-split multi-zone systems handle this natively (each indoor head is its own zone); central AC with zoning requires motorized dampers and a zoning control board, adding $1,500 to $3,000 to the install cost.',
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
