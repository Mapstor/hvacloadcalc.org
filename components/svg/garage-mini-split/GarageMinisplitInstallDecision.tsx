import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface NodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  type: 'start' | 'question' | 'good' | 'warn' | 'bad';
}

function Node({ x, y, width, height, text, type }: NodeProps) {
  const colorMap = {
    start: { fill: colors.brand.primary, stroke: colors.brand.primary, text: colors.surface.canvas, opacity: 0.92 },
    question: { fill: colors.surface.canvas, stroke: colors.ink[700], text: colors.ink[900], opacity: 1 },
    good: { fill: colors.good, stroke: colors.good, text: colors.surface.canvas, opacity: 0.9 },
    warn: { fill: colors.warn, stroke: colors.warn, text: colors.ink[900], opacity: 0.9 },
    bad: { fill: colors.danger, stroke: colors.danger, text: colors.surface.canvas, opacity: 0.9 },
  };
  const c = colorMap[type];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={c.fill} fillOpacity={c.opacity} stroke={c.stroke} strokeWidth={2} />
      <foreignObject x={x + 8} y={y + 4} width={width - 16} height={height - 8}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: type === 'start' || type === 'question' ? 12 : 11,
            color: c.text,
            textAlign: 'center',
            fontWeight: type === 'start' || type === 'question' ? 600 : 500,
            lineHeight: '1.3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {text}
        </div>
      </foreignObject>
    </g>
  );
}

function Edge({ from, to, label }: { from: [number, number]; to: [number, number]; label?: string }) {
  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#garage-install-arrow)" />
      {label && (
        <g>
          <rect x={midX - 30} y={midY - 9} width={60} height={18} rx={3} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={midX} y={midY + 4} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function GarageMinisplitInstallDecision({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="garage-mini-split-install-decision-title"
        descId="garage-mini-split-install-decision-desc"
        title="DIY versus professional decision tree for garage mini split installation"
        desc="Top-to-bottom decision tree for choosing DIY versus professional mini split installation. Top question: pre-charged DIY mini split such as Mr Cool or Pioneer Quick Connect? If yes: possible DIY with caveats, line set is pre-charged so no refrigerant work needed, but follow installation manual exactly, ensure proper wall penetration sealing, electrical to outdoor unit may require permit or electrician, skill required moderate DIY. If no: refrigerant work required, EPA Section 608 certification needed by federal law, hire a licensed HVAC installer. Second consideration electrical work required: most garage mini splits need a 208 to 240 volt dedicated circuit at 15 to 30 amps depending on size, electrical work typically requires an electrician and permit. Third consideration local code and HOA: check garage HVAC restrictions before purchasing some jurisdictions limit visible outdoor units."
        className="w-full"
      >
        <defs>
          <marker id="garage-install-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          DIY or hire a pro? The mini split install decision
        </text>

        {/* Root */}
        <Node x={300} y={60} width={400} height={56} text="Buying a pre-charged DIY unit (MrCool, Pioneer Quick Connect, etc.)?" type="start" />

        {/* Branches */}
        <Edge from={[400, 116]} to={[200, 180]} label="YES" />
        <Edge from={[600, 116]} to={[800, 180]} label="NO" />

        {/* YES path */}
        <Node x={40} y={180} width={320} height={90} text="DIY possible. Line set is pre-charged with quick-connect fittings; no refrigerant work needed. Federal EPA 608 not triggered." type="good" />
        <Edge from={[200, 270]} to={[200, 310]} />
        <Node x={40} y={310} width={320} height={120} text="Still required: drill and seal wall penetration; run condensate drain; mount and level outdoor unit; connect line set per manual; run low-voltage control wire." type="question" />
        <Edge from={[200, 430]} to={[200, 470]} />
        <Node x={40} y={470} width={320} height={120} text="Electrical: 208-240V dedicated circuit, typically 15-30A. Permit usually required. DIY if licensed; hire electrician if not." type="warn" />

        {/* NO path */}
        <Node x={640} y={180} width={320} height={90} text="EPA Section 608 certification required by federal law for any refrigerant work. Significant civil penalties for unauthorized work." type="bad" />
        <Edge from={[800, 270]} to={[800, 310]} />
        <Node x={640} y={310} width={320} height={120} text="Hire a licensed HVAC installer. They handle line set brazing, evacuation, refrigerant charge, and AHRI commissioning." type="question" />
        <Edge from={[800, 430]} to={[800, 470]} />
        <Node x={640} y={470} width={320} height={120} text="Total installed cost: $3,500-7,000 typical for 18,000 BTU. Includes equipment, refrigerant work, electrical, permit, and labor." type="warn" />

        {/* Bottom: code/HOA consideration shared */}
        <Edge from={[200, 590]} to={[500, 640]} />
        <Edge from={[800, 590]} to={[500, 640]} />
        <Node x={310} y={640} width={380} height={60} text="Check local code and HOA: some jurisdictions limit visible outdoor units; verify allowed locations before buying." type="question" />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Pre-charged DIY units sidestep the EPA Section 608 refrigerant certification requirement but still require real electrical work and code compliance.
      </figcaption>
    </figure>
  );
}
