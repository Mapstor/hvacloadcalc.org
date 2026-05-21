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
      <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#aux-tree-arrow)" />
      {label && (
        <g>
          <rect x={midX - 24} y={midY - 9} width={48} height={18} rx={3} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={midX} y={midY + 4} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function AuxHeatTroubleshootDecision({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="aux-heat-troubleshoot-decision-title"
        descId="aux-heat-troubleshoot-decision-desc"
        title="Decision tree for whether aux heat is operating normally or indicates a problem"
        desc="Top-to-bottom decision tree. Top: aux heat is on, is this a problem? First branch: is it cold outside below 35 degrees Fahrenheit? If yes: normal, aux is supposed to assist below the balance point, no action needed unless cost is a concern. If no: continue to next check. Second branch: is the thermostat recovering from a setback, did setpoint just raise 3 degrees or more? If yes: normal, smart thermostats fire aux during recovery to reach setpoint faster, aux turns off when within 1 to 2 degrees of setpoint. If no: continue. Third branch: is the heat pump outdoor unit running? If no: heat pump may be down, check thermostat mode Em Heat will disable heat pump, check outdoor unit for ice blocked airflow tripped breaker. If yes but aux still on: possible thermostat misconfigured aux threshold too aggressive, heat pump capacity inadequate, or heat pump struggling but not failed low refrigerant compressor issues, schedule diagnostic."
        className="w-full"
      >
        <defs>
          <marker id="aux-tree-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Aux heat is on. Is this a problem?
        </text>

        {/* Start */}
        <Node x={350} y={60} width={300} height={48} text="Aux heat is on right now" type="start" />

        {/* Q1: Cold outside? */}
        <Edge from={[500, 108]} to={[500, 140]} />
        <Node x={300} y={140} width={400} height={48} text="Is outdoor temperature below ~35°F?" type="question" />

        {/* Q1 branches */}
        <Edge from={[400, 188]} to={[200, 240]} label="YES" />
        <Node x={40} y={240} width={320} height={64} text="NORMAL. Aux assists below balance point. No action needed unless cost is a concern." type="good" />

        <Edge from={[600, 188]} to={[600, 240]} label="NO" />

        {/* Q2: Setback recovery? */}
        <Node x={400} y={240} width={400} height={64} text="Is thermostat recovering from a setback (setpoint just raised 3°F+)?" type="question" />

        {/* Q2 branches */}
        <Edge from={[500, 304]} to={[300, 360]} label="YES" />
        <Node x={140} y={360} width={320} height={64} text="NORMAL. Smart thermostats use aux to recover faster. Aux turns off near setpoint." type="good" />

        <Edge from={[700, 304]} to={[700, 360]} label="NO" />

        {/* Q3: Outdoor unit running? */}
        <Node x={500} y={360} width={400} height={64} text="Is the heat pump outdoor unit running?" type="question" />

        {/* Q3 branches */}
        <Edge from={[600, 424]} to={[400, 480]} label="NO" />
        <Node x={240} y={480} width={320} height={80} text="HEAT PUMP MAY BE DOWN. Check Em Heat mode first. Check outdoor unit for ice, debris, tripped breaker." type="bad" />

        <Edge from={[800, 424]} to={[800, 480]} label="YES" />

        {/* Final: Aux but HP running */}
        <Node x={620} y={480} width={340} height={100} text="POSSIBLE ISSUES: thermostat aux threshold too aggressive, heat pump capacity inadequate, or heat pump struggling. Schedule diagnostic." type="warn" />

        {/* DIY checks summary */}
        <g transform="translate(60,620)">
          <rect width={880} height={80} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            DIY checks before calling a pro
          </text>
          <text x={20} y={46} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            (1) Confirm thermostat mode is &quot;Heat&quot; not &quot;Em Heat&quot;. (2) Inspect outdoor unit for ice, debris, blocked airflow.
          </text>
          <text x={20} y={64} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            (3) Check outdoor unit breaker. (4) Review thermostat aux threshold setting.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Most aux-heat-on observations resolve to normal operation. Use this tree to distinguish normal from real problems.
      </figcaption>
    </figure>
  );
}
