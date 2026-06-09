/**
 * DOE recommended attic R-value by IECC climate zone — horizontal bars
 * showing the low and high end of the DOE recommended R-value range per
 * zone. Used on /tools/attic-r-value-calculator/ and
 * /building-science/insulation/.
 */
export function DoeRValueByZone() {
  const zones = [
    { zone: 'Zone 1 — South Florida, Hawaii', low: 30, high: 49, color: '#dc2626' },
    { zone: 'Zone 2 — Gulf Coast, lower south', low: 30, high: 49, color: '#ea580c' },
    { zone: 'Zone 3 — Mid-south', low: 30, high: 49, color: '#f59e0b' },
    { zone: 'Zone 4 — Mid-Atlantic, Ohio Valley', low: 38, high: 60, color: '#84cc16' },
    { zone: 'Zone 5 — Northern states', low: 49, high: 60, color: '#06b6d4' },
    { zone: 'Zone 6 — Northern MW, Rockies', low: 49, high: 60, color: '#0ea5e9' },
    { zone: 'Zone 7 — Northern MN, mountain west', low: 49, high: 60, color: '#3b82f6' },
    { zone: 'Zone 8 — Interior Alaska', low: 60, high: 60, color: '#6366f1' },
  ];
  const W = 1000;
  const H = 460;
  const padL = 280;
  const padR = 80;
  const padT = 55;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / zones.length;
  const xMin = 0;
  const xMax = 75;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [10, 20, 30, 40, 50, 60, 70];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="doe-r-title doe-r-desc"
        focusable="false"
      >
        <title id="doe-r-title">DOE recommended attic R-value by IECC climate zone</title>
        <desc id="doe-r-desc">
          Horizontal bar chart showing DOE recommended attic insulation R-value ranges by climate
          zone. Zones 1 through 3 (south) target R-30 to R-49. Zone 4 (mixed) targets R-38 to
          R-60. Zones 5 through 7 (cold) target R-49 to R-60. Zone 8 (very cold) targets R-60.
        </desc>

        <text x={padL} y={28} fontSize="15" fontWeight="700" fill="#0f172a" fontFamily="system-ui, sans-serif">
          DOE recommended attic R-value — by IECC climate zone
        </text>

        {ticks.map((v) => (
          <g key={v}>
            <line x1={xScale(v)} y1={padT} x2={xScale(v)} y2={H - padB} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
            <text x={xScale(v)} y={H - padB + 18} fontSize="11" fill="#64748b" textAnchor="middle" fontFamily="system-ui, sans-serif">
              R-{v}
            </text>
          </g>
        ))}

        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#cbd5e1" strokeWidth="1" />

        {zones.map((z, i) => {
          const y = padT + i * rowH + rowH * 0.2;
          const barH = rowH * 0.6;
          const x1 = xScale(z.low);
          const x2 = xScale(z.high);
          const barW = Math.max(x2 - x1, 8);
          const label = z.low === z.high ? `R-${z.low}` : `R-${z.low} to R-${z.high}`;
          return (
            <g key={z.zone}>
              <text x={padL - 12} y={y + barH / 2 + 4} fontSize="12" fill="#0f172a" textAnchor="end" fontFamily="system-ui, sans-serif">
                {z.zone}
              </text>
              <rect x={x1} y={y} width={barW} height={barH} fill={z.color} opacity="0.88" rx="4" />
              <text x={x2 + 8} y={y + barH / 2 + 4} fontSize="11" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">
                {label}
              </text>
            </g>
          );
        })}

        <text x={padL + chartW / 2} y={H - padB + 38} fontSize="11" fill="#475569" textAnchor="middle" fontFamily="system-ui, sans-serif">
          R-value (h·ft²·°F / BTU)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        DOE / ENERGY STAR recommended attic R-value ranges for new and existing residential
        construction. Lower end of each range corresponds to existing-home retrofit
        recommendations; upper end corresponds to new construction targets and ENERGY STAR
        Northern Climate specifications. Source: US Department of Energy "Insulation:
        Recommended R-Values for Existing Homes by ZIP Code"; IECC 2021 Table R402.1.2;
        ENERGY STAR Northern Climate program.
      </figcaption>
    </figure>
  );
}
