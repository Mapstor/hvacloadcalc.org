import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ZoneInfo {
  zone: string;
  color: string;
  doeRange: string;
  iecc2021: string;
}

const ZONES: ZoneInfo[] = [
  { zone: '1', color: '#fb923c', doeRange: 'R-30 to R-49', iecc2021: 'R-30' },
  { zone: '2', color: '#fbbf24', doeRange: 'R-30 to R-60', iecc2021: 'R-49' },
  { zone: '3', color: '#facc15', doeRange: 'R-30 to R-60', iecc2021: 'R-49' },
  { zone: '4', color: '#a3e635', doeRange: 'R-38 to R-60', iecc2021: 'R-49' },
  { zone: '5', color: '#22c55e', doeRange: 'R-49 to R-60', iecc2021: 'R-60' },
  { zone: '6', color: '#0ea5e9', doeRange: 'R-49 to R-60', iecc2021: 'R-60' },
  { zone: '7-8', color: '#1d4ed8', doeRange: 'R-49 to R-60', iecc2021: 'R-60' },
];

export function DoeRValueZoneMap({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="doe-r-value-zone-map-title"
        descId="doe-r-value-zone-map-desc"
        title="DOE recommended attic R-values by US IECC climate zone"
        desc="US map showing IECC climate zones color-coded. Zone 1 south Florida and Hawaii in orange recommends R-30 to R-49. Zone 2 southern half of southern states in yellow-orange recommends R-30 to R-60. Zone 3 mid-south parts of California and Texas in yellow recommends R-30 to R-60. Zone 4 mid-Atlantic and Ohio Valley in light green recommends R-38 to R-60. Zone 5 northern states and mountain west in green recommends R-49 to R-60. Zone 6 northern Midwest northern New England and Rocky Mountains in blue recommends R-49 to R-60. Zone 7-8 northern Minnesota Alaska and mountainous regions in dark blue recommends R-49 to R-60. 2021 IECC code minimums are R-30 in zone 1, R-49 in zones 2-4, and R-60 in zones 5-8."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          DOE recommended attic R-values by climate zone
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Existing homes. Climate zones per IECC 2021.
        </text>

        {/* Highly stylized US map outline with zone bands */}
        <g>
          {/* Zone 1 (south FL, HI tip) */}
          <path d="M 580 320 L 620 320 L 625 345 L 575 345 Z" fill="#fb923c" fillOpacity={0.75} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={600} y={336} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            1
          </text>

          {/* Zone 2 (Gulf coast, lower south) */}
          <path d="M 280 300 L 580 300 L 580 320 L 620 320 L 625 345 L 230 345 Z" fill="#fbbf24" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={332} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            2
          </text>

          {/* Zone 3 (mid-south) */}
          <path d="M 220 250 L 670 250 L 670 300 L 280 300 L 230 345 L 180 320 Z" fill="#facc15" fillOpacity={0.5} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={282} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            3
          </text>

          {/* Zone 4 (mid-Atlantic, Ohio Valley) */}
          <path d="M 220 200 L 700 200 L 720 250 L 220 250 L 180 220 Z" fill="#a3e635" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={230} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            4
          </text>

          {/* Zone 5 (northern band) */}
          <path d="M 220 150 L 720 150 L 740 200 L 220 200 L 200 170 Z" fill="#22c55e" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={180} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            5
          </text>

          {/* Zone 6 (far north band) */}
          <path d="M 250 110 L 700 110 L 720 150 L 220 150 L 230 130 Z" fill="#0ea5e9" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={138} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            6
          </text>

          {/* Zone 7-8 (Alaska / Minnesota / high altitude) */}
          <g>
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
              DOE recommended (existing)
            </text>
            <text x={420} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              IECC 2021 code minimum
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
                {z.doeRange}
              </text>
              <text x={420} y={1} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {z.iecc2021}
              </text>
              <text x={680} y={1} fontFamily={FONT} fontSize={10} fill={colors.ink[500]} fontStyle="italic">
                {z.zone === '1' && 'South FL, Hawaii'}
                {z.zone === '2' && 'Gulf Coast, lower south'}
                {z.zone === '3' && 'Mid-south, parts of CA'}
                {z.zone === '4' && 'Mid-Atlantic, Ohio Valley'}
                {z.zone === '5' && 'Northern states'}
                {z.zone === '6' && 'Northern MW, NE, Rockies'}
                {z.zone === '7-8' && 'Northern MN, Alaska'}
              </text>
            </g>
          ))}
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        DOE recommendations apply to existing homes. IECC 2021 code minimums apply to new construction and many retrofit projects.
      </figcaption>
    </figure>
  );
}
