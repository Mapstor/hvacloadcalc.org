import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 250;
const X_MAX = 800;
const TONS_MAX = 4;

function xForTons(tons: number): number {
  return X_MIN + (tons / TONS_MAX) * (X_MAX - X_MIN);
}

export function RuleOfThumbVsManualJ({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="rule-of-thumb-vs-manual-j-title"
        descId="rule-of-thumb-vs-manual-j-desc"
        title="Rule of thumb sizing compared to Manual J sizing"
        desc="Two horizontal bars comparing heat pump sizing methods for the same hypothetical 2,000 square foot home. Top bar rule of thumb at 1 ton per 600 square feet produces 3.3 tons or 40,000 BTU per hour. Bottom bar Manual J calculation produces 2.5 tons or 30,000 BTU per hour. Rule of thumb is 32 percent larger than Manual J. The oversizing leads to short cycling in cooling, more aux heat reliance in heating, and higher purchase price. Right-side note: rule of thumb ignores insulation, windows, infiltration, and orientation."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Rule of thumb vs Manual J for the same home
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same 2,000 sq ft home, two methods, very different answers
        </text>

        {/* Scale axis at top */}
        <line x1={X_MIN} y1={100} x2={X_MAX} y2={100} stroke={colors.ink[700]} strokeWidth={1.5} />
        {[0, 1, 2, 3, 4].map((t) => (
          <g key={t}>
            <line x1={xForTons(t)} y1={94} x2={xForTons(t)} y2={106} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTons(t)} y={86} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {t} ton
            </text>
          </g>
        ))}

        {/* Rule of thumb bar */}
        <g>
          <text x={X_MIN - 16} y={156} textAnchor="end" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.danger}>
            Rule of thumb
          </text>
          <text x={X_MIN - 16} y={172} textAnchor="end" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
            (1 ton / 600 sq ft)
          </text>
          <rect x={X_MIN} y={140} width={xForTons(3.3) - X_MIN} height={48} fill={colors.danger} fillOpacity={0.7} stroke={colors.danger} strokeWidth={2} />
          <text x={xForTons(3.3) + 12} y={166} fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.danger}>
            3.3 tons
          </text>
          <text x={xForTons(3.3) + 12} y={184} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            40,000 BTU/hr
          </text>
        </g>

        {/* Manual J bar */}
        <g>
          <text x={X_MIN - 16} y={246} textAnchor="end" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.good}>
            Manual J
          </text>
          <text x={X_MIN - 16} y={262} textAnchor="end" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
            (actual loads)
          </text>
          <rect x={X_MIN} y={230} width={xForTons(2.5) - X_MIN} height={48} fill={colors.good} fillOpacity={0.7} stroke={colors.good} strokeWidth={2} />
          <text x={xForTons(2.5) + 12} y={256} fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.good}>
            2.5 tons
          </text>
          <text x={xForTons(2.5) + 12} y={274} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            30,000 BTU/hr
          </text>
        </g>

        {/* Annotation arrow */}
        <g>
          <line x1={xForTons(2.5)} y1={205} x2={xForTons(3.3)} y2={205} stroke={colors.ink[700]} strokeWidth={1.5} strokeDasharray="3,2" />
          <text x={(xForTons(2.5) + xForTons(3.3)) / 2} y={200} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
            32% larger
          </text>
        </g>

        {/* Caveat box */}
        <g transform="translate(150,320)">
          <rect width={700} height={120} rx={6} fill={colors.warn} fillOpacity={0.08} stroke={colors.warn} strokeWidth={1.5} />
          <text x={20} y={28} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
            Rule of thumb ignores:
          </text>
          <text x={20} y={52} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Insulation quality (R-30 vs R-60 attic makes a 20% difference)
          </text>
          <text x={20} y={72} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Window U-factor and area (U-0.30 vs U-0.55 affects load by 15%)
          </text>
          <text x={20} y={92} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Air infiltration (3 ACH50 vs 7 ACH50 affects load by 10-25%)
          </text>
          <text x={20} y={112} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Orientation, internal gains, climate severity, ductwork condition
          </text>
        </g>

        <text x={500} y={475} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Result of rule-of-thumb: oversized cooling, less aux help in heating, ~30-50% higher equipment cost than needed.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Rule of thumb sizing typically produces 30-50% oversized equipment compared to Manual J for modern homes.
      </figcaption>
    </figure>
  );
}
