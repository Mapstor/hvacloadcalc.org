import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function SlingPsychrometer({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 800 600"
        titleId="sling-psychrometer-title"
        descId="sling-psychrometer-desc"
        title="Sling psychrometer construction and use"
        desc="Cross-section drawing of a sling psychrometer. A Y-shaped handle with two thermometers mounted in parallel: a dry bulb thermometer with no wick, and a wet bulb thermometer with a cotton wick covering its bulb. A pivot at the top of the handle allows the device to be slung in a circular motion through the air for 30 seconds, after which both thermometers are read quickly. A modern digital psychrometer with built-in fan aspiration is shown in the corner as an alternative."
        className="w-full"
      >
        <rect width={800} height={600} fill={colors.surface.canvas} />

        <text x={400} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Sling psychrometer
        </text>

        {/* Pivot at top */}
        <circle cx={400} cy={90} r={12} fill={colors.ink[500]} stroke={colors.ink[900]} strokeWidth={2} />
        <circle cx={400} cy={90} r={3} fill={colors.surface.canvas} />
        <text x={420} y={94} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>pivot</text>

        {/* Rotation arrow (dashed circular arc) */}
        <path
          d="M 320 90 A 80 80 0 0 0 480 90"
          fill="none"
          stroke={colors.ink[300]}
          strokeWidth={1.5}
          strokeDasharray="4,3"
        />
        <text x={400} y={60} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          ↺ sling through the air
        </text>

        {/* Y-frame handle */}
        <line x1={400} y1={90} x2={400} y2={180} stroke={colors.ink[900]} strokeWidth={3} />
        <line x1={400} y1={180} x2={320} y2={230} stroke={colors.ink[900]} strokeWidth={2.5} />
        <line x1={400} y1={180} x2={480} y2={230} stroke={colors.ink[900]} strokeWidth={2.5} />

        {/* Left thermometer (dry bulb) */}
        <g transform="translate(290,230)">
          <rect x={15} y={0} width={20} height={170} rx={10} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={2} />
          <rect x={18} y={80} width={14} height={90} fill={colors.danger} />
          <circle cx={25} cy={190} r={20} fill={colors.danger} stroke={colors.ink[700]} strokeWidth={2} />
          <text x={25} y={240} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.danger}>
            Dry bulb
          </text>
        </g>

        {/* Right thermometer (wet bulb with wick) */}
        <g transform="translate(450,230)">
          <rect x={15} y={0} width={20} height={170} rx={10} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={2} />
          <rect x={18} y={120} width={14} height={50} fill={colors.brand.primary} />
          <circle cx={25} cy={190} r={20} fill={colors.brand.primary} stroke={colors.ink[700]} strokeWidth={2} />
          {/* Wick */}
          <ellipse cx={25} cy={190} rx={24} ry={20} fill={colors.brand.accent} fillOpacity={0.35} stroke={colors.brand.accent} strokeWidth={1.5} />
          <line x1={5} y1={185} x2={45} y2={185} stroke={colors.brand.accent} strokeWidth={1} opacity={0.6} />
          <line x1={5} y1={195} x2={45} y2={195} stroke={colors.brand.accent} strokeWidth={1} opacity={0.6} />
          {/* Water reservoir */}
          <path d="M 15 215 Q 25 232 35 215" fill={colors.brand.accent} fillOpacity={0.5} stroke={colors.brand.accent} strokeWidth={1} />
          <text x={25} y={240} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primary}>
            Wet bulb
          </text>
          <text x={25} y={258} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
            (cotton wick)
          </text>
        </g>

        {/* Operating instructions */}
        <g transform="translate(50,490)">
          <text x={0} y={0} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            How to use:
          </text>
          <text x={0} y={22} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            1. Wet the wick with distilled water (mineral-free).
          </text>
          <text x={0} y={42} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            2. Sling the device for ~30 seconds in a circle.
          </text>
          <text x={0} y={62} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            3. Read both thermometers quickly before evaporation slows.
          </text>
        </g>

        {/* Modern alternative */}
        <g transform="translate(580,460)">
          <rect width={180} height={100} rx={6} fill={colors.brand.primary} fillOpacity={0.08} stroke={colors.brand.primary} strokeWidth={1.5} strokeDasharray="3,2" />
          <text x={90} y={24} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Modern alternative
          </text>
          <text x={90} y={46} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            Digital psychrometer
          </text>
          <text x={90} y={62} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            Fan-aspirated, no slinging
          </text>
          <text x={90} y={82} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
            (Sensors compute WB from DB + RH)
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The wick must be clean and wet; the airflow must be sufficient. Modern digital psychrometers automate the math.
      </figcaption>
    </figure>
  );
}
