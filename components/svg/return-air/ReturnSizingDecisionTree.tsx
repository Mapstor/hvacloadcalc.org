import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface NodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  type: 'start' | 'question' | 'step' | 'good' | 'warn' | 'bad';
}

function Node({ x, y, width, height, text, type }: NodeProps) {
  const colorMap = {
    start: { fill: colors.brand.primary, stroke: colors.brand.primary, text: colors.surface.canvas, opacity: 0.92 },
    question: { fill: colors.surface.canvas, stroke: colors.ink[700], text: colors.ink[900], opacity: 1 },
    step: { fill: colors.brand.primary, stroke: colors.brand.primary, text: colors.surface.canvas, opacity: 0.18 },
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
            color: type === 'step' ? '#0f172a' : c.text,
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
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#return-tree-arrow)" />
      {label && (
        <g>
          <rect x={midX - 60} y={midY - 9} width={120} height={18} rx={3} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={midX} y={midY + 4} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function ReturnSizingDecisionTree({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="return-sizing-decision-tree-title"
        descId="return-sizing-decision-tree-desc"
        title="Decision tree for sizing or diagnosing return air problems"
        desc="Top-to-bottom decision tree covering three scenarios: new construction or replacement, diagnosing existing problems, and adding equipment capacity. New construction or replacement: calculate CFM from nominal tons multiplied by 400 CFM per ton or use design CFM from equipment specs, then choose target return velocity typically 500 to 700 FPM at grille and 700 to 900 FPM at trunk, then size grille and duct from velocity tables or Manual D software. Diagnosing existing problems: measure total external static pressure at air handler with a manometer, below 0.7 inches water column returns probably OK investigate elsewhere, 0.7 to 1.0 returns may be undersized check grille velocity, above 1.0 returns and supply restrictive major redesign likely needed. Adding equipment capacity: existing returns sized for old equipment may be too small for new larger system, recalculate based on new equipment CFM, add return capacity if needed."
        className="w-full"
      >
        <defs>
          <marker id="return-tree-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Return air sizing: which scenario are you in?
        </text>

        {/* Root */}
        <Node x={350} y={60} width={300} height={48} text="What are you working on?" type="start" />

        {/* Three branches */}
        <Edge from={[400, 108]} to={[150, 170]} label="New / replacement" />
        <Edge from={[500, 108]} to={[500, 170]} label="Diagnosing problem" />
        <Edge from={[600, 108]} to={[850, 170]} label="Adding capacity" />

        {/* Branch 1: New construction */}
        <Node x={30} y={170} width={260} height={48} text="Calculate CFM = nominal tons × 400" type="step" />
        <Edge from={[160, 218]} to={[160, 240]} />
        <Node x={30} y={240} width={260} height={48} text="Choose target velocity: 500 FPM grille, 700-900 trunk" type="step" />
        <Edge from={[160, 288]} to={[160, 310]} />
        <Node x={30} y={310} width={260} height={48} text="Size grille and duct from velocity tables" type="step" />
        <Edge from={[160, 358]} to={[160, 380]} />
        <Node x={30} y={380} width={260} height={64} text="Verify with Manual D software for full pressure budget" type="good" />

        {/* Branch 2: Diagnose */}
        <Node x={370} y={170} width={260} height={56} text="Measure TESP at air handler with manometer" type="step" />
        <Edge from={[500, 226]} to={[500, 260]} />
        <Node x={370} y={260} width={260} height={48} text="Read static pressure" type="question" />

        <Edge from={[440, 308]} to={[380, 360]} label="< 0.7" />
        <Node x={310} y={360} width={180} height={64} text="Returns likely OK. Check filter, coil, supply." type="good" />

        <Edge from={[500, 308]} to={[500, 360]} label="0.7-1.0" />
        <Node x={420} y={440} width={180} height={64} text="Investigate returns. Check grille velocity, duct size." type="warn" />

        <Edge from={[560, 308]} to={[620, 360]} label="> 1.0" />
        <Node x={530} y={530} width={180} height={64} text="Major restriction. Likely needs redesign." type="bad" />

        {/* Branch 3: Adding capacity */}
        <Node x={710} y={170} width={260} height={56} text="Old returns sized for smaller equipment" type="step" />
        <Edge from={[840, 226]} to={[840, 260]} />
        <Node x={710} y={260} width={260} height={48} text="Recalculate CFM for new equipment" type="step" />
        <Edge from={[840, 308]} to={[840, 340]} />
        <Node x={710} y={340} width={260} height={64} text="Add return capacity (larger grilles, additional ducts)" type="good" />

        {/* Footnote */}
        <g transform="translate(60,650)">
          <rect width={880} height={56} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={440} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
            Diagnostic tool: digital or magnehelic manometer rated 0-2 in w.c. with two test ports in the duct (return side and supply side of the air handler).
          </text>
          <text x={440} y={42} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[700]}>
            Permit-required new construction must run a full Manual D calculation. The chart is a starting-point reference only.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        New construction sizes returns from CFM math. Diagnosis works backward from a manometer reading at the air handler.
      </figcaption>
    </figure>
  );
}
