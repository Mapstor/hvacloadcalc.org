import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Row {
  size: string;
  sqft: string;
  insulated: string;
  partial: string;
  uninsulated: string;
}

const ROWS: Row[] = [
  { size: '1-car', sqft: '200-300', insulated: '9,000', partial: '12,000', uninsulated: '18,000' },
  { size: '2-car', sqft: '400-600', insulated: '12,000', partial: '18,000', uninsulated: '24,000' },
  { size: '3-car', sqft: '700-900', insulated: '18,000', partial: '24,000', uninsulated: '36,000' },
  { size: 'Workshop', sqft: '1000-1500', insulated: '24-30k', partial: '36,000', uninsulated: '48,000' },
];

export function MiniSplitSizingByGarageSize({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="mini-split-sizing-by-garage-size-title"
        descId="mini-split-sizing-by-garage-size-desc"
        title="Mini split BTU sizing by garage size and insulation level"
        desc="Reference chart with rows for garage size and columns for BTU recommendations by insulation level. 1-car 200-300 sq ft: 9,000 BTU well-insulated, 12,000 BTU partial insulation, 18,000 BTU uninsulated. 2-car 400-600 sq ft: 12,000 BTU well-insulated, 18,000 BTU partial, 24,000 BTU uninsulated. 3-car 700-900 sq ft: 18,000 BTU insulated, 24,000 BTU partial, 36,000 BTU uninsulated. Workshop 1000-1500 sq ft: 24,000 to 30,000 BTU insulated, 36,000 BTU partial, 48,000 BTU uninsulated. Recommendations assume 9-foot ceilings, moderate climate zone 4 to 5, typical garage door usage. Adjust up for hot climates, frequent door opening, or higher ceilings."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Mini split sizing by garage size and insulation
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Starting points for zone 4-5 (moderate climate). Adjust for your specific situation.
        </text>

        {/* Header row */}
        <g transform="translate(60,90)">
          <rect width={880} height={50} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={100} y={22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Garage</text>
          <text x={100} y={40} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.brand.primaryDark}>type</text>

          <text x={260} y={22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Sq ft</text>

          <text x={460} y={22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.good}>Insulated</text>
          <text x={460} y={40} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.good}>R-13 walls, R-30 ceiling</text>

          <text x={640} y={22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.warn}>Partial</text>
          <text x={640} y={40} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.warn}>walls only</text>

          <text x={820} y={22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.danger}>Uninsulated</text>
          <text x={820} y={40} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.danger}>bare studs</text>
        </g>

        {/* Data rows */}
        {ROWS.map((row, i) => {
          const y = 150 + i * 70;
          const bg = i % 2 === 0 ? colors.surface.subtle : colors.surface.canvas;
          return (
            <g key={row.size} transform={`translate(60,${y})`}>
              <rect width={880} height={62} fill={bg} stroke={colors.ink[300]} strokeWidth={0.5} />
              <text x={100} y={28} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {row.size}
              </text>
              <text x={100} y={46} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
                garage
              </text>
              <text x={260} y={36} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.ink[700]}>
                {row.sqft}
              </text>
              <text x={460} y={36} textAnchor="middle" fontFamily={FONT} fontSize={15} fontWeight={typography.weight.title} fill={colors.good}>
                {row.insulated} BTU
              </text>
              <text x={640} y={36} textAnchor="middle" fontFamily={FONT} fontSize={15} fontWeight={typography.weight.title} fill={colors.warn}>
                {row.partial} BTU
              </text>
              <text x={820} y={36} textAnchor="middle" fontFamily={FONT} fontSize={15} fontWeight={typography.weight.title} fill={colors.danger}>
                {row.uninsulated} BTU
              </text>
            </g>
          );
        })}

        {/* Footnote */}
        <g transform="translate(60,450)">
          <rect width={880} height={120} rx={6} fill={colors.warn} fillOpacity={0.08} stroke={colors.warn} strokeWidth={1.5} />
          <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
            Adjustments to apply
          </text>
          <text x={20} y={50} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Hot climates (zones 1-2): drop one size if well insulated, keep same if not
          </text>
          <text x={20} y={70} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Cold climates (zones 5-8): add one size AND require cold-climate certified (CCASHP) equipment
          </text>
          <text x={20} y={90} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Ceiling above 10 ft, frequent door opening, daily occupancy: add 25% to BTU
          </text>
          <text x={20} y={110} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Uninsulated garage in zone 6-7: insulating before HVAC install often has a 2-4 year payback
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Insulation level matters more than square footage. Insulating before installing the mini split usually pays back faster than going to the next size up.
      </figcaption>
    </figure>
  );
}
