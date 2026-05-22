/**
 * Manual J-style whole-house load calculator engine.
 *
 * Implements simplified Manual J 8th Edition methodology:
 *   - Conductive heat loss/gain through envelope (UA × ΔT for each surface)
 *   - Infiltration heat loss/gain (volume × ACH × air properties × ΔT)
 *   - Solar gain through windows (SLF × area × SHGC, simplified)
 *   - Internal gains (occupants, lighting, appliances)
 *   - Sensible cooling load + climate-based latent estimate
 *
 * Pure functions only. Verified against article 13's accuracy methodology:
 *   - ±5% target on ACCA published reference cases
 *   - ±3-5% target vs ACCA-approved peer software
 *   - ±15% target vs measured peak demand on real homes
 *
 * NOT a substitute for permit-grade Manual J. Use ACCA-approved software
 * (Wrightsoft, Cool Calc, Elite) or a certified contractor for final
 * equipment specification.
 */

import type { ClimateZone } from './btu';

export type ConstructionEra = 'pre-1980' | '1980-1999' | '2000-2009' | '2010-2019' | '2020+';

export interface ManualJInputs {
  /** Total conditioned floor area in square feet. */
  squareFootage: number;
  /** IECC climate zone. Drives default design temperatures. */
  climateZone: ClimateZone;
  /** Number of above-grade stories. Affects wall area and stack effect. */
  stories: 1 | 2 | 3;
  /** Average ceiling height in feet. */
  ceilingHeight: 8 | 9 | 10 | 12;
  /** Construction era. Drives default envelope characteristics. */
  constructionEra: ConstructionEra;

  /** Overrides (when set, replace the era defaults). */
  wallRValue?: number;
  ceilingRValue?: number;
  floorRValue?: number;
  windowUFactor?: number;
  /** Window area as a fraction of floor area. Typical 0.10-0.18. */
  windowToFloorRatio?: number;
  /** Air changes per hour at 50 Pa from blower-door test. */
  ach50?: number;
  /** Number of regular occupants. */
  occupants?: number;
  /** Average window SHGC (0-1). Modern Low-E typically 0.25-0.40. */
  windowSHGC?: number;
}

export interface ManualJBreakdown {
  heating: {
    wallConductive: number;
    ceilingConductive: number;
    floorConductive: number;
    windowConductive: number;
    infiltration: number;
  };
  cooling: {
    wallConductive: number;
    ceilingConductive: number;
    floorConductive: number;
    windowConductive: number;
    infiltration: number;
    solarGain: number;
    internalGain: number;
  };
  envelope: {
    wallNetArea: number;
    ceilingArea: number;
    floorArea: number;
    windowArea: number;
    volume: number;
  };
  applied: {
    wallRValue: number;
    ceilingRValue: number;
    floorRValue: number;
    windowUFactor: number;
    windowSHGC: number;
    ach50: number;
    achNatural: number;
    occupants: number;
  };
}

export interface ManualJResult {
  heatingLoadBtu: number;
  coolingLoadSensibleBtu: number;
  coolingLoadLatentBtu: number;
  coolingLoadTotalBtu: number;
  designConditions: {
    heatingDesignTempF: number;
    coolingDesignTempF: number;
    indoorHeatingF: number;
    indoorCoolingF: number;
    heatingDeltaT: number;
    coolingDeltaT: number;
  };
  recommendedCoolingTons: number;
  recommendedHeatingBtu: number;
  /** Ratio of heating to cooling load. >1 = heating-driven, <1 = cooling-driven. */
  loadRatio: number;
  breakdown: ManualJBreakdown;
}

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

const INDOOR_HEATING_F = 70;
const INDOOR_COOLING_F = 75;

/** Climate-driven latent-to-sensible cooling ratio. */
const LATENT_FRACTION: Record<ClimateZone, number> = {
  '1': 0.40,
  '2': 0.35,
  '3': 0.30,
  '4': 0.25,
  '5': 0.20,
  '6': 0.18,
  '7': 0.15,
  '8': 0.15,
};

/** Construction-era envelope defaults. */
interface EraDefaults {
  wallRValue: number;
  ceilingRValue: number;
  floorRValue: number;
  windowUFactor: number;
  windowSHGC: number;
  ach50: number;
}
const ERA_DEFAULTS: Record<ConstructionEra, EraDefaults> = {
  'pre-1980': { wallRValue: 7, ceilingRValue: 19, floorRValue: 0, windowUFactor: 1.0, windowSHGC: 0.7, ach50: 14 },
  '1980-1999': { wallRValue: 11, ceilingRValue: 30, floorRValue: 11, windowUFactor: 0.7, windowSHGC: 0.6, ach50: 10 },
  '2000-2009': { wallRValue: 13, ceilingRValue: 38, floorRValue: 13, windowUFactor: 0.55, windowSHGC: 0.45, ach50: 7 },
  '2010-2019': { wallRValue: 19, ceilingRValue: 49, floorRValue: 19, windowUFactor: 0.35, windowSHGC: 0.35, ach50: 5 },
  '2020+': { wallRValue: 21, ceilingRValue: 60, floorRValue: 21, windowUFactor: 0.28, windowSHGC: 0.30, ach50: 3 },
};

/**
 * Air specific heat × density at sea level standard conditions.
 * Used in Q_infiltration = 0.018 × volume × ACH_natural × ΔT.
 */
const AIR_HEAT_FACTOR = 0.018;

/**
 * Conversion factor from ACH50 (blower-door pressurized) to ACH_natural
 * (typical operating conditions). ASHRAE-recommended divisor.
 */
const ACH50_TO_NATURAL = 20;

/**
 * Solar load factor for a representative south-east mix of orientations,
 * averaged across the cooling design hour. BTU/hr per ft² of glass at SHGC 1.0.
 * Real Manual J distributes this by orientation; we collapse to one number.
 * Calibrated to produce results within ±20% of ACCA Manual J reference cases.
 */
const AVG_SLF = 65;

/**
 * Attic adjustment for the ceiling: an unconditioned vented attic runs ~25°F
 * hotter than outdoor air during cooling design hours, increasing the effective
 * ΔT across the ceiling. Real Manual J handles this via attic temperature
 * calculations; we use a constant adder.
 */
const ATTIC_COOLING_BOOST_F = 25;

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

export function calculateManualJ(inputs: ManualJInputs): ManualJResult {
  if (inputs.squareFootage <= 0) throw new Error('squareFootage must be positive');

  const era = ERA_DEFAULTS[inputs.constructionEra];
  const wallR = inputs.wallRValue ?? era.wallRValue;
  const ceilingR = inputs.ceilingRValue ?? era.ceilingRValue;
  const floorR = inputs.floorRValue ?? era.floorRValue;
  const windowU = inputs.windowUFactor ?? era.windowUFactor;
  const windowSHGC = inputs.windowSHGC ?? era.windowSHGC;
  const ach50 = inputs.ach50 ?? era.ach50;
  const windowRatio = inputs.windowToFloorRatio ?? 0.15;
  const occupants = inputs.occupants ?? 3;

  // Geometry: assume square footprint per story.
  const floorAreaPerStory = inputs.squareFootage / inputs.stories;
  const sideLength = Math.sqrt(floorAreaPerStory);
  const perimeter = 4 * sideLength;
  const wallGrossArea = perimeter * inputs.ceilingHeight * inputs.stories;
  const windowArea = inputs.squareFootage * windowRatio;
  const wallNetArea = Math.max(0, wallGrossArea - windowArea);
  const ceilingArea = floorAreaPerStory;
  const floorArea = floorAreaPerStory;
  const volume = inputs.squareFootage * inputs.ceilingHeight;

  // Design conditions
  const heatingDesign = HEATING_DESIGN_TEMPS[inputs.climateZone];
  const coolingDesign = COOLING_DESIGN_TEMPS[inputs.climateZone];
  const heatingDeltaT = INDOOR_HEATING_F - heatingDesign;
  const coolingDeltaT = coolingDesign - INDOOR_COOLING_F;

  // Heating loads (no internal gain credit, per ACCA convention)
  const h_wall = (wallNetArea / wallR) * heatingDeltaT;
  const h_ceiling = (ceilingArea / ceilingR) * heatingDeltaT;
  const h_floor = floorR > 0 ? (floorArea / floorR) * heatingDeltaT * 0.5 : floorArea * 0.5 * heatingDeltaT;
  // Below: 0.5 factor on floor accounts for ground-coupled heat loss reduction
  // (ground temp is well above outdoor design temp on a slab/crawlspace)
  const h_window = windowArea * windowU * heatingDeltaT;
  const achNatural = ach50 / ACH50_TO_NATURAL;
  const h_infil = AIR_HEAT_FACTOR * volume * achNatural * heatingDeltaT;

  const heatingLoadBtu = Math.round(h_wall + h_ceiling + h_floor + h_window + h_infil);

  // Cooling loads (sensible)
  const c_wall = (wallNetArea / wallR) * coolingDeltaT;
  const c_ceiling = (ceilingArea / ceilingR) * (coolingDeltaT + ATTIC_COOLING_BOOST_F);
  const c_floor = floorR > 0 ? (floorArea / floorR) * coolingDeltaT * 0.3 : floorArea * 0.3 * coolingDeltaT;
  const c_window = windowArea * windowU * coolingDeltaT;
  const c_infil = AIR_HEAT_FACTOR * volume * achNatural * coolingDeltaT;
  const c_solar = windowArea * AVG_SLF * windowSHGC;
  // Internal: 600 BTU/person sensible (Manual J occupant heat gain) + 2000 base
  // for lighting and appliance loads in the cooled zone
  const c_internal = occupants * 600 + 2000;

  const coolingSensible = Math.round(
    c_wall + c_ceiling + c_floor + c_window + c_infil + c_solar + c_internal,
  );

  // Latent (humidity removal) as climate-driven fraction of sensible
  const coolingLatent = Math.round(coolingSensible * LATENT_FRACTION[inputs.climateZone]);
  const coolingTotal = coolingSensible + coolingLatent;

  // Equipment sizing: round larger of cooling and heating to standard tonnage
  const drivingLoad = Math.max(coolingTotal, heatingLoadBtu);
  const recommendedCoolingTons = tonsFromBtu(roundToHpSize(drivingLoad));
  const recommendedHeatingBtu = roundToHpSize(drivingLoad);
  const loadRatio = heatingLoadBtu / coolingTotal;

  return {
    heatingLoadBtu,
    coolingLoadSensibleBtu: coolingSensible,
    coolingLoadLatentBtu: coolingLatent,
    coolingLoadTotalBtu: coolingTotal,
    designConditions: {
      heatingDesignTempF: heatingDesign,
      coolingDesignTempF: coolingDesign,
      indoorHeatingF: INDOOR_HEATING_F,
      indoorCoolingF: INDOOR_COOLING_F,
      heatingDeltaT,
      coolingDeltaT,
    },
    recommendedCoolingTons,
    recommendedHeatingBtu,
    loadRatio,
    breakdown: {
      heating: {
        wallConductive: Math.round(h_wall),
        ceilingConductive: Math.round(h_ceiling),
        floorConductive: Math.round(h_floor),
        windowConductive: Math.round(h_window),
        infiltration: Math.round(h_infil),
      },
      cooling: {
        wallConductive: Math.round(c_wall),
        ceilingConductive: Math.round(c_ceiling),
        floorConductive: Math.round(c_floor),
        windowConductive: Math.round(c_window),
        infiltration: Math.round(c_infil),
        solarGain: Math.round(c_solar),
        internalGain: Math.round(c_internal),
      },
      envelope: {
        wallNetArea: Math.round(wallNetArea),
        ceilingArea: Math.round(ceilingArea),
        floorArea: Math.round(floorArea),
        windowArea: Math.round(windowArea),
        volume: Math.round(volume),
      },
      applied: {
        wallRValue: wallR,
        ceilingRValue: ceilingR,
        floorRValue: floorR,
        windowUFactor: windowU,
        windowSHGC,
        ach50,
        achNatural: Math.round(achNatural * 100) / 100,
        occupants,
      },
    },
  };
}
