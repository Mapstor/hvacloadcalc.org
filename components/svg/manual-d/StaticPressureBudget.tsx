/**
 * Manual D static pressure budget breakdown — horizontal stacked bar
 * showing how a typical 0.50 in. wc Total External Static Pressure (TESP)
 * gets allocated across fixed losses, leaving the remaining budget for the
 * duct system itself.
 */
export function StaticPressureBudget() {
  // Supply (0.03) and return (0.03) grilles combined into one segment so the
  // label doesn't collide with its neighbor at the narrow ~6% segment width.
  // The 0.03 + 0.03 split is documented in the figcaption.
  const segments = [
    { label: 'Filter', value: 0.10, color: '#dc2626' },
    { label: 'Cooling coil', value: 0.15, color: '#ea580c' },
    { label: 'Grilles', value: 0.06, color: '#facc15' },
    { label: 'Duct system (available)', value: 0.19, color: '#0e7490' },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);
  const W = 1000;
  const H = 280;
  const padL = 30;
  const padR = 30;
  const padT = 80;
  const chartW = W - padL - padR;
  const barY = padT + 10;
  const barH = 70;

  // Build cumulative x positions for stacked segments
  let cum = 0;
  const positioned = segments.map((s) => {
    const x = padL + (cum / total) * chartW;
    const w = (s.value / total) * chartW;
    cum += s.value;
    return { ...s, x, w };
  });

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="sp-budget-title sp-budget-desc"
        focusable="false"
      >
        <title id="sp-budget-title">
          Static pressure budget allocation for a typical residential system
        </title>
        <desc id="sp-budget-desc">
          Horizontal stacked bar showing how a 0.50 inch water column Total External Static
          Pressure budget gets allocated. Filter consumes 0.10, cooling coil 0.15, supply and
          return grilles 0.03 each, leaving 0.19 inch water column available for the duct
          system itself. The duct allocation is the budget Manual D must work within.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Where the 0.50 in. wc TESP budget actually goes
        </text>
        <text
          x={padL}
          y={50}
          fontSize="12"
          fill="#475569"
          fontFamily="system-ui, sans-serif"
        >
          Typical residential air handler rated 0.50 in. wc external static pressure
        </text>

        {/* Stacked bar */}
        {positioned.map((s, i) => (
          <g key={s.label}>
            <rect
              x={s.x}
              y={barY}
              width={s.w}
              height={barH}
              fill={s.color}
              opacity="0.88"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {/* Value label inside the segment */}
            <text
              x={s.x + s.w / 2}
              y={barY + barH / 2 - 4}
              fontSize="12"
              fontWeight="700"
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              {s.value.toFixed(2)}
            </text>
            <text
              x={s.x + s.w / 2}
              y={barY + barH / 2 + 12}
              fontSize="10"
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
              opacity="0.9"
            >
              in. wc
            </text>
            {/* Connector line + label below */}
            <line
              x1={s.x + s.w / 2}
              y1={barY + barH + 4}
              x2={s.x + s.w / 2}
              y2={barY + barH + 18}
              stroke={s.color}
              strokeWidth="1.5"
            />
            <text
              x={s.x + s.w / 2}
              y={barY + barH + 32}
              fontSize={i === 4 ? 13 : 12}
              fontWeight={i === 4 ? 700 : 600}
              fill="#0f172a"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* Highlight callout for "available for duct system" — last segment */}
        <text
          x={positioned[positioned.length - 1].x + positioned[positioned.length - 1].w / 2}
          y={barY + barH + 48}
          fontSize="11"
          fill="#0e7490"
          textAnchor="middle"
          fontStyle="italic"
          fontFamily="system-ui, sans-serif"
        >
          ← Manual D friction-rate target
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Of the 0.50 in. wc external static pressure a typical residential air handler can
        develop, fixed component losses consume 0.31 in. wc: filter 0.10, cooling coil 0.15,
        and grilles 0.06 (supply register 0.03 + return grille 0.03). The remaining 0.19 in.
        wc is the budget the duct system must live within. A friction-rate target of about
        0.08 in. wc per 100 ft equivalent length keeps total duct losses below this remaining
        budget for typical residential layouts. Source: ANSI/ACCA Manual D, ASHRAE Fundamentals
        2021 Ch. 21 (Duct Design).
      </figcaption>
    </figure>
  );
}
