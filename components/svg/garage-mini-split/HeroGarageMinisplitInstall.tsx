import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function HeroGarageMinisplitInstall({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-garage-mini-split-install-title"
        descId="hero-garage-mini-split-install-desc"
        title="Cut-away of a typical 2-car garage with a mini-split installation"
        desc="Cut-away view of an attached 2-car garage with a mini-split. Outdoor condenser unit mounted on the exterior side wall outside the garage, refrigerant lines penetrating the garage wall through a small hole with a sealing collar, line set bundle visible. Indoor head unit mounted high on the interior wall with horizontal louvers. Components labeled: outdoor condenser, line set with refrigerant and control wire bundle, wall penetration with weatherproof sleeve, indoor head, drain line routing outdoors. Inside the garage: workbench, car visible, person working. Indoor thermometer reads 72 degrees Fahrenheit. A single-zone mini split provides both heating and cooling for a typical garage with the outdoor unit on an exterior wall."
        className="w-full"
      >
        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          A typical garage mini-split install
        </text>

        {/* Ground */}
        <line x1={50} y1={490} x2={1150} y2={490} stroke={colors.ink[700]} strokeWidth={2.5} />

        {/* House (background) */}
        <g>
          <path d="M 50 200 L 250 100 L 450 200 L 450 490 L 50 490 Z" fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
          <text x={250} y={300} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            (house)
          </text>
          {/* House window */}
          <rect x={150} y={250} width={50} height={60} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={175} y1={250} x2={175} y2={310} stroke={colors.ink[700]} strokeWidth={1} />
          <line x1={150} y1={280} x2={200} y2={280} stroke={colors.ink[700]} strokeWidth={1} />
        </g>

        {/* Garage (cut-away — front wall removed) */}
        <g>
          {/* Garage roof */}
          <path d="M 450 200 L 700 130 L 950 200 L 950 490 L 450 490 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2.5} />

          {/* Garage interior visible */}
          <rect x={450} y={200} width={500} height={290} fill={colors.surface.canvas} stroke="none" />

          {/* Cut-away edge indication */}
          <line x1={950} y1={200} x2={950} y2={490} stroke={colors.ink[700]} strokeWidth={2.5} strokeDasharray="4,3" />

          {/* Side wall (right) */}
          <path d="M 950 200 L 1050 200 L 1050 490 L 950 490" fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} fillOpacity={0.6} />

          {/* Floor */}
          <line x1={450} y1={490} x2={950} y2={490} stroke={colors.ink[700]} strokeWidth={2} />

          {/* Garage label */}
          <text x={700} y={170} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            attached 2-car garage
          </text>

          {/* Workbench */}
          <rect x={480} y={420} width={120} height={20} fill="#a16207" stroke={colors.ink[900]} strokeWidth={1.5} />
          <line x1={490} y1={440} x2={490} y2={490} stroke={colors.ink[700]} strokeWidth={2} />
          <line x1={590} y1={440} x2={590} y2={490} stroke={colors.ink[700]} strokeWidth={2} />
          <text x={540} y={460} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>workbench</text>

          {/* Car (simplified) */}
          <g transform="translate(700,420)">
            <rect x={0} y={0} width={140} height={30} rx={8} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.ink[900]} strokeWidth={1.5} />
            <rect x={20} y={-18} width={100} height={20} rx={6} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.ink[900]} strokeWidth={1.5} />
            <circle cx={28} cy={32} r={10} fill={colors.ink[900]} />
            <circle cx={112} cy={32} r={10} fill={colors.ink[900]} />
            <circle cx={28} cy={32} r={4} fill={colors.surface.subtle} />
            <circle cx={112} cy={32} r={4} fill={colors.surface.subtle} />
          </g>

          {/* Garage door (partially open visible from inside) */}
          <g transform="translate(450,200)">
            <line x1={0} y1={0} x2={0} y2={290} stroke={colors.ink[700]} strokeWidth={2} />
            <text x={-8} y={150} textAnchor="end" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>garage door</text>
          </g>
        </g>

        {/* Indoor mini-split head (mounted high on right wall, visible) */}
        <g transform="translate(880,250)">
          <rect width={100} height={40} rx={6} fill={colors.surface.canvas} stroke={colors.ink[900]} strokeWidth={2} />
          {/* Louvers */}
          <line x1={10} y1={28} x2={90} y2={28} stroke={colors.ink[500]} strokeWidth={1.5} />
          <line x1={10} y1={32} x2={90} y2={32} stroke={colors.ink[500]} strokeWidth={1.5} />
          {/* Brand logo placeholder */}
          <text x={50} y={20} textAnchor="middle" fontFamily={FONT} fontSize={8} fill={colors.ink[500]}>indoor head</text>

          {/* Cold air flow arrows */}
          <g>
            <path d="M 25 40 Q 20 60 25 80" stroke={colors.brand.primary} strokeWidth={2} fill="none" />
            <path d="M 50 40 Q 50 60 50 80" stroke={colors.brand.primary} strokeWidth={2} fill="none" />
            <path d="M 75 40 Q 80 60 75 80" stroke={colors.brand.primary} strokeWidth={2} fill="none" />
          </g>

          {/* Callout */}
          <line x1={50} y1={-10} x2={50} y2={-30} stroke={colors.ink[500]} strokeWidth={1} />
          <text x={50} y={-38} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            indoor head
          </text>
        </g>

        {/* Line set through wall */}
        <g>
          <line x1={985} y1={290} x2={1010} y2={290} stroke={colors.ink[900]} strokeWidth={4} />
          <rect x={985} y={285} width={25} height={10} fill={colors.warn} fillOpacity={0.3} stroke={colors.warn} strokeWidth={1} />
          <text x={1000} y={310} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
            wall sleeve
          </text>
        </g>

        {/* Outdoor condenser */}
        <g transform="translate(1060,360)">
          <rect width={90} height={100} rx={4} fill={colors.surface.subtle} stroke={colors.ink[900]} strokeWidth={2} />
          {/* Fan grille circle */}
          <circle cx={45} cy={50} r={30} fill="none" stroke={colors.ink[700]} strokeWidth={1.5} />
          {/* Fan blade indication */}
          <line x1={45} y1={20} x2={45} y2={80} stroke={colors.ink[500]} strokeWidth={1} />
          <line x1={15} y1={50} x2={75} y2={50} stroke={colors.ink[500]} strokeWidth={1} />
          <line x1={24} y1={29} x2={66} y2={71} stroke={colors.ink[500]} strokeWidth={1} />
          <line x1={66} y1={29} x2={24} y2={71} stroke={colors.ink[500]} strokeWidth={1} />

          {/* Connect to line set */}
          <line x1={20} y1={-30} x2={20} y2={0} stroke={colors.ink[900]} strokeWidth={3} />
          <line x1={20} y1={-30} x2={-50} y2={-30} stroke={colors.ink[900]} strokeWidth={3} />
          <line x1={-50} y1={-30} x2={-50} y2={-70} stroke={colors.ink[900]} strokeWidth={3} />

          {/* Label */}
          <text x={45} y={-90} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            outdoor condenser
          </text>
        </g>

        {/* Drain line */}
        <g>
          <line x1={980} y1={295} x2={980} y2={460} stroke={colors.brand.accent} strokeWidth={2} strokeDasharray="3,2" />
          <text x={985} y={400} fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.brand.accent}>
            drain line
          </text>
        </g>

        {/* Indoor temperature reading */}
        <g transform="translate(540,250)">
          <rect width={70} height={40} rx={4} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
          <text x={35} y={18} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
            indoor
          </text>
          <text x={35} y={32} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.good}>
            72°F
          </text>
        </g>

        {/* Outside temperature */}
        <g transform="translate(1080,140)">
          <rect width={70} height={40} rx={4} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
          <text x={35} y={18} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[500]}>
            outdoor
          </text>
          <text x={35} y={32} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.danger}>
            95°F
          </text>
        </g>

        <text x={600} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Outdoor condenser on exterior wall, refrigerant line set through the wall, indoor head mounted high.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Mini splits provide both heating and cooling from a single unit, install without ducts, and condition the garage to setpoint quickly.
      </figcaption>
    </figure>
  );
}
