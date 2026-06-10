/**
 * Annual heating cost comparison: gas furnace vs heat pump tiers, across
 * four IECC climate zones. Grouped horizontal bars per zone show the
 * relative ranking that shifts with climate.
 */
export function HeatingCostByZone() {
  // Annual heating cost (USD) for a typical home, by climate zone, by system.
  // Calculated from typical zone annual load and 2024-2025 US average prices.
  const zones = [
    {
      zone: 'Zone 3 — Atlanta',
      load: 40,
      systems: [
        { name: 'Gas furnace 95%', cost: 547, color: '#d97706' },
        { name: 'Heat pump CCASHP', cost: 651, color: '#0e7490' },
        { name: 'Heat pump ENERGY STAR', cost: 767, color: '#0891b2' },
        { name: 'Heat pump fed-min', cost: 869, color: '#22d3ee' },
      ],
    },
    {
      zone: 'Zone 4 — Kansas City',
      load: 80,
      systems: [
        { name: 'Gas furnace 95%', cost: 1095, color: '#d97706' },
        { name: 'Heat pump CCASHP', cost: 1304, color: '#0e7490' },
        { name: 'Heat pump ENERGY STAR', cost: 1534, color: '#0891b2' },
        { name: 'Heat pump fed-min', cost: 1738, color: '#22d3ee' },
      ],
    },
    {
      zone: 'Zone 5 — Chicago',
      load: 120,
      systems: [
        { name: 'Gas furnace 95%', cost: 1642, color: '#d97706' },
        { name: 'Heat pump CCASHP', cost: 1956, color: '#0e7490' },
        { name: 'Heat pump ENERGY STAR', cost: 2302, color: '#0891b2' },
        { name: 'Heat pump fed-min', cost: 2607, color: '#22d3ee' },
      ],
    },
    {
      zone: 'Zone 6 — Minneapolis',
      load: 160,
      systems: [
        { name: 'Gas furnace 95%', cost: 2189, color: '#d97706' },
        { name: 'Heat pump CCASHP', cost: 2609, color: '#0e7490' },
        { name: 'Heat pump ENERGY STAR', cost: 3069, color: '#0891b2' },
        { name: 'Heat pump fed-min', cost: 3476, color: '#22d3ee' },
      ],
    },
  ];
  const W = 1000;
  const H = 540;
  const padL = 200;
  const padR = 80;
  const padT = 75;
  const padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const groupH = chartH / zones.length;
  const xMin = 0;
  const xMax = 4000;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [1000, 2000, 3000];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="hp-cost-title hp-cost-desc"
        focusable="false"
      >
        <title id="hp-cost-title">
          Annual heating cost by system type and climate zone
        </title>
        <desc id="hp-cost-desc">
          Grouped horizontal bar chart comparing annual heating cost for four system types
          across four climate zones. Within each zone the four bars represent, from cheapest
          to most expensive: 95 percent AFUE gas furnace, cold-climate heat pump, ENERGY STAR
          heat pump, and federal-minimum heat pump. Costs scale linearly with the annual
          heating load, which rises from 40 million BTU per year in zone 3 to 160 million BTU
          per year in zone 6.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Annual heating cost by system × climate zone
        </text>

        {/* Legend */}
        <g transform={`translate(${padL}, 44)`}>
          {[
            { name: '95% gas', color: '#d97706' },
            { name: 'CCASHP', color: '#0e7490' },
            { name: 'ENERGY STAR HP', color: '#0891b2' },
            { name: 'Fed-min HP', color: '#22d3ee' },
          ].map((g, i) => (
            <g key={g.name} transform={`translate(${i * 145}, 0)`}>
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
              ${(v / 1000).toFixed(1)}k
            </text>
          </g>
        ))}

        {/* Group bars per zone */}
        {zones.map((z, gi) => {
          const groupTop = padT + gi * groupH + 10;
          const barH = (groupH - 28) / z.systems.length;
          return (
            <g key={z.zone}>
              <text
                x={padL - 12}
                y={groupTop + groupH / 2 - 4}
                fontSize="12"
                fontWeight="700"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {z.zone}
              </text>
              <text
                x={padL - 12}
                y={groupTop + groupH / 2 + 12}
                fontSize="10"
                fill="#64748b"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {z.load} MMBTU/yr
              </text>
              {z.systems.map((s, si) => {
                const y = groupTop + si * barH;
                const x1 = xScale(0);
                const x2 = xScale(s.cost);
                return (
                  <g key={s.name}>
                    <rect
                      x={x1}
                      y={y + 2}
                      width={x2 - x1}
                      height={barH - 4}
                      fill={s.color}
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
                      ${s.cost.toLocaleString()}
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
          Annual heating cost (USD)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Computed at US 2024-2025 average prices ($0.163/kWh electricity, $1.30/therm natural
        gas). Local prices change the ranking — at $0.12/kWh, federal-minimum heat pumps beat
        95% gas across all zones; at $0.25/kWh, CCASHP is needed for heat pumps to beat gas in
        zones 5-6. Source: EIA Tables 5.6.A and Natural Gas Residential, ASHRAE climate data,
        IRS Section 25C heat-pump performance thresholds (FS-2025-05; HVAC scope expired Dec 31, 2025).
      </figcaption>
    </figure>
  );
}
