import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface HomeData {
  label: string;
  zone: string;
  sqft: string;
  ours: number;
  wrightsoft: number;
  coolCalc: number;
}

const HOMES: HomeData[] = [
  { label: 'Home A', zone: 'Zone 4', sqft: '1,800 sqft ranch', ours: 32.4, wrightsoft: 32.0, coolCalc: 33.1 },
  { label: 'Home B', zone: 'Zone 5', sqft: '2,400 sqft colonial', ours: 38.5, wrightsoft: 37.8, coolCalc: 39.2 },
  { label: 'Home C', zone: 'Zone 3', sqft: '1,200 sqft bungalow', ours: 26.5, wrightsoft: 25.4, coolCalc: 26.0 },
  { label: 'Home D', zone: 'Zone 2', sqft: '3,200 sqft modern', ours: 54.2, wrightsoft: 53.6, coolCalc: 55.4 },
];

const Y_TOP = 130;
const Y_BOTTOM = 460;
const Y_MAX = 60;
const BAR_WIDTH = 22;
const GROUP_WIDTH = 180;

function yForLoad(load: number): number {
  return Y_BOTTOM - (load / Y_MAX) * (Y_BOTTOM - Y_TOP);
}

export function PeerComparisonResults({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 620"
        titleId="peer-comparison-results-title"
        descId="peer-comparison-results-desc"
        title="Our calculator compared to Wrightsoft and Cool Calc across four sample homes"
        desc="Bar chart comparing cooling load calculations from three Manual J implementations for four sample homes. Home A 1800 sqft ranch zone 4: ours 32,400 BTU/hr, Wrightsoft 32,000, Cool Calc 33,100, range about 3 percent. Home B 2400 sqft colonial zone 5: ours 38,500, Wrightsoft 37,800, Cool Calc 39,200, range about 4 percent. Home C 1200 sqft bungalow zone 3: ours 26,500, Wrightsoft 25,400, Cool Calc 26,000, range about 4 percent. Home D 3200 sqft modern zone 2: ours 54,200, Wrightsoft 53,600, Cool Calc 55,400, range about 3 percent. Differences are typically explained by allowed Manual J assumption variations like infiltration default or solar gain handling, not calculation errors."
        className="w-full"
      >
        <rect width={1000} height={620} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Our calculator vs Wrightsoft and Cool Calc
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same inputs, three different Manual J implementations. Cooling load comparison.
        </text>

        {/* Y axis */}
        <line x1={120} y1={Y_TOP} x2={120} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />
        {[0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line x1={115} y1={yForLoad(v)} x2={120} y2={yForLoad(v)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={110} y={yForLoad(v) + 4} textAnchor="end" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              {v}k
            </text>
          </g>
        ))}
        <text
          x={70}
          y={(Y_TOP + Y_BOTTOM) / 2}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.axisLabel}
          fontWeight={typography.weight.label}
          fill={colors.ink[700]}
          transform={`rotate(-90 70 ${(Y_TOP + Y_BOTTOM) / 2})`}
        >
          Cooling load (BTU/hr)
        </text>

        {/* X axis */}
        <line x1={120} y1={Y_BOTTOM} x2={950} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />

        {/* Groups */}
        {HOMES.map((h, gi) => {
          const groupX = 170 + gi * GROUP_WIDTH;
          return (
            <g key={h.label}>
              {/* Bars */}
              <g>
                <rect
                  x={groupX - BAR_WIDTH - 12}
                  y={yForLoad(h.ours)}
                  width={BAR_WIDTH}
                  height={Y_BOTTOM - yForLoad(h.ours)}
                  fill={colors.brand.primary}
                  fillOpacity={0.85}
                  stroke={colors.brand.primaryDark}
                  strokeWidth={1}
                />
                <text x={groupX - BAR_WIDTH - 1} y={yForLoad(h.ours) - 6} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
                  {h.ours.toFixed(1)}k
                </text>
              </g>

              <g>
                <rect
                  x={groupX - BAR_WIDTH / 2}
                  y={yForLoad(h.wrightsoft)}
                  width={BAR_WIDTH}
                  height={Y_BOTTOM - yForLoad(h.wrightsoft)}
                  fill={colors.good}
                  fillOpacity={0.85}
                  stroke={colors.good}
                  strokeWidth={1}
                />
                <text x={groupX - BAR_WIDTH / 2 + 11} y={yForLoad(h.wrightsoft) - 6} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.good}>
                  {h.wrightsoft.toFixed(1)}k
                </text>
              </g>

              <g>
                <rect
                  x={groupX + BAR_WIDTH / 2 + 12}
                  y={yForLoad(h.coolCalc)}
                  width={BAR_WIDTH}
                  height={Y_BOTTOM - yForLoad(h.coolCalc)}
                  fill={colors.warn}
                  fillOpacity={0.85}
                  stroke={colors.warn}
                  strokeWidth={1}
                />
                <text x={groupX + BAR_WIDTH / 2 + 23} y={yForLoad(h.coolCalc) - 6} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.warn}>
                  {h.coolCalc.toFixed(1)}k
                </text>
              </g>

              {/* Home label */}
              <text x={groupX} y={Y_BOTTOM + 22} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {h.label}
              </text>
              <text x={groupX} y={Y_BOTTOM + 40} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
                {h.zone}, {h.sqft}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(360,510)">
          <rect width={16} height={14} fill={colors.brand.primary} fillOpacity={0.85} />
          <text x={22} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Ours
          </text>
          <rect x={90} width={16} height={14} fill={colors.good} fillOpacity={0.85} />
          <text x={112} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Wrightsoft
          </text>
          <rect x={220} width={16} height={14} fill={colors.warn} fillOpacity={0.85} />
          <text x={242} y={12} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Cool Calc
          </text>
        </g>

        <text x={500} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Bars within each home cluster within 3-5% across all three implementations.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Differences across implementations are typically explained by allowed-by-Manual-J assumption variations (infiltration default, solar gain factors), not calculation errors.
      </figcaption>
    </figure>
  );
}
