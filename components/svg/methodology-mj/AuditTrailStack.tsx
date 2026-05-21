import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Layer {
  title: string;
  description: string;
  icon: 'code' | 'cases' | 'peer' | 'real' | 'changelog' | 'limitations' | 'contact';
}

const LAYERS: Layer[] = [
  { title: 'Audit contact', description: 'Request a review of our work or report a bug; we respond.', icon: 'contact' },
  { title: 'Known limitations', description: 'Updated openly when discovered. Honest about where we are not strong.', icon: 'limitations' },
  { title: 'Changelog', description: 'Every code change affecting results documented with date and reason.', icon: 'changelog' },
  { title: 'Real-home validation', description: '~50 homes from ResStock and user submissions, observed peak demand.', icon: 'real' },
  { title: 'Peer software comparison', description: 'Side-by-side runs for 4 sample homes; methodology and assumptions documented.', icon: 'peer' },
  { title: 'Reference case results', description: '8 ACCA cases with our calculator output and deltas published.', icon: 'cases' },
  { title: 'Source code & formulas', description: 'Plain-language formula references; calculation logic transparent.', icon: 'code' },
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
    case 'peer':
      return (
        <g>
          <rect x={1} y={4} width={10} height={20} fill={colors.brand.primary} fillOpacity={0.5} />
          <rect x={13} y={4} width={10} height={20} fill={colors.warn} fillOpacity={0.5} />
          <rect x={25} y={4} width={10} height={20} fill={colors.brand.accent} fillOpacity={0.5} />
        </g>
      );
    case 'real':
      return (
        <g>
          <path d="M 4 24 L 18 8 L 32 24 L 32 28 L 4 28 Z" fill={colors.danger} fillOpacity={0.18} stroke={colors.danger} strokeWidth={1.5} />
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
        title="Seven layers of audit artifacts available for public review"
        desc="Vertical stack of seven audit artifacts that anyone can review. Bottom layer source code and formulas: public formula references with calculation logic in plain language. Layer 2 reference case results: 8 ACCA cases with our calculator output and deltas published openly. Layer 3 peer software comparison: side-by-side runs for 4 sample homes with methodology documented. Layer 4 real-home validation: approximately 50 homes from ResStock and user submissions with observed peak demand. Layer 5 changelog: every code change affecting results documented with date and reason. Layer 6 known limitations: published openly and updated when discovered. Top layer audit contact: anyone can request review or report a bug. Anyone can audit at any level."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Seven layers anyone can audit
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
