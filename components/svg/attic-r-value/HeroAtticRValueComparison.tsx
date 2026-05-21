import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface AtticProps {
  x: number;
  label: string;
  rValue: string;
  insulationDepth: number;
  insulationColor: string;
  heatLossArrows: number;
  arrowSize: number;
  era: string;
}

function Attic({ x, label, rValue, insulationDepth, insulationColor, heatLossArrows, arrowSize, era }: AtticProps) {
  const arrows = Array.from({ length: heatLossArrows }, (_, i) => {
    const arrowX = 30 + (i / Math.max(heatLossArrows - 1, 1)) * 280;
    return arrowX;
  });

  return (
    <g transform={`translate(${x},80)`}>
      <text x={180} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {label}
      </text>
      <text x={180} y={46} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        {era}
      </text>

      {/* Roof outline */}
      <path d="M 30 110 L 180 60 L 330 110 L 330 320 L 30 320 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2} />

      {/* Roof deck */}
      <line x1={30} y1={110} x2={180} y2={60} stroke={colors.ink[700]} strokeWidth={2} />
      <line x1={180} y1={60} x2={330} y2={110} stroke={colors.ink[700]} strokeWidth={2} />

      {/* Heat loss arrows from attic going up through roof */}
      {arrows.map((ax, i) => (
        <g key={i}>
          <path
            d={`M ${ax} 130 L ${ax} ${130 - arrowSize}`}
            stroke={colors.danger}
            strokeWidth={2 + arrowSize / 10}
            opacity={0.8}
            markerEnd="url(#arrow-attic-hero)"
          />
        </g>
      ))}

      {/* Ceiling joists */}
      <g transform="translate(30,260)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={20 + i * 60} y={0} width={12} height={30} fill="#a16207" stroke={colors.ink[700]} strokeWidth={1} />
        ))}
        <line x1={0} y1={30} x2={300} y2={30} stroke={colors.ink[700]} strokeWidth={2} />
      </g>

      {/* Insulation layer */}
      <rect
        x={30}
        y={260 - insulationDepth + 30}
        width={300}
        height={insulationDepth}
        fill={insulationColor}
        fillOpacity={0.65}
        stroke={insulationColor}
        strokeWidth={1}
      />

      {/* R-value label on insulation */}
      <g>
        <rect x={130} y={260 - insulationDepth / 2 + 20} width={100} height={28} rx={4} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
        <text x={180} y={260 - insulationDepth / 2 + 38} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {rValue}
        </text>
      </g>

      {/* Living space */}
      <rect x={30} y={290} width={300} height={50} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1} />
      <text x={180} y={319} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        Living space (70°F)
      </text>

      {/* Heat loss intensity label */}
      <g transform="translate(170,360)">
        <text textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>
          {heatLossArrows >= 7 ? 'High heat loss' : heatLossArrows >= 4 ? 'Moderate heat loss' : 'Low heat loss'}
        </text>
      </g>
    </g>
  );
}

export function HeroAtticRValueComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-attic-r-value-comparison-title"
        descId="hero-attic-r-value-comparison-desc"
        title="Three attic insulation levels compared: R-19, R-38, R-60"
        desc="Cross-section comparison of three attic insulation scenarios. Left scenario under-insulated R-19 representing 1980s code: joists visible above a thin insulation layer about 6 inches deep, heat-loss arrows flowing upward through the ceiling shown as large red arrows. Center scenario code-minimum R-38 from 2009 IECC zone 4: joists buried under blown-in insulation about 12 inches deep with moderate heat-loss arrows. Right scenario high-performance R-60 modern code zone 6: deeply buried joists under 18 to 22 inches of insulation with minimal heat-loss arrows. Each step up cuts ceiling heat loss substantially."
        className="w-full"
      >
        <defs>
          <marker id="arrow-attic-hero" markerWidth={6} markerHeight={8} refX={3} refY={2} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 2 L 0 4 z" fill="currentColor" />
          </marker>
        </defs>

        <rect width={1200} height={500} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Three attic insulation levels in the same house
        </text>

        <Attic
          x={40}
          label="R-19"
          rValue="R-19"
          insulationDepth={32}
          insulationColor="#fda4af"
          heatLossArrows={8}
          arrowSize={26}
          era="Under-insulated, 1980s code"
        />

        <Attic
          x={420}
          label="R-38"
          rValue="R-38"
          insulationDepth={70}
          insulationColor="#fbbf24"
          heatLossArrows={5}
          arrowSize={16}
          era="Code-minimum, 2009 IECC zone 4"
        />

        <Attic
          x={800}
          label="R-60"
          rValue="R-60"
          insulationDepth={115}
          insulationColor="#22c55e"
          heatLossArrows={3}
          arrowSize={9}
          era="High-performance, modern code zone 6"
        />

        <text x={600} y={480} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Attic insulation is the most cost-effective insulation upgrade in most American homes.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Heat rises. The attic is the top of the envelope and the largest single insulation surface in most homes.
      </figcaption>
    </figure>
  );
}
