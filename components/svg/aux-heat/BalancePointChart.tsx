import { SvgWrapper } from '../SvgWrapper';
import { ChartGrid } from '../ChartGrid';
import { ChartAxis } from '../ChartAxis';
import { DataSeries } from '../DataSeries';
import { Annotation } from '../Annotation';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 70;
const X_MAX = 760;
const Y_TOP = 60;
const Y_BOTTOM = 420;

function xScale(temp: number): number {
  return X_MIN + ((temp - -10) / (60 - -10)) * (X_MAX - X_MIN);
}

function yScale(btu: number): number {
  return Y_BOTTOM - (btu / 60000) * (Y_BOTTOM - Y_TOP);
}

const HP_CAPACITY = [
  { temp: -10, btu: 25000 },
  { temp: 0, btu: 33000 },
  { temp: 10, btu: 40000 },
  { temp: 20, btu: 47000 },
  { temp: 30, btu: 53000 },
  { temp: 40, btu: 58000 },
  { temp: 50, btu: 60000 },
  { temp: 60, btu: 60000 },
].map((p) => ({ x: xScale(p.temp), y: yScale(p.btu) }));

const HEAT_LOSS = [
  { temp: -10, btu: 50000 },
  { temp: 65, btu: 0 },
].map((p) => ({ x: xScale(p.temp), y: yScale(p.btu) }));

const BALANCE_X = xScale(20);
const BALANCE_Y = yScale(47000);

const AUX_ZONE_POLYGON = [
  { x: X_MIN, y: yScale(50000) },
  { x: BALANCE_X, y: BALANCE_Y },
  { x: X_MIN, y: yScale(25000) },
];

const X_TICKS = [-10, 0, 10, 20, 30, 40, 50, 60].map((t) => ({
  position: xScale(t),
  label: `${t}°`,
}));

const Y_TICKS = [0, 12, 24, 36, 48, 60].map((b) => ({
  position: yScale(b * 1000),
  label: `${b}k`,
}));

export function BalancePointChart({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 800 500"
        titleId="balance-point-chart-title"
        descId="balance-point-chart-desc"
        title="Heat pump balance point chart"
        desc="Chart showing heat pump heating capacity declining as outdoor temperature drops, while home heat loss rises. The two curves intersect at approximately 20 degrees Fahrenheit, marking the balance point below which auxiliary heat fills the gap. The aux heat zone is shaded between the two curves at temperatures below the balance point."
        className="w-full"
      >
        <rect width={800} height={500} fill={colors.surface.canvas} />

        {/* Aux heat zone shading */}
        <polygon
          points={AUX_ZONE_POLYGON.map((p) => `${p.x},${p.y}`).join(' ')}
          fill={colors.zones.warn}
        />

        <ChartGrid xStart={X_MIN} xEnd={X_MAX} yStart={Y_TOP} yEnd={Y_BOTTOM} xSteps={7} ySteps={5} />

        <ChartAxis
          orientation="x"
          start={X_MIN}
          end={X_MAX}
          perpendicular={Y_BOTTOM}
          ticks={X_TICKS}
          label="Outdoor temperature (°F)"
        />
        <ChartAxis
          orientation="y"
          start={Y_TOP}
          end={Y_BOTTOM}
          perpendicular={X_MIN}
          ticks={Y_TICKS}
          label="BTU/hour (thousands)"
        />

        {/* Heat pump capacity curve */}
        <DataSeries points={HP_CAPACITY} color={colors.brand.primary} strokeWidth={3} showDots />

        {/* Home heat loss line */}
        <DataSeries points={HEAT_LOSS} color={colors.warn} strokeWidth={3} />

        {/* Balance point marker */}
        <circle cx={BALANCE_X} cy={BALANCE_Y} r={7} fill={colors.ink[900]} />
        <circle cx={BALANCE_X} cy={BALANCE_Y} r={3} fill={colors.surface.canvas} />

        <Annotation
          x={BALANCE_X + 14}
          y={BALANCE_Y - 12}
          text="Balance point — 20°F"
        />
        <Annotation
          x={140}
          y={yScale(40000)}
          text="Aux heat fills this gap"
          textAnchor="start"
        />
        <Annotation
          x={530}
          y={yScale(15000)}
          text="Heat pump alone is enough"
          textAnchor="start"
        />

        {/* Legend */}
        <g transform={`translate(${X_MAX - 230},${Y_TOP - 10})`}>
          <line x1={0} y1={6} x2={28} y2={6} stroke={colors.brand.primary} strokeWidth={3} />
          <text x={36} y={10} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Heat pump capacity
          </text>
          <line x1={0} y1={26} x2={28} y2={26} stroke={colors.warn} strokeWidth={3} />
          <text x={36} y={30} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Home heat loss
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Sample curves for a 3-ton conventional heat pump in a typical 2,000 sq ft home. The intersection (~20°F here) is the system&rsquo;s balance point.
      </figcaption>
    </figure>
  );
}
