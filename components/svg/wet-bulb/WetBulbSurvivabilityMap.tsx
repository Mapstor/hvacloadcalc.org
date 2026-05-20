import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Region {
  name: string;
  peakWb: string;
  x: number;
  y: number;
  severity: 'extreme' | 'high';
}

const REGIONS: Region[] = [
  { name: 'Persian Gulf', peakWb: '95°F (35°C)', x: 600, y: 280, severity: 'extreme' },
  { name: 'South Asia', peakWb: '91-93°F', x: 700, y: 290, severity: 'extreme' },
  { name: 'Mexican Gulf Coast', peakWb: '91°F', x: 250, y: 290, severity: 'extreme' },
  { name: 'US Gulf Coast', peakWb: '88-90°F', x: 250, y: 250, severity: 'high' },
  { name: 'SE China', peakWb: '88-90°F', x: 770, y: 270, severity: 'high' },
  { name: 'Australia', peakWb: '88-90°F', x: 820, y: 400, severity: 'high' },
];

export function WetBulbSurvivabilityMap({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="wet-bulb-survivability-map-title"
        descId="wet-bulb-survivability-map-desc"
        title="Regions approaching wet bulb survivability thresholds"
        desc="World map showing regions where peak wet bulb temperatures have approached the 35 degree Celsius human survivability threshold in recent years. Extreme risk zones in dark red: Persian Gulf with peaks at 35 degrees Celsius, South Asia at 33-34 degrees Celsius, Mexican Gulf coast at 33 degrees Celsius. High risk zones in medium red where 90 degree Fahrenheit wet bulb has been recorded: US Gulf coast, southeast China, parts of Australia."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Regions approaching wet bulb survivability limits
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Peak wet bulb temperatures recorded 2015-2024
        </text>

        {/* Simplified world map outline (very abstract) */}
        <g fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1.5}>
          {/* North America */}
          <path d="M 100 180 L 130 150 L 230 140 L 300 170 L 320 220 L 280 290 L 200 320 L 130 280 Z" />
          {/* South America */}
          <path d="M 250 350 L 290 340 L 320 420 L 290 510 L 250 500 L 220 410 Z" />
          {/* Europe */}
          <path d="M 460 170 L 510 160 L 560 180 L 540 230 L 480 240 L 450 210 Z" />
          {/* Africa */}
          <path d="M 480 250 L 560 250 L 580 360 L 530 470 L 480 460 L 460 350 Z" />
          {/* Middle East / South Asia */}
          <path d="M 560 240 L 660 250 L 740 280 L 720 340 L 620 330 L 570 300 Z" />
          {/* East Asia */}
          <path d="M 720 200 L 810 210 L 850 280 L 800 320 L 740 300 Z" />
          {/* SE Asia */}
          <path d="M 770 320 L 830 320 L 850 380 L 800 410 L 770 380 Z" />
          {/* Australia */}
          <path d="M 800 410 L 880 410 L 900 460 L 850 490 L 800 460 Z" />
        </g>

        {/* Region markers */}
        {REGIONS.map((r) => {
          const color = r.severity === 'extreme' ? '#7f1d1d' : colors.danger;
          const radius = r.severity === 'extreme' ? 28 : 22;
          return (
            <g key={r.name}>
              <circle cx={r.x} cy={r.y} r={radius} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2} />
              <circle cx={r.x} cy={r.y} r={6} fill={color} />
            </g>
          );
        })}

        {/* Region labels (offset to avoid overlap) */}
        <g fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          <text x={600} y={230}>Persian Gulf</text>
          <text x={600} y={246} fontSize={10} fill="#7f1d1d">peak 95°F (35°C)</text>

          <text x={700} y={345}>South Asia</text>
          <text x={700} y={361} fontSize={10} fill="#7f1d1d">peak 91-93°F</text>

          <text x={150} y={345}>Mexican Gulf Coast</text>
          <text x={150} y={361} fontSize={10} fill="#7f1d1d">peak 91°F</text>

          <text x={150} y={215}>US Gulf Coast</text>
          <text x={150} y={231} fontSize={10} fill={colors.danger}>88-90°F</text>

          <text x={780} y={245}>SE China</text>
          <text x={780} y={261} fontSize={10} fill={colors.danger}>88-90°F</text>

          <text x={820} y={455}>Australia</text>
          <text x={820} y={471} fontSize={10} fill={colors.danger}>88-90°F</text>
        </g>

        {/* Legend */}
        <g transform="translate(60,510)">
          <circle cx={10} cy={10} r={10} fill="#7f1d1d" fillOpacity={0.35} stroke="#7f1d1d" strokeWidth={1.5} />
          <text x={28} y={14} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Extreme: peak wet bulb ≥ 91°F (33°C)
          </text>
          <circle cx={350} cy={10} r={8} fill={colors.danger} fillOpacity={0.35} stroke={colors.danger} strokeWidth={1.5} />
          <text x={365} y={14} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            High: peak wet bulb 88-90°F (31-32°C)
          </text>
        </g>

        <text x={500} y={570} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          35°C wet bulb is the theoretical limit. Vecellio et al. (2022) found the practical limit is ≈31°C for most adults.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Wet bulb extremes are rare but increasing in frequency. The Persian Gulf and South Asia are the regions where 35°C wet bulb has been measured.
      </figcaption>
    </figure>
  );
}
