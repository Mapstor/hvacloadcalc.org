import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ZoneInfo {
  zone: string;
  color: string;
  adjustment: string;
  description: string;
  typical: string;
}

const ZONES: ZoneInfo[] = [
  { zone: '1', color: '#7f1d1d', adjustment: '+30%', description: 'Tropical, very hot/humid', typical: 'Miami, Honolulu' },
  { zone: '2', color: '#dc2626', adjustment: '+15-20%', description: 'Hot/humid southern US', typical: 'Houston, Phoenix' },
  { zone: '3', color: '#fb923c', adjustment: '+5-10%', description: 'Mixed/warm', typical: 'Atlanta, Memphis' },
  { zone: '4', color: '#facc15', adjustment: 'baseline', description: 'Mixed-humid mid-US', typical: 'Mid-Atlantic, Ohio Valley' },
  { zone: '5', color: '#a3e635', adjustment: '-10%', description: 'Cool', typical: 'Northern states' },
  { zone: '6', color: '#22c55e', adjustment: '-15%', description: 'Cold', typical: 'Northern MW, NE, Rockies' },
  { zone: '7-8', color: '#1d4ed8', adjustment: '-20-25%', description: 'Very cold', typical: 'Northern MN, Alaska' },
];

export function BtuByClimateZoneMap({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="btu-by-climate-zone-map-title"
        descId="btu-by-climate-zone-map-desc"
        title="AC BTU climate adjustment factors by US IECC climate zone"
        desc="US map with IECC climate zones colored and labeled with cooling capacity adjustment factors. Zone 1 Miami area plus 30 percent cooling deep red. Zone 2 hot humid south plus 15 to 20 percent red orange. Zone 3 mixed warm plus 5 to 10 percent orange. Zone 4 mixed humid mid-US baseline yellow. Zone 5 cool northern states minus 10 percent yellow green. Zone 6 cold northern MW NE Rockies minus 15 percent green. Zones 7 and 8 very cold northern Minnesota Alaska minus 20 to 25 percent dark blue. Hot humid zones need MORE cooling BTU per square foot than cool dry zones, due to higher design temperatures and humidity loads."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Climate zone adjustments to AC BTU
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Hot/humid zones need more cooling capacity per square foot
        </text>

        {/* Stylized US map */}
        <g>
          {/* Zone 1 */}
          <path d="M 580 320 L 620 320 L 625 345 L 575 345 Z" fill="#7f1d1d" fillOpacity={0.75} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={600} y={336} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>1</text>

          {/* Zone 2 */}
          <path d="M 280 300 L 580 300 L 580 320 L 620 320 L 625 345 L 230 345 Z" fill="#dc2626" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={332} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>2</text>

          {/* Zone 3 */}
          <path d="M 220 250 L 670 250 L 670 300 L 280 300 L 230 345 L 180 320 Z" fill="#fb923c" fillOpacity={0.5} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={420} y={282} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>3</text>

          {/* Zone 4 */}
          <path d="M 220 200 L 700 200 L 720 250 L 220 250 L 180 220 Z" fill="#facc15" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={230} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>4</text>

          {/* Zone 5 */}
          <path d="M 220 150 L 720 150 L 740 200 L 220 200 L 200 170 Z" fill="#a3e635" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={180} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>5</text>

          {/* Zone 6 */}
          <path d="M 250 110 L 700 110 L 720 150 L 220 150 L 230 130 Z" fill="#22c55e" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={138} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>6</text>

          {/* Zone 7-8 */}
          <path d="M 290 80 L 660 80 L 700 110 L 250 110 Z" fill="#1d4ed8" fillOpacity={0.55} stroke={colors.ink[700]} strokeWidth={1} />
          <text x={460} y={102} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.surface.canvas}>7-8</text>

          {/* Alaska inset */}
          <g transform="translate(80,90)">
            <path d="M 0 0 L 80 0 L 80 40 L 0 40 Z" fill="#1d4ed8" fillOpacity={0.65} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={40} y={25} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>AK</text>
          </g>

          {/* Hawaii inset */}
          <g transform="translate(160,330)">
            <circle cx={0} cy={0} r={8} fill="#7f1d1d" fillOpacity={0.75} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={0} y={4} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.surface.canvas}>HI</text>
          </g>
        </g>

        {/* Zone adjustment table */}
        <g transform="translate(60,400)">
          <rect width={880} height={170} rx={6} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
          {/* Header */}
          <g transform="translate(20,24)">
            <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>Zone</text>
            <text x={120} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>Cooling adjustment</text>
            <text x={340} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>Description</text>
            <text x={620} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>Typical location</text>
          </g>
          {ZONES.map((z, i) => (
            <g key={z.zone} transform={`translate(20,${52 + i * 16})`}>
              <rect x={-4} y={-10} width={20} height={14} fill={z.color} fillOpacity={0.7} stroke={z.color} strokeWidth={1} />
              <text x={26} y={1} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>Zone {z.zone}</text>
              <text x={120} y={1} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={z.color}>{z.adjustment}</text>
              <text x={340} y={1} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{z.description}</text>
              <text x={620} y={1} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>{z.typical}</text>
            </g>
          ))}
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Zone 1 needs roughly 30% more cooling BTU per square foot than zone 4. Zone 8 needs ~20% less.
      </figcaption>
    </figure>
  );
}
