import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface StepProps {
  x: number;
  num: number;
  title: string;
  description: string;
  icon: 'acca' | 'peer' | 'real' | 'publish';
}

function StepIcon({ icon }: { icon: StepProps['icon'] }) {
  switch (icon) {
    case 'acca':
      return (
        <g>
          <rect x={-22} y={-26} width={44} height={52} rx={3} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2} />
          <line x1={-14} y1={-14} x2={14} y2={-14} stroke={colors.brand.primary} strokeWidth={1.5} />
          <line x1={-14} y1={-6} x2={14} y2={-6} stroke={colors.brand.primary} strokeWidth={1.5} />
          <line x1={-14} y1={2} x2={14} y2={2} stroke={colors.brand.primary} strokeWidth={1.5} />
          <line x1={-14} y1={10} x2={14} y2={10} stroke={colors.brand.primary} strokeWidth={1.5} />
          <circle cx={20} cy={22} r={10} fill={colors.good} />
          <path d="M 14 22 L 18 26 L 26 18" fill="none" stroke={colors.surface.canvas} strokeWidth={2.5} strokeLinecap="round" />
        </g>
      );
    case 'peer':
      return (
        <g>
          <rect x={-26} y={-20} width={20} height={32} rx={2} fill={colors.brand.primary} fillOpacity={0.18} stroke={colors.brand.primary} strokeWidth={1.5} />
          <rect x={-4} y={-20} width={20} height={32} rx={2} fill={colors.warn} fillOpacity={0.18} stroke={colors.warn} strokeWidth={1.5} />
          <rect x={18} y={-20} width={20} height={32} rx={2} fill={colors.brand.accent} fillOpacity={0.18} stroke={colors.brand.accent} strokeWidth={1.5} />
          <text x={6} y={26} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>3 tools</text>
        </g>
      );
    case 'real':
      return (
        <g>
          <path d="M -22 8 L 0 -18 L 22 8 L 22 24 L -22 24 Z" fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2} />
          <rect x={-6} y={2} width={12} height={22} fill={colors.brand.primary} fillOpacity={0.3} stroke={colors.brand.primary} strokeWidth={1} />
          <rect x={28} y={-10} width={6} height={26} fill={colors.danger} fillOpacity={0.5} stroke={colors.danger} strokeWidth={1} />
          <line x1={32} y1={-10} x2={32} y2={16} stroke={colors.danger} strokeWidth={0.5} />
        </g>
      );
    case 'publish':
      return (
        <g>
          <line x1={-22} y1={20} x2={22} y2={20} stroke={colors.ink[700]} strokeWidth={2} />
          <rect x={-18} y={6} width={8} height={14} fill={colors.danger} fillOpacity={0.7} />
          <rect x={-6} y={-4} width={8} height={24} fill={colors.warn} fillOpacity={0.7} />
          <rect x={6} y={-12} width={8} height={32} fill={colors.good} fillOpacity={0.7} />
          <line x1={-14} y1={-2} x2={-14} y2={14} stroke={colors.ink[700]} strokeWidth={1} />
          <line x1={-2} y1={-16} x2={-2} y2={8} stroke={colors.ink[700]} strokeWidth={1} />
          <line x1={10} y1={-20} x2={10} y2={0} stroke={colors.ink[700]} strokeWidth={1} />
        </g>
      );
  }
}

function Step({ x, num, title, description, icon }: StepProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={250} height={420} rx={10} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2.5} />

      <g transform="translate(20,20)">
        <circle r={16} fill={colors.brand.primary} />
        <text y={5} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
          {num}
        </text>
      </g>

      <text x={125} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(125,150)">
        <StepIcon icon={icon} />
      </g>

      <foreignObject x={20} y={240} width={210} height={170}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.5' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function HeroVerificationProcess({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-verification-process-title"
        descId="hero-verification-process-desc"
        title="Three-layer Manual J calculator verification framework plus public audit surface"
        desc="Three verification layers and a public audit surface for the Manual J calculator. Layer 1 ACCA test cases: 8 reference homes published by ACCA with expected loads, target band plus or minus 5 percent on each case. Layer 2 peer software comparison: cross-check against Wrightsoft, Cool Calc, and other Manual J implementations on identical inputs, target band plus or minus 3 to 5 percent per the comparison literature. Layer 3 real-home validation: compare calculator output to inferred peak demand from utility data and datasets like NREL ResStock, target band plus or minus 15 percent consistent with Manual J input-uncertainty floor. Audit surface (publish step): methodology, known limitations, corrections log, and audit contact published openly so anyone can verify, criticize, or report bugs."
        className="w-full"
      >
        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Three verification layers and a public audit surface
        </text>

        {/* Inter-step arrows */}
        {[290, 540, 790].map((ax, i) => (
          <g key={i}>
            <line x1={ax} y1={290} x2={ax + 30} y2={290} stroke={colors.ink[500]} strokeWidth={2.5} markerEnd="url(#hero-mj-arrow)" />
          </g>
        ))}

        <defs>
          <marker id="hero-mj-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <Step
          x={40}
          num={1}
          title="ACCA test cases"
          icon="acca"
          description="8 reference homes published by ACCA with expected cooling and heating loads. The verification target for an implementation is ±5% on each case."
        />

        <Step
          x={320}
          num={2}
          title="Peer software"
          icon="peer"
          description="Cross-check against Wrightsoft Right-J and Cool Calc on identical inputs. The comparison-literature target band is ±3-5%, reflecting allowed Manual J assumption variations."
        />

        <Step
          x={600}
          num={3}
          title="Real homes"
          icon="real"
          description="Compare calculator output to inferred peak demand from utility data and datasets like NREL ResStock. Target band: ±15% on most homes, consistent with Manual J's input-uncertainty floor."
        />

        <Step
          x={880}
          num={4}
          title="Publish"
          icon="publish"
          description="Methodology, known limitations, corrections log, and audit contact published openly. Anyone can run a verification layer and report results."
        />

        <text x={600} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Methodology, transparency, and an audit contact. The alternative is unverified claims.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        We are not ACCA-approved software. We are a methodology-consistent Manual J implementation that you can audit and criticize openly.
      </figcaption>
    </figure>
  );
}
