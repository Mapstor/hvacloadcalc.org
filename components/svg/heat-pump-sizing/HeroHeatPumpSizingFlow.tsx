import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface BoxProps {
  x: number;
  num: string;
  title: string;
  lines: string[];
  iconType: 'house' | 'climate' | 'equipment' | 'spec';
}

function Box({ x, num, title, lines, iconType }: BoxProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={250} height={420} rx={10} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2.5} />
      <circle cx={30} cy={30} r={18} fill={colors.brand.primary} />
      <text x={30} y={36} textAnchor="middle" fontFamily={FONT} fontSize={16} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
        {num}
      </text>
      <text x={70} y={36} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      {/* Icon area */}
      <g transform="translate(50,80)">
        {iconType === 'house' && (
          <g>
            <path d="M 75 10 L 25 60 L 25 130 L 125 130 L 125 60 Z" fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
            <rect x={62} y={90} width={26} height={40} fill={colors.ink[300]} stroke={colors.ink[700]} strokeWidth={1.5} />
            {/* Heating arrow */}
            <g transform="translate(20,70)">
              <line x1={0} y1={0} x2={-15} y2={0} stroke={colors.brand.primary} strokeWidth={3} markerEnd="url(#arrow-sizing-hero)" />
              <text x={-35} y={4} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.label} fill={colors.brand.primary}>
                42k
              </text>
              <text x={-35} y={16} textAnchor="middle" fontFamily={FONT} fontSize={8} fill={colors.brand.primary}>
                heat
              </text>
            </g>
            {/* Cooling arrow */}
            <g transform="translate(130,70)">
              <line x1={0} y1={0} x2={15} y2={0} stroke={colors.danger} strokeWidth={3} markerEnd="url(#arrow-sizing-hero)" />
              <text x={35} y={4} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.label} fill={colors.danger}>
                28k
              </text>
              <text x={35} y={16} textAnchor="middle" fontFamily={FONT} fontSize={8} fill={colors.danger}>
                cool
              </text>
            </g>
          </g>
        )}
        {iconType === 'climate' && (
          <g>
            {/* Three climate icons stacked */}
            <g transform="translate(35,15)">
              <circle r={16} fill={colors.danger} fillOpacity={0.18} stroke={colors.danger} strokeWidth={1.5} />
              <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.danger}>HOT</text>
            </g>
            <g transform="translate(75,55)">
              <circle r={20} fill={colors.warn} fillOpacity={0.25} stroke={colors.warn} strokeWidth={2.5} />
              <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.warn}>MOD</text>
            </g>
            <g transform="translate(115,95)">
              <circle r={16} fill={colors.brand.primary} fillOpacity={0.18} stroke={colors.brand.primary} strokeWidth={1.5} />
              <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.brand.primary}>COLD</text>
            </g>
            <path d="M 50 25 L 70 50 L 100 90" fill="none" stroke={colors.ink[500]} strokeWidth={1.5} strokeDasharray="3,2" />
          </g>
        )}
        {iconType === 'equipment' && (
          <g>
            <rect x={15} y={20} width={120} height={70} rx={6} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
            <text x={75} y={45} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[700]}>
              CAPACITY
            </text>
            {/* Small capacity curve */}
            <path d="M 30 75 Q 60 65 100 60 Q 120 58 125 56" fill="none" stroke={colors.danger} strokeWidth={2} />
            <circle cx={30} cy={75} r={3} fill={colors.danger} />
            <text x={28} y={88} fontSize={8} fontFamily={FONT} fill={colors.danger}>5°F</text>
            <circle cx={75} cy={65} r={3} fill={colors.danger} />
            <text x={72} y={104} fontSize={8} fontFamily={FONT} fill={colors.danger}>17°</text>
            <circle cx={125} cy={56} r={3} fill={colors.danger} />
            <text x={120} y={49} fontSize={8} fontFamily={FONT} fill={colors.danger}>47°</text>
          </g>
        )}
        {iconType === 'spec' && (
          <g>
            <rect x={15} y={10} width={120} height={120} rx={4} fill={colors.good} fillOpacity={0.12} stroke={colors.good} strokeWidth={2} />
            <text x={75} y={36} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.good}>
              3 ton
            </text>
            <text x={75} y={56} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              36k cooling
            </text>
            <text x={75} y={76} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              41k @ 47°F
            </text>
            <text x={75} y={96} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              28k @ 17°F
            </text>
            <text x={75} y={118} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.ink[500]}>
              + aux backup
            </text>
          </g>
        )}
      </g>

      {/* Description lines */}
      <foreignObject x={15} y={260} width={220} height={140}>
        <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.5' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              {line}
            </div>
          ))}
        </div>
      </foreignObject>
    </g>
  );
}

export function HeroHeatPumpSizingFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-heat-pump-sizing-flow-title"
        descId="hero-heat-pump-sizing-flow-desc"
        title="The heat pump sizing process from load calculation to final equipment selection"
        desc="Four-box horizontal flow diagram for proper heat pump sizing. Box 1 load calculation: house icon with heating load 42,000 BTU per hour shown as blue arrow in and cooling load 28,000 BTU per hour shown as red arrow out. Box 2 climate selection: three climate types hot moderate and cold with arrow pointing to the relevant selection. Box 3 equipment matching: heat pump icon with capacity versus temperature curves at 47, 17, and 5 degrees Fahrenheit. Box 4 final sizing: spec block showing 3-ton heat pump 36,000 BTU per hour nominal cooling 41,000 BTU per hour heating at 47 degrees 28,000 at 17 degrees with aux backup. Caption: the proper sequence is Manual J load, climate context, equipment capacity at real temperatures, final selection with backup strategy."
        className="w-full"
      >
        <defs>
          <marker id="arrow-sizing-hero" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>

        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The proper heat pump sizing sequence
        </text>

        {/* Inter-box arrows */}
        {[290, 540, 790].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={290} x2={x + 30} y2={290} stroke={colors.ink[500]} strokeWidth={2.5} markerEnd="url(#arrow-sizing-hero)" />
          </g>
        ))}

        <Box
          x={40}
          num="1"
          title="Load calc"
          iconType="house"
          lines={[
            'Manual J quantifies heating and cooling loads from envelope, climate, occupants, and equipment.',
            'Heating: 42,000 BTU/hr at design temp.',
            'Cooling: 28,000 BTU/hr at design temp.',
          ]}
        />

        <Box
          x={320}
          num="2"
          title="Climate"
          iconType="climate"
          lines={[
            'Pick the location\'s 99% heating design temp from ASHRAE 169.',
            'Pick the 1% cooling design temp.',
            'These set the worst-case conditions equipment must handle.',
          ]}
        />

        <Box
          x={600}
          num="3"
          title="Equipment"
          iconType="equipment"
          lines={[
            'Capacity drops as outdoor temp drops.',
            'Match manufacturer capacity tables to load + design temps.',
            'Cold-climate models maintain more capacity at low temps.',
          ]}
        />

        <Box
          x={880}
          num="4"
          title="Selection"
          iconType="spec"
          lines={[
            'Final pick: nominal cooling ≈ Manual J cooling load.',
            'Heating capacity at design temp ≥ load OR planned aux strategy.',
            'Manual S confirms within tolerance.',
          ]}
        />

        <text x={600} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Right sequence: loads first, climate second, equipment last. Wrong sequence: equipment from square footage chart.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Heat pump sizing is the matching of equipment capacity at real outdoor temperatures to the home&apos;s actual heating and cooling loads.
      </figcaption>
    </figure>
  );
}
