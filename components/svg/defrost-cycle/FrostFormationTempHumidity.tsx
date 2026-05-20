import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 90;
const X_MAX = 880;
const Y_TOP = 80;
const Y_BOTTOM = 480;
const TEMP_MIN = 0;
const TEMP_MAX = 50;
const RH_MIN = 0;
const RH_MAX = 100;

function xForTemp(t: number): number {
  return X_MIN + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X_MAX - X_MIN);
}
function yForRh(rh: number): number {
  return Y_BOTTOM - ((rh - RH_MIN) / (RH_MAX - RH_MIN)) * (Y_BOTTOM - Y_TOP);
}

interface SamplePoint {
  temp: number;
  rh: number;
  label: string;
  color: string;
}

const SAMPLES: SamplePoint[] = [
  { temp: 38, rh: 90, label: 'Frost likely', color: colors.danger },
  { temp: 32, rh: 50, label: 'Sometimes frost', color: colors.warn },
  { temp: 20, rh: 30, label: 'Dry cold, minimal frost', color: colors.good },
];

export function FrostFormationTempHumidity({ className }: { className?: string }) {
  // Frost-prone zone outline: roughly 25-40°F at >60% RH
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="frost-formation-temp-humidity-title"
        descId="frost-formation-temp-humidity-desc"
        title="When frost forms on a heat pump outdoor coil"
        desc="X-Y plot of outdoor dry bulb temperature from 0 to 50 degrees Fahrenheit on the x-axis and outdoor relative humidity from 0 to 100 percent on the y-axis. A shaded region in the upper-left quadrant covers cool temperatures 25 to 40 degrees with high humidity above 60 percent and is labeled frost forms here. Three example data points: 38 degrees with 90 percent humidity labeled frost likely in red, 32 degrees with 50 percent humidity labeled sometimes frost in yellow, and 20 degrees with 30 percent humidity labeled dry cold minimal frost in green."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          When frost forms on the outdoor coil
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Defrost runs most often in cool, humid weather, not the coldest weather
        </text>

        {/* Frost-prone shaded region */}
        <path
          d={`M ${xForTemp(25)} ${yForRh(100)}
              L ${xForTemp(42)} ${yForRh(100)}
              L ${xForTemp(42)} ${yForRh(80)}
              L ${xForTemp(38)} ${yForRh(70)}
              L ${xForTemp(34)} ${yForRh(60)}
              L ${xForTemp(28)} ${yForRh(55)}
              L ${xForTemp(25)} ${yForRh(55)}
              Z`}
          fill={colors.brand.primary}
          fillOpacity={0.18}
          stroke={colors.brand.primary}
          strokeWidth={2}
          strokeDasharray="5,3"
        />
        <text x={xForTemp(33)} y={yForRh(85)} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
          Frost-prone zone
        </text>
        <text x={xForTemp(33)} y={yForRh(78)} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.brand.primaryDark}>
          (defrost cycles frequent)
        </text>

        {/* Freezing reference line */}
        <line x1={xForTemp(32)} y1={Y_TOP} x2={xForTemp(32)} y2={Y_BOTTOM} stroke={colors.ink[500]} strokeWidth={1.5} strokeDasharray="4,4" />
        <text x={xForTemp(32) + 6} y={Y_TOP + 16} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
          32°F freezing
        </text>

        {/* Grid */}
        <g stroke={colors.ink[300]} strokeWidth={0.5} opacity={0.7}>
          {[10, 20, 30, 40].map((t) => (
            <line key={`vt-${t}`} x1={xForTemp(t)} y1={Y_TOP} x2={xForTemp(t)} y2={Y_BOTTOM} />
          ))}
          {[20, 40, 60, 80].map((r) => (
            <line key={`hr-${r}`} x1={X_MIN} y1={yForRh(r)} x2={X_MAX} y2={yForRh(r)} />
          ))}
        </g>

        {/* Axes */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />

        {/* X-axis labels */}
        {[0, 10, 20, 30, 40, 50].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t)} y1={Y_BOTTOM} x2={xForTemp(t)} y2={Y_BOTTOM + 5} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTemp(t)} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {t}°F
            </text>
          </g>
        ))}
        <text x={(X_MIN + X_MAX) / 2} y={Y_BOTTOM + 48} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Outdoor dry bulb temperature (°F)
        </text>

        {/* Y-axis labels */}
        {[0, 20, 40, 60, 80, 100].map((r) => (
          <g key={r}>
            <line x1={X_MIN - 5} y1={yForRh(r)} x2={X_MIN} y2={yForRh(r)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MIN - 10} y={yForRh(r) + 4} textAnchor="end" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {r}%
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
          Outdoor relative humidity (%)
        </text>

        {/* Sample points */}
        {SAMPLES.map((s, i) => (
          <g key={i}>
            <circle cx={xForTemp(s.temp)} cy={yForRh(s.rh)} r={8} fill={s.color} stroke={colors.ink[900]} strokeWidth={1.5} />
            <text
              x={xForTemp(s.temp) + 14}
              y={yForRh(s.rh) - 6}
              fontFamily={FONT}
              fontSize={11}
              fontWeight={typography.weight.title}
              fill={s.color}
            >
              {s.temp}°F / {s.rh}% RH
            </text>
            <text
              x={xForTemp(s.temp) + 14}
              y={yForRh(s.rh) + 8}
              fontFamily={FONT}
              fontSize={10}
              fill={colors.ink[700]}
            >
              {s.label}
            </text>
          </g>
        ))}

        <text x={500} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Coldest air holds less moisture, so very cold weather produces less frost than moderate cool weather.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Frost forms when condensate freezes on the outdoor coil. The conditions for that are cool and humid, not just cold.
      </figcaption>
    </figure>
  );
}
