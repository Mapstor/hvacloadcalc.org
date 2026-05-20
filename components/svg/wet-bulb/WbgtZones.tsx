import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Zone {
  start: number;
  end: number;
  color: string;
  label: string;
  guidance: string;
}

const ZONES: Zone[] = [
  { start: 75, end: 80, color: colors.good, label: 'Green', guidance: 'Normal activity' },
  { start: 80, end: 84, color: colors.warn, label: 'Yellow', guidance: 'Caution: slow pace' },
  { start: 84, end: 88, color: '#fb923c', label: 'Orange', guidance: 'Extreme caution: frequent breaks' },
  { start: 88, end: 92, color: colors.danger, label: 'Red', guidance: 'Limit strenuous activity' },
  { start: 92, end: 100, color: '#7f1d1d', label: 'Dark red', guidance: 'Suspend most outdoor activity' },
];

const X_MIN = 60;
const X_MAX = 940;
const BAR_Y = 180;
const BAR_HEIGHT = 70;
const TEMP_MIN = 75;
const TEMP_MAX = 100;

function xForTemp(t: number): number {
  return X_MIN + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X_MAX - X_MIN);
}

export function WbgtZones({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="wbgt-zones-title"
        descId="wbgt-zones-desc"
        title="WBGT thresholds for outdoor activity"
        desc="Horizontal stacked bar chart showing Wet Bulb Globe Temperature thresholds for outdoor activity on a scale from 75 to 100 degrees Fahrenheit. Green zone under 80 degrees: normal activity. Yellow zone 80 to 84 degrees: caution, slow pace. Orange zone 84 to 88 degrees: extreme caution, frequent breaks. Red zone 88 to 92 degrees: limit strenuous activity. Dark red zone above 92 degrees: suspend most outdoor activity. Source NIOSH WBGT thresholds for occupational heat stress."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={40} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          WBGT zones for outdoor activity
        </text>
        <text x={500} y={62} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Per NIOSH, for non-acclimatized workers in moderate exertion
        </text>

        {/* Color bar */}
        {ZONES.map((zone) => {
          const x1 = xForTemp(zone.start);
          const x2 = xForTemp(zone.end);
          const xMid = (x1 + x2) / 2;
          return (
            <g key={zone.label}>
              <rect
                x={x1}
                y={BAR_Y}
                width={x2 - x1}
                height={BAR_HEIGHT}
                fill={zone.color}
                fillOpacity={0.85}
                stroke={colors.ink[900]}
                strokeWidth={0.5}
              />
              <text
                x={xMid}
                y={BAR_Y + 28}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.title}
                fill={colors.surface.canvas}
              >
                {zone.label}
              </text>
              <text
                x={xMid}
                y={BAR_Y + 50}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={10}
                fill={colors.surface.canvas}
              >
                {zone.guidance}
              </text>
            </g>
          );
        })}

        {/* Scale */}
        {[75, 80, 85, 90, 95, 100].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t)} y1={BAR_Y + BAR_HEIGHT} x2={xForTemp(t)} y2={BAR_Y + BAR_HEIGHT + 6} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTemp(t)} y={BAR_Y + BAR_HEIGHT + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
              {t}°F
            </text>
          </g>
        ))}
        <text x={500} y={BAR_Y + BAR_HEIGHT + 48} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          WBGT (°F)
        </text>

        {/* Explanation */}
        <g transform="translate(60,360)">
          <rect width={880} height={80} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Acclimatized workers tolerate WBGT roughly 2°F higher than these thresholds.
          </text>
          <text x={20} y={50} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            WBGT = 0.7 × natural wet bulb + 0.2 × globe temperature + 0.1 × dry bulb (outdoor with sun).
          </text>
          <text x={20} y={68} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Source: NIOSH criteria for occupational heat exposure (2016 update).
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        WBGT thresholds drive work-rest cycles in occupational, athletic, and military settings. NIOSH publishes the authoritative criteria.
      </figcaption>
    </figure>
  );
}
