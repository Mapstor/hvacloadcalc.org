import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Item {
  title: string;
  detail: string;
}

const NORMAL: Item[] = [
  {
    title: 'Outdoor temp below balance point',
    detail: 'Engineered behavior. Expect this on cold days.',
  },
  {
    title: 'Defrost cycle (5–15 min)',
    detail: 'System reverses; strips keep supply air warm.',
  },
  {
    title: 'Setback recovery (raising 3°F+)',
    detail: 'Aux heat helps reach setpoint faster.',
  },
  {
    title: 'Sustained indoor temp drop',
    detail: 'Open door, large gap; strips catch up.',
  },
];

const PROBLEM: Item[] = [
  {
    title: 'Aux heat in mild weather',
    detail: 'Above balance point with no other trigger.',
  },
  {
    title: 'Continuous operation without trigger',
    detail: 'No call escalation, no defrost, but strips on.',
  },
  {
    title: 'Runs after setpoint reached',
    detail: 'Likely a stuck relay or control fault.',
  },
  {
    title: 'Runs alone without compressor',
    detail: 'Either EM HEAT mode or a dead compressor.',
  },
];

const COL_WIDTH = 440;
const COL_GAP = 40;
const COL_LEFT_X = 30;
const COL_RIGHT_X = COL_LEFT_X + COL_WIDTH + COL_GAP;
const HEADER_HEIGHT = 60;
const ROW_HEIGHT = 100;
const ROW_TOP = 100;

interface ColumnProps {
  x: number;
  title: string;
  color: string;
  items: Item[];
  iconType: 'check' | 'warn';
}

function Column({ x, title, color, items, iconType }: ColumnProps) {
  return (
    <g transform={`translate(${x},20)`}>
      <rect
        width={COL_WIDTH}
        height={HEADER_HEIGHT}
        rx={6}
        fill={color}
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={2}
      />
      <text
        x={COL_WIDTH / 2}
        y={HEADER_HEIGHT / 2 + 8}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={typography.size.chartTitle}
        fontWeight={typography.weight.title}
        fill={color}
      >
        {title}
      </text>

      {items.map((item, i) => {
        const y = HEADER_HEIGHT + 15 + i * ROW_HEIGHT;
        return (
          <g key={item.title} transform={`translate(0,${y})`}>
            <rect
              width={COL_WIDTH}
              height={ROW_HEIGHT - 15}
              rx={5}
              fill={colors.surface.canvas}
              stroke={colors.ink[300]}
              strokeWidth={1}
            />
            {/* Icon */}
            <circle cx={28} cy={(ROW_HEIGHT - 15) / 2} r={14} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
            {iconType === 'check' ? (
              <path
                d={`M ${22} ${(ROW_HEIGHT - 15) / 2 + 1} L ${27} ${(ROW_HEIGHT - 15) / 2 + 6} L ${36} ${(ROW_HEIGHT - 15) / 2 - 4}`}
                stroke={color}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <g>
                <line
                  x1={28}
                  y1={(ROW_HEIGHT - 15) / 2 - 6}
                  x2={28}
                  y2={(ROW_HEIGHT - 15) / 2 + 2}
                  stroke={color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                <circle cx={28} cy={(ROW_HEIGHT - 15) / 2 + 7} r={1.5} fill={color} />
              </g>
            )}
            <text
              x={60}
              y={(ROW_HEIGHT - 15) / 2 - 4}
              fontFamily={FONT}
              fontSize={typography.size.axisLabel}
              fontWeight={typography.weight.title}
              fill={colors.ink[900]}
            >
              {item.title}
            </text>
            <text
              x={60}
              y={(ROW_HEIGHT - 15) / 2 + 18}
              fontFamily={FONT}
              fontSize={typography.size.legend}
              fill={colors.ink[700]}
            >
              {item.detail}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function NormalVsProblemDecision({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="normal-vs-problem-decision-title"
        descId="normal-vs-problem-decision-desc"
        title="Normal versus problem scenarios for auxiliary heat"
        desc="Side-by-side decision matrix. Left column titled Normal in green lists four scenarios with green checkmarks: outdoor temp below balance point, defrost cycle, setback recovery, sustained indoor temp drop. Right column titled Problem in red lists four scenarios with red warning icons: aux heat in mild weather, continuous operation without trigger, runs after setpoint reached, runs alone without compressor. Footer text states aux heat is automatic while emergency heat is manual."
        className="w-full"
      >
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <Column x={COL_LEFT_X} title="Normal" color={colors.good} items={NORMAL} iconType="check" />
        <Column x={COL_RIGHT_X} title="Problem" color={colors.danger} items={PROBLEM} iconType="warn" />

        <rect
          x={30}
          y={ROW_TOP + 4 * ROW_HEIGHT + 30}
          width={1000 - 60}
          height={50}
          rx={6}
          fill={colors.surface.subtle}
          stroke={colors.ink[700]}
          strokeWidth={1.5}
        />
        <text
          x={500}
          y={ROW_TOP + 4 * ROW_HEIGHT + 60}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.axisLabel}
          fontWeight={typography.weight.title}
          fill={colors.ink[900]}
        >
          Aux heat is automatic. Emergency heat is manual.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Four normal aux heat scenarios versus four that warrant troubleshooting.
      </figcaption>
    </figure>
  );
}
