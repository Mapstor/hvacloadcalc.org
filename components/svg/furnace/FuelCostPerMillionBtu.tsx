/**
 * Cost per million BTU of delivered heat — horizontal bar chart.
 *
 * Compares the seven main US residential heating options at US 2024-2025
 * average fuel prices. Used on /furnace/ to give a visual anchor for the
 * fuel-cost section.
 */
export function FuelCostPerMillionBtu() {
  const rows = [
    { label: 'Natural gas (95% AFUE)', cost: 14, color: '#d97706', kind: 'fossil' },
    { label: 'Heat pump — CCASHP, HSPF2 10', cost: 16, color: '#0e7490', kind: 'heat-pump' },
    { label: 'Heat pump — ENERGY STAR, HSPF2 8.5', cost: 19, color: '#0891b2', kind: 'heat-pump' },
    { label: 'Heat pump — federal min, HSPF2 7.5', cost: 22, color: '#22d3ee', kind: 'heat-pump' },
    { label: 'Propane (95% AFUE)', cost: 33, color: '#ea580c', kind: 'fossil' },
    { label: 'Heating oil (85% AFUE)', cost: 33, color: '#dc2626', kind: 'fossil' },
    { label: 'Electric resistance', cost: 48, color: '#991b1b', kind: 'electric' },
  ];
  const W = 1000;
  const H = 420;
  const padL = 260;
  const padR = 80;
  const padT = 55;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / rows.length;
  const xMin = 0;
  const xMax = 55;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [10, 20, 30, 40, 50];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="fuel-cost-title fuel-cost-desc"
        focusable="false"
      >
        <title id="fuel-cost-title">
          Cost per million BTU of delivered heat, by fuel and system type
        </title>
        <desc id="fuel-cost-desc">
          Horizontal bar chart comparing seven residential heating options at US 2024-2025 average
          fuel prices. Natural gas at 95% AFUE is cheapest at $14 per million BTU. Cold-climate
          heat pumps follow at $16, then ENERGY STAR heat pumps at $19, federal-minimum heat pumps
          at $22, propane and heating oil at $33, and electric resistance at $48 per million BTU.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Cost per million BTU delivered — US 2024-2025 averages
        </text>

        {/* X grid + ticks */}
        {ticks.map((v) => (
          <g key={v}>
            <line
              x1={xScale(v)}
              y1={padT}
              x2={xScale(v)}
              y2={H - padB}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <text
              x={xScale(v)}
              y={H - padB + 18}
              fontSize="11"
              fill="#64748b"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              ${v}
            </text>
          </g>
        ))}

        {/* Y-axis line */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#cbd5e1" strokeWidth="1" />

        {/* Bars */}
        {rows.map((r, i) => {
          const y = padT + i * rowH + rowH * 0.2;
          const barH = rowH * 0.6;
          const x1 = xScale(0);
          const x2 = xScale(r.cost);
          const barW = x2 - x1;
          return (
            <g key={r.label}>
              <text
                x={padL - 12}
                y={y + barH / 2 + 4}
                fontSize="12"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {r.label}
              </text>
              <rect x={x1} y={y} width={barW} height={barH} fill={r.color} opacity="0.88" rx="4" />
              <text
                x={x2 + 8}
                y={y + barH / 2 + 4}
                fontSize="12"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="system-ui, sans-serif"
              >
                ${r.cost}
              </text>
            </g>
          );
        })}

        {/* Axis title */}
        <text
          x={padL + chartW / 2}
          y={H - padB + 40}
          fontSize="11"
          fill="#475569"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Cost per million BTU of delivered heat (USD)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        At US 2024-2025 averages: electricity $0.163/kWh, natural gas $1.30/therm, propane
        $2.85/gallon, heating oil $3.85/gallon. Local prices change the ranking — see the
        regional discussion below. Sources: EIA Table 5.6.A residential electricity prices,
        EIA residential natural-gas prices, EIA propane and heating-oil weekly survey.
      </figcaption>
    </figure>
  );
}
