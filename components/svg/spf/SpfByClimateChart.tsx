import { SvgWrapper } from '../SvgWrapper';
import { ChartGrid } from '../ChartGrid';
import { ChartAxis } from '../ChartAxis';
import { Annotation } from '../Annotation';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ZoneData {
  zone: string;
  conventional: number;
  coldClimate: number;
}

const DATA: ZoneData[] = [
  { zone: '3', conventional: 3.2, coldClimate: 3.5 },
  { zone: '4', conventional: 3.0, coldClimate: 3.2 },
  { zone: '5', conventional: 2.6, coldClimate: 2.9 },
  { zone: '6', conventional: 2.2, coldClimate: 2.7 },
  { zone: '7', conventional: 1.9, coldClimate: 2.4 },
];

const X_MIN = 80;
const X_MAX = 760;
const Y_TOP = 60;
const Y_BOTTOM = 400;
const Y_MAX_VALUE = 4.0;

function xForZone(i: number): number {
  return X_MIN + 60 + i * 130;
}

function yForValue(v: number): number {
  return Y_BOTTOM - (v / Y_MAX_VALUE) * (Y_BOTTOM - Y_TOP);
}

export function SpfByClimateChart({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 800 500"
        titleId="spf-by-climate-chart-title"
        descId="spf-by-climate-chart-desc"
        title="Typical SPF by climate zone for conventional versus cold-climate heat pumps"
        desc="Grouped bar chart comparing seasonal performance factor across IECC climate zones 3 through 7. Conventional heat pumps decline from SPF 3.2 in zone 3 to 1.9 in zone 7. Cold-climate heat pumps maintain higher SPF across the same range, from 3.5 in zone 3 down to 2.4 in zone 7."
        className="w-full"
      >
        <rect width={800} height={500} fill={colors.surface.canvas} />

        <ChartGrid xStart={X_MIN} xEnd={X_MAX} yStart={Y_TOP} yEnd={Y_BOTTOM} xSteps={5} ySteps={4} />

        {/* Bars per zone */}
        {DATA.map((d, i) => {
          const x = xForZone(i);
          return (
            <g key={d.zone}>
              {/* Conventional bar */}
              <rect
                x={x - 40}
                y={yForValue(d.conventional)}
                width={36}
                height={Y_BOTTOM - yForValue(d.conventional)}
                fill={colors.brand.primary}
                fillOpacity={0.85}
                stroke={colors.brand.primaryDark}
                strokeWidth={1}
                rx={3}
              />
              <text x={x - 22} y={yForValue(d.conventional) - 6} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
                {d.conventional.toFixed(1)}
              </text>

              {/* Cold-climate bar */}
              <rect
                x={x + 4}
                y={yForValue(d.coldClimate)}
                width={36}
                height={Y_BOTTOM - yForValue(d.coldClimate)}
                fill={colors.good}
                fillOpacity={0.85}
                stroke={colors.good}
                strokeWidth={1}
                rx={3}
              />
              <text x={x + 22} y={yForValue(d.coldClimate) - 6} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fontWeight={typography.weight.label} fill={colors.good}>
                {d.coldClimate.toFixed(1)}
              </text>

              <text x={x} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
                Zone {d.zone}
              </text>
            </g>
          );
        })}

        <ChartAxis
          orientation="y"
          start={Y_TOP}
          end={Y_BOTTOM}
          perpendicular={X_MIN}
          ticks={[1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0].map((v) => ({ position: yForValue(v), label: v.toFixed(1) }))}
          label="SPF (seasonal performance factor)"
        />

        {/* Legend */}
        <g transform={`translate(${X_MAX - 220},${Y_TOP - 10})`}>
          <rect x={0} y={0} width={20} height={14} fill={colors.brand.primary} fillOpacity={0.85} rx={2} />
          <text x={28} y={11} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Conventional HP</text>
          <rect x={0} y={22} width={20} height={14} fill={colors.good} fillOpacity={0.85} rx={2} />
          <text x={28} y={33} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Cold-climate HP</text>
        </g>

        <Annotation x={120} y={Y_BOTTOM + 55} text="Conventional HPs lose efficiency dramatically in cold zones." textAnchor="start" />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Representative ranges from NEEP-listed cold-climate units and NREL field measurements. Individual installations vary by envelope and operation.
      </figcaption>
    </figure>
  );
}
