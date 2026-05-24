import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { calculateHeatPumpSize } from '@/lib/calculators/heat-pump-size';
import { SITE } from '@/lib/seo/site';
import { HeatPumpSizeCalculatorClient } from '../../HeatPumpSizeCalculatorClient';
import {
  heatPumpExamples,
  findHeatPumpExampleBySlug,
  getRelatedHeatPumpExamples,
} from '../../examples-manifest';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return heatPumpExamples.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const example = findHeatPumpExampleBySlug(slug);
  if (!example) {
    return { title: 'Example not found' };
  }
  const canonicalPath = `/tools/heat-pump-size-calculator/examples/${slug}/`;
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

const RECOMMENDATION_DESCRIPTION: Record<string, string> = {
  standard: 'Standard heat pump (no cold-climate certification needed in this zone)',
  'cold-climate-recommended': 'Cold-climate certified (NEEP CCASHP listed) recommended for this zone',
  'cold-climate-required': 'Cold-climate certified (NEEP CCASHP listed) required for this zone',
};

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findHeatPumpExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateHeatPumpSize(example.inputs);
  const related = getRelatedHeatPumpExamples(slug, 5);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tools', url: '/tools/' },
    { name: 'Heat Pump Size Calculator', url: '/tools/heat-pump-size-calculator/' },
    { name: example.title },
  ];

  return (
    <Container>
      <Breadcrumbs items={breadcrumbs} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">{example.title}</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Worked heat pump sizing for a {example.inputs.squareFootage.toLocaleString()} square foot
          home in IECC climate zone {example.inputs.climateZone}. Includes balance point and aux heat
          capacity estimates.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        Heat pump sizing handles two loads (cooling and heating). For permit-grade equipment selection,
        get a Manual J load calculation from a licensed contractor. See{' '}
        <Link className="text-brand underline" href="/heat-pump/sizing/">
          the heat pump sizing article
        </Link>{' '}
        for full methodology.
      </Callout>

      <section className="not-prose mt-8 rounded-lg border-2 border-brand bg-brand/5 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Recommended equipment</p>
        <p className="mt-2 text-3xl font-bold text-brand">
          {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'}
          <span className="ml-2 text-xl font-medium text-ink-700">
            ({result.recommendedSizeBtu.toLocaleString()} BTU)
          </span>
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-ink-900">Balance point</p>
            <p className="text-2xl font-bold text-ink-900">{result.balancePointF}°F</p>
          </div>
          <div>
            <p className="font-medium text-ink-900">Aux heat at design</p>
            <p className="text-2xl font-bold text-ink-900">
              {result.auxHeatAtDesignBtu === 0
                ? 'None'
                : `${result.auxHeatAtDesignBtu.toLocaleString()} BTU`}
            </p>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink-700">
          {RECOMMENDATION_DESCRIPTION[result.equipmentRecommendation]}
        </p>
      </section>

      <section className="mt-8">
        <HeatPumpSizeCalculatorClient defaults={example.inputs} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>What this calculation is</h2>
        <p>{example.scenario}</p>

        <h2>How this calculation was reached</h2>
        <p>
          Heat pump sizing must handle both cooling and heating loads. The calculator:
        </p>
        <ol>
          <li>Computes the cooling load using the BTU calculator methodology</li>
          <li>
            Multiplies that by a climate-zone heating factor to get the heating load (
            {(result.heatingLoadBtu / result.coolingLoadBtu).toFixed(2)}× in zone{' '}
            {example.inputs.climateZone})
          </li>
          <li>Picks the larger of the two as the equipment size, rounded to standard tonnage</li>
          <li>Computes the balance point — outdoor temp at which heat pump capacity equals home load</li>
          <li>
            Computes aux heat capacity needed at the heating design temperature (
            {result.heatingDesignTempF}°F for zone {example.inputs.climateZone})
          </li>
        </ol>
        <ul>
          <li>
            Cooling load: <strong>{result.coolingLoadBtu.toLocaleString()} BTU</strong> at{' '}
            {result.coolingDesignTempF}°F
          </li>
          <li>
            Heating load: <strong>{result.heatingLoadBtu.toLocaleString()} BTU</strong> at{' '}
            {result.heatingDesignTempF}°F
          </li>
          <li>
            Driving load:{' '}
            <strong>
              {result.drivingLoad}{' '}
              {result.drivingLoad === 'balanced'
                ? '(within 15% of each other)'
                : `(${result.drivingLoad === 'heating' ? '>15%' : '>15%'} larger)`}
            </strong>
          </li>
          <li>
            Recommended equipment size:{' '}
            <strong>
              {result.recommendedSizeBtu.toLocaleString()} BTU ({result.recommendedTons} tons)
            </strong>
          </li>
          <li>
            Balance point: <strong>{result.balancePointF}°F</strong> — heat pump alone keeps up above
            this temperature
          </li>
          <li>
            Aux heat at design ({result.heatingDesignTempF}°F):{' '}
            <strong>
              {result.auxHeatAtDesignBtu === 0
                ? 'none required'
                : `${result.auxHeatAtDesignBtu.toLocaleString()} BTU`}
            </strong>
          </li>
        </ul>

        <h2>Standard vs cold-climate equipment</h2>
        <p>
          Standard heat pumps lose substantial heating capacity at low temperatures: about 60% of rated
          at 17°F. Cold-climate (NEEP CCASHP listed) models maintain about 85% at the same
          temperature. Toggle the &ldquo;Cold-climate equipment&rdquo; checkbox above to see how the
          balance point and aux heat capacity change.
        </p>
        <p>
          For deeper discussion of cold-climate behavior, see{' '}
          <Link className="text-brand underline" href="/heat-pump/cold-climate/defrost-cycle/">
            heat pump defrost cycles
          </Link>{' '}
          and{' '}
          <Link className="text-brand underline" href="/heat-pump/aux-heat/">
            heat pump aux heat
          </Link>
          .
        </p>

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change square footage, climate zone, insulation, sun
          exposure, occupancy, or toggle cold-climate equipment to see how the result shifts. Use
          &ldquo;Reset to defaults&rdquo; to return to this example.
        </p>

        <h2>Methodology</h2>
        <p>
          This calculation follows the dual-load methodology from the{' '}
          <Link className="text-brand underline" href="/heat-pump/sizing/">
            heat pump sizing article
          </Link>
          , using climate-zone heating factors calibrated against ASHRAE 169 design temperatures and
          ACCA Manual J reference cases. For permit-grade equipment specification on a new install,
          full Manual J + Manual S done by a contractor is the correct workflow.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Try other heat pump sizing examples</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Compare to other house sizes, climate zones, or equipment classes.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => {
            const rResult = calculateHeatPumpSize(r.inputs);
            return (
              <li
                key={r.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/heat-pump-size-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {rResult.recommendedTons} tons, balance point {rResult.balancePointF}°F
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-6">
          <Link className="text-brand underline" href="/tools/heat-pump-size-calculator/">
            ← Back to the heat pump size calculator
          </Link>
        </p>
      </section>

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
