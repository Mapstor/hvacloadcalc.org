import { colors } from './tokens';

interface Props {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
  xSteps: number;
  ySteps: number;
}

export function ChartGrid({ xStart, xEnd, yStart, yEnd, xSteps, ySteps }: Props) {
  const xLines = [];
  const yLines = [];

  for (let i = 0; i <= xSteps; i++) {
    const x = xStart + ((xEnd - xStart) * i) / xSteps;
    xLines.push(
      <line
        key={`gx-${i}`}
        x1={x}
        y1={yStart}
        x2={x}
        y2={yEnd}
        stroke={colors.ink[300]}
        strokeWidth={1}
        strokeDasharray="2,2"
      />,
    );
  }

  for (let i = 0; i <= ySteps; i++) {
    const y = yStart + ((yEnd - yStart) * i) / ySteps;
    yLines.push(
      <line
        key={`gy-${i}`}
        x1={xStart}
        y1={y}
        x2={xEnd}
        y2={y}
        stroke={colors.ink[300]}
        strokeWidth={1}
        strokeDasharray="2,2"
      />,
    );
  }

  return (
    <g aria-hidden="true">
      {xLines}
      {yLines}
    </g>
  );
}
