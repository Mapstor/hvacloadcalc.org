import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ColProps {
  x: number;
  title: string;
  badge: string;
  badgeColor: string;
  rows: Array<{ label: string; value: string }>;
}

function Col({ x, title, badge, badgeColor, rows }: ColProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={420} height={360} rx={10} fill={colors.surface.canvas} stroke={badgeColor} strokeWidth={2.5} />

      <text x={210} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(120,52)">
        <rect width={180} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={90} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badge}
        </text>
      </g>

      {rows.map((row, i) => (
        <g key={i} transform={`translate(20,${110 + i * 48})`}>
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
            {row.label}
          </text>
          <text y={20} fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={badgeColor}>
            {row.value}
          </text>
        </g>
      ))}
    </g>
  );
}

export function AuxVsEmergencyComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 540"
        titleId="aux-vs-emergency-comparison-title"
        descId="aux-vs-emergency-comparison-desc"
        title="Auxiliary heat compared to emergency heat: same hardware, different control logic"
        desc="Two-column comparison of aux heat versus emergency heat. Aux heat column: control mode automatic, heat pump operation runs alongside, aux operation as backup, typical use normal cold weather, both heat pump and aux run simultaneously to handle the load. Emergency heat Em Heat column: control mode manual set by homeowner, heat pump turned off, aux runs alone as the only source, typical use when heat pump has failed or in extreme cold, only the electric resistance strips run. Same hardware electric resistance strips downstream of the indoor coil, different control logic."
        className="w-full"
      >
        <rect width={1000} height={540} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Aux heat vs emergency heat
        </text>
        <text x={500} y={56} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same hardware (electric strips). Different control logic.
        </text>

        <Col
          x={40}
          title="Aux heat (Auxiliary)"
          badge="AUTOMATIC"
          badgeColor={colors.warn}
          rows={[
            { label: 'Control mode', value: 'Automatic, thermostat-controlled' },
            { label: 'Heat pump', value: 'RUNS — handles primary load' },
            { label: 'Aux strips', value: 'RUN as helper when needed' },
            { label: 'When used', value: 'Cold weather, defrost, setback recovery' },
            { label: 'Cost', value: 'COP combined ~1.5-2.0 effective' },
          ]}
        />

        <Col
          x={540}
          title="Emergency heat (Em Heat)"
          badge="MANUAL"
          badgeColor={colors.danger}
          rows={[
            { label: 'Control mode', value: 'Manual, set by homeowner' },
            { label: 'Heat pump', value: 'OFF — disabled by Em Heat mode' },
            { label: 'Aux strips', value: 'RUN as ONLY heat source' },
            { label: 'When used', value: 'Heat pump failed or extreme cold' },
            { label: 'Cost', value: 'COP 1.0 (~2-3× heat pump cost)' },
          ]}
        />

        {/* Center divider with shared hardware note */}
        <g transform="translate(500,460)">
          <rect x={-200} y={0} width={400} height={56} rx={6} fill={colors.surface.subtle} stroke={colors.ink[500]} strokeWidth={1.5} />
          <text x={0} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Same hardware
          </text>
          <text x={0} y={44} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            Electric resistance strips below indoor coil, in both modes.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Aux heat is automatic; the thermostat decides when to fire it alongside the heat pump. Emergency heat is manual; you set it, and the heat pump stays off.
      </figcaption>
    </figure>
  );
}
