import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface PanelProps {
  x: number;
  title: string;
  badge: string;
  badgeColor: string;
  pressure: number;
  pressureColor: string;
  description: string;
  bullets: string[];
}

function Panel({ x, title, badge, badgeColor, pressure, pressureColor, description, bullets }: PanelProps) {
  // Manometer dial: 0 to 1.5 in w.c.
  const cx = 220;
  const cy = 220;
  const r = 80;
  const startAngle = -135;
  const endAngle = 45;
  const ratio = Math.min(1, pressure / 1.5);
  const needleAngle = startAngle + ratio * (endAngle - startAngle);

  function polar(angle: number, radius: number): [number, number] {
    const rad = (angle * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  }

  const [nx, ny] = polar(needleAngle, r - 12);

  return (
    <g transform={`translate(${x},80)`}>
      <rect width={440} height={400} rx={10} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <text x={220} y={32} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(140,46)">
        <rect width={160} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={80} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badge}
        </text>
      </g>

      {/* Manometer dial */}
      <g>
        {/* Healthy zone arc */}
        {(() => {
          const [x1, y1] = polar(startAngle, r);
          const [x2H, y2H] = polar(startAngle + (0.5 / 1.5) * (endAngle - startAngle), r);
          return (
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2H} ${y2H}`}
              fill="none"
              stroke={colors.good}
              strokeWidth={12}
              strokeOpacity={0.7}
            />
          );
        })()}
        {/* Caution zone arc */}
        {(() => {
          const [x1, y1] = polar(startAngle + (0.5 / 1.5) * (endAngle - startAngle), r);
          const [x2, y2] = polar(startAngle + (0.8 / 1.5) * (endAngle - startAngle), r);
          return (
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={colors.warn}
              strokeWidth={12}
              strokeOpacity={0.7}
            />
          );
        })()}
        {/* Danger zone arc */}
        {(() => {
          const [x1, y1] = polar(startAngle + (0.8 / 1.5) * (endAngle - startAngle), r);
          const [x2, y2] = polar(endAngle, r);
          return (
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={colors.danger}
              strokeWidth={12}
              strokeOpacity={0.7}
            />
          );
        })()}

        {/* Tick marks */}
        {[0, 0.5, 1.0, 1.5].map((t) => {
          const a = startAngle + (t / 1.5) * (endAngle - startAngle);
          const [tx1, ty1] = polar(a, r - 6);
          const [tx2, ty2] = polar(a, r + 6);
          const [lx, ly] = polar(a, r + 22);
          return (
            <g key={t}>
              <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke={colors.ink[900]} strokeWidth={1.5} />
              <text x={lx} y={ly + 4} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
                {t.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={pressureColor} strokeWidth={4} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={8} fill={pressureColor} stroke={colors.ink[900]} strokeWidth={1.5} />

        {/* Reading text */}
        <text x={cx} y={cy + 36} textAnchor="middle" fontFamily={FONT} fontSize={20} fontWeight={typography.weight.title} fill={pressureColor}>
          {pressure.toFixed(1)} in w.c.
        </text>
        <text x={cx} y={cy + 56} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[500]}>
          Total External Static Pressure
        </text>
      </g>

      {/* Description */}
      <g transform="translate(20,330)">
        <foreignObject width={400} height={60}>
          <div style={{ fontFamily: FONT, fontSize: 12, color: '#334155', lineHeight: '1.5', fontWeight: 600, textAlign: 'center' }}>
            {description}
          </div>
        </foreignObject>
      </g>

      {/* Bullets */}
      <g transform="translate(30,375)">
        {bullets.map((b, i) => (
          <text key={i} y={i * 14} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
            • {b}
          </text>
        ))}
      </g>
    </g>
  );
}

export function StaticPressureImpact({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 540"
        titleId="static-pressure-impact-title"
        descId="static-pressure-impact-desc"
        title="Properly sized vs undersized returns: static pressure impact"
        desc="Two-panel comparison showing the effect of return air sizing on static pressure. Left panel labeled properly sized returns: air handler with manometer showing 0.5 inches water column total external static pressure, green status, blower operates near design speed, airflow at rated CFM, low noise, low energy use. Right panel labeled undersized returns: same air handler with manometer showing 1.2 inches water column total external static pressure deep into red zone, warning status, blower ramps up to compensate, watts increase 30 to 50 percent, audible whine, airflow may still be below rated CFM, evaporator coil may freeze. Most residential air handlers are rated at 0.5 inches water column total external static pressure; above 0.7 to 0.8 performance suffers significantly."
        className="w-full"
      >
        <rect width={1000} height={540} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          The cost of undersized returns
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Total External Static Pressure (TESP) measured at the air handler
        </text>

        <Panel
          x={40}
          title="Properly sized"
          badge="HEALTHY"
          badgeColor={colors.good}
          pressure={0.5}
          pressureColor={colors.good}
          description="System at design pressure. Blower operates near rated speed."
          bullets={[
            'Airflow at rated CFM',
            'Low noise',
            'Low blower power draw',
            'Coil temperature in normal range',
          ]}
        />

        <Panel
          x={520}
          title="Undersized returns"
          badge="OUT OF SPEC"
          badgeColor={colors.danger}
          pressure={1.2}
          pressureColor={colors.danger}
          description="System far above design pressure. Blower straining."
          bullets={[
            'CFM 10-25% below rated',
            'Whining noise at return grille',
            'ECM blower watts up 30-50%',
            'Evaporator coil at risk of freezing',
          ]}
        />
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Most residential air handlers are rated at 0.5 in w.c. TESP. Above 0.7-0.8, the equipment is no longer operating at design conditions.
      </figcaption>
    </figure>
  );
}
