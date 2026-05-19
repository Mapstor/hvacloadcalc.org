import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  variant: 'question' | 'required' | 'recommended' | 'optional';
}

const VARIANTS = {
  question: { fill: colors.surface.subtle, stroke: colors.ink[700], textColor: colors.ink[900] },
  required: { fill: colors.danger, stroke: colors.danger, textColor: colors.danger },
  recommended: { fill: colors.good, stroke: colors.good, textColor: colors.good },
  optional: { fill: colors.info, stroke: colors.info, textColor: colors.info },
};

function Node({ x, y, w, h, text, variant }: NodeProps) {
  const v = VARIANTS[variant];
  const lines = text.split('\n');
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={6}
        fill={v.fill}
        fillOpacity={variant === 'question' ? 1 : 0.18}
        stroke={v.stroke}
        strokeWidth={variant === 'question' ? 1.5 : 2}
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={y + h / 2 - ((lines.length - 1) * 8) + i * 16}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={typography.size.legend}
          fontWeight={variant === 'question' ? typography.weight.body : typography.weight.title}
          fill={v.textColor}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Edge({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.ink[500]} strokeWidth={1.5} markerEnd="url(#tree-arrow)" />
      {label ? (
        <text
          x={(x1 + x2) / 2 + 8}
          y={(y1 + y2) / 2}
          fontFamily={FONT}
          fontSize={11}
          fontStyle="italic"
          fill={colors.ink[700]}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export function WhenYouNeedManualJDecision({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="when-you-need-manual-j-decision-title"
        descId="when-you-need-manual-j-decision-desc"
        title="Decision tree for when a Manual J load calculation is required"
        desc="Decision tree starting from the top question: Are you replacing or installing HVAC. Three branches. Branch one same-size like-for-like replacement leads to a recommendation that Manual J is optional but recommended to confirm the existing size was correct. Branch two new install or changing capacity splits into two sub-branches: pulling a mechanical permit makes Manual J required by IECC R403, while DIY or no permit makes it strongly recommended for cost and comfort. Branch three renovation affecting loads leads to Manual J recommended because an addition or window change shifts loads significantly."
        className="w-full"
      >
        <defs>
          <marker id="tree-arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.ink[500]} />
          </marker>
        </defs>
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        {/* Root question */}
        <Node x={310} y={30} w={380} h={60} text={'Are you replacing or installing HVAC?'} variant="question" />

        {/* Three branches */}
        <Edge x1={400} y1={90} x2={180} y2={170} label="Same-size replace" />
        <Edge x1={500} y1={90} x2={500} y2={170} label="New install / capacity change" />
        <Edge x1={600} y1={90} x2={820} y2={170} label="Renovation shifting loads" />

        {/* Left branch: same-size replacement */}
        <Node
          x={40}
          y={170}
          w={280}
          h={80}
          text={'Manual J optional\n(but recommended to verify\nexisting size was correct)'}
          variant="optional"
        />

        {/* Middle branch: new install / capacity change → sub-question */}
        <Node x={350} y={170} w={300} h={60} text={'Pulling a mechanical permit?'} variant="question" />
        <Edge x1={420} y1={230} x2={300} y2={330} label="Yes" />
        <Edge x1={580} y1={230} x2={680} y2={330} label="No / DIY" />

        <Node
          x={140}
          y={330}
          w={320}
          h={80}
          text={'REQUIRED by IECC R403\n(submit calculation\nwith permit)'}
          variant="required"
        />
        <Node
          x={520}
          y={330}
          w={320}
          h={80}
          text={'Strongly recommended\n(for cost, comfort,\nequipment life)'}
          variant="recommended"
        />

        {/* Right branch: renovation */}
        <Node
          x={680}
          y={170}
          w={280}
          h={80}
          text={'Manual J recommended\n(window change, addition,\nair sealing shifts loads)'}
          variant="recommended"
        />

        {/* Bottom: legend */}
        <g transform="translate(80,540)">
          <text x={0} y={0} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>Outcome key:</text>
          <g transform="translate(0,15)">
            <rect x={0} y={5} width={16} height={12} fill={colors.danger} fillOpacity={0.18} stroke={colors.danger} strokeWidth={1.5} rx={2} />
            <text x={24} y={15} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>REQUIRED by code</text>
            <rect x={200} y={5} width={16} height={12} fill={colors.good} fillOpacity={0.18} stroke={colors.good} strokeWidth={1.5} rx={2} />
            <text x={224} y={15} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Strongly recommended</text>
            <rect x={430} y={5} width={16} height={12} fill={colors.info} fillOpacity={0.18} stroke={colors.info} strokeWidth={1.5} rx={2} />
            <text x={454} y={15} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>Optional but useful</text>
          </g>
        </g>

        <text x={500} y={655} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Check your local building department for the exact permit submission requirement; jurisdictions vary in enforcement.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        IECC R403 is the code basis for the required path; jurisdictions vary in how strictly they enforce documentation.
      </figcaption>
    </figure>
  );
}
