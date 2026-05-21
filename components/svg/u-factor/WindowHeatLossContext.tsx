import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface SliceData {
  label: string;
  pct: number;
  color: string;
}

const SLICES: SliceData[] = [
  { label: 'Air infiltration', pct: 25, color: '#fbbf24' },
  { label: 'Windows', pct: 20, color: '#0ea5e9' },
  { label: 'Ceiling / attic', pct: 20, color: '#fb923c' },
  { label: 'Walls', pct: 17, color: '#a3e635' },
  { label: 'Foundation', pct: 12, color: '#94a3b8' },
  { label: 'Doors / other', pct: 6, color: '#c4b5fd' },
];

const CX = 240;
const CY = 280;
const R = 130;

function polarPoint(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(angleRad), cy + r * Math.sin(angleRad)];
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const [x1, y1] = polarPoint(cx, cy, r, startDeg);
  const [x2, y2] = polarPoint(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

export function WindowHeatLossContext({ className }: { className?: string }) {
  let cumDeg = 0;
  const slices = SLICES.map((s) => {
    const start = cumDeg;
    const end = cumDeg + (s.pct / 100) * 360;
    cumDeg = end;
    return { ...s, start, end };
  });

  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="window-heat-loss-context-title"
        descId="window-heat-loss-context-desc"
        title="Window heat loss in context of total home heat loss"
        desc="Pie chart of typical winter heat loss for a US home. Air infiltration 25 percent, windows 20 percent, ceiling and attic 20 percent, walls 17 percent, foundation 12 percent, doors and other 6 percent. Annotation pointing to windows slice: windows lose 5 to 10 times more heat per square foot than walls. Side-by-side comparison block: R-19 wall section heat loss 0.077 BTU per hour per square foot per degree F, single-pane window U-1.04 heat loss 1.04 BTU per hour per square foot per degree F, ratio annotated as 13.5 times the heat loss per square foot."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Windows in the total heat loss picture
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Typical winter heat loss breakdown for a US home
        </text>

        {/* Pie chart */}
        <g>
          {slices.map((s) => {
            const midDeg = (s.start + s.end) / 2;
            const [labelX, labelY] = polarPoint(CX, CY, R + 30, midDeg);
            return (
              <g key={s.label}>
                <path
                  d={arcPath(CX, CY, R, s.start, s.end)}
                  fill={s.color}
                  fillOpacity={0.85}
                  stroke={colors.surface.canvas}
                  strokeWidth={2}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={labelX < CX ? 'end' : 'start'}
                  fontFamily={FONT}
                  fontSize={11}
                  fontWeight={typography.weight.label}
                  fill={colors.ink[900]}
                >
                  {s.label}
                </text>
                <text
                  x={labelX}
                  y={labelY + 14}
                  textAnchor={labelX < CX ? 'end' : 'start'}
                  fontFamily={FONT}
                  fontSize={10}
                  fill={colors.ink[700]}
                >
                  {s.pct}%
                </text>
              </g>
            );
          })}
        </g>

        {/* Highlight windows slice */}
        <g transform="translate(380,440)">
          <line x1={-130} y1={-110} x2={-20} y2={-10} stroke={colors.ink[500]} strokeWidth={1} strokeDasharray="3,2" />
          <rect x={-20} y={-10} width={200} height={60} rx={6} fill={colors.brand.primary} fillOpacity={0.12} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={80} y={10} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Windows: 20% of heat loss
          </text>
          <text x={80} y={28} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            from only 10-15% of envelope area
          </text>
          <text x={80} y={44} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
            5-10× more loss per sq ft vs walls
          </text>
        </g>

        {/* Side-by-side per-sq-ft comparison */}
        <g transform="translate(540,140)">
          <text x={200} y={0} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Heat loss per square foot at ΔT=50°F
          </text>

          <g transform="translate(0,30)">
            <rect width={400} height={80} rx={6} fill={colors.brand.primary} fillOpacity={0.08} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={20} y={26} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primary}>
              R-19 wall section
            </text>
            <text x={20} y={48} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              U = 1/19 = 0.053
            </text>
            <text x={20} y={68} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.brand.primary}>
              2.6 BTU/hr per sq ft
            </text>
          </g>

          <g transform="translate(0,130)">
            <rect width={400} height={80} rx={6} fill={colors.danger} fillOpacity={0.08} stroke={colors.danger} strokeWidth={1.5} />
            <text x={20} y={26} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.danger}>
              Single-pane window U-1.04
            </text>
            <text x={20} y={48} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              U = 1.04
            </text>
            <text x={20} y={68} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.danger}>
              52 BTU/hr per sq ft
            </text>
          </g>

          <g transform="translate(0,230)">
            <rect width={400} height={60} rx={6} fill={colors.ink[900]} fillOpacity={0.05} stroke={colors.ink[700]} strokeWidth={1.5} />
            <text x={200} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Window loses ~20× more
            </text>
            <text x={200} y={46} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
              per square foot than wall, at the same ΔT
            </text>
          </g>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Windows punch above their weight in the heat loss budget because per-square-foot heat transfer is much higher than insulated wall sections.
      </figcaption>
    </figure>
  );
}
