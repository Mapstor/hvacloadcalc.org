import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface City {
  name: string;
  state: string;
  temp: number;
  x: number;
  y: number;
  zone: string;
}

const ZONE_COLORS: Record<string, string> = {
  '1': '#ef4444',
  '2': '#f97316',
  '3': '#f59e0b',
  '4': '#facc15',
  '5': '#84cc16',
  '6': '#3b82f6',
  '7': '#2563eb',
  '8': '#1e3a8a',
};

const CITIES: City[] = [
  { name: 'Anchorage', state: 'AK', temp: -19, x: 80, y: 60, zone: '7' },
  { name: 'Minneapolis', state: 'MN', temp: -11, x: 540, y: 180, zone: '6' },
  { name: 'Chicago', state: 'IL', temp: -2, x: 620, y: 250, zone: '5' },
  { name: 'Denver', state: 'CO', temp: 4, x: 430, y: 300, zone: '5' },
  { name: 'Atlanta', state: 'GA', temp: 22, x: 700, y: 380, zone: '3' },
  { name: 'Dallas', state: 'TX', temp: 22, x: 560, y: 410, zone: '3' },
  { name: 'Phoenix', state: 'AZ', temp: 33, x: 340, y: 410, zone: '2' },
  { name: 'Los Angeles', state: 'CA', temp: 43, x: 240, y: 380, zone: '3' },
  { name: 'Miami', state: 'FL', temp: 47, x: 790, y: 510, zone: '1' },
];

export function DesignTempMap({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="design-temp-map-title"
        descId="design-temp-map-desc"
        title="US 99 percent heating design temperatures by location"
        desc="Stylized US map showing nine representative cities with their 99 percent heating design temperatures. Miami Florida 47 degrees, Phoenix Arizona 33 degrees, Los Angeles California 43 degrees, Atlanta Georgia 22 degrees, Dallas Texas 22 degrees, Denver Colorado 4 degrees, Chicago Illinois minus 2 degrees, Minneapolis Minnesota minus 11 degrees, Anchorage Alaska minus 19 degrees. Each city is color coded by its IECC climate zone from zone 1 hot in red to zone 7 very cold in dark blue. Source ASHRAE Handbook of Fundamentals 2021."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          99% heating design temperatures (ASHRAE 2021)
        </text>

        {/* Simplified US outline — abstract polygon representing the contiguous US + Alaska */}
        <g fill="none" stroke={colors.ink[300]} strokeWidth={1.5}>
          <path d="M 180 280 L 180 480 L 320 530 L 760 540 L 880 480 L 870 320 L 740 280 L 580 240 L 420 240 L 320 260 Z" />
          {/* Alaska */}
          <path d="M 30 30 L 30 130 L 150 130 L 170 70 L 100 30 Z" />
        </g>

        {/* City markers */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={12} fill={ZONE_COLORS[c.zone]} fillOpacity={0.85} stroke={colors.ink[900]} strokeWidth={1.2} />
            <text x={c.x} y={c.y - 18} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
              {c.name}, {c.state}
            </text>
            <text x={c.x} y={c.y + 28} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={ZONE_COLORS[c.zone]}>
              {c.temp > 0 ? `+${c.temp}` : c.temp}°F
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(40,530)">
          <text x={0} y={0} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.ink[700]}>IECC climate zones:</text>
          {(['1', '2', '3', '4', '5', '6', '7'] as const).map((z, i) => (
            <g key={z} transform={`translate(${145 + i * 100},-12)`}>
              <rect width={14} height={14} fill={ZONE_COLORS[z]} fillOpacity={0.85} rx={2} />
              <text x={20} y={11} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>Zone {z} {z === '1' ? '(hot)' : z === '7' ? '(very cold)' : ''}</text>
            </g>
          ))}
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The 99% heating design temperature is the outdoor temperature exceeded 99% of hours per year — roughly the coldest 87 hours.
      </figcaption>
    </figure>
  );
}
