import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface CyclePattern {
  y: number;
  label: string;
  color: string;
  segments: Array<{ start: number; width: number; on: boolean }>;
}

const PROPERLY_SIZED: CyclePattern = {
  y: 100,
  label: 'Properly sized 3-ton AC',
  color: colors.good,
  segments: [
    { start: 0, width: 18, on: true },
    { start: 18, width: 6, on: false },
    { start: 24, width: 22, on: true },
    { start: 46, width: 6, on: false },
    { start: 52, width: 18, on: true },
    { start: 70, width: 5, on: false },
    { start: 75, width: 20, on: true },
    { start: 95, width: 5, on: false },
  ],
};

const OVERSIZED: CyclePattern = {
  y: 280,
  label: 'Oversized 5-ton AC for same home',
  color: colors.danger,
  segments: [
    { start: 0, width: 6, on: true },
    { start: 6, width: 8, on: false },
    { start: 14, width: 5, on: true },
    { start: 19, width: 10, on: false },
    { start: 29, width: 5, on: true },
    { start: 34, width: 9, on: false },
    { start: 43, width: 6, on: true },
    { start: 49, width: 8, on: false },
    { start: 57, width: 5, on: true },
    { start: 62, width: 10, on: false },
    { start: 72, width: 5, on: true },
    { start: 77, width: 9, on: false },
    { start: 86, width: 6, on: true },
    { start: 92, width: 8, on: false },
  ],
};

const TRACK_X = 80;
const TRACK_WIDTH = 800;
const TRACK_HEIGHT = 56;

function Track({ pattern }: { pattern: CyclePattern }) {
  return (
    <g transform={`translate(${TRACK_X},${pattern.y})`}>
      <text x={-10} y={-10} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={pattern.color}>
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
          fillOpacity={seg.on ? 0.85 : 0.4}
          rx={3}
        />
      ))}
    </g>
  );
}

export function OversizingImpact({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="oversizing-impact-title"
        descId="oversizing-impact-desc"
        title="Compressor cycling: properly sized versus oversized"
        desc="Two timeline bars comparing one hour of compressor operation. The top bar in green shows a properly sized 3-ton air conditioner with three or four long ON periods separated by short OFF periods, producing stable temperature, good dehumidification, and comfortable conditions. The bottom bar in red shows an oversized 5-ton air conditioner for the same home with many short ON periods interrupted by longer OFF periods, producing rapid cooling cycles that fail to remove humidity and cause uneven temperature swings."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={40} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          1 hour of operation: same heat load, two different sizes
        </text>

        <Track pattern={PROPERLY_SIZED} />
        <Track pattern={OVERSIZED} />

        {/* Time axis */}
        <g transform={`translate(${TRACK_X},370)`}>
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

        {/* Annotations */}
        <text x={500} y={195} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
          Long runtimes → stable temperature, sustained dehumidification
        </text>
        <text x={500} y={375} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
          Short cycles → quick cool, humidity rises, comfort suffers
        </text>

        {/* Legend */}
        <g transform="translate(80,440)">
          <rect width={16} height={14} fill={colors.good} fillOpacity={0.85} rx={2} />
          <text x={22} y={11} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Compressor on</text>
          <rect x={170} y={0} width={16} height={14} fill={colors.ink[100]} fillOpacity={0.6} stroke={colors.ink[300]} strokeWidth={1} rx={2} />
          <text x={192} y={11} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Compressor off</text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Oversized systems reach setpoint fast, shut off, then short-cycle. Sustained runtime is what removes humidity.
      </figcaption>
    </figure>
  );
}
