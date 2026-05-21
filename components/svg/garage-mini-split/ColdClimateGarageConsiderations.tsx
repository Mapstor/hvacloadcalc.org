import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  subtitle: string;
  borderColor: string;
  badgeText: string;
  description: string;
  capacityCurve: number[];
  features: string[];
}

const X_MIN = 30;
const X_MAX = 320;
const Y_TOP = 20;
const Y_BOTTOM = 110;
const TEMP_MIN = -10;
const TEMP_MAX = 50;

function xForTemp(t: number): number {
  return X_MIN + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X_MAX - X_MIN);
}
function yForCap(c: number): number {
  return Y_BOTTOM - (c / 100) * (Y_BOTTOM - Y_TOP);
}

function Panel({ x, title, subtitle, borderColor, badgeText, description, capacityCurve, features }: PanelProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={440} height={520} rx={10} fill={colors.surface.canvas} stroke={borderColor} strokeWidth={2.5} />

      <text x={220} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={220} y={50} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      <g transform="translate(140,58)">
        <rect width={160} height={26} rx={13} fill={borderColor} fillOpacity={0.18} stroke={borderColor} strokeWidth={1.5} />
        <text x={80} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={borderColor}>
          {badgeText}
        </text>
      </g>

      {/* Capacity curve */}
      <g transform="translate(50,110)">
        <text x={160} y={0} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Heating capacity at outdoor temp (% of rated)
        </text>

        {/* Axes */}
        <line x1={X_MIN} y1={Y_BOTTOM} x2={X_MAX} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />
        <line x1={X_MIN} y1={Y_TOP} x2={X_MIN} y2={Y_BOTTOM} stroke={colors.ink[700]} strokeWidth={1.5} />

        {/* Y axis labels */}
        {[0, 50, 100].map((p) => (
          <g key={p}>
            <line x1={X_MIN - 3} y1={yForCap(p)} x2={X_MIN} y2={yForCap(p)} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={X_MIN - 8} y={yForCap(p) + 3} textAnchor="end" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
              {p}%
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {[-10, 0, 17, 47].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t)} y1={Y_BOTTOM} x2={xForTemp(t)} y2={Y_BOTTOM + 3} stroke={colors.ink[700]} strokeWidth={1} />
            <text x={xForTemp(t)} y={Y_BOTTOM + 14} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
              {t}°F
            </text>
          </g>
        ))}

        {/* Curve */}
        <path
          d={capacityCurve.map((cap, i) => {
            const temp = TEMP_MAX - (i / (capacityCurve.length - 1)) * (TEMP_MAX - TEMP_MIN);
            return `${i === 0 ? 'M' : 'L'} ${xForTemp(temp)} ${yForCap(cap)}`;
          }).join(' ')}
          stroke={borderColor}
          strokeWidth={3}
          fill="none"
        />
        {/* Dots at key temperatures */}
        {[47, 17, 5].map((t) => {
          const idx = capacityCurve.length - 1 - Math.round(((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (capacityCurve.length - 1));
          if (idx >= 0 && idx < capacityCurve.length) {
            return (
              <circle key={t} cx={xForTemp(t)} cy={yForCap(capacityCurve[idx])} r={4} fill={borderColor} stroke={colors.ink[900]} strokeWidth={1} />
            );
          }
          return null;
        })}
      </g>

      {/* Description */}
      <foreignObject x={20} y={270} width={400} height={70}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.5', textAlign: 'center', fontWeight: 600 }}>
          {description}
        </div>
      </foreignObject>

      {/* Features list */}
      <g transform="translate(30,355)">
        <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Specific features
        </text>
        {features.map((feat, i) => (
          <g key={i} transform={`translate(0,${20 + i * 22})`}>
            <text x={0} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={borderColor}>
              •
            </text>
            <text x={12} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              {feat}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

export function ColdClimateGarageConsiderations({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 620"
        titleId="cold-climate-garage-considerations-title"
        descId="cold-climate-garage-considerations-desc"
        title="Standard vs cold-climate mini splits for garage installations"
        desc="Two-panel comparison. Left panel mild climate garage zones 1 to 4: standard single-zone mini split capacity curve drops moderately to about 50 percent at 5 degrees Fahrenheit, still functional but reduced output, standard heat pump features sufficient. Right panel cold climate garage zones 5 to 8: cold-climate certified CCASHP mini split capacity curve maintains 75 to 85 percent of rated capacity to 5 degrees Fahrenheit and remains functional below zero, with drain pan heater, base pan heater on outdoor unit, compressor crankcase heater, oversized line set for cold, supplemental heat consideration of electric resistance or propane shop heater for emergencies in zones 7 to 8. Cold-climate certified units verified on NEEP CCASHP list maintain capacity at low temperatures."
        className="w-full"
      >
        <rect width={1000} height={620} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Mild climate vs cold climate: garage mini split selection
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Cold-climate certification matters once design temp drops below 17°F
        </text>

        <Panel
          x={30}
          title="Mild climate garage"
          subtitle="zones 1-4"
          borderColor={colors.brand.primary}
          badgeText="STANDARD UNIT OK"
          description="Standard heat pump mini split handles the full operating range. Capacity drops at low temps but design temp is moderate enough that the unit keeps up."
          capacityCurve={[100, 100, 95, 85, 70, 50, 35, 20]}
          features={[
            'Standard heat pump (HSPF2 ≥ 8)',
            'No special cold-weather options needed',
            'Basic drain pan (no heater)',
            'IR remote control acceptable',
          ]}
        />

        <Panel
          x={530}
          title="Cold climate garage"
          subtitle="zones 5-8"
          borderColor={colors.brand.accent}
          badgeText="CCASHP REQUIRED"
          description="Cold-climate certified unit needed. Maintains capacity below 17°F. Verify model on the NEEP CCASHP product list before buying."
          capacityCurve={[100, 100, 100, 95, 88, 80, 72, 60]}
          features={[
            'CCASHP-certified (NEEP listed)',
            'Drain pan heater (prevents freeze)',
            'Base pan heater on outdoor unit',
            'Compressor crankcase heater',
            'Backup heat consideration (zone 7-8)',
          ]}
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Cold-climate certified mini splits maintain meaningful capacity below the 17°F line where standard units start to falter. For zones 7-8 garages, plan for backup heat on the coldest days.
      </figcaption>
    </figure>
  );
}
