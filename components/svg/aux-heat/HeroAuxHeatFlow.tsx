import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  stripsActive: boolean;
}

function Panel({ x, title, stripsActive }: PanelProps) {
  const stripColor = stripsActive ? colors.danger : colors.ink[300];
  const stripGlow = stripsActive ? 0.3 : 0;
  return (
    <g transform={`translate(${x},0)`}>
      <text
        x={290}
        y={40}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={typography.size.chartTitle}
        fontWeight={typography.weight.title}
        fill={colors.ink[900]}
      >
        {title}
      </text>

      {/* Outdoor unit (left) */}
      <g transform="translate(20,90)">
        <rect width={120} height={140} rx={6} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1.5} />
        <rect x={15} y={20} width={90} height={90} rx={4} fill={colors.surface.canvas} stroke={colors.ink[500]} strokeWidth={1} />
        {/* Fan blades indicator */}
        <circle cx={60} cy={65} r={28} fill="none" stroke={colors.brand.primary} strokeWidth={2} />
        <line x1={60} y1={37} x2={60} y2={93} stroke={colors.brand.primary} strokeWidth={2} strokeLinecap="round" />
        <line x1={32} y1={65} x2={88} y2={65} stroke={colors.brand.primary} strokeWidth={2} strokeLinecap="round" />
        <text x={60} y={130} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          Outdoor unit
        </text>
      </g>

      {/* Refrigerant lines */}
      <line x1={140} y1={140} x2={210} y2={140} stroke={colors.brand.accent} strokeWidth={3} strokeLinecap="round" />
      <line x1={140} y1={170} x2={210} y2={170} stroke={colors.brand.accent} strokeWidth={3} strokeLinecap="round" strokeDasharray="4,3" />
      <text x={175} y={130} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
        refrigerant
      </text>

      {/* Air handler (right) */}
      <g transform="translate(210,90)">
        <rect width={170} height={300} rx={6} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1.5} />
        <text x={85} y={20} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          Air handler
        </text>

        {/* Indoor coil */}
        <rect x={20} y={45} width={130} height={50} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
        {/* Coil fins */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={32 + i * 20} y1={50} x2={32 + i * 20} y2={90} stroke={colors.brand.primary} strokeWidth={1.5} />
        ))}
        <text x={85} y={75} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
          Indoor coil
        </text>

        {/* Aux heat strips */}
        <rect x={20} y={120} width={130} height={50} rx={4} fill={stripColor} fillOpacity={stripsActive ? 0.25 : 0.15} stroke={stripColor} strokeWidth={1.5} />
        {/* Strip elements (coils) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i}>
            <line x1={32 + i * 24} y1={130} x2={32 + i * 24} y2={160} stroke={stripColor} strokeWidth={2.5} strokeLinecap="round" />
            {stripsActive ? (
              <circle cx={32 + i * 24} cy={145} r={6} fill={stripColor} fillOpacity={stripGlow} />
            ) : null}
          </g>
        ))}
        <text x={85} y={195} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={stripsActive ? colors.danger : colors.ink[500]}>
          Aux heat strips {stripsActive ? '(ON)' : '(OFF)'}
        </text>

        {/* Blower */}
        <rect x={20} y={220} width={130} height={50} rx={4} fill={colors.surface.canvas} stroke={colors.ink[500]} strokeWidth={1} />
        <circle cx={85} cy={245} r={16} fill="none" stroke={colors.ink[700]} strokeWidth={1.5} />
        <text x={85} y={249} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
          blower
        </text>
      </g>

      {/* Airflow arrows */}
      <g>
        {/* Return air entering top */}
        <path d="M 295 410 L 295 380" stroke={colors.info} strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#arrow-air)" />
        <text x={350} y={400} fontFamily={FONT} fontSize={11} fill={colors.info}>
          return air (cool)
        </text>
        {/* Supply air exiting top */}
        <path d="M 250 80 L 250 50" stroke={stripsActive ? colors.danger : colors.warn} strokeWidth={3} strokeLinecap="round" markerEnd={stripsActive ? 'url(#arrow-supply-hot)' : 'url(#arrow-supply-warm)'} />
        <text x={155} y={70} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={stripsActive ? colors.danger : colors.warn}>
          supply air {stripsActive ? '(hottest)' : '(warm)'}
        </text>
      </g>
    </g>
  );
}

export function HeroAuxHeatFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-aux-heat-flow-title"
        descId="hero-aux-heat-flow-desc"
        title="How auxiliary heat works alongside a heat pump"
        desc="Cross-section diagram showing the outdoor heat pump unit connected via refrigerant lines to the indoor air handler, with the indoor coil and electric resistance heat strips inside. Two side-by-side panels show heat pump only mode (strips off) and heat pump plus aux heat mode (strips glowing red)."
        className="w-full"
      >
        <defs>
          <marker id="arrow-air" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.info} />
          </marker>
          <marker id="arrow-supply-warm" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.warn} />
          </marker>
          <marker id="arrow-supply-hot" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.danger} />
          </marker>
        </defs>

        <rect width={1200} height={500} fill={colors.surface.canvas} />

        {/* Divider between panels */}
        <line x1={600} y1={70} x2={600} y2={460} stroke={colors.ink[300]} strokeWidth={1} strokeDasharray="4,4" />

        <Panel x={0} title="Heat pump only" stripsActive={false} />
        <Panel x={600} title="Heat pump + aux heat" stripsActive={true} />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Aux heat strips sit inside the air handler downstream of the indoor coil. They engage as a supplement when the heat pump alone cannot meet thermostat demand.
      </figcaption>
    </figure>
  );
}
