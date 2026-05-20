import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface CircuitProps {
  x: number;
  title: string;
  suctionPsi: string;
  liquidPsi: string;
  evapColor: string;
  evapFill: number;
  compressorColor: string;
  iceOnCoil: boolean;
  outcome: string;
  outcomeColor: string;
}

function Circuit({ x, title, suctionPsi, liquidPsi, evapColor, evapFill, compressorColor, iceOnCoil, outcome, outcomeColor }: CircuitProps) {
  return (
    <g transform={`translate(${x},40)`}>
      <rect width={440} height={520} rx={8} fill={colors.surface.subtle} stroke={outcomeColor} strokeWidth={2} />
      <text x={220} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={outcomeColor}>
        {title}
      </text>

      {/* Compressor (top right) */}
      <g transform="translate(310,70)">
        <circle cx={40} cy={40} r={36} fill={compressorColor} fillOpacity={0.2} stroke={compressorColor} strokeWidth={2} />
        <text x={40} y={46} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={compressorColor}>
          Compressor
        </text>
      </g>

      {/* Condenser (right) */}
      <g transform="translate(290,170)">
        <rect width={100} height={80} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
        <text x={50} y={45} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.brand.primaryDark}>
          Condenser
        </text>
        <text x={50} y={62} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.brand.primaryDark}>
          coil
        </text>
      </g>

      {/* Expansion valve */}
      <g transform="translate(190,205)">
        <rect width={50} height={20} rx={3} fill={colors.warn} fillOpacity={0.3} stroke={colors.warn} strokeWidth={1.5} />
        <text x={25} y={14} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.warn}>
          TXV
        </text>
      </g>

      {/* Evaporator (left) */}
      <g transform="translate(50,170)">
        <rect width={100} height={80} rx={4} fill={evapColor} fillOpacity={evapFill} stroke={evapColor} strokeWidth={1.5} />
        <text x={50} y={45} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          Evaporator
        </text>
        <text x={50} y={62} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
          coil
        </text>
        {iceOnCoil ? (
          <g>
            <text x={20} y={20} fontFamily={FONT} fontSize={18}>❄</text>
            <text x={75} y={32} fontFamily={FONT} fontSize={14}>❄</text>
            <text x={40} y={75} fontFamily={FONT} fontSize={14}>❄</text>
          </g>
        ) : null}
      </g>

      {/* Lines */}
      {/* Suction (evap → compressor) */}
      <line x1={150} y1={210} x2={290} y2={120} stroke={colors.brand.accent} strokeWidth={4} />
      <text x={230} y={155} fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.brand.accent}>
        suction
      </text>
      {/* Liquid (condenser → TXV) */}
      <line x1={290} y1={250} x2={240} y2={215} stroke={colors.danger} strokeWidth={2.5} />
      {/* TXV → evap */}
      <line x1={190} y1={215} x2={150} y2={215} stroke={colors.danger} strokeWidth={2.5} />
      {/* compressor → condenser */}
      <line x1={350} y1={150} x2={350} y2={170} stroke={colors.danger} strokeWidth={2.5} />

      {/* Pressures */}
      <g transform="translate(40,300)">
        <text x={0} y={0} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[900]}>
          Pressures (R-410A):
        </text>
        <text x={0} y={28} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
          Suction: <tspan fontWeight={typography.weight.title} fill={colors.brand.accent}>{suctionPsi}</tspan>
        </text>
        <text x={0} y={48} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
          Liquid: <tspan fontWeight={typography.weight.title} fill={colors.danger}>{liquidPsi}</tspan>
        </text>
      </g>

      {/* Outcome */}
      <g transform="translate(40,400)">
        <rect width={360} height={90} rx={6} fill={outcomeColor} fillOpacity={0.1} stroke={outcomeColor} strokeWidth={1.5} />
        <text x={180} y={28} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={outcomeColor}>
          {outcome}
        </text>
      </g>
    </g>
  );
}

export function RefrigerantCircuitLowCharge({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="refrigerant-circuit-low-charge-title"
        descId="refrigerant-circuit-low-charge-desc"
        title="AC refrigerant circuit: normal charge versus low charge"
        desc="Schematic of AC refrigerant circuit showing the four main components connected by suction and liquid refrigerant lines. Two states compared. Normal charge state shows R-410A suction pressure 75 psi and liquid pressure 250 psi with no ice on the evaporator coil. Low charge or leak state shows reduced suction pressure 40 psi and liquid pressure 180 psi with ice forming on the evaporator coil, causing the compressor to overheat, trip on low pressure, and short cycle."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <Circuit
          x={30}
          title="Normal charge"
          suctionPsi="75 psi"
          liquidPsi="250 psi"
          evapColor={colors.brand.primary}
          evapFill={0.15}
          compressorColor={colors.good}
          iceOnCoil={false}
          outcome="Compressor runs full cycles; coil at 40°F."
          outcomeColor={colors.good}
        />

        <Circuit
          x={530}
          title="Low charge / leak"
          suctionPsi="40 psi"
          liquidPsi="180 psi"
          evapColor={colors.brand.accent}
          evapFill={0.25}
          compressorColor={colors.danger}
          iceOnCoil={true}
          outcome="Coil freezes; compressor trips on low pressure; short cycles."
          outcomeColor={colors.danger}
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Refrigerant doesn&apos;t get used up. If pressures are low, there is a leak. EPA Section 608 certification is federally required for any refrigerant work.
      </figcaption>
    </figure>
  );
}
