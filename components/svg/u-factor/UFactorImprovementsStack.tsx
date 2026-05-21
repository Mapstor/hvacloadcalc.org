import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Improvement {
  label: string;
  uFactor: number;
  priceNote: string;
  color: string;
}

const IMPROVEMENTS: Improvement[] = [
  { label: 'Single pane (baseline)', uFactor: 1.04, priceNote: 'baseline cost', color: '#fda4af' },
  { label: '+ Second pane (air-filled)', uFactor: 0.50, priceNote: '+$3-5/sf', color: '#fdba74' },
  { label: '+ Low-E coating', uFactor: 0.35, priceNote: '+$1-2/sf', color: '#fbbf24' },
  { label: '+ Argon gas fill', uFactor: 0.30, priceNote: '+$1/sf', color: '#a3e635' },
  { label: '+ Warm-edge spacer', uFactor: 0.27, priceNote: '+$0.50/sf', color: '#22c55e' },
  { label: '+ Triple pane', uFactor: 0.20, priceNote: '+$3-8/sf', color: '#0ea5e9' },
  { label: '+ Two Low-E + krypton', uFactor: 0.15, priceNote: '+$8-15/sf', color: '#1d4ed8' },
];

const X_LABEL_END = 290;
const X_BAR_START = 300;
const X_BAR_END = 760;
const U_MAX = 1.1;
const ROW_HEIGHT = 56;
const Y_TOP = 110;

function barWidth(u: number): number {
  return (u / U_MAX) * (X_BAR_END - X_BAR_START);
}

export function UFactorImprovementsStack({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 580"
        titleId="u-factor-improvements-stack-title"
        descId="u-factor-improvements-stack-desc"
        title="U-factor improvements from successive window features"
        desc="Horizontal bar chart showing how each successive feature reduces U-factor from a single-pane baseline. Single pane baseline U-1.04 in light red, baseline cost. Adding a second air-filled pane drops U-factor to U-0.50 in orange, plus 3 to 5 dollars per square foot. Adding a Low-E coating drops to U-0.35 in yellow, plus 1 to 2 dollars per square foot. Adding argon fill drops to U-0.30 in light green, plus 1 dollar per square foot. Adding a warm-edge spacer drops to U-0.27 in green, plus half-dollar per square foot. Adding a triple pane drops to U-0.20 in blue, plus 3 to 8 dollars per square foot. Adding a second Low-E plus krypton drops to U-0.15 in dark blue, plus 8 to 15 dollars per square foot."
        className="w-full"
      >
        <rect width={1000} height={580} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          What features lower U-factor (and what they cost)
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Each row adds one feature to the prior row
        </text>

        {/* X-axis scale */}
        <g>
          <line x1={X_BAR_START} y1={86} x2={X_BAR_END} y2={86} stroke={colors.ink[700]} strokeWidth={1.5} />
          {[0, 0.25, 0.5, 0.75, 1.0].map((u) => (
            <g key={u}>
              <line x1={X_BAR_START + barWidth(u)} y1={80} x2={X_BAR_START + barWidth(u)} y2={92} stroke={colors.ink[700]} strokeWidth={1} />
              <text x={X_BAR_START + barWidth(u)} y={76} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
                U-{u.toFixed(2)}
              </text>
            </g>
          ))}
        </g>

        {/* Rows */}
        {IMPROVEMENTS.map((imp, i) => {
          const y = Y_TOP + i * ROW_HEIGHT;
          return (
            <g key={imp.label}>
              {/* Label */}
              <text x={X_LABEL_END} y={y + 14} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={i === 0 ? typography.weight.title : typography.weight.label} fill={colors.ink[900]}>
                {imp.label}
              </text>
              <text x={X_LABEL_END} y={y + 30} textAnchor="end" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                {imp.priceNote}
              </text>

              {/* Bar */}
              <rect
                x={X_BAR_START}
                y={y}
                width={barWidth(imp.uFactor)}
                height={32}
                fill={imp.color}
                fillOpacity={0.85}
                stroke={imp.color}
                strokeWidth={1.5}
              />

              {/* U-factor label */}
              <text
                x={X_BAR_START + barWidth(imp.uFactor) + 8}
                y={y + 20}
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.title}
                fill={colors.ink[900]}
              >
                U-{imp.uFactor.toFixed(2)}
              </text>
            </g>
          );
        })}

        <text x={500} y={540} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Each improvement stacks. The combined effect is multiplicative — and the price stack adds up too.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Most quality windows sold in 2024 use Low-E + argon by default (U-0.30 territory). Triple-pane and passive-house spec costs more, justified mainly in cold climates.
      </figcaption>
    </figure>
  );
}
