import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Feature {
  title: string;
  description: string;
  importance: 'critical' | 'important' | 'optional';
}

const FEATURES: Feature[] = [
  {
    title: 'Heat pump (not just AC)',
    description: 'Single unit provides both heating and cooling. Year-round usefulness.',
    importance: 'critical',
  },
  {
    title: 'Variable-speed inverter compressor',
    description: 'Modulates output. Better efficiency, less cycling, quieter at low load.',
    importance: 'critical',
  },
  {
    title: 'CCASHP certification (cold climates)',
    description: 'Maintains capacity below 17°F. Required for zones 5+. Verify on NEEP list.',
    importance: 'critical',
  },
  {
    title: 'Robust filter access',
    description: 'Garages are dusty. Plan to clean filters monthly.',
    importance: 'important',
  },
  {
    title: 'Wired control / external thermostat',
    description: 'Wall-mount controller more durable than IR remote alone.',
    importance: 'important',
  },
  {
    title: 'Drain pan heater (cold climate)',
    description: 'Prevents condensate freeze-up. Required in zones 6+.',
    importance: 'critical',
  },
  {
    title: 'HSPF2 ≥ 8 and SEER2 ≥ 17',
    description: 'Mid-tier efficiency floor. Higher is better; payback decreases above 20 SEER2.',
    importance: 'important',
  },
  {
    title: 'AHRI certified rating',
    description: 'Verified performance numbers. Avoid no-name imports without certification.',
    importance: 'critical',
  },
];

export function GarageFeaturesChecklist({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="garage-features-checklist-title"
        descId="garage-features-checklist-desc"
        title="Eight features to look for in a garage mini split"
        desc="Vertical checklist of features to look for in a garage mini split. 1 heat pump not just AC: single unit provides both heating and cooling, critical. 2 variable-speed inverter compressor: modulates output for better efficiency less cycling, critical. 3 cold-climate certified CCASHP for zones 5 plus: maintains capacity below 17 degrees, critical for cold climates. 4 robust filter access: garages are dusty expect monthly cleaning, important. 5 wired control or external thermostat: wall-mount more durable than IR remote, important. 6 drain pan heater for cold climates: prevents condensate freeze-up, critical for zones 6 plus. 7 HSPF2 8 plus and SEER2 17 plus efficiency floor: mid-tier efficiency target, important. 8 AHRI certified rating: verified performance numbers, critical. Skip features you won't use: WiFi, voice control, fancy lighting."
        className="w-full"
      >
        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Features to look for in a garage mini split
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Critical first; nice-to-have last; skip the marketing fluff
        </text>

        {/* Feature list */}
        {FEATURES.map((feature, i) => {
          const y = 90 + i * 65;
          const checkColor = feature.importance === 'critical' ? colors.good : feature.importance === 'important' ? colors.warn : colors.ink[500];
          const importanceText = feature.importance === 'critical' ? 'CRITICAL' : feature.importance === 'important' ? 'IMPORTANT' : 'OPTIONAL';
          return (
            <g key={feature.title} transform={`translate(60,${y})`}>
              <rect width={880} height={56} rx={6} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />

              {/* Check mark icon */}
              <g transform="translate(20,12)">
                <circle r={16} cx={16} cy={16} fill={checkColor} fillOpacity={0.18} stroke={checkColor} strokeWidth={2} />
                <path d="M 8 16 L 14 22 L 24 10" fill="none" stroke={checkColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* Title */}
              <text x={80} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {feature.title}
              </text>

              {/* Description */}
              <text x={80} y={42} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {feature.description}
              </text>

              {/* Importance badge */}
              <g transform="translate(770,18)">
                <rect width={90} height={20} rx={10} fill={checkColor} fillOpacity={0.15} stroke={checkColor} strokeWidth={1.2} />
                <text x={45} y={14} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={checkColor}>
                  {importanceText}
                </text>
              </g>
            </g>
          );
        })}

        {/* Skip note */}
        <g transform="translate(60,640)">
          <rect width={880} height={50} rx={6} fill={colors.ink[300]} fillOpacity={0.18} stroke={colors.ink[500]} strokeWidth={1.5} />
          <text x={20} y={22} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[700]}>
            Features you can skip:
          </text>
          <text x={20} y={38} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            WiFi, voice control integration, fancy app dashboards, decorative lighting, self-cleaning modes (limited value in dusty garage).
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Match features to actual garage use. WiFi and voice control are nice but rarely cost-justified for a garage installation.
      </figcaption>
    </figure>
  );
}
