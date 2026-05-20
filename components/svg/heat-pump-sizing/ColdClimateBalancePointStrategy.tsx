import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface StrategyProps {
  x: number;
  num: number;
  title: string;
  balancePointF: number;
  auxRuntime: 'high' | 'medium' | 'low';
  coolingFit: 'tight' | 'oversized' | 'slightly-oversized';
  description: string;
  recommended: boolean;
}

const TEMP_MIN = -10;
const TEMP_MAX = 65;
const BAR_HEIGHT = 24;

function xForTemp(t: number, panelOffset: number): number {
  const innerWidth = 240;
  return panelOffset + 20 + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * innerWidth;
}

function Strategy({ x, num, title, balancePointF, auxRuntime, coolingFit, description, recommended }: StrategyProps) {
  const borderColor = recommended ? colors.good : colors.ink[300];
  const borderWidth = recommended ? 2.5 : 1.5;
  const auxColor = auxRuntime === 'high' ? colors.danger : auxRuntime === 'medium' ? colors.warn : colors.good;
  const fitColor = coolingFit === 'oversized' ? colors.danger : coolingFit === 'slightly-oversized' ? colors.warn : colors.good;

  return (
    <g transform={`translate(${x},80)`}>
      <rect width={300} height={460} rx={10} fill={colors.surface.canvas} stroke={borderColor} strokeWidth={borderWidth} />

      {/* Header */}
      <g>
        <circle cx={30} cy={32} r={16} fill={recommended ? colors.good : colors.ink[500]} />
        <text x={30} y={38} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
          {num}
        </text>
        <text x={56} y={28} fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {title}
        </text>
        {recommended && (
          <g transform="translate(56,38)">
            <text fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.good}>
              Typical for cold climates
            </text>
          </g>
        )}
      </g>

      {/* Temperature axis */}
      <g transform="translate(0,80)">
        <line x1={20} y1={0} x2={260} y2={0} stroke={colors.ink[700]} strokeWidth={1.5} />
        {[-10, 5, 25, 45, 65].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t, 0)} y1={-4} x2={xForTemp(t, 0)} y2={4} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTemp(t, 0)} y={16} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
              {t}°
            </text>
          </g>
        ))}
        <text x={150} y={34} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          outdoor temperature
        </text>
      </g>

      {/* Heat pump operating range bar */}
      <g transform="translate(0,140)">
        <text x={20} y={-6} fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.brand.primary}>
          Heat pump alone
        </text>
        <rect
          x={xForTemp(balancePointF, 0)}
          y={0}
          width={xForTemp(TEMP_MAX, 0) - xForTemp(balancePointF, 0)}
          height={BAR_HEIGHT}
          fill={colors.brand.primary}
          fillOpacity={0.7}
          stroke={colors.brand.primary}
          strokeWidth={1.5}
        />
        {/* Aux zone */}
        <rect
          x={xForTemp(TEMP_MIN, 0)}
          y={0}
          width={xForTemp(balancePointF, 0) - xForTemp(TEMP_MIN, 0)}
          height={BAR_HEIGHT}
          fill={colors.danger}
          fillOpacity={0.6}
          stroke={colors.danger}
          strokeWidth={1.5}
        />
        <text
          x={xForTemp(TEMP_MIN, 0) + 6}
          y={16}
          fontFamily={FONT}
          fontSize={9}
          fontWeight={typography.weight.title}
          fill={colors.surface.canvas}
        >
          aux
        </text>
        {/* Balance point marker */}
        <g transform={`translate(${xForTemp(balancePointF, 0)},${BAR_HEIGHT / 2})`}>
          <line x1={0} y1={-18} x2={0} y2={BAR_HEIGHT + 6} stroke={colors.ink[900]} strokeWidth={2} />
          <text y={-22} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            BP {balancePointF}°F
          </text>
        </g>
      </g>

      {/* Stat rows */}
      <g transform="translate(20,210)">
        <text fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Aux runtime:
        </text>
        <rect x={100} y={-12} width={56} height={16} rx={8} fill={auxColor} fillOpacity={0.18} stroke={auxColor} strokeWidth={1.2} />
        <text x={128} y={0} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={auxColor}>
          {auxRuntime}
        </text>
      </g>

      <g transform="translate(20,236)">
        <text fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Cooling fit:
        </text>
        <rect x={100} y={-12} width={150} height={16} rx={8} fill={fitColor} fillOpacity={0.18} stroke={fitColor} strokeWidth={1.2} />
        <text x={175} y={0} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={fitColor}>
          {coolingFit.replace('-', ' ')}
        </text>
      </g>

      {/* Description */}
      <foreignObject x={20} y={270} width={260} height={170}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.5' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function ColdClimateBalancePointStrategy({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="cold-climate-balance-point-strategy-title"
        descId="cold-climate-balance-point-strategy-desc"
        title="Three cold-climate heat pump sizing strategies and their tradeoffs"
        desc="Three-panel comparison of cold-climate heat pump sizing strategies. Strategy 1 size to cooling load only: balance point at 35 degrees Fahrenheit, aux heat runs whenever outdoor temperature drops below freezing, lots of aux runtime, cooling fit tight. Strategy 2 size to heating design temperature with no aux: balance point at design temperature, much larger heat pump, oversized for cooling causing short cycling in summer. Strategy 3 size to heating load with cold-climate heat pump at modest oversizing recommended for cold climates: balance point at 15 degrees Fahrenheit, aux only runs below 15 degrees, cooling slightly oversized but manageable with variable-speed equipment. The best approach depends on aux fuel cost, climate, and equipment type."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Three cold-climate sizing strategies
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Each chooses where to put the balance point. Each trades off differently.
        </text>

        <Strategy
          x={20}
          num={1}
          title="Size to cooling"
          balancePointF={35}
          auxRuntime="high"
          coolingFit="tight"
          recommended={false}
          description="Heat pump matched to cooling load only. Cooling perfect. Heating shortfall covered by electric resistance aux. Aux runs much of the heating season. Operating cost high in cold climates with expensive electricity."
        />

        <Strategy
          x={340}
          num={2}
          title="Size to heating design"
          balancePointF={5}
          auxRuntime="low"
          coolingFit="oversized"
          recommended={false}
          description="Heat pump matched to peak heating load. No aux needed. But cooling capacity is 1.5-2× what the home needs. Short cycles in summer. Humidity control suffers. Higher purchase price than necessary."
        />

        <Strategy
          x={660}
          num={3}
          title="Cold-climate HP at balance point"
          balancePointF={15}
          auxRuntime="low"
          coolingFit="slightly-oversized"
          recommended={true}
          description="Cold-climate certified heat pump sized to a balance point above design temp. Heat pump carries 95% of heating season. Cooling slightly oversized but variable-speed equipment modulates. Higher equipment cost than #1, lower operating cost."
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The best cold-climate sizing strategy depends on aux fuel cost, electricity rate, and equipment budget. Cold-climate heat pumps shift the balance point well below freezing.
      </figcaption>
    </figure>
  );
}
