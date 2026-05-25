import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { FAQ } from '@/components/article/FAQ';
import { Sources } from '@/components/article/Sources';
import { calculateBtu } from '@/lib/calculators/btu';
import { SITE } from '@/lib/seo/site';
import { getSources } from '@/lib/seo/sources';
import { BtuCalculatorClient } from '../../BtuCalculatorClient';
import {
  btuExamples,
  findExampleBySlug,
  getRelatedExamples,
} from '../../examples-manifest';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return btuExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = findExampleBySlug(slug);
  if (!example) {
    return { title: 'Example not found' };
  }
  const canonicalPath = `/tools/btu-calculator/examples/${slug}/`;
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

const SPACE_LABELS: Record<string, string> = {
  bedroom: 'bedroom',
  'living-room': 'living room',
  kitchen: 'kitchen',
  'home-office': 'home office',
  'sun-room': 'sun room',
  'basement-above-grade': 'basement (above grade)',
  'basement-below-grade': 'basement (below grade)',
  'attic-or-second-floor': 'attic or second floor',
};

const INSULATION_LABELS: Record<string, string> = {
  poor: 'poor (older home, below current code)',
  average: 'average (meets current code)',
  good: 'good (above code, recently insulated)',
};

const SUN_LABELS: Record<string, string> = {
  heavy: 'heavy (south or west facing)',
  mixed: 'mixed (typical)',
  shaded: 'heavily shaded',
};

const CLIMATE_DESCRIPTIONS: Record<string, string> = {
  '1': 'zone 1 (tropical south Florida, Hawaii)',
  '2': 'zone 2 (Gulf Coast, lower south)',
  '3': 'zone 3 (mid-south, parts of California)',
  '4': 'zone 4 (Mid-Atlantic, Ohio Valley)',
  '5': 'zone 5 (northern states)',
  '6': 'zone 6 (northern Midwest, New England, Rockies)',
  '7': 'zone 7 (northern Minnesota, mountain west)',
  '8': 'zone 8 (interior Alaska)',
};

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateBtu(example.inputs);
  const related = getRelatedExamples(slug, 5);
  const sources = example.sourceIds ? getSources(example.sourceIds) : [];
  const spaceLabel = SPACE_LABELS[example.inputs.spaceType ?? 'bedroom'];
  const insulationLabel = INSULATION_LABELS[example.inputs.insulationLevel];
  const sunLabel = SUN_LABELS[example.inputs.sunExposure];
  const climateLabel = CLIMATE_DESCRIPTIONS[example.inputs.climateZone];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
    { name: 'BTU Calculator', url: '/tools/btu-calculator/' },
    { name: example.title },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{example.title}</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Worked AC BTU calculation for a {example.inputs.squareFootage.toLocaleString()} square foot{' '}
          {spaceLabel} in {climateLabel}.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        This example uses the same methodology as the main{' '}
        <Link className="text-brand underline" href="/tools/btu-calculator/">
          BTU calculator
        </Link>
        . Results are accurate within ±5% for window, portable, and single-zone mini-split sizing.
        For permit-grade central AC installation, get a Manual J from a licensed contractor.
      </Callout>

      <section className="not-prose mt-8 rounded-lg border-2 border-brand bg-brand/5 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Recommended</p>
        <p className="mt-2 text-3xl font-bold text-brand">
          {result.recommendedBtu.toLocaleString()}
          <span className="ml-2 text-xl font-medium text-ink-700">BTU/hr</span>
        </p>
        <p className="mt-1 text-base text-ink-700">
          ≈ {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'} cooling capacity
        </p>
        <p className="mt-2 text-sm text-ink-600">
          Acceptable range: {result.acceptableRange.low.toLocaleString()}–
          {result.acceptableRange.high.toLocaleString()} BTU/hr
        </p>
      </section>

      <section className="mt-8">
        <BtuCalculatorClient defaults={example.inputs} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>{example.intro ? 'Overview' : 'What this calculation is'}</h2>
        <p>{example.intro ?? example.scenario}</p>

        {example.houseContext ? (
          <>
            <h2>Where this size comes up</h2>
            <p>{example.houseContext}</p>
          </>
        ) : null}

        <h2>How this calculation was reached</h2>
        <p>
          The calculator starts with a baseline of 22 BTU per square foot and applies multiplicative
          adjustment factors for climate, ceiling height, sun exposure, insulation, and space type. It
          then adds fixed amounts for additional occupants and kitchen heat gain. For this scenario:
        </p>
        <ul>
          <li>
            Baseline: {example.inputs.squareFootage.toLocaleString()} sqft × 22 BTU/sqft ={' '}
            <strong>{result.breakdown.baseline.result.toLocaleString()} BTU</strong>
          </li>
          <li>× Climate factor ({climateLabel}): {result.breakdown.climateFactor}</li>
          <li>× Ceiling factor ({example.inputs.ceilingHeight} ft): {result.breakdown.ceilingFactor}</li>
          <li>× Sun factor ({sunLabel}): {result.breakdown.sunFactor}</li>
          <li>× Insulation factor ({insulationLabel}): {result.breakdown.insulationFactor}</li>
          <li>× Space-type factor ({spaceLabel}): {result.breakdown.spaceTypeFactor}</li>
          <li>
            = Subtotal: <strong>{result.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</strong>
          </li>
          {result.breakdown.occupancyAdjustment > 0 ? (
            <li>
              + Occupancy ({example.inputs.occupants} occupants, {example.inputs.occupants - 2} above
              baseline): {result.breakdown.occupancyAdjustment.toLocaleString()} BTU
            </li>
          ) : null}
          {result.breakdown.kitchenAdjustment > 0 ? (
            <li>+ Kitchen heat gain: {result.breakdown.kitchenAdjustment.toLocaleString()} BTU</li>
          ) : null}
          <li>
            = Final raw: <strong>{result.breakdown.finalRaw.toLocaleString()} BTU</strong>
          </li>
          <li>
            Rounded to nearest standard equipment size:{' '}
            <strong>{result.recommendedBtu.toLocaleString()} BTU</strong>
          </li>
        </ul>

        {example.equipmentNotes ? (
          <>
            <h2>Equipment options at this size</h2>
            <p>{example.equipmentNotes}</p>
          </>
        ) : null}

        {example.climateVariation ? (
          <>
            <h2>How climate zone shifts the result</h2>
            <p>{example.climateVariation}</p>
          </>
        ) : null}

        {example.realWorldNotes ? (
          <>
            <h2>What the calculator does not capture</h2>
            <p>{example.realWorldNotes}</p>
          </>
        ) : null}

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change any input — square footage, climate zone,
          ceiling, insulation, sun exposure, space type, occupants, or kitchen flag — and the result
          updates live. Use &ldquo;Reset to defaults&rdquo; to return to the values shown on this
          page.
        </p>

        <h2>Methodology</h2>
        <p>
          This calculation follows the ENERGY STAR room AC sizing guide and Manual J 8th Edition
          residential load calculation, simplified for whole-room sizing. The methodology is
          documented in the{' '}
          <Link className="text-brand underline" href="/ac/btu/chart/">
            AC BTU chart article
          </Link>{' '}
          and verified against ACCA reference cases per{' '}
          <Link className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
            our verification methodology
          </Link>
          . Limitations: whole-room estimate only, does not perform room-by-room load calculation,
          and does not include duct losses to unconditioned spaces.
        </p>
      </section>

      {example.faq && example.faq.length > 0 ? <FAQ items={example.faq} /> : null}

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Try other examples</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Compare to nearby scenarios with different square footage or space type.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => {
            const rResult = calculateBtu(r.inputs);
            return (
              <li
                key={r.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/btu-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {rResult.recommendedBtu.toLocaleString()} BTU (≈ {rResult.recommendedTons} tons)
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link className="text-brand underline" href="/tools/btu-calculator/">
            ← Back to the BTU calculator
          </Link>
        </p>
      </section>

      {sources.length > 0 ? <Sources sources={sources} /> : null}

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
