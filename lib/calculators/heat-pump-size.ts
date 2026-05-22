/**
 * Heat pump sizing calculator engine.
 *
 * Implements the dual-load sizing methodology from /heat-pump/sizing/:
 *   1. Calculate cooling load (same methodology as BTU calculator)
 *   2. Calculate heating load using climate-zone heating factor
 *   3. Pick equipment to handle the larger of the two
 *   4. Compute balance point (outdoor temp where HP capacity = heating load)
 *   5. Compute aux heat shortfall at heating design temperature
 *   6. Recommend equipment class (standard vs cold-climate certified)
 *
 * Pure functions only. Uses calculateBtu from ./btu for the cooling side.
 *
 * Verified against article 07's methodology and ACCA Manual J examples.
 */

import { calculateBtu, type BtuInputs, type ClimateZone } from './btu';

export interface HeatPumpInputs extends BtuInputs {
  /** Whether to model a cold-climate certified (CCASHP) heat pump. */
  coldClimateEquipment: boolean;
}

export interface HeatPumpResult {
  coolingLoadBtu: number;
  heatingLoadBtu: number;
  recommendedSizeBtu: number;
  recommendedTons: number;
  /** Outdoor temperature where HP capacity equals home heating load. */
  balancePointF: number;
  /** Heating design temperature used (zone default). */
  heatingDesignTempF: number;
  /** Cooling design temperature used (zone default). */
  coolingDesignTempF: number;
  /** Aux heat capacity needed at heating design temperature, in BTU/hr. */
  auxHeatAtDesignBtu: number;
  /** Which load drove equipment selection: 'cooling' or 'heating'. */
  drivingLoad: 'cooling' | 'heating' | 'balanced';
  /** Recommended equipment class. */
  equipmentRecommendation: 'standard' | 'cold-climate-recommended' | 'cold-climate-required';
  /** Suggested sizing strategy notes for the user. */
  sizingStrategy: string;
}

/**
 * Heating-to-cooling load ratio by IECC climate zone.
 * Calibrated against article 07's worked examples and ASHRAE 169 design temps.
 */
const HEATING_LOAD_FACTORS: Record<ClimateZone, number> = {
  '1': 0.3,
  '2': 0.5,
  '3': 0.7,
  '4': 1.0,
  '5': 1.3,
  '6': 1.6,
  '7': 1.9,
  '8': 2.2,
};

/** Heating design temperatures (99% percentile) by zone, simplified. */
const HEATING_DESIGN_TEMPS: Record<ClimateZone, number> = {
  '1': 47,
  '2': 30,
  '3': 22,
  '4': 15,
  '5': 5,
  '6': -2,
  '7': -10,
  '8': -20,
};

/** Cooling design temperatures (1% percentile) by zone, simplified. */
const COOLING_DESIGN_TEMPS: Record<ClimateZone, number> = {
  '1': 91,
  '2': 95,
  '3': 93,
  '4': 90,
  '5': 88,
  '6': 86,
  '7': 84,
  '8': 80,
};

const STANDARD_HP_SIZES_BTU = [12000, 18000, 24000, 30000, 36000, 42000, 48000, 60000];

function roundToHpSize(btu: number): number {
  if (btu <= STANDARD_HP_SIZES_BTU[0]) return STANDARD_HP_SIZES_BTU[0];
  if (btu >= STANDARD_HP_SIZES_BTU[STANDARD_HP_SIZES_BTU.length - 1]) {
    return STANDARD_HP_SIZES_BTU[STANDARD_HP_SIZES_BTU.length - 1];
  }
  for (let i = 0; i < STANDARD_HP_SIZES_BTU.length - 1; i++) {
    const lower = STANDARD_HP_SIZES_BTU[i];
    const upper = STANDARD_HP_SIZES_BTU[i + 1];
    if (btu >= lower && btu < upper) {
      return btu < (lower + upper) / 2 ? lower : upper;
    }
  }
  return STANDARD_HP_SIZES_BTU[STANDARD_HP_SIZES_BTU.length - 1];
}

function tonsFromBtu(btu: number): number {
  return Math.round((btu / 12000) * 4) / 4;
}

/**
 * Heat pump heating capacity at outdoor temperature, as a function of
 * cooling-rated BTU and equipment class.
 *
 * Standard heat pumps: ~100% rated at 47°F, ~60% at 17°F, ~33% at 5°F.
 * Cold-climate (CCASHP): ~100% at 47°F, ~85% at 17°F, ~70% at 5°F, ~50% at -5°F.
 */
export function hpHeatingCapacityAtTemp(
  outdoorF: number,
  ratedCoolingBtu: number,
  isCCASHP: boolean,
): number {
  const ratedHeating = ratedCoolingBtu * 1.06;
  if (outdoorF >= 47) return ratedHeating;

  if (isCCASHP) {
    if (outdoorF >= 17) {
      const frac = 1 - (47 - outdoorF) * 0.005;
      return ratedHeating * frac;
    }
    if (outdoorF >= 5) {
      const frac = 0.85 - (17 - outdoorF) * 0.0125;
      return ratedHeating * frac;
    }
    if (outdoorF >= -5) {
      const frac = 0.7 - (5 - outdoorF) * 0.02;
      return ratedHeating * frac;
    }
    return ratedHeating * Math.max(0.3, 0.5 - (-5 - outdoorF) * 0.025);
  }

  if (outdoorF >= 17) {
    const frac = 1 - (47 - outdoorF) * 0.0133;
    return ratedHeating * frac;
  }
  if (outdoorF >= 5) {
    const frac = 0.6 - (17 - outdoorF) * 0.0225;
    return ratedHeating * frac;
  }
  return ratedHeating * Math.max(0.1, 0.33 - (5 - outdoorF) * 0.018);
}

/**
 * Home heating load at outdoor temperature, linear scaling from peak load
 * at design temperature to 0 at indoor setpoint.
 */
function homeLoadAtTemp(outdoorF: number, peakLoad: number, designTempF: number, indoorSetpoint = 70): number {
  if (outdoorF >= indoorSetpoint) return 0;
  return peakLoad * (indoorSetpoint - outdoorF) / (indoorSetpoint - designTempF);
}

/**
 * Find the balance point: outdoor temperature at which heat pump capacity
 * equals home heating load. Linear search in 1°F increments.
 */
function findBalancePoint(
  peakLoad: number,
  designTempF: number,
  ratedCoolingBtu: number,
  isCCASHP: boolean,
): number {
  for (let t = 60; t >= -25; t -= 1) {
    const load = homeLoadAtTemp(t, peakLoad, designTempF);
    const capacity = hpHeatingCapacityAtTemp(t, ratedCoolingBtu, isCCASHP);
    if (capacity < load) return t + 1;
  }
  return -25;
}

export function calculateHeatPumpSize(inputs: HeatPumpInputs): HeatPumpResult {
  const coolingResult = calculateBtu(inputs);
  const coolingLoadBtu = coolingResult.rawCalculatedBtu;
  const heatingFactor = HEATING_LOAD_FACTORS[inputs.climateZone];
  const heatingLoadBtu = Math.round(coolingLoadBtu * heatingFactor);
  const heatingDesignTempF = HEATING_DESIGN_TEMPS[inputs.climateZone];
  const coolingDesignTempF = COOLING_DESIGN_TEMPS[inputs.climateZone];

  const largerLoad = Math.max(coolingLoadBtu, heatingLoadBtu);
  const recommendedSizeBtu = roundToHpSize(largerLoad);

  const balancePointF = findBalancePoint(
    heatingLoadBtu,
    heatingDesignTempF,
    recommendedSizeBtu,
    inputs.coldClimateEquipment,
  );

  const hpCapacityAtDesign = hpHeatingCapacityAtTemp(
    heatingDesignTempF,
    recommendedSizeBtu,
    inputs.coldClimateEquipment,
  );
  const auxHeatAtDesignBtu = Math.max(0, Math.round(heatingLoadBtu - hpCapacityAtDesign));

  let drivingLoad: HeatPumpResult['drivingLoad'];
  const ratio = heatingLoadBtu / coolingLoadBtu;
  if (ratio < 0.85) drivingLoad = 'cooling';
  else if (ratio > 1.15) drivingLoad = 'heating';
  else drivingLoad = 'balanced';

  let equipmentRecommendation: HeatPumpResult['equipmentRecommendation'];
  let sizingStrategy: string;
  if (inputs.climateZone === '1' || inputs.climateZone === '2' || inputs.climateZone === '3') {
    equipmentRecommendation = 'standard';
    sizingStrategy =
      'Cooling load dominates in this climate. A standard heat pump sized to the cooling load handles year-round comfort with minimal aux heat use.';
  } else if (inputs.climateZone === '4') {
    equipmentRecommendation = 'standard';
    sizingStrategy =
      'Heating and cooling loads are balanced in this climate. Either a standard or cold-climate heat pump works. The balance point typically sits around freezing.';
  } else if (inputs.climateZone === '5' || inputs.climateZone === '6') {
    equipmentRecommendation = 'cold-climate-recommended';
    sizingStrategy = inputs.coldClimateEquipment
      ? 'Cold-climate certified equipment recommended for this zone. Aux heat runtime stays low across the season.'
      : 'A cold-climate certified heat pump (NEEP CCASHP listed) would significantly reduce aux heat runtime in this zone. Consider upgrading.';
  } else {
    equipmentRecommendation = 'cold-climate-required';
    sizingStrategy = inputs.coldClimateEquipment
      ? 'Cold-climate certified equipment is the right pick for this zone. Plan for some aux heat use on the coldest days; consider dual-fuel backup in zones 7-8.'
      : 'A standard heat pump will not maintain heating capacity at this zone\'s design temperature. A cold-climate certified (CCASHP) heat pump is required.';
  }

  return {
    coolingLoadBtu,
    heatingLoadBtu,
    recommendedSizeBtu,
    recommendedTons: tonsFromBtu(recommendedSizeBtu),
    balancePointF,
    heatingDesignTempF,
    coolingDesignTempF,
    auxHeatAtDesignBtu,
    drivingLoad,
    equipmentRecommendation,
    sizingStrategy,
  };
}
