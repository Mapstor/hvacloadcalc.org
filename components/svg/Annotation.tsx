import { colors, typography } from './tokens';

interface Props {
  x: number;
  y: number;
  text: string;
  arrowTo?: { x: number; y: number };
  textAnchor?: 'start' | 'middle' | 'end';
}

export function Annotation({ x, y, text, arrowTo, textAnchor = 'start' }: Props) {
  return (
    <g>
      {arrowTo ? (
        <line
          x1={x}
          y1={y + 4}
          x2={arrowTo.x}
          y2={arrowTo.y}
          stroke={colors.ink[700]}
          strokeWidth={1.25}
          strokeDasharray="3,3"
        />
      ) : null}
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fontSize={typography.size.annotation}
        fontStyle="italic"
        fontFamily={typography.fontFamily}
        fill={colors.ink[700]}
      >
        {text}
      </text>
    </g>
  );
}
