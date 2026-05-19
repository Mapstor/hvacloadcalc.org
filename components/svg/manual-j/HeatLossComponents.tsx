import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function HeatLossComponents({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="heat-loss-components-title"
        descId="heat-loss-components-desc"
        title="Heat loss paths through a residential envelope"
        desc="Cross-section of a two-story house in winter showing heat loss paths: ceiling and roof losses 20-25 percent, exterior wall losses 15-25 percent, window losses 15-25 percent, foundation losses 10-15 percent, and air infiltration losses 20-30 percent of total. Each path is labeled with an arrow showing heat flowing out of the home."
        className="w-full"
      >
        <defs>
          <marker id="heat-arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.warn} />
          </marker>
          <marker id="heat-arrow-large" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.danger} />
          </marker>
        </defs>
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        {/* House outline (cross-section) */}
        <g>
          {/* Roof */}
          <polygon points="200,140 500,40 800,140 200,140" fill={colors.surface.subtle} stroke={colors.ink[700]} strokeWidth={2} />
          {/* Attic floor (ceiling) */}
          <line x1={200} y1={140} x2={800} y2={140} stroke={colors.ink[700]} strokeWidth={2} />
          {/* Walls */}
          <line x1={200} y1={140} x2={200} y2={490} stroke={colors.ink[700]} strokeWidth={2} />
          <line x1={800} y1={140} x2={800} y2={490} stroke={colors.ink[700]} strokeWidth={2} />
          {/* Floor between 1st and 2nd story */}
          <line x1={200} y1={310} x2={800} y2={310} stroke={colors.ink[500]} strokeWidth={1.5} strokeDasharray="4,3" />
          {/* Ground level */}
          <line x1={200} y1={490} x2={800} y2={490} stroke={colors.ink[700]} strokeWidth={2} />
          {/* Foundation */}
          <line x1={200} y1={490} x2={200} y2={560} stroke={colors.ink[700]} strokeWidth={2} />
          <line x1={800} y1={490} x2={800} y2={560} stroke={colors.ink[700]} strokeWidth={2} />
          <line x1={200} y1={560} x2={800} y2={560} stroke={colors.ink[700]} strokeWidth={2} />

          {/* Windows */}
          <rect x={260} y={180} width={60} height={70} fill={colors.brand.accent} fillOpacity={0.25} stroke={colors.ink[700]} strokeWidth={1.2} />
          <rect x={460} y={180} width={60} height={70} fill={colors.brand.accent} fillOpacity={0.25} stroke={colors.ink[700]} strokeWidth={1.2} />
          <rect x={660} y={180} width={60} height={70} fill={colors.brand.accent} fillOpacity={0.25} stroke={colors.ink[700]} strokeWidth={1.2} />

          <rect x={260} y={360} width={60} height={70} fill={colors.brand.accent} fillOpacity={0.25} stroke={colors.ink[700]} strokeWidth={1.2} />
          <rect x={660} y={360} width={60} height={70} fill={colors.brand.accent} fillOpacity={0.25} stroke={colors.ink[700]} strokeWidth={1.2} />
        </g>

        {/* Cold outside indicator */}
        <text x={60} y={60} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.brand.primary}>Outside: 20°F</text>
        <text x={870} y={60} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>Inside: 70°F</text>

        {/* Heat loss arrows */}
        {/* Ceiling - up through roof */}
        <line x1={500} y1={130} x2={500} y2={60} stroke={colors.danger} strokeWidth={3.5} markerEnd="url(#heat-arrow-large)" />
        <text x={520} y={90} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.danger}>Ceiling/roof: 20–25%</text>

        {/* Walls */}
        <line x1={190} y1={250} x2={130} y2={250} stroke={colors.warn} strokeWidth={2.5} markerEnd="url(#heat-arrow)" />
        <text x={120} y={245} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.warn}>Walls: 15–25%</text>
        <line x1={810} y1={250} x2={870} y2={250} stroke={colors.warn} strokeWidth={2.5} markerEnd="url(#heat-arrow)" />
        <text x={880} y={245} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.warn}>Walls: 15–25%</text>

        {/* Windows */}
        <line x1={190} y1={400} x2={130} y2={400} stroke={colors.warn} strokeWidth={2.5} markerEnd="url(#heat-arrow)" />
        <text x={120} y={395} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.warn}>Windows: 15–25%</text>
        <line x1={810} y1={400} x2={870} y2={400} stroke={colors.warn} strokeWidth={2.5} markerEnd="url(#heat-arrow)" />
        <text x={880} y={395} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.warn}>Windows: 15–25%</text>

        {/* Foundation */}
        <line x1={400} y1={530} x2={400} y2={580} stroke={colors.info} strokeWidth={2.5} markerEnd="url(#heat-arrow)" />
        <text x={420} y={550} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.label} fill={colors.info}>Foundation: 10–15%</text>

        {/* Infiltration (swirling arrows at corners) */}
        <text x={500} y={580} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>+ Infiltration through cracks, around penetrations: 20–30%</text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Typical heat loss distribution for an existing US home. Manual J calculates each path explicitly using the home&rsquo;s actual envelope.
      </figcaption>
    </figure>
  );
}
