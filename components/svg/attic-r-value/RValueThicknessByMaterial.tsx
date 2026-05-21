import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Material {
  name: string;
  thicknessInches: number;
  rPerInch: number;
  color: string;
  note: string;
}

const MATERIALS: Material[] = [
  { name: 'Fiberglass batt', thicknessInches: 10.5, rPerInch: 3.6, color: '#fda4af', note: 'Pre-cut, between joists' },
  { name: 'Loose-fill fiberglass', thicknessInches: 16.5, rPerInch: 2.3, color: '#bae6fd', note: 'Blown, may settle' },
  { name: 'Loose-fill cellulose', thicknessInches: 10.5, rPerInch: 3.6, color: '#a16207', note: 'Blown, dense' },
  { name: 'Open-cell spray foam', thicknessInches: 10.5, rPerInch: 3.6, color: '#fdba74', note: 'Sprayed, also air-seals' },
  { name: 'Closed-cell spray foam', thicknessInches: 5.8, rPerInch: 6.5, color: '#c2410c', note: 'Higher R/in, pricier' },
  { name: 'Mineral wool batt', thicknessInches: 10.5, rPerInch: 3.6, color: '#94a3b8', note: 'Denser than fiberglass' },
  { name: 'Polyiso rigid board', thicknessInches: 5.8, rPerInch: 6.5, color: '#facc15', note: 'For rafter / cathedral' },
];

const X_LABEL = 240;
const X_BAR_START = 260;
const X_BAR_END = 760;
const MAX_THICKNESS = 18;
const Y_TOP = 110;
const ROW_HEIGHT = 56;

function barWidth(inches: number): number {
  return (inches / MAX_THICKNESS) * (X_BAR_END - X_BAR_START);
}

export function RValueThicknessByMaterial({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 600"
        titleId="r-value-thickness-by-material-title"
        descId="r-value-thickness-by-material-desc"
        title="Thickness needed to reach R-38 for different insulation types"
        desc="Vertical bar chart comparing the thickness needed to reach R-38 for seven insulation types. Fiberglass batt 10.5 inches at R-3.6 per inch. Loose-fill fiberglass 16.5 inches at R-2.3 per inch the thickest required. Loose-fill cellulose 10.5 inches at R-3.6 per inch. Open-cell spray foam 10.5 inches at R-3.6 per inch and also air seals. Closed-cell spray foam only 5.8 inches at R-6.5 per inch the highest R per inch. Mineral wool batt 10.5 inches at R-3.6 per inch denser than fiberglass. Polyiso rigid board 5.8 inches at R-6.5 per inch typically used for rafter or cathedral applications."
        className="w-full"
      >
        <rect width={1000} height={600} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          How thick to reach R-38 by insulation type
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          All bars deliver the same R-value, but at very different depths
        </text>

        {/* X-axis scale */}
        <g>
          <line x1={X_BAR_START} y1={86} x2={X_BAR_END} y2={86} stroke={colors.ink[700]} strokeWidth={1.5} />
          {[0, 6, 12, 18].map((inch) => (
            <g key={inch}>
              <line x1={X_BAR_START + barWidth(inch)} y1={80} x2={X_BAR_START + barWidth(inch)} y2={92} stroke={colors.ink[700]} strokeWidth={1} />
              <text x={X_BAR_START + barWidth(inch)} y={76} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
                {inch}″
              </text>
            </g>
          ))}
        </g>

        {/* Rows */}
        {MATERIALS.map((m, i) => {
          const y = Y_TOP + i * ROW_HEIGHT;
          return (
            <g key={m.name}>
              {/* Material name */}
              <text x={X_LABEL} y={y + 14} textAnchor="end" fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {m.name}
              </text>
              <text x={X_LABEL} y={y + 30} textAnchor="end" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                R-{m.rPerInch}/in
              </text>

              {/* Bar */}
              <rect
                x={X_BAR_START}
                y={y}
                width={barWidth(m.thicknessInches)}
                height={32}
                fill={m.color}
                fillOpacity={0.8}
                stroke={m.color}
                strokeWidth={1.5}
              />

              {/* Thickness label on bar */}
              <text
                x={X_BAR_START + barWidth(m.thicknessInches) + 8}
                y={y + 20}
                fontFamily={FONT}
                fontSize={typography.size.legend}
                fontWeight={typography.weight.title}
                fill={colors.ink[900]}
              >
                {m.thicknessInches}″
              </text>

              {/* Note */}
              <text x={X_BAR_END + 70} y={y + 20} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
                {m.note}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text x={500} y={555} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          R-value adds linearly. Two R-19 batts stacked give R-38 (assuming no gaps).
        </text>
        <text x={500} y={575} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
          Closed-cell foam and polyiso use aged R-values; initial values are 10-15% higher.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Closed-cell spray foam and polyiso reach R-38 in roughly a third the depth of loose-fill fiberglass but cost much more per square foot.
      </figcaption>
    </figure>
  );
}
