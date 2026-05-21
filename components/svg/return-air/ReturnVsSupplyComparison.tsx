import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function ReturnVsSupplyComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="return-vs-supply-comparison-title"
        descId="return-vs-supply-comparison-desc"
        title="Supply ducts compared to return ducts: smaller and faster vs larger and slower"
        desc="Side-by-side comparison. Left panel labeled supply ducts: multiple smaller ducts shown branching from a trunk, each delivering air at relatively high velocity 600 to 900 FPM in trunk and 400 to 700 FPM in branches, small register icons at end. Right panel labeled return ducts: fewer larger ducts converging to a single trunk, lower velocity trunk 700 to 900 FPM max and branch 600 to 700 FPM max. Returns typically need larger cross-section than supplies for the same CFM because they run at lower velocity to keep static pressure manageable."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Supply vs return: different velocity, different sizing
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same CFM, different duct sizes
        </text>

        {/* Left: Supply */}
        <g>
          <text x={250} y={100} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.danger}>
            Supply ducts
          </text>
          <text x={250} y={120} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            higher velocity, smaller cross-section
          </text>

          {/* Trunk */}
          <rect x={60} y={170} width={300} height={36} fill={colors.danger} fillOpacity={0.25} stroke={colors.danger} strokeWidth={2} />
          <text x={210} y={194} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
            trunk: 700-900 FPM
          </text>

          {/* Branches */}
          {[100, 180, 260, 340].map((x, i) => (
            <g key={i}>
              <rect x={x} y={206} width={20} height={70} fill={colors.danger} fillOpacity={0.3} stroke={colors.danger} strokeWidth={1.5} />
              <rect x={x - 4} y={276} width={28} height={10} fill={colors.danger} fillOpacity={0.7} stroke={colors.danger} strokeWidth={1.5} />
              {/* Air flow arrow */}
              <line x1={x + 10} y1={290} x2={x + 10} y2={310} stroke={colors.danger} strokeWidth={2} markerEnd="url(#supply-flow-arrow)" />
            </g>
          ))}
          <text x={210} y={244} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.danger}>
            branches: 400-700 FPM
          </text>

          {/* Reg labels */}
          <text x={210} y={336} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.ink[500]}>
            supply registers
          </text>

          {/* Note box */}
          <g transform="translate(60,360)">
            <rect width={380} height={110} rx={6} fill={colors.danger} fillOpacity={0.08} stroke={colors.danger} strokeWidth={1.5} />
            <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.danger}>
              Why higher velocity is OK on supplies:
            </text>
            <foreignObject x={20} y={32} width={340} height={75}>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.45' }}>
                Supply ducts run through walls and attics, often hidden. Noise is muffled by structure. Multiple smaller branches deliver consistent airflow to each register.
              </div>
            </foreignObject>
          </g>
        </g>

        {/* Right: Returns */}
        <g>
          <text x={750} y={100} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primary}>
            Return ducts
          </text>
          <text x={750} y={120} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            lower velocity, larger cross-section
          </text>

          {/* One large return trunk */}
          <rect x={560} y={160} width={380} height={56} fill={colors.brand.primary} fillOpacity={0.25} stroke={colors.brand.primary} strokeWidth={2} />
          <text x={750} y={195} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
            return trunk: 700-900 FPM max
          </text>

          {/* Big return grille */}
          <rect x={680} y={216} width={140} height={70} fill={colors.brand.primary} fillOpacity={0.35} stroke={colors.brand.primary} strokeWidth={2} />
          <text x={750} y={250} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
            return grille
          </text>
          <text x={750} y={268} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            ≤500 FPM face
          </text>

          {/* Air flow arrow */}
          <line x1={750} y1={290} x2={750} y2={310} stroke={colors.brand.primary} strokeWidth={2} markerEnd="url(#return-flow-arrow)" />
          <text x={750} y={326} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.ink[500]}>
            air drawn back to AHU
          </text>

          {/* Note box */}
          <g transform="translate(560,360)">
            <rect width={380} height={110} rx={6} fill={colors.brand.primary} fillOpacity={0.08} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primary}>
              Why lower velocity matters:
            </text>
            <foreignObject x={20} y={32} width={340} height={75}>
              <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.45' }}>
                Returns are usually in living spaces. Noise headroom is small. High face velocity at the grille creates audible whine and rattle. Lower velocity = quieter and lower static pressure.
              </div>
            </foreignObject>
          </g>
        </g>

        <defs>
          <marker id="supply-flow-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={colors.danger} />
          </marker>
          <marker id="return-flow-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={colors.brand.primary} />
          </marker>
        </defs>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Supply branches can split into multiple small ducts at higher velocity. Returns typically consolidate into one large duct at lower velocity to keep noise and static pressure manageable.
      </figcaption>
    </figure>
  );
}
