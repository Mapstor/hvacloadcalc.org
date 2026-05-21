import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface GaugeProps {
  x: number;
  title: string;
  subtitle: string;
  needleValue: number;
  needleMin: number;
  needleMax: number;
  ticks: number[];
  goodSide: 'left' | 'right';
  unitLabel: string;
  betterText: string;
  color: string;
}

function Gauge({ x, title, subtitle, needleValue, needleMin, needleMax, ticks, goodSide, unitLabel, betterText, color }: GaugeProps) {
  const cx = 220;
  const cy = 240;
  const r = 130;
  const startAngle = -180;
  const endAngle = 0;

  function angleFor(v: number): number {
    const ratio = (v - needleMin) / (needleMax - needleMin);
    return startAngle + ratio * (endAngle - startAngle);
  }

  function polar(angle: number, radius: number): [number, number] {
    const rad = (angle * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  }

  const needleAngle = angleFor(needleValue);
  const [nx, ny] = polar(needleAngle, r - 16);

  return (
    <g transform={`translate(${x},20)`}>
      <text x={220} y={30} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>
      <text x={220} y={50} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      {/* Gauge arc base */}
      {(() => {
        const [x1, y1] = polar(startAngle, r);
        const [x2, y2] = polar(endAngle, r);
        return (
          <path
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none"
            stroke={colors.ink[300]}
            strokeWidth={14}
          />
        );
      })()}

      {/* Good side highlight */}
      {(() => {
        const ratio = goodSide === 'left' ? 0.4 : 0.6;
        const split = startAngle + ratio * (endAngle - startAngle);
        const [x1, y1] = polar(goodSide === 'left' ? startAngle : split, r);
        const [x2, y2] = polar(goodSide === 'left' ? split : endAngle, r);
        return (
          <path
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none"
            stroke={colors.good}
            strokeWidth={14}
            strokeOpacity={0.65}
          />
        );
      })()}

      {/* Ticks */}
      {ticks.map((t) => {
        const a = angleFor(t);
        const [tx1, ty1] = polar(a, r - 10);
        const [tx2, ty2] = polar(a, r + 5);
        const [labelX, labelY] = polar(a, r + 22);
        return (
          <g key={t}>
            <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke={colors.ink[900]} strokeWidth={1.5} />
            <text x={labelX} y={labelY + 4} textAnchor="middle" fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              {t}
            </text>
          </g>
        );
      })}

      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={8} fill={color} stroke={colors.ink[900]} strokeWidth={1.5} />

      {/* Big value readout */}
      <g transform={`translate(${cx},${cy + 56})`}>
        <text textAnchor="middle" fontFamily={FONT} fontSize={32} fontWeight={typography.weight.title} fill={color}>
          {needleValue}
        </text>
        <text y={20} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
          {unitLabel}
        </text>
      </g>

      {/* Better direction tag */}
      <g transform={`translate(${cx},${cy + 110})`}>
        <rect x={-90} y={-12} width={180} height={28} rx={14} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={1.5} />
        <text y={6} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={color}>
          {betterText}
        </text>
      </g>
    </g>
  );
}

export function HersVsMpgAnalogy({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="hers-vs-mpg-analogy-title"
        descId="hers-vs-mpg-analogy-desc"
        title="HERS Index direction compared to car MPG: opposite scales"
        desc="Two dashboard-style gauges side by side. Left gauge: a car MPG dial showing 25 MPG, with note that higher is better meaning more efficient. Right gauge: a house HERS Index dial showing 65, with note that lower is better meaning less energy used. Both rate efficiency but in opposite directions. HERS works the opposite way of MPG. A lower HERS Index means a home uses less energy. The scale is calibrated so 100 equals an average 2006 reference home and 0 equals net-zero."
        className="w-full"
      >
        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          HERS works in the opposite direction from MPG
        </text>

        <Gauge
          x={20}
          title="Car MPG"
          subtitle="higher = better"
          needleValue={25}
          needleMin={0}
          needleMax={50}
          ticks={[0, 10, 20, 30, 40, 50]}
          goodSide="right"
          unitLabel="miles per gallon"
          betterText="HIGHER IS BETTER →"
          color={colors.brand.primaryDark}
        />

        <Gauge
          x={540}
          title="HERS Index"
          subtitle="lower = better"
          needleValue={65}
          needleMin={0}
          needleMax={150}
          ticks={[0, 30, 50, 70, 100, 130, 150]}
          goodSide="left"
          unitLabel="HERS score"
          betterText="← LOWER IS BETTER"
          color={colors.brand.primaryDark}
        />

        <text x={500} y={470} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Both rate efficiency. The direction of &quot;better&quot; is reversed: more MPG vs less HERS energy.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        HERS confuses people because most efficiency scales (MPG, EER, COP) increase with efficiency. HERS is calibrated to energy use, so lower = better.
      </figcaption>
    </figure>
  );
}
