import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function UFactorVsRValue({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="u-factor-vs-r-value-title"
        descId="u-factor-vs-r-value-desc"
        title="U-factor and R-value as inverse measures of heat transfer"
        desc="Diagram showing the inverse relationship between U-factor and R-value. Left side: insulation rated by R-value with R-19, R-30, R-49, R-60 along the side and an arrow indicating higher is better. Right side: windows rated by U-factor with U-1.04, U-0.50, U-0.30, U-0.20 along the side and an arrow indicating lower is better. Center: the formula U equals 1 divided by R with examples: U-0.50 equals R-2.0, U-0.30 equals R-3.3, U-0.20 equals R-5.0. U-factor and R-value measure the same thing from opposite directions. Insulation uses R; windows use U."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          U-factor and R-value are inverses
        </text>

        {/* Left: R-value (insulation) */}
        <g transform="translate(60,90)">
          <rect width={280} height={340} rx={10} fill={colors.brand.primary} fillOpacity={0.08} stroke={colors.brand.primary} strokeWidth={2} />
          <text x={140} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            R-value (insulation)
          </text>
          <text x={140} y={52} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
            walls, attic, basement
          </text>

          <g transform="translate(20,80)">
            <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.ink[900]}>
              R-60 ← high performance
            </text>
            <text y={36} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              R-49 ← cold-climate ceiling
            </text>
            <text y={72} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              R-30 ← warm-climate ceiling
            </text>
            <text y={108} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              R-19 ← code wall
            </text>
            <text y={144} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              R-13 ← minimum wall
            </text>
            <text y={184} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>
              R-1 ← single-pane glass
            </text>
          </g>

          {/* Up-arrow for "higher = better" */}
          <g transform="translate(240,140)">
            <line x1={0} y1={120} x2={0} y2={-30} stroke={colors.good} strokeWidth={2.5} markerEnd="url(#u-vs-r-up-arrow)" />
            <text x={6} y={140} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.good}>
              higher
            </text>
            <text x={6} y={155} fontFamily={FONT} fontSize={10} fill={colors.good}>
              = better
            </text>
          </g>
        </g>

        {/* Center: U = 1/R formula */}
        <g transform="translate(420,200)">
          <rect width={160} height={120} rx={10} fill={colors.surface.canvas} stroke={colors.ink[900]} strokeWidth={2.5} />
          <text x={80} y={30} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            U = 1 / R
          </text>
          <line x1={20} y1={45} x2={140} y2={45} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={80} y={66} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            U-0.30 = R-3.3
          </text>
          <text x={80} y={84} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            U-0.50 = R-2.0
          </text>
          <text x={80} y={102} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            U-1.04 = R-0.96
          </text>
        </g>

        {/* Right: U-factor (windows) */}
        <g transform="translate(660,90)">
          <rect width={280} height={340} rx={10} fill={colors.warn} fillOpacity={0.08} stroke={colors.warn} strokeWidth={2} />
          <text x={140} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
            U-factor (windows)
          </text>
          <text x={140} y={52} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
            fenestration only
          </text>

          <g transform="translate(20,80)">
            <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>
              U-1.04 ← single-pane
            </text>
            <text y={36} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              U-0.50 ← basic double-pane
            </text>
            <text y={72} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              U-0.30 ← good Low-E
            </text>
            <text y={108} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              U-0.27 ← argon + warm-edge
            </text>
            <text y={144} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              U-0.20 ← triple-pane
            </text>
            <text y={184} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.good}>
              U-0.15 ← passive house
            </text>
          </g>

          {/* Down-arrow for "lower = better" */}
          <g transform="translate(240,140)">
            <line x1={0} y1={-30} x2={0} y2={120} stroke={colors.good} strokeWidth={2.5} markerEnd="url(#u-vs-r-down-arrow)" />
            <text x={6} y={140} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.good}>
              lower
            </text>
            <text x={6} y={155} fontFamily={FONT} fontSize={10} fill={colors.good}>
              = better
            </text>
          </g>
        </g>

        <defs>
          <marker id="u-vs-r-up-arrow" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 4 0 L 8 8 L 0 8 z" fill={colors.good} />
          </marker>
          <marker id="u-vs-r-down-arrow" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 4 8 L 8 0 L 0 0 z" fill={colors.good} />
          </marker>
        </defs>

        <text x={500} y={476} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Same physics, two conventions. Insulation uses R-value, windows use U-factor.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        U-factor and R-value are mathematical inverses. Higher R-value or lower U-factor both mean better insulation.
      </figcaption>
    </figure>
  );
}
