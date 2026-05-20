import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ColProps {
  x: number;
  title: string;
  value: string;
  desc: string;
  color: string;
}

function Col({ x, title, value, desc, color }: ColProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={220} height={420} rx={8} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={2} />
      <text x={110} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={color}>
        {title}
      </text>

      {/* Thermometer icon */}
      <g transform="translate(95,80)">
        <rect x={5} y={0} width={20} height={130} rx={10} fill={colors.surface.canvas} stroke={color} strokeWidth={2} />
        <rect x={8} y={45} width={14} height={85} fill={color} />
        <circle cx={15} cy={150} r={22} fill={color} stroke={colors.ink[700]} strokeWidth={1.5} />
      </g>

      {/* Big value */}
      <g transform="translate(0,260)">
        <text x={110} y={36} textAnchor="middle" fontFamily={FONT} fontSize={36} fontWeight={typography.weight.title} fill={color}>
          {value}
        </text>
      </g>

      {/* Description */}
      <foreignObject x={15} y={320} width={190} height={90}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: '1.4' }}>
          {desc}
        </div>
      </foreignObject>
    </g>
  );
}

export function WetBulbVsOthersComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="wet-bulb-vs-others-comparison-title"
        descId="wet-bulb-vs-others-comparison-desc"
        title="Four temperature concepts compared for the same air"
        desc="Four-column comparison of temperature measurements for the same air sample at 90 degrees dry bulb and 50 percent relative humidity. Dry bulb in red reads 90 degrees, the standard air temperature. Wet bulb in blue reads 78 degrees, the lowest temperature reachable by evaporation. Dew point in cyan reads 70 degrees, the temperature at which water vapor condenses. Heat index in orange reads 106 degrees feels-like, from the NOAA formula. All four values describe the same air with different uses."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Same air, four different temperatures
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Air sample: 90°F dry bulb, 50% relative humidity
        </text>

        <Col x={30} title="Dry Bulb" value="90°F" desc="Standard air temperature. What an ordinary thermometer reads in shade." color={colors.danger} />
        <Col x={270} title="Wet Bulb" value="78°F" desc="Lowest temperature reachable by evaporation. Used for HVAC, WBGT, survivability." color={colors.brand.primary} />
        <Col x={510} title="Dew Point" value="70°F" desc="Temperature at which water vapor condenses. Used for dew, fog, humidity comfort." color={colors.brand.accent} />
        <Col x={750} title="Heat Index" value="106°F" desc="What it 'feels like' per NOAA's formula. Used for public weather forecasting." color={colors.warn} />

        <text x={500} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          All four values describe the same air. Each has a different use.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Dew point ≤ wet bulb ≤ dry bulb always. The three converge at 100% RH. Heat index is a calculated comfort estimate, not a physical measurement.
      </figcaption>
    </figure>
  );
}
