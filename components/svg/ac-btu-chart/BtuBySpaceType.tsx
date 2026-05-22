import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Space {
  label: string;
  multiplier: string;
  description: string;
  color: string;
  icon: 'bed' | 'couch' | 'kitchen' | 'desk' | 'sun' | 'basement-high' | 'basement-low' | 'attic';
}

const SPACES: Space[] = [
  { label: 'Bedroom', multiplier: '1.0×', description: 'baseline', color: colors.brand.primary, icon: 'bed' },
  { label: 'Living room', multiplier: '1.0-1.2×', description: 'occupancy, larger windows', color: colors.brand.accent, icon: 'couch' },
  { label: 'Kitchen', multiplier: '1.2-1.4×', description: 'cooking heat gain', color: colors.danger, icon: 'kitchen' },
  { label: 'Home office', multiplier: '1.0-1.1×', description: 'one person, computer heat', color: colors.good, icon: 'desk' },
  { label: 'Sun room', multiplier: '1.5-2.0×', description: 'heavy solar gain', color: colors.warn, icon: 'sun' },
  { label: 'Basement (above grade)', multiplier: '0.7-0.9×', description: 'cooler from ground', color: '#0ea5e9', icon: 'basement-high' },
  { label: 'Basement (below grade)', multiplier: '0.5-0.7×', description: 'much cooler', color: '#1d4ed8', icon: 'basement-low' },
  { label: 'Attic / 2nd floor', multiplier: '1.2-1.4×', description: 'heat rising + roof gain', color: '#fb923c', icon: 'attic' },
];

function SpaceIcon({ icon, color }: { icon: Space['icon']; color: string }) {
  switch (icon) {
    case 'bed':
      return (
        <g>
          <rect x={4} y={18} width={32} height={14} rx={2} fill={color} fillOpacity={0.5} stroke={color} strokeWidth={1.5} />
          <rect x={8} y={10} width={12} height={10} rx={2} fill={color} fillOpacity={0.7} />
          <line x1={4} y1={32} x2={4} y2={36} stroke={color} strokeWidth={2} />
          <line x1={36} y1={32} x2={36} y2={36} stroke={color} strokeWidth={2} />
        </g>
      );
    case 'couch':
      return (
        <g>
          <rect x={4} y={20} width={32} height={14} rx={3} fill={color} fillOpacity={0.5} stroke={color} strokeWidth={1.5} />
          <rect x={2} y={16} width={6} height={18} rx={2} fill={color} fillOpacity={0.7} />
          <rect x={32} y={16} width={6} height={18} rx={2} fill={color} fillOpacity={0.7} />
        </g>
      );
    case 'kitchen':
      return (
        <g>
          <rect x={6} y={14} width={28} height={24} rx={2} fill={colors.surface.canvas} stroke={color} strokeWidth={1.5} />
          <circle cx={14} cy={22} r={3} fill={color} />
          <circle cx={26} cy={22} r={3} fill={color} />
          <circle cx={14} cy={32} r={3} fill={color} />
          <circle cx={26} cy={32} r={3} fill={color} />
        </g>
      );
    case 'desk':
      return (
        <g>
          <rect x={4} y={20} width={32} height={4} fill={color} fillOpacity={0.6} />
          <line x1={6} y1={24} x2={6} y2={38} stroke={color} strokeWidth={2} />
          <line x1={34} y1={24} x2={34} y2={38} stroke={color} strokeWidth={2} />
          <rect x={14} y={10} width={14} height={10} fill={color} fillOpacity={0.7} />
        </g>
      );
    case 'sun':
      return (
        <g>
          <circle cx={20} cy={20} r={8} fill={color} fillOpacity={0.7} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={20 + 12 * Math.cos(rad)}
                y1={20 + 12 * Math.sin(rad)}
                x2={20 + 16 * Math.cos(rad)}
                y2={20 + 16 * Math.sin(rad)}
                stroke={color}
                strokeWidth={2}
              />
            );
          })}
        </g>
      );
    case 'basement-high':
      return (
        <g>
          <path d="M 8 14 L 20 6 L 32 14 L 32 26 L 8 26 Z" fill={colors.surface.canvas} stroke={color} strokeWidth={1.5} />
          <rect x={8} y={26} width={24} height={10} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={1.5} />
          <line x1={4} y1={36} x2={36} y2={36} stroke="#a16207" strokeWidth={2} />
        </g>
      );
    case 'basement-low':
      return (
        <g>
          <path d="M 8 10 L 20 4 L 32 10 L 32 16 L 8 16 Z" fill={colors.surface.canvas} stroke={color} strokeWidth={1.5} />
          <rect x={6} y={16} width={28} height={20} fill={color} fillOpacity={0.5} stroke={color} strokeWidth={1.5} />
          <line x1={2} y1={16} x2={38} y2={16} stroke="#a16207" strokeWidth={2} />
        </g>
      );
    case 'attic':
      return (
        <g>
          <path d="M 6 14 L 20 4 L 34 14 Z" fill={color} fillOpacity={0.5} stroke={color} strokeWidth={1.5} />
          <rect x={10} y={14} width={20} height={22} fill={colors.surface.canvas} stroke={color} strokeWidth={1.5} />
          <rect x={16} y={20} width={8} height={10} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={1} />
        </g>
      );
  }
}

export function BtuBySpaceType({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="btu-by-space-type-title"
        descId="btu-by-space-type-desc"
        title="AC BTU multipliers by space type"
        desc="Grid showing AC BTU multipliers for eight space types. 1 bedroom 1.0x baseline. 2 living room 1.0 to 1.2x for higher occupancy and larger windows. 3 kitchen 1.2 to 1.4x for cooking heat gain. 4 home office 1.0 to 1.1x for one person and computer heat. 5 sun room or conservatory 1.5 to 2.0x for heavy solar gain. 6 basement above grade 0.7 to 0.9x cooler from ground. 7 basement below grade 0.5 to 0.7x much cooler. 8 attic or 2nd floor 1.2 to 1.4x for heat rising from below plus roof gain. Multipliers apply to the baseline BTU per square foot after climate adjustment."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          BTU multipliers by space type
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Apply to climate-adjusted baseline
        </text>

        {/* Grid of space cards */}
        {SPACES.map((space, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = 60 + col * 230;
          const y = 90 + row * 240;
          return (
            <g key={space.label} transform={`translate(${x},${y})`}>
              <rect width={210} height={220} rx={8} fill={colors.surface.canvas} stroke={space.color} strokeWidth={2} />

              {/* Icon */}
              <g transform="translate(85,20)">
                <SpaceIcon icon={space.icon} color={space.color} />
              </g>

              {/* Multiplier (big) */}
              <text x={105} y={110} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight={typography.weight.title} fill={space.color}>
                {space.multiplier}
              </text>

              {/* Label */}
              <text x={105} y={150} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {space.label}
              </text>

              {/* Description */}
              <foreignObject x={10} y={158} width={190} height={56}>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', textAlign: 'center', fontStyle: 'italic', lineHeight: '1.4' }}>
                  {space.description}
                </div>
              </foreignObject>
            </g>
          );
        })}

        <text x={500} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Multipliers apply to baseline BTU per square foot after the climate adjustment.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Sun rooms and kitchens need more cooling per square foot. Basements and shaded north-facing rooms need less.
      </figcaption>
    </figure>
  );
}
