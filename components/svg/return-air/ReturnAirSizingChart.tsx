import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Row {
  tons: string;
  cfm: number;
  grille: string;
  roundDuct: string;
  rectDuct: string;
}

const ROWS: Row[] = [
  { tons: '1', cfm: 400, grille: '10×16', roundDuct: '8"', rectDuct: '8×10' },
  { tons: '1.5', cfm: 600, grille: '14×20', roundDuct: '10"', rectDuct: '10×12' },
  { tons: '2', cfm: 800, grille: '16×20', roundDuct: '12"', rectDuct: '12×14' },
  { tons: '2.5', cfm: 1000, grille: '20×20', roundDuct: '14"', rectDuct: '14×16' },
  { tons: '3', cfm: 1200, grille: '20×25', roundDuct: '16"', rectDuct: '14×20' },
  { tons: '3.5', cfm: 1400, grille: '24×24', roundDuct: '16"', rectDuct: '16×20' },
  { tons: '4', cfm: 1600, grille: '24×30', roundDuct: '18"', rectDuct: '16×24' },
  { tons: '5', cfm: 2000, grille: '30×30', roundDuct: '20"', rectDuct: '20×24' },
];

export function ReturnAirSizingChart({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="return-air-sizing-chart-title"
        descId="return-air-sizing-chart-desc"
        title="Return air grille and duct sizing reference by system tonnage"
        desc="Reference chart with rows for system tonnage 1 through 5 tons and columns for CFM at 400 CFM per ton rule of thumb, rectangular grille face dimensions at 500 FPM face velocity, equivalent round duct diameter at 700 FPM, and equivalent rectangular duct size at 700 FPM. 1 ton 400 CFM 10x16 grille 8 inch round 8x10 rectangular. 1.5 ton 600 CFM 14x20 grille 10 inch round 10x12 rectangular. 2 ton 800 CFM 16x20 grille 12 inch round 12x14 rectangular. 2.5 ton 1000 CFM 20x20 grille 14 inch round 14x16 rectangular. 3 ton 1200 CFM 20x25 grille 16 inch round 14x20 rectangular. 3.5 ton 1400 CFM 24x24 grille 16 inch round 16x20 rectangular. 4 ton 1600 CFM 24x30 grille 18 inch round 16x24 rectangular. 5 ton 2000 CFM 30x30 grille 20 inch round 20x24 rectangular."
        className="w-full"
      >
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Return air sizing by tonnage (starting points)
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Based on 400 CFM/ton, 500 FPM grille face velocity, 700 FPM trunk velocity
        </text>

        {/* Header row */}
        <g transform="translate(60,90)">
          <rect width={880} height={36} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={80} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Tonnage</text>
          <text x={240} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>CFM</text>
          <text x={420} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Grille (gross)</text>
          <text x={420} y={32} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.brand.primaryDark}>at 500 FPM face</text>
          <text x={600} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Round duct</text>
          <text x={600} y={32} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.brand.primaryDark}>at 700 FPM</text>
          <text x={780} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Rect duct</text>
          <text x={780} y={32} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.brand.primaryDark}>equivalent</text>
        </g>

        {/* Data rows */}
        {ROWS.map((row, i) => {
          const y = 130 + i * 50;
          const bg = i % 2 === 0 ? colors.surface.subtle : colors.surface.canvas;
          return (
            <g key={row.tons} transform={`translate(60,${y})`}>
              <rect width={880} height={42} fill={bg} stroke={colors.ink[300]} strokeWidth={0.5} />
              <text x={80} y={26} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {row.tons}
              </text>
              <text x={240} y={26} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.label} fill={colors.ink[700]}>
                {row.cfm}
              </text>
              <text x={420} y={26} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
                {row.grille}
              </text>
              <text x={600} y={26} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
                {row.roundDuct}
              </text>
              <text x={780} y={26} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
                {row.rectDuct}
              </text>
            </g>
          );
        })}

        {/* Footnote */}
        <g transform="translate(60,560)">
          <rect width={880} height={110} rx={6} fill={colors.warn} fillOpacity={0.08} stroke={colors.warn} strokeWidth={1.5} />
          <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
            Caveats
          </text>
          <text x={20} y={50} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • These are starting points. Final sizing depends on equivalent length, fittings, filter type, and equipment static pressure budget.
          </text>
          <text x={20} y={70} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Grille sizes assume ~60-70% free area. Stamped-face grilles need ~50% more area. Filter grilles need ~30% more.
          </text>
          <text x={20} y={90} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            • Heat pumps may use 450 CFM/ton instead of 400; recalculate accordingly.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        This chart gives starting-point sizes. Final design should run through Manual D software with full equivalent-length and pressure-budget math.
      </figcaption>
    </figure>
  );
}
