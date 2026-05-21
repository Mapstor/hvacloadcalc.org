import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

const X_MIN = 80;
const X_MAX = 700;
const Y_TOP = 110;
const Y_BOTTOM = 350;
const TEMP_MIN = -10;
const TEMP_MAX = 60;
const BALANCE_LOW = 25;
const BALANCE_HIGH = 35;

function xForTemp(t: number): number {
  return X_MIN + ((t - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * (X_MAX - X_MIN);
}

export function AuxHeatWhenItFires({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 620"
        titleId="aux-heat-when-it-fires-title"
        descId="aux-heat-when-it-fires-desc"
        title="When auxiliary heat fires: outdoor temperature regions and specific triggering scenarios"
        desc="Diagram showing outdoor temperature on the x-axis from negative 10 to 60 degrees Fahrenheit with three colored regions indicating when auxiliary heat fires. Green region above 35 degrees indicates heat pump alone handles the load with no aux. Yellow band from 25 to 35 degrees represents marginal conditions where aux may fire briefly during defrost or thermostat recovery. Orange region below 25 degrees indicates aux heat regularly assists because the heat pump cannot keep up alone. Three specific scenarios listed below: 1 during heat pump defrost cycles every 30 to 90 minutes in cold humid weather, 2 on large thermostat setbacks when raising setpoint 3 degrees or more, 3 below the balance point typically 25 to 35 degrees for standard heat pumps and 5 to 15 degrees for cold-climate heat pumps."
        className="w-full"
      >
        <rect width={1000} height={620} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          When aux heat is supposed to fire
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          By outdoor temperature and operating scenario
        </text>

        {/* Three colored zones */}
        {/* Green zone (warm): heat pump alone */}
        <rect
          x={xForTemp(BALANCE_HIGH)}
          y={Y_TOP}
          width={xForTemp(TEMP_MAX) - xForTemp(BALANCE_HIGH)}
          height={Y_BOTTOM - Y_TOP}
          fill={colors.good}
          fillOpacity={0.18}
          stroke={colors.good}
          strokeWidth={1.5}
        />

        {/* Yellow zone (marginal) */}
        <rect
          x={xForTemp(BALANCE_LOW)}
          y={Y_TOP}
          width={xForTemp(BALANCE_HIGH) - xForTemp(BALANCE_LOW)}
          height={Y_BOTTOM - Y_TOP}
          fill={colors.warn}
          fillOpacity={0.2}
          stroke={colors.warn}
          strokeWidth={1.5}
        />

        {/* Orange/red zone (cold): aux regularly */}
        <rect
          x={xForTemp(TEMP_MIN)}
          y={Y_TOP}
          width={xForTemp(BALANCE_LOW) - xForTemp(TEMP_MIN)}
          height={Y_BOTTOM - Y_TOP}
          fill={colors.danger}
          fillOpacity={0.18}
          stroke={colors.danger}
          strokeWidth={1.5}
        />

        {/* Zone labels */}
        <g transform={`translate(${(xForTemp(BALANCE_HIGH) + xForTemp(TEMP_MAX)) / 2},${(Y_TOP + Y_BOTTOM) / 2})`}>
          <text textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.good}>
            Heat pump alone
          </text>
          <text y={24} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            no aux needed
          </text>
        </g>

        <g transform={`translate(${(xForTemp(BALANCE_LOW) + xForTemp(BALANCE_HIGH)) / 2},${(Y_TOP + Y_BOTTOM) / 2})`}>
          <text textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.warn}>
            Marginal
          </text>
          <text y={16} textAnchor="middle" fontFamily={FONT} fontSize={9} fill={colors.ink[700]}>
            occasional aux
          </text>
        </g>

        <g transform={`translate(${(xForTemp(TEMP_MIN) + xForTemp(BALANCE_LOW)) / 2},${(Y_TOP + Y_BOTTOM) / 2})`}>
          <text textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.danger}>
            Aux assists
          </text>
          <text y={24} textAnchor="middle" fontFamily={FONT} fontSize={11} fill={colors.ink[700]}>
            below balance point
          </text>
        </g>

        {/* Temperature axis */}
        <line x1={X_MIN} y1={Y_BOTTOM + 20} x2={X_MAX} y2={Y_BOTTOM + 20} stroke={colors.ink[700]} strokeWidth={2} />
        {[-10, 0, 10, 20, 30, 40, 50, 60].map((t) => (
          <g key={t}>
            <line x1={xForTemp(t)} y1={Y_BOTTOM + 18} x2={xForTemp(t)} y2={Y_BOTTOM + 26} stroke={colors.ink[700]} strokeWidth={1.5} />
            <text x={xForTemp(t)} y={Y_BOTTOM + 42} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.tickLabel} fill={colors.ink[700]}>
              {t}°F
            </text>
          </g>
        ))}
        <text x={(X_MIN + X_MAX) / 2} y={Y_BOTTOM + 60} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.label} fill={colors.ink[700]}>
          Outdoor temperature
        </text>

        {/* Balance point markers */}
        <g>
          <line x1={xForTemp(BALANCE_LOW)} y1={Y_TOP - 30} x2={xForTemp(BALANCE_LOW)} y2={Y_BOTTOM + 20} stroke={colors.ink[900]} strokeWidth={1.5} strokeDasharray="4,3" />
          <text x={xForTemp(BALANCE_LOW)} y={Y_TOP - 36} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[700]}>
            cold-climate HP balance
          </text>

          <line x1={xForTemp(BALANCE_HIGH)} y1={Y_TOP - 30} x2={xForTemp(BALANCE_HIGH)} y2={Y_BOTTOM + 20} stroke={colors.ink[900]} strokeWidth={1.5} strokeDasharray="4,3" />
          <text x={xForTemp(BALANCE_HIGH)} y={Y_TOP - 36} textAnchor="middle" fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[700]}>
            standard HP balance
          </text>
        </g>

        {/* Three scenario callouts below */}
        <g transform="translate(60,460)">
          <text fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={colors.ink[900]}>
            Three specific aux-firing scenarios:
          </text>

          <g transform="translate(0,28)">
            <circle r={10} cx={10} cy={10} fill={colors.brand.primary} />
            <text x={10} y={14} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              1
            </text>
            <text x={32} y={9} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              During heat pump defrost cycles
            </text>
            <text x={32} y={25} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              Every 30-90 min in cold humid weather, lasting 5-15 minutes each. Aux maintains comfort.
            </text>
          </g>

          <g transform="translate(0,76)">
            <circle r={10} cx={10} cy={10} fill={colors.brand.primary} />
            <text x={10} y={14} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              2
            </text>
            <text x={32} y={9} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              On large thermostat setbacks
            </text>
            <text x={32} y={25} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              Raising setpoint 3°F or more triggers aux to reach setpoint faster.
            </text>
          </g>

          <g transform="translate(0,124)">
            <circle r={10} cx={10} cy={10} fill={colors.brand.primary} />
            <text x={10} y={14} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
              3
            </text>
            <text x={32} y={9} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
              Below the balance point
            </text>
            <text x={32} y={25} fontFamily={FONT} fontSize={10} fill={colors.ink[700]}>
              Typically 25-35°F for standard heat pumps, 5-15°F for cold-climate heat pumps.
            </text>
          </g>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Outdoor temperature is the primary driver, but defrost and setback recovery also fire aux briefly in any weather.
      </figcaption>
    </figure>
  );
}
