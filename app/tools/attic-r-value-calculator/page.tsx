import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import {
  calculateAtticRValue,
  type AtticRValueInputs,
} from '@/lib/calculators/attic-r-value';
import { AtticRValueCalculatorClient } from './AtticRValueCalculatorClient';

export const metadata: Metadata = {
  title: 'Attic R-Value Calculator: Depth × R-per-Inch by Insulation Type',
  description:
    'Compute your attic R-value from insulation depth and type. Compares result to DOE recommended ranges and suggests upgrade depth to reach climate-zone targets.',
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

const RELATED = [
  {
    title: 'Attic R-value (article)',
    url: '/building-science/insulation/attic-r-value/',
    description: 'DOE recommended R-values by climate zone, insulation types, and methodology behind this calculator.',
  },
  {
    title: 'Air sealing before insulation',
    url: '/building-science/insulation/air-sealing/',
    description: 'R-value assumes no air leakage. Air seal first or your insulation underperforms.',
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
        <a className="text-brand underline" href="/building-science/insulation/air-sealing/">
          air sealing before insulation
        </a>{' '}
        for the order of operations.
      </Callout>

      <section className="mt-8">
        <AtticRValueCalculatorClient defaults={DEFAULTS} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
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
      </section>

      <RelatedArticles items={RELATED} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
