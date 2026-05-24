import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import {
  calculateAtticRValue,
  INSULATION_DISPLAY_NAMES,
} from '@/lib/calculators/attic-r-value';
import { SITE } from '@/lib/seo/site';
import { AtticRValueCalculatorClient } from '../../AtticRValueCalculatorClient';
import {
  atticRValueExamples,
  findAtticRExampleBySlug,
  getRelatedAtticRExamples,
} from '../../examples-manifest';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return atticRValueExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = findAtticRExampleBySlug(slug);
  if (!example) {
    return { title: 'Example not found' };
  }
  const canonicalPath = `/tools/attic-r-value-calculator/examples/${slug}/`;
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

const STATUS_DESCRIPTION: Record<string, string> = {
  'below-doe-low': 'below DOE recommended minimum — upgrade recommended',
  'meets-iecc-only': 'meets IECC code minimum but below DOE recommended range',
  'in-doe-range': 'within DOE recommended range',
  'at-or-above-doe-high': 'at or above DOE recommended high end',
};

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findAtticRExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateAtticRValue(example.inputs);
  const related = getRelatedAtticRExamples(slug, 5);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
    { name: 'Attic R-Value Calculator', url: '/tools/attic-r-value-calculator/' },
    { name: example.title },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{example.title}</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Total R-value, DOE comparison, and upgrade recommendation for this attic insulation
          scenario in IECC climate zone {example.inputs.climateZone}.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        R-value assumes no air leakage. Air seal first; insulation over unsealed penetrations
        underperforms by 30-50%. See{' '}
        <Link className="text-brand underline" href="/building-science/insulation/air-sealing/">
          air sealing before insulation
        </Link>{' '}
        for the order of operations.
      </Callout>

      <section className="not-prose mt-8 rounded-lg border-2 border-brand bg-brand/5 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Total R-value</p>
        <p className="mt-2 text-4xl font-bold text-brand">R-{result.totalRValue.toFixed(1)}</p>
        <p className="mt-2 text-base text-ink-700">{STATUS_DESCRIPTION[result.status]}</p>
        <p className="mt-1 text-sm text-ink-600">
          DOE recommended: R-{result.doeRecommendedRange.low} to R-{result.doeRecommendedRange.high}{' '}
          · IECC 2021 code: R-{result.ieccCodeMinimum}
        </p>
      </section>

      <section className="mt-8">
        <AtticRValueCalculatorClient defaults={example.inputs} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>What this calculation is</h2>
        <p>{example.scenario}</p>

        <h2>How this R-value was reached</h2>
        <p>
          The total R-value of an attic is simply the sum of each layer&apos;s contribution. Each
          layer&apos;s R-value is depth × the material&apos;s R-per-inch.
        </p>
        <ul>
          {result.perLayerRValues.map((l, i) => (
            <li key={i}>
              {l.depthInches}″ {INSULATION_DISPLAY_NAMES[l.type]} = <strong>R-{l.rValue.toFixed(1)}</strong>
            </li>
          ))}
          <li>
            Total: <strong>R-{result.totalRValue.toFixed(1)}</strong>
          </li>
        </ul>

        {result.upgradeRecommendation ? (
          <>
            <h2>Upgrade recommendation</h2>
            <p>
              To reach R-{result.upgradeRecommendation.targetR} (the DOE recommended minimum for zone{' '}
              {example.inputs.climateZone}), add about R-
              {result.upgradeRecommendation.additionalRNeeded.toFixed(1)} on top of the existing
              insulation. Required depth varies by material:
            </p>
            <ul>
              {result.upgradeRecommendation.depthsByMaterial.map((d) => (
                <li key={d.type}>
                  <strong>{d.depthInches}″</strong> of {INSULATION_DISPLAY_NAMES[d.type]}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h2>No upgrade needed</h2>
            <p>
              R-{result.totalRValue.toFixed(1)} is at or above the DOE recommended range for zone{' '}
              {example.inputs.climateZone}. The remaining returns from going deeper drop off; spend
              budget instead on air sealing, the attic hatch, and any other thermal weak points.
            </p>
          </>
        )}

        <h2>What R-value doesn&apos;t tell you</h2>
        <p>
          R-value is steady-state conductive resistance. It doesn&apos;t capture air leakage (often the
          biggest energy loss in older attics), moisture-related performance loss, settling of
          loose-fill over decades, or compression from foot traffic on batts. Use this calculation as
          a baseline; combine with a blower-door test or an energy audit for a full picture.
        </p>

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change the climate zone, modify layer depths and
          materials, or add additional layers to see how the total R-value and upgrade recommendation
          shift.
        </p>

        <h2>Methodology</h2>
        <p>
          R-per-inch values are from the{' '}
          <Link className="text-brand underline" href="/building-science/insulation/attic-r-value/">
            attic R-value article
          </Link>
          , cross-referenced with ENERGY STAR R-Value Recommendations and DOE Energy Saver. DOE
          recommended ranges are for existing-home retrofits; IECC 2021 code minimums apply to new
          construction. Material R-per-inch values are aged (settled) for loose-fill, normal for batts,
          and aged for spray foam and rigid boards.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Try other attic R-value examples</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Compare to other depths, materials, or climate zones.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => {
            const rResult = calculateAtticRValue(r.inputs);
            return (
              <li
                key={r.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/attic-r-value-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  R-{rResult.totalRValue.toFixed(1)} · zone {r.inputs.climateZone}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link className="text-brand underline" href="/tools/attic-r-value-calculator/">
            ← Back to the attic R-value calculator
          </Link>
        </p>
      </section>

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
