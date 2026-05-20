import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  subtitle: string;
  tempLabel: string;
  tempColor: string;
  humidity: string;
  humidityColor: string;
  cycleLabel: string;
  cycleColor: string;
  variant: 'good' | 'bad';
}

function Panel({ x, title, subtitle, tempLabel, tempColor, humidity, humidityColor, cycleLabel, cycleColor, variant }: PanelProps) {
  const accent = variant === 'good' ? colors.good : colors.danger;
  return (
    <g transform={`translate(${x},40)`}>
      <rect width={460} height={400} rx={8} fill={accent} fillOpacity={0.06} stroke={accent} strokeWidth={2} />
      <text x={230} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={accent}>
        {title}
      </text>
      <text x={230} y={60} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
        {subtitle}
      </text>

      {/* Thermometer reading */}
      <g transform="translate(40,100)">
        <text x={0} y={20} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Indoor temp
        </text>
        <text x={0} y={56} fontFamily={FONT} fontSize={32} fontWeight={typography.weight.title} fill={tempColor}>
          {tempLabel}
        </text>
      </g>

      {/* Humidity reading */}
      <g transform="translate(250,100)">
        <text x={0} y={20} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Indoor RH
        </text>
        <text x={0} y={56} fontFamily={FONT} fontSize={32} fontWeight={typography.weight.title} fill={humidityColor}>
          {humidity}
        </text>
      </g>

      {/* Cycle behavior */}
      <g transform="translate(40,200)">
        <rect width={380} height={60} rx={6} fill={colors.surface.canvas} stroke={cycleColor} strokeWidth={1.5} />
        <text x={190} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={cycleColor}>
          Compressor cycles
        </text>
        <text x={190} y={48} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={colors.ink[700]}>
          {cycleLabel}
        </text>
      </g>

      {/* Outcome */}
      <g transform="translate(40,290)">
        <text x={190} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={accent}>
          {variant === 'good' ? 'Cool and dry' : 'Cool and clammy'}
        </text>
        <text x={190} y={48} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]} fontStyle="italic">
          {variant === 'good'
            ? 'Long runtimes remove humidity; the home feels comfortable.'
            : 'Short cycles never run long enough to dehumidify.'}
        </text>
      </g>
    </g>
  );
}

export function OversizedCyclingComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="oversized-cycling-comparison-title"
        descId="oversized-cycling-comparison-desc"
        title="Right-sized versus oversized AC in the same home"
        desc="Two-panel comparison of the same home with two different AC sizes. The left panel shows a right-sized 2.5 ton AC with stable indoor temperature at 75 degrees and humidity at 50 percent, with the compressor running 12 to 15 minutes per cycle and cycling 3 to 4 times per hour, producing cool and dry conditions. The right panel shows an oversized 4 ton AC for the same home with indoor temperature swinging between 73 and 77 degrees and humidity rising to 65 percent, with the compressor running only 2 to 3 minutes per cycle and cycling more than 12 times per hour, producing cool but clammy conditions."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <Panel
          x={30}
          title="Right-sized 2.5 ton"
          subtitle="Matched to Manual J load"
          tempLabel="75°F (stable)"
          tempColor={colors.good}
          humidity="50% RH"
          humidityColor={colors.good}
          cycleLabel="12-15 min on, 3-4 cycles/hr"
          cycleColor={colors.good}
          variant="good"
        />

        <Panel
          x={510}
          title="Oversized 4 ton"
          subtitle="60% over Manual J load"
          tempLabel="73-77°F (swings)"
          tempColor={colors.danger}
          humidity="65% RH"
          humidityColor={colors.danger}
          cycleLabel="2-3 min on, 12+ cycles/hr"
          cycleColor={colors.danger}
          variant="bad"
        />

        <text x={500} y={470} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          The bigger AC cools faster but stops before removing humidity.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Bigger is worse. Oversizing trades cycling efficiency and humidity control for raw cooling speed.
      </figcaption>
    </figure>
  );
}
