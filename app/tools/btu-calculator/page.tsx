import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { calculateBtu, type BtuInputs } from '@/lib/calculators/btu';
import { BtuCalculatorClient } from './BtuCalculatorClient';

export const metadata: Metadata = {
  title: 'BTU Calculator: Size an AC by Square Footage and Climate',
  description:
    'Free BTU calculator with climate, ceiling, insulation, sun, occupancy, and kitchen adjustments. Returns the recommended AC BTU and tonnage for any room or home.',
};

const DEFAULTS: BtuInputs = {
  squareFootage: 1500,
  climateZone: '5',
  ceilingHeight: '8',
  insulationLevel: 'average',
  sunExposure: 'mixed',
  occupants: 4,
  isKitchen: false,
  spaceType: 'living-room',
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'BTU Calculator' },
];

const RELATED = [
  {
    title: 'AC BTU chart by square footage',
    url: '/ac/btu/chart/',
    description: 'The reference chart and adjustment factor methodology this calculator implements.',
  },
  {
    title: 'Heat pump sizing',
    url: '/heat-pump/sizing/',
    description: 'Heat pumps need cooling AND heating load math; this calculator covers cooling.',
  },
  {
    title: 'Manual J load calculation',
    url: '/manual-j/',
    description: 'For permit-grade central AC sizing, you need a full Manual J calculation.',
  },
];

export default function Page() {
  const defaultResult = calculateBtu(DEFAULTS);

  return (
    <Container>
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">BTU Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the AC BTU you need for any room or home. Adjusts for climate zone, ceiling height,
          insulation, sun exposure, occupancy, and space type.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        This calculator follows AC BTU sizing methodology from the
        ENERGY STAR room AC guide and Manual J 8th Edition. Results are accurate within ±5% for window,
        portable, and single-zone mini split sizing. For permit-grade central AC installation, get a
        Manual J from your contractor or hire one independently. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for our accuracy methodology.
      </Callout>

      <section className="mt-8">
        <BtuCalculatorClient defaults={DEFAULTS} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>Worked example: 1,500 sq ft home, zone 5</h2>
        <p>
          The default state above shows the calculator&apos;s answer for a typical 1,500 square foot
          home in IECC climate zone 5 (most of the northern US), with 8-foot ceilings, average
          insulation, mixed sun exposure, four occupants, and the cooled space being a living room.
        </p>
        <p>
          The math:
        </p>
        <ul>
          <li>Baseline: 1,500 sqft × 22 BTU/sqft = <strong>33,000 BTU</strong></li>
          <li>× Climate factor (zone 5): {defaultResult.breakdown.climateFactor}</li>
          <li>× Ceiling factor (8 ft): {defaultResult.breakdown.ceilingFactor}</li>
          <li>× Sun factor (mixed): {defaultResult.breakdown.sunFactor}</li>
          <li>× Insulation factor (average): {defaultResult.breakdown.insulationFactor}</li>
          <li>× Space-type factor (living room): {defaultResult.breakdown.spaceTypeFactor}</li>
          <li>= Subtotal: {defaultResult.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</li>
          <li>+ Occupancy (2 extra): {defaultResult.breakdown.occupancyAdjustment.toLocaleString()} BTU</li>
          <li>
            = Final raw: <strong>{defaultResult.breakdown.finalRaw.toLocaleString()} BTU</strong>
          </li>
          <li>
            Rounded to standard equipment size:{' '}
            <strong>
              {defaultResult.recommendedBtu.toLocaleString()} BTU (≈ {defaultResult.recommendedTons} tons)
            </strong>
          </li>
        </ul>

        <h2>How to use this calculator</h2>
        <ol>
          <li>Measure the square footage of the space you want to cool</li>
          <li>Pick the IECC climate zone for your location (zone 1 is tropical, zone 8 is interior Alaska)</li>
          <li>Set ceiling height; 8 ft is the baseline. Higher ceilings need more BTU</li>
          <li>Pick insulation quality vs current code (most homes are average)</li>
          <li>Pick sun exposure and space type (kitchen, sun room, basement all matter)</li>
          <li>Enter the number of regular occupants and whether the space is a kitchen</li>
          <li>Read the recommended BTU and equipment class on the right</li>
        </ol>

        <h2>What the calculator does</h2>
        <p>
          The calculator multiplies a baseline of 22 BTU per square foot by the relevant adjustment
          factors (climate, ceiling, sun, insulation, space type), then adds fixed amounts for extra
          occupants and kitchen heat gain. The raw result is rounded to the nearest standard equipment
          size: 5,000, 6,000, 8,000, 10,000, 12,000, 14,000, 18,000, 24,000, 30,000, 36,000, 42,000,
          48,000, or 60,000 BTU.
        </p>
        <p>
          The methodology is documented in our{' '}
          <a className="text-brand underline" href="/ac/btu/chart/">
            AC BTU chart article
          </a>{' '}
          and verified against ACCA reference cases per{' '}
          <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
            our verification methodology
          </a>
          .
        </p>

        <h2>When to use this calculator vs Manual J</h2>
        <p>
          For window AC, portable AC, or single-zone mini split sizing, this calculator is sufficient.
          For central AC equipment specification, this calculator is a planning estimate; the final
          equipment selection should come from a full Manual J load calculation that accounts for
          orientation, room-by-room loads, ductwork, and infiltration measured with a blower door.
        </p>
      </section>

      <RelatedArticles items={RELATED} />

      <div className="mt-12 border-t border-ink-300 pt-8">
        <AuthorByline lastReviewed="2026-05-22" />
      </div>
    </Container>
  );
}
