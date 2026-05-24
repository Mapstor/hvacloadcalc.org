import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { calculateManualJ } from '@/lib/calculators/manual-j';
import { SITE } from '@/lib/seo/site';
import { ManualJCalculatorClient } from '../../ManualJCalculatorClient';
import {
  manualJExamples,
  findManualJExampleBySlug,
  getRelatedManualJExamples,
} from '../../examples-manifest';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return manualJExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = findManualJExampleBySlug(slug);
  if (!example) {
    return { title: 'Example not found' };
  }
  const canonicalPath = `/tools/manual-j-calculator/examples/${slug}/`;
  return {
    title: `${example.metaTitle} | hvacloadcalc.org`,
    description: example.metaDescription,
    alternates: { canonical: `${SITE.url}${canonicalPath}` },
    openGraph: {
      title: example.metaTitle,
      description: example.metaDescription,
      url: `${SITE.url}${canonicalPath}`,
      type: 'article',
    },
  };
}

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findManualJExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateManualJ(example.inputs);
  const related = getRelatedManualJExamples(slug, 5);
  const drivingLoad = result.loadRatio > 1 ? 'heating' : 'cooling';

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
    { name: 'Manual J Calculator', url: '/tools/manual-j-calculator/' },
    { name: example.title },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{example.title}</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Manual J-style load calculation showing the heating and cooling design loads with
          component-by-component breakdown.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        This is a Manual J-style implementation following ACCA 8th Edition methodology — not
        ACCA-approved software. For permit-grade equipment selection on a real install, use
        ACCA-approved software or a certified contractor. See{' '}
        <Link className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </Link>{' '}
        for accuracy bands.
      </Callout>

      <section className="not-prose mt-8 rounded-lg border-2 border-brand bg-brand/5 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Recommended equipment</p>
        <p className="mt-2 text-3xl font-bold text-brand">
          {result.recommendedCoolingTons} ton{result.recommendedCoolingTons === 1 ? '' : 's'}
          <span className="ml-2 text-xl font-medium text-ink-700">
            ({result.recommendedHeatingBtu.toLocaleString()} BTU)
          </span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-ink-900">Heating load</p>
            <p className="text-xl font-bold text-ink-900">{result.heatingLoadBtu.toLocaleString()} BTU</p>
            <p className="text-xs text-ink-500">at {result.designConditions.heatingDesignTempF}°F</p>
          </div>
          <div>
            <p className="font-medium text-ink-900">Cooling load (total)</p>
            <p className="text-xl font-bold text-ink-900">{result.coolingLoadTotalBtu.toLocaleString()} BTU</p>
            <p className="text-xs text-ink-500">at {result.designConditions.coolingDesignTempF}°F</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-700">
          Load ratio: {result.loadRatio.toFixed(2)}× — {drivingLoad}-dominated climate.
        </p>
      </section>

      <section className="mt-8">
        <ManualJCalculatorClient defaults={example.inputs} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>What this calculation is</h2>
        <p>{example.scenario}</p>

        <h2>How this load was calculated</h2>
        <p>The calculator applies a simplified Manual J 8th Edition methodology:</p>
        <ol>
          <li>
            Compute envelope geometry: wall area, ceiling area, floor area, window area, and volume
            from square footage, stories, and ceiling height
          </li>
          <li>
            Apply era-based envelope defaults (wall R, ceiling R, window U, ACH50, SHGC) — or
            user-supplied overrides
          </li>
          <li>
            For heating: sum conductive loss (UA × ΔT) for walls, ceiling, floor, windows, plus
            infiltration loss
          </li>
          <li>
            For cooling: sum conductive gain, infiltration gain, solar gain through windows, and
            internal gains from occupants and appliances
          </li>
          <li>Add climate-driven latent cooling fraction (humidity removal)</li>
          <li>Pick equipment size to handle the larger of heating or cooling-total</li>
        </ol>

        <h3>Heating breakdown ({result.heatingLoadBtu.toLocaleString()} BTU/hr total)</h3>
        <ul>
          <li>Walls: {result.breakdown.heating.wallConductive.toLocaleString()} BTU</li>
          <li>Ceiling: {result.breakdown.heating.ceilingConductive.toLocaleString()} BTU</li>
          <li>Floor: {result.breakdown.heating.floorConductive.toLocaleString()} BTU</li>
          <li>Windows: {result.breakdown.heating.windowConductive.toLocaleString()} BTU</li>
          <li>Infiltration: {result.breakdown.heating.infiltration.toLocaleString()} BTU</li>
        </ul>

        <h3>Cooling breakdown ({result.coolingLoadTotalBtu.toLocaleString()} BTU/hr total)</h3>
        <ul>
          <li>Walls: {result.breakdown.cooling.wallConductive.toLocaleString()} BTU</li>
          <li>Ceiling: {result.breakdown.cooling.ceilingConductive.toLocaleString()} BTU</li>
          <li>Floor: {result.breakdown.cooling.floorConductive.toLocaleString()} BTU</li>
          <li>Windows: {result.breakdown.cooling.windowConductive.toLocaleString()} BTU</li>
          <li>Infiltration: {result.breakdown.cooling.infiltration.toLocaleString()} BTU</li>
          <li>Solar gain (windows): {result.breakdown.cooling.solarGain.toLocaleString()} BTU</li>
          <li>Internal gains (occupants + appliances): {result.breakdown.cooling.internalGain.toLocaleString()} BTU</li>
          <li>
            Sensible subtotal: {result.coolingLoadSensibleBtu.toLocaleString()} BTU
          </li>
          <li>
            + Latent (humidity removal): {result.coolingLoadLatentBtu.toLocaleString()} BTU
          </li>
        </ul>

        <h3>Envelope geometry</h3>
        <ul>
          <li>Net wall area: {result.breakdown.envelope.wallNetArea.toLocaleString()} sq ft</li>
          <li>Ceiling area: {result.breakdown.envelope.ceilingArea.toLocaleString()} sq ft</li>
          <li>Floor area: {result.breakdown.envelope.floorArea.toLocaleString()} sq ft</li>
          <li>Window area: {result.breakdown.envelope.windowArea.toLocaleString()} sq ft (15% of floor)</li>
          <li>Conditioned volume: {result.breakdown.envelope.volume.toLocaleString()} cu ft</li>
        </ul>

        <h3>Applied envelope characteristics</h3>
        <ul>
          <li>Wall R-value: R-{result.breakdown.applied.wallRValue}</li>
          <li>Ceiling R-value: R-{result.breakdown.applied.ceilingRValue}</li>
          <li>Floor R-value: R-{result.breakdown.applied.floorRValue}</li>
          <li>Window U-factor: U-{result.breakdown.applied.windowUFactor}</li>
          <li>Window SHGC: {result.breakdown.applied.windowSHGC}</li>
          <li>ACH50: {result.breakdown.applied.ach50} (natural ACH: {result.breakdown.applied.achNatural})</li>
          <li>Occupants: {result.breakdown.applied.occupants}</li>
        </ul>

        <h2>What this calculator does not capture</h2>
        <p>
          This is a simplified Manual J — useful for planning but not permit-grade. It does not model
          room-by-room loads (needed for Manual D duct design), orientation-specific solar gain (real
          Manual J distributes by N/E/S/W per window), duct losses in unconditioned space, or
          equipment-specific deratings (Manual S). For permit submission, manufacturer warranty
          documentation, or court-grade analysis, use ACCA-approved software (Wrightsoft, Cool Calc,
          Elite).
        </p>

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change square footage, climate zone, stories, ceiling
          height, construction era, or override individual envelope characteristics to see how the
          loads shift.
        </p>

        <h2>Methodology</h2>
        <p>
          This calculation follows Manual J 8th Edition methodology simplified for whole-house loads.
          Verification against ACCA reference cases targets ±5% on heating load and ±10% on cooling
          load — see{' '}
          <Link className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
            how we verify
          </Link>
          {' '}for the full test suite and accuracy bands.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Try other Manual J examples</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Compare to other house sizes, climate zones, or construction eras.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => {
            const rResult = calculateManualJ(r.inputs);
            return (
              <li
                key={r.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/manual-j-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {rResult.recommendedCoolingTons} tons · heat {rResult.heatingLoadBtu.toLocaleString()}{' '}
                  / cool {rResult.coolingLoadTotalBtu.toLocaleString()} BTU
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link className="text-brand underline" href="/tools/manual-j-calculator/">
            ← Back to the Manual J calculator
          </Link>
        </p>
      </section>

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
