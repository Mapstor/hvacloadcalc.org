import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Step {
  label: string;
  hers: number;
  cost: string;
  color: string;
}

const STEPS: Step[] = [
  { label: 'Baseline 2006 code home', hers: 100, cost: '—', color: colors.ink[500] },
  { label: '+ 2021 IECC envelope upgrade', hers: 88, cost: '+$2-4k', color: '#fb923c' },
  { label: '+ Air sealing (ACH50: 7→3)', hers: 78, cost: '+$0.5-1.5k', color: '#fbbf24' },
  { label: '+ ENERGY STAR appliances', hers: 73, cost: '+$1-2k', color: '#facc15' },
  { label: '+ Heat pump (replacing AC + furnace)', hers: 62, cost: '+$5-10k', color: '#a3e635' },
  { label: '+ Heat pump water heater', hers: 57, cost: '+$1.5-2.5k', color: '#22c55e' },
  { label: '+ Solar PV (4 kW)', hers: 38, cost: '+$8-12k', color: '#0ea5e9' },
  { label: '+ Solar PV (8 kW + battery)', hers: 8, cost: '+$15-25k', color: '#1d4ed8' },
  { label: '+ Additional PV → Net-zero', hers: 0, cost: '+$3-5k', color: '#7c3aed' },
];

const X_LABEL_END = 360;
const X_BAR_START = 370;
const X_BAR_END = 760;
const HERS_MAX = 110;
const ROW_HEIGHT = 46;
const Y_TOP = 110;

function barWidth(h: number): number {
  return (h / HERS_MAX) * (X_BAR_END - X_BAR_START);
}

export function HersReductionStack({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 580"
        titleId="hers-reduction-stack-title"
        descId="hers-reduction-stack-desc"
        title="How successive improvements lower the HERS Index"
        desc="Horizontal stacked bar chart showing HERS reduction from successive improvements to a baseline 2006 reference home. Starting at HERS 100 for the baseline, each successive improvement moves the bar leftward. 2021 IECC envelope upgrade to HERS 88 plus 2 to 4 thousand dollars. Air sealing to HERS 78. ENERGY STAR appliances to HERS 73. Heat pump replacing AC and furnace to HERS 62. Heat pump water heater to HERS 57. Solar PV 4 kilowatts to HERS 38. Solar PV 8 kilowatts plus battery to HERS 8. Additional PV reaches net-zero HERS 0. Reaching low HERS scores typically requires both envelope improvements and on-site renewable energy."
        className="w-full"
      >
        <rect width={1000} height={580} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          How to drive a HERS score down to zero
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Each row adds one improvement to the prior; HERS drops cumulatively
        </text>

        {/* X-axis scale */}
        <g>
          <line x1={X_BAR_START} y1={86} x2={X_BAR_END} y2={86} stroke={colors.ink[700]} strokeWidth={1.5} />
          {[0, 25, 50, 75, 100].map((h) => (
            <g key={h}>
              <line x1={X_BAR_START + barWidth(h)} y1={80} x2={X_BAR_START + barWidth(h)} y2={92} stroke={colors.ink[700]} strokeWidth={1} />
              <text x={X_BAR_START + barWidth(h)} y={76} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
                {h}
              </text>
            </g>
          ))}
        </g>

        {/* Rows */}
        {STEPS.map((s, i) => {
          const y = Y_TOP + i * ROW_HEIGHT;
          return (
            <g key={s.label}>
              <text x={X_LABEL_END} y={y + 14} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={i === 0 ? typography.weight.title : typography.weight.label} fill={colors.ink[900]}>
                {s.label}
              </text>
              <text x={X_LABEL_END} y={y + 28} textAnchor="end" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                {s.cost}
              </text>

              <rect
                x={X_BAR_START}
                y={y}
                width={barWidth(s.hers)}
                height={26}
                fill={s.color}
                fillOpacity={0.8}
                stroke={s.color}
                strokeWidth={1.5}
              />

              <text
                x={X_BAR_START + barWidth(s.hers) + 8}
                y={y + 18}
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.title}
                fill={colors.ink[900]}
              >
                HERS {s.hers}
              </text>
            </g>
          );
        })}

        <text x={500} y={542} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Envelope and equipment can get to HERS 50-60. Below that, solar PV is the practical lever.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Costs and HERS impacts are approximate; specifics depend on climate zone, baseline condition, and equipment selection. Air sealing remains the cheapest reduction per HERS point.
      </figcaption>
    </figure>
  );
}
