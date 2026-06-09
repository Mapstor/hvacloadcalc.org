import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { JsonLdBreadcrumb } from '@/components/seo/JsonLdBreadcrumb';
import { JsonLdSoftwareApplication } from '@/components/seo/JsonLdSoftwareApplication';
import { JsonLdHowTo } from '@/components/seo/JsonLdHowTo';
import { FAQ } from '@/components/article/FAQ';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { calculateBtu, type BtuInputs } from '@/lib/calculators/btu';
import { AcCalculatorClient } from './AcCalculatorClient';
import { acSizeExamples } from './examples-manifest';
import { Seer2AnnualCost } from '@/components/svg/ac/Seer2AnnualCost';
import { ClimateZonesQuickReference } from '@/components/svg/shared/ClimateZonesQuickReference';

export const metadata: Metadata = {
  alternates: { canonical: "/tools/ac-size-calculator/" },
  title: 'AC Size Calculator: Pick the Right BTU and Tonnage',
  description:
    'AC size calculator with window, portable, and central equipment recommendations. Adjusts for climate, ceiling, insulation, and space type. Real-world portable BTU caveats included.',
  openGraph: {
    title: 'AC Size Calculator: Pick the Right BTU and Tonnage',
    description:
      'AC size calculator with equipment class recommendation (window / portable / mini-split / central). Manual S tolerance band. SEER2 cost comparison. 15 examples.',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

const DEFAULTS: BtuInputs = {
  squareFootage: 2000,
  climateZone: '4',
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
  { name: 'AC Size Calculator' },
];

const SOFTWARE_APP = {
  name: 'AC Size Calculator',
  description:
    'Free planning-grade air conditioner size calculator with equipment-class recommendation (window, portable, mini-split, central), Manual S tolerance band, sensible vs latent cooling estimate by climate, and annual operating cost across efficiency tiers. Built on ACCA Manual J + Manual S methodology.',
  url: '/tools/ac-size-calculator/',
  featureList: [
    'BTU/hr and tonnage output for any room or whole-house space',
    'Equipment class recommendation by capacity (window / portable / mini-split / central)',
    'Manual S tolerance band visualization (−10% / +20% acceptable range)',
    'Sensible vs latent cooling split estimated by climate zone (SHR 0.65-0.95)',
    'Annual operating cost at 5 SEER2 tiers (federal min, ENERGY STAR, premium)',
    'Climate-zone-aware cooling-hour estimates for all 8 IECC zones',
    'Full math breakdown showing every adjustment factor applied',
    '15 worked-example URLs with pre-computed sizing for common configurations',
  ],
};

const HOW_TO = {
  name: 'How to size an air conditioner with the AC size calculator',
  description:
    'Determine the right AC capacity in tons or BTU/hr for a room or whole-house space using ACCA Manual J adjustment factors and Manual S equipment tolerances.',
  totalTime: 'PT3M',
  steps: [
    {
      name: 'Enter conditioned square footage',
      text: 'For a whole-house install, use total conditioned floor area. For a single-room AC, use just the room being cooled. Range supported: 50 sq ft (small bedroom) to 5,000 sq ft (large home).',
    },
    {
      name: 'Pick climate zone from the IECC map',
      text: 'Climate factors range from 1.30 (zone 1, tropical) to 0.78 (zone 8, subarctic). Zone 4 (Mid-Atlantic, Ohio Valley) is baseline 1.0. The cooling design temperature drops by about 10°F from zone 1 to zone 8, and the latent component (humidity removal) drops with it.',
    },
    {
      name: 'Set ceiling height, insulation, sun exposure',
      text: 'Eight-foot ceilings are baseline. Each additional foot adds 10% to cooling load. Insulation factors: poor (+30%), average (1.0), good (−10%). Heavy south/west sun adds 15%; deep shade reduces load 8%.',
    },
    {
      name: 'Pick space type and occupancy',
      text: 'Space-type factors range from −40% (below-grade basement) to +75% (sun room). Kitchens add 30% even without the kitchen flag; with the flag, +4,000 BTU/hr extra is added for cooking heat gain. Each occupant above 2 adds 600 BTU/hr.',
    },
    {
      name: 'Click Calculate',
      text: 'The result displays the recommended tonnage, the Manual S tolerance band (−10% / +20% around the calculated load), the equipment class that fits, the sensible/latent split for your climate, and the annual operating cost at 5 efficiency tiers.',
    },
    {
      name: 'Verify against the contractor proposal',
      text: 'Cross-reference the recommended tonnage against any contractor quote: if the quoted tonnage is more than 25% above the Manual S allowable range, the unit is oversized and will short-cycle in cooling mode, hurting humidity control. If undersized below the band, the unit cannot meet load on hot design days.',
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'What size AC do I need for a 2,000 square foot house?',
    a: 'A tight 2,000 sq ft house in moderate climate (zone 4) typically needs about 2 tons (24,000 BTU/hr) of cooling capacity, while a leaky 2,000 sq ft house in zone 2 (Gulf Coast) can need 3.5 tons (42,000 BTU/hr). The same square footage in two climates can differ by 75%, and the same climate with two envelope qualities can differ by 50%. Run the calculator with your specific climate zone, ceiling height, insulation, and sun exposure for a planning-grade answer.',
  },
  {
    q: 'Should I get a window AC, portable AC, mini-split, or central AC?',
    a: 'The right class depends on the capacity needed and the installation context. Window units (5,000-10,000 BTU/hr) are cheapest and easiest to install but block a window. Portables (8,000-14,000 BTU/hr) work where window mounts are impractical but are 20-30% less efficient. Mini-splits (12,000-36,000 BTU/hr per zone) are quietest and most efficient but require professional install. Central AC (24,000+ BTU/hr) makes sense when ductwork already exists. The calculator output recommends the appropriate class for your computed capacity.',
  },
  {
    q: 'Why does humidity matter for AC sizing?',
    a: 'In humid climates (zones 1, 2A, 3A) about 25-35% of the cooling work is removing water vapor (latent cooling) rather than dropping temperature (sensible cooling). An oversized AC in a humid climate cools to setpoint quickly and shuts off before removing enough moisture, leaving the house "cool but sticky" at 65%+ relative humidity. Right-sized equipment runs longer cycles that dehumidify properly. The calculator estimates the sensible/latent split based on your climate zone.',
  },
  {
    q: 'What is the Manual S tolerance band?',
    a: 'ACCA Manual S allows the installed AC nominal cooling capacity to exceed the Manual J cooling load by up to 15% for single-stage equipment and up to 25% for variable-speed equipment. Equipment within that range is "Manual S compliant"; equipment beyond it is technically out of compliance and produces the short-cycling, humidity control, and durability problems oversizing causes. The calculator shows the tolerance band visually so you can see whether a contractor proposal sits inside or outside it.',
  },
  {
    q: 'How much does it cost to run an AC for a year?',
    a: 'Annual cooling cost depends on equipment efficiency (SEER2), cooling-season hours (from your climate zone), and local electricity price. At the US 2024-2025 average residential rate of $0.163/kWh, a typical 3-ton system in zone 4 (1,200 hours of equivalent full-load operation) costs about $283 per year at federal-minimum 14.3 SEER2, $245 at ENERGY STAR 15.2 SEER2, and $200 at premium 18 SEER2. The calculator shows the per-tier table for your specific size and climate.',
  },
  {
    q: 'How accurate is this AC size calculator?',
    a: 'For typical residential single-family homes, output lands within ±20-30% of a permit-grade Manual J calculation. Tight modern construction lands closer to ±10-15%; older leaky housing stock lands closer to the ±30% end because simplified infiltration models break down on poorly-characterized envelopes. The accuracy is more than sufficient for comparing contractor proposals and budgeting. It is NOT sufficient for permit applications, rebate documentation, or contractor liability — those require ACCA-approved software output.',
  },
];

const RELATED = [
  {
    title: 'AC BTU chart by square footage',
    url: '/ac/btu/chart/',
    description: 'The full reference chart and adjustment-factor methodology this calculator implements.',
  },
  {
    title: 'Mini split for garage',
    url: '/ac/btu/garage-mini-split/',
    description: 'For garage-specific sizing, the load is 2-3× higher per sq ft than interior spaces.',
  },
  {
    title: 'AC short cycling',
    url: '/ac/short-cycling/',
    description: 'Why oversizing matters: an oversized AC short cycles, hurting humidity control.',
  },
];

const STANDARD_SIZES_AVAILABLE = [
  { btu: 5000, tons: 0.42, class: 'Window AC' },
  { btu: 6000, tons: 0.5, class: 'Window AC' },
  { btu: 8000, tons: 0.67, class: 'Window or portable' },
  { btu: 10000, tons: 0.83, class: 'Window or portable' },
  { btu: 12000, tons: 1.0, class: 'Window, portable, or mini split' },
  { btu: 14000, tons: 1.17, class: 'Window or mini split' },
  { btu: 18000, tons: 1.5, class: 'Mini split or large window' },
  { btu: 24000, tons: 2.0, class: 'Central or mini split' },
  { btu: 36000, tons: 3.0, class: 'Central AC' },
  { btu: 48000, tons: 4.0, class: 'Central AC' },
  { btu: 60000, tons: 5.0, class: 'Central AC' },
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
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">AC Size Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the right AC capacity in BTU and tonnage for any room or whole-house cooling.
          Returns the recommended size and equipment class (window, portable, mini split, or central).
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        For window AC, portable AC, or single-zone mini split sizing, this calculator is sufficient.
        For central AC equipment specification on a new install, get a Manual J load calculation. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for the underlying methodology and accuracy bands.
      </Callout>

      <section className="mt-8">
        <AcCalculatorClient defaults={DEFAULTS} />
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

      {/* SEER2 efficiency tier chart */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>Why efficiency tier matters as much as size</h2>
        <p>
          The calculator output tells you how many BTU/hr of cooling capacity you need.
          The other half of the decision is the efficiency tier — what SEER2 rating to buy.
          For the same recommended tonnage, the cheapest federal-minimum equipment and the
          top-tier inverter equipment can differ by $250-$540 per year in operating cost in
          long-runtime climates, but only $50-$100 per year in short-runtime climates. The
          chart below shows the spread.
        </p>
      </section>

      <Seer2AnnualCost />

      <section className="prose prose-slate mt-6 max-w-prose">
        <p>
          The decision rule that comes out of this: match efficiency tier to runtime, not to
          the salesperson&apos;s margin. In Phoenix or Houston, the 22 SEER2 inverter pays back
          a $1,500 efficiency premium in 7-8 years; in Seattle or Boston, the same upgrade
          may never pay back over the equipment&apos;s 15-year useful life. See the{' '}
          <a className="text-brand underline" href="/ac/">AC reference hub</a> for the full
          SEER2 / EER2 / HSPF2 explanation.
        </p>

        <h2>Worked example: 2,000 sq ft home, zone 4</h2>
        <p>
          The default state shows the calculator&apos;s answer for a typical 2,000 square foot home
          in IECC climate zone 4 (mid-Atlantic, Ohio Valley), with 8-foot ceilings, average insulation,
          mixed sun, four occupants, treated as a living-room equivalent (the open whole-house
          treatment).
        </p>
        <p>The math:</p>
        <ul>
          <li>Baseline: 2,000 sqft × 22 BTU/sqft = <strong>44,000 BTU</strong></li>
          <li>× Climate factor (zone 4): {defaultResult.breakdown.climateFactor}</li>
          <li>× Ceiling factor (8 ft): {defaultResult.breakdown.ceilingFactor}</li>
          <li>× Sun factor (mixed): {defaultResult.breakdown.sunFactor}</li>
          <li>× Insulation factor (average): {defaultResult.breakdown.insulationFactor}</li>
          <li>× Space-type factor (living room): {defaultResult.breakdown.spaceTypeFactor}</li>
          <li>= Subtotal: {defaultResult.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</li>
          <li>+ Occupancy (2 extra): {defaultResult.breakdown.occupancyAdjustment.toLocaleString()} BTU</li>
          <li>= Final raw: <strong>{defaultResult.breakdown.finalRaw.toLocaleString()} BTU</strong></li>
          <li>
            Standard equipment size:{' '}
            <strong>
              {defaultResult.recommendedBtu.toLocaleString()} BTU (≈ {defaultResult.recommendedTons} tons)
            </strong>
          </li>
        </ul>

        <h2>Available standard equipment sizes</h2>
        <p>
          Air conditioning equipment is sold in standard BTU sizes; the calculator rounds the raw
          result to the nearest one. Use the table to map a target BTU to the equipment class typically
          available at that size.
        </p>
        <div className="not-prose overflow-x-auto">
          <table className="my-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-50">
                <th className="px-3 py-2 text-left font-semibold text-ink-900">BTU</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Tons</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Typical equipment class</th>
              </tr>
            </thead>
            <tbody>
              {STANDARD_SIZES_AVAILABLE.map((row) => (
                <tr key={row.btu} className="border-b border-ink-300">
                  <td className="px-3 py-2 font-medium text-ink-900">{row.btu.toLocaleString()}</td>
                  <td className="px-3 py-2 text-ink-700">{row.tons}</td>
                  <td className="px-3 py-2 text-ink-700">{row.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Portable AC: size up one tier</h2>
        <p>
          Portable AC nameplate BTU ratings often overstate real-world cooling output. Single-hose
          portable units exhaust hot air using conditioned indoor air, which reduces effective cooling
          by 20-30%. Dual-hose portable units avoid this and deliver closer to nameplate.
        </p>
        <p>
          The practical rule: if you&apos;re buying a portable AC, size up one tier from the calculator&apos;s
          recommendation. If the calculator says 10,000 BTU, buy a 12,000 BTU portable. If it says
          12,000 BTU, buy a 14,000 BTU portable.
        </p>

        <h2>Right-sizing matters</h2>
        <p>
          AC oversizing produces short cycling, poor humidity control, and accelerated equipment wear.
          AC undersizing means the unit can&apos;t keep up on hot summer days. The Goldilocks zone is the
          calculator&apos;s recommendation; a 10-20% margin is fine, but 30%+ oversizing starts to hurt.
        </p>
        <p>
          For the full discussion of oversize vs undersize penalties, see the{' '}
          <a className="text-brand underline" href="/ac/short-cycling/">
            AC short cycling article
          </a>
          . For variable-speed (inverter) AC equipment, the modulation range tolerates moderate
          oversizing better than single-stage units.
        </p>

        <h2>Sensible vs latent cooling — why humid climates need different sizing</h2>
        <p>
          The calculator output is the total cooling capacity needed. That total splits into
          sensible cooling (dropping temperature) and latent cooling (removing water vapor),
          and the split depends on your climate. In dry climates (zones 2B, 3B — Phoenix,
          Las Vegas, Albuquerque) almost all of the cooling work is sensible; latent capacity
          requirements are minimal. In humid climates (zones 1A, 2A, 3A — Miami, Houston,
          Atlanta) about 25-35% of the cooling work is latent.
        </p>
        <p>
          The Sensible Heat Ratio (SHR) measures this split: SHR = sensible cooling ÷ total
          cooling. A humid-climate cooling load might be SHR 0.70 (30% latent); a dry-climate
          load is closer to SHR 0.90 (10% latent). An oversized AC in a humid climate cools
          to setpoint quickly, shuts off before condensing enough moisture, and leaves the
          house at 65%+ relative humidity — comfort complaints follow even though the
          thermostat says "satisfied". Variable-speed inverter equipment is the right answer
          in humid climates because it runs long cycles at lower capacity, removing more
          moisture per BTU of cooling delivered.
        </p>
        <p>
          For the full SHR discussion and how Manual S equipment selection accounts for
          climate-specific latent load, see the{' '}
          <a className="text-brand underline" href="/manual-s/">Manual S reference hub</a>.
        </p>

        <h2>Equipment age and the Manual S tolerance band</h2>
        <p>
          Existing AC equipment installed before about 2010 was typically sized using rules
          of thumb that produced 20-40% oversizing relative to current Manual J methodology.
          When the original system needs replacement, simply &quot;matching the old unit&quot;
          perpetuates the oversize. Modern Manual J accounts for tighter modern construction
          (post-2009 IECC code), high-performance windows, and improved infiltration
          measurement — all of which reduce cooling loads versus 1990s assumptions.
        </p>
        <p>
          Manual S — the ACCA equipment selection standard — allows installed equipment to
          exceed the Manual J cooling load by 15% for single-stage units and 25% for
          variable-speed inverter equipment. Equipment within that tolerance is "Manual S
          compliant"; equipment beyond it is technically out of compliance and produces the
          short-cycling, humidity-control, and durability problems documented in the AC
          short-cycling article. The calculator result includes both the recommended Manual J
          number and the Manual S tolerance band, so you can immediately see whether a
          proposed unit falls inside or outside it. See the{' '}
          <a className="text-brand underline" href="/manual-s/">Manual S reference hub</a>
          {' '}for the full tolerance-by-equipment-type breakdown.
        </p>

        <h2>When this calculator isn&apos;t enough</h2>
        <p>
          For permit-grade central AC sizing, a Manual J load calculation is the right tool. Manual J
          accounts for orientation, room-by-room loads, ductwork, infiltration measured with a blower
          door, and internal gains from specific equipment, none of which this calculator captures.
          For an expensive central AC install (15-20 year equipment lifespan, $5,000-15,000 cost), the
          difference between a chart-grade estimate and a Manual J calculation is worth the small extra
          effort. See the{' '}
          <a className="text-brand underline" href="/manual-j/">
            Manual J methodology article
          </a>{' '}
          for the underlying calculation.
        </p>
        <p>
          Permit applications, HEEHRA and state rebate documentation, manufacturer warranty
          claims, and post-retrofit equipment selection (after envelope upgrades change the
          load) all require a full Manual J performed by a credentialed contractor using
          ACCA-approved software (Wrightsoft Right-J, Cool Calc Manual J, Elite RHVAC,
          EnergyGauge USA). Output from any free planning-grade tool — including this one —
          is not eligible for those uses.
        </p>
      </section>

      {/* Common AC sizing mistakes */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Five common AC sizing mistakes
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Most central-AC sizing errors fall into one of five categories. Avoiding them puts
          the proposed tonnage within Manual S tolerance of the actual load.
        </p>
        <div className="mt-6 space-y-4">
          {[
            {
              title: '"Just match the old unit"',
              description:
                'A 4-ton AC installed in 1998 may have been correctly sized for a 1998 envelope. If you have since added attic insulation, replaced windows, or air-sealed, the current cooling load may be 2.5-3 tons. Replacing the old 4-ton with another 4-ton perpetuates the oversize. Run the calculator with current envelope inputs before signing a contractor proposal.',
            },
            {
              title: 'Sizing by square footage rule of thumb',
              description:
                'A 2,000 sq ft home in Phoenix needs about 4 tons of cooling; the same home in Minneapolis needs about 2.5 tons. The "600 sq ft per ton" rule misses climate, envelope, and occupancy variation by 50%+ in either direction.',
            },
            {
              title: 'Oversizing "to be safe"',
              description:
                'AC oversizing beyond 15% (single-stage) or 25% (variable-speed) hurts humidity control, increases wear, and reduces effective efficiency. Manual S caps oversizing at the published tolerance band for these reasons.',
            },
            {
              title: 'Ignoring the duct system',
              description:
                'A 3-ton AC connected to undersized ducts delivers about 2-2.4 tons of actual cooling capacity because the air handler cannot move design CFM at the duct system\'s pressure drop. Manual D duct design must accompany Manual S equipment selection; neither alone suffices.',
            },
            {
              title: 'Sizing to peak BTU instead of latent BTU in humid climates',
              description:
                'In zones 1A-3A, latent (moisture removal) load matters as much as sensible load. Two equally-sized units (same nominal tons) can deliver very different humidity control because their AHRI-rated latent capacity differs. In humid climates, check the latent capacity number on the AHRI Certificate, not just the nominal tonnage.',
            },
          ].map((m, i) => (
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

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Pre-computed AC sizing for typical rooms, apartments, and houses. Each example shows the
          recommended tonnage, equipment class, and full BTU calculation.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acSizeExamples.map((ex) => {
            const exResult = calculateBtu(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/ac-size-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {exResult.recommendedTons} ton{exResult.recommendedTons === 1 ? '' : 's'} (
                  {exResult.recommendedBtu.toLocaleString()} BTU)
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <FAQ items={FAQ_ITEMS} />

      <RelatedArticles items={RELATED} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
