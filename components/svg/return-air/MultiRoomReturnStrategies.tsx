import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PlanProps {
  x: number;
  title: string;
  subtitle: string;
  status: 'bad' | 'ok' | 'best';
  description: string;
  showCentralReturn: boolean;
  showTransferGrilles: boolean;
  showDistributedReturns: boolean;
  showBlockedDoors: boolean;
}

function Plan({ x, title, subtitle, status, description, showCentralReturn, showTransferGrilles, showDistributedReturns, showBlockedDoors }: PlanProps) {
  const borderColor = status === 'bad' ? colors.danger : status === 'ok' ? colors.warn : colors.good;
  const badgeText = status === 'bad' ? 'PROBLEMATIC' : status === 'ok' ? 'BUDGET OPTION' : 'BEST';

  return (
    <g transform={`translate(${x},80)`}>
      <rect width={300} height={470} rx={10} fill={colors.surface.canvas} stroke={borderColor} strokeWidth={2} />

      <text x={150} y={32} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={150} y={50} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      <g transform="translate(80,58)">
        <rect width={140} height={20} rx={10} fill={borderColor} fillOpacity={0.18} stroke={borderColor} strokeWidth={1.2} />
        <text x={70} y={14} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={borderColor}>
          {badgeText}
        </text>
      </g>

      {/* Floor plan */}
      <g transform="translate(20,90)">
        {/* Outer walls */}
        <rect width={260} height={200} fill="none" stroke={colors.ink[700]} strokeWidth={2} />

        {/* Interior walls dividing into 4 spaces */}
        <line x1={130} y1={0} x2={130} y2={120} stroke={colors.ink[700]} strokeWidth={1.5} />
        <line x1={0} y1={120} x2={260} y2={120} stroke={colors.ink[700]} strokeWidth={1.5} />
        <line x1={130} y1={120} x2={130} y2={200} stroke={colors.ink[700]} strokeWidth={1.5} />

        {/* Room labels */}
        <text x={65} y={60} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[500]}>BR1</text>
        <text x={195} y={60} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[500]}>BR2</text>
        <text x={65} y={165} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[500]}>Living</text>
        <text x={195} y={165} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[500]}>Kitchen</text>

        {/* Door gaps */}
        <line x1={50} y1={120} x2={80} y2={120} stroke={colors.surface.canvas} strokeWidth={3} />
        <line x1={180} y1={120} x2={210} y2={120} stroke={colors.surface.canvas} strokeWidth={3} />

        {/* Closed doors (if applicable) */}
        {showBlockedDoors && (
          <>
            <rect x={50} y={117} width={30} height={6} fill={colors.danger} stroke={colors.ink[900]} strokeWidth={1} />
            <rect x={180} y={117} width={30} height={6} fill={colors.danger} stroke={colors.ink[900]} strokeWidth={1} />
          </>
        )}

        {/* Air handler in living room */}
        <rect x={50} y={170} width={30} height={20} fill={colors.surface.subtle} stroke={colors.ink[900]} strokeWidth={1.5} />
        <text x={65} y={184} textAnchor="middle" fontFamily={FONT} fontSize={8} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          AHU
        </text>

        {/* Central return */}
        {showCentralReturn && (
          <g>
            <rect x={50} y={155} width={30} height={6} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={120} y={158} fontFamily={FONT} fontSize={8} fontStyle="italic" fill={colors.brand.primaryDark}>
              one return
            </text>
          </g>
        )}

        {/* Transfer grilles */}
        {showTransferGrilles && (
          <g>
            {/* BR1 transfer grille */}
            <rect x={120} y={50} width={10} height={4} fill={colors.brand.accent} stroke={colors.brand.accent} strokeWidth={0.5} />
            <rect x={120} y={80} width={10} height={4} fill={colors.brand.accent} stroke={colors.brand.accent} strokeWidth={0.5} />
            {/* BR2 transfer grille */}
            <rect x={130} y={50} width={10} height={4} fill={colors.brand.accent} stroke={colors.brand.accent} strokeWidth={0.5} />
            <rect x={130} y={80} width={10} height={4} fill={colors.brand.accent} stroke={colors.brand.accent} strokeWidth={0.5} />
            {/* Air movement arrows */}
            <path d="M 100 65 L 120 65" stroke={colors.brand.accent} strokeWidth={1.5} markerEnd="url(#transfer-arrow)" />
            <path d="M 160 65 L 140 65" stroke={colors.brand.accent} strokeWidth={1.5} markerEnd="url(#transfer-arrow)" />
          </g>
        )}

        {/* Distributed returns */}
        {showDistributedReturns && (
          <g>
            <rect x={50} y={40} width={30} height={6} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.brand.primary} strokeWidth={1.5} />
            <rect x={180} y={40} width={30} height={6} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.brand.primary} strokeWidth={1.5} />
            <rect x={50} y={155} width={30} height={6} fill={colors.brand.primary} fillOpacity={0.5} stroke={colors.brand.primary} strokeWidth={1.5} />
          </g>
        )}

        {/* Blocked airflow indicators */}
        {showBlockedDoors && !showTransferGrilles && !showDistributedReturns && (
          <g>
            <text x={65} y={100} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.danger}>
              ⚠
            </text>
            <text x={195} y={100} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.danger}>
              ⚠
            </text>
          </g>
        )}
      </g>

      {/* Description */}
      <foreignObject x={20} y={310} width={260} height={150}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.5' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function MultiRoomReturnStrategies({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="multi-room-return-strategies-title"
        descId="multi-room-return-strategies-desc"
        title="Three return air strategies for multi-room homes"
        desc="Three side-by-side floor plans showing different return strategies for a typical home with two bedrooms and a living area. Plan 1 single central return only: one large return in hallway ceiling, closed bedroom doors block airflow with warning indicators showing trapped pressure. Plan 2 central return plus transfer grilles: same central return plus high-low transfer grilles on bedroom door walls, good airflow with doors closed. Plan 3 distributed returns per room: individual return grilles in each bedroom and one in the living area, each with its own duct path. Distributed returns are best for comfort and ventilation. Transfer grilles are a budget alternative. Single central return with closed-door bedrooms creates pressure imbalances."
        className="w-full"
      >
        <defs>
          <marker id="transfer-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={colors.brand.accent} />
          </marker>
        </defs>

        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Three return strategies for closed-door bedrooms
        </text>

        <Plan
          x={30}
          title="Single central return"
          subtitle="closed bedroom doors"
          status="bad"
          showCentralReturn={true}
          showTransferGrilles={false}
          showDistributedReturns={false}
          showBlockedDoors={true}
          description="Central return in hallway. Closed bedroom doors trap supply air in the bedrooms; air can't get back to the return without going under the door (small gap, low CFM)."
        />

        <Plan
          x={350}
          title="Central + transfer grilles"
          subtitle="budget retrofit option"
          status="ok"
          showCentralReturn={true}
          showTransferGrilles={true}
          showDistributedReturns={false}
          showBlockedDoors={true}
          description="Central return plus high/low transfer grilles on bedroom walls. Bedrooms vent to hallway through the transfer grilles. Cheaper than distributed returns; slightly less efficient at mixing."
        />

        <Plan
          x={670}
          title="Distributed per-room"
          subtitle="best comfort and mixing"
          status="best"
          showCentralReturn={false}
          showTransferGrilles={false}
          showDistributedReturns={true}
          showBlockedDoors={true}
          description="Individual return grilles in each bedroom plus the living area. Each room has its own dedicated return path. Best comfort and air mixing; more ductwork and slightly higher install cost."
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Single central return + closed bedroom doors = pressure imbalance. Transfer grilles or distributed returns fix the problem.
      </figcaption>
    </figure>
  );
}
