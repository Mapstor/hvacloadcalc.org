import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface IssueProps {
  icon: 'aux' | 'sweat' | 'short-cycle' | 'humid' | 'comfort' | 'runtime' | 'money';
  text: string;
  positive: boolean;
}

function IssueIcon({ icon, color }: { icon: IssueProps['icon']; color: string }) {
  switch (icon) {
    case 'aux':
      return (
        <g>
          <rect x={-12} y={-12} width={24} height={24} rx={3} fill={color} fillOpacity={0.85} />
          <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>AUX</text>
        </g>
      );
    case 'sweat':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={12} fill={color}>78°</text>
        </g>
      );
    case 'short-cycle':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <path d="M -7 -3 L -3 -3 L -3 -7 L 3 -7 L 3 -3 L 7 -3 L 0 6 Z" fill={color} />
        </g>
      );
    case 'humid':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <path d="M 0 -8 Q -5 0 0 8 Q 5 0 0 -8 Z" fill={color} />
        </g>
      );
    case 'comfort':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <circle cx={-4} cy={-2} r={1.5} fill={color} />
          <circle cx={4} cy={-2} r={1.5} fill={color} />
          <path d="M -4 4 Q 0 7 4 4" stroke={color} strokeWidth={1.5} fill="none" />
        </g>
      );
    case 'runtime':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <circle r={2} fill={color} />
          <line x1={0} y1={0} x2={0} y2={-8} stroke={color} strokeWidth={1.5} />
          <line x1={0} y1={0} x2={6} y2={0} stroke={color} strokeWidth={1.5} />
        </g>
      );
    case 'money':
      return (
        <g>
          <circle r={12} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
          <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={color}>$$</text>
        </g>
      );
  }
}

interface ColumnProps {
  x: number;
  title: string;
  badge: string;
  badgeColor: string;
  issues: IssueProps[];
}

function Column({ x, title, badge, badgeColor, issues }: ColumnProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={300} height={460} rx={8} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <text x={150} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(80,52)">
        <rect width={140} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={70} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badge}
        </text>
      </g>

      {issues.map((issue, i) => (
        <g key={i} transform={`translate(40,${110 + i * 75})`}>
          <g transform="translate(20,15)">
            <IssueIcon icon={issue.icon} color={issue.positive ? colors.good : colors.danger} />
          </g>
          <foreignObject x={50} y={0} width={210} height={70}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.4' }}>
              {issue.text}
            </div>
          </foreignObject>
        </g>
      ))}
    </g>
  );
}

export function OversizeUndersizeTradeoffs({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="oversize-undersize-tradeoffs-title"
        descId="oversize-undersize-tradeoffs-desc"
        title="Three sizing tradeoffs: undersized, right-sized, oversized heat pumps"
        desc="Three-column comparison of heat pump sizing tradeoffs. Left column undersized: aux heat usage high, cooling capacity inadequate with indoor temperature rising in extreme summer, runtime always 100 percent. Middle column right-sized: aux heat usage occasional, comfort excellent, runtime moderate. Right column oversized: short cycling with rapid compressor cycling, humidity problems with water droplets, aux rarely needed but available, higher equipment cost. Right-sizing minimizes auxiliary heat runtime and minimizes comfort issues simultaneously."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Sizing tradeoffs: undersized, right-sized, oversized
        </text>

        <Column
          x={30}
          title="Undersized"
          badge="too small"
          badgeColor={colors.danger}
          issues={[
            { icon: 'aux', text: 'Aux heat runs frequently in winter. Electric resistance is 2-3× the cost per BTU vs heat pump.', positive: false },
            { icon: 'sweat', text: "Can't keep up on hot summer days. Indoor rises into the 78-82°F range.", positive: false },
            { icon: 'runtime', text: 'Compressor runs constantly. Less wear from cycling, but no comfort margin.', positive: false },
            { icon: 'money', text: 'Lower equipment cost but higher operating cost. Aux electricity adds up.', positive: false },
          ]}
        />

        <Column
          x={350}
          title="Right-sized"
          badge="Goldilocks"
          badgeColor={colors.good}
          issues={[
            { icon: 'aux', text: 'Aux runs only on coldest days, as designed. Costs minimized.', positive: true },
            { icon: 'comfort', text: 'Temperature stable. Humidity within target. Comfort consistent.', positive: true },
            { icon: 'runtime', text: 'Runtime modulates: ~70% on design days, ~20% on shoulder season. Compressor lasts.', positive: true },
            { icon: 'money', text: 'Manual J + Manual S combination. Equipment cost matched to need.', positive: true },
          ]}
        />

        <Column
          x={670}
          title="Oversized"
          badge="too big"
          badgeColor={colors.warn}
          issues={[
            { icon: 'short-cycle', text: 'Short cycling in cooling mode. Compressor on for 2-4 min, off for 5-10 min.', positive: false },
            { icon: 'humid', text: 'Humidity control suffers. Cycles end before latent removal completes.', positive: false },
            { icon: 'aux', text: 'Aux rarely engaged in heating (small benefit). But the equipment is overpriced for actual loads.', positive: false },
            { icon: 'money', text: 'Higher purchase price. Compressor wears faster from cycling. Variable-speed mitigates somewhat.', positive: false },
          ]}
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Right-sizing is harder than oversizing or undersizing because it requires accurate load calculation. Both extremes have real costs.
      </figcaption>
    </figure>
  );
}
