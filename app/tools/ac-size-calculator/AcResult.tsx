'use client';

import type { BtuResult, BtuInputs, ClimateZone } from '@/lib/calculators/btu';

interface Props {
  result: BtuResult;
  inputs: BtuInputs;
}

// SHR (sensible heat ratio) estimate by climate zone — typical Manual J output for residential
// in each zone. Lower SHR means more latent (moisture) load per unit total cooling.
const SHR_BY_ZONE: Record<ClimateZone, number> = {
  '1': 0.68,
  '2': 0.70,
  '3': 0.74,
  '4': 0.78,
  '5': 0.82,
  '6': 0.85,
  '7': 0.87,
  '8': 0.90,
};

const ELECTRICITY_RATE_USD_PER_KWH = 0.163; // EIA 2024-2025 US average residential

const EQUIPMENT_RECOMMENDATION: Record<
  BtuResult['suggestedEquipmentClass'],
  {
    label: string;
    tagline: string;
    primaryFit: string;
    secondaryFit: string;
    installCost: string;
    efficiency: string;
    avoidWhen: string;
  }
> = {
  window: {
    label: 'Window air conditioner',
    tagline: 'Single-room cooling at the lowest equipment cost',
    primaryFit: 'A bedroom or single small living space with a working double-hung window',
    secondaryFit: 'Rental units where structural changes are not permitted',
    installCost: '$200–$500 retail, DIY install',
    efficiency: 'CEER 11–13 typical (12 = ENERGY STAR threshold for most sizes)',
    avoidWhen:
      'You need multi-room cooling, the window cannot support the unit weight, or the unit would obstruct egress.',
  },
  'window-or-portable': {
    label: 'Window unit or portable AC',
    tagline: 'Mid-size single-room cooling with a form-factor choice',
    primaryFit: 'A larger living room or master bedroom where a window mount works',
    secondaryFit: 'Apartments where windows do not accept window mounts (use a portable)',
    installCost: '$300–$800 retail for either type, DIY install',
    efficiency:
      'Window: CEER 11–12. Portable: CEER 9–10 (worse because exhaust pulls cooled room air out).',
    avoidWhen:
      'You can install a mini-split affordably — at 14k BTU/hr the mini-split delivers similar capacity at much higher efficiency.',
  },
  'mini-split-or-window': {
    label: 'Ductless mini-split (recommended) or large window unit',
    tagline: 'The size where mini-split efficiency starts paying back',
    primaryFit: 'A large living space, open-plan area, or addition without ductwork',
    secondaryFit: 'Window AC if you need a DIY install at lower cost and accept the efficiency hit',
    installCost: 'Mini-split: $3,000–$5,000 installed. Window AC: $500–$1,000 retail.',
    efficiency:
      'Mini-split: SEER2 18–22, far above any window unit. Window AC large size: SEER2 13–15.',
    avoidWhen:
      'You have an existing central AC duct system with capacity — extending it is cheaper than a new mini-split for many configurations.',
  },
  central: {
    label: 'Central AC or multi-zone mini-split',
    tagline: 'Whole-house or multi-room cooling territory',
    primaryFit: 'A whole house with existing ductwork, or a multi-room install in a ducted home',
    secondaryFit: 'Multi-zone ductless mini-split for homes without usable ductwork',
    installCost: 'Central AC: $4,000–$10,000 installed. Multi-zone mini-split: $3k-$8k per zone.',
    efficiency:
      'Central: SEER2 13.4 (federal minimum) to SEER2 22+ (premium variable-speed). Mini-split: typically SEER2 18+.',
    avoidWhen:
      'You only need cooling in one room — a single-zone mini-split costs a fraction of central AC and serves a single space better.',
  },
};

function nbsp(n: number): string {
  return n.toLocaleString();
}

export function AcResult({ result, inputs }: Props) {
  const eqRec = EQUIPMENT_RECOMMENDATION[result.suggestedEquipmentClass];
  const shrEstimate = SHR_BY_ZONE[inputs.climateZone];
  const sensibleBtu = Math.round(result.recommendedBtu * shrEstimate);
  const latentBtu = result.recommendedBtu - sensibleBtu;
  const seer2Examples = [
    { seer2: 13.4, label: 'Federal minimum (north)' },
    { seer2: 14.3, label: 'Federal minimum (south)' },
    { seer2: 15.2, label: 'ENERGY STAR' },
    { seer2: 18.0, label: 'Higher-tier variable-speed' },
    { seer2: 22.0, label: 'Premium variable-speed' },
  ];

  // Annual operating cost estimates at each SEER2
  // Assume 1,200 cooling-hour-equivalents at full load (typical zone 4)
  const HOURS_BY_ZONE: Record<ClimateZone, number> = {
    '1': 2800,
    '2': 2400,
    '3': 1800,
    '4': 1200,
    '5': 900,
    '6': 700,
    '7': 500,
    '8': 300,
  };
  const annualHours = HOURS_BY_ZONE[inputs.climateZone];
  const annualLoadBtu = result.recommendedBtu * annualHours * 0.75; // 75% avg load factor

  // SVG geometry for Manual S tolerance band
  const sw = 880;
  const sh = 200;
  const padL = 60;
  const padR = 40;
  const cx = (sw - padL - padR) / 2 + padL;
  const trackY = 100;
  const trackW = sw - padL - padR;

  // Map BTU values to x positions; center is recommendedBtu, span ± 40%
  const xSpan = trackW;
  const spanFactor = 0.45;
  const xForBtu = (btu: number) => {
    const factor = (btu - result.recommendedBtu) / result.recommendedBtu;
    return cx + (factor / spanFactor) * (xSpan / 2);
  };

  // Manual S allowed range (-10% to +20%)
  const manualSLowBtu = Math.round(result.recommendedBtu * 0.9);
  const manualSHighBtu = Math.round(result.recommendedBtu * 1.2);

  return (
    <div className="not-prose space-y-10">
      {/* Hero */}
      <section className="rounded-xl border-2 border-brand bg-brand/5 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Recommended AC size
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-5xl font-bold text-ink-900 sm:text-6xl">
            {result.recommendedTons}
          </p>
          <p className="text-2xl font-semibold text-ink-700">
            ton{result.recommendedTons === 1 ? '' : 's'}
          </p>
          <p className="text-lg text-ink-500">
            ({nbsp(result.recommendedBtu)} BTU/hr)
          </p>
        </div>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-700">
          {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'} is the cooling
          capacity an AC must deliver at the local design condition — about 95°F outdoor for most
          of the US, the temperature exceeded only 1% of typical-year hours per ASHRAE Handbook of
          Fundamentals 2021. At any milder condition the AC modulates down (variable-speed) or
          cycles off (single-stage); at the design hour it should hit setpoint with the airflow
          you sized for, not run continuously.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Equipment class
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">{eqRec.label}</p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Manual S range
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">
              {nbsp(manualSLowBtu)}–{nbsp(manualSHighBtu)}
            </p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr (−10% to +20% of Manual J load)
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Estimated SHR
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">{shrEstimate.toFixed(2)}</p>
            <p className="mt-1 text-xs text-ink-700">
              Sensible heat ratio for zone {inputs.climateZone}
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Raw calc
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">{nbsp(result.rawCalculatedBtu)}</p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr before rounding to standard size
            </p>
          </div>
        </div>
      </section>

      {/* Manual S tolerance SVG */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Manual S tolerance band</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            ACCA Manual S allows the installed AC's nominal cooling capacity to exceed the Manual J
            cooling load by up to 15% for single-stage equipment and up to 25% for two-stage or
            variable-speed equipment. The band below shows the range of valid equipment sizes
            relative to your calculated load.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300 bg-white p-4">
          <svg
            viewBox={`0 0 ${sw} ${sh}`}
            className="w-full max-w-full"
            role="img"
            aria-labelledby="acms-title acms-desc"
          >
            <title id="acms-title">Manual S tolerance band</title>
            <desc id="acms-desc">
              Horizontal band showing the −10% to +20% Manual S allowed range around the
              calculated Manual J cooling load.
            </desc>

            {/* Out-of-tolerance regions */}
            <rect
              x={padL}
              y={trackY - 24}
              width={xForBtu(manualSLowBtu) - padL}
              height={48}
              fill="rgba(220,38,38,0.10)"
            />
            <rect
              x={xForBtu(manualSHighBtu)}
              y={trackY - 24}
              width={sw - padR - xForBtu(manualSHighBtu)}
              height={48}
              fill="rgba(220,38,38,0.10)"
            />

            {/* In-tolerance band */}
            <rect
              x={xForBtu(manualSLowBtu)}
              y={trackY - 24}
              width={xForBtu(manualSHighBtu) - xForBtu(manualSLowBtu)}
              height={48}
              fill="rgba(5,150,105,0.15)"
              stroke="#059669"
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />

            {/* Center line and recommended marker */}
            <line
              x1={cx}
              y1={trackY - 36}
              x2={cx}
              y2={trackY + 36}
              stroke="#1e40af"
              strokeWidth={3}
            />
            <circle cx={cx} cy={trackY} r={9} fill="#1e40af" />
            <text
              x={cx}
              y={trackY - 44}
              textAnchor="middle"
              fontSize="13"
              fontWeight={700}
              fill="#1e40af"
            >
              Recommended {nbsp(result.recommendedBtu)} BTU/hr
            </text>

            {/* Low/High labels */}
            <line x1={xForBtu(manualSLowBtu)} y1={trackY + 26} x2={xForBtu(manualSLowBtu)} y2={trackY + 36} stroke="#059669" strokeWidth={2} />
            <text x={xForBtu(manualSLowBtu)} y={trackY + 50} textAnchor="middle" fontSize="11" fill="#059669" fontWeight={600}>
              −10%
            </text>
            <text x={xForBtu(manualSLowBtu)} y={trackY + 64} textAnchor="middle" fontSize="10" fill="#475569">
              {nbsp(manualSLowBtu)}
            </text>

            <line x1={xForBtu(manualSHighBtu)} y1={trackY + 26} x2={xForBtu(manualSHighBtu)} y2={trackY + 36} stroke="#059669" strokeWidth={2} />
            <text x={xForBtu(manualSHighBtu)} y={trackY + 50} textAnchor="middle" fontSize="11" fill="#059669" fontWeight={600}>
              +20%
            </text>
            <text x={xForBtu(manualSHighBtu)} y={trackY + 64} textAnchor="middle" fontSize="10" fill="#475569">
              {nbsp(manualSHighBtu)}
            </text>

            {/* Out-of-tolerance labels */}
            <text x={padL + 30} y={trackY + 8} fontSize="11" fill="#dc2626" fontWeight={600}>
              Undersized
            </text>
            <text x={sw - padR - 30} y={trackY + 8} fontSize="11" fill="#dc2626" fontWeight={600} textAnchor="end">
              Oversized
            </text>

            {/* In-tolerance label */}
            <text x={cx} y={trackY + 80} textAnchor="middle" fontSize="12" fill="#059669" fontWeight={600}>
              Manual S compliant range
            </text>
          </svg>
        </div>
      </section>

      {/* Equipment recommendation */}
      <section>
        <header className="mb-4">
          <h3 className="text-lg font-bold text-ink-900">
            {eqRec.label} — what fits at {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'}
          </h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">{eqRec.tagline}</p>
        </header>
        <div className="overflow-hidden rounded-lg border border-ink-300 bg-white">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="w-1/3 bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Best fit
                </td>
                <td className="px-4 py-3 text-ink-700">{eqRec.primaryFit}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Alternative
                </td>
                <td className="px-4 py-3 text-ink-700">{eqRec.secondaryFit}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Install cost
                </td>
                <td className="px-4 py-3 text-ink-700">{eqRec.installCost}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Efficiency tier
                </td>
                <td className="px-4 py-3 text-ink-700">{eqRec.efficiency}</td>
              </tr>
              <tr>
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Skip this class when
                </td>
                <td className="px-4 py-3 text-ink-700">{eqRec.avoidWhen}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Sensible vs latent */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Sensible vs latent cooling at your climate</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Cooling work splits into two categories: sensible cooling lowers temperature, latent
            cooling removes water vapor. In zone {inputs.climateZone}, the load SHR is typically
            around {shrEstimate.toFixed(2)} — meaning roughly{' '}
            {Math.round(shrEstimate * 100)}% of the cooling work is sensible and{' '}
            {Math.round((1 - shrEstimate) * 100)}% is latent (dehumidification). Oversized AC in
            humid climates cools to setpoint quickly without removing enough moisture, leaving the
            house "cool but sticky" at 65%+ relative humidity.
          </p>
        </header>
        <div className="overflow-hidden rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Component
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  BTU/hr
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Share
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Sensible cooling</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">{nbsp(sensibleBtu)}</td>
                <td className="px-4 py-2 text-right text-ink-700">{Math.round(shrEstimate * 100)}%</td>
                <td className="px-4 py-2 text-ink-700">Drops air dry-bulb temperature</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Latent cooling</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">{nbsp(latentBtu)}</td>
                <td className="px-4 py-2 text-right text-ink-700">{Math.round((1 - shrEstimate) * 100)}%</td>
                <td className="px-4 py-2 text-ink-700">Condenses water vapor out of indoor air</td>
              </tr>
              <tr className="bg-brand/10">
                <td className="px-4 py-2 font-bold text-ink-900">Total recommended</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  {nbsp(result.recommendedBtu)}
                </td>
                <td className="px-4 py-2 text-right font-bold text-ink-900">100%</td>
                <td className="px-4 py-2 text-ink-700">At AHRI 95°F outdoor / 80°F indoor / 67°F WB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          SHR by climate is an estimate; the actual equipment SHR at your indoor design condition
          comes from the manufacturer's expanded performance data. Manual S equipment selection
          compares both the AHRI total capacity AND the SHR-adjusted sensible capacity against the
          load components — see /manual-s/ for the methodology.
        </p>
      </section>

      {/* Operating cost */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Estimated annual operating cost</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Operating cost depends on cooling-season hours (about {annualHours} hours of equivalent
            full-load operation per year in zone {inputs.climateZone}), the equipment's seasonal
            efficiency (SEER2), and the local electricity rate. The table below shows annual cost
            at five common efficiency tiers using the US average residential electricity rate of
            ${ELECTRICITY_RATE_USD_PER_KWH.toFixed(3)}/kWh.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Efficiency tier (SEER2)
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Annual kWh
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Annual cost
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {seer2Examples.map((e) => {
                const kwh = Math.round(annualLoadBtu / e.seer2 / 1000);
                const cost = Math.round(kwh * ELECTRICITY_RATE_USD_PER_KWH);
                return (
                  <tr key={e.seer2} className="border-b border-ink-100">
                    <td className="px-4 py-2 text-ink-900">{e.seer2.toFixed(1)}</td>
                    <td className="px-4 py-2 text-right font-mono text-ink-900">{nbsp(kwh)}</td>
                    <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                      ${nbsp(cost)}
                    </td>
                    <td className="px-4 py-2 text-ink-700">{e.label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Estimates assume 75% average load factor across the cooling season. Local electricity
          rates vary significantly: Pacific Northwest averages $0.10/kWh while California averages
          $0.30/kWh — multiply costs in the table by (your-rate / 0.163) for a regional estimate.
        </p>
      </section>

      {/* Math breakdown */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">How the capacity was computed</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            The calculator multiplies a baseline (22 BTU per sq ft at zone 4, average insulation,
            8-ft ceilings) by climate, ceiling, sun, insulation, and space-type factors, then adds
            occupancy and kitchen adjustments. Each step is shown below.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">Baseline</td>
                <td className="px-4 py-2 text-right text-ink-900">
                  {result.breakdown.baseline.sqft} sqft × {result.breakdown.baseline.btuPerSqft}
                </td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  = {nbsp(result.breakdown.baseline.result)} BTU
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Climate (zone {inputs.climateZone})</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">× {result.breakdown.climateFactor}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Ceiling ({inputs.ceilingHeight} ft)</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">× {result.breakdown.ceilingFactor}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Sun ({inputs.sunExposure})</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">× {result.breakdown.sunFactor}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Insulation ({inputs.insulationLevel})</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">× {result.breakdown.insulationFactor}</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Space type ({inputs.spaceType ?? 'bedroom'})</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">× {result.breakdown.spaceTypeFactor}</td>
              </tr>
              <tr className="border-b-2 border-ink-300 bg-ink-100/50">
                <td className="px-4 py-2 font-semibold text-ink-900">Subtotal</td>
                <td></td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                  = {nbsp(result.breakdown.multiplicativeSubtotal)} BTU
                </td>
              </tr>
              {result.breakdown.occupancyAdjustment > 0 ? (
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    + Occupancy ({inputs.occupants} people)
                  </td>
                  <td></td>
                  <td className="px-4 py-2 text-right font-mono text-ink-900">
                    + {nbsp(result.breakdown.occupancyAdjustment)} BTU
                  </td>
                </tr>
              ) : null}
              {result.breakdown.kitchenAdjustment > 0 ? (
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">+ Kitchen</td>
                  <td></td>
                  <td className="px-4 py-2 text-right font-mono text-ink-900">
                    + {nbsp(result.breakdown.kitchenAdjustment)} BTU
                  </td>
                </tr>
              ) : null}
              <tr className="bg-brand/10">
                <td className="px-4 py-2 font-bold text-ink-900">Raw calculation, rounded to standard size</td>
                <td className="px-4 py-2 text-right text-ink-700">{nbsp(result.breakdown.finalRaw)} →</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  {nbsp(result.recommendedBtu)} BTU/hr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Caveats */}
      <section className="rounded-lg border-l-4 border-warn bg-warn/5 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn">
          What this calculator does NOT capture
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            <strong className="text-ink-900">Blower-door measured air leakage.</strong> The
            insulation input lumps insulation and infiltration. A 4 ACH50 house performs noticeably
            differently than a 12 ACH50 house at the same nominal R-values.
          </li>
          <li>
            <strong className="text-ink-900">Window orientation and SHGC.</strong> Sun exposure is
            a coarse input. A wall of single-pane south-facing glass produces 3-4× more solar gain
            than the same area of triple-pane north glass.
          </li>
          <li>
            <strong className="text-ink-900">Duct losses to unconditioned space.</strong> Central
            AC with leaky attic ducts loses 20-30% of supply air. The output here is room load;
            duct losses sit on top of that for whole-house sizing.
          </li>
          <li>
            <strong className="text-ink-900">Permit-grade Manual J requirements.</strong> Permit
            applications, HEEHRA rebate documentation, and many state energy programs require
            ACCA-approved software output. This calculator is planning-grade — appropriate for
            evaluating a contractor's tonnage proposal, not for replacing the contractor's Manual J.
          </li>
        </ul>
      </section>
    </div>
  );
}
