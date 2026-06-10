import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { JsonLdBreadcrumb } from '@/components/seo/JsonLdBreadcrumb';
import { JsonLdSoftwareApplication } from '@/components/seo/JsonLdSoftwareApplication';
import { JsonLdHowTo } from '@/components/seo/JsonLdHowTo';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { FAQ } from '@/components/article/FAQ';
import { Sources } from '@/components/article/Sources';
import {
  calculateHeatPumpSize,
  type HeatPumpInputs,
} from '@/lib/calculators/heat-pump-size';
import { HeatPumpSizeCalculatorClient } from './HeatPumpSizeCalculatorClient';
import { heatPumpExamples } from './examples-manifest';
import { getSources } from '@/lib/seo/sources';
import { CapacityVsOutdoorTemperature } from '@/components/svg/heat-pump-sizing/CapacityVsOutdoorTemperature';
import { ClimateZonesQuickReference } from '@/components/svg/shared/ClimateZonesQuickReference';

export const metadata: Metadata = {
  alternates: { canonical: "/tools/heat-pump-size-calculator/" },
  title: 'Heat Pump Size Calculator: Tonnage by Climate and Square Footage',
  description:
    'Free heat pump sizing calculator with dual-load (cooling + heating) math, balance point estimate, aux heat capacity, and standard vs cold-climate (CCASHP) equipment comparison. 60+ worked use cases across home sizes and climate zones.',
  openGraph: {
    title: 'Heat Pump Size Calculator: Tonnage by Climate and Square Footage',
    description:
      'Heat pump sizing with dual-load (cooling + heating) math, balance point, aux heat capacity, and standard vs cold-climate (NEEP CCASHP) equipment comparison.',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

const DEFAULTS: HeatPumpInputs = {
  squareFootage: 2000,
  climateZone: '5',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 4,
  isKitchen: false,
  spaceType: 'living-room',
  coldClimateEquipment: false,
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'Heat Pump Size Calculator' },
];

const SOFTWARE_APP = {
  name: 'Heat Pump Size Calculator',
  description:
    'Free planning-grade heat pump sizing calculator with dual-load (cooling + heating) math, climate-zone-aware design temperatures, NEEP CCASHP cold-climate equipment model, balance point estimation, and aux heat capacity sizing. Built on ACCA Manual J/S and NEEP CCASHP v4.0 specifications.',
  url: '/tools/heat-pump-size-calculator/',
  featureList: [
    'Dual-load sizing: cooling and heating computed separately',
    'NEEP CCASHP cold-climate equipment toggle (capacity retention at 17°F and 5°F)',
    'Balance-point estimate (temperature where HP capacity equals heating load)',
    'Aux heat capacity sizing at design temperature',
    'Capacity-vs-temperature SVG chart visualizing both equipment classes',
    'Climate-aware sizing strategy recommendations (standard / CCASHP recommended / CCASHP required)',
    'Annual operating cost comparison vs gas furnace, oil furnace, electric resistance',
    'Federal §25C status (expired Dec 31, 2025) and HEEHRA rebate eligibility documented',
    '6 worked-example URLs by home size (1000-3000 sq ft)',
  ],
};

const HOW_TO = {
  name: 'How to size a heat pump for any home',
  description:
    'Determine the right heat pump tonnage by computing both cooling and heating loads, picking the larger as the equipment sizing target, and identifying whether standard or cold-climate-certified (NEEP CCASHP) equipment is needed.',
  totalTime: 'PT4M',
  steps: [
    {
      name: 'Enter total conditioned square footage',
      text: 'Use total conditioned floor area for whole-house sizing. For single-zone mini-split applications, use just the zone being served. Range supported: 300-6,000 sq ft.',
    },
    {
      name: 'Pick climate zone',
      text: 'Climate zone drives both the cooling design temperature (zone 1 around 90°F to zone 8 around 70°F) and the heating design temperature (zone 1 around 47°F to zone 8 around -20°F). The heating-to-cooling load ratio shifts from 0.3 in zone 1 to 2.2 in zone 8.',
    },
    {
      name: 'Set envelope inputs',
      text: 'Ceiling height, insulation quality, sun exposure, space type, occupancy, and kitchen flag are the same as the BTU calculator. These determine both cooling and heating loads.',
    },
    {
      name: 'Decide whether to toggle Cold-Climate (CCASHP) equipment',
      text: 'CCASHP equipment maintains 70% of 47°F capacity at 17°F and 58% at 5°F per the NEEP v4.0 spec. Standard heat pumps drop to about 60% at 17°F and 33% at 5°F. In zones 1-3 standard is sufficient. In zones 5-8 CCASHP is recommended or required.',
    },
    {
      name: 'Click Calculate',
      text: 'Result shows: recommended tonnage, cooling load, heating load, balance point (temperature where heat pump capacity equals home heating load), aux heat capacity needed at design temperature, equipment recommendation, and a sized capacity-vs-temperature chart.',
    },
    {
      name: 'Verify the recommendation matches your contractor proposal',
      text: 'A heat pump quote should reference both cooling and heating loads (not just "X tons"). Compare the proposed AHRI 47°F nameplate against the calculated cooling load; it should fall within Manual S tolerance (15-25% above Manual J cooling load). Check that the proposed equipment\'s 17°F and 5°F capacity (from AHRI directory) covers heating load at design temperature with the aux strip size recommended.',
    },
  ],
};

const RELATED = [
  {
    title: 'Heat pump sizing',
    url: '/heat-pump/sizing/',
    description:
      'The cornerstone article on heat pump sizing methodology this calculator implements.',
  },
  {
    title: 'Heat pump aux heat',
    url: '/heat-pump/aux-heat/',
    description: 'How aux heat strips work and how to size them for your equipment.',
  },
  {
    title: 'Heat pump defrost cycle',
    url: '/heat-pump/cold-climate/defrost-cycle/',
    description: 'How and why heat pumps defrost, and how CCASHP equipment manages it.',
  },
  {
    title: 'Manual J load calculation',
    url: '/manual-j/',
    description:
      'For permit-grade equipment specification, you need a full Manual J calculation.',
  },
];

const CONCEPTS = [
  {
    title: 'Balance point',
    description:
      'The outdoor temperature at which heat pump capacity equals home heating load. Above the balance point, the heat pump alone keeps up. Below, aux heat supplements.',
    detail:
      'A 2.5-ton standard heat pump in a 1,500 sqft zone 5 home has a balance point in the high 20s°F. The same home with CCASHP equipment drops the balance point to the low teens°F — reducing aux runtime 60–80 percent across the heating season.',
  },
  {
    title: 'Aux (auxiliary) heat',
    description:
      'Electric resistance heat strips that fire when the heat pump cannot meet load. Aux heat costs 2–3× per BTU more than heat pump heat at typical electricity rates.',
    detail:
      'Aux strip kits come in 5kW, 10kW, 15kW, 20kW standard sizes. Right-sizing matters: too small fails on coldest days, too large unnecessarily increases peak electrical draw and may force panel upgrade.',
  },
  {
    title: 'CCASHP vs standard',
    description:
      'NEEP-listed cold-climate (CCASHP) heat pumps deliver 85 percent of rated capacity at 17°F vs 60 percent for standard equipment. The difference shows up directly in balance point and aux runtime.',
    detail:
      'CCASHP equipment costs $2,000–$5,000 more than standard at typical residential sizes. Federal §25C tax credit returned up to $2,000 for installs completed by Dec 31, 2025 (not available for 2026 installs under current IRS guidance); many state and utility rebates continue to favor CCASHP. Premium often pays back in 6–12 years even without §25C, depending on state incentives and electric rates.',
  },
];

const EQUIPMENT_CATEGORIES = [
  {
    title: 'Central ducted heat pump',
    bestFor: 'Homes with existing ductwork',
    sizeRange: '1.5 to 5 tons (single unit)',
    architecture: 'One outdoor unit, one indoor air handler, distribution via ducts',
    pros: [
      'Lowest cost when ductwork exists',
      'Hidden equipment (no visible indoor units)',
      'Wide model selection at all tonnages',
    ],
    cons: [
      'Duct losses 15–30% in unconditioned space',
      'Single-zone unless dampers added',
      'Limited by existing duct sizing',
    ],
  },
  {
    title: 'Ductless mini-split (multi-zone)',
    bestFor: 'No existing ductwork, or room-by-room control',
    sizeRange: '0.5 to 5 tons (multi-head)',
    architecture: 'One outdoor unit, multiple indoor heads (typically 2–6)',
    pros: [
      'No duct losses',
      'Native zoning per indoor head',
      'Best part-load efficiency',
    ],
    cons: [
      '20–40% premium vs equivalent ducted',
      'Indoor heads visible on walls',
      'Higher installer skill requirement',
    ],
  },
  {
    title: 'Dual-fuel (heat pump + gas furnace)',
    bestFor: 'Cheap natural gas markets, transition retrofits',
    sizeRange: '2 to 5 tons heat pump + matched furnace',
    architecture: 'Heat pump handles cooling and shoulder seasons; furnace handles deep cold',
    pros: [
      'Optimized operating cost in cheap-gas regions',
      'Furnace as familiar deep-cold backup',
      'Reduced electrical service requirement',
    ],
    cons: [
      'Highest capital cost',
      'Reduced IRA / state incentive eligibility',
      'Two systems to maintain over time',
    ],
  },
];

const CLIMATE_TABLE = [
  {
    zone: 'Zone 1',
    cities: 'South Florida, Hawaii',
    heatingDesign: '47°F',
    coolingDesign: '91°F',
    loadRatio: '0.3×',
    sizingDriver: 'Cooling',
    equipmentNote: 'Standard; cooling drives size',
  },
  {
    zone: 'Zone 2',
    cities: 'Houston, NOLA, Tampa',
    heatingDesign: '30°F',
    coolingDesign: '95°F',
    loadRatio: '0.5×',
    sizingDriver: 'Cooling',
    equipmentNote: 'Standard; aux rarely fires',
  },
  {
    zone: 'Zone 3',
    cities: 'Atlanta, Memphis, Charlotte',
    heatingDesign: '22°F',
    coolingDesign: '93°F',
    loadRatio: '0.7×',
    sizingDriver: 'Cooling',
    equipmentNote: 'Standard; low aux runtime',
  },
  {
    zone: 'Zone 4',
    cities: 'DC, Cincinnati, St Louis',
    heatingDesign: '15°F',
    coolingDesign: '90°F',
    loadRatio: '1.0×',
    sizingDriver: 'Balanced',
    equipmentNote: 'Standard or CCASHP both work',
  },
  {
    zone: 'Zone 5',
    cities: 'Cleveland, Boston, Denver',
    heatingDesign: '5°F',
    coolingDesign: '88°F',
    loadRatio: '1.3×',
    sizingDriver: 'Heating',
    equipmentNote: 'CCASHP recommended',
  },
  {
    zone: 'Zone 6',
    cities: 'Minneapolis, Buffalo',
    heatingDesign: '-2°F',
    coolingDesign: '86°F',
    loadRatio: '1.6×',
    sizingDriver: 'Heating',
    equipmentNote: 'CCASHP strongly recommended',
  },
  {
    zone: 'Zone 7',
    cities: 'N Minnesota, mountain west',
    heatingDesign: '-10°F',
    coolingDesign: '84°F',
    loadRatio: '1.9×',
    sizingDriver: 'Heating',
    equipmentNote: 'CCASHP required + dual-fuel option',
  },
  {
    zone: 'Zone 8',
    cities: 'Interior Alaska',
    heatingDesign: '-20°F',
    coolingDesign: '80°F',
    loadRatio: '2.2×',
    sizingDriver: 'Heating',
    equipmentNote: 'CCASHP + dual-fuel typical',
  },
];

const MISTAKES = [
  {
    title: 'Sizing the heat pump to cooling load only',
    description:
      'A heat pump must handle both cooling and heating. In zones 4+, heating load is the larger of the two. Sizing to cooling alone leaves heating capacity short, forcing aux heat to fire frequently at 2–3× the operating cost of heat pump heat.',
  },
  {
    title: 'Skipping the CCASHP question in zones 5+',
    description:
      'Standard heat pumps work in zone 5 but produce a balance point in the high 20s°F. CCASHP equipment shifts the balance point to the teens°F, reducing aux runtime 60–80 percent. With IRA tax credit and state/utility rebates, CCASHP premium often pays back in 6–12 years.',
  },
  {
    title: 'Oversizing equipment "to be safe"',
    description:
      'Oversized heat pumps short-cycle (turn on and off rapidly), control humidity poorly in summer, deliver uneven heating in winter, and wear out faster. The DOE identifies oversizing as a top-three residential HVAC problem.',
  },
  {
    title: 'Ignoring electrical service capacity',
    description:
      'Heat pumps with aux heat strips can draw 50–100+ amps in heating mode at design conditions. Older 100-amp services may need upgrade ($1,500–$4,000) before installation. 200-amp services are typically fine for most residential sizes.',
  },
  {
    title: 'Using the wrong calculator',
    description:
      'AC sizing alone gives the wrong answer for heat pump equipment. Use this dual-load calculator, not the BTU or AC sizing calculator, for heat pump decisions. Heat pump sizing must consider both peak cooling and peak heating loads.',
  },
];

const INCENTIVES = [
  {
    name: 'Federal IRA §25C tax credit (HVAC scope expired Dec 31, 2025)',
    amount: 'Expired Dec 31, 2025',
    description:
      "Was 30 percent of project cost up to a $2,000 cap for qualifying heat pumps. ENERGY STAR Most Efficient or CCASHP-listed equipment qualified. Last claimable on the 2025 tax return for installs completed by Dec 31, 2025; not available for 2026 installs under current IRS guidance (IRS FS-2025-05, supersedes FS-2022-40 after One Big Beautiful Bill Act). Verify the IRS Energy Efficient Home Improvement Credit page before assuming a 2026 credit.",
  },
  {
    name: 'IRA High-Efficiency Electric Home Rebate (HEEHR / HEEHRA)',
    amount: 'State-administered',
    description:
      'Income-tiered rebate for low and moderate income households, up to $8,000 for heat pump installations. Administered by states; status and funding vary by state. Verify your state energy office before assuming a specific rebate amount.',
  },
  {
    name: 'State and utility rebates',
    amount: '$500–$5,000+',
    description:
      'Examples: NYSERDA Clean Heat, Mass Save, Efficiency Vermont, Energize CT, ComEd, Xcel Energy, NW Natural Smart Energy. Administered independent of federal program changes; oil-furnace replacement programs often pay more.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What size heat pump do I need?',
    a: 'A planning estimate uses 22 BTU/sqft × climate factor × envelope factor × space-type factor. For a 1,500 sqft average-envelope home in zone 5, that returns about 2.5 tons (30,000 BTU). Use the calculator above for a climate-specific answer, or pick a worked example from the Common Scenarios grid that matches your home size.',
  },
  {
    q: 'What is a balance point?',
    a: "The outdoor temperature at which the heat pump's heating capacity equals the home's heating load. Above the balance point, the heat pump alone keeps up. Below, aux heat must supplement. Standard heat pumps in zone 5 typically have balance points in the upper 20s°F; CCASHP equipment drops the balance point to the low teens°F.",
  },
  {
    q: 'What is auxiliary (aux) heat?',
    a: 'Electric resistance heat strips that fire when the heat pump cannot meet load. Aux heat costs 2–3× per BTU more than heat pump heat at typical electricity rates. Aux strip kits come in standard sizes (5kW, 10kW, 15kW, 20kW). Sizing should match the heating load shortfall at design conditions, not the full heating load.',
  },
  {
    q: 'What is the difference between standard and cold-climate (CCASHP) heat pumps?',
    a: 'Standard heat pumps deliver about 60 percent of rated heating capacity at 17°F and 33 percent at 5°F. NEEP-listed cold-climate (CCASHP) equipment delivers 85 percent at 17°F and 70 percent at 5°F. The difference shows up directly in balance point and aux runtime over the heating season.',
  },
  {
    q: 'Does this calculator work for ductless mini-splits?',
    a: 'Yes — heat pump sizing methodology applies equally to ducted central systems and ductless mini-splits. The dual-load math (cooling + heating) is the same. Mini-splits are typically sold in tonnages from 0.5 to 1.5 tons per indoor head; the recommended total tonnage divides across heads based on per-room loads.',
  },
  {
    q: 'Should I get a heat pump or a furnace + AC?',
    a: 'In zones 2-6, a heat pump increasingly the better long-term choice, especially given Inflation Reduction Act incentives. A heat pump replaces both AC and furnace, simplifies the system, and qualifies for federal tax credit. In very cold zones (7-8), dual-fuel or CCASHP both reasonable architectures.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'Output is accurate within about 15 percent for typical homes against ACCA Manual J reference cases. Adequate for early planning, contractor quote comparison, or sanity-check. For permit submission, manufacturer warranty, or court-grade documentation, use ACCA-approved software (Wrightsoft Right-J, Cool Calc, Elite RHVAC) or a certified contractor.',
  },
  {
    q: 'Why does climate zone matter so much?',
    a: "Per ASHRAE Standard 169-2020, heating design temperatures vary dramatically: zone 4 around 15°F, zone 5 around 5°F, zone 7 around -10°F. Heat pump capacity also varies with outdoor temperature. The combination means same-size home needs different equipment in different zones, and standard equipment is suitable in some zones while CCASHP is required in others.",
  },
  {
    q: 'Can a heat pump heat my house when it is freezing outside?',
    a: 'Yes — modern heat pumps work well below freezing. CCASHP equipment maintains useful heating capacity to -10°F or below per NEEP testing protocols. Below the balance point, aux heat (electric resistance strips) supplements the heat pump. Older 1980s-90s heat pumps that shut off in cold weather are not representative of modern equipment.',
  },
  {
    q: 'Do I need a Manual J load calculation?',
    a: "For early planning, comparing contractor quotes, or sanity-check before buying equipment, this calculator's output is sufficient. For permit submission, state rebate documentation, manufacturer warranty claims, or installations with significant envelope changes, get a full Manual J done by a certified contractor. (Federal §25C tax credit applications used to require Manual J documentation; §25C HVAC scope expired Dec 31, 2025 — verify current IRS guidance before assuming credit eligibility.)",
  },
  {
    q: 'How much does a heat pump cost?',
    a: 'Single-family residential heat pumps run $4,500 (small standard) to $25,000 (large multi-zone CCASHP) installed. Typical 2.5–3.5 ton residential CCASHP installation: $8,500–$13,000. Federal §25C tax credit returned up to $2,000 for installs completed by Dec 31, 2025 (not available for 2026 installs under current IRS guidance — verify with IRS); state/utility rebates continue to add $500-$5,000+. See the specific example page for your home size for detailed cost breakdowns.',
  },
  {
    q: 'How long does a heat pump last?',
    a: 'Modern residential heat pumps typically last 15–20 years with proper maintenance. Variable-speed equipment may run longer due to gentler cycling. Compressor failure is the typical end-of-life event; ductless mini-split systems tend to have slightly longer lifetimes than central ducted equipment.',
  },
];

const SOURCE_IDS = [
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
];

export default function Page() {
  const sources = getSources(SOURCE_IDS);

  return (
    <Container>
      <JsonLdBreadcrumb items={BREADCRUMBS} />
      <JsonLdSoftwareApplication application={SOFTWARE_APP} />
      <JsonLdHowTo howTo={HOW_TO} />
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
          Heat Pump Size Calculator
        </h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the right heat pump size for your home. Dual-load (cooling + heating)
          math, balance point estimate, and aux heat capacity. Standard vs cold-climate
          (CCASHP) equipment comparison across all US climate zones.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        Heat pump sizing handles two different loads (cooling and heating). This calculator
        gives a planning estimate based on climate zone defaults; for permit-grade equipment
        specification, get a Manual J from your installer or hire one independently. See{' '}
        <Link className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </Link>{' '}
        for accuracy bands.
      </Callout>

      <section className="mt-8">
        <HeatPumpSizeCalculatorClient defaults={DEFAULTS} />
      </section>


      <section className="mt-12">
        <h2 className="text-2xl font-bold text-ink-900">Find your climate zone first</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Climate zone is the single most important input in any HVAC sizing decision —
          it drives both heating and cooling design temperatures and the
          equipment-class recommendation. The reference card below covers all eight
          US climate zones with sample cities and design temperatures.
        </p>
        <ClimateZonesQuickReference />
      </section>

      {/* Capacity vs outdoor temperature visualization */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>Why outdoor temperature is the central variable</h2>
        <p>
          The single concept that separates heat pump sizing from AC sizing is that heat
          pump heating capacity drops with outdoor temperature. The chart below shows the
          standard residential heat pump curve, the cold-climate (CCASHP) curve, and a
          typical home heating-load line. The intersection of the capacity curve and the
          load line is the balance point — the temperature below which aux heat must
          supplement the heat pump.
        </p>
      </section>

      <CapacityVsOutdoorTemperature />

      <section className="prose prose-slate mt-6 max-w-prose">
        <p>
          The CCASHP curve sits well above the standard curve at low temperatures, which is
          why the same nominal tonnage produces a much lower balance point with CCASHP
          equipment. In zones 5-8 that difference reduces aux heat runtime by 60-80% across
          a heating season — typically translating to $200-$600 per year of avoided
          electric-resistance operating cost. See the{' '}
          <a className="text-brand underline" href="/heat-pump/sizing/">heat pump sizing article</a>
          {' '}for the full balance-point math and the{' '}
          <a className="text-brand underline" href="/heat-pump/aux-heat/">aux heat article</a>
          {' '}for the resistance-strip sizing rules.
        </p>
      </section>

      {/* Overview */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>What this calculator answers</h2>
        <p>
          Heat pump sizing is harder than AC sizing because the heat pump handles both jobs
          — cooling in summer and heating in winter — with capacity that varies with outdoor
          temperature. This calculator computes both peak loads, picks the larger as the
          equipment size, then estimates the balance point and aux heat capacity required at
          the heating design temperature.
        </p>
        <p>
          Enter your home characteristics in the inputs above, click <strong>Calculate</strong>,
          and the result chart shows recommended tonnage, balance point, aux heat capacity at
          design, and equipment class recommendation. For a deeper walkthrough on a specific
          home size, the Common Scenarios grid below links to dedicated pages for each
          common house size with 10 worked use cases per page.
        </p>
      </section>

      {/* The 3 core concepts */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Three concepts you need to know
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Heat pump sizing rests on three concepts that AC sizing does not require. Get
          these right and the equipment decision follows naturally.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {CONCEPTS.map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-3 text-sm text-ink-700">{c.description}</p>
              <div className="mt-4 rounded-lg bg-brand/5 p-3">
                <p className="text-xs text-ink-700">{c.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How heat pump sizing differs from AC */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>How heat pump sizing differs from AC sizing</h2>
        <p>
          AC sizing optimizes for one number: the cooling load at the 1 percent cooling
          design temperature. Heat pump sizing must handle two: cooling load AND heating
          load at the 99 percent heating design temperature. These are usually different
          numbers, and the difference grows with climate extremity.
        </p>
        <p>
          The calculator picks the larger of the two loads as the equipment size, then
          computes the balance point — the outdoor temperature where the heat pump&apos;s
          heating capacity equals the home&apos;s heating load. Above the balance point,
          the heat pump alone is enough. Below, aux heat fills the gap.
        </p>
        <p>
          This dual-load methodology is what separates heat pump sizing from AC sizing and
          why the AC size calculator gives the wrong answer for heat pumps.
        </p>
      </section>

      {/* Climate table */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Climate zone effect on heat pump sizing
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Same home, different climate zones. Heating-to-cooling load ratio drives equipment
          selection from cooling-dominated (zone 1-3) to heating-dominated (zone 5+).
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-ink-300 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-200 bg-ink-50 text-left">
                <th className="px-4 py-3 font-semibold text-ink-900">Zone</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Cities</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Heating design</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Cooling design</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Load ratio</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Driver</th>
                <th className="px-4 py-3 font-semibold text-ink-900">Equipment</th>
              </tr>
            </thead>
            <tbody>
              {CLIMATE_TABLE.map((row, idx) => (
                <tr
                  key={row.zone}
                  className={
                    idx % 2 === 0
                      ? 'border-b border-ink-200'
                      : 'border-b border-ink-200 bg-ink-50/50'
                  }
                >
                  <td className="px-4 py-3 font-semibold text-ink-900">{row.zone}</td>
                  <td className="px-4 py-3 text-ink-700">{row.cities}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{row.heatingDesign}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{row.coolingDesign}</td>
                  <td className="px-4 py-3 font-medium text-ink-900">{row.loadRatio}</td>
                  <td className="px-4 py-3 text-ink-700">{row.sizingDriver}</td>
                  <td className="px-4 py-3 text-ink-700">{row.equipmentNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-ink-500">
          Design temperatures per ASHRAE Standard 169-2020 (99% heating, 1% cooling).
        </p>
      </section>

      {/* Common scenarios — links to size-specific deep pages */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Worked heat pump sizing across the most common US home sizes. Each page contains
          10 use cases spanning climate zones, equipment classes, and architecture choices —
          plus equipment options, climate variation, common mistakes, and a calculator
          pre-loaded with that scenario&apos;s defaults.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heatPumpExamples.map((ex) => {
            const exResult = calculateHeatPumpSize(ex.inputs);
            return (
              <Link
                key={ex.slug}
                href={`/tools/heat-pump-size-calculator/examples/${ex.slug}/`}
                className="group flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm transition hover:border-brand hover:shadow-md"
              >
                <h3 className="text-base font-semibold text-ink-900 group-hover:text-brand">
                  {ex.title}
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
                      Recommended
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-brand">
                      {exResult.recommendedTons} tons
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
                      Balance point
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-ink-900">
                      {exResult.balancePointF}°F
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-600">
                  10 worked use cases across climate zones, equipment classes, and home
                  archetypes.
                </p>
                <p className="mt-3 text-xs font-medium text-brand">View full page →</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Equipment categories */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">Equipment architectures</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Three installation architectures cover residential heat pump scenarios. Choice
          depends on existing ductwork, comfort priority, and budget.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
            >
              <div className="border-b border-ink-200 pb-4">
                <h3 className="text-base font-semibold text-ink-900">{cat.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand">
                  {cat.bestFor}
                </p>
              </div>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                    Size range
                  </dt>
                  <dd className="mt-0.5 text-ink-900">{cat.sizeRange}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                    Architecture
                  </dt>
                  <dd className="mt-0.5 text-ink-900">{cat.architecture}</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-good">
                    Pros
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {cat.pros.map((p) => (
                      <li key={p} className="flex gap-2 text-ink-700">
                        <span className="font-bold text-good">+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-warn">
                    Considerations
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {cat.cons.map((c) => (
                      <li key={c} className="flex gap-2 text-ink-700">
                        <span className="font-bold text-warn">−</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* IRA incentives */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Federal and state incentives (2024)
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          The Inflation Reduction Act materially shifted heat pump economics in the US. Stack
          federal credit with state and utility programs for total project savings.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {INCENTIVES.map((inc) => (
            <article
              key={inc.name}
              className="rounded-xl border border-good/30 bg-good/5 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-good">
                {inc.name}
              </p>
              <p className="mt-3 text-2xl font-bold text-ink-900">{inc.amount}</p>
              <p className="mt-3 text-sm text-ink-700">{inc.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 max-w-prose text-sm text-ink-500">
          Eligibility and amounts current as of 2024. Check program specifics before
          committing to equipment; some require Manual J documentation as part of the
          application.
        </p>
      </section>

      {/* Common mistakes */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          {MISTAKES.length} common heat pump sizing mistakes
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          High-level mistakes that show up across home sizes and climate zones. See the
          specific Common Scenario page for your home size for size-specific mistakes.
        </p>
        <div className="mt-6 space-y-4">
          {MISTAKES.map((m, i) => (
            <article
              key={m.title}
              className="flex gap-4 rounded-xl border-l-4 border-warn bg-warn/5 p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warn text-base font-bold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink-900">{m.title}</h3>
                <p className="mt-1.5 text-sm text-ink-700">{m.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Decision matrix: this calc vs Manual J */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          When this calculator is enough — and when to upgrade to Manual J
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border-2 border-good/40 bg-good/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-good">
              Use this calculator
            </p>
            <p className="mt-2 text-base font-semibold text-ink-900">
              For planning-grade sizing
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                'Evaluating whether a heat pump retrofit makes sense',
                'Comparing contractor quotes with varying tonnage',
                'Sanity-check before committing to specific equipment',
                'DIY-ing a window or single-zone mini-split install',
                'Budget estimation for capital planning',
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-ink-700">
                  <span className="mt-0.5 shrink-0 font-bold text-good">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border-2 border-brand/40 bg-brand/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">
              Upgrade to full Manual J
            </p>
            <p className="mt-2 text-base font-semibold text-ink-900">
              When precision matters
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                'Multi-zone or whole-home equipment matching',
                'Federal §25C tax credit applications (for installs completed on or before Dec 31, 2025; verify current IRS guidance for 2026 installs)',
                'State / utility rebate documentation (NYSERDA, Mass Save, etc.)',
                'After significant envelope retrofit invalidating prior load',
                'Dual-fuel architecture with precise crossover setting',
                'Cold-climate installs (zone 6+) for exact aux strip selection',
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-ink-700">
                  <span className="mt-0.5 shrink-0 font-bold text-brand">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Methodology */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>Methodology</h2>
        <p>
          The calculator implements the dual-load methodology from the{' '}
          <Link className="text-brand underline" href="/heat-pump/sizing/">
            heat pump sizing article
          </Link>
          . Cooling load uses the BTU calculator methodology (baseline 22 BTU/sqft with
          climate, ceiling, sun, insulation, space-type adjustments). Heating load multiplies
          cooling load by a climate-zone heating factor calibrated against ASHRAE Standard
          169-2020 design temperatures and ACCA Manual J reference cases.
        </p>
        <p>
          Equipment sizing picks the larger load and rounds to standard residential tonnage
          (12, 18, 24, 30, 36, 42, 48, 60 kBTU). Balance point finds the outdoor temperature
          where the heat pump&apos;s heating capacity equals the home&apos;s heating load,
          using piecewise capacity curves derived from ENERGY STAR performance data for
          standard equipment and NEEP CCASHP testing protocols for cold-climate equipment.
          Aux heat at design is the difference between heating load and heat pump capacity
          at the heating design temperature.
        </p>
        <p>
          Accuracy targets ±15 percent on whole-home heating and cooling loads versus ACCA
          Manual J reference cases for typical residential construction. Verification
          methodology is documented in the{' '}
          <Link
            className="text-brand underline"
            href="/methodology/how-we-verify-manual-j/"
          >
            how we verify
          </Link>{' '}
          article. For permit-grade equipment selection on a real install (typically
          $8,000-$20,000 equipment + install cost), use ACCA-approved software (Wrightsoft
          Right-J, Cool Calc Manual J, Elite RHVAC) or a certified contractor.
        </p>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <RelatedArticles items={RELATED} />

      <Sources sources={sources} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
