import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { Callout } from '@/components/article/Callout';
import { AuthorByline } from '@/components/article/AuthorByline';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import {
  calculateManualJ,
  type ManualJInputs,
} from '@/lib/calculators/manual-j';
import { ManualJCalculatorClient } from './ManualJCalculatorClient';
import { manualJExamples } from './examples-manifest';

export const metadata: Metadata = {
  title: 'Manual J Load Calculator: Heating & Cooling Loads by Envelope',
  description:
    'Manual J-style whole-house heating and cooling load calculator. Conductive + infiltration + solar + internal gain math. Verified against ACCA reference cases.',
};

const DEFAULTS: ManualJInputs = {
  squareFootage: 2000,
  climateZone: '5',
  stories: 1,
  ceilingHeight: 8,
  constructionEra: '2010-2019',
};

const BREADCRUMBS = [
  { name: 'Home', url: '/' },
  { name: 'Tools', url: '/tools/' },
  { name: 'Manual J Calculator' },
];

const RELATED = [
  {
    title: 'Manual J load calculation',
    url: '/manual-j/',
    description: 'The cornerstone article on Manual J methodology that this calculator implements.',
  },
  {
    title: 'How we verify Manual J',
    url: '/methodology/how-we-verify-manual-j/',
    description: "Our verification methodology and accuracy bands for this calculator's output.",
  },
  {
    title: 'Heat pump sizing',
    url: '/heat-pump/sizing/',
    description: 'How Manual J output feeds the equipment selection decision for heat pumps.',
  },
];

export default function Page() {
  const defaultResult = calculateManualJ(DEFAULTS);

  return (
    <Container>
      <Breadcrumbs items={BREADCRUMBS} />

      <header className="not-prose mb-6 mt-4">
        <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">Manual J Load Calculator</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-700">
          Compute heating and cooling design loads for your whole house. Implements simplified Manual J
          8th Edition methodology: conductive envelope losses, infiltration, solar gain through windows,
          and internal gains. Returns BTU/hr loads and recommended equipment tonnage.
        </p>
        <div className="mt-4">
          <AuthorByline lastReviewed="2026-05-22" size="sm" />
        </div>
      </header>

      <Callout type="planning-grade" title="Planning-grade tool">
        This is a Manual J-style implementation, not ACCA-approved software. It follows Manual J 8th
        Edition methodology and produces results within ±15% of certified software for typical homes.
        For permit-grade equipment selection on a real install ($10,000-25,000 decision), use ACCA-
        approved software (Wrightsoft, Cool Calc, Elite) or a certified contractor. See{' '}
        <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
          how we verify
        </a>{' '}
        for full accuracy methodology.
      </Callout>

      <section className="mt-8">
        <ManualJCalculatorClient defaults={DEFAULTS} />
      </section>

      <section className="prose prose-slate mt-10 max-w-prose">
        <h2>Worked example: 2,000 sq ft 2010-era home, zone 5</h2>
        <p>
          The default state computes loads for a typical 2,000 square foot single-story home built
          between 2010 and 2019, located in IECC climate zone 5 (most of the northern US).
        </p>
        <p>The math:</p>
        <ul>
          <li>
            <strong>Heating load</strong>: {defaultResult.heatingLoadBtu.toLocaleString()} BTU/hr at the
            zone 5 heating design temperature ({defaultResult.designConditions.heatingDesignTempF}°F).
            Breakdown: walls {defaultResult.breakdown.heating.wallConductive.toLocaleString()},
            ceiling {defaultResult.breakdown.heating.ceilingConductive.toLocaleString()},
            floor {defaultResult.breakdown.heating.floorConductive.toLocaleString()},
            windows {defaultResult.breakdown.heating.windowConductive.toLocaleString()},
            infiltration {defaultResult.breakdown.heating.infiltration.toLocaleString()}
          </li>
          <li>
            <strong>Cooling load (sensible)</strong>: {defaultResult.coolingLoadSensibleBtu.toLocaleString()} BTU/hr at the zone 5 cooling design temperature ({defaultResult.designConditions.coolingDesignTempF}°F)
          </li>
          <li>
            <strong>Cooling load (latent)</strong>: {defaultResult.coolingLoadLatentBtu.toLocaleString()} BTU/hr (humidity removal)
          </li>
          <li>
            <strong>Cooling load (total)</strong>: {defaultResult.coolingLoadTotalBtu.toLocaleString()} BTU/hr
          </li>
          <li>
            <strong>Equipment recommendation</strong>: <strong>{defaultResult.recommendedCoolingTons} tons</strong>{' '}
            ({defaultResult.recommendedHeatingBtu.toLocaleString()} BTU/hr nominal cooling)
          </li>
          <li>
            Heating-to-cooling load ratio: {defaultResult.loadRatio.toFixed(2)}× — {defaultResult.loadRatio > 1 ? 'heating-driven' : 'cooling-driven'}
          </li>
        </ul>

        <h2>What this calculator does</h2>
        <p>
          The calculator applies a simplified Manual J 8th Edition methodology to compute design
          heating and cooling loads:
        </p>
        <ul>
          <li><strong>Conductive losses/gains</strong> through walls, ceiling, floor, and windows. UA × ΔT for each surface, where U = 1/R and ΔT is the temperature difference between indoor and design outdoor</li>
          <li><strong>Infiltration</strong> using the simplified formula Q = 0.018 × Volume × ACH_natural × ΔT. ACH_natural ≈ ACH50 / 20 (ASHRAE convention)</li>
          <li><strong>Solar gain</strong> through windows: SLF × area × SHGC. Single solar load factor averaged across orientations</li>
          <li><strong>Internal gains</strong> (cooling only): 600 BTU/hr per occupant + 2,000 BTU/hr base for lighting and appliances</li>
          <li><strong>Latent cooling</strong>: climate-driven fraction of sensible (zone 1: 40%, zone 5: 20%, zone 8: 15%)</li>
          <li><strong>Equipment size</strong>: larger of cooling-total or heating, rounded to standard residential equipment sizes (12-60 kBTU)</li>
        </ul>

        <h2>Era defaults for envelope characteristics</h2>
        <p>
          The construction-era input drives default values for wall R-value, ceiling R-value, window
          U-factor, SHGC, and air leakage. These approximate typical construction by decade. Override
          any of them in the advanced section if you have specific measurements (insulation
          inspection, blower-door results, window NFRC labels).
        </p>
        <div className="not-prose overflow-x-auto">
          <table className="my-4 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-50">
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Era</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Wall R</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Ceiling R</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">Window U</th>
                <th className="px-3 py-2 text-left font-semibold text-ink-900">ACH50</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">Pre-1980</td><td className="px-3 py-2">R-7</td><td className="px-3 py-2">R-19</td><td className="px-3 py-2">U-1.0</td><td className="px-3 py-2">14</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">1980-1999</td><td className="px-3 py-2">R-11</td><td className="px-3 py-2">R-30</td><td className="px-3 py-2">U-0.7</td><td className="px-3 py-2">10</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">2000-2009</td><td className="px-3 py-2">R-13</td><td className="px-3 py-2">R-38</td><td className="px-3 py-2">U-0.55</td><td className="px-3 py-2">7</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">2010-2019</td><td className="px-3 py-2">R-19</td><td className="px-3 py-2">R-49</td><td className="px-3 py-2">U-0.35</td><td className="px-3 py-2">5</td></tr>
              <tr className="border-b border-ink-300"><td className="px-3 py-2">2020+</td><td className="px-3 py-2">R-21</td><td className="px-3 py-2">R-60</td><td className="px-3 py-2">U-0.28</td><td className="px-3 py-2">3</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What this calculator does NOT do</h2>
        <p>
          Real Manual J 8th Edition handles things this simplified version cannot:
        </p>
        <ul>
          <li><strong>Room-by-room loads</strong>: needed for proper duct design (Manual D). This calculator returns whole-house totals only</li>
          <li><strong>Orientation-specific solar gain</strong>: real Manual J distributes solar load by orientation (N, NE, E, SE, S, SW, W, NW) per window. We collapse to a single average</li>
          <li><strong>Duct losses in unconditioned space</strong>: substantial in older homes with attic ductwork. Not modeled</li>
          <li><strong>Internal gains schedule</strong>: real Manual J uses time-of-day occupancy and equipment schedules. We use steady-state averages</li>
          <li><strong>Latent vs sensible split for infiltration</strong>: significant in humid climates. We use a climate-based fraction</li>
          <li><strong>Equipment-specific deratings</strong>: real Manual S applies altitude, return air temp, and other corrections. We don&apos;t</li>
        </ul>

        <h2>When to use this calculator vs ACCA-approved software</h2>
        <p>
          <strong>Use this</strong>: planning a heat pump or central AC upgrade, comparing contractor
          quotes, learning how envelope decisions affect loads, sanity-checking a builder&apos;s sizing.
        </p>
        <p>
          <strong>Use ACCA-approved software instead</strong>: permit submission, manufacturer warranty
          requirements, court or insurance documentation, room-by-room duct design.
        </p>
        <p>
          See our full{' '}
          <a className="text-brand underline" href="/methodology/how-we-verify-manual-j/">
            verification methodology
          </a>{' '}
          for the accuracy claims this calculator makes and how we test against ACCA reference cases.
        </p>
      </section>

      <section className="not-prose mt-12 border-t border-ink-300 pt-8">
        <h2 className="text-2xl font-bold text-ink-900">Common scenarios</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Pre-computed Manual J load calculations for typical home sizes, climate zones, and
          construction eras. Each example shows the recommended equipment size and load breakdown.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {manualJExamples.map((ex) => {
            const exResult = calculateManualJ(ex.inputs);
            return (
              <li
                key={ex.slug}
                className="rounded-lg border border-ink-300 bg-white p-4 hover:border-brand"
              >
                <Link
                  href={`/tools/manual-j-calculator/examples/${ex.slug}/`}
                  className="block text-base font-semibold text-ink-900 hover:text-brand"
                >
                  {ex.title}
                </Link>
                <p className="mt-1 text-sm text-ink-600">
                  {exResult.recommendedCoolingTons} tons · heat {exResult.heatingLoadBtu.toLocaleString()}{' '}
                  / cool {exResult.coolingLoadTotalBtu.toLocaleString()} BTU
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
