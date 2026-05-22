/**
 * Attic R-value calculator engine.
 *
 * Calculates total R-value from insulation depth and type. Supports
 * multi-layer attics (e.g., 6" original cellulose + 10" new loose-fill).
 * Compares result to DOE recommended R-values by IECC climate zone and
 * suggests upgrade depth to reach the recommended target.
 *
 * R-per-inch values from /building-science/insulation/attic-r-value/,
 * cross-referenced with ENERGY STAR insulation guide and DOE Energy Saver.
 */

import type { ClimateZone } from './btu';

export type InsulationType =
  | 'fiberglass-batt'
  | 'loose-fill-fiberglass'
  | 'loose-fill-cellulose'
  | 'mineral-wool-batt'
  | 'open-cell-spray-foam'
  | 'closed-cell-spray-foam'
  | 'polyiso-rigid-foam'
  | 'xps-rigid-foam'
  | 'eps-rigid-foam';

export interface InsulationLayer {
  type: InsulationType;
  depthInches: number;
}

export interface AtticRValueInputs {
  layers: InsulationLayer[];
  climateZone: ClimateZone;
}

export interface AtticRValueResult {
  totalRValue: number;
  perLayerRValues: Array<{ type: InsulationType; depthInches: number; rValue: number }>;
  doeRecommendedRange: { low: number; high: number };
  ieccCodeMinimum: number;
  status: 'below-doe-low' | 'in-doe-range' | 'at-or-above-doe-high' | 'meets-iecc-only';
  upgradeRecommendation: {
    targetR: number;
    additionalRNeeded: number;
    depthsByMaterial: Array<{ type: InsulationType; depthInches: number }>;
  } | null;
}

/** R-per-inch (steady-state) for common attic insulation types. */
export const R_PER_INCH: Record<InsulationType, number> = {
  'fiberglass-batt': 3.0,
  'loose-fill-fiberglass': 2.3,
  'loose-fill-cellulose': 3.6,
  'mineral-wool-batt': 3.6,
  'open-cell-spray-foam': 3.6,
  'closed-cell-spray-foam': 6.5,
  'polyiso-rigid-foam': 6.5,
  'xps-rigid-foam': 5.0,
  'eps-rigid-foam': 4.0,
};

export const INSULATION_DISPLAY_NAMES: Record<InsulationType, string> = {
  'fiberglass-batt': 'Fiberglass batt',
  'loose-fill-fiberglass': 'Loose-fill fiberglass (blown)',
  'loose-fill-cellulose': 'Loose-fill cellulose (blown)',
  'mineral-wool-batt': 'Mineral wool batt',
  'open-cell-spray-foam': 'Open-cell spray foam',
  'closed-cell-spray-foam': 'Closed-cell spray foam (aged)',
  'polyiso-rigid-foam': 'Polyiso rigid board (aged)',
  'xps-rigid-foam': 'XPS rigid board',
  'eps-rigid-foam': 'EPS rigid board',
};

/**
 * DOE recommended attic R-value ranges for existing homes, by climate zone.
 * Source: ENERGY STAR R-Value Recommendations.
 */
const DOE_RECOMMENDED: Record<ClimateZone, { low: number; high: number }> = {
  '1': { low: 30, high: 49 },
  '2': { low: 30, high: 60 },
  '3': { low: 30, high: 60 },
  '4': { low: 38, high: 60 },
  '5': { low: 49, high: 60 },
  '6': { low: 49, high: 60 },
  '7': { low: 49, high: 60 },
  '8': { low: 49, high: 60 },
};

/** 2021 IECC code minimum attic R-value by climate zone (new construction). */
const IECC_2021_MIN: Record<ClimateZone, number> = {
  '1': 30,
  '2': 49,
  '3': 49,
  '4': 49,
  '5': 60,
  '6': 60,
  '7': 60,
  '8': 60,
};

export function calculateAtticRValue(inputs: AtticRValueInputs): AtticRValueResult {
  const perLayerRValues = inputs.layers
    .filter((l) => l.depthInches > 0)
    .map((l) => ({
      type: l.type,
      depthInches: l.depthInches,
      rValue: Math.round(l.depthInches * R_PER_INCH[l.type] * 10) / 10,
    }));

  const totalRValue = perLayerRValues.reduce((sum, l) => sum + l.rValue, 0);
  const totalRRounded = Math.round(totalRValue * 10) / 10;

  const doeRange = DOE_RECOMMENDED[inputs.climateZone];
  const codeMin = IECC_2021_MIN[inputs.climateZone];

  let status: AtticRValueResult['status'];
  if (totalRRounded < doeRange.low) {
    status = totalRRounded >= codeMin ? 'meets-iecc-only' : 'below-doe-low';
  } else if (totalRRounded >= doeRange.high) {
    status = 'at-or-above-doe-high';
  } else {
    status = 'in-doe-range';
  }

  let upgradeRecommendation: AtticRValueResult['upgradeRecommendation'] = null;
  if (status === 'below-doe-low' || status === 'meets-iecc-only') {
    const targetR = doeRange.low;
    const additionalRNeeded = Math.max(0, Math.round((targetR - totalRRounded) * 10) / 10);
    const depthsByMaterial = (
      ['loose-fill-cellulose', 'loose-fill-fiberglass', 'closed-cell-spray-foam'] as InsulationType[]
    ).map((type) => ({
      type,
      depthInches: Math.round((additionalRNeeded / R_PER_INCH[type]) * 10) / 10,
    }));
    upgradeRecommendation = { targetR, additionalRNeeded, depthsByMaterial };
  }

  return {
    totalRValue: totalRRounded,
    perLayerRValues,
    doeRecommendedRange: doeRange,
    ieccCodeMinimum: codeMin,
    status,
    upgradeRecommendation,
  };
}

/**
 * Convenience: depth needed to reach a target R-value with a single material.
 */
export function depthForTargetR(targetR: number, material: InsulationType): number {
  return Math.round((targetR / R_PER_INCH[material]) * 10) / 10;
}
