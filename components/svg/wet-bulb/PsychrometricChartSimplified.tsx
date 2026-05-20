import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 90;
const X_MAX = 880;
const Y_TOP = 60;
const Y_BOTTOM = 540;

// Dry bulb range: 30-120°F
function xForDB(db: number): number {
  return X_MIN + ((db - 30) / 90) * (X_MAX - X_MIN);
}

// Humidity ratio range: 0-200 grains/lb
function yForW(w: number): number {
  return Y_BOTTOM - (w / 200) * (Y_BOTTOM - Y_TOP);
}

// Saturation curve points (approximate)
const SATURATION_POINTS = [
  { db: 30, w: 24 },
  { db: 40, w: 36 },
  { db: 50, w: 53 },
  { db: 60, w: 77 },
  { db: 70, w: 110 },
  { db: 80, w: 156 },
  { db: 86, w: 200 },
];

// Constant RH curves (approximate sample points)
function rhCurve(rh: number): Array<{ x: number; y: number }> {
  const points = [];
  for (let db = 30; db <= 120; db += 5) {
    // Approximate: humidity ratio is RH × saturation humidity ratio
    const satW =
      30 +
      Math.pow(Math.max(0, db - 30) / 90, 2) * 280; // rough approximation
    const w = Math.min(200, (rh / 100) * satW);
    points.push({ x: xForDB(db), y: yForW(w) });
  }
  return points;
}

// Constant wet bulb lines: diagonal lines from upper-left to lower-right
function wbLine(wb: number): { x1: number; y1: number; x2: number; y2: number } {
  // At saturation (db = wb): w corresponds to saturation point at that temp
  const satPoint = SATURATION_POINTS.find((p) => p.db >= wb) ?? SATURATION_POINTS[SATURATION_POINTS.length - 1];
  const x1 = xForDB(satPoint.db);
  const y1 = yForW(satPoint.w);
  // Line slopes down to higher dry bulb, lower w (drier air, same wet bulb)
  // Use approximate slope based on wet bulb thermodynamics
  const x2 = xForDB(Math.min(120, wb + 35));
  const y2 = yForW(Math.max(0, satPoint.w - 65));
  return { x1, y1, x2, y2 };
}

const SAMPLE_POINT = { db: 90, w: 110 }; // ~50% RH at 90°F
const SAMPLE_X = xForDB(SAMPLE_POINT.db);
const SAMPLE_Y = yForW(SAMPLE_POINT.w);

export function PsychrometricChartSimplified({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="psychrometric-chart-simplified-title"
        descId="psychrometric-chart-simplified-desc"
        title="Simplified psychrometric chart"
        desc="Psychrometric chart with dry bulb temperature on the x-axis from 30 to 120 degrees Fahrenheit and humidity ratio on the y-axis from 0 to 200 grains per pound. A curved saturation line marks 100 percent relative humidity. Diagonal lines show constant wet bulb temperature from 40 to 90 degrees Fahrenheit. Curved lines show constant relative humidity at 10, 30, 50, 70, and 90 percent. An example point at 90 degrees dry bulb and 50 percent humidity is marked with arrows showing its wet bulb at 78 degrees and dew point at 70 degrees."
        className="w-full"
      >
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Psychrometric chart (simplified)
        </text>

        {/* Constant wet bulb lines */}
        {[40, 50, 60, 70, 80, 90].map((wb) => {
          const line = wbLine(wb);
          return (
            <g key={`wb-${wb}`}>
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={colors.brand.primary}
                strokeWidth={1}
                strokeDasharray="3,2"
                opacity={0.5}
              />
              <text
                x={line.x2 + 4}
                y={line.y2 + 4}
                fontFamily={FONT}
                fontSize={10}
                fill={colors.brand.primary}
                opacity={0.7}
              >
                WB {wb}°
              </text>
            </g>
          );
        })}

        {/* Constant RH curves */}
        {[10, 30, 50, 70, 90].map((rh) => {
          const points = rhCurve(rh);
          const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
          return (
            <g key={`rh-${rh}`}>
              <path d={path} stroke={colors.warn} strokeWidth={1} strokeDasharray="2,2" fill="none" opacity={0.4} />
              <text
                x={points[points.length - 1].x - 6}
                y={points[points.length - 1].y - 6}
                fontFamily={FONT}
                fontSize={9}
                fill={colors.warn}
                opacity={0.6}
              >
                {rh}% RH
              </text>
            </g>
          );
        })}

        {/* Saturation curve (100% RH) */}
        <path
          d={SATURATION_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xForDB(p.db)} ${yForW(p.w)}`).join(' ')}
          stroke={colors.brand.primaryDark}
          strokeWidth={2.5}
          fill="none"
        />
        <text x={xForDB(70)} y={yForW(110) - 12} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
          Saturation (100% RH)
        </text>

        {/* X axis */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />
        {[30, 50, 70, 90, 110].map((db) => (
          <g key={db}>
            <line x1={xForDB(db)} y1={Y_BOTTOM} x2={xForDB(db)} y2={Y_BOTTOM + 5} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForDB(db)} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {db}°F
            </text>
          </g>
        ))}
        <text x={(X_MIN + X_MAX) / 2} y={Y_BOTTOM + 48} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Dry bulb temperature (°F)
        </text>

        {/* Y axis */}
        <line x1={X_MAX} y1={Y_TOP} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />
        {[0, 50, 100, 150, 200].map((w) => (
          <g key={w}>
            <line x1={X_MAX} y1={yForW(w)} x2={X_MAX + 5} y2={yForW(w)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MAX + 10} y={yForW(w) + 4} fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {w}
            </text>
          </g>
        ))}
        <text
          x={X_MAX + 50}
          y={(Y_TOP + Y_BOTTOM) / 2}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.axisLabel}
          fontWeight={typography.weight.label}
          fill={colors.ink[700]}
          transform={`rotate(90 ${X_MAX + 50} ${(Y_TOP + Y_BOTTOM) / 2})`}
        >
          Humidity ratio (grains / lb dry air)
        </text>

        {/* Sample point */}
        <circle cx={SAMPLE_X} cy={SAMPLE_Y} r={7} fill={colors.danger} stroke={colors.ink[900]} strokeWidth={1.5} />
        <text x={SAMPLE_X + 12} y={SAMPLE_Y - 8} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.danger}>
          90°F DB, 50% RH
        </text>
        <text x={SAMPLE_X + 12} y={SAMPLE_Y + 8} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          → WB 78°F, DP 70°F
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        One point on the chart determines all six state properties: dry bulb, wet bulb, dew point, RH, humidity ratio, and enthalpy.
      </figcaption>
    </figure>
  );
}
