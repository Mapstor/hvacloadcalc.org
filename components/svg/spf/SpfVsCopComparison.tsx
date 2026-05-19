import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

export function SpfVsCopComparison({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="spf-vs-cop-comparison-title"
        descId="spf-vs-cop-comparison-desc"
        title="COP versus SPF — snapshot versus film"
        desc="Two-panel comparison. Left panel shows COP as a single instantaneous measurement at 47 degrees Fahrenheit with a ratio of 3.5. Right panel shows SPF as a season-weighted average across 5 months, with monthly COP values varying from 4.0 to 2.0 and a weighted average of 2.8. The right panel notes that SPF includes aux heat, defrost, and part-load operation under real conditions."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        {/* Left panel: COP */}
        <g transform="translate(40,40)">
          <rect width={440} height={520} rx={8} fill={colors.brand.primary} fillOpacity={0.05} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={220} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>COP</text>
          <text x={220} y={60} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fill={colors.ink[700]}>Point-in-time efficiency</text>

          {/* Thermometer */}
          <g transform="translate(180,100)">
            <rect x={32} y={0} width={16} height={120} rx={8} fill={colors.surface.canvas} stroke={colors.ink[700]} strokeWidth={1.5} />
            <rect x={32} y={60} width={16} height={60} fill={colors.brand.primary} />
            <circle cx={40} cy={130} r={20} fill={colors.brand.primary} stroke={colors.ink[700]} strokeWidth={1.5} />
            <text x={90} y={75} fontFamily={FONT} fontSize={20} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>47°F</text>
          </g>

          {/* COP value */}
          <g transform="translate(120,300)">
            <rect width={200} height={120} rx={8} fill={colors.surface.canvas} stroke={colors.brand.primary} strokeWidth={2} />
            <text x={100} y={50} textAnchor="middle" fontFamily={FONT} fontSize={48} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>3.5</text>
            <text x={100} y={85} textAnchor="middle" fontFamily={FONT} fontSize={13} fill={colors.ink[700]}>COP at 47°F</text>
          </g>
          <text x={220} y={460} textAnchor="middle" fontFamily={FONT} fontSize={13} fontStyle="italic" fill={colors.ink[500]}>Single test point, ideal conditions</text>
          <text x={220} y={485} textAnchor="middle" fontFamily={FONT} fontSize={13} fontStyle="italic" fill={colors.ink[500]}>No aux heat, no defrost</text>
        </g>

        {/* Right panel: SPF */}
        <g transform="translate(520,40)">
          <rect width={440} height={520} rx={8} fill={colors.warn} fillOpacity={0.05} stroke={colors.warn} strokeWidth={1.5} />
          <text x={220} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.warn}>SPF</text>
          <text x={220} y={60} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fill={colors.ink[700]}>Season-averaged efficiency</text>

          {/* Monthly bars */}
          {[
            { month: 'Oct', cop: 4.0 },
            { month: 'Nov', cop: 3.5 },
            { month: 'Dec', cop: 3.0 },
            { month: 'Jan', cop: 2.5 },
            { month: 'Feb', cop: 2.0 },
            { month: 'Mar', cop: 3.0 },
          ].map((m, i) => {
            const x = 40 + i * 60;
            const height = m.cop * 40;
            const y = 280 - height;
            return (
              <g key={m.month}>
                <rect x={x} y={y} width={45} height={height} fill={colors.warn} fillOpacity={0.8} rx={4} />
                <text x={x + 22} y={295} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>{m.month}</text>
                <text x={x + 22} y={y - 6} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.label} fill={colors.warn}>{m.cop.toFixed(1)}</text>
              </g>
            );
          })}

          {/* Average line */}
          <line x1={40} y1={280 - 2.8 * 40} x2={400} y2={280 - 2.8 * 40} stroke={colors.danger} strokeWidth={2} strokeDasharray="6,3" />
          <text x={400} y={280 - 2.8 * 40 - 6} textAnchor="end" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.danger}>weighted avg</text>

          {/* SPF value */}
          <g transform="translate(120,330)">
            <rect width={200} height={80} rx={8} fill={colors.surface.canvas} stroke={colors.warn} strokeWidth={2} />
            <text x={100} y={50} textAnchor="middle" fontFamily={FONT} fontSize={36} fontWeight={typography.weight.title} fill={colors.warn}>SPF 2.8</text>
          </g>
          <text x={220} y={440} textAnchor="middle" fontFamily={FONT} fontSize={13} fontStyle="italic" fill={colors.ink[500]}>Includes aux heat, defrost,</text>
          <text x={220} y={460} textAnchor="middle" fontFamily={FONT} fontSize={13} fontStyle="italic" fill={colors.ink[500]}>part-load, real conditions</text>
          <text x={220} y={485} textAnchor="middle" fontFamily={FONT} fontSize={13} fontStyle="italic" fill={colors.ink[500]}>Hours weighted by actual occurrence</text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        COP is a snapshot. SPF is a film.
      </figcaption>
    </figure>
  );
}
