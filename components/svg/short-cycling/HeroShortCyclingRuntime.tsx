import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface CyclePattern {
  y: number;
  label: string;
  sublabel: string;
  color: string;
  segments: Array<{ start: number; width: number; on: boolean }>;
}

const NORMAL: CyclePattern = {
  y: 110,
  label: 'Normal cycling',
  sublabel: 'Removes humidity, stable temperature, efficient.',
  color: colors.good,
  segments: [
    { start: 0, width: 22, on: true },
    { start: 22, width: 5, on: false },
    { start: 27, width: 24, on: true },
    { start: 51, width: 5, on: false },
    { start: 56, width: 20, on: true },
    { start: 76, width: 4, on: false },
    { start: 80, width: 18, on: true },
    { start: 98, width: 2, on: false },
  ],
};

const SHORT: CyclePattern = {
  y: 340,
  label: 'Short cycling',
  sublabel: 'Humidity rises, temperature swings, wastes energy, shortens compressor life.',
  color: colors.danger,
  segments: [
    { start: 0, width: 4, on: true },
    { start: 4, width: 4, on: false },
    { start: 8, width: 4, on: true },
    { start: 12, width: 4, on: false },
    { start: 16, width: 3, on: true },
    { start: 19, width: 5, on: false },
    { start: 24, width: 4, on: true },
    { start: 28, width: 4, on: false },
    { start: 32, width: 3, on: true },
    { start: 35, width: 4, on: false },
    { start: 39, width: 4, on: true },
    { start: 43, width: 4, on: false },
    { start: 47, width: 4, on: true },
    { start: 51, width: 4, on: false },
    { start: 55, width: 3, on: true },
    { start: 58, width: 5, on: false },
    { start: 63, width: 4, on: true },
    { start: 67, width: 4, on: false },
    { start: 71, width: 3, on: true },
    { start: 74, width: 4, on: false },
    { start: 78, width: 4, on: true },
    { start: 82, width: 4, on: false },
    { start: 86, width: 3, on: true },
    { start: 89, width: 5, on: false },
    { start: 94, width: 4, on: true },
    { start: 98, width: 2, on: false },
  ],
};

const TRACK_X = 80;
const TRACK_WIDTH = 1040;
const TRACK_HEIGHT = 80;

function Track({ pattern }: { pattern: CyclePattern }) {
  return (
    <g transform={`translate(${TRACK_X},${pattern.y})`}>
      <text x={0} y={-14} fontFamily={FONT} fontSize={16} fontWeight={typography.weight.title} fill={pattern.color}>
        {pattern.label}
      </text>
      <rect width={TRACK_WIDTH} height={TRACK_HEIGHT} rx={4} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
      {pattern.segments.map((seg, i) => (
        <rect
          key={i}
          x={(seg.start / 100) * TRACK_WIDTH}
          y={4}
          width={(seg.width / 100) * TRACK_WIDTH}
          height={TRACK_HEIGHT - 8}
          fill={seg.on ? pattern.color : colors.ink[100]}
          fillOpacity={seg.on ? 0.88 : 0.4}
          rx={2}
        />
      ))}
      <text x={0} y={TRACK_HEIGHT + 22} fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
        {pattern.sublabel}
      </text>
    </g>
  );
}

export function HeroShortCyclingRuntime({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-short-cycling-runtime-title"
        descId="hero-short-cycling-runtime-desc"
        title="Normal AC cycling versus short cycling over one hour"
        desc="Timeline comparison of one hour of AC runtime. The top bar in green shows normal cycling with three or four long ON periods of ten to fifteen minutes each, removing humidity and maintaining stable temperature. The bottom bar in red shows short cycling with twelve to fifteen short ON periods of two to four minutes each, causing humidity to rise, temperature to swing, energy waste, and compressor wear."
        className="w-full"
      >
        <rect width={1200} height={500} fill={colors.surface.canvas} />

        <text x={600} y={50} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          One hour of operation: normal vs short cycling
        </text>

        <Track pattern={NORMAL} />
        <Track pattern={SHORT} />

        {/* Time axis */}
        <g transform={`translate(${TRACK_X},460)`}>
          <line x1={0} y1={0} x2={TRACK_WIDTH} y2={0} stroke={colors.ink[500]} strokeWidth={1} />
          {[0, 15, 30, 45, 60].map((m) => (
            <g key={m}>
              <line x1={(m / 60) * TRACK_WIDTH} y1={-4} x2={(m / 60) * TRACK_WIDTH} y2={4} stroke={colors.ink[500]} strokeWidth={1} />
              <text x={(m / 60) * TRACK_WIDTH} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[500]}>
                {m} min
              </text>
            </g>
          ))}
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        A properly cycling AC runs 10-15 minutes per cycle, 3-4 cycles per hour. Short cycling is under-5-minute cycles, 6+ per hour.
      </figcaption>
    </figure>
  );
}
