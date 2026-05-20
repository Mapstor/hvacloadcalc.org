import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ClimateRow {
  zone: string;
  city: string;
  heating: number;
  cooling: number;
}

const CLIMATES: ClimateRow[] = [
  { zone: 'Zone 1', city: 'Miami', heating: 8, cooling: 30 },
  { zone: 'Zone 2', city: 'Houston', heating: 18, cooling: 32 },
  { zone: 'Zone 3', city: 'Atlanta', heating: 28, cooling: 28 },
  { zone: 'Zone 4', city: 'Chicago', heating: 50, cooling: 26 },
  { zone: 'Zone 5', city: 'Minneapolis', heating: 60, cooling: 24 },
];

const X_MIN = 100;
const X_MAX = 940;
const Y_TOP = 90;
const Y_BOTTOM = 460;
const MAX_LOAD = 60;

function yForLoad(load: number): number {
  return Y_BOTTOM - (load / MAX_LOAD) * (Y_BOTTOM - Y_TOP);
}

export function HeatingVsCoolingLoadByClimate({ className }: { className?: string }) {
  const groupWidth = (X_MAX - X_MIN) / CLIMATES.length;
  const barWidth = 50;

  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="heating-vs-cooling-load-by-climate-title"
        descId="heating-vs-cooling-load-by-climate-desc"
        title="Heating load vs cooling load by US climate zone"
        desc="Bar chart comparing heating load shown in blue and cooling load shown in red for the same hypothetical 2,000 square foot home in five US climate zones. Zone 1 Miami: heating 8,000 BTU per hour, cooling 30,000 BTU per hour. Zone 2 Houston: heating 18,000, cooling 32,000. Zone 3 Atlanta: heating 28,000, cooling 28,000, the only zone where loads are balanced. Zone 4 Chicago: heating 50,000, cooling 26,000. Zone 5 Minneapolis: heating 60,000, cooling 24,000. Heating dominates in cold climates and cooling dominates in hot climates. Heat pump sizing must account for the climate-specific load imbalance."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Same 2,000 sq ft home, different climates
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Heating load vs cooling load, BTU/hr at design conditions
        </text>

        {/* Grid */}
        <g stroke={colors.ink[300]} strokeWidth={0.5} opacity={0.6}>
          {[10, 20, 30, 40, 50, 60].map((v) => (
            <line key={v} x1={X_MIN} y1={yForLoad(v)} x2={X_MAX} y2={yForLoad(v)} />
          ))}
        </g>

        {/* Axes */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />

        {/* Y-axis labels */}
        {[0, 10, 20, 30, 40, 50, 60].map((v) => (
          <g key={v}>
            <line x1={X_MIN - 5} y1={yForLoad(v)} x2={X_MIN} y2={yForLoad(v)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MIN - 10} y={yForLoad(v) + 4} textAnchor="end" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {v}k
            </text>
          </g>
        ))}
        <text
          x={X_MIN - 50}
          y={(Y_TOP + Y_BOTTOM) / 2}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.axisLabel}
          fontWeight={typography.weight.label}
          fill={colors.ink[700]}
          transform={`rotate(-90 ${X_MIN - 50} ${(Y_TOP + Y_BOTTOM) / 2})`}
        >
          Load (BTU/hr)
        </text>

        {/* Bars + labels */}
        {CLIMATES.map((c, i) => {
          const groupCenterX = X_MIN + (i + 0.5) * groupWidth;
          const heatX = groupCenterX - barWidth - 4;
          const coolX = groupCenterX + 4;
          return (
            <g key={c.zone}>
              {/* Heating bar */}
              <rect
                x={heatX}
                y={yForLoad(c.heating)}
                width={barWidth}
                height={Y_BOTTOM - yForLoad(c.heating)}
                fill={colors.brand.primary}
                fillOpacity={0.85}
                stroke={colors.brand.primaryDark}
                strokeWidth={1}
              />
              <text
                x={heatX + barWidth / 2}
                y={yForLoad(c.heating) - 6}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={11}
                fontWeight={typography.weight.label}
                fill={colors.brand.primaryDark}
              >
                {c.heating}k
              </text>

              {/* Cooling bar */}
              <rect
                x={coolX}
                y={yForLoad(c.cooling)}
                width={barWidth}
                height={Y_BOTTOM - yForLoad(c.cooling)}
                fill={colors.danger}
                fillOpacity={0.85}
                stroke={colors.danger}
                strokeWidth={1}
              />
              <text
                x={coolX + barWidth / 2}
                y={yForLoad(c.cooling) - 6}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={11}
                fontWeight={typography.weight.label}
                fill={colors.danger}
              >
                {c.cooling}k
              </text>

              {/* Zone label */}
              <text x={groupCenterX} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {c.zone}
              </text>
              <text x={groupCenterX} y={Y_BOTTOM + 40} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
                {c.city}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(150,530)">
          <rect width={18} height={14} fill={colors.brand.primary} fillOpacity={0.85} />
          <text x={26} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Heating load at 99% heating design temp
          </text>
          <rect x={400} width={18} height={14} fill={colors.danger} fillOpacity={0.85} />
          <text x={426} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Cooling load at 1% cooling design temp
          </text>
        </g>

        <text x={500} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Heating dominates in cold climates. Cooling dominates in hot. Atlanta is the rare balanced case.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Heat pump sizing depends on the climate-specific imbalance between heating load and cooling load.
      </figcaption>
    </figure>
  );
}
