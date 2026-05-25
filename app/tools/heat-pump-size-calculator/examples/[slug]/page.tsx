import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { FAQ } from '@/components/article/FAQ';
import { Sources } from '@/components/article/Sources';
import { calculateHeatPumpSize } from '@/lib/calculators/heat-pump-size';
import { SITE } from '@/lib/seo/site';
import { getSources } from '@/lib/seo/sources';
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

const INSULATION_LABELS: Record<string, string> = {
  poor: 'poor (older home, below code)',
  average: 'average (meets current code)',
  good: 'good (above code)',
};

const CLIMATE_DESCRIPTIONS: Record<string, string> = {
  '1': 'zone 1',
  '2': 'zone 2 (Gulf Coast)',
  '3': 'zone 3 (mid-south)',
  '4': 'zone 4 (Mid-Atlantic)',
  '5': 'zone 5 (northern states)',
  '6': 'zone 6 (far north)',
  '7': 'zone 7 (very cold)',
  '8': 'zone 8 (interior Alaska)',
};

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  const example = findHeatPumpExampleBySlug(slug);
  if (!example) {
    notFound();
  }

  const result = calculateHeatPumpSize(example.inputs);
  const related = getRelatedHeatPumpExamples(slug, 5);
  const sources = example.sourceIds ? getSources(example.sourceIds) : [];

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
          home in IECC climate zone {example.inputs.climateZone}. Tonnage, balance point, and aux
          heat capacity.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        Heat pump sizing handles two loads (cooling and heating). For permit-grade equipment
        selection, get a Manual J load calculation from a licensed contractor. See{' '}
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
        <h2>{example.intro ? 'Overview' : 'What this calculation is'}</h2>
        <p>{example.intro ?? example.scenario}</p>

        {example.houseContext ? (
          <>
            <h2>Where this size comes up</h2>
            <p>{example.houseContext}</p>
          </>
        ) : null}

        <h2>How this calculation was reached</h2>
        <p>Heat pump sizing must handle both cooling and heating loads. The calculator:</p>
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
            Driving load: <strong>{result.drivingLoad}</strong>
          </li>
          <li>
            Recommended equipment size:{' '}
            <strong>
              {result.recommendedSizeBtu.toLocaleString()} BTU ({result.recommendedTons} tons)
            </strong>
          </li>
          <li>
            Balance point: <strong>{result.balancePointF}°F</strong>
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

        {example.insulationImpact ? (
          <>
            <h2>How insulation quality changes the answer</h2>
            <p>{example.insulationImpact}</p>
          </>
        ) : null}

        {example.occupancyImpact ? (
          <>
            <h2>How occupancy and lifestyle change the answer</h2>
            <p>{example.occupancyImpact}</p>
          </>
        ) : null}

        {example.realWorldNotes ? (
          <>
            <h2>What the calculator does not capture</h2>
            <p>{example.realWorldNotes}</p>
          </>
        ) : null}

        {example.commonMistakes ? (
          <>
            <h2>Common mistakes when sizing heat pumps at this scale</h2>
            <p>{example.commonMistakes}</p>
          </>
        ) : null}

        {example.whenToUpgrade ? (
          <>
            <h2>When this calculator is enough — and when to upgrade to Manual J</h2>
            <p>{example.whenToUpgrade}</p>
          </>
        ) : null}

        <h2>Adjust the inputs</h2>
        <p>
          The calculator above is interactive. Change square footage, climate zone, insulation, sun
          exposure, occupancy, or toggle cold-climate equipment to see how the result shifts.
        </p>

        <h2>Methodology</h2>
        <p>
          This calculation follows the dual-load methodology from the{' '}
          <Link className="text-brand underline" href="/heat-pump/sizing/">
            heat pump sizing article
          </Link>
          , using climate-zone heating factors calibrated against ASHRAE 169 design temperatures and
          ACCA Manual J reference cases.
        </p>
      </section>

      {example.scenarios && example.scenarios.length > 0 ? (
        <section className="mt-12 border-t border-ink-300 pt-8">
          <h2 className="text-2xl font-bold text-ink-900">
            {example.scenarios.length} worked heat pump scenarios at this house size and zone
          </h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Real heat pump equipment decisions showing how the size, balance point, and aux heat
            requirement shift across equipment class, envelope, and architecture.
          </p>
          <div className="mt-8 space-y-10">
            {example.scenarios.map((s, i) => {
              const sResult = calculateHeatPumpSize(s.inputs);
              const sClimateLabel = CLIMATE_DESCRIPTIONS[s.inputs.climateZone];
              const sInsulationLabel = INSULATION_LABELS[s.inputs.insulationLevel];
              return (
                <article key={i} className="rounded-lg border border-ink-300 bg-white p-6">
                  <h3 className="text-xl font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-1 text-sm font-medium text-ink-500">Common in: {s.location}</p>

                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
                    <div>
                      <dt className="font-medium text-ink-500">Square footage</dt>
                      <dd className="text-ink-900">{s.inputs.squareFootage.toLocaleString()} sqft</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink-500">Climate</dt>
                      <dd className="text-ink-900">{sClimateLabel}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink-500">Insulation</dt>
                      <dd className="text-ink-900">{sInsulationLabel}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink-500">Equipment class</dt>
                      <dd className="text-ink-900">
                        {s.inputs.coldClimateEquipment ? 'Cold-climate (CCASHP)' : 'Standard'}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink-500">Occupants</dt>
                      <dd className="text-ink-900">{s.inputs.occupants}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-ink-500">Sun exposure</dt>
                      <dd className="text-ink-900">{s.inputs.sunExposure}</dd>
                    </div>
                  </dl>

                  <div className="mt-4 rounded-md border border-brand bg-brand/5 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
                      Recommended
                    </p>
                    <p className="mt-1 text-2xl font-bold text-brand">
                      {sResult.recommendedTons} ton{sResult.recommendedTons === 1 ? '' : 's'}
                      <span className="ml-2 text-base font-medium text-ink-700">
                        ({sResult.recommendedSizeBtu.toLocaleString()} BTU)
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-ink-700">
                      Balance point {sResult.balancePointF}°F · Aux at design{' '}
                      {sResult.auxHeatAtDesignBtu === 0
                        ? 'none'
                        : `${sResult.auxHeatAtDesignBtu.toLocaleString()} BTU`}
                    </p>
                  </div>

                  <p className="mt-4 text-ink-700">{s.takeaway}</p>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {example.faq && example.faq.length > 0 ? <FAQ items={example.faq} /> : null}

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

      {sources.length > 0 ? <Sources sources={sources} /> : null}

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
