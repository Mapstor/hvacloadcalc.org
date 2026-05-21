import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface InsulationType {
  name: string;
  color: string;
  rPerInch: number;
}

const TYPES: InsulationType[] = [
  { name: 'Fiberglass batt', color: '#fda4af', rPerInch: 3.0 },
  { name: 'Loose-fill fiberglass', color: '#fef3c7', rPerInch: 2.3 },
  { name: 'Cellulose', color: '#a16207', rPerInch: 3.6 },
  { name: 'Open-cell foam', color: '#fdba74', rPerInch: 3.6 },
  { name: 'Closed-cell foam', color: '#c2410c', rPerInch: 6.5 },
];

export function MeasuringExistingRValue({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="measuring-existing-r-value-title"
        descId="measuring-existing-r-value-desc"
        title="Three steps to measure existing attic insulation R-value"
        desc="Cross-section diagram of an attic showing three steps to measure existing R-value. Step 1: Insert a carpenter's ruler or tape measure vertically into the insulation to read the depth in inches, with 12 inches marked. Step 2: Identify the insulation type by color and texture, with a callout showing pink fiberglass batts, white loose-fill fiberglass, gray-brown cellulose, and yellow-peach spray foam with their R per inch values. Step 3: Multiply thickness by R per inch for that type. Example calculation: 12 inches of loose-fill cellulose multiplied by R-3.6 per inch equals approximately R-43. Measure at multiple spots since settling and uneven coverage are common."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          How to measure your existing attic R-value
        </text>

        {/* Cross-section */}
        <g transform="translate(60,80)">
          {/* Roof outline */}
          <path d="M 0 60 L 200 0 L 400 60 L 400 240 L 0 240 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2} />

          {/* Ceiling joists */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={20 + i * 80} y={180} width={12} height={30} fill="#a16207" stroke={colors.ink[700]} strokeWidth={1} />
          ))}
          {/* Ceiling drywall */}
          <line x1={0} y1={210} x2={400} y2={210} stroke={colors.ink[700]} strokeWidth={2} />

          {/* Insulation layer */}
          <rect x={0} y={120} width={400} height={60} fill="#a16207" fillOpacity={0.55} stroke="#a16207" strokeWidth={1} />
          <text x={200} y={156} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.surface.canvas}>
            cellulose loose-fill (12″)
          </text>

          {/* Ruler */}
          <g transform="translate(330,80)">
            <rect x={-3} y={0} width={6} height={130} fill={colors.warn} stroke={colors.ink[700]} strokeWidth={1} />
            {[0, 2, 4, 6, 8, 10, 12].map((inch) => (
              <g key={inch}>
                <line x1={-6} y1={inch * 10} x2={6} y2={inch * 10} stroke={colors.ink[900]} strokeWidth={0.5} />
                <text x={12} y={inch * 10 + 3} fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
                  {12 - inch}
                </text>
              </g>
            ))}
            <text x={-30} y={-8} fontFamily={FONT} fontSize={10} fontWeight={typography.weight.label} fill={colors.ink[900]}>
              ruler
            </text>
          </g>

          {/* Step 1 callout */}
          <g transform="translate(420,90)">
            <circle r={14} fill={colors.brand.primary} />
            <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              1
            </text>
            <text x={20} y={5} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Measure depth
            </text>
            <text x={20} y={22} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              12 inches (multiple spots)
            </text>
          </g>
        </g>

        {/* Step 2: Identify type */}
        <g transform="translate(540,180)">
          <circle r={14} fill={colors.brand.primary} />
          <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
            2
          </text>
          <text x={20} y={5} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Identify type
          </text>

          {TYPES.map((t, i) => (
            <g key={t.name} transform={`translate(0,${28 + i * 22})`}>
              <rect width={20} height={14} fill={t.color} stroke={colors.ink[700]} strokeWidth={1} />
              <text x={28} y={11} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
                {t.name}
              </text>
              <text x={200} y={11} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                R-{t.rPerInch}/in
              </text>
            </g>
          ))}
        </g>

        {/* Step 3: Multiply */}
        <g transform="translate(60,400)">
          <circle r={14} fill={colors.brand.primary} />
          <text y={4} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
            3
          </text>
          <text x={20} y={5} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Multiply
          </text>
        </g>

        <g transform="translate(60,440)">
          <rect width={880} height={110} rx={6} fill={colors.good} fillOpacity={0.08} stroke={colors.good} strokeWidth={1.5} />
          <text x={440} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.good}>
            12″ × R-3.6/in = R-43
          </text>
          <text x={440} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            (12 inches of loose-fill cellulose at R-3.6 per inch)
          </text>
          <text x={440} y={82} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
            Compare to DOE recommendation for your climate zone.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Measure depth, identify the insulation type, multiply by the type&apos;s R-per-inch. Sample multiple spots for an accurate average.
      </figcaption>
    </figure>
  );
}
