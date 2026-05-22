import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Row {
  sqft: string;
  btu: string;
  tons: string;
  equipmentClass: 'window' | 'window-or-portable' | 'mini-split' | 'central';
}

const ROWS: Row[] = [
  { sqft: '100-150', btu: '5,000', tons: '—', equipmentClass: 'window' },
  { sqft: '150-250', btu: '6,000', tons: '—', equipmentClass: 'window' },
  { sqft: '250-300', btu: '7,000', tons: '—', equipmentClass: 'window' },
  { sqft: '300-350', btu: '8,000', tons: '—', equipmentClass: 'window-or-portable' },
  { sqft: '350-400', btu: '9,000', tons: '—', equipmentClass: 'window-or-portable' },
  { sqft: '400-450', btu: '10,000', tons: '—', equipmentClass: 'window-or-portable' },
  { sqft: '450-550', btu: '12,000', tons: '1', equipmentClass: 'mini-split' },
  { sqft: '550-700', btu: '14,000', tons: '1.17', equipmentClass: 'mini-split' },
  { sqft: '700-1,000', btu: '18,000', tons: '1.5', equipmentClass: 'mini-split' },
  { sqft: '1,000-1,200', btu: '21,000', tons: '1.75', equipmentClass: 'mini-split' },
  { sqft: '1,200-1,400', btu: '24,000', tons: '2', equipmentClass: 'central' },
  { sqft: '1,400-1,800', btu: '30,000', tons: '2.5', equipmentClass: 'central' },
  { sqft: '1,800-2,200', btu: '36,000', tons: '3', equipmentClass: 'central' },
  { sqft: '2,200-2,800', btu: '42,000', tons: '3.5', equipmentClass: 'central' },
  { sqft: '2,800-3,200', btu: '48,000', tons: '4', equipmentClass: 'central' },
  { sqft: '3,200+', btu: '60,000', tons: '5', equipmentClass: 'central' },
];

function eqColor(cls: Row['equipmentClass']): string {
  switch (cls) {
    case 'window':
      return colors.brand.primary;
    case 'window-or-portable':
      return colors.warn;
    case 'mini-split':
      return colors.brand.accent;
    case 'central':
      return colors.good;
  }
}

function eqLabel(cls: Row['equipmentClass']): string {
  switch (cls) {
    case 'window':
      return 'Window unit';
    case 'window-or-portable':
      return 'Window or portable';
    case 'mini-split':
      return 'Mini split / window';
    case 'central':
      return 'Central AC';
  }
}

export function HeroAcBtuChartVisual({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 760"
        titleId="hero-ac-btu-chart-visual-title"
        descId="hero-ac-btu-chart-visual-desc"
        title="AC BTU sizing chart by square footage"
        desc="Reference chart pairing square footage with recommended BTU and AC tonnage equivalent for 16 size ranges. 100 to 150 square feet needs 5,000 BTU window unit. 150 to 250 square feet 6,000 BTU window. 250 to 300 square feet 7,000 BTU window. 300 to 350 square feet 8,000 BTU window or portable. 350 to 400 square feet 9,000 BTU. 400 to 450 square feet 10,000 BTU. 450 to 550 square feet 12,000 BTU equals 1 ton. 550 to 700 square feet 14,000 BTU. 700 to 1,000 square feet 18,000 BTU equals 1.5 ton. 1,000 to 1,200 square feet 21,000 BTU. 1,200 to 1,400 square feet 24,000 BTU equals 2 ton. 1,400 to 1,800 square feet 30,000 BTU equals 2.5 ton. 1,800 to 2,200 square feet 36,000 BTU equals 3 ton. 2,200 to 2,800 square feet 42,000 BTU equals 3.5 ton. 2,800 to 3,200 square feet 48,000 BTU equals 4 ton. 3,200 plus square feet 60,000 BTU equals 5 ton for whole-house. Values are ENERGY STAR baselines for normal indoor conditions; adjust per the factors in this article."
        className="w-full"
      >
        <rect width={1200} height={760} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          AC BTU chart by square footage
        </text>
        <text x={600} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Starting-point sizes per ENERGY STAR. Adjust for ceiling height, climate, sun, and insulation.
        </text>

        {/* Header row */}
        <g transform="translate(80,90)">
          <rect width={1040} height={42} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={130} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Square footage
          </text>
          <text x={380} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            BTU recommended
          </text>
          <text x={620} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Tonnage
          </text>
          <text x={870} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Typical equipment
          </text>
        </g>

        {/* Data rows */}
        {ROWS.map((row, i) => {
          const y = 138 + i * 36;
          const bg = i % 2 === 0 ? colors.surface.subtle : colors.surface.canvas;
          const color = eqColor(row.equipmentClass);
          return (
            <g key={row.sqft} transform={`translate(80,${y})`}>
              <rect width={1040} height={32} fill={bg} stroke={colors.ink[300]} strokeWidth={0.5} />
              <text x={130} y={20} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {row.sqft}
              </text>
              <text x={380} y={20} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
                {row.btu} BTU
              </text>
              <text x={620} y={20} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {row.tons === '—' ? '—' : `${row.tons} ton`}
              </text>
              <g transform="translate(750,8)">
                <rect width={240} height={18} rx={9} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={1.2} />
                <text x={120} y={13} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={color}>
                  {eqLabel(row.equipmentClass)}
                </text>
              </g>
            </g>
          );
        })}

        {/* Footer caption */}
        <text x={600} y={730} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Baseline assumes 8-ft ceilings, moderate climate (zone 4-5), normal occupancy, and average insulation.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Use this chart as a starting point. Apply the adjustment factors in section 3 for your specific room conditions.
      </figcaption>
    </figure>
  );
}
