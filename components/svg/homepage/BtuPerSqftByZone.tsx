/**
 * Homepage feature chart — cooling BTU per square foot, by IECC climate zone.
 *
 * Hand-built SVG. Data is illustrative of the typical planning-grade range
 * used in ACCA Manual J 8th and ASHRAE Fundamentals 2021. The full
 * methodology and worked examples live on /ac/btu/chart/.
 */
export function BtuPerSqftByZone() {
  const zones = [
    { zone: '1', label: 'Zone 1 — Miami, S. Florida', low: 25, high: 35, color: '#dc2626' },
    { zone: '2', label: 'Zone 2 — Houston, Gulf Coast', low: 22, high: 32, color: '#ea580c' },
    { zone: '3', label: 'Zone 3 — Atlanta, Mid-South', low: 18, high: 28, color: '#f59e0b' },
    { zone: '4', label: 'Zone 4 — St. Louis, Mid-Atlantic', low: 16, high: 26, color: '#84cc16' },
    { zone: '5', label: 'Zone 5 — Chicago, Boston', low: 14, high: 24, color: '#06b6d4' },
    { zone: '6', label: 'Zone 6 — Minneapolis, Denver', low: 12, high: 22, color: '#0ea5e9' },
    { zone: '7', label: 'Zone 7 — Duluth, Anchorage', low: 10, high: 20, color: '#3b82f6' },
    { zone: '8', label: 'Zone 8 — Interior Alaska', low: 8, high: 18, color: '#6366f1' },
  ];
  const W = 1000;
  const H = 460;
  const padL = 220;
  const padR = 70;
  const padT = 55;
  const padB = 50;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / zones.length;
  const xMin = 5;
  const xMax = 40;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="btu-zone-title btu-zone-desc"
        focusable="false"
      >
        <title id="btu-zone-title">
          Cooling BTU per square foot by IECC climate zone
        </title>
        <desc id="btu-zone-desc">
          Horizontal bar chart showing planning-grade BTU per square foot ranges for
          residential cooling across IECC climate zones 1 through 8. Zone 1 (Miami)
          ranges from 25 to 35 BTU per square foot, decreasing through colder zones
          to zone 8 (interior Alaska) at 8 to 18 BTU per square foot.
        </desc>

        {/* Chart title */}
        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Cooling BTU per square foot — by IECC climate zone
        </text>

        {/* X-axis grid + ticks */}
        {[10, 15, 20, 25, 30, 35].map((v) => (
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
              {v}
            </text>
          </g>
        ))}

        {/* Y-axis line */}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={H - padB}
          stroke="#cbd5e1"
          strokeWidth="1"
        />

        {/* Bars + labels */}
        {zones.map((z, i) => {
          const y = padT + i * rowH + rowH * 0.18;
          const barH = rowH * 0.64;
          const x1 = xScale(z.low);
          const x2 = xScale(z.high);
          const barW = x2 - x1;
          return (
            <g key={z.zone}>
              <text
                x={padL - 12}
                y={y + barH / 2 + 4}
                fontSize="12"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {z.label}
              </text>
              <rect
                x={x1}
                y={y}
                width={barW}
                height={barH}
                fill={z.color}
                opacity="0.85"
                rx="4"
              />
              <text
                x={x2 + 8}
                y={y + barH / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill="#334155"
                fontFamily="system-ui, sans-serif"
              >
                {z.low}–{z.high}
              </text>
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
          BTU per square foot (cooling, planning-grade range)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Planning-grade ranges. Lower end = tight envelope (R-49 attic, low-E
        windows, 3 ACH50); upper end = leaky pre-1980 envelope (R-13 attic,
        single-pane, 10+ ACH50). Source: ACCA Manual J 8th + ASHRAE Fundamentals 2021
        + IECC 2021 climate zone definitions.
      </figcaption>
    </figure>
  );
}
