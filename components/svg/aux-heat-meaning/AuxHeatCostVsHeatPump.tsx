import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface BarProps {
  x: number;
  title: string;
  subtitle: string;
  electricKWh: number;
  heatOutputBtu: number;
  cop: string;
  cost: string;
  color: string;
}

const ELECTRIC_MAX = 11;
const BAR_BASE_Y = 380;
const BAR_HEIGHT_MAX = 200;

function Bar({ x, title, subtitle, electricKWh, heatOutputBtu, cop, cost, color }: BarProps) {
  const electricHeight = (electricKWh / ELECTRIC_MAX) * BAR_HEIGHT_MAX;
  const heatHeight = (heatOutputBtu / 25000) * BAR_HEIGHT_MAX;

  return (
    <g transform={`translate(${x},0)`}>
      <text x={150} y={70} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={150} y={88} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      {/* COP badge */}
      <g transform="translate(95,100)">
        <rect width={110} height={26} rx={13} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.5} />
        <text x={55} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={color}>
          {cop}
        </text>
      </g>

      {/* Two bars */}
      <g>
        {/* Electric input bar */}
        <rect
          x={50}
          y={BAR_BASE_Y - electricHeight}
          width={70}
          height={electricHeight}
          fill={colors.warn}
          fillOpacity={0.75}
          stroke={colors.warn}
          strokeWidth={1.5}
        />
        <text x={85} y={BAR_BASE_Y - electricHeight - 8} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {electricKWh.toFixed(0)} kWh in
        </text>

        {/* Heat output bar */}
        <rect
          x={170}
          y={BAR_BASE_Y - heatHeight}
          width={70}
          height={heatHeight}
          fill={color}
          fillOpacity={0.85}
          stroke={color}
          strokeWidth={1.5}
        />
        <text x={205} y={BAR_BASE_Y - heatHeight - 8} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          {(heatOutputBtu / 1000).toFixed(0)}k BTU out
        </text>

        {/* Baseline */}
        <line x1={40} y1={BAR_BASE_Y} x2={260} y2={BAR_BASE_Y} stroke={colors.ink[700]} strokeWidth={1.5} />

        {/* X labels */}
        <text x={85} y={BAR_BASE_Y + 18} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
          Electric in
        </text>
        <text x={205} y={BAR_BASE_Y + 18} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
          Heat out
        </text>
      </g>

      {/* Cost block */}
      <g transform="translate(60,420)">
        <rect width={180} height={70} rx={6} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={1.5} />
        <text x={90} y={26} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Cost per hour
        </text>
        <text x={90} y={52} textAnchor="middle" fontFamily={FONT} fontSize={20} fontWeight={typography.weight.title} fill={color}>
          {cost}
        </text>
      </g>
    </g>
  );
}

export function AuxHeatCostVsHeatPump({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 540"
        titleId="aux-heat-cost-vs-heat-pump-title"
        descId="aux-heat-cost-vs-heat-pump-desc"
        title="Cost comparison: heat pump vs auxiliary heat for the same heating output"
        desc="Side-by-side bar comparison. Left side heat pump: 4 kWh electrical input produces 25,000 BTU per hour heating output at COP 2.5, costing 64 cents per hour at 16 cents per kWh. Right side auxiliary heat only: 10 kWh electrical input produces 10,000 BTU per hour heating output at COP 1.0, costing 1 dollar 60 cents per hour. Aux delivers 40 percent of the BTU at 100 percent of the kWh cost. Aux heat costs 2.5 times more per BTU of heating delivered than the heat pump. Brief aux during cold snaps is normal; constant aux is expensive."
        className="w-full"
      >
        <rect width={1000} height={540} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Aux heat costs 2-4× more per BTU than heat pump
        </text>
        <text x={500} y={56} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same heating output, very different electric input
        </text>

        <Bar
          x={60}
          title="Heat pump alone"
          subtitle="inverter, COP 2.5"
          electricKWh={4}
          heatOutputBtu={25000}
          cop="COP 2.5"
          cost="$0.64/hr"
          color={colors.good}
        />

        <Bar
          x={580}
          title="Aux heat alone"
          subtitle="electric resistance, COP 1.0"
          electricKWh={10}
          heatOutputBtu={10000}
          cop="COP 1.0"
          cost="$1.60/hr"
          color={colors.danger}
        />

        {/* Centered footnote */}
        <text x={500} y={520} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Numbers assume $0.16/kWh average US residential electricity rate. Your rate may vary; the ratio holds.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Brief aux during defrost costs cents. Hours of continuous aux costs real money. The ratio is set by physics, not the equipment.
      </figcaption>
    </figure>
  );
}
