import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function HeroSpfEnergyFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-spf-energy-flow-title"
        descId="hero-spf-energy-flow-desc"
        title="Seasonal Performance Factor energy flow"
        desc="Energy flow diagram showing seasonal performance factor as heat delivered divided by electricity consumed across an entire heating season. Electricity enters from the meter on the left, passes through the heat pump in the center, and exits as heat delivered to the home on the right. The formula SPF equals heat delivered divided by electricity consumed is shown with a worked example of 3,000 kWh of heat divided by 1,000 kWh of electricity giving SPF 3.0."
        className="w-full"
      >
        <defs>
          <marker id="spf-arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.brand.primary} />
          </marker>
          <marker id="spf-arrow-warm" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.warn} />
          </marker>
        </defs>
        <rect width={1200} height={500} fill={colors.surface.canvas} />

        {/* Electricity meter */}
        <g transform="translate(50,150)">
          <rect width={180} height={150} rx={8} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1.5} />
          <circle cx={90} cy={60} r={36} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2} />
          <text x={90} y={68} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight={typography.weight.title} fill={colors.brand.primary}>kWh</text>
          <text x={90} y={120} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.ink[900]}>Electric meter</text>
        </g>
        <text x={140} y={335} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={colors.brand.primary}>Electricity in (1,000 kWh)</text>

        {/* Arrow → heat pump */}
        <line x1={230} y1={225} x2={460} y2={225} stroke={colors.brand.primary} strokeWidth={3.5} markerEnd="url(#spf-arrow)" />

        {/* Heat pump */}
        <g transform="translate(460,140)">
          <rect width={260} height={170} rx={8} fill={colors.brand.primary} fillOpacity={0.12} stroke={colors.brand.primary} strokeWidth={2} />
          <text x={130} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Heat pump</text>
          {/* Fan */}
          <circle cx={130} cy={95} r={30} fill="none" stroke={colors.brand.primaryDark} strokeWidth={2} />
          <line x1={130} y1={65} x2={130} y2={125} stroke={colors.brand.primaryDark} strokeWidth={2} strokeLinecap="round" />
          <line x1={100} y1={95} x2={160} y2={95} stroke={colors.brand.primaryDark} strokeWidth={2} strokeLinecap="round" />
          <text x={130} y={150} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={colors.ink[700]}>compressor + fan + aux + defrost</text>
        </g>

        {/* Arrow → house */}
        <line x1={720} y1={225} x2={950} y2={225} stroke={colors.warn} strokeWidth={4} markerEnd="url(#spf-arrow-warm)" />

        {/* House */}
        <g transform="translate(950,140)">
          <polygon points="100,0 0,80 0,170 200,170 200,80" fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1.5} />
          <rect x={80} y={110} width={40} height={60} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
          <text x={100} y={150} textAnchor="middle" fontFamily={FONT} fontSize={28} fill={colors.warn}>🔥</text>
          <text x={100} y={195} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.label} fill={colors.ink[900]}>Home</text>
        </g>
        <text x={1050} y={335} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={colors.warn}>Heat delivered (3,000 kWh thermal)</text>

        {/* Formula at bottom */}
        <g transform="translate(150,395)">
          <rect width={900} height={70} rx={8} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1.5} />
          <text x={450} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[900]}>
            SPF = Heat delivered ÷ Electricity consumed
          </text>
          <text x={450} y={55} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fill={colors.ink[700]}>
            = 3,000 kWh ÷ 1,000 kWh = <tspan fontWeight={typography.weight.title} fill={colors.good}>SPF 3.0</tspan>  (averaged across the entire heating season)
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        SPF accounts for every kWh of electricity used by the system, divided into the total heat delivered to the home across the heating season.
      </figcaption>
    </figure>
  );
}
