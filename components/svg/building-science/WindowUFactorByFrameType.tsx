/**
 * Window U-factor by frame type and glazing — horizontal bar chart showing
 * typical whole-window U-factor ranges for combinations of frame material
 * and glazing system. Used on /building-science/windows/.
 */
export function WindowUFactorByFrameType() {
  const rows = [
    { label: 'Aluminum frame, single-pane', low: 1.10, high: 1.30, color: '#991b1b' },
    { label: 'Aluminum frame, double-pane', low: 0.55, high: 0.75, color: '#dc2626' },
    { label: 'Wood frame, single-pane', low: 0.85, high: 1.05, color: '#ea580c' },
    { label: 'Vinyl frame, double-pane low-E', low: 0.27, high: 0.35, color: '#f59e0b' },
    { label: 'Wood frame, double-pane low-E', low: 0.28, high: 0.34, color: '#0891b2' },
    { label: 'Fiberglass frame, double-pane low-E argon', low: 0.22, high: 0.28, color: '#0e7490' },
    { label: 'Triple-pane low-E (any premium frame)', low: 0.15, high: 0.22, color: '#1e40af' },
  ];
  const W = 1000;
  const H = 400;
  const padL = 330;
  const padR = 100;
  const padT = 55;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / rows.length;
  const xMin = 0;
  const xMax = 1.4;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="window-u-title window-u-desc"
        focusable="false"
      >
        <title id="window-u-title">Typical whole-window U-factor by frame and glazing</title>
        <desc id="window-u-desc">
          Horizontal bar chart of whole-window U-factor ranges for seven common combinations of
          frame material and glazing system. Aluminum single-pane is worst at U 1.10 to 1.30.
          Triple-pane low-E in premium frames is best at U 0.15 to 0.22, an 8x improvement.
        </desc>

        <text x={padL} y={28} fontSize="15" fontWeight="700" fill="#0f172a" fontFamily="system-ui, sans-serif">
          Window U-factor by frame + glazing combination
        </text>

        {ticks.map((v) => (
          <g key={v}>
            <line x1={xScale(v)} y1={padT} x2={xScale(v)} y2={H - padB} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3" />
            <text x={xScale(v)} y={H - padB + 18} fontSize="11" fill="#64748b" textAnchor="middle" fontFamily="system-ui, sans-serif">
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#cbd5e1" strokeWidth="1" />

        {rows.map((r, i) => {
          const y = padT + i * rowH + rowH * 0.2;
          const barH = rowH * 0.6;
          const x1 = xScale(r.low);
          const x2 = xScale(r.high);
          const barW = Math.max(x2 - x1, 8);
          return (
            <g key={r.label}>
              <text x={padL - 12} y={y + barH / 2 + 4} fontSize="12" fill="#0f172a" textAnchor="end" fontFamily="system-ui, sans-serif">
                {r.label}
              </text>
              <rect x={x1} y={y} width={barW} height={barH} fill={r.color} opacity="0.88" rx="4" />
              <text x={x2 + 8} y={y + barH / 2 + 4} fontSize="11" fontWeight="600" fill="#334155" fontFamily="system-ui, sans-serif">
                {r.low.toFixed(2)}–{r.high.toFixed(2)}
              </text>
            </g>
          );
        })}

        <text x={padL + chartW / 2} y={H - padB + 38} fontSize="11" fill="#475569" textAnchor="middle" fontFamily="system-ui, sans-serif">
          Whole-window U-factor (BTU / h · ft² · °F) — lower is better
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Whole-window NFRC-certified U-factors for representative product combinations. Single-pane
        windows are no longer sold for residential new construction; values shown for retrofit
        context. ENERGY STAR Most Efficient program currently targets U ≤ 0.27 in northern zones,
        U ≤ 0.30 in central, U ≤ 0.40 in southern. Source: NFRC Energy Performance Labels, LBNL
        WINDOW database, ASHRAE Fundamentals 2021 Ch. 15 (Fenestration).
      </figcaption>
    </figure>
  );
}
