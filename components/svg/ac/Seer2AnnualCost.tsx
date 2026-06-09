/**
 * SEER2 efficiency tier vs annual cooling cost — grouped horizontal bars
 * comparing four efficiency tiers across a hot-climate and a mild-climate
 * reference city.
 */
export function Seer2AnnualCost() {
  // Annual cooling cost for a 3-ton install at 75% load factor.
  // Calculated as: (3 tons × 12000 BTU/hr) × (hours) × (load factor) / (SEER2)
  //   = annual kWh, then × local rate.
  // Phoenix: 2800 hours @ $0.135/kWh, Kansas City: 1200 hours @ $0.125/kWh.
  const cities = [
    {
      city: 'Phoenix (2,800 cooling hours)',
      rate: '$0.135/kWh',
      tiers: [
        { name: 'Federal min', seer: 14.3, kwh: 5283, cost: 713, color: '#dc2626' },
        { name: 'Mid-tier', seer: 16.0, kwh: 4725, cost: 638, color: '#f59e0b' },
        { name: 'ENERGY STAR', seer: 18.0, kwh: 4200, cost: 567, color: '#0e7490' },
        { name: 'Top inverter', seer: 22.0, kwh: 3436, cost: 464, color: '#0891b2' },
      ],
    },
    {
      city: 'Kansas City (1,200 cooling hours)',
      rate: '$0.125/kWh',
      tiers: [
        { name: 'Federal min', seer: 14.3, kwh: 2264, cost: 283, color: '#dc2626' },
        { name: 'Mid-tier', seer: 16.0, kwh: 2025, cost: 253, color: '#f59e0b' },
        { name: 'ENERGY STAR', seer: 18.0, kwh: 1800, cost: 225, color: '#0e7490' },
        { name: 'Top inverter', seer: 22.0, kwh: 1473, cost: 184, color: '#0891b2' },
      ],
    },
  ];
  const W = 1000;
  const H = 460;
  const padL = 200;
  const padR = 80;
  const padT = 75;
  const padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupH = chartH / cities.length;
  const xMin = 0;
  const xMax = 850;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [200, 400, 600, 800];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="seer-cost-title seer-cost-desc"
        focusable="false"
      >
        <title id="seer-cost-title">
          Annual cooling cost by SEER2 tier and climate
        </title>
        <desc id="seer-cost-desc">
          Grouped horizontal bar chart comparing annual cooling cost for four SEER2 efficiency
          tiers across two climates. In hot Phoenix the federal-minimum 14.3 SEER2 costs $713
          per year while a 22 SEER2 inverter costs $464. In mild Kansas City the same tiers
          cost $283 and $184 respectively. The efficiency premium pays back fast in long-runtime
          climates and slowly in short-runtime climates.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Annual cooling cost by SEER2 tier — 3-ton install
        </text>

        {/* Legend */}
        <g transform={`translate(${padL}, 44)`}>
          {[
            { name: 'Fed-min (14.3)', color: '#dc2626' },
            { name: 'Mid (16)', color: '#f59e0b' },
            { name: 'ENERGY STAR (18)', color: '#0e7490' },
            { name: 'Top inv. (22)', color: '#0891b2' },
          ].map((g, i) => (
            <g key={g.name} transform={`translate(${i * 155}, 0)`}>
              <rect width="12" height="12" fill={g.color} opacity="0.88" rx="2" />
              <text
                x="18"
                y="10"
                fontSize="11"
                fill="#475569"
                fontFamily="system-ui, sans-serif"
              >
                {g.name}
              </text>
            </g>
          ))}
        </g>

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

        {/* Group bars per city */}
        {cities.map((c, gi) => {
          const groupTop = padT + gi * groupH + 10;
          const barH = (groupH - 28) / c.tiers.length;
          return (
            <g key={c.city}>
              <text
                x={padL - 12}
                y={groupTop + groupH / 2 - 4}
                fontSize="12"
                fontWeight="700"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {c.city}
              </text>
              <text
                x={padL - 12}
                y={groupTop + groupH / 2 + 12}
                fontSize="10"
                fill="#64748b"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {c.rate}
              </text>
              {c.tiers.map((t, ti) => {
                const y = groupTop + ti * barH;
                const x1 = xScale(0);
                const x2 = xScale(t.cost);
                return (
                  <g key={t.name}>
                    <rect
                      x={x1}
                      y={y + 2}
                      width={x2 - x1}
                      height={barH - 4}
                      fill={t.color}
                      opacity="0.88"
                      rx="2"
                    />
                    <text
                      x={x2 + 6}
                      y={y + barH / 2 + 4}
                      fontSize="11"
                      fontWeight="600"
                      fill="#0f172a"
                      fontFamily="system-ui, sans-serif"
                    >
                      ${t.cost}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* Axis title */}
        <text
          x={padL + chartW / 2}
          y={H - padB + 38}
          fontSize="11"
          fill="#475569"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Annual cooling cost (USD)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Same 3-ton equipment, same 75% load factor, same household — runtime and local
        electricity rate drive the absolute numbers. The Phoenix-to-Kansas-City gap of $250-540
        per year per tier explains why the inverter premium pays back fast in long-runtime
        climates and slowly in short-runtime climates. Source: AHRI 210/240-2023 efficiency
        ratings, EIA Table 5.6.A residential electricity prices, ASHRAE climate data.
      </figcaption>
    </figure>
  );
}
