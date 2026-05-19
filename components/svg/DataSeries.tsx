import { colors } from './tokens';

export interface SeriesPoint {
  x: number;
  y: number;
}

interface Props {
  points: SeriesPoint[];
  color?: string;
  strokeWidth?: number;
  fill?: string;
  showDots?: boolean;
}

export function DataSeries({
  points,
  color = colors.series.primary,
  strokeWidth = 2.5,
  fill = 'none',
  showDots = false,
}: Props) {
  if (points.length === 0) {
    return null;
  }
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');
  return (
    <g>
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDots
        ? points.map((p, i) => (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={3.5}
              fill={color}
            />
          ))
        : null}
    </g>
  );
}
