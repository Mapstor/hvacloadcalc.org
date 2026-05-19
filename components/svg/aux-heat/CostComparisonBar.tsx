import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface BarSpec {
  label: string;
  cost: number;
  color: string;
}

const BARS: BarSpec[] = [
  { label: 'Heat pump alone (COP 3.0)', cost: 0.27, color: colors.good },
  { label: 'Heat pump + 5 kW aux heat strip', cost: 1.07, color: colors.warn },
  { label: 'Emergency heat (10 kW strips only)', cost: 1.6, color: colors.danger },
];

const MAX_COST = 1.8;
const BAR_AREA_X = 280;
const BAR_AREA_WIDTH = 420;
const Y_FIRST = 110;
const ROW_HEIGHT = 90;
const BAR_HEIGHT = 36;

export function CostComparisonBar({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 800 500"
        titleId="cost-comparison-bar-title"
        descId="cost-comparison-bar-desc"
        title="Cost comparison: heat pump versus aux heat versus emergency heat"
        desc="Horizontal bar chart comparing hourly operating cost to deliver the same heat output. Heat pump alone costs about 27 cents per hour, heat pump plus a 5 kW aux heat strip costs about $1.07 per hour, and emergency heat using 10 kW of resistance strips alone costs about $1.60 per hour. Based on US average residential electricity rate of 16 cents per kWh."
        className="w-full"
      >
        <rect width={800} height={500} fill={colors.surface.canvas} />

        <text
          x={400}
          y={50}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.chartTitle}
          fontWeight={typography.weight.title}
          fill={colors.ink[900]}
        >
          Cost to deliver 17,060 BTU over one hour
        </text>
        <text
          x={400}
          y={75}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.legend}
          fill={colors.ink[500]}
        >
          At US average residential rate of $0.16/kWh
        </text>

        {BARS.map((bar, i) => {
          const y = Y_FIRST + i * ROW_HEIGHT;
          const width = (bar.cost / MAX_COST) * BAR_AREA_WIDTH;
          return (
            <g key={bar.label}>
              <text
                x={BAR_AREA_X - 10}
                y={y + BAR_HEIGHT / 2 + 4}
                textAnchor="end"
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.label}
                fill={colors.ink[900]}
              >
                {bar.label}
              </text>
              <rect
                x={BAR_AREA_X}
                y={y}
                width={width}
                height={BAR_HEIGHT}
                fill={bar.color}
                fillOpacity={0.85}
                stroke={bar.color}
                strokeWidth={1.5}
                rx={4}
              />
              <text
                x={BAR_AREA_X + width + 10}
                y={y + BAR_HEIGHT / 2 + 4}
                fontFamily={FONT}
                fontSize={typography.size.dataPointLabel}
                fontWeight={typography.weight.title}
                fill={bar.color}
              >
                ${bar.cost.toFixed(2)}/hour
              </text>
            </g>
          );
        })}

        {/* Scale bar at bottom */}
        <line
          x1={BAR_AREA_X}
          y1={Y_FIRST + BARS.length * ROW_HEIGHT - 30}
          x2={BAR_AREA_X + BAR_AREA_WIDTH}
          y2={Y_FIRST + BARS.length * ROW_HEIGHT - 30}
          stroke={colors.ink[500]}
          strokeWidth={1}
        />
        {[0, 0.5, 1, 1.5].map((v) => (
          <g key={v}>
            <line
              x1={BAR_AREA_X + (v / MAX_COST) * BAR_AREA_WIDTH}
              y1={Y_FIRST + BARS.length * ROW_HEIGHT - 34}
              x2={BAR_AREA_X + (v / MAX_COST) * BAR_AREA_WIDTH}
              y2={Y_FIRST + BARS.length * ROW_HEIGHT - 26}
              stroke={colors.ink[500]}
              strokeWidth={1}
            />
            <text
              x={BAR_AREA_X + (v / MAX_COST) * BAR_AREA_WIDTH}
              y={Y_FIRST + BARS.length * ROW_HEIGHT - 12}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={typography.size.tickLabel}
              fill={colors.ink[500]}
            >
              ${v.toFixed(2)}
            </text>
          </g>
        ))}

        <text
          x={400}
          y={460}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.caption}
          fontStyle="italic"
          fill={colors.ink[500]}
        >
          Heat pump COP assumed 3.0; resistance heat COP 1.0 by definition.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Heat pumps move heat; resistance strips make heat. Moving is roughly three times cheaper than making.
      </figcaption>
    </figure>
  );
}
