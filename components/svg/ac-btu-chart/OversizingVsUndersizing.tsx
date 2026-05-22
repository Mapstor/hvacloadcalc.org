import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  badge: string;
  badgeColor: string;
  runtimePattern: 'sawtooth' | 'flat';
  problems: string[];
}

function Panel({ x, title, badge, badgeColor, runtimePattern, problems }: PanelProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={440} height={400} rx={10} fill={colors.surface.canvas} stroke={badgeColor} strokeWidth={2.5} />

      <text x={220} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(140,50)">
        <rect width={160} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={80} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badge}
        </text>
      </g>

      {/* Runtime pattern visualization */}
      <g transform="translate(40,100)">
        <text x={180} y={0} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Compressor runtime over an hour
        </text>

        {/* Axis */}
        <line x1={0} y1={70} x2={360} y2={70} stroke={colors.ink[700]} strokeWidth={1.5} />

        {runtimePattern === 'sawtooth' ? (
          // Rapid on/off cycling
          <g>
            {[0, 60, 120, 180, 240, 300].map((startX, i) => (
              <g key={i}>
                <rect x={startX} y={30} width={30} height={40} fill={badgeColor} fillOpacity={0.85} />
                <text x={startX + 15} y={20} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={badgeColor}>
                  ON
                </text>
              </g>
            ))}
            {[30, 90, 150, 210, 270].map((startX, i) => (
              <text key={i} x={startX + 15} y={20} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
                off
              </text>
            ))}
          </g>
        ) : (
          // Constant running
          <g>
            <rect x={0} y={30} width={360} height={40} fill={badgeColor} fillOpacity={0.85} />
            <text x={180} y={56} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              ON CONTINUOUSLY
            </text>
          </g>
        )}

        {/* Time axis labels */}
        <text x={0} y={86} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
          0 min
        </text>
        <text x={180} y={86} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
          30 min
        </text>
        <text x={360} y={86} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
          60 min
        </text>
      </g>

      {/* Problems list */}
      <g transform="translate(40,230)">
        <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={badgeColor}>
          Penalties
        </text>
        {problems.map((p, i) => (
          <g key={i} transform={`translate(0,${22 + i * 22})`}>
            <text x={0} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={badgeColor}>
              •
            </text>
            <text x={14} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              {p}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

export function OversizingVsUndersizing({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 520"
        titleId="oversizing-vs-undersizing-title"
        descId="oversizing-vs-undersizing-desc"
        title="Oversized AC versus undersized AC: penalties on both sides"
        desc="Two side-by-side diagrams. Left panel oversized AC: shows compressor runtime as a sawtooth on-off pattern with frequent cycles. Penalties: short cycles every 5 to 10 minutes, doesn't dehumidify properly, wastes energy on startup losses, accelerates compressor wear, higher upfront cost. Right panel undersized AC: shows compressor running continuously without reaching setpoint. Penalties: runs constantly without catching up, indoor temperature climbs on extreme days, lower comfort margin, wears equipment from continuous overrun, lower upfront cost. Both extremes hurt; right-sizing matches output to load."
        className="w-full"
      >
        <rect width={1000} height={520} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Both extremes hurt
        </text>
        <text x={500} y={56} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Oversizing and undersizing each carry their own penalties
        </text>

        <Panel
          x={40}
          title="Oversized AC"
          badge="TOO BIG"
          badgeColor={colors.danger}
          runtimePattern="sawtooth"
          problems={[
            'Short cycles every 5-10 minutes',
            "Doesn't dehumidify properly (cold but clammy)",
            'Wastes energy on startup losses',
            'Compressor wear from frequent starts',
            'Higher upfront equipment cost',
          ]}
        />

        <Panel
          x={520}
          title="Undersized AC"
          badge="TOO SMALL"
          badgeColor={colors.warn}
          runtimePattern="flat"
          problems={[
            "Can't keep up on the hottest days",
            'Indoor temperature climbs above setpoint',
            'Compressor wear from continuous runtime',
            'No comfort margin for hot evenings',
            'Lower upfront cost but higher operating cost',
          ]}
        />

        <text x={500} y={500} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          The Goldilocks zone is the chart value adjusted for your room. Variable-speed (inverter) units forgive moderate oversizing.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Aim for the chart value adjusted for your conditions. A 10-20% margin over the target is fine; 30%+ oversizing starts to hurt.
      </figcaption>
    </figure>
  );
}
