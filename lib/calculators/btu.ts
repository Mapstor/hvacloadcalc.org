/**
 * BTU calculator engine.
 *
 * Implements the AC BTU sizing methodology documented in:
 *   /ac/btu/chart/ and /ac/btu/garage-mini-split/
 *
 * Pure functions only; no I/O, no DOM, no React. Safe to import anywhere.
 * Verified against ENERGY STAR room AC sizing guide and Manual J 8th Edition
 * reference cases within the calculator's documented accuracy band.
 *
 * Methodology (per article 15, section 3):
 *   adjusted_BTU = baseline × climate × ceiling × sun × insulation
 *                + occupancy_adjust + kitchen_adjust
 *
 * Baseline: 22 BTU/sq ft at moderate climate (zone 4), 8-ft ceilings,
 * normal occupancy, average insulation.
 */

export type ClimateZone = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type CeilingHeight = '8' | '9' | '10' | '12';
export type InsulationLevel = 'poor' | 'average' | 'good';
export type SunExposure = 'heavy' | 'mixed' | 'shaded';
export type SpaceType =
  | 'bedroom'
  | 'living-room'
  | 'kitchen'
  | 'home-office'
  | 'sun-room'
  | 'basement-above-grade'
  | 'basement-below-grade'
  | 'attic-or-second-floor';

export interface BtuInputs {
  /** Floor area in square feet. Must be > 0. */
  squareFootage: number;
  /** IECC climate zone 1-8. Hot/humid zones need more BTU. */
  climateZone: ClimateZone;
  /** Ceiling height in feet (rounded to nearest table value). */
  ceilingHeight: CeilingHeight;
  /** Envelope insulation level relative to current code. */
  insulationLevel: InsulationLevel;
  /** South/west window sun exposure. */
  sunExposure: SunExposure;
  /** Number of regular occupants. Baseline = 2; extras add 600 BTU each. */
  occupants: number;
  /** Is the cooled space a kitchen? Cooking adds 4,000 BTU. */
  isKitchen: boolean;
  /** Space type adjusts the baseline multiplier; default = bedroom (1.0×). */
  spaceType?: SpaceType;
}

export interface BtuResult {
  /** Final recommended BTU after all adjustments. Rounded to standard size. */
  recommendedBtu: number;
  /** Recommended tonnage equivalent (BTU / 12,000), rounded to 0.25. */
  recommendedTons: number;
  /** The exact calculated number before rounding to standard equipment size. */
  rawCalculatedBtu: number;
  /** The unadjusted baseline (sq ft × 22 BTU/sq ft). */
  baselineBtu: number;
  /** Step-by-step breakdown so users can see the math. */
  breakdown: BtuBreakdown;
  /** Acceptable BTU range: -10% to +20% around recommended. */
  acceptableRange: { low: number; high: number };
  /** Suggested equipment class given the recommended capacity. */
  suggestedEquipmentClass: 'window' | 'window-or-portable' | 'mini-split-or-window' | 'central';
}

export interface BtuBreakdown {
  baseline: { sqft: number; btuPerSqft: number; result: number };
  climateFactor: number;
  ceilingFactor: number;
  sunFactor: number;
  insulationFactor: number;
  spaceTypeFactor: number;
  multiplicativeSubtotal: number;
  occupancyAdjustment: number;
  kitchenAdjustment: number;
  finalRaw: number;
}

const BASELINE_BTU_PER_SQFT = 22;

const CLIMATE_FACTORS: Record<ClimateZone, number> = {
  '1': 1.30,
  '2': 1.18,
  '3': 1.07,
  '4': 1.0,
  '5': 0.90,
  '6': 0.85,
  '7': 0.80,
  '8': 0.78,
};

const CEILING_FACTORS: Record<CeilingHeight, number> = {
  '8': 1.0,
  '9': 1.1,
  '10': 1.2,
  '12': 1.30,
};

const SUN_FACTORS: Record<SunExposure, number> = {
  heavy: 1.15,
  mixed: 1.0,
  shaded: 0.92,
};

const INSULATION_FACTORS: Record<InsulationLevel, number> = {
  poor: 1.30,
  average: 1.0,
  good: 0.90,
};

const SPACE_TYPE_FACTORS: Record<SpaceType, number> = {
  bedroom: 1.0,
  'living-room': 1.1,
  kitchen: 1.3,
  'home-office': 1.05,
  'sun-room': 1.75,
  'basement-above-grade': 0.8,
  'basement-below-grade': 0.6,
  'attic-or-second-floor': 1.3,
};

const STANDARD_SIZES_BTU = [
  5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000, 18000, 21000, 24000, 30000,
  36000, 42000, 48000, 60000,
];

function roundToStandardSize(btu: number): number {
  if (btu <= STANDARD_SIZES_BTU[0]) {
    return STANDARD_SIZES_BTU[0];
  }
  if (btu >= STANDARD_SIZES_BTU[STANDARD_SIZES_BTU.length - 1]) {
    return STANDARD_SIZES_BTU[STANDARD_SIZES_BTU.length - 1];
  }
  for (let i = 0; i < STANDARD_SIZES_BTU.length - 1; i++) {
    const lower = STANDARD_SIZES_BTU[i];
    const upper = STANDARD_SIZES_BTU[i + 1];
    if (btu >= lower && btu < upper) {
      const midpoint = (lower + upper) / 2;
      return btu < midpoint ? lower : upper;
    }
  }
  return STANDARD_SIZES_BTU[STANDARD_SIZES_BTU.length - 1];
}

function classifyEquipment(btu: number): BtuResult['suggestedEquipmentClass'] {
  if (btu <= 10000) return 'window';
  if (btu <= 14000) return 'window-or-portable';
  if (btu <= 18000) return 'mini-split-or-window';
  return 'central';
}

function tonsFromBtu(btu: number): number {
  return Math.round((btu / 12000) * 4) / 4;
}

export function calculateBtu(inputs: BtuInputs): BtuResult {
  if (inputs.squareFootage <= 0) {
    throw new Error('squareFootage must be positive');
  }
  if (inputs.occupants < 0) {
    throw new Error('occupants must be zero or positive');
  }

  const baseline = inputs.squareFootage * BASELINE_BTU_PER_SQFT;
  const climateFactor = CLIMATE_FACTORS[inputs.climateZone];
  const ceilingFactor = CEILING_FACTORS[inputs.ceilingHeight];
  const sunFactor = SUN_FACTORS[inputs.sunExposure];
  const insulationFactor = INSULATION_FACTORS[inputs.insulationLevel];
  const spaceTypeFactor = SPACE_TYPE_FACTORS[inputs.spaceType ?? 'bedroom'];

  const multiplicativeSubtotal =
    baseline * climateFactor * ceilingFactor * sunFactor * insulationFactor * spaceTypeFactor;

  const extraOccupants = Math.max(0, inputs.occupants - 2);
  const occupancyAdjustment = extraOccupants * 600;
  const kitchenAdjustment = inputs.isKitchen ? 4000 : 0;

  const rawCalculatedBtu = Math.round(multiplicativeSubtotal + occupancyAdjustment + kitchenAdjustment);
  const recommendedBtu = roundToStandardSize(rawCalculatedBtu);

  return {
    recommendedBtu,
    recommendedTons: tonsFromBtu(recommendedBtu),
    rawCalculatedBtu,
    baselineBtu: Math.round(baseline),
    breakdown: {
      baseline: {
        sqft: inputs.squareFootage,
        btuPerSqft: BASELINE_BTU_PER_SQFT,
        result: Math.round(baseline),
      },
      climateFactor,
      ceilingFactor,
      sunFactor,
      insulationFactor,
      spaceTypeFactor,
      multiplicativeSubtotal: Math.round(multiplicativeSubtotal),
      occupancyAdjustment,
      kitchenAdjustment,
      finalRaw: rawCalculatedBtu,
    },
    acceptableRange: {
      low: Math.round(rawCalculatedBtu * 0.9),
      high: Math.round(rawCalculatedBtu * 1.2),
    },
    suggestedEquipmentClass: classifyEquipment(recommendedBtu),
  };
}

export const STANDARD_BTU_SIZES = STANDARD_SIZES_BTU;
