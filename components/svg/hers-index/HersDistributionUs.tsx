import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 100;
const X_MAX = 880;
const Y_TOP = 110;
const Y_BOTTOM = 470;
const HERS_MAX = 200;
const PCT_MAX = 18;

function xForHers(h: number): number {
  return X_MIN + (h / HERS_MAX) * (X_MAX - X_MIN);
}
function yForPct(p: number): number {
  return Y_BOTTOM - (p / PCT_MAX) * (Y_BOTTOM - Y_TOP);
}

// Stylized histogram bins (HERS bin center → percent of homes)
const NEW_CONSTRUCTION = [
  { h: 40, p: 0.5 },
  { h: 50, p: 4 },
  { h: 55, p: 9 },
  { h: 60, p: 15 },
  { h: 65, p: 16 },
  { h: 70, p: 11 },
  { h: 75, p: 6 },
  { h: 80, p: 3 },
  { h: 85, p: 1 },
];

const EXISTING_STOCK = [
  { h: 70, p: 0.5 },
  { h: 85, p: 1.5 },
  { h: 100, p: 4 },
  { h: 115, p: 8 },
  { h: 130, p: 12 },
  { h: 145, p: 10 },
  { h: 160, p: 7 },
  { h: 175, p: 4 },
  { h: 190, p: 1.5 },
];

const BIN_WIDTH = 30;

interface AnchorLine {
  h: number;
  label: string;
}

const ANCHORS: AnchorLine[] = [
  { h: 0, label: 'Net-zero' },
  { h: 30, label: 'ZERH' },
  { h: 50, label: 'ENERGY STAR' },
  { h: 100, label: '2006 ref' },
  { h: 130, label: 'Existing median' },
];

export function HersDistributionUs({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="hers-distribution-us-title"
        descId="hers-distribution-us-desc"
        title="Distribution of HERS Index scores: new construction vs existing US housing stock"
        desc="Histogram of HERS Index scores for US homes. X-axis HERS Index from 0 to 200 in 10-point bins. Y-axis percent of homes in each bin. Two overlapping distributions. New construction 2024 in blue peaks around HERS 55 to 65. All US existing housing stock in gray peaks around HERS 130 to 140 with a wide spread. Vertical reference lines at 0 net-zero, 30 ZERH, 50 top tier, 100 reference, 130 existing median. Most new US homes today rate between HERS 50 and 70. Existing US housing stock median is approximately 130, reflecting decades of accumulated inefficiency."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          HERS distribution: new homes vs existing US housing
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Two populations separated by decades of code improvement
        </text>

        {/* Grid */}
        <g stroke={colors.ink[300]} strokeWidth={0.5} opacity={0.5}>
          {[5, 10, 15].map((p) => (
            <line key={p} x1={X_MIN} y1={yForPct(p)} x2={X_MAX} y2={yForPct(p)} />
          ))}
          {[50, 100, 150].map((h) => (
            <line key={h} x1={xForHers(h)} y1={Y_TOP} x2={xForHers(h)} y2={Y_BOTTOM} />
          ))}
        </g>

        {/* Anchor lines */}
        {ANCHORS.map((a) => (
          <g key={a.h}>
            <line x1={xForHers(a.h)} y1={Y_TOP - 20} x2={xForHers(a.h)} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1} strokeDasharray="3,3" />
            <text x={xForHers(a.h)} y={Y_TOP - 26} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
              {a.label}
            </text>
          </g>
        ))}

        {/* Existing stock bars (gray, drawn first) */}
        {EXISTING_STOCK.map((bin) => (
          <rect
            key={`ex-${bin.h}`}
            x={xForHers(bin.h) - BIN_WIDTH / 2}
            y={yForPct(bin.p)}
            width={BIN_WIDTH}
            height={Y_BOTTOM - yForPct(bin.p)}
            fill={colors.ink[500]}
            fillOpacity={0.55}
            stroke={colors.ink[700]}
            strokeWidth={0.5}
          />
        ))}

        {/* New construction bars (blue) */}
        {NEW_CONSTRUCTION.map((bin) => (
          <rect
            key={`nc-${bin.h}`}
            x={xForHers(bin.h) - BIN_WIDTH / 2}
            y={yForPct(bin.p)}
            width={BIN_WIDTH}
            height={Y_BOTTOM - yForPct(bin.p)}
            fill={colors.brand.primary}
            fillOpacity={0.8}
            stroke={colors.brand.primaryDark}
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={2} />

        {/* X-axis ticks */}
        {[0, 25, 50, 75, 100, 125, 150, 175, 200].map((h) => (
          <g key={h}>
            <line x1={xForHers(h)} y1={Y_BOTTOM} x2={xForHers(h)} y2={Y_BOTTOM + 5} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForHers(h)} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              {h}
            </text>
          </g>
        ))}
        <text x={(X_MIN + X_MAX) / 2} y={Y_BOTTOM + 44} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          HERS Index
        </text>

        {/* Y-axis ticks */}
        {[0, 5, 10, 15].map((p) => (
          <g key={p}>
            <line x1={X_MIN - 5} y1={yForPct(p)} x2={X_MIN} y2={yForPct(p)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MIN - 10} y={yForPct(p) + 4} textAnchor="end" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              {p}%
            </text>
          </g>
        ))}
        <text
          x={X_MIN - 50}
          y={(Y_TOP + Y_BOTTOM) / 2}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.axisLabel}
          fontWeight={typography.weight.label}
          fill={colors.ink[700]}
          transform={`rotate(-90 ${X_MIN - 50} ${(Y_TOP + Y_BOTTOM) / 2})`}
        >
          % of homes
        </text>

        {/* Legend */}
        <g transform="translate(620,90)">
          <rect width={20} height={14} fill={colors.brand.primary} fillOpacity={0.8} />
          <text x={28} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            New construction 2024
          </text>
          <rect y={22} width={20} height={14} fill={colors.ink[500]} fillOpacity={0.55} />
          <text x={28} y={34} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Existing US housing
          </text>
        </g>

        <text x={500} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          New code-built homes cluster around HERS 60. Existing US housing stock is decades behind.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The HERS gap between new construction and existing housing represents the cumulative impact of code improvements and equipment efficiency gains since 2006.
      </figcaption>
    </figure>
  );
}
