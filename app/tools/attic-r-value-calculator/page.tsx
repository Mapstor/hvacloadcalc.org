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
import {
  calculateAtticRValue,
  type AtticRValueInputs,
} from '@/lib/calculators/attic-r-value';
import { AtticRValueCalculatorClient } from './AtticRValueCalculatorClient';
import { atticRValueExamples } from './examples-manifest';
import { DoeRValueByZone } from '@/components/svg/building-science/DoeRValueByZone';
import { ClimateZonesQuickReference } from '@/components/svg/shared/ClimateZonesQuickReference';

export const metadata: Metadata = {
  alternates: { canonical: "/tools/attic-r-value-calculator/" },
  title: 'Attic R-Value Calculator: Depth × R-per-Inch by Insulation Type',
  description:
    'Compute your attic R-value from insulation depth and type. Compares result to DOE recommended ranges and suggests upgrade depth to reach climate-zone targets.',
  openGraph: {
    title: 'Attic R-Value Calculator: Depth × R-per-Inch by Insulation Type',
    description:
      'Attic R-value calculator with multi-layer insulation support, DOE recommended R-value by climate zone, and upgrade depth by material. Sourced.',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

const DEFAULTS: AtticRValueInputs = {
  layers: [
    { type: 'loose-fill-cellulose', depthInches: 8 },
  ],
  climateZone: '5',
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'Attic R-Value Calculator' },
];

const SOFTWARE_APP = {
  name: 'Attic R-Value Calculator',
  description:
    'Free attic R-value calculator with multi-layer support, DOE-recommended R-value targets by IECC climate zone, IECC 2021 code minimum comparison, R-value gauge visualization, and upgrade depth by material. Built on ASHRAE Fundamentals R-per-inch tables and DOE/ENERGY STAR recommended R-value methodology.',
  url: '/tools/attic-r-value-calculator/',
  featureList: [
    'Multi-layer insulation support (original batts + newer blown, etc.)',
    '9 insulation materials with verified R-per-inch values',
    'DOE recommended R-value range by climate zone 1-8',
    'IECC 2021 code minimum comparison',
    'R-value gauge with status: below DOE / meets IECC only / in DOE range / above DOE high',
    'Upgrade depth recommendations by 3 material options (cellulose, fiberglass, closed-cell foam)',
    'Annual energy savings estimate from R-value reduction',
    'Air-sealing primacy callout',
  ],
};

const HOW_TO = {
  name: 'How to calculate current attic R-value and target',
  description:
    'Compute existing attic R-value from depth × material, compare against DOE recommendations for your climate zone, and get upgrade depth recommendations by material.',
  totalTime: 'PT2M',
  steps: [
    {
      name: 'Measure insulation depth in the attic',
      text: 'Use a yardstick at several points to account for settling. Use the typical (not maximum) depth. For multi-layer attics (e.g., original fiberglass batts plus newer blown cellulose), measure each layer separately.',
    },
    {
      name: 'Identify each insulation material',
      text: 'Fiberglass batt (paper-faced rectangles), loose-fill fiberglass (pink fluff), loose-fill cellulose (gray paper bits), mineral wool batt, open-cell spray foam (yellow soft), closed-cell spray foam (rigid pale), polyiso/XPS/EPS rigid foam (foam board). Each has a different R-per-inch.',
    },
    {
      name: 'Set your climate zone',
      text: 'Look up your county on the IECC climate map. DOE-recommended R-values vary from R-30 to R-49 in zone 1 to R-49 to R-60 in zones 6-8. The IECC code minimum sets the floor; the DOE recommendation sets the cost-optimal target.',
    },
    {
      name: 'Add a layer entry for each material',
      text: 'Click "Add another layer" for each distinct material. Enter the material type and depth in inches. The calculator handles unlimited layers.',
    },
    {
      name: 'Click Calculate',
      text: 'The result shows total R-value (sum of all layers), a gauge visualization showing where your value falls vs DOE range and IECC minimum, a per-layer breakdown, and upgrade depth recommendations by material if you fall below the DOE target.',
    },
    {
      name: 'Plan the upgrade',
      text: 'If below DOE range, the result shows how many additional inches of cellulose, fiberglass, or closed-cell spray foam to add. Air seal before adding insulation — sealing penetrations typically saves 10-25% of heating/cooling load at lower cost than insulation alone.',
    },
  ],
};

const FAQ_ITEMS = [
  {
    q: 'What R-value should my attic insulation have?',
    a: 'DOE recommendations range from R-30 to R-60 for residential attics depending on climate zone. Zone 1-3 (southern US): R-30 to R-49. Zone 4 (mixed): R-38 to R-60. Zone 5-8 (cold/very cold): R-49 to R-60. Existing homes with less than R-30 almost always benefit financially from added insulation in any climate; the payback is fastest in cold climates and slower but still positive in warm climates.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'R-value calculation is straightforward: depth × R-per-inch summed across layers gives the steady-state center-of-cavity R. Accuracy is high (±2-5%) for measured depth and known material. Real-world effective R-value is typically 10-15% lower than calculated because of thermal bridging through joists, installation imperfections (gaps, compression, wind-washing at eaves), and settling. The calculator does not adjust for these field factors; treat the output as the steady-state ceiling, not the field-effective value.',
  },
  {
    q: 'Should I add cellulose or fiberglass or spray foam?',
    a: 'For attic floor applications, blown cellulose is typically the cheapest per R-value-added at about $1.50-$2.50 per sq ft installed for R-30 to R-49. Blown fiberglass is similar cost but lower R per inch (2.3 vs 3.6), so requires more depth. Closed-cell spray foam has the highest R per inch (6.5) but costs 3-4× more than cellulose per R-value — useful where depth is limited (e.g., adding to a low-clearance attic floor). The calculator output shows depth by all three options.',
  },
  {
    q: 'Why does the calculator include the IECC code minimum?',
    a: 'Because the IECC code minimum is the legal floor for new construction in most US jurisdictions, while the DOE recommendation is the cost-optimal target for existing-home retrofits. Many older homes are below code minimum; understanding both numbers helps prioritize whether the goal is meeting code (the minimum) or reaching the DOE-recommended cost-optimal level.',
  },
  {
    q: 'Should I seal air leaks first or add insulation first?',
    a: 'Air seal first, always. Insulation slows conductive heat flow through solid surfaces; it does almost nothing to stop air leakage through gaps, holes, and penetrations. A house with R-49 attic insulation and 12 ACH50 air leakage performs worse than the same house with R-30 insulation and 4 ACH50. Sealing penetrations (bath fan housings, recessed lights, plumbing chases, top-plate gaps, attic hatch) typically saves 10-25% of heating/cooling load at lower cost than insulation upgrades.',
  },
];

const RELATED = [
  {
    title: 'Attic R-value (article)',
    url: '/building-science/insulation/attic-r-value/',
    description: 'DOE recommended R-values by climate zone, insulation types, and methodology behind this calculator.',
  },
  {
    title: 'Attic R-value reference',
    url: '/building-science/insulation/attic-r-value/',
    description: 'DOE recommended R-values by climate zone, R-per-inch by material, payback analysis, and the air-sealing primacy discussion.',
  },
  {
    title: 'Window U-factor',
    url: '/building-science/windows/u-factor/',
    description: "U-factor is R-value's cousin; both express resistance to heat flow.",
  },
];

export default function Page() {
  const defaultResult = calculateAtticRValue(DEFAULTS);

  return (
    <Container>
      <JsonLdBreadcrumb items={BREADCRUMBS} />
      <JsonLdSoftwareApplication application={SOFTWARE_APP} />
      <JsonLdHowTo howTo={HOW_TO} />
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">Attic R-Value Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Compute the total R-value of your attic insulation from depth and material type. Compare to
          DOE recommended ranges and IECC code minimums for your climate zone. Supports multi-layer
          attics where new insulation has been added over old.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        R-values assume no air leakage. Air seal first; deep insulation over unsealed penetrations
        underperforms by 30-50%. See{' '}
        <a className="text-brand underline" href="/building-science/insulation/attic-r-value/">
          attic R-value &amp; air-sealing primacy
        </a>{' '}
        for the order of operations.
      </Callout>

      <section className="mt-8">
        <AtticRValueCalculatorClient defaults={DEFAULTS} />
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

      {/* DOE recommended R-value chart */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>DOE recommended attic R-value, by climate zone</h2>
        <p>
          The single most important reference for attic insulation decisions is the
          DOE / ENERGY STAR recommended R-value range for your climate zone. The chart below
          shows the recommended range across all eight IECC climate zones — from R-30 in
          the south (where heating loads are minimal) to R-60 in the far north (where every
          inch of insulation cuts winter heat loss).
        </p>
      </section>

      <DoeRValueByZone />

      <section className="prose prose-slate mt-6 max-w-prose">
        <p>
          The calculator above checks your computed R-value against this DOE range AND
          against the IECC code minimum (the legal floor for new construction). Most older
          homes are grandfathered to the code that existed when they were built — often well
          below current DOE recommendations. Topping off to the upper end of the DOE range
          is the cost-optimal target for retrofits in cold climates.
        </p>

        <h2>Worked example: 8″ blown cellulose in zone 5</h2>
        <p>
          The default state shows the calculator&apos;s answer for a typical attic with 8 inches of
          blown-in cellulose insulation, in IECC climate zone 5 (most of the northern US).
        </p>
        <p>The math:</p>
        <ul>
          <li>
            8″ loose-fill cellulose × 3.6 R per inch = <strong>R-{defaultResult.totalRValue.toFixed(1)}</strong>
          </li>
          <li>DOE recommended for zone 5: <strong>R-{defaultResult.doeRecommendedRange.low} to R-{defaultResult.doeRecommendedRange.high}</strong></li>
          <li>IECC 2021 code minimum (new construction): R-{defaultResult.ieccCodeMinimum}</li>
          <li>Status: <strong>{defaultResult.status === 'below-doe-low' ? 'below DOE recommended low' : defaultResult.status === 'meets-iecc-only' ? 'meets IECC only' : defaultResult.status === 'in-doe-range' ? 'within DOE recommended range' : 'at or above DOE recommended high'}</strong></li>
          {defaultResult.upgradeRecommendation ? (
            <li>
              To reach R-{defaultResult.upgradeRecommendation.targetR}, add about{' '}
              <strong>
                {defaultResult.upgradeRecommendation.depthsByMaterial.find((d) => d.type === 'loose-fill-cellulose')?.depthInches}″
                more cellulose
              </strong>
              {' '}or equivalent depth in another material
            </li>
          ) : null}
        </ul>

        <h2>How to measure your existing insulation</h2>
        <ol>
          <li>Take a tape measure or ruler into the attic</li>
          <li>Insert vertically into the insulation until it touches the ceiling drywall or joist top</li>
          <li>Note the depth in inches. Sample at multiple spots; coverage varies</li>
          <li>Identify the insulation type by color and texture (pink/white batts = fiberglass; gray-brown loose = cellulose; yellow/peach surface = spray foam)</li>
          <li>Enter depth and type for each distinct layer. Older attics often have an original layer plus a newer top-off</li>
        </ol>

        <h2>R-per-inch by material</h2>
        <p>
          The calculator uses the following R-per-inch values, documented in our{' '}
          <a className="text-brand underline" href="/building-science/insulation/attic-r-value/">
            attic R-value article
          </a>
          . These align with major insulation manufacturer literature and DOE Energy Saver values.
        </p>
        <div className="not-prose overflow-x-auto">
          <table className="my-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-50">
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Material</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">R per inch</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Depth for R-49</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Fiberglass batt</td><td className="px-3 py-2">3.0</td><td className="px-3 py-2">16.3″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Loose-fill fiberglass (blown)</td><td className="px-3 py-2">2.3</td><td className="px-3 py-2">21.3″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Loose-fill cellulose (blown)</td><td className="px-3 py-2">3.6</td><td className="px-3 py-2">13.6″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Mineral wool batt</td><td className="px-3 py-2">3.6</td><td className="px-3 py-2">13.6″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Open-cell spray foam</td><td className="px-3 py-2">3.6</td><td className="px-3 py-2">13.6″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Closed-cell spray foam (aged)</td><td className="px-3 py-2">6.5</td><td className="px-3 py-2">7.5″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Polyiso rigid (aged)</td><td className="px-3 py-2">6.5</td><td className="px-3 py-2">7.5″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">XPS rigid</td><td className="px-3 py-2">5.0</td><td className="px-3 py-2">9.8″</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">EPS rigid</td><td className="px-3 py-2">4.0</td><td className="px-3 py-2">12.3″</td></tr>
            </tbody>
          </table>
        </div>

        <h2>DOE recommendations vs IECC code</h2>
        <p>
          The calculator compares your total R-value to two benchmarks: DOE recommended ranges (for
          existing-home retrofits, slightly aspirational) and IECC 2021 code minimums (legal floor for
          new construction). Older homes are typically grandfathered to the code in effect when built;
          DOE recommendations target the higher of the two ranges as the cost-effective target for
          retrofits.
        </p>

        <h2>What the calculator does not check</h2>
        <p>
          <strong>Air leakage.</strong> The biggest limitation. R-value rates resistance to conductive
          heat flow. It does nothing for air infiltration through unsealed penetrations (recessed
          lights, top plates, plumbing chases, the attic hatch). Field studies routinely find 30-50%
          effective R-value reduction in attics with code insulation but no air sealing. Air seal first.
        </p>
        <p>
          <strong>Compression and settling.</strong> Compressed batts (foot traffic) and settled
          loose-fill insulation read lower than nominal. Measure current depth, not what was installed.
        </p>
        <p>
          <strong>Moisture damage.</strong> Wet insulation is approximately R-0 until dried. Visible
          water staining or mold indicates the layer may need removal, not just top-off.
        </p>

        <h2>Where the attic insulation payback actually comes from</h2>
        <p>
          The energy savings from added attic insulation come from two physical effects.
          First, R-value reduces conductive heat loss through the ceiling proportional to
          the inverse of total R. Going from R-19 to R-49 (typical retrofit) cuts ceiling
          conduction by roughly 60-65% in heating mode. Second, a well-insulated ceiling
          keeps the radiant surface temperature closer to room air temperature, improving
          occupant comfort and allowing the same thermostat setting to feel warmer in
          winter / cooler in summer.
        </p>
        <p>
          For a typical 2,000 sq ft home in zone 5 with 1,500 sq ft of attic area, going
          from R-19 to R-49 cuts heating load by roughly 1,500 BTU/hr at the design
          temperature and reduces annual heating cost by about $200-$400 depending on fuel
          and price. Cooling savings are smaller (about $50-$100) because cooling design
          conditions involve smaller temperature differences. The cellulose top-off cost
          ($2,000-$3,500 for 1,500 sq ft) pays back in 6-12 years in cold climates and
          longer in mild ones. The{' '}
          <a className="text-brand underline" href="/building-science/insulation/attic-r-value/">
            attic R-value article
          </a>{' '}
          walks through the cost-payback math by climate zone with worked examples.
        </p>

        <h2>How this calculator compares to a full energy audit</h2>
        <p>
          A professional energy audit measures attic insulation depth at multiple points,
          identifies thermal bridging through joists, performs a blower-door test for air
          leakage, runs a thermal imaging scan to find missing insulation and air leakage
          paths, and produces a Home Energy Rating System (HERS) Index score. The output
          is a comprehensive whole-home retrofit plan, not just an R-value number.
        </p>
        <p>
          This calculator answers the narrow question &quot;what is my attic R-value and how
          does it compare to recommendations?&quot;. For HEEHRA rebate eligibility, IRA 25C
          tax credit documentation, and HERS-based new-construction certification, a
          credentialed audit is required. The{' '}
          <a className="text-brand underline" href="/building-science/hers-index/">
            HERS Index article
          </a>{' '}
          covers what a professional audit produces and how it differs from a calculator
          output like this one.
        </p>
      </section>

      {/* Common attic insulation mistakes */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">
          Five common attic insulation mistakes
        </h2>
        <p className="mt-2 max-w-prose text-ink-700">
          The most frequent attic-insulation errors that show up in DOE Building America
          field studies and BPI certified-auditor reports.
        </p>
        <div className="mt-6 space-y-4">
          {[
            {
              title: 'Adding insulation without air sealing first',
              description:
                'Insulation rated R-49 in a leaky attic performs as if it were R-25 to R-30 because warm interior air rushes through gaps around top plates, recessed lights, plumbing chases, and the attic hatch — bypassing the insulation entirely. Air seal first. The DOE air-sealing guide identifies bath fan housings, recessed lights, plumbing penetrations, the attic hatch perimeter, and top-plate gaps as the priority targets.',
            },
            {
              title: 'Compressing batts to fit',
              description:
                'A R-30 batt rated at full thickness (8.25" fiberglass batt) compressed to 6" of depth delivers about R-21, not R-30. Compression reduces effective R-value proportionally to the compression ratio. The fix is to use loose-fill blown insulation in irregular cavity geometries instead of cut-to-fit batts.',
            },
            {
              title: 'Burying recessed lights without IC-rated housings',
              description:
                'Standard recessed light cans are not rated for direct insulation contact (non-IC). Burying them in loose-fill insulation creates a fire hazard. Either replace with IC-rated airtight LED cans before insulating, or build airtight enclosures around non-IC cans. Many older homes have a mix that needs inventory before insulation.',
            },
            {
              title: 'Missing the attic hatch / access door',
              description:
                'The attic hatch is typically R-2 to R-5, surrounded by R-49 insulation. The hatch becomes a thermal bridge that conducts proportionally more heat than its area suggests. Weatherstrip the hatch perimeter and install a removable insulating cover above it (R-30+ rigid foam) for an inexpensive but high-impact upgrade.',
            },
            {
              title: 'Insulating vault ceilings without addressing the rest of the house',
              description:
                'Cathedral ceilings, vaulted living rooms, and second-floor knee-wall systems have their own insulation challenges that loose-fill attic insulation does not solve. These spaces typically need rigid foam between rafters or spray foam, both of which have different cost and contractor-skill requirements than blown-in attic floor work.',
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
          Pre-computed R-value calculations for typical attic insulation scenarios across climate
          zones. Each example shows total R-value, DOE comparison, and upgrade recommendation.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {atticRValueExamples.map((ex) => {
            const exResult = calculateAtticRValue(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/attic-r-value-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  R-{exResult.totalRValue.toFixed(1)} · zone {ex.inputs.climateZone}
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
