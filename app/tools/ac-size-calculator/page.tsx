import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { calculateBtu, type BtuInputs } from '@/lib/calculators/btu';
import { BtuCalculatorClient } from '../btu-calculator/BtuCalculatorClient';
import { acSizeExamples } from './examples-manifest';

export const metadata: Metadata = {
  title: 'AC Size Calculator: Pick the Right BTU and Tonnage',
  description:
    'AC size calculator with window, portable, and central equipment recommendations. Adjusts for climate, ceiling, insulation, and space type. Real-world portable BTU caveats included.',
};

const DEFAULTS: BtuInputs = {
  squareFootage: 2000,
  climateZone: '4',
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
  { name: 'AC Size Calculator' },
];

const RELATED = [
  {
    title: 'AC BTU chart by square footage',
    url: '/ac/btu/chart/',
    description: 'The full reference chart and adjustment-factor methodology this calculator implements.',
  },
  {
    title: 'Mini split for garage',
    url: '/ac/btu/garage-mini-split/',
    description: 'For garage-specific sizing, the load is 2-3× higher per sq ft than interior spaces.',
  },
  {
    title: 'AC short cycling',
    url: '/ac/short-cycling/',
    description: 'Why oversizing matters: an oversized AC short cycles, hurting humidity control.',
  },
];

const STANDARD_SIZES_AVAILABLE = [
  { btu: 5000, tons: 0.42, class: 'Window AC' },
  { btu: 6000, tons: 0.5, class: 'Window AC' },
  { btu: 8000, tons: 0.67, class: 'Window or portable' },
  { btu: 10000, tons: 0.83, class: 'Window or portable' },
  { btu: 12000, tons: 1.0, class: 'Window, portable, or mini split' },
  { btu: 14000, tons: 1.17, class: 'Window or mini split' },
  { btu: 18000, tons: 1.5, class: 'Mini split or large window' },
  { btu: 24000, tons: 2.0, class: 'Central or mini split' },
  { btu: 36000, tons: 3.0, class: 'Central AC' },
  { btu: 48000, tons: 4.0, class: 'Central AC' },
  { btu: 60000, tons: 5.0, class: 'Central AC' },
];

export default function Page() {
  const defaultResult = calculateBtu(DEFAULTS);

  return (
    <Container>
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">AC Size Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Calculate the right AC capacity in BTU and tonnage for any room or whole-house cooling.
          Returns the recommended size and equipment class (window, portable, mini split, or central).
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        For window AC, portable AC, or single-zone mini split sizing, this calculator is sufficient.
        For central AC equipment specification on a new install, get a Manual J load calculation. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for the underlying methodology and accuracy bands.
      </Callout>

      <section className="mt-8">
        <BtuCalculatorClient defaults={DEFAULTS} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>Worked example: 2,000 sq ft home, zone 4</h2>
        <p>
          The default state shows the calculator&apos;s answer for a typical 2,000 square foot home
          in IECC climate zone 4 (mid-Atlantic, Ohio Valley), with 8-foot ceilings, average insulation,
          mixed sun, four occupants, treated as a living-room equivalent (the open whole-house
          treatment).
        </p>
        <p>The math:</p>
        <ul>
          <li>Baseline: 2,000 sqft × 22 BTU/sqft = <strong>44,000 BTU</strong></li>
          <li>× Climate factor (zone 4): {defaultResult.breakdown.climateFactor}</li>
          <li>× Ceiling factor (8 ft): {defaultResult.breakdown.ceilingFactor}</li>
          <li>× Sun factor (mixed): {defaultResult.breakdown.sunFactor}</li>
          <li>× Insulation factor (average): {defaultResult.breakdown.insulationFactor}</li>
          <li>× Space-type factor (living room): {defaultResult.breakdown.spaceTypeFactor}</li>
          <li>= Subtotal: {defaultResult.breakdown.multiplicativeSubtotal.toLocaleString()} BTU</li>
          <li>+ Occupancy (2 extra): {defaultResult.breakdown.occupancyAdjustment.toLocaleString()} BTU</li>
          <li>= Final raw: <strong>{defaultResult.breakdown.finalRaw.toLocaleString()} BTU</strong></li>
          <li>
            Standard equipment size:{' '}
            <strong>
              {defaultResult.recommendedBtu.toLocaleString()} BTU (≈ {defaultResult.recommendedTons} tons)
            </strong>
          </li>
        </ul>

        <h2>Available standard equipment sizes</h2>
        <p>
          Air conditioning equipment is sold in standard BTU sizes; the calculator rounds the raw
          result to the nearest one. Use the table to map a target BTU to the equipment class typically
          available at that size.
        </p>
        <div className="not-prose overflow-x-auto">
          <table className="my-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-50">
                <th className="px-3 py-2 text-left font-semibold text-ink-900">BTU</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Tons</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Typical equipment class</th>
              </tr>
            </thead>
            <tbody>
              {STANDARD_SIZES_AVAILABLE.map((row) => (
                <tr key={row.btu} className="border-b border-ink-300">
                  <td className="px-3 py-2 font-medium text-ink-900">{row.btu.toLocaleString()}</td>
                  <td className="px-3 py-2 text-ink-700">{row.tons}</td>
                  <td className="px-3 py-2 text-ink-700">{row.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Portable AC: size up one tier</h2>
        <p>
          Portable AC nameplate BTU ratings often overstate real-world cooling output. Single-hose
          portable units exhaust hot air using conditioned indoor air, which reduces effective cooling
          by 20-30%. Dual-hose portable units avoid this and deliver closer to nameplate.
        </p>
        <p>
          The practical rule: if you&apos;re buying a portable AC, size up one tier from the calculator&apos;s
          recommendation. If the calculator says 10,000 BTU, buy a 12,000 BTU portable. If it says
          12,000 BTU, buy a 14,000 BTU portable.
        </p>

        <h2>Right-sizing matters</h2>
        <p>
          AC oversizing produces short cycling, poor humidity control, and accelerated equipment wear.
          AC undersizing means the unit can&apos;t keep up on hot summer days. The Goldilocks zone is the
          calculator&apos;s recommendation; a 10-20% margin is fine, but 30%+ oversizing starts to hurt.
        </p>
        <p>
          For the full discussion of oversize vs undersize penalties, see the{' '}
          <a className="text-brand underline" href="/ac/short-cycling/">
            AC short cycling article
          </a>
          . For variable-speed (inverter) AC equipment, the modulation range tolerates moderate
          oversizing better than single-stage units.
        </p>

        <h2>When this calculator isn&apos;t enough</h2>
        <p>
          For permit-grade central AC sizing, a Manual J load calculation is the right tool. Manual J
          accounts for orientation, room-by-room loads, ductwork, infiltration measured with a blower
          door, and internal gains from specific equipment, none of which this calculator captures.
          For an expensive central AC install (15-20 year equipment lifespan, $5,000-15,000 cost), the
          difference between a chart-grade estimate and a Manual J calculation is worth the small extra
          effort. See the{' '}
          <a className="text-brand underline" href="/manual-j/">
            Manual J methodology article
          </a>{' '}
          for the underlying calculation.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Pre-computed AC sizing for typical rooms, apartments, and houses. Each example shows the
          recommended tonnage, equipment class, and full BTU calculation.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acSizeExamples.map((ex) => {
            const exResult = calculateBtu(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/ac-size-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {exResult.recommendedTons} ton{exResult.recommendedTons === 1 ? '' : 's'} (
                  {exResult.recommendedBtu.toLocaleString()} BTU)
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
