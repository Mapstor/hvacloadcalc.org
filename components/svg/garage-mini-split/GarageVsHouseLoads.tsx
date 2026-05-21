import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface SpaceCardProps {
  x: number;
  title: string;
  subtitle: string;
  walls: string;
  ceiling: string;
  windows: string;
  airLeakage: string;
  doorNote: string;
  coolingLoad: string;
  heatingLoad: string;
  loadColor: string;
}

function SpaceCard({ x, title, subtitle, walls, ceiling, windows, airLeakage, doorNote, coolingLoad, heatingLoad, loadColor }: SpaceCardProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={440} height={500} rx={10} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <text x={220} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={220} y={54} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      {/* Mini cross-section */}
      <g transform="translate(80,80)">
        {/* Outer rectangle representing the space */}
        <rect width={280} height={140} fill="none" stroke={colors.ink[700]} strokeWidth={2} />
        {/* Insulation indicator (walls) */}
        <rect x={4} y={4} width={272} height={132} fill={colors.warn} fillOpacity={0.1} stroke="none" />
        <rect x={4} y={4} width={272} height={132} fill="none" stroke={colors.warn} strokeWidth={6} strokeOpacity={0.5} />
        {/* Floor line */}
        <line x1={0} y1={140} x2={280} y2={140} stroke={colors.ink[700]} strokeWidth={3} />
        {/* Window (mini) */}
        <rect x={120} y={60} width={40} height={28} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={1.5} />
        <line x1={140} y1={60} x2={140} y2={88} stroke={colors.brand.primary} strokeWidth={1} />
      </g>

      {/* Spec list */}
      <g transform="translate(30,250)">
        <text fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Envelope characteristics
        </text>
        <g transform="translate(0,18)">
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>Walls:</text>
          <text x={90} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{walls}</text>
        </g>
        <g transform="translate(0,34)">
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>Ceiling:</text>
          <text x={90} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{ceiling}</text>
        </g>
        <g transform="translate(0,50)">
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>Windows:</text>
          <text x={90} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{windows}</text>
        </g>
        <g transform="translate(0,66)">
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>Door:</text>
          <text x={90} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{doorNote}</text>
        </g>
        <g transform="translate(0,82)">
          <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[700]}>Infiltration:</text>
          <text x={90} fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{airLeakage}</text>
        </g>
      </g>

      {/* Loads */}
      <g transform="translate(30,360)">
        <rect width={380} height={110} rx={6} fill={loadColor} fillOpacity={0.1} stroke={loadColor} strokeWidth={1.5} />
        <text x={20} y={28} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={loadColor}>
          Calculated loads (400 sq ft)
        </text>
        <text x={20} y={56} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.danger}>
          Cooling: {coolingLoad}
        </text>
        <text x={20} y={84} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primary}>
          Heating: {heatingLoad}
        </text>
      </g>
    </g>
  );
}

export function GarageVsHouseLoads({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 620"
        titleId="garage-vs-house-loads-title"
        descId="garage-vs-house-loads-desc"
        title="Garage load vs conditioned bedroom load for the same square footage"
        desc="Two side-by-side cards comparing a 400 sq ft conditioned bedroom and a 400 sq ft attached garage. Left card conditioned bedroom: walls R-13, ceiling R-38, double-pane windows U-0.30, exterior door R-5, low air infiltration 1-2 ACH50, cooling load 6,000 BTU/hr, heating load 5,000 BTU/hr. Right card attached garage: walls R-13 or less often R-0, ceiling R-19 or less often R-0, single-pane garage windows U-0.5, insulated garage door R-9 to R-12 or uninsulated R-2, high air infiltration 8-12 ACH50, cooling load 12,000 to 18,000 BTU/hr, heating load 12,000 to 20,000 BTU/hr. Garages typically need 2 to 3 times the BTU per square foot of a conditioned bedroom because of lower insulation, bigger door, and higher air leakage."
        className="w-full"
      >
        <rect width={1000} height={620} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Why a garage needs more BTU than a bedroom of the same size
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Same square footage, very different loads
        </text>

        <SpaceCard
          x={40}
          title="Conditioned bedroom"
          subtitle="400 sq ft, modern code"
          walls="R-13 cavity insulation"
          ceiling="R-38 above"
          windows="Double-pane Low-E"
          doorNote="Interior door, R-3"
          airLeakage="1-2 ACH50 (tight)"
          coolingLoad="6,000 BTU/hr"
          heatingLoad="5,000 BTU/hr"
          loadColor={colors.good}
        />

        <SpaceCard
          x={520}
          title="Attached garage"
          subtitle="400 sq ft, typical"
          walls="R-0 to R-13 (often <R-13)"
          ceiling="R-0 to R-30 (often R-19)"
          windows="Single-pane or none"
          doorNote="Garage door R-2 to R-12"
          airLeakage="8-12 ACH50 (leaky)"
          coolingLoad="12,000-18,000 BTU/hr"
          heatingLoad="12,000-20,000 BTU/hr"
          loadColor={colors.danger}
        />

        <text x={500} y={600} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          A garage of the same size needs 2-3× the BTU per square foot.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Garages are not bedrooms. The garage door alone has roughly the insulation value of a bedsheet, and there are gaps everywhere.
      </figcaption>
    </figure>
  );
}
