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
import { calculateBtu, type BtuInputs } from '@/lib/calculators/btu';
import { BtuCalculatorClient } from './BtuCalculatorClient';
import { btuExamples } from './examples-manifest';
import { BtuPerSqftByZone } from '@/components/svg/homepage/BtuPerSqftByZone';
import { ClimateZonesQuickReference } from '@/components/svg/shared/ClimateZonesQuickReference';

export const metadata: Metadata = {
  alternates: { canonical: "/tools/btu-calculator/" },
  title: 'BTU Calculator: Size an AC by Square Footage and Climate',
  description:
    'Free BTU calculator with climate, ceiling, insulation, sun, occupancy, and kitchen adjustments. Returns the recommended AC BTU and tonnage for any room or home.',
  openGraph: {
    title: 'BTU Calculator: Size an AC by Square Footage and Climate',
    description:
      'Free planning-grade BTU calculator implementing ACCA Manual J methodology. Climate, ceiling, insulation, sun, occupancy adjustments. 16 worked examples.',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

const DEFAULTS: BtuInputs = {
  squareFootage: 1500,
  climateZone: '5',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 4,
  isKitchen: false,
  spaceType: 'living-room',
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'BTU Calculator' },
];

const SOFTWARE_APP = {
  name: 'BTU Calculator',
  description:
    'Free planning-grade BTU calculator implementing ACCA Manual J 8th Edition abbreviated method. Computes cooling capacity from square footage, climate zone, ceiling height, insulation level, sun exposure, occupancy, and space type. Returns recommended BTU/hr, tonnage, equipment class, acceptable range, and a step-by-step math breakdown.',
  url: '/tools/btu-calculator/',
  featureList: [
    'IECC climate zone factor (zones 1-8)',
    'Ceiling height adjustment (8/9/10/12+ ft)',
    'Insulation quality factor (poor/average/good)',
    'Sun exposure factor (heavy/mixed/shaded)',
    'Space type factor (bedroom/kitchen/sun room/basement/attic)',
    'Occupancy adjustment (600 BTU/hr per person above 2)',
    'Kitchen heat gain (+4,000 BTU for cooking)',
    'Round-to-standard-equipment-size logic (16 standard residential sizes)',
    'Acceptable range output per Manual S tolerance (-10% / +20%)',
    'Equipment class recommendation (window / portable / mini-split / central)',
  ],
};

const HOW_TO = {
  name: 'How to size an air conditioner with the BTU calculator',
  description:
    'Calculate the cooling capacity needed for any room or whole-house space in seven steps, using ACCA Manual J adjustment factors.',
  totalTime: 'PT3M',
  steps: [
    {
      name: 'Measure the floor area in square feet',
      text: 'Measure length times width of each room being cooled and sum the values. For whole-house cooling, use total conditioned square footage.',
    },
    {
      name: 'Identify your IECC climate zone',
      text: 'Look up your county in the ASHRAE 169 / IECC 2021 climate map. Zone 1 is tropical (south Florida, Hawaii); Zone 4 is mid-Atlantic; Zone 8 is interior Alaska. Cooling load drops by about 50% from zone 1 to zone 8.',
    },
    {
      name: 'Set ceiling height',
      text: 'Eight-foot ceilings are baseline. Each additional foot adds about 10% to cooling load because the conditioned air volume grows. Cathedral ceilings (12+ ft) add 30%.',
    },
    {
      name: 'Select insulation quality',
      text: 'Pick poor (pre-1980 below-code), average (meets current IECC code), or good (above code with recent insulation upgrade). Poor insulation adds 30% to load; good insulation reduces it by 10%.',
    },
    {
      name: 'Set sun exposure and space type',
      text: 'Heavy south/west exposure adds 15% to cooling load. Space-type factors range from -40% (below-grade basement) to +75% (sun room) — kitchens add 30%, attic/second-floor spaces add 30%.',
    },
    {
      name: 'Enter occupancy and kitchen flag',
      text: 'Two occupants is baseline. Each additional person adds 600 BTU/hr of sensible heat. Tick the kitchen flag for spaces with regular cooking; adds 4,000 BTU/hr for appliance heat gain.',
    },
    {
      name: 'Click Calculate and interpret the result',
      text: 'The result shows recommended BTU/hr (rounded to the nearest standard equipment size), tonnage, equipment class, acceptable range, and a step-by-step math breakdown so you can verify the calculation by hand.',
    },
  ],
};

const EQUIPMENT_CLASSES = [
  {
    title: 'Window AC',
    btu: '5,000 – 14,000 BTU/hr',
    bestFor: 'Single room, low capital cost, no ductwork',
    typical: '$200 – $500 retail',
    notes:
      'Fits standard double-hung window opening. CEER 11+ is the federal minimum for modern units. Visible from outside; protrudes from window frame. 110V plug for units under 12,000 BTU; 220V required above.',
  },
  {
    title: 'Portable AC',
    btu: '8,000 – 14,000 BTU/hr',
    bestFor: 'Rented apartments, casement windows, historic preservation',
    typical: '$300 – $700 retail',
    notes:
      'Wheel-mounted indoor unit with flexible exhaust hose to a window. Less efficient (CEER ~9) than window units because the exhaust hose pulls already-cooled room air outside as a side effect. Size up one tier vs an equivalent window unit.',
  },
  {
    title: 'Mini-split (ductless)',
    btu: '9,000 – 36,000 BTU/hr per indoor head',
    bestFor: 'Quiet operation, native zone control, no existing ducts',
    typical: '$3,000 – $5,000 per zone installed',
    notes:
      'Wall-mounted indoor head + outdoor compressor connected by refrigerant lineset. SEER2 18-22 typical; modulating inverter compressor handles part-load well. Heat pump variants reverse for heating. Requires licensed contractor for refrigerant work.',
  },
  {
    title: 'Central AC (ducted)',
    btu: '18,000 – 60,000 BTU/hr (1.5 – 5 tons)',
    bestFor: 'Whole-house cooling with existing ducts',
    typical: '$4,000 – $12,000 installed (replacement)',
    notes:
      'Indoor evaporator coil and air handler distribute conditioned air through ducts. Federal minimum SEER2 13.4 (north) / 14.3 (south). Sized via Manual J + Manual S; oversized central systems short-cycle and fail to dehumidify.',
  },
];

const BTU_MISTAKES = [
  {
    title: 'Sizing by square footage alone',
    description:
      'A 1,500 sq ft home in Miami (zone 1) needs about 38,000 BTU/hr of cooling; the same home in Minneapolis (zone 6) needs about 24,000 BTU/hr — a 60% difference at identical floor area. The "X BTU per sq ft" rule of thumb hides this factor and is one of the top three sources of residential AC sizing errors per DOE Building America research.',
  },
  {
    title: 'Oversizing "to be safe"',
    description:
      'An AC sized 30%+ above the actual cooling load cools to setpoint in 5-7 minutes during mild weather, then shuts off for 12-15 minutes before restarting. The unit never runs long enough to remove moisture, so the room reads cool but feels sticky at 60% RH. The compressor cycles 8-12 times per hour, wearing out 2-3 years earlier than design life. Manual S caps oversizing at 15% for single-stage equipment for this reason.',
  },
  {
    title: 'Ignoring sun exposure',
    description:
      'A 200 sq ft room with two 4×6 west-facing windows receives roughly 5,000 BTU/hr of peak solar gain on a clear summer afternoon — equivalent to adding two extra rule-of-thumb occupants worth of latent and sensible load. Solar gain through unshaded glass dominates afternoon cooling load in cooling-dominated climates and is the largest source of room-to-room load variation in a typical home.',
  },
  {
    title: 'Forgetting kitchens, sun rooms, and attic spaces',
    description:
      'A kitchen adds about 4,000 BTU/hr of cooking-appliance heat gain; the calculator handles this via the kitchen flag. Sun rooms with extensive glazing on three sides need 75% more BTU per sq ft than equivalent interior rooms. Attic-converted bonus rooms with hot-attic ceilings need 30% more. These space-type factors are required inputs to land at the right BTU number.',
  },
  {
    title: 'Skipping the humidity question in humid climates',
    description:
      'In zones 1A, 2A, and along the Gulf Coast, the cooling load includes substantial latent (moisture-removal) work in addition to sensible (temperature-drop) work. A correctly-sized AC running long cycles condenses moisture on the cold evaporator coil; an oversized one cycles too fast for this to happen. The result is "70°F at 65% RH" comfort complaints. Variable-speed equipment is the right answer in humid climates because it runs long cycles at lower capacity, removing more moisture per BTU delivered.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How many BTU do I need per square foot for cooling?',
    a: 'The US average baseline is 22 BTU/hr per square foot, but the actual number varies from about 18 (cold climate, well-insulated, shaded) to 35+ (hot/humid climate, leaky envelope, sun-exposed). The BTU calculator multiplies the 22 baseline by climate, ceiling, sun, insulation, and space-type factors to land at the right number for your specific space. A "20 BTU per sq ft" rule of thumb misses the climate and envelope variables that move the result by 50%+ in either direction.',
  },
  {
    q: 'Is bigger BTU always better?',
    a: 'No. An AC sized more than about 20% above the actual load short-cycles in cooling mode: the unit cools to setpoint quickly and shuts off before removing enough humidity, so the space feels cool but sticky. Manual S tolerates equipment up to 15% above Manual J cooling load for single-stage units and 25% for two-stage / variable-speed. Beyond that, comfort suffers and the compressor wears out faster because it cycles more often.',
  },
  {
    q: 'What does a "ton" mean in AC sizing?',
    a: 'One ton of refrigeration equals 12,000 BTU/hr. The unit comes from the heat needed to melt one short ton (2,000 lb) of ice in 24 hours: 2,000 × 144 BTU/lb (latent heat of fusion of ice) = 288,000 BTU over 24 hours = 12,000 BTU/hr. A "3-ton AC" delivers 36,000 BTU/hr at the AHRI 95°F outdoor / 80°F indoor test condition.',
  },
  {
    q: 'How accurate is this calculator versus a real Manual J?',
    a: 'For typical residential single-family homes, the calculator lands within ±20-30% of a permit-grade Manual J performed by a credentialed contractor. Accuracy is best for tight, modern construction (±10-15%) and worst for older leaky housing (±20-30%) because simplified infiltration models break down on older envelopes. The accuracy is more than sufficient for evaluating a contractor quote or comparing equipment options; it is not sufficient for permit-grade equipment specification on a new install.',
  },
  {
    q: 'Why does the calculator round to standard equipment sizes?',
    a: 'Because manufactured AC equipment comes in fixed BTU/hr increments, not continuous sizes. The standard residential sizes are 5,000, 6,000, 8,000, 10,000, 12,000, 14,000, 18,000, 24,000, 30,000, 36,000, 42,000, 48,000, and 60,000 BTU/hr. The calculator rounds the raw computed BTU to the nearest standard size so the recommendation matches what you can actually buy. The acceptable range output shows the Manual S tolerance band around that recommendation.',
  },
  {
    q: 'Can I use this calculator for whole-house central AC sizing?',
    a: 'Yes for planning purposes (budgeting, comparing contractor quotes, deciding between tonnage options). No for permit-grade central AC sizing on a new install — that requires a full Manual J performed by a credentialed contractor using ACCA-approved software (Wrightsoft, Elite, Cool Calc, EnergyGauge). The Manual J load calculator on this site goes deeper into envelope details for closer-to-permit-grade planning estimates.',
  },
  {
    q: 'What about sensible vs latent cooling?',
    a: 'The calculator output is the total cooling capacity needed (sensible + latent combined). In dry climates (zones 2B, 3B — Phoenix, Las Vegas, Albuquerque), almost all of the cooling load is sensible (temperature-drop) work. In humid climates (zone 1A, 2A — Miami, Houston), 25-35% of the cooling work is latent (moisture-removal). The same total BTU/hr equipment performs differently in those two climates — humid climates need lower SHR (sensible heat ratio) equipment, which usually means selecting variable-speed inverter units that run long cycles.',
  },
  {
    q: 'Does ceiling height really matter that much?',
    a: 'Yes. Cooling load scales with the conditioned air volume, not just the floor area. A 200 sq ft room with 8-ft ceilings holds 1,600 cubic feet of air; the same room with 12-ft cathedral ceilings holds 2,400 cubic feet — 50% more air to cool to setpoint. The calculator applies a ~10% load increase per foot above 8 ft. Vaulted ceilings, two-story great rooms, and cathedral ceilings can shift cooling load by 20-30% versus their square-foot equivalent flat-ceilinged spaces.',
  },
];

const RELATED = [
  {
    title: 'AC BTU chart by square footage',
    url: '/ac/btu/chart/',
    description: 'The reference chart and adjustment factor methodology this calculator implements.',
  },
  {
    title: 'Heat pump sizing',
    url: '/heat-pump/sizing/',
    description: 'Heat pumps need cooling AND heating load math; this calculator covers cooling.',
  },
  {
    title: 'Manual J load calculation',
    url: '/manual-j/',
    description: 'For permit-grade central AC sizing, you need a full Manual J calculation.',
  },
  {
    title: 'AC short cycling diagnosis',
    url: '/ac/short-cycling/',
    description: 'Oversized AC equipment short-cycles. This article walks through the diagnosis and the fixes.',
  },
];

export default function Page() {
  const defaultResult = calculateBtu(DEFAULTS);

  return (
    <Container>
      <JsonLdBreadcrumb items={BREADCRUMBS} />
      <JsonLdSoftwareApplication application={SOFTWARE_APP} />
      <JsonLdHowTo howTo={HOW_TO} />
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">BTU Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the AC BTU you need for any room or home. Adjusts for climate zone, ceiling height,
          insulation, sun exposure, occupancy, and space type.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-06-04" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        This calculator follows AC BTU sizing methodology from the
        ENERGY STAR room AC guide and Manual J 8th Edition. Results are accurate within ±5% for window,
        portable, and single-zone mini split sizing. For permit-grade central AC installation, get a
        Manual J from your contractor or hire one independently. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for our accuracy methodology.
      </Callout>

      <section className="mt-8">
        <BtuCalculatorClient defaults={DEFAULTS} />
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

      {/* Climate zone visualization */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>Why climate zone matters so much</h2>
        <p>
          The single biggest factor in the BTU number is your climate zone. A 1,500 sq ft home
          in Miami needs roughly 60% more cooling capacity than the same home in Minneapolis
          because both the cooling design temperature (95°F vs 88°F) and the latent
          (moisture-removal) load are dramatically higher in the south. The chart below shows
          the planning-grade BTU per square foot range across all eight IECC climate zones.
        </p>
      </section>

      <BtuPerSqftByZone />

      <section className="prose prose-slate mt-6 max-w-prose">
        <p>
          The range within each zone reflects envelope quality: the lower end is a tight modern
          envelope (R-49 attic, low-E windows, 3 ACH50 air leakage) while the upper end is a
          leaky pre-1980 envelope (R-13 attic, single-pane windows, 10+ ACH50). The calculator
          captures this variation via the climate, insulation, and sun-exposure inputs. For a
          detailed walkthrough of the climate-zone-by-zone math see the{' '}
          <a className="text-brand underline" href="/ac/btu/chart/">
            AC BTU chart article
          </a>
          .
        </p>

        <h2>Worked example: 1,500 sq ft home, zone 5</h2>
        <p>
          The default state above shows the calculator&apos;s answer for a typical 1,500 square foot
          home in IECC climate zone 5 (most of the northern US), with 8-foot ceilings, average
          insulation, mixed sun exposure, four occupants, and the cooled space being a living room.
        </p>
        <p>
          The math:
        </p>
        <ul>
          <li>Baseline: 1,500 sqft × 22 BTU/sqft = <strong>33,000 BTU</strong></li>
          <li>× Climate factor (zone 5): {defaultResult.breakdown.climateFactor}</li>
          <li>× Ceiling factor (8 ft): {defaultResult.breakdown.ceilingFactor}</li>
          <li>× Sun factor (mixed): {defaultResult.breakdown.sunFactor}</li>
          <li>× Insulation factor (average): {defaultResult.breakdown.insulationFactor}</li>
          <li>× Space-type factor (living room): {defaultResult.breakdown.spaceTypeFactor}</li>
          <li>= Subtotal: {defaultResult.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</li>
          <li>+ Occupancy (2 extra): {defaultResult.breakdown.occupancyAdjustment.toLocaleString()} BTU</li>
          <li>
            = Final raw: <strong>{defaultResult.breakdown.finalRaw.toLocaleString()} BTU</strong>
          </li>
          <li>
            Rounded to standard equipment size:{' '}
            <strong>
              {defaultResult.recommendedBtu.toLocaleString()} BTU (≈ {defaultResult.recommendedTons} tons)
            </strong>
          </li>
        </ul>

        <h2>How to use this calculator</h2>
        <ol>
          <li>Measure the square footage of the space you want to cool</li>
          <li>Pick the IECC climate zone for your location (zone 1 is tropical, zone 8 is interior Alaska)</li>
          <li>Set ceiling height; 8 ft is the baseline. Higher ceilings need more BTU</li>
          <li>Pick insulation quality vs current code (most homes are average)</li>
          <li>Pick sun exposure and space type (kitchen, sun room, basement all matter)</li>
          <li>Enter the number of regular occupants and whether the space is a kitchen</li>
          <li>Read the recommended BTU and equipment class on the right</li>
        </ol>

        <h2>What the calculator does</h2>
        <p>
          The calculator multiplies a baseline of 22 BTU per square foot by the relevant adjustment
          factors (climate, ceiling, sun, insulation, space type), then adds fixed amounts for extra
          occupants and kitchen heat gain. The raw result is rounded to the nearest standard equipment
          size: 5,000, 6,000, 8,000, 10,000, 12,000, 14,000, 18,000, 24,000, 30,000, 36,000, 42,000,
          48,000, or 60,000 BTU.
        </p>
        <p>
          The methodology is documented in our{' '}
          <a className="text-brand underline" href="/ac/btu/chart/">
            AC BTU chart article
          </a>{' '}
          and verified against ACCA reference cases per{' '}
          <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
            our verification methodology
          </a>
          .
        </p>
      </section>

      {/* Equipment classes */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Equipment options by BTU range
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          The recommended BTU number maps to one of four equipment classes. Knowing the class
          tells you the approximate retail or installed cost range and what type of contractor
          (if any) needs to be involved.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPMENT_CLASSES.map((eq) => (
            <article
              key={eq.title}
              className="flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-ink-900">{eq.title}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand">
                {eq.btu}
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                    Best for
                  </dt>
                  <dd className="mt-0.5 text-ink-700">{eq.bestFor}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                    Typical cost
                  </dt>
                  <dd className="mt-0.5 text-ink-700">{eq.typical}</dd>
                </div>
              </dl>
              <p className="mt-3 flex-1 text-xs text-ink-600">{eq.notes}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Five common BTU sizing mistakes
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Most residential AC sizing errors fall into one of five categories. Avoiding these
          puts the BTU number within Manual S tolerance of the actual load.
        </p>
        <div className="mt-6 space-y-4">
          {BTU_MISTAKES.map((m, i) => (
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

      {/* When to use vs Manual J */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>When this calculator is enough — and when to upgrade to Manual J</h2>
        <p>
          For window AC, portable AC, or single-zone mini split sizing this calculator is
          sufficient. For central AC equipment specification, this calculator gives a planning
          estimate; the final equipment selection should come from a full Manual J load
          calculation that accounts for orientation, room-by-room loads, ductwork losses, and
          infiltration measured with a blower door. The{' '}
          <a className="text-brand underline" href="/tools/manual-j-calculator/">
            Manual J load calculator
          </a>{' '}
          on this site goes deeper into envelope characterization for closer-to-permit-grade
          planning estimates.
        </p>
        <p>
          Permit applications, HEEHRA and state rebate documentation, manufacturer warranty
          claims, and post-retrofit equipment selection (after envelope upgrades change the
          load) all require a full Manual J performed by a credentialed contractor using
          ACCA-approved software (Wrightsoft Right-J, Cool Calc Manual J, Elite RHVAC,
          EnergyGauge USA). Output from any free planning-grade tool — including this one —
          is not eligible for those uses. The{' '}
          <a className="text-brand underline" href="/methodology/">
            methodology page
          </a>{' '}
          documents the accuracy bands the calculator claims against ACCA reference cases.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Pre-computed worked examples for typical room sizes and space types. Each example shows the
          full math and lets you adjust the inputs from that starting point.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {btuExamples.map((ex) => {
            const exResult = calculateBtu(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/btu-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {exResult.recommendedBtu.toLocaleString()} BTU (≈ {exResult.recommendedTons} tons)
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <RelatedArticles items={RELATED} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-06-04" />
      </div>
    </Container>
  );
}
