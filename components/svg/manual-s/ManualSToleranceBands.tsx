/**
 * Manual S oversizing tolerance bands — horizontal bar chart showing the
 * maximum allowed equipment oversizing above the Manual J load by equipment
 * type. Used on /manual-s/ to anchor the tolerances section visually.
 */
export function ManualSToleranceBands() {
  const rows = [
    {
      label: 'Single-stage cooling (AC, heat pump cooling)',
      max: 15,
      color: '#0e7490',
      note: 'Tightest tolerance; oversizing kills humidity removal',
    },
    {
      label: 'Two-stage cooling',
      max: 20,
      color: '#0891b2',
      note: 'Low stage matches mild-weather load',
    },
    {
      label: 'Variable-speed cooling',
      max: 25,
      color: '#06b6d4',
      note: 'Inverter modulates 30-100%',
    },
    {
      label: 'Heat pump heating (cold-climate)',
      max: 40,
      color: '#3b82f6',
      note: 'Capacity drops with outdoor temperature',
    },
    {
      label: 'Gas furnace (sizing by available BTU/hr steps)',
      max: 40,
      color: '#d97706',
      note: 'Discrete equipment sizes constrain choice',
    },
    {
      label: 'Variable-speed HP, heating-dominant climate',
      max: 60,
      color: '#7c3aed',
      note: 'Special tolerance for cold-climate heating need',
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
  const rowH = chartH / rows.length;
  const xMin = 0;
  const xMax = 70;
  const xScale = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * chartW;
  const ticks = [10, 20, 30, 40, 50, 60];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="manual-s-title manual-s-desc"
        focusable="false"
      >
        <title id="manual-s-title">Manual S maximum oversizing tolerance by equipment type</title>
        <desc id="manual-s-desc">
          Horizontal bar chart showing the maximum allowed oversizing above the Manual J load,
          by equipment type. Single-stage cooling has the tightest tolerance at 15%, increasing
          to 20% for two-stage cooling and 25% for variable-speed cooling. Cold-climate heat pump
          heating and gas furnaces are allowed up to 40%. Variable-speed heat pumps in
          heating-dominant climates carry the loosest tolerance at 60%.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Manual S oversizing tolerance — max % above Manual J load
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
              +{v}%
            </text>
          </g>
        ))}

        {/* Manual J load reference line at 0% */}
        <line x1={xScale(0)} y1={padT} x2={xScale(0)} y2={H - padB} stroke="#0f172a" strokeWidth="2" />
        <text
          x={xScale(0)}
          y={padT - 6}
          fontSize="10"
          fill="#0f172a"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
        >
          Manual J load
        </text>

        {/* Bars */}
        {rows.map((r, i) => {
          const y = padT + i * rowH + rowH * 0.16;
          const barH = rowH * 0.68;
          const x1 = xScale(0);
          const x2 = xScale(r.max);
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
                +{r.max}%
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
          Maximum equipment capacity above Manual J load
        </text>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Tolerance bands published in ANSI/ACCA 3 Manual S - 2014. The tightest tolerance applies
        to single-stage cooling because oversized fixed-output equipment short-cycles and fails
        to dehumidify. The loosest tolerance applies to variable-speed heat pumps in
        heating-dominant climates so the equipment can carry the cold-design heating load.
      </figcaption>
    </figure>
  );
}
