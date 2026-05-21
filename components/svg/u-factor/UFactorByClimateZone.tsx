import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ZoneRow {
  zone: string;
  color: string;
  ieccMax: string;
  esMostEfficient: string;
  typical: string;
}

const ZONES: ZoneRow[] = [
  { zone: '1', color: '#fb923c', ieccMax: 'U-1.20', esMostEfficient: 'N/A', typical: 'South FL, HI' },
  { zone: '2', color: '#fbbf24', ieccMax: 'U-0.40', esMostEfficient: 'U-0.26', typical: 'Gulf Coast' },
  { zone: '3', color: '#facc15', ieccMax: 'U-0.32', esMostEfficient: 'U-0.26', typical: 'Mid-south' },
  { zone: '4', color: '#a3e635', ieccMax: 'U-0.32', esMostEfficient: 'U-0.24', typical: 'Mid-Atlantic' },
  { zone: '5', color: '#22c55e', ieccMax: 'U-0.30', esMostEfficient: 'U-0.22', typical: 'Northern states' },
  { zone: '6', color: '#0ea5e9', ieccMax: 'U-0.30', esMostEfficient: 'U-0.20', typical: 'Northern MW' },
  { zone: '7-8', color: '#1d4ed8', ieccMax: 'U-0.30', esMostEfficient: 'U-0.20', typical: 'N. MN, AK' },
];

export function UFactorByClimateZone({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="u-factor-by-climate-zone-title"
        descId="u-factor-by-climate-zone-desc"
        title="Window U-factor maximums and ENERGY STAR Most Efficient targets by US climate zone"
        desc="US map with climate zones color-coded matching the IECC standard. Zone 1 south Florida orange has IECC 2021 maximum U-1.20 and is excluded from ENERGY STAR Most Efficient. Zone 2 yellow-orange max U-0.40 ENERGY STAR U-0.26. Zone 3 yellow max U-0.32 ENERGY STAR U-0.26. Zone 4 light green max U-0.32 ENERGY STAR U-0.24. Zone 5 green max U-0.30 ENERGY STAR U-0.22. Zone 6 blue max U-0.30 ENERGY STAR U-0.20. Zones 7-8 dark blue max U-0.30 ENERGY STAR U-0.20. IECC code is the legal minimum performance; ENERGY STAR Most Efficient is the top tier."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          U-factor requirements and recommendations by climate zone
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          IECC 2021 maximum (legal minimum performance) and ENERGY STAR Most Efficient (top tier)
        </text>

        {/* Stylized US map (same shape as attic article) */}
        <g>
          {/* Zone 1 */}
          <path d="M 580 320 L 620 320 L 625 345 L 575 345 Z" fill="#fb923c" fillOpacity={0.75} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={600} y={336} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            1
          </text>

          {/* Zone 2 */}
          <path d="M 280 300 L 580 300 L 580 320 L 620 320 L 625 345 L 230 345 Z" fill="#fbbf24" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={332} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            2
          </text>

          {/* Zone 3 */}
          <path d="M 220 250 L 670 250 L 670 300 L 280 300 L 230 345 L 180 320 Z" fill="#facc15" fillOpacity={0.5} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={282} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            3
          </text>

          {/* Zone 4 */}
          <path d="M 220 200 L 700 200 L 720 250 L 220 250 L 180 220 Z" fill="#a3e635" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={230} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            4
          </text>

          {/* Zone 5 */}
          <path d="M 220 150 L 720 150 L 740 200 L 220 200 L 200 170 Z" fill="#22c55e" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={180} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            5
          </text>

          {/* Zone 6 */}
          <path d="M 250 110 L 700 110 L 720 150 L 220 150 L 230 130 Z" fill="#0ea5e9" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={138} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            6
          </text>

          {/* Zone 7-8 */}
          <path d="M 290 80 L 660 80 L 700 110 L 250 110 Z" fill="#1d4ed8" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={102} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
            7-8
          </text>

          {/* Alaska inset */}
          <g transform="translate(80,90)">
            <path d="M 0 0 L 80 0 L 80 40 L 0 40 Z" fill="#1d4ed8" fillOpacity={0.65} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={40} y={25} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              AK
            </text>
          </g>

          {/* Hawaii inset */}
          <g transform="translate(160,330)">
            <circle cx={0} cy={0} r={8} fill="#fb923c" fillOpacity={0.75} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={0} y={4} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              HI
            </text>
          </g>
        </g>

        {/* Recommendation table */}
        <g transform="translate(60,400)">
          <rect width={880} height={170} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          {/* Header row */}
          <g transform="translate(20,28)">
            <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Zone
            </text>
            <text x={120} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              IECC 2021 maximum
            </text>
            <text x={360} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              ENERGY STAR Most Efficient
            </text>
            <text x={680} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Where (typical)
            </text>
          </g>
          {ZONES.map((z, i) => (
            <g key={z.zone} transform={`translate(20,${52 + i * 16})`}>
              <rect x={-4} y={-10} width={20} height={14} fill={z.color} fillOpacity={0.7} stroke={z.color} strokeWidth={1} />
              <text x={26} y={1} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                Zone {z.zone}
              </text>
              <text x={120} y={1} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {z.ieccMax}
              </text>
              <text x={360} y={1} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {z.esMostEfficient}
              </text>
              <text x={680} y={1} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                {z.typical}
              </text>
            </g>
          ))}
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        IECC code is the legal maximum U-factor for new construction. ENERGY STAR Most Efficient flags top-tier performers.
      </figcaption>
    </figure>
  );
}
