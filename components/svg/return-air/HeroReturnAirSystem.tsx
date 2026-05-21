import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function HeroReturnAirSystem({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 600"
        titleId="hero-return-air-system-title"
        descId="hero-return-air-system-desc"
        title="Two residential return air strategies: central return vs distributed returns"
        desc="Cross-section of a house showing a complete return air system. Indoor air handler in the center of the house with supply ducts in red distributing air to rooms with small fan icons at supply registers, and return ducts in blue with arrows showing air being drawn back to the air handler. Two return air strategies shown side by side. Left side shows central return: a single large return grille in the hallway ceiling connected by a large blue duct to the air handler. Right side shows distributed returns: smaller return grilles in each bedroom with individual ducts. Components labeled: filter rack, return grille, trunk, take-offs, plenum. The return air path completes the HVAC circuit; undersized returns hurt everything else in the system."
        className="w-full"
      >
        <defs>
          <marker id="supply-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={colors.danger} />
          </marker>
          <marker id="return-arrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={colors.brand.primary} />
          </marker>
        </defs>

        <rect width={1200} height={600} fill={colors.surface.canvas} />

        <text x={600} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The return air path completes the HVAC circuit
        </text>

        {/* Left panel: Central return */}
        <g>
          <text x={285} y={70} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Central return
          </text>
          <text x={285} y={88} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            single grille in hallway ceiling
          </text>

          {/* House outline */}
          <path d="M 60 240 L 285 100 L 510 240 L 510 480 L 60 480 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2.5} />

          {/* Interior walls */}
          <line x1={170} y1={240} x2={170} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={400} y1={240} x2={400} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={60} y1={400} x2={510} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />

          {/* Rooms */}
          <text x={115} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>BR1</text>
          <text x={285} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>Hallway</text>
          <text x={455} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>BR2</text>
          <text x={285} y={440} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>Living + Air handler</text>

          {/* Air handler */}
          <rect x={255} y={420} width={60} height={50} fill={colors.surface.subtle} stroke={colors.ink[900]} strokeWidth={2} />
          <text x={285} y={448} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            AHU
          </text>

          {/* Supply ducts (red) */}
          <g stroke={colors.danger} fill="none" strokeWidth={3}>
            <line x1={285} y1={420} x2={285} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={285} y1={400} x2={115} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={285} y1={400} x2={455} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={115} y1={400} x2={115} y2={290} markerEnd="url(#supply-arrow)" />
            <line x1={455} y1={400} x2={455} y2={290} markerEnd="url(#supply-arrow)" />
          </g>
          <text x={115} y={285} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.danger}>↓ supply</text>
          <text x={455} y={285} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.danger}>↓ supply</text>

          {/* Central return - one large grille */}
          <rect x={250} y={240} width={70} height={16} fill={colors.brand.primary} fillOpacity={0.35} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={285} y={272} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            return grille (20×25)
          </text>

          {/* Return duct */}
          <g stroke={colors.brand.primary} fill="none" strokeWidth={4}>
            <line x1={285} y1={256} x2={285} y2={400} />
            <line x1={285} y1={400} x2={285} y2={420} markerEnd="url(#return-arrow)" />
          </g>

          {/* Closed door problem */}
          <g transform="translate(180,300)">
            <rect width={4} height={20} fill={colors.ink[900]} />
            <text x={8} y={14} fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.danger}>closed door = trapped air</text>
          </g>
        </g>

        {/* Divider */}
        <line x1={600} y1={100} x2={600} y2={500} stroke={colors.ink[300]} strokeWidth={1} strokeDasharray="6,4" />

        {/* Right panel: Distributed returns */}
        <g>
          <text x={915} y={70} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Distributed returns
          </text>
          <text x={915} y={88} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            individual grille per room
          </text>

          {/* House outline */}
          <path d="M 690 240 L 915 100 L 1140 240 L 1140 480 L 690 480 Z" fill="none" stroke={colors.ink[700]} strokeWidth={2.5} />

          {/* Interior walls */}
          <line x1={800} y1={240} x2={800} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={1030} y1={240} x2={1030} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />
          <line x1={690} y1={400} x2={1140} y2={400} stroke={colors.ink[700]} strokeWidth={1.5} />

          {/* Rooms */}
          <text x={745} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>BR1</text>
          <text x={915} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>Hallway</text>
          <text x={1085} y={325} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>BR2</text>
          <text x={915} y={440} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>Living + Air handler</text>

          {/* Air handler */}
          <rect x={885} y={420} width={60} height={50} fill={colors.surface.subtle} stroke={colors.ink[900]} strokeWidth={2} />
          <text x={915} y={448} textAnchor="middle" fontFamily={FONT} fontSize={10} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            AHU
          </text>

          {/* Supply ducts */}
          <g stroke={colors.danger} fill="none" strokeWidth={3}>
            <line x1={915} y1={420} x2={915} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={915} y1={400} x2={745} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={915} y1={400} x2={1085} y2={400} markerEnd="url(#supply-arrow)" />
            <line x1={745} y1={400} x2={745} y2={290} markerEnd="url(#supply-arrow)" />
            <line x1={1085} y1={400} x2={1085} y2={290} markerEnd="url(#supply-arrow)" />
          </g>

          {/* Distributed return grilles - one per bedroom + one in hallway */}
          <g>
            {/* BR1 return */}
            <rect x={725} y={240} width={40} height={12} fill={colors.brand.primary} fillOpacity={0.4} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={745} y={268} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>R-BR1</text>

            {/* Hallway return */}
            <rect x={895} y={240} width={40} height={12} fill={colors.brand.primary} fillOpacity={0.4} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={915} y={268} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>R-Hall</text>

            {/* BR2 return */}
            <rect x={1065} y={240} width={40} height={12} fill={colors.brand.primary} fillOpacity={0.4} stroke={colors.brand.primary} strokeWidth={1.5} />
            <text x={1085} y={268} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.brand.primaryDark}>R-BR2</text>
          </g>

          {/* Return ducts - distributed converging to AHU */}
          <g stroke={colors.brand.primary} fill="none" strokeWidth={3}>
            <line x1={745} y1={252} x2={745} y2={380} />
            <line x1={1085} y1={252} x2={1085} y2={380} />
            <line x1={915} y1={252} x2={915} y2={380} />
            <line x1={745} y1={380} x2={1085} y2={380} />
            <line x1={915} y1={380} x2={915} y2={420} markerEnd="url(#return-arrow)" />
          </g>

          <text x={915} y={395} textAnchor="middle" fontFamily={FONT} fontSize={9} fontStyle="italic" fill={colors.brand.primaryDark}>
            return trunk
          </text>
        </g>

        <text x={600} y={550} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Central return + closed bedroom doors = pressure imbalance. Distributed returns = each room has its own path back to the air handler.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The return air path is the other half of the HVAC circuit. Most field-installed problems start with returns that are too small for the system they serve.
      </figcaption>
    </figure>
  );
}
