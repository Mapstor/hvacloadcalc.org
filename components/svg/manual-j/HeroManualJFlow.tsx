import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  items: string[];
  variant: 'input' | 'compute' | 'output' | 'next';
}

const VARIANT_COLORS = {
  input: { stroke: colors.brand.primary, fill: colors.brand.primary, label: colors.brand.primaryDark },
  compute: { stroke: colors.warn, fill: colors.warn, label: colors.warn },
  output: { stroke: colors.good, fill: colors.good, label: colors.good },
  next: { stroke: colors.ink[500], fill: colors.ink[500], label: colors.ink[500] },
};

function Panel({ x, title, items, variant }: PanelProps) {
  const v = VARIANT_COLORS[variant];
  return (
    <g transform={`translate(${x},80)`}>
      <rect
        width={200}
        height={340}
        rx={8}
        fill={v.fill}
        fillOpacity={variant === 'compute' ? 0.12 : 0.08}
        stroke={v.stroke}
        strokeWidth={variant === 'compute' ? 2.5 : 1.5}
        strokeDasharray={variant === 'next' ? '6,4' : undefined}
      />
      <text x={100} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={v.label}>
        {title}
      </text>
      {items.map((item, i) => (
        <text
          key={i}
          x={20}
          y={70 + i * 28}
          fontFamily={FONT}
          fontSize={typography.size.legend}
          fill={colors.ink[700]}
        >
          • {item}
        </text>
      ))}
    </g>
  );
}

function Arrow({ x }: { x: number }) {
  return (
    <line
      x1={x}
      y1={250}
      x2={x + 30}
      y2={250}
      stroke={colors.ink[700]}
      strokeWidth={2.5}
      markerEnd="url(#mjflow-arrow)"
    />
  );
}

export function HeroManualJFlow({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1200 500"
        titleId="hero-manual-j-flow-title"
        descId="hero-manual-j-flow-desc"
        title="Manual J inputs, calculation, and outputs"
        desc="Horizontal flow diagram showing the Manual J process from home characteristics and climate inputs through the load calculation to heating and cooling load outputs in BTU per hour, which feed Manual S equipment selection as the next step."
        className="w-full"
      >
        <defs>
          <marker id="mjflow-arrow" viewBox="0 0 10 10" refX={5} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.ink[700]} />
          </marker>
        </defs>
        <rect width={1200} height={500} fill={colors.surface.canvas} />

        <text x={600} y={40} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Manual J: from home + climate to required capacity
        </text>

        <Panel
          x={20}
          title="Home characteristics"
          items={['Square footage', 'Insulation R-values', 'Windows: U + SHGC', 'Infiltration rate', 'Orientation']}
          variant="input"
        />
        <Arrow x={220} />

        <Panel
          x={250}
          title="Climate conditions"
          items={['99% heating °F', '1% cooling °F', 'Daily range', 'Latitude / sun', 'Wet-bulb 1%']}
          variant="input"
        />
        <Arrow x={450} />

        <Panel
          x={480}
          title="Manual J calculation"
          items={['Q = U × A × ΔT', 'Per surface', 'Per orientation', '+ infiltration', '+ internal gains']}
          variant="compute"
        />
        <Arrow x={680} />

        <Panel
          x={710}
          title="Output loads (BTU/hr)"
          items={['Heating: 42,000', 'Cooling sensible:', '  21,000', 'Cooling latent:', '  7,000']}
          variant="output"
        />
        <Arrow x={910} />

        <Panel
          x={940}
          title="Manual S (next)"
          items={['Equipment selection', 'AHRI matchup', 'Sensible heat ratio', '+15% heating max', '+15-25% cool max']}
          variant="next"
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Manual J takes the home and climate and produces design heating and cooling loads. Manual S then selects equipment that matches those loads.
      </figcaption>
    </figure>
  );
}
