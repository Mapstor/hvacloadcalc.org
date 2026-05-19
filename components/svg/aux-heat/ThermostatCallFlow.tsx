import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface StepProps {
  y: number;
  label: string;
  detail: string;
  color: string;
  fill: string;
}

function Step({ y, label, detail, color, fill }: StepProps) {
  return (
    <g transform={`translate(200,${y})`}>
      <rect width={600} height={70} rx={6} fill={fill} stroke={color} strokeWidth={2} />
      <text
        x={20}
        y={28}
        fontFamily={FONT}
        fontSize={14}
        fontWeight={typography.weight.title}
        fill={colors.ink[900]}
      >
        {label}
      </text>
      <text
        x={20}
        y={50}
        fontFamily={FONT}
        fontSize={12}
        fill={colors.ink[700]}
      >
        {detail}
      </text>
    </g>
  );
}

interface ArrowProps {
  y: number;
  condition?: string;
}

function Arrow({ y, condition }: ArrowProps) {
  return (
    <g>
      <line
        x1={500}
        y1={y}
        x2={500}
        y2={y + 30}
        stroke={colors.ink[700]}
        strokeWidth={2}
        markerEnd="url(#flow-arrow)"
      />
      {condition ? (
        <text
          x={510}
          y={y + 20}
          fontFamily={FONT}
          fontSize={11}
          fontStyle="italic"
          fill={colors.ink[700]}
        >
          {condition}
        </text>
      ) : null}
    </g>
  );
}

export function ThermostatCallFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="thermostat-call-flow-title"
        descId="thermostat-call-flow-desc"
        title="Thermostat call escalation to auxiliary heat"
        desc="Flow diagram showing how a thermostat call for heat escalates: the thermostat detects an indoor temperature drop below setpoint, the heat pump compressor engages as stage 1, and if temperature continues to fall or the droop threshold is exceeded, aux heat strips activate alongside the compressor at stage 2. The system runs both heat sources until setpoint is reached."
        className="w-full"
      >
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.ink[700]} />
          </marker>
        </defs>
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <Step
          y={20}
          label="Step 1 — Thermostat detects indoor temp below setpoint"
          detail="Setpoint 70°F, room reads 69°F. Differential triggers a call for heat."
          color={colors.info}
          fill={colors.surface.subtle}
        />
        <Arrow y={90} />

        <Step
          y={130}
          label="Step 2 — Heat pump compressor runs (stage 1)"
          detail="Refrigerant cycle moves heat from outdoor air into the indoor coil. Strips remain off."
          color={colors.brand.primary}
          fill={colors.surface.subtle}
        />
        <Arrow
          y={200}
          condition="If indoor temp continues to fall OR droop > 2°F is reached"
        />

        <Step
          y={245}
          label="Step 3 — Stage 2 engages"
          detail="Variable-speed unit: second compressor stage. Single-stage unit: aux heat strips switch on."
          color={colors.warn}
          fill={colors.surface.subtle}
        />
        <Arrow y={315} condition="If temperature still falling, or below balance point" />

        <Step
          y={360}
          label="Step 4 — Aux heat at full power, running alongside compressor"
          detail="Resistance strips activate. Same airstream passes through the coil and the strips."
          color={colors.danger}
          fill={colors.surface.subtle}
        />
        <Arrow y={430} />

        <Step
          y={475}
          label="Step 5 — Run both heat sources until setpoint reached"
          detail="Thermostat ends the call. Strips de-energize first; compressor cycles off after."
          color={colors.good}
          fill={colors.surface.subtle}
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The system always tries the heat pump first. Aux heat engages as a supplement, not a substitute.
      </figcaption>
    </figure>
  );
}
