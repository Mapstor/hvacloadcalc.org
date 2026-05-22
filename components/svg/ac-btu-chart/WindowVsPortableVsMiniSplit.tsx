import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ColumnProps {
  x: number;
  title: string;
  iconType: 'window' | 'portable' | 'minisplit';
  color: string;
  capacity: string;
  efficiency: string;
  cost: string;
  bestFor: string;
  caveat: string;
}

function EquipmentIcon({ iconType, color }: { iconType: ColumnProps['iconType']; color: string }) {
  switch (iconType) {
    case 'window':
      return (
        <g>
          {/* Window frame */}
          <rect width={80} height={60} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
          <line x1={40} y1={0} x2={40} y2={60} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={0} y1={30} x2={80} y2={30} stroke={colors.ink[700]} strokeWidth={1.5} />
          {/* AC unit in window */}
          <rect x={8} y={32} width={64} height={24} fill={color} fillOpacity={0.85} stroke={color} strokeWidth={1.5} />
          {/* Front vents */}
          <line x1={14} y1={36} x2={66} y2={36} stroke={colors.surface.canvas} strokeWidth={1} />
          <line x1={14} y1={42} x2={66} y2={42} stroke={colors.surface.canvas} strokeWidth={1} />
          <line x1={14} y1={48} x2={66} y2={48} stroke={colors.surface.canvas} strokeWidth={1} />
        </g>
      );
    case 'portable':
      return (
        <g>
          {/* Rolling unit */}
          <rect x={10} y={12} width={50} height={50} rx={4} fill={color} fillOpacity={0.85} stroke={color} strokeWidth={1.5} />
          {/* Top vent */}
          <rect x={20} y={6} width={30} height={6} fill={color} fillOpacity={0.5} stroke={color} strokeWidth={1} />
          {/* Hose */}
          <path d="M 50 14 Q 70 20 78 30" fill="none" stroke={colors.ink[700]} strokeWidth={3} />
          {/* Front controls */}
          <rect x={20} y={26} width={30} height={6} fill={colors.surface.canvas} stroke={color} strokeWidth={0.5} />
          {/* Wheels */}
          <circle cx={18} cy={66} r={4} fill={colors.ink[700]} />
          <circle cx={52} cy={66} r={4} fill={colors.ink[700]} />
        </g>
      );
    case 'minisplit':
      return (
        <g>
          {/* Indoor head */}
          <rect x={4} y={20} width={70} height={20} rx={4} fill={color} fillOpacity={0.85} stroke={color} strokeWidth={1.5} />
          {/* Louvers */}
          <line x1={10} y1={36} x2={68} y2={36} stroke={colors.surface.canvas} strokeWidth={1} />
          {/* Brand label area */}
          <rect x={28} y={26} width={22} height={4} fill={colors.surface.canvas} fillOpacity={0.7} />
          {/* Wall behind */}
          <line x1={0} y1={4} x2={0} y2={70} stroke={colors.ink[300]} strokeWidth={1.5} />
        </g>
      );
  }
}

function Column({ x, title, iconType, color, capacity, efficiency, cost, bestFor, caveat }: ColumnProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={300} height={400} rx={10} fill={colors.surface.canvas} stroke={color} strokeWidth={2} />

      <text x={150} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={color}>
        {title}
      </text>

      {/* Icon */}
      <g transform="translate(110,50)">
        <EquipmentIcon iconType={iconType} color={color} />
      </g>

      {/* Specs */}
      <g transform="translate(20,160)">
        <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Capacity range
        </text>
        <text y={16} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {capacity}
        </text>

        <text y={44} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Efficiency
        </text>
        <text y={60} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {efficiency}
        </text>

        <text y={88} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Cost
        </text>
        <text y={104} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {cost}
        </text>

        <text y={132} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Best for
        </text>
        <foreignObject x={0} y={138} width={260} height={36}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#0f172a', lineHeight: '1.4' }}>
            {bestFor}
          </div>
        </foreignObject>
      </g>

      {/* Caveat band */}
      <g transform="translate(20,340)">
        <rect width={260} height={50} rx={6} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={1} />
        <foreignObject x={10} y={6} width={240} height={40}>
          <div style={{ fontFamily: FONT, fontSize: 10, color: '#334155', lineHeight: '1.4', fontStyle: 'italic' }}>
            {caveat}
          </div>
        </foreignObject>
      </g>
    </g>
  );
}

export function WindowVsPortableVsMiniSplit({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 540"
        titleId="window-vs-portable-vs-minisplit-title"
        descId="window-vs-portable-vs-minisplit-desc"
        title="Window AC, portable AC, and ductless mini split compared"
        desc="Three-column comparison of cooling equipment types. Column 1 window AC: capacity range 5,000 to 25,000 BTU, efficiency CEER around 10 to 12, low cost, best for single rooms renters and cooling-only applications. Column 2 portable AC: capacity range 8,000 to 14,000 BTU rated but real-world output 20 to 30 percent lower due to single-hose vent design, lower efficiency than window units, medium cost, best for rooms where window units cannot be installed. Column 3 ductless mini split: capacity range 6,000 to 48,000 plus BTU per zone, efficiency SEER2 17 to 30 plus, higher cost, best for permanent installs heat pump dual-use and single zones in larger homes. Same nominal BTU does not mean same real cooling output across equipment types."
        className="w-full"
      >
        <rect width={1000} height={540} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Same BTU label, different real cooling
        </text>
        <text x={500} y={56} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Window vs portable vs mini split: nameplate BTU does not always equal delivered cooling
        </text>

        <Column
          x={30}
          title="Window AC"
          iconType="window"
          color={colors.brand.primary}
          capacity="5,000-25,000 BTU"
          efficiency="CEER 10-12"
          cost="$200-700"
          bestFor="Single rooms, renters, cooling-only. Nameplate BTU reasonably accurate."
          caveat="Requires a window of correct dimensions. Visible from outside."
        />

        <Column
          x={350}
          title="Portable AC"
          iconType="portable"
          color={colors.warn}
          capacity="8,000-14,000 BTU"
          efficiency="CEER 8-10"
          cost="$300-800"
          bestFor="Rooms where window units can't be installed (HOAs, casement windows)."
          caveat="Single-hose units deliver 20-30% less real cooling than nameplate."
        />

        <Column
          x={670}
          title="Mini split"
          iconType="minisplit"
          color={colors.brand.accent}
          capacity="6,000-48,000+ BTU"
          efficiency="SEER2 17-30+"
          cost="$1,500-5,000"
          bestFor="Permanent installs, heat pump dual-use, single zones in larger homes. Nameplate BTU accurate."
          caveat="Requires professional install + EPA 608 for refrigerant work (pre-charged DIY units excepted)."
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Plan to size portable ACs up one tier vs the equivalent window unit, due to real-world cooling losses in single-hose designs.
      </figcaption>
    </figure>
  );
}
