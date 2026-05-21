import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  effectiveR: string;
  effectiveRColor: string;
  showLeaks: boolean;
  sealedColor: string;
  description: string;
}

function Panel({ x, title, effectiveR, effectiveRColor, showLeaks, sealedColor, description }: PanelProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <text x={220} y={26} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      {/* Roof outline */}
      <path d="M 30 90 L 220 40 L 410 90 L 410 280 L 30 280 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2} />

      {/* Insulation layer (always deep R-49 worth) */}
      <rect x={30} y={170} width={380} height={70} fill="#a16207" fillOpacity={0.5} stroke="#a16207" strokeWidth={1} />
      <text x={220} y={210} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.surface.canvas}>
        R-49 insulation (deep)
      </text>

      {/* Ceiling */}
      <line x1={30} y1={240} x2={410} y2={240} stroke={colors.ink[700]} strokeWidth={2} />

      {/* Living space */}
      <rect x={30} y={240} width={380} height={50} fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={1} />
      <text x={220} y={269} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        Living space (70°F)
      </text>

      {/* Penetrations: 4 of them */}
      {[80, 160, 260, 340].map((px, i) => (
        <g key={i}>
          {/* Penetration hole */}
          <rect x={px - 8} y={236} width={16} height={8} fill={colors.ink[300]} stroke={colors.ink[700]} strokeWidth={1} />
          {/* Light fixture / penetration */}
          <rect x={px - 10} y={240} width={20} height={8} fill={colors.ink[500]} stroke={colors.ink[700]} strokeWidth={1} />
        </g>
      ))}

      {/* Air leakage indicators */}
      {showLeaks ? (
        <>
          {[80, 160, 260, 340].map((px, i) => (
            <g key={i}>
              <path
                d={`M ${px} 230 Q ${px - 8} 200 ${px - 4} 175 Q ${px + 4} 160 ${px + 2} 140`}
                fill="none"
                stroke={colors.danger}
                strokeWidth={2.5}
                opacity={0.8}
                strokeDasharray="3,2"
              />
              <path
                d={`M ${px + 2} 140 L ${px - 3} 130 M ${px + 2} 140 L ${px + 7} 130`}
                stroke={colors.danger}
                strokeWidth={2}
                opacity={0.8}
                fill="none"
              />
            </g>
          ))}
        </>
      ) : (
        <>
          {[80, 160, 260, 340].map((px, i) => (
            <g key={i}>
              {/* Sealed indicator (caulk/foam) */}
              <ellipse cx={px} cy={232} rx={14} ry={5} fill={sealedColor} stroke={colors.ink[700]} strokeWidth={1.5} />
              <text x={px} y={224} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={sealedColor}>
                sealed
              </text>
            </g>
          ))}
        </>
      )}

      {/* Effective R-value tag */}
      <g transform="translate(150,310)">
        <rect width={140} height={36} rx={4} fill={effectiveRColor} fillOpacity={0.18} stroke={effectiveRColor} strokeWidth={2} />
        <text x={70} y={15} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Effective R-value:
        </text>
        <text x={70} y={30} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={effectiveRColor}>
          {effectiveR}
        </text>
      </g>

      {/* Description */}
      <foreignObject x={20} y={360} width={400} height={80}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', textAlign: 'center', lineHeight: '1.45' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function AirLeakVsRValue({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="air-leak-vs-r-value-title"
        descId="air-leak-vs-r-value-desc"
        title="Air sealing dramatically improves the effective R-value of attic insulation"
        desc="Side-by-side comparison of two attics with identical R-49 insulation depth. Left panel R-49 attic without air sealing: multiple red arrows showing air leaking upward through can lights, plumbing penetrations, top plates, and the attic access, effective R-value reduced to R-20 to R-30. Right panel R-49 attic with proper air sealing: same insulation depth, all penetrations sealed with caulk or foam shown as blue ovals, no leaking arrows, effective R-value at full R-49. R-value assumes no air leakage; without air sealing deep insulation is largely wasted."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Air sealing matters as much as insulation depth
        </text>

        <Panel
          x={30}
          title="R-49 WITHOUT air sealing"
          effectiveR="R-20 to R-30"
          effectiveRColor={colors.danger}
          showLeaks={true}
          sealedColor={colors.brand.primary}
          description="Same R-49 insulation, but air leaks past it through penetrations. The insulation slows conductive heat flow but cannot stop air movement. Half the value lost."
        />

        <Panel
          x={530}
          title="R-49 WITH air sealing"
          effectiveR="R-49 (full)"
          effectiveRColor={colors.good}
          showLeaks={false}
          sealedColor={colors.good}
          description="Same insulation, all penetrations caulked or foamed. Air movement stopped at the ceiling plane. Full R-value delivered."
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Field studies routinely find 30-50% effective R-value reduction in attics with code insulation but no air sealing.
      </figcaption>
    </figure>
  );
}
