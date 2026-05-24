import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import {
  calculateHeatPumpSize,
  type HeatPumpInputs,
} from '@/lib/calculators/heat-pump-size';
import { HeatPumpSizeCalculatorClient } from './HeatPumpSizeCalculatorClient';
import { heatPumpExamples } from './examples-manifest';

export const metadata: Metadata = {
  title: 'Heat Pump Size Calculator: Tonnage by Climate and Square Footage',
  description:
    'Heat pump sizing calculator with dual-load (cooling + heating) math, balance point estimate, and aux heat sizing. Standard vs cold-climate (CCASHP) equipment.',
};

const DEFAULTS: HeatPumpInputs = {
  squareFootage: 2000,
  climateZone: '5',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 4,
  isKitchen: false,
  spaceType: 'living-room',
  coldClimateEquipment: false,
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'Heat Pump Size Calculator' },
];

const RELATED = [
  {
    title: 'Heat pump sizing',
    url: '/heat-pump/sizing/',
    description: 'The cornerstone article on heat pump sizing methodology this calculator implements.',
  },
  {
    title: 'Heat pump balance point',
    url: '/heat-pump/cold-climate/balance-point/',
    description: 'What the balance point is and how it affects aux heat runtime over the season.',
  },
  {
    title: 'Manual J load calculation',
    url: '/manual-j/',
    description: 'For permit-grade equipment specification, you need a full Manual J calculation.',
  },
];

export default function Page() {
  const defaultResult = calculateHeatPumpSize(DEFAULTS);

  return (
    <Container>
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">Heat Pump Size Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the right heat pump size for your home. Accounts for both cooling and heating
          loads, estimates the balance point, and flags when cold-climate (CCASHP) equipment is the
          right pick.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        Heat pump sizing handles two different loads (cooling and heating). This calculator gives a
        planning estimate based on climate zone defaults; for permit-grade equipment specification,
        get a Manual J from your installer or hire one independently. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for accuracy bands.
      </Callout>

      <section className="mt-8">
        <HeatPumpSizeCalculatorClient defaults={DEFAULTS} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>Worked example: 2,000 sq ft home, zone 5</h2>
        <p>
          The default state shows the calculator&apos;s answer for a typical 2,000 square foot home in
          IECC climate zone 5 (most of the northern US), with 8-foot ceilings, average insulation,
          mixed sun, four occupants, and a standard (not cold-climate certified) heat pump.
        </p>
        <p>The math:</p>
        <ul>
          <li>
            <strong>Cooling load</strong>: {defaultResult.coolingLoadBtu.toLocaleString()} BTU/hr at the
            zone 5 cooling design temperature ({defaultResult.coolingDesignTempF}°F)
          </li>
          <li>
            <strong>Heating load</strong>: {defaultResult.heatingLoadBtu.toLocaleString()} BTU/hr at the
            zone 5 heating design temperature ({defaultResult.heatingDesignTempF}°F). Heating dominates
            in this climate, with a load ratio of{' '}
            {(defaultResult.heatingLoadBtu / defaultResult.coolingLoadBtu).toFixed(2)}× cooling load
          </li>
          <li>
            <strong>Equipment size</strong>: rounded to the next standard tonnage that handles the
            larger of the two loads → <strong>{defaultResult.recommendedSizeBtu.toLocaleString()} BTU/hr</strong>{' '}
            ({defaultResult.recommendedTons} tons)
          </li>
          <li>
            <strong>Balance point</strong>: outdoor temperature where heat pump capacity equals home
            heating load → <strong>{defaultResult.balancePointF}°F</strong>. Above this, the heat pump
            alone keeps up. Below this, aux heat assists.
          </li>
          <li>
            <strong>Aux heat at design</strong>: capacity needed beyond the heat pump on the coldest
            design day → <strong>{defaultResult.auxHeatAtDesignBtu.toLocaleString()} BTU/hr</strong>
          </li>
        </ul>

        <h2>How heat pump sizing differs from AC sizing</h2>
        <p>
          AC sizing optimizes for one number: the cooling load at the 1% cooling design temperature.
          Heat pump sizing must handle two: cooling load AND heating load at the 99% heating design
          temperature. These are usually different numbers, and the difference grows with climate
          extremity. In zone 5, heating load is typically 1.3× cooling load. In zone 7, it&apos;s closer
          to 1.9×.
        </p>
        <p>
          The calculator picks the larger of the two loads as the equipment size. Then it computes the
          balance point: the outdoor temperature where the heat pump&apos;s heating capacity equals the
          home&apos;s heating load. Above the balance point, the heat pump alone is enough. Below, aux
          heat must fill the gap.
        </p>

        <h2>Standard vs cold-climate (CCASHP) equipment</h2>
        <p>
          Standard heat pumps lose substantial heating capacity at low outdoor temperatures: about 60%
          of rated at 17°F and 33% at 5°F. Cold-climate (NEEP CCASHP listed) heat pumps maintain 85%
          and 70% at those same temperatures. The difference shows up directly in the balance point: a
          cold-climate model shifts the balance point dramatically lower, reducing aux heat runtime.
        </p>
        <p>
          The calculator toggles between standard and cold-climate capacity models. The balance point
          changes when you flip the checkbox. See{' '}
          <a href="/heat-pump/cold-climate/defrost-cycle/" className="text-brand underline">
            heat pump defrost cycles
          </a>{' '}
          for the related defrost-mode behavior in cold weather.
        </p>

        <h2>What the calculator does (and does not) compute</h2>
        <p>
          <strong>Computes</strong>: cooling load, heating load, recommended equipment size, balance
          point, aux heat capacity required at design, equipment class recommendation.
        </p>
        <p>
          <strong>Does not compute</strong>: room-by-room loads, ductwork heat loss in unconditioned
          space, infiltration measured with a blower door, solar gain per orientation, specific
          equipment model selection from AHRI tables, electric service load impact, or installation
          cost. Those require Manual J + Manual S done by a contractor or certified rater.
        </p>

        <h2>When this is enough vs when to get Manual J</h2>
        <p>
          For early planning, comparing contractor quotes, or sanity-checking an installer&apos;s
          recommendation, this calculator&apos;s output is accurate within about 15% for typical homes.
          For permit submission or warranty-grade equipment selection on a new heat pump install
          (typically $8,000-20,000 equipment + install cost), get a full Manual J load calculation.
          See our{' '}
          <a href="/manual-j/" className="text-brand underline">
            Manual J methodology article
          </a>{' '}
          for what that involves.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Pre-computed heat pump sizing for typical home sizes across climate zones, with and without
          cold-climate equipment. Each example shows tonnage, balance point, and aux heat requirements.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {heatPumpExamples.map((ex) => {
            const exResult = calculateHeatPumpSize(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/heat-pump-size-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {exResult.recommendedTons} tons, balance point {exResult.balancePointF}°F
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <RelatedArticles items={RELATED} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
