'use client';

import {
  hpHeatingCapacityAtTemp,
  type HeatPumpResult,
} from '@/lib/calculators/heat-pump-size';
import { colors, typography } from '@/components/svg/tokens';

interface Props {
  result: HeatPumpResult;
  coldClimateEquipment: boolean;
}

const RECOMMENDATION_SHORT: Record<HeatPumpResult['equipmentRecommendation'], string[]> = {
  standard: ['Standard heat pump', 'No cold-climate cert needed'],
  'cold-climate-recommended': ['CCASHP recommended', 'NEEP CCASHP list'],
  'cold-climate-required': ['CCASHP required', 'NEEP CCASHP list'],
};

export function HeatPumpResultChart({ result, coldClimateEquipment }: Props) {
  const W = 880;
  const H = 460;
  const padL = 70;
  const padR = 240;
  const padT = 50;
  const padB = 70;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const tMin = -10;
  const tMax = 70;
  const xScale = (t: number) => padL + ((t - tMin) / (tMax - tMin)) * chartW;

  const yMax =
    Math.max(result.heatingLoadBtu, result.recommendedSizeBtu * 1.1) * 1.2;
  const yScale = (btu: number) =>
    padT + chartH - (btu / yMax) * chartH;

  const homeLoadAt = (t: number) => {
    if (t >= 70) return 0;
    const load =
      (result.heatingLoadBtu * (70 - t)) / (70 - result.heatingDesignTempF);
    return Math.max(0, load);
  };

  const temps: number[] = [];
  for (let t = tMin; t <= tMax; t += 1) temps.push(t);

  const homeLoadPath = temps
    .map(
      (t, i) =>
        `${i === 0 ? 'M' : 'L'} ${xScale(t).toFixed(1)} ${yScale(homeLoadAt(t)).toFixed(1)}`,
    )
    .join(' ');

  const hpCapacityPath = temps
    .map((t, i) => {
      const cap = hpHeatingCapacityAtTemp(
        t,
        result.recommendedSizeBtu,
        coldClimateEquipment,
      );
      return `${i === 0 ? 'M' : 'L'} ${xScale(t).toFixed(1)} ${yScale(cap).toFixed(1)}`;
    })
    .join(' ');

  // Aux heat shaded region: between load (top) and capacity (bottom)
  // from heatingDesignTempF up to balancePointF
  const auxStart = Math.max(tMin, result.heatingDesignTempF);
  const auxEnd = result.balancePointF;
  const auxTemps: number[] = [];
  if (auxEnd > auxStart) {
    for (let t = auxStart; t <= auxEnd; t += 1) auxTemps.push(t);
  }
  let auxRegionPath = '';
  if (auxTemps.length > 0) {
    const topEdge = auxTemps
      .map(
        (t, i) =>
          `${i === 0 ? 'M' : 'L'} ${xScale(t).toFixed(1)} ${yScale(homeLoadAt(t)).toFixed(1)}`,
      )
      .join(' ');
    const bottomEdge = [...auxTemps]
      .reverse()
      .map(
        (t) =>
          `L ${xScale(t).toFixed(1)} ${yScale(hpHeatingCapacityAtTemp(t, result.recommendedSizeBtu, coldClimateEquipment)).toFixed(1)}`,
      )
      .join(' ');
    auxRegionPath = `${topEdge} ${bottomEdge} Z`;
  }

  const balanceX = xScale(result.balancePointF);
  const balanceY = yScale(
    hpHeatingCapacityAtTemp(
      result.balancePointF,
      result.recommendedSizeBtu,
      coldClimateEquipment,
    ),
  );

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round((yMax * f) / 1000) * 1000);
  const xTicks = [-10, 0, 10, 20, 30, 40, 50, 60];

  const recLabels = RECOMMENDATION_SHORT[result.equipmentRecommendation];

  const panelX = W - padR + 16;
  const panelY = padT;
  const panelW = padR - 32;
  const panelH = chartH;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Heat pump sizing chart showing ${result.recommendedTons} tons recommended with ${result.balancePointF}°F balance point`}
      style={{ fontFamily: typography.fontFamily }}
    >
      {/* defs */}
      <defs>
        <linearGradient id="chartBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.surface.canvas} />
          <stop offset="100%" stopColor={colors.surface.subtle} />
        </linearGradient>
        <linearGradient id="panelBg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.brand.primary} stopOpacity="0.06" />
          <stop offset="100%" stopColor={colors.brand.primary} stopOpacity="0.02" />
        </linearGradient>
        <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="1" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chart area background */}
      <rect
        x={padL}
        y={padT}
        width={chartW}
        height={chartH}
        fill="url(#chartBg)"
        stroke={colors.ink[300]}
        strokeWidth="1"
        rx="6"
      />

      {/* Y gridlines + labels */}
      {yTicks.map((btu) => {
        const y = yScale(btu);
        if (y < padT - 1 || y > padT + chartH + 1) return null;
        return (
          <g key={`y-${btu}`}>
            <line
              x1={padL}
              x2={padL + chartW}
              y1={y}
              y2={y}
              stroke={colors.ink[300]}
              strokeOpacity="0.5"
              strokeDasharray="3,3"
            />
            <text
              x={padL - 10}
              y={y + 4}
              textAnchor="end"
              fontSize={typography.size.tickLabel}
              fill={colors.ink[500]}
            >
              {Math.round(btu / 1000)}k
            </text>
          </g>
        );
      })}

      {/* X axis ticks + labels */}
      {xTicks.map((t) => (
        <g key={`x-${t}`}>
          <line
            x1={xScale(t)}
            x2={xScale(t)}
            y1={padT + chartH}
            y2={padT + chartH + 5}
            stroke={colors.ink[500]}
          />
          <text
            x={xScale(t)}
            y={padT + chartH + 22}
            textAnchor="middle"
            fontSize={typography.size.tickLabel}
            fill={colors.ink[500]}
          >
            {t}°F
          </text>
        </g>
      ))}

      {/* Axis titles */}
      <text
        x={padL + chartW / 2}
        y={padT + chartH + 52}
        textAnchor="middle"
        fontSize={typography.size.axisLabel}
        fontWeight={typography.weight.label}
        fill={colors.ink[700]}
      >
        Outdoor temperature
      </text>
      <text
        x={22}
        y={padT + chartH / 2}
        textAnchor="middle"
        fontSize={typography.size.axisLabel}
        fontWeight={typography.weight.label}
        fill={colors.ink[700]}
        transform={`rotate(-90 22 ${padT + chartH / 2})`}
      >
        Capacity / load (BTU/hr)
      </text>

      {/* Aux heat shaded region */}
      {auxRegionPath ? (
        <path d={auxRegionPath} fill={colors.zones.warn} />
      ) : null}

      {/* Heating design temp vertical */}
      <line
        x1={xScale(result.heatingDesignTempF)}
        x2={xScale(result.heatingDesignTempF)}
        y1={padT}
        y2={padT + chartH}
        stroke={colors.danger}
        strokeWidth="1.5"
        strokeDasharray="5,4"
        strokeOpacity="0.7"
      />
      <text
        x={xScale(result.heatingDesignTempF) + 8}
        y={padT + 18}
        fontSize={typography.size.annotation}
        fontWeight={typography.weight.label}
        fill={colors.danger}
      >
        Design temp {result.heatingDesignTempF}°F
      </text>

      {/* Home load line */}
      <path
        d={homeLoadPath}
        stroke={colors.series.secondary}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Heat pump capacity line */}
      <path
        d={hpCapacityPath}
        stroke={colors.brand.primary}
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Line labels at right edge */}
      <text
        x={xScale(58)}
        y={yScale(homeLoadAt(58)) - 12}
        textAnchor="end"
        fontSize={typography.size.annotation}
        fontWeight={typography.weight.label}
        fill={colors.series.secondary}
      >
        Home heating load
      </text>
      <text
        x={xScale(58)}
        y={
          yScale(
            hpHeatingCapacityAtTemp(58, result.recommendedSizeBtu, coldClimateEquipment),
          ) - 12
        }
        textAnchor="end"
        fontSize={typography.size.annotation}
        fontWeight={typography.weight.label}
        fill={colors.brand.primary}
      >
        Heat pump capacity
      </text>

      {/* Aux heat label */}
      {auxRegionPath ? (
        <text
          x={(xScale(auxStart) + xScale(auxEnd)) / 2}
          y={yScale(homeLoadAt((auxStart + auxEnd) / 2)) - 8}
          textAnchor="middle"
          fontSize={typography.size.annotation}
          fontWeight={typography.weight.label}
          fill={colors.warn}
        >
          Aux heat required
        </text>
      ) : null}

      {/* Balance point marker */}
      <g filter="url(#markerShadow)">
        <circle cx={balanceX} cy={balanceY} r="7" fill={colors.good} />
        <circle cx={balanceX} cy={balanceY} r="3" fill="white" />
      </g>
      <text
        x={balanceX}
        y={balanceY - 16}
        textAnchor="middle"
        fontSize={typography.size.annotation}
        fontWeight={typography.weight.title}
        fill={colors.good}
      >
        Balance point
      </text>

      {/* Right-side stats panel */}
      <g>
        <rect
          x={panelX}
          y={panelY}
          width={panelW}
          height={panelH}
          fill="url(#panelBg)"
          stroke={colors.brand.primary}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          rx="10"
        />

        <text
          x={panelX + panelW / 2}
          y={panelY + 28}
          textAnchor="middle"
          fontSize={typography.size.tickLabel - 1}
          fontWeight={typography.weight.title}
          fill={colors.ink[500]}
          letterSpacing="1.5"
        >
          RECOMMENDED SIZE
        </text>
        <text
          x={panelX + panelW / 2}
          y={panelY + 70}
          textAnchor="middle"
          fontSize={42}
          fontWeight={typography.weight.title}
          fill={colors.brand.primary}
        >
          {result.recommendedTons}
        </text>
        <text
          x={panelX + panelW / 2}
          y={panelY + 92}
          textAnchor="middle"
          fontSize={typography.size.tickLabel + 1}
          fill={colors.ink[700]}
        >
          tons · {result.recommendedSizeBtu.toLocaleString()} BTU
        </text>

        <line
          x1={panelX + 20}
          x2={panelX + panelW - 20}
          y1={panelY + 115}
          y2={panelY + 115}
          stroke={colors.ink[300]}
        />

        <text
          x={panelX + panelW / 2}
          y={panelY + 142}
          textAnchor="middle"
          fontSize={typography.size.tickLabel - 1}
          fontWeight={typography.weight.title}
          fill={colors.ink[500]}
          letterSpacing="1.5"
        >
          BALANCE POINT
        </text>
        <text
          x={panelX + panelW / 2}
          y={panelY + 176}
          textAnchor="middle"
          fontSize={32}
          fontWeight={typography.weight.title}
          fill={colors.ink[900]}
        >
          {result.balancePointF}°F
        </text>

        <line
          x1={panelX + 20}
          x2={panelX + panelW - 20}
          y1={panelY + 199}
          y2={panelY + 199}
          stroke={colors.ink[300]}
        />

        <text
          x={panelX + panelW / 2}
          y={panelY + 226}
          textAnchor="middle"
          fontSize={typography.size.tickLabel - 1}
          fontWeight={typography.weight.title}
          fill={colors.ink[500]}
          letterSpacing="1.5"
        >
          AUX AT DESIGN
        </text>
        <text
          x={panelX + panelW / 2}
          y={panelY + 258}
          textAnchor="middle"
          fontSize={26}
          fontWeight={typography.weight.title}
          fill={colors.ink[900]}
        >
          {result.auxHeatAtDesignBtu === 0
            ? 'None'
            : result.auxHeatAtDesignBtu.toLocaleString()}
        </text>
        {result.auxHeatAtDesignBtu > 0 ? (
          <text
            x={panelX + panelW / 2}
            y={panelY + 276}
            textAnchor="middle"
            fontSize={typography.size.tickLabel}
            fill={colors.ink[500]}
          >
            BTU at {result.heatingDesignTempF}°F
          </text>
        ) : null}

        <line
          x1={panelX + 20}
          x2={panelX + panelW - 20}
          y1={panelY + 295}
          y2={panelY + 295}
          stroke={colors.ink[300]}
        />

        <text
          x={panelX + panelW / 2}
          y={panelY + 322}
          textAnchor="middle"
          fontSize={typography.size.tickLabel - 1}
          fontWeight={typography.weight.title}
          fill={colors.ink[500]}
          letterSpacing="1.5"
        >
          EQUIPMENT
        </text>
        {recLabels.map((line, i) => (
          <text
            key={i}
            x={panelX + panelW / 2}
            y={panelY + 344 + i * 16}
            textAnchor="middle"
            fontSize={typography.size.legend}
            fontWeight={i === 0 ? typography.weight.title : typography.weight.body}
            fill={i === 0 ? colors.ink[900] : colors.ink[500]}
          >
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
}
