import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface NodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  priority: 'question' | 'high' | 'moderate' | 'low' | 'minimal';
}

function Node({ x, y, width, height, text, priority }: NodeProps) {
  const colorMap = {
    question: { fill: colors.surface.canvas, stroke: colors.ink[700], text: colors.ink[900], opacity: 1 },
    high: { fill: colors.danger, stroke: colors.danger, text: colors.surface.canvas, opacity: 0.9 },
    moderate: { fill: colors.warn, stroke: colors.warn, text: colors.ink[900], opacity: 0.9 },
    low: { fill: colors.good, stroke: colors.good, text: colors.surface.canvas, opacity: 0.85 },
    minimal: { fill: colors.ink[300], stroke: colors.ink[500], text: colors.ink[900], opacity: 0.7 },
  };
  const c = colorMap[priority];
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={c.fill} fillOpacity={c.opacity} stroke={c.stroke} strokeWidth={2} />
      <foreignObject x={x + 8} y={y + 4} width={width - 16} height={height - 8}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: priority === 'question' ? 12 : 11,
            color: c.text,
            textAlign: 'center',
            fontWeight: priority === 'question' ? 600 : 500,
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
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#decision-tree-arrow)" />
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

export function InsulationUpgradeDecisionTree({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="insulation-upgrade-decision-tree-title"
        descId="insulation-upgrade-decision-tree-desc"
        title="Decision tree for attic insulation upgrade priority"
        desc="Top-to-bottom decision tree for attic insulation upgrade priority based on current R-value. Top question: what is your current attic R-value? Branch 1 below R-19 in red: high priority upgrade, air seal first then add insulation to climate zone recommendation, expected payback 3 to 7 years. Branch 2 R-19 to R-30 in yellow: moderate priority, air seal first and top off to zone recommendation, payback 5 to 10 years. Branch 3 R-30 to R-38 in green: worth considering if your climate is zone 5 or higher or you have other comfort issues, payback 8 to 15 years. Branch 4 R-38 or higher in gray: below typical payback threshold, consider only if combined with other envelope work or specific efficiency goals. Payback assumes 2024 US average electricity rates and natural gas heating and varies with climate, fuel cost, and labor cost."
        className="w-full"
      >
        <defs>
          <marker id="decision-tree-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Should you upgrade your attic insulation?
        </text>

        {/* Root question */}
        <Node x={300} y={60} width={400} height={56} text="What is your current attic R-value?" priority="question" />

        {/* Four edges out */}
        <Edge from={[400, 116]} to={[150, 180]} label="< R-19" />
        <Edge from={[480, 116]} to={[400, 320]} label="R-19 to R-30" />
        <Edge from={[520, 116]} to={[620, 480]} label="R-30 to R-38" />
        <Edge from={[600, 116]} to={[850, 180]} label="R-38+" />

        {/* Branch 1: < R-19 high priority */}
        <Node x={30} y={180} width={300} height={120} text="HIGH PRIORITY. Air seal first, then add insulation to your climate zone recommendation. Payback typically 3-7 years." priority="high" />

        {/* Branch 2: R-19 to R-30 moderate */}
        <Node x={250} y={320} width={300} height={120} text="MODERATE PRIORITY. Air seal first, then top off to zone recommendation. Payback typically 5-10 years." priority="moderate" />

        {/* Branch 3: R-30 to R-38 conditional */}
        <Node x={470} y={480} width={300} height={140} text="WORTH CONSIDERING if climate zone 5+, ductwork in attic, or comfort issues. Payback 8-15 years." priority="low" />

        {/* Branch 4: R-38+ minimal */}
        <Node x={680} y={180} width={300} height={120} text="LOW PRIORITY. Below typical payback threshold. Consider only as part of broader envelope work or efficiency goals." priority="minimal" />

        {/* Footnote */}
        <g transform="translate(60,650)">
          <rect width={880} height={56} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={440} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
            Payback assumes 2024 US average electricity rates and natural gas heating.
          </text>
          <text x={440} y={42} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
            Real payback varies significantly by climate, fuel cost, and labor cost. Federal tax credits and utility rebates further reduce payback time.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Below R-19 is almost always worth upgrading. Above R-38, marginal returns drop sharply.
      </figcaption>
    </figure>
  );
}
