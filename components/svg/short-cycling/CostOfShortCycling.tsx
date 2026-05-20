import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface MetricRow {
  label: string;
  goodValue: string;
  badValue: string;
  delta: string;
  ratio: number;
}

const METRICS: MetricRow[] = [
  { label: 'Hourly energy draw', goodValue: '1.0 kW', badValue: '1.6 kW', delta: '+60%', ratio: 1.6 },
  { label: 'Indoor humidity', goodValue: '50% RH', badValue: '65% RH', delta: '+15 pts', ratio: 1.3 },
  { label: 'Annual operating cost (2-ton)', goodValue: '$240', badValue: '$384', delta: '+$144/yr', ratio: 1.6 },
  { label: 'Compressor lifespan', goodValue: '12-15 yrs', badValue: '6-8 yrs', delta: '−50%', ratio: 0.5 },
];

const ROW_HEIGHT = 80;
const ROW_TOP = 80;
const BAR_AREA_X = 280;
const BAR_AREA_WIDTH = 360;
const BAR_HEIGHT = 22;

export function CostOfShortCycling({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="cost-of-short-cycling-title"
        descId="cost-of-short-cycling-desc"
        title="Four costs of AC short cycling"
        desc="Four metric comparisons between a properly cycling AC in green and a short cycling AC in red. Hourly energy draw: 1.0 kW vs 1.6 kW, a 60 percent increase. Indoor humidity: 50 percent RH vs 65 percent RH, plus 15 points feels warmer. Annual operating cost for a 2-ton unit: $240 vs $384, plus $144 per year at 2024 US average rates. Compressor lifespan: 12-15 years vs 6-8 years, roughly half."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The cost of short cycling
        </text>

        {METRICS.map((m, i) => {
          const y = ROW_TOP + i * ROW_HEIGHT;
          const goodWidth = Math.min(BAR_AREA_WIDTH * 0.6, 200);
          const badWidth = Math.min(BAR_AREA_WIDTH * 0.6 * m.ratio, BAR_AREA_WIDTH);
          return (
            <g key={m.label} transform={`translate(0,${y})`}>
              <text x={30} y={20} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {m.label}
              </text>

              {/* Good bar */}
              <rect x={BAR_AREA_X} y={6} width={goodWidth} height={BAR_HEIGHT} fill={colors.good} fillOpacity={0.85} rx={3} />
              <text x={BAR_AREA_X + goodWidth + 8} y={22} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.good}>
                {m.goodValue}
              </text>

              {/* Bad bar */}
              <rect x={BAR_AREA_X} y={36} width={badWidth} height={BAR_HEIGHT} fill={colors.danger} fillOpacity={0.85} rx={3} />
              <text x={BAR_AREA_X + badWidth + 8} y={52} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>
                {m.badValue}
              </text>

              {/* Delta label */}
              <text x={970} y={36} textAnchor="end" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.danger}>
                {m.delta}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(30,440)">
          <rect width={16} height={14} fill={colors.good} fillOpacity={0.85} rx={2} />
          <text x={22} y={11} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Properly cycling</text>
          <rect x={170} y={0} width={16} height={14} fill={colors.danger} fillOpacity={0.85} rx={2} />
          <text x={192} y={11} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Short cycling</text>
          <text x={350} y={11} fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            Costs assume 1,500 cooling hours/year at $0.16/kWh (2024 EIA US avg).
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Short cycling wastes electricity, traps humidity, and halves compressor lifespan. The cost compounds every season.
      </figcaption>
    </figure>
  );
}
