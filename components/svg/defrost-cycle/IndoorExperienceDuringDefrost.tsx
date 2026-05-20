import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ScenePanelProps {
  x: number;
  title: string;
  supplyTempF: number;
  supplyColor: string;
  faceColor: string;
  expression: 'calm' | 'cool';
  description: string;
  badgeColor: string;
  badgeText: string;
}

function ScenePanel({ x, title, supplyTempF, supplyColor, faceColor, expression, description, badgeColor, badgeText }: ScenePanelProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={440} height={360} rx={8} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <text x={220} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      {/* Badge */}
      <g transform="translate(140,52)">
        <rect width={160} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={80} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badgeText}
        </text>
      </g>

      {/* Supply register */}
      <g transform="translate(60,120)">
        <rect width={130} height={50} rx={4} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
        <text x={65} y={-6} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Supply register
        </text>
        {/* Louvers */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={15 + i * 25} y1={10} x2={15 + i * 25} y2={40} stroke={colors.ink[500]} strokeWidth={1} />
        ))}
        {/* Air stream */}
        <g>
          <path
            d={`M 30 50 Q 35 65 30 80`}
            fill="none"
            stroke={supplyColor}
            strokeWidth={2}
            opacity={0.7}
          />
          <path
            d={`M 65 50 Q 70 65 65 80`}
            fill="none"
            stroke={supplyColor}
            strokeWidth={2}
            opacity={0.7}
          />
          <path
            d={`M 100 50 Q 105 65 100 80`}
            fill="none"
            stroke={supplyColor}
            strokeWidth={2}
            opacity={0.7}
          />
        </g>
      </g>

      {/* Thermometer */}
      <g transform="translate(230,120)">
        <rect x={5} y={0} width={20} height={90} rx={10} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={2} />
        <rect x={8} y={Math.max(5, 90 - supplyTempF * 0.7)} width={14} height={Math.min(85, supplyTempF * 0.7)} fill={supplyColor} />
        <circle cx={15} cy={108} r={16} fill={supplyColor} stroke={colors.ink[700]} strokeWidth={2} />
        <text x={50} y={108} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={supplyColor}>
          {supplyTempF}°F
        </text>
        <text x={50} y={128} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          supply air
        </text>
      </g>

      {/* Person face */}
      <g transform="translate(340,150)">
        <circle r={30} fill={faceColor} fillOpacity={0.25} stroke={faceColor} strokeWidth={2} />
        {/* Eyes */}
        <circle cx={-9} cy={-5} r={3} fill={colors.ink[900]} />
        <circle cx={9} cy={-5} r={3} fill={colors.ink[900]} />
        {/* Mouth */}
        {expression === 'calm' ? (
          <path d="M -10 10 Q 0 14 10 10" fill="none" stroke={colors.ink[900]} strokeWidth={2} />
        ) : (
          <path d="M -10 12 L 10 12" fill="none" stroke={colors.ink[900]} strokeWidth={2} />
        )}
      </g>

      {/* Description */}
      <foreignObject x={30} y={270} width={380} height={80}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: '1.5' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function IndoorExperienceDuringDefrost({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="indoor-experience-during-defrost-title"
        descId="indoor-experience-during-defrost-desc"
        title="Indoor experience during defrost with and without auxiliary heat"
        desc="Two side-by-side panels showing what a homeowner experiences during a defrost cycle. Left panel without auxiliary heat: supply register thermometer reads 55 degrees Fahrenheit cool air, person face shows neutral expression, label air feels cool during defrost. Right panel with auxiliary heat: supply register thermometer reads 85 degrees Fahrenheit warm air, person face shows calm expression, label aux heat keeps supply air warm. Caption explains most installations include aux heat strips that engage automatically during defrost so most homeowners do not notice the cycle."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          What you experience indoors during defrost
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Depends on whether auxiliary heat is present and configured
        </text>

        <ScenePanel
          x={40}
          title="Without aux heat"
          supplyTempF={55}
          supplyColor={colors.brand.primary}
          faceColor={colors.brand.primary}
          expression="cool"
          description="5-15 minute period of cool air from registers. Then back to normal warm output. Common in mini-splits and older installations without strip backup."
          badgeColor={colors.brand.primary}
          badgeText="cool spell at registers"
        />

        <ScenePanel
          x={520}
          title="With aux heat"
          supplyTempF={85}
          supplyColor={colors.danger}
          faceColor={colors.danger}
          expression="calm"
          description="Air stays warm throughout defrost. Aux strips engage automatically below the indoor coil. Most ducted installations work this way."
          badgeColor={colors.danger}
          badgeText="continuous comfort"
        />

        <text x={500} y={470} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Most modern ducted installs include aux heat. Mini-splits typically pause indoor airflow during defrost instead.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Aux heat costs more per minute than the heat pump, but only runs during the 5-15 minute defrost interval.
      </figcaption>
    </figure>
  );
}
