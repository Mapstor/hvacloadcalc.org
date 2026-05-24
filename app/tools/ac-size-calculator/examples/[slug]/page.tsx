import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { calculateBtu } from '@/lib/calculators/btu';
import { SITE } from '@/lib/seo/site';
import { BtuCalculatorClient } from '../../../btu-calculator/BtuCalculatorClient';
import {
  acSizeExamples,
  findAcSizeExampleBySlug,
  getRelatedAcSizeExamples,
} from '../../examples-manifest';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return acSizeExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = findAcSizeExampleBySlug(slug);
  if (!example) {
    return { title: 'Example not found' };
  }
  const canonicalPath = `/tools/ac-size-calculator/examples/${slug}/`;
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

const EQUIPMENT_CLASS_DETAIL: Record<string, string> = {
  window: 'Window AC unit (smallest standard equipment class)',
  'window-or-portable': 'Window AC or portable AC (size up portable by one tier)',
  'mini-split-or-window': 'Mini split or large window unit (mini split preferred for daily-use spaces)',
  central: 'Central AC system or mini split (the calculator falls in central-AC tonnage range)',
};

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findAcSizeExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateBtu(example.inputs);
  const related = getRelatedAcSizeExamples(slug, 5);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
    { name: 'AC Size Calculator', url: '/tools/ac-size-calculator/' },
    { name: example.title },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{example.title}</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Worked AC sizing for a {example.inputs.squareFootage.toLocaleString()} square foot space —
          recommended tonnage, equipment class, and the full BTU calculation.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        For window AC, portable AC, or single-zone mini-split sizing, this estimate is sufficient. For
        permit-grade central AC sizing, get a Manual J load calculation from a licensed contractor or
        an{' '}
        <Link className="text-brand underline" href="/manual-j/">
          ACCA-approved Manual J workflow
        </Link>
        .
      </Callout>

      <section className="not-prose mt-8 rounded-lg border-2 border-brand bg-brand/5 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Recommended equipment</p>
        <p className="mt-2 text-3xl font-bold text-brand">
          {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'}
          <span className="ml-2 text-xl font-medium text-ink-700">
            ({result.recommendedBtu.toLocaleString()} BTU/hr)
          </span>
        </p>
        <p className="mt-2 text-base text-ink-700">
          {EQUIPMENT_CLASS_DETAIL[result.suggestedEquipmentClass]}
        </p>
        <p className="mt-1 text-sm text-ink-600">
          Acceptable range: {result.acceptableRange.low.toLocaleString()}–
          {result.acceptableRange.high.toLocaleString()} BTU/hr
        </p>
      </section>

      <section className="mt-8">
        <BtuCalculatorClient defaults={example.inputs} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>What this calculation is</h2>
        <p>{example.scenario}</p>

        <h2>How this calculation was reached</h2>
        <p>
          The calculator starts with a baseline of 22 BTU per square foot, applies multiplicative
          adjustments for climate, ceiling, sun, insulation, and space type, then adds fixed amounts
          for extra occupants and kitchen heat gain. Final result rounds to the nearest standard AC
          equipment size.
        </p>
        <ul>
          <li>
            Baseline: {example.inputs.squareFootage.toLocaleString()} sqft × 22 BTU/sqft ={' '}
            <strong>{result.breakdown.baseline.result.toLocaleString()} BTU</strong>
          </li>
          <li>× Climate factor (zone {example.inputs.climateZone}): {result.breakdown.climateFactor}</li>
          <li>× Ceiling factor ({example.inputs.ceilingHeight} ft): {result.breakdown.ceilingFactor}</li>
          <li>× Sun factor: {result.breakdown.sunFactor}</li>
          <li>× Insulation factor: {result.breakdown.insulationFactor}</li>
          <li>× Space-type factor: {result.breakdown.spaceTypeFactor}</li>
          <li>
            = Subtotal: <strong>{result.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</strong>
          </li>
          {result.breakdown.occupancyAdjustment > 0 ? (
            <li>
              + Occupancy adjustment ({example.inputs.occupants} occupants):{' '}
              {result.breakdown.occupancyAdjustment.toLocaleString()} BTU
            </li>
          ) : null}
          {result.breakdown.kitchenAdjustment > 0 ? (
            <li>+ Kitchen heat gain: {result.breakdown.kitchenAdjustment.toLocaleString()} BTU</li>
          ) : null}
          <li>
            = Final raw: <strong>{result.breakdown.finalRaw.toLocaleString()} BTU</strong>
          </li>
          <li>
            Rounded to nearest standard size:{' '}
            <strong>{result.recommendedBtu.toLocaleString()} BTU</strong> (≈{' '}
            {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'})
          </li>
        </ul>

        <h2>Right-sizing matters</h2>
        <p>
          An AC unit sized at the recommended capacity runs efficiently and controls humidity. An
          oversized AC reaches setpoint too fast, short-cycles, and leaves the air clammy. An
          undersized unit runs continuously and never quite cools. For deeper discussion, see the{' '}
          <Link className="text-brand underline" href="/ac/short-cycling/">
            AC short cycling article
          </Link>
          . Variable-speed (inverter) equipment tolerates moderate oversizing better than single-stage.
        </p>

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change any input — square footage, climate zone,
          ceiling, insulation, sun, occupants, space type — and the result updates live. Reset to
          defaults restores the values for this example.
        </p>

        <h2>Methodology</h2>
        <p>
          This calculation follows the ENERGY STAR room AC sizing guide and Manual J 8th Edition
          methodology, simplified for whole-room or whole-house cooling estimates. Full reference in
          the{' '}
          <Link className="text-brand underline" href="/ac/btu/chart/">
            AC BTU chart article
          </Link>
          . For permit-grade central AC sizing on new construction, full Manual J with room-by-room
          load distribution is the correct tool — see{' '}
          <Link className="text-brand underline" href="/manual-j/">
            the Manual J methodology article
          </Link>
          .
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Try other AC sizing examples</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Compare to nearby sizes or different scenarios.
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
                  href={`/tools/ac-size-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {rResult.recommendedTons} ton{rResult.recommendedTons === 1 ? '' : 's'} (
                  {rResult.recommendedBtu.toLocaleString()} BTU)
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link className="text-brand underline" href="/tools/ac-size-calculator/">
            ← Back to the AC size calculator
          </Link>
        </p>
      </section>

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
