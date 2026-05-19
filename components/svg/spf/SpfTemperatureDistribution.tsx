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
const Y_BOTTOM = 400;

const TEMP_BINS = [
  { range: '−10 to 0', mid: -5, hours: 90 },
  { range: '0 to 10', mid: 5, hours: 220 },
  { range: '10 to 20', mid: 15, hours: 400 },
  { range: '20 to 30', mid: 25, hours: 720 },
  { range: '30 to 40', mid: 35, hours: 900 },
  { range: '40 to 50', mid: 45, hours: 720 },
  { range: '50 to 60', mid: 55, hours: 280 },
];

const MAX_HOURS = 1000;

function xPos(i: number): number {
  return X_MIN + 30 + i * ((X_MAX - X_MIN - 60) / TEMP_BINS.length);
}

function barWidth(): number {
  return (X_MAX - X_MIN - 60) / TEMP_BINS.length - 14;
}

function yForHours(h: number): number {
  return Y_BOTTOM - (h / MAX_HOURS) * (Y_BOTTOM - Y_TOP);
}

// COP curve: declines from 4.0 at 60°F to 2.0 at 0°F
function copAt(temp: number): number {
  return Math.max(1.5, Math.min(4.2, 2.0 + (temp / 60) * 2.0));
}

const COP_LINE_POINTS = TEMP_BINS.map((b, i) => ({
  x: xPos(i) + barWidth() / 2,
  y: Y_TOP + (1 - copAt(b.mid) / 4.5) * (Y_BOTTOM - Y_TOP),
}));

export function SpfTemperatureDistribution({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 800 500"
        titleId="spf-temperature-distribution-title"
        descId="spf-temperature-distribution-desc"
        title="Heating hours distributed by outdoor temperature, with COP overlay"
        desc="Chart showing distribution of heating hours by outdoor temperature bin for a typical zone 5 climate, overlaid with instantaneous heat pump COP that declines as temperature drops. The most heating hours occur in the 20 to 50 degree range, which is why seasonal performance factor tends to be closer to mild-weather COP than cold-snap COP."
        className="w-full"
      >
        <rect width={800} height={500} fill={colors.surface.canvas} />

        <ChartGrid xStart={X_MIN} xEnd={X_MAX} yStart={Y_TOP} yEnd={Y_BOTTOM} xSteps={6} ySteps={5} />

        {/* Bars */}
        {TEMP_BINS.map((b, i) => (
          <g key={b.range}>
            <rect
              x={xPos(i)}
              y={yForHours(b.hours)}
              width={barWidth()}
              height={Y_BOTTOM - yForHours(b.hours)}
              fill={colors.brand.primary}
              fillOpacity={0.55}
              stroke={colors.brand.primary}
              strokeWidth={1.2}
              rx={3}
            />
            <text
              x={xPos(i) + barWidth() / 2}
              y={Y_BOTTOM + 18}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={typography.size.tickLabel}
              fill={colors.ink[500]}
            >
              {b.range}
            </text>
            <text
              x={xPos(i) + barWidth() / 2}
              y={yForHours(b.hours) - 6}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={10}
              fontWeight={typography.weight.label}
              fill={colors.brand.primaryDark}
            >
              {b.hours}h
            </text>
          </g>
        ))}

        {/* Axes */}
        <ChartAxis
          orientation="x"
          start={X_MIN}
          end={X_MAX}
          perpendicular={Y_BOTTOM}
          ticks={[]}
          label="Outdoor temperature (°F) — bin midpoints"
        />
        <ChartAxis
          orientation="y"
          start={Y_TOP}
          end={Y_BOTTOM}
          perpendicular={X_MIN}
          ticks={[
            { position: Y_BOTTOM, label: '0' },
            { position: yForHours(250), label: '250' },
            { position: yForHours(500), label: '500' },
            { position: yForHours(750), label: '750' },
            { position: yForHours(1000), label: '1000' },
          ]}
          label="Hours per heating season"
        />

        {/* COP overlay */}
        <DataSeries points={COP_LINE_POINTS} color={colors.danger} strokeWidth={2.5} showDots />

        {/* COP scale label */}
        <text x={X_MAX - 10} y={Y_TOP + 12} textAnchor="end" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.label} fill={colors.danger}>
          COP at temperature
        </text>

        <Annotation
          x={140}
          y={Y_TOP + 35}
          text="Cold-snap hours: HP weak"
          textAnchor="start"
        />
        <Annotation
          x={520}
          y={Y_BOTTOM - 200}
          text="Mild hours dominate the season → SPF is closer to mild-weather COP"
          textAnchor="start"
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Heating hours for a typical IECC zone 5 climate. Cold-snap hours hurt efficiency but are few; mild hours dominate the seasonal average.
      </figcaption>
    </figure>
  );
}
