'use client';

import type { BtuResult as BtuResultType, BtuInputs } from '@/lib/calculators/btu';

interface Props {
  result: BtuResultType;
  inputs: BtuInputs;
}

const EQUIPMENT_CLASS_INFO: Record<
  BtuResultType['suggestedEquipmentClass'],
  { label: string; tagline: string; rangeText: string; details: string }
> = {
  window: {
    label: 'Window air conditioner',
    tagline: 'The simplest, cheapest option',
    rangeText: '5,000 – 10,000 BTU/hr typical',
    details:
      "Window units fit standard double-hung openings, install in 30 minutes without an HVAC contractor, and cost $200–$500 retail. They serve a single room well, but cannot duct conditioned air to other spaces and the visible appliance protrudes from the window frame.",
  },
  'window-or-portable': {
    label: 'Window unit or portable AC',
    tagline: 'Two viable form factors at this size',
    rangeText: '10,000 – 14,000 BTU/hr',
    details:
      "Window units beat portables on efficiency at this size (CEER 11+ vs ~9 for portables) because portables exhaust hot air through a flexible duct that pulls already-cooled room air outside as a side effect. If a window mount is impractical (rented apartment, casement window, historic preservation), a portable handles the room; otherwise the window unit is the better unit-for-unit choice.",
  },
  'mini-split-or-window': {
    label: 'Ductless mini-split or large window unit',
    tagline: 'The size where mini-split starts making sense',
    rangeText: '14,000 – 18,000 BTU/hr',
    details:
      "At 18,000 BTU/hr, the size pushes window AC offerings to their high end. A single-zone mini-split delivers the same capacity at SEER2 20+ (vs SEER2 14 for a window unit), runs quieter, and serves the room aesthetically rather than blocking a window. The trade-off is installation: a mini-split needs a licensed HVAC contractor and $3,000–$5,000 of labor and equipment versus $500–$800 for a window unit.",
  },
  central: {
    label: 'Central AC or multi-zone mini-split',
    tagline: 'Whole-house or multi-room territory',
    rangeText: '18,000+ BTU/hr (1.5+ tons)',
    details:
      "At this size you're sizing for whole-house cooling, multiple rooms, or a single very large space. Central AC requires existing ductwork; mini-splits skip the ductwork at the cost of one indoor head per zone. For whole-house planning, run the Manual J load calculator — the BTU calculator approximates but a full Manual J accounts for room-by-room loads, infiltration, and orientation that affect whole-house sizing more than single-room sizing.",
  },
};

const STANDARD_SIZES = [
  { btu: 5000, label: '5k', cls: 'window' },
  { btu: 6000, label: '6k', cls: 'window' },
  { btu: 8000, label: '8k', cls: 'window' },
  { btu: 10000, label: '10k', cls: 'window-or-portable' },
  { btu: 12000, label: '12k', cls: 'window-or-portable' },
  { btu: 14000, label: '14k', cls: 'mini-split-or-window' },
  { btu: 18000, label: '18k', cls: 'mini-split-or-window' },
  { btu: 24000, label: '24k', cls: 'central' },
  { btu: 30000, label: '30k', cls: 'central' },
  { btu: 36000, label: '36k', cls: 'central' },
  { btu: 48000, label: '48k', cls: 'central' },
  { btu: 60000, label: '60k', cls: 'central' },
] as const;

const CLASS_COLORS: Record<string, { bg: string; bgSolid: string }> = {
  window: { bg: 'rgba(34,211,238,0.10)', bgSolid: '#22d3ee' },
  'window-or-portable': { bg: 'rgba(8,145,178,0.10)', bgSolid: '#0891b2' },
  'mini-split-or-window': { bg: 'rgba(124,58,237,0.10)', bgSolid: '#7c3aed' },
  central: { bg: 'rgba(30,64,175,0.12)', bgSolid: '#1e40af' },
};

function nbsp(n: number): string {
  return n.toLocaleString();
}

export function BtuResult({ result, inputs }: Props) {
  const eqClass = EQUIPMENT_CLASS_INFO[result.suggestedEquipmentClass];
  const btuPerSqftEffective = (result.rawCalculatedBtu / inputs.squareFootage).toFixed(1);
  const kWcooling = (result.recommendedBtu / 3412).toFixed(2);

  // SVG geometry for the equipment number line
  const svgWidth = 880;
  const svgHeight = 220;
  const padL = 50;
  const padR = 30;
  const lineY = 110;
  const usableW = svgWidth - padL - padR;
  const minBtu = 5000;
  const maxBtu = 60000;
  const xForBtu = (btu: number) =>
    padL + ((Math.max(minBtu, Math.min(maxBtu, btu)) - minBtu) / (maxBtu - minBtu)) * usableW;

  const equipmentBands = [
    { from: 5000, to: 10000, cls: 'window' },
    { from: 10000, to: 14000, cls: 'window-or-portable' },
    { from: 14000, to: 18000, cls: 'mini-split-or-window' },
    { from: 18000, to: 60000, cls: 'central' },
  ];

  const recX = xForBtu(result.recommendedBtu);
  const rangeLowX = xForBtu(result.acceptableRange.low);
  const rangeHighX = xForBtu(Math.min(result.acceptableRange.high, maxBtu));

  return (
    <div className="not-prose space-y-10">
      {/* Hero */}
      <section className="rounded-xl border-2 border-brand bg-brand/5 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Recommended cooling capacity
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-5xl font-bold text-ink-900 sm:text-6xl">
            {nbsp(result.recommendedBtu)}
          </p>
          <p className="text-2xl font-semibold text-ink-700">BTU/hr</p>
          <p className="text-lg text-ink-500">
            ≈ {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'} · {kWcooling} kW
          </p>
        </div>
        <p className="mt-4 max-w-prose text-base text-ink-700">
          That number is the rate at which the AC must remove heat from the space at peak summer
          conditions. A {nbsp(result.recommendedBtu)} BTU/hr unit moves the same amount of heat per
          hour as it would take to melt about {(result.recommendedBtu / 144).toFixed(1)} lb of ice
          per hour — the "ton" unit comes from exactly that physics, with 1 ton = 12,000 BTU/hr =
          melting 2,000 lb of ice in 24 hours.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Raw calculation
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{nbsp(result.rawCalculatedBtu)}</p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr before rounding to nearest standard equipment size
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Acceptable range
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">
              {nbsp(result.acceptableRange.low)}–{nbsp(result.acceptableRange.high)}
            </p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr (within Manual S tolerance, −10% / +20%)
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              BTU per sq ft
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{btuPerSqftEffective}</p>
            <p className="mt-1 text-xs text-ink-700">
              For your {nbsp(inputs.squareFootage)} sq ft input (US average is 22 BTU/sq ft at zone 4)
            </p>
          </div>
        </div>
      </section>

      {/* Equipment number line SVG */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Where your size lands on the equipment scale</h3>
          <p className="mt-1 text-sm text-ink-700">
            The horizontal bar below maps standard residential equipment sizes from window units on
            the left to whole-house central AC on the right. Your recommended capacity sits in the
            highlighted region; the shaded band shows the acceptable range Manual S tolerates.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300 bg-white p-4">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-full"
            role="img"
            aria-labelledby="btu-line-title btu-line-desc"
          >
            <title id="btu-line-title">Equipment size number line</title>
            <desc id="btu-line-desc">
              Horizontal scale of standard residential AC sizes from 5,000 to 60,000 BTU/hr with
              equipment-class color bands and the recommended size marked.
            </desc>

            {/* Equipment class bands */}
            {equipmentBands.map((band) => {
              const x1 = xForBtu(band.from);
              const x2 = xForBtu(band.to);
              const colors = CLASS_COLORS[band.cls];
              return (
                <rect
                  key={band.cls}
                  x={x1}
                  y={lineY - 18}
                  width={x2 - x1}
                  height={36}
                  fill={colors.bg}
                  stroke={colors.bgSolid}
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />
              );
            })}

            {/* Acceptable range band */}
            <rect
              x={rangeLowX}
              y={lineY - 30}
              width={rangeHighX - rangeLowX}
              height={60}
              fill="rgba(217,119,6,0.12)"
              stroke="#d97706"
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />
            <text
              x={(rangeLowX + rangeHighX) / 2}
              y={lineY - 36}
              textAnchor="middle"
              fontSize="11"
              fill="#d97706"
              fontWeight={600}
            >
              Acceptable range
            </text>

            {/* Standard size ticks */}
            {STANDARD_SIZES.map((s) => {
              const x = xForBtu(s.btu);
              return (
                <g key={s.btu}>
                  <line
                    x1={x}
                    y1={lineY - 18}
                    x2={x}
                    y2={lineY + 18}
                    stroke="#64748b"
                    strokeWidth={1}
                  />
                  <text
                    x={x}
                    y={lineY + 32}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#475569"
                  >
                    {s.label}
                  </text>
                </g>
              );
            })}

            {/* User's recommendation marker */}
            <g>
              <line
                x1={recX}
                y1={lineY - 40}
                x2={recX}
                y2={lineY + 40}
                stroke="#1e40af"
                strokeWidth={3}
              />
              <circle cx={recX} cy={lineY} r={9} fill="#1e40af" />
              <text
                x={recX}
                y={lineY - 50}
                textAnchor="middle"
                fontSize="13"
                fontWeight={700}
                fill="#1e40af"
              >
                {nbsp(result.recommendedBtu)} BTU/hr
              </text>
            </g>

            {/* Class labels */}
            <g fontSize="10" fill="#64748b">
              <text x={xForBtu(7500)} y={lineY + 56} textAnchor="middle">
                Window AC
              </text>
              <text x={xForBtu(12000)} y={lineY + 56} textAnchor="middle">
                Window / portable
              </text>
              <text x={xForBtu(16000)} y={lineY + 56} textAnchor="middle">
                Mini-split / window
              </text>
              <text x={xForBtu(40000)} y={lineY + 56} textAnchor="middle">
                Central AC / multi-zone
              </text>
            </g>

            {/* Axis labels */}
            <text x={padL} y={svgHeight - 8} fontSize="10" fill="#94a3b8">
              5,000 BTU/hr
            </text>
            <text x={svgWidth - padR} y={svgHeight - 8} fontSize="10" fill="#94a3b8" textAnchor="end">
              60,000 BTU/hr
            </text>
          </svg>
        </div>
      </section>

      {/* Equipment class recommendation */}
      <section>
        <header className="mb-4">
          <h3 className="text-lg font-bold text-ink-900">
            Equipment class for {nbsp(result.recommendedBtu)} BTU/hr
          </h3>
          <p className="mt-1 text-sm text-ink-700">
            At this capacity the practical equipment options narrow to a specific class. Here is
            what that class actually looks like and where its trade-offs land.
          </p>
        </header>
        <div className="rounded-lg border border-ink-300 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            {eqClass.tagline}
          </p>
          <p className="mt-2 text-2xl font-bold text-ink-900">{eqClass.label}</p>
          <p className="mt-1 text-sm text-ink-500">{eqClass.rangeText}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-700">{eqClass.details}</p>
        </div>
      </section>

      {/* Standard sizes table */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Standard equipment sizes and where yours falls</h3>
          <p className="mt-1 text-sm text-ink-700">
            Residential AC equipment is manufactured in fixed BTU/hr increments, not continuous
            sizes. Rounding the raw calculation ({nbsp(result.rawCalculatedBtu)} BTU/hr) to the
            nearest standard size gives you the actual equipment you can buy.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Standard size
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  BTU/hr
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Tons
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Equipment class
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {STANDARD_SIZES.map((s) => {
                const isYours = s.btu === result.recommendedBtu;
                const inRange =
                  s.btu >= result.acceptableRange.low && s.btu <= result.acceptableRange.high;
                return (
                  <tr
                    key={s.btu}
                    className={`border-b border-ink-100 ${isYours ? 'bg-brand/10 font-semibold' : ''}`}
                  >
                    <td className="px-4 py-2 text-ink-900">
                      {nbsp(s.btu)} BTU/hr
                    </td>
                    <td className="px-4 py-2 text-right text-ink-900">{nbsp(s.btu)}</td>
                    <td className="px-4 py-2 text-right text-ink-700">
                      {(s.btu / 12000).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-ink-700">
                      {EQUIPMENT_CLASS_INFO[s.cls as keyof typeof EQUIPMENT_CLASS_INFO].label}
                    </td>
                    <td className="px-4 py-2 text-xs">
                      {isYours ? (
                        <span className="rounded bg-brand px-2 py-0.5 font-semibold text-white">
                          Recommended
                        </span>
                      ) : inRange ? (
                        <span className="text-warn">In acceptable range</span>
                      ) : (
                        <span className="text-ink-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Math breakdown */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">How the {nbsp(result.recommendedBtu)} BTU/hr number was computed</h3>
          <p className="mt-1 text-sm text-ink-700">
            The calculator multiplies a baseline (22 BTU per sq ft at zone 4, average insulation,
            8-ft ceilings, normal occupancy) by climate, ceiling, sun, insulation, and space-type
            factors, then adds adjustments for extra occupants and kitchen use. Each step is shown
            below so you can re-run the math by hand or adjust an input and predict the result.
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
                <td className="px-4 py-2 text-ink-700">× Climate factor (zone {inputs.climateZone})</td>
                <td className="px-4 py-2 text-right text-ink-900"></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  × {result.breakdown.climateFactor}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Ceiling factor ({inputs.ceilingHeight} ft)</td>
                <td className="px-4 py-2 text-right text-ink-900"></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  × {result.breakdown.ceilingFactor}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Sun factor ({inputs.sunExposure})</td>
                <td className="px-4 py-2 text-right text-ink-900"></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  × {result.breakdown.sunFactor}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Insulation factor ({inputs.insulationLevel})</td>
                <td className="px-4 py-2 text-right text-ink-900"></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  × {result.breakdown.insulationFactor}
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-700">× Space-type factor ({inputs.spaceType ?? 'bedroom'})</td>
                <td className="px-4 py-2 text-right text-ink-900"></td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  × {result.breakdown.spaceTypeFactor}
                </td>
              </tr>
              <tr className="border-b-2 border-ink-300 bg-ink-100/50">
                <td className="px-4 py-2 font-semibold text-ink-900">Multiplicative subtotal</td>
                <td className="px-4 py-2 text-right text-ink-700"></td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                  = {nbsp(result.breakdown.multiplicativeSubtotal)} BTU
                </td>
              </tr>
              {result.breakdown.occupancyAdjustment > 0 ? (
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">
                    + Occupancy adjustment ({inputs.occupants} occupants, +600 BTU per person above 2)
                  </td>
                  <td className="px-4 py-2 text-right text-ink-900"></td>
                  <td className="px-4 py-2 text-right font-mono text-ink-900">
                    + {nbsp(result.breakdown.occupancyAdjustment)} BTU
                  </td>
                </tr>
              ) : null}
              {result.breakdown.kitchenAdjustment > 0 ? (
                <tr className="border-b border-ink-100">
                  <td className="px-4 py-2 text-ink-700">+ Kitchen adjustment (cooking heat gain)</td>
                  <td className="px-4 py-2 text-right text-ink-900"></td>
                  <td className="px-4 py-2 text-right font-mono text-ink-900">
                    + {nbsp(result.breakdown.kitchenAdjustment)} BTU
                  </td>
                </tr>
              ) : null}
              <tr className="border-b-2 border-ink-300 bg-ink-100/50">
                <td className="px-4 py-2 font-semibold text-ink-900">Raw calculation</td>
                <td className="px-4 py-2 text-right text-ink-700"></td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                  = {nbsp(result.breakdown.finalRaw)} BTU
                </td>
              </tr>
              <tr className="bg-brand/10">
                <td className="px-4 py-2 font-bold text-ink-900">
                  Rounded to nearest standard equipment size
                </td>
                <td className="px-4 py-2 text-right text-ink-700"></td>
                <td className="px-4 py-2 text-right font-mono font-bold text-brand">
                  = {nbsp(result.recommendedBtu)} BTU/hr
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Caveats */}
      <section className="rounded-lg border-l-4 border-warn bg-warn/5 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn">
          What this calculator does NOT account for
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            <strong className="text-ink-900">Air leakage by measurement.</strong> The "insulation
            level" input lumps insulation and infiltration together. A house tested at 12 ACH50
            on a blower door performs differently than a 4 ACH50 house even with the same wall and
            attic R-values; the calculator cannot distinguish without the test data.
          </li>
          <li>
            <strong className="text-ink-900">Specific window orientation.</strong> "Sun exposure"
            is a coarse three-way input. A south-facing wall of single-pane glass produces very
            different load than the same square footage of triple-pane north-facing glass, and the
            calculator averages across orientations.
          </li>
          <li>
            <strong className="text-ink-900">Duct losses to unconditioned space.</strong> A central
            AC with leaky attic ducts loses 20–30% of supply air before it reaches the room. The
            calculator output is the load at the room boundary; for whole-house central AC sizing
            the duct system condition matters separately.
          </li>
          <li>
            <strong className="text-ink-900">Latent vs sensible split.</strong> The output is total
            cooling capacity. In humid climates the AC also has to remove water vapor (latent load),
            which is sized via sensible heat ratio at equipment-selection time. For whole-house
            humid-climate sizing, the AC size calculator framing handles this; the BTU calculator
            does not separate sensible and latent.
          </li>
          <li>
            <strong className="text-ink-900">Internal heat gain from specific appliances.</strong>{' '}
            Multiple gaming computers running 24/7, server racks, professional cooking ranges, or
            grow lights add load above the calculator's defaults. For unusual loads, add 1,500–3,500
            BTU/hr per kilowatt of continuous electrical input.
          </li>
        </ul>
        <p className="mt-4 text-sm text-ink-700">
          For permit-grade sizing — for example, when a contractor must size equipment for a new
          install or a rebate program requires Manual J documentation — use the{' '}
          <a href="/tools/manual-j-calculator/" className="font-medium text-brand hover:underline">
            Manual J load calculator
          </a>{' '}
          or hire a credentialed practitioner using ACCA-approved software.
        </p>
      </section>
    </div>
  );
}
