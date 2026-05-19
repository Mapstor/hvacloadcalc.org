import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface RoomProps {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  load?: string;
  variant: 'block' | 'room';
}

function Room({ x, y, w, h, name, load, variant }: RoomProps) {
  const fill = variant === 'block' ? colors.surface.subtle : colors.brand.primary;
  const fillOpacity = variant === 'block' ? 1 : 0.12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} fillOpacity={fillOpacity} stroke={colors.ink[700]} strokeWidth={1.5} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.ink[900]}>
        {name}
      </text>
      {load ? (
        <text x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
          {load}
        </text>
      ) : null}
    </g>
  );
}

export function BlockVsRoomComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="block-vs-room-comparison-title"
        descId="block-vs-room-comparison-desc"
        title="Block load versus room-by-room load calculation"
        desc="Side-by-side comparison of two Manual J methodologies. The left panel labeled Block Load shows a four-room house floor plan with a single combined load number of 38,000 BTU per hour. The right panel labeled Room-by-Room shows the same floor plan but each room is labeled with its individual load: master bedroom 8,500, kitchen 12,000, living room 11,500, bedroom two 6,000, all totaling 38,000 BTU per hour. The caption notes that block load suffices for equipment sizing while room-by-room is required for duct design."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        {/* Left panel: Block Load */}
        <g transform="translate(40,40)">
          <text x={210} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>Block Load</text>
          <text x={210} y={44} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>One whole-house number</text>

          {/* Floor plan — 4 rooms */}
          <g transform="translate(0,60)">
            <Room x={0} y={0} w={210} h={130} name="Master BR" variant="block" />
            <Room x={210} y={0} w={210} h={130} name="Kitchen" variant="block" />
            <Room x={0} y={130} w={210} h={130} name="Living" variant="block" />
            <Room x={210} y={130} w={210} h={130} name="Bedroom 2" variant="block" />

            {/* Total overlay */}
            <rect x={120} y={100} width={180} height={60} rx={6} fill={colors.warn} fillOpacity={0.15} stroke={colors.warn} strokeWidth={2} />
            <text x={210} y={130} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.warn}>Total</text>
            <text x={210} y={150} textAnchor="middle" fontFamily={FONT} fontSize={18} fontWeight={typography.weight.title} fill={colors.warn}>38,000 BTU/hr</text>
          </g>
          <text x={210} y={360} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Suitable for: equipment sizing (Manual S)</text>
          <text x={210} y={384} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Not enough for: duct design</text>
        </g>

        {/* Right panel: Room-by-Room */}
        <g transform="translate(520,40)">
          <text x={210} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>Room-by-Room</text>
          <text x={210} y={44} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>One number per room</text>

          <g transform="translate(0,60)">
            <Room x={0} y={0} w={210} h={130} name="Master BR" load="8,500" variant="room" />
            <Room x={210} y={0} w={210} h={130} name="Kitchen" load="12,000" variant="room" />
            <Room x={0} y={130} w={210} h={130} name="Living" load="11,500" variant="room" />
            <Room x={210} y={130} w={210} h={130} name="Bedroom 2" load="6,000" variant="room" />
          </g>
          <text x={210} y={328} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.good}>
            Total: 38,000 BTU/hr
          </text>
          <text x={210} y={360} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Suitable for: equipment sizing AND</text>
          <text x={210} y={384} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>per-branch duct design (Manual D)</text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Block load tells you what equipment to buy. Room-by-room tells you how to deliver air.
      </figcaption>
    </figure>
  );
}
