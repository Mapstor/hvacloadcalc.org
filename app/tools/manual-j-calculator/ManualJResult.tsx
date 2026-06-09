'use client';

import type { ManualJInputs, ManualJResult as MJResult } from '@/lib/calculators/manual-j';

interface Props {
  result: MJResult;
  inputs: ManualJInputs;
}

function nbsp(n: number): string {
  return n.toLocaleString();
}

const COMPONENT_COLORS: Record<string, string> = {
  walls: '#1e40af',
  ceiling: '#0891b2',
  floor: '#0e7490',
  windows: '#7c3aed',
  infiltration: '#d97706',
  solar: '#ea580c',
  internal: '#dc2626',
};

const COMPONENT_LABELS: Record<string, string> = {
  walls: 'Walls (conductive)',
  ceiling: 'Ceiling/roof (conductive)',
  floor: 'Floor (conductive)',
  windows: 'Windows (conductive)',
  infiltration: 'Infiltration (air leakage)',
  solar: 'Solar gain (through windows)',
  internal: 'Internal gain (people + appliances)',
};

export function ManualJResult({ result, inputs }: Props) {
  // Component breakdowns
  const heatingComponents = [
    { key: 'walls', value: result.breakdown.heating.wallConductive },
    { key: 'ceiling', value: result.breakdown.heating.ceilingConductive },
    { key: 'floor', value: result.breakdown.heating.floorConductive },
    { key: 'windows', value: result.breakdown.heating.windowConductive },
    { key: 'infiltration', value: result.breakdown.heating.infiltration },
  ];
  const coolingComponents = [
    { key: 'walls', value: result.breakdown.cooling.wallConductive },
    { key: 'ceiling', value: result.breakdown.cooling.ceilingConductive },
    { key: 'floor', value: result.breakdown.cooling.floorConductive },
    { key: 'windows', value: result.breakdown.cooling.windowConductive },
    { key: 'infiltration', value: result.breakdown.cooling.infiltration },
    { key: 'solar', value: result.breakdown.cooling.solarGain },
    { key: 'internal', value: result.breakdown.cooling.internalGain },
  ];

  const heatingTotal = heatingComponents.reduce((sum, c) => sum + c.value, 0);
  const coolingTotal = coolingComponents.reduce((sum, c) => sum + c.value, 0);

  // SVG geometry — two stacked bars (heating + cooling)
  const sw = 880;
  const sh = 340;
  const padL = 130;
  const padR = 30;
  const barH = 56;
  const heatingY = 60;
  const coolingY = 200;
  const barW = sw - padL - padR;

  // Max value used to set bar widths to scale
  const maxTotal = Math.max(heatingTotal, coolingTotal);
  const scaleFactor = barW / maxTotal;

  const drivingLoad = result.loadRatio >= 1 ? 'heating' : 'cooling';

  return (
    <div className="not-prose space-y-10">
      {/* Hero */}
      <section className="rounded-xl border-2 border-brand bg-brand/5 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Manual J-style whole-house load
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Heating load
            </p>
            <p className="mt-1 text-5xl font-bold text-ink-900">
              {nbsp(result.heatingLoadBtu)}
            </p>
            <p className="mt-1 text-sm text-ink-700">
              BTU/hr at {result.designConditions.heatingDesignTempF}°F outdoor / 70°F indoor
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Cooling load (total)
            </p>
            <p className="mt-1 text-5xl font-bold text-ink-900">
              {nbsp(result.coolingLoadTotalBtu)}
            </p>
            <p className="mt-1 text-sm text-ink-700">
              BTU/hr at {result.designConditions.coolingDesignTempF}°F outdoor / 75°F indoor
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Driving load
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">
              {drivingLoad === 'heating' ? 'Heating' : 'Cooling'} dominates
            </p>
            <p className="mt-1 text-xs text-ink-700">
              Ratio: heating / cooling = {result.loadRatio.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Recommended tonnage
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">
              {result.recommendedCoolingTons} tons
            </p>
            <p className="mt-1 text-xs text-ink-700">
              {nbsp(result.recommendedHeatingBtu)} BTU/hr nominal AHRI capacity
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Sensible cooling
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">
              {nbsp(result.coolingLoadSensibleBtu)}
            </p>
            <p className="mt-1 text-xs text-ink-700">BTU/hr (drops air temperature)</p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Latent cooling
            </p>
            <p className="mt-1 text-base font-bold text-ink-900">
              {nbsp(result.coolingLoadLatentBtu)}
            </p>
            <p className="mt-1 text-xs text-ink-700">BTU/hr (removes humidity)</p>
          </div>
        </div>
      </section>

      {/* Load components stacked bar SVG */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Load components: where the energy moves</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Heating and cooling loads break down into envelope components. The chart below shows
            each component's contribution to the total load. Walls, ceiling, floor, and windows are
            conductive losses through the building envelope. Infiltration is air leakage.
            Solar gain (cooling only) is solar radiation through windows. Internal gain is heat
            from people, lights, and appliances.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300 bg-white p-4">
          <svg viewBox={`0 0 ${sw} ${sh}`} className="w-full max-w-full" role="img" aria-labelledby="mj-bar-title mj-bar-desc">
            <title id="mj-bar-title">Load components stacked bar</title>
            <desc id="mj-bar-desc">
              Stacked horizontal bars showing the contribution of each envelope component to the
              total heating and cooling loads.
            </desc>

            {/* Heating bar */}
            <text x={padL - 16} y={heatingY + barH / 2 + 5} fontSize="13" fontWeight={700} fill="#0f172a" textAnchor="end">
              Heating
            </text>
            <text x={padL - 16} y={heatingY + barH / 2 + 22} fontSize="11" fill="#475569" textAnchor="end">
              {nbsp(heatingTotal)} BTU/hr
            </text>
            {(() => {
              let x = padL;
              return heatingComponents.map((c) => {
                const w = c.value * scaleFactor;
                const seg = (
                  <g key={c.key}>
                    <rect x={x} y={heatingY} width={w} height={barH} fill={COMPONENT_COLORS[c.key]} stroke="#fff" strokeWidth={1.5} />
                    {w > 60 ? (
                      <text x={x + w / 2} y={heatingY + barH / 2 + 4} fontSize="11" fontWeight={600} fill="#fff" textAnchor="middle">
                        {Math.round((c.value / heatingTotal) * 100)}%
                      </text>
                    ) : null}
                  </g>
                );
                x += w;
                return seg;
              });
            })()}

            {/* Cooling bar */}
            <text x={padL - 16} y={coolingY + barH / 2 + 5} fontSize="13" fontWeight={700} fill="#0f172a" textAnchor="end">
              Cooling
            </text>
            <text x={padL - 16} y={coolingY + barH / 2 + 22} fontSize="11" fill="#475569" textAnchor="end">
              {nbsp(coolingTotal)} BTU/hr
            </text>
            {(() => {
              let x = padL;
              return coolingComponents.map((c) => {
                const w = c.value * scaleFactor;
                const seg = (
                  <g key={c.key}>
                    <rect x={x} y={coolingY} width={w} height={barH} fill={COMPONENT_COLORS[c.key]} stroke="#fff" strokeWidth={1.5} />
                    {w > 50 ? (
                      <text x={x + w / 2} y={coolingY + barH / 2 + 4} fontSize="11" fontWeight={600} fill="#fff" textAnchor="middle">
                        {Math.round((c.value / coolingTotal) * 100)}%
                      </text>
                    ) : null}
                  </g>
                );
                x += w;
                return seg;
              });
            })()}

            {/* Legend */}
            {(() => {
              const items = Object.entries(COMPONENT_LABELS);
              const legendY = 280;
              const colsPerRow = 4;
              const itemW = (sw - padL - padR) / colsPerRow;
              return items.map(([key, label], i) => {
                const col = i % colsPerRow;
                const row = Math.floor(i / colsPerRow);
                const x = padL + col * itemW;
                const y = legendY + row * 22;
                return (
                  <g key={key}>
                    <rect x={x} y={y - 9} width={14} height={14} fill={COMPONENT_COLORS[key]} />
                    <text x={x + 20} y={y + 2} fontSize="11" fill="#334155">
                      {label}
                    </text>
                  </g>
                );
              });
            })()}
          </svg>
        </div>
      </section>

      {/* Equipment sizing implication */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Equipment sizing implication</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            The larger of the heating and cooling loads drives equipment selection. The Manual S
            tolerance applies on top: up to +15% for single-stage equipment and +25% for variable-speed
            equipment relative to the Manual J cooling load.
          </p>
        </header>
        <div className="overflow-hidden rounded-lg border border-ink-300 bg-white">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="w-1/3 bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Driving load
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {drivingLoad === 'heating'
                    ? `Heating dominates at ${nbsp(result.heatingLoadBtu)} BTU/hr (cooling is ${nbsp(result.coolingLoadTotalBtu)}). Equipment must deliver this heating load at the design temperature.`
                    : `Cooling dominates at ${nbsp(result.coolingLoadTotalBtu)} BTU/hr (heating is ${nbsp(result.heatingLoadBtu)}). Equipment AHRI capacity should be within Manual S tolerance of this number.`}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Recommended tonnage
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {result.recommendedCoolingTons} tons (
                  {nbsp(result.recommendedHeatingBtu)} BTU/hr nominal at AHRI 95°F outdoor / 80°F indoor
                  test condition)
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Manual S range
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {nbsp(Math.round(result.coolingLoadTotalBtu * 0.9))}–
                  {nbsp(Math.round(result.coolingLoadTotalBtu * 1.25))} BTU/hr (−10% / +25% of cooling load)
                </td>
              </tr>
              <tr>
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Heat pump suitability
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {drivingLoad === 'cooling' && result.loadRatio < 0.7
                    ? "Cooling-dominated climate — any heat pump (standard or CCASHP) handles the heating load with low aux runtime."
                    : drivingLoad === 'heating' && result.loadRatio > 1.5
                      ? "Heating-dominated cold climate — NEEP CCASHP certified equipment recommended to keep aux heat runtime low."
                      : "Balanced climate — both standard and CCASHP heat pumps work; CCASHP recommended in zones 5+."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Heating breakdown */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Heating load component breakdown</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Heat flows out of the conditioned space through every envelope surface and through air
            leaks. The table below shows BTU/hr loss through each pathway at the design heating
            temperature ({result.designConditions.heatingDesignTempF}°F outdoor, 70°F indoor, ΔT ={' '}
            {result.designConditions.heatingDeltaT}°F).
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Component
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Heat loss (BTU/hr)
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Share
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Formula
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Walls</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.heating.wallConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.heating.wallConductive / heatingTotal) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {nbsp(result.breakdown.envelope.wallNetArea)} ft² ÷ R-{result.breakdown.applied.wallRValue} × {result.designConditions.heatingDeltaT}°F
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Ceiling / roof</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.heating.ceilingConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.heating.ceilingConductive / heatingTotal) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {nbsp(result.breakdown.envelope.ceilingArea)} ft² ÷ R-{result.breakdown.applied.ceilingRValue} × {result.designConditions.heatingDeltaT}°F
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Floor</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.heating.floorConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.heating.floorConductive / heatingTotal) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {nbsp(result.breakdown.envelope.floorArea)} ft² ÷ R-{result.breakdown.applied.floorRValue || '0'} × ΔT × 0.5 ground-coupled factor
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Windows (conductive)</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.heating.windowConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.heating.windowConductive / heatingTotal) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {nbsp(result.breakdown.envelope.windowArea)} ft² × U-{result.breakdown.applied.windowUFactor} × {result.designConditions.heatingDeltaT}°F
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Infiltration (air leakage)</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.heating.infiltration)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.heating.infiltration / heatingTotal) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  0.018 × {nbsp(result.breakdown.envelope.volume)} ft³ × {result.breakdown.applied.achNatural} ACH × {result.designConditions.heatingDeltaT}°F
                </td>
              </tr>
              <tr className="bg-brand/10">
                <td className="px-4 py-2 font-bold text-ink-900">Total heating load</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  {nbsp(result.heatingLoadBtu)}
                </td>
                <td className="px-4 py-2 text-right font-bold text-ink-900">100%</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cooling breakdown */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Cooling load component breakdown</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Heat flows into the conditioned space through envelope, infiltration, solar radiation
            through windows, and internal heat from people and appliances. Design conditions:{' '}
            {result.designConditions.coolingDesignTempF}°F outdoor, 75°F indoor, ΔT ={' '}
            {result.designConditions.coolingDeltaT}°F.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Component
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Heat gain (BTU/hr)
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Share (of sensible)
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Walls</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.wallConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.wallConductive / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">Conductive through wall area</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Ceiling / roof</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.ceilingConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.ceilingConductive / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Includes attic temperature boost (~25°F hotter than outdoor)
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Floor</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.floorConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.floorConductive / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">Ground-coupled, much lower than walls</td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Windows (conductive)</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.windowConductive)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.windowConductive / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Conductive through glass; solar gain separately below
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Infiltration</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.infiltration)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.infiltration / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Hot outdoor air infiltrating through envelope leaks
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Solar gain through windows</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.solarGain)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.solarGain / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {nbsp(result.breakdown.envelope.windowArea)} ft² × SLF 65 × SHGC {result.breakdown.applied.windowSHGC}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Internal gain (people + appliances)</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.breakdown.cooling.internalGain)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700">
                  {Math.round((result.breakdown.cooling.internalGain / result.coolingLoadSensibleBtu) * 100)}%
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  {result.breakdown.applied.occupants} occupants × 600 BTU + 2,000 BTU baseline
                </td>
              </tr>
              <tr className="border-b-2 border-ink-300 bg-ink-100/50">
                <td className="px-4 py-2 font-semibold text-ink-900">Sensible cooling total</td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                  {nbsp(result.coolingLoadSensibleBtu)}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-ink-900">100%</td>
                <td></td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">+ Latent (humidity removal)</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(result.coolingLoadLatentBtu)}
                </td>
                <td className="px-4 py-2 text-right text-ink-700"></td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Zone {inputs.climateZone} latent factor (climate-dependent)
                </td>
              </tr>
              <tr className="bg-brand/10">
                <td className="px-4 py-2 font-bold text-ink-900">Total cooling load</td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  {nbsp(result.coolingLoadTotalBtu)}
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Applied envelope and design conditions */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Applied envelope and design conditions</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            The calculation used the following envelope characteristics and design temperatures. If
            your home's actual envelope differs (you've upgraded insulation, replaced windows, or
            had a blower-door test), use the advanced inputs to override the era defaults and
            recalculate.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-ink-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink-300 bg-ink-100">
                  <th colSpan={2} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                    Envelope (from {inputs.constructionEra} defaults)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Wall R-value</td><td className="px-4 py-2 text-right font-mono text-ink-900">R-{result.breakdown.applied.wallRValue}</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Ceiling R-value</td><td className="px-4 py-2 text-right font-mono text-ink-900">R-{result.breakdown.applied.ceilingRValue}</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Floor R-value</td><td className="px-4 py-2 text-right font-mono text-ink-900">R-{result.breakdown.applied.floorRValue}</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Window U-factor</td><td className="px-4 py-2 text-right font-mono text-ink-900">U-{result.breakdown.applied.windowUFactor}</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Window SHGC</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.breakdown.applied.windowSHGC.toFixed(2)}</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">ACH50 (blower door)</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.breakdown.applied.ach50}</td></tr>
                <tr><td className="px-4 py-2 text-ink-700">ACH natural (operating)</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.breakdown.applied.achNatural}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="overflow-hidden rounded-lg border border-ink-300">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-ink-300 bg-ink-100">
                  <th colSpan={2} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                    Design conditions (zone {inputs.climateZone})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Heating design temp (99%)</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.heatingDesignTempF}°F</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Cooling design temp (1%)</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.coolingDesignTempF}°F</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Indoor heating setpoint</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.indoorHeatingF}°F</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Indoor cooling setpoint</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.indoorCoolingF}°F</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Heating ΔT</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.heatingDeltaT}°F</td></tr>
                <tr className="border-b border-ink-100"><td className="px-4 py-2 text-ink-700">Cooling ΔT</td><td className="px-4 py-2 text-right font-mono text-ink-900">{result.designConditions.coolingDeltaT}°F</td></tr>
                <tr><td className="px-4 py-2 text-ink-700">Wall net area / Window area</td><td className="px-4 py-2 text-right font-mono text-ink-900">{nbsp(result.breakdown.envelope.wallNetArea)} / {nbsp(result.breakdown.envelope.windowArea)} ft²</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Caveats */}
      <section className="rounded-lg border-l-4 border-warn bg-warn/5 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn">
          What this calculator does NOT capture
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            <strong className="text-ink-900">Room-by-room loads.</strong> Real Manual J calculates
            each room separately, summing to whole-house. This calculator collapses to a single
            whole-house number — adequate for equipment sizing, not for duct design (Manual D needs
            per-room CFM).
          </li>
          <li>
            <strong className="text-ink-900">Per-orientation solar gain.</strong> Real Manual J
            distributes window solar load by orientation (north, south, east, west, with shading
            geometry). This calculator collapses to a single SLF representing a south-east mix.
          </li>
          <li>
            <strong className="text-ink-900">Duct losses to unconditioned space.</strong> The output
            is room-boundary load. If ducts run through an attic or crawlspace, add 15-30% for
            typical duct losses; sealed-and-insulated ducts lose 5-10%.
          </li>
          <li>
            <strong className="text-ink-900">Specific window orientation and shading geometry.</strong>{' '}
            A south-facing wall with proper overhangs admits much less summer sun than the same
            window without overhangs. Real Manual J accounts for overhangs and adjacent shading;
            this calculator does not.
          </li>
          <li>
            <strong className="text-ink-900">Manual J Section 8 detailed infiltration.</strong> This
            calculator uses ACH50 divided by 20 as the natural ACH. Real Manual J uses location-
            specific wind speed multipliers and stack-effect height adjustments. For a tight house
            (ACH50 ≤ 3) the simplification produces small error; for a leaky house (ACH50 ≥ 10) the
            calculator may over- or under-estimate by 10-20%.
          </li>
          <li>
            <strong className="text-ink-900">Permit-grade ACCA approval.</strong> This is
            planning-grade output. For permit applications, rebate documentation (HEEHRA, state
            energy programs), or contractor liability, use ACCA-approved software (Wrightsoft,
            Cool Calc, Elite, EnergyGauge) or hire a credentialed practitioner.
          </li>
        </ul>
      </section>
    </div>
  );
}
