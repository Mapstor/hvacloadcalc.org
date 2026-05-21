import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface WindowProps {
  x: number;
  label: string;
  uFactor: string;
  panes: 1 | 2;
  gapFill: 'none' | 'air' | 'argon';
  lowE: boolean;
  arrowCount: number;
  arrowSize: number;
  innerTemp: string;
  outerTemp: string;
}

function Window({ x, label, uFactor, panes, gapFill, lowE, arrowCount, arrowSize, innerTemp, outerTemp }: WindowProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <text x={180} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {label}
      </text>
      <g transform="translate(80,52)">
        <rect width={200} height={28} rx={14} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
        <text x={100} y={19} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
          {uFactor}
        </text>
      </g>

      {/* Indoor label */}
      <text x={60} y={120} fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
        INDOOR
      </text>
      <text x={60} y={136} fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {innerTemp}
      </text>

      {/* Outdoor label */}
      <text x={300} y={120} fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[700]}>
        OUTDOOR
      </text>
      <text x={300} y={136} fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {outerTemp}
      </text>

      {/* Window frame */}
      <rect x={120} y={150} width={120} height={160} fill="none" stroke="#a16207" strokeWidth={6} />

      {/* Glass panes */}
      {panes === 1 ? (
        <rect x={123} y={153} width={114} height={154} fill="#bae6fd" fillOpacity={0.4} stroke={colors.brand.primary} strokeWidth={1} />
      ) : (
        <>
          <rect x={123} y={153} width={50} height={154} fill="#bae6fd" fillOpacity={0.45} stroke={colors.brand.primary} strokeWidth={1} />
          {/* Gas gap */}
          <rect
            x={173}
            y={153}
            width={14}
            height={154}
            fill={gapFill === 'argon' ? '#c4b5fd' : '#fef3c7'}
            fillOpacity={0.5}
            stroke={colors.ink[300]}
            strokeWidth={0.5}
            strokeDasharray="2,2"
          />
          <rect x={187} y={153} width={50} height={154} fill="#bae6fd" fillOpacity={0.45} stroke={colors.brand.primary} strokeWidth={1} />

          {/* Low-E coating indicator */}
          {lowE && (
            <line x1={186} y1={156} x2={186} y2={303} stroke={colors.warn} strokeWidth={2} opacity={0.85} />
          )}

          {/* Gap label */}
          <text x={180} y={326} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.ink[500]}>
            {gapFill === 'argon' ? 'argon' : 'air'}
          </text>
          {lowE && (
            <text x={180} y={340} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.warn}>
              Low-E
            </text>
          )}
        </>
      )}

      {/* Heat flow arrows */}
      {Array.from({ length: arrowCount }, (_, i) => {
        const ay = 180 + i * ((310 - 180) / Math.max(arrowCount - 1, 1));
        return (
          <g key={i}>
            <line
              x1={140}
              y1={ay}
              x2={220 + arrowSize}
              y2={ay}
              stroke={colors.danger}
              strokeWidth={1.5 + arrowSize / 12}
              opacity={0.8}
              markerEnd="url(#arrow-u-hero)"
            />
          </g>
        );
      })}

      {/* Heat loss intensity */}
      <g transform="translate(180,360)">
        <text textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>
          {arrowCount >= 7 ? 'High heat loss' : arrowCount >= 4 ? 'Moderate heat loss' : 'Low heat loss'}
        </text>
      </g>
    </g>
  );
}

export function HeroUFactorComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-u-factor-comparison-title"
        descId="hero-u-factor-comparison-desc"
        title="Three window types compared by U-factor: single-pane, double-pane, double-pane Low-E argon"
        desc="Side-by-side comparison of three window types showing heat flow. Left window labeled single-pane with U-factor 1.04: large red arrows showing heat escaping outward through a single sheet of glass, indoor side at 70 degrees Fahrenheit, outdoor side 20 degrees. Center window labeled double-pane standard with U-factor 0.50: medium red arrows, two sheets of glass with air gap labeled half-inch air space. Right window labeled double-pane Low-E argon with U-factor 0.27: small red arrows, two sheets with metallic Low-E coating on the inner surface and gap labeled argon fill. U-factor is the rate of heat flow per square foot per degree Fahrenheit difference. Lower is better."
        className="w-full"
      >
        <defs>
          <marker id="arrow-u-hero" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="currentColor" />
          </marker>
        </defs>

        <rect width={1200} height={500} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          U-factor: same window opening, three different products
        </text>

        <Window
          x={40}
          label="Single-pane"
          uFactor="U-1.04"
          panes={1}
          gapFill="none"
          lowE={false}
          arrowCount={8}
          arrowSize={22}
          innerTemp="70°F"
          outerTemp="20°F"
        />

        <Window
          x={420}
          label="Double-pane standard"
          uFactor="U-0.50"
          panes={2}
          gapFill="air"
          lowE={false}
          arrowCount={5}
          arrowSize={14}
          innerTemp="70°F"
          outerTemp="20°F"
        />

        <Window
          x={800}
          label="Double-pane Low-E argon"
          uFactor="U-0.27"
          panes={2}
          gapFill="argon"
          lowE={true}
          arrowCount={3}
          arrowSize={7}
          innerTemp="70°F"
          outerTemp="20°F"
        />

        <text x={600} y={470} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          U-factor units: BTU per hour per square foot per °F. The lower the number, the less heat passes through.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        From single-pane to Low-E argon, U-factor drops nearly 4x. Each step adds a feature that slows heat transfer through the assembly.
      </figcaption>
    </figure>
  );
}
