'use client';

import {
  INSULATION_DISPLAY_NAMES,
  R_PER_INCH,
  type AtticRValueInputs,
  type AtticRValueResult as AtticResultType,
  type InsulationType,
} from '@/lib/calculators/attic-r-value';

interface Props {
  result: AtticResultType;
  inputs: AtticRValueInputs;
}

const STATUS_INFO: Record<
  AtticResultType['status'],
  { color: string; bgColor: string; border: string; label: string; explanation: string }
> = {
  'below-doe-low': {
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    border: 'border-danger',
    label: 'Below DOE recommendation',
    explanation:
      "Your current attic insulation is below the DOE-recommended R-value range and below the IECC 2021 code minimum. Adding insulation is one of the highest-return envelope improvements available — payback is typically 5-10 years in heating-dominated climates and 8-15 years in cooling-dominated climates, much faster than the 25-40 year payback typical for window replacement.",
  },
  'meets-iecc-only': {
    color: 'text-warn',
    bgColor: 'bg-warn/10',
    border: 'border-warn',
    label: 'Meets IECC code only',
    explanation:
      "Your current attic insulation meets the IECC 2021 code minimum but falls below the DOE-recommended range. The DOE recommendation represents the cost-optimal target for energy savings over the equipment's life; upgrading from code-minimum to DOE-recommended typically returns 15-25% additional heating/cooling savings per dollar of insulation cost.",
  },
  'in-doe-range': {
    color: 'text-good',
    bgColor: 'bg-good/10',
    border: 'border-good',
    label: 'Within DOE recommended range',
    explanation:
      "Your attic insulation falls within the DOE-recommended range for your climate zone. Adding more insulation will continue to save energy, but the marginal payback drops above the DOE-recommended upper bound — diminishing returns mean other envelope improvements (air sealing, wall insulation, window upgrades) typically offer better return on the next dollar spent.",
  },
  'at-or-above-doe-high': {
    color: 'text-good',
    bgColor: 'bg-good/15',
    border: 'border-good',
    label: 'At or above DOE recommended high',
    explanation:
      "Your attic exceeds the upper end of the DOE recommendation. Additional insulation depth has minimal marginal payback at this level. If you're still looking to reduce heating/cooling load, focus on air sealing (typically the highest-return envelope improvement at any R-value), wall insulation, foundation insulation, or window upgrades.",
  },
};

function nbsp(n: number): string {
  return n.toLocaleString();
}

export function AtticRValueResult({ result, inputs }: Props) {
  const statusInfo = STATUS_INFO[result.status];

  // SVG geometry for R-value gauge
  const sw = 880;
  const sh = 240;
  const padL = 60;
  const padR = 40;
  const gaugeY = 110;
  const gaugeW = sw - padL - padR;
  const rMax = 80;
  const xForR = (r: number) =>
    padL + (Math.max(0, Math.min(rMax, r)) / rMax) * gaugeW;

  const currentX = xForR(result.totalRValue);
  const doeLowX = xForR(result.doeRecommendedRange.low);
  const doeHighX = xForR(result.doeRecommendedRange.high);
  const ieccX = xForR(result.ieccCodeMinimum);

  // Estimate energy savings (very rough heuristic)
  // U = 1/R; reducing U from current to target reduces heat flux proportionally
  // Annual savings ~ proportional to U reduction × HDD (heating-dominated zones)
  // This is a rough planning estimate
  const targetR = result.upgradeRecommendation?.targetR ?? result.totalRValue;
  const currentU = 1 / Math.max(1, result.totalRValue);
  const targetU = 1 / Math.max(1, targetR);
  const uReductionPct = ((currentU - targetU) / currentU) * 100;

  // Rough $ savings: assume 1500 sq ft attic, ~5,000 BTU/hr per R-unit savings at design temp
  // Heating: ~1500 hrs × kWh @ 0.16/kWh, etc.
  // This is illustrative; actual savings depend heavily on house and climate
  const atticAreaSqft = 1500;
  const designDeltaT = inputs.climateZone === '1' || inputs.climateZone === '2' ? 25 : 40;
  const annualBtuSavings =
    atticAreaSqft *
    (currentU - targetU) *
    designDeltaT *
    24 *
    (inputs.climateZone === '1'
      ? 80
      : inputs.climateZone === '2'
        ? 110
        : inputs.climateZone === '3'
          ? 140
          : inputs.climateZone === '4'
            ? 200
            : inputs.climateZone === '5'
              ? 240
              : inputs.climateZone === '6'
                ? 270
                : 300);
  const annualDollarSavings = Math.round((annualBtuSavings / 100000) * 1.6); // approx natural gas at 95% AFUE

  return (
    <div className="not-prose space-y-10">
      {/* Hero */}
      <section className="rounded-xl border-2 border-brand bg-brand/5 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Current total R-value
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-5xl font-bold text-ink-900 sm:text-6xl">
            R-{result.totalRValue.toFixed(1)}
          </p>
          <p className="text-lg text-ink-500">
            Climate zone {inputs.climateZone} · DOE target R-{result.doeRecommendedRange.low} to R-{result.doeRecommendedRange.high}
          </p>
        </div>

        <div className={`mt-4 rounded-md border-l-4 ${statusInfo.border} ${statusInfo.bgColor} p-4`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
          <p className="mt-2 text-sm text-ink-700">{statusInfo.explanation}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              DOE recommended
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">
              R-{result.doeRecommendedRange.low} to R-{result.doeRecommendedRange.high}
            </p>
            <p className="mt-1 text-xs text-ink-700">
              Cost-optimal target for zone {inputs.climateZone}
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              IECC 2021 code minimum
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">
              R-{result.ieccCodeMinimum}
            </p>
            <p className="mt-1 text-xs text-ink-700">
              Federal code floor for new construction
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              {result.upgradeRecommendation ? 'Add to reach target' : 'Margin above target'}
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">
              {result.upgradeRecommendation
                ? `R-${result.upgradeRecommendation.additionalRNeeded.toFixed(1)}`
                : `R-${(result.totalRValue - result.doeRecommendedRange.low).toFixed(1)}`}
            </p>
            <p className="mt-1 text-xs text-ink-700">
              {result.upgradeRecommendation
                ? 'Additional R needed for DOE low target'
                : 'Above DOE-recommended low'}
            </p>
          </div>
        </div>
      </section>

      {/* R-value gauge SVG */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Where your R-value lands on the scale</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            The gauge below maps R-values from 0 to R-80. Your current total is marked, with the
            IECC 2021 code minimum and the DOE-recommended range overlaid. Most residential attic
            insulation work targets the DOE-recommended range as the cost-optimal end state.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300 bg-white p-4">
          <svg
            viewBox={`0 0 ${sw} ${sh}`}
            className="w-full max-w-full"
            role="img"
            aria-labelledby="attic-gauge-title attic-gauge-desc"
          >
            <title id="attic-gauge-title">Attic R-value gauge</title>
            <desc id="attic-gauge-desc">
              Horizontal gauge from 0 to R-80 with current value, DOE range, and IECC minimum marked.
            </desc>

            {/* Gauge background */}
            <rect
              x={padL}
              y={gaugeY - 16}
              width={gaugeW}
              height={32}
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth={1}
              rx={4}
            />

            {/* DOE recommended range band */}
            <rect
              x={doeLowX}
              y={gaugeY - 16}
              width={doeHighX - doeLowX}
              height={32}
              fill="rgba(5,150,105,0.18)"
              stroke="#059669"
              strokeWidth={1}
              rx={4}
            />
            <text
              x={(doeLowX + doeHighX) / 2}
              y={gaugeY - 24}
              textAnchor="middle"
              fontSize="11"
              fontWeight={600}
              fill="#059669"
            >
              DOE recommended
            </text>

            {/* IECC marker */}
            <line
              x1={ieccX}
              y1={gaugeY - 24}
              x2={ieccX}
              y2={gaugeY + 24}
              stroke="#d97706"
              strokeWidth={2}
              strokeDasharray="3 2"
            />
            <text
              x={ieccX}
              y={gaugeY + 42}
              textAnchor="middle"
              fontSize="10"
              fill="#d97706"
              fontWeight={600}
            >
              IECC R-{result.ieccCodeMinimum}
            </text>

            {/* Scale ticks every 10 */}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80].map((r) => {
              const x = xForR(r);
              return (
                <g key={r}>
                  <line x1={x} y1={gaugeY + 16} x2={x} y2={gaugeY + 22} stroke="#94a3b8" strokeWidth={1} />
                  <text x={x} y={gaugeY + 62} textAnchor="middle" fontSize="10" fill="#64748b">
                    R-{r}
                  </text>
                </g>
              );
            })}

            {/* Current value marker */}
            <g>
              <line
                x1={currentX}
                y1={gaugeY - 48}
                x2={currentX}
                y2={gaugeY + 32}
                stroke="#1e40af"
                strokeWidth={3}
              />
              <circle cx={currentX} cy={gaugeY} r={10} fill="#1e40af" />
              <text
                x={currentX}
                y={gaugeY - 56}
                textAnchor="middle"
                fontSize="14"
                fontWeight={700}
                fill="#1e40af"
              >
                Your attic: R-{result.totalRValue.toFixed(1)}
              </text>
            </g>

            {/* Bottom labels */}
            <text x={padL} y={sh - 8} fontSize="10" fill="#94a3b8">
              Uninsulated
            </text>
            <text x={sw - padR} y={sh - 8} fontSize="10" fill="#94a3b8" textAnchor="end">
              Passive House territory
            </text>
          </svg>
        </div>
      </section>

      {/* Current layers breakdown */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Your current insulation layers</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Each layer of insulation in your attic contributes its depth multiplied by its
            material's R-per-inch. Layers add in series — a layer of R-13 batt under a layer of
            R-30 blown cellulose totals R-43 at the center of cavity, ignoring thermal bridging
            through joists.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Layer
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Material
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Depth
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  R per inch
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Layer R
                </th>
              </tr>
            </thead>
            <tbody>
              {result.perLayerRValues.map((l, i) => (
                <tr key={i} className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-900">Layer {i + 1}</td>
                  <td className="px-4 py-2 text-ink-700">{INSULATION_DISPLAY_NAMES[l.type]}</td>
                  <td className="px-4 py-2 text-right font-mono text-ink-900">
                    {l.depthInches}″
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-ink-700">
                    {R_PER_INCH[l.type].toFixed(1)}
                  </td>
                  <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                    R-{l.rValue.toFixed(1)}
                  </td>
                </tr>
              ))}
              <tr className="bg-brand/10">
                <td colSpan={4} className="px-4 py-2 font-bold text-ink-900">
                  Total R-value
                </td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  R-{result.totalRValue.toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Material options for upgrade (if needed) */}
      {result.upgradeRecommendation ? (
        <section>
          <header className="mb-3">
            <h3 className="text-lg font-bold text-ink-900">
              Upgrade to reach DOE R-{result.upgradeRecommendation.targetR}
            </h3>
            <p className="mt-1 max-w-prose text-sm text-ink-700">
              You need to add R-{result.upgradeRecommendation.additionalRNeeded.toFixed(1)} on top
              of your existing insulation. The depth depends on which material you choose. Loose-fill
              cellulose typically wins on cost-per-R for attic floor applications; closed-cell spray
              foam wins where ceiling depth is constrained.
            </p>
          </header>
          <div className="overflow-x-auto rounded-lg border border-ink-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink-300 bg-ink-100">
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                    Material
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                    R per inch
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                    Depth to add
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                    Typical use case
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.upgradeRecommendation.depthsByMaterial.map((d) => (
                  <tr key={d.type} className="border-b border-ink-100">
                    <td className="px-4 py-2 text-ink-900">
                      {INSULATION_DISPLAY_NAMES[d.type as InsulationType]}
                    </td>
                    <td className="px-4 py-2 text-right font-mono text-ink-700">
                      {R_PER_INCH[d.type as InsulationType].toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                      {d.depthInches}″
                    </td>
                    <td className="px-4 py-2 text-ink-700">
                      {d.type === 'loose-fill-cellulose'
                        ? 'Cheapest per R; settles 10-20% over 5-10 years'
                        : d.type === 'loose-fill-fiberglass'
                          ? 'Alternative blown product; lower R per inch'
                          : 'Highest R per inch; use where depth is limited'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Energy savings estimate */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Estimated annual savings from upgrading</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Going from R-{result.totalRValue.toFixed(1)} to R-{targetR} reduces heat flow through
            the attic by about {uReductionPct.toFixed(0)}%, since heat flux scales with 1/R. For a
            typical 1,500 sq ft attic in zone {inputs.climateZone}, that translates to roughly the
            estimate below.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-ink-300 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Heat flow reduction
            </p>
            <p className="mt-1 text-3xl font-bold text-ink-900">{uReductionPct.toFixed(0)}%</p>
            <p className="mt-1 text-sm text-ink-700">
              Through the attic, comparing 1/R-{result.totalRValue.toFixed(0)} to 1/R-{targetR}
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Estimated annual savings
            </p>
            <p className="mt-1 text-3xl font-bold text-ink-900">
              {annualDollarSavings > 0 ? `~$${nbsp(annualDollarSavings)}` : '—'}
            </p>
            <p className="mt-1 text-sm text-ink-700">
              At natural gas $1.30/therm, 95% AFUE, 1,500 sq ft attic; cooling savings additional
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Estimate is illustrative. Actual savings depend on attic area, infiltration through the
          attic floor, duct losses, equipment efficiency, and local utility rates. For a precise
          number, run the Manual J load calculator at both the current and the upgraded R-value
          and compare the heating loads.
        </p>
      </section>

      {/* Air sealing callout */}
      <section className="rounded-lg border-l-4 border-warn bg-warn/5 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn">
          Air seal first, then insulate
        </p>
        <p className="mt-3 text-sm text-ink-700">
          Insulation slows conductive heat flow through solid surfaces. It does almost nothing to
          stop air leakage through gaps, holes, and penetrations. A house with R-49 attic insulation
          and 12 ACH50 air leakage performs worse than the same house with R-30 insulation and 4
          ACH50.
        </p>
        <p className="mt-3 text-sm text-ink-700">
          The major air leakage points in a typical attic are: bath fan housings, recessed lights,
          plumbing chases, top-plate-to-drywall gaps, the attic hatch, electrical wires, and
          dropped ceilings over showers. Sealing these with caulk, foam, and gaskets typically
          costs $500-$1,500 in a 2,000 sq ft home and produces 10-25% heating/cooling load
          reduction — usually a bigger improvement per dollar than the insulation upgrade itself.
        </p>
        <p className="mt-3 text-sm text-ink-700">
          The right order of work is: (1) blower-door test to measure current leakage and identify
          worst leaks, (2) seal the worst leaks first, (3) verify with a second blower-door test,
          (4) then add insulation over the now-tight envelope.
        </p>
      </section>

      {/* Caveats */}
      <section className="rounded-lg border border-ink-300 bg-ink-50 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-700">
          What this calculator does NOT account for
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            <strong className="text-ink-900">Thermal bridging through joists.</strong> Wood ceiling
            joists conduct heat 5-10× faster than insulation. The center-of-cavity R-value the
            calculator reports is the steady-state R between joists; the effective whole-attic R is
            typically 10-15% lower in standard wood-framed construction.
          </li>
          <li>
            <strong className="text-ink-900">Installation quality.</strong> The catalog R-per-inch
            values assume careful installation. Sloppy blown installation that fails to reach the
            eaves, batts compressed in undersized cavities, and wind-washing through soffit vents
            can reduce field-effective R by 20-30%.
          </li>
          <li>
            <strong className="text-ink-900">Settling of blown insulation.</strong> Loose-fill
            cellulose settles 10-20% over 5-10 years; loose-fill fiberglass settles 5-10%. Account
            for this by adding 10-15% extra depth at install.
          </li>
          <li>
            <strong className="text-ink-900">Moisture impact on R-value.</strong> Wet insulation has
            dramatically lower R-value than dry insulation. Confirm there are no roof leaks or
            condensation issues before insulating; add a vapor barrier if local code requires.
          </li>
          <li>
            <strong className="text-ink-900">Duct R-value, if ducts run in the attic.</strong>{' '}
            Ducts in attic space lose 20-30% of supply air through walls and joints. Sealing and
            insulating ducts often saves more energy than the insulation upgrade.
          </li>
        </ul>
      </section>
    </div>
  );
}
