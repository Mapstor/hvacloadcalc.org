import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Item {
  title: string;
  detail: string;
}

const DIY: Item[] = [
  { title: 'Change air filter', detail: 'Every 1-3 months per ENERGY STAR.' },
  { title: 'Clean outdoor condenser coil', detail: 'Annually. Garden hose, inside-out, low pressure.' },
  { title: 'Check thermostat batteries', detail: 'Annually or when display dims.' },
  { title: 'Verify outdoor unit clearance', detail: '24 inches on all sides. Anytime.' },
];

const PRO: Item[] = [
  { title: 'Refrigerant work', detail: 'EPA Section 608 certification federally required.' },
  { title: 'Frozen coil if filter is clean', detail: 'Likely refrigerant or airflow problem.' },
  { title: 'Electrical components', detail: 'Capacitor, contactor, control board.' },
  { title: 'Short cycling after DIY fixes', detail: 'System-level cause needs a technician.' },
];

const COL_WIDTH = 440;
const COL_GAP = 40;
const COL_LEFT_X = 30;
const COL_RIGHT_X = COL_LEFT_X + COL_WIDTH + COL_GAP;
const HEADER_HEIGHT = 60;
const ROW_HEIGHT = 80;
const ROW_TOP = 110;

interface ColumnProps {
  x: number;
  title: string;
  color: string;
  items: Item[];
  iconType: 'check' | 'warn';
}

function Column({ x, title, color, items, iconType }: ColumnProps) {
  return (
    <g transform={`translate(${x},30)`}>
      <rect width={COL_WIDTH} height={HEADER_HEIGHT} rx={6} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      <text x={COL_WIDTH / 2} y={HEADER_HEIGHT / 2 + 8} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={color}>
        {title}
      </text>

      {items.map((item, i) => {
        const y = HEADER_HEIGHT + 20 + i * ROW_HEIGHT;
        return (
          <g key={item.title} transform={`translate(0,${y})`}>
            <rect width={COL_WIDTH} height={ROW_HEIGHT - 12} rx={5} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />
            <circle cx={28} cy={(ROW_HEIGHT - 12) / 2} r={14} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
            {iconType === 'check' ? (
              <path
                d={`M ${22} ${(ROW_HEIGHT - 12) / 2 + 1} L ${27} ${(ROW_HEIGHT - 12) / 2 + 6} L ${36} ${(ROW_HEIGHT - 12) / 2 - 4}`}
                stroke={color}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <g>
                <line x1={28} y1={(ROW_HEIGHT - 12) / 2 - 6} x2={28} y2={(ROW_HEIGHT - 12) / 2 + 2} stroke={color} strokeWidth={2.5} strokeLinecap="round" />
                <circle cx={28} cy={(ROW_HEIGHT - 12) / 2 + 7} r={1.5} fill={color} />
              </g>
            )}
            <text x={56} y={(ROW_HEIGHT - 12) / 2 - 4} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              {item.title}
            </text>
            <text x={56} y={(ROW_HEIGHT - 12) / 2 + 16} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
              {item.detail}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ShortCyclingDiyVsPro({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 580"
        titleId="short-cycling-diy-vs-pro-title"
        descId="short-cycling-diy-vs-pro-desc"
        title="DIY versus professional fixes for AC short cycling"
        desc="Two-column decision matrix. The left column titled DIY in green lists four homeowner-friendly fixes: change air filter every 1 to 3 months, clean outdoor condenser coil annually, check thermostat batteries, verify outdoor unit clearance. The right column titled Call a Pro in red lists four scenarios requiring a professional: refrigerant work which requires EPA Section 608 certification by federal law, frozen evaporator coil when the filter is clean, electrical component replacement including capacitor and contactor and control board, and short cycling that returns after DIY fixes."
        className="w-full"
      >
        <rect width={1000} height={580} fill={colors.surface.canvas} />

        <Column x={COL_LEFT_X} title="DIY" color={colors.good} items={DIY} iconType="check" />
        <Column x={COL_RIGHT_X} title="Call a Pro" color={colors.danger} items={PRO} iconType="warn" />

        <rect x={30} y={ROW_TOP + 4 * ROW_HEIGHT + 20} width={1000 - 60} height={60} rx={6} fill={colors.warn} fillOpacity={0.15} stroke={colors.warn} strokeWidth={1.5} />
        <text x={500} y={ROW_TOP + 4 * ROW_HEIGHT + 47} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.warn}>
          Refrigerant work is federally regulated. EPA Section 608 certification is required.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        DIY first on the maintenance items. Call a technician for anything refrigerant-related or repeating after a DIY fix.
      </figcaption>
    </figure>
  );
}
