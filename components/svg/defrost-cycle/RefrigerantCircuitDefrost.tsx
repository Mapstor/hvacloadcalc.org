import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface CircuitPanelProps {
  y: number;
  title: string;
  outdoorRole: string;
  indoorRole: string;
  outdoorColor: string;
  indoorColor: string;
  outdoorTemp: string;
  indoorTemp: string;
  valveAngle: number;
  arrowClockwise: boolean;
  note: string;
}

function Arrow({ from, to, color }: { from: [number, number]; to: [number, number]; color: string }) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke={color}
      strokeWidth={2.5}
      markerEnd="url(#arrow-circuit)"
    />
  );
}

function CircuitPanel({
  y,
  title,
  outdoorRole,
  indoorRole,
  outdoorColor,
  indoorColor,
  outdoorTemp,
  indoorTemp,
  valveAngle,
  arrowClockwise,
  note,
}: CircuitPanelProps) {
  const c = arrowClockwise ? colors.brand.primary : colors.danger;
  return (
    <g transform={`translate(40,${y})`}>
      <rect width={920} height={300} rx={8} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <text x={20} y={28} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      {/* Outdoor coil */}
      <g transform="translate(60,80)">
        <rect width={180} height={120} rx={6} fill={outdoorColor} fillOpacity={0.18} stroke={outdoorColor} strokeWidth={2.5} />
        <text x={90} y={28} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={outdoorColor}>
          OUTDOOR COIL
        </text>
        <text x={90} y={50} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          ({outdoorRole})
        </text>
        {/* Coil fins */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={20 + i * 30} y1={70} x2={20 + i * 30} y2={105} stroke={outdoorColor} strokeWidth={1.5} />
        ))}
        <text x={90} y={140} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          {outdoorTemp}
        </text>
      </g>

      {/* Reversing valve in middle */}
      <g transform="translate(360,110)">
        <rect width={180} height={70} rx={4} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
        <text x={90} y={20} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          REVERSING VALVE
        </text>
        {/* Valve indicator (orientation) */}
        <g transform={`translate(90,45) rotate(${valveAngle})`}>
          <rect x={-25} y={-6} width={50} height={12} rx={2} fill={c} fillOpacity={0.7} stroke={c} strokeWidth={1.5} />
          <circle cx={0} cy={0} r={4} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1} />
        </g>
      </g>

      {/* Indoor coil */}
      <g transform="translate(680,80)">
        <rect width={180} height={120} rx={6} fill={indoorColor} fillOpacity={0.18} stroke={indoorColor} strokeWidth={2.5} />
        <text x={90} y={28} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={indoorColor}>
          INDOOR COIL
        </text>
        <text x={90} y={50} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          ({indoorRole})
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={20 + i * 30} y1={70} x2={20 + i * 30} y2={105} stroke={indoorColor} strokeWidth={1.5} />
        ))}
        <text x={90} y={140} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          {indoorTemp}
        </text>
      </g>

      {/* Refrigerant flow arrows */}
      {arrowClockwise ? (
        <>
          <Arrow from={[240, 130]} to={[360, 130]} color={c} />
          <Arrow from={[540, 130]} to={[680, 130]} color={c} />
          <Arrow from={[770, 220]} to={[770, 240]} color={c} />
          <Arrow from={[770, 240]} to={[150, 240]} color={c} />
          <Arrow from={[150, 240]} to={[150, 220]} color={c} />
        </>
      ) : (
        <>
          <Arrow from={[680, 130]} to={[540, 130]} color={c} />
          <Arrow from={[360, 130]} to={[240, 130]} color={c} />
          <Arrow from={[150, 220]} to={[150, 240]} color={c} />
          <Arrow from={[150, 240]} to={[770, 240]} color={c} />
          <Arrow from={[770, 240]} to={[770, 220]} color={c} />
        </>
      )}

      {/* Compressor on return loop */}
      <g transform="translate(450,235)">
        <circle r={14} fill={colors.ink[700]} />
        <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
          COMP
        </text>
      </g>

      <text x={20} y={282} fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        {note}
      </text>
    </g>
  );
}

export function RefrigerantCircuitDefrost({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="refrigerant-circuit-defrost-title"
        descId="refrigerant-circuit-defrost-desc"
        title="Heat pump refrigerant circuit in heating mode vs defrost mode"
        desc="Schematic comparing the heat pump refrigerant circuit in two states. Heating mode in the top panel: outdoor coil acts as evaporator at low temperature drawing heat from outdoor air, refrigerant flows through the compressor to the indoor coil which acts as condenser at high temperature releasing heat to indoor air, reversing valve in heating position, flow direction clockwise. Defrost mode in the bottom panel: reversing valve flipped 180 degrees, outdoor coil now acts as condenser at 200 degrees Fahrenheit melting frost, indoor coil now acts as evaporator absorbing heat but with blower paused, flow direction counter-clockwise. The valve reversal causes the audible clunk."
        className="w-full"
      >
        <defs>
          <marker id="arrow-circuit" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>

        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <text x={500} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Same circuit, two valve positions
        </text>

        <CircuitPanel
          y={60}
          title="Heating mode"
          outdoorRole="Evaporator: cold"
          indoorRole="Condenser: hot"
          outdoorColor={colors.brand.primary}
          indoorColor={colors.danger}
          outdoorTemp="Coil temp: 15-25°F (frost forms)"
          indoorTemp="Coil temp: 120-180°F (warm air out)"
          valveAngle={0}
          arrowClockwise={true}
          note="Refrigerant absorbs heat outdoors, releases heat indoors. Outdoor coil colder than ambient air, so frost forms in humid weather."
        />

        <CircuitPanel
          y={380}
          title="Defrost mode (valve flipped)"
          outdoorRole="Condenser: hot"
          indoorRole="Evaporator: cool"
          outdoorColor={colors.danger}
          indoorColor={colors.brand.primary}
          outdoorTemp="Coil temp: 100-200°F (frost melts → steam)"
          indoorTemp="Coil temp: 35-55°F (blower paused)"
          valveAngle={90}
          arrowClockwise={false}
          note="The clunk you hear is the reversing valve spool sliding to its other position. The transition takes 1-2 seconds."
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Defrost works by repurposing the outdoor coil. The same refrigerant loop runs both directions; only the valve position changes.
      </figcaption>
    </figure>
  );
}
