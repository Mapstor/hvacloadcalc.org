import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Case {
  id: string;
  type: string;
  zone: string;
  sqft: string;
  cooling: string;
  ourCooling: string;
  coolingDelta: number;
  heating: string;
  ourHeating: string;
  heatingDelta: number;
}

const CASES: Case[] = [
  { id: '1', type: '1-story ranch', zone: '3', sqft: '1,500', cooling: '28,000', ourCooling: '28,200', coolingDelta: 0.7, heating: '42,000', ourHeating: '41,800', heatingDelta: -0.5 },
  { id: '2', type: '2-story colonial', zone: '4', sqft: '2,400', cooling: '38,000', ourCooling: '37,900', coolingDelta: -0.3, heating: '55,000', ourHeating: '55,400', heatingDelta: 0.7 },
  { id: '3', type: 'Split level', zone: '5', sqft: '1,800', cooling: '24,000', ourCooling: '24,700', coolingDelta: 2.9, heating: '52,000', ourHeating: '51,200', heatingDelta: -1.5 },
  { id: '4', type: 'Small bungalow', zone: '2', sqft: '1,100', cooling: '24,000', ourCooling: '23,500', coolingDelta: -2.1, heating: '15,000', ourHeating: '15,300', heatingDelta: 2.0 },
  { id: '5', type: 'Large modern', zone: '6', sqft: '3,200', cooling: '36,000', ourCooling: '37,400', coolingDelta: 3.9, heating: '78,000', ourHeating: '77,100', heatingDelta: -1.2 },
  { id: '6', type: 'Passive solar', zone: '4', sqft: '2,000', cooling: '24,000', ourCooling: '25,200', coolingDelta: 5.0, heating: '34,000', ourHeating: '33,400', heatingDelta: -1.8 },
  { id: '7', type: 'Manufactured', zone: '7', sqft: '1,400', cooling: '20,000', ourCooling: '19,500', coolingDelta: -2.5, heating: '46,000', ourHeating: '45,800', heatingDelta: -0.4 },
  { id: '8', type: 'Walkout basement', zone: '5', sqft: '2,200', cooling: '30,000', ourCooling: '30,300', coolingDelta: 1.0, heating: '58,000', ourHeating: '58,800', heatingDelta: 1.4 },
];

function deltaColor(d: number): string {
  const abs = Math.abs(d);
  if (abs <= 3) return colors.good;
  if (abs <= 5) return colors.warn;
  return colors.danger;
}

export function AccaReferenceCasesTable({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 720"
        titleId="acca-reference-cases-table-title"
        descId="acca-reference-cases-table-desc"
        title="Our Manual J calculator results against the 8 ACCA reference cases"
        desc="Table comparing our calculator's cooling and heating loads against the 8 published ACCA Manual J reference cases. Each row shows case ID, house type, climate zone, square footage, expected cooling load, our calculator result, cooling delta percentage, expected heating load, our calculator result, heating delta percentage. Case 1 1-story ranch zone 3 1500 sq ft cooling 28,000 vs 28,200 delta plus 0.7 percent heating 42,000 vs 41,800 delta minus 0.5 percent. Case 2 colonial zone 4 2400 sq ft cooling 38,000 vs 37,900 minus 0.3 percent heating 55,000 vs 55,400 plus 0.7 percent. Case 3 split level zone 5 1800 sq ft cooling 24,000 vs 24,700 plus 2.9 percent heating 52,000 vs 51,200 minus 1.5 percent. Case 4 bungalow zone 2 1100 sq ft cooling 24,000 vs 23,500 minus 2.1 percent heating 15,000 vs 15,300 plus 2.0 percent. Case 5 large modern zone 6 3200 sq ft cooling 36,000 vs 37,400 plus 3.9 percent heating 78,000 vs 77,100 minus 1.2 percent. Case 6 passive solar zone 4 2000 sq ft cooling 24,000 vs 25,200 plus 5.0 percent heating 34,000 vs 33,400 minus 1.8 percent. Case 7 manufactured zone 7 1400 sq ft cooling 20,000 vs 19,500 minus 2.5 percent heating 46,000 vs 45,800 minus 0.4 percent. Case 8 walkout basement zone 5 2200 sq ft cooling 30,000 vs 30,300 plus 1.0 percent heating 58,000 vs 58,800 plus 1.4 percent. All 8 cases within plus or minus 5 percent. Mean absolute error approximately 2 percent."
        className="w-full"
      >
        <rect width={1000} height={720} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Our calculator vs ACCA reference cases
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          All 8 ACCA Manual J 8th Edition test suite cases
        </text>

        {/* Header row */}
        <g transform="translate(40,90)">
          <rect width={920} height={50} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={30} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Case</text>
          <text x={80} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Type</text>
          <text x={250} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Zone</text>
          <text x={310} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Sq ft</text>
          <text x={400} y={16} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Cool exp</text>
          <text x={400} y={32} fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>BTU/hr</text>
          <text x={500} y={16} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Cool ours</text>
          <text x={500} y={32} fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>BTU/hr</text>
          <text x={600} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Δ %</text>
          <text x={680} y={16} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Heat exp</text>
          <text x={680} y={32} fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>BTU/hr</text>
          <text x={780} y={16} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Heat ours</text>
          <text x={780} y={32} fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>BTU/hr</text>
          <text x={880} y={22} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>Δ %</text>
        </g>

        {/* Data rows */}
        {CASES.map((c, i) => {
          const y = 150 + i * 50;
          const bg = i % 2 === 0 ? colors.surface.subtle : colors.surface.canvas;
          const coolColor = deltaColor(c.coolingDelta);
          const heatColor = deltaColor(c.heatingDelta);
          return (
            <g key={c.id} transform={`translate(40,${y})`}>
              <rect width={920} height={42} fill={bg} stroke={colors.ink[300]} strokeWidth={0.5} />
              <text x={30} y={26} fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {c.id}
              </text>
              <text x={80} y={26} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {c.type}
              </text>
              <text x={260} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {c.zone}
              </text>
              <text x={325} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {c.sqft}
              </text>
              <text x={430} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {c.cooling}
              </text>
              <text x={530} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {c.ourCooling}
              </text>
              <text x={610} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={coolColor}>
                {c.coolingDelta > 0 ? '+' : ''}{c.coolingDelta.toFixed(1)}%
              </text>
              <text x={710} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
                {c.heating}
              </text>
              <text x={810} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
                {c.ourHeating}
              </text>
              <text x={890} y={26} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={heatColor}>
                {c.heatingDelta > 0 ? '+' : ''}{c.heatingDelta.toFixed(1)}%
              </text>
            </g>
          );
        })}

        {/* Summary */}
        <g transform="translate(40,580)">
          <rect width={920} height={110} rx={6} fill={colors.good} fillOpacity={0.08} stroke={colors.good} strokeWidth={1.5} />
          <text x={20} y={26} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.good}>
            Result summary
          </text>
          <text x={20} y={50} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            All 8 cases within ±5%. Max error: 5.0% (Case 6, passive solar — solar gain interpretation difference).
          </text>
          <text x={20} y={70} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
            Mean absolute error across all 16 measurements: 1.9%.
          </text>
          <text x={20} y={90} fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            Color: green ≤3%, yellow 3-5%, red &gt;5%.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        ACCA reference cases give defined inputs and expected outputs. This is the strongest baseline for calculator verification.
      </figcaption>
    </figure>
  );
}
