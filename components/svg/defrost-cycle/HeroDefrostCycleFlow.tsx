import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  subtitle: string;
  outdoorTempLabel: string;
  indoorTempLabel: string;
  showFrost: boolean;
  showSteam: boolean;
  showAux: boolean;
  reversed: boolean;
}

function Panel({
  x,
  title,
  subtitle,
  outdoorTempLabel,
  indoorTempLabel,
  showFrost,
  showSteam,
  showAux,
  reversed,
}: PanelProps) {
  const arrowColor = reversed ? colors.danger : colors.brand.primary;
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={360} height={460} rx={8} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />
      <text x={180} y={28} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={180} y={50} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
        {subtitle}
      </text>

      {/* Outdoor unit */}
      <g transform="translate(40,80)">
        <rect width={120} height={130} rx={4} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
        <text x={60} y={-6} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Outdoor unit
        </text>
        {/* Fan grille */}
        <circle cx={60} cy={45} r={28} fill="none" stroke={colors.ink[700]} strokeWidth={1.5} />
        <line x1={60} y1={20} x2={60} y2={73} stroke={colors.ink[500]} strokeWidth={1} />
        <line x1={32} y1={45} x2={88} y2={45} stroke={colors.ink[500]} strokeWidth={1} />
        {/* Coil (with optional frost or steam) */}
        <rect x={12} y={85} width={96} height={32} fill={showSteam ? '#fb923c' : showFrost ? '#bfdbfe' : colors.brand.primary} fillOpacity={0.7} stroke={colors.ink[700]} strokeWidth={1} />
        <text x={60} y={138} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
          {showFrost ? 'Frost forming' : showSteam ? 'Hot coil (200°F)' : 'Coil clear'}
        </text>
        {/* Steam plume */}
        {showSteam && (
          <g>
            <path d="M 30 80 Q 35 60 45 65 Q 50 50 60 55 Q 70 45 80 55 Q 85 50 90 70" fill="none" stroke="#94a3b8" strokeWidth={2} opacity={0.65} />
            <text x={60} y={42} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.ink[500]}>
              steam
            </text>
          </g>
        )}
        <text x={60} y={156} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
          {outdoorTempLabel}
        </text>
      </g>

      {/* Refrigerant arrow */}
      <g>
        <line x1={170} y1={140} x2={210} y2={140} stroke={arrowColor} strokeWidth={3} markerEnd="url(#arrow-head-hero)" />
        <text x={190} y={130} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={arrowColor}>
          {reversed ? 'reversed' : 'heat flow'}
        </text>
      </g>

      {/* Indoor unit */}
      <g transform="translate(220,80)">
        <rect width={120} height={130} rx={4} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
        <text x={60} y={-6} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Indoor unit
        </text>
        {/* Coil */}
        <rect x={12} y={15} width={96} height={32} fill={reversed ? colors.brand.primary : colors.danger} fillOpacity={0.7} stroke={colors.ink[700]} strokeWidth={1} />
        {/* Aux heat strip */}
        {showAux && (
          <g>
            <rect x={12} y={55} width={96} height={14} fill={colors.danger} fillOpacity={0.85} stroke={colors.danger} strokeWidth={1} />
            <text x={60} y={65} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              AUX HEAT ON
            </text>
          </g>
        )}
        {/* Supply */}
        <path d={`M 60 85 L 60 115`} stroke={arrowColor} strokeWidth={2} markerEnd="url(#arrow-head-hero)" />
        {!reversed && (
          <text x={60} y={138} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            Warm air out
          </text>
        )}
        {reversed && !showAux && (
          <text x={60} y={138} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
            Blower paused
          </text>
        )}
        {reversed && showAux && (
          <text x={60} y={138} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            Warm air (aux)
          </text>
        )}
        <text x={60} y={156} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
          {indoorTempLabel}
        </text>
      </g>

      {/* Reversing valve indicator */}
      <g transform="translate(150,275)">
        <rect width={60} height={36} rx={4} fill={reversed ? colors.danger : colors.brand.primary} fillOpacity={0.15} stroke={reversed ? colors.danger : colors.brand.primary} strokeWidth={1.5} />
        <text x={30} y={15} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          reversing
        </text>
        <text x={30} y={28} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.label} fill={reversed ? colors.danger : colors.brand.primary}>
          {reversed ? 'DEFROST' : 'HEAT'}
        </text>
      </g>

      {/* Stage notes */}
      <g transform="translate(20,335)">
        <text x={0} y={0} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {reversed ? (showAux ? 'Defrost active:' : 'Heating mode:') : 'Normal heating:'}
        </text>
      </g>
      <foreignObject x={20} y={345} width={320} height={100}>
        <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.45' }}>
          {!reversed && !showAux && (
            <>Outdoor coil acts as evaporator. Refrigerant absorbs heat from outdoor air and releases it indoors. Frost forms on outdoor coil during cold humid weather.</>
          )}
          {reversed && (
            <>Reversing valve flips. Outdoor coil acts as condenser (hot). Frost melts as steam. Indoor blower pauses. Aux heat may engage to maintain comfort. ~5-15 min.</>
          )}
        </div>
      </foreignObject>
    </g>
  );
}

export function HeroDefrostCycleFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-defrost-cycle-flow-title"
        descId="hero-defrost-cycle-flow-desc"
        title="Three phases of a heat pump defrost cycle"
        desc="Three-panel sequence showing the defrost cycle. Left panel labeled normal heating mode: outdoor coil with frost forming, refrigerant absorbing heat from outdoor air, warm air output indoors. Middle panel labeled defrost cycle: reversing valve flipped, outdoor coil now hot at 200 degrees Fahrenheit with steam visible as frost melts, indoor blower paused, auxiliary heat engaged below the indoor coil to maintain comfort. Right panel labeled back to heating: coil clear of frost, normal heat flow restored. Total cycle 5 to 15 minutes, typically every 30 to 90 minutes during frost conditions."
        className="w-full"
      >
        <defs>
          <marker id="arrow-head-hero" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
          </marker>
        </defs>

        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The three phases of a heat pump defrost cycle
        </text>

        <Panel
          x={40}
          title="1. Normal heating"
          subtitle="50+ min of every hour"
          outdoorTempLabel="Outdoor: 35°F (frost forming)"
          indoorTempLabel="Indoor supply: 95°F"
          showFrost={true}
          showSteam={false}
          showAux={false}
          reversed={false}
        />

        <Panel
          x={420}
          title="2. Defrost (~5-15 min)"
          subtitle="reversed, aux fills the gap"
          outdoorTempLabel="Outdoor coil: 200°F (steaming)"
          indoorTempLabel="Indoor supply: ~80°F via aux"
          showFrost={false}
          showSteam={true}
          showAux={true}
          reversed={true}
        />

        <Panel
          x={800}
          title="3. Back to heating"
          subtitle="cycle complete"
          outdoorTempLabel="Outdoor: 35°F (coil clear)"
          indoorTempLabel="Indoor supply: 95°F"
          showFrost={false}
          showSteam={false}
          showAux={false}
          reversed={false}
        />

        <text x={600} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Total cycle: 5-15 minutes. Frequency: every 30-90 minutes during frost conditions, less in dry cold.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The steam, the brief stop in heating, and the clunk of the reversing valve are all normal parts of how heat pumps stay efficient in cold weather.
      </figcaption>
    </figure>
  );
}
