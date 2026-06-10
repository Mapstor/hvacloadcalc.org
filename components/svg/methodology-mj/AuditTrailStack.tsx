import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Layer {
  title: string;
  description: string;
  icon: 'code' | 'cases' | 'changelog' | 'limitations' | 'contact';
}

const LAYERS: Layer[] = [
  { title: 'Audit contact', description: 'Request a review of our work or report a bug; responses within a few business days.', icon: 'contact' },
  { title: 'Corrections log', description: 'Public record of material updates triggered by reader-reported errors or methodology disagreements.', icon: 'changelog' },
  { title: 'Known limitations', description: 'Documented openly and updated when discovered. Honest about where the calculator is not strong.', icon: 'limitations' },
  { title: 'Source code & formulas', description: 'Plain-language formula references; calculation logic transparent in the source repository.', icon: 'code' },
  { title: 'Methodology documentation', description: 'What the calculator implements and the verification framework it targets, published openly.', icon: 'cases' },
];

function LayerIcon({ icon }: { icon: Layer['icon'] }) {
  switch (icon) {
    case 'code':
      return (
        <g>
          <rect width={36} height={28} rx={3} fill={colors.brand.primary} fillOpacity={0.18} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={18} y={20} textAnchor="middle" fontFamily="monospace" fontSize={12} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            {'</>'}
          </text>
        </g>
      );
    case 'cases':
      return (
        <g>
          <rect width={36} height={28} rx={2} fill={colors.good} fillOpacity={0.18} stroke={colors.good} strokeWidth={1.5} />
          <line x1={6} y1={10} x2={30} y2={10} stroke={colors.good} strokeWidth={1.5} />
          <line x1={6} y1={16} x2={30} y2={16} stroke={colors.good} strokeWidth={1.5} />
          <line x1={6} y1={22} x2={30} y2={22} stroke={colors.good} strokeWidth={1.5} />
        </g>
      );
    case 'changelog':
      return (
        <g>
          <rect width={36} height={28} rx={3} fill={colors.ink[300]} fillOpacity={0.5} stroke={colors.ink[700]} strokeWidth={1.5} />
          <text x={18} y={20} textAnchor="middle" fontFamily="monospace" fontSize={10} fontWeight={typography.weight.title} fill={colors.ink[700]}>
            v1.2
          </text>
        </g>
      );
    case 'limitations':
      return (
        <g>
          <path d="M 18 2 L 34 28 L 2 28 Z" fill={colors.warn} fillOpacity={0.5} stroke={colors.warn} strokeWidth={1.5} />
          <text x={18} y={22} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            !
          </text>
        </g>
      );
    case 'contact':
      return (
        <g>
          <rect width={36} height={28} rx={3} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.brand.primary} strokeWidth={1.5} />
          <path d="M 6 8 L 18 18 L 30 8" fill="none" stroke={colors.surface.canvas} strokeWidth={1.5} />
        </g>
      );
  }
}

export function AuditTrailStack({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="audit-trail-stack-title"
        descId="audit-trail-stack-desc"
        title="Five layers of audit artifacts available for public review"
        desc="Vertical stack of five audit artifacts that anyone can review. Bottom layer methodology documentation: what the calculator implements and the verification framework it targets, published openly. Layer 2 source code and formulas: plain-language formula references with calculation logic transparent in the source repository. Layer 3 known limitations: documented openly and updated when discovered. Layer 4 corrections log: public record of material updates triggered by reader-reported errors or methodology disagreements. Top layer audit contact: anyone can request review or report a bug, responses within a few business days. Anyone can audit at any level."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Five layers anyone can audit
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Each layer is publicly accessible; report bugs and we respond
        </text>

        {/* Stack */}
        {LAYERS.map((layer, i) => {
          const y = 90 + i * 65;
          // Width gets narrower toward the top to suggest a pyramid
          const baseWidth = 800;
          const narrowing = i * 30;
          const width = baseWidth - narrowing;
          const x = (1000 - width) / 2;
          return (
            <g key={layer.title} transform={`translate(${x},${y})`}>
              <rect width={width} height={58} rx={6} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={1.5} />

              {/* Icon */}
              <g transform="translate(20,15)">
                <LayerIcon icon={layer.icon} />
              </g>

              {/* Title */}
              <text x={70} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
                {layer.title}
              </text>

              {/* Description */}
              <text x={70} y={44} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {layer.description}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text x={500} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Documented criticism finds bugs. Fixed bugs help everyone. We&apos;d rather be accountable than pretend infallibility.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The audit trail is the alternative to unverified claims. We publish at every level so any reader can check our work.
      </figcaption>
    </figure>
  );
}
