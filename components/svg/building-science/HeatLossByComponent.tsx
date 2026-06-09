/**
 * Heat loss breakdown — horizontal bar chart showing the share of total
 * design heating load attributable to each envelope component in a typical
 * residential home. Used on /building-science/ to anchor the discussion of
 * why envelope choices matter for HVAC sizing.
 */
export function HeatLossByComponent() {
  const components = [
    {
      label: 'Air infiltration',
      pct: 25,
      color: '#dc2626',
      note: 'The biggest single lever in most pre-2000 homes',
    },
    {
      label: 'Windows',
      pct: 22,
      color: '#ea580c',
      note: 'U-factor × area; 25× worse per sqft than a R-20 wall',
    },
    {
      label: 'Walls',
      pct: 18,
      color: '#d97706',
      note: 'Larger surface area but lower U-factor than glass',
    },
    {
      label: 'Ceiling / attic',
      pct: 15,
      color: '#0891b2',
      note: 'Easiest envelope upgrade; usually R-30 → R-49',
    },
    {
      label: 'Duct losses (unconditioned space)',
      pct: 12,
      color: '#7c3aed',
      note: 'Leakage and conduction in attic or crawlspace runs',
    },
    {
      label: 'Floor (over crawlspace or unheated basement)',
      pct: 8,
      color: '#1e40af',
      note: 'Smaller share but matters in raised-foundation homes',
    },
  ];
  const W = 1000;
  const H = 380;
  const padL = 310;
  const padR = 90;
  const padT = 55;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / components.length;
  const xMin = 0;
  const xMax = 30;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [5, 10, 15, 20, 25];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="heat-loss-title heat-loss-desc"
        focusable="false"
      >
        <title id="heat-loss-title">Heat loss share by envelope component in a typical home</title>
        <desc id="heat-loss-desc">
          Horizontal bar chart showing the share of total design heating load contributed by each
          envelope component in a typical pre-2000 single-family home. Air infiltration is the
          largest at 25 percent, followed by windows at 22 percent, walls at 18 percent, ceiling
          and attic at 15 percent, duct losses in unconditioned space at 12 percent, and floor at
          8 percent.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Where heat loss happens — typical pre-2000 home
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
              {v}%
            </text>
          </g>
        ))}

        {/* Y-axis line */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#cbd5e1" strokeWidth="1" />

        {/* Bars */}
        {components.map((c, i) => {
          const y = padT + i * rowH + rowH * 0.16;
          const barH = rowH * 0.68;
          const x1 = xScale(0);
          const x2 = xScale(c.pct);
          const barW = x2 - x1;
          return (
            <g key={c.label}>
              <text
                x={padL - 12}
                y={y + barH / 2 + 4}
                fontSize="12"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {c.label}
              </text>
              <rect x={x1} y={y} width={barW} height={barH} fill={c.color} opacity="0.88" rx="4" />
              <text
                x={x2 + 8}
                y={y + barH / 2 + 4}
                fontSize="12"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="system-ui, sans-serif"
              >
                {c.pct}%
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
          Share of total design heating load
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Illustrative typical home built before 2000 (R-19 attic, R-13 walls, double-pane windows,
        7-10 ACH50 infiltration, partially-conditioned ductwork). Modern code-built homes shift
        more share to infiltration as envelope insulation improves. Source: ASHRAE Fundamentals
        2021 Ch. 17 (Residential Heating Loads), ACCA Manual J 8th Edition, DOE Building America
        program research on envelope contribution to design loads.
      </figcaption>
    </figure>
  );
}
