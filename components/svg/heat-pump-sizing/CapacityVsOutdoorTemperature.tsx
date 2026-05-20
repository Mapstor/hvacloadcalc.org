import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 100;
const X_MAX = 880;
const Y_TOP = 80;
const Y_BOTTOM = 480;
const TEMP_MIN = -10;
const TEMP_MAX = 65;
const CAP_MAX = 55;

function xForTemp(t: number): number {
  return X_MIN + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X_MAX - X_MIN);
}
function yForCap(c: number): number {
  return Y_BOTTOM - (c / CAP_MAX) * (Y_BOTTOM - Y_TOP);
}

// Capacity curves (BTU/hr in thousands)
const STANDARD_HP = [
  { temp: 65, cap: 38 },
  { temp: 47, cap: 36 },
  { temp: 35, cap: 27 },
  { temp: 17, cap: 19 },
  { temp: 5, cap: 12 },
];

const CCHP = [
  { temp: 65, cap: 38 },
  { temp: 47, cap: 36 },
  { temp: 35, cap: 33 },
  { temp: 17, cap: 30 },
  { temp: 5, cap: 27 },
  { temp: -5, cap: 22 },
];

const HEATING_LOAD = [
  { temp: 65, cap: 0 },
  { temp: 5, cap: 50 },
  { temp: -5, cap: 55 },
];

function curve(points: Array<{ temp: number; cap: number }>): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xForTemp(p.temp)} ${yForCap(p.cap)}`).join(' ');
}

export function CapacityVsOutdoorTemperature({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="capacity-vs-outdoor-temperature-title"
        descId="capacity-vs-outdoor-temperature-desc"
        title="Heat pump capacity versus outdoor temperature with balance points"
        desc="X-Y line chart with outdoor temperature on x-axis from negative 10 to 65 degrees Fahrenheit and heating capacity on y-axis from 0 to 55 thousand BTU per hour. Three curves shown. Standard heat pump curve in solid red drops from 36,000 BTU per hour at 47 degrees to 12,000 BTU per hour at 5 degrees. Cold-climate heat pump curve in solid blue drops less from 36,000 at 47 degrees to 27,000 at 5 degrees. Home heating load curve in dashed gray rises linearly from 0 at 65 degrees to 50,000 BTU per hour at 5 degrees. Two balance points marked: standard heat pump balance point at 28 degrees Fahrenheit and cold-climate heat pump balance point at 12 degrees Fahrenheit. Vertical line marks design temperature at 5 degrees Fahrenheit."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Heat pump capacity vs outdoor temperature
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Where the curves cross, the heat pump exactly meets the load: that&apos;s the balance point
        </text>

        {/* Grid */}
        <g stroke={colors.ink[300]} strokeWidth={0.5} opacity={0.5}>
          {[10, 20, 30, 40, 50].map((c) => (
            <line key={`h-${c}`} x1={X_MIN} y1={yForCap(c)} x2={X_MAX} y2={yForCap(c)} />
          ))}
          {[0, 20, 40, 60].map((t) => (
            <line key={`v-${t}`} x1={xForTemp(t)} y1={Y_TOP} x2={xForTemp(t)} y2={Y_BOTTOM} />
          ))}
        </g>

        {/* Design temp vertical reference */}
        <line x1={xForTemp(5)} y1={Y_TOP} x2={xForTemp(5)} y2={Y_BOTTOM} stroke={colors.ink[500]} strokeWidth={1.5} strokeDasharray="5,3" />
        <text x={xForTemp(5) + 6} y={Y_TOP + 16} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
          design temp 5°F
        </text>

        {/* Home heating load */}
        <path d={curve(HEATING_LOAD)} stroke={colors.ink[700]} strokeWidth={2.5} strokeDasharray="6,4" fill="none" />
        <text x={xForTemp(45)} y={yForCap(13) - 6} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Home heating load
        </text>

        {/* Standard HP */}
        <path d={curve(STANDARD_HP)} stroke={colors.danger} strokeWidth={3} fill="none" />
        <text x={xForTemp(50)} y={yForCap(38) - 8} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.danger}>
          Standard HP
        </text>

        {/* CCHP */}
        <path d={curve(CCHP)} stroke={colors.brand.primary} strokeWidth={3} fill="none" />
        <text x={xForTemp(-7)} y={yForCap(22) - 4} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.brand.primary}>
          Cold-climate HP
        </text>

        {/* Balance points (approximate intersections) */}
        {/* Standard: ~28°F where load ~22k */}
        <g transform={`translate(${xForTemp(28)},${yForCap(22)})`}>
          <circle r={7} fill={colors.danger} stroke={colors.ink[900]} strokeWidth={1.5} />
          <text x={12} y={4} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.danger}>
            balance point 28°F
          </text>
          <text x={12} y={20} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            (standard HP)
          </text>
        </g>

        {/* CCHP: ~12°F where load ~42k */}
        <g transform={`translate(${xForTemp(12)},${yForCap(42)})`}>
          <circle r={7} fill={colors.brand.primary} stroke={colors.ink[900]} strokeWidth={1.5} />
          <text x={12} y={4} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primary}>
            balance point 12°F
          </text>
          <text x={12} y={20} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            (cold-climate HP)
          </text>
        </g>

        {/* Axes */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />

        {/* X-axis */}
        {[-10, 0, 10, 20, 30, 40, 50, 60].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t)} y1={Y_BOTTOM} x2={xForTemp(t)} y2={Y_BOTTOM + 5} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTemp(t)} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {t}°F
            </text>
          </g>
        ))}
        <text x={(X_MIN + X_MAX) / 2} y={Y_BOTTOM + 48} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Outdoor temperature (°F)
        </text>

        {/* Y-axis */}
        {[0, 10, 20, 30, 40, 50].map((c) => (
          <g key={c}>
            <line x1={X_MIN - 5} y1={yForCap(c)} x2={X_MIN} y2={yForCap(c)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MIN - 10} y={yForCap(c) + 4} textAnchor="end" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {c}k
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
          Capacity (BTU/hr)
        </text>

        <text x={500} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Below the balance point, aux heat covers the gap between load and heat pump capacity.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The balance point shifts dramatically lower with a cold-climate heat pump, sharply reducing aux runtime over the heating season.
      </figcaption>
    </figure>
  );
}
