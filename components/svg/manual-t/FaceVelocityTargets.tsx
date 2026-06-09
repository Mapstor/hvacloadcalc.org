/**
 * Manual T face velocity targets — horizontal bar chart with green target
 * bands and red "noise threshold" markers, by register/grille location.
 */
export function FaceVelocityTargets() {
  const rows = [
    {
      label: 'Filter grille (with media filter)',
      low: 300,
      high: 400,
      max: 500,
      color: '#0e7490',
      note: 'Filter life and capture efficiency drop above 400 fpm',
    },
    {
      label: 'Bedroom supply register',
      low: 400,
      high: 600,
      max: 700,
      color: '#0891b2',
      note: 'Quiet rooms tolerate the lower end of the range',
    },
    {
      label: 'Living-area supply register',
      low: 500,
      high: 700,
      max: 800,
      color: '#06b6d4',
      note: 'Higher mixing tolerated where ambient noise is higher',
    },
    {
      label: 'Hallway / central return grille',
      low: 500,
      high: 700,
      max: 800,
      color: '#3b82f6',
      note: 'Throw irrelevant; velocity for noise control only',
    },
    {
      label: 'Ceiling diffuser (4-way pattern)',
      low: 600,
      high: 800,
      max: 900,
      color: '#1e40af',
      note: 'Pattern collapses below 500 fpm; air falls without mixing',
    },
    {
      label: 'High-velocity (mini-duct) supply',
      low: 1500,
      high: 2200,
      max: 2400,
      color: '#7c3aed',
      note: 'Specialized small-duct high-velocity systems only',
    },
  ];
  const W = 1000;
  const H = 380;
  const padL = 280;
  const padR = 80;
  const padT = 55;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / rows.length;
  const xMin = 0;
  const xMax = 2500;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [500, 1000, 1500, 2000];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="face-velocity-title face-velocity-desc"
        focusable="false"
      >
        <title id="face-velocity-title">
          Face velocity targets by register and grille location
        </title>
        <desc id="face-velocity-desc">
          Horizontal bar chart of recommended face velocity ranges by location. Filter grilles
          target 300-400 fpm to preserve filter life. Bedroom supply registers target 400-600
          fpm for quiet operation. Living-area and return grilles target 500-700 fpm. Ceiling
          diffusers need 600-800 fpm to maintain their throw pattern. High-velocity mini-duct
          systems operate at 1500-2200 fpm by design.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Face velocity targets by register / grille location
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
              {v}
            </text>
          </g>
        ))}

        {/* Bars: solid range = target; lighter extension = acceptable max */}
        {rows.map((r, i) => {
          const y = padT + i * rowH + rowH * 0.2;
          const barH = rowH * 0.6;
          const xLow = xScale(r.low);
          const xHigh = xScale(r.high);
          const xMaxAccept = xScale(r.max);
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
              {/* Acceptable-max extension (lighter) */}
              <rect
                x={xHigh}
                y={y}
                width={xMaxAccept - xHigh}
                height={barH}
                fill={r.color}
                opacity="0.3"
                rx="3"
              />
              {/* Target band (solid) */}
              <rect
                x={xLow}
                y={y}
                width={xHigh - xLow}
                height={barH}
                fill={r.color}
                opacity="0.88"
                rx="3"
              />
              <text
                x={xMaxAccept + 8}
                y={y + barH / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill="#0f172a"
                fontFamily="system-ui, sans-serif"
              >
                {r.low}–{r.high}
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
          Face velocity (fpm)
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Solid bar = ACCA Manual T target range. Lighter extension = acceptable maximum
        before noise or pattern problems dominate. Velocity is calculated against
        free area (~70% of nominal face area for typical louvered registers).
        Source: ANSI/ACCA Manual T, ASHRAE Fundamentals 2021 Ch. 20 (Space Air Diffusion),
        AMCA Standard 211.
      </figcaption>
    </figure>
  );
}
