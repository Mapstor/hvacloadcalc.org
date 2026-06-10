/**
 * AFUE efficiency breakdown — horizontal stacked bars showing useful heat
 * vs flue/casing loss for four common AFUE tiers, with annual cost savings
 * (vs 80% AFUE baseline) annotated on the right at a zone-4 reference load.
 */
export function AfueEfficiencyBreakdown() {
  const tiers = [
    { afue: 80, useful: 80, loss: 20, savings: 0, note: 'Baseline (pre-2028 minimum)' },
    { afue: 90, useful: 90, loss: 10, savings: 137, note: 'Mid-efficiency condensing' },
    { afue: 95, useful: 95, loss: 5, savings: 205, note: '2028 federal minimum' },
    { afue: 97, useful: 97, loss: 3, savings: 237, note: 'ENERGY STAR (was §25C-eligible thru Dec 31, 2025)' },
  ];
  const W = 1000;
  const H = 380;
  const padL = 100;
  const padR = 200;
  const padT = 70;
  const padB = 60;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const rowH = chartH / tiers.length;
  const usefulColor = '#0e7490';
  const lossColor = '#fb923c';
  const ticks = [0, 25, 50, 75, 100];

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="afue-title afue-desc"
        focusable="false"
      >
        <title id="afue-title">
          AFUE tier comparison: useful heat versus flue loss with annual savings
        </title>
        <desc id="afue-desc">
          Horizontal stacked bar chart for four AFUE tiers — 80%, 90%, 95%, and 97%. Each bar
          shows the split between useful heat delivered to the home and energy lost up the flue
          and casing. Annotated annual savings versus 80% baseline at a zone-4 reference load:
          $137 per year at 90% AFUE, $205 per year at 95%, and $237 per year at 97%.
        </desc>

        <text
          x={padL}
          y={28}
          fontSize="15"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          AFUE tier: useful heat vs flue/casing loss
        </text>
        <text
          x={padL}
          y={48}
          fontSize="12"
          fill="#475569"
          fontFamily="system-ui, sans-serif"
        >
          Annual savings vs 80% AFUE baseline at a zone-4 reference home (80 MMBTU/yr)
        </text>

        {/* X grid + ticks */}
        {ticks.map((v) => {
          const x = padL + (v / 100) * chartW;
          return (
            <g key={v}>
              <line
                x1={x}
                y1={padT}
                x2={x}
                y2={H - padB}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text
                x={x}
                y={H - padB + 18}
                fontSize="11"
                fill="#64748b"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                {v}%
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {tiers.map((t, i) => {
          const y = padT + i * rowH + rowH * 0.15;
          const barH = rowH * 0.7;
          const xStart = padL;
          const usefulW = (t.useful / 100) * chartW;
          const lossW = (t.loss / 100) * chartW;
          return (
            <g key={t.afue}>
              <text
                x={padL - 14}
                y={y + barH / 2 + 4}
                fontSize="13"
                fontWeight="700"
                fill="#0f172a"
                textAnchor="end"
                fontFamily="system-ui, sans-serif"
              >
                {t.afue}%
              </text>

              <rect
                x={xStart}
                y={y}
                width={usefulW}
                height={barH}
                fill={usefulColor}
                opacity="0.9"
                rx="3"
              />
              <rect
                x={xStart + usefulW}
                y={y}
                width={lossW}
                height={barH}
                fill={lossColor}
                opacity="0.85"
                rx="3"
              />

              {/* Useful % label inside the bar */}
              <text
                x={xStart + usefulW / 2}
                y={y + barH / 2 + 4}
                fontSize="12"
                fontWeight="600"
                fill="#ffffff"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                {t.useful}% useful
              </text>

              {/* Annual savings annotation on the right */}
              <text
                x={padL + chartW + 12}
                y={y + barH / 2 - 2}
                fontSize="13"
                fontWeight="700"
                fill="#0e7490"
                fontFamily="system-ui, sans-serif"
              >
                {t.savings > 0 ? `Saves $${t.savings}/yr` : t.note}
              </text>
              {t.savings > 0 ? (
                <text
                  x={padL + chartW + 12}
                  y={y + barH / 2 + 14}
                  fontSize="11"
                  fill="#475569"
                  fontFamily="system-ui, sans-serif"
                >
                  {t.note}
                </text>
              ) : null}
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${padL}, ${H - padB + 36})`}>
          <rect width="12" height="12" fill={usefulColor} opacity="0.9" rx="2" />
          <text
            x="18"
            y="10"
            fontSize="11"
            fill="#475569"
            fontFamily="system-ui, sans-serif"
          >
            Useful heat to the home
          </text>
          <rect x="180" width="12" height="12" fill={lossColor} opacity="0.85" rx="2" />
          <text
            x="198"
            y="10"
            fontSize="11"
            fill="#475569"
            fontFamily="system-ui, sans-serif"
          >
            Flue and casing loss
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        Annual savings calculated at the zone-4 reference home (80 MMBTU per year heating
        load) using US-average natural-gas price ($1.30/therm). Higher-load homes in colder
        zones save more; lower-load homes in milder zones save less. Source: ANSI/ASHRAE
        Standard 103 furnace AFUE test method; DOE 10 CFR 430 efficiency standards; IRS
        Section 25C Fact Sheet FS-2025-05 (supersedes FS-2022-40; §25C HVAC scope expired Dec 31, 2025).
      </figcaption>
    </figure>
  );
}
