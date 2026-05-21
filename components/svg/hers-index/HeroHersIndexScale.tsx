import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Marker {
  score: number;
  label: string;
  sub?: string;
}

const MARKERS: Marker[] = [
  { score: 0, label: '0', sub: 'Net-zero' },
  { score: 30, label: '30', sub: 'DOE ZERH' },
  { score: 50, label: '50', sub: 'ENERGY STAR' },
  { score: 70, label: '70', sub: 'Above code' },
  { score: 100, label: '100', sub: '2006 reference' },
  { score: 130, label: '130', sub: 'Existing US median' },
  { score: 180, label: '180', sub: 'Pre-1980 typical' },
];

const SCALE_MAX = 200;
const BAR_X_MIN = 80;
const BAR_X_MAX = 1120;

function xForScore(s: number): number {
  return BAR_X_MIN + (s / SCALE_MAX) * (BAR_X_MAX - BAR_X_MIN);
}

export function HeroHersIndexScale({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 400"
        titleId="hero-hers-index-scale-title"
        descId="hero-hers-index-scale-desc"
        title="The HERS Index scale from 0 (net-zero) to 200+ (older inefficient homes)"
        desc="Horizontal scale visualization of the HERS Index. Long horizontal bar color-graded from green on the left (low scores, more efficient) through yellow in the middle to red on the right (high scores, less efficient). Labeled tick marks: 0 net-zero home, 30 DOE Zero Energy Ready, 50 typical ENERGY STAR certified new home, 70 above-code new construction, 100 the 2006 IECC reference home which represents the average new home in 2006, 130 the median existing US housing stock, 180 a pre-1980 home with no upgrades. Lower is better. Every point on the scale represents approximately 1 percent energy difference from the reference home."
        className="w-full"
      >
        <defs>
          <linearGradient id="hers-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.good} />
            <stop offset="25%" stopColor={colors.good} />
            <stop offset="50%" stopColor={colors.warn} />
            <stop offset="75%" stopColor="#fb923c" />
            <stop offset="100%" stopColor={colors.danger} />
          </linearGradient>
        </defs>

        <rect width={1200} height={400} fill={colors.surface.canvas} />

        <text x={600} y={40} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The HERS Index scale
        </text>
        <text x={600} y={62} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          0 = net-zero ⋅ 100 = 2006 reference home ⋅ lower is better
        </text>

        {/* Color-graded bar */}
        <rect x={BAR_X_MIN} y={150} width={BAR_X_MAX - BAR_X_MIN} height={50} rx={4} fill="url(#hers-gradient)" fillOpacity={0.85} stroke={colors.ink[700]} strokeWidth={1.5} />

        {/* Direction labels */}
        <g transform="translate(80,128)">
          <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.good}>
            ← LOWER = MORE EFFICIENT
          </text>
        </g>
        <g transform="translate(1120,128)">
          <text textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.danger}>
            HIGHER = LESS EFFICIENT →
          </text>
        </g>

        {/* Markers */}
        {MARKERS.map((m) => {
          const x = xForScore(m.score);
          return (
            <g key={m.score}>
              <line x1={x} y1={140} x2={x} y2={210} stroke={colors.ink[900]} strokeWidth={2} />
              <text x={x} y={235} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {m.label}
              </text>
              {m.sub && (
                <text x={x} y={255} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
                  {m.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* Example pin: Today's new home */}
        <g transform={`translate(${xForScore(62)},90)`}>
          <circle r={9} fill={colors.brand.primary} stroke={colors.surface.canvas} strokeWidth={2} />
          <text x={0} y={-15} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Today&apos;s new home
          </text>
          <text x={0} y={-2} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.brand.primaryDark}>
            (HERS 62 median)
          </text>
          <line x1={0} y1={9} x2={0} y2={50} stroke={colors.brand.primary} strokeWidth={1.5} strokeDasharray="3,2" />
        </g>

        {/* Example pin: existing housing stock */}
        <g transform={`translate(${xForScore(130)},300)`}>
          <circle r={9} fill={colors.danger} stroke={colors.surface.canvas} strokeWidth={2} />
          <text x={0} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.danger}>
            Existing US housing stock
          </text>
          <text x={0} y={42} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.danger}>
            (HERS 130 median)
          </text>
          <line x1={0} y1={-50} x2={0} y2={-9} stroke={colors.danger} strokeWidth={1.5} strokeDasharray="3,2" />
        </g>

        {/* Footnote */}
        <text x={600} y={380} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Every point on the scale represents about 1% annual energy use difference from the 2006 IECC reference home.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        HERS = Home Energy Rating System. A score is meaningful only with context: starting point, age of home, and what improvements were made.
      </figcaption>
    </figure>
  );
}
