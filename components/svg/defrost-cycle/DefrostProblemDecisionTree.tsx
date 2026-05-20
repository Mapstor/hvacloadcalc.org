import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface NodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  type: 'question' | 'good' | 'warn' | 'bad';
}

function Node({ x, y, width, height, text, type }: NodeProps) {
  const colorMap = {
    question: { fill: colors.surface.canvas, stroke: colors.ink[700], text: colors.ink[900] },
    good: { fill: colors.good, stroke: colors.good, text: colors.surface.canvas },
    warn: { fill: colors.warn, stroke: colors.warn, text: colors.ink[900] },
    bad: { fill: colors.danger, stroke: colors.danger, text: colors.surface.canvas },
  };
  const c = colorMap[type];
  const fillOpacity = type === 'question' ? 1 : 0.9;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={c.fill} fillOpacity={fillOpacity} stroke={c.stroke} strokeWidth={2} />
      <foreignObject x={x + 8} y={y + 4} width={width - 16} height={height - 8}>
        <div
          style={{
            fontFamily: FONT,
            fontSize: type === 'question' ? 12 : 11,
            color: type === 'question' ? '#0f172a' : c.text,
            textAlign: 'center',
            fontWeight: type === 'question' ? 600 : 500,
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

function Edge({ from, to, label, labelOffset = 0 }: { from: [number, number]; to: [number, number]; label?: string; labelOffset?: number }) {
  const midX = (from[0] + to[0]) / 2;
  const midY = (from[1] + to[1]) / 2;
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#decision-arrow)" />
      {label && (
        <g>
          <rect x={midX + labelOffset - 18} y={midY - 10} width={36} height={18} rx={3} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={midX + labelOffset} y={midY + 3} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function DefrostProblemDecisionTree({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 760"
        titleId="defrost-problem-decision-tree-title"
        descId="defrost-problem-decision-tree-desc"
        title="Decision tree for diagnosing heat pump defrost problems"
        desc="Top-to-bottom decision tree for distinguishing a normal defrost cycle from a defrost problem. Top question: is your heat pump defrosting normally? First decision frequency normal between 30 and 90 minutes apart in frost weather. If no, defrosting every 10 to 20 minutes likely indicates a defrost board sensor or refrigerant problem, call professional. Second decision duration normal 5 to 15 minutes. If no, cycles longer than 20 minutes likely indicate a reversing valve refrigerant charge or termination problem, call professional. Third decision coil mostly clear after defrost. If yes, the heat pump is working correctly. If no, heavy ice persists or unit becomes encased, turn off and call professional to prevent damage. Green nodes indicate normal yellow indicate watch closely red indicate call professional."
        className="w-full"
      >
        <defs>
          <marker id="decision-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={760} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Is your defrost cycle normal or a problem?
        </text>

        {/* Start node */}
        <Node x={350} y={60} width={300} height={48} text="Heat pump just defrosted." type="question" />

        {/* Q1 */}
        <Edge from={[500, 108]} to={[500, 140]} />
        <Node x={300} y={140} width={400} height={56} text="Frequency normal? (every 30-90 min in frost weather, less in dry cold)" type="question" />

        {/* Q1 branches */}
        <Edge from={[400, 196]} to={[200, 250]} label="NO" labelOffset={-20} />
        <Node x={20} y={250} width={360} height={70} text="Defrosting every 10-20 min regardless of weather → likely defrost board, coil sensor, or low refrigerant. Call pro." type="bad" />

        <Edge from={[600, 196]} to={[700, 250]} label="YES" labelOffset={20} />

        {/* Q2 */}
        <Node x={300} y={300} width={400} height={56} text="Duration normal? (cycle completes in 5-15 min)" type="question" />
        <Edge from={[700, 285]} to={[500, 300]} />

        {/* Q2 branches */}
        <Edge from={[400, 356]} to={[200, 410]} label="NO" labelOffset={-20} />
        <Node x={20} y={410} width={360} height={70} text="Cycles run >20 min and don't terminate → likely reversing valve, refrigerant charge, or defrost termination sensor. Call pro." type="bad" />

        <Edge from={[600, 356]} to={[700, 410]} label="YES" labelOffset={20} />

        {/* Q3 */}
        <Node x={300} y={460} width={400} height={56} text="Coil mostly clear after defrost?" type="question" />
        <Edge from={[700, 445]} to={[500, 460]} />

        {/* Q3 branches */}
        <Edge from={[400, 516]} to={[200, 580]} label="NO" labelOffset={-20} />
        <Node x={20} y={580} width={360} height={86} text="Heavy ice persists or unit is encased → turn off to prevent compressor damage, then call pro for defrost diagnosis." type="bad" />

        <Edge from={[600, 516]} to={[700, 580]} label="YES" labelOffset={20} />
        <Node x={620} y={580} width={360} height={86} text="✓ Heat pump defrost is working correctly. Steam, brief blower pause, and clunk sound are all normal." type="good" />

        {/* Footnote */}
        <text x={500} y={720} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          DIY checks first: 24+ inch clearance, no debris around the unit, breaker not tripped, thermostat not in emergency heat mode.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Three checks distinguish a normal defrost from a defrost problem: frequency, duration, and coil clearing.
      </figcaption>
    </figure>
  );
}
