import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ThermostatProps {
  x: number;
  title: string;
  subtitle: string;
  setpoint: string;
  current: string;
  modeLabel: string;
  modeColor: string;
  showHeatPump: boolean;
  showAux: boolean;
  showEmHeat: boolean;
}

function Thermostat({ x, title, subtitle, setpoint, current, modeLabel, modeColor, showHeatPump, showAux, showEmHeat }: ThermostatProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <text x={180} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={180} y={44} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      {/* Thermostat body (rounded square) */}
      <g transform="translate(40,70)">
        <rect width={280} height={280} rx={140} fill={colors.surface.subtle} stroke={colors.ink[900]} strokeWidth={3} />

        {/* Inner display ring */}
        <circle cx={140} cy={140} r={110} fill={colors.ink[900]} />

        {/* Setpoint (big number) */}
        <text x={140} y={130} textAnchor="middle" fontFamily={FONT} fontSize={56} fontWeight={typography.weight.title} fill={modeColor}>
          {setpoint}°
        </text>

        {/* Current temperature */}
        <text x={140} y={158} textAnchor="middle" fontFamily={FONT} fontSize={11} fill="#94a3b8">
          current: {current}°F
        </text>

        {/* Mode label */}
        <g transform="translate(70,178)">
          <rect width={140} height={26} rx={13} fill={modeColor} fillOpacity={0.18} stroke={modeColor} strokeWidth={1.5} />
          <text x={70} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={modeColor}>
            {modeLabel}
          </text>
        </g>

        {/* Status icons */}
        <g transform="translate(60,222)">
          {/* Heat pump icon */}
          <g>
            <rect width={50} height={26} rx={4} fill={showHeatPump ? colors.brand.primary : colors.ink[500]} fillOpacity={showHeatPump ? 0.7 : 0.2} stroke={showHeatPump ? colors.brand.primary : colors.ink[500]} strokeWidth={1} />
            <text x={25} y={17} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={showHeatPump ? colors.surface.canvas : '#94a3b8'}>
              HP
            </text>
          </g>

          {/* Aux icon */}
          <g transform="translate(60,0)">
            <rect width={50} height={26} rx={4} fill={showAux ? colors.warn : colors.ink[500]} fillOpacity={showAux ? 0.85 : 0.2} stroke={showAux ? colors.warn : colors.ink[500]} strokeWidth={1} />
            <text x={25} y={17} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={showAux ? colors.ink[900] : '#94a3b8'}>
              AUX
            </text>
          </g>

          {/* Em Heat icon */}
          <g transform="translate(120,0)">
            <rect width={40} height={26} rx={4} fill={showEmHeat ? colors.danger : colors.ink[500]} fillOpacity={showEmHeat ? 0.85 : 0.2} stroke={showEmHeat ? colors.danger : colors.ink[500]} strokeWidth={1} />
            <text x={20} y={17} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={showEmHeat ? colors.surface.canvas : '#94a3b8'}>
              EM
            </text>
          </g>
        </g>
      </g>

      {/* Description below */}
      <foreignObject x={20} y={380} width={320} height={80}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: '1.45' }}>
          {showAux && showHeatPump && 'Heat pump and aux running together. Aux helps when load exceeds heat pump capacity.'}
          {showHeatPump && !showAux && !showEmHeat && 'Normal heating mode. Heat pump alone, no aux needed.'}
          {showEmHeat && !showHeatPump && 'Emergency heat mode. Heat pump disabled, only electric strips running.'}
        </div>
      </foreignObject>
    </g>
  );
}

export function HeroThermostatAuxHeatDisplay({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-thermostat-aux-heat-display-title"
        descId="hero-thermostat-aux-heat-display-desc"
        title="Three thermostat displays: heat pump heating, heat pump plus aux, and emergency heat"
        desc="Three smart thermostat display panels side by side. Left panel labeled heat pump heating normally: thermostat shows 70 degree setpoint in Heat mode with heat pump indicator glowing, no aux indicator. Middle panel labeled heat pump plus aux heat active: shows 68 degree current vs setpoint, Heat mode active, heat pump indicator and AUX indicator both illuminated in orange. Right panel labeled emergency heat mode: shows Em Heat or Emergency Heat mode active, heat pump indicator dark, only the EM strip heat icon illuminated. Aux heat is the heat pump's helper that runs alongside. Emergency heat is the heat pump's substitute that disables the heat pump."
        className="w-full"
      >
        <rect width={1200} height={500} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          What aux heat looks like on three modes
        </text>

        <Thermostat
          x={20}
          title="Normal heating"
          subtitle="heat pump alone"
          setpoint="70"
          current="69"
          modeLabel="HEAT"
          modeColor={colors.good}
          showHeatPump={true}
          showAux={false}
          showEmHeat={false}
        />

        <Thermostat
          x={420}
          title="Heat pump + aux"
          subtitle="aux assists"
          setpoint="68"
          current="66"
          modeLabel="HEAT • AUX"
          modeColor={colors.warn}
          showHeatPump={true}
          showAux={true}
          showEmHeat={false}
        />

        <Thermostat
          x={820}
          title="Emergency heat"
          subtitle="heat pump disabled"
          setpoint="68"
          current="65"
          modeLabel="EM HEAT"
          modeColor={colors.danger}
          showHeatPump={false}
          showAux={false}
          showEmHeat={true}
        />

        <text x={600} y={480} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Same hardware (heat pump + electric resistance strips); three different control modes.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Aux heat appearing on your thermostat is not a malfunction. Emergency heat is a separate manually-selected mode that disables the heat pump.
      </figcaption>
    </figure>
  );
}
