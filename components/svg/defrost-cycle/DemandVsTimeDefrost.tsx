import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const TIMELINE_X_MIN = 80;
const TIMELINE_X_MAX = 460;
const HOURS = 8;

function xForHour(h: number, panelOffset: number): number {
  return panelOffset + TIMELINE_X_MIN + (h / HOURS) * (TIMELINE_X_MAX - TIMELINE_X_MIN);
}

interface Panel {
  offset: number;
  title: string;
  subtitle: string;
  defrostHours: number[];
  caption: string;
  color: string;
}

const TIME_DEFROST: Panel = {
  offset: 0,
  title: 'Time-initiated defrost',
  subtitle: '(older systems)',
  defrostHours: [1, 2, 3, 4, 5, 6, 7],
  caption: 'Runs on a clock every 60 minutes regardless of conditions.',
  color: colors.warn,
};

const DEMAND_DEFROST: Panel = {
  offset: 500,
  title: 'Demand-initiated defrost',
  subtitle: '(modern + all CCASHP)',
  defrostHours: [0.7, 1.3, 1.9, 6.5, 7.4],
  caption: 'Senses frost via coil sensors. Skips defrost when not needed.',
  color: colors.brand.primary,
};

function DefrostPanel({ panel }: { panel: Panel }) {
  return (
    <g>
      {/* Panel background */}
      <rect x={panel.offset + 20} y={80} width={480} height={300} rx={8} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      {/* Title */}
      <text x={panel.offset + 40} y={110} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={panel.color}>
        {panel.title}
      </text>
      <text x={panel.offset + 40} y={130} fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        {panel.subtitle}
      </text>

      {/* Timeline base */}
      <line x1={panel.offset + TIMELINE_X_MIN} y1={250} x2={panel.offset + TIMELINE_X_MAX} y2={250} stroke={colors.ink[700]} strokeWidth={2} />

      {/* Hour ticks */}
      {[0, 2, 4, 6, 8].map((h) => (
        <g key={h}>
          <line x1={xForHour(h, panel.offset)} y1={250} x2={xForHour(h, panel.offset)} y2={258} stroke={colors.ink[700]} strokeWidth={1} />
          <text
            x={xForHour(h, panel.offset)}
            y={272}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={typography.size.tickLabel}
            fill={colors.ink[700]}
          >
            {h}h
          </text>
        </g>
      ))}
      <text
        x={panel.offset + (TIMELINE_X_MIN + TIMELINE_X_MAX) / 2}
        y={296}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={typography.size.axisLabel}
        fontWeight={typography.weight.label}
        fill={colors.ink[700]}
      >
        Time (cold humid weather)
      </text>

      {/* Defrost bars */}
      {panel.defrostHours.map((h, i) => {
        const x = xForHour(h, panel.offset);
        return (
          <g key={i}>
            <rect x={x - 4} y={180} width={8} height={70} fill={panel.color} fillOpacity={0.85} stroke={panel.color} strokeWidth={1} />
          </g>
        );
      })}

      {/* Defrost count */}
      <g transform={`translate(${panel.offset + 40},170)`}>
        <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={panel.color}>
          {panel.defrostHours.length} defrosts in 8 hours
        </text>
      </g>

      {/* Caption */}
      <foreignObject x={panel.offset + 40} y={320} width={440} height={50}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: '1.4' }}>
          {panel.caption}
        </div>
      </foreignObject>
    </g>
  );
}

export function DemandVsTimeDefrost({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 460"
        titleId="demand-vs-time-defrost-title"
        descId="demand-vs-time-defrost-desc"
        title="Time-initiated defrost compared to demand-initiated defrost"
        desc="Two-panel comparison of defrost initiation strategies over an 8-hour period in cold humid weather. Left panel time-initiated defrost from older systems shows defrost bars at regular intervals every 60 minutes for 7 total cycles regardless of actual frost. Right panel demand-initiated defrost from modern and cold-climate certified systems shows irregular spacing with 3 defrost cycles in the first 2 hours when humid, then a long gap, then 2 more cycles later. Demand defrost runs 5 cycles versus 7 cycles, saving energy by only defrosting when frost has actually formed."
        className="w-full"
      >
        <rect width={1000} height={460} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Time-initiated defrost vs demand-initiated defrost
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Defrost cycles over 8 hours of cold humid weather
        </text>

        <DefrostPanel panel={TIME_DEFROST} />
        <DefrostPanel panel={DEMAND_DEFROST} />

        <text x={500} y={440} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Demand defrost saves 5-15% of defrost-related energy compared to time defrost.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Older systems defrost on a timer. Modern systems use coil temperature sensors to defrost only when frost is detected.
      </figcaption>
    </figure>
  );
}
