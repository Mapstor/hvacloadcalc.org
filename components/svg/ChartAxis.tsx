import { colors, typography } from './tokens';

export interface AxisTick {
  position: number;
  label: string;
}

interface Props {
  orientation: 'x' | 'y';
  start: number;
  end: number;
  perpendicular: number;
  ticks: AxisTick[];
  label?: string;
}

export function ChartAxis({ orientation, start, end, perpendicular, ticks, label }: Props) {
  const isX = orientation === 'x';
  return (
    <g>
      <line
        x1={isX ? start : perpendicular}
        y1={isX ? perpendicular : start}
        x2={isX ? end : perpendicular}
        y2={isX ? perpendicular : end}
        stroke={colors.ink[700]}
        strokeWidth={1.5}
      />
      {ticks.map((tick) => (
        <g key={`tick-${orientation}-${tick.position}`}>
          <line
            x1={isX ? tick.position : perpendicular - 4}
            y1={isX ? perpendicular - 4 : tick.position}
            x2={isX ? tick.position : perpendicular + 4}
            y2={isX ? perpendicular + 4 : tick.position}
            stroke={colors.ink[700]}
            strokeWidth={1.5}
          />
          <text
            x={isX ? tick.position : perpendicular - 8}
            y={isX ? perpendicular + 18 : tick.position + 4}
            textAnchor={isX ? 'middle' : 'end'}
            fontSize={typography.size.tickLabel}
            fontFamily={typography.fontFamily}
            fill={colors.ink[500]}
          >
            {tick.label}
          </text>
        </g>
      ))}
      {label ? (
        isX ? (
          <text
            x={(start + end) / 2}
            y={perpendicular + 42}
            textAnchor="middle"
            fontSize={typography.size.axisLabel}
            fontWeight={typography.weight.label}
            fontFamily={typography.fontFamily}
            fill={colors.ink[700]}
          >
            {label}
          </text>
        ) : (
          <text
            x={perpendicular - 36}
            y={(start + end) / 2}
            textAnchor="middle"
            fontSize={typography.size.axisLabel}
            fontWeight={typography.weight.label}
            fontFamily={typography.fontFamily}
            fill={colors.ink[700]}
            transform={`rotate(-90 ${perpendicular - 36} ${(start + end) / 2})`}
          >
            {label}
          </text>
        )
      ) : null}
    </g>
  );
}
