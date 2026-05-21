import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Limitation {
  title: string;
  description: string;
  accuracy: string;
}

const LIMITATIONS: Limitation[] = [
  {
    title: 'Non-standard geometries',
    description: 'Round, A-frame, earth-bermed homes use simplified rectangular approximations.',
    accuracy: '±15-20% expected',
  },
  {
    title: 'Multi-zone diversity',
    description: 'We calculate whole-house loads. Per-zone analysis requires individual runs per zone.',
    accuracy: 'whole-house only',
  },
  {
    title: 'Internal load schedules',
    description: 'Standard occupancy assumed. Home offices, gyms, server rooms need manual adjustment.',
    accuracy: 'tunable upward',
  },
  {
    title: 'Ductwork in unconditioned space',
    description: 'Duct loss factors estimated, not measured. Manual D is required for accurate duct loss.',
    accuracy: 'approximation only',
  },
  {
    title: 'Older homes, unknown insulation',
    description: 'Inputs depend on user knowledge. Uncertainty propagates through the result.',
    accuracy: 'GIGO',
  },
];

export function KnownLimitations({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 580"
        titleId="known-limitations-title"
        descId="known-limitations-desc"
        title="Known limitations of our Manual J calculator"
        desc="List of five known limitations of our calculator with each item including a warning indicator and brief description. Limitation 1 non-standard building geometries: round, A-frame, earth-bermed homes use simplified rectangular approximation, expect plus or minus 15 to 20 percent accuracy. Limitation 2 multi-zone diversity: calculator computes whole-house loads, per-zone analysis requires individual Manual J runs per zone we don't automate. Limitation 3 internal load schedules: standard occupancy assumed, high-density use like home offices or gyms requires manual adjustment. Limitation 4 ductwork in unconditioned space: duct loss factors estimated not measured, detailed Manual D required for accurate duct loss. Limitation 5 older homes with unknown insulation: inputs depend on user knowledge, uncertainty propagates through the result. These are honest limitations we publish; they affect accuracy in specific scenarios."
        className="w-full"
      >
        <rect width={1000} height={580} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Where our calculator falls short
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Honest limitations, published openly
        </text>

        {/* Limitation items */}
        {LIMITATIONS.map((lim, i) => {
          const y = 90 + i * 90;
          return (
            <g key={lim.title} transform={`translate(60,${y})`}>
              <rect width={880} height={78} rx={6} fill={colors.warn} fillOpacity={0.08} stroke={colors.warn} strokeWidth={1.5} />

              {/* Warning icon */}
              <g transform="translate(20,18)">
                <path d="M 22 4 L 42 38 L 2 38 Z" fill={colors.warn} fillOpacity={0.85} stroke={colors.warn} strokeWidth={1.5} />
                <text x={22} y={30} textAnchor="middle" fontFamily={FONT} fontSize={20} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
                  !
                </text>
              </g>

              {/* Title */}
              <text x={88} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
                {lim.title}
              </text>

              {/* Description */}
              <text x={88} y={48} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {lim.description}
              </text>

              {/* Accuracy badge */}
              <g transform="translate(720,18)">
                <rect width={140} height={28} rx={14} fill={colors.danger} fillOpacity={0.15} stroke={colors.danger} strokeWidth={1.5} />
                <text x={70} y={18} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.danger}>
                  {lim.accuracy}
                </text>
              </g>
            </g>
          );
        })}

        {/* Footer */}
        <g transform="translate(60,540)">
          <text x={440} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            If your situation matches one of these, use ACCA-approved software or a certified contractor instead.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        These are real limitations. They affect real users in specific scenarios. We publish them rather than hide them.
      </figcaption>
    </figure>
  );
}
