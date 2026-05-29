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
          home — tonnage, balance point, and aux heat capacity across climate zones and equipment
          classes.
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

      <section className="mt-8">
        <HeatPumpSizeCalculatorClient defaults={example.inputs} />
      </section>

      {/* Overview */}
      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>{example.intro ? 'Overview' : 'What this calculation is'}</h2>
        <p>{example.intro ?? example.scenario}</p>
      </section>

      {/* Archetypes — 3-card grid */}
      {example.archetypes && example.archetypes.length > 0 ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Where this size comes up — common archetypes
          </h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Homes at this square footage cluster around three archetypes, each with distinct envelope
            characteristics that shift the heat pump sizing recommendation.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {example.archetypes.map((a) => (
              <article
                key={a.title}
                className="flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-ink-900">{a.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-500">
                  {a.era}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {a.characteristics.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <div className="rounded-lg bg-brand/10 px-3 py-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                      Load profile
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-brand">{a.loadProfile}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Math walkthrough — compact card */}
      <section className="not-prose mt-12">
        <h2 className="text-2xl font-bold text-ink-900">How this calculation was reached</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Heat pump sizing handles two loads. The calculator computes both and picks the larger,
          then estimates balance point and aux heat capacity.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-ink-300 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Cooling load
            </p>
            <p className="mt-2 text-2xl font-bold text-ink-900">
              {result.coolingLoadBtu.toLocaleString()}{' '}
              <span className="text-base font-medium text-ink-600">BTU/hr</span>
            </p>
            <p className="mt-1 text-sm text-ink-600">at {result.coolingDesignTempF}°F design temp</p>
          </div>
          <div className="rounded-xl border border-ink-300 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
              Heating load
            </p>
            <p className="mt-2 text-2xl font-bold text-ink-900">
              {result.heatingLoadBtu.toLocaleString()}{' '}
              <span className="text-base font-medium text-ink-600">BTU/hr</span>
            </p>
            <p className="mt-1 text-sm text-ink-600">at {result.heatingDesignTempF}°F design temp</p>
          </div>
        </div>
        <p className="mt-4 max-w-prose text-sm text-ink-700">
          Heating-to-cooling load ratio:{' '}
          <strong>{(result.heatingLoadBtu / result.coolingLoadBtu).toFixed(2)}×</strong> —{' '}
          {result.drivingLoad}-driven climate. Equipment sized to the larger load, rounded to standard
          tonnage, gives <strong>{result.recommendedTons} tons</strong> (
          {result.recommendedSizeBtu.toLocaleString()} BTU).
        </p>
      </section>

      {/* Equipment options — 3-card comparison */}
      {example.equipmentOptions && example.equipmentOptions.length > 0 ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Equipment options at this size</h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Three equipment classes serve this size range. Choose by climate severity, operating-cost
            sensitivity, and incentive eligibility.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {example.equipmentOptions.map((e) => (
              <article
                key={e.name}
                className="flex flex-col rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
              >
                <div className="border-b border-ink-200 pb-4">
                  <h3 className="text-base font-semibold text-ink-900">{e.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand">
                    {e.tagline}
                  </p>
                  <p className="mt-3 text-xl font-bold text-ink-900">{e.costRange}</p>
                </div>
                <dl className="mt-4 space-y-3 text-sm">
                  {e.capacity17F ? (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                        Capacity at 17°F
                      </dt>
                      <dd className="mt-0.5 font-medium text-ink-900">{e.capacity17F}</dd>
                    </div>
                  ) : null}
                  {e.balancePoint ? (
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                        Balance point
                      </dt>
                      <dd className="mt-0.5 font-medium text-ink-900">{e.balancePoint}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-ink-500">
                      Best for
                    </dt>
                    <dd className="mt-0.5 font-medium text-ink-900">{e.bestFor}</dd>
                  </div>
                </dl>
                <div className="mt-5 space-y-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-good">Pros</p>
                    <ul className="mt-2 space-y-1.5">
                      {e.pros.map((p) => (
                        <li key={p} className="flex gap-2 text-ink-700">
                          <span className="font-bold text-good">+</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-warn">
                      Considerations
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {e.cons.map((c) => (
                        <li key={c} className="flex gap-2 text-ink-700">
                          <span className="font-bold text-warn">−</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Climate zone table */}
      {example.climateTable && example.climateTable.length > 0 ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How climate zone shifts the recommendation
          </h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Same home, different climate zones. Heating-to-cooling load ratio drives equipment
            selection from cooling-dominated (zone 2) to heating-dominated (zone 7).
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-ink-300 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200 bg-ink-50 text-left">
                  <th className="px-4 py-3 font-semibold text-ink-900">Zone</th>
                  <th className="px-4 py-3 font-semibold text-ink-900">Representative cities</th>
                  <th className="px-4 py-3 font-semibold text-ink-900">Design temp</th>
                  <th className="px-4 py-3 font-semibold text-ink-900">Load ratio</th>
                  <th className="px-4 py-3 font-semibold text-ink-900">Equipment</th>
                  <th className="px-4 py-3 font-semibold text-ink-900">Aux runtime</th>
                </tr>
              </thead>
              <tbody>
                {example.climateTable.map((row, idx) => (
                  <tr
                    key={row.zone}
                    className={idx % 2 === 0 ? 'border-b border-ink-200' : 'border-b border-ink-200 bg-ink-50/50'}
                  >
                    <td className="px-4 py-3 font-semibold text-ink-900">{row.zone}</td>
                    <td className="px-4 py-3 text-ink-700">{row.cities}</td>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.designTemp}</td>
                    <td className="px-4 py-3 font-medium text-ink-900">{row.loadRatio}</td>
                    <td className="px-4 py-3 text-ink-700">{row.equipment}</td>
                    <td className="px-4 py-3 text-ink-700">{row.auxNotes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Insulation 3-panel comparison */}
      {example.insulationLevels ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            How envelope quality shifts the heating load
          </h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Envelope quality has a larger effect on heat pump sizing than on AC-only sizing because
            heating runtimes are longer and heating losses scale strongly with envelope R-value.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(['poor', 'average', 'good'] as const).map((level) => {
              const data = example.insulationLevels![level];
              const borderClass =
                level === 'poor'
                  ? 'border-danger/40 bg-danger/5'
                  : level === 'good'
                    ? 'border-good/40 bg-good/5'
                    : 'border-ink-300 bg-white';
              const labelColor =
                level === 'poor' ? 'text-danger' : level === 'good' ? 'text-good' : 'text-ink-500';
              return (
                <article
                  key={level}
                  className={`rounded-xl border-2 p-5 ${borderClass}`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider ${labelColor}`}
                  >
                    {data.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-ink-900">{data.heatingLoad}</p>
                  <p className="mt-0.5 text-xs text-ink-600">heating load (zone 5)</p>
                  <div className="mt-4 space-y-2 text-xs">
                    <div>
                      <p className="font-semibold uppercase tracking-wide text-ink-500">Envelope</p>
                      <p className="mt-0.5 text-ink-700">{data.envelope}</p>
                    </div>
                    <div>
                      <p className="font-semibold uppercase tracking-wide text-ink-500">
                        Equipment
                      </p>
                      <p className="mt-0.5 font-semibold text-ink-900">{data.equipment}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Occupancy notes — short prose with callout style */}
      {example.occupancyNotes ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">Occupancy and lifestyle effects</h2>
          <div className="mt-4 rounded-xl border-l-4 border-brand bg-brand/5 p-5 max-w-prose">
            <p className="text-ink-700">{example.occupancyNotes}</p>
          </div>
        </section>
      ) : null}

      {/* Additional considerations — 2 callout cards */}
      {example.additionalConsiderations && example.additionalConsiderations.length > 0 ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            What the calculator does not directly model
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {example.additionalConsiderations.map((c) => (
              <article
                key={c.title}
                className="rounded-xl border border-ink-300 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-ink-900">{c.title}</h3>
                <p className="mt-3 text-sm text-ink-700">{c.description}</p>
                {c.linkText && c.linkUrl ? (
                  <p className="mt-4">
                    <Link
                      className="text-sm font-medium text-brand hover:underline"
                      href={c.linkUrl}
                    >
                      {c.linkText} →
                    </Link>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Common mistakes — numbered alert cards */}
      {example.mistakes && example.mistakes.length > 0 ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            {example.mistakes.length} common mistakes when sizing heat pumps at this scale
          </h2>
          <div className="mt-6 space-y-4">
            {example.mistakes.map((m, i) => (
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
      ) : null}

      {/* Decision matrix — 2-column */}
      {example.upgradeDecision ? (
        <section className="not-prose mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When this calculator is enough — and when to upgrade to Manual J
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border-2 border-good/40 bg-good/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-good">
                Use this calculator
              </p>
              <p className="mt-2 text-base font-semibold text-ink-900">
                When the calculator&apos;s recommendation is sufficient
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {example.upgradeDecision.useThisFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink-700">
                    <span className="mt-0.5 shrink-0 font-bold text-good">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border-2 border-brand/40 bg-brand/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-brand">
                Upgrade to full Manual J
              </p>
              <p className="mt-2 text-base font-semibold text-ink-900">
                When higher precision is worth the extra effort
              </p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {example.upgradeDecision.upgradeFor.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink-700">
                    <span className="mt-0.5 shrink-0 font-bold text-brand">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      {/* Scenarios — already structured cards, kept as-is */}
      {example.scenarios && example.scenarios.length > 0 ? (
        <section className="mt-12 border-t border-ink-300 pt-8">
          <h2 className="text-2xl font-bold text-ink-900">
            {example.scenarios.length} worked use cases at this house size
          </h2>
          <p className="mt-2 max-w-prose text-ink-700">
            Real heat pump equipment decisions showing how the size, balance point, and aux heat
            requirement shift across climate zones, equipment classes, and architectures.
          </p>
          <div className="mt-8 space-y-6">
            {example.scenarios.map((s, i) => {
              const sResult = calculateHeatPumpSize(s.inputs);
              const sClimateLabel = CLIMATE_DESCRIPTIONS[s.inputs.climateZone];
              const sInsulationLabel = INSULATION_LABELS[s.inputs.insulationLevel];
              return (
                <article
                  key={i}
                  className="overflow-hidden rounded-xl border border-ink-300 bg-white shadow-sm"
                >
                  <div className="border-b border-ink-200 bg-ink-50 px-6 py-4">
                    <h3 className="text-lg font-semibold text-ink-900">{s.title}</h3>
                    <p className="mt-1 text-sm font-medium text-ink-500">
                      Common in: {s.location}
                    </p>
                  </div>
                  <div className="grid gap-px bg-ink-200 sm:grid-cols-3">
                    <div className="bg-white px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Recommended
                      </p>
                      <p className="mt-1 text-2xl font-bold text-brand">
                        {sResult.recommendedTons} ton{sResult.recommendedTons === 1 ? '' : 's'}
                      </p>
                      <p className="text-xs text-ink-600">
                        {sResult.recommendedSizeBtu.toLocaleString()} BTU
                      </p>
                    </div>
                    <div className="bg-white px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Balance point
                      </p>
                      <p className="mt-1 text-2xl font-bold text-ink-900">
                        {sResult.balancePointF}°F
                      </p>
                    </div>
                    <div className="bg-white px-6 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Aux at design
                      </p>
                      <p className="mt-1 text-2xl font-bold text-ink-900">
                        {sResult.auxHeatAtDesignBtu === 0
                          ? 'None'
                          : `${sResult.auxHeatAtDesignBtu.toLocaleString()}`}
                      </p>
                      {sResult.auxHeatAtDesignBtu > 0 && (
                        <p className="text-xs text-ink-600">BTU</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-white px-6 py-4">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs md:grid-cols-4">
                      <div>
                        <dt className="font-medium uppercase tracking-wide text-ink-500">Climate</dt>
                        <dd className="mt-0.5 text-ink-900">{sClimateLabel}</dd>
                      </div>
                      <div>
                        <dt className="font-medium uppercase tracking-wide text-ink-500">
                          Insulation
                        </dt>
                        <dd className="mt-0.5 text-ink-900">{sInsulationLabel}</dd>
                      </div>
                      <div>
                        <dt className="font-medium uppercase tracking-wide text-ink-500">
                          Equipment
                        </dt>
                        <dd className="mt-0.5 text-ink-900">
                          {s.inputs.coldClimateEquipment ? 'CCASHP' : 'Standard'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium uppercase tracking-wide text-ink-500">
                          Occupants
                        </dt>
                        <dd className="mt-0.5 text-ink-900">{s.inputs.occupants}</dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-sm text-ink-700">{s.takeaway}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* Methodology — short prose */}
      <section className="prose prose-slate mt-12 max-w-prose">
        <h2>Methodology</h2>
        <p>
          This calculation follows the dual-load methodology from the{' '}
          <Link className="text-brand underline" href="/heat-pump/sizing/">
            heat pump sizing article
          </Link>
          , using climate-zone heating factors calibrated against ASHRAE Standard 169-2020 design
          temperatures and ACCA Manual J reference cases.
        </p>
      </section>

      {example.faq && example.faq.length > 0 ? <FAQ items={example.faq} /> : null}

      {/* Related examples */}
      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Other heat pump sizing pages</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => {
            const rResult = calculateHeatPumpSize(r.inputs);
            return (
              <li
                key={r.slug}
                className="rounded-xl border border-ink-300 bg-white p-4 shadow-sm hover:border-brand hover:shadow-md"
              >
                <Link
                  href={`/tools/heat-pump-size-calculator/examples/${r.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {rResult.recommendedTons} tons · balance point {rResult.balancePointF}°F
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
