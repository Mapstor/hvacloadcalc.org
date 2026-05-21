import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface RatingProps {
  x: number;
  y: number;
  label: string;
  value: string;
  callout: string;
  color: string;
}

function Rating({ x, y, label, value, callout, color }: RatingProps) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={200} height={130} rx={6} fill={color} fillOpacity={0.08} stroke={color} strokeWidth={2} />
      <text x={100} y={28} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
        {label}
      </text>
      <text x={100} y={68} textAnchor="middle" fontFamily={FONT} fontSize={28} fontWeight={typography.weight.title} fill={color}>
        {value}
      </text>
      <foreignObject x={12} y={80} width={176} height={44}>
        <div style={{ fontFamily: FONT, fontSize: 10, color: '#334155', textAlign: 'center', lineHeight: '1.35' }}>
          {callout}
        </div>
      </foreignObject>
    </g>
  );
}

export function NfrcLabelAnatomy({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="nfrc-label-anatomy-title"
        descId="nfrc-label-anatomy-desc"
        title="Anatomy of an NFRC window label"
        desc="Reproduction of an NFRC label format showing four main ratings. Top header NFRC National Fenestration Rating Council with manufacturer line Example Window Co Model ABC-123. Top-left U-Factor 0.27 with callout heat transfer rate lower is better. Top-right Solar Heat Gain Coefficient SHGC 0.28 with callout fraction of solar heat passing through lower means less summer heat. Bottom-left Visible Transmittance 0.50 with callout light transmission higher means brighter. Bottom-right Air Leakage 0.2 cfm per square foot with callout air infiltration rate lower is better. Certified product label appears on every NFRC-certified window."
        className="w-full"
      >
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Anatomy of an NFRC label
        </text>

        {/* Label outline */}
        <g transform="translate(60,80)">
          <rect width={880} height={520} rx={8} fill={colors.surface.canvas} stroke={colors.ink[900]} strokeWidth={3} />

          {/* Header */}
          <g transform="translate(20,16)">
            <rect width={840} height={70} rx={4} fill={colors.ink[900]} />
            <text x={20} y={26} fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              NFRC
            </text>
            <text x={20} y={48} fontFamily={FONT} fontSize={10} fill={colors.surface.canvas}>
              National Fenestration Rating Council
            </text>
            <text x={20} y={62} fontFamily={FONT} fontSize={9} fontStyle="italic" fill="#cbd5e1">
              Certified Performance Rating
            </text>
            <text x={840 - 20} y={48} textAnchor="end" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.surface.canvas}>
              ENERGY PERFORMANCE RATINGS
            </text>
          </g>

          {/* Manufacturer info */}
          <g transform="translate(20,110)">
            <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
              Manufacturer:
            </text>
            <text x={100} fontFamily={FONT} fontSize={11} fill={colors.ink[900]}>
              Example Window Co.
            </text>
            <text x={400} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
              Model:
            </text>
            <text x={460} fontFamily={FONT} fontSize={11} fill={colors.ink[900]}>
              ABC-123 (Double-Pane Low-E Argon)
            </text>
          </g>

          {/* 4 ratings */}
          <Rating
            x={20}
            y={140}
            label="U-FACTOR (U.S./I-P)"
            value="0.27"
            callout="Rate of heat transfer. Lower = less heat loss in winter."
            color={colors.brand.primary}
          />
          <Rating
            x={240}
            y={140}
            label="SOLAR HEAT GAIN COEFFICIENT"
            value="0.28"
            callout="Fraction of solar heat passing through. Lower = less summer heat gain."
            color={colors.warn}
          />
          <Rating
            x={460}
            y={140}
            label="VISIBLE TRANSMITTANCE"
            value="0.50"
            callout="Fraction of visible light passing through. Higher = brighter room."
            color={colors.good}
          />
          <Rating
            x={680}
            y={140}
            label="AIR LEAKAGE (US/I-P)"
            value="0.2"
            callout="cfm/ft² at standard test pressure. Lower = tighter window."
            color={colors.danger}
          />

          {/* Test conditions footer */}
          <g transform="translate(20,300)">
            <rect width={840} height={80} rx={4} fill={colors.surface.subtle} stroke={colors.ink[300]} strokeWidth={1} />
            <text x={20} y={22} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Test conditions
            </text>
            <text x={20} y={42} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              U-factor: NFRC 100 (outdoor -18°F, indoor 70°F, wind 12.3 mph)
            </text>
            <text x={20} y={58} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              SHGC and VT: NFRC 200. Air leakage: NFRC 400 / ASTM E283.
            </text>
            <text x={20} y={74} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              Values are for the whole window (frame + glass + spacer), not glass alone.
            </text>
          </g>

          {/* Big NFRC note */}
          <g transform="translate(20,400)">
            <rect width={840} height={100} rx={6} fill={colors.brand.primary} fillOpacity={0.08} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
              What to look at first
            </text>
            <text x={20} y={50} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              1. U-factor compared to your climate zone target (this article covers in detail)
            </text>
            <text x={20} y={66} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              2. SHGC for your climate (low in hot climates, higher in cold for passive solar)
            </text>
            <text x={20} y={82} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
              3. Air leakage rating (ENERGY STAR requires ≤0.3 cfm/ft²)
            </text>
          </g>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Every NFRC-certified window in the US shows these four ratings. Compare numerically, not by marketing claims.
      </figcaption>
    </figure>
  );
}
