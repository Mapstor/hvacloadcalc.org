import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { JsonLdWebsite } from '@/components/seo/JsonLdWebsite';
import { JsonLdOrganization } from '@/components/seo/JsonLdOrganization';
import { KeyTakeaways } from '@/components/article/KeyTakeaways';
import { Callout } from '@/components/article/Callout';
import { DataTable } from '@/components/data/DataTable';
import { BtuPerSqftByZone } from '@/components/svg/homepage/BtuPerSqftByZone';
import { ALL_HUBS } from '@/lib/seo/site';
import { INVENTORY } from '@/lib/seo/inventory';
import { ClimateZonesQuickReference } from '@/components/svg/shared/ClimateZonesQuickReference';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  title:
    'hvacloadcalc.org — HVAC Sizing & Manual J Methodology Reference',
  description:
    'HVAC sizing reference — Manual J calculator, heat pump, AC, furnace, building science. Every formula sourced to ACCA, ASHRAE, AHRI, NEEP, DOE primary publications.',
  openGraph: {
    title: 'hvacloadcalc.org — Sourced HVAC Sizing and Methodology',
    description:
      'Free educational HVAC reference. Every formula sourced to a primary publication.',
    type: 'website',
    images: ['/opengraph-image'],
  },
};

const HUB_DESCRIPTIONS: Record<string, string> = {
  '/heat-pump/':
    'Refrigerant-cycle operation, AHRI 210/240 rating points, NEEP CCASHP cold-temperature data, system types, 2026 federal incentives.',
  '/ac/':
    'AHRI 210/240 cooling ratings, SEER2 minimums, sensible vs latent cooling, BTU per square foot by climate, R-410A phaseout.',
  '/furnace/':
    'AFUE methodology, 80 vs 95 AFUE comparison, fuel-cost comparison across natural gas, propane, oil, electric, heat pump.',
  '/manual-j/':
    'ACCA Manual J 8th Edition methodology: Heat Transfer Multipliers, infiltration, internal gains, verification against reference cases.',
  '/manual-s/':
    'AHRI matchup, sensible vs latent capacity, SHR matching, Manual S tolerances, cold-climate heat pump selection (NEEP CCASHP v4.0).',
  '/manual-d/':
    'Friction rate, equivalent length for fittings, static pressure budget, trunk and branch sizing, flex vs metal trade-offs.',
  '/manual-t/':
    'Throw and spread, face velocity targets, register selection, return air placement, the closed-door problem.',
  '/building-science/':
    'R-values, U-factors, ACH50 infiltration, IECC climate zones, psychrometric basics, HERS/RESNET energy audits.',
  '/tools/':
    `${INVENTORY.calculators} live calculators (BTU, AC, heat pump, attic R-value, Manual J) plus ${INVENTORY.workedExamples} worked-example URLs. Planning-grade vs permit-grade explained.`,
  '/glossary/':
    `${INVENTORY.glossaryTermsApprox}+ HVAC and building science terms with sourced definitions, formulas, and source citations.`,
};

const CALCULATORS = [
  {
    name: 'BTU calculator',
    href: '/tools/btu-calculator/',
    source: 'ACCA Manual J abbreviated method',
    examples: 16,
  },
  {
    name: 'AC size calculator',
    href: '/tools/ac-size-calculator/',
    source: 'ACCA Manual J + Manual S tolerances',
    examples: 15,
  },
  {
    name: 'Heat pump size calculator',
    href: '/tools/heat-pump-size-calculator/',
    source: 'ACCA Manual J/S + NEEP CCASHP v4.0 + AHRI 210/240-2023',
    examples: 6,
  },
  {
    name: 'Attic R-value calculator',
    href: '/tools/attic-r-value-calculator/',
    source: 'ASHRAE Fundamentals + DOE recommended R-values',
    examples: 12,
  },
  {
    name: 'Manual J load calculator',
    href: '/tools/manual-j-calculator/',
    source: 'ACCA Manual J 8th Edition direct implementation',
    examples: 12,
  },
] as const;

const COMMON_QUESTIONS: Array<{
  topic: string;
  q: string;
  href: string;
  blurb: string;
}> = [
  {
    topic: 'Heat pump',
    q: 'What size heat pump do I actually need?',
    href: '/heat-pump/sizing/',
    blurb:
      'Manual J at your local design temperature, then matched against AHRI 47°F and 17°F capacity data — not rule-of-thumb square footage.',
  },
  {
    topic: 'Heat pump',
    q: 'Why does my aux heat keep running?',
    href: '/heat-pump/aux-heat/',
    blurb:
      'Four scenarios where aux is normal, and four where frequent aux signals a real problem — undersized equipment, balance-point misset, or aggressive setback.',
  },
  {
    topic: 'Heat pump',
    q: 'Is AUX the same as EM (Emergency) heat?',
    href: '/heat-pump/aux-heat/meaning/',
    blurb:
      'No. AUX runs the strip alongside the compressor. EM disables the compressor and runs strip only — a manual override for compressor failure.',
  },
  {
    topic: 'Heat pump',
    q: 'Do heat pumps work in cold climates?',
    href: '/heat-pump/cold-climate/defrost-cycle/',
    blurb:
      'NEEP CCASHP units must retain ≥70% capacity at 17°F and ≥58% at 5°F. Defrost cycle reverses the cycle 4-15 minutes per hour at low ambient.',
  },
  {
    topic: 'Heat pump',
    q: 'What does HSPF2 actually measure?',
    href: '/heat-pump/performance/seasonal-performance-factor/',
    blurb:
      'Seasonal heating-mode efficiency under the AHRI 210/240-2023 test procedure. SPF is the field-measured equivalent; the two diverge in cold climates.',
  },
  {
    topic: 'Air conditioner',
    q: 'Why does my AC turn on and off constantly?',
    href: '/ac/short-cycling/',
    blurb:
      'Oversized equipment — the most common diagnosis. Also: refrigerant charge, control board, low airflow. Short cycling kills efficiency and humidity removal.',
  },
  {
    topic: 'Air conditioner',
    q: 'What BTU air conditioner do I need?',
    href: '/ac/btu/chart/',
    blurb:
      'BTU per square foot by climate, ceiling height, sun exposure, and envelope tightness — with worked examples for common configurations.',
  },
  {
    topic: 'Air conditioner',
    q: 'How big a mini-split for my garage?',
    href: '/ac/btu/garage-mini-split/',
    blurb:
      'Uninsulated garages need 2-3× the BTU/sqft of conditioned rooms. R-value of garage door, attached vs detached, and intended use all matter.',
  },
  {
    topic: 'Building science',
    q: 'How much attic R-value should I have?',
    href: '/building-science/insulation/attic-r-value/',
    blurb:
      'DOE recommends R-30 to R-60 depending on climate zone. R-49 hits the sweet spot for most US homes — see the climate-zone-by-zone table.',
  },
  {
    topic: 'Building science',
    q: 'What’s a good window U-factor?',
    href: '/building-science/windows/u-factor/',
    blurb:
      'ENERGY STAR Most Efficient: U ≤ 0.27 (north), U ≤ 0.30 (mid), U ≤ 0.40 (south). NFRC label is the only verified number — manufacturer marketing is not.',
  },
  {
    topic: 'Building science',
    q: 'What is wet bulb temperature?',
    href: '/building-science/psychrometrics/wet-bulb/',
    blurb:
      'The temperature an air parcel reaches if cooled to saturation. It determines AC latent capacity demand — a hot-humid 95°F/79°F WB day is harder to cool than 95°F/65°F WB.',
  },
  {
    topic: 'Building science',
    q: 'What’s a HERS Index score?',
    href: '/building-science/hers-index/',
    blurb:
      'Whole-home efficiency rating on a 0-150+ scale benchmarked against a 2006 IECC reference home. 100 = reference; 0 = net zero; ENERGY STAR homes typically 55-65.',
  },
  {
    topic: 'Manual J / D',
    q: 'Are my return air ducts big enough?',
    href: '/manual-d/return-air-sizing/',
    blurb:
      'Total return path should match supply CFM within 10% with face velocity below 700 fpm at the grille. Undersized returns add 0.10-0.20 in. wc static.',
  },
  {
    topic: 'Manual J / D',
    q: 'How is Manual J actually calculated?',
    href: '/manual-j/',
    blurb:
      'Heat-Transfer-Multiplier method walked through end-to-end: envelope conduction, infiltration, internal gains, duct gains, and how the numbers add to a design load.',
  },
  {
    topic: 'Methodology',
    q: 'How do I know the calculator output is accurate?',
    href: '/methodology/how-we-verify-manual-j/',
    blurb:
      'The Manual J 8th Edition methodology this calculator implements, the three-layer verification framework it is designed against, and the open audit channel for checking the work.',
  },
];

const QUICK_REFERENCE = [
  {
    title: '2026 federal minimum efficiency (split-system, residential)',
    rows: [
      { label: 'Heat pump SEER2', value: '14.3 (north) / 15.2 (south)' },
      { label: 'Heat pump HSPF2', value: '7.5 (national)' },
      { label: 'Central AC SEER2', value: '13.4 (north) / 14.3 (south)' },
      { label: 'Gas furnace AFUE', value: '95% (2028 phase-in)' },
    ],
    source: 'DOE 10 CFR Part 430 final rule (2023)',
    href: '/heat-pump/',
  },
  {
    title: 'DOE recommended attic insulation R-value',
    rows: [
      { label: 'Zone 1-3 (south)', value: 'R-30 to R-49' },
      { label: 'Zone 4 (mixed)', value: 'R-38 to R-60' },
      { label: 'Zone 5-7 (cold)', value: 'R-49 to R-60' },
      { label: 'Zone 8 (very cold)', value: 'R-60' },
    ],
    source: 'US Department of Energy / ENERGY STAR',
    href: '/building-science/insulation/attic-r-value/',
  },
  {
    title: 'Federal incentive stack — status update',
    rows: [
      { label: 'IRA §25C tax credit (HVAC scope)', value: 'Expired Dec 31, 2025' },
      { label: 'HEEHRA point-of-sale rebate', value: 'State-administered (verify status)' },
      { label: 'State / utility rebates', value: 'Vary by program' },
      { label: 'Current 2026 status', value: 'Verify IRS guidance directly' },
    ],
    source: 'IRS Fact Sheet FS-2025-05 (supersedes FS-2022-40)',
    href: '/heat-pump/',
  },
];

const PRIMARY_SOURCES = [
  {
    abbr: 'ACCA',
    name: 'Air Conditioning Contractors of America',
    scope: 'Manual J, S, D, T — residential HVAC design methodology',
  },
  {
    abbr: 'ASHRAE',
    name: 'American Society of Heating, Refrigerating and Air-Conditioning Engineers',
    scope: 'Fundamentals handbook, psychrometrics, climatic design data, Standard 169',
  },
  {
    abbr: 'AHRI',
    name: 'Air-Conditioning, Heating, and Refrigeration Institute',
    scope: '210/240 equipment performance ratings, certified product directory',
  },
  {
    abbr: 'NEEP',
    name: 'Northeast Energy Efficiency Partnerships',
    scope: 'Cold Climate Air Source Heat Pump specification (CCASHP v4.0)',
  },
  {
    abbr: 'DOE',
    name: 'US Department of Energy',
    scope: '10 CFR 430 minimum efficiency, Building America research, ENERGY STAR program',
  },
  {
    abbr: 'EPA',
    name: 'US Environmental Protection Agency',
    scope: 'AIM Act HFC phasedown, ENERGY STAR Most Efficient',
  },
  {
    abbr: 'IRS',
    name: 'US Internal Revenue Service',
    scope: 'Section 25C Energy Efficient Home Improvement Credit; current guidance: Fact Sheet FS-2025-05 (supersedes FS-2022-40 after One Big Beautiful Bill Act)',
  },
  {
    abbr: 'NFRC',
    name: 'National Fenestration Rating Council',
    scope: 'Window U-factor, SHGC, VT, AL, CR ratings on every certified label',
  },
  {
    abbr: 'RESNET',
    name: 'Residential Energy Services Network',
    scope: 'HERS Index methodology, ANSI/RESNET/ICC 301',
  },
  {
    abbr: 'EIA',
    name: 'US Energy Information Administration',
    scope: 'Residential electricity and natural-gas prices by region (Table 5.6.A)',
  },
  {
    abbr: 'IECC',
    name: 'International Energy Conservation Code',
    scope: '8 climate zones, envelope code, HVAC code requirements',
  },
  {
    abbr: 'ASTM',
    name: 'ASTM International',
    scope: 'Blower-door (E779), duct leakage (E1554), other testing standards',
  },
];

const START_PATHS = [
  {
    intent: 'Have a contractor quote and want to verify the equipment size',
    body: (
      <>
        Start at the{' '}
        <Link
          href="/tools/manual-j-calculator/"
          className="text-brand hover:underline"
        >
          Manual J load calculator
        </Link>{' '}
        to compute a planning-grade load, then compare against the quoted equipment
        AHRI capacity at design conditions. The{' '}
        <Link
          href="/methodology/how-we-verify-manual-j/"
          className="text-brand hover:underline"
        >
          verification methodology
        </Link>{' '}
        explains how the calculator validates against ACCA reference cases.
      </>
    ),
  },
  {
    intent: 'Considering a heat pump and want to understand whether it makes sense',
    body: (
      <>
        Start at the{' '}
        <Link href="/heat-pump/" className="text-brand hover:underline">
          heat pump reference hub
        </Link>{' '}
        for operating principles, federal incentives, capacity behavior at cold
        temperatures, and the cost comparison against gas furnaces. Then run the{' '}
        <Link
          href="/tools/heat-pump-size-calculator/"
          className="text-brand hover:underline"
        >
          heat pump size calculator
        </Link>
        .
      </>
    ),
  },
  {
    intent: 'Aux heat keeps running on the thermostat and you want to know why',
    body: (
      <>
        The{' '}
        <Link href="/heat-pump/aux-heat/" className="text-brand hover:underline">
          auxiliary heat
        </Link>{' '}
        article walks through the four scenarios when aux is normal and the four
        scenarios when frequent aux signals a real problem. See also{' '}
        <Link
          href="/heat-pump/aux-heat/meaning/"
          className="text-brand hover:underline"
        >
          AUX vs Emergency heat
        </Link>
        .
      </>
    ),
  },
  {
    intent: 'Wondering what BTU air conditioner you need',
    body: (
      <>
        The{' '}
        <Link href="/ac/btu/chart/" className="text-brand hover:underline">
          AC BTU chart
        </Link>{' '}
        shows BTU per square foot by climate, ceiling height, insulation, and space
        type. The{' '}
        <Link href="/tools/btu-calculator/" className="text-brand hover:underline">
          BTU calculator
        </Link>{' '}
        computes a specific number for your home.
      </>
    ),
  },
  {
    intent: 'AC turns on and off every 5 minutes',
    body: (
      <>
        The{' '}
        <Link href="/ac/short-cycling/" className="text-brand hover:underline">
          short-cycling diagnosis
        </Link>{' '}
        article walks through the most common cause (oversized equipment) and the
        four other diagnoses worth checking before calling a contractor.
      </>
    ),
  },
  {
    intent: 'Researching insulation or windows',
    body: (
      <>
        The{' '}
        <Link href="/building-science/" className="text-brand hover:underline">
          building science hub
        </Link>{' '}
        covers R-values, U-factors, and infiltration. The{' '}
        <Link
          href="/building-science/insulation/"
          className="text-brand hover:underline"
        >
          insulation sub-hub
        </Link>
        ,{' '}
        <Link
          href="/building-science/insulation/attic-r-value/"
          className="text-brand hover:underline"
        >
          attic R-value reference
        </Link>
        , and{' '}
        <Link
          href="/building-science/windows/u-factor/"
          className="text-brand hover:underline"
        >
          window U-factor reference
        </Link>{' '}
        go deeper.
      </>
    ),
  },
  {
    intent: 'Planning a duct system or troubleshooting return airflow',
    body: (
      <>
        The{' '}
        <Link href="/manual-d/" className="text-brand hover:underline">
          Manual D hub
        </Link>{' '}
        covers friction rate, equivalent length, and static-pressure budget. The{' '}
        <Link
          href="/manual-d/return-air-sizing/"
          className="text-brand hover:underline"
        >
          return air sizing
        </Link>{' '}
        article addresses the closed-door problem in 1990s residential layouts.
      </>
    ),
  },
  {
    intent: 'Looking up a specific HVAC term or formula',
    body: (
      <>
        The{' '}
        <Link href="/glossary/" className="text-brand hover:underline">
          HVAC glossary
        </Link>{' '}
        defines 60+ terms with formulas, source citations, and links to deeper
        coverage in the relevant hub.
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLdWebsite />
      <JsonLdOrganization />
      <Container>
        <div className="py-12 md:py-16">
          <header className="not-prose">
            <h1 className="max-w-prose text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl md:text-5xl">
              HVAC sizing, load calculation, and methodology reference
            </h1>
            <p className="mt-6 max-w-prose text-lg text-ink-700">
              Free educational reference covering Manual J load calculation, heat pump
              sizing, AC sizing, furnace sizing, and building science fundamentals.
              Every calculation shows its math. Every claim cites a primary source.
            </p>

            {/* Author byline strip — E-E-A-T immediate signal */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-500">
              <span>
                Written by{' '}
                <Link
                  href="/authors/jonathan-s/"
                  className="font-medium text-brand hover:underline"
                >
                  Jonathan Stowe
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <Link href="/editorial-standards/" className="hover:text-brand">
                Editorial standards
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/methodology/" className="hover:text-brand">
                Methodology
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/sources/" className="hover:text-brand">
                Full bibliography
              </Link>
            </div>
          </header>

          <KeyTakeaways
            items={[
              `${INVENTORY.calculators} live calculators implementing ACCA Manual J 8th Edition methodology: BTU, AC size, heat pump size (with NEEP CCASHP toggle), attic R-value, and full Manual J load.`,
              `${INVENTORY.inDepthArticles} in-depth articles covering heat pump aux heat, defrost cycle, SPF, sizing, AC short-cycling, Manual J, wet bulb temperature, attic R-value, window U-factor, HERS Index, return air sizing, mini-split sizing, Manual J verification, aux heat meaning, and AC BTU chart.`,
              `${INVENTORY.hubs} reference hubs across heat pump, AC, furnace, Manual J/S/D/T methodology, building science, calculators, and HVAC glossary — every figure on every hub sourced.`,
              'Methodology built on ACCA, ASHRAE, AHRI, NEEP, DOE, EPA, IRS, NFRC, RESNET primary publications; the site is intentionally not ACCA-approved because approval applies to permit-grade software with annual certification fees.',
              'No account creation, no sign-up, no email gate — calculators and articles are free to use directly.',
            ]}
          />


      <section className="mt-12">
        <h2 className="text-2xl font-bold text-ink-900">Find your climate zone first</h2>
        <p className="mt-2 max-w-prose text-ink-700">
          Climate zone is the single most important input in any HVAC sizing decision —
          it drives both heating and cooling design temperatures and the
          equipment-class recommendation. The reference card below covers all eight
          US climate zones with sample cities and design temperatures.
        </p>
        <ClimateZonesQuickReference />
      </section>

          {/* Featured visualization — proves the depth */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              An example of the data behind every claim
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Most HVAC sites publish "550 sq ft per ton" rule-of-thumb numbers without
              explaining where they come from or how much they vary. The site treats
              every range as a sourced data table. The chart below shows residential
              cooling BTU per square foot by IECC climate zone, traced to ACCA Manual J
              8th and ASHRAE Fundamentals 2021.
            </p>
            <BtuPerSqftByZone />
            <p className="mt-2 text-sm text-ink-700">
              Walk through this chart in detail at the{' '}
              <Link href="/ac/btu/chart/" className="text-brand hover:underline">
                AC BTU chart article
              </Link>
              , or compute a specific number for your home with the{' '}
              <Link href="/tools/btu-calculator/" className="text-brand hover:underline">
                BTU calculator
              </Link>
              .
            </p>
          </section>

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">Why this site exists</h2>
            <p className="mt-4 text-ink-700">
              The HVAC reference space online is structurally broken. Generic calculator
              sites like{' '}
              <span className="text-ink-900 font-medium">Calculator.net</span> and{' '}
              <span className="text-ink-900 font-medium">Omnicalculator</span> publish
              rule-of-thumb math marketed as Manual J. Contractor-software sites like{' '}
              <span className="text-ink-900 font-medium">Cool Calc</span> and{' '}
              <span className="text-ink-900 font-medium">AutoHVAC</span> are paywalled
              and homeowner-hostile. Manufacturer sites like Trane and Carrier carry
              built-in bias toward their own equipment.
            </p>
            <p className="mt-4 text-ink-700">
              hvacloadcalc.org fills the gap with a dedicated, methodology-transparent,
              homeowner-first reference. Every number is sourced. Every formula is
              published. Every conclusion is defensible against a primary-source check.
              The full editorial process is documented in the{' '}
              <Link
                href="/editorial-standards/"
                className="text-brand hover:underline"
              >
                editorial standards
              </Link>{' '}
              and the underlying calculator math at{' '}
              <Link href="/methodology/" className="text-brand hover:underline">
                /methodology/
              </Link>
              .
            </p>
            <p className="mt-4 text-ink-700">
              The audience is homeowners verifying a contractor quote, students learning
              the methodology, energy raters cross-checking their software, and anyone
              googling specific HVAC questions and tired of contradictory answers. The
              tone is technical but accessible — readers should level up, not be talked
              down to.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              Reference hubs by topic
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Each hub is a deep reference for one major topic, with primary-source data
              tables, FAQ entries, and sourced definitions. Hubs link to the related
              in-depth articles and to relevant calculators.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_HUBS.map((hub) => (
                <li key={hub.href}>
                  <Link
                    href={hub.href}
                    className="group block h-full rounded-lg border-2 border-ink-300 bg-white p-5 transition hover:border-brand hover:shadow-md"
                  >
                    <h3 className="font-bold text-ink-900 group-hover:text-brand">
                      {hub.label}
                    </h3>
                    <p className="mt-2 text-sm text-ink-700">
                      {HUB_DESCRIPTIONS[hub.href] ?? ''}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-brand">Open hub →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* NEW — Common HVAC questions with deep links to all 15 sub-articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              Common HVAC questions, answered with sources
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              15 specific questions, each answered in a deep article that cites the
              underlying ACCA, ASHRAE, AHRI, NEEP, or DOE source. Click a card to read
              the full article.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {COMMON_QUESTIONS.map((qa) => (
                <li key={qa.href}>
                  <Link
                    href={qa.href}
                    className="group flex h-full flex-col rounded-lg border border-ink-300 bg-white p-5 transition hover:border-brand hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                      {qa.topic}
                    </p>
                    <h3 className="mt-2 font-semibold text-ink-900 group-hover:text-brand">
                      {qa.q}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink-700">{qa.blurb}</p>
                    <p className="mt-3 text-sm font-semibold text-brand">Read →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              The five live calculators
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Each calculator implements ACCA Manual J methodology with documented
              formulas, sourced default values, and a worked-example default state
              showing how the math works before any input is changed. The output range
              communicates genuine uncertainty rather than a falsely precise single
              number.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CALCULATORS.map((calc) => (
                <li key={calc.href}>
                  <Link
                    href={calc.href}
                    className="group flex h-full flex-col rounded-lg border-2 border-ink-300 bg-white p-5 transition hover:border-brand hover:shadow-md"
                  >
                    <h3 className="font-bold text-ink-900 group-hover:text-brand">
                      {calc.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink-700">{calc.source}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-ink-500">
                        {calc.examples} worked examples
                      </span>
                      <span className="font-semibold text-brand">Open →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-700">
              See{' '}
              <Link href="/tools/" className="text-brand hover:underline">
                the tools hub
              </Link>{' '}
              for the full methodology and accuracy bands of each calculator versus
              permit-grade Manual J software.
            </p>
          </section>

          {/* NEW — Quick reference data */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              Quick HVAC reference data
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Three high-traffic reference snapshots, each sourced inline. Each card
              links to the full discussion in the relevant article.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {QUICK_REFERENCE.map((qr) => (
                <Link
                  key={qr.title}
                  href={qr.href}
                  className="group block rounded-lg border border-ink-300 bg-white p-5 transition hover:border-brand hover:shadow-md"
                >
                  <h3 className="text-sm font-bold text-ink-900 group-hover:text-brand">
                    {qr.title}
                  </h3>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {qr.rows.map((r) => (
                      <div key={r.label} className="flex justify-between gap-3">
                        <dt className="text-ink-700">{r.label}</dt>
                        <dd className="font-semibold text-ink-900 text-right">
                          {r.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-xs text-ink-500">{qr.source}</p>
                  <p className="mt-2 text-sm font-semibold text-brand">Read full →</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              How this site differs from competitors
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              The HVAC online reference space splits into three categories with very
              different incentives, and this site occupies a fourth.
            </p>
            <DataTable
              caption="The HVAC online reference landscape and where this site fits (2026 snapshot)"
              columns={[
                { key: 'site', label: 'Site type' },
                { key: 'methodology', label: 'Methodology depth' },
                { key: 'sources', label: 'Source citations' },
                { key: 'audience', label: 'Primary audience' },
              ]}
              rows={[
                {
                  site: 'Generic calculator sites (Calculator.net, Omnicalculator)',
                  methodology: 'Rule-of-thumb only',
                  sources: 'Rare or absent',
                  audience: 'General consumers',
                },
                {
                  site: 'Contractor software (Cool Calc, AutoHVAC, ServiceTitan)',
                  methodology: 'ACCA-approved Manual J',
                  sources: 'Internal to platform',
                  audience: 'HVAC contractors only',
                },
                {
                  site: 'Manufacturer sites (Trane, Carrier, Mitsubishi)',
                  methodology: 'Marketing-focused; varies',
                  sources: 'Self-published research',
                  audience: 'Homeowners researching purchases',
                },
                {
                  site: 'hvacloadcalc.org',
                  methodology: 'Planning-grade ACCA Manual J 8th',
                  sources: 'Every number cited to primary source',
                  audience: 'Homeowners verifying contractor quotes',
                },
              ]}
            />
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              Federal HVAC programs the site tracks
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Federal program categories that drive residential HVAC decisions. Status
              and amounts shift with legislative action; verify current IRS and DOE
              guidance before relying on any specific incentive figure for a purchase
              decision.
            </p>
            <DataTable
              caption="Federal HVAC programs tracked across the site, with 2026 status (source: IRS, DOE, EPA primary publications)"
              columns={[
                { key: 'program', label: 'Program' },
                { key: 'maxAmount', label: '2026 status', align: 'right' },
                { key: 'scope', label: 'Scope' },
                { key: 'source', label: 'Source' },
              ]}
              rows={[
                {
                  program: 'IRA Section 25C (Energy Efficient Home Improvement Credit)',
                  maxAmount: 'Expired Dec 31, 2025 (HVAC scope)',
                  scope: 'Was a tax credit for high-efficiency equipment and envelope improvements; last claimable on 2025 tax return for installs completed by Dec 31, 2025',
                  source: 'IRS Fact Sheet FS-2025-05 (supersedes FS-2022-40)',
                },
                {
                  program: 'IRA Section 50122 (HEEHRA point-of-sale rebate)',
                  maxAmount: 'State-administered (verify status by state)',
                  scope: 'Income-qualified point-of-sale rebates for electrification; status varies by state program funding',
                  source: 'DOE Home Energy Rebates Programs',
                },
                {
                  program: 'EPA AIM Act (HFC phasedown)',
                  maxAmount: 'N/A (regulatory)',
                  scope: 'Phase-out of R-410A new equipment; transition to R-454B/R-32',
                  source: 'EPA AIM Act Final Rule',
                },
                {
                  program: 'DOE Minimum Efficiency Standards (10 CFR 430)',
                  maxAmount: 'N/A (regulatory)',
                  scope: 'Federal minimum SEER2/HSPF2/AFUE for new equipment sold in US',
                  source: 'DOE Energy Conservation Standards',
                },
                {
                  program: 'ENERGY STAR Version 6.1 / 7.0',
                  maxAmount: 'Voluntary tier',
                  scope: 'Performance certification above federal minimum',
                  source: 'US EPA / ENERGY STAR',
                },
              ]}
            />
          </section>

          {/* Expanded from 5 to 8 paths */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">Where to start by intent</h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Different visitors arrive with different goals. Each path below leads to
              the right entry point.
            </p>
            <ul className="mt-6 space-y-4">
              {START_PATHS.map((p) => (
                <li
                  key={p.intent}
                  className="rounded-lg border border-ink-300 bg-white p-4"
                >
                  <p className="font-semibold text-ink-900">{p.intent}</p>
                  <p className="mt-1 text-sm text-ink-700">{p.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <Callout type="info" title="A note on planning-grade vs permit-grade">
            Every calculator on this site is planning-grade — appropriate for
            understanding magnitudes, evaluating contractor quotes, and budgeting
            equipment purchases. It is NOT appropriate for permit applications, rebate
            documentation, or anything where ACCA-approved software output is required.
            For those uses, hire a credentialed party using approved software. See the{' '}
            <Link href="/methodology/" className="text-brand hover:underline">
              methodology page
            </Link>{' '}
            for the accuracy bands the calculators claim against ACCA reference cases.
          </Callout>

          {/* NEW — Primary sources credibility wall */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-ink-900">
              Primary sources behind the content
            </h2>
            <p className="mt-3 max-w-prose text-ink-700">
              Every claim on the site traces to a primary publication. The twelve
              organizations below cover the standards, government rules, and certified
              data the content depends on. The complete bibliography with specific
              documents, URLs, and access dates is at{' '}
              <Link href="/sources/" className="text-brand hover:underline">
                /sources/
              </Link>
              .
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRIMARY_SOURCES.map((s) => (
                <li
                  key={s.abbr}
                  className="rounded-lg border border-ink-300 bg-white p-4"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-ink-900">{s.abbr}</span>
                    <span className="text-xs text-ink-500">— {s.name}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-700">{s.scope}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">About the site</h2>
            <p className="mt-4 text-ink-700">
              hvacloadcalc.org is an independent educational reference written and
              maintained under the pen name{' '}
              <Link
                href="/authors/jonathan-s/"
                className="text-brand hover:underline"
              >
                Jonathan Stowe
              </Link>{' '}
              by a single independent operator — a developer based in the EU who
              specializes in residential HVAC methodology through sustained primary-source
              reading. The pseudonym disclosure and full editorial process are documented
              in the{' '}
              <Link
                href="/editorial-standards/"
                className="text-brand hover:underline"
              >
                editorial standards
              </Link>
              .
            </p>
            <p className="mt-4 text-ink-700">
              The site is independent of every HVAC manufacturer, contractor, and
              software vendor cited across its content. The complete bibliography of
              standards and primary sources behind the content is at{' '}
              <Link href="/sources/" className="text-brand hover:underline">
                /sources/
              </Link>
              . Corrections to published work are welcomed via{' '}
              <Link href="/contact/" className="text-brand hover:underline">
                info@hvacloadcalc.org
              </Link>{' '}
              and logged at{' '}
              <Link href="/corrections/" className="text-brand hover:underline">
                /corrections/
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
