import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ThermometerProps {
  x: number;
  label: string;
  sublabel: string;
  reading: string;
  readingColor: string;
  mercuryHeight: number;
  withWick: boolean;
}

function Thermometer({ x, label, sublabel, reading, readingColor, mercuryHeight, withWick }: ThermometerProps) {
  return (
    <g transform={`translate(${x},60)`}>
      <text x={200} y={28} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {label}
      </text>
      <text x={200} y={52} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
        {sublabel}
      </text>

      {/* Thermometer body */}
      <g transform="translate(160,80)">
        {/* Glass tube */}
        <rect x={30} y={0} width={20} height={260} rx={10} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={2} />
        {/* Mercury */}
        <rect x={33} y={260 - mercuryHeight} width={14} height={mercuryHeight} fill={readingColor} />
        {/* Bulb */}
        <circle cx={40} cy={280} r={28} fill={readingColor} stroke={colors.ink[700]} strokeWidth={2} />

        {/* Wet wick (only on wet bulb thermometer) */}
        {withWick ? (
          <g>
            {/* Wick fabric covering bulb */}
            <ellipse cx={40} cy={280} rx={32} ry={28} fill={colors.brand.accent} fillOpacity={0.35} stroke={colors.brand.accent} strokeWidth={1.5} />
            {/* Wick texture lines */}
            <line x1={20} y1={275} x2={60} y2={275} stroke={colors.brand.accent} strokeWidth={1} opacity={0.7} />
            <line x1={18} y1={285} x2={62} y2={285} stroke={colors.brand.accent} strokeWidth={1} opacity={0.7} />
            <line x1={22} y1={295} x2={58} y2={295} stroke={colors.brand.accent} strokeWidth={1} opacity={0.7} />
            {/* Water reservoir below */}
            <path d="M 30 322 Q 40 340 50 322" fill={colors.brand.accent} fillOpacity={0.5} stroke={colors.brand.accent} strokeWidth={1} />
            {/* Airflow arrows */}
            <g stroke={colors.info} strokeWidth={1.5} fill="none">
              <path d="M -20 250 Q -10 245, 0 250" markerEnd="url(#wb-air)" />
              <path d="M -20 280 Q -10 275, 0 280" markerEnd="url(#wb-air)" />
              <path d="M -20 310 Q -10 305, 0 310" markerEnd="url(#wb-air)" />
            </g>
            <text x={-25} y={345} fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.info}>
              airflow
            </text>
          </g>
        ) : null}

        {/* Tick marks */}
        {[0, 40, 80, 120, 160, 200, 240].map((tickY) => (
          <line key={tickY} x1={50} y1={tickY + 10} x2={60} y2={tickY + 10} stroke={colors.ink[500]} strokeWidth={1} />
        ))}
      </g>

      {/* Reading badge */}
      <g transform="translate(120,400)">
        <rect width={160} height={50} rx={6} fill={readingColor} fillOpacity={0.15} stroke={readingColor} strokeWidth={2} />
        <text x={80} y={32} textAnchor="middle" fontFamily={FONT} fontSize={26} fontWeight={typography.weight.title} fill={readingColor}>
          {reading}
        </text>
      </g>
    </g>
  );
}

export function HeroWetBulbThermometer({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-wet-bulb-thermometer-title"
        descId="hero-wet-bulb-thermometer-desc"
        title="Dry bulb and wet bulb thermometers compared"
        desc="Side-by-side comparison of two thermometers. The left thermometer is a standard dry bulb thermometer reading 90 degrees Fahrenheit. The right thermometer is a wet bulb thermometer with its bulb wrapped in a wet cotton wick, with airflow indicated by arrows passing across the wick, reading 75 degrees Fahrenheit. The 15 degree difference between them is the wet bulb depression, indicating how much cooling the air can do through evaporation."
        className="w-full"
      >
        <defs>
          <marker id="wb-air" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.info} />
          </marker>
        </defs>
        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <Thermometer
          x={50}
          label="Dry Bulb Thermometer"
          sublabel="Reads the ordinary air temperature"
          reading="90°F"
          readingColor={colors.danger}
          mercuryHeight={200}
          withWick={false}
        />

        <Thermometer
          x={700}
          label="Wet Bulb Thermometer"
          sublabel="Bulb wrapped in wet wick, airflow across"
          reading="75°F"
          readingColor={colors.brand.primary}
          mercuryHeight={130}
          withWick={true}
        />

        {/* Depression callout */}
        <g transform="translate(420,480)">
          <rect width={360} height={70} rx={8} fill={colors.warn} fillOpacity={0.15} stroke={colors.warn} strokeWidth={2} />
          <text x={180} y={28} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
            Wet bulb depression: 15°F
          </text>
          <text x={180} y={52} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            The drier the air, the larger the depression.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The wet wick evaporates water, cooling the bulb. At 100% relative humidity, no evaporation happens and wet bulb equals dry bulb.
      </figcaption>
    </figure>
  );
}
