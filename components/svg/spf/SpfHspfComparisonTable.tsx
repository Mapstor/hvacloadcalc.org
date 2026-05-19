import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const COLUMNS = ['COP', 'HSPF2', 'SPF (real-world)'];

interface Row {
  label: string;
  cells: [string, string, string];
  highlight: [boolean, boolean, boolean];
}

const ROWS: Row[] = [
  {
    label: 'What it measures',
    cells: ['Instantaneous efficiency', 'Rated, weighted profile', 'Measured, actual season'],
    highlight: [false, false, true],
  },
  {
    label: 'Conditions',
    cells: ['Single test point', 'Standardized climate profile', 'Real installation'],
    highlight: [false, false, true],
  },
  {
    label: 'Includes aux heat',
    cells: ['No', 'Yes, partially', 'Yes, all of it'],
    highlight: [false, false, true],
  },
  {
    label: 'Includes defrost',
    cells: ['No', 'Yes', 'Yes'],
    highlight: [false, true, true],
  },
  {
    label: 'Reflects your home',
    cells: ['No', 'Representative', 'Yes'],
    highlight: [false, false, true],
  },
];

const COL_LEFT = 30;
const LABEL_WIDTH = 170;
const COL_WIDTH = 220;
const HEADER_HEIGHT = 56;
const ROW_HEIGHT = 60;
const ROW_TOP = HEADER_HEIGHT + 30;

export function SpfHspfComparisonTable({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 900 500"
        titleId="spf-hspf-comparison-table-title"
        descId="spf-hspf-comparison-table-desc"
        title="COP, HSPF2, and SPF compared"
        desc="Comparison table with three columns: COP, HSPF2, and SPF real-world. Rows compare what each metric measures, the conditions it applies to, whether it includes aux heat and defrost, and whether it reflects the actual home. SPF accounts for everything including aux heat and defrost under real installation conditions."
        className="w-full"
      >
        <rect width={900} height={500} fill={colors.surface.canvas} />

        {/* Header row */}
        <g transform={`translate(${COL_LEFT + LABEL_WIDTH},20)`}>
          {COLUMNS.map((col, i) => {
            const isWinner = i === 2;
            return (
              <g key={col} transform={`translate(${i * COL_WIDTH},0)`}>
                <rect
                  width={COL_WIDTH - 10}
                  height={HEADER_HEIGHT}
                  rx={6}
                  fill={isWinner ? colors.good : colors.brand.primary}
                  fillOpacity={isWinner ? 0.18 : 0.12}
                  stroke={isWinner ? colors.good : colors.brand.primary}
                  strokeWidth={2}
                />
                <text
                  x={(COL_WIDTH - 10) / 2}
                  y={HEADER_HEIGHT / 2 + 6}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={typography.size.axisLabel}
                  fontWeight={typography.weight.title}
                  fill={isWinner ? colors.good : colors.brand.primaryDark}
                >
                  {col}
                </text>
              </g>
            );
          })}
        </g>

        {/* Body rows */}
        {ROWS.map((row, ri) => {
          const y = ROW_TOP + ri * ROW_HEIGHT;
          return (
            <g key={row.label} transform={`translate(0,${y})`}>
              {/* Label */}
              <text
                x={COL_LEFT + LABEL_WIDTH - 12}
                y={ROW_HEIGHT / 2 + 4}
                textAnchor="end"
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.label}
                fill={colors.ink[900]}
              >
                {row.label}
              </text>
              {row.cells.map((cell, ci) => {
                const cellX = COL_LEFT + LABEL_WIDTH + ci * COL_WIDTH;
                const highlight = row.highlight[ci];
                return (
                  <g key={ci}>
                    <rect
                      x={cellX}
                      y={2}
                      width={COL_WIDTH - 10}
                      height={ROW_HEIGHT - 8}
                      rx={4}
                      fill={highlight ? colors.good : colors.ink[100]}
                      fillOpacity={highlight ? 0.18 : 0.6}
                      stroke={highlight ? colors.good : colors.ink[300]}
                      strokeWidth={1}
                    />
                    <text
                      x={cellX + (COL_WIDTH - 10) / 2}
                      y={ROW_HEIGHT / 2 + 4}
                      textAnchor="middle"
                      fontFamily={FONT}
                      fontSize={typography.size.legend}
                      fill={colors.ink[900]}
                    >
                      {cell}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        HSPF2 enables comparison shopping between equipment models; SPF reflects what your specific system actually does.
      </figcaption>
    </figure>
  );
}
