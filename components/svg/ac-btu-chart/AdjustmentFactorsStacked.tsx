import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Factor {
  title: string;
  description: string;
  values: string[];
  color: string;
}

const FACTORS: Factor[] = [
  {
    title: 'Ceiling height',
    description: 'More volume to cool per square foot of floor.',
    values: ['8 ft: 1.0×', '9 ft: +10%', '10 ft: +20%', 'Cathedral 12+ ft: +25-40%'],
    color: colors.brand.primary,
  },
  {
    title: 'Climate zone',
    description: 'Hot/humid zones need more cooling per square foot.',
    values: ['Zones 1-2: +20-30%', 'Zones 3-4: baseline', 'Zones 5-7: -10-15%', 'Zone 8: -20-25%'],
    color: colors.warn,
  },
  {
    title: 'Sun exposure',
    description: 'South/west windows add solar load.',
    values: ['Heavy sun: +10-20%', 'Mixed: baseline', 'Heavily shaded: -10%'],
    color: '#fb923c',
  },
  {
    title: 'Occupancy',
    description: 'Each person adds 600 BTU of sensible + latent load.',
    values: ['1-2 people: baseline', '+600 BTU/extra person', 'High density: +10-20%'],
    color: colors.brand.accent,
  },
  {
    title: 'Kitchen heat gain',
    description: 'Cooking adds sensible and latent load.',
    values: ['Not a kitchen: baseline', 'Kitchen: +4,000 BTU', 'Commercial-grade: +6,000+ BTU'],
    color: colors.danger,
  },
  {
    title: 'Insulation level',
    description: 'Envelope quality drives the entire load up or down.',
    values: ['Below code (older): +30%', 'Current code: baseline', 'Above code: -10%'],
    color: colors.good,
  },
];

export function AdjustmentFactorsStacked({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="adjustment-factors-stacked-title"
        descId="adjustment-factors-stacked-desc"
        title="Six adjustment factors to apply to the AC BTU chart baseline"
        desc="Vertical stack of six adjustment factors. 1 ceiling height: 8 ft baseline 1.0x, 9 ft plus 10 percent, 10 ft plus 20 percent, cathedral 12 plus ft plus 25 to 40 percent. 2 climate zone: zones 1 to 2 plus 20 to 30 percent, zones 3 to 4 baseline, zones 5 to 7 minus 10 to 15 percent, zone 8 minus 20 to 25 percent. 3 sun exposure: heavy sun plus 10 to 20 percent, mixed baseline, heavily shaded minus 10 percent. 4 occupancy: 1 to 2 people baseline, plus 600 BTU per extra person, high density plus 10 to 20 percent. 5 kitchen heat gain: not a kitchen baseline, kitchen plus 4,000 BTU, commercial grade plus 6,000 plus BTU. 6 insulation level: below code older plus 30 percent, current code baseline, above code minus 10 percent. Apply these factors to the chart baseline; combine multiplicatively when multiple apply."
        className="w-full"
      >
        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Six adjustments to the BTU chart baseline
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Apply multiplicatively when more than one factor applies to your room
        </text>

        {FACTORS.map((factor, i) => {
          const y = 90 + i * 100;
          return (
            <g key={factor.title} transform={`translate(60,${y})`}>
              <rect width={880} height={88} rx={6} fill={factor.color} fillOpacity={0.08} stroke={factor.color} strokeWidth={1.5} />

              {/* Number badge */}
              <g transform="translate(20,20)">
                <circle r={18} cx={18} cy={18} fill={factor.color} />
                <text x={18} y={23} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
                  {i + 1}
                </text>
              </g>

              {/* Title + description */}
              <text x={80} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={factor.color}>
                {factor.title}
              </text>
              <text x={80} y={46} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {factor.description}
              </text>

              {/* Values list */}
              <g transform="translate(80,56)">
                {factor.values.map((v, vi) => (
                  <text
                    key={vi}
                    x={vi * 200}
                    y={16}
                    fontFamily={FONT}
                    fontSize={11}
                    fontWeight={typography.weight.label}
                    fill={colors.ink[900]}
                  >
                    {v}
                  </text>
                ))}
              </g>
            </g>
          );
        })}

        <text x={500} y={700} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Example: 1,000 sq ft × climate 1.2 × ceiling 1.1 × insulation 0.9 = ~24,000 BTU adjusted from 18,000 baseline.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        These factors combine multiplicatively. A single 10% adjustment is small; three of them stacked is 33%.
      </figcaption>
    </figure>
  );
}
